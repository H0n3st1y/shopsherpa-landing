/**
 * POST /api/extension/visual-scan
 *
 * Accepts a screenshot data URL + an existing ScorePayload from /scan,
 * injects the CNN visual-risk result as a medium evidence item into the
 * tier-based decision engine, rewrites explanation text via Claude Haiku,
 * and returns a VisualScanPayload.
 *
 * Architecture rules (enforced by code, not just convention):
 *  1. Score computation is pure TypeScript — the LLM touches only headline + sub.
 *  2. Visual risk is a medium-tier evidence item: it can raise the band but is
 *     suppressed by strong_safe (Rule 2/3 of the evidence engine).
 *  3. The LLM prompt explicitly forbids changing any numbers.
 *  4. Findings use only approved broad-language strings — no per-label hallucination.
 *  5. modelVersion is included in the response for telemetry.
 */

export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

import { corsHeaders } from '@/lib/cors.js';
import {
  BAND_META,
  type Band,
  type ScorePayload,
  type VisualFinding,
  type VisualModelResult,
  type VisualModelStatus,
  type VisualRiskBand,
  type VisualScanPayload,
} from '@/lib/types.js';
import {
  decide,
  templateText,
  type EvidenceItem,
} from '@/lib/evidence.js';
import {
  signalVisualRisk,
  evidenceToSignals,
} from '@/lib/signals.js';
import { decodeDataUrl } from '@/lib/visual/preprocess.js';
import { runVisualModel, MODEL_VERSION } from '@/lib/visual/model.js';
import { emitWithAlertCheck, emit } from '@/lib/telemetry.js';
import { parseUrl } from '@/lib/signals.js';

// ---------------------------------------------------------------------------
// Rate limiting (Upstash — configure UPSTASH_REDIS_REST_URL in .env.local)
// ---------------------------------------------------------------------------

let ratelimit: { limit: (key: string) => Promise<{ success: boolean; reset: number }> } | null = null;

async function getRateLimiter() {
  if (ratelimit) return ratelimit;
  try {
    const { Ratelimit } = await import('@upstash/ratelimit');
    const { Redis }     = await import('@upstash/redis');
    ratelimit = new Ratelimit({
      redis:   Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(20, '1 h'),
      prefix:  'rl:visual-scan',
    });
    return ratelimit;
  } catch {
    // Redis not configured — allow all requests in dev
    return null;
  }
}

// ---------------------------------------------------------------------------
// Request schema
// ---------------------------------------------------------------------------

/** Schema for a single EvidenceItem carried from /scan → /visual-scan. */
const EvidenceItemSchema = z.object({
  id:         z.string(),
  tier:       z.enum(['strong', 'medium', 'weak']),
  direction:  z.enum(['safe', 'danger']),
  confidence: z.number().min(0).max(1),
  label:      z.string(),
  detail:     z.string(),
});

// Must match the base ScorePayload but we only need a safe subset for scoring.
const ExistingScoreSchema = z.object({
  domain:              z.string().max(253),
  score:               z.number().int().min(0).max(100),
  band:                z.enum(['safe', 'caution', 'danger']),
  signals:             z.array(z.object({
    id:         z.string(),
    pass:       z.union([z.boolean(), z.literal('partial')]),
    detail:     z.string(),
    confidence: z.number(),
    source:     z.string().optional(),
    weight:     z.number().optional(),
  })).default([]),
  triggerAlert:        z.boolean().default(false),
  alertReason:         z.string().optional(),
  headline:            z.string().default(''),
  sub:                 z.string().default(''),
  bandLabel:           z.string().default(''),
  color:               z.string().default(''),
  scannedAt:           z.string().default(''),
  cached:              z.boolean().default(false),
  reports:             z.object({ safe: z.number().int().min(0), scam: z.number().int().min(0) })
                         .default({ safe: 0, scam: 0 }),
  // Evidence chain from /scan — used to inject visual result into the engine
  evidenceChain:       z.array(EvidenceItemSchema).optional(),
  decisionRule:        z.string().optional(),
  decisionExplanation: z.string().optional(),
}).passthrough();

const VisualScanRequest = z.object({
  url:           z.string().url().max(2048),
  screenshot:    z.string().min(1),   // data URL — size checked after decode
  existingScore: ExistingScoreSchema,
}).strict();

type VisualScanRequest = z.infer<typeof VisualScanRequest>;

// ---------------------------------------------------------------------------
// Visual findings builder
// ---------------------------------------------------------------------------

/**
 * Build the findings array from the binary model result.
 *
 * IMPORTANT: The model does not output per-finding probabilities.
 * We use ONLY approved broad-language strings — no specific visual claims.
 * Per-finding detail will be added once multi-label annotation data exists.
 */
function buildFindings(result: VisualModelResult): VisualFinding[] {
  if (result.visualRiskBand === 'low') return [];

  const detail = result.visualRiskBand === 'danger'
    ? 'The page resembles known phishing layouts.'
    : 'Visual phishing risk is elevated.';

  return [{
    type:       'low_quality_storefront',
    label:      'Elevated visual risk',
    detail,
    confidence: result.visualRiskProbability,
    risk:       result.visualRiskBand === 'danger' ? 'high' : 'medium',
  }];
}

function buildSummary(band: VisualRiskBand): string {
  if (band === 'danger')  return 'The page resembles known phishing layouts.';
  if (band === 'caution') return 'Visual phishing risk is elevated.';
  return 'No visual risk indicators detected.';
}

// ---------------------------------------------------------------------------
// LLM rewrite — explanation text only, numbers stay outside
// ---------------------------------------------------------------------------

let _anthropic: Anthropic | null = null;

function getAnthropic(): Anthropic {
  if (!_anthropic) {
    _anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  }
  return _anthropic;
}

interface ExplanationText { headline: string; sub: string; usedLlm: boolean; llmFallback: boolean }

/**
 * Ask Claude Haiku to rewrite the user-facing headline and sub text.
 *
 * The LLM receives only facts already computed by the scoring engine.
 * All numbers and the risk band are locked before this call.
 * Falls back to template text if the call fails or times out.
 *
 * Returns usedLlm=true if the LLM was called successfully.
 * Returns llmFallback=true if the LLM was attempted but fell back to template.
 */
async function rewriteExplanation(
  band: Band,
  visualBand: VisualRiskBand,
  visualProb: number,
  decisionExplanation: string,
  templateFallback: { headline: string; sub: string },
): Promise<ExplanationText> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { ...templateFallback, usedLlm: false, llmFallback: false };

  const prompt = `You are writing user-facing text for a browser security extension.

FACTS — do not change any of these values:
- Overall risk band: ${band}
- Visual risk level: ${visualBand} (probability: ${visualProb.toFixed(2)})
- Decision explanation: ${decisionExplanation}

RULES:
- Write ONLY headline and sub text. Nothing else.
- Headline: ≤ 120 chars, one sentence.
- Sub: ≤ 180 chars, one to two sentences.
- Use hedged language: "may", "appears to", "signals suggest".
- FORBIDDEN: "definitely", "certainly", "I can see", "the image shows", "AI detected".
- FORBIDDEN: claiming fraud with certainty.
- If band is "safe" and visual risk is "low", be reassuring without being dismissive.
- If band is "danger", warn clearly but avoid alarmism.
- For elevated visual risk: you may say "the page's appearance resembles known phishing patterns."
- Do NOT mention machine learning, neural networks, or computer vision.

Return ONLY this JSON (no markdown, no commentary):
{"headline": "...", "sub": "..."}`;

  try {
    const anthropic = getAnthropic();
    const msg = await Promise.race([
      anthropic.messages.create({
        model:      'claude-haiku-4-5',
        max_tokens: 300,
        messages:   [{ role: 'user', content: prompt }],
      }),
      new Promise<never>((_, rej) => setTimeout(() => rej(new Error('timeout')), 3000)),
    ]);

    const text = (msg as Anthropic.Message).content
      .filter(b => b.type === 'text')
      .map(b => (b as Anthropic.TextBlock).text)
      .join('');

    const parsed = JSON.parse(text) as { headline?: string; sub?: string };
    if (typeof parsed.headline === 'string' && typeof parsed.sub === 'string') {
      return {
        headline:    parsed.headline.slice(0, 120),
        sub:         parsed.sub.slice(0, 180),
        usedLlm:     true,
        llmFallback: false,
      };
    }
    return { ...templateFallback, usedLlm: false, llmFallback: true };
  } catch {
    return { ...templateFallback, usedLlm: false, llmFallback: true };
  }
}

// ---------------------------------------------------------------------------
// Model status helper
// ---------------------------------------------------------------------------

/**
 * Convert a modelVersion string to an explicit VisualModelStatus.
 * 'unavailable' — ONNX file not present (graceful stub from model.ts)
 * 'error'       — inference threw (ORT crash, timeout, etc.)
 * 'available'   — model ran and produced a real probability
 */
function modelStatusFrom(modelVersion: string): VisualModelStatus {
  if (modelVersion === 'unavailable') return 'unavailable';
  if (modelVersion === 'error')       return 'error';
  return 'available';
}

// ---------------------------------------------------------------------------
// Route handlers
// ---------------------------------------------------------------------------

export async function OPTIONS(req: NextRequest): Promise<Response> {
  const origin = req.headers.get('origin');
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const origin    = req.headers.get('origin');
  const installId = req.headers.get('x-install-id');
  const headers   = corsHeaders(origin);

  // ── Rate limiting (skipped gracefully when Upstash is not configured) ────────
  if (installId) {
    try {
      const limiter = await getRateLimiter();
      if (limiter) {
        const { success, reset } = await limiter.limit(installId);
        if (!success) {
          return NextResponse.json(
            { error: 'rate_limited' },
            { status: 429, headers: {
              ...headers,
              'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
            }},
          );
        }
      }
    } catch {
      // Upstash not reachable — allow request without rate limiting
    }
  }

  // ── Parse & validate ───────────────────────────────────────────────────────
  let body: VisualScanRequest;
  try {
    const raw = await req.json() as unknown;
    body = VisualScanRequest.parse(raw);
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400, headers });
  }

  // ── Decode screenshot ─────────────────────────────────────────────────────
  const imageBuffer = decodeDataUrl(body.screenshot);
  if (!imageBuffer) {
    return NextResponse.json({ error: 'invalid_screenshot' }, { status: 400, headers });
  }

  const MAX_BYTES = 1.5 * 1024 * 1024; // 1.5 MB
  if (imageBuffer.byteLength > MAX_BYTES) {
    return NextResponse.json({ error: 'screenshot_too_large', maxBytes: MAX_BYTES },
      { status: 413, headers });
  }

  // ── Visual inference ───────────────────────────────────────────────────────
  const parsedUrl   = parseUrl(body.url);
  let visualResult: VisualModelResult;
  let modelErrorType: 'onnx_error' | 'timeout' | 'unknown' | null = null;

  try {
    visualResult = await runVisualModel(imageBuffer);
  } catch (err) {
    console.error('[visual-scan] model error:', err);
    // Degrade gracefully — return existing score unchanged
    modelErrorType = err instanceof Error && err.message.includes('timeout') ? 'timeout'
      : err instanceof Error && err.message.toLowerCase().includes('ort') ? 'onnx_error'
      : 'unknown';
    visualResult = { visualRiskProbability: 0, visualRiskBand: 'low',
                     modelVersion: 'error' };
    // Fire model error event immediately
    emit({
      event:     'visual_scan.model_error',
      tld:       parsedUrl.tld,
      errorType: modelErrorType,
    }, installId ?? undefined).catch(() => {});
  }

  // Fire model-unavailable event when ONNX runtime is in degraded mode
  if (visualResult.modelVersion === 'unavailable') {
    emit({
      event: 'visual_scan.model_unavailable',
      tld:   parsedUrl.tld,
    }, installId ?? undefined).catch(() => {});
  }

  // ── Evidence engine ────────────────────────────────────────────────────────
  // Recover the existing evidence chain from /scan.
  // If the client sent an older payload without evidenceChain, fall back to [].
  const existingEvidence = (body.existingScore.evidenceChain ?? []) as EvidenceItem[];

  // Create a medium evidence item for the visual-risk result.
  // signalVisualRisk returns null when the band is 'low' (no risk to add).
  const visualItem = signalVisualRisk(
    visualResult.visualRiskBand,
    visualResult.visualRiskProbability,
  );

  // Combine: existing URL/domain evidence + visual evidence (if present).
  const allEvidence: EvidenceItem[] = [
    ...existingEvidence,
    ...(visualItem ? [visualItem] : []),
  ];

  // Deterministic verdict — Rule 2/3 ensures visual (medium) is suppressed for
  // verified merchants; strong_danger still overrides everything.
  const decision = decide(allEvidence);

  const { label: bandLabel, color } = BAND_META[decision.band];

  const triggerAlert = decision.band === 'danger';
  const alertReason  = triggerAlert ? decision.dominant.label : undefined;

  // Backward-compat Signal[] — include visual evidence in the mapped slots.
  const signals = evidenceToSignals(allEvidence);

  // ── LLM explanation rewrite (text only — verdict is already locked) ───────
  // templateText produces the deterministic fallback; LLM may refine wording.
  const templateFallback = templateText(decision);

  const {
    headline,
    sub,
    usedLlm,
    llmFallback,
  } = await rewriteExplanation(
    decision.band,
    visualResult.visualRiskBand,
    visualResult.visualRiskProbability,
    decision.explanation,
    templateFallback,
  );

  // Emit LLM fallback event (separate event so dashboards can track rate easily)
  if (llmFallback) {
    emit({
      event:      'visual_scan.llm_fallback',
      band:       decision.band,
      visualBand: visualResult.visualRiskBand,
      errorType:  process.env.ANTHROPIC_API_KEY ? 'api_error' : 'no_api_key',
    }, installId ?? undefined).catch(() => {});
  }

  // ── Assemble response ──────────────────────────────────────────────────────
  const existing = body.existingScore as ScorePayload;

  const payload: VisualScanPayload = {
    ...existing,
    score:               decision.score,
    band:                decision.band,
    bandLabel,
    color,
    headline,
    sub,
    signals,
    triggerAlert,
    alertReason,
    scannedAt:           new Date().toISOString(),
    cached:              false,
    // Updated evidence chain (now includes visual item)
    evidenceChain:       allEvidence,
    decisionRule:        decision.rule,
    decisionExplanation: decision.explanation,

    visualReview: {
      visualRisk:         visualResult.visualRiskProbability,
      visualRiskBand:     visualResult.visualRiskBand,
      model:              visualResult.modelVersion,
      visualModelStatus:  modelStatusFrom(visualResult.modelVersion),
      summary:            buildSummary(visualResult.visualRiskBand),
      findings:           buildFindings(visualResult),
    },
  };

  // Telemetry — fire-and-forget
  const verifiedMerchant = allEvidence.some(e => e.id === 'verified_merchant');
  const bandBefore = (body.existingScore as ScorePayload).band;
  const bandOrder: Record<Band, number> = { safe: 0, caution: 1, danger: 2 };
  emitWithAlertCheck({
    event:             'visual_scan.completed',
    tld:               parsedUrl.tld,
    registrableDomain: parsedUrl.domain,
    verifiedMerchant,
    visualBand:        visualResult.visualRiskBand,
    visualProbability: Math.round(visualResult.visualRiskProbability * 100) / 100,
    modelVersion:      visualResult.modelVersion,
    scoreBefore:       (body.existingScore as ScorePayload).score,
    scoreAfter:        decision.score,
    bandBefore,
    bandAfter:         decision.band,
    scoreDelta:        decision.score - (body.existingScore as ScorePayload).score,
    bandChanged:       bandBefore !== decision.band,
    bandDowngraded:    bandOrder[decision.band] > bandOrder[bandBefore],
    decisionRule:      decision.rule,
    llmUsed:           usedLlm,
    llmFallback,
  }, installId ?? undefined).catch(() => {});

  return NextResponse.json(payload, { status: 200, headers });
}

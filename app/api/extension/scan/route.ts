/**
 * POST /api/extension/scan
 *
 * Evidence-tier risk engine — v2
 *
 * Accepts URL + client-side page hints and returns a ScorePayload.
 * The risk verdict is produced by a deterministic evidence-tier decision
 * engine (lib/evidence.ts) — not by a weighted average.
 *
 * Evidence tiers
 * ──────────────
 *   strong (safe/danger) — deterministic, high-precision findings.
 *     safe:  verified merchant, long-lived brand domain, allowed checkout.
 *     danger: spoof pattern, checkout redirect, malicious feed hit.
 *
 *   medium (danger)     — statistical signals; two needed to reach `danger`.
 *     visual risk model, review authenticity, pricing anomaly.
 *
 *   weak (danger)       — noisy; alone can only produce `caution`.
 *     urgency wording, risky TLD, thin policy signals.
 *
 * Decision rules (enforced by lib/evidence.ts — immutable)
 * ─────────────────────────────────────────────────────────
 *   1. Strong danger overrides everything, including verified merchants.
 *   2. Strong safe suppresses medium and weak false positives.
 *   3. Visual risk alone cannot produce `danger` for verified merchants.
 *      (Follows from Rule 2: visual_risk is medium tier.)
 *   4. Unknown domains reach `danger` only via one strong_danger OR
 *      two independent medium signals in agreement.
 *   5. Explanations always cite the strongest evidence tier responsible.
 *
 * LLM policy
 * ──────────
 * This endpoint makes no LLM calls. All numbers and the band are locked
 * before any text is generated. The visual-scan route may rewrite headline
 * and sub text via Claude Haiku AFTER the verdict is finalized.
 */

export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { corsHeaders } from '@/lib/cors.js';
import {
  BAND_META,
  type ScorePayload,
} from '@/lib/types.js';
import {
  decide,
  templateText,
} from '@/lib/evidence.js';
import {
  collectEvidence,
  evidenceToSignals,
  parseUrl,
  type PageHints,
} from '@/lib/signals.js';
import { emitWithAlertCheck } from '@/lib/telemetry.js';

// ---------------------------------------------------------------------------
// Request schema
// ---------------------------------------------------------------------------

const PageHintsSchema = z.object({
  hasCheckoutForm:     z.boolean().default(false),
  hasPaymentRedirect:  z.boolean().default(false),
  reviewWidgetCount:   z.number().int().min(0).max(50).default(0),
  priceCount:          z.number().int().min(0).max(100).default(0),
  hasUrgencyMarkers:   z.boolean().default(false),
  brandMentions:       z.array(z.string().max(32)).max(5).default([]),
});

const ScanRequest = z.object({
  url:       z.string().url().max(2048),
  pageHints: PageHintsSchema.default({}),
}).strict();

// ---------------------------------------------------------------------------
// Rate limiting (Upstash — optional)
// ---------------------------------------------------------------------------

let ratelimit: { limit: (key: string) => Promise<{ success: boolean; reset: number }> } | null = null;

async function getRateLimiter() {
  if (ratelimit) return ratelimit;
  try {
    const { Ratelimit } = await import('@upstash/ratelimit');
    const { Redis }     = await import('@upstash/redis');
    ratelimit = new Ratelimit({
      redis:   Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(60, '1 h'),
      prefix:  'rl:scan',
    });
    return ratelimit;
  } catch {
    return null;
  }
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

  // Rate limiting (graceful degradation when Upstash is not configured)
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

  // Parse and validate
  let body: z.infer<typeof ScanRequest>;
  try {
    const raw = await req.json() as unknown;
    body = ScanRequest.parse(raw);
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400, headers });
  }

  // ── Evidence collection ─────────────────────────────────────────────────
  const parsed = parseUrl(body.url);
  const hints  = body.pageHints as PageHints;

  // Collect all evidence items (strong safe/danger + medium + weak)
  const evidence = collectEvidence(parsed, hints);

  // ── Decision engine ────────────────────────────────────────────────────
  // Pure, deterministic — no ML, no LLM, no network calls.
  const decision = decide(evidence);

  // ── Explanation text ────────────────────────────────────────────────────
  // Template text from the evidence record. The visual-scan route may
  // optionally rewrite this via LLM after visual inference completes.
  const { headline, sub } = templateText(decision);

  // ── Backward-compat Signal[] ────────────────────────────────────────────
  // Map evidence items to the six legacy signal slots the extension expects.
  const signals = evidenceToSignals(evidence);

  // ── Alert conditions ────────────────────────────────────────────────────
  const triggerAlert = decision.band === 'danger';
  const alertReason  = triggerAlert
    ? decision.dominant.label
    : undefined;

  const { label: bandLabel, color } = BAND_META[decision.band];

  const payload: ScorePayload = {
    domain:              parsed.hostname.replace(/^www\./, ''),
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
    reports:             { safe: 0, scam: 0 },
    // New fields — consumed by visual-scan and the extension's detail panel
    evidenceChain:       evidence,
    decisionRule:        decision.rule,
    decisionExplanation: decision.explanation,
  };

  // Telemetry — fire-and-forget, never blocks the response
  emitWithAlertCheck({
    event:             'scan.completed',
    tld:               parsed.tld,
    registrableDomain: parsed.domain,
    verifiedMerchant:  evidence.some(e => e.id === 'verified_merchant'),
    band:              decision.band,
    score:             decision.score,
    decisionRule:      decision.rule,
    triggerAlert,
    strongDangerCount: evidence.filter(e => e.tier === 'strong' && e.direction === 'danger').length,
    strongSafeCount:   evidence.filter(e => e.tier === 'strong' && e.direction === 'safe').length,
    mediumDangerCount: evidence.filter(e => e.tier === 'medium').length,
    weakDangerCount:   evidence.filter(e => e.tier === 'weak').length,
  }, installId ?? undefined).catch(() => {});

  return NextResponse.json(payload, { status: 200, headers });
}

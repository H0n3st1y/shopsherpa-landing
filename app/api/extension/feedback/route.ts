/**
 * POST /api/extension/feedback
 *
 * Accepts a user disagreement report from the extension.
 * Used to measure false-positive and false-negative rates per domain.
 *
 * Privacy rules:
 *   - URL is accepted only to extract TLD and registrable domain (e.g. "amazon.com").
 *   - The full URL, path, and query string are discarded immediately after extraction.
 *   - No screenshots, no user email, no personal identifiers.
 *   - Install IDs are hashed before telemetry use.
 *
 * Feedback types:
 *   "safe"  — user says the site is safe (extension may have over-warned → false positive)
 *   "scam"  — user says the site is a scam (extension may have under-warned → false negative)
 */

export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { corsHeaders } from '@/lib/cors.js';
import { lookupMerchant } from '@/lib/merchants.js';
import { emit } from '@/lib/telemetry.js';

// ---------------------------------------------------------------------------
// Rate limiting (shared Upstash instance — 10 reports/hour per install)
// ---------------------------------------------------------------------------

let ratelimit: { limit: (key: string) => Promise<{ success: boolean; reset: number }> } | null = null;

async function getRateLimiter() {
  if (ratelimit) return ratelimit;
  try {
    const { Ratelimit } = await import('@upstash/ratelimit');
    const { Redis }     = await import('@upstash/redis');
    ratelimit = new Ratelimit({
      redis:   Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '1 h'),
      prefix:  'rl:feedback',
    });
    return ratelimit;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Request schema
// ---------------------------------------------------------------------------

const FeedbackRequest = z.object({
  /**
   * Full URL of the page being reported.
   * Used ONLY to extract TLD and registrable domain. Discarded after parsing.
   */
  url: z.string().url().max(2048),

  /**
   * The risk band the extension displayed to the user.
   */
  verdictShown: z.enum(['safe', 'caution', 'danger']),

  /**
   * The visual risk band the model returned, if visual-scan was performed.
   * Null when the user reports from the initial /scan verdict only.
   */
  visualBandShown: z.enum(['low', 'caution', 'danger']).nullable().default(null),

  /**
   * What the user believes the correct verdict is.
   *   "safe"  → user thinks the site is safe (possible false positive if we said danger)
   *   "scam"  → user thinks the site is a scam (possible false negative if we said safe)
   */
  userFeedback: z.enum(['safe', 'scam']),

  /**
   * Extension version string (e.g. "1.2.3") for tracking regressions per release.
   * Optional — older extension builds may not send this.
   */
  extensionVersion: z.string().max(20).optional(),
}).strict();

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

  // Rate limiting (prevents bulk fake reports)
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
      // Upstash not reachable — allow request
    }
  }

  // Parse & validate
  let body: z.infer<typeof FeedbackRequest>;
  try {
    const raw = await req.json() as unknown;
    body = FeedbackRequest.parse(raw);
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400, headers });
  }

  // Extract domain metadata — full URL discarded after this block
  let tld               = 'unknown';
  let registrableDomain = 'unknown';
  try {
    const hostname = new URL(body.url).hostname.toLowerCase();
    const parts    = hostname.split('.');
    tld               = parts[parts.length - 1] ?? 'unknown';
    registrableDomain = parts.slice(-2).join('.') ?? 'unknown';
  } catch {
    // Malformed URL slipped past Zod — continue with unknown domain
  }

  // Determine if this is a verified merchant (for alert prioritization)
  const verifiedMerchant = lookupMerchant(registrableDomain) !== null;

  // Map user feedback to standard disagreement type
  //   false_positive: user says safe while we said danger/caution
  //   false_negative: user says scam while we said safe
  const userFeedback: 'false_positive' | 'false_negative' =
    body.userFeedback === 'safe' ? 'false_positive' : 'false_negative';

  // Emit telemetry event (fire-and-forget)
  emit({
    event:             'feedback.submitted',
    verdictShown:      body.verdictShown,
    visualBandShown:   body.visualBandShown,
    userFeedback,
    verifiedMerchant,
    tld,
    registrableDomain,
    extensionVersion:  body.extensionVersion ?? null,
  }, installId ?? undefined).catch(err =>
    console.error('[feedback] telemetry error:', err),
  );

  // Log a high-priority line if a verified merchant gets a false-positive report
  if (verifiedMerchant && userFeedback === 'false_positive') {
    console.warn(JSON.stringify({
      level:   'alert',
      source:  'feedback/fp',
      ts:      new Date().toISOString(),
      message: `Verified-merchant false-positive report received for ${registrableDomain}`,
      verdictShown:    body.verdictShown,
      visualBandShown: body.visualBandShown,
      registrableDomain,
    }));
  }

  return NextResponse.json({ ok: true }, { status: 200, headers });
}

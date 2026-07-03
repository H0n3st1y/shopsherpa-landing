/**
 * POST /api/extension/report
 *
 * Compatibility endpoint for the Chrome extension. The packaged extension sends
 * { domain, choice, reason } and expects optional safe/scam tallies back.
 */

export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { corsHeaders } from '@/lib/cors.js';
import { lookupMerchant } from '@/lib/merchants.js';
import { emit } from '@/lib/telemetry.js';

const ReportRequest = z.object({
  domain: z.string().min(1).max(253),
  choice: z.enum(['safe', 'scam']),
  reason: z.string().max(120).optional(),
}).strict();

let ratelimit: { limit: (key: string) => Promise<{ success: boolean; reset: number }> } | null = null;

async function getRateLimiter() {
  if (ratelimit) return ratelimit;
  try {
    const { Ratelimit } = await import('@upstash/ratelimit');
    const { Redis }     = await import('@upstash/redis');
    ratelimit = new Ratelimit({
      redis:   Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '1 h'),
      prefix:  'rl:report',
    });
    return ratelimit;
  } catch {
    return null;
  }
}

function normalizeDomain(input: string): string | null {
  const raw = input.trim().toLowerCase();
  if (!raw) return null;

  try {
    const url = raw.includes('://') ? new URL(raw) : new URL(`https://${raw}`);
    return url.hostname.replace(/^www\./, '');
  } catch {
    const stripped = raw.replace(/^www\./, '');
    return /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(stripped) ? stripped : null;
  }
}

export async function OPTIONS(req: NextRequest): Promise<Response> {
  const origin = req.headers.get('origin');
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const origin    = req.headers.get('origin');
  const installId = req.headers.get('x-install-id');
  const headers   = corsHeaders(origin);

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
      // Upstash not reachable or not configured; accept the report.
    }
  }

  let body: z.infer<typeof ReportRequest>;
  try {
    body = ReportRequest.parse(await req.json());
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400, headers });
  }

  const domain = normalizeDomain(body.domain);
  if (!domain) {
    return NextResponse.json({ error: 'invalid_domain' }, { status: 400, headers });
  }

  const parts = domain.split('.');
  const tld = parts[parts.length - 1] ?? 'unknown';
  const registrableDomain = parts.slice(-2).join('.') || domain;
  const verifiedMerchant = lookupMerchant(registrableDomain) !== null;
  const userFeedback = body.choice === 'safe' ? 'false_positive' : 'false_negative';

  emit({
    event:             'feedback.submitted',
    verdictShown:      body.choice === 'safe' ? 'danger' : 'safe',
    visualBandShown:   null,
    userFeedback,
    verifiedMerchant,
    tld,
    registrableDomain,
    extensionVersion:  req.headers.get('x-extension-version') ?? null,
  }, installId ?? undefined).catch(err =>
    console.error('[report] telemetry error:', err),
  );

  if (verifiedMerchant && body.choice === 'safe') {
    console.warn(JSON.stringify({
      level:   'alert',
      source:  'report/fp',
      ts:      new Date().toISOString(),
      message: `Verified-merchant false-positive report received for ${registrableDomain}`,
      registrableDomain,
    }));
  }

  return NextResponse.json({
    ok: true,
    tallies: {
      safe: body.choice === 'safe' ? 1 : 0,
      scam: body.choice === 'scam' ? 1 : 0,
    },
  }, { status: 200, headers });
}

/**
 * GET /api/extension/score/:domain
 *
 * Returns a cached ScorePayload for the given domain, or 404 if not cached.
 *
 * Phase 1: No persistent cache exists yet.
 * All requests return 404 so the extension falls through to POST /scan.
 *
 * Phase 2: Replace the body of getFromCache() with a Redis / edge-KV lookup.
 * The Upstash client is already a dependency — set UPSTASH_REDIS_REST_URL
 * and UPSTASH_REDIS_REST_TOKEN to enable it.
 */

export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { corsHeaders } from '@/lib/cors.js';
import type { ScorePayload } from '@/lib/types.js';

async function getFromCache(_domain: string): Promise<ScorePayload | null> {
  // Phase 1: no persistent cache.
  // Phase 2: uncomment and implement:
  //
  // const { Redis } = await import('@upstash/redis');
  // const redis = Redis.fromEnv();
  // const cached = await redis.get<ScorePayload>(`score:${domain}`);
  // return cached;
  return null;
}

export async function OPTIONS(req: NextRequest): Promise<Response> {
  const origin = req.headers.get('origin');
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ domain: string }> },
): Promise<NextResponse> {
  const origin  = req.headers.get('origin');
  const headers = corsHeaders(origin);
  const { domain } = await params;

  if (!domain || domain.length > 253) {
    return NextResponse.json({ error: 'invalid_domain' }, { status: 400, headers });
  }

  const cached = await getFromCache(domain);
  if (!cached) {
    return NextResponse.json({ error: 'not_found' }, { status: 404, headers });
  }

  return NextResponse.json({ ...cached, cached: true }, { status: 200, headers });
}

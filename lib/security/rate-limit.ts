import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getClientIp, networkBucket, sha256 } from "@/lib/security/ip";

export type RateLimitRule = {
  name: string;
  limit: number;
  windowSeconds: number;
  keyParts?: string[];
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: string;
};

export async function checkRateLimit(rule: RateLimitRule): Promise<RateLimitResult> {
  const keyHash = await sha256([rule.name, ...(rule.keyParts ?? [])].join(":"));
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.rpc("check_rate_limit", {
    p_key: keyHash,
    p_limit: rule.limit,
    p_window_seconds: rule.windowSeconds,
  });

  if (error) {
    console.error("Rate limit check failed:", error);
    // Fail closed for critical abuse controls. If this is too strict during
    // launch, alert on the error and temporarily switch this to fail open.
    return {
      allowed: false,
      remaining: 0,
      resetAt: new Date(Date.now() + rule.windowSeconds * 1000).toISOString(),
    };
  }

  const result = Array.isArray(data) ? data[0] : data;
  return {
    allowed: Boolean(result?.allowed),
    remaining: Number(result?.remaining ?? 0),
    resetAt: String(result?.reset_at ?? new Date(Date.now() + rule.windowSeconds * 1000).toISOString()),
  };
}

export async function rateLimitRequest(req: NextRequest, rules: RateLimitRule[]) {
  for (const rule of rules) {
    const result = await checkRateLimit(rule);

    if (!result.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfterSeconds(result.resetAt).toString(),
            "X-RateLimit-Limit": rule.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": result.resetAt,
          },
        }
      );
    }
  }

  return null;
}

export async function rateLimitKeys(req: NextRequest, route: string, subject?: string) {
  const ip = getClientIp(req);
  const subjectHash = subject ? await sha256(subject.toLowerCase().trim()) : "anonymous";

  return {
    ip,
    network: networkBucket(ip),
    subjectHash,
    route,
  };
}

function retryAfterSeconds(resetAt: string) {
  const reset = new Date(resetAt).getTime();
  if (Number.isNaN(reset)) return 60;
  return Math.max(1, Math.ceil((reset - Date.now()) / 1000));
}

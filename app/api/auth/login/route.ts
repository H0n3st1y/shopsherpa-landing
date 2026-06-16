import { NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, sessionCookie } from "@/lib/auth/session";
import { assertTrustedOrigin, corsHeaders, optionsResponse } from "@/lib/security/cors";
import { rateLimitKeys, rateLimitRequest } from "@/lib/security/rate-limit";
import { noStoreJson, safeLogError } from "@/lib/security/response";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function OPTIONS(req: NextRequest) {
  return optionsResponse(req);
}

export async function POST(req: NextRequest) {
  const originError = assertTrustedOrigin(req);
  if (originError) return originError;

  try {
    const { email, password } = await req.json();
    const cleaned = typeof email === "string" ? email.toLowerCase().trim() : "";

    if (!EMAIL_RE.test(cleaned) || typeof password !== "string") {
      return noStoreJson({ error: "Invalid email or password" }, { status: 400 });
    }

    const keys = await rateLimitKeys(req, "auth-login", cleaned);
    const limitError = await rateLimitRequest(req, [
      {
        name: "auth-login:email-ip",
        limit: 5,
        windowSeconds: 15 * 60,
        keyParts: [keys.route, keys.ip, keys.subjectHash],
      },
      {
        name: "auth-login:network",
        limit: 60,
        windowSeconds: 15 * 60,
        keyParts: [keys.route, keys.network],
      },
    ]);
    if (limitError) return limitError;

    const { data: user, error } = await getSupabaseAdmin()
      .from("app_users")
      .select("id, email, password_hash, status, email_verified_at")
      .eq("email", cleaned)
      .maybeSingle();

    if (error || !user || !verifyPassword(password, user.password_hash)) {
      return noStoreJson({ error: "Invalid email or password" }, { status: 401 });
    }

    if (user.status !== "verified" || !user.email_verified_at) {
      return noStoreJson({ error: "Verify your email before signing in" }, { status: 403 });
    }

    const rawSession = await createSession(user.id);
    const response = noStoreJson({ success: true });
    response.headers.set("Set-Cookie", sessionCookie(rawSession));
    for (const [key, value] of corsHeaders(req)) response.headers.set(key, value);
    return response;
  } catch (error) {
    safeLogError("Login route error", error);
    return noStoreJson({ error: "Server error" }, { status: 500 });
  }
}

import { NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getResend, FROM } from "@/lib/resend";
import { hashPassword } from "@/lib/auth/password";
import { newRawToken } from "@/lib/auth/session";
import { assertTrustedOrigin, corsHeaders, optionsResponse } from "@/lib/security/cors";
import { sha256 } from "@/lib/security/ip";
import { rateLimitKeys, rateLimitRequest } from "@/lib/security/rate-limit";
import { noStoreJson, safeLogError } from "@/lib/security/response";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 12;

export function OPTIONS(req: NextRequest) {
  return optionsResponse(req);
}

export async function POST(req: NextRequest) {
  const originError = assertTrustedOrigin(req);
  if (originError) return originError;

  try {
    const { email, password } = await req.json();
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return noStoreJson({ error: "Invalid email" }, { status: 400 });
    }
    if (!password || typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
      return noStoreJson({ error: "Password must be at least 12 characters" }, { status: 400 });
    }

    const cleaned = email.toLowerCase().trim();
    const keys = await rateLimitKeys(req, "auth-register", cleaned);
    const limitError = await rateLimitRequest(req, [
      {
        name: "auth-register:email-ip",
        limit: 5,
        windowSeconds: 15 * 60,
        keyParts: [keys.route, keys.ip, keys.subjectHash],
      },
      {
        name: "auth-register:network",
        limit: 40,
        windowSeconds: 15 * 60,
        keyParts: [keys.route, keys.network],
      },
    ]);
    if (limitError) return limitError;

    const supabase = getSupabaseAdmin();
    const { data: existingUser, error: existingError } = await supabase
      .from("app_users")
      .select("id, status")
      .eq("email", cleaned)
      .maybeSingle();

    if (existingError) {
      safeLogError("Registration user lookup failed", existingError);
      return noStoreJson({ error: "Could not create account" }, { status: 500 });
    }

    if (existingUser?.status === "verified") {
      // Generic success prevents account enumeration and avoids downgrading a
      // verified user back to unverified.
      return noStoreJson({ success: true, verificationRequired: true });
    }

    const passwordHash = hashPassword(password);
    const userMutation = existingUser
      ? supabase
          .from("app_users")
          .update({ password_hash: passwordHash, status: "unverified" })
          .eq("id", existingUser.id)
          .select("id, status")
          .single()
      : supabase
          .from("app_users")
          .insert({ email: cleaned, password_hash: passwordHash, status: "unverified" })
          .select("id, status")
          .single();

    const { data: user, error: userError } = await userMutation;

    if (userError || !user) {
      safeLogError("Registration user upsert failed", userError);
      return noStoreJson({ error: "Could not create account" }, { status: 500 });
    }

    const rawToken = newRawToken();
    const tokenHash = await sha256(rawToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30).toISOString();
    await supabase
      .from("email_verification_tokens")
      .delete()
      .eq("user_id", user.id)
      .is("used_at", null);

    const { error: tokenError } = await supabase.from("email_verification_tokens").insert({
      user_id: user.id,
      token_hash: tokenHash,
      expires_at: expiresAt,
    });

    if (tokenError) {
      safeLogError("Registration token insert failed", tokenError);
      return noStoreJson({ error: "Could not create verification token" }, { status: 500 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shopsherpa.org";
    const verifyUrl = `${siteUrl}/api/auth/verify?token=${encodeURIComponent(rawToken)}`;
    await getResend().emails.send({
      from: FROM,
      to: cleaned,
      subject: "Verify your ShopSherpa email",
      html: `
        <div style="font-family:-apple-system,system-ui,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#1a1a1a">
          <h1 style="font-size:24px;margin:0 0 16px">Verify your email</h1>
          <p style="line-height:1.6;color:#4a4a4a;margin:0 0 20px">Click the button below to activate your ShopSherpa account. This link expires in 30 minutes.</p>
          <a href="${verifyUrl}" style="display:inline-block;padding:12px 20px;background:#0d1f2d;color:white;text-decoration:none;border-radius:999px;font-weight:600">Verify email</a>
          <p style="line-height:1.6;color:#777;margin:24px 0 0;font-size:13px">If you did not request this, ignore this email.</p>
        </div>
      `,
    });

    const response = noStoreJson({ success: true, verificationRequired: true });
    for (const [key, value] of corsHeaders(req)) response.headers.set(key, value);
    return response;
  } catch (error) {
    safeLogError("Registration route error", error);
    return noStoreJson({ error: "Server error" }, { status: 500 });
  }
}

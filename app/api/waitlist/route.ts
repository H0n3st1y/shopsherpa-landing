import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getResend, FROM } from "@/lib/resend";
import { assertTrustedOrigin, corsHeaders, optionsResponse } from "@/lib/security/cors";
import { rateLimitKeys, rateLimitRequest } from "@/lib/security/rate-limit";
import { noStoreJson, safeLogError } from "@/lib/security/response";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function OPTIONS(req: NextRequest) {
  return optionsResponse(req);
}

export async function POST(req: NextRequest) {
  const originError = assertTrustedOrigin(req);
  if (originError) return originError;

  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const cleaned = email.toLowerCase().trim();
    const keys = await rateLimitKeys(req, "waitlist", cleaned);
    const limitError = await rateLimitRequest(req, [
      {
        name: "waitlist:email-ip",
        limit: 3,
        windowSeconds: 10 * 60,
        keyParts: [keys.route, keys.ip, keys.subjectHash],
      },
      {
        name: "waitlist:network",
        limit: 30,
        windowSeconds: 10 * 60,
        keyParts: [keys.route, keys.network],
      },
    ]);
    if (limitError) return limitError;

    // upsert prevents duplicate errors
    const { error } = await supabase
      .from("waitlist")
      .upsert({ email: cleaned, source: "landing" }, { onConflict: "email" });

    if (error) {
      safeLogError("Supabase waitlist error", error);
      return NextResponse.json({ error: "Could not save. Try again." }, { status: 500 });
    }

    // fire-and-forget welcome email
    try {
      const resend = getResend();
      await resend.emails.send({
        from: FROM,
        to: cleaned,
        subject: "You're on the ShopSherpa Plus list",
        html: `
          <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
            <h1 style="font-size: 24px; margin: 0 0 16px;">You're in.</h1>
            <p style="line-height: 1.6; color: #4a4a4a; margin: 0 0 16px;">
              Thanks for joining the Plus waitlist. We'll send you one note when Plus launches and one if the lifetime tier is about to sell out. Nothing else.
            </p>
            <p style="line-height: 1.6; color: #4a4a4a; margin: 0 0 24px;">
              If you don't want to wait, you can lock in lifetime access for $9.99 right now. There are 184 spots left.
            </p>
            <a href="https://shopsherpa.ai/#pricing" style="display: inline-block; padding: 12px 24px; background: #2e6273; color: white; text-decoration: none; border-radius: 999px; font-weight: 500;">
              Pre-order lifetime
            </a>
          <p style="line-height: 1.6; color: #888; margin: 32px 0 0; font-size: 13px;">
  Anghelo<br/>
  ShopSherpa
</p>
          </div>
        `,
      });
    } catch (emailErr) {
      safeLogError("Resend waitlist email error", emailErr);
      // Don't fail the request just because email failed
    }

    const response = noStoreJson({ success: true });
    for (const [key, value] of corsHeaders(req)) response.headers.set(key, value);
    return response;
  } catch (err) {
    safeLogError("Waitlist route error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

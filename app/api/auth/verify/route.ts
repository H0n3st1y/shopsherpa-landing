import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { createSession, sessionCookie } from "@/lib/auth/session";
import { sha256 } from "@/lib/security/ip";
import { safeLogError } from "@/lib/security/response";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shopsherpa.org";
  if (!token) return NextResponse.redirect(`${siteUrl}/?verified=invalid`);

  try {
    const tokenHash = await sha256(token);
    const supabase = getSupabaseAdmin();
    const { data: record, error } = await supabase
      .from("email_verification_tokens")
      .select("id, user_id, expires_at, used_at")
      .eq("token_hash", tokenHash)
      .is("used_at", null)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();

    if (error || !record) {
      return NextResponse.redirect(`${siteUrl}/?verified=expired`);
    }

    const now = new Date().toISOString();
    const { error: userError } = await supabase
      .from("app_users")
      .update({ status: "verified", email_verified_at: now })
      .eq("id", record.user_id);

    if (userError) throw userError;

    await supabase
      .from("email_verification_tokens")
      .update({ used_at: now })
      .eq("id", record.id);

    const rawSession = await createSession(record.user_id);
    const response = NextResponse.redirect(`${siteUrl}/?verified=success`);
    response.headers.set("Set-Cookie", sessionCookie(rawSession));
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    safeLogError("Verification route error", error);
    return NextResponse.redirect(`${siteUrl}/?verified=error`);
  }
}

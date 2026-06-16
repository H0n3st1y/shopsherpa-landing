import { NextRequest } from "next/server";
import { clearSessionCookie, SESSION_COOKIE } from "@/lib/auth/session";
import { getSupabaseAdmin } from "@/lib/supabase";
import { assertTrustedOrigin, optionsResponse } from "@/lib/security/cors";
import { sha256 } from "@/lib/security/ip";
import { noStoreJson } from "@/lib/security/response";

export const runtime = "nodejs";

export function OPTIONS(req: NextRequest) {
  return optionsResponse(req);
}

export async function POST(req: NextRequest) {
  const originError = assertTrustedOrigin(req);
  if (originError) return originError;

  const rawToken = req.cookies.get(SESSION_COOKIE)?.value;
  if (rawToken) {
    const tokenHash = await sha256(rawToken);
    await getSupabaseAdmin().from("app_sessions").delete().eq("token_hash", tokenHash);
  }

  const response = noStoreJson({ success: true });
  response.headers.set("Set-Cookie", clearSessionCookie());
  return response;
}

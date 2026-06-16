import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sha256 } from "@/lib/security/ip";

export const SESSION_COOKIE = "__Host-shopsherpa_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

export function newRawToken() {
  return randomBytes(32).toString("base64url");
}

export function sessionCookie(rawToken: string) {
  return [
    `${SESSION_COOKIE}=${rawToken}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Strict",
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
  ].join("; ");
}

export function clearSessionCookie() {
  return [
    `${SESSION_COOKIE}=`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Strict",
    "Max-Age=0",
  ].join("; ");
}

export async function createSession(userId: string) {
  const rawToken = newRawToken();
  const tokenHash = await sha256(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000).toISOString();

  const { error } = await getSupabaseAdmin()
    .from("app_sessions")
    .insert({ user_id: userId, token_hash: tokenHash, expires_at: expiresAt });

  if (error) throw error;
  return rawToken;
}

export async function requireVerifiedSessionFromRequest(req: NextRequest) {
  const rawToken = req.cookies.get(SESSION_COOKIE)?.value;
  if (!rawToken) return null;

  const tokenHash = await sha256(rawToken);
  const { data, error } = await getSupabaseAdmin()
    .from("app_sessions")
    .select("id, user_id, expires_at, app_users!inner(id, email, status, email_verified_at)")
    .eq("token_hash", tokenHash)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (error || !data) return null;
  const user = Array.isArray(data.app_users) ? data.app_users[0] : data.app_users;
  if (!user || user.status !== "verified" || !user.email_verified_at) return null;

  return { sessionId: data.id, user };
}

export async function requireVerifiedSession() {
  const rawToken = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!rawToken) return null;

  const tokenHash = await sha256(rawToken);
  const { data, error } = await getSupabaseAdmin()
    .from("app_sessions")
    .select("id, user_id, expires_at, app_users!inner(id, email, status, email_verified_at)")
    .eq("token_hash", tokenHash)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (error || !data) return null;
  const user = Array.isArray(data.app_users) ? data.app_users[0] : data.app_users;
  if (!user || user.status !== "verified" || !user.email_verified_at) return null;

  return { sessionId: data.id, user };
}

import type { NextRequest } from "next/server";

const TRUST_PROXY_HEADERS = process.env.TRUST_PROXY_HEADERS === "true";

function normalizeIp(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  // Strip IPv6 brackets and IPv4 port suffixes.
  if (trimmed.startsWith("[") && trimmed.includes("]")) {
    return trimmed.slice(1, trimmed.indexOf("]"));
  }

  const ipv4WithPort = trimmed.match(/^(\d{1,3}(?:\.\d{1,3}){3}):\d+$/);
  if (ipv4WithPort) return ipv4WithPort[1];

  return trimmed;
}

function firstForwardedIp(headerValue: string | null) {
  if (!headerValue) return "";
  return normalizeIp(headerValue.split(",")[0] ?? "");
}

export function getClientIp(req: NextRequest) {
  // On Vercel, x-vercel-forwarded-for is injected by the platform. Only trust
  // forwarded headers when the deployment is behind a trusted proxy/CDN.
  const vercelIp = firstForwardedIp(req.headers.get("x-vercel-forwarded-for"));
  if (vercelIp) return vercelIp;

  if (TRUST_PROXY_HEADERS) {
    const forwardedFor = firstForwardedIp(req.headers.get("x-forwarded-for"));
    if (forwardedFor) return forwardedFor;

    const realIp = normalizeIp(req.headers.get("x-real-ip") ?? "");
    if (realIp) return realIp;

    const cfIp = normalizeIp(req.headers.get("cf-connecting-ip") ?? "");
    if (cfIp) return cfIp;
  }

  return "unknown";
}

export function networkBucket(ip: string) {
  if (ip === "unknown") return ip;

  // For IPv4 shared networks, use a /24 bucket only for broad abuse limits.
  // Route-specific limits should combine this with a user/email key to avoid
  // punishing everyone at a university, office, or cafe.
  const ipv4 = ip.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.\d{1,3}$/);
  if (ipv4) return `${ipv4[1]}.${ipv4[2]}.${ipv4[3]}.0/24`;

  // Coarse IPv6 /64-ish bucket.
  if (ip.includes(":")) return ip.split(":").slice(0, 4).join(":");

  return ip;
}

export async function sha256(input: string) {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

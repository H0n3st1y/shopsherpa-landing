import { NextResponse, type NextRequest } from "next/server";

const defaultOrigins = [
  "https://shopsherpa.org",
  "https://www.shopsherpa.org",
  "https://shopsherpa.ai",
  "https://www.shopsherpa.ai",
];

export function trustedOrigins() {
  const configured = process.env.TRUSTED_ORIGINS?.split(",").map((origin) => origin.trim()).filter(Boolean);
  return configured?.length ? configured : defaultOrigins;
}

export function isTrustedOrigin(origin: string | null) {
  if (!origin) return true;
  return trustedOrigins().includes(origin);
}

export function assertTrustedOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!isTrustedOrigin(origin)) {
    return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  }
  return null;
}

export function corsHeaders(req: NextRequest) {
  const origin = req.headers.get("origin");
  const headers = new Headers();

  if (origin && isTrustedOrigin(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
  }

  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, Stripe-Signature");
  headers.set("Access-Control-Max-Age", "600");

  return headers;
}

export function optionsResponse(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

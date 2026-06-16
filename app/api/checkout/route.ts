import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { requireVerifiedSessionFromRequest } from "@/lib/auth/session";
import { assertTrustedOrigin, corsHeaders, optionsResponse } from "@/lib/security/cors";
import { rateLimitKeys, rateLimitRequest } from "@/lib/security/rate-limit";
import { noStoreJson, safeLogError } from "@/lib/security/response";

export function OPTIONS(req: NextRequest) {
  return optionsResponse(req);
}

export async function POST(req: NextRequest) {
  const originError = assertTrustedOrigin(req);
  if (originError) return originError;

  try {
    const keys = await rateLimitKeys(req, "checkout");
    const limitError = await rateLimitRequest(req, [
      {
        name: "checkout:ip",
        limit: 5,
        windowSeconds: 15 * 60,
        keyParts: [keys.route, keys.ip],
      },
      {
        name: "checkout:network",
        limit: 50,
        windowSeconds: 15 * 60,
        keyParts: [keys.route, keys.network],
      },
    ]);
    if (limitError) return limitError;

    if (process.env.REQUIRE_VERIFIED_FOR_CHECKOUT === "true") {
      const session = await requireVerifiedSessionFromRequest(req);
      if (!session) {
        return noStoreJson({ error: "Verify your email before checkout" }, { status: 403 });
      }
    }

    const stripe = getStripe();
    const priceId = process.env.STRIPE_PRICE_ID;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    if (!priceId) {
      return NextResponse.json({ error: "Missing price ID" }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#pricing`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      customer_creation: "always",
      metadata: { product: "plus_lifetime" },
    });

    const response = noStoreJson({ url: session.url });
    for (const [key, value] of corsHeaders(req)) response.headers.set(key, value);
    return response;
  } catch (err) {
    safeLogError("Checkout route error", err);
    return NextResponse.json({ error: "Could not create session" }, { status: 500 });
  }
}

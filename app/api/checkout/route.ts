import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  try {
    const stripe = getStripe();
    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;
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

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Could not create session" }, { status: 500 });
  }
}

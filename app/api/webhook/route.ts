import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getResend, FROM } from "@/lib/resend";
import { noStoreJson, safeLogError } from "@/lib/security/response";
import type Stripe from "stripe";

export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    safeLogError("Webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email || session.customer_email;
    const amount = session.amount_total;

    if (email) {
      try {
        const supabase = getSupabaseAdmin();
        await supabase.from("preorders").upsert(
          {
            email: email.toLowerCase(),
            stripe_session_id: session.id,
            amount_cents: amount,
            status: "paid",
          },
          { onConflict: "stripe_session_id" }
        );

        // Confirmation email
        const resend = getResend();
        await resend.emails.send({
          from: FROM,
          to: email,
          subject: "Welcome to ShopSherpa",
          html: `
            <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
              <h1 style="font-size: 24px; margin: 0 0 16px;">You're in. For life.</h1>
              <p style="line-height: 1.6; color: #4a4a4a; margin: 0 0 16px;">
                Thanks for backing ShopSherpa. Your $9.99 locks in lifetime access. You'll never see a monthly bill from us.
              </p>
              <p style="line-height: 1.6; color: #4a4a4a; margin: 0 0 16px;">
                Beta access opens July 2026. We'll email you when it's ready, plus once or twice between now and then with progress updates. Nothing else.
              </p>
              <p style="line-height: 1.6; color: #4a4a4a; margin: 0 0 24px;">
                If anything feels off in the next 30 days, reply to this email or write to refund@shopsherpa.ai. Full refund, no questions.
              </p>
              <p style="line-height: 1.6; color: #888; margin: 32px 0 0; font-size: 13px;">
                Anghelo <br/>
                ShopSherpa
              </p>
            </div>
          `,
        });
      } catch (e) {
        safeLogError("Webhook side-effect error", e);
      }
    }
  }

  return noStoreJson({ received: true });
}

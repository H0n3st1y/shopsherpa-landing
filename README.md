# ShopSherpa Landing — Deployment Manual

This is the full playbook to take this codebase from your laptop to a live, professional site at shopsherpa.ai. Allow about 2-3 hours total. Most of that is waiting for DNS to propagate.

## What you're shipping

- A Next.js 15 landing page (App Router, Tailwind v4)
- Email waitlist capture (Resend + Supabase)
- Stripe Checkout for the $9.99 lifetime pre-order
- Real database for waitlist + preorders
- Confirmation emails for both
- SEO (sitemap, robots, OG tags)

## Order of operations

1. Buy a domain
2. Create accounts (Vercel, Supabase, Stripe, Resend, Cloudflare)
3. Local setup
4. Database (Supabase)
5. Payments (Stripe)
6. Email (Resend)
7. Deploy to Vercel
8. Connect domain
9. Email DNS (DKIM, SPF, DMARC)
10. Stripe webhook
11. Analytics
12. Pre-launch checklist

---

## 1. Buy a domain

You said you need one. Quick recs.

**Where to buy.** Use **Cloudflare Registrar** (cloudflare.com/products/registrar). Domains sell at wholesale cost. No upsells, no fake discounts that double on year two. A `.ai` domain runs around $70/year there. Compare to Namecheap or GoDaddy where you'll pay $90-120 with hidden renewal fees.

**Second choice:** Namecheap if Cloudflare doesn't carry the TLD you want.

**Avoid:** GoDaddy (overpriced, aggressive upsells), Google Domains (shut down, redirected to Squarespace which is now expensive).

**What to buy.**
- `shopsherpa.ai` is the obvious pick. You're already using anghelo@shopsherpa.ai, so you might own it. Confirm.
- If `.ai` is too expensive long-term, `.com` or `.io` work too. `.app` is decent.
- Buy `shopsherpa.com` too if it's available and under $20. It defends the brand.

**One-time setup.** When buying, decline every upsell. You don't need WHOIS protection (Cloudflare includes it free). You don't need email hosting from the registrar. You don't need SSL (Vercel and Cloudflare both give it free).

---

## 2. Create the accounts

All of these are free to start. Only Stripe charges per transaction.

| Service | Why | Cost at your stage |
|---|---|---|
| Vercel | Hosting | Free |
| Supabase | Database | Free (up to 500MB) |
| Stripe | Payments | 2.9% + $0.30 per sale |
| Resend | Transactional email | Free (3K/month) |
| Cloudflare | DNS + email | Free |
| PostHog | Analytics | Free (1M events/month) |

Use **anghelo@shopsherpa.ai** for all of these so account ownership is clean.

---

## 3. Local setup

```bash
# Clone or copy these files into a fresh folder, then:
cd shopsherpa-landing
npm install
cp .env.example .env.local
```

Open `.env.local` and leave it open. You'll fill it in as you go.

To run locally once env is configured:
```bash
npm run dev
# Visit http://localhost:3000
```

---

## 4. Database — Supabase

1. Go to **supabase.com** and create a new project.
2. Pick the **closest region** to your users (US East if your users are mostly American).
3. Generate a strong database password and save it in 1Password or your password manager.
4. Wait ~2 minutes for provisioning.

Once it's ready:

5. Go to **SQL Editor → New Query**.
6. Paste the contents of `supabase-schema.sql` from this repo.
7. Click **Run**.
8. You should see `Success. No rows returned.`

Then grab your keys:

9. Go to **Project Settings → API**.
10. Copy these into `.env.local`:
    - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
    - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

The service role key is sensitive. Never put it in client code. Never commit it. The `.gitignore` in this repo handles that, but don't paste it in Discord screenshots.

---

## 5. Payments — Stripe

1. Go to **stripe.com**, sign up.
2. **Stay in test mode** for setup. Production later.
3. Go to **Products → Add Product**:
   - Name: `ShopSherpa Plus — Lifetime`
   - Description: `Pre-order lifetime access to ShopSherpa Plus`
   - Pricing: `One-time`, `$9.99 USD`
4. Save. Copy the **Price ID** (starts with `price_`). Paste into `.env.local` as `NEXT_PUBLIC_STRIPE_PRICE_ID`.Proje
5. Go to **Developers → API keys**. Copy the **Secret key** (test mode, `sk_test_`). Paste as `STRIPE_SECRET_KEY`.

Webhook setup comes later, after deploy. Skip for now.

**When you're ready to take real money:** flip Stripe out of test mode (top-right toggle), repeat steps 3-5 with the live mode keys, swap `.env` values in Vercel.

---

## 6. Email — Resend

1. Go to **resend.com**, sign up.
2. **API Keys → Create API Key**. Name it `production`. Copy. Paste as `RESEND_API_KEY` in `.env.local`.

Domain verification has to wait until your domain DNS is set up. Skip for now. We'll come back.

In `.env.local` set `RESEND_FROM_EMAIL=hello@shopsherpa.ai`. Won't work yet but will after DNS step.

---

## 7. Deploy to Vercel

1. Push your code to GitHub. (Make a private repo. `git init && git add . && git commit -m "first" && gh repo create --private --source=.` if you have the GitHub CLI.)
2. Go to **vercel.com → Import Project**.
3. Pick your repo. Vercel auto-detects Next.js.
4. Before clicking deploy, expand **Environment Variables**.
5. Paste every key from `.env.local` (except the `NEXT_PUBLIC_SITE_URL`, set it to the Vercel preview URL for now or leave it).
6. Click **Deploy**.

Wait ~90 seconds. You'll get a `your-project.vercel.app` URL. Test it. The waitlist form should work. Stripe checkout should work in test mode.

If it doesn't, check **Vercel → your project → Logs**. Real errors show up there.

---

## 8. Connect your domain

In Vercel:

1. **Project → Settings → Domains → Add**.
2. Type `shopsherpa.ai`. Vercel will show you DNS records to add.

In Cloudflare (if you bought there):

3. Go to **DNS → Records**.
4. Add the records Vercel gave you. Usually:
   - Type `A`, name `@`, value `76.76.21.21`
   - Type `CNAME`, name `www`, value `cname.vercel-dns.com`
5. Set the proxy status to **DNS only** (gray cloud). Vercel handles SSL itself. If you orange-cloud it, things sometimes break.

Wait. DNS propagates in 1-60 minutes typically. Visit `shopsherpa.ai`. Should load. You should see a green padlock (Vercel auto-provisions SSL via Let's Encrypt).

Now update `NEXT_PUBLIC_SITE_URL=https://shopsherpa.ai` in Vercel env vars and redeploy.

---

## 9. Email DNS — DKIM, SPF, DMARC

This is the part most founders skip. Then their launch email goes to spam and conversion drops 40%. Don't skip.

Back to **Resend**:

1. **Domains → Add Domain → shopsherpa.ai**.
2. Resend gives you 4-5 DNS records to add: a DKIM record, an SPF record, and a DMARC record.

Back to **Cloudflare → DNS**:

3. Copy each record exactly. They look like:
   - `TXT`, `resend._domainkey`, `p=MIGfMA0GC...`
   - `TXT`, `@`, `v=spf1 include:_spf.resend.com ~all`
   - `TXT`, `_dmarc`, `v=DMARC1; p=none; rua=mailto:hello@shopsherpa.ai`
4. Save each one. Wait ~5 minutes.
5. Back in Resend, click **Verify**. All 5 should turn green.

Now `hello@shopsherpa.ai` can send mail with proper authentication. Inbox placement will be solid.

**Test it.** Send yourself an email via the waitlist form. Check Gmail's "Show original" → look for `DKIM=PASS`, `SPF=PASS`, `DMARC=PASS`. If any fails, the corresponding DNS record is wrong.

---

## 10. Stripe webhook

Now that your site is live, set up the webhook so payments actually get recorded.

1. **Stripe Dashboard → Developers → Webhooks → Add endpoint**.
2. Endpoint URL: `https://shopsherpa.ai/api/webhook`
3. Events to send: `checkout.session.completed`
4. Save. Copy the **Signing secret** (starts with `whsec_`).
5. Add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`. Redeploy.

Test it. Use Stripe's test mode and the `4242 4242 4242 4242` test card. After payment:
- Check your Supabase `preorders` table — there should be a new row.
- Check the email — confirmation should arrive.

---

## 11. Analytics

PostHog is free up to 1M events/month and is the modern replacement for Google Analytics + Hotjar combined.

1. Sign up at **posthog.com**.
2. Project Settings → copy the API key and host.
3. Add to Vercel env vars:
   - `NEXT_PUBLIC_POSTHOG_KEY=phc_...`
   - `NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com`

To wire it up, install the package and add a small initializer. Run locally:
```bash
npm install posthog-js
```

Then add a `components/Analytics.tsx` client component that initializes PostHog on mount, and import it in `layout.tsx`. (Skipped from this codebase to keep it minimal. Add when ready.)

---

## 12. Pre-launch checklist

Before you tweet about it, run through this:

- [ ] Domain loads at https://shopsherpa.ai (no www-only)
- [ ] SSL padlock is green
- [ ] Waitlist form submits and you get a welcome email
- [ ] Welcome email is NOT in spam (check Gmail and Outlook)
- [ ] Stripe test purchase works end to end
- [ ] Confirmation email arrives after purchase
- [ ] Supabase shows the row in `preorders`
- [ ] Mobile layout doesn't break (test on your phone)
- [ ] Page loads in under 2 seconds (Vercel Speed Insights tab)
- [ ] OG image renders when you paste the URL in iMessage/Slack/Twitter
- [ ] Stripe is in **live mode** (not test) when you go public
- [ ] Replace `chrome.google.com/webstore/` link with your real extension URL
- [ ] Update the "184 spots left" counter to your actual remaining spots
- [ ] Spam-test the launch email at mail-tester.com (aim for 9+/10)

---

## 13. The OG image

You need a 1200x630 PNG at `/public/og-image.png`. This is what shows when someone shares your link on Twitter, iMessage, Slack, anywhere.

Quick options:
- **Figma**, 1200x630 frame, paste your hero copy with the brand colors, export.
- **Canva**, "Twitter Post" template at 1200x675, crop to 1200x630.
- **og-image.vercel.app** for an automated approach if you don't have time.

Drop it at `public/og-image.png`. Vercel auto-serves it.

---

## 14. Costs at scale

Just so you know what's coming.

| Users / month | Vercel | Supabase | Resend | Stripe | Total |
|---|---|---|---|---|---|
| 0–1,000 | $0 | $0 | $0 | $0 (no sales yet) | $0 |
| 1k–10k | $0 | $0 | $0 | ~3% of revenue | $0 + Stripe fees |
| 10k–100k | $20 (Pro) | $25 (Pro) | $20 | ~3% of revenue | $65 + Stripe fees |

Don't pre-pay. Don't upgrade. Stay free until you hit a real ceiling.

---

## 15. The first weekend after launch

The most common founder mistake is launching and then ghosting. Don't.

Day 1: Tweet, post on r/Scams (don't shill, just tell the story), email your 2,000 beta users.

Day 2: Watch the dashboard hourly. Reply to every email. Fix any bug within 4 hours.

Day 3: Post the launch in 3-5 relevant subreddits with genuinely useful content.

Day 7: Email everyone who joined the waitlist but didn't pay yet. Soft nudge: "still 100 lifetime spots left."

The page is just the start. Distribution is the rest.

---

## Help

If something breaks:
- Vercel logs: `vercel.com/your-project/logs`
- Supabase logs: dashboard → Logs → API
- Stripe events: dashboard → Developers → Events
- Resend deliverability: dashboard → Logs

If you get stuck for more than 30 minutes on one thing, post the exact error in the ShopSherpa Discord or email it to yourself at angheloaraujo@gmail.com so you can ask Claude / Cursor about it later.

Good luck. Ship it this weekend.

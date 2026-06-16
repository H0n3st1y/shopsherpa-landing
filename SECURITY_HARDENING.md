# ShopSherpa Production Security Hardening

This project is a Next.js App Router application hosted like a Vercel deployment, with Supabase, Stripe, Resend, and optional PostHog. The hardening below keeps secrets server-side, adds rate limits, introduces email verification, and applies strict browser/security controls.

## 1. Deploy The Database Changes

Run the full contents of `supabase-schema.sql` in the Supabase SQL Editor.

This creates:

- `app_users` for restricted application accounts
- `email_verification_tokens` for time-limited verification links
- `app_sessions` for hashed server-side sessions
- `rate_limits` plus `check_rate_limit(...)` for server-side throttling
- Row Level Security on all application tables, with no public policies

The application expects to access these tables only with `SUPABASE_SERVICE_ROLE_KEY` from server code.

## 2. Configure Production Environment Variables

Set these in the hosting provider. Keep every non-`NEXT_PUBLIC_` value server-only.

```bash
NEXT_PUBLIC_SITE_URL=https://shopsherpa.org
TRUSTED_ORIGINS=https://shopsherpa.org,https://www.shopsherpa.org,https://shopsherpa.ai,https://www.shopsherpa.ai
TRUST_PROXY_HEADERS=true

NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...
REQUIRE_VERIFIED_FOR_CHECKOUT=true

RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=hello@shopsherpa.ai

OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Do not expose Supabase service-role, Stripe secret, webhook, Resend, OpenAI, Anthropic, or database credentials with a `NEXT_PUBLIC_` prefix.

## 3. Rate Limiting And Proxy Trust

Rate limiting is implemented in `lib/security/rate-limit.ts` and `lib/security/ip.ts`.

Protected routes:

- `POST /api/auth/register`: 5 email/IP attempts per 15 minutes, plus a broader network bucket
- `POST /api/auth/login`: 5 email/IP attempts per 15 minutes, plus a broader network bucket
- `POST /api/waitlist`: 3 form submissions per email/IP per 10 minutes, plus a broader network bucket
- `POST /api/checkout`: 5 attempts per IP per 15 minutes, plus a broader network bucket
- `POST /api/llm/analyze-scam`: 10 requests per IP per 15 minutes, plus a broader network bucket

`TRUST_PROXY_HEADERS=true` should only be enabled behind a trusted platform such as Vercel or a known CDN. The code prefers Vercel's forwarded IP header and uses broader network buckets to reduce abuse without immediately punishing an entire university, office, or cafe network.

## 4. Email Verification And Access Control

Account flows live in:

- `app/api/auth/register/route.ts`
- `app/api/auth/verify/route.ts`
- `app/api/auth/login/route.ts`
- `app/api/auth/logout/route.ts`
- `lib/auth/password.ts`
- `lib/auth/session.ts`

Registration creates an `unverified` user, stores a hashed verification token, and sends a Resend email. Verification links expire after 30 minutes. Login and protected resource checks require `status = 'verified'` and `email_verified_at` to be present.

Sessions use a `__Host-shopsherpa_session` cookie with:

- `Secure`
- `HttpOnly`
- `SameSite=Strict`
- `Path=/`
- no `Domain` attribute

When `REQUIRE_VERIFIED_FOR_CHECKOUT=true`, `/api/checkout` blocks unverified users before creating Stripe sessions.

## 5. Backend Proxies And Secret Isolation

External secrets are only read in server route handlers.

- Stripe checkout is proxied through `app/api/checkout/route.ts`
- LLM scam analysis is proxied through `app/api/llm/analyze-scam/route.ts`
- Resend email calls happen server-side during registration and waitlist flow

Frontend code should call your own `/api/...` routes. It should never call Stripe secret APIs, Resend, OpenAI, Anthropic, or Supabase service-role operations directly.

## 6. Security Headers And CSP Nonces

`middleware.ts` generates a cryptographically random nonce per request and sets strict headers:

- `Content-Security-Policy` with `script-src 'nonce-...'`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` disabling camera, microphone, geolocation, payment, USB, and other unnecessary browser features
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-origin`

Pages with inline JSON-LD read the nonce from `x-nonce` and attach it to their `<script>` tags.

## 7. Infrastructure Hardening

`middleware.ts` blocks direct requests for common sensitive files and folders:

- `.env`
- `.git`
- `package.json`
- lockfiles
- TypeScript and Next config files
- `node_modules`

Next.js is also configured to suppress `X-Powered-By`. API error handling avoids leaking stack traces to clients; operational details are logged server-side with generic public responses.

## 8. CORS

CORS is explicit and origin-based in `lib/security/cors.ts`. Production origins come from `TRUSTED_ORIGINS`.

Do not use `Access-Control-Allow-Origin: *` for authenticated, billing, account, or form-submission routes.

## 9. External Assets And SRI

Prefer package-managed dependencies over CDN scripts. If you must add a CDN script, pin its version and include Subresource Integrity:

```html
<script
  src="https://cdn.example.com/library/1.2.3/library.min.js"
  integrity="sha384-REPLACE_WITH_REAL_HASH"
  crossorigin="anonymous"
  nonce="{nonce}"
></script>
```

Generate the hash from the exact downloaded asset and update it whenever the CDN URL changes.

## 10. Verification

Before production deploy:

```bash
npm run build
```

Then manually verify:

- `/api/auth/register` sends a verification email
- `/api/auth/verify?token=...` verifies and sets the session cookie
- `/api/auth/login` rejects unverified users
- `/api/checkout` rejects unverified users when `REQUIRE_VERIFIED_FOR_CHECKOUT=true`
- Repeated login/register/waitlist submissions return HTTP 429
- Browser response headers include CSP, HSTS, X-Frame-Options, and Permissions-Policy

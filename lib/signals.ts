/**
 * ShopSherpa Signal Functions
 *
 * Each function examines one aspect of the URL, domain, or page hints and
 * returns zero or more EvidenceItem values. Evidence items are fed into the
 * decision engine (lib/evidence.ts) — they never directly determine the band.
 *
 * Evidence tier catalogue
 * ────────────────────────
 *   strong_safe  ← verified_merchant, long_lived_domain, allowed_checkout_domain
 *   strong_danger← spoof_pattern, checkout_redirect, malicious_feed_hit (threat feed)
 *   medium       ← visual_risk, review_authenticity, pricing_anomaly
 *   weak         ← urgency_wording, risky_tld, dropship_marker, thin_policies
 *
 * Backward-compat mapping
 * ────────────────────────
 * The API response still contains a Signal[] for the extension frontend.
 * Call `evidenceToSignals()` at the bottom of this file to map evidence
 * items → the six legacy signal IDs the extension expects.
 */

import type { Signal, SignalId } from './types.js';
import type { EvidenceItem } from './evidence.js';
import { lookupMerchant } from './merchants.js';
import { lookupThreatFeed } from './threat-feed.js';

// ---------------------------------------------------------------------------
// Domain heuristics (shared constants, identical to previous route.ts)
// ---------------------------------------------------------------------------

export const RISKY_TLDS = new Set([
  'shop', 'store', 'top', 'xyz', 'discount', 'sale', 'deals',
  'bid', 'click', 'work', 'gq', 'ml', 'cf', 'ga', 'tk',
]);

/**
 * Generic-commerce TLDs whose storefronts are disproportionately dropship/reship
 * fronts. Narrower than RISKY_TLDS on purpose — used only by the weak dropship
 * heuristic, so it must not be noisy.
 */
export const DROPSHIP_TLDS = new Set([
  'shop', 'store', 'online', 'shopping',
]);

export const SPOOF_PATTERNS = [
  /-(secure|login|verify|account|update|official)/i,
  /(paypal|amazon|apple|google|microsoft|ebay|walmart)-/i,
  /checkout-/i,
  /secure\w{0,6}-/i,
];

export const TRUSTED_DOMAIN_PATTERNS = [
  /^(www\.)?(amazon|ebay|walmart|target|bestbuy|apple|google|microsoft|nike|adidas|paypal|shopify)\.(com|co\.uk|ca|com\.au)$/i,
];

export interface ParsedUrl {
  hostname: string;
  domain: string;   // last two labels, e.g. "amazon.com"
  tld: string;
  path: string;
}

export function parseUrl(rawUrl: string): ParsedUrl {
  const u = new URL(rawUrl);
  const hostname = u.hostname.toLowerCase();
  const parts    = hostname.split('.');
  const tld      = parts[parts.length - 1];
  const domain   = parts.slice(-2).join('.');
  return { hostname, domain, tld, path: u.pathname };
}

export interface PageHints {
  hasCheckoutForm:    boolean;
  hasPaymentRedirect: boolean;
  reviewWidgetCount:  number;
  priceCount:         number;
  hasUrgencyMarkers:  boolean;
  brandMentions:      string[];
}

// ---------------------------------------------------------------------------
// ── Strong-safe signals ────────────────────────────────────────────────────
// ---------------------------------------------------------------------------

/**
 * Emit strong-safe evidence when the domain is in the verified merchant registry.
 *
 * Spoofed domains (e.g. "amazon-login-secure.shop") never match because their
 * registrable domain differs from "amazon.com". The registry lookup is
 * exact-match on the registrable domain — no prefix or fuzzy matching.
 */
export function signalVerifiedMerchant(domain: string): EvidenceItem | null {
  const merchant = lookupMerchant(domain);
  if (!merchant) return null;
  return {
    id:         'verified_merchant',
    tier:       'strong',
    direction:  'safe',
    confidence: 0.98,
    label:      `Verified merchant — ${merchant.displayName}`,
    detail:     `${domain} is registered in the ShopSherpa verified-merchant registry.`,
  };
}

/**
 * Emit strong-safe evidence for established brand domains that match a known
 * long-lived domain pattern (TRUSTED_DOMAIN_PATTERNS).
 *
 * This is separate from verified_merchant: the registry is authoritative,
 * while this heuristic uses regex patterns to recognise common brand domains
 * not in the registry. The confidence is slightly lower.
 */
export function signalLongLivedDomain(hostname: string): EvidenceItem | null {
  if (!TRUSTED_DOMAIN_PATTERNS.some(re => re.test(hostname))) return null;
  return {
    id:         'long_lived_domain',
    tier:       'strong',
    direction:  'safe',
    confidence: 0.92,
    label:      'Established brand domain',
    detail:     'This domain matches a known long-lived brand pattern.',
  };
}

/**
 * Emit strong-safe evidence when a checkout form is present on the merchant's
 * own domain with no payment redirect to a third party.
 *
 * Only fires when the merchant is verified AND hasCheckoutForm is true AND
 * hasPaymentRedirect is false — meaning checkout stays on the same domain.
 */
export function signalAllowedCheckoutDomain(
  domain: string,
  hints: PageHints,
): EvidenceItem | null {
  const merchant = lookupMerchant(domain);
  if (!merchant) return null;
  if (!hints.hasCheckoutForm) return null;
  if (hints.hasPaymentRedirect) return null;  // handled by checkout_redirect instead
  return {
    id:         'allowed_checkout_domain',
    tier:       'strong',
    direction:  'safe',
    confidence: 0.90,
    label:      'Checkout on verified domain',
    detail:     `Payment form present and staying on ${domain} — no redirect to another domain.`,
  };
}

// ---------------------------------------------------------------------------
// ── Strong-danger signals ──────────────────────────────────────────────────
// ---------------------------------------------------------------------------

/**
 * Threat-feed lookup — matches the URL's hostname against the categorized
 * blocklist (lib/threat-feed.ts, seeded from OpenPhish + scam-shop/dropship
 * feeds via scripts/ingest-threat-feed.mjs).
 *
 * Tier by category:
 *   phishing | scam_shop  → STRONG danger  (malicious_feed_hit)
 *   dropship_reship       → WEAK   danger  (dropship_marker — legal-but-risky)
 *
 * Matching is on the full hostname so shared-hosting tenants (foo.vercel.app)
 * are blocked individually, never by collapsing to the platform domain.
 *
 * Verified-merchant guard: a verified merchant is never condemned by the feed.
 * If a verified merchant's host ever appeared in a feed it would be a data
 * error, not grounds to flip a trusted domain to danger (tier-safety invariant).
 * Genuine anomalies on verified merchants are still caught by checkout_redirect.
 */
export function signalThreatFeedHit(parsed: ParsedUrl): EvidenceItem | null {
  if (lookupMerchant(parsed.domain)) return null;

  const hit = lookupThreatFeed(parsed.hostname);
  if (!hit) return null;

  if (hit.category === 'dropship_reship') {
    return {
      id:         'dropship_marker',
      tier:       'weak',
      direction:  'danger',
      confidence: 0.5,
      label:      'Listed as a dropship/reship storefront',
      detail:     'This domain is on a dropship/reship watchlist — goods are likely relisted from a marketplace. Compare price and shipping time before buying.',
    };
  }

  const isShop = hit.category === 'scam_shop';
  return {
    id:         'malicious_feed_hit',
    tier:       'strong',
    direction:  'danger',
    confidence: 0.95,
    label:      isShop ? 'Known scam storefront' : 'Known phishing site',
    detail:     isShop
      ? 'This domain appears on a confirmed scam/counterfeit-store blocklist. Do not enter payment or personal details.'
      : 'This domain appears on a confirmed phishing blocklist. Do not enter login or payment details.',
  };
}

/**
 * Emit strong-danger evidence when the registrable domain matches a known
 * impersonation pattern.
 *
 * Examples: "amazon-login-secure.shop", "paypal-verify.top", "apple-account.xyz"
 * These are deterministic regex matches — high precision, minimal false positives.
 */
export function signalSpoofPattern(domain: string, hostname: string): EvidenceItem | null {
  if (SPOOF_PATTERNS.some(re => re.test(domain))) {
    return {
      id:         'spoof_pattern',
      tier:       'strong',
      direction:  'danger',
      confidence: 0.88,
      label:      'Brand-impersonation domain pattern',
      detail:     'The domain name matches patterns used by phishing sites to imitate known brands.',
    };
  }
  // Also flag unusually long domains (common in IDN homograph attacks)
  const labels = hostname.split('.');
  if (labels.some(l => l.length > 24) || hostname.length > 55) {
    return {
      id:         'spoof_pattern',
      tier:       'weak',
      direction:  'danger',
      confidence: 0.52,
      label:      'Unusually long domain name',
      detail:     'Unusually long domain name — verify the brand carefully before checkout.',
    };
  }
  return null;
}

/**
 * Emit strong-danger evidence when the page signals a payment redirect to a
 * different domain.
 *
 * This is a high-precision signal: legitimate merchants do not send you to
 * an unrelated domain at checkout. Even on a verified merchant (e.g. amazon.com),
 * a payment redirect is anomalous and overrides the trust layer.
 */
export function signalCheckoutRedirect(hints: PageHints): EvidenceItem | null {
  if (!hints.hasPaymentRedirect) return null;
  return {
    id:         'checkout_redirect',
    tier:       'strong',
    direction:  'danger',
    confidence: 0.82,
    label:      'Unrelated payment redirect',
    detail:     'Checkout appears to redirect to a different domain for payment processing.',
  };
}

// ---------------------------------------------------------------------------
// ── Medium signals ─────────────────────────────────────────────────────────
// ---------------------------------------------------------------------------

/**
 * Emit medium-danger evidence from the binary visual-risk CNN.
 *
 * The visual model's band is passed in (already thresholded from the raw
 * probability). 'low' produces no evidence item — the model is silent when
 * risk is low, never actively clearing danger from other signals.
 *
 * NOTE: Because this is medium tier, visual risk alone cannot produce danger
 * for a verified merchant (Rule 2 suppresses it to caution).
 */
export function signalVisualRisk(
  visualBand: 'low' | 'caution' | 'danger',
  probability: number,
): EvidenceItem | null {
  if (visualBand === 'low') return null;
  return {
    id:         'visual_risk',
    tier:       'medium',
    direction:  'danger',
    confidence: probability,
    label:      visualBand === 'danger' ? 'High visual phishing risk' : 'Elevated visual risk',
    detail:     visualBand === 'danger'
      ? 'Page appearance resembles known phishing layouts in the training dataset.'
      : 'Page appearance shows elevated similarity to phishing patterns.',
  };
}

/**
 * Emit medium-danger evidence when review-widget count suggests fake reviews.
 *
 * Zero reviews: unverifiable — weak signal only.
 * Three or more review widgets: over-engineered social proof — medium concern.
 * One or two: normal — no evidence emitted.
 */
export function signalReviewAuthenticity(hints: PageHints): EvidenceItem | null {
  if (hints.reviewWidgetCount === 0) {
    return {
      id:         'review_authenticity',
      tier:       'weak',
      direction:  'danger',
      confidence: 0.42,
      label:      'No review widget detected',
      detail:     'No review widget found — authenticity cannot be verified from this scan.',
    };
  }
  if (hints.reviewWidgetCount >= 3) {
    return {
      id:         'review_authenticity',
      tier:       'medium',
      direction:  'danger',
      confidence: 0.62,
      label:      'Excessive review widgets',
      detail:     `${hints.reviewWidgetCount} review widgets detected — over-engineering social proof is common in scam stores.`,
    };
  }
  return null;  // 1–2 widgets: normal, no signal emitted
}

/**
 * Emit medium-danger evidence when many discounted prices coincide with urgency.
 *
 * The combination of priceCount ≥ 10 AND hasUrgencyMarkers is the precise
 * pattern used by fake discount stores. Either alone is only weak.
 */
export function signalPricingAnomaly(hints: PageHints): EvidenceItem | null {
  if (hints.priceCount >= 10 && hints.hasUrgencyMarkers) {
    return {
      id:         'pricing_anomaly',
      tier:       'medium',
      direction:  'danger',
      confidence: 0.76,
      label:      'Discount-pressure pricing pattern',
      detail:     'Many discounted prices combined with urgency markers — classic scam-storefront layout.',
    };
  }
  return null;
}

// ---------------------------------------------------------------------------
// ── Weak signals ───────────────────────────────────────────────────────────
// ---------------------------------------------------------------------------

/**
 * Emit weak-danger evidence when urgency markers appear without the corroborating
 * high price count that would make this a medium signal.
 *
 * (When priceCount >= 10 AND hasUrgencyMarkers, use signalPricingAnomaly instead.)
 */
export function signalUrgencyWording(hints: PageHints): EvidenceItem | null {
  if (!hints.hasUrgencyMarkers) return null;
  if (hints.priceCount >= 10) return null;  // captured by pricing_anomaly at medium
  return {
    id:         'urgency_wording',
    tier:       'weak',
    direction:  'danger',
    confidence: 0.55,
    label:      'Urgency markers',
    detail:     'Urgency language detected ("limited time", "ends soon", etc.) — verify prices against the official brand site.',
  };
}

/**
 * Emit weak-danger evidence for TLDs disproportionately used by scam stores.
 */
export function signalRiskyTld(tld: string): EvidenceItem | null {
  if (!RISKY_TLDS.has(tld)) return null;
  return {
    id:         'risky_tld',
    tier:       'weak',
    direction:  'danger',
    confidence: 0.68,
    label:      `Risky TLD (.${tld})`,
    detail:     `.${tld} is disproportionately abused by scam storefronts.`,
  };
}

/**
 * Emit weak-danger evidence for the dropship/reship storefront fingerprint.
 *
 * Dropshipping is legal, so this is intentionally WEAK and informational — it
 * can never, alone, move a domain to `danger`. It flags the *shape* of a reship
 * front: a large catalogue on a generic-commerce TLD with no real on-site
 * checkout (the order is fulfilled/paid elsewhere). Verified merchants are
 * exempt.
 *
 * This is an interim heuristic. The authoritative dropship detector is the
 * image-provenance signal (reused marketplace product photos) specced in
 * 10_VISUAL_PROVENANCE.md; this fires from URL + page shape only.
 */
export function signalDropshipMarkers(parsed: ParsedUrl, hints: PageHints): EvidenceItem | null {
  if (lookupMerchant(parsed.domain)) return null;
  if (!DROPSHIP_TLDS.has(parsed.tld)) return null;
  if (hints.priceCount < 10) return null;       // needs a real catalogue, not a one-pager
  if (hints.hasCheckoutForm) return null;       // genuine on-site checkout → not a reship front
  return {
    id:         'dropship_marker',
    tier:       'weak',
    direction:  'danger',
    confidence: 0.5,
    label:      'Dropship/reship storefront pattern',
    detail:     `Large catalogue on a .${parsed.tld} domain with no on-site checkout — typical of dropship/reship middlemen. Compare price and shipping time against the original marketplace.`,
  };
}

/**
 * Emit weak-danger evidence when there is no checkout form and no checkout
 * redirect — suggesting a thin, possibly fraudulent storefront.
 */
export function signalThinPolicies(hints: PageHints): EvidenceItem | null {
  if (hints.hasCheckoutForm || hints.hasPaymentRedirect) return null;
  return {
    id:         'thin_policies',
    tier:       'weak',
    direction:  'danger',
    confidence: 0.45,
    label:      'No checkout or policy signals',
    detail:     'No checkout form or return-policy indicators found — could be a thin storefront.',
  };
}

// ---------------------------------------------------------------------------
// ── Collect all evidence for a URL+hints ──────────────────────────────────
// ---------------------------------------------------------------------------

/**
 * Run every signal function and collect the non-null results.
 *
 * This is the single entry point for the scan route. It does NOT include the
 * visual-risk signal (that comes later in /visual-scan after running the CNN).
 */
export function collectEvidence(
  parsed: ParsedUrl,
  hints: PageHints,
): EvidenceItem[] {
  const items: (EvidenceItem | null)[] = [
    // Strong safe
    signalVerifiedMerchant(parsed.domain),
    signalLongLivedDomain(parsed.hostname),
    signalAllowedCheckoutDomain(parsed.domain, hints),
    // Strong danger (threat-feed hit may also emit a weak dropship_marker)
    signalThreatFeedHit(parsed),
    signalSpoofPattern(parsed.domain, parsed.hostname),
    signalCheckoutRedirect(hints),
    // Medium
    signalReviewAuthenticity(hints),
    signalPricingAnomaly(hints),
    // Weak
    signalUrgencyWording(hints),
    signalRiskyTld(parsed.tld),
    signalDropshipMarkers(parsed, hints),
    signalThinPolicies(hints),
  ];
  return items.filter((e): e is EvidenceItem => e !== null);
}

// ---------------------------------------------------------------------------
// ── Backward-compat Signal[] mapping ──────────────────────────────────────
// ---------------------------------------------------------------------------

/**
 * Map the flat evidence list back to the six legacy Signal slots the
 * extension frontend expects.
 *
 * This preserves the existing API contract for the extension while the
 * internal decision logic uses the richer evidence representation.
 *
 * Mapping:
 *   domain   ← malicious_feed_hit | spoof_pattern | long_lived_domain | risky_tld (most important wins)
 *   ssl      ← checkout_redirect | allowed_checkout_domain
 *   reviews  ← review_authenticity
 *   seller   ← verified_merchant | long_lived_domain
 *   pricing  ← pricing_anomaly | dropship_marker | urgency_wording
 *   policies ← thin_policies | allowed_checkout_domain
 */
export function evidenceToSignals(evidence: EvidenceItem[]): Signal[] {
  const byId = (id: string) => evidence.find(e => e.id === id);

  // domain signal: strongest domain-related evidence
  const domainEv = (
    byId('malicious_feed_hit') ??
    byId('spoof_pattern') ??
    byId('long_lived_domain') ??
    byId('risky_tld')
  );
  const domainSig: Signal = domainEv
    ? evidenceItemToSignal('domain', domainEv)
    : { id: 'domain', pass: true, tier: 'weak', confidence: 0.70,
        detail: 'Domain pattern does not match known spoof patterns.' };

  // ssl signal: payment redirect or allowed checkout
  const sslEv = byId('checkout_redirect') ?? byId('allowed_checkout_domain');
  const sslSig: Signal = sslEv
    ? evidenceItemToSignal('ssl', sslEv)
    : { id: 'ssl', pass: true, tier: 'medium', confidence: 0.75,
        detail: 'No payment redirect detected.' };

  // reviews signal: review authenticity
  const revEv = byId('review_authenticity');
  const revSig: Signal = revEv
    ? evidenceItemToSignal('reviews', revEv)
    : { id: 'reviews', pass: true, tier: 'weak', confidence: 0.65,
        detail: 'Review signals are within normal range.' };

  // seller signal: merchant registry
  const sellerEv = byId('verified_merchant') ?? byId('long_lived_domain');
  const sellerSig: Signal = sellerEv
    ? evidenceItemToSignal('seller', sellerEv)
    : { id: 'seller', pass: 'partial', tier: 'weak', confidence: 0.48,
        detail: 'Seller reputation requires server-side cross-reference.' };

  // pricing signal: pricing anomaly, dropship pattern, or urgency
  const pricingEv = byId('pricing_anomaly') ?? byId('dropship_marker') ?? byId('urgency_wording');
  const pricingSig: Signal = pricingEv
    ? evidenceItemToSignal('pricing', pricingEv)
    : { id: 'pricing', pass: true, tier: 'weak', confidence: 0.62,
        detail: 'No obvious pricing pressure tactics detected.' };

  // policies signal: thin policies or checkout present
  const policiesEv = byId('thin_policies') ?? byId('allowed_checkout_domain');
  const policiesSig: Signal = policiesEv
    ? evidenceItemToSignal('policies', policiesEv)
    : { id: 'policies', pass: 'partial', tier: 'weak', confidence: 0.50,
        detail: 'Policy and contact details not fully verified from this scan.' };

  return [domainSig, sslSig, revSig, sellerSig, pricingSig, policiesSig];
}

function evidenceItemToSignal(id: SignalId, item: EvidenceItem): Signal {
  return {
    id,
    pass:       item.direction === 'safe' ? true : (item.confidence < 0.6 ? 'partial' : false),
    tier:       item.tier === 'strong' ? 'strong' : item.tier === 'medium' ? 'medium' : 'weak',
    confidence: item.confidence,
    detail:     item.detail,
  };
}

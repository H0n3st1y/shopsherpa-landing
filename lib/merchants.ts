/**
 * Verified Merchant Registry
 *
 * This module defines the list of merchants ShopSherpa has verified as
 * legitimate. Verified status grants a trust protection guarantee:
 *
 *   No visual-risk signal alone can produce a `danger` band for a verified
 *   merchant. Visual risk is capped at `caution` unless a strong contradiction
 *   is also present.
 *
 * Strong contradictions (which CAN still produce danger even for verified merchants):
 *   - Payment redirect to an unrelated domain  (ssl signal, pass=false, tier='strong')
 *   - Domain impersonation pattern detected     (domain signal, pass=false, tier='strong')
 *   - Known malicious URL hit                  (future: external signal, tier='strong')
 *   - Invalid / expired certificate            (future: TLS probe, tier='strong')
 *
 * WHY AMAZON WAS FALSELY FLAGGED (and how this module fixes it):
 *   The visual classifier is trained on a balanced dataset of genuine vs.
 *   phishing screenshots. Phishing sites sometimes copy Amazon's design closely.
 *   When the model sees an Amazon page, its visual risk probability can be
 *   elevated (the layout looks similar to training positives). Without the trust
 *   layer this pushes the combined score into `danger` — a false positive.
 *
 *   The fix is deterministic: if the registrable domain matches `amazon.com`
 *   and no strong contradictions exist, the visual-risk contribution is capped
 *   at `caution` regardless of the model's raw probability. Visual evidence
 *   alone can never promote a verified merchant past `caution`.
 *
 * Adding new merchants:
 *   1. Confirm the merchant's canonical registrable domain.
 *   2. List any expected checkout redirect domains (usually just their own).
 *   3. Add an entry below. The registry is loaded at module import time.
 */

export type TrustLevel = 'verified';

export interface MerchantEntry {
  /** Registrable domain (e.g. "amazon.com" — no www prefix). */
  registrableDomain:      string;
  /** Human-readable display name used in UX copy. */
  displayName:            string;
  /**
   * Checkout redirect domains expected for this merchant.
   * A payment redirect to a domain NOT in this list is a strong contradiction
   * (we cannot detect the target domain from the content script, but any
   * redirect from a verified merchant's page is anomalous and flagged).
   */
  allowedCheckoutDomains: string[];
  trustLevel:             TrustLevel;
}

export const VERIFIED_MERCHANTS: MerchantEntry[] = [
  {
    registrableDomain:      'amazon.com',
    displayName:            'Amazon',
    allowedCheckoutDomains: ['amazon.com', 'payments.amazon.com'],
    trustLevel:             'verified',
  },
  {
    registrableDomain:      'walmart.com',
    displayName:            'Walmart',
    allowedCheckoutDomains: ['walmart.com'],
    trustLevel:             'verified',
  },
  {
    registrableDomain:      'target.com',
    displayName:            'Target',
    allowedCheckoutDomains: ['target.com'],
    trustLevel:             'verified',
  },
  {
    registrableDomain:      'bestbuy.com',
    displayName:            'Best Buy',
    allowedCheckoutDomains: ['bestbuy.com'],
    trustLevel:             'verified',
  },
  {
    registrableDomain:      'ebay.com',
    displayName:            'eBay',
    allowedCheckoutDomains: ['ebay.com'],
    trustLevel:             'verified',
  },
  {
    registrableDomain:      'apple.com',
    displayName:            'Apple',
    allowedCheckoutDomains: ['apple.com'],
    trustLevel:             'verified',
  },
  {
    registrableDomain:      'nike.com',
    displayName:            'Nike',
    allowedCheckoutDomains: ['nike.com'],
    trustLevel:             'verified',
  },
  {
    registrableDomain:      'adidas.com',
    displayName:            'Adidas',
    allowedCheckoutDomains: ['adidas.com'],
    trustLevel:             'verified',
  },
  {
    registrableDomain:      'paypal.com',
    displayName:            'PayPal',
    allowedCheckoutDomains: ['paypal.com'],
    trustLevel:             'verified',
  },
  {
    registrableDomain:      'shopify.com',
    displayName:            'Shopify',
    allowedCheckoutDomains: ['shopify.com', 'checkout.shopify.com'],
    trustLevel:             'verified',
  },
];

// Build a fast lookup map at module load time.
const MERCHANT_MAP = new Map<string, MerchantEntry>(
  VERIFIED_MERCHANTS.map(m => [m.registrableDomain.toLowerCase(), m]),
);

/**
 * Look up a merchant by its registrable domain.
 *
 * Returns `null` for unknown domains — no trust protection applies.
 * Spoofed domains (e.g. "amazon-login-secure.shop") never match because
 * their registrable domain differs from "amazon.com".
 */
export function lookupMerchant(registrableDomain: string): MerchantEntry | null {
  return MERCHANT_MAP.get(registrableDomain.toLowerCase()) ?? null;
}

/**
 * Returns true when a signal is a strong contradiction that overrides
 * the verified-merchant trust protection and allows `danger`.
 *
 * Only `tier='strong'` failures qualify — weak/medium evidence cannot
 * override trust status. This prevents a single uncertain signal from
 * turning Amazon into a danger result.
 */
export function isStrongContradiction(signal: {
  tier?:  string;
  pass:   boolean | 'partial';
}): boolean {
  return signal.tier === 'strong' && signal.pass === false;
}

/**
 * Apply trust-precedence rules to a computed band for a verified merchant.
 *
 * Rules (deterministic, no ML):
 *   1. If ANY signal is a strong contradiction → danger is allowed.
 *      Return `{ override: 'danger', reason: <signal ids> }`.
 *   2. If NO strong contradictions → band is floored at 'caution'.
 *      Return `{ override: 'caution' }` when the raw band is 'danger'.
 *   3. If raw band is already 'safe' or 'caution' → no change.
 *
 * @param signals  Signals already scored (must include tier field).
 * @param rawBand  Band computed from the raw score before trust rules.
 */
export function applyMerchantTrust(
  signals: Array<{ tier?: string; pass: boolean | 'partial'; id: string }>,
  rawBand: 'safe' | 'caution' | 'danger',
): { band: 'safe' | 'caution' | 'danger'; contradictionIds: string[] } {
  const contradictions = signals.filter(isStrongContradiction);

  if (contradictions.length > 0) {
    // Strong contradiction on a verified merchant is MORE suspicious than on
    // an unknown site. Force danger to surface the anomaly clearly.
    return { band: 'danger', contradictionIds: contradictions.map(s => s.id) };
  }

  // No strong contradictions — visual risk and weak signals cannot produce danger.
  if (rawBand === 'danger') {
    return { band: 'caution', contradictionIds: [] };
  }

  return { band: rawBand, contradictionIds: [] };
}

/**
 * ShopSherpa Evidence-Tier Decision Engine
 *
 * Replaces the old weighted-average approach with a deterministic, rule-based
 * system that is much harder to fool with one noisy signal.
 *
 * Evidence tiers
 * ──────────────
 *   strong_safe    verified merchant, long-lived brand domain, allowed checkout
 *   strong_danger  known malicious feed hit (phishing/scam-shop), spoof pattern, checkout redirect
 *   medium         visual-risk model, review authenticity, pricing anomaly
 *   weak           urgency wording, risky TLD, dropship marker, thin policies / contact info
 *
 * Decision rules (applied in priority order)
 * ───────────────────────────────────────────
 *   Rule 1 — Strong danger overrides everything, even verified merchants.
 *             A payment redirect on amazon.com is MORE suspicious, not less.
 *
 *   Rule 2 — Strong safe suppresses weak and single-medium false positives.
 *             Verified Amazon + high visual risk → caution at most.
 *
 *   Rule 3 — Visual risk alone cannot produce `danger` for verified merchants.
 *             (Follows from Rule 2: visual_risk is medium tier.)
 *
 *   Rule 4 — Unknown domains reach `danger` only via:
 *               (a) one strong_danger signal, OR
 *               (b) two independent medium_danger signals in agreement.
 *             A single uncertain signal cannot condemn an unknown domain.
 *
 *   Rule 5 — Explanations always cite the strongest evidence tier.
 *             The `dominant` field in DecisionRecord identifies it.
 *
 * Keeping the LLM out
 * ────────────────────
 * This module is pure TypeScript — no API calls, no ML inference.
 * All decisions are deterministic given the same evidence set.
 * The LLM is used only to rewrite the user-facing text AFTER the verdict
 * is locked. See visual-scan/route.ts for the rewrite step.
 */

import type { Band, EvidenceTier } from './types.js';

// ---------------------------------------------------------------------------
// Core types
// ---------------------------------------------------------------------------

export type EvidenceDirection = 'safe' | 'danger';

/** A single piece of evidence contributing to the risk verdict. */
export interface EvidenceItem {
  /** Stable identifier for this evidence source (e.g. 'spoof_pattern'). */
  id: EvidenceId;
  /** Tier determines priority in the decision rules. */
  tier: EvidenceTier;
  /** Direction this evidence points. */
  direction: EvidenceDirection;
  /** How confident we are in this item (0–1). */
  confidence: number;
  /** Short label for the UI / explanation text. */
  label: string;
  /** One-sentence explanation of what was found and why it matters. */
  detail: string;
}

/** All evidence source identifiers. */
export type EvidenceId =
  // ── strong safe ──────────────────────────────────────────────────────────
  | 'verified_merchant'         // domain is in the verified merchant registry
  | 'long_lived_domain'         // established brand domain pattern
  | 'allowed_checkout_domain'   // checkout stays on the same merchant domain
  | 'known_merchant_registry'   // external merchant whitelist (stub — Phase 2)
  // ── strong danger ────────────────────────────────────────────────────────
  | 'malicious_feed_hit'        // known-bad URL from threat feed (stub — Phase 2)
  | 'spoof_pattern'             // registrable domain matches impersonation pattern
  | 'checkout_redirect'         // payment redirects to an unrelated domain
  | 'invalid_payment_dest'      // payment destination is clearly wrong / mismatched
  // ── medium ───────────────────────────────────────────────────────────────
  | 'visual_risk'               // binary visual-risk CNN result (danger or caution)
  | 'review_authenticity'       // review widget count / authenticity heuristic
  | 'pricing_anomaly'           // many discounted prices combined with urgency
  // ── weak ─────────────────────────────────────────────────────────────────
  | 'urgency_wording'           // urgency markers without corroborating pricing
  | 'risky_tld'                 // TLD disproportionately abused by scam stores
  | 'dropship_marker'           // dropship/reship storefront fingerprint (legal-but-higher-risk)
  | 'thin_policies';            // no visible return policy or contact info

/** Which rule produced this verdict. Used for explanation and auditability. */
export type DecisionRule =
  | 'strong_danger'                  // strong_danger signal present (no merchant)
  | 'strong_danger_overrides_safe'   // strong_danger on a verified merchant
  | 'strong_safe_clean'              // strong_safe, no medium/strong danger
  | 'strong_safe_medium_suppressed'  // strong_safe present; one medium suppressed to caution
  | 'medium_consensus'               // two+ independent medium_danger signals agree
  | 'medium_single'                  // one medium_danger signal
  | 'weak_only'                      // only weak_danger signals present
  | 'no_signal';                     // nothing found — open verdict

/**
 * The final verdict produced by `decide()`.
 *
 * `dominant` is the single most important evidence item that caused this
 * verdict. Explanation text should lead with this item's label + detail.
 *
 * `suppressedBy` is set when a strong_safe item suppressed danger signals —
 * useful for showing "normally safe — but watch for X" language.
 */
export interface DecisionRecord {
  band: Band;
  /** Display score, 0–100, derived from band + confidence (never raised by weak signals). */
  score: number;
  rule: DecisionRule;
  /** The evidence item most responsible for this verdict. */
  dominant: EvidenceItem;
  /** What suppressed the danger signal (only set on suppressed verdicts). */
  suppressedBy?: EvidenceItem;
  /** One-sentence explanation identifying the strongest tier. */
  explanation: string;
  /** All evidence items that were considered (full chain, for auditability). */
  allEvidence: EvidenceItem[];
}

// ---------------------------------------------------------------------------
// Evidence partition helpers
// ---------------------------------------------------------------------------

function strongSafe(items: EvidenceItem[]): EvidenceItem[] {
  return items.filter(e => e.tier === 'strong' && e.direction === 'safe');
}
function strongDanger(items: EvidenceItem[]): EvidenceItem[] {
  return items.filter(e => e.tier === 'strong' && e.direction === 'danger');
}
function mediumDanger(items: EvidenceItem[]): EvidenceItem[] {
  return items.filter(e => e.tier === 'medium' && e.direction === 'danger');
}
function weakDanger(items: EvidenceItem[]): EvidenceItem[] {
  return items.filter(e => e.tier === 'weak' && e.direction === 'danger');
}

function byConfidenceDesc(a: EvidenceItem, b: EvidenceItem): number {
  return b.confidence - a.confidence;
}

// ---------------------------------------------------------------------------
// Score derivation  (band → display score, incorporates dominant confidence)
// ---------------------------------------------------------------------------

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

/**
 * Map a band + dominant confidence to a display score.
 *
 * Band ranges (consistent with bandFor() in types.ts):
 *   danger   0 – 39
 *   caution 40 – 74
 *   safe    75 – 100
 *
 * Within each range, higher confidence → the score moves further from the
 * band boundary (more certain danger → lower score; more certain safe →
 * higher score).
 */
function scoreFromBand(band: Band, dominantConfidence: number): number {
  const c = clamp(dominantConfidence, 0, 1);
  switch (band) {
    case 'danger':
      // confidence 0.5 → 35; confidence 1.0 → 5
      return clamp(Math.round(35 - c * 30), 5, 35);
    case 'caution':
      // confidence 0.5 → 65; confidence 1.0 → 42
      return clamp(Math.round(65 - c * 23), 42, 65);
    case 'safe':
      // confidence 0.5 → 80; confidence 1.0 → 98
      return clamp(Math.round(80 + c * 18), 76, 98);
  }
}

// ---------------------------------------------------------------------------
// Explanation builder — always cites the strongest tier
// ---------------------------------------------------------------------------

function buildExplanation(rule: DecisionRule, dominant: EvidenceItem, suppressedBy?: EvidenceItem): string {
  switch (rule) {
    case 'strong_danger':
      return `Strong danger — ${dominant.label}: ${dominant.detail}`;
    case 'strong_danger_overrides_safe':
      return `Anomalous activity on a verified merchant — ${dominant.label}: ${dominant.detail}`;
    case 'strong_safe_clean':
      return `${dominant.label}: ${dominant.detail}`;
    case 'strong_safe_medium_suppressed':
      return suppressedBy
        ? `${dominant.label} — caution flagged by ${suppressedBy.label} (not strong enough to override trust).`
        : `${dominant.label} — one unverified signal kept at caution.`;
    case 'medium_consensus':
      return `Two independent medium-risk signals agree — ${dominant.label}: ${dominant.detail}`;
    case 'medium_single':
      return `${dominant.label}: ${dominant.detail}`;
    case 'weak_only':
      return `Low-confidence signal — ${dominant.label}: ${dominant.detail}`;
    case 'no_signal':
      return 'No risk signals detected.';
  }
}

// ---------------------------------------------------------------------------
// Core decision function
// ---------------------------------------------------------------------------

/**
 * Apply the five evidence-tier rules and return a deterministic verdict.
 *
 * @param evidence  All evidence items collected for this URL.
 * @returns         A DecisionRecord with band, score, rule, and explanation.
 *
 * This function is pure — it has no side effects and makes no network calls.
 */
export function decide(evidence: EvidenceItem[]): DecisionRecord {
  const ss = strongSafe(evidence).sort(byConfidenceDesc);
  const sd = strongDanger(evidence).sort(byConfidenceDesc);
  const md = mediumDanger(evidence).sort(byConfidenceDesc);
  const wd = weakDanger(evidence).sort(byConfidenceDesc);

  const isVerifiedMerchant = ss.some(e => e.id === 'verified_merchant');

  // ── Rule 1 / Rule 2: Strong danger wins unconditionally ─────────────────
  // Even a verified merchant + payment redirect = danger.
  if (sd.length > 0) {
    const dominant = sd[0];
    const rule: DecisionRule = isVerifiedMerchant
      ? 'strong_danger_overrides_safe'
      : 'strong_danger';
    return {
      band:        'danger',
      score:       scoreFromBand('danger', dominant.confidence),
      rule,
      dominant,
      explanation: buildExplanation(rule, dominant),
      allEvidence: evidence,
    };
  }

  // ── Rule 2: Strong safe suppresses medium and weak danger ───────────────
  // (Rule 3 follows naturally: visual_risk is medium, so it is suppressed here.)
  if (ss.length > 0) {
    const dominant = ss[0];

    if (md.length >= 2) {
      // Two+ medium danger signals on a trusted domain: downgrade to caution,
      // but note what was suppressed. Do NOT allow danger (Rule 2).
      const suppressedBy = md[0];
      const rule: DecisionRule = 'strong_safe_medium_suppressed';
      return {
        band:        'caution',
        score:       scoreFromBand('caution', suppressedBy.confidence),
        rule,
        dominant,
        suppressedBy,
        explanation: buildExplanation(rule, dominant, suppressedBy),
        allEvidence: evidence,
      };
    }

    if (md.length === 1) {
      const suppressedBy = md[0];
      const rule: DecisionRule = 'strong_safe_medium_suppressed';
      return {
        band:        'caution',
        score:       scoreFromBand('caution', suppressedBy.confidence),
        rule,
        dominant,
        suppressedBy,
        explanation: buildExplanation(rule, dominant, suppressedBy),
        allEvidence: evidence,
      };
    }

    // Only weak danger (if any) — strong safe wins cleanly.
    const rule: DecisionRule = 'strong_safe_clean';
    return {
      band:        'safe',
      score:       scoreFromBand('safe', dominant.confidence),
      rule,
      dominant,
      explanation: buildExplanation(rule, dominant),
      allEvidence: evidence,
    };
  }

  // ── Rule 4: Unknown domain — danger requires consensus ──────────────────
  // No strong safe → no merchant trust protection. Apply strict threshold.
  if (md.length >= 2) {
    // Two independent medium signals agree → danger allowed.
    const dominant = md[0];
    const rule: DecisionRule = 'medium_consensus';
    return {
      band:        'danger',
      score:       scoreFromBand('danger', dominant.confidence),
      rule,
      dominant,
      explanation: buildExplanation(rule, dominant),
      allEvidence: evidence,
    };
  }

  if (md.length === 1) {
    // Only one medium signal → caution, never danger (Rule 4).
    const dominant = md[0];
    const rule: DecisionRule = 'medium_single';
    return {
      band:        'caution',
      score:       scoreFromBand('caution', dominant.confidence),
      rule,
      dominant,
      explanation: buildExplanation(rule, dominant),
      allEvidence: evidence,
    };
  }

  if (wd.length > 0) {
    // Only weak signals — caution at most, never danger.
    const dominant = wd[0];
    const rule: DecisionRule = 'weak_only';
    return {
      band:        'caution',
      score:       scoreFromBand('caution', dominant.confidence * 0.7), // suppress score
      rule,
      dominant,
      explanation: buildExplanation(rule, dominant),
      allEvidence: evidence,
    };
  }

  // ── No risk signals ──────────────────────────────────────────────────────
  const noSignal: EvidenceItem = {
    id:         'thin_policies',
    tier:       'weak',
    direction:  'safe',
    confidence: 0.5,
    label:      'No risk signals detected',
    detail:     'No URL, domain, or page signals indicate risk.',
  };
  return {
    band:        'safe',
    score:       scoreFromBand('safe', 0.5),
    rule:        'no_signal',
    dominant:    noSignal,
    explanation: buildExplanation('no_signal', noSignal),
    allEvidence: evidence,
  };
}

// ---------------------------------------------------------------------------
// Explanation builder for the user-facing headline + sub text
// (Called by route.ts after decide() — still no LLM involved)
// ---------------------------------------------------------------------------

export interface ExplanationText {
  headline: string;
  sub: string;
}

/**
 * Build template explanation text from a DecisionRecord.
 *
 * This is the deterministic fallback. The visual-scan route may optionally
 * rewrite this text via LLM — but the numbers and verdict never change.
 */
export function templateText(record: DecisionRecord): ExplanationText {
  const { band, rule, dominant, suppressedBy } = record;

  switch (band) {
    case 'danger':
      if (rule === 'strong_danger_overrides_safe') {
        return {
          headline: 'Unusual activity detected on a verified merchant.',
          sub: `This domain is normally trusted, but a strong risk signal was found: ${dominant.label}. Do not enter payment details.`,
        };
      }
      if (rule === 'medium_consensus') {
        return {
          headline: 'Multiple risk signals detected.',
          sub: `Two independent checks raised concerns. ${dominant.detail} Do not enter payment details.`,
        };
      }
      return {
        headline: 'Scam signals detected.',
        sub: `${dominant.label}: ${dominant.detail} Do not enter payment details on this site.`,
      };

    case 'caution':
      if (rule === 'strong_safe_medium_suppressed') {
        const what = suppressedBy?.label ?? 'a risk signal';
        return {
          headline: 'Verified merchant — proceed with normal caution.',
          sub: `This is a trusted domain. However, ${what} is elevated — double-check before checkout.`,
        };
      }
      if (rule === 'medium_single') {
        return {
          headline: 'A few things to check before buying.',
          sub: `${dominant.label}: ${dominant.detail}`,
        };
      }
      return {
        headline: 'Some signals need a closer look.',
        sub: `${dominant.label}: ${dominant.detail} Review carefully before checkout.`,
      };

    case 'safe':
      if (rule === 'strong_safe_clean') {
        return {
          headline: 'This store looks legitimate.',
          sub: `${dominant.label}. Run a visual scan for additional confidence.`,
        };
      }
      return {
        headline: 'This store looks like the real thing.',
        sub: 'No risk signals detected. Run a visual scan for additional confidence.',
      };
  }
}

/**
 * Shared types for the ShopSherpa backend.
 * Keep in sync with the extension's src/lib/types.ts.
 */

export type Band = 'safe' | 'caution' | 'danger';

/** "low" is the visual-model's own risk band (maps to "safe" in the combined result). */
export type VisualRiskBand = 'low' | 'caution' | 'danger';

export type SignalId =
  | 'domain' | 'ssl' | 'reviews'
  | 'seller' | 'pricing' | 'policies';

export type SignalPass = true | false | 'partial';

/**
 * How strongly a signal's evidence bears on the final verdict.
 *
 * strong — deterministic or near-deterministic finding (e.g. domain matches a
 *          known spoof pattern; payment redirect detected). A `strong` failure
 *          on a verified merchant is a strong contradiction that overrides trust
 *          protection and forces `danger`.
 *
 * medium — moderate-confidence statistical signal (e.g. risky TLD, urgency
 *          markers combined with many prices). Weighted 1.5× in aggregation.
 *
 * weak   — low-information partial signal (e.g. no review widget, seller
 *          identity unverifiable). Weighted 0.5× in aggregation so it doesn't
 *          swamp stronger evidence.
 */
export type EvidenceTier = 'strong' | 'medium' | 'weak';

export interface Signal {
  id: SignalId;
  pass: SignalPass;
  detail: string;
  confidence: number;
  /** Evidence tier — set by scorers; optional for backwards compatibility. */
  tier?: EvidenceTier;
  source?: string;
  weight?: number;
}

export interface ScorePayload {
  domain: string;
  score: number;           // 0..100
  band: Band;
  bandLabel: string;
  color: string;
  headline: string;
  sub: string;
  signals: Signal[];
  triggerAlert: boolean;
  alertReason?: string;
  scannedAt: string;
  cached: boolean;
  /** Community vote tallies — passed through from the initial /scan response. */
  reports: { safe: number; scam: number };
  /**
   * Full evidence chain from the tier-based decision engine.
   * Included for auditability and richer extension display.
   * Optional so existing cached payloads remain valid.
   */
  evidenceChain?: import('./evidence.js').EvidenceItem[];
  /**
   * Which decision rule produced this verdict.
   * See DecisionRule in lib/evidence.ts.
   */
  decisionRule?: import('./evidence.js').DecisionRule;
  /** One-sentence explanation citing the dominant evidence tier. */
  decisionExplanation?: string;
}

// ---------------------------------------------------------------------------
// Visual review (added by /visual-scan on top of ScorePayload)
// ---------------------------------------------------------------------------

/**
 * Allowed finding types defined by the API contract.
 *
 * NOTE: Our current binary classifier does NOT output per-finding scores.
 * Only "low_quality_storefront" is used as a catch-all when risk is elevated.
 * Per-finding types will be populated once multi-label training data exists.
 * See ml/visual-risk/src/labels.py — per_finding_signals: false.
 */
export type VisualFindingType =
  | 'brand_impersonation'
  | 'fake_trust_badges'
  | 'urgency_pressure'
  | 'suspicious_discount'
  | 'checkout_mismatch'
  | 'low_quality_storefront';

export interface VisualFinding {
  type: VisualFindingType;
  label: string;
  detail: string;
  confidence: number;      // 0..1
  risk: 'low' | 'medium' | 'high';
}

/**
 * Status of the visual CNN model for this response.
 * - "available"   Model ran and produced a real probability.
 * - "unavailable" Model files are missing (ONNX not yet copied to lib/visual/).
 * - "error"       Model files present but inference threw (ORT crash, timeout, etc.).
 */
export type VisualModelStatus = 'available' | 'unavailable' | 'error';

export interface VisualReview {
  visualRisk: number;           // 0..1 — calibrated probability from the binary model
  visualRiskBand: VisualRiskBand; // raw band from the CNN before any trust override
  model: string;                // e.g. "efficientnet-b0-binary-v1"
  /** Explicit model status so callers don't have to pattern-match model strings. */
  visualModelStatus: VisualModelStatus;
  summary: string;              // single broad-language sentence
  findings: VisualFinding[];
}

export interface VisualScanPayload extends ScorePayload {
  visualReview: VisualReview;
}

// ---------------------------------------------------------------------------
// Visual model return type (internal — from lib/visual/model.ts)
// ---------------------------------------------------------------------------

export interface VisualModelResult {
  /** Calibrated probability that the screenshot is suspicious (0..1). */
  visualRiskProbability: number;
  /** Operating band derived from thresholds.json. */
  visualRiskBand: VisualRiskBand;
  /** Identifier string from model.meta.json, included in telemetry. */
  modelVersion: string;
}

// ---------------------------------------------------------------------------
// Band metadata (shared scoring constants)
// ---------------------------------------------------------------------------

export const BAND_META: Record<Band, { label: string; color: string }> = {
  safe:    { label: 'Trusted',     color: '#1d9e75' },
  caution: { label: 'Use caution', color: '#c2410c' },
  danger:  { label: 'Likely scam', color: '#a83232' },
};

export function bandFor(score: number): Band {
  if (score < 40) return 'danger';
  if (score < 75) return 'caution';
  return 'safe';
}

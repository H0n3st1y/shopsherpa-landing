/**
 * ShopSherpa Telemetry — Accuracy Monitoring
 *
 * Emits structured events for post-launch accuracy monitoring.
 *
 * Privacy rules (enforced by types, never violate):
 *   ✗ No raw URLs, paths, or query strings
 *   ✗ No screenshots or image data
 *   ✗ No user email, name, or personal identifiers
 *   ✗ No `brandMentions` array contents
 *   ✗ No install ID in plain text (hashed before PostHog distinct_id use)
 *   ✓ Registrable domain (e.g. "amazon.com") — needed for per-domain FP tracking
 *   ✓ TLD (e.g. "com", "shop") — distribution signal
 *   ✓ Boolean flags and numeric scores — safe aggregates
 *
 * Backends (all optional, graceful degradation if unconfigured):
 *   1. Structured stdout JSON — always emitted, pipe to Datadog/CloudWatch/Loki
 *   2. PostHog — set POSTHOG_API_KEY in environment
 *   3. Upstash Redis — set UPSTASH_REDIS_REST_URL + TOKEN for alert counters
 */

import { createHash } from 'node:crypto';
import type { Band, VisualRiskBand } from './types.js';
import type { DecisionRule } from './evidence.js';

// ---------------------------------------------------------------------------
// Event type catalog
// ---------------------------------------------------------------------------

/** Fired by POST /api/extension/scan after scoring completes. */
export interface ScanCompletedEvent {
  event:              'scan.completed';
  tld:                string;                // last DNS label — distribution signal
  registrableDomain:  string;                // e.g. "amazon.com" — FP tracking
  verifiedMerchant:   boolean;
  band:               Band;
  score:              number;
  decisionRule:       DecisionRule;
  triggerAlert:       boolean;
  strongDangerCount:  number;
  strongSafeCount:    number;
  mediumDangerCount:  number;
  weakDangerCount:    number;
}

/** Fired by POST /api/extension/visual-scan after full pipeline completes. */
export interface VisualScanCompletedEvent {
  event:             'visual_scan.completed';
  tld:               string;
  registrableDomain: string;
  verifiedMerchant:  boolean;
  visualBand:        VisualRiskBand;
  visualProbability: number;                 // rounded to 2 dp
  modelVersion:      string;
  scoreBefore:       number;
  scoreAfter:        number;
  bandBefore:        Band;
  bandAfter:         Band;
  scoreDelta:        number;                 // scoreAfter − scoreBefore
  bandChanged:       boolean;
  bandDowngraded:    boolean;                // band moved toward danger
  decisionRule:      DecisionRule;
  llmUsed:           boolean;
  llmFallback:       boolean;                // LLM was attempted but timed out / failed
}

/** Fired when the ONNX model throws during inference. */
export interface VisualScanModelErrorEvent {
  event:        'visual_scan.model_error';
  tld:          string;
  errorType:    'onnx_error' | 'timeout' | 'unknown';
}

/** Fired when the ONNX runtime is missing / in degraded mode. */
export interface VisualScanModelUnavailableEvent {
  event: 'visual_scan.model_unavailable';
  tld:   string;
}

/** Fired when the LLM rewrite times out or errors (visual-scan route). */
export interface VisualScanLlmFallbackEvent {
  event:       'visual_scan.llm_fallback';
  band:        Band;
  visualBand:  VisualRiskBand;
  errorType:   'timeout' | 'parse_error' | 'api_error' | 'no_api_key';
}

/**
 * Fired when a user reports a disagreement via POST /api/extension/feedback.
 *
 * Disagreement types:
 *   false_positive — extension said danger/caution, user says the site is safe
 *   false_negative — extension said safe, user says it's a scam
 *   correct        — user confirms the verdict was right (positive signal)
 */
export interface FeedbackSubmittedEvent {
  event:             'feedback.submitted';
  verdictShown:      Band;
  visualBandShown:   VisualRiskBand | null;
  userFeedback:      'false_positive' | 'false_negative' | 'correct';
  verifiedMerchant:  boolean;
  tld:               string;
  registrableDomain: string;                 // for per-domain FP aggregation
  extensionVersion:  string | null;
}

export type TelemetryEvent =
  | ScanCompletedEvent
  | VisualScanCompletedEvent
  | VisualScanModelErrorEvent
  | VisualScanModelUnavailableEvent
  | VisualScanLlmFallbackEvent
  | FeedbackSubmittedEvent;

// ---------------------------------------------------------------------------
// PostHog client (no SDK — lightweight fetch)
// ---------------------------------------------------------------------------

const POSTHOG_ENDPOINT = 'https://app.posthog.com/capture/';

function hashInstallId(id: string): string {
  return createHash('sha256').update(id).digest('hex').slice(0, 16);
}

async function sendToPosthog(
  event: TelemetryEvent,
  installId: string | undefined,
): Promise<void> {
  const apiKey = process.env.POSTHOG_API_KEY;
  if (!apiKey) return;

  const distinctId = installId ? hashInstallId(installId) : 'server';
  const body = {
    api_key:     apiKey,
    event:       event.event,
    distinct_id: distinctId,
    timestamp:   new Date().toISOString(),
    properties:  { ...event, event: undefined },
  };

  await fetch(POSTHOG_ENDPOINT, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
    // PostHog is fire-and-forget — short timeout so it never blocks a response
    signal:  AbortSignal.timeout(2000),
  });
}

// ---------------------------------------------------------------------------
// Upstash Redis counter helpers (for alert threshold checks)
// ---------------------------------------------------------------------------

type UpstashRedis = {
  incr: (key: string) => Promise<number>;
  expire: (key: string, seconds: number) => Promise<number>;
  get: (key: string) => Promise<string | null>;
};

let _redis: UpstashRedis | null | 'unavailable' = null;

async function getRedis(): Promise<UpstashRedis | null> {
  if (_redis === 'unavailable') return null;
  if (_redis !== null) return _redis;
  try {
    const { Redis } = await import('@upstash/redis');
    _redis = Redis.fromEnv() as unknown as UpstashRedis;
    return _redis;
  } catch {
    _redis = 'unavailable';
    return null;
  }
}

/** UTC date key: "2026-05-17" */
function dateKey(): string {
  return new Date().toISOString().slice(0, 10);
}

/** UTC hour key: "2026-05-17-14" */
function hourKey(): string {
  return new Date().toISOString().slice(0, 13);
}

/**
 * Increment Redis counters that the alert checker reads.
 * All keys expire after 30 days — no unbounded growth.
 */
async function updateRedisCounters(event: TelemetryEvent): Promise<void> {
  const redis = await getRedis();
  if (!redis) return;

  const d = dateKey();
  const h = hourKey();
  const TTL = 30 * 24 * 3600; // 30 days in seconds

  const incr = async (key: string) => {
    await redis.incr(key);
    await redis.expire(key, TTL);
  };

  switch (event.event) {
    case 'visual_scan.completed': {
      await incr(`telem:vs:${h}`);         // total visual scans (hourly)
      await incr(`telem:vdb:${event.visualBand}:${d}`);  // band distribution (daily)

      if (event.verifiedMerchant) {
        if (event.bandAfter === 'danger') {
          // CRITICAL: any single incident triggers alert
          await incr(`telem:vmd:${d}`);    // verified merchant danger (daily)
        }
        if (event.bandAfter === 'caution') {
          await incr(`telem:vmc:${h}`);    // verified merchant caution (hourly)
        }
        await incr(`telem:vms:${h}`);      // verified merchant scan total (hourly)
      }
      break;
    }
    case 'visual_scan.model_unavailable': {
      await incr(`telem:mue:${h}`);        // model unavailable (hourly)
      break;
    }
    case 'visual_scan.model_error': {
      await incr(`telem:mer:${h}`);        // model error (hourly)
      break;
    }
    case 'visual_scan.llm_fallback': {
      await incr(`telem:llmf:${h}`);       // LLM fallback (hourly)
      break;
    }
    case 'feedback.submitted': {
      if (event.userFeedback !== 'correct') {
        const type = event.userFeedback;   // 'false_positive' | 'false_negative'
        await incr(`telem:fb:${type}:${d}`);
        // Per-domain false-positive counter (for the amazon-style FP dashboard panel)
        if (event.userFeedback === 'false_positive' && event.registrableDomain) {
          await incr(`telem:fp:domain:${event.registrableDomain}:${d}`);
        }
      }
      break;
    }
  }
}

// ---------------------------------------------------------------------------
// Alert check (called after updating counters — synchronous, non-blocking)
// ---------------------------------------------------------------------------

export interface AlertStatus {
  name:       string;
  severity:   'CRITICAL' | 'WARNING' | 'OK';
  triggered:  boolean;
  value:      number;
  threshold:  number;
  message:    string;
}

/**
 * Check real-time alert thresholds against Redis counters.
 * Returns alert states without throwing — all errors degrade to OK silently.
 *
 * Call this in the route handler and log any triggered alerts.
 * Wire POSTHOG_ALERT_WEBHOOK or Datadog to consume these log lines.
 */
export async function checkAlerts(): Promise<AlertStatus[]> {
  const redis = await getRedis();
  if (!redis) return [];

  const d = dateKey();
  const h = hourKey();
  const alerts: AlertStatus[] = [];

  const getNum = async (key: string): Promise<number> => {
    const v = await redis.get(key).catch(() => null);
    return v ? parseInt(v, 10) : 0;
  };

  try {
    // Alert 1: Verified merchant danger (ANY count today = CRITICAL)
    const vmd = await getNum(`telem:vmd:${d}`);
    alerts.push({
      name:      'verified_merchant_danger',
      severity:  vmd > 0 ? 'CRITICAL' : 'OK',
      triggered: vmd > 0,
      value:     vmd,
      threshold: 0,
      message:   vmd > 0
        ? `CRITICAL: ${vmd} verified-merchant danger verdict(s) today — Amazon-style FP likely. Check PostHog → "visual_scan.completed" where verifiedMerchant=true and bandAfter=danger.`
        : 'No verified-merchant danger verdicts today.',
    });

    // Alert 2: Verified merchant caution spike (>10% of verified scans this hour)
    const [vmc, vms] = await Promise.all([
      getNum(`telem:vmc:${h}`),
      getNum(`telem:vms:${h}`),
    ]);
    const vmCautionRate = vms > 0 ? vmc / vms : 0;
    const VM_CAUTION_THRESHOLD = 0.10;
    alerts.push({
      name:      'verified_merchant_caution_spike',
      severity:  vmCautionRate > VM_CAUTION_THRESHOLD ? 'WARNING' : 'OK',
      triggered: vmCautionRate > VM_CAUTION_THRESHOLD,
      value:     Math.round(vmCautionRate * 100),
      threshold: Math.round(VM_CAUTION_THRESHOLD * 100),
      message:   vmCautionRate > VM_CAUTION_THRESHOLD
        ? `WARNING: ${Math.round(vmCautionRate * 100)}% of verified-merchant scans this hour produced caution (threshold: 10%). Possible false-positive wave.`
        : `Verified-merchant caution rate: ${Math.round(vmCautionRate * 100)}% (OK).`,
    });

    // Alert 3: Model unavailable rate (>5% of visual scans this hour)
    const [mue, vs] = await Promise.all([
      getNum(`telem:mue:${h}`),
      getNum(`telem:vs:${h}`),
    ]);
    const unavailRate = vs > 0 ? mue / vs : 0;
    const UNAVAIL_THRESHOLD = 0.05;
    alerts.push({
      name:      'model_unavailable_rate',
      severity:  unavailRate > UNAVAIL_THRESHOLD ? 'WARNING' : 'OK',
      triggered: unavailRate > UNAVAIL_THRESHOLD,
      value:     Math.round(unavailRate * 100),
      threshold: Math.round(UNAVAIL_THRESHOLD * 100),
      message:   unavailRate > UNAVAIL_THRESHOLD
        ? `WARNING: ${Math.round(unavailRate * 100)}% of visual scans returned unavailable model this hour (threshold: 5%). Check ONNX model deployment.`
        : `Model unavailable rate: ${Math.round(unavailRate * 100)}% (OK).`,
    });

    // Alert 4: Visual danger distribution shift (today vs yesterday >20pp)
    const [dangerToday, dangerYesterday] = await Promise.all([
      getNum(`telem:vdb:danger:${d}`),
      getNum(`telem:vdb:danger:${new Date(Date.now() - 86400000).toISOString().slice(0, 10)}`),
    ]);
    const [totalToday, totalYesterday] = await Promise.all([
      (async () => {
        const [lo, ca, da] = await Promise.all([
          getNum(`telem:vdb:low:${d}`),
          getNum(`telem:vdb:caution:${d}`),
          getNum(`telem:vdb:danger:${d}`),
        ]);
        return lo + ca + da;
      })(),
      (async () => {
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        const [lo, ca, da] = await Promise.all([
          getNum(`telem:vdb:low:${yesterday}`),
          getNum(`telem:vdb:caution:${yesterday}`),
          getNum(`telem:vdb:danger:${yesterday}`),
        ]);
        return lo + ca + da;
      })(),
    ]);
    const dangerRateToday     = totalToday     > 0 ? dangerToday     / totalToday     : 0;
    const dangerRateYesterday = totalYesterday > 0 ? dangerYesterday / totalYesterday : 0;
    const dangerShift = Math.abs(dangerRateToday - dangerRateYesterday) * 100;
    const DANGER_SHIFT_THRESHOLD = 20; // percentage points
    const hasEnoughData = totalToday >= 20 && totalYesterday >= 20;
    alerts.push({
      name:      'visual_danger_distribution_shift',
      severity:  (hasEnoughData && dangerShift > DANGER_SHIFT_THRESHOLD) ? 'WARNING' : 'OK',
      triggered: hasEnoughData && dangerShift > DANGER_SHIFT_THRESHOLD,
      value:     Math.round(dangerShift),
      threshold: DANGER_SHIFT_THRESHOLD,
      message:   !hasEnoughData
        ? 'Insufficient data for danger-distribution shift check (need ≥20 scans each day).'
        : dangerShift > DANGER_SHIFT_THRESHOLD
          ? `WARNING: Visual danger rate shifted ${Math.round(dangerShift)}pp day-over-day (today: ${Math.round(dangerRateToday * 100)}%, yesterday: ${Math.round(dangerRateYesterday * 100)}%). Possible model drift or test traffic.`
          : `Visual danger rate stable (${Math.round(dangerShift)}pp shift, OK).`,
    });
  } catch (err) {
    console.error('[telemetry/alerts] Redis check failed:', err);
  }

  return alerts;
}

// ---------------------------------------------------------------------------
// Main emit function
// ---------------------------------------------------------------------------

/**
 * Emit a telemetry event.
 *
 * Always logs as structured JSON to stdout (picked up by any log aggregator).
 * Optionally sends to PostHog and updates Redis alert counters.
 *
 * Never throws — all failures are logged and swallowed.
 * Use as fire-and-forget: `emit(event, installId).catch(() => {})`.
 */
export async function emit(
  event: TelemetryEvent,
  installId?: string,
): Promise<void> {
  // 1. Structured log — always emitted, collected by Datadog / CloudWatch / Loki
  console.log(JSON.stringify({
    level:    event.event.includes('error') || event.event.includes('fallback') ? 'warn' : 'info',
    source:   'telemetry',
    ts:       new Date().toISOString(),
    ...event,
  }));

  // 2. PostHog (optional)
  await sendToPosthog(event, installId).catch(err =>
    console.error('[telemetry/posthog]', err instanceof Error ? err.message : err),
  );

  // 3. Redis alert counters (optional)
  await updateRedisCounters(event).catch(err =>
    console.error('[telemetry/redis]', err instanceof Error ? err.message : err),
  );
}

/**
 * Emit an event AND check alert thresholds.
 * Logs any triggered alerts as structured WARN lines.
 * Use in route handlers: `emitWithAlertCheck(event, installId).catch(() => {})`.
 */
export async function emitWithAlertCheck(
  event: TelemetryEvent,
  installId?: string,
): Promise<void> {
  await emit(event, installId);

  // Only check alerts for events that update counters (avoid unnecessary Redis reads)
  const checkable = new Set<TelemetryEvent['event']>([
    'visual_scan.completed',
    'visual_scan.model_unavailable',
    'visual_scan.model_error',
  ]);
  if (!checkable.has(event.event)) return;

  const alerts = await checkAlerts().catch(() => []);
  for (const alert of alerts.filter(a => a.triggered)) {
    console.warn(JSON.stringify({
      level:   'alert',
      source:  'telemetry/alert',
      ts:      new Date().toISOString(),
      ...alert,
    }));
  }
}

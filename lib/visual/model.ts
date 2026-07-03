/**
 * lib/visual/model.ts — ShopSherpa binary visual-risk ONNX adapter.
 *
 * Loads `lib/visual/model.onnx` once at process start and exposes a single
 * async function that accepts a raw image buffer and returns a risk assessment.
 *
 * MODEL CAPABILITY NOTE
 * ─────────────────────
 * The deployed model is a binary classifier (benign vs. suspicious).
 * It does NOT output per-finding probabilities (brand_impersonation,
 * fake_trust_badges, etc.). `per_finding_signals: false` in model.meta.json.
 *
 * Until a multi-label dataset with manual image annotations is built,
 * callers must NOT invent per-finding language from this probability.
 * Use only broad summary language — see route.ts.
 *
 * COPY INSTRUCTIONS
 * ─────────────────
 * cp ml/visual-risk/checkpoints/binary/model.onnx        lib/visual/model.onnx
 * cp ml/visual-risk/checkpoints/binary/model.onnx.data   lib/visual/model.onnx.data  # REQUIRED — weights sidecar (~15 MB); model fails to load without it
 * cp ml/visual-risk/checkpoints/binary/model.meta.json   lib/visual/model.meta.json
 * cp ml/visual-risk/checkpoints/binary/eval/thresholds.json lib/visual/thresholds.json
 */

import * as ort from 'onnxruntime-node';
import fs from 'fs';
import path from 'path';
import { preprocessImage } from './preprocess.js';
import type { VisualModelResult, VisualRiskBand } from '../types.js';

// ---------------------------------------------------------------------------
// Configuration — loaded from sidecar JSON files
// ---------------------------------------------------------------------------

const VISUAL_DIR   = path.join(process.cwd(), 'lib', 'visual');
const MODEL_PATH   = process.env.VISUAL_MODEL_PATH   ?? path.join(VISUAL_DIR, 'model.onnx');
const META_PATH    = process.env.VISUAL_META_PATH    ?? path.join(VISUAL_DIR, 'model.meta.json');
const THRESH_PATH  = process.env.VISUAL_THRESH_PATH  ?? path.join(VISUAL_DIR, 'thresholds.json');

interface ModelMeta {
  image_size:       number;
  normalize_mean:   [number, number, number];
  normalize_std:    [number, number, number];
  model_type:       string;
  per_finding_signals: boolean;
  /** Optional human-readable version tag embedded by export_onnx.py. */
  model_version?:   string;
}

interface ThresholdsFile {
  danger:  { threshold: number };
  caution: { threshold: number };
}

// Defaults match training config; overridden by loaded JSON.
let meta: ModelMeta = {
  image_size:          224,
  normalize_mean:      [0.485, 0.456, 0.406],
  normalize_std:       [0.229, 0.224, 0.225],
  model_type:          'binary_classifier',
  per_finding_signals: false,
};

let thresholdsCfg: ThresholdsFile = {
  danger:  { threshold: 0.95 },
  caution: { threshold: 0.57 },
};

let _modelVersion = 'efficientnet-b0-binary-v1';

try {
  const raw = JSON.parse(fs.readFileSync(META_PATH, 'utf8')) as Partial<ModelMeta>;
  meta = { ...meta, ...raw };
  if (raw.model_version) _modelVersion = raw.model_version;
} catch {
  /* Use defaults — model.meta.json not yet copied; degraded mode. */
}

try {
  const raw = JSON.parse(fs.readFileSync(THRESH_PATH, 'utf8')) as ThresholdsFile;
  // Validate structure before accepting
  if (typeof raw.danger?.threshold === 'number' &&
      typeof raw.caution?.threshold === 'number') {
    thresholdsCfg = raw;
  }
} catch {
  /* Use defaults. */
}

// Expose for tests and for the route handler (threshold check logic)
export const THRESHOLDS = {
  danger:  thresholdsCfg.danger.threshold,
  caution: thresholdsCfg.caution.threshold,
} as const;

export const MODEL_VERSION: string = _modelVersion;

/** Pure classifier — exported for direct unit testing. */
export function probabilityToBand(p: number): VisualRiskBand {
  if (p >= THRESHOLDS.danger)  return 'danger';
  if (p >= THRESHOLDS.caution) return 'caution';
  return 'low';
}

// ---------------------------------------------------------------------------
// Lazy session singleton
// ---------------------------------------------------------------------------

let _session: ort.InferenceSession | null = null;
let _initPromise: Promise<void> | null     = null;
let _modelUnavailable = false;

/** Initialise the ONNX session once; no-op on subsequent calls. */
async function ensureSession(): Promise<void> {
  if (_session || _modelUnavailable) return;
  if (_initPromise) { await _initPromise; return; }

  _initPromise = (async () => {
    try {
      _session = await ort.InferenceSession.create(MODEL_PATH, {
        executionProviders:       ['cpu'],
        graphOptimizationLevel:   'all',
        enableCpuMemArena:        true,
        enableMemPattern:         true,
        interOpNumThreads:        1,  // keep latency predictable in serverless
        intraOpNumThreads:        2,
      });
    } catch (err) {
      _modelUnavailable = true;
      console.warn('[visual/model] ONNX session failed to load — degraded mode.', err);
    }
  })();

  await _initPromise;
}

// ---------------------------------------------------------------------------
// Stub result (model file absent / not yet copied)
// ---------------------------------------------------------------------------

const STUB_RESULT: VisualModelResult = {
  visualRiskProbability: 0,
  visualRiskBand:        'low',
  modelVersion:          'unavailable',
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Run the visual-risk binary classifier on a raw image buffer.
 *
 * @param imageBuffer  JPEG / PNG / WebP bytes (any sharp-decodable format).
 *                     The route handler is responsible for size-gating this.
 *
 * @returns  visualRiskProbability — calibrated suspicious probability (0..1)
 *           visualRiskBand        — operating tier from thresholds.json
 *           modelVersion          — version string for telemetry
 *
 * If the ONNX model file has not been copied to lib/visual/, returns a stub
 * with visualRiskProbability=0 and visualRiskBand='low' so the API route
 * degrades gracefully without throwing.
 */
export async function runVisualModel(imageBuffer: Buffer): Promise<VisualModelResult> {
  await ensureSession();

  if (!_session) {
    return STUB_RESULT;
  }

  // Preprocess — must match training pipeline exactly
  const tensorData = await preprocessImage(
    imageBuffer,
    meta.image_size,
    meta.normalize_mean,
    meta.normalize_std,
  );

  // Build ONNX input tensor: [1, 3, H, W]
  const inputTensor = new ort.Tensor(
    'float32',
    tensorData,
    [1, 3, meta.image_size, meta.image_size],
  );

  const inputName = _session.inputNames[0];
  const results   = await _session.run({ [inputName]: inputTensor });

  const outputName = _session.outputNames[0];
  const output     = results[outputName].data as Float32Array;

  // Binary model: single scalar probability per image in the batch
  const probability = Math.max(0, Math.min(1, output[0]));

  return {
    visualRiskProbability: probability,
    visualRiskBand:        probabilityToBand(probability),
    modelVersion:          MODEL_VERSION,
  };
}

/** Reset the session (test helper — do not call in production code). */
export function _resetSessionForTest(): void {
  _session        = null;
  _initPromise    = null;
  _modelUnavailable = false;
}

/**
 * Image preprocessing for the ShopSherpa visual-risk model.
 *
 * Must match the Python training pipeline exactly:
 *   torchvision.transforms.Resize((imageSize, imageSize))  ← fit='fill', no padding
 *   torchvision.transforms.ToTensor()                       ← uint8 → float32, divide by 255
 *   torchvision.transforms.Normalize(mean, std)             ← (x - mean[c]) / std[c]
 *   CHW order                                               ← channels-first for PyTorch
 *
 * Any deviation here produces a distribution shift between training and inference.
 * Tests in tests/visual/preprocess.test.ts verify pixel-level numeric parity.
 */

import sharp from 'sharp';

// Re-exported for unit testing without needing a real image buffer.
export function normalizeChannel(
  uint8Value: number,
  channelIndex: 0 | 1 | 2,
  mean: readonly [number, number, number],
  std: readonly [number, number, number],
): number {
  // Step 1: ToTensor() — convert [0, 255] uint8 to [0.0, 1.0] float
  const floatVal = uint8Value / 255.0;
  // Step 2: Normalize — (x - mean) / std
  return (floatVal - mean[channelIndex]) / std[channelIndex];
}

/**
 * Decode an image buffer (JPEG, PNG, WebP, …) and return a Float32Array
 * of shape [3, imageSize, imageSize] in CHW order, ImageNet-normalized.
 *
 * @param imageBuffer  Raw image bytes (any format sharp can decode)
 * @param imageSize    Target side length in pixels (must match model training)
 * @param mean         ImageNet channel means [R, G, B]
 * @param std          ImageNet channel stds  [R, G, B]
 */
export async function preprocessImage(
  imageBuffer: Buffer,
  imageSize: number,
  mean: readonly [number, number, number],
  std: readonly [number, number, number],
): Promise<Float32Array> {
  // Decode, resize to exact imageSize×imageSize, strip alpha → raw uint8 HWC bytes.
  // fit: 'fill' matches torchvision Resize which stretches to exact dimensions.
  // kernel: 'lanczos3' is sharp's default; difference vs bilinear is imperceptible.
  const { data } = await sharp(imageBuffer)
    .resize(imageSize, imageSize, { fit: 'fill', kernel: 'lanczos3' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channelSize = imageSize * imageSize;
  const tensor = new Float32Array(3 * channelSize);

  // Reorder HWC → CHW while applying normalization.
  // data layout: data[i*3+0] = R,  data[i*3+1] = G,  data[i*3+2] = B
  for (let i = 0; i < channelSize; i++) {
    tensor[0 * channelSize + i] = normalizeChannel(data[i * 3 + 0], 0, mean, std);
    tensor[1 * channelSize + i] = normalizeChannel(data[i * 3 + 1], 1, mean, std);
    tensor[2 * channelSize + i] = normalizeChannel(data[i * 3 + 2], 2, mean, std);
  }

  return tensor;
}

/**
 * Decode a screenshot data URL ("data:image/jpeg;base64,...") to a Buffer.
 * Returns null if the string is not a valid data URL.
 */
export function decodeDataUrl(dataUrl: string): Buffer | null {
  const match = dataUrl.match(/^data:image\/[\w+.-]+;base64,(.+)$/s);
  if (!match) return null;
  return Buffer.from(match[1], 'base64');
}

/** Convert DDP paint buffer (RGB or RGBW) to RGBA for layout preview. */

export function bufferToPreviewPixels(
  buffer: Uint8Array,
  pixelCount: number,
  rgbw: boolean
): Uint8ClampedArray {
  const bpp = rgbw ? 4 : 3;
  const out = new Uint8ClampedArray(pixelCount * 4);
  for (let i = 0; i < pixelCount; i++) {
    const o = i * bpp;
    const p = i * 4;
    out[p] = buffer[o] ?? 0;
    out[p + 1] = buffer[o + 1] ?? 0;
    out[p + 2] = buffer[o + 2] ?? 0;
    out[p + 3] = rgbw ? (buffer[o + 3] ?? 0) : 255;
  }
  return out;
}

export function ledsInBrush(center: number, brushSize: number, pixelCount: number): number[] {
  const half = Math.max(1, Math.floor(brushSize / 2));
  const out: number[] = [];
  for (let d = -half; d <= half; d++) {
    const idx = center + d;
    if (idx >= 0 && idx < pixelCount) out.push(idx);
  }
  return out;
}

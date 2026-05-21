/** Floorplan / photo background layer for layout designer & geometry preview. */

export interface BackgroundLayer {
  url: string;
  opacity?: number;
  brightness?: number;
  saturation?: number;
  rotation?: number;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
  cropX?: number;
  cropY?: number;
  cropW?: number;
  cropH?: number;
}

export const DEFAULT_BACKGROUND: Required<
  Pick<
    BackgroundLayer,
    | "opacity"
    | "brightness"
    | "saturation"
    | "rotation"
    | "offsetX"
    | "offsetY"
    | "scale"
    | "cropX"
    | "cropY"
    | "cropW"
    | "cropH"
  >
> = {
  opacity: 0.55,
  brightness: 1,
  saturation: 1,
  rotation: 0,
  offsetX: 0,
  offsetY: 0,
  scale: 1,
  cropX: 0,
  cropY: 0,
  cropW: 1,
  cropH: 1,
};

export function normalizeBackground(
  url: string | null | undefined,
  raw?: Partial<BackgroundLayer> | null
): BackgroundLayer | null {
  if (!url) return null;
  return {
    url,
    opacity: raw?.opacity ?? DEFAULT_BACKGROUND.opacity,
    brightness: raw?.brightness ?? DEFAULT_BACKGROUND.brightness,
    saturation: raw?.saturation ?? DEFAULT_BACKGROUND.saturation,
    rotation: raw?.rotation ?? DEFAULT_BACKGROUND.rotation,
    offsetX: raw?.offsetX ?? DEFAULT_BACKGROUND.offsetX,
    offsetY: raw?.offsetY ?? DEFAULT_BACKGROUND.offsetY,
    scale: raw?.scale ?? DEFAULT_BACKGROUND.scale,
    cropX: raw?.cropX ?? DEFAULT_BACKGROUND.cropX,
    cropY: raw?.cropY ?? DEFAULT_BACKGROUND.cropY,
    cropW: raw?.cropW ?? DEFAULT_BACKGROUND.cropW,
    cropH: raw?.cropH ?? DEFAULT_BACKGROUND.cropH,
  };
}

export function backgroundFromLayout(layout: {
  background_url?: string | null;
  background?: Partial<BackgroundLayer> | null;
}): BackgroundLayer | null {
  const url = layout.background?.url ?? layout.background_url;
  return normalizeBackground(url, layout.background ?? null);
}

/** Draw photo under layout geometry (canvas pixel coords). */
export function drawBackgroundLayer(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  img: HTMLImageElement,
  layer: BackgroundLayer
): void {
  const o = layer.opacity ?? DEFAULT_BACKGROUND.opacity;
  const bright = layer.brightness ?? 1;
  const sat = layer.saturation ?? 1;
  const rot = ((layer.rotation ?? 0) * Math.PI) / 180;
  const ox = (layer.offsetX ?? 0) * w;
  const oy = (layer.offsetY ?? 0) * h;
  const scale = layer.scale ?? 1;
  const cx = layer.cropX ?? 0;
  const cy = layer.cropY ?? 0;
  const cw = layer.cropW ?? 1;
  const ch = layer.cropH ?? 1;
  const sw = img.naturalWidth * cw;
  const sh = img.naturalHeight * ch;
  const sx = img.naturalWidth * cx;
  const sy = img.naturalHeight * cy;

  const fit = Math.max(w / sw, h / sh) * scale;
  const dw = sw * fit;
  const dh = sh * fit;

  ctx.save();
  ctx.globalAlpha = o;
  ctx.filter = `brightness(${bright}) saturate(${sat})`;
  ctx.translate(w / 2 + ox, h / 2 + oy);
  ctx.rotate(rot);
  ctx.drawImage(img, sx, sy, sw, sh, -dw / 2, -dh / 2, dw, dh);
  ctx.restore();
}

/** Render adjusted + cropped image to a blob for upload. */
export async function renderBackgroundBlob(
  img: HTMLImageElement,
  layer: BackgroundLayer,
  maxEdge = 2048
): Promise<Blob> {
  const cx = layer.cropX ?? 0;
  const cy = layer.cropY ?? 0;
  const cw = layer.cropW ?? 1;
  const ch = layer.cropH ?? 1;
  const sw = Math.max(1, Math.floor(img.naturalWidth * cw));
  const sh = Math.max(1, Math.floor(img.naturalHeight * ch));
  const sx = Math.floor(img.naturalWidth * cx);
  const sy = Math.floor(img.naturalHeight * cy);

  const scale = Math.min(1, maxEdge / Math.max(sw, sh));
  const w = Math.max(1, Math.floor(sw * scale));
  const h = Math.max(1, Math.floor(sh * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");

  const bright = layer.brightness ?? 1;
  const sat = layer.saturation ?? 1;
  const rot = ((layer.rotation ?? 0) * Math.PI) / 180;

  ctx.filter = `brightness(${bright}) saturate(${sat})`;
  ctx.translate(w / 2, h / 2);
  ctx.rotate(rot);
  ctx.drawImage(img, sx, sy, sw, sh, -w / 2, -h / 2, w, h);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Encode failed"))),
      "image/jpeg",
      0.9
    );
  });
}

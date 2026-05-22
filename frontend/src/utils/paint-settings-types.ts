/** Brush / unpainted-fill settings sent with paint frames and commit. */

export interface PaintBrushSettings {
  on: boolean;
  bri: number;
  fx: number;
  pal: number;
  col: [number, number, number, number];
  sx: number;
  ix: number;
  c1: number;
  c2: number;
  c3: number;
  o1: boolean;
  o2: boolean;
  o3: boolean;
}

export type UnpaintedFillMode = "off" | "preserve" | "custom";

export interface UnpaintedFillSettings extends PaintBrushSettings {
  mode: UnpaintedFillMode;
}

export function defaultBrushSettings(
  fx = 0,
  col: [number, number, number, number] = [255, 51, 102, 0]
): PaintBrushSettings {
  return {
    on: true,
    bri: 255,
    fx,
    pal: 0,
    col,
    sx: 128,
    ix: 128,
    c1: 128,
    c2: 128,
    c3: 128,
    o1: false,
    o2: false,
    o3: false,
  };
}

export function defaultFillSettings(
  mode: UnpaintedFillMode = "off"
): UnpaintedFillSettings {
  return {
    mode,
    on: mode !== "off",
    bri: mode === "off" ? 0 : 128,
    fx: 0,
    pal: 0,
    col: [0, 0, 0, 0],
    sx: 128,
    ix: 128,
    c1: 128,
    c2: 128,
    c3: 128,
    o1: false,
    o2: false,
    o3: false,
  };
}

export function brushToPaintMode(
  brush: PaintBrushSettings,
  effectsByName: Record<string, number>
): "color" | "effect" {
  const solid = effectsByName["Solid"] ?? 0;
  return brush.fx === solid ? "color" : "effect";
}

export function fillPreviewRgb(fill: UnpaintedFillSettings): [number, number, number] {
  if (fill.mode === "off") return [0, 0, 0];
  return [fill.col[0], fill.col[1], fill.col[2]];
}

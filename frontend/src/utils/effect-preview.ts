/**
 * Visual preview backgrounds for effect chips that have no captured thumbnail.
 *
 * Captured WebP thumbnails are produced by a separate runtime process and are
 * commonly absent. This module derives a color preview purely on the client so
 * every effect still shows *something* recognisable:
 *
 *  - palette-driven effects use the selected palette's gradient (device preview
 *    when available, otherwise the built-in palette table);
 *  - solid effects use a neutral swatch;
 *  - everything else gets a stable, name-hashed gradient nudged by category so
 *    sound / 2D effects read distinctly.
 */

import { paletteGradientCss } from "./palette-gradients.js";

export interface EffectPreviewOptions {
  /** Sound flag for this effect id ("v" volume, "f" frequency, "2" matrix). */
  flag?: string | null;
  /** True when this effect is the Solid effect. */
  isSolid?: boolean;
  /** True when palette colors should drive the preview. */
  paletteAware?: boolean;
  /** Currently selected palette id (0 = default). */
  selectedPaletteId?: number;
  /** Selected palette name, for the built-in gradient fallback. */
  selectedPaletteName?: string;
  /** Device-supplied palette gradients keyed by palette id (palx). */
  palettePreviews?: Record<string, string>;
}

function hash(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0;
  }
  return h;
}

/** Whether the effect name reads as palette-driven (renders palette colors). */
export function effectUsesPalette(name: string): boolean {
  const lower = name.toLowerCase();
  return (
    lower.includes("palette") ||
    lower.includes("colorloop") ||
    lower.includes("pride") ||
    lower.includes("rainbow") ||
    lower.includes("cycle") ||
    lower.includes("aurora") ||
    lower.includes("flow") ||
    lower.includes("noise")
  );
}

/**
 * CSS ``background`` value for an effect chip with no captured thumbnail.
 *
 * Always returns a gradient or solid color (never empty) so the chip renders a
 * visual preview offline / before any device fetch.
 */
export function effectPreviewBackgroundCss(
  name: string,
  opts: EffectPreviewOptions = {}
): string {
  const {
    flag = null,
    isSolid = false,
    paletteAware = false,
    selectedPaletteId = 0,
    selectedPaletteName,
    palettePreviews,
  } = opts;

  if (isSolid) {
    // Neutral, low-chroma swatch — solid renders a single chosen color.
    return "linear-gradient(135deg, hsl(220 12% 42%), hsl(220 14% 26%))";
  }

  // Palette-driven effects: mirror the actual palette the user has selected.
  if (paletteAware || effectUsesPalette(name)) {
    const fromDevice = palettePreviews?.[String(selectedPaletteId)];
    if (fromDevice) return fromDevice;
    if (selectedPaletteName) return paletteGradientCss(selectedPaletteName);
    return paletteGradientCss(name);
  }

  // Category-derived gradient: stable per name, hue-shifted by reactivity/2D so
  // distinct categories look distinct.
  const h = hash(name);
  const base = h % 360;
  let spread = 40;
  let sat = 72;
  let light = 46;
  if (flag === "v" || flag === "f") {
    // Sound-reactive: punchier, wider spectrum.
    spread = 90;
    sat = 85;
    light = 50;
  } else if (flag === "2") {
    // 2D matrix: cooler, calmer.
    sat = 60;
    light = 40;
  }
  const h2 = (base + spread) % 360;
  const h3 = (base + spread * 2) % 360;
  return `linear-gradient(135deg, hsl(${base} ${sat}% ${light}%), hsl(${h2} ${sat}% ${
    light + 8
  }%), hsl(${h3} ${sat}% ${light + 2}%))`;
}

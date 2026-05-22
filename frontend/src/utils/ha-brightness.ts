/** Read HA light brightness as 0–100% from entity state attributes. */
export function readBrightnessPct(
  st: { state?: string; attributes?: Record<string, unknown> } | undefined
): number {
  if (!st) return 0;
  const pct = st.attributes?.brightness_pct;
  if (typeof pct === "number" && Number.isFinite(pct)) {
    return Math.max(0, Math.min(100, Math.round(pct)));
  }
  const bri = st.attributes?.brightness;
  if (typeof bri === "number" && Number.isFinite(bri)) {
    return Math.round((Math.max(0, Math.min(255, bri)) / 255) * 100);
  }
  return st.state === "on" ? 100 : 0;
}

export function pctTo255(pct: number): number {
  return Math.round((Math.max(0, Math.min(100, pct)) / 100) * 255);
}

export function readBrightness255(
  st: { state?: string; attributes?: Record<string, unknown> } | undefined
): number {
  return pctTo255(readBrightnessPct(st));
}

/** Read HA light rgb/rgbw as [r, g, b, w] or null when unavailable. */
export function readEntityColor(
  st: { attributes?: Record<string, unknown> } | undefined
): [number, number, number, number] | null {
  if (!st) return null;
  const rgbw = st.attributes?.rgbw_color;
  if (Array.isArray(rgbw) && rgbw.length >= 3) {
    return [
      Number(rgbw[0]) || 0,
      Number(rgbw[1]) || 0,
      Number(rgbw[2]) || 0,
      Number(rgbw[3]) || 0,
    ];
  }
  const rgb = st.attributes?.rgb_color;
  if (Array.isArray(rgb) && rgb.length >= 3) {
    return [
      Number(rgb[0]) || 0,
      Number(rgb[1]) || 0,
      Number(rgb[2]) || 0,
      0,
    ];
  }
  return null;
}

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

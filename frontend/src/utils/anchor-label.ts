/** Font size in model units so labels stay ~constant size on screen when zooming. */
export function vertexLabelFontSize(viewScale: number): number {
  const safe = Math.max(viewScale, 0.01);
  return Math.max(9, Math.min(13, 11 / safe));
}

/** External label: vertex index + anchor LED (e.g. v3 · 89). */
export function vertexAnchorLabel(vertexIndex: number, anchorLed: number): string {
  return `v${vertexIndex} · ${anchorLed}`;
}

/** External label for vertices without an anchor LED yet. */
export function vertexIndexLabel(vertexIndex: number): string {
  return `v${vertexIndex}`;
}

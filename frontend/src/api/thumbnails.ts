/** Effect thumbnail URLs (capture runner not wired in Phase 4 scaffold). */

export type ThumbVariant = "strip" | "geom";

/** API path served by ``WledStudioThumbView`` (Cache-Control: no-cache). */
export function thumbApiUrl(controllerId: string, filename: string): string {
  const cid = encodeURIComponent(controllerId);
  const file = encodeURIComponent(filename);
  return `/api/wled_studio/thumb/${cid}/${file}`;
}

/** Default on-disk basename for one effect (strip variant, palette 0). */
export function thumbFilenameForFx(
  fxId: number,
  variant: ThumbVariant = "strip"
): string {
  return `${fxId}_${variant}.webp`;
}

/**
 * Resolved thumbnail URL for an effect chip/tile.
 * Returns ``undefined`` until the capture runner has written files under www.
 */
export function thumbUrlForFx(
  controllerId: string,
  fxId: number,
  variant: ThumbVariant = "strip"
): string | undefined {
  if (!controllerId) return undefined;
  void fxId;
  void variant;
  return undefined;
}

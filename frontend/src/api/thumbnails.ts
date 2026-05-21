/** Effect thumbnail URLs served via integration HTTP view (not /local/). */

export type ThumbVariant = "strip" | "geom";

/** API path served by ``WledStudioThumbView`` (Cache-Control: no-cache). */
export function thumbApiUrl(controllerId: string, filename: string): string {
  const cid = encodeURIComponent(controllerId);
  const file = encodeURIComponent(filename);
  return `/api/wled_studio/thumb/${cid}/${file}`;
}

function sanitizeFwVer(fwVer: string): string {
  const safe = (fwVer || "").trim().replace(/[^\w.-]+/g, "_");
  return safe || "unknown";
}

/** On-disk basename aligned with ``thumbnails.thumb_filename`` in Python. */
export function thumbFilenameForFx(
  fxId: number,
  variant: ThumbVariant = "strip",
  fwVer?: string,
  paletteId = 0
): string {
  let base = String(fxId);
  if (paletteId) base = `${base}_p${paletteId}`;
  if (fwVer?.trim()) base = `${base}_${sanitizeFwVer(fwVer)}`;
  return `${base}_${variant}.webp`;
}

/**
 * Resolved thumbnail URL when a captured file exists (caller may probe via img onerror).
 */
export function thumbUrlForFx(
  controllerId: string,
  fxId: number,
  variant: ThumbVariant = "strip",
  fwVer?: string
): string | undefined {
  if (!controllerId || fxId < 0) return undefined;
  const file = thumbFilenameForFx(fxId, variant, fwVer);
  return thumbApiUrl(controllerId, file);
}

/** Effect thumbnail URLs under HA ``/local/`` (files in ``/config/www/wled_studio/thumbs/``). */

import type { HomeAssistant } from "custom-card-helpers";
import { withHaAuth } from "../utils/ha-auth-url.js";

export type ThumbVariant = "strip" | "geom";

/** Public URL prefix for captured WebP files (served from www). */
export const THUMB_LOCAL_PREFIX = "/local/wled_studio/thumbs";

/** @deprecated Use ``thumbLocalUrl`` — API view requires cookie auth that img tags lack. */
export function thumbApiUrl(controllerId: string, filename: string): string {
  const cid = encodeURIComponent(controllerId);
  const file = encodeURIComponent(filename);
  return `/api/wled_studio/thumb/${cid}/${file}`;
}

export function thumbLocalUrl(controllerId: string, filename: string): string {
  const cid = encodeURIComponent(controllerId);
  const file = encodeURIComponent(filename);
  return `${THUMB_LOCAL_PREFIX}/${cid}/${file}`;
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
  fwVer?: string,
  hass?: HomeAssistant
): string | undefined {
  if (!controllerId || fxId < 0) return undefined;
  const file = thumbFilenameForFx(fxId, variant, fwVer);
  return withHaAuth(thumbLocalUrl(controllerId, file), hass);
}

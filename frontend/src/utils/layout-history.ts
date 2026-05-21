/** Undo/redo snapshots for the layout designer (document state only, not viewport). */

import type { GuidePath } from "./draw-tools.js";
import type { BackgroundLayer } from "./background-layer.js";

export interface LayoutVertexSnapshot {
  x: number;
  y: number;
  anchorLed: number | null;
}

export interface LayoutDesignerSnapshot {
  vertices: LayoutVertexSnapshot[];
  guide: GuidePath | null;
  closed: boolean;
  bgLayer: BackgroundLayer | null;
  backgroundUrl: string | null;
  scalePxPerM: number | null;
  selectedVtx: number;
  anchorInput: string;
}

export function cloneLayoutSnapshot(
  snap: LayoutDesignerSnapshot
): LayoutDesignerSnapshot {
  return {
    vertices: snap.vertices.map((v) => ({ ...v })),
    guide: snap.guide
      ? {
          points: snap.guide.points.map((p) => [p[0], p[1]] as [number, number]),
          closed: snap.guide.closed,
          kind: snap.guide.kind,
        }
      : null,
    closed: snap.closed,
    bgLayer: snap.bgLayer ? { ...snap.bgLayer } : null,
    backgroundUrl: snap.backgroundUrl,
    scalePxPerM: snap.scalePxPerM,
    selectedVtx: snap.selectedVtx,
    anchorInput: snap.anchorInput,
  };
}

export const VIEW_SCALE_MIN = 0.15;
export const VIEW_SCALE_MAX = 8;
export const PHOTO_SCALE_MIN = 0.25;
export const PHOTO_SCALE_MAX = 4;

/** Map view scale ↔ slider 0–100 (logarithmic). */
export function viewScaleToSlider(scale: number): number {
  const s = Math.max(VIEW_SCALE_MIN, Math.min(VIEW_SCALE_MAX, scale));
  const t =
    (Math.log(s) - Math.log(VIEW_SCALE_MIN)) /
    (Math.log(VIEW_SCALE_MAX) - Math.log(VIEW_SCALE_MIN));
  return Math.round(t * 100);
}

export function sliderToViewScale(slider: number): number {
  const t = Math.max(0, Math.min(100, slider)) / 100;
  return Math.exp(
    Math.log(VIEW_SCALE_MIN) + t * (Math.log(VIEW_SCALE_MAX) - Math.log(VIEW_SCALE_MIN))
  );
}

export function photoScaleToSlider(scale: number): number {
  const s = Math.max(PHOTO_SCALE_MIN, Math.min(PHOTO_SCALE_MAX, scale));
  const t =
    (Math.log(s) - Math.log(PHOTO_SCALE_MIN)) /
    (Math.log(PHOTO_SCALE_MAX) - Math.log(PHOTO_SCALE_MIN));
  return Math.round(t * 100);
}

export function sliderToPhotoScale(slider: number): number {
  const t = Math.max(0, Math.min(100, slider)) / 100;
  return Math.exp(
    Math.log(PHOTO_SCALE_MIN) +
      t * (Math.log(PHOTO_SCALE_MAX) - Math.log(PHOTO_SCALE_MIN))
  );
}

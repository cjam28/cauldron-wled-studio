import type { SceneRecord } from "../api/scenes.js";
import { parseColSlot } from "../api/wled-state.js";

type WledSegLike = {
  col?: unknown;
  bri?: number;
  on?: boolean;
};

function scaleChannel(value: number, factor: number): number {
  return Math.max(0, Math.min(255, Math.round(value * factor)));
}

function rgbCss(r: number, g: number, b: number): string {
  return `rgb(${r}, ${g}, ${b})`;
}

/** Dominant RGB colors from a scene's stored WLED state (first segment col or bri). */
export function extractSceneColors(
  wledState: Record<string, unknown> | undefined
): string[] {
  const state = wledState ?? {};
  if (state.on === false) {
    return ["rgb(26, 26, 26)", "rgb(13, 13, 13)"];
  }

  const globalBri =
    typeof state.bri === "number" && Number.isFinite(state.bri)
      ? Math.max(0, Math.min(255, state.bri))
      : 128;
  const segs = Array.isArray(state.seg) ? state.seg : [];
  const seg0 = (segs[0] ?? {}) as WledSegLike;
  if (seg0.on === false) {
    return ["rgb(26, 26, 26)", "rgb(13, 13, 13)"];
  }

  const briFactor =
    (typeof seg0.bri === "number" && Number.isFinite(seg0.bri)
      ? Math.max(0, Math.min(255, seg0.bri))
      : globalBri) / 255;

  const colors: string[] = [];
  if (Array.isArray(seg0.col)) {
    for (const slot of seg0.col.slice(0, 3)) {
      const [r, g, b] = parseColSlot(slot as number[]);
      colors.push(
        rgbCss(
          scaleChannel(r, briFactor),
          scaleChannel(g, briFactor),
          scaleChannel(b, briFactor)
        )
      );
    }
  }

  if (!colors.length) {
    const v = scaleChannel(255, briFactor);
    const warm = scaleChannel(220, briFactor);
    colors.push(rgbCss(v, warm, Math.min(255, warm - 20)));
  }

  return colors;
}

/** CSS `background` value for a soft multi-stop scene gradient. */
export function sceneGradientBackground(colors: string[]): string {
  if (!colors.length) {
    return "linear-gradient(135deg, var(--wled-surface-elevated), var(--wled-surface))";
  }
  if (colors.length === 1) {
    const c = colors[0];
    return `linear-gradient(135deg, ${c}, color-mix(in srgb, ${c} 55%, rgb(0 0 0)))`;
  }
  const stops = colors
    .map((c, i) => {
      const pct = Math.round((i / (colors.length - 1)) * 100);
      return `${c} ${pct}%`;
    })
    .join(", ");
  return `linear-gradient(135deg, ${stops})`;
}

export function scenePreviewGradientStyle(
  scene: Pick<SceneRecord, "wled_state">
): string {
  return sceneGradientBackground(extractSceneColors(scene.wled_state));
}

export function sceneHasThumb(
  scene: Pick<SceneRecord, "scene_thumb_url">
): boolean {
  return Boolean(scene.scene_thumb_url?.trim());
}

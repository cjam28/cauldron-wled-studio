/** Effect list filters aligned with WLED fxdata flags and common groupings. */

export type EffectCategory =
  | "all"
  | "1d"
  | "2d"
  | "sound"
  | "palette"
  | "solid";

export const EFFECT_CATEGORY_LABELS: Record<EffectCategory, string> = {
  all: "All",
  "1d": "1D",
  "2d": "2D",
  solid: "Solid",
  sound: "Music",
  palette: "Palette",
};

export function solidEffectId(effectsByName: Record<string, number>): number {
  if (effectsByName.Solid !== undefined) return effectsByName.Solid;
  return 0;
}

const SOUND_NAME =
  /\b(dj|sound|music|audio|beat|freq|grav|jugg|ripple|water|pixel|rock|streak|popcorn|balls|fireworks|matrix|stream|peak|level|radio|sync|reactive|volume|puddle|ripple|noisem|noisep|noisemove|pixels|juggle|sinelon|phased|blurz|djlight)\b/i;

export function isSoundReactiveEffect(
  name: string,
  effectId: number,
  soundFlags: Array<string | null>
): boolean {
  const flag = soundFlags[effectId] ?? null;
  if (flag === "v" || flag === "f") return true;
  return SOUND_NAME.test(name);
}

export function matchesEffectCategory(
  name: string,
  effectId: number,
  category: EffectCategory,
  soundFlags: Array<string | null>,
  effectsByName: Record<string, number>
): boolean {
  if (category === "all") return true;
  const flag = soundFlags[effectId] ?? null;
  const lower = name.toLowerCase();
  if (category === "solid") {
    return effectId === solidEffectId(effectsByName);
  }
  if (category === "2d") {
    return flag === "2" || lower.includes("2d");
  }
  if (category === "1d") {
    return flag !== "2" && !lower.includes("2d");
  }
  if (category === "sound") {
    return isSoundReactiveEffect(name, effectId, soundFlags);
  }
  if (category === "palette") {
    return (
      lower.includes("palette") ||
      lower.includes("colorloop") ||
      lower.includes("pride") ||
      lower.includes("cycle")
    );
  }
  return true;
}

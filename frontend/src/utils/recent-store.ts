/** Per-controller recent effects/scenes in localStorage (Studio UI only). */

const EFFECT_KEY = "wled_studio.recent_effects";
const SCENE_KEY = "wled_studio.recent_scenes";
const MAX_EFFECTS = 10;
const MAX_SCENES = 10;

export interface RecentEffectEntry {
  id: number;
  name: string;
}

export interface RecentSceneEntry {
  id: string;
  name: string;
}

function readMap<T>(key: string): Record<string, T[]> {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, T[]>;
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

function writeMap<T>(key: string, map: Record<string, T[]>): void {
  try {
    localStorage.setItem(key, JSON.stringify(map));
  } catch {
    /* private mode / quota */
  }
}

export function getRecentEffects(controllerId: string): RecentEffectEntry[] {
  if (!controllerId) return [];
  return readMap<RecentEffectEntry>(EFFECT_KEY)[controllerId] ?? [];
}

export function pushRecentEffect(
  controllerId: string,
  effectId: number,
  name: string,
  options?: { skipSolid?: boolean; solidId?: number }
): RecentEffectEntry[] {
  if (!controllerId) return [];
  if (options?.skipSolid && effectId === (options.solidId ?? 0)) {
    return getRecentEffects(controllerId);
  }
  const map = readMap<RecentEffectEntry>(EFFECT_KEY);
  const list = (map[controllerId] ?? []).filter((e) => e.id !== effectId);
  list.unshift({ id: effectId, name });
  map[controllerId] = list.slice(0, MAX_EFFECTS);
  writeMap(EFFECT_KEY, map);
  return map[controllerId];
}

export function getRecentScenes(controllerId: string): RecentSceneEntry[] {
  if (!controllerId) return [];
  return readMap<RecentSceneEntry>(SCENE_KEY)[controllerId] ?? [];
}

export function pushRecentScene(
  controllerId: string,
  sceneId: string,
  name: string
): RecentSceneEntry[] {
  if (!controllerId) return [];
  const map = readMap<RecentSceneEntry>(SCENE_KEY);
  const list = (map[controllerId] ?? []).filter((e) => e.id !== sceneId);
  list.unshift({ id: sceneId, name });
  map[controllerId] = list.slice(0, MAX_SCENES);
  writeMap(SCENE_KEY, map);
  return map[controllerId];
}

/** How many chips fit in a row without horizontal scroll. */
export function maxItemsForRowWidth(
  widthPx: number,
  minChipPx = 72,
  gapPx = 6,
  cap = 10
): number {
  if (widthPx <= 0) return 1;
  const slot = minChipPx + gapPx;
  return Math.max(1, Math.min(cap, Math.floor((widthPx + gapPx) / slot)));
}

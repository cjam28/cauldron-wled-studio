/** Pinned effects/scenes that persist outside the recents ring buffer. */

const PINNED_EFFECTS_KEY = "wled_studio.pinned_effects";
const PINNED_SCENES_KEY = "wled_studio.pinned_scenes";

export interface PinnedEffectEntry {
  id: number;
  name: string;
}

export interface PinnedSceneEntry {
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
    /* quota / private mode */
  }
}

export function getPinnedEffects(controllerId: string): PinnedEffectEntry[] {
  if (!controllerId) return [];
  return readMap<PinnedEffectEntry>(PINNED_EFFECTS_KEY)[controllerId] ?? [];
}

export function togglePinnedEffect(
  controllerId: string,
  effectId: number,
  name: string
): PinnedEffectEntry[] {
  if (!controllerId) return [];
  const map = readMap<PinnedEffectEntry>(PINNED_EFFECTS_KEY);
  const list = map[controllerId] ?? [];
  const idx = list.findIndex((e) => e.id === effectId);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.unshift({ id: effectId, name });
  }
  map[controllerId] = list;
  writeMap(PINNED_EFFECTS_KEY, map);
  return map[controllerId];
}

export function isEffectPinned(controllerId: string, effectId: number): boolean {
  return getPinnedEffects(controllerId).some((e) => e.id === effectId);
}

export function getPinnedScenes(controllerId: string): PinnedSceneEntry[] {
  if (!controllerId) return [];
  return readMap<PinnedSceneEntry>(PINNED_SCENES_KEY)[controllerId] ?? [];
}

export function togglePinnedScene(
  controllerId: string,
  sceneId: string,
  name: string
): PinnedSceneEntry[] {
  if (!controllerId) return [];
  const map = readMap<PinnedSceneEntry>(PINNED_SCENES_KEY);
  const list = map[controllerId] ?? [];
  const idx = list.findIndex((e) => e.id === sceneId);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.unshift({ id: sceneId, name });
  }
  map[controllerId] = list;
  writeMap(PINNED_SCENES_KEY, map);
  return map[controllerId];
}

export function isScenePinned(controllerId: string, sceneId: string): boolean {
  return getPinnedScenes(controllerId).some((e) => e.id === sceneId);
}

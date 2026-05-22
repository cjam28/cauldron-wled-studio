/** Saved effect slider defaults and named copies (Studio UI, localStorage). */

const DEFAULTS_KEY = "wled_studio.effect_defaults";
const LIBRARY_KEY = "wled_studio.effect_library";

export interface EffectSliderValues {
  sx?: number;
  ix?: number;
  c1?: number;
  c2?: number;
  c3?: number;
  o1?: number;
  o2?: number;
  o3?: number;
}

export interface EffectLibraryEntry extends EffectSliderValues {
  id: string;
  name: string;
  effectId: number;
  effectName: string;
  pinned: boolean;
  savedAt: number;
}

function readMap<T>(key: string): Record<string, T> {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, T>;
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

function writeMap<T>(key: string, map: Record<string, T>): void {
  try {
    localStorage.setItem(key, JSON.stringify(map));
  } catch {
    /* quota / private mode */
  }
}

function defaultsForController(
  controllerId: string
): Record<string, EffectSliderValues> {
  return readMap<Record<string, EffectSliderValues>>(DEFAULTS_KEY)[controllerId] ?? {};
}

export function getEffectDefaultSliders(
  controllerId: string,
  effectId: number
): EffectSliderValues | null {
  if (!controllerId) return null;
  const entry = defaultsForController(controllerId)[String(effectId)];
  return entry ?? null;
}

export function saveEffectDefaultSliders(
  controllerId: string,
  effectId: number,
  values: EffectSliderValues
): void {
  if (!controllerId) return;
  const map = readMap<Record<string, EffectSliderValues>>(DEFAULTS_KEY);
  const per = { ...(map[controllerId] ?? {}) };
  per[String(effectId)] = { ...values };
  map[controllerId] = per;
  writeMap(DEFAULTS_KEY, map);
}

export function loadEffectLibrary(controllerId: string): EffectLibraryEntry[] {
  if (!controllerId) return [];
  return readMap<EffectLibraryEntry[]>(LIBRARY_KEY)[controllerId] ?? [];
}

export function addEffectLibraryEntry(
  controllerId: string,
  entry: Omit<EffectLibraryEntry, "id" | "savedAt">
): EffectLibraryEntry {
  const full: EffectLibraryEntry = {
    ...entry,
    id: `fx-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    savedAt: Date.now(),
  };
  const map = readMap<EffectLibraryEntry[]>(LIBRARY_KEY);
  const list = [full, ...(map[controllerId] ?? [])];
  map[controllerId] = list.slice(0, 48);
  writeMap(LIBRARY_KEY, map);
  return full;
}

export function removeEffectLibraryEntry(
  controllerId: string,
  id: string
): void {
  const map = readMap<EffectLibraryEntry[]>(LIBRARY_KEY);
  map[controllerId] = (map[controllerId] ?? []).filter((e) => e.id !== id);
  writeMap(LIBRARY_KEY, map);
}

export function sliderValuesFromSegment(
  seg: Record<string, unknown>
): EffectSliderValues {
  const out: EffectSliderValues = {};
  for (const key of ["sx", "ix", "c1", "c2", "c3", "o1", "o2", "o3"] as const) {
    const v = seg[key];
    if (typeof v === "number") out[key] = v;
  }
  return out;
}

/** Per-controller favorite colors (browser localStorage). */

export interface ColorSwatch {
  id: string;
  name: string;
  rgb: [number, number, number];
  white: number;
}

const STORAGE_KEY = "wled_studio.color_swatches";
const MAX_SWATCHES = 32;

function storageKey(controllerId: string): string {
  return controllerId.trim() || "_default";
}

function readAll(): Record<string, ColorSwatch[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, ColorSwatch[]>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeAll(data: Record<string, ColorSwatch[]>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadColorSwatches(controllerId: string): ColorSwatch[] {
  const all = readAll();
  const list = all[storageKey(controllerId)];
  return Array.isArray(list) ? [...list] : [];
}

export function saveColorSwatches(
  controllerId: string,
  swatches: ColorSwatch[]
): void {
  const all = readAll();
  all[storageKey(controllerId)] = swatches.slice(0, MAX_SWATCHES);
  writeAll(all);
}

export function swatchColorKey(rgb: [number, number, number], white: number): string {
  return `${rgb[0]},${rgb[1]},${rgb[2]},${white}`;
}

export function defaultSwatchName(rgb: [number, number, number], white: number): string {
  const hex =
    "#" +
    [rgb[0], rgb[1], rgb[2]]
      .map((c) => Math.max(0, Math.min(255, c)).toString(16).padStart(2, "0"))
      .join("");
  return white > 0 ? `${hex} +W` : hex.toUpperCase();
}

export function addColorSwatch(
  controllerId: string,
  swatch: Omit<ColorSwatch, "id">
): ColorSwatch {
  const list = loadColorSwatches(controllerId);
  const key = swatchColorKey(swatch.rgb, swatch.white);
  const existing = list.find(
    (s) => swatchColorKey(s.rgb, s.white) === key
  );
  if (existing) {
    existing.name = swatch.name.trim() || existing.name;
    saveColorSwatches(controllerId, list);
    return existing;
  }
  const entry: ColorSwatch = {
    id: `sw_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    name: swatch.name.trim() || defaultSwatchName(swatch.rgb, swatch.white),
    rgb: [...swatch.rgb] as [number, number, number],
    white: swatch.white,
  };
  list.unshift(entry);
  saveColorSwatches(controllerId, list);
  return entry;
}

export function updateColorSwatch(
  controllerId: string,
  id: string,
  patch: Partial<Pick<ColorSwatch, "name" | "rgb" | "white">>
): ColorSwatch | null {
  const list = loadColorSwatches(controllerId);
  const idx = list.findIndex((s) => s.id === id);
  if (idx < 0) return null;
  const cur = list[idx];
  const next: ColorSwatch = {
    ...cur,
    ...patch,
    rgb: patch.rgb ? ([...patch.rgb] as [number, number, number]) : cur.rgb,
  };
  if (patch.name !== undefined) {
    next.name = patch.name.trim() || defaultSwatchName(next.rgb, next.white);
  }
  list[idx] = next;
  saveColorSwatches(controllerId, list);
  return next;
}

export function removeColorSwatch(controllerId: string, id: string): void {
  const list = loadColorSwatches(controllerId).filter((s) => s.id !== id);
  saveColorSwatches(controllerId, list);
}

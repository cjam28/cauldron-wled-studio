/** Merge segments for continuous effects; restore prior WLED segment layout. */

import type { WledSegment } from "../api/wled-state.js";

const SNAPSHOT_KEY = "wled_studio.segment_snapshot";
const MERGE_FLAG_KEY = "wled_studio.merge_for_effects";

export interface SegmentLayoutSnapshot {
  savedAt: number;
  segments: WledSegment[];
  pixelCount: number;
}

const RESTORE_KEYS = [
  "start",
  "stop",
  "len",
  "grp",
  "spc",
  "of",
  "on",
  "bri",
  "col",
  "fx",
  "sx",
  "ix",
  "c1",
  "c2",
  "c3",
  "o1",
  "o2",
  "o3",
  "pal",
  "n",
  "rev",
  "mi",
  "sel",
  "awm",
] as const;

function readJson<T>(key: string): Record<string, T> {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, T>;
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

function writeJson<T>(key: string, map: Record<string, T>): void {
  try {
    localStorage.setItem(key, JSON.stringify(map));
  } catch {
    /* quota / private mode */
  }
}

export function isMergeForEffectsActive(controllerId: string): boolean {
  return Boolean(readJson<boolean>(MERGE_FLAG_KEY)[controllerId]);
}

export function setMergeForEffectsActive(
  controllerId: string,
  active: boolean
): void {
  const map = readJson<boolean>(MERGE_FLAG_KEY);
  if (active) map[controllerId] = true;
  else delete map[controllerId];
  writeJson(MERGE_FLAG_KEY, map);
}

export function getSegmentLayoutSnapshot(
  controllerId: string
): SegmentLayoutSnapshot | null {
  return readJson<SegmentLayoutSnapshot>(SNAPSHOT_KEY)[controllerId] ?? null;
}

export function saveSegmentLayoutSnapshot(
  controllerId: string,
  segments: WledSegment[],
  pixelCount: number
): SegmentLayoutSnapshot {
  const snap: SegmentLayoutSnapshot = {
    savedAt: Date.now(),
    segments: segments.map((s) => ({ ...s })),
    pixelCount,
  };
  const map = readJson<SegmentLayoutSnapshot>(SNAPSHOT_KEY);
  map[controllerId] = snap;
  writeJson(SNAPSHOT_KEY, map);
  return snap;
}

export function clearSegmentLayoutSnapshot(controllerId: string): void {
  const map = readJson<SegmentLayoutSnapshot>(SNAPSHOT_KEY);
  delete map[controllerId];
  writeJson(SNAPSHOT_KEY, map);
}

export function segmentRestorePayload(seg: WledSegment): Record<string, unknown> {
  const raw = seg as Record<string, unknown>;
  const out: Record<string, unknown> = { id: seg.id };
  for (const key of RESTORE_KEYS) {
    const v = raw[key];
    if (v !== undefined) out[key] = v;
  }
  return out;
}

export function buildRestoreSegmentsState(
  snapshot: SegmentLayoutSnapshot
): Record<string, unknown> {
  return {
    seg: snapshot.segments.map((s) => segmentRestorePayload(s)),
  };
}

/** One active segment spanning the union of targets; others zeroed on WLED. */
export function buildMergeForEffectsState(
  segments: WledSegment[],
  pixelCount: number,
  targetIds?: number[]
): Record<string, unknown> {
  const list = segments.length
    ? [...segments].sort((a, b) => a.id - b.id)
    : [{ id: 0, start: 0, stop: pixelCount, on: true } as WledSegment];

  const idSet = targetIds?.length ? new Set(targetIds) : null;
  const targets = idSet ? list.filter((s) => idSet.has(s.id)) : list;
  const active = targets.filter((s) => (s.stop ?? 0) > (s.start ?? 0));
  const use = active.length ? active : targets.length ? targets : list;

  const start = Math.min(...use.map((s) => s.start ?? 0));
  const stop = Math.max(...use.map((s) => s.stop ?? pixelCount));
  const primary = use[0];

  const merged: Record<string, unknown> = {
    id: 0,
    start,
    stop,
    on: primary.on !== false,
    sel: true,
    bri: primary.bri ?? 255,
    fx: primary.fx ?? 0,
    n: "Merged (effects)",
  };
  if (primary.col !== undefined) merged.col = primary.col;
  if (primary.pal !== undefined) merged.pal = primary.pal;

  const payload: Record<string, unknown>[] = [merged];
  for (const s of list) {
    if (s.id === 0) continue;
    const end = s.stop ?? s.start ?? 0;
    payload.push({
      id: s.id,
      start: end,
      stop: end,
      on: false,
      sel: false,
    });
  }
  return { seg: payload };
}

export function mergedEffectTargetIds(
  segments: WledSegment[],
  mergeActive: boolean
): number[] {
  if (!mergeActive) return [];
  const main = segments.find((s) => s.id === 0);
  return main ? [0] : segments.length ? [segments[0].id] : [0];
}

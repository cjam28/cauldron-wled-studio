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

/**
 * True when the user has enabled merge-for-effects for this controller.
 *
 * This used to default to TRUE for unknown controllers ("default-true UI
 * state"), which made every fresh browser render the merge toggle checked with
 * no layout snapshot behind it — unchecking then threw "No saved segment
 * layout to restore" even though the device was never merged. Merge state now
 * exists only after an explicit opt-in: presence in storage ⟺ opted in.
 */
export function isMergeForEffectsActive(controllerId: string): boolean {
  return isMergeForEffectsExplicit(controllerId);
}

/**
 * True only when the user has EXPLICITLY enabled merge-for-effects for this
 * controller (P1-1). {@link isMergeForEffectsActive} now shares these
 * semantics; both names are kept for call-site intent.
 */
export function isMergeForEffectsExplicit(controllerId: string): boolean {
  if (!controllerId) return false;
  const map = readJson<boolean>(MERGE_FLAG_KEY);
  // setMergeForEffectsActive() stores the key only when explicitly enabled and
  // deletes it when disabled, so presence ⟺ explicit opt-in.
  return controllerId in map && Boolean(map[controllerId]);
}

/** Name stamped on the merged span so a Studio merge is recognizable later. */
export const MERGED_SEGMENT_NAME = "Merged (effects)";

/** True when segment 0 spans most of the strip (merge already applied on device). */
export function isWledLayoutMerged(
  segments: WledSegment[],
  pixelCount: number
): boolean {
  const seg0 = segments.find((s) => s.id === 0);
  if (!seg0 || pixelCount <= 0) return false;
  const span = (seg0.stop ?? 0) - (seg0.start ?? 0);
  return span >= pixelCount * 0.9;
}

/**
 * True when the device layout looks like the result of a Studio merge:
 * one strip-spanning segment 0 carrying the {@link MERGED_SEGMENT_NAME} stamp.
 * Distinguishes "Studio merged this" from a naturally single-segment strip so
 * clearing a stale merge flag never errors for users who never merged.
 */
export function isStudioMergedLayout(
  segments: WledSegment[],
  pixelCount: number
): boolean {
  if (!isWledLayoutMerged(segments, pixelCount)) return false;
  const seg0 = segments.find((s) => s.id === 0) as
    | (WledSegment & { n?: string })
    | undefined;
  return seg0?.n === MERGED_SEGMENT_NAME;
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
  const raw = seg as unknown as Record<string, unknown>;
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

/**
 * One active segment spanning the union of the TARGETED segments; the other
 * targeted segments are folded (deleted on WLED via stop <= start). Segments
 * outside the target set are left completely untouched — a partial-subset
 * merge must never destroy segments the user did not select. (WLED patches
 * `seg` entries by id, so omitting a segment preserves it.) The merged span
 * takes the lowest targeted id rather than hijacking id 0.
 */
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
  const mergedId = primary.id;

  const merged: Record<string, unknown> = {
    id: mergedId,
    start,
    stop,
    on: primary.on !== false,
    sel: true,
    bri: primary.bri ?? 255,
    fx: primary.fx ?? 0,
    n: MERGED_SEGMENT_NAME,
  };
  if (primary.col !== undefined) merged.col = primary.col;
  if (primary.pal !== undefined) merged.pal = primary.pal;

  const foldIds = new Set(use.map((s) => s.id));
  const payload: Record<string, unknown>[] = [merged];
  for (const s of list) {
    if (s.id === mergedId || !foldIds.has(s.id)) continue;
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

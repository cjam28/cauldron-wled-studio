import { describe, expect, it } from "vitest";
import {
  buildMergeForEffectsState,
  buildRestoreSegmentsState,
  mergedEffectTargetIds,
} from "../src/utils/effect-merge.js";
import type { WledSegment } from "../src/api/wled-state.js";

const four: WledSegment[] = [
  { id: 0, start: 0, stop: 85, fx: 1, on: true },
  { id: 1, start: 85, stop: 96, fx: 2, on: true },
  { id: 2, start: 96, stop: 186, on: true },
  { id: 3, start: 186, stop: 210, on: true },
];

describe("effect-merge", () => {
  it("builds one merged segment spanning selection", () => {
    const state = buildMergeForEffectsState(four, 210, [0, 1, 2, 3]);
    const segs = state.seg as Array<Record<string, unknown>>;
    expect(segs[0].start).toBe(0);
    expect(segs[0].stop).toBe(210);
    expect(segs[0].fx).toBe(1);
    expect(segs.find((s) => s.id === 1)?.on).toBe(false);
  });

  it("restores snapshot segments", () => {
    const snap = { savedAt: 1, segments: four, pixelCount: 210 };
    const state = buildRestoreSegmentsState(snap);
    const segs = state.seg as Array<Record<string, unknown>>;
    expect(segs).toHaveLength(4);
    expect(segs[1].start).toBe(85);
    expect(segs[1].stop).toBe(96);
  });

  it("merged mode targets segment 0 only", () => {
    expect(mergedEffectTargetIds(four, true)).toEqual([0]);
    expect(mergedEffectTargetIds(four, false)).toEqual([]);
  });
});

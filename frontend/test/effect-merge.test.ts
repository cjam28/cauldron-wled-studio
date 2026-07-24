import { beforeEach, describe, expect, it } from "vitest";
import {
  buildMergeForEffectsState,
  buildRestoreSegmentsState,
  isMergeForEffectsActive,
  isMergeForEffectsExplicit,
  isWledLayoutMerged,
  mergedEffectTargetIds,
  setMergeForEffectsActive,
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

  it("partial merge folds ONLY the targeted segments and leaves the rest untouched", () => {
    // Selecting segments 2+3 must not destroy segments 0 and 1 (they used to
    // be deleted, and the merged span used to hijack id 0 unconditionally).
    const state = buildMergeForEffectsState(four, 210, [2, 3]);
    const segs = state.seg as Array<Record<string, unknown>>;
    const merged = segs.find((s) => s.id === 2);
    expect(merged?.start).toBe(96);
    expect(merged?.stop).toBe(210);
    // Folded target is deleted on-device (stop <= start), untargeted segments
    // are absent from the patch entirely (WLED patches by id).
    const folded = segs.find((s) => s.id === 3);
    expect(folded?.on).toBe(false);
    expect(folded?.start).toBe(folded?.stop);
    expect(segs.find((s) => s.id === 0)).toBeUndefined();
    expect(segs.find((s) => s.id === 1)).toBeUndefined();
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

describe("merge opt-in (P1-1)", () => {
  beforeEach(() => localStorage.clear());

  it("active defaults to false until opt-in (no phantom merged state)", () => {
    // This used to default to true, which made every fresh browser render
    // the merge toggle checked with no snapshot behind it — unchecking then
    // threw "No saved segment layout to restore". Merge state now exists only
    // after an explicit opt-in.
    expect(isMergeForEffectsActive("ctrlA")).toBe(false);
    expect(isMergeForEffectsExplicit("ctrlA")).toBe(false);
  });

  it("active and explicit agree across opt-in and opt-out", () => {
    setMergeForEffectsActive("ctrlA", true);
    expect(isMergeForEffectsExplicit("ctrlA")).toBe(true);
    expect(isMergeForEffectsActive("ctrlA")).toBe(true);

    setMergeForEffectsActive("ctrlA", false);
    expect(isMergeForEffectsExplicit("ctrlA")).toBe(false);
    // Opt-out must stick: the toggle stays off across reloads.
    expect(isMergeForEffectsActive("ctrlA")).toBe(false);
  });

  it("returns false for an empty controller id", () => {
    expect(isMergeForEffectsExplicit("")).toBe(false);
  });

  it("fresh controller does NOT enter the reshape branch", () => {
    // Mirrors the load-path guard in view-effects._load() and
    // segment-controls._load(): the edit-target reshape only fires when
    // `isMergeForEffectsExplicit(id) && isWledLayoutMerged(segments, px)`.
    // A never-opted-in controller is not merged, so even with a device layout
    // that IS merged, the branch stays closed until the user opts in.
    const merged: WledSegment[] = [
      { id: 0, start: 0, stop: 210, on: true },
      { id: 1, start: 210, stop: 210, on: false },
    ];
    const pixelCount = 210;

    expect(isMergeForEffectsActive("freshCtrl")).toBe(false);
    expect(isWledLayoutMerged(merged, pixelCount)).toBe(true);

    const wouldReshape =
      isMergeForEffectsExplicit("freshCtrl") &&
      isWledLayoutMerged(merged, pixelCount);
    expect(wouldReshape).toBe(false);

    // After explicit opt-in the same condition flips true (guard, not a wall).
    setMergeForEffectsActive("freshCtrl", true);
    expect(
      isMergeForEffectsExplicit("freshCtrl") &&
        isWledLayoutMerged(merged, pixelCount)
    ).toBe(true);
  });
});

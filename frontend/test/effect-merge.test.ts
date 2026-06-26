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

  it("active defaults to true, but explicit stays false until opt-in", () => {
    // The default-true active flag must NOT count as an explicit opt-in, so it
    // can never silently reshape edit targets on load.
    expect(isMergeForEffectsActive("ctrlA")).toBe(true);
    expect(isMergeForEffectsExplicit("ctrlA")).toBe(false);
  });

  it("explicit is true only after opt-in and false again after opt-out", () => {
    setMergeForEffectsActive("ctrlA", true);
    expect(isMergeForEffectsExplicit("ctrlA")).toBe(true);

    setMergeForEffectsActive("ctrlA", false);
    expect(isMergeForEffectsExplicit("ctrlA")).toBe(false);
    // Active falls back to its default-true UI state after opt-out.
    expect(isMergeForEffectsActive("ctrlA")).toBe(true);
  });

  it("returns false for an empty controller id", () => {
    expect(isMergeForEffectsExplicit("")).toBe(false);
  });

  it("fresh controller (active=true, explicit=false) does NOT enter the reshape branch", () => {
    // Mirrors the load-path guard in view-effects._load() and
    // segment-controls._load(): the edit-target reshape only fires when
    // `isMergeForEffectsExplicit(id) && isWledLayoutMerged(segments, px)`.
    // A never-opted-in controller defaults active=true but explicit=false, so
    // even with a device layout that IS merged, the branch must stay closed —
    // the default-true flag never silently reshapes the selection on load.
    const merged: WledSegment[] = [
      { id: 0, start: 0, stop: 210, on: true },
      { id: 1, start: 210, stop: 210, on: false },
    ];
    const pixelCount = 210;

    expect(isMergeForEffectsActive("freshCtrl")).toBe(true);
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

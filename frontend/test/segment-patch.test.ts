import { describe, expect, it } from "vitest";
import { buildSegmentPatch } from "../src/api/wled-state.js";
import type { WledSegment } from "../src/api/wled-state.js";

describe("buildSegmentPatch", () => {
  const four: WledSegment[] = [
    { id: 0, start: 0, stop: 85 },
    { id: 1, start: 85, stop: 96 },
    { id: 2, start: 96, stop: 186 },
    { id: 3, start: 186, stop: 210 },
  ];

  it("clears sel on non-target segments (Face/Forward/Back/Rear)", () => {
    const payload = buildSegmentPatch(2, { col: [[0, 255, 0, 0]] }, four);
    const seg = payload.seg as Array<{ id: number; sel: boolean }>;
    expect(seg).toHaveLength(4);
    expect(seg.find((s) => s.id === 2)?.sel).toBe(true);
    expect(seg.find((s) => s.id === 0)?.sel).toBe(false);
    expect(seg.find((s) => s.id === 1)?.sel).toBe(false);
    expect(seg.find((s) => s.id === 3)?.sel).toBe(false);
  });
});

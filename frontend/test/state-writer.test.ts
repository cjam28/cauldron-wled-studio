import { describe, expect, it } from "vitest";
import { segmentStateHash } from "../src/api/state-writer.js";
import { normalizeCols, type WledSegment } from "../src/api/wled-state.js";

describe("segmentStateHash", () => {
  it("changes when color updates", () => {
    const base: WledSegment = { id: 0, fx: 0, col: [[255, 0, 0, 0]] };
    const h1 = segmentStateHash(base);
    const h2 = segmentStateHash({
      ...base,
      col: [[0, 255, 0, 0]],
    });
    expect(h1).not.toBe(h2);
  });

  it("treats hex and RGB col as equal in hash", () => {
    const a: WledSegment = { id: 1, col: [[255, 0, 0, 0]] };
    const b: WledSegment = { id: 1, col: ["FF0000"] as unknown as number[][] };
    expect(normalizeCols(a.col)).toEqual(normalizeCols(b.col));
  });
});

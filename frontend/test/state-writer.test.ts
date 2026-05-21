import { describe, expect, it } from "vitest";
import { segmentStateHash } from "../src/api/state-writer.js";
import type { WledSegment } from "../src/api/wled-state.js";

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
});

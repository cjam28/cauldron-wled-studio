import { describe, expect, it } from "vitest";
import { importSegmentStarts } from "../src/utils/layout-tools.js";

describe("importSegmentStarts", () => {
  it("assigns WLED segment starts to four corners", () => {
    const verts = [
      { x: 0, y: 0, anchorLed: null },
      { x: 100, y: 0, anchorLed: null },
      { x: 100, y: 80, anchorLed: null },
      { x: 0, y: 80, anchorLed: null },
    ];
    const out = importSegmentStarts(verts, [0, 85, 96, 186], true);
    expect(out.map((v) => v.anchorLed)).toEqual([0, 85, 96, 186]);
  });
});

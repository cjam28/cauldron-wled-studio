import { describe, expect, it } from "vitest";
import { penStrokeToGuide } from "../src/utils/draw-tools.js";

describe("penStrokeToGuide", () => {
  it("uses stroke centerline (not brush outline)", () => {
    const stroke: Array<[number, number]> = [];
    for (let x = 0; x <= 100; x += 4) {
      stroke.push([x, 50]);
    }
    const guide = penStrokeToGuide(stroke, (x, y) => [x, y], false);
    expect(guide.closed).toBe(false);
    expect(guide.points.length).toBeGreaterThan(1);
    const ys = guide.points.map((p) => p[1]);
    const ySpread = Math.max(...ys) - Math.min(...ys);
    expect(ySpread).toBeLessThan(8);
  });

  it("honors closed flag", () => {
    const stroke: Array<[number, number]> = [
      [0, 0],
      [50, 0],
      [50, 50],
      [0, 50],
    ];
    const open = penStrokeToGuide(stroke, (x, y) => [x, y], false);
    const closed = penStrokeToGuide(stroke, (x, y) => [x, y], true);
    expect(open.closed).toBe(false);
    expect(closed.closed).toBe(true);
  });
});

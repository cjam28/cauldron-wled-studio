import { describe, expect, it } from "vitest";
import {
  ledIndexAlongGuide,
  penStrokeToGuide,
  suggestPlacementAnchorLed,
} from "../src/utils/draw-tools.js";

describe("suggestPlacementAnchorLed", () => {
  it("first vertex is always LED 0", () => {
    expect(suggestPlacementAnchorLed(0, 0.75, 210)).toBe(0);
    expect(suggestPlacementAnchorLed(0, 1, 210)).toBe(0);
  });

  it("later vertices use path fraction along the guide", () => {
    expect(suggestPlacementAnchorLed(1, 0, 210)).toBe(0);
    expect(suggestPlacementAnchorLed(1, 0.5, 210)).toBe(
      ledIndexAlongGuide(0.5, 210)
    );
    expect(suggestPlacementAnchorLed(3, 1, 210)).toBe(209);
  });
});

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

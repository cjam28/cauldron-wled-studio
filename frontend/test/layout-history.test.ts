import { describe, expect, it } from "vitest";
import {
  cloneLayoutSnapshot,
  sliderToViewScale,
  viewScaleToSlider,
  type LayoutDesignerSnapshot,
} from "../src/utils/layout-history.js";

describe("layout-history", () => {
  it("clones snapshot deeply enough for undo", () => {
    const snap: LayoutDesignerSnapshot = {
      vertices: [{ x: 1, y: 2, anchorLed: 0 }],
      guide: { points: [[0, 0], [10, 10]], closed: false, kind: "line" },
      closed: false,
      bgLayer: { url: "/local/x.jpg", opacity: 0.5, scale: 1, offsetX: 0, offsetY: 0 },
      backgroundUrl: "/local/x.jpg",
      scalePxPerM: 100,
      selectedVtx: 0,
      anchorInput: "0",
    };
    const copy = cloneLayoutSnapshot(snap);
    copy.vertices[0].x = 99;
    copy.guide!.points[0][0] = 99;
    expect(snap.vertices[0].x).toBe(1);
    expect(snap.guide!.points[0][0]).toBe(0);
  });

  it("maps view scale to slider and back", () => {
    expect(viewScaleToSlider(1)).toBeGreaterThan(40);
    expect(viewScaleToSlider(1)).toBeLessThan(60);
    const scale = sliderToViewScale(viewScaleToSlider(2.5));
    expect(scale).toBeCloseTo(2.5, 1);
  });
});

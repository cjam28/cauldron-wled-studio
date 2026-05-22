import { describe, expect, it } from "vitest";
import {
  extractSceneColors,
  sceneGradientBackground,
  sceneHasThumb,
} from "../src/utils/scene-gradient.js";

describe("extractSceneColors", () => {
  it("reads first segment col slots scaled by bri", () => {
    const colors = extractSceneColors({
      on: true,
      bri: 255,
      seg: [{ col: [[255, 120, 40, 0], [0, 0, 255, 0]] }],
    });
    expect(colors[0]).toBe("rgb(255, 120, 40)");
    expect(colors[1]).toBe("rgb(0, 0, 255)");
  });

  it("uses global bri when segment col missing", () => {
    const colors = extractSceneColors({ on: true, bri: 128, seg: [{}] });
    expect(colors.length).toBeGreaterThan(0);
    expect(colors[0]).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
  });

  it("returns dark swatch when scene is off", () => {
    const colors = extractSceneColors({ on: false, seg: [{ col: [[255, 0, 0]] }] });
    expect(colors[0]).toBe("rgb(26, 26, 26)");
  });
});

describe("sceneGradientBackground", () => {
  it("builds multi-stop gradient", () => {
    const bg = sceneGradientBackground(["rgb(255, 0, 0)", "rgb(0, 0, 255)"]);
    expect(bg).toContain("linear-gradient");
    expect(bg).toContain("rgb(255, 0, 0) 0%");
    expect(bg).toContain("rgb(0, 0, 255) 100%");
  });
});

describe("sceneHasThumb", () => {
  it("detects non-empty thumb url", () => {
    expect(sceneHasThumb({ scene_thumb_url: "/local/x.webp" })).toBe(true);
    expect(sceneHasThumb({ scene_thumb_url: "" })).toBe(false);
    expect(sceneHasThumb({})).toBe(false);
  });
});

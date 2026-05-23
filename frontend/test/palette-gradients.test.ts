import { describe, expect, it } from "vitest";
import {
  paletteGradientCss,
  resolvePaletteGradientCss,
} from "../src/utils/palette-gradients.js";

describe("palette gradients", () => {
  it("returns named palette css", () => {
    expect(paletteGradientCss("Ocean")).toContain("linear-gradient");
  });

  it("prefers device preview when available", () => {
    const device = "linear-gradient(90deg, rgb(1,2,3) 0%, rgb(4,5,6) 100%)";
    expect(resolvePaletteGradientCss("Ocean", 13, { "13": device })).toBe(device);
  });

  it("falls back to name heuristics", () => {
    expect(resolvePaletteGradientCss("Unknown Palette X", 99, {})).toContain(
      "linear-gradient"
    );
  });
});

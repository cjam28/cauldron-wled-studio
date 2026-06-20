import { describe, expect, it } from "vitest";
import {
  clampSliderByte,
  sliderValuesFromSegment,
} from "../src/utils/effect-presets-storage.js";

describe("clampSliderByte (EF-2)", () => {
  it("returns null for non-finite input", () => {
    expect(clampSliderByte(NaN)).toBeNull();
    expect(clampSliderByte(Number("not-a-number"))).toBeNull();
    expect(clampSliderByte(Infinity)).toBeNull();
    expect(clampSliderByte(-Infinity)).toBeNull();
  });

  it("clamps to the 0..255 byte range and rounds to an integer", () => {
    expect(clampSliderByte(-5)).toBe(0);
    expect(clampSliderByte(300)).toBe(255);
    expect(clampSliderByte(0)).toBe(0);
    expect(clampSliderByte(255)).toBe(255);
    expect(clampSliderByte(128)).toBe(128);
    expect(clampSliderByte(12.6)).toBe(13);
  });
});

describe("sliderValuesFromSegment (P1-4: no undefined keys)", () => {
  it("omits undefined and non-number values before spread", () => {
    const out = sliderValuesFromSegment({
      sx: 10,
      ix: undefined,
      c1: "nope",
      c2: 5,
    });
    expect(out).toEqual({ sx: 10, c2: 5 });
    expect("ix" in out).toBe(false);
    expect("c1" in out).toBe(false);
  });
});

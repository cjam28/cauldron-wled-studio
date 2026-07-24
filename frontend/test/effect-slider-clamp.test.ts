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

  // The three slider entry points (view-effects.ts:675 `_slider`,
  // segment-controls.ts:556, paint-settings.ts:122) all do:
  //   const value = clampSliderByte(Number(input.value));
  //   if (value === null) return;        // <- bail, no write to the device
  // An empty <input> yields Number("") === 0 (a write of 0, intentional), while
  // a malformed value yields Number("x") === NaN, which MUST collapse to the
  // null sentinel so every handler short-circuits before patching a segment.
  it("returns the null sentinel for the malformed-input cases handlers guard on", () => {
    expect(clampSliderByte(Number("x"))).toBeNull(); // garbage slider value
    expect(clampSliderByte(Number("1e999"))).toBeNull(); // overflow -> Infinity
    // null === null is exactly the `if (value === null) return` early-return.
    expect(clampSliderByte(Number("x")) === null).toBe(true);
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
    // Explicitly assert the undefined / non-number keys are ABSENT from the
    // output object (not merely falsy) so no `undefined` reaches an object
    // spread into a WLED segment patch.
    expect(out).not.toHaveProperty("ix");
    expect(out).not.toHaveProperty("c1");
    expect("ix" in out).toBe(false);
    expect("c1" in out).toBe(false);
  });

  it("omits every slider key when the segment carries none", () => {
    const out = sliderValuesFromSegment({
      sx: undefined,
      ix: undefined,
      c1: undefined,
    });
    expect(out).toEqual({});
    for (const key of ["sx", "ix", "c1", "c2", "c3", "o1", "o2", "o3"]) {
      expect(out).not.toHaveProperty(key);
    }
  });
});

import { describe, expect, it } from "vitest";
import { pctTo255, readBrightnessPct, readBrightness255 } from "../src/utils/ha-brightness.js";

describe("ha-brightness", () => {
  it("reads brightness_pct", () => {
    expect(readBrightnessPct({ state: "on", attributes: { brightness_pct: 42 } })).toBe(42);
  });

  it("reads brightness attribute as pct", () => {
    expect(readBrightnessPct({ state: "on", attributes: { brightness: 128 } })).toBe(50);
  });

  it("converts pct to 255 scale", () => {
    expect(pctTo255(100)).toBe(255);
    expect(pctTo255(0)).toBe(0);
    expect(readBrightness255({ state: "on", attributes: { brightness_pct: 50 } })).toBe(128);
  });
});

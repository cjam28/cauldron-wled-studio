import { describe, expect, it } from "vitest";
import {
  pctTo255,
  readBrightnessPct,
  readBrightness255,
  readEntityColor,
} from "../src/utils/ha-brightness.js";

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

  it("reads rgb_color from entity", () => {
    expect(
      readEntityColor({ attributes: { rgb_color: [10, 20, 30] } })
    ).toEqual([10, 20, 30, 0]);
  });

  it("reads rgbw_color from entity", () => {
    expect(
      readEntityColor({ attributes: { rgbw_color: [1, 2, 3, 4] } })
    ).toEqual([1, 2, 3, 4]);
  });

  it("detects external rgb_color changes for sync consumers", () => {
    const entity = { attributes: { rgb_color: [10, 20, 30] } };
    const first = readEntityColor(entity);
    expect(first).toEqual([10, 20, 30, 0]);

    entity.attributes.rgb_color = [40, 50, 60];
    const second = readEntityColor(entity);
    expect(second).toEqual([40, 50, 60, 0]);
    expect(second).not.toEqual(first);
  });
});

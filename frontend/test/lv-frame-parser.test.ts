import { describe, expect, it } from "vitest";
import { expandToFixture, parseLvFrame } from "../src/api/lv-frame-parser.js";

describe("parseLvFrame", () => {
  it("parses RGB hex strings", () => {
    const f = parseLvFrame({ leds: ["ff0000", "00FF00", "0000ff"], n: 210 });
    expect(f).not.toBeNull();
    expect(f!.leds_hex).toEqual(["ff0000", "00ff00", "0000ff"]);
    expect(f!.n).toBe(210);
    expect(f!.scale).toBeCloseTo(70);
  });

  it("parses RGBW", () => {
    const f = parseLvFrame({ leds: ["ff000080"], n: 1 });
    expect(f?.channels).toBe(4);
  });

  it("drops bad frames silently", () => {
    expect(parseLvFrame(null)).toBeNull();
    expect(parseLvFrame({ leds: [] })).toBeNull();
    expect(parseLvFrame({ leds: ["xyz"] })).toBeNull();
    expect(parseLvFrame({ leds: ["abc"] })).toBeNull();
  });

  it("defaults n to leds.length", () => {
    const f = parseLvFrame({ leds: ["ffffff", "000000"] });
    expect(f?.n).toBe(2);
    expect(f?.scale).toBe(1);
  });
});

describe("expandToFixture", () => {
  it("nearest-neighbor upscales downsampled strip", () => {
    const f = parseLvFrame({ leds: ["ff0000", "0000ff"], n: 4 })!;
    const px = expandToFixture(f, 4);
    expect(px[0]).toBe(255);
    expect(px[1]).toBe(0);
    expect(px[4]).toBe(0);
    expect(px[6]).toBe(255);
  });
});

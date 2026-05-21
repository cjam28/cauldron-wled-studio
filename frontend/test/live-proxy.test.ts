import { describe, expect, it } from "vitest";
import { parseLvFrame } from "../src/api/lv-frame-parser.js";

/** Mirrors Python lv_frame.parse_lv_message invariants (Phase 1). */
describe("live proxy frame contract", () => {
  it("handles case-insensitive hex", () => {
    const f = parseLvFrame({ leds: ["AbCdEf"], n: 100 });
    expect(f?.leds_hex[0]).toBe("abcdef");
  });

  it("computes scale for WLED downsample", () => {
    const f = parseLvFrame({
      leds: Array(64).fill("ffffff"),
      n: 210,
    });
    expect(f?.scale).toBeCloseTo(210 / 64, 5);
  });
});

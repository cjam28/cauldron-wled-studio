import { describe, expect, it } from "vitest";
import { transitionToTt } from "../src/api/scenes.js";

describe("transitionToTt", () => {
  it("converts ms to WLED tt tenths", () => {
    expect(transitionToTt(2500)).toBe(25);
    expect(transitionToTt(1500)).toBe(15);
    expect(transitionToTt(0)).toBe(0);
  });

  it("clamps to 255", () => {
    expect(transitionToTt(30000)).toBe(255);
  });
});

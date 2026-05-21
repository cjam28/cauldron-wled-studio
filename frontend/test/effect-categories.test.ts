import { describe, expect, it } from "vitest";
import {
  matchesEffectCategory,
  solidEffectId,
} from "../src/utils/effect-categories.js";

describe("effect categories", () => {
  const map = { Solid: 0, Aurora: 1, "Black Hole 2D": 2, Beat: 3 };
  const flags: Array<string | null> = [null, null, "2", "v"];

  it("resolves Solid id", () => {
    expect(solidEffectId(map)).toBe(0);
  });

  it("filters 2D", () => {
    expect(matchesEffectCategory("Black Hole 2D", 2, "2d", flags, map)).toBe(true);
    expect(matchesEffectCategory("Aurora", 1, "2d", flags, map)).toBe(false);
  });

  it("filters sound", () => {
    expect(matchesEffectCategory("Beat", 3, "sound", flags, map)).toBe(true);
    expect(matchesEffectCategory("Solid", 0, "sound", flags, map)).toBe(false);
  });
});

import { describe, expect, it, beforeEach } from "vitest";
import {
  getRecentEffects,
  maxItemsForRowWidth,
  pushRecentEffect,
  pushRecentScene,
  getRecentScenes,
} from "../src/utils/recent-store.js";

describe("recent-store", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("pushes and dedupes effects", () => {
    pushRecentEffect("c1", 5, "Blink");
    pushRecentEffect("c1", 3, "Solid");
    pushRecentEffect("c1", 5, "Blink");
    const list = getRecentEffects("c1");
    expect(list.map((e) => e.id)).toEqual([5, 3]);
  });

  it("pushes scenes", () => {
    pushRecentScene("c1", "movie", "Movie");
    pushRecentScene("c1", "party", "Party");
    expect(getRecentScenes("c1").map((s) => s.id)).toEqual(["party", "movie"]);
  });

  it("computes visible chip count from width", () => {
    expect(maxItemsForRowWidth(400)).toBeGreaterThanOrEqual(5);
    expect(maxItemsForRowWidth(200)).toBeLessThanOrEqual(4);
    expect(maxItemsForRowWidth(900)).toBe(10);
  });
});

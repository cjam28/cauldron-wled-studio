import { describe, expect, it, beforeEach } from "vitest";
import {
  addColorSwatch,
  loadColorSwatches,
  removeColorSwatch,
  updateColorSwatch,
} from "../src/utils/color-swatch-storage.js";

describe("color swatch storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("saves and loads per controller", () => {
    addColorSwatch("ctrl-a", {
      name: "Sunset",
      rgb: [255, 100, 20],
      white: 0,
    });
    const list = loadColorSwatches("ctrl-a");
    expect(list).toHaveLength(1);
    expect(list[0].name).toBe("Sunset");
    expect(loadColorSwatches("ctrl-b")).toHaveLength(0);
  });

  it("dedupes identical rgb+white on save", () => {
    addColorSwatch("c", { name: "A", rgb: [1, 2, 3], white: 0 });
    addColorSwatch("c", { name: "Renamed", rgb: [1, 2, 3], white: 0 });
    expect(loadColorSwatches("c")).toHaveLength(1);
    expect(loadColorSwatches("c")[0].name).toBe("Renamed");
  });

  it("renames and removes", () => {
    const s = addColorSwatch("c", { name: "X", rgb: [10, 20, 30], white: 5 });
    updateColorSwatch("c", s.id, { name: "Warm" });
    expect(loadColorSwatches("c")[0].name).toBe("Warm");
    removeColorSwatch("c", s.id);
    expect(loadColorSwatches("c")).toHaveLength(0);
  });
});

import { describe, expect, it } from "vitest";
import {
  layoutDisplayName,
  resolveLayoutName,
  titleFromLayoutId,
} from "../src/utils/layout-display.js";

describe("layout-display", () => {
  it("titleFromLayoutId formats slugs", () => {
    expect(titleFromLayoutId("kitchen-island")).toBe("Kitchen Island");
  });

  it("layoutDisplayName prefers real names", () => {
    expect(
      layoutDisplayName({
        id: "kitchen-island",
        controller_id: "x",
        name: "Kitchen island",
        pixel_count: 210,
        fixtures: [],
      })
    ).toBe("Kitchen island");
  });

  it("layoutDisplayName falls back when name is generic Layout", () => {
    expect(
      layoutDisplayName({
        id: "kitchen-island",
        controller_id: "x",
        name: "Layout",
        pixel_count: 210,
        fixtures: [],
      })
    ).toBe("Kitchen Island");
  });

  it("resolveLayoutName keeps non-generic saved names", () => {
    expect(resolveLayoutName("Kitchen island", "kitchen-island")).toBe(
      "Kitchen island"
    );
  });
});

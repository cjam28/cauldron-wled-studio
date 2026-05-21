import { describe, expect, it } from "vitest";
import { kitchenIslandLayout } from "../src/data/kitchen-island-layout.js";

/**
 * Mirror of the Python distribution engine test:
 * Verifies that the kitchen-island layout contains
 * anchor LEDs 0, 85, 96, 186 at their respective vertices.
 */
describe("distribution engine — kitchen island anchors", () => {
  const layout = kitchenIslandLayout("test-controller");
  const fixture = layout.fixtures[0] as {
    anchors: Array<{ led: number; vertex_index: number }>;
    points: [number, number][];
    closed: boolean;
  };

  it("fixture has 4 anchors", () => {
    expect(fixture.anchors).toHaveLength(4);
  });

  it("anchor LED 0 is present (vertex 0 — front-left)", () => {
    expect(fixture.anchors.some((a) => a.led === 0)).toBe(true);
  });

  it("anchor LED 85 is present (vertex 1 — front-right)", () => {
    expect(fixture.anchors.some((a) => a.led === 85)).toBe(true);
  });

  it("anchor LED 96 is present (vertex 2 — back-right corner)", () => {
    expect(fixture.anchors.some((a) => a.led === 96)).toBe(true);
  });

  it("anchor LED 186 is present (vertex 3 — back-left)", () => {
    expect(fixture.anchors.some((a) => a.led === 186)).toBe(true);
  });

  it("anchor LEDs [0,85,96,186] all appear (set check)", () => {
    const leds = fixture.anchors.map((a) => a.led).sort((a, b) => a - b);
    expect(leds).toContain(0);
    expect(leds).toContain(85);
    expect(leds).toContain(96);
    expect(leds).toContain(186);
  });

  it("vertex_index values are unique", () => {
    const indices = fixture.anchors.map((a) => a.vertex_index);
    expect(new Set(indices).size).toBe(indices.length);
  });

  it("all vertex_indices are within points bounds", () => {
    for (const a of fixture.anchors) {
      expect(a.vertex_index).toBeGreaterThanOrEqual(0);
      expect(a.vertex_index).toBeLessThan(fixture.points.length);
    }
  });

  it("layout pixel_count is 210", () => {
    expect(layout.pixel_count).toBe(210);
  });

  it("layout is closed path", () => {
    expect(fixture.closed).toBe(true);
  });
});

import { describe, expect, it } from "vitest";
import { kitchenIslandLayout } from "../src/data/kitchen-island-layout.js";
import {
  fixtureToWledSegments,
  kitchenIslandFixture,
  resolveLedPositions,
} from "../src/utils/distribution-engine.js";

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

describe("resolveLedPositions — closed auto-close edge", () => {
  const fixture = kitchenIslandFixture();
  const pixelCount = 210;

  it("places LEDs 187–209 along the closing edge (not only 186)", () => {
    const positions = resolveLedPositions(fixture, pixelCount);
    const byLed = new Map(positions.map((p) => [p.led, p]));

    expect(byLed.has(186)).toBe(true);
    expect(byLed.has(187)).toBe(true);
    expect(byLed.has(209)).toBe(true);

    const p186 = byLed.get(186)!;
    const p187 = byLed.get(187)!;
    const p209 = byLed.get(209)!;
    // Closing edge runs vtx3 → vtx0 (toward origin for reference fixture).
    expect(p209.x).toBeLessThan(p186.x);
    expect(p209.y).toBeLessThan(p186.y);
    const step = Math.hypot(p187.x - p186.x, p187.y - p186.y);
    const span = Math.hypot(p209.x - p186.x, p209.y - p186.y);
    expect(step).toBeGreaterThan(0);
    expect(step).toBeLessThan(span);
  });

  it("segment 4 spans 186–210", () => {
    const segs = fixtureToWledSegments(fixture, pixelCount);
    const seg4 = segs.find((s) => s.id === 3);
    expect(seg4?.start).toBe(186);
    expect(seg4?.stop).toBe(210);
  });
});

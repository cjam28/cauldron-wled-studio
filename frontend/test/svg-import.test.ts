import { describe, expect, it } from "vitest";
import { parseSvgToGuide } from "../src/utils/svg-import.js";

describe("parseSvgToGuide", () => {
  it("parses a simple SVG rectangle path", () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path d="M0,0 L100,0 L100,50 L0,50 Z"/></svg>`;
    const guide = parseSvgToGuide(svg);
    expect(guide.points.length).toBeGreaterThan(3);
    expect(guide.kind).toBe("svg");
    expect(guide.closed).toBe(true);
  });
});

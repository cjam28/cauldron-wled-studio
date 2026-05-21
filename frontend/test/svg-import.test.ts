import { describe, expect, it } from "vitest";
import {
  MAX_GUIDE_POINTS,
  MAX_SVG_BYTES,
  parseSvgToGuide,
} from "../src/utils/svg-import.js";

describe("parseSvgToGuide", () => {
  it("parses a simple SVG rectangle path", () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path d="M0,0 L100,0 L100,50 L0,50 Z"/></svg>`;
    const guide = parseSvgToGuide(svg);
    expect(guide.points.length).toBeGreaterThan(3);
    expect(guide.points.length).toBeLessThanOrEqual(MAX_GUIDE_POINTS);
    expect(guide.kind).toBe("svg");
    expect(guide.closed).toBe(true);
  });

  it("does not hang on arc and smooth commands (Illustrator-style)", () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 C20,0 40,20 60,20 S100,40 120,20 A30,30 0 0,1 150,0 Z"/>
    </svg>`;
    const t0 = Date.now();
    const guide = parseSvgToGuide(svg);
    expect(Date.now() - t0).toBeLessThan(2000);
    expect(guide.points.length).toBeGreaterThan(2);
    expect(guide.points.length).toBeLessThanOrEqual(MAX_GUIDE_POINTS);
  });

  it("uses the longest path when multiple paths exist", () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 L10,0"/>
      <path d="M0,0 L200,0 L200,100 L0,100 Z"/>
    </svg>`;
    const guide = parseSvgToGuide(svg);
    const xs = guide.points.map((p) => p[0]);
    const ys = guide.points.map((p) => p[1]);
    expect(Math.max(...xs) - Math.min(...xs)).toBeGreaterThan(150);
    expect(Math.max(...ys) - Math.min(...ys)).toBeGreaterThan(50);
  });

  it("rejects oversized SVG text", () => {
    const huge = `<svg><path d="M0,0 L1,1"/></svg>`.padEnd(MAX_SVG_BYTES + 1, " ");
    expect(() => parseSvgToGuide(huge)).toThrow(/too large/i);
  });
});

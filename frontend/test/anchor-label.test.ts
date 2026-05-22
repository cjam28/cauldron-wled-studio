import { describe, expect, it } from "vitest";
import {
  vertexAnchorLabel,
  vertexIndexLabel,
  vertexLabelFontSize,
} from "../src/utils/anchor-label.js";

describe("vertex labels", () => {
  it("formats anchor label with vertex index and LED", () => {
    expect(vertexAnchorLabel(3, 89)).toBe("v3 · 89");
    expect(vertexAnchorLabel(0, 0)).toBe("v0 · 0");
  });

  it("formats index-only label", () => {
    expect(vertexIndexLabel(2)).toBe("v2");
  });

  it("keeps font size in a readable band across zoom", () => {
    expect(vertexLabelFontSize(0.5)).toBe(13);
    expect(vertexLabelFontSize(2)).toBeGreaterThanOrEqual(9);
    expect(vertexLabelFontSize(2)).toBeLessThanOrEqual(13);
  });
});

import { describe, expect, it } from "vitest";
import {
  resolveThumbBasename,
  thumbApiUrl,
  thumbFilenameForFx,
  thumbLocalUrl,
  thumbUrlForFx,
} from "../src/api/thumbnails.js";

describe("thumbnails", () => {
  it("builds filename with fw ver", () => {
    expect(thumbFilenameForFx(42, "strip", "0.16.0")).toBe("42_0.16.0_strip.webp");
  });

  it("resolveThumbBasename prefers fw-qualified file", () => {
    const available = new Set(["7_0.16.0_strip.webp", "7_strip.webp"]);
    expect(resolveThumbBasename(7, available, "strip", "0.16.0")).toBe(
      "7_0.16.0_strip.webp"
    );
  });

  it("resolveThumbBasename falls back without fw in name", () => {
    const available = new Set(["7_strip.webp"]);
    expect(resolveThumbBasename(7, available, "strip", "16.0.0")).toBe(
      "7_strip.webp"
    );
  });

  it("resolveThumbBasename prefers palette-specific file", () => {
    const available = new Set(["7_p13_0.16.0_strip.webp", "7_0.16.0_strip.webp"]);
    expect(resolveThumbBasename(7, available, "strip", "0.16.0", 13)).toBe(
      "7_p13_0.16.0_strip.webp"
    );
  });

  it("resolveThumbBasename returns undefined when missing", () => {
    expect(resolveThumbBasename(99, [], "strip", "16.0.0")).toBeUndefined();
  });

  it("thumbUrlForFx returns undefined when not in available set", () => {
    const url = thumbUrlForFx("entry1", 7, "strip", "16.0.0", undefined, []);
    expect(url).toBeUndefined();
  });

  it("thumbUrlForFx returns local path when file exists", () => {
    const url = thumbUrlForFx("entry1", 7, "strip", "0.16.0", undefined, [
      "7_0.16.0_strip.webp",
    ]);
    expect(url).toBe("/local/wled_studio/thumbs/entry1/7_0.16.0_strip.webp");
  });

  it("thumbUrlForFx without available list builds expected path", () => {
    const url = thumbUrlForFx("entry1", 7, "strip", "0.16.0");
    expect(url).toBe("/local/wled_studio/thumbs/entry1/7_0.16.0_strip.webp");
  });

  it("thumbLocalUrl encodes segments", () => {
    expect(thumbLocalUrl("a b", "x.webp")).toContain("a%20b");
  });

  it("thumbApiUrl encodes segments (legacy api path)", () => {
    expect(thumbApiUrl("a b", "x.webp")).toContain("a%20b");
  });
});

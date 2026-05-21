import { describe, expect, it } from "vitest";
import {
  thumbApiUrl,
  thumbFilenameForFx,
  thumbUrlForFx,
} from "../src/api/thumbnails.js";

describe("thumbnails", () => {
  it("builds filename with fw ver", () => {
    expect(thumbFilenameForFx(42, "strip", "0.16.0")).toBe("42_0.16.0_strip.webp");
  });

  it("thumbUrlForFx returns api path", () => {
    const url = thumbUrlForFx("entry1", 7, "strip", "0.16.0");
    expect(url).toBe("/api/wled_studio/thumb/entry1/7_0.16.0_strip.webp");
  });

  it("thumbApiUrl encodes segments", () => {
    expect(thumbApiUrl("a b", "x.webp")).toContain("a%20b");
  });
});

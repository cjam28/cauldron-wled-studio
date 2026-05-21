import { describe, expect, it } from "vitest";
import {
  thumbApiUrl,
  thumbFilenameForFx,
  thumbLocalUrl,
  thumbUrlForFx,
} from "../src/api/thumbnails.js";

describe("thumbnails", () => {
  it("builds filename with fw ver", () => {
    expect(thumbFilenameForFx(42, "strip", "0.16.0")).toBe("42_0.16.0_strip.webp");
  });

  it("thumbUrlForFx returns local path", () => {
    const url = thumbUrlForFx("entry1", 7, "strip", "0.16.0");
    expect(url).toBe("/local/wled_studio/thumbs/entry1/7_0.16.0_strip.webp");
  });

  it("thumbUrlForFx appends auth when hass token present", () => {
    const hass = {
      auth: { data: { access_token: "abc123" } },
    } as import("custom-card-helpers").HomeAssistant;
    const url = thumbUrlForFx("entry1", 7, "strip", "0.16.0", hass);
    expect(url).toContain("/local/wled_studio/thumbs/entry1/7_0.16.0_strip.webp");
    expect(url).toContain("auth=abc123");
  });

  it("thumbLocalUrl encodes segments", () => {
    expect(thumbLocalUrl("a b", "x.webp")).toContain("a%20b");
  });

  it("thumbApiUrl encodes segments (legacy api path)", () => {
    expect(thumbApiUrl("a b", "x.webp")).toContain("a%20b");
  });
});

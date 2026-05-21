import { describe, expect, it } from "vitest";
import { formatHaError } from "../src/utils/ha-error.js";

describe("formatHaError", () => {
  it("formats HA websocket error objects", () => {
    expect(formatHaError({ code: "invalid_format", message: "Invalid image data" })).toBe(
      "invalid_format: Invalid image data"
    );
  });

  it("uses Error.message when present", () => {
    expect(formatHaError(new Error("upload failed"))).toBe("upload failed");
  });
});

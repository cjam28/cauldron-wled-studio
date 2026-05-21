import { describe, expect, it } from "vitest";
import { anchorLedFontSize } from "../src/utils/anchor-label.js";

const ANCHOR_R = 9;

describe("anchorLedFontSize", () => {
  it("scales down for 3-digit indices so text fits in anchor circle", () => {
    const r = ANCHOR_R;
    const two = anchorLedFontSize(85, r);
    const three = anchorLedFontSize(209, r);
    expect(three).toBeLessThan(two);
    expect(three).toBeGreaterThan(4);
    const estWidth = 3 * three * 0.72;
    expect(estWidth).toBeLessThanOrEqual(r * 1.92 + 0.5);
  });

  it("allows larger font for 1–2 digits than 3", () => {
    const r = ANCHOR_R;
    expect(anchorLedFontSize(9, r)).toBeGreaterThan(anchorLedFontSize(209, r));
  });
});

import { describe, expect, it } from "vitest";
import { WledStudioCard, CARD_TAG } from "../src/card/wled-studio-card.js";

describe("WledStudioCard", () => {
  it("registers custom element extending BasePoweredElement", () => {
    expect(customElements.get(CARD_TAG)).toBe(WledStudioCard);
    const el = document.createElement(CARD_TAG) as WledStudioCard;
    expect(el).toBeInstanceOf(WledStudioCard);
    expect("abort" in el).toBe(true);
    expect("rafIds" in el).toBe(true);
  });

  it("getCardSize returns 4", () => {
    const el = document.createElement(CARD_TAG) as WledStudioCard;
    el.setConfig({ type: "custom:wled-studio-card" });
    expect(el.getCardSize()).toBe(4);
  });
});

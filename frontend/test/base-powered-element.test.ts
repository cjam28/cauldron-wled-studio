import { describe, expect, it } from "vitest";
import type { HomeAssistant } from "custom-card-helpers";
import { WledStudioCard, CARD_TAG } from "../src/card/wled-studio-card.js";
import { defineCustomElement } from "../src/utils/safe-custom-element.js";

defineCustomElement(CARD_TAG, WledStudioCard);

describe("WledStudioCard", () => {
  it("registers custom element extending BasePoweredElement", () => {
    expect(customElements.get(CARD_TAG)).toBe(WledStudioCard);
    const el = new WledStudioCard();
    expect(el).toBeInstanceOf(WledStudioCard);
    expect("abort" in el).toBe(true);
    expect("rafIds" in el).toBe(true);
  });

  it("getCardSize returns 4", () => {
    const el = new WledStudioCard();
    el.setConfig({ type: "custom:wled-studio-card" });
    expect(el.getCardSize()).toBe(8);
  });

  it("clears optimistic brightness when master light is off", async () => {
    const el = new WledStudioCard();
    el.setConfig({ type: "custom:wled-studio-card" });
    el["_masterEntity"] = "light.wled";
    el["_globalBriPct"] = 67;
    document.body.appendChild(el);
    el.hass = {
      states: {
        "light.wled": { state: "off", attributes: {} },
      },
    } as unknown as HomeAssistant;
    await el.updateComplete;
    expect(el["_globalBriPct"]).toBeNull();
    el.remove();
  });

  it("shows global brightness percentage next to slider", async () => {
    const el = new WledStudioCard();
    el.setConfig({ type: "custom:wled-studio-card" });
    el["_masterEntity"] = "light.wled";
    el["_globalBriPct"] = 67;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".bri-pct")?.textContent).toBe("67%");
    el.remove();
  });
});

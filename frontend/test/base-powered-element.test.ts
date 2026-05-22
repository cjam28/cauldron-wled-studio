import { describe, expect, it, vi } from "vitest";
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

  it("turn_off at brightness 0 and turn_on when non-zero", async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const el = new WledStudioCard();
    el.setConfig({ type: "custom:wled-studio-card" });
    el["_masterEntity"] = "light.wled";
    el["_globalBriPct"] = 55;
    document.body.appendChild(el);
    el.hass = {
      callService,
      states: {
        "light.wled": { state: "on", attributes: { brightness_pct: 55 } },
      },
    } as unknown as HomeAssistant;
    await el.updateComplete;

    (el as unknown as { _setGlobalBrightness(ev: Event): void })._setGlobalBrightness({
      target: { value: "0" },
    } as unknown as Event);

    expect(callService).toHaveBeenCalledWith("light", "turn_off", {
      entity_id: "light.wled",
    });
    expect(el["_lastNonZeroBri"]).toBe(55);

    callService.mockClear();
    (el as unknown as { _setGlobalBrightness(ev: Event): void })._setGlobalBrightness({
      target: { value: "40" },
    } as unknown as Event);

    expect(callService).toHaveBeenCalledWith("light", "turn_on", {
      entity_id: "light.wled",
      brightness_pct: 40,
    });
    el.remove();
  });

  it("restores last non-zero brightness when dragging up from 0", async () => {
    const el = new WledStudioCard();
    el.setConfig({ type: "custom:wled-studio-card" });
    el["_globalBriPct"] = 0;
    el["_lastNonZeroBri"] = 72;
    document.body.appendChild(el);
    await el.updateComplete;
    const input = document.createElement("input");
    input.value = "3";

    (el as unknown as { _onGlobalBriInput(ev: Event): void })._onGlobalBriInput({
      target: input,
    } as unknown as Event);

    expect(el["_globalBriPct"]).toBe(72);
    expect(input.value).toBe("72");
    el.remove();
  });
});

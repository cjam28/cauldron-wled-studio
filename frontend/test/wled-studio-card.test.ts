import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { WledStudioCard, CARD_TAG } from "../src/card/wled-studio-card.js";
import { defineCustomElement } from "../src/utils/safe-custom-element.js";

defineCustomElement(CARD_TAG, WledStudioCard);

async function flushRaf(): Promise<void> {
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
}

function tabLabels(el: WledStudioCard): string[] {
  const root = el.shadowRoot;
  if (!root) return [];
  return [...root.querySelectorAll(".mode-tab-label")].map(
    (n) => n.textContent?.trim() ?? ""
  );
}

function activeTabId(el: WledStudioCard): string | undefined {
  return el.shadowRoot?.querySelector<HTMLButtonElement>('[role="tab"][aria-selected="true"]')
    ?.id;
}

function dispatchTabKey(el: WledStudioCard, key: string): void {
  const tablist = el.shadowRoot?.querySelector('[role="tablist"]');
  if (!tablist) throw new Error("tablist missing");
  tablist.dispatchEvent(
    new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true })
  );
}

function dispatchTabSwipe(el: WledStudioCard, deltaX: number): void {
  const panel = el.shadowRoot?.querySelector(".tab-body");
  if (!panel) throw new Error("tab-body missing");
  const startX = 200;
  const startY = 300;
  panel.dispatchEvent(
    new TouchEvent("touchstart", {
      bubbles: true,
      cancelable: true,
      touches: [new Touch({ identifier: 0, target: panel, clientX: startX, clientY: startY })],
    })
  );
  panel.dispatchEvent(
    new TouchEvent("touchmove", {
      bubbles: true,
      cancelable: true,
      touches: [
        new Touch({
          identifier: 0,
          target: panel,
          clientX: startX + deltaX,
          clientY: startY,
        }),
      ],
    })
  );
  panel.dispatchEvent(
    new TouchEvent("touchend", {
      bubbles: true,
      cancelable: true,
      changedTouches: [
        new Touch({
          identifier: 0,
          target: panel,
          clientX: startX + deltaX,
          clientY: startY,
        }),
      ],
    })
  );
}

describe("WledStudioCard mode tabs", () => {
  let el: WledStudioCard;

  beforeEach(() => {
    el = new WledStudioCard();
    el.setConfig({ type: "custom:wled-studio-card", show_scenes: true });
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
  });

  it("renders Color, Effects, Scenes, and Paint tabs by default", async () => {
    await el.updateComplete;
    expect(tabLabels(el)).toEqual([
      "Color",
      "Effects",
      "Scenes",
      "Paint",
    ]);
  });

  it("hides Scenes tab when show_scenes is false", async () => {
    el.setConfig({ type: "custom:wled-studio-card", show_scenes: false });
    await el.updateComplete;
    expect(tabLabels(el)).toEqual(["Color", "Effects", "Paint"]);
  });

  it("shows Segments tab only when show_segments is true", async () => {
    el.setConfig({
      type: "custom:wled-studio-card",
      show_scenes: false,
      show_segments: true,
    });
    await el.updateComplete;
    expect(tabLabels(el)).toEqual(["Color", "Effects", "Segments", "Paint"]);
  });

  it("hides optional tabs when show_* flags are false", async () => {
    el.setConfig({
      type: "custom:wled-studio-card",
      show_effects: false,
      show_paint: false,
      show_segments: false,
    });
    await el.updateComplete;
    expect(tabLabels(el)).toEqual(["Color", "Scenes"]);
  });

  it("ArrowRight selects next tab and moves focus", async () => {
    await el.updateComplete;
    expect(el["_cardTab"]).toBe("color");
    expect(activeTabId(el)).toBe("wled-card-tab-color");

    dispatchTabKey(el, "ArrowRight");
    await el.updateComplete;
    await flushRaf();

    expect(el["_cardTab"]).toBe("effects");
    expect(activeTabId(el)).toBe("wled-card-tab-effects");
  });

  it("Home selects first tab and End selects last tab", async () => {
    await el.updateComplete;
    el["_cardTab"] = "segments";
    await el.updateComplete;

    dispatchTabKey(el, "Home");
    await el.updateComplete;
    await flushRaf();
    expect(el["_cardTab"]).toBe("color");
    expect(activeTabId(el)).toBe("wled-card-tab-color");

    dispatchTabKey(el, "End");
    await el.updateComplete;
    await flushRaf();
    expect(el["_cardTab"]).toBe("paint");
    expect(activeTabId(el)).toBe("wled-card-tab-paint");
  });

  it("swipe left on tab panel selects next tab", async () => {
    await el.updateComplete;
    expect(el["_cardTab"]).toBe("color");

    dispatchTabSwipe(el, -60);
    await el.updateComplete;

    expect(el["_cardTab"]).toBe("effects");
  });

  it("swipe right on tab panel selects previous tab", async () => {
    await el.updateComplete;
    el["_cardTab"] = "effects";
    await el.updateComplete;

    dispatchTabSwipe(el, 60);
    await el.updateComplete;

    expect(el["_cardTab"]).toBe("color");
  });

  it("ignores swipe shorter than 50px", async () => {
    await el.updateComplete;
    el["_cardTab"] = "color";
    await el.updateComplete;

    dispatchTabSwipe(el, -30);
    await el.updateComplete;

    expect(el["_cardTab"]).toBe("color");
  });

  it("renders mode tabs when Graphite-like document theme vars are set", async () => {
    const root = document.documentElement;
    root.style.setProperty("--primary-color", "#8ab4f8");
    root.style.setProperty("--card-background-color", "#1a1a1a");
    root.style.setProperty("--primary-text-color", "#e8eaed");
    root.style.setProperty("--ha-card-border-radius", "16px");

    await el.updateComplete;

    const card = el.shadowRoot?.querySelector(".card");
    const tablist = el.shadowRoot?.querySelector('[role="tablist"]');
    expect(card).toBeTruthy();
    expect(tablist?.getAttribute("aria-label")).toBe("Control mode");
    expect(tabLabels(el)).toEqual([
      "Color",
      "Effects",
      "Scenes",
      "Paint",
    ]);

    root.style.removeProperty("--primary-color");
    root.style.removeProperty("--card-background-color");
    root.style.removeProperty("--primary-text-color");
    root.style.removeProperty("--ha-card-border-radius");
  });
});

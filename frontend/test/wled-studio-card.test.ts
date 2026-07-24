import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";

// The card mounts <wled-studio-shell>, whose view-registry heavy loaders pull
// konva-backed modules. konva's node entry require("canvas") is a native module
// not installed in the test env — stub it so any ensureViewLoaded() that reaches
// a heavy view can evaluate without throwing (mirrors studio-shell.test.ts).
vi.mock("konva", () => ({ default: class {}, Stage: class {}, Layer: class {} }));

import {
  WledStudioCard,
  CARD_TAG,
  getStubConfig,
  type WledStudioCardConfig,
} from "../src/card/wled-studio-card.js";
import type { WledStudioShell } from "../src/core/studio-shell.js";
import { WledViewPaint } from "../src/panel/view-paint.js";
import { defineCustomElement } from "../src/utils/safe-custom-element.js";
// Registers <wled-studio-card-editor> so getConfigElement() resolves it.
import "../src/card/wled-studio-card-editor.js";

defineCustomElement(CARD_TAG, WledStudioCard);

/** The shell the card renders (the card is a thin wrapper). */
function shell(el: WledStudioCard): WledStudioShell {
  const node = el.shadowRoot?.querySelector<WledStudioShell>("wled-studio-shell");
  if (!node) throw new Error("wled-studio-shell missing");
  return node;
}

/** The ordered nav ids the shell will render for its current props. */
function shellNavIds(el: WledStudioCard): string[] {
  const sh = shell(el) as unknown as { visibleNav(): Array<{ id: string }> };
  return sh.visibleNav().map((n) => n.id);
}

async function mount(config: WledStudioCardConfig): Promise<WledStudioCard> {
  const el = new WledStudioCard();
  el.setConfig(config);
  document.body.appendChild(el);
  await el.updateComplete;
  await shell(el).updateComplete;
  return el;
}

describe("WledStudioCard — LovelaceCard contract", () => {
  it("setConfig throws on a non-custom type", () => {
    const el = new WledStudioCard();
    expect(() => el.setConfig({ type: "wled-studio-card" })).toThrow();
    expect(() => el.setConfig({ type: "custom:wled-studio-card" })).not.toThrow();
  });

  it("exposes getCardSize and getGridOptions", () => {
    const el = new WledStudioCard();
    expect(el.getCardSize()).toBeTypeOf("number");
    expect(el.getGridOptions()).toEqual({ columns: 12, min_columns: 6 });
  });

  it("getConfigElement returns the editor element", () => {
    const editor = WledStudioCard.getConfigElement();
    expect(editor.tagName.toLowerCase()).toBe("wled-studio-card-editor");
  });

  it("getStubConfig / getStubConfig() use the custom type", () => {
    expect(WledStudioCard.getStubConfig().type).toBe(`custom:${CARD_TAG}`);
    expect(getStubConfig().type).toBe(`custom:${CARD_TAG}`);
  });
});

describe("WledStudioCard — renders the shell wrapper", () => {
  let el: WledStudioCard;
  afterEach(() => el?.remove());

  it("renders a single <wled-studio-shell surface=card>", async () => {
    el = await mount({ type: "custom:wled-studio-card" });
    const sh = shell(el);
    expect(sh.surface).toBe("card");
  });
});

describe("WledStudioCard — config maps to shell props", () => {
  let el: WledStudioCard;
  afterEach(() => el?.remove());

  it("controller / layout_id map straight through", async () => {
    el = await mount({
      type: "custom:wled-studio-card",
      controller: "Cloud",
      layout_id: "lay-1",
    });
    const sh = shell(el);
    expect(sh.controller).toBe("Cloud");
    expect(sh.layoutId).toBe("lay-1");
  });

  it("config.height maps to shell.previewHeight (NOT a card-height cap)", async () => {
    el = await mount({ type: "custom:wled-studio-card", height: 321 });
    expect(shell(el).previewHeight).toBe(321);
  });

  it("density defaults to 'auto' and passes through when set", async () => {
    el = await mount({ type: "custom:wled-studio-card" });
    expect(shell(el).density).toBe("auto");

    el.remove();
    el = await mount({ type: "custom:wled-studio-card", density: "full" });
    expect(shell(el).density).toBe("full");
  });

  it("config.views maps to shell.visibleViews verbatim (order preserved)", async () => {
    el = await mount({
      type: "custom:wled-studio-card",
      views: ["scenes", "color", "home"],
    });
    expect(shell(el).visibleViews).toEqual(["scenes", "color", "home"]);
    // and the shell renders nav from exactly those ids, in order.
    expect(shellNavIds(el)).toEqual(["scenes", "color", "home"]);
  });

  it("default_view passes through; defaults to 'home' when absent", async () => {
    el = await mount({ type: "custom:wled-studio-card" });
    expect(shell(el).defaultView).toBe("home");

    el.remove();
    el = await mount({ type: "custom:wled-studio-card", default_view: "color" });
    expect(shell(el).defaultView).toBe("color");
  });
});

describe("WledStudioCard — deprecated show_* aliases synthesize views", () => {
  let el: WledStudioCard;
  afterEach(() => el?.remove());

  it("default (show_scenes:true) => Color, Effects, Scenes, Paint", async () => {
    el = await mount({ type: "custom:wled-studio-card", show_scenes: true });
    expect(shell(el).visibleViews).toEqual([
      "color",
      "effects",
      "scenes",
      "paint",
    ]);
  });

  it("show_scenes:false hides scenes", async () => {
    el = await mount({ type: "custom:wled-studio-card", show_scenes: false });
    expect(shell(el).visibleViews).toEqual(["color", "effects", "paint"]);
  });

  it("show_segments:true shows segments (and keeps scenes order)", async () => {
    el = await mount({
      type: "custom:wled-studio-card",
      show_scenes: false,
      show_segments: true,
    });
    expect(shell(el).visibleViews).toEqual([
      "color",
      "effects",
      "segments",
      "paint",
    ]);
  });

  it("turning effects+paint+segments off leaves Color + Scenes", async () => {
    el = await mount({
      type: "custom:wled-studio-card",
      show_effects: false,
      show_paint: false,
      show_segments: false,
    });
    expect(shell(el).visibleViews).toEqual(["color", "scenes"]);
  });

  it("explicit views wins over deprecated aliases", async () => {
    el = await mount({
      type: "custom:wled-studio-card",
      views: ["home", "color"],
      // aliases that would otherwise add scenes/effects/paint are ignored:
      show_scenes: true,
      show_segments: true,
    });
    expect(shell(el).visibleViews).toEqual(["home", "color"]);
  });
});

describe("WledStudioCard — selection / brightness / paint routing preserved", () => {
  let el: WledStudioCard;
  afterEach(() => el?.remove());

  it("the shell owns selection, brightness and paint wiring", async () => {
    el = await mount({ type: "custom:wled-studio-card", show_segments: true });
    const sh = shell(el) as unknown as {
      _selection: {
        setSegments(s: unknown[]): void;
        selectSegment(id: number): void;
        selectedSegId: number;
      };
      _onStripSegmentSelect(ev: CustomEvent): void;
      _setGlobalBrightness(ev: Event): void;
      _onSegmentChange(ev: CustomEvent): void;
    };

    // selection routing: a strip select updates the shared selection controller.
    sh._selection.setSegments([{ id: 2 } as unknown]);
    sh._onStripSegmentSelect(
      new CustomEvent("segment-select", { detail: { segmentId: 2 } })
    );
    expect(sh._selection.selectedSegId).toBe(2);

    // brightness + paint handlers exist on the shell (the card no longer owns
    // them) — calling them must not throw without an attached master entity.
    expect(() =>
      sh._setGlobalBrightness({ target: { value: 50 } } as unknown as Event)
    ).not.toThrow();
    expect(() =>
      sh._onSegmentChange(
        new CustomEvent("segment-change", { detail: { segmentId: 2 } })
      )
    ).not.toThrow();
  });

  it("paint routing survives the card wrapper: the shell binds + routes a preview stroke", async () => {
    const bindSpy = vi.spyOn(WledViewPaint.prototype, "bindExternalPreview");
    const strokeSpy = vi.spyOn(
      WledViewPaint.prototype,
      "handleExternalPaintStroke"
    );

    // density:full => left rail (avoids md-navigation-bar jsdom slot warning);
    // default_view:paint mounts the heavy paint panel inside the shell.
    el = await mount({
      type: "custom:wled-studio-card",
      density: "full",
      default_view: "paint",
      views: ["paint"],
    });
    const sh = shell(el);
    await new Promise((r) => setTimeout(r, 20));
    await sh.updateComplete;

    const panel = sh.shadowRoot!.querySelector("wled-view-paint");
    expect(panel).toBeTruthy();
    expect(bindSpy).toHaveBeenCalled();

    const preview = sh.shadowRoot!.querySelector("wled-geometry-preview")!;
    preview.dispatchEvent(
      new CustomEvent("paint-stroke", {
        detail: { led: 9, leds: [8, 9, 10] },
        bubbles: true,
        composed: true,
      })
    );
    expect(strokeSpy).toHaveBeenCalledTimes(1);

    vi.restoreAllMocks();
  });
});

describe("WledStudioCard — Material You / theme discipline", () => {
  let el: WledStudioCard;
  beforeEach(async () => {
    el = await mount({ type: "custom:wled-studio-card" });
  });
  afterEach(() => el?.remove());

  it("renders under Graphite-like document theme vars without throwing", async () => {
    const root = document.documentElement;
    root.style.setProperty("--primary-color", "#8ab4f8");
    root.style.setProperty("--card-background-color", "#1a1a1a");
    root.style.setProperty("--primary-text-color", "#e8eaed");
    root.style.setProperty("--ha-card-border-radius", "16px");

    await el.updateComplete;
    expect(shell(el)).toBeTruthy();

    root.style.removeProperty("--primary-color");
    root.style.removeProperty("--card-background-color");
    root.style.removeProperty("--primary-text-color");
    root.style.removeProperty("--ha-card-border-radius");
  });
});

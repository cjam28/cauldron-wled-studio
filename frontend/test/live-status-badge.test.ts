import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Connection } from "home-assistant-js-websocket";
import type { LiveFrameEvent } from "../src/api/live-stream.js";

/**
 * LV-4 frontend: status badge.
 *
 * The LV-proxy emits additive `status` / `stale` / `dropped` (alongside `fps`)
 * on each broadcast frame. Per the FRAME-STATUS CONTRACT the frontend must:
 *   - carry those optional fields on `LiveFrameEvent`,
 *   - treat "drop" as a FRESH-but-coalesced frame: keep painting it, show at
 *     most a subtle "throttled" hint, and NEVER the alarming reconnecting/stale
 *     badge (a remote viewer gets "drop" on nearly every steady-state delivery),
 *   - reserve the reconnecting/stale badge for a GENUINELY stale frame only,
 *     clearing back to "live" on a fresh frame,
 *   - in `<wled-geometry-preview>.setFrame`: PAINT a "drop" frame (freshest data)
 *     while only a "stale" frame keeps the last good pixels,
 *   - both preview surfaces behave identically for drop/stale.
 */

// Capture the onFrame callback subscribeLive is given so the test can push
// frames into the component. listControllers / fetchDeviceState are stubbed so
// _bootstrap resolves without a live HA connection.
let pushFrame: ((frame: LiveFrameEvent) => void) | undefined;

vi.mock("../src/api/live-stream.js", async (importActual) => {
  const actual = await importActual<typeof import("../src/api/live-stream.js")>();
  return {
    ...actual,
    subscribeLive: vi.fn(
      (
        _conn: Connection,
        _id: string,
        onFrame: (frame: LiveFrameEvent) => void
      ) => {
        pushFrame = onFrame;
        return () => {
          pushFrame = undefined;
        };
      }
    ),
    listControllers: vi.fn(async () => [
      { entry_id: "ctrl-1", pixel_count: 16 },
    ]),
  };
});

vi.mock("../src/api/wled-state.js", async (importActual) => {
  const actual = await importActual<typeof import("../src/api/wled-state.js")>();
  return {
    ...actual,
    fetchDeviceState: vi.fn(async () => ({ segments: [] })),
  };
});

import {
  WledStudioLivePreview,
  STUDIO_LIVE_PREVIEW_TAG,
  statusLabelForFrame,
} from "../src/components/studio-live-preview.js";
import { WledGeometryPreview } from "../src/components/geometry-preview.js";
import { parseLvFrame } from "../src/api/lv-frame-parser.js";

function makeFrame(extra: Partial<LiveFrameEvent> = {}): LiveFrameEvent {
  const base = parseLvFrame({ leds: Array(16).fill("ff0000"), n: 16 });
  if (!base) throw new Error("fixture parse failed");
  return { ...base, ...extra };
}

const fakeConnection = {} as Connection;

describe("LiveFrameEvent additive fields (LV-4)", () => {
  it("carries fps/stale/status/dropped as optional fields", () => {
    const frame: LiveFrameEvent = makeFrame({
      fps: 20,
      stale: true,
      status: "drop",
      dropped: 3,
    });
    expect(frame.fps).toBe(20);
    expect(frame.stale).toBe(true);
    expect(frame.status).toBe("drop");
    expect(frame.dropped).toBe(3);
    // Fields are optional — a plain parsed frame omits them.
    const plain: LiveFrameEvent = makeFrame();
    expect(plain.fps).toBeUndefined();
    expect(plain.stale).toBeUndefined();
    expect(plain.status).toBeUndefined();
    expect(plain.dropped).toBeUndefined();
  });
});

describe("statusLabelForFrame", () => {
  it("maps drop to the subtle 'throttled' hint, stale to 'stale', fresh to live", () => {
    // FRAME-STATUS CONTRACT: "drop" is a FRESH frame (N intervening frames were
    // coalesced for this throttled subscriber) — it must NOT map to an alarming
    // "frames dropped" label; it gets at most the subtle non-alarming
    // "throttled" hint. Only a genuinely stale frame maps to "stale".
    expect(statusLabelForFrame(makeFrame())).toBe("live");
    expect(statusLabelForFrame(makeFrame({ status: "live" }))).toBe("live");
    expect(statusLabelForFrame(makeFrame({ status: "drop" }))).toBe("throttled");
    expect(statusLabelForFrame(makeFrame({ dropped: 5 }))).toBe("throttled");
    expect(statusLabelForFrame(makeFrame({ stale: true }))).toBe("stale");
    expect(statusLabelForFrame(makeFrame({ status: "stale" }))).toBe("stale");
  });
});

describe("<wled-studio-live-preview> status badge", () => {
  let el: WledStudioLivePreview;

  beforeEach(async () => {
    pushFrame = undefined;
    el = document.createElement(STUDIO_LIVE_PREVIEW_TAG) as WledStudioLivePreview;
    el.connection = fakeConnection;
    el.controllerId = "ctrl-1";
    document.body.appendChild(el);
    await el.updateComplete;
    // Wait for the async _bootstrap chain (listControllers/fetchDeviceState) to
    // resolve so subscribeLive has been called and pushFrame is wired.
    for (let i = 0; i < 20 && !pushFrame; i++) {
      await Promise.resolve();
    }
  });

  afterEach(() => {
    el.remove();
  });

  it("drives a 'drop' frame into a subtle throttled hint, NOT an alarming badge", async () => {
    // FRAME-STATUS CONTRACT: a remote/throttled viewer gets status "drop" on
    // nearly every steady-state delivery. That must NEVER render the alarming
    // reconnecting/stale badge — only the muted, non-alarming "throttled" hint.
    expect(pushFrame).toBeTypeOf("function");
    pushFrame!(makeFrame({ status: "drop", dropped: 2 }));
    await el.updateComplete;

    expect(el["_status"]).toBe("throttled");
    // No alarming badge for a (fresh) dropped frame.
    expect(el.shadowRoot?.querySelector(".status-badge")).toBeNull();
    // A subtle hint span is present instead.
    const hint = el.shadowRoot?.querySelector(".status-hint");
    expect(hint).toBeTruthy();
    expect(hint?.textContent?.trim()).toBe("throttled");
  });

  it("drives a genuinely stale frame into the reconnecting badge", async () => {
    pushFrame!(makeFrame({ stale: true }));
    await el.updateComplete;

    expect(el["_status"]).toBe("stale");
    const badge = el.shadowRoot?.querySelector(".status-badge");
    // The badge is the ONLY alarming affordance, reserved for genuine staleness.
    expect(badge?.textContent?.trim()).toBe("reconnecting");
  });

  it("holds the hint steady across live/throttled flapping, then clears after the hold window", async () => {
    // Remote viewers interleave drop-marked and clean frames at frame rate.
    // Clearing the hint on every fresh frame made it strobe, and because the
    // hint occupies flow layout the content below shifted up/down rapidly.
    vi.useFakeTimers();
    try {
      pushFrame!(makeFrame({ status: "drop", dropped: 1 }));
      await el.updateComplete;
      expect(el.shadowRoot?.querySelector(".status-hint")).toBeTruthy();
      expect(el.shadowRoot?.querySelector(".status-badge")).toBeNull();

      // A fresh frame right after must NOT clear the hint (sticky hold).
      pushFrame!(makeFrame({ status: "live" }));
      await el.updateComplete;
      expect(el["_status"]).toBe("live");
      expect(el.shadowRoot?.querySelector(".status-hint")).toBeTruthy();

      // Once the hold window passes without further drops, the hint clears.
      vi.advanceTimersByTime(4100);
      await el.updateComplete;
      expect(el.shadowRoot?.querySelector(".status-hint")).toBeNull();
      expect(el.shadowRoot?.querySelector(".status-badge")).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });

  it("keeps the connecting label distinct from the degraded badge", async () => {
    // Before any frame, status is the muted 'connecting' label, not a badge.
    const fresh = document.createElement(
      STUDIO_LIVE_PREVIEW_TAG
    ) as WledStudioLivePreview;
    document.body.appendChild(fresh);
    await fresh.updateComplete;
    expect(fresh["_status"]).toBe("connecting");
    expect(fresh.shadowRoot?.querySelector(".status")).toBeTruthy();
    expect(fresh.shadowRoot?.querySelector(".status-badge")).toBeNull();
    fresh.remove();
  });
});

describe("<wled-geometry-preview>.setFrame stale handling", () => {
  it("keeps last good pixels when a stale frame arrives, surfacing stale status", () => {
    const geo = new WledGeometryPreview();
    geo.pixelCount = 16;

    // Fresh red frame establishes the last-good pixel buffer.
    geo.setFrame(makeFrame());
    const good = geo["_pixels"];
    expect(good).toBeInstanceOf(Uint8ClampedArray);
    expect(good?.[0]).toBe(0xff); // red channel of ff0000
    expect(geo["_status"]).toBe("live");

    // A genuinely stale frame must NOT overwrite the good pixels and freezes.
    geo.setFrame(makeFrame({ stale: true, leds_hex: Array(16).fill("0000ff") }));
    expect(geo["_pixels"]).toBe(good);
    expect(geo["_pixels"]?.[0]).toBe(0xff);
    expect(geo["_status"]).toBe("stale");

    // status:"stale" (no stale flag) behaves identically.
    geo.setFrame(makeFrame({ status: "stale", leds_hex: Array(16).fill("0000ff") }));
    expect(geo["_pixels"]).toBe(good);
    expect(geo["_status"]).toBe("stale");
  });

  it("PAINTS a status:'drop' frame — it is the freshest data, not a freeze", () => {
    const geo = new WledGeometryPreview();
    geo.pixelCount = 16;

    // Establish a last-good red buffer.
    geo.setFrame(makeFrame());
    const good = geo["_pixels"];
    expect(good?.[0]).toBe(0xff);

    // A "drop" frame carries fresh pixels (N intervening frames were coalesced
    // for this throttled subscriber) — the consumer MUST paint it, not freeze.
    geo.setFrame(makeFrame({ status: "drop", dropped: 4, leds_hex: Array(16).fill("00ff00") }));
    // _pixels is a NEW buffer (updated), not the held last-good one.
    expect(geo["_pixels"]).not.toBe(good);
    expect(geo["_pixels"]?.[0]).toBe(0x00); // red channel of 00ff00
    expect(geo["_pixels"]?.[1]).toBe(0xff); // green channel of 00ff00
    // dropped>0 is informational only — a subtle "throttled" hint, never "stale".
    expect(geo["_status"]).toBe("throttled");
    expect(geo["_status"]).not.toBe("stale");
  });
});

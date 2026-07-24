/**
 * Painter "Keep current look" (preserve) canvas baseline (owner checkpoint #2).
 *
 * Bug: _applyFillToBuffer seeded unpainted LEDs with a hardcoded gray
 * [40,40,40] placeholder in preserve mode, so the user painted over gray, not
 * the device's actual current colors. Fix: when a baseline frame (live_proxy's
 * last good frame, fetched via paint_baseline_frame) is present, seed unpainted
 * LEDs from it; painted (_touched) LEDs keep the brush color; an empty/failed
 * fetch falls back to the dim placeholder (no regression). off/custom modes are
 * unchanged.
 *
 * These drive the private surface directly (same pattern as
 * view-paint-wchannel.test.ts) — no live HA connection needed.
 */
import { describe, expect, it, vi } from "vitest";
import type { Connection } from "home-assistant-js-websocket";
import { WledViewPaint } from "../src/panel/view-paint.js";
import { defaultFillSettings } from "../src/utils/paint-settings-types.js";

interface PaintInternals {
  _rgbw: boolean;
  _pixelCount: number;
  _buffer: Uint8Array | null;
  _fill: ReturnType<typeof defaultFillSettings>;
  _touched: Set<number>;
  _baselineFrame: Uint8Array | null;
  connection?: Connection;
  controllerId: string;
  _applyFillToBuffer(): void;
  _refreshBaselineFrame(): Promise<void>;
  _syncPreviewPixels(changedLeds?: number[]): void;
}

/** A view wired to paint into a fresh RGBW buffer of `pixelCount` LEDs. */
function makeView(pixelCount: number, rgbw = true): PaintInternals {
  const view = new WledViewPaint() as unknown as PaintInternals;
  view._rgbw = rgbw;
  view._pixelCount = pixelCount;
  view._buffer = new Uint8Array(pixelCount * (rgbw ? 4 : 3));
  view._fill = defaultFillSettings("off");
  view._touched = new Set<number>();
  view._baselineFrame = null;
  return view;
}

/** Minimal connected Connection stub returning `result` from the WS call. */
function mockConn(result: Record<string, unknown>): Connection {
  return {
    connected: true,
    sendMessagePromise: vi.fn(async () => result),
    addEventListener() {},
    removeEventListener() {},
  } as unknown as Connection;
}

function failingConn(): Connection {
  return {
    connected: true,
    sendMessagePromise: vi.fn(async () => {
      throw new Error("rpc failed");
    }),
    addEventListener() {},
    removeEventListener() {},
  } as unknown as Connection;
}

describe("preserve mode — _applyFillToBuffer seeds from baseline frame", () => {
  it("seeds UNPAINTED LEDs from the baseline (not [40,40,40])", () => {
    const view = makeView(3);
    view._fill = defaultFillSettings("preserve");
    // Baseline: LED0 red, LED1 green, LED2 blue (RGBW, W=0).
    view._baselineFrame = Uint8Array.from([
      255, 0, 0, 0,
      0, 255, 0, 0,
      0, 0, 255, 0,
    ]);

    view._applyFillToBuffer();

    const buf = view._buffer!;
    expect([...buf]).toEqual([
      255, 0, 0, 0,
      0, 255, 0, 0,
      0, 0, 255, 0,
    ]);
    // The old gray placeholder must be gone.
    expect([...buf]).not.toContain(40);
  });

  it("leaves PAINTED (_touched) LEDs untouched by the fill", () => {
    const view = makeView(3);
    view._fill = defaultFillSettings("preserve");
    view._baselineFrame = Uint8Array.from([
      10, 10, 10, 0,
      20, 20, 20, 0,
      30, 30, 30, 0,
    ]);
    // LED1 is painted with a brush color already in the buffer.
    view._buffer!.set([200, 100, 50, 0], 1 * 4);
    view._touched.add(1);

    view._applyFillToBuffer();

    const buf = view._buffer!;
    // Painted LED1 keeps the brush color.
    expect([buf[4], buf[5], buf[6], buf[7]]).toEqual([200, 100, 50, 0]);
    // Unpainted LED0 + LED2 come from the baseline.
    expect([buf[0], buf[1], buf[2]]).toEqual([10, 10, 10]);
    expect([buf[8], buf[9], buf[10]]).toEqual([30, 30, 30]);
  });

  it("falls back to the dim placeholder when no baseline frame", () => {
    const view = makeView(2);
    view._fill = defaultFillSettings("preserve");
    view._baselineFrame = null;

    view._applyFillToBuffer();

    const buf = view._buffer!;
    expect([buf[0], buf[1], buf[2]]).toEqual([40, 40, 40]);
    expect([buf[4], buf[5], buf[6]]).toEqual([40, 40, 40]);
  });
});

describe("off / custom modes are unchanged", () => {
  it("off mode fills [0,0,0] even with a baseline present", () => {
    const view = makeView(2);
    view._fill = defaultFillSettings("off");
    view._baselineFrame = Uint8Array.from([99, 99, 99, 0, 99, 99, 99, 0]);

    view._applyFillToBuffer();

    const buf = view._buffer!;
    expect([buf[0], buf[1], buf[2]]).toEqual([0, 0, 0]);
    expect([buf[4], buf[5], buf[6]]).toEqual([0, 0, 0]);
  });

  it("custom mode fills the custom color, ignoring any baseline", () => {
    const view = makeView(2);
    view._fill = defaultFillSettings("custom"); // default custom col [72,72,72]
    view._baselineFrame = Uint8Array.from([99, 99, 99, 0, 99, 99, 99, 0]);

    view._applyFillToBuffer();

    const buf = view._buffer!;
    expect([buf[0], buf[1], buf[2]]).toEqual([72, 72, 72]);
    expect([buf[4], buf[5], buf[6]]).toEqual([72, 72, 72]);
  });
});

describe("_refreshBaselineFrame — fetch + seed", () => {
  it("fetches the current frame and seeds the canvas in preserve mode", async () => {
    const view = makeView(2);
    view._fill = defaultFillSettings("preserve");
    view.controllerId = "c1";
    view.connection = mockConn({
      ok: true,
      rgbw: true,
      count: 2,
      pixels: [1, 2, 3, 0, 4, 5, 6, 0],
    });

    await view._refreshBaselineFrame();

    expect(view._baselineFrame).not.toBeNull();
    const buf = view._buffer!;
    expect([buf[0], buf[1], buf[2]]).toEqual([1, 2, 3]);
    expect([buf[4], buf[5], buf[6]]).toEqual([4, 5, 6]);
  });

  it("empty-frame fetch clears baseline → dim-placeholder fallback", async () => {
    const view = makeView(2);
    view._fill = defaultFillSettings("preserve");
    view.controllerId = "c1";
    view.connection = mockConn({ ok: true, rgbw: true, count: 0, pixels: [] });

    await view._refreshBaselineFrame();

    expect(view._baselineFrame).toBeNull();
    const buf = view._buffer!;
    expect([buf[0], buf[1], buf[2]]).toEqual([40, 40, 40]);
  });

  it("failed fetch falls back to the dim placeholder (no regression)", async () => {
    const view = makeView(2);
    view._fill = defaultFillSettings("preserve");
    view.controllerId = "c1";
    view.connection = failingConn();

    await view._refreshBaselineFrame();

    expect(view._baselineFrame).toBeNull();
    const buf = view._buffer!;
    expect([buf[0], buf[1], buf[2]]).toEqual([40, 40, 40]);
  });

  it("is a no-op when not in preserve mode", async () => {
    const view = makeView(2);
    view._fill = defaultFillSettings("off");
    view.controllerId = "c1";
    const conn = mockConn({ ok: true, rgbw: true, count: 2, pixels: [9, 9, 9, 0, 9, 9, 9, 0] });
    view.connection = conn;

    await view._refreshBaselineFrame();

    expect(conn.sendMessagePromise).not.toHaveBeenCalled();
    expect(view._baselineFrame).toBeNull();
  });
});

/**
 * SP-W-channel (SP-2): the paint buffer/brush must preserve the W (white)
 * channel on RGBW strips, mirroring the Python commit path
 * (`_scale_col_by_bri` / `_col_from_settings`, which keep `col[3]`).
 *
 * Before this fix the frontend dropped W twice:
 *   - `_writeLed` hardcoded `_buffer[o+3] = 0` on RGBW strips, and
 *   - `_brushRgb` returned only `[r, g, b]`.
 *
 * These tests exercise the private brush/buffer helpers directly (the same
 * casting pattern the other view tests use) so we can assert the buffer bytes
 * without standing up a live HA connection.
 */
import { describe, expect, it } from "vitest";
import { WledViewPaint } from "../src/panel/view-paint.js";
import { defaultBrushSettings } from "../src/utils/paint-settings-types.js";

/** Private surface of WledViewPaint we drive in these unit tests. */
interface PaintInternals {
  _rgbw: boolean;
  _pixelCount: number;
  _buffer: Uint8Array | null;
  _brush: ReturnType<typeof defaultBrushSettings>;
  _effectsByName: Record<string, number>;
  _writeLed(
    led: number,
    rgb: [number, number, number] | [number, number, number, number]
  ): void;
  _brushRgb(): [number, number, number];
  _brushRgbw(): [number, number, number, number];
  _strokeLeds(leds: number[]): void;
}

/**
 * Build a view wired to paint into a fresh buffer of `pixelCount` LEDs, with a
 * solid-color brush carrying `col` at brightness `bri`. No connection is set,
 * so the flush path is a safe no-op.
 */
function makeView(opts: {
  rgbw: boolean;
  pixelCount: number;
  col: [number, number, number, number];
  bri?: number;
}): PaintInternals {
  const view = new WledViewPaint() as unknown as PaintInternals;
  view._rgbw = opts.rgbw;
  view._pixelCount = opts.pixelCount;
  view._buffer = new Uint8Array(opts.pixelCount * (opts.rgbw ? 4 : 3));
  // fx 0 == Solid with an empty effect map -> color brush (not an effect),
  // which is the path that writes RGBW into the buffer.
  view._brush = defaultBrushSettings(0, opts.col);
  if (opts.bri !== undefined) view._brush.bri = opts.bri;
  view._effectsByName = {};
  return view;
}

describe("SP-W-channel — RGBW brush preserves white", () => {
  it("_brushRgbw scales all four channels by bri/255", () => {
    const view = makeView({
      rgbw: true,
      pixelCount: 4,
      col: [200, 100, 50, 180],
      bri: 128,
    });
    const f = 128 / 255;
    expect(view._brushRgbw()).toEqual([
      Math.round(200 * f),
      Math.round(100 * f),
      Math.round(50 * f),
      Math.round(180 * f),
    ]);
  });

  it("_brushRgb stays RGB-only (first three of the scaled RGBW)", () => {
    const view = makeView({
      rgbw: true,
      pixelCount: 4,
      col: [200, 100, 50, 180],
      bri: 128,
    });
    const rgbw = view._brushRgbw();
    expect(view._brushRgb()).toEqual([rgbw[0], rgbw[1], rgbw[2]]);
  });

  it("_writeLed writes the scaled W into buffer[o+3] on RGBW (not 0)", () => {
    const col: [number, number, number, number] = [255, 128, 64, 200];
    const bri = 255;
    const view = makeView({ rgbw: true, pixelCount: 2, col, bri });
    const f = bri / 255; // == 1
    const rgbw = view._brushRgbw();

    view._writeLed(1, rgbw);

    const buf = view._buffer!;
    const o = 1 * 4;
    expect([buf[o], buf[o + 1], buf[o + 2], buf[o + 3]]).toEqual([
      Math.round(col[0] * f),
      Math.round(col[1] * f),
      Math.round(col[2] * f),
      Math.round(col[3] * f),
    ]);
    // The whole point of the fix: W is preserved, not hardcoded to 0.
    expect(buf[o + 3]).toBe(200);
    expect(buf[o + 3]).not.toBe(0);
  });

  it("_strokeLeds bakes [r*f,g*f,b*f,W*f] into the buffer on RGBW", () => {
    const col: [number, number, number, number] = [240, 120, 60, 160];
    const bri = 128;
    const view = makeView({ rgbw: true, pixelCount: 3, col, bri });
    const f = bri / 255;

    view._strokeLeds([0, 2]);

    const buf = view._buffer!;
    const expected = [
      Math.round(col[0] * f),
      Math.round(col[1] * f),
      Math.round(col[2] * f),
      Math.round(col[3] * f),
    ];
    expect([buf[0], buf[1], buf[2], buf[3]]).toEqual(expected); // LED 0
    expect([buf[8], buf[9], buf[10], buf[11]]).toEqual(expected); // LED 2
    // LED 1 untouched.
    expect([buf[4], buf[5], buf[6], buf[7]]).toEqual([0, 0, 0, 0]);
    // W actually carried through.
    expect(buf[3]).toBe(Math.round(col[3] * f));
    expect(buf[3]).toBeGreaterThan(0);
  });
});

describe("SP-W-channel — RGB strip writes no 4th byte", () => {
  it("_writeLed never writes a 4th byte on an RGB strip", () => {
    const col: [number, number, number, number] = [255, 128, 64, 200];
    const view = makeView({ rgbw: false, pixelCount: 2, col, bri: 255 });
    // Buffer is 3 bytes/LED: LED 1 occupies indices 3,4,5; index 6 would be OOB.
    expect(view._buffer!.length).toBe(2 * 3);

    view._strokeLeds([1]);

    const buf = view._buffer!;
    const o = 1 * 3;
    expect([buf[o], buf[o + 1], buf[o + 2]]).toEqual([col[0], col[1], col[2]]);
    // No W byte exists for LED 1; LED 0 stays fully zero (untouched).
    expect([buf[0], buf[1], buf[2]]).toEqual([0, 0, 0]);
    // The brush's col[3] (W=200) must NOT leak into the RGB buffer anywhere.
    expect([...buf]).not.toContain(200);
  });

  it("_writeLed with a 4-tuple still ignores W on RGB", () => {
    const view = makeView({
      rgbw: false,
      pixelCount: 1,
      col: [10, 20, 30, 99],
      bri: 255,
    });
    view._writeLed(0, [10, 20, 30, 99]);
    expect([...view._buffer!]).toEqual([10, 20, 30]);
  });
});

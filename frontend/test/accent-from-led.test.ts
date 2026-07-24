import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactiveControllerHost } from "lit";
import {
  StudioSessionController,
  primaryRgbForSegment,
  resolveDark,
} from "../src/core/studio-session.js";
import type { WledSegment } from "../src/api/wled-state.js";
import { accentPairFromRgb } from "../src/core/m3-color.js";

/**
 * A host stub that records the CSS custom properties the accent-from-LED path
 * writes/clears, so we can assert it tints ONLY the scoped --wled-led-accent
 * tokens (never the --md-sys-color-* roles — the card follows Material You).
 */
interface RecordingHost extends ReactiveControllerHost {
  props: Map<string, string>;
  style: {
    setProperty(name: string, value: string): void;
    removeProperty(name: string): void;
  };
}

function recordingHost(): RecordingHost {
  const props = new Map<string, string>();
  const host = {
    props,
    style: {
      setProperty(name: string, value: string) {
        props.set(name, value);
      },
      removeProperty(name: string) {
        props.delete(name);
      },
    },
    addController() {},
    removeController() {},
    requestUpdate() {},
    updateComplete: Promise.resolve(true),
  } as unknown as RecordingHost;
  return host;
}

/** WLED segment with a primary col slot (RGB[, W]). */
function seg(id: number, rgb?: number[]): WledSegment {
  return { id, col: rgb ? [rgb] : undefined } as WledSegment;
}

const LED_ACCENT = "--wled-led-accent";
const LED_ON_ACCENT = "--wled-on-led-accent";

describe("primaryRgbForSegment (seed derivation)", () => {
  it("reads col slot 0 as the RGB seed", () => {
    expect(primaryRgbForSegment(seg(0, [255, 87, 34, 0]))).toEqual([255, 87, 34]);
  });

  it("accepts hex-string col slots (WLED state form)", () => {
    // WLED state sometimes serializes col slots as hex strings; normalizeCols
    // handles them, so cast through unknown to feed that runtime shape.
    const hexSeg = { id: 0, col: ["#ff5722"] } as unknown as WledSegment;
    expect(primaryRgbForSegment(hexSeg)).toEqual([255, 87, 34]);
  });

  it("returns null for no segment / no col / off (black) primary", () => {
    expect(primaryRgbForSegment(undefined)).toBeNull();
    expect(primaryRgbForSegment(seg(0))).toBeNull();
    expect(primaryRgbForSegment(seg(0, [0, 0, 0]))).toBeNull();
  });
});

describe("resolveDark", () => {
  it("honors an explicit boolean", () => {
    expect(resolveDark(true)).toBe(true);
    expect(resolveDark(false)).toBe(false);
  });

  it("falls back to prefers-color-scheme when omitted", () => {
    const spy = vi
      .spyOn(globalThis, "matchMedia")
      .mockReturnValue({ matches: true } as MediaQueryList);
    expect(resolveDark()).toBe(true);
    spy.mockRestore();
  });
});

describe("StudioSessionController accent-from-LED", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("debounces: only the last rapid color edit reaches the host", () => {
    const host = recordingHost();
    const c = new StudioSessionController(host);

    c.applyAccentFromSegment(seg(0, [10, 20, 30]), { dark: false });
    c.applyAccentFromSegment(seg(0, [40, 50, 60]), { dark: false });
    c.applyAccentFromSegment(seg(0, [255, 87, 34]), { dark: false });
    expect(host.props.size).toBe(0); // nothing written before the debounce fires

    vi.runAllTimers();

    const expected = accentPairFromRgb(255, 87, 34, { dark: false });
    expect(host.props.get(LED_ACCENT)).toBe(expected.accent);
    expect(host.props.get(LED_ON_ACCENT)).toBe(expected.onAccent);
    // ONLY the two scoped LED-accent tokens are written — never --md-sys-color-*.
    expect(host.props.size).toBe(2);
    expect(host.props.get("--md-sys-color-primary")).toBeUndefined();
  });

  it("seed derivation: writes the MCU accent for the segment's primary color", () => {
    const host = recordingHost();
    const c = new StudioSessionController(host);
    c.applyAccentFromSegment(seg(0, [255, 87, 34]), { dark: true });
    vi.runAllTimers();
    expect(host.props.get(LED_ACCENT)).toBe(
      accentPairFromRgb(255, 87, 34, { dark: true }).accent,
    );
  });

  it("dedupes a repeated identical seed (no redundant regen)", () => {
    const host = recordingHost();
    const c = new StudioSessionController(host);
    c.applyAccentFromSegment(seg(0, [255, 87, 34]), { dark: false });
    vi.runAllTimers();
    const written = host.props.get(LED_ACCENT);

    // mutate the recorded value, re-apply the SAME seed -> must not rewrite
    host.props.set(LED_ACCENT, "#sentinel");
    c.applyAccentFromSegment(seg(0, [255, 87, 34]), { dark: false });
    vi.runAllTimers();
    expect(host.props.get(LED_ACCENT)).toBe("#sentinel");

    // a different seed DOES regen
    c.applyAccentFromSegment(seg(0, [10, 120, 240]), { dark: false });
    vi.runAllTimers();
    expect(host.props.get(LED_ACCENT)).not.toBe("#sentinel");
    expect(host.props.get(LED_ACCENT)).not.toBe(written);
  });

  it("no-op + clear when no segment/color: inherited scheme restored", () => {
    const host = recordingHost();
    const c = new StudioSessionController(host);

    c.applyAccentFromSegment(seg(0, [255, 87, 34]), { dark: false });
    vi.runAllTimers();
    expect(host.props.size).toBeGreaterThan(0);

    // selecting nothing (or an off segment) clears every token override
    c.applyAccentFromSegment(undefined);
    expect(host.props.size).toBe(0);

    c.applyAccentFromSegment(seg(0, [255, 87, 34]), { dark: false });
    vi.runAllTimers();
    c.applyAccentFromSegment(seg(0, [0, 0, 0]));
    expect(host.props.size).toBe(0);
  });

  it("clearAccent is idempotent and harmless before any apply", () => {
    const host = recordingHost();
    const c = new StudioSessionController(host);
    expect(() => c.clearAccent()).not.toThrow();
    expect(host.props.size).toBe(0);
  });

  it("hostDisconnected cancels a pending debounced write", () => {
    const host = recordingHost();
    const c = new StudioSessionController(host);
    c.applyAccentFromSegment(seg(0, [255, 87, 34]), { dark: false });
    c.hostDisconnected();
    vi.runAllTimers();
    expect(host.props.size).toBe(0);
  });
});

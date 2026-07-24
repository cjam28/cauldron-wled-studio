import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { StatusHold } from "../src/utils/status-hold.js";
import { stripOverlayVisible } from "../src/components/strip-preview.js";

describe("StatusHold (throttled-hint stickiness)", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("activates once and stays active across rapid pings (no strobing)", () => {
    const changes: boolean[] = [];
    const hold = new StatusHold((a) => changes.push(a), 4000);

    // A remote viewer pings on nearly every frame (~30/s).
    for (let i = 0; i < 30; i++) {
      hold.ping();
      vi.advanceTimersByTime(33);
    }
    expect(hold.active).toBe(true);
    expect(changes).toEqual([true]); // exactly one transition — no flicker
  });

  it("deactivates only after the hold window passes with no pings", () => {
    const changes: boolean[] = [];
    const hold = new StatusHold((a) => changes.push(a), 4000);
    hold.ping();
    vi.advanceTimersByTime(3999);
    expect(hold.active).toBe(true);
    vi.advanceTimersByTime(2);
    expect(hold.active).toBe(false);
    expect(changes).toEqual([true, false]);
  });

  it("clear() cancels the pending deactivation callback", () => {
    const changes: boolean[] = [];
    const hold = new StatusHold((a) => changes.push(a), 4000);
    hold.ping();
    hold.clear();
    expect(hold.active).toBe(false);
    vi.advanceTimersByTime(10000);
    expect(changes).toEqual([true]); // no late onChange(false) after clear
  });
});

describe("stripOverlayVisible", () => {
  it("never overlays live or throttled frames (both are painted fresh)", () => {
    expect(stripOverlayVisible("live")).toBe(false);
    expect(stripOverlayVisible("throttled")).toBe(false);
  });

  it("overlays genuine non-painting states", () => {
    expect(stripOverlayVisible("stale")).toBe(true);
    expect(stripOverlayVisible("waiting")).toBe(true);
    expect(stripOverlayVisible("connecting")).toBe(true);
  });
});

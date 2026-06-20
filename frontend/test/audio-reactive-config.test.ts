import { describe, expect, it } from "vitest";
import { parseAudioReactiveConfig } from "../src/components/audio-reactive-controls.js";

describe("parseAudioReactiveConfig (AU-1)", () => {
  it("applies WLED's documented defaults when fields are absent", () => {
    const cfg = parseAudioReactiveConfig({});
    expect(cfg.freqDist).toBe(1); // square-root scale, not linear(0)
    expect(cfg.limiterRise).toBe(60); // ms, not 100
    expect(cfg.limiterFall).toBe(800); // ms, not 400
  });

  it("honors device-reported values over defaults", () => {
    const cfg = parseAudioReactiveConfig({
      freqDist: 2,
      limiterRise: 10,
      limiterFall: 999,
      gain: 55,
    });
    expect(cfg.freqDist).toBe(2);
    expect(cfg.limiterRise).toBe(10);
    expect(cfg.limiterFall).toBe(999);
    expect(cfg.gain).toBe(55);
  });
});

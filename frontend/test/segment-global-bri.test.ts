import { describe, expect, it, vi, beforeEach } from "vitest";
import type { Connection } from "home-assistant-js-websocket";
import { WledSegmentControls } from "../src/components/segment-controls.js";
import {
  fetchDeviceState,
  fetchEffectMeta,
  fetchPresets,
} from "../src/api/wled-state.js";

vi.mock("../src/api/wled-state.js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/api/wled-state.js")>();
  return {
    ...actual,
    fetchDeviceState: vi.fn(),
    fetchEffectMeta: vi.fn(),
    fetchPresets: vi.fn(),
  };
});

vi.mock("../src/api/state-writer.js", () => ({
  createOptimisticApply: vi.fn(() => ({
    push: vi.fn(),
    cancel: vi.fn(),
  })),
}));

const mockSnapshot = {
  segments: [
    { id: 0, bri: 255 },
    { id: 1, bri: 200 },
  ],
  effects_by_name: { Solid: 0 },
  segment_entities: [],
  state: {},
  palettes_by_name: {},
  sound_flags: [],
  fxdata: "",
  led_order: 0,
  info: { leds: { count: 210 } },
};

describe("segment global brightness sync", () => {
  beforeEach(() => {
    vi.mocked(fetchDeviceState).mockResolvedValue(mockSnapshot);
    vi.mocked(fetchEffectMeta).mockResolvedValue({
      sliders: {},
      colors_enabled: true,
      palette_enabled: true,
      flag: null,
      defaults: {},
    });
    vi.mocked(fetchPresets).mockResolvedValue({});
  });

  it("applyGlobalBrightness updates every segment bri", async () => {
    const el = new WledSegmentControls();
    el["_segments"] = [
      { id: 0, bri: 255 },
      { id: 1, bri: 100 },
      { id: 2, bri: 50 },
    ];
    el.applyGlobalBrightness(128);
    expect(el.segments.map((s) => s.bri)).toEqual([128, 128, 128]);
  });

  it("after load with masterEntity set, segments get master bri", async () => {
    const el = new WledSegmentControls();
    el.connection = {} as Connection;
    el.controllerId = "test-controller";
    el.masterEntity = "light.master";
    el.applyGlobalBrightness(128);

    await (el as unknown as { _load(): Promise<void> })._load();

    expect(el.segments.map((s) => s.bri)).toEqual([128, 128]);
  });
});

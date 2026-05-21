import type { Connection } from "home-assistant-js-websocket";
import { SCHEMA_VERSION } from "./types.js";
import { waitForConnection } from "./live-stream.js";
import { debounce } from "../utils/debounce.js";

export interface WledSegment {
  id: number;
  start?: number;
  stop?: number;
  len?: number;
  grp?: number;
  spc?: number;
  of?: number;
  on?: boolean;
  bri?: number;
  col?: number[][];
  fx?: number;
  sx?: number;
  ix?: number;
  c1?: number;
  c2?: number;
  c3?: number;
  o1?: number;
  o2?: number;
  o3?: number;
  pal?: number;
  sel?: boolean;
  rev?: boolean;
  mi?: boolean;
  awm?: number;
  si?: number;
}

export interface EffectMeta {
  sliders: Record<string, boolean>;
  colors_enabled: boolean;
  palette_enabled: boolean;
  flag: string | null;
  defaults: Record<string, string>;
}

export interface DeviceStateSnapshot {
  state: Record<string, unknown>;
  segments: WledSegment[];
  effects_by_name: Record<string, number>;
  palettes_by_name: Record<string, number>;
  sound_flags: Array<string | null>;
  fxdata: string;
  led_order: number;
  segment_entities: Array<{
    entity_id: string;
    segment_index: number;
    name: string;
  }>;
  info: Record<string, unknown>;
}

export async function fetchDeviceState(
  connection: Connection,
  controllerId: string
): Promise<DeviceStateSnapshot> {
  await waitForConnection(connection);
  const res = (await connection.sendMessagePromise({
    type: "wled_studio/get_state",
    schema_version: SCHEMA_VERSION,
    controller_id: controllerId,
  })) as DeviceStateSnapshot & { ok?: boolean };
  return res;
}

export async function applyState(
  connection: Connection,
  controllerId: string,
  state: Record<string, unknown>,
  options?: { fullResponse?: boolean }
): Promise<Record<string, unknown>> {
  await waitForConnection(connection);
  const res = (await connection.sendMessagePromise({
    type: "wled_studio/apply_state",
    schema_version: SCHEMA_VERSION,
    controller_id: controllerId,
    state,
    full_response: options?.fullResponse ?? false,
  })) as { state?: Record<string, unknown> };
  return res.state ?? {};
}

export function createDebouncedApply(
  connection: Connection,
  controllerId: string
) {
  return debounce((patch: Record<string, unknown>) => {
    void applyState(connection, controllerId, patch).catch(() => undefined);
  }, 50, 100);
}

export async function fetchEffectMeta(
  connection: Connection,
  controllerId: string,
  effectId: number
): Promise<EffectMeta> {
  const res = (await connection.sendMessagePromise({
    type: "wled_studio/effect_meta",
    schema_version: SCHEMA_VERSION,
    controller_id: controllerId,
    effect_id: effectId,
  })) as { meta?: EffectMeta };
  return (
    res.meta ?? {
      sliders: {},
      colors_enabled: true,
      palette_enabled: true,
      flag: null,
      defaults: {},
    }
  );
}

export async function fetchPresets(
  connection: Connection,
  controllerId: string
): Promise<Record<string, unknown>> {
  const res = (await connection.sendMessagePromise({
    type: "wled_studio/get_presets",
    schema_version: SCHEMA_VERSION,
    controller_id: controllerId,
  })) as { presets?: Record<string, unknown> };
  return res.presets ?? {};
}

/** WLED col slot → [R,G,B,W] */
export function parseColSlot(slot: number[] | undefined): [number, number, number, number] {
  if (!slot || slot.length < 3) return [255, 255, 255, 0];
  return [
    slot[0] ?? 0,
    slot[1] ?? 0,
    slot[2] ?? 0,
    slot[3] ?? 0,
  ];
}

export function colToHex(rgb: [number, number, number]): string {
  const h = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0");
  return `#${h(rgb[0])}${h(rgb[1])}${h(rgb[2])}`;
}

/** Normalize WLED col slots for stable compare (hex strings vs RGB arrays). */
export function normalizeCols(col: unknown): number[][] {
  if (!Array.isArray(col)) return [];
  const out: number[][] = [];
  for (const slot of col) {
    if (typeof slot === "string") {
      const hex = slot.replace("#", "").trim();
      if (hex.length >= 6) {
        out.push([
          parseInt(hex.slice(0, 2), 16),
          parseInt(hex.slice(2, 4), 16),
          parseInt(hex.slice(4, 6), 16),
          hex.length >= 8 ? parseInt(hex.slice(6, 8), 16) : 0,
        ]);
        continue;
      }
    }
    if (Array.isArray(slot)) {
      out.push([
        Number(slot[0]) || 0,
        Number(slot[1]) || 0,
        Number(slot[2]) || 0,
        Number(slot[3]) || 0,
      ]);
    }
  }
  return out;
}

/**
 * Minimal WLED /json/state segment payload.
 * WLED 16.x applies color/fx to the selected segment — always set sel + on.
 */
export function buildSegmentPatch(
  targetId: number,
  patch: Partial<WledSegment>
): Record<string, unknown> {
  const entry: Record<string, unknown> = {
    ...patch,
    id: targetId,
    sel: true,
    on: patch.on !== undefined ? patch.on : true,
  };
  return { seg: [entry] };
}

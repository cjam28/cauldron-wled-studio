import type { Connection } from "home-assistant-js-websocket";
import { SCHEMA_VERSION } from "./types.js";
import { waitForConnection } from "./live-stream.js";
import { formatHaError } from "../utils/ha-error.js";
import type {
  PaintBrushSettings,
  UnpaintedFillSettings,
} from "../utils/paint-settings-types.js";
import { brushToPaintMode } from "../utils/paint-settings-types.js";

export type PaintMode = "color" | "effect";

/** Faster base64 for DDP buffers (avoids per-byte string concat). */
export function paintBufferToBase64(data: Uint8Array): string {
  const chunk = 0x8000;
  let binary = "";
  for (let i = 0; i < data.length; i += chunk) {
    const slice = data.subarray(i, i + chunk);
    binary += String.fromCharCode(...slice);
  }
  return btoa(binary);
}

async function ws<T>(
  connection: Connection,
  payload: { type: string } & Record<string, unknown>
): Promise<T> {
  await waitForConnection(connection);
  try {
    return (await connection.sendMessagePromise({
      ...payload,
      schema_version: SCHEMA_VERSION,
    })) as T;
  } catch (err) {
    throw new Error(formatHaError(err));
  }
}

export interface PaintStartResult {
  wifi_sleep_warning?: string | null;
  pixel_count?: number;
  rgbw?: boolean;
}

/**
 * SP-4: additive paint-session connection health returned on paint_frame
 * results and the paint_status query. All fields are optional so older
 * backends (that omit them) leave the painter in its healthy default.
 */
export interface PaintConnectionHealth {
  /** False once consecutive send failures cross the unhealthy threshold. */
  connectionHealthy: boolean;
  /** Human-readable cause when unhealthy (or a wifi-sleep hint), else null. */
  connectionReason: string | null;
  /** Count of consecutive failed sends/keepalives. */
  consecutiveSendFailures: number;
  /**
   * SP-5: estimated segment-run count the current buffer would commit to, or
   * null when the backend omits it (older backend / no buffer yet).
   */
  segCount: number | null;
  /** Device's max segment count (maxseg), or null when not reported. */
  maxSegments: number | null;
  /** True once seg_count reaches ~80% of max_segments (pre-commit warning). */
  segWarn: boolean;
}

/** Default (healthy) when a result carries no health fields. */
export function defaultPaintHealth(): PaintConnectionHealth {
  return {
    connectionHealthy: true,
    connectionReason: null,
    consecutiveSendFailures: 0,
    segCount: null,
    maxSegments: null,
    segWarn: false,
  };
}

interface PaintFrameResult {
  connection_healthy?: boolean;
  connection_reason?: string | null;
  consecutive_send_failures?: number;
  seg_count?: number;
  max_segments?: number;
  seg_warn?: boolean;
}

/** Merge the additive SP-5 segment-count fields onto a health object. */
function withSegCount(
  health: PaintConnectionHealth,
  result: PaintFrameResult | undefined
): PaintConnectionHealth {
  if (!result || typeof result.seg_count !== "number") {
    return health;
  }
  return {
    ...health,
    segCount: result.seg_count,
    maxSegments: typeof result.max_segments === "number" ? result.max_segments : null,
    segWarn: result.seg_warn === true,
  };
}

function parsePaintHealth(result: PaintFrameResult | undefined): PaintConnectionHealth {
  if (!result || typeof result.connection_healthy !== "boolean") {
    return withSegCount(defaultPaintHealth(), result);
  }
  return withSegCount(
    {
      ...defaultPaintHealth(),
      connectionHealthy: result.connection_healthy,
      connectionReason: result.connection_reason ?? null,
      consecutiveSendFailures: result.consecutive_send_failures ?? 0,
    },
    result
  );
}

export async function paintStart(
  connection: Connection,
  controllerId: string
): Promise<PaintStartResult> {
  return ws(connection, {
    type: "wled_studio/paint_start",
    controller_id: controllerId,
  });
}

export async function paintFrame(
  connection: Connection,
  controllerId: string,
  data: Uint8Array,
  options?: {
    rgbw?: boolean;
    touched?: number[];
    brush?: PaintBrushSettings;
    fill?: UnpaintedFillSettings;
    effectsByName?: Record<string, number>;
  }
): Promise<PaintConnectionHealth> {
  const b64 = paintBufferToBase64(data);
  const brush = options?.brush;
  const fill = options?.fill;
  const effects = options?.effectsByName ?? {};
  const paintMode = brush ? brushToPaintMode(brush, effects) : "color";

  const result = await ws<PaintFrameResult>(connection, {
    type: "wled_studio/paint_frame",
    controller_id: controllerId,
    data: b64,
    rgbw: options?.rgbw ?? true,
    paint_mode: paintMode,
    ...(options?.touched?.length ? { touched: options.touched } : {}),
    ...(brush ? { brush } : {}),
    ...(fill ? { fill } : {}),
    ...(paintMode === "effect" && brush
      ? { effect_id: brush.fx }
      : {}),
  });
  return parsePaintHealth(result);
}

/** SP-4: poll the live paint-session health (recovery-banner source). */
export async function paintStatus(
  connection: Connection,
  controllerId: string
): Promise<PaintConnectionHealth & { active: boolean }> {
  const result = await ws<PaintFrameResult & { active?: boolean }>(connection, {
    type: "wled_studio/paint_status",
    controller_id: controllerId,
  });
  return {
    active: Boolean(result?.active),
    ...parsePaintHealth(result),
  };
}

/**
 * The controller's current per-LED frame ("the current look"), returned by the
 * additive ``paint_baseline_frame`` command. ``pixels`` is the flat RGB(W) byte
 * array from live_proxy's last good frame. When the proxy is not ingesting the
 * backend returns ``count: 0`` / empty ``pixels`` and the caller falls back to
 * its dim placeholder.
 */
export interface PaintBaselineFrame {
  rgbw: boolean;
  count: number;
  pixels: number[];
}

/**
 * Fetch the device's current per-LED frame so the painter "Keep current look"
 * (preserve) fill mode can seed its canvas with the real colors. Returns an
 * empty frame (count 0) when no current frame is available.
 */
export async function fetchPaintBaselineFrame(
  connection: Connection,
  controllerId: string
): Promise<PaintBaselineFrame> {
  const result = await ws<{
    rgbw?: boolean;
    count?: number;
    pixels?: number[];
  }>(connection, {
    type: "wled_studio/paint_baseline_frame",
    controller_id: controllerId,
  });
  return {
    rgbw: result?.rgbw ?? true,
    count: typeof result?.count === "number" ? result.count : 0,
    pixels: Array.isArray(result?.pixels) ? result.pixels : [],
  };
}

export async function paintStop(
  connection: Connection,
  controllerId: string,
  commit = true
): Promise<void> {
  await ws(connection, {
    type: "wled_studio/paint_stop",
    controller_id: controllerId,
    commit,
  });
}

export async function thumbCaptureStart(
  connection: Connection,
  controllerId: string
): Promise<void> {
  await ws(connection, {
    type: "wled_studio/thumb_capture_start",
    controller_id: controllerId,
  });
}

export async function thumbCaptureCancel(
  connection: Connection,
  controllerId: string
): Promise<void> {
  await ws(connection, {
    type: "wled_studio/thumb_capture_cancel",
    controller_id: controllerId,
  });
}

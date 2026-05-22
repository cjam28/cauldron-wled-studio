import type { Connection } from "home-assistant-js-websocket";
import { SCHEMA_VERSION } from "./types.js";
import { waitForConnection } from "./live-stream.js";
import { formatHaError } from "../utils/ha-error.js";

export type PaintMode = "color" | "effect";

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
    paintMode?: PaintMode;
    effectId?: number;
  }
): Promise<void> {
  let binary = "";
  for (let i = 0; i < data.length; i++) {
    binary += String.fromCharCode(data[i]!);
  }
  const b64 = btoa(binary);
  const payload = {
    type: "wled_studio/paint_frame" as const,
    controller_id: controllerId,
    data: b64,
    rgbw: options?.rgbw ?? true,
    paint_mode: options?.paintMode ?? "color",
    ...(options?.touched?.length ? { touched: options.touched } : {}),
    ...(options?.paintMode === "effect" && options.effectId !== undefined
      ? { effect_id: options.effectId }
      : {}),
  };
  await ws(connection, payload);
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

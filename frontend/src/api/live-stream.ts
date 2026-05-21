import type { Connection } from "home-assistant-js-websocket";
import { SCHEMA_VERSION } from "./types.js";
import { onHaConnectionReady } from "./reconnect.js";
import type { LvFrame } from "./lv-frame-parser.js";
import { parseLvFrame } from "./lv-frame-parser.js";

export interface LiveFrameEvent extends LvFrame {
  entry_id?: string;
  controller_id?: string;
  fps?: number;
}

type LiveWsEvent = {
  type?: string;
  event?: { type?: string; data?: Record<string, unknown> };
  data?: Record<string, unknown>;
};

export function subscribeLive(
  connection: Connection,
  controllerId: string,
  onFrame: (frame: LiveFrameEvent) => void,
  options?: { remote?: boolean }
): () => void {
  let unsub: (() => void) | undefined;
  let cancelled = false;

  const attach = async () => {
    unsub?.();
    unsub = undefined;
    if (cancelled) return;
    unsub = await connection.subscribeMessage<LiveWsEvent>(
      (msg) => {
        const data =
          msg.event?.data ??
          (msg.type === "wled_studio_live_frame" ? msg.data : undefined);
        if (!data) return;
        const parsed = parseLvFrame(data);
        if (!parsed) return;
        onFrame({
          ...parsed,
          entry_id: data.entry_id as string | undefined,
          controller_id: data.controller_id as string | undefined,
          fps: data.fps as number | undefined,
        });
      },
      {
        type: "wled_studio/subscribe_live",
        schema_version: SCHEMA_VERSION,
        controller_id: controllerId,
        remote: options?.remote ?? false,
      }
    );
  };

  void attach();
  const offReady = onHaConnectionReady(connection, () => {
    void attach();
  });

  return () => {
    cancelled = true;
    offReady();
    unsub?.();
    unsub = undefined;
  };
}

export async function waitForConnection(connection: Connection): Promise<void> {
  if (connection.connected) return;
  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      connection.removeEventListener("ready", onReady);
      reject(new Error("Home Assistant WebSocket not connected"));
    }, 15000);
    const onReady = () => {
      if (!connection.connected) return;
      window.clearTimeout(timeout);
      connection.removeEventListener("ready", onReady);
      resolve();
    };
    connection.addEventListener("ready", onReady);
  });
}

export interface ControllerInfo {
  entry_id: string;
  controller_id?: string;
  title?: string;
  host?: string;
  pixel_count?: number;
  fw_ver?: string;
  master_entity_id?: string;
  [key: string]: unknown;
}

export async function listControllers(
  connection: Connection
): Promise<ControllerInfo[]> {
  await waitForConnection(connection);
  try {
    const res = (await connection.sendMessagePromise({
      type: "wled_studio/list_controllers",
      schema_version: SCHEMA_VERSION,
    })) as { controllers?: Array<Record<string, unknown>> };
    return (res.controllers ?? []) as unknown as ControllerInfo[];
  } catch (err: unknown) {
    const e = err as { code?: string; message?: string };
    const detail = e?.code
      ? `${e.code}: ${e.message ?? "failed"}`
      : err instanceof Error
        ? err.message
        : String(err);
    throw new Error(`wled_studio/list_controllers — ${detail}`);
  }
}

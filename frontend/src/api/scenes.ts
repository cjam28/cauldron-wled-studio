import type { Connection } from "home-assistant-js-websocket";
import { SCHEMA_VERSION } from "./types.js";
import { waitForConnection } from "./live-stream.js";

export interface SceneRecord {
  id: string;
  controller_id: string;
  name: string;
  wled_state: Record<string, unknown>;
  layout_id?: string | null;
  transition_ms?: number;
  etag?: string;
  seeded?: boolean;
  preview_url?: string | null;
  updated_at?: string;
}

export class SceneConflictError extends Error {
  remote: SceneRecord;
  etag: string;

  constructor(remote: SceneRecord, etag: string) {
    super("Scene conflict");
    this.name = "SceneConflictError";
    this.remote = remote;
    this.etag = etag;
  }
}

async function ws<T>(
  connection: Connection,
  payload: { type: string } & Record<string, unknown>
): Promise<T> {
  await waitForConnection(connection);
  return connection.sendMessagePromise({
    ...payload,
    schema_version: SCHEMA_VERSION,
  }) as Promise<T>;
}

export function transitionToTt(transitionMs: number): number {
  return Math.max(0, Math.min(255, Math.floor(transitionMs / 100)));
}

export async function sceneList(
  connection: Connection,
  controllerId: string
): Promise<SceneRecord[]> {
  const res = await ws<{ scenes?: SceneRecord[] }>(connection, {
    type: "wled_studio/scene_list",
    controller_id: controllerId,
  });
  return res.scenes ?? [];
}

export async function sceneGet(
  connection: Connection,
  controllerId: string,
  sceneId: string
): Promise<SceneRecord | null> {
  const res = await ws<{ scene?: SceneRecord }>(connection, {
    type: "wled_studio/scene_get",
    controller_id: controllerId,
    scene_id: sceneId,
  });
  return res.scene ?? null;
}

export async function sceneSave(
  connection: Connection,
  controllerId: string,
  scene: SceneRecord,
  options?: { ifMatchEtag?: string }
): Promise<SceneRecord> {
  try {
    const res = await ws<{ scene?: SceneRecord }>(connection, {
      type: "wled_studio/scene_save",
      controller_id: controllerId,
      scene,
      if_match_etag: options?.ifMatchEtag,
    });
    return res.scene ?? scene;
  } catch (err: unknown) {
    const e = err as {
      code?: string;
      message?: string;
      data?: { scene?: SceneRecord; etag?: string };
    };
    if (e?.code === "conflict" && e.data?.scene) {
      throw new SceneConflictError(
        e.data.scene,
        String(e.data.etag ?? e.message ?? "")
      );
    }
    throw err;
  }
}

export async function sceneDelete(
  connection: Connection,
  controllerId: string,
  sceneId: string
): Promise<void> {
  await ws(connection, {
    type: "wled_studio/scene_delete",
    controller_id: controllerId,
    scene_id: sceneId,
  });
}

export async function sceneApply(
  connection: Connection,
  controllerId: string,
  sceneId: string,
  options?: { transitionMs?: number; signal?: AbortSignal }
): Promise<Record<string, unknown>> {
  await waitForConnection(connection);
  const payload = {
    type: "wled_studio/scene_apply",
    schema_version: SCHEMA_VERSION,
    controller_id: controllerId,
    scene_id: sceneId,
    transition_ms: options?.transitionMs,
  };
  if (options?.signal) {
    return new Promise((resolve, reject) => {
      const onAbort = () => reject(new DOMException("Aborted", "AbortError"));
      if (options.signal?.aborted) {
        onAbort();
        return;
      }
      options.signal?.addEventListener("abort", onAbort, { once: true });
      connection
        .sendMessagePromise(payload)
        .then((res) => {
          options.signal?.removeEventListener("abort", onAbort);
          resolve((res as { state?: Record<string, unknown> }).state ?? {});
        })
        .catch((err) => {
          options.signal?.removeEventListener("abort", onAbort);
          reject(err);
        });
    });
  }
  const res = (await connection.sendMessagePromise(payload)) as {
    state?: Record<string, unknown>;
  };
  return res.state ?? {};
}

export async function sceneCapture(
  connection: Connection,
  controllerId: string,
  name: string,
  options?: { sceneId?: string; layoutId?: string; transitionMs?: number }
): Promise<SceneRecord> {
  const res = await ws<{ scene?: SceneRecord }>(connection, {
    type: "wled_studio/scene_capture",
    controller_id: controllerId,
    name,
    scene_id: options?.sceneId,
    layout_id: options?.layoutId,
    transition_ms: options?.transitionMs ?? 2500,
  });
  return res.scene ?? { id: "", controller_id: controllerId, name, wled_state: {} };
}

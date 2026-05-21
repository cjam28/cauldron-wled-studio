import type { Connection } from "home-assistant-js-websocket";
import { SCHEMA_VERSION } from "./types.js";
import { waitForConnection } from "./live-stream.js";

export interface LayoutBackground {
  url: string;
  opacity?: number;
  brightness?: number;
  saturation?: number;
  rotation?: number;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
  cropX?: number;
  cropY?: number;
  cropW?: number;
  cropH?: number;
}

export interface LayoutRecord {
  id: string;
  controller_id: string;
  name: string;
  pixel_count: number;
  fixtures: Array<Record<string, unknown>>;
  background_url?: string | null;
  background?: LayoutBackground | null;
  scale_px_per_m?: number | null;
  etag?: string;
}

export interface LedPosition {
  x: number;
  y: number;
  led: number;
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

export async function layoutList(
  connection: Connection,
  controllerId: string
): Promise<LayoutRecord[]> {
  const res = await ws<{ layouts?: LayoutRecord[] }>(connection, {
    type: "wled_studio/layout_list",
    controller_id: controllerId,
  });
  return res.layouts ?? [];
}

export async function layoutGet(
  connection: Connection,
  controllerId: string,
  layoutId: string
): Promise<LayoutRecord | null> {
  const res = await ws<{ layout?: LayoutRecord }>(connection, {
    type: "wled_studio/layout_get",
    controller_id: controllerId,
    layout_id: layoutId,
  });
  return res.layout ?? null;
}

export async function layoutSave(
  connection: Connection,
  controllerId: string,
  layout: LayoutRecord
): Promise<LayoutRecord> {
  const res = await ws<{ layout?: LayoutRecord }>(connection, {
    type: "wled_studio/layout_save",
    controller_id: controllerId,
    layout,
  });
  return res.layout ?? layout;
}

export async function layoutResolvePositions(
  connection: Connection,
  controllerId: string,
  fixtureId: string,
  layoutId?: string
): Promise<LedPosition[]> {
  const res = await ws<{ positions?: LedPosition[] }>(connection, {
    type: "wled_studio/layout_resolve_positions",
    controller_id: controllerId,
    fixture_id: fixtureId,
    layout_id: layoutId,
  });
  return res.positions ?? [];
}

export async function layoutToSegments(
  connection: Connection,
  controllerId: string,
  layoutId: string,
  fixtureId?: string
): Promise<{ segments: Array<Record<string, unknown>> }> {
  return ws(connection, {
    type: "wled_studio/layout_to_segments",
    controller_id: controllerId,
    layout_id: layoutId,
    fixture_id: fixtureId,
  });
}

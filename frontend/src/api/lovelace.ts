import type { Connection } from "home-assistant-js-websocket";
import { SCHEMA_VERSION } from "./types.js";

export async function registerLovelaceResource(
  connection: Connection
): Promise<{ url: string }> {
  const res = (await connection.sendMessagePromise({
    type: "wled_studio/register_lovelace_resource",
    schema_version: SCHEMA_VERSION,
  })) as { url?: string };
  return { url: res.url ?? "" };
}

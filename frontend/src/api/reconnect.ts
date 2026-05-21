import type { Connection } from "home-assistant-js-websocket";

/** Re-subscribe live streams after HA WS reconnect (frigate-card pattern). */
export function onHaConnectionReady(
  connection: Connection,
  handler: () => void
): () => void {
  const listener = () => handler();
  connection.addEventListener("ready", listener);
  return () => connection.removeEventListener("ready", listener);
}

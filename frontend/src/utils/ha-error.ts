/** Turn Home Assistant WebSocket / API errors into readable strings. */

export function formatHaError(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  if (err && typeof err === "object") {
    const o = err as Record<string, unknown>;
    if (typeof o.message === "string") {
      return typeof o.code === "string" ? `${o.code}: ${o.message}` : o.message;
    }
    const nested = o.error;
    if (nested && typeof nested === "object") {
      const n = nested as Record<string, unknown>;
      if (typeof n.message === "string") {
        return typeof n.code === "string" ? `${n.code}: ${n.message}` : n.message;
      }
    }
    if (typeof o.code === "string") return o.code;
  }
  try {
    return JSON.stringify(err);
  } catch {
    return "Unknown error";
  }
}

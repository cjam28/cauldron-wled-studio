import type { HomeAssistant } from "custom-card-helpers";

/**
 * Append `?auth=` for same-origin HA paths.
 * `<img src>` cannot send Authorization headers; token auth needs this query param.
 */
export function withHaAuth(path: string, hass?: HomeAssistant): string {
  if (!path.startsWith("/")) return path;
  const token = hass?.auth?.data?.access_token;
  if (!token) return path;
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}auth=${encodeURIComponent(token)}`;
}

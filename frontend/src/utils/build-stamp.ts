/** Integration version — keep in sync with custom_components/wled_studio/manifest.json */
export const WLED_STUDIO_BUILD = "0.11.4";

declare global {
  interface Window {
    __WLED_STUDIO_BUILD__?: string;
    __WLED_STUDIO_STALE__?: boolean;
  }
}

/** Record bundle load; mark stale when a newer bundle loads over an older one. */
export function stampWledStudioBuild(): void {
  const prev = window.__WLED_STUDIO_BUILD__;
  if (prev && prev !== WLED_STUDIO_BUILD) {
    window.__WLED_STUDIO_STALE__ = true;
  }
  window.__WLED_STUDIO_BUILD__ = WLED_STUDIO_BUILD;
}

export function isWledStudioStale(): boolean {
  return Boolean(window.__WLED_STUDIO_STALE__);
}

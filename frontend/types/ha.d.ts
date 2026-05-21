import type { HomeAssistant } from "custom-card-helpers";

declare global {
  interface HASSDomEvents {
    "hass-toggle-menu": { open?: boolean };
  }
}

export interface PanelRoute {
  path: string;
  name: string;
}

export type { HomeAssistant };

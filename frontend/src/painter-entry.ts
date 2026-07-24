/** Standalone painter card bundle — separate from the studio card/panel. */
import {
  PAINTER_TAG,
  WledPainterCard,
  type WledPainterCardConfig,
} from "./card/wled-painter-card.js";
import { defineCustomElement } from "./utils/safe-custom-element.js";

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description?: string;
      preview?: boolean;
    }>;
  }
}

defineCustomElement(PAINTER_TAG, WledPainterCard);

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === PAINTER_TAG)) {
  window.customCards.push({
    type: PAINTER_TAG,
    name: "WLED Painter",
    description: "Per-LED painter for a WLED Studio controller",
    preview: false,
  });
}

console.info("[wled-studio] painter bundle loaded", { card: PAINTER_TAG });

export { WledPainterCard, PAINTER_TAG };
export type { WledPainterCardConfig };

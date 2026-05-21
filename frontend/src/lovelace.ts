/** Lovelace-only entry (card + editor). Do not import the panel here. */
import { CARD_TAG, WledStudioCard, getStubConfig } from "./card/wled-studio-card.js";
import "./card/wled-studio-card-editor.js";

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

if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, WledStudioCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === CARD_TAG)) {
  window.customCards.push({
    type: CARD_TAG,
    name: "WLED Studio",
    description: "Live LED strip preview and controls",
    preview: true,
  });
}

console.info("[wled-studio] lovelace bundle loaded", { card: CARD_TAG });

export { WledStudioCard, getStubConfig, CARD_TAG };

import { CARD_TAG, WledStudioCard, getStubConfig } from "./card/wled-studio-card.js";
import "./card/wled-studio-card-editor.js";
import { PANEL_TAG, WledStudioPanel } from "./panel/wled-studio-panel.js";

if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, WledStudioCard);
}
if (!customElements.get(PANEL_TAG)) {
  customElements.define(PANEL_TAG, WledStudioPanel);
}

(window as unknown as { wledStudioCard?: typeof WledStudioCard }).wledStudioCard =
  WledStudioCard;

console.info("[wled-studio] frontend bundle loaded", { card: CARD_TAG, panel: PANEL_TAG });

export { WledStudioCard, WledStudioPanel, getStubConfig, CARD_TAG, PANEL_TAG };

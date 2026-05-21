/** Sidebar panel entry — separate bundle from the Lovelace card resource. */
import { PANEL_TAG, WledStudioPanel } from "./panel/wled-studio-panel.js";

if (!customElements.get(PANEL_TAG)) {
  customElements.define(PANEL_TAG, WledStudioPanel);
}

console.info("[wled-studio] panel bundle loaded", { panel: PANEL_TAG });

export { WledStudioPanel, PANEL_TAG };

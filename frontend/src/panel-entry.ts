/** Sidebar panel entry — separate bundle from the Lovelace card resource. */
import { PANEL_TAG, WledStudioPanel } from "./panel/wled-studio-panel.js";
import { stampWledStudioBuild } from "./utils/build-stamp.js";
import { defineCustomElement } from "./utils/safe-custom-element.js";

stampWledStudioBuild();
defineCustomElement(PANEL_TAG, WledStudioPanel);

console.info("[wled-studio] panel bundle loaded", { panel: PANEL_TAG });

export { WledStudioPanel, PANEL_TAG };

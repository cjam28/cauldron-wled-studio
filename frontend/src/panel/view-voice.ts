import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { sceneList, type SceneRecord } from "../api/scenes.js";
import type { Connection } from "home-assistant-js-websocket";

@safeCustomElement("wled-view-voice")
export class WledViewVoice extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";
  @state() private _scenes: SceneRecord[] = [];

  protected override async onPoweredConnect(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    try {
      this._scenes = await sceneList(this.connection, this.controllerId);
    } catch {
      this._scenes = [];
    }
  }

  protected override render() {
    return html`
      <section class="voice">
        <p>
          Saved scenes are exposed as <code>scene.*</code> entities. Add aliases in
          Settings → Devices &amp; services → Entities for Assist phrases like
          “party mode” or “movie time”.
        </p>
        <p class="hint">
          Sentence trigger (integration): <em>make {entity} {effect}</em>
        </p>
        <ul>
          ${this._scenes.map(
            (s) => html`
              <li>
                <strong>${s.name}</strong>
                <span class="id">scene.wled_studio_${s.id}</span>
              </li>
            `
          )}
        </ul>
      </section>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .hint {
        opacity: 0.85;
      }
      ul {
        padding-left: 1.2rem;
      }
      .id {
        display: block;
        font-size: 0.8rem;
        opacity: 0.7;
        font-family: monospace;
      }
    `,
  ];
}

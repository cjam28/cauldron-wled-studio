import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { sceneList, type SceneRecord } from "../api/scenes.js";
import type { Connection } from "home-assistant-js-websocket";

const ASSIST_DOCS = "https://www.home-assistant.io/voice_control/";

@safeCustomElement("wled-view-voice")
export class WledViewVoice extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";
  @property() masterEntity = "";
  @state() private _scenes: SceneRecord[] = [];
  @state() private _copied = "";

  protected override async onPoweredConnect(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    try {
      this._scenes = await sceneList(this.connection, this.controllerId);
    } catch {
      this._scenes = [];
    }
  }

  private async _copy(text: string, key: string): Promise<void> {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      this._copied = key;
      window.setTimeout(() => {
        if (this._copied === key) this._copied = "";
      }, 2000);
    } catch {
      this._copied = "";
    }
  }

  protected override render() {
    const master = this.masterEntity.trim();
    return html`
      <section class="voice">
        <h2>Voice &amp; Assist</h2>
        <p>
          Saved scenes are exposed as <code>scene.*</code> entities. Add aliases in
          Settings → Devices &amp; services → Entities for Assist phrases like
          “party mode” or “movie time”.
        </p>
        <p class="hint">
          Sentence trigger (integration): <em>make {entity} {effect}</em>
        </p>
        <p>
          <a
            class="docs-link"
            href=${ASSIST_DOCS}
            target="_blank"
            rel="noopener noreferrer"
          >
            Home Assistant Assist documentation
          </a>
        </p>

        ${master
          ? html`
              <div class="entity-row">
                <div class="entity-meta">
                  <span class="entity-label">Master light</span>
                  <code class="entity-id">${master}</code>
                </div>
                <button
                  type="button"
                  class="copy-btn"
                  aria-label="Copy master entity id"
                  @click=${() => this._copy(master, "master")}
                >
                  <ha-icon icon="mdi:content-copy"></ha-icon>
                  ${this._copied === "master" ? "Copied" : "Copy"}
                </button>
              </div>
            `
          : null}

        <ul>
          ${this._scenes.map(
            (s) => html`
              <li>
                <div class="scene-row">
                  <div class="scene-meta">
                    <strong>${s.name}</strong>
                    <code class="id">scene.wled_studio_${s.id}</code>
                  </div>
                  <button
                    type="button"
                    class="copy-btn"
                    aria-label=${`Copy entity id for ${s.name}`}
                    @click=${() =>
                      this._copy(`scene.wled_studio_${s.id}`, `scene-${s.id}`)}
                  >
                    <ha-icon icon="mdi:content-copy"></ha-icon>
                    ${this._copied === `scene-${s.id}` ? "Copied" : "Copy"}
                  </button>
                </div>
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
      .voice h2 {
        margin: 0 0 8px;
        font-size: 1.15rem;
      }
      .hint {
        opacity: 0.85;
      }
      .docs-link {
        color: var(--primary-color);
      }
      ul {
        padding-left: 0;
        list-style: none;
        margin: 16px 0 0;
      }
      li + li {
        margin-top: 10px;
      }
      .entity-row,
      .scene-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .entity-row {
        padding: 10px 12px;
        margin: 12px 0;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
      }
      .entity-label {
        display: block;
        font-size: 0.8rem;
        opacity: 0.75;
        margin-bottom: 2px;
      }
      .entity-id,
      .id {
        font-size: 0.8rem;
        opacity: 0.85;
        font-family: monospace;
        word-break: break-all;
      }
      .copy-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 6px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--secondary-background-color);
        color: inherit;
        cursor: pointer;
        font-size: 0.82rem;
      }
      .copy-btn ha-icon {
        --mdc-icon-size: 16px;
      }
    `,
  ];
}

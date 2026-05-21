import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";

export interface PresetEntry {
  id: string;
  name: string;
  ql?: string;
}

export const PRESET_BAR_TAG = "wled-preset-bar";

@safeCustomElement(PRESET_BAR_TAG)
export class WledPresetBar extends BasePoweredElement {
  @property({ type: Array }) presets: PresetEntry[] = [];

  protected override render() {
    const ql = this.presets.filter((p) => p.ql);
    const named = this.presets.filter((p) => !p.ql || p.name);

    return html`
      <div class="bar" aria-label="WLED presets">
        ${ql.length
          ? html`
              <div class="ql-row">
                ${ql.map(
                  (p) => html`
                    <button
                      class="ql"
                      title=${p.name}
                      @click=${() => this._pick(p.id)}
                    >
                      ${p.ql}
                    </button>
                  `
                )}
              </div>
            `
          : null}
        <ul class="named-list">
          ${named.map(
            (p) => html`
              <li>
                <button class="named" @click=${() => this._pick(p.id)}>
                  <span class="id">${p.id}</span>
                  <span class="name">${p.name}</span>
                  ${p.ql
                    ? html`<span class="ql-badge">${p.ql}</span>`
                    : null}
                </button>
              </li>
            `
          )}
        </ul>
      </div>
    `;
  }

  private _pick(id: string): void {
    this.dispatchEvent(
      new CustomEvent("preset-select", {
        detail: { presetId: id },
        bubbles: true,
        composed: true,
      })
    );
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .ql-row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 8px;
      }
      .ql {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        background: var(--secondary-background-color, #333);
        cursor: pointer;
        font-size: 1rem;
      }
      .named-list {
        list-style: none;
        margin: 0;
        padding: 0;
        max-height: 160px;
        overflow-y: auto;
      }
      .named {
        width: 100%;
        display: flex;
        gap: 8px;
        align-items: center;
        padding: 8px 10px;
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        text-align: left;
        border-radius: 6px;
      }
      .named:hover {
        background: var(--secondary-background-color, rgba(128, 128, 128, 0.2));
      }
      .id {
        opacity: 0.6;
        font-size: 0.75rem;
        min-width: 1.5rem;
      }
      .name {
        flex: 1;
        font-size: 0.85rem;
      }
      .ql-badge {
        font-size: 0.75rem;
        opacity: 0.8;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [PRESET_BAR_TAG]: WledPresetBar;
  }
}

import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import {
  addColorSwatch,
  defaultSwatchName,
  loadColorSwatches,
  removeColorSwatch,
  swatchColorKey,
  updateColorSwatch,
  type ColorSwatch,
} from "../utils/color-swatch-storage.js";

export const COLOR_SWATCH_BAR_TAG = "wled-color-swatch-bar";

@safeCustomElement(COLOR_SWATCH_BAR_TAG)
export class WledColorSwatchBar extends BasePoweredElement {
  @property() controllerId = "";
  @property({ type: Array }) rgb: [number, number, number] = [255, 128, 0];
  @property({ type: Number }) white = 0;

  @state() private _swatches: ColorSwatch[] = [];
  @state() private _saving = false;
  @state() private _saveName = "";
  @state() private _editingId: string | null = null;
  @state() private _editName = "";

  protected override onPoweredConnect(): void {
    this._reload();
  }

  protected override updated(changed: import("lit").PropertyValues): void {
    super.updated(changed);
    if (changed.has("controllerId")) {
      this._reload();
    }
  }

  private _reload(): void {
    this._swatches = loadColorSwatches(this.controllerId);
  }

  private _currentKey(): string {
    return swatchColorKey(this.rgb, this.white);
  }

  private _swatchCss(s: ColorSwatch): string {
    const [r, g, b] = s.rgb;
    if (s.white > 0) {
      return `linear-gradient(135deg, rgb(${r},${g},${b}) 55%, rgba(255,255,255,0.95) 55%)`;
    }
    return `rgb(${r},${g},${b})`;
  }

  private _apply(s: ColorSwatch): void {
    this.dispatchEvent(
      new CustomEvent("swatch-select", {
        detail: { rgb: [...s.rgb] as [number, number, number], white: s.white },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _openSave(): void {
    this._saveName = defaultSwatchName(this.rgb, this.white);
    this._saving = true;
    this._editingId = null;
  }

  private _confirmSave(): void {
    addColorSwatch(this.controllerId, {
      name: this._saveName,
      rgb: this.rgb,
      white: this.white,
    });
    this._saving = false;
    this._reload();
    this.dispatchEvent(
      new CustomEvent("swatches-changed", { bubbles: true, composed: true })
    );
  }

  private _cancelSave(): void {
    this._saving = false;
  }

  private _startEdit(s: ColorSwatch, ev: Event): void {
    ev.stopPropagation();
    this._editingId = s.id;
    this._editName = s.name;
    this._saving = false;
  }

  private _confirmEdit(): void {
    if (!this._editingId) return;
    updateColorSwatch(this.controllerId, this._editingId, {
      name: this._editName,
    });
    this._editingId = null;
    this._reload();
  }

  private _cancelEdit(): void {
    this._editingId = null;
  }

  private _delete(id: string, ev: Event): void {
    ev.stopPropagation();
    removeColorSwatch(this.controllerId, id);
    if (this._editingId === id) this._editingId = null;
    this._reload();
    this.dispatchEvent(
      new CustomEvent("swatches-changed", { bubbles: true, composed: true })
    );
  }

  protected override render() {
    const activeKey = this._currentKey();

    return html`
      <section class="swatches" aria-label="Saved color swatches">
        <div class="head">
          <span class="label">Saved colors</span>
          <button
            type="button"
            class="save-btn"
            ?disabled=${this._saving}
            @click=${() => this._openSave()}
            aria-label="Save current color as swatch"
          >
            <ha-icon icon="mdi:bookmark-plus-outline"></ha-icon>
            Save swatch
          </button>
        </div>

        ${this._saving
          ? html`
              <div class="inline-form" role="form">
                <input
                  type="text"
                  class="name-input"
                  placeholder="Swatch name"
                  .value=${this._saveName}
                  @input=${(e: Event) => {
                    this._saveName = (e.target as HTMLInputElement).value;
                  }}
                  @keydown=${(e: KeyboardEvent) => {
                    if (e.key === "Enter") this._confirmSave();
                    if (e.key === "Escape") this._cancelSave();
                  }}
                />
                <button type="button" class="primary" @click=${() => this._confirmSave()}>
                  Save
                </button>
                <button type="button" class="ghost" @click=${() => this._cancelSave()}>
                  Cancel
                </button>
              </div>
            `
          : null}

        ${this._editingId
          ? html`
              <div class="inline-form" role="form">
                <input
                  type="text"
                  class="name-input"
                  .value=${this._editName}
                  @input=${(e: Event) => {
                    this._editName = (e.target as HTMLInputElement).value;
                  }}
                  @keydown=${(e: KeyboardEvent) => {
                    if (e.key === "Enter") this._confirmEdit();
                    if (e.key === "Escape") this._cancelEdit();
                  }}
                />
                <button type="button" class="primary" @click=${() => this._confirmEdit()}>
                  Rename
                </button>
                <button type="button" class="ghost" @click=${() => this._cancelEdit()}>
                  Cancel
                </button>
              </div>
            `
          : null}

        ${this._swatches.length === 0 && !this._saving
          ? html`<p class="empty">Save colors you use often — tap a swatch to apply.</p>`
          : html`
              <div class="grid" role="list">
                ${this._swatches.map(
                  (s) => html`
                    <div
                      class="chip-wrap ${swatchColorKey(s.rgb, s.white) === activeKey
                        ? "active"
                        : ""}"
                      role="listitem"
                    >
                      <button
                        type="button"
                        class="chip"
                        title=${s.name}
                        style="background: ${this._swatchCss(s)}"
                        @click=${() => this._apply(s)}
                        aria-label=${`Apply ${s.name}`}
                      ></button>
                      <span class="chip-name">${s.name}</span>
                      <div class="chip-actions">
                        <button
                          type="button"
                          class="icon"
                          aria-label=${`Rename ${s.name}`}
                          @click=${(ev: Event) => this._startEdit(s, ev)}
                        >
                          <ha-icon icon="mdi:pencil-outline"></ha-icon>
                        </button>
                        <button
                          type="button"
                          class="icon danger"
                          aria-label=${`Remove ${s.name}`}
                          @click=${(ev: Event) => this._delete(s.id, ev)}
                        >
                          <ha-icon icon="mdi:close"></ha-icon>
                        </button>
                      </div>
                    </div>
                  `
                )}
              </div>
            `}
      </section>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .swatches {
        width: 100%;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid var(--divider-color, rgba(128, 128, 128, 0.25));
      }
      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 8px;
      }
      .label {
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        opacity: 0.85;
      }
      .save-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.35));
        border-radius: 999px;
        padding: 4px 10px;
        font-size: 0.72rem;
        background: var(--card-background-color, transparent);
        color: inherit;
        cursor: pointer;
      }
      .save-btn:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }
      .save-btn ha-icon {
        --mdc-icon-size: 16px;
      }
      .inline-form {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        align-items: center;
        margin-bottom: 10px;
      }
      .name-input {
        flex: 1;
        min-width: 120px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, #444);
        padding: 6px 10px;
        font-size: 0.8rem;
        background: var(--card-background-color);
        color: inherit;
      }
      .primary,
      .ghost {
        border-radius: 8px;
        padding: 6px 12px;
        font-size: 0.75rem;
        cursor: pointer;
        border: none;
      }
      .primary {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .ghost {
        background: transparent;
        color: inherit;
        border: 1px solid var(--divider-color, #444);
      }
      .empty {
        margin: 0;
        font-size: 0.72rem;
        opacity: 0.65;
      }
      .grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .chip-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        width: 52px;
        position: relative;
      }
      .chip-wrap.active .chip {
        box-shadow:
          0 0 0 2px var(--card-background-color, #1a1a1a),
          0 0 0 4px var(--primary-color, #18a0fb);
      }
      .chip {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        cursor: pointer;
        padding: 0;
        transition: transform 0.12s ease;
      }
      .chip:hover {
        transform: scale(1.06);
      }
      .chip-name {
        font-size: 0.62rem;
        opacity: 0.75;
        max-width: 52px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
      .chip-actions {
        display: flex;
        gap: 2px;
        opacity: 0;
        transition: opacity 0.15s ease;
      }
      .chip-wrap:hover .chip-actions,
      .chip-wrap:focus-within .chip-actions {
        opacity: 1;
      }
      .icon {
        border: none;
        background: transparent;
        color: inherit;
        padding: 0;
        cursor: pointer;
        opacity: 0.7;
        line-height: 0;
      }
      .icon:hover {
        opacity: 1;
        color: var(--primary-color);
      }
      .icon.danger:hover {
        color: var(--error-color, #e74c3c);
      }
      .icon ha-icon {
        --mdc-icon-size: 14px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [COLOR_SWATCH_BAR_TAG]: WledColorSwatchBar;
  }
}

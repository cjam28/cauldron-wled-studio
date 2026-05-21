import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { thumbUrlForFx } from "../api/thumbnails.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import {
  EFFECT_CATEGORY_LABELS,
  matchesEffectCategory,
  solidEffectId,
  type EffectCategory,
} from "../utils/effect-categories.js";
import "./effect-tile.js";

export const EFFECT_CHIPS_TAG = "wled-effect-chips";

@safeCustomElement(EFFECT_CHIPS_TAG)
export class WledEffectChips extends BasePoweredElement {
  @property({ type: Object }) effectsByName: Record<string, number> = {};
  @property({ type: Array }) soundFlags: Array<string | null> = [];
  @property({ type: Number }) selectedFx = 0;
  @property({ type: String }) filter = "";
  @property() controllerId = "";
  @property({ type: Boolean }) toggleOff = true;

  @state() private _category: EffectCategory = "all";

  protected override render() {
    const q = this.filter.trim().toLowerCase();
    const names = Object.keys(this.effectsByName).sort((a, b) =>
      a.localeCompare(b)
    );
    const solidId = solidEffectId(this.effectsByName);
    const visible = names.filter((name) => {
      const id = this.effectsByName[name];
      if (!matchesEffectCategory(name, id, this._category, this.soundFlags, this.effectsByName)) {
        return false;
      }
      if (q && !name.toLowerCase().includes(q)) return false;
      return true;
    });

    const categories: EffectCategory[] = [
      "all",
      "1d",
      "2d",
      "sound",
      "palette",
      "solid",
    ];

    return html`
      <div class="wrap">
        <div class="filters" role="tablist" aria-label="Effect categories">
          ${categories.map(
            (cat) => html`
              <button
                type="button"
                class="cat ${this._category === cat ? "active" : ""}"
                role="tab"
                aria-selected=${this._category === cat}
                @click=${() => {
                  this._category = cat;
                }}
              >
                ${EFFECT_CATEGORY_LABELS[cat]}
              </button>
            `
          )}
        </div>
        <div class="grid" role="listbox" aria-label="Effects">
          ${visible.length === 0
            ? html`<p class="empty">No effects match this filter.</p>`
            : visible.map((name) => {
                const id = this.effectsByName[name];
                const flag = this.soundFlags[id];
                const active = id === this.selectedFx;
                const thumbUrl = thumbUrlForFx(this.controllerId, id);
                const tileLabel =
                  name +
                  (flag === "v" ? " ♪" : "") +
                  (flag === "f" ? " ♫" : "") +
                  (flag === "2" ? " 2D" : "");
                if (thumbUrl) {
                  return html`
                    <wled-effect-tile
                      class="chip-tile ${active ? "active" : ""}"
                      role="option"
                      aria-selected=${active}
                      .fxId=${id}
                      .thumbUrl=${thumbUrl}
                      .label=${tileLabel}
                      @click=${() => this._pick(id, solidId)}
                    ></wled-effect-tile>
                  `;
                }
                return html`
                  <button
                    type="button"
                    class="chip ${active ? "active" : ""}"
                    role="option"
                    aria-selected=${active}
                    @click=${() => this._pick(id, solidId)}
                  >
                    ${name}
                    ${flag === "v"
                      ? html`<span class="badge" title="Volume reactive">♪</span>`
                      : null}
                    ${flag === "f"
                      ? html`<span class="badge" title="Frequency reactive">♫</span>`
                      : null}
                    ${flag === "2"
                      ? html`<span class="badge dim" title="2D matrix">2D</span>`
                      : null}
                  </button>
                `;
              })}
        </div>
        <p class="count">${visible.length} effects</p>
      </div>
    `;
  }

  private _pick(id: number, solidId: number): void {
    if (this.toggleOff && id === this.selectedFx) {
      this.dispatchEvent(
        new CustomEvent("effect-select", {
          detail: { effectId: solidId, toggledOff: true },
          bubbles: true,
          composed: true,
        })
      );
      return;
    }
    this.dispatchEvent(
      new CustomEvent("effect-select", {
        detail: { effectId: id, toggledOff: false },
        bubbles: true,
        composed: true,
      })
    );
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .wrap {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .filters {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .cat {
        border: 1px solid var(--divider-color, #555);
        border-radius: 999px;
        padding: 4px 10px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.75rem;
      }
      .cat.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: transparent;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(108px, 1fr));
        gap: 8px;
        max-height: min(280px, 42vh);
        min-height: 132px;
        overflow-y: auto;
        padding: 4px 2px;
        scrollbar-width: thin;
        align-content: start;
      }
      .chip {
        border: 1px solid var(--divider-color, #555);
        border-radius: 10px;
        padding: 8px 10px;
        background: var(--card-background-color, transparent);
        color: inherit;
        cursor: pointer;
        font-size: 0.78rem;
        text-align: left;
        min-height: 2.5rem;
      }
      .chip.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: transparent;
      }
      .badge {
        margin-left: 4px;
        font-size: 0.7rem;
      }
      .badge.dim {
        opacity: 0.7;
      }
      .chip-tile {
        min-height: 2.5rem;
      }
      .chip-tile.active .tile {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
      .empty {
        grid-column: 1 / -1;
        margin: 0;
        opacity: 0.7;
        font-size: 0.85rem;
      }
      .count {
        margin: 0;
        font-size: 0.72rem;
        opacity: 0.55;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [EFFECT_CHIPS_TAG]: WledEffectChips;
  }
}

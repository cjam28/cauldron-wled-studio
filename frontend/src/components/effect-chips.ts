import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { thumbUrlForFx } from "../api/thumbnails.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import "./effect-tile.js";

export const EFFECT_CHIPS_TAG = "wled-effect-chips";

@safeCustomElement(EFFECT_CHIPS_TAG)
export class WledEffectChips extends BasePoweredElement {
  @property({ type: Object }) effectsByName: Record<string, number> = {};
  @property({ type: Array }) soundFlags: Array<string | null> = [];
  @property({ type: Number }) selectedFx = 0;
  @property({ type: String }) filter = "";
  @property() controllerId = "";

  protected override render() {
    const q = this.filter.trim().toLowerCase();
    const names = Object.keys(this.effectsByName).sort((a, b) =>
      a.localeCompare(b)
    );
    const visible = q
      ? names.filter((n) => n.toLowerCase().includes(q))
      : names.slice(0, 48);

    return html`
      <div class="strip" role="listbox" aria-label="Effects">
        ${visible.map((name) => {
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
                @click=${() => this._pick(id)}
              ></wled-effect-tile>
            `;
          }
          return html`
            <button
              class="chip ${active ? "active" : ""}"
              role="option"
              aria-selected=${active}
              @click=${() => this._pick(id)}
            >
              ${name}
              ${flag === "v"
                ? html`<span class="badge" title="Volume reactive">♪</span>`
                : null}
              ${flag === "f"
                ? html`<span class="badge" title="Frequency reactive">♫</span>`
                : null}
              ${flag === "2"
                ? html`<span class="badge dim" title="2D only">2D</span>`
                : null}
            </button>
          `;
        })}
      </div>
    `;
  }

  private _pick(id: number): void {
    this.dispatchEvent(
      new CustomEvent("effect-select", {
        detail: { effectId: id },
        bubbles: true,
        composed: true,
      })
    );
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .strip {
        display: flex;
        gap: 6px;
        overflow-x: auto;
        padding: 4px 0;
        scrollbar-width: thin;
      }
      .chip {
        flex: 0 0 auto;
        border: 1px solid var(--divider-color, #555);
        border-radius: 999px;
        padding: 6px 12px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.8rem;
        white-space: nowrap;
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
        flex: 0 0 auto;
      }
      .chip-tile.active .tile {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [EFFECT_CHIPS_TAG]: WledEffectChips;
  }
}

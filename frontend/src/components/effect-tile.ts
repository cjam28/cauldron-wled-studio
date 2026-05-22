import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";

export const EFFECT_TILE_TAG = "wled-effect-tile";

@safeCustomElement(EFFECT_TILE_TAG)
export class WledEffectTile extends BasePoweredElement {
  @property({ type: Number }) fxId = 0;
  @property() thumbUrl = "";
  @property() thumbUrlAnimated = "";
  @property() label = "";
  /** When true, tile button participates in a parent listbox. */
  @property({ type: Boolean, attribute: "listbox-option" }) listboxOption = false;
  @property({ type: Boolean }) selected = false;

  @state() private _hover = false;

  protected override render() {
    const animated =
      this.thumbUrlAnimated ||
      (this.thumbUrl.endsWith(".webp") ? this.thumbUrl : "");
    const restSrc = this.thumbUrl || animated;
    const src =
      this._hover && animated ? animated : restSrc;
    const optionLabel = this.label || `Effect ${this.fxId}`;

    return html`
      <button
        class="tile"
        type="button"
        aria-label=${optionLabel}
        role=${this.listboxOption ? "option" : undefined}
        aria-selected=${this.listboxOption ? (this.selected ? "true" : "false") : undefined}
        @mouseenter=${() => {
          this._hover = true;
        }}
        @mouseleave=${() => {
          this._hover = false;
        }}
        @focus=${() => {
          this._hover = true;
        }}
        @blur=${() => {
          this._hover = false;
        }}
      >
        ${src
          ? html`<img
              class="thumb"
              src=${src}
              alt=""
              loading="lazy"
              decoding="async"
              @error=${(e: Event) => {
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
              }}
            />`
          : html`<span class="placeholder" aria-hidden="true"></span>`}
        <span class="label">${this.label}</span>
      </button>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .tile {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 4px;
        padding: 4px;
        border: 1px solid var(--wled-border);
        border-radius: var(--wled-radius-sm);
        background: transparent;
        color: inherit;
        cursor: pointer;
        min-width: 72px;
        max-width: 96px;
        transition:
          border-color var(--wled-transition-fast),
          transform var(--wled-transition-fast);
      }
      .thumb,
      .placeholder {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: 4px;
        background: var(--wled-surface-elevated);
      }
      .placeholder {
        display: block;
      }
      .label {
        font-size: 0.7rem;
        line-height: 1.2;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [EFFECT_TILE_TAG]: WledEffectTile;
  }
}

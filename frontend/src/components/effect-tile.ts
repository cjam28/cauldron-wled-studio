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

  @state() private _hover = false;

  protected override render() {
    const animated =
      this.thumbUrlAnimated ||
      (this.thumbUrl.endsWith(".webp") ? this.thumbUrl : "");
    const restSrc = this.thumbUrl || animated;
    const src =
      this._hover && animated ? animated : restSrc;

    return html`
      <button
        class="tile"
        type="button"
        aria-label=${this.label || `Effect ${this.fxId}`}
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
        border: 1px solid var(--divider-color, #555);
        border-radius: 8px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        min-width: 72px;
        max-width: 96px;
      }
      .thumb,
      .placeholder {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: 4px;
        background: var(--secondary-background-color, #333);
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

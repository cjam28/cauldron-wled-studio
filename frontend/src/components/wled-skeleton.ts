import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";

export const WLED_SKELETON_TAG = "wled-skeleton";

/** Shimmer placeholder block for loading regions. */
@safeCustomElement(WLED_SKELETON_TAG)
export class WledSkeleton extends BasePoweredElement {
  @property() width = "100%";
  @property() height = "1rem";
  @property({ type: Boolean, attribute: "rounded-full" }) roundedFull = false;

  protected override render() {
    return html`
      <div
        class="block ${this.roundedFull ? "pill" : ""}"
        style="width:${this.width};height:${this.height}"
        aria-hidden="true"
      ></div>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      :host {
        display: block;
      }
      .block {
        border-radius: var(--wled-radius-sm);
        background: linear-gradient(
          90deg,
          var(--wled-surface) 0%,
          var(--wled-surface-elevated) 45%,
          var(--wled-surface) 90%
        );
        background-size: 200% 100%;
        animation: wled-shimmer 1.2s ease-in-out infinite;
      }
      .block.pill {
        border-radius: 999px;
      }
      @keyframes wled-shimmer {
        0% {
          background-position: 100% 0;
        }
        100% {
          background-position: -100% 0;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .block {
          animation: none;
          background: var(--wled-surface-elevated);
        }
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [WLED_SKELETON_TAG]: WledSkeleton;
  }
}

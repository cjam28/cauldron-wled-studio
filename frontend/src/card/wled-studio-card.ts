/**
 * card/wled-studio-card.ts — `<wled-studio-card>`.
 *
 * Phase 4: the card is now a THIN WRAPPER around `<wled-studio-shell>`
 * (surface="card"). All studio chrome — header, geometry preview, adaptive
 * navigation, the active view body and the brightness slider — lives in the
 * shell (core/studio-shell.ts). The card's job is the Lovelace contract
 * (setConfig / getCardSize / getConfigElement / getStubConfig / getGridOptions)
 * and mapping its YAML config onto the shell's props.
 *
 * Config mapping (see the frozen shell contract):
 *   controller          -> shell.controller
 *   layout_id           -> shell.layoutId
 *   height              -> shell.previewHeight   (PREVIEW height ONLY now —
 *                          the body grows independently; no card-height cap)
 *   density             -> shell.density         (default "auto")
 *   default_view        -> shell.defaultView     (default "home" / first visible)
 *   views               -> shell.visibleViews    (explicit subset/order)
 *
 * Deprecated aliases (kept working): show_scenes / show_paint / show_segments /
 * show_effects. When `views` is absent they are synthesized into `visibleViews`
 * preserving the EXACT pre-Phase-4 `_visibleModeTabs` semantics, so existing
 * cauldron-v2 / md3 cards render the same tabs they always did.
 *
 * Design rules honored: never declares `--md-sys-color-*` on the host (the shell
 * inherits the dashboard's Material You scheme); accent-from-LED stays scoped to
 * `--wled-led-accent` inside the shell; container-relative body cap (no viewport
 * height units); extends BasePoweredElement; registered via safeCustomElement.
 */

import { css, html, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import type { LovelaceCard } from "custom-card-helpers";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { isWledStudioStale } from "../utils/build-stamp.js";
import { DEFAULT_NAV, type ViewId } from "../core/nav-manifest.js";
import "../core/studio-shell.js";
import "../components/wled-toast-host.js";

export const CARD_TAG = "wled-studio-card";

/**
 * Card configuration. `views` / `density` / `default_view` are the Phase-4
 * shell-aligned knobs; `show_*` are DEPRECATED aliases retained for backward
 * compatibility and synthesized into `views` in setConfig.
 */
export interface WledStudioCardConfig {
  type: string;
  controller?: string;
  /** Saved layout id; defaults to first layout for the controller. */
  layout_id?: string;
  /**
   * PREVIEW area min height (px). Phase 4: this is the geometry-preview height
   * ONLY — it no longer caps the card/body height.
   */
  height?: number;
  /** Explicit subset/order of views to show (maps to shell.visibleViews). */
  views?: ViewId[];
  /** Layout density: "auto" lets the container query decide (default). */
  density?: "compact" | "full" | "auto";
  /** Initial active view (maps to shell.defaultView). */
  default_view?: ViewId;

  /** @deprecated alias — synthesized into `views`. */
  show_scenes?: boolean;
  /** @deprecated alias — synthesized into `views`. */
  show_paint?: boolean;
  /** @deprecated alias — synthesized into `views`. */
  show_segments?: boolean;
  /** @deprecated alias — synthesized into `views`. */
  show_effects?: boolean;
}

/**
 * The card surface's classic tab order. Preserves the EXACT pre-Phase-4
 * MODE_TABS order so deprecated-alias synthesis reproduces today's behavior.
 */
const CARD_DEFAULT_VIEW_ORDER: readonly ViewId[] = [
  "color",
  "effects",
  "scenes",
  "segments",
  "paint",
] as const;

export class WledStudioCard extends BasePoweredElement implements LovelaceCard {
  @property({ attribute: false }) public config?: WledStudioCardConfig;

  public setConfig(config: WledStudioCardConfig): void {
    if (!config.type?.startsWith("custom:")) {
      throw new Error("Invalid card type");
    }
    this.config = config;
  }

  public getCardSize(): number {
    return 8;
  }

  /**
   * Sections-view grid hint. The card behaves as a full app surface, so it
   * prefers the full 12-column span but tolerates a 6-column minimum.
   */
  public getGridOptions(): { columns: number; min_columns: number } {
    return { columns: 12, min_columns: 6 };
  }

  public static getConfigElement(): HTMLElement {
    const el = document.createElement(
      "wled-studio-card-editor"
    ) as import("./wled-studio-card-editor.js").WledStudioCardEditor;
    el.setConfig(WledStudioCard.getStubConfig());
    return el;
  }

  public static getStubConfig(): WledStudioCardConfig {
    return {
      type: `custom:${CARD_TAG}`,
      controller: "Cloud",
      height: 200,
      show_segments: false,
    };
  }

  /**
   * Resolve the views to show, mapped to the shell's `visibleViews`.
   *
   * If `config.views` is provided it wins verbatim (subset + order). Otherwise
   * the deprecated `show_*` aliases are synthesized, preserving the EXACT
   * pre-Phase-4 `_visibleModeTabs` semantics:
   *   - start from [color, effects, scenes, segments, paint]
   *   - drop "scenes" when show_scenes === false
   *   - drop "paint"  when show_paint  === false
   *   - drop "effects" when show_effects === false
   *   - drop "segments" UNLESS show_segments === true
   *   - "color" is always present
   */
  private _resolveVisibleViews(): ViewId[] | undefined {
    const config = this.config;
    if (!config) return undefined;
    if (config.views && config.views.length) {
      return [...config.views];
    }
    return CARD_DEFAULT_VIEW_ORDER.filter((id) => {
      if (id === "scenes" && config.show_scenes === false) return false;
      if (id === "paint" && config.show_paint === false) return false;
      if (id === "effects" && config.show_effects === false) return false;
      if (id === "segments" && config.show_segments !== true) return false;
      return true;
    });
  }

  /**
   * Default active view: explicit config, else "home". The shell's
   * StudioNavController normalizes "home" to the first visible view when "home"
   * is not part of the visible set, so passing "home" is always safe.
   */
  private _resolveDefaultView(): ViewId {
    return this.config?.default_view ?? DEFAULT_NAV[0].id;
  }

  protected override render(): TemplateResult {
    const config = this.config;
    const previewHeight = config?.height ?? 200;
    const density = config?.density ?? "auto";
    const visibleViews = this._resolveVisibleViews();
    const defaultView = this._resolveDefaultView();

    return html`
      <div class="card-root">
        ${isWledStudioStale()
          ? html`
              <ha-alert alert-type="warning" class="stale-banner">
                WLED Studio updated — refresh this page to apply changes.
              </ha-alert>
            `
          : null}
        <wled-studio-shell
          class="shell"
          surface="card"
          .hass=${this.hass}
          .controller=${config?.controller}
          .layoutId=${config?.layout_id}
          .previewHeight=${previewHeight}
          .density=${density}
          .defaultView=${defaultView}
          .visibleViews=${visibleViews}
        ></wled-studio-shell>
        <wled-toast-host></wled-toast-host>
      </div>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      :host {
        display: block;
      }
      .card-root {
        /* The card is a thin wrapper; it establishes a query container so the
           shell's density container-query resolves against the card's box, and
           caps the body relative to that container (NO viewport-height unit). */
        display: block;
        container-type: inline-size;
        container-name: wled-studio;
      }
      .stale-banner {
        display: block;
        margin-bottom: 10px;
      }
      .shell {
        display: block;
        /* Container-relative cap: the body inside the shell grows but the whole
           card stays bounded to the available container height when one exists,
           replacing the former viewport-relative body max-height cap. */
        max-height: 100cqh;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TAG]: WledStudioCard;
  }
}

export function getStubConfig(): WledStudioCardConfig {
  return { type: `custom:${CARD_TAG}`, controller: "", height: 200, show_segments: false };
}

/**
 * Standalone, themed painter card — hosts the regression-free `wled-view-paint`
 * surface in its own bundle so it can live in a Bubble Card pop-up without the
 * monolithic studio tab shell. Resolves the WLED Studio controller the same way
 * the card does (listControllers + match config.controller), then hands the
 * resolved entry_id to the paint view.
 */
import { css, html, LitElement, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import { wledDesignTokens } from "../styles/tokens.js";
import { listControllers } from "../api/live-stream.js";
import "../panel/view-paint.js";

export const PAINTER_TAG = "wled-painter-card";

export interface WledPainterCardConfig {
  type: string;
  /** WLED Studio controller key — entry_id or (substring of) its title. */
  controller?: string;
}

export class WledPainterCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: WledPainterCardConfig;
  @state() private _controllerId = "";
  @state() private _hint = "Connecting to WLED Studio…";
  private _resolving = false;
  private _resolvedKey?: string;

  public setConfig(config: WledPainterCardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = config;
    this._resolvedKey = undefined;
  }

  public getCardSize(): number {
    return 10;
  }

  public static getStubConfig(): WledPainterCardConfig {
    return { type: `custom:${PAINTER_TAG}`, controller: "Cloud" };
  }

  protected override updated(changed: PropertyValues): void {
    if (
      (changed.has("hass") || changed.has("_config")) &&
      this.hass?.connection
    ) {
      void this._resolve();
    }
  }

  private _pick(
    controllers: Array<Record<string, unknown>>
  ): Record<string, unknown> | undefined {
    const key = (this._config?.controller ?? "").trim();
    if (!key) return controllers[0];
    const lower = key.toLowerCase();
    return (
      controllers.find((c) => {
        const title = String(c.title ?? "");
        const entryId = String(c.entry_id ?? "");
        return (
          entryId === key ||
          title === key ||
          title.toLowerCase().includes(lower) ||
          title.toLowerCase().endsWith(`— ${lower}`) ||
          title.toLowerCase().endsWith(`- ${lower}`)
        );
      }) ?? controllers[0]
    );
  }

  private async _resolve(): Promise<void> {
    const key = (this._config?.controller ?? "").trim();
    if (this._resolving) return;
    if (this._controllerId && this._resolvedKey === key) return;
    const conn = this.hass?.connection;
    if (!conn) return;
    this._resolving = true;
    const delays = [0, 400, 1200, 2500];
    for (const delay of delays) {
      if (delay > 0) await new Promise((r) => setTimeout(r, delay));
      if (!this.hass?.connection) break;
      try {
        const controllers = (await listControllers(
          this.hass.connection
        )) as unknown as Array<Record<string, unknown>>;
        const pick = this._pick(controllers);
        if (pick?.entry_id) {
          this._controllerId = String(pick.entry_id);
          this._resolvedKey = key;
          this._hint = "";
          this._resolving = false;
          this.requestUpdate();
          return;
        }
        this._hint = controllers.length
          ? "WLED Studio controller not found."
          : "No WLED Studio controllers found. Add the integration under Settings → Devices & services.";
      } catch {
        this._hint = "Connecting to WLED Studio…";
      }
      this.requestUpdate();
    }
    this._resolving = false;
  }

  protected override render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._controllerId) {
      return html`<ha-card class="wled-painter-card"
        ><div class="hint">${this._hint}</div></ha-card
      >`;
    }
    return html`
      <ha-card class="wled-painter-card">
        <wled-view-paint
          .connection=${this.hass.connection}
          .hass=${this.hass}
          .controllerId=${this._controllerId}
        ></wled-view-paint>
      </ha-card>
    `;
  }

  static override styles = [
    wledDesignTokens,
    css`
      :host {
        display: block;
      }
      ha-card.wled-painter-card {
        background: transparent;
        border: none;
        box-shadow: none;
        padding: 4px 2px;
      }
      .hint {
        padding: 18px 14px;
        font-size: 0.9rem;
        opacity: 0.82;
      }
      wled-view-paint {
        display: block;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [PAINTER_TAG]: WledPainterCard;
  }
}

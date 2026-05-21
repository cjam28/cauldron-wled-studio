import { css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { LovelaceCard } from "custom-card-helpers";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";

export const CARD_TAG = "wled-studio-card";

export interface WledStudioCardConfig {
  type: string;
  controller?: string;
  height?: number;
  show_scenes?: boolean;
}

@customElement(CARD_TAG)
export class WledStudioCard extends BasePoweredElement implements LovelaceCard {
  @property({ attribute: false }) public config?: WledStudioCardConfig;

  @state() private _pingOk = false;

  public setConfig(config: WledStudioCardConfig): void {
    if (!config.type?.startsWith("custom:")) {
      throw new Error("Invalid card type");
    }
    this.config = config;
  }

  public getCardSize(): number {
    return 4;
  }

  protected override onPoweredConnect(): void {
    void this._ping();
  }

  private async _ping(): Promise<void> {
    if (!this.hass?.connection) return;
    try {
      await this.hass.connection.sendMessagePromise({
        type: "wled_studio/ping",
        schema_version: 1,
      });
      this._pingOk = true;
    } catch {
      this._pingOk = false;
    }
    this.requestUpdate();
  }

  protected override render() {
    const title = this.config?.controller ?? "WLED Studio";
    const remote = this.remote.state;

    return html`
      <div class="card" role="region" aria-label="WLED Studio card">
        <header class="header">
          <ha-icon icon="mdi:led-strip-variant"></ha-icon>
          <span class="title">${title}</span>
          ${remote.isRemote
            ? html`<span class="badge" aria-label="Remote mode">Remote</span>`
            : null}
        </header>
        <p class="placeholder">
          ${this._pingOk
            ? "Integration connected. Live preview arrives in Phase 1."
            : "Add WLED Studio integration and attach to a WLED device."}
        </p>
        <button
          class="studio-link"
          @click=${this._openStudio}
          aria-label="Open WLED Studio panel"
        >
          Open Studio
        </button>
      </div>
    `;
  }

  private _openStudio(): void {
    history.pushState(null, "", "/wled-studio");
    window.dispatchEvent(new CustomEvent("location-changed"));
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
        .card {
          padding: 12px 16px;
          background: var(--card-background-color, var(--ha-card-background));
          border-radius: var(--ha-card-border-radius, 12px);
          box-shadow: var(--ha-card-box-shadow, none);
        }
        .header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .title {
          font-weight: 600;
          flex: 1;
        }
        .badge {
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 999px;
          background: var(--warning-color, orange);
          color: var(--text-primary-color);
        }
        .placeholder {
          opacity: 0.8;
          margin: 0 0 12px;
          font-size: 0.875rem;
        }
        .studio-link {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 8px;
          background: var(--primary-color);
          color: var(--text-primary-color, #fff);
          cursor: pointer;
          transition: opacity var(--m-tap) ease;
        }
        .studio-link:focus-visible {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
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
  return { type: `custom:${CARD_TAG}`, controller: "", height: 56 };
}

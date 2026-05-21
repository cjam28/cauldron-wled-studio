import { css, html, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type { LovelaceCard } from "custom-card-helpers";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { listControllers, subscribeLive } from "../api/live-stream.js";
import type { WledStripPreview } from "../components/strip-preview.js";
import "../components/strip-preview.js";

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

  @state() private _controllerId = "";
  @state() private _masterEntity = "";
  @state() private _pixelCount = 210;
  @state() private _connected = false;
  @state() private _previewStatus = "connecting";

  @query("wled-strip-preview") private _preview?: WledStripPreview;

  private _unsubLive?: () => void;

  public setConfig(config: WledStudioCardConfig): void {
    if (!config.type?.startsWith("custom:")) {
      throw new Error("Invalid card type");
    }
    this.config = config;
  }

  public getCardSize(): number {
    return 5;
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has("hass") && this.hass) {
      void this._bootstrap();
    }
  }

  protected override onPoweredConnect(): void {
    void this._bootstrap();
  }

  protected override onPoweredDisconnect(): void {
    this._unsubLive?.();
    this._unsubLive = undefined;
  }

  private async _bootstrap(): Promise<void> {
    if (!this.hass?.connection || !this.isConnected) return;
    try {
      const controllers = await listControllers(this.hass.connection);
      const pick =
        controllers.find(
          (c) =>
            c.title === this.config?.controller ||
            c.entry_id === this.config?.controller
        ) ?? controllers[0];
      if (!pick?.entry_id) {
        this._previewStatus = "no controller";
        return;
      }
      this._controllerId = String(pick.entry_id);
      this._masterEntity = String(pick.master_entity_id ?? "");
      this._pixelCount = Number(pick.pixel_count) || 210;
      this._connected = true;
      this._startLive();
    } catch {
      this._connected = false;
      this._previewStatus = "offline";
    }
    this.requestUpdate();
  }

  private _startLive(): void {
    if (!this.hass?.connection || !this._controllerId) return;
    this._unsubLive?.();
    this._previewStatus = "connecting";
    this._preview?.setStatus(this._previewStatus);
    this._unsubLive = subscribeLive(
      this.hass.connection,
      this._controllerId,
      (frame) => {
        this._previewStatus = "live";
        this._preview?.setFrame(frame);
      },
      { remote: this.remote.state.isRemote }
    );
    this.addUnsub(() => this._unsubLive?.());
  }

  private _togglePower(): void {
    if (!this.hass || !this._masterEntity) return;
    this.hass.callService("light", "toggle", { entity_id: this._masterEntity });
  }

  private _setBrightness(ev: Event): void {
    if (!this.hass || !this._masterEntity) return;
    const value = Number((ev.target as HTMLInputElement).value);
    this.hass.callService("light", "turn_on", {
      entity_id: this._masterEntity,
      brightness_pct: value,
    });
  }

  protected override render() {
    const height = this.config?.height ?? 56;
    const remote = this.remote.state;

    return html`
      <div class="card" role="region" aria-label="WLED Studio card">
        <header class="header">
          <ha-icon icon="mdi:led-strip-variant"></ha-icon>
          <span class="title">${this.config?.controller ?? "WLED Studio"}</span>
          ${remote.isRemote
            ? html`<span class="badge">Remote</span>`
            : null}
          <button
            class="icon-btn"
            @click=${this._togglePower}
            ?disabled=${!this._masterEntity}
            aria-label="Toggle power"
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </header>

        <wled-strip-preview
          .heightPx=${height}
          .pixelCount=${this._pixelCount}
          .hass=${this.hass}
        ></wled-strip-preview>

        <div class="controls">
          <label class="sr-only" for="brightness">Brightness</label>
          <ha-slider
            id="brightness"
            min="0"
            max="100"
            step="1"
            ?disabled=${!this._masterEntity}
            @change=${this._setBrightness}
          ></ha-slider>
        </div>

        <button
          class="studio-link"
          @click=${this._openStudio}
          aria-label="Open WLED Studio panel"
        >
          Open Studio
        </button>
        ${!this._connected
          ? html`<p class="hint">Attach WLED Studio to a WLED device in Settings.</p>`
          : null}
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
      }
      .icon-btn {
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 4px;
      }
      .controls {
        margin: 10px 0;
      }
      .studio-link {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
      }
      .hint {
        font-size: 0.8rem;
        opacity: 0.75;
        margin: 8px 0 0;
      }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
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

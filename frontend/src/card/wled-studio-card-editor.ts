import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import type { HomeAssistant } from "custom-card-helpers";
import {
  CARD_TAG,
  getStubConfig,
  type WledStudioCardConfig,
} from "./wled-studio-card.js";

export const CARD_EDITOR_TAG = "wled-studio-card-editor";

@safeCustomElement(CARD_EDITOR_TAG)
export class WledStudioCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config: WledStudioCardConfig = getStubConfig();

  public setConfig(config: WledStudioCardConfig): void {
    this._config = {
      ...getStubConfig(),
      ...config,
      type: config.type ?? `custom:${CARD_TAG}`,
    };
  }

  protected override render() {
    const config = this._config;
    return html`
      <div class="editor">
        <p>WLED Studio card — pick the controller name (e.g. Cloud).</p>
        <ha-textfield
          .label=${"Controller"}
          .value=${config.controller ?? ""}
          @value-changed=${this._onController}
        ></ha-textfield>
        <ha-textfield
          .label=${"Preview height (px)"}
          .value=${String(config.height ?? 200)}
          @value-changed=${this._onHeight}
        ></ha-textfield>
        <ha-textfield
          .label=${"Layout id (optional)"}
          .value=${config.layout_id ?? ""}
          @value-changed=${this._onLayoutId}
        ></ha-textfield>
        <ha-switch
          .checked=${config.show_scenes !== false}
          @change=${this._onShowScenes}
        ></ha-switch>
        <span>Show Scenes tab</span>
      </div>
    `;
  }

  private _onController(ev: CustomEvent<{ value: string }>): void {
    this._fire({ ...this._config, controller: ev.detail.value });
  }

  private _onHeight(ev: CustomEvent<{ value: string }>): void {
    const height = Number(ev.detail.value);
    this._fire({
      ...this._config,
      height: Number.isFinite(height) ? height : 200,
    });
  }

  private _onLayoutId(ev: CustomEvent<{ value: string }>): void {
    const layoutId = ev.detail.value.trim();
    const next = { ...this._config };
    if (layoutId) {
      next.layout_id = layoutId;
    } else {
      delete next.layout_id;
    }
    this._fire(next);
  }

  private _onShowScenes(ev: Event): void {
    const checked = (ev.target as HTMLInputElement).checked;
    const next = { ...this._config, show_scenes: checked };
    this._fire(next);
  }

  private _fire(config: WledStudioCardConfig): void {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  static override styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_EDITOR_TAG]: WledStudioCardEditor;
  }
}

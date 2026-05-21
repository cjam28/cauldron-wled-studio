import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import type { HomeAssistant } from "custom-card-helpers";
import { CARD_TAG, type WledStudioCardConfig } from "./wled-studio-card.js";

const defaultConfig = (): WledStudioCardConfig => ({
  type: `custom:${CARD_TAG}`,
  controller: "Cloud",
  height: 200,
});

@safeCustomElement("wled-studio-card-editor")
export class WledStudioCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config: WledStudioCardConfig = defaultConfig();

  setConfig(config: WledStudioCardConfig): void {
    this._config = {
      ...defaultConfig(),
      ...config,
      type: config.type ?? `custom:${CARD_TAG}`,
    };
  }

  protected override render() {
    const cfg = this._config ?? defaultConfig();
    return html`
      <div class="editor">
        <p>WLED Studio card — pick the controller name (e.g. Cloud).</p>
        <ha-textfield
          .label=${"Controller"}
          .value=${cfg.controller ?? ""}
          @value-changed=${this._onController}
        ></ha-textfield>
        <ha-textfield
          .label=${"Preview height (px)"}
          .value=${String(cfg.height ?? 200)}
          @value-changed=${this._onHeight}
        ></ha-textfield>
        <ha-textfield
          .label=${"Layout id (optional)"}
          .value=${cfg.layout_id ?? ""}
          @value-changed=${this._onLayoutId}
        ></ha-textfield>
      </div>
    `;
  }

  private _onController(ev: CustomEvent): void {
    const value = (ev.detail as { value: string }).value;
    this._fire({ ...(this._config ?? defaultConfig()), controller: value });
  }

  private _onHeight(ev: CustomEvent): void {
    const value = Number((ev.detail as { value: string }).value);
    this._fire({
      ...(this._config ?? defaultConfig()),
      height: Number.isFinite(value) ? value : 200,
    });
  }

  private _onLayoutId(ev: CustomEvent): void {
    const value = (ev.detail as { value: string }).value.trim();
    const next = { ...(this._config ?? defaultConfig()) };
    if (value) next.layout_id = value;
    else delete next.layout_id;
    this._fire(next);
  }

  private _fire(config: WledStudioCardConfig): void {
    const event = new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

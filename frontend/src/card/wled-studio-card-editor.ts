import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import type { WledStudioCardConfig } from "./wled-studio-card.js";

@customElement("wled-studio-card-editor")
export class WledStudioCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config!: WledStudioCardConfig;

  setConfig(config: WledStudioCardConfig): void {
    this._config = { ...config };
  }

  protected override render() {
    return html`
      <div class="editor">
        <p>Configure WLED Studio card (Phase 0 scaffold).</p>
        <ha-textfield
          .label=${"Controller entity (optional)"}
          .value=${this._config.controller ?? ""}
          @value-changed=${this._onController}
        ></ha-textfield>
      </div>
    `;
  }

  private _onController(ev: CustomEvent): void {
    const value = (ev.detail as { value: string }).value;
    this._fire({ ...this._config, controller: value });
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

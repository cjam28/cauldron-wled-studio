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

type TabToggleKey = "show_scenes" | "show_paint" | "show_segments" | "show_effects";

const TAB_TOGGLES: Array<{ key: TabToggleKey; label: string }> = [
  { key: "show_effects", label: "Show Effects tab" },
  { key: "show_scenes", label: "Show Scenes tab" },
  { key: "show_segments", label: "Show Segments tab (legacy)" },
  { key: "show_paint", label: "Show Paint tab" },
];

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
        <fieldset class="tabs">
          <legend>Visible tabs</legend>
          ${TAB_TOGGLES.map(
            ({ key, label }) => html`
              <label class="toggle">
                <input
                  type="checkbox"
                  .checked=${key === "show_segments"
                    ? config[key] === true
                    : config[key] !== false}
                  @change=${(ev: Event) => this._onTabToggle(key, ev)}
                />
                <span>${label}</span>
              </label>
            `
          )}
        </fieldset>
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

  private _onTabToggle(key: TabToggleKey, ev: Event): void {
    const checked = (ev.target as HTMLInputElement).checked;
    this._fire({ ...this._config, [key]: checked });
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
    .tabs {
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 8px;
      padding: 12px;
      margin: 0;
    }
    .tabs legend {
      padding: 0 4px;
      font-size: 0.9rem;
    }
    .toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .toggle:first-of-type {
      margin-top: 4px;
    }
    .toggle input {
      width: 16px;
      height: 16px;
      margin: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_EDITOR_TAG]: WledStudioCardEditor;
  }
}

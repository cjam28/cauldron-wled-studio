import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import type { HomeAssistant } from "custom-card-helpers";
import { DEFAULT_NAV, type ViewId } from "../core/nav-manifest.js";
import {
  CARD_TAG,
  getStubConfig,
  type WledStudioCardConfig,
} from "./wled-studio-card.js";

export const CARD_EDITOR_TAG = "wled-studio-card-editor";

type TabToggleKey = "show_scenes" | "show_paint" | "show_segments" | "show_effects";

/** Legacy show_* toggles — kept working, labelled as legacy in the editor. */
const TAB_TOGGLES: Array<{ key: TabToggleKey; label: string }> = [
  { key: "show_effects", label: "Show Effects tab (legacy)" },
  { key: "show_scenes", label: "Show Scenes tab (legacy)" },
  { key: "show_segments", label: "Show Segments tab (legacy)" },
  { key: "show_paint", label: "Show Paint tab (legacy)" },
];

const DENSITY_OPTIONS: Array<{ value: "auto" | "compact" | "full"; label: string }> = [
  { value: "auto", label: "Auto (container decides)" },
  { value: "compact", label: "Compact (bottom bar)" },
  { value: "full", label: "Full (left rail)" },
];

/**
 * Views a CARD may surface. These are the `density !== "full"` items in the
 * nav manifest — the light views that stay within the card's bundle budget.
 * The heavy `density === "full"` views (layout/audio/voice/schedules/devices/
 * controller/settings/firmware) are panel-only (Phase 5) and must NOT be
 * configurable on a card, or it would pull heavy panel chunks onto the wall.
 */
const CARD_VIEWS = DEFAULT_NAV.filter((item) => item.density !== "full");
/** Heavy, panel-only views — shown disabled in the editor for transparency. */
const PANEL_ONLY_VIEWS = DEFAULT_NAV.filter((item) => item.density === "full");
/** Fast membership test used to reject panel-only ids defensively. */
const CARD_VIEW_IDS = new Set<ViewId>(CARD_VIEWS.map((item) => item.id));

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
    const views = config.views ?? [];
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

        <label class="field">
          <span class="field-label">Density</span>
          <select class="select" @change=${this._onDensity}>
            ${DENSITY_OPTIONS.map(
              (opt) => html`
                <option
                  value=${opt.value}
                  ?selected=${(config.density ?? "auto") === opt.value}
                >
                  ${opt.label}
                </option>
              `
            )}
          </select>
        </label>

        <label class="field">
          <span class="field-label">Default view</span>
          <select class="select" @change=${this._onDefaultView}>
            <option value="" ?selected=${!config.default_view}>Auto (Home / first)</option>
            ${CARD_VIEWS.map(
              (item) => html`
                <option
                  value=${item.id}
                  ?selected=${config.default_view === item.id}
                >
                  ${item.label}
                </option>
              `
            )}
          </select>
        </label>

        <fieldset class="tabs">
          <legend>Visible views</legend>
          <p class="hint">
            Tick views to show. Leave all unticked to use the default card views
            (with the legacy toggles below).
          </p>
          ${CARD_VIEWS.map(
            (item) => html`
              <label class="toggle">
                <input
                  type="checkbox"
                  .checked=${views.includes(item.id)}
                  @change=${(ev: Event) => this._onViewToggle(item.id, ev)}
                />
                <span>${item.label}</span>
              </label>
            `
          )}
          ${PANEL_ONLY_VIEWS.length
            ? html`
                <p class="hint panel-only-note">
                  Panel-only views (heavy — available in the full WLED Studio
                  panel, not on a card):
                </p>
                ${PANEL_ONLY_VIEWS.map(
                  (item) => html`
                    <label class="toggle disabled" title="Panel-only view — not available on a card">
                      <input type="checkbox" disabled .checked=${false} />
                      <span>${item.label}</span>
                    </label>
                  `
                )}
              `
            : null}
        </fieldset>

        <fieldset class="tabs">
          <legend>Legacy tab toggles</legend>
          <p class="hint">
            Deprecated — ignored when “Visible views” has any selection. Kept for
            backward compatibility with older card configs.
          </p>
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

  private _onDensity(ev: Event): void {
    const value = (ev.target as HTMLSelectElement).value as
      | "auto"
      | "compact"
      | "full";
    const next = { ...this._config };
    if (value === "auto") {
      delete next.density;
    } else {
      next.density = value;
    }
    this._fire(next);
  }

  private _onDefaultView(ev: Event): void {
    const value = (ev.target as HTMLSelectElement).value;
    const next = { ...this._config };
    // Only card-eligible views are offered; guard against a panel-only id
    // arriving via a stale/hand-edited config.
    if (value && CARD_VIEW_IDS.has(value as ViewId)) {
      next.default_view = value as ViewId;
    } else {
      delete next.default_view;
    }
    this._fire(next);
  }

  private _onViewToggle(id: ViewId, ev: Event): void {
    // Defensive: never let a card config surface a heavy panel-only view.
    if (!CARD_VIEW_IDS.has(id)) return;
    const checked = (ev.target as HTMLInputElement).checked;
    const current = this._config.views ?? [];
    let views: ViewId[];
    if (checked) {
      views = current.includes(id) ? current : [...current, id];
    } else {
      views = current.filter((v) => v !== id);
    }
    const next = { ...this._config };
    if (views.length) {
      next.views = views;
    } else {
      delete next.views;
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
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .field-label {
      font-size: 0.9rem;
    }
    .select {
      padding: 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, inherit);
      font: inherit;
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
    .hint {
      font-size: 0.78rem;
      color: var(--secondary-text-color, rgba(0, 0, 0, 0.6));
      margin: 0 0 8px;
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
    .toggle.disabled {
      cursor: not-allowed;
      color: var(--secondary-text-color, rgba(0, 0, 0, 0.6));
    }
    .toggle.disabled input {
      cursor: not-allowed;
    }
    .panel-only-note {
      margin: 12px 0 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_EDITOR_TAG]: WledStudioCardEditor;
  }
}

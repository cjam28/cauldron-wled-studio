import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { resolvePaletteGradientCss } from "../utils/palette-gradients.js";

export const PALETTE_CHIPS_TAG = "wled-palette-chips";

@safeCustomElement(PALETTE_CHIPS_TAG)
export class WledPaletteChips extends BasePoweredElement {
  @property({ type: Object }) palettesByName: Record<string, number> = {};
  @property({ type: Object }) palettePreviews: Record<string, string> = {};
  @property({ type: Number }) selectedPal = 0;
  @property() filter = "";
  @property() deviceHost = "";
  @property({ type: Boolean }) compact = false;
  /** Collapse palette list behind a summary (compact card). */
  @property({ type: Boolean, attribute: "collapsible" }) collapsible = false;

  @state() private _open = true;
  @state() private _localFilter = "";
  @state() private _editorOpen = false;

  protected override willUpdate(changed: import("lit").PropertyValues): void {
    if (changed.has("filter") && this.filter !== this._localFilter) {
      this._localFilter = this.filter;
    }
  }

  private _paletteName(paletteId: number): string {
    return (
      Object.entries(this.palettesByName).find(([, id]) => id === paletteId)?.[0] ??
      `Palette ${paletteId}`
    );
  }

  private _gradient(name: string, paletteId: number): string {
    return resolvePaletteGradientCss(name, paletteId, this.palettePreviews);
  }

  private _editorUrl(): string | null {
    const host = this.deviceHost.trim();
    if (!host) return null;
    const base = host.startsWith("http") ? host.replace(/\/$/, "") : `http://${host}`;
    return `${base}/cpal.htm`;
  }

  private _renderEditorActions(editorUrl: string | null) {
    if (!editorUrl) return null;
    return html`
      <div class="editor-actions">
        <button type="button" class="editor-btn" @click=${() => this._openEditor()}>
          <ha-icon icon="mdi:palette-swatch-outline"></ha-icon>
          Edit palettes
        </button>
        <a class="editor-link" href=${editorUrl} target="_blank" rel="noopener noreferrer">
          Open in new tab
        </a>
      </div>
    `;
  }

  private _openEditor(): void {
    this._editorOpen = true;
  }

  private _closeEditor(): void {
    this._editorOpen = false;
    this.dispatchEvent(
      new CustomEvent("palette-catalog-changed", { bubbles: true, composed: true })
    );
  }

  protected override render() {
    const q = (this._localFilter || this.filter).trim().toLowerCase();
    const names = Object.keys(this.palettesByName).sort((a, b) => a.localeCompare(b));
    const visible = names.filter((name) => !q || name.toLowerCase().includes(q));
    const selectedName = this._paletteName(this.selectedPal);
    const editorUrl = this._editorUrl();

    const list = html`
      <input
        class="search"
        type="search"
        placeholder="Search palettes…"
        aria-label="Filter palettes"
        .value=${this._localFilter}
        @input=${(e: Event) => {
          this._localFilter = (e.target as HTMLInputElement).value;
        }}
      />
      <div class="list" role="listbox" aria-label="Palettes">
        ${visible.length === 0
          ? html`<p class="empty">No palettes match.</p>`
          : visible.map((name) => {
              const id = this.palettesByName[name];
              const active = id === this.selectedPal;
              return html`
                <button
                  type="button"
                  class="row ${active ? "active" : ""}"
                  role="option"
                  aria-selected=${active ? "true" : "false"}
                  aria-label=${name}
                  @click=${() => this._pick(id)}
                >
                  <span
                    class="swatch"
                    style=${`background:${this._gradient(name, id)}`}
                  ></span>
                  <span class="name">${name}</span>
                  ${active ? html`<span class="dot" aria-hidden="true"></span>` : null}
                </button>
              `;
            })}
      </div>
      ${this._renderEditorActions(editorUrl)}
      <p class="count">${visible.length} palette${visible.length === 1 ? "" : "s"}</p>
    `;

    const editorOverlay =
      this._editorOpen && editorUrl
        ? html`
            <div
              class="editor-overlay"
              role="dialog"
              aria-modal="true"
              aria-label="WLED palette editor"
            >
              <div class="editor-panel">
                <header class="editor-header">
                  <span>Palette editor</span>
                  <button
                    type="button"
                    class="icon-btn"
                    aria-label="Close palette editor"
                    @click=${() => this._closeEditor()}
                  >
                    <ha-icon icon="mdi:close"></ha-icon>
                  </button>
                </header>
                <p class="editor-hint">
                  Uses the WLED device UI. Custom palettes save on the controller; close
                  when done to refresh previews.
                </p>
                <iframe
                  class="editor-frame"
                  title="WLED palette editor"
                  src=${editorUrl}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                ></iframe>
              </div>
            </div>
          `
        : null;

    if (this.collapsible) {
      return html`
        <details
          class="wrap collapsible ${this.compact ? "compact" : ""}"
          ?open=${this._open}
          @toggle=${(e: Event) => {
            this._open = (e.target as HTMLDetailsElement).open;
          }}
        >
          <summary class="summary">
            <span class="summary-label">Palette</span>
            <span
              class="summary-preview"
              style=${`background:${this._gradient(selectedName, this.selectedPal)}`}
            ></span>
            <span class="summary-name">${selectedName}</span>
          </summary>
          ${list}
        </details>
        ${editorOverlay}
      `;
    }

    return html`
      <div class="wrap ${this.compact ? "compact" : ""}">
        <div class="head">
          <span class="head-label">Palette</span>
          ${editorUrl
            ? html`
                <button
                  type="button"
                  class="editor-link inline"
                  title="Edit palettes on WLED device"
                  @click=${() => this._openEditor()}
                >
                  <ha-icon icon="mdi:pencil-outline"></ha-icon>
                  Edit
                </button>
              `
            : null}
        </div>
        ${list}
      </div>
      ${editorOverlay}
    `;
  }

  private _pick(id: number): void {
    this.dispatchEvent(
      new CustomEvent("palette-select", {
        detail: { paletteId: id },
        bubbles: true,
        composed: true,
      })
    );
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .wrap {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .head-label,
      .summary-label {
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--wled-text-muted);
      }
      .summary {
        border: 1px solid var(--divider-color);
        border-radius: 10px;
        padding: 8px 10px;
        background: color-mix(in srgb, var(--card-background-color) 80%, transparent);
      }
      .summary::marker,
      .summary::-webkit-details-marker {
        color: var(--wled-text-muted);
      }
      .summary {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        list-style: disclosure-closed;
      }
      details[open] > .summary {
        list-style: disclosure-open;
        margin-bottom: 8px;
      }
      .summary-preview {
        flex: 0 0 48px;
        height: 14px;
        border-radius: 4px;
        border: 1px solid color-mix(in srgb, var(--divider-color) 80%, transparent);
      }
      .summary-name {
        flex: 1 1 auto;
        font-size: 0.82rem;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .search {
        width: 100%;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
        font-size: 0.82rem;
      }
      .list {
        display: flex;
        flex-direction: column;
        gap: 4px;
        max-height: min(200px, 28vh);
        overflow-y: auto;
        scrollbar-width: thin;
      }
      .wrap.compact .list {
        max-height: min(160px, 24vh);
      }
      .row {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid transparent;
        background: transparent;
        color: inherit;
        cursor: pointer;
        text-align: left;
        font-size: 0.82rem;
      }
      .row:hover {
        background: color-mix(in srgb, var(--primary-color) 8%, transparent);
      }
      .row.active {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 14%, transparent);
      }
      .swatch {
        flex: 0 0 56px;
        height: 16px;
        border-radius: 4px;
        border: 1px solid color-mix(in srgb, var(--divider-color) 70%, transparent);
      }
      .name {
        flex: 1 1 auto;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dot {
        flex: 0 0 8px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--primary-color);
      }
      .empty {
        margin: 0;
        font-size: 0.82rem;
        color: var(--wled-text-muted);
      }
      .editor-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .editor-btn,
      .editor-link.inline {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 0.78rem;
        border-radius: 6px;
        cursor: pointer;
      }
      .editor-btn {
        padding: 4px 8px;
        border: 1px solid var(--divider-color);
        background: color-mix(in srgb, var(--primary-color) 10%, transparent);
        color: inherit;
      }
      .editor-link {
        color: var(--primary-color);
        text-decoration: none;
        font-size: 0.78rem;
      }
      .editor-link.inline {
        padding: 2px 6px;
        border: 1px solid var(--divider-color);
        background: transparent;
        color: inherit;
      }
      .editor-link ha-icon,
      .editor-btn ha-icon {
        --mdc-icon-size: 16px;
      }
      .count {
        margin: 0;
        font-size: 0.72rem;
        color: var(--wled-text-muted);
      }
      .editor-overlay {
        position: fixed;
        inset: 0;
        z-index: 999;
        background: rgba(0, 0, 0, 0.55);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
      }
      .editor-panel {
        width: min(960px, 100%);
        max-height: min(92vh, 820px);
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: var(--card-background-color);
        border-radius: var(--wled-radius, 12px);
        border: 1px solid var(--divider-color);
        box-shadow: var(--wled-shadow);
        overflow: hidden;
      }
      .editor-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px;
        border-bottom: 1px solid var(--divider-color);
        font-weight: 600;
      }
      .icon-btn {
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 4px;
        line-height: 0;
      }
      .editor-hint {
        margin: 0;
        padding: 0 12px;
        font-size: 0.78rem;
        color: var(--wled-text-muted);
      }
      .editor-frame {
        flex: 1 1 auto;
        min-height: 360px;
        width: 100%;
        border: none;
        background: #111;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [PALETTE_CHIPS_TAG]: WledPaletteChips;
  }
}

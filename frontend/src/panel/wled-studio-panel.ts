import { css, html } from "lit";
import { state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import "../components/segment-controls.js";
import "./view-layout.js";
import { listControllers } from "../api/live-stream.js";

export const PANEL_TAG = "wled-studio-panel";

type StudioView =
  | "devices"
  | "layout"
  | "scenes"
  | "effects"
  | "paint"
  | "segments"
  | "audio"
  | "voice"
  | "settings";

@safeCustomElement(PANEL_TAG)
export class WledStudioPanel extends BasePoweredElement {
  @state() private _view: StudioView = "devices";
  @state() private _controllerId = "";

  protected override onPoweredConnect(): void {
    void this._loadController();
  }

  private async _loadController(): Promise<void> {
    if (!this.hass?.connection) return;
    try {
      const controllers = await listControllers(this.hass.connection);
      const pick = controllers[0];
      if (pick?.entry_id) {
        this._controllerId = String(pick.entry_id);
      }
    } catch {
      /* panel still usable */
    }
  }

  protected override render() {
    const remote = this.remote.state;

    return html`
      <div class="shell" role="application" aria-label="WLED Studio">
        <aside class="rail cq-medium" aria-label="Navigation">
          ${this._navItem("devices", "Devices", "mdi:devices")}
          ${this._navItem("layout", "Layout", "mdi:vector-polygon")}
          ${this._navItem("scenes", "Scenes", "mdi:palette-swatch")}
          ${this._navItem("effects", "Effects", "mdi:auto-fix")}
          ${this._navItem("segments", "Segments", "mdi:vector-line")}
        </aside>
        <main class="stage">
          <header class="top">
            <button
              class="hamburger cq-compact"
              aria-label="Open menu"
              @click=${() => this._toggleDrawer()}
            >
              <ha-icon icon="mdi:menu"></ha-icon>
            </button>
            <h1>WLED Studio</h1>
            ${remote.isRemote
              ? html`<span class="remote-pill">Remote preview</span>`
              : null}
          </header>
          <section class="content" aria-live="polite">
            ${this._view === "layout" && this._controllerId && this.hass?.connection
              ? html`
                  <wled-view-layout
                    .connection=${this.hass.connection}
                    .controllerId=${this._controllerId}
                  ></wled-view-layout>
                `
              : this._view === "segments" && this._controllerId && this.hass?.connection
                ? html`
                    <wled-segment-controls
                      .hass=${this.hass}
                      .connection=${this.hass.connection}
                      .controllerId=${this._controllerId}
                    ></wled-segment-controls>
                  `
                : html`
                  <p>
                    View: <strong>${this._view}</strong>
                    ${this._view === "segments"
                      ? " — connect a WLED Studio controller first."
                      : " — expanded in later phases."}
                  </p>
                `}
          </section>
        </main>
      </div>
    `;
  }

  private _navItem(view: StudioView, label: string, icon: string) {
    const active = this._view === view;
    return html`
      <button
        class="nav ${active ? "active" : ""}"
        aria-current=${active ? "page" : "false"}
        @click=${() => {
          this._view = view;
        }}
      >
        <ha-icon .icon=${icon}></ha-icon>
        <span>${label}</span>
      </button>
    `;
  }

  private _toggleDrawer(): void {
    /* Phase 5: bottom-sheet drawer <600px */
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
        .shell {
          display: grid;
          grid-template-columns: 1fr;
          min-height: 100%;
          background: var(--primary-background-color);
        }
        @container wled-studio (min-width: 600px) {
          .shell {
            grid-template-columns: 200px 1fr;
          }
        }
        .rail {
          padding: 8px;
          border-right: 1px solid var(--divider-color);
        }
        .nav {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 10px 12px;
          border: none;
          background: transparent;
          color: inherit;
          cursor: pointer;
          border-radius: 8px;
          transition: background var(--m-view-transition) ease;
        }
        .nav.active,
        .nav:hover {
          background: var(--secondary-background-color);
        }
        .top {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--divider-color);
        }
        .hamburger {
          border: none;
          background: transparent;
          color: inherit;
          cursor: pointer;
        }
        @container wled-studio (min-width: 600px) {
          .hamburger {
            display: none;
          }
        }
        .remote-pill {
          margin-left: auto;
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: 999px;
          background: var(--warning-color, #e65100);
        }
        .content {
          padding: 16px;
          min-height: 0;
          overflow: auto;
        }
      `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [PANEL_TAG]: WledStudioPanel;
  }
}

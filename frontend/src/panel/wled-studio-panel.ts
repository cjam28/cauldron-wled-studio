import { css, html } from "lit";
import { state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import "../components/segment-controls.js";
import "./view-layout.js";
import "./view-scenes.js";
import "./view-devices.js";
import "./view-effects.js";
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
  @state() private _drawerOpen = false;

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
        <div
          class="drawer-backdrop ${this._drawerOpen ? "visible" : ""}"
          aria-hidden=${this._drawerOpen ? "false" : "true"}
          @click=${() => this._closeDrawer()}
        ></div>
        <aside
          class="rail ${this._drawerOpen ? "open" : ""}"
          aria-label="Navigation"
        >
          <div class="rail-head">
            <span class="rail-title">Sections</span>
            <button
              type="button"
              class="drawer-close cq-compact"
              aria-label="Close menu"
              @click=${() => this._closeDrawer()}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <nav class="rail-nav">
            ${this._navItem("devices", "Devices", "mdi:devices")}
            ${this._navItem("layout", "Layout", "mdi:vector-polygon")}
            ${this._navItem("scenes", "Scenes", "mdi:palette-swatch")}
            ${this._navItem("effects", "Effects", "mdi:auto-fix")}
            ${this._navItem("paint", "Paint", "mdi:brush")}
            ${this._navItem("segments", "Segments", "mdi:vector-line")}
            ${this._navItem("audio", "Audio", "mdi:music")}
            ${this._navItem("voice", "Voice", "mdi:microphone-message")}
            ${this._navItem("settings", "Settings", "mdi:cog")}
          </nav>
        </aside>
        <main class="stage">
          <header class="top">
            <button
              type="button"
              class="hamburger cq-compact"
              aria-label="Open menu"
              aria-expanded=${this._drawerOpen ? "true" : "false"}
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
            ${this._renderView()}
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
        @click=${() => this._selectView(view)}
      >
        <ha-icon .icon=${icon}></ha-icon>
        <span>${label}</span>
      </button>
    `;
  }

  private _renderView() {
    const conn = this.hass?.connection;
    const id = this._controllerId;
    const needsController =
      this._view !== "devices" && this._view !== "settings";

    if (needsController && !id) {
      return html`
        <p>
          Connect a WLED Studio controller under
          <strong>Settings → Devices & services</strong>, then reload this panel.
        </p>
      `;
    }

    if (this._view === "devices" && conn) {
      return html`
        <wled-view-devices .connection=${conn}></wled-view-devices>
      `;
    }
    if (this._view === "layout" && conn && id) {
      return html`
        <wled-view-layout .connection=${conn} .controllerId=${id}></wled-view-layout>
      `;
    }
    if (this._view === "scenes" && conn && id) {
      return html`
        <wled-view-scenes .connection=${conn} .controllerId=${id}></wled-view-scenes>
      `;
    }
    if (this._view === "effects" && conn && id) {
      return html`
        <wled-view-effects .connection=${conn} .controllerId=${id}></wled-view-effects>
      `;
    }
    if (this._view === "segments" && conn && id) {
      return html`
        <wled-segment-controls
          .hass=${this.hass}
          .connection=${conn}
          .controllerId=${id}
        ></wled-segment-controls>
      `;
    }
    const phaseLabels: Partial<Record<StudioView, string>> = {
      paint: "Geometry-aware paint (DDP) — Phase 6",
      audio: "AudioReactive surface — Phase 7",
      voice: "Voice Assist aliases — Phase 8",
      settings: "Controller settings — Phase 11",
    };
    const label = phaseLabels[this._view] ?? this._view;
    return html`
      <p>
        <strong>${label}</strong> is not built yet. Use Layout, Scenes, Effects, or Segments
        today.
      </p>
    `;
  }

  private _selectView(view: StudioView): void {
    this._view = view;
    this._closeDrawer();
  }

  private _toggleDrawer(): void {
    this._drawerOpen = !this._drawerOpen;
  }

  private _closeDrawer(): void {
    this._drawerOpen = false;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
        .shell {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          min-height: 100%;
          background: var(--primary-background-color);
          position: relative;
        }
        @container wled-studio (min-width: 600px) {
          .shell {
            grid-template-columns: 200px 1fr;
          }
        }
        .drawer-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 40;
          background: rgba(0, 0, 0, 0.45);
        }
        .drawer-backdrop.visible {
          display: block;
        }
        @container wled-studio (min-width: 600px) {
          .drawer-backdrop {
            display: none !important;
          }
        }
        .rail {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 50;
          width: min(280px, 86vw);
          height: 100%;
          max-height: 100dvh;
          padding: 8px;
          box-sizing: border-box;
          border-right: 1px solid var(--divider-color);
          background: var(--card-background-color, var(--primary-background-color));
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.25);
          transform: translateX(-105%);
          transition: transform 0.2s ease;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .rail.open {
          transform: translateX(0);
        }
        @container wled-studio (min-width: 600px) {
          .rail {
            position: static;
            z-index: auto;
            width: auto;
            height: auto;
            max-height: none;
            transform: none;
            box-shadow: none;
            transition: none;
          }
        }
        .rail-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 4px 12px;
        }
        .rail-title {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.65;
        }
        .drawer-close {
          border: none;
          background: transparent;
          color: inherit;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
        }
        @container wled-studio (min-width: 600px) {
          .drawer-close {
            display: none;
          }
          .rail-head {
            display: none;
          }
        }
        .rail-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
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
          font-size: 0.95rem;
        }
        .nav.active,
        .nav:hover {
          background: var(--secondary-background-color);
        }
        .stage {
          min-width: 0;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }
        .top {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--divider-color);
          flex-shrink: 0;
        }
        .top h1 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }
        .hamburger {
          border: none;
          background: transparent;
          color: inherit;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          flex-shrink: 0;
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
          flex: 1;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
        }
      `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [PANEL_TAG]: WledStudioPanel;
  }
}

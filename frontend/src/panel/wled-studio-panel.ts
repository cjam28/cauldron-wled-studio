import { css, html } from "lit";
import { state } from "lit/decorators.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { isWledStudioStale } from "../utils/build-stamp.js";
import "../components/segment-controls.js";
import "../components/studio-live-preview.js";
import type { WledStudioLivePreview } from "../components/studio-live-preview.js";
import type { WledViewEffects } from "./view-effects.js";
import type { WledViewScenes } from "./view-scenes.js";
import type { WledSegmentControls } from "../components/segment-controls.js";
import "./view-layout.js";
import "./view-scenes.js";
import "./view-devices.js";
import "./view-effects.js";
import "./view-paint.js";
import "./view-settings.js";
import "./view-audio.js";
import "./view-voice.js";
import "./view-schedules.js";
import "./view-firmware.js";
import { listControllers, type ControllerInfo } from "../api/live-stream.js";

export const PANEL_TAG = "wled-studio-panel";

type StudioView =
  | "devices"
  | "layout"
  | "scenes"
  | "effects"
  | "paint"
  | "segments"
  | "firmware"
  | "audio"
  | "voice"
  | "schedules"
  | "settings";

const ONBOARD_KEY = "wled_studio.onboarded";

export class WledStudioPanel extends BasePoweredElement {
  @state() private _view: StudioView = "devices";
  @state() private _controllerId = "";
  @state() private _controllers: ControllerInfo[] = [];
  @state() private _drawerOpen = false;
  @state() private _previewSegId = -1;
  @state() private _showOnboard = false;

  protected override onPoweredConnect(): void {
    try {
      this._showOnboard = !localStorage.getItem(ONBOARD_KEY);
    } catch {
      this._showOnboard = false;
    }
    void this._loadController();
  }

  private async _loadController(): Promise<void> {
    if (!this.hass?.connection) return;
    try {
      const controllers = await listControllers(this.hass.connection);
      this._controllers = controllers;
      if (
        this._controllerId &&
        controllers.some((c) => c.entry_id === this._controllerId)
      ) {
        return;
      }
      const pick = controllers[0];
      if (pick?.entry_id) {
        this._controllerId = String(pick.entry_id);
      }
    } catch {
      /* panel still usable */
    }
  }

  private _dismissOnboard(): void {
    try {
      localStorage.setItem(ONBOARD_KEY, "1");
    } catch {
      /* ignore */
    }
    this._showOnboard = false;
  }

  private _onControllerPick(ev: Event): void {
    const v = (ev.target as HTMLSelectElement).value;
    if (v) this._controllerId = v;
  }

  protected override render() {
    const remote = this.remote.state;

    return html`
      <div class="shell" role="application" aria-label="WLED Studio">
        ${isWledStudioStale()
          ? html`
              <ha-alert alert-type="warning" class="stale-banner">
                WLED Studio updated — refresh this page to apply changes.
              </ha-alert>
            `
          : null}
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
            ${this._navItem("firmware", "Controller", "mdi:web")}
            ${this._navItem("audio", "Audio", "mdi:music")}
            ${this._navItem("voice", "Voice", "mdi:microphone-message")}
            ${this._navItem("schedules", "Schedules", "mdi:clock-outline")}
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
            ${this._controllers.length > 1
              ? html`
                  <label class="controller-pick">
                    <span class="sr-only">Controller</span>
                    <select
                      aria-label="WLED controller"
                      @change=${this._onControllerPick}
                    >
                      ${this._controllers.map(
                        (c) => html`
                          <option
                            value=${c.entry_id}
                            ?selected=${c.entry_id === this._controllerId}
                          >
                            ${c.title ?? c.entry_id}
                          </option>
                        `
                      )}
                    </select>
                  </label>
                `
              : null}
            ${remote.isRemote
              ? html`<span class="remote-pill">Remote preview</span>`
              : null}
          </header>
          <section
            class="content"
            aria-live="polite"
            @wled-preview-refresh=${() => this.refreshLivePreview()}
          >
            ${this._showOnboard
              ? html`
                  <div class="onboard" role="dialog" aria-label="Welcome">
                    <h2>Welcome to WLED Studio</h2>
                    <p>
                      Draw your install in <strong>Layout</strong>, save
                      <strong>Scenes</strong>, browse <strong>Effects</strong> with captured
                      thumbnails, and paint in realtime over DDP.
                    </p>
                    <ol>
                      <li>Pick your controller in the header (if you have several).</li>
                      <li>Open Layout → apply segments from anchors.</li>
                      <li>Settings → Recapture thumbnails once (takes several minutes).</li>
                    </ol>
                    <button type="button" @click=${() => this._dismissOnboard()}>
                      Get started
                    </button>
                  </div>
                `
              : null}
            ${this._renderPreview()}
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

  private _viewsWithStripPreview(): boolean {
    return (
      this._view === "scenes" ||
      this._view === "effects" ||
      this._view === "segments"
    );
  }

  private _renderPreview() {
    const conn = this.hass?.connection;
    const id = this._controllerId;
    if (!conn || !id || !this._viewsWithStripPreview()) return null;
    return html`
      <wled-studio-live-preview
        .connection=${conn}
        .controllerId=${id}
        .selectedSegId=${this._previewSegId}
        @segment-select=${this._onPreviewSegmentSelect}
      ></wled-studio-live-preview>
    `;
  }

  private _onPreviewSegmentSelect(ev: CustomEvent<{ segmentId: number }>): void {
    const id = ev.detail.segmentId;
    this._previewSegId = id;
    if (this._view === "segments") {
      this.renderRoot
        .querySelector<WledSegmentControls>("wled-segment-controls")
        ?.selectSegment(id);
    } else if (this._view === "effects") {
      this.renderRoot
        .querySelector<WledViewEffects>("wled-view-effects")
        ?.selectSegmentFromPreview(id);
    } else if (this._view === "scenes") {
      this.renderRoot
        .querySelector<WledViewScenes>("wled-view-scenes")
        ?.selectSegmentFromPreview(id);
    }
  }

  private _livePreview(): WledStudioLivePreview | null {
    return (
      this.renderRoot.querySelector<WledStudioLivePreview>(
        "wled-studio-live-preview"
      ) ?? null
    );
  }

  /** Call after scene/effect apply so segment dividers stay in sync. */
  refreshLivePreview(): void {
    void this._livePreview()?.refreshSegments();
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
        <wled-view-layout
          .connection=${conn}
          .hass=${this.hass}
          .controllerId=${id}
        ></wled-view-layout>
      `;
    }
    if (this._view === "scenes" && conn && id) {
      return html`
        <wled-view-scenes .connection=${conn} .controllerId=${id}></wled-view-scenes>
      `;
    }
    if (this._view === "effects" && conn && id) {
      return html`
        <wled-view-effects
          .hass=${this.hass}
          .connection=${conn}
          .controllerId=${id}
        ></wled-view-effects>
      `;
    }
    if (this._view === "segments" && conn && id) {
      const masterEntity =
        this._controllers.find((c) => c.entry_id === id)?.master_entity_id ?? "";
      return html`
        <wled-segment-controls
          .hass=${this.hass}
          .connection=${conn}
          .controllerId=${id}
          .masterEntity=${masterEntity}
        ></wled-segment-controls>
      `;
    }
    if (this._view === "paint" && conn && id) {
      return html`
        <wled-view-paint
          .hass=${this.hass}
          .connection=${conn}
          .controllerId=${id}
        ></wled-view-paint>
      `;
    }
    if (this._view === "firmware" && conn && id) {
      const ctrl = this._controllers.find((c) => c.entry_id === id);
      return html`
        <wled-view-firmware
          .connection=${conn}
          .controllerId=${id}
          .host=${ctrl?.host ?? ""}
          .controllerTitle=${ctrl?.title ?? id}
        ></wled-view-firmware>
      `;
    }
    if (this._view === "audio" && id) {
      return html`<wled-view-audio .controllerId=${id}></wled-view-audio>`;
    }
    if (this._view === "voice" && conn && id) {
      return html`
        <wled-view-voice .connection=${conn} .controllerId=${id}></wled-view-voice>
      `;
    }
    if (this._view === "schedules" && conn && id) {
      return html`
        <wled-view-schedules .connection=${conn} .controllerId=${id}></wled-view-schedules>
      `;
    }
    if (this._view === "settings" && conn && id) {
      return html`
        <wled-view-settings .connection=${conn} .controllerId=${id}></wled-view-settings>
      `;
    }
    return html`<p>Select a section from the menu.</p>`;
  }

  private _selectView(view: StudioView): void {
    const leavingPaint = this._view === "paint" && view !== "paint";
    if (leavingPaint) {
      void this._abortActivePaint();
    }
    this._view = view;
    this._closeDrawer();
    if (leavingPaint) {
      this.refreshLivePreview();
    }
  }

  private async _abortActivePaint(): Promise<void> {
    const paint = this.renderRoot.querySelector("wled-view-paint");
    if (!paint || !("cancelLiveIfActive" in paint)) return;
    const el = paint as import("./view-paint.js").WledViewPaint;
    await el.cancelLiveIfActive();
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
        .stale-banner {
          display: block;
          margin: 8px 12px 0;
          grid-column: 1 / -1;
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
        .controller-pick select {
          max-width: 200px;
          font-size: 0.85rem;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
        .onboard {
          padding: 16px;
          margin-bottom: 16px;
          border-radius: 12px;
          border: 1px solid var(--primary-color);
          background: var(--secondary-background-color);
        }
        .onboard h2 {
          margin: 0 0 8px;
        }
        .onboard ol {
          margin: 8px 0 12px;
          padding-left: 1.2rem;
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

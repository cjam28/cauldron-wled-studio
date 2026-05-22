import { css, html, type PropertyValues } from "lit";
import { state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { isWledStudioStale } from "../utils/build-stamp.js";
import "../components/segment-controls.js";
import "../components/studio-live-preview.js";
import "../components/wled-toast-host.js";
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
  | "color"
  | "effects"
  | "scenes"
  | "segments"
  | "paint"
  | "layout"
  | "devices"
  | "audio"
  | "voice"
  | "schedules"
  | "controller"
  | "settings"
  | "firmware";

const ONBOARD_KEY = "wled_studio.onboarded";

const PRIMARY_NAV: Array<{ id: StudioView; label: string; icon: string }> = [
  { id: "color", label: "Color", icon: "mdi:palette" },
  { id: "effects", label: "Effects", icon: "mdi:auto-fix" },
  { id: "scenes", label: "Scenes", icon: "mdi:palette-swatch" },
  { id: "paint", label: "Paint", icon: "mdi:brush" },
];

const MORE_NAV: Array<{ id: StudioView; label: string; icon: string }> = [
  { id: "layout", label: "Layout", icon: "mdi:vector-polygon" },
  { id: "devices", label: "Devices", icon: "mdi:devices" },
  { id: "audio", label: "Audio", icon: "mdi:music" },
  { id: "voice", label: "Voice", icon: "mdi:microphone-message" },
  { id: "schedules", label: "Schedules", icon: "mdi:clock-outline" },
  { id: "controller", label: "Controller", icon: "mdi:web" },
  { id: "settings", label: "Settings", icon: "mdi:cog" },
  { id: "firmware", label: "Firmware", icon: "mdi:chip" },
];

function isMoreView(view: StudioView): boolean {
  return MORE_NAV.some((item) => item.id === view);
}

export class WledStudioPanel extends BasePoweredElement {
  @state() private _view: StudioView = "color";
  @state() private _controllerId = "";
  @state() private _controllers: ControllerInfo[] = [];
  @state() private _drawerOpen = false;
  @state() private _moreExpanded = false;
  @state() private _previewSegId = -1;
  @state() private _previewHighlightIds: number[] = [];
  @state() private _showOnboard = false;

  private _onboardKeyHandler?: (e: KeyboardEvent) => void;

  protected override onPoweredConnect(): void {
    try {
      this._showOnboard = !localStorage.getItem(ONBOARD_KEY);
    } catch {
      this._showOnboard = false;
    }
    if ((this._view as string) === "segments") {
      this._view = "color";
    }
    if (isMoreView(this._view)) {
      this._moreExpanded = true;
    }
    void this._loadController();
  }

  protected override willUpdate(changed: PropertyValues): void {
    if (changed.has("_view") && (this._view as string) === "segments") {
      this._view = "color";
    }
  }

  protected override onPoweredDisconnect(): void {
    this._unbindOnboardModal();
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has("_showOnboard")) {
      if (this._showOnboard) {
        this._bindOnboardModal();
      } else {
        this._unbindOnboardModal();
      }
    }
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

  private _bindOnboardModal(): void {
    this._unbindOnboardModal();
    this._onboardKeyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        this._dismissOnboard();
        return;
      }
      if (e.key !== "Tab") return;
      const card = this.renderRoot.querySelector<HTMLElement>(".onboard-card");
      if (!card) return;
      const focusable = card.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", this._onboardKeyHandler);
    this.scheduleRaf(() => {
      this.renderRoot.querySelector<HTMLButtonElement>(".onboard-primary")?.focus();
    });
  }

  private _unbindOnboardModal(): void {
    if (!this._onboardKeyHandler) return;
    document.removeEventListener("keydown", this._onboardKeyHandler);
    this._onboardKeyHandler = undefined;
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
        ${this._showOnboard
          ? html`
              <div
                class="onboard-overlay"
                @click=${(e: Event) => {
                  if (e.target === e.currentTarget) this._dismissOnboard();
                }}
              >
                <div
                  class="onboard-card"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Welcome to WLED Studio"
                >
                  <h2>Welcome to WLED Studio</h2>
                  <p>
                    Pick colors in <strong>Color</strong>, browse
                    <strong>Effects</strong> and <strong>Scenes</strong>, then use
                    <strong>Layout</strong> (under More) to map your install.
                  </p>
                  <ol>
                    <li>Pick your controller in the header (if you have several).</li>
                    <li>Open Layout → apply segments from anchors.</li>
                    <li>Settings → Recapture thumbnails once (takes several minutes).</li>
                  </ol>
                  <button
                    type="button"
                    class="onboard-primary primary"
                    @click=${() => this._dismissOnboard()}
                  >
                    Get started
                  </button>
                </div>
              </div>
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
            <span class="rail-title">More</span>
            <button
              type="button"
              class="drawer-close cq-compact"
              aria-label="Close menu"
              @click=${() => this._closeDrawer()}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <nav class="rail-nav desktop-primary" aria-label="Primary sections">
            ${PRIMARY_NAV.map((item) => this._navItem(item.id, item.label, item.icon))}
          </nav>
          <div class="more-section desktop-more">
            <button
              type="button"
              class="more-toggle"
              aria-label="More sections"
              aria-expanded=${this._moreExpanded ? "true" : "false"}
              @click=${() => this._toggleMore()}
            >
              <ha-icon
                .icon=${this._moreExpanded ? "mdi:chevron-down" : "mdi:chevron-right"}
              ></ha-icon>
              <span>More</span>
            </button>
            ${this._moreExpanded
              ? html`
                  <nav class="more-nav" aria-label="More sections">
                    ${MORE_NAV.map((item) =>
                      this._navItem(item.id, item.label, item.icon)
                    )}
                  </nav>
                `
              : null}
          </div>
          <nav class="rail-nav mobile-more" aria-label="More sections">
            ${MORE_NAV.map((item) => this._navItem(item.id, item.label, item.icon))}
          </nav>
        </aside>
        <main class="stage">
          <header class="top">
            <button
              type="button"
              class="hamburger cq-compact"
              aria-label="Open more menu"
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
          <nav class="primary-bar" aria-label="Primary sections">
            ${PRIMARY_NAV.map((item) => this._primaryTab(item.id, item.label, item.icon))}
          </nav>
          <section
            class="content"
            aria-live="polite"
            @wled-preview-refresh=${() => this.refreshLivePreview()}
          >
            ${this._renderPreview()}
            ${this._renderView()}
          </section>
        </main>
      </div>
      <wled-toast-host></wled-toast-host>
    `;
  }

  private _navItem(view: StudioView, label: string, icon: string) {
    const active = this._view === view;
    return html`
      <button
        class="nav ${active ? "active" : ""}"
        aria-label=${label}
        aria-current=${active ? "page" : "false"}
        @click=${() => this._selectView(view)}
      >
        <ha-icon .icon=${icon}></ha-icon>
        <span>${label}</span>
      </button>
    `;
  }

  private _primaryTab(view: StudioView, label: string, icon: string) {
    const active = this._view === view;
    return html`
      <button
        class="primary-tab ${active ? "active" : ""}"
        role="tab"
        aria-label=${label}
        aria-selected=${active ? "true" : "false"}
        @click=${() => this._selectView(view)}
      >
        <ha-icon .icon=${icon}></ha-icon>
        <span>${label}</span>
      </button>
    `;
  }

  private _viewsWithStripPreview(): boolean {
    return (
      this._view === "color" ||
      this._view === "scenes" ||
      this._view === "effects"
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
        .highlightSegIds=${this._previewHighlightIds}
        @segment-select=${this._onPreviewSegmentSelect}
      ></wled-studio-live-preview>
    `;
  }

  private _onPreviewSegmentSelect(ev: CustomEvent<{ segmentId: number }>): void {
    const id = ev.detail.segmentId;
    this._previewSegId = id;
    if (this._view === "color") {
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

  private _onPreviewTargetsChanged(
    ev: CustomEvent<{ segmentId: number; highlightIds?: number[]; editIds?: number[] }>
  ): void {
    this._previewSegId = ev.detail.segmentId;
    if (ev.detail.highlightIds?.length) {
      this._previewHighlightIds = ev.detail.highlightIds;
    } else if (ev.detail.editIds?.length) {
      this._previewHighlightIds = ev.detail.editIds;
    } else {
      this._previewHighlightIds = [ev.detail.segmentId];
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
    const preview = this._livePreview();
    preview?.pulseApply();
    void preview?.refreshSegments();
  }

  private _masterEntityForController(): string {
    return (
      this._controllers.find((c) => c.entry_id === this._controllerId)
        ?.master_entity_id ?? ""
    );
  }

  private _renderFirmwareView(conn: Connection, id: string) {
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
          @segment-targets-changed=${this._onPreviewTargetsChanged}
        ></wled-view-effects>
      `;
    }
    if (this._view === "color" && conn && id) {
      const masterEntity = this._masterEntityForController();
      return html`
        <wled-segment-controls
          .hass=${this.hass}
          .connection=${conn}
          .controllerId=${id}
          .masterEntity=${masterEntity}
          compact
          @segment-targets-changed=${this._onPreviewTargetsChanged}
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
    if (
      (this._view === "controller" || this._view === "firmware") &&
      conn &&
      id
    ) {
      return this._renderFirmwareView(conn, id);
    }
    if (this._view === "audio" && id) {
      return html`<wled-view-audio
        .connection=${conn}
        .controllerId=${id}
      ></wled-view-audio>`;
    }
    if (this._view === "voice" && conn && id) {
      return html`
        <wled-view-voice
          .connection=${conn}
          .controllerId=${id}
          .masterEntity=${this._masterEntityForController()}
        ></wled-view-voice>
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
    if (isMoreView(view)) {
      this._moreExpanded = true;
    }
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

  private _toggleMore(): void {
    this._moreExpanded = !this._moreExpanded;
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
      .onboard-overlay {
        position: fixed;
        inset: 0;
        z-index: 300;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.45);
      }
      .onboard-card {
        width: min(100%, 420px);
        max-height: min(90vh, 520px);
        overflow: auto;
        padding: 20px;
        border-radius: var(--wled-radius);
        background: var(--wled-surface);
        color: var(--wled-text);
        box-shadow: var(--wled-shadow);
      }
      .onboard-card h2 {
        margin: 0 0 8px;
        font-size: 1.15rem;
      }
      .onboard-card p {
        margin: 0 0 8px;
        color: var(--wled-text-muted);
      }
      .onboard-card ol {
        margin: 8px 0 16px;
        padding-left: 1.2rem;
        color: var(--wled-text-muted);
      }
      .onboard-primary {
        width: 100%;
        min-height: var(--wled-tap);
        border: none;
        border-radius: var(--wled-radius-sm);
        background: var(--wled-accent);
        color: var(--text-primary-color, #fff);
        font-weight: 600;
        cursor: pointer;
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
        border-right: 1px solid var(--wled-border);
        background: var(--wled-surface);
        box-shadow: 4px 0 24px rgba(0, 0, 0, 0.25);
        transform: translateX(-105%);
        transition: transform var(--wled-transition);
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
        color: var(--wled-text-muted);
      }
      .drawer-close {
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 6px;
        border-radius: var(--wled-radius-sm);
      }
      @container wled-studio (min-width: 600px) {
        .drawer-close,
        .rail-head,
        .mobile-more {
          display: none;
        }
      }
      .desktop-primary,
      .desktop-more {
        display: none;
      }
      @container wled-studio (min-width: 600px) {
        .desktop-primary {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .desktop-more {
          display: block;
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid var(--wled-border);
        }
      }
      .rail-nav,
      .more-nav {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .more-toggle {
        display: flex;
        align-items: center;
        gap: 6px;
        width: 100%;
        padding: 8px 12px;
        border: none;
        background: transparent;
        color: var(--wled-text-muted);
        cursor: pointer;
        border-radius: var(--wled-radius-sm);
        font-size: 0.82rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .more-toggle:hover {
        background: var(--wled-surface-elevated);
      }
      .nav {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        padding: 10px 12px;
        padding-left: 12px;
        border: none;
        border-left: 3px solid transparent;
        background: transparent;
        color: inherit;
        cursor: pointer;
        border-radius: var(--wled-radius-sm);
        transition: background var(--wled-transition);
        font-size: 0.95rem;
        text-align: left;
      }
      .nav.active {
        border-left-color: var(--wled-accent);
        padding-left: 9px;
        font-weight: 600;
      }
      .nav:not(.active):hover {
        background: var(--wled-surface-elevated);
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
        border-bottom: 1px solid var(--wled-border);
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
        border-radius: var(--wled-radius-sm);
        flex-shrink: 0;
      }
      @container wled-studio (min-width: 600px) {
        .hamburger {
          display: none;
        }
      }
      .primary-bar {
        display: flex;
        gap: 4px;
        padding: 0 8px 8px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        border-bottom: 1px solid var(--wled-border);
        flex-shrink: 0;
      }
      @container wled-studio (min-width: 600px) {
        .primary-bar {
          display: none;
        }
      }
      .primary-tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        min-width: var(--wled-tap);
        min-height: var(--wled-tap);
        padding: 6px 10px;
        border: none;
        border-bottom: 3px solid transparent;
        background: transparent;
        color: var(--wled-text-muted);
        cursor: pointer;
        border-radius: var(--wled-radius-sm) var(--wled-radius-sm) 0 0;
        font-size: 0.68rem;
        flex-shrink: 0;
        transition:
          color var(--wled-transition),
          border-color var(--wled-transition);
      }
      .primary-tab ha-icon {
        font-size: 22px;
      }
      .primary-tab.active {
        color: var(--wled-text);
        border-bottom-color: var(--wled-accent);
        font-weight: 600;
      }
      .primary-tab:not(.active):hover {
        color: var(--wled-text);
        background: var(--wled-surface-elevated);
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

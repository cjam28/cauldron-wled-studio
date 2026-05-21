import { css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";

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

@customElement(PANEL_TAG)
export class WledStudioPanel extends BasePoweredElement {
  @state() private _view: StudioView = "devices";

  protected override render() {
    const remote = this.remote.state;

    return html`
      <div class="shell" role="application" aria-label="WLED Studio">
        <aside class="rail cq-medium" aria-label="Navigation">
          ${this._navItem("devices", "Devices", "mdi:devices")}
          ${this._navItem("layout", "Layout", "mdi:vector-polygon")}
          ${this._navItem("scenes", "Scenes", "mdi:palette-swatch")}
          ${this._navItem("effects", "Effects", "mdi:auto-fix")}
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
            <p>View: <strong>${this._view}</strong> — shell ready (Phase 5 expands).</p>
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
        }
      `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [PANEL_TAG]: WledStudioPanel;
  }
}

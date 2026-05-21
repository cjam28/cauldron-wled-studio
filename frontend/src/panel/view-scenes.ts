import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import {
  sceneApply,
  sceneCapture,
  sceneDelete,
  sceneList,
  sceneSave,
  SceneConflictError,
  type SceneRecord,
} from "../api/scenes.js";
import {
  fetchDeviceState,
  type DeviceStateSnapshot,
  type WledSegment,
} from "../api/wled-state.js";
import { labelForSegment, toggleEditId } from "../utils/segment-edit.js";

export const VIEW_SCENES_TAG = "wled-view-scenes";

@safeCustomElement(VIEW_SCENES_TAG)
export class WledViewScenes extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";

  @state() private _scenes: SceneRecord[] = [];
  @state() private _status = "Loading scenes…";
  @state() private _busy = false;
  @state() private _toast = "";
  @state() private _conflict?: SceneRecord;
  @state() private _captureName = "";
  @state() private _segments: WledSegment[] = [];
  @state() private _applySegIds: number[] = [];
  @state() private _snapshot?: DeviceStateSnapshot;

  private _applyAbort?: AbortController;

  protected override onPoweredConnect(): void {
    void this._load();
  }

  protected override willUpdate(
    changed: import("lit").PropertyValues
  ): void {
    if (
      (changed.has("connection") || changed.has("controllerId")) &&
      this.connection &&
      this.controllerId
    ) {
      void this._load();
    }
  }

  protected override onPoweredDisconnect(): void {
    this._applyAbort?.abort();
    this._applyAbort = undefined;
  }

  private async _load(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    this._status = "Loading scenes…";
    try {
      const [scenes, snap] = await Promise.all([
        sceneList(this.connection, this.controllerId),
        fetchDeviceState(this.connection, this.controllerId),
      ]);
      this._scenes = scenes;
      this._snapshot = snap;
      this._segments = [...(snap.segments ?? [])].sort((a, b) => a.id - b.id);
      if (this._segments.length && !this._applySegIds.length) {
        this._applySegIds = this._segments.map((s) => s.id);
      } else {
        const valid = new Set(this._segments.map((s) => s.id));
        this._applySegIds = this._applySegIds.filter((id) => valid.has(id));
        if (!this._applySegIds.length && this._segments.length) {
          this._applySegIds = this._segments.map((s) => s.id);
        }
      }
      this._status =
        this._scenes.length === 0
          ? "No scenes yet — capture the current look or use starter scenes after reload."
          : "";
    } catch {
      this._status = "Could not load scenes.";
    }
  }

  private _toggleApplySeg(id: number): void {
    let next = toggleEditId(this._applySegIds, id);
    if (!next.length) {
      next = [id];
    }
    this._applySegIds = next;
  }

  protected override render() {
    return html`
      <div class="wrap">
        <header class="head">
          <div>
            <h2>Scenes</h2>
            <p class="hint">
              Apply uses WLED crossfade (<code>tt</code>) on the device — one POST, no client tweening.
            </p>
          </div>
          <div class="actions">
            <input
              class="name-in"
              type="text"
              placeholder="Scene name"
              aria-label="New scene name"
              .value=${this._captureName}
              @input=${(e: Event) => {
                this._captureName = (e.target as HTMLInputElement).value;
              }}
            />
            <button
              type="button"
              class="primary"
              ?disabled=${this._busy || !this._captureName.trim()}
              @click=${() => this._capture()}
            >
              Save current look
            </button>
          </div>
        </header>

        ${this._status
          ? html`<p class="status">${this._status}</p>`
          : null}
        ${this._toast
          ? html`<p class="toast" role="status">${this._toast}</p>`
          : null}

        ${this._segments.length
          ? html`
              <div class="seg-block">
                <p class="seg-label">Apply to segments (tap to toggle)</p>
                <div class="seg-bar" role="group">
                  ${this._segments.map(
                    (s) => html`
                      <button
                        type="button"
                        class="seg-btn ${this._applySegIds.includes(s.id) ? "on" : ""}"
                        aria-pressed=${this._applySegIds.includes(s.id)}
                        @click=${() => this._toggleApplySeg(s.id)}
                      >
                        ${labelForSegment(s, this._snapshot?.segment_entities ?? [])}
                      </button>
                    `
                  )}
                </div>
              </div>
            `
          : null}

        ${this._conflict
          ? html`
              <div class="conflict" role="alert">
                <p>
                  <strong>${this._conflict.name}</strong> changed on another client.
                  Reload or overwrite?
                </p>
                <div class="row">
                  <button type="button" @click=${() => this._dismissConflict()}>
                    Reload list
                  </button>
                  <button
                    type="button"
                    class="warn"
                    @click=${() => this._overwriteConflict()}
                  >
                    Overwrite anyway
                  </button>
                </div>
              </div>
            `
          : null}

        <div class="grid" role="list">
          ${this._scenes.map((s) => this._sceneTile(s))}
        </div>
      </div>
    `;
  }

  private _sceneTile(scene: SceneRecord) {
    const ms = scene.transition_ms ?? 2500;
    return html`
      <article class="tile" role="listitem">
        <button
          type="button"
          class="tile-main"
          aria-label=${`Apply scene ${scene.name}`}
          ?disabled=${this._busy}
          @click=${() => this._apply(scene)}
        >
          <span class="tile-name">${scene.name}</span>
          ${scene.seeded
            ? html`<span class="badge">Starter</span>`
            : null}
          <span class="tile-meta">${(ms / 1000).toFixed(1)}s fade</span>
        </button>
        ${scene.seeded
          ? null
          : html`
              <button
                type="button"
                class="icon-btn"
                aria-label=${`Delete ${scene.name}`}
                ?disabled=${this._busy}
                @click=${() => this._delete(scene)}
              >
                <ha-icon icon="mdi:delete-outline"></ha-icon>
              </button>
            `}
      </article>
    `;
  }

  private async _apply(scene: SceneRecord): Promise<void> {
    if (!this.connection) return;
    this._busy = true;
    this._toast = "";
    this._applyAbort?.abort();
    this._applyAbort = new AbortController();
    try {
      const allSelected =
        this._segments.length > 0 &&
        this._applySegIds.length === this._segments.length;
      await sceneApply(this.connection, this.controllerId, scene.id, {
        signal: this._applyAbort.signal,
        segmentIds: allSelected ? undefined : [...this._applySegIds],
      });
      this._toast = `Applied ${scene.name}`;
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        this._toast = `Apply failed: ${(err as Error).message || "error"}`;
      }
    } finally {
      this._busy = false;
    }
  }

  private async _capture(): Promise<void> {
    if (!this.connection) return;
    const name = this._captureName.trim();
    if (!name) return;
    this._busy = true;
    this._toast = "";
    try {
      const saved = await sceneCapture(this.connection, this.controllerId, name);
      this._captureName = "";
      this._toast = `Saved ${saved.name}`;
      await this._load();
    } catch (err) {
      this._toast = `Save failed: ${(err as Error).message || "error"}`;
    } finally {
      this._busy = false;
    }
  }

  private async _delete(scene: SceneRecord): Promise<void> {
    if (!this.connection || !confirm(`Delete scene "${scene.name}"?`)) return;
    this._busy = true;
    try {
      await sceneDelete(this.connection, this.controllerId, scene.id);
      this._toast = `Deleted ${scene.name}`;
      await this._load();
    } catch {
      this._toast = "Delete failed";
    } finally {
      this._busy = false;
    }
  }

  private _dismissConflict(): void {
    this._conflict = undefined;
    void this._load();
  }

  private async _overwriteConflict(): Promise<void> {
    if (!this.connection || !this._conflict) return;
    const scene = this._scenes.find((s) => s.id === this._conflict?.id);
    if (!scene) return;
    this._busy = true;
    try {
      await sceneSave(this.connection, this.controllerId, scene);
      this._conflict = undefined;
      this._toast = "Scene overwritten";
      await this._load();
    } catch (err) {
      if (err instanceof SceneConflictError) {
        this._conflict = err.remote;
      }
    } finally {
      this._busy = false;
    }
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .wrap {
        max-width: 960px;
      }
      .head {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
      }
      .head h2 {
        margin: 0 0 4px;
        font-size: 1.15rem;
      }
      .hint {
        margin: 0;
        font-size: 0.85rem;
        opacity: 0.75;
        max-width: 28rem;
      }
      .actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      .name-in {
        min-width: 10rem;
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
      }
      .primary {
        padding: 8px 14px;
        border-radius: 8px;
        border: none;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
      }
      .primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .status,
      .toast {
        font-size: 0.9rem;
        opacity: 0.85;
      }
      .toast {
        color: var(--primary-color);
      }
      .seg-block {
        margin-bottom: 16px;
      }
      .seg-label {
        margin: 0 0 8px;
        font-size: 0.8rem;
        opacity: 0.75;
      }
      .seg-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .seg-btn {
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        padding: 6px 10px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.8rem;
      }
      .seg-btn.on {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 22%, transparent);
      }
      .conflict {
        padding: 12px;
        margin-bottom: 12px;
        border-radius: 8px;
        background: var(--error-color, #b71c1c);
        color: #fff;
      }
      .conflict .row {
        display: flex;
        gap: 8px;
        margin-top: 8px;
      }
      .warn {
        background: rgba(0, 0, 0, 0.25);
      }
      .grid {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      }
      @container wled-studio (min-width: 600px) {
        .grid {
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        }
      }
      @container wled-studio (min-width: 900px) {
        .grid {
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        }
      }
      .tile {
        display: flex;
        align-items: stretch;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
      }
      .tile-main {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        padding: 14px 12px;
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        text-align: left;
        transition: background var(--m-scene-confirm) ease;
      }
      .tile-main:hover:not(:disabled) {
        background: var(--secondary-background-color);
      }
      .tile-name {
        font-weight: 600;
        font-size: 0.95rem;
      }
      .badge {
        font-size: 0.7rem;
        opacity: 0.65;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .tile-meta {
        font-size: 0.75rem;
        opacity: 0.6;
      }
      .icon-btn {
        border: none;
        border-left: 1px solid var(--divider-color);
        background: transparent;
        color: inherit;
        padding: 0 10px;
        cursor: pointer;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [VIEW_SCENES_TAG]: WledViewScenes;
  }
}

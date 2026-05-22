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
import { toggleEditId } from "../utils/segment-edit.js";
import { pushRecentScene } from "../utils/recent-store.js";
import {
  sceneHasThumb,
  scenePreviewGradientStyle,
} from "../utils/scene-gradient.js";
import "../components/segment-bar.js";
import "../components/recent-scenes-row.js";
import type { WledRecentScenesRow } from "../components/recent-scenes-row.js";

export const VIEW_SCENES_TAG = "wled-view-scenes";

@safeCustomElement(VIEW_SCENES_TAG)
export class WledViewScenes extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";
  @property({ type: Boolean }) compact = false;

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

  /** Strip preview tap — toggle segment in scene apply set. */
  selectSegmentFromPreview(id: number): void {
    this._toggleApplySeg(id);
  }

  private _toggleApplySeg(id: number): void {
    let next = toggleEditId(this._applySegIds, id);
    if (!next.length) {
      next = [id];
    }
    this._applySegIds = next;
  }

  protected override render() {
    const compact = this.compact;
    return html`
      <div class="wrap ${compact ? "compact" : ""}">
        <header class="head">
          ${compact
            ? html`<span class="card-label">Scenes</span>`
            : html`
                <div>
                  <h2>Scenes</h2>
                  <p class="hint">
                    Apply uses WLED crossfade (<code>tt</code>) on the device — one POST, no
                    client tweening.
                  </p>
                </div>
              `}
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
              ${compact ? "Save" : "Save current look"}
            </button>
          </div>
        </header>

        ${this._status
          ? html`<p class="status">${this._status}</p>`
          : null}
        ${this._toast
          ? html`<p class="toast" role="status">${this._toast}</p>`
          : null}

        ${!compact && this._segments.length
          ? html`
              <wled-segment-bar
                .segments=${this._segments}
                .selectedIds=${this._applySegIds}
                .segmentEntities=${this._snapshot?.segment_entities ?? []}
                hint="Apply scenes to highlighted segments"
                @segment-toggle=${(e: CustomEvent<{ id: number }>) =>
                  this._toggleApplySeg(e.detail.id)}
              ></wled-segment-bar>
            `
          : null}

        <wled-recent-scenes-row
          .controllerId=${this.controllerId}
          .scenes=${this._scenes}
          ?disabled=${this._busy}
          @scene-select=${(e: CustomEvent<{ sceneId: string }>) => {
            const scene = this._scenes.find((s) => s.id === e.detail.sceneId);
            if (scene) void this._apply(scene);
          }}
        ></wled-recent-scenes-row>

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
    const gradientStyle = scenePreviewGradientStyle(scene);
    const thumbUrl = sceneHasThumb(scene) ? scene.scene_thumb_url!.trim() : "";
    return html`
      <article class="tile" role="listitem">
        <button
          type="button"
          class="tile-main"
          aria-label=${`Apply scene ${scene.name}`}
          ?disabled=${this._busy}
          @click=${() => this._apply(scene)}
        >
          <div class="tile-visual">
            <div
              class="tile-gradient"
              style="background:${gradientStyle}"
              aria-hidden="true"
            ></div>
            ${thumbUrl
              ? html`<img
                  class="tile-thumb"
                  src=${thumbUrl}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  @error=${(e: Event) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = "none";
                  }}
                />`
              : null}
            <div class="tile-scrim">
              <span class="tile-name">${scene.name}</span>
              ${scene.seeded
                ? html`<span class="badge">Starter</span>`
                : null}
              <span class="tile-meta">${(ms / 1000).toFixed(1)}s fade</span>
            </div>
          </div>
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

  private _recentScenesRow(): WledRecentScenesRow | null {
    return (
      this.renderRoot.querySelector<WledRecentScenesRow>("wled-recent-scenes-row") ??
      null
    );
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
      pushRecentScene(this.controllerId, scene.id, scene.name);
      this._recentScenesRow()?.reload();
      await this._load();
      this._toast = `Applied ${scene.name}`;
      this.dispatchEvent(
        new CustomEvent("wled-preview-refresh", { bubbles: true, composed: true })
      );
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        const msg =
          (err as { message?: string }).message ||
          (err as Error).message ||
          "error";
        this._toast = `Apply failed: ${msg}`;
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
      .wrap.compact {
        max-width: none;
      }
      .wrap.compact .head {
        margin-bottom: 8px;
      }
      .wrap.compact .card-label {
        font-weight: 600;
        font-size: 0.85rem;
      }
      .wrap.compact .name-in {
        min-width: 6rem;
        padding: 6px 8px;
        font-size: 0.85rem;
      }
      .wrap.compact .primary {
        padding: 6px 10px;
        font-size: 0.85rem;
      }
      .wrap.compact .grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 8px;
      }
      .wrap.compact .tile-main {
        padding: 0;
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
      .status {
        font-size: 0.9rem;
        opacity: 0.85;
      }
      .toast {
        font-size: 0.9rem;
        opacity: 0.85;
        color: var(--primary-color);
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
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      }
      @container wled-studio (min-width: 600px) {
        .grid {
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        }
      }
      @container wled-studio (min-width: 900px) {
        .grid {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
      }
      .tile {
        display: flex;
        align-items: stretch;
        min-height: 120px;
        border-radius: var(--wled-radius-sm);
        overflow: hidden;
        border: 1px solid var(--wled-border);
        background: var(--wled-surface);
        transition: border-color var(--wled-transition-fast);
      }
      .tile:hover {
        border-color: color-mix(in srgb, var(--wled-accent) 35%, var(--wled-border));
      }
      .tile-main {
        flex: 1;
        display: block;
        min-width: 0;
        padding: 0;
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        text-align: left;
      }
      .tile-main:hover:not(:disabled) {
        background: transparent;
      }
      .tile-main:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }
      .tile-visual {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        min-height: 72px;
        overflow: hidden;
        background: var(--wled-surface-elevated);
      }
      .tile-gradient,
      .tile-thumb {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .tile-thumb {
        object-fit: cover;
        z-index: 1;
      }
      .tile-scrim {
        position: absolute;
        inset: auto 0 0;
        z-index: 2;
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 18px 10px 8px;
        background: linear-gradient(
          180deg,
          transparent 0%,
          color-mix(in srgb, rgb(0 0 0) 72%, transparent) 100%
        );
        color: var(--wled-text);
        pointer-events: none;
      }
      .tile-name {
        font-weight: 600;
        font-size: 0.9rem;
        line-height: 1.2;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
      }
      .badge {
        font-size: 0.62rem;
        opacity: 0.85;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .tile-meta {
        font-size: 0.68rem;
        opacity: 0.8;
      }
      .icon-btn {
        align-self: stretch;
        border: none;
        border-left: 1px solid var(--wled-border);
        background: transparent;
        color: var(--wled-text-muted);
        padding: 0 10px;
        cursor: pointer;
        transition: background var(--wled-transition-fast);
      }
      .icon-btn:hover:not(:disabled) {
        background: var(--wled-surface-elevated);
        color: var(--wled-text);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [VIEW_SCENES_TAG]: WledViewScenes;
  }
}

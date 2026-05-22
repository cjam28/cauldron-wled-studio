import { css, LitElement, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import { containerStyles } from "../styles/container.js";
import { motionStyles } from "../styles/motion.js";
import { wledDesignTokens } from "../styles/tokens.js";
import { RemoteModeController } from "../controllers/remote-mode.js";

const baseInteractionStyles = css`
  :host {
    --wled-transition-fast: var(--m-tap) ease;
    --wled-transition: var(--m-view-transition) ease;
  }

  button:focus-visible,
  [role="tab"]:focus-visible,
  .tile:focus-visible,
  .btn:focus-visible {
    outline: 2px solid var(--wled-accent);
    outline-offset: 2px;
  }

  .primary {
    padding: 8px 14px;
    border-radius: 8px;
    border: none;
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    cursor: pointer;
    font: inherit;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: transform var(--wled-transition-fast);
  }
  .primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .primary:active:not(:disabled) {
    transform: scale(0.97);
  }
`;

/**
 * Lifecycle base for every WLED Studio Lit component.
 * AbortController + rAF set + unsub set + IntersectionObserver + visibilitychange.
 */
export const sharedBaseStyles = [
  wledDesignTokens,
  containerStyles,
  motionStyles,
  baseInteractionStyles,
];

export abstract class BasePoweredElement extends LitElement {
  static override styles = sharedBaseStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;

  protected readonly abort = new AbortController();
  protected readonly rafIds = new Set<number>();
  protected readonly unsubs = new Set<() => void>();
  protected readonly remote = new RemoteModeController(this);

  private _io?: IntersectionObserver;
  private _visible = true;
  private _inView = true;

  override connectedCallback(): void {
    super.connectedCallback();
    this._bindVisibility();
    this._bindIntersection();
    this.remote.setHass(this.hass);
    this.onPoweredConnect();
  }

  override disconnectedCallback(): void {
    this.onPoweredDisconnect();
    this._io?.disconnect();
    this._io = undefined;
    this.abort.abort();
    for (const id of this.rafIds) cancelAnimationFrame(id);
    this.rafIds.clear();
    for (const u of this.unsubs) u();
    this.unsubs.clear();
    super.disconnectedCallback();
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has("hass")) {
      this.remote.setHass(this.hass);
    }
  }

  /** True when tab visible and element intersects viewport. */
  protected get isPowered(): boolean {
    return this._visible && this._inView;
  }

  protected scheduleRaf(fn: FrameRequestCallback): void {
    const id = requestAnimationFrame((t) => {
      this.rafIds.delete(id);
      if (!this.isConnected || this.abort.signal.aborted) return;
      fn(t);
    });
    this.rafIds.add(id);
  }

  protected addUnsub(fn: () => void): void {
    this.unsubs.add(fn);
  }

  protected onPoweredConnect(): void {
    /* subclass */
  }

  protected onPoweredDisconnect(): void {
    /* subclass */
  }

  private _bindVisibility(): void {
    const onVis = () => {
      this._visible = document.visibilityState === "visible";
      this.requestUpdate();
    };
    document.addEventListener("visibilitychange", onVis, {
      signal: this.abort.signal,
    });
    this._visible = document.visibilityState === "visible";
  }

  private _bindIntersection(): void {
    this._io = new IntersectionObserver(
      (entries) => {
        this._inView = entries.some((e) => e.isIntersecting);
        this.requestUpdate();
      },
      { threshold: 0.01 }
    );
    this._io.observe(this);
  }
}

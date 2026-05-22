import { css, html } from "lit";
import { state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { WLED_TOAST_EVENT, type WledToastDetail } from "../utils/toast.js";

export const WLED_TOAST_HOST_TAG = "wled-toast-host";

interface ToastEntry {
  id: number;
  message: string;
}

/** Fixed-bottom toast stack — listens for `wled-toast` events on the shadow root. */
@safeCustomElement(WLED_TOAST_HOST_TAG)
export class WledToastHost extends BasePoweredElement {
  @state() private _toasts: ToastEntry[] = [];

  private _nextId = 0;
  private _timers = new Map<number, number>();

  protected override onPoweredConnect(): void {
    const root = this.getRootNode();
    root.addEventListener(WLED_TOAST_EVENT, this._onToast as EventListener, {
      signal: this.abort.signal,
    });
  }

  protected override onPoweredDisconnect(): void {
    for (const timer of this._timers.values()) {
      window.clearTimeout(timer);
    }
    this._timers.clear();
  }

  private _onToast = (ev: Event): void => {
    const detail = (ev as CustomEvent<WledToastDetail>).detail;
    if (!detail?.message) return;
    const id = ++this._nextId;
    this._toasts = [...this._toasts, { id, message: detail.message }];
    const ms = this._toastDurationMs();
    const timer = window.setTimeout(() => this._dismiss(id), ms);
    this._timers.set(id, timer);
  };

  private _toastDurationMs(): number {
    const raw = getComputedStyle(this).getPropertyValue("--m-toast").trim();
    const parsed = Number.parseInt(raw, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 4000;
  }

  private _dismiss(id: number): void {
    const timer = this._timers.get(id);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      this._timers.delete(id);
    }
    this._toasts = this._toasts.filter((t) => t.id !== id);
  }

  protected override render() {
    if (!this._toasts.length) return null;
    return html`
      <div class="stack" aria-live="polite">
        ${this._toasts.map(
          (t) => html`
            <p class="toast" role="status">${t.message}</p>
          `
        )}
      </div>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      :host {
        position: fixed;
        inset: auto 12px 12px;
        z-index: 100;
        display: flex;
        justify-content: center;
        pointer-events: none;
      }
      .stack {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        gap: 8px;
        width: min(100%, 420px);
      }
      .toast {
        margin: 0;
        padding: 10px 14px;
        border-radius: var(--wled-radius-sm);
        background: var(--wled-surface-elevated);
        color: var(--wled-text);
        border: 1px solid var(--wled-border);
        box-shadow: var(--wled-shadow);
        font-size: 0.875rem;
        line-height: 1.35;
        pointer-events: auto;
        animation: wled-toast-in var(--m-view-transition) ease;
      }
      @keyframes wled-toast-in {
        from {
          opacity: 0;
          transform: translateY(12px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .toast {
          animation: none;
        }
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [WLED_TOAST_HOST_TAG]: WledToastHost;
  }
}

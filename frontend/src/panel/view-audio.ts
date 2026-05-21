import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";

@safeCustomElement("wled-view-audio")
export class WledViewAudio extends BasePoweredElement {
  @property() controllerId = "";
  @state() private _fft: number[] = Array(16).fill(0);
  @state() private _peak = 0;
  protected override onPoweredConnect(): void {
    const conn = this.hass?.connection;
    if (!conn?.subscribeEvents) return;
    const p = conn.subscribeEvents(
      (ev: { data?: Record<string, unknown> }) => {
        const d = ev.data ?? {};
        if (d.controller_id && d.controller_id !== this.controllerId) return;
        if (Array.isArray(d.fft)) {
          this._fft = (d.fft as number[]).slice(0, 16);
        }
        if (typeof d.sample_peak === "number") {
          this._peak = d.sample_peak;
        }
      },
      "wled_studio_audio_frame"
    );
    this.addUnsub(() => {
      void p.then((fn) => fn?.());
    });
  }

  protected override render() {
    const max = Math.max(1, ...this._fft);
    return html`
      <section class="audio">
        <p>16-band FFT (UDP audiosync, 10 Hz)</p>
        <div class="bars" role="img" aria-label="FFT levels">
          ${this._fft.map(
            (v, i) => html`
              <div
                class="bar"
                style="height:${Math.round((v / max) * 100)}%"
                title="Band ${i + 1}: ${v}"
              ></div>
            `
          )}
        </div>
        <p class="peak">Peak: ${this._peak}</p>
      </section>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .bars {
        display: flex;
        align-items: flex-end;
        gap: 4px;
        height: 120px;
      }
      .bar {
        flex: 1;
        min-width: 8px;
        background: var(--primary-color);
        border-radius: 4px 4px 0 0;
      }
      .peak {
        font-size: 0.85rem;
        opacity: 0.8;
      }
    `,
  ];
}

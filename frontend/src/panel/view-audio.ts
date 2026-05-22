import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";

const WLED_AUDIO_DOCS = "https://www.home-assistant.io/integrations/wled/#audio-reactive";

@safeCustomElement("wled-view-audio")
export class WledViewAudio extends BasePoweredElement {
  @property() controllerId = "";
  @state() private _fft: number[] = Array(16).fill(0);
  @state() private _peak = 0;
  @state() private _hasData = false;

  protected override onPoweredConnect(): void {
    const conn = this.hass?.connection;
    if (!conn?.subscribeEvents) return;
    const p = conn.subscribeEvents(
      (ev: { data?: Record<string, unknown> }) => {
        const d = ev.data ?? {};
        if (d.controller_id && d.controller_id !== this.controllerId) return;
        if (Array.isArray(d.fft)) {
          this._fft = (d.fft as number[]).slice(0, 16);
          while (this._fft.length < 16) this._fft.push(0);
        }
        if (typeof d.sample_peak === "number") {
          this._peak = d.sample_peak;
        }
        this._hasData = true;
      },
      "wled_studio_audio_frame"
    );
    this.addUnsub(() => {
      void p.then((fn) => fn?.());
    });
  }

  private _peakPct(): number {
    return Math.min(100, Math.round((this._peak / 255) * 100));
  }

  protected override render() {
    if (!this._hasData) {
      return html`
        <section class="audio empty">
          <h2>Music sync</h2>
          <p class="lead">No UDP audiosync packets yet.</p>
          <ol class="steps">
            <li>
              In WLED, enable <strong>Sync</strong> under Sound settings and set UDP
              port <code>11988</code> (AudioReactive v2).
            </li>
            <li>
              Point audiosync at this Home Assistant host (same LAN as the controller).
            </li>
            <li>Play audio near the microphone — bands update at 10 Hz.</li>
          </ol>
          <a
            class="primary"
            href=${WLED_AUDIO_DOCS}
            target="_blank"
            rel="noopener noreferrer"
          >
            WLED audio sync docs
          </a>
        </section>
      `;
    }

    const max = Math.max(1, ...this._fft);
    const peakPct = this._peakPct();
    return html`
      <section class="audio">
        <h2>Music sync</h2>
        <p class="lead">16-band FFT from UDP audiosync (10 Hz)</p>
        <div class="peak-row">
          <span class="peak-label">Peak</span>
          <div
            class="peak-meter"
            role="meter"
            aria-label="Sample peak level"
            aria-valuemin="0"
            aria-valuemax="255"
            aria-valuenow=${this._peak}
          >
            <div class="peak-fill" style="width:${peakPct}%"></div>
          </div>
          <span class="peak-value">${this._peak}</span>
        </div>
        <div class="bars" role="img" aria-label="FFT band levels">
          ${this._fft.map(
            (v, i) => html`
              <div class="bar-col">
                <div
                  class="bar"
                  style="height:${Math.round((v / max) * 100)}%"
                  title="Band ${i + 1}: ${v}"
                ></div>
                <span class="band-num">${i + 1}</span>
              </div>
            `
          )}
        </div>
      </section>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .audio h2 {
        margin: 0 0 6px;
        font-size: 1.15rem;
      }
      .lead {
        margin: 0 0 12px;
        opacity: 0.85;
        font-size: 0.9rem;
      }
      .empty .steps {
        margin: 0 0 16px;
        padding-left: 1.25rem;
        font-size: 0.9rem;
        opacity: 0.9;
      }
      .empty .steps li + li {
        margin-top: 8px;
      }
      .peak-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
      }
      .peak-label {
        font-size: 0.85rem;
        opacity: 0.8;
        min-width: 2.5rem;
      }
      .peak-meter {
        flex: 1;
        height: 10px;
        border-radius: 5px;
        background: var(--divider-color, rgba(255, 255, 255, 0.12));
        overflow: hidden;
      }
      .peak-fill {
        height: 100%;
        background: var(--primary-color);
        border-radius: 5px;
        transition: width 80ms linear;
      }
      .peak-value {
        font-size: 0.85rem;
        font-variant-numeric: tabular-nums;
        min-width: 2rem;
        text-align: right;
        opacity: 0.85;
      }
      .bars {
        display: flex;
        align-items: flex-end;
        gap: 4px;
        height: 120px;
      }
      .bar-col {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 0;
        height: 100%;
      }
      .bar {
        width: 100%;
        min-width: 8px;
        flex: 1;
        align-self: stretch;
        background: var(--primary-color);
        border-radius: 4px 4px 0 0;
      }
      .band-num {
        font-size: 0.65rem;
        opacity: 0.65;
        margin-top: 4px;
        font-variant-numeric: tabular-nums;
      }
    `,
  ];
}

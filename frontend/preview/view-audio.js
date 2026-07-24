import{b as e,i as t,_ as i,n as s,r as a}from"./wled-studio-core.js";import{B as r,g as o,a as n,w as l,v as c,t as p}from"./preview-bundle.js";const d=["Off","Normal","Vivid","Lazy"],h=["Off","Send","Receive"],u=["Linear","Square root","Logarithmic"],m=["Off","GEQ pulse","WaveSin","Sweep"];let f=class extends r{constructor(){super(...arguments),this.controllerId="",this._cfg={},this._info={},this._status="idle",this._busy=!1}onPoweredConnect(){this._load()}willUpdate(e){(e.has("connection")||e.has("controllerId"))&&this.connection&&this.controllerId&&this._load()}async _load(){if(this.connection&&this.controllerId){this._status="loading";try{const e=(await o(this.connection,this.controllerId)).state,t=e?.AudioReactive??{};this._cfg=function(e){return{inputLevel:"number"==typeof e.inputLevel?e.inputLevel:128,squelch:"number"==typeof e.squelch?e.squelch:10,gain:"number"==typeof e.gain?e.gain:40,AGC:"number"==typeof e.AGC?e.AGC:2,sync:"number"==typeof e.sync?e.sync:0,port:"number"==typeof e.port?e.port:11988,freqDist:"number"==typeof e.freqDist?e.freqDist:1,limiterRise:"number"==typeof e.limiterRise?e.limiterRise:60,limiterFall:"number"==typeof e.limiterFall?e.limiterFall:800,PalAR:!0===e.PalAR}}(t),this._info=t,this._status="ready"}catch(e){this._status=e instanceof Error?e.message:"error"}}}async _patch(e){if(this.connection&&this.controllerId&&!this._busy){this._busy=!0,this._cfg={...this._cfg,...e};try{await n(this.connection,this.controllerId,e)}catch(e){l(this,e instanceof Error?e.message:String(e))}finally{this._busy=!1}}}_slider(t,i,s,a,r=""){const o=this._cfg[t]??s;return e`
      <label class="ctrl">
        <span class="ctrl-label">${i}<span class="ctrl-val">${o}${r}</span></span>
        <ha-slider
          min=${s}
          max=${a}
          step="1"
          .value=${o}
          @change=${e=>{const i=Number(e.target.value);this._patch({[t]:i})}}
        ></ha-slider>
      </label>
    `}_select(t,i,s){const a=this._cfg[t]??0;return e`
      <label class="ctrl">
        <span class="ctrl-label">${i}</span>
        <select
          .value=${String(a)}
          @change=${e=>{const i=Number(e.target.value);this._patch({[t]:i})}}
        >
          ${s.map((t,i)=>e`<option value=${i} ?selected=${i===a}>${t}</option>`)}
        </select>
      </label>
    `}_checkbox(t,i){const s=Boolean(this._cfg[t]);return e`
      <label class="ctrl-check">
        <input
          type="checkbox"
          .checked=${s}
          @change=${e=>{this._patch({[t]:e.target.checked})}}
        />
        <span>${i}</span>
      </label>
    `}render(){return"loading"===this._status?e`<p class="muted">Loading audio settings…</p>`:e`
      <section class="ar" aria-label="AudioReactive usermod controls">
        <h3>AudioReactive</h3>
        <p class="hint">
          Tunes the AudioReactive usermod on the device — affects every reactive effect.
        </p>
        <div class="grid">
          ${this._slider("inputLevel","GEQ input level",0,255)}
          ${this._slider("squelch","Squelch (noise floor)",0,255)}
          ${this._slider("gain","Gain",0,255)}
          ${this._select("AGC","AGC mode",d)}
          ${this._select("freqDist","Frequency scale",u)}
          ${this._slider("limiterRise","Limiter rise",1,1e3," ms")}
          ${this._slider("limiterFall","Limiter fall",1,1e3," ms")}
          ${this._select("sync","Audio sync",h)}
          ${this._slider("port","Sync port",1,65535)}
          ${this._checkbox("PalAR","AudioReactive palette injection")}
        </div>
        ${"number"==typeof this._info.samplePeak?e`
              <p class="meta">
                Peak ${this._info.samplePeak} · FPS ${this._info.FPS??"?"} · Source
                ${this._info.audioSource??"?"}
              </p>
            `:null}
      </section>
    `}static simulationLabels(){return m}static{this.styles=[...c,t`
      .ar h3 {
        margin: 0 0 6px;
        font-size: 1rem;
      }
      .hint {
        margin: 0 0 12px;
        opacity: 0.75;
        font-size: 0.82rem;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 10px 16px;
      }
      .ctrl {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.8rem;
      }
      .ctrl-label {
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }
      .ctrl-val {
        font-variant-numeric: tabular-nums;
        opacity: 0.75;
      }
      .ctrl-check {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.85rem;
      }
      select {
        padding: 4px 6px;
        border-radius: 6px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
        font-size: 0.82rem;
      }
      .meta {
        margin: 10px 0 0;
        font-size: 0.75rem;
        opacity: 0.65;
      }
      .muted {
        opacity: 0.7;
        font-size: 0.85rem;
      }
    `]}};i([s({attribute:!1})],f.prototype,"connection",void 0),i([s()],f.prototype,"controllerId",void 0),i([a()],f.prototype,"_cfg",void 0),i([a()],f.prototype,"_info",void 0),i([a()],f.prototype,"_status",void 0),i([a()],f.prototype,"_busy",void 0),f=i([p("wled-audio-reactive-controls")],f);let y=class extends r{constructor(){super(...arguments),this.controllerId="",this._fft=Array(16).fill(0),this._peak=0,this._hasData=!1}onPoweredConnect(){const e=this.hass?.connection;if(!e?.subscribeEvents)return;const t=e.subscribeEvents(e=>{const t=e.data??{};if(!t.controller_id||t.controller_id===this.controllerId){if(Array.isArray(t.fft))for(this._fft=t.fft.slice(0,16);this._fft.length<16;)this._fft.push(0);"number"==typeof t.sample_peak&&(this._peak=t.sample_peak),this._hasData=!0}},"wled_studio_audio_frame");this.addUnsub(()=>{t.then(e=>e?.())})}_peakPct(){return Math.min(100,Math.round(this._peak/255*100))}_renderReactiveCtl(){return this.connection&&this.controllerId?e`
      <wled-audio-reactive-controls
        .connection=${this.connection}
        .controllerId=${this.controllerId}
      ></wled-audio-reactive-controls>
    `:null}render(){if(!this._hasData)return e`
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
            href=${"https://www.home-assistant.io/integrations/wled/#audio-reactive"}
            target="_blank"
            rel="noopener noreferrer"
          >
            WLED audio sync docs
          </a>
          ${this._renderReactiveCtl()}
        </section>
      `;const t=Math.max(1,...this._fft),i=this._peakPct();return e`
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
            <div class="peak-fill" style="width:${i}%"></div>
          </div>
          <span class="peak-value">${this._peak}</span>
        </div>
        <div class="bars" role="img" aria-label="FFT band levels">
          ${this._fft.map((i,s)=>e`
              <div class="bar-col">
                <div
                  class="bar"
                  style="height:${Math.round(i/t*100)}%"
                  title="Band ${s+1}: ${i}"
                ></div>
                <span class="band-num">${s+1}</span>
              </div>
            `)}
        </div>
        ${this._renderReactiveCtl()}
      </section>
    `}static{this.styles=[...c,t`
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
    `]}};i([s({attribute:!1})],y.prototype,"connection",void 0),i([s()],y.prototype,"controllerId",void 0),i([a()],y.prototype,"_fft",void 0),i([a()],y.prototype,"_peak",void 0),i([a()],y.prototype,"_hasData",void 0),y=i([p("wled-view-audio")],y);export{y as WledViewAudio};
//# sourceMappingURL=view-audio.js.map

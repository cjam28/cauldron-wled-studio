import{b as s,i as t,_ as e,n as i,d as a}from"./wled-studio-core.js";import{B as r,n as o,d,M as n,K as l}from"./geometry-preview.js";let h=class extends r{constructor(){super(...arguments),this.controllerId="",this._minutes=15,this._status="",this._fading=!1,this._fadeProgress=0}async _sleepFade(){if(this.connection&&this.controllerId&&!this._fading){this._status="Starting sleep fade…",this._fading=!0,this._fadeProgress=0;try{const s=await o(this.connection,this.controllerId),t=s.state?.bri??s.segments?.[0]?.bri??128,e=Math.max(4,Math.min(30,Math.floor(2*this._minutes))),i=60*this._minutes*1e3/e;for(let s=0;s<=e;s++){const a=Math.round(t*(1-s/e));await d(this.connection,this.controllerId,{bri:a,on:s<e,tt:Math.min(25,Math.ceil(i/100))}),this._fadeProgress=Math.round(s/e*100),this._status=`Sleep fade ${this._fadeProgress}% — ${this._minutes} min total`,s<e&&await new Promise(s=>setTimeout(s,i))}this._fadeProgress=100,this._status=`Sleep fade complete (${this._minutes} min)`}catch(s){this._status=s instanceof Error?s.message:String(s)}finally{this._fading=!1}}}render(){return s`
      <section class="schedules">
        <h2>Schedules</h2>
        <p class="lead">
          Sleep timer fades brightness to off over the selected duration using device-side
          <code>tt</code> crossfade steps.
        </p>
        <div class="card">
          <h3>Sleep timer</h3>
          <label>
            Minutes
            <input
              type="number"
              min="1"
              max="120"
              ?disabled=${this._fading}
              .value=${String(this._minutes)}
              @change=${s=>{this._minutes=parseInt(s.target.value,10)}}
            />
          </label>
          <button
            type="button"
            class="primary"
            ?disabled=${this._fading}
            @click=${()=>this._sleepFade()}
          >
            Start sleep fade
          </button>
          ${this._fading?s`
                <div
                  class="progress-wrap"
                  role="progressbar"
                  aria-label="Sleep fade progress"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow=${this._fadeProgress}
                >
                  <div class="progress-bar" style="width:${this._fadeProgress}%"></div>
                </div>
              `:null}
        </div>
        <p class="status">${this._status}</p>
        <p class="hint">
          Sunrise alarms and multi-controller groups are planned; use HA automations with
          <code>wled_studio.notify</code> for doorbell flashes today.
        </p>
      </section>
    `}static{this.styles=[...n,t`
      .schedules h2 {
        margin: 0 0 8px;
      }
      .lead {
        opacity: 0.85;
      }
      .card {
        padding: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        margin: 12px 0;
      }
      .card h3 {
        margin: 0 0 8px;
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 8px;
      }
      .progress-wrap {
        margin-top: 12px;
        height: 8px;
        border-radius: 4px;
        background: var(--divider-color, rgba(255, 255, 255, 0.12));
        overflow: hidden;
      }
      .progress-bar {
        height: 100%;
        background: var(--primary-color);
        border-radius: 4px;
        transition: width 200ms ease;
      }
      .status {
        font-size: 0.85rem;
      }
      .hint {
        font-size: 0.85rem;
        opacity: 0.75;
      }
    `]}};e([i({attribute:!1})],h.prototype,"connection",void 0),e([i()],h.prototype,"controllerId",void 0),e([a()],h.prototype,"_minutes",void 0),e([a()],h.prototype,"_status",void 0),e([a()],h.prototype,"_fading",void 0),e([a()],h.prototype,"_fadeProgress",void 0),h=e([l("wled-view-schedules")],h);export{h as WledViewSchedules};
//# sourceMappingURL=view-schedules.js.map

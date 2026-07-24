import{b as t,i as s,_ as e,n as i,d as r}from"./wled-studio-core.js";import{B as a,r as o,N as n,L as c}from"./geometry-preview.js";import{h as u,t as h}from"./paint.js";let l=class extends a{constructor(){super(...arguments),this.controllerId="",this._thumbStatus="",this._capturing=!1}onPoweredConnect(){const t=this.hass?.connection;if(!t?.subscribeEvents)return;const s=t.subscribeEvents(t=>{const s=t.data??{},e=String(s.status??"");"started"===e?(this._thumbStatus=`Capturing 0/${s.total??"?"}`,this._capturing=!0):"progress"===e?(this._thumbStatus=`${s.done}/${s.total}: ${s.name}`,this._capturing=!0):"complete"===e||"cancelled"===e?(this._thumbStatus="complete"===e?"Thumbnails complete — open Effects to view tiles":"Cancelled",this._capturing=!1):"error"===e&&(this._thumbStatus=String(s.message??"Error"),this._capturing=!1),this.requestUpdate()},"wled_studio_thumb_progress");this.addUnsub(()=>{s.then(t=>t?.())})}async _recapture(){if(this.connection&&this.controllerId){this._capturing=!0,this._thumbStatus="Starting capture…";try{await u(this.connection,this.controllerId)}catch(t){this._capturing=!1,this._thumbStatus=o(t)}}}async _cancelCapture(){if(this.connection&&this.controllerId)try{await h(this.connection,this.controllerId),this._thumbStatus="Cancel requested"}catch(t){this._thumbStatus=o(t)}finally{this._capturing=!1}}_clearOnboard(){localStorage.removeItem("wled_studio.onboarded"),this._thumbStatus="Onboarding flag cleared — reload Studio"}render(){return t`
      <section class="settings">
        <h2>Settings</h2>
        <div class="card">
          <h3>Effect thumbnails</h3>
          <p>Captures ~2s WebP loops per effect (several minutes total).</p>
          <div class="row">
            <button
              type="button"
              class="primary"
              ?disabled=${this._capturing}
              @click=${()=>this._recapture()}
            >
              Recapture thumbnails
            </button>
            ${this._capturing?t`
                  <button type="button" @click=${()=>this._cancelCapture()}>
                    Cancel
                  </button>
                `:null}
          </div>
          <p class="status">${this._thumbStatus}</p>
        </div>
        <div class="card">
          <h3>Onboarding</h3>
          <button type="button" @click=${()=>this._clearOnboard()}>
            Reset first-run wizard
          </button>
        </div>
      </section>
    `}static{this.styles=[...n,s`
      .settings h2 {
        margin: 0 0 12px;
      }
      .card {
        padding: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        margin-bottom: 12px;
      }
      .card h3 {
        margin: 0 0 8px;
        font-size: 1rem;
      }
      .row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .status {
        font-size: 0.85rem;
        opacity: 0.8;
      }
    `]}};e([i({attribute:!1})],l.prototype,"connection",void 0),e([i()],l.prototype,"controllerId",void 0),e([r()],l.prototype,"_thumbStatus",void 0),e([r()],l.prototype,"_capturing",void 0),l=e([c("wled-view-settings")],l);export{l as WledViewSettings};
//# sourceMappingURL=view-settings.js.map

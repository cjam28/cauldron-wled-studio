import{b as t,i as s,_ as e,n as i,r}from"./wled-studio-core.js";import{B as a,i as o,v as n,t as c}from"./preview-bundle.js";import{f as u,t as l}from"./paint.js";let p=class extends a{constructor(){super(...arguments),this.controllerId="",this._thumbStatus="",this._capturing=!1}onPoweredConnect(){const t=this.hass?.connection;if(!t?.subscribeEvents)return;const s=t.subscribeEvents(t=>{const s=t.data??{},e=String(s.status??"");"started"===e?(this._thumbStatus=`Capturing 0/${s.total??"?"}`,this._capturing=!0):"progress"===e?(this._thumbStatus=`${s.done}/${s.total}: ${s.name}`,this._capturing=!0):"complete"===e||"cancelled"===e?(this._thumbStatus="complete"===e?"Thumbnails complete — open Effects to view tiles":"Cancelled",this._capturing=!1):"error"===e&&(this._thumbStatus=String(s.message??"Error"),this._capturing=!1),this.requestUpdate()},"wled_studio_thumb_progress");this.addUnsub(()=>{s.then(t=>t?.())})}async _recapture(){if(this.connection&&this.controllerId){this._capturing=!0,this._thumbStatus="Starting capture…";try{await u(this.connection,this.controllerId)}catch(t){this._capturing=!1,this._thumbStatus=o(t)}}}async _cancelCapture(){this.connection&&this.controllerId&&(await l(this.connection,this.controllerId),this._capturing=!1,this._thumbStatus="Cancel requested")}_clearOnboard(){localStorage.removeItem("wled_studio.onboarded"),this._thumbStatus="Onboarding flag cleared — reload Studio"}render(){return t`
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
    `]}};e([i({attribute:!1})],p.prototype,"connection",void 0),e([i()],p.prototype,"controllerId",void 0),e([r()],p.prototype,"_thumbStatus",void 0),e([r()],p.prototype,"_capturing",void 0),p=e([c("wled-view-settings")],p);export{p as WledViewSettings};
//# sourceMappingURL=view-settings.js.map

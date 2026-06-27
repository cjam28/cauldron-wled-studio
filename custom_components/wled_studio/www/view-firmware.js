import{b as e,i as t,_ as i,n as o,d as r}from"./wled-studio-core.js";import{B as s,S as n,r as a,M as l,K as c}from"./geometry-preview.js";const d="wled-view-firmware";let p=class extends s{constructor(){super(...arguments),this.controllerId="",this.host="",this.controllerTitle="",this._frameKey=0,this._skinStatus="",this._skinBusy=!1}onPoweredConnect(){this._maybeApplyEmbedSkin()}updated(e){(e.has("connection")||e.has("controllerId"))&&this.connection&&this.controllerId&&this._maybeApplyEmbedSkin()}_skinStorageKey(){return`wled_studio.embed_skin_applied.${this.controllerId}`}async _maybeApplyEmbedSkin(){if(this.connection&&this.controllerId&&this.host){try{if(localStorage.getItem(this._skinStorageKey()))return}catch{}await this._applyEmbedSkin(!0)}}async _applyEmbedSkin(e=!1){if(this.connection&&this.controllerId){this._skinBusy=!0,e||(this._skinStatus="Applying outline style to WLED…");try{await this.connection.sendMessagePromise({type:"wled_studio/apply_embed_skin",schema_version:n,controller_id:this.controllerId});try{localStorage.setItem(this._skinStorageKey(),"1")}catch{}this._skinStatus="Segment selection uses outline only (skin.css on device). Reload if needed.",this._reloadFrame()}catch(e){this._skinStatus=a(e)}finally{this._skinBusy=!1}}}_firmwareUrl(){const e=(this.host??"").trim();if(!e)return"";const t=/^https?:\/\//i.test(e)?e:`http://${e}`;if(!this._frameKey)return t;const i=t.includes("?")?"&":"?";return`${t}${i}_reload=${this._frameKey}`}_reloadFrame(){this._frameKey+=1}render(){const t=this._firmwareUrl(),i=this.controllerTitle||"WLED controller";return e`
      <section class="firmware" aria-label="WLED firmware UI">
        <header class="head">
          <h2>Controller</h2>
          <p class="hint">
            Native WLED web UI for <strong>${i}</strong>. Selected segments use
            an outline only (no gray fill) after Studio applies
            <code>skin.css</code> once per controller. Some browsers block HTTP
            devices inside HTTPS Home Assistant — use
            <strong>Open in new tab</strong> if the frame stays blank.
          </p>
        </header>

        ${t?e`
              <div class="toolbar">
                <a class="primary" href=${t} target="_blank" rel="noopener noreferrer">
                  <ha-icon icon="mdi:open-in-new"></ha-icon>
                  Open in new tab
                </a>
                <button
                  type="button"
                  class="ghost"
                  ?disabled=${this._skinBusy}
                  @click=${()=>this._applyEmbedSkin(!1)}
                >
                  <ha-icon icon="mdi:format-textbox"></ha-icon>
                  Outline segments
                </button>
                <button type="button" class="ghost" @click=${this._reloadFrame}>
                  <ha-icon icon="mdi:refresh"></ha-icon>
                  Reload
                </button>
                <span class="url" title=${t}>${t}</span>
              </div>
              ${this._skinStatus?e`<p class="skin-status">${this._skinStatus}</p>`:null}
              <div class="frame-wrap">
                <iframe
                  src=${t}
                  title=${`WLED firmware — ${i}`}
                  loading="lazy"
                  referrerpolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                ></iframe>
              </div>
            `:e`
              <p class="empty">
                No host address for this controller. Reload the integration or pick
                another device in the header.
              </p>
            `}
      </section>
    `}static{this.styles=[...l,t`
      .firmware {
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-height: 0;
      }
      .head h2 {
        margin: 0 0 6px;
        font-size: 1.15rem;
      }
      .hint {
        margin: 0;
        font-size: 0.88rem;
        opacity: 0.8;
        max-width: 42rem;
      }
      .hint code {
        font-size: 0.85em;
      }
      .toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
      }
      .ghost {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 0.88rem;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
      }
      .ghost {
        border: 1px solid var(--divider-color);
        background: var(--secondary-background-color);
      }
      .ghost:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .skin-status {
        margin: 0;
        font-size: 0.82rem;
        opacity: 0.75;
      }
      .url {
        font-size: 0.78rem;
        opacity: 0.65;
        word-break: break-all;
        flex: 1;
        min-width: 8rem;
      }
      .frame-wrap {
        flex: 1;
        min-height: min(72vh, 720px);
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid var(--divider-color);
        background: #111;
      }
      iframe {
        display: block;
        width: 100%;
        height: min(72vh, 720px);
        border: none;
        background: #111;
      }
      .empty {
        opacity: 0.75;
        font-size: 0.9rem;
      }
    `]}};i([o({attribute:!1})],p.prototype,"connection",void 0),i([o()],p.prototype,"controllerId",void 0),i([o()],p.prototype,"host",void 0),i([o()],p.prototype,"controllerTitle",void 0),i([r()],p.prototype,"_frameKey",void 0),i([r()],p.prototype,"_skinStatus",void 0),i([r()],p.prototype,"_skinBusy",void 0),p=i([c(d)],p);export{d as VIEW_FIRMWARE_TAG,p as WledViewFirmware};
//# sourceMappingURL=view-firmware.js.map

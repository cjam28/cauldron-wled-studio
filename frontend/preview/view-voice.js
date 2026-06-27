import{b as e,i as t,_ as i,n as o,r as s}from"./wled-studio-core.js";import{B as n,u as c,v as r,t as a}from"./preview-bundle.js";let d=class extends n{constructor(){super(...arguments),this.controllerId="",this.masterEntity="",this._scenes=[],this._copied=""}async onPoweredConnect(){if(this.connection&&this.controllerId)try{this._scenes=await c(this.connection,this.controllerId)}catch{this._scenes=[]}}async _copy(e,t){if(e)try{await navigator.clipboard.writeText(e),this._copied=t,window.setTimeout(()=>{this._copied===t&&(this._copied="")},2e3)}catch{this._copied=""}}render(){const t=this.masterEntity.trim();return e`
      <section class="voice">
        <h2>Voice &amp; Assist</h2>
        <p>
          Saved scenes are exposed as <code>scene.*</code> entities. Add aliases in
          Settings → Devices &amp; services → Entities for Assist phrases like
          “party mode” or “movie time”.
        </p>
        <p class="hint">
          Sentence trigger (integration): <em>make {entity} {effect}</em>
        </p>
        <p>
          <a
            class="docs-link"
            href=${"https://www.home-assistant.io/voice_control/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Home Assistant Assist documentation
          </a>
        </p>

        ${t?e`
              <div class="entity-row">
                <div class="entity-meta">
                  <span class="entity-label">Master light</span>
                  <code class="entity-id">${t}</code>
                </div>
                <button
                  type="button"
                  class="copy-btn"
                  aria-label="Copy master entity id"
                  @click=${()=>this._copy(t,"master")}
                >
                  <ha-icon icon="mdi:content-copy"></ha-icon>
                  ${"master"===this._copied?"Copied":"Copy"}
                </button>
              </div>
            `:null}

        <ul>
          ${this._scenes.map(t=>e`
              <li>
                <div class="scene-row">
                  <div class="scene-meta">
                    <strong>${t.name}</strong>
                    <code class="id">scene.wled_studio_${t.id}</code>
                  </div>
                  <button
                    type="button"
                    class="copy-btn"
                    aria-label=${`Copy entity id for ${t.name}`}
                    @click=${()=>this._copy(`scene.wled_studio_${t.id}`,`scene-${t.id}`)}
                  >
                    <ha-icon icon="mdi:content-copy"></ha-icon>
                    ${this._copied===`scene-${t.id}`?"Copied":"Copy"}
                  </button>
                </div>
              </li>
            `)}
        </ul>
      </section>
    `}static{this.styles=[...r,t`
      .voice h2 {
        margin: 0 0 8px;
        font-size: 1.15rem;
      }
      .hint {
        opacity: 0.85;
      }
      .docs-link {
        color: var(--primary-color);
      }
      ul {
        padding-left: 0;
        list-style: none;
        margin: 16px 0 0;
      }
      li + li {
        margin-top: 10px;
      }
      .entity-row,
      .scene-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .entity-row {
        padding: 10px 12px;
        margin: 12px 0;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
      }
      .entity-label {
        display: block;
        font-size: 0.8rem;
        opacity: 0.75;
        margin-bottom: 2px;
      }
      .entity-id,
      .id {
        font-size: 0.8rem;
        opacity: 0.85;
        font-family: monospace;
        word-break: break-all;
      }
      .copy-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 6px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--secondary-background-color);
        color: inherit;
        cursor: pointer;
        font-size: 0.82rem;
      }
      .copy-btn ha-icon {
        --mdc-icon-size: 16px;
      }
    `]}};i([o({attribute:!1})],d.prototype,"connection",void 0),i([o()],d.prototype,"controllerId",void 0),i([o()],d.prototype,"masterEntity",void 0),i([s()],d.prototype,"_scenes",void 0),i([s()],d.prototype,"_copied",void 0),d=i([a("wled-view-voice")],d);export{d as WledViewVoice};
//# sourceMappingURL=view-voice.js.map

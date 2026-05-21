import{B as e,b as t,s as o,i,_ as a,n as r,r as n,t as s,a as d,P as c,W as l}from"./wled-studio-panel.js";const p="wled-studio-card";let u=class extends e{constructor(){super(...arguments),this._pingOk=!1}setConfig(e){if(!e.type?.startsWith("custom:"))throw new Error("Invalid card type");this.config=e}getCardSize(){return 4}onPoweredConnect(){this._ping()}async _ping(){if(this.hass?.connection){try{await this.hass.connection.sendMessagePromise({type:"wled_studio/ping",schema_version:1}),this._pingOk=!0}catch{this._pingOk=!1}this.requestUpdate()}}render(){const e=this.config?.controller??"WLED Studio",o=this.remote.state;return t`
      <div class="card" role="region" aria-label="WLED Studio card">
        <header class="header">
          <ha-icon icon="mdi:led-strip-variant"></ha-icon>
          <span class="title">${e}</span>
          ${o.isRemote?t`<span class="badge" aria-label="Remote mode">Remote</span>`:null}
        </header>
        <p class="placeholder">
          ${this._pingOk?"Integration connected. Live preview arrives in Phase 1.":"Add WLED Studio integration and attach to a WLED device."}
        </p>
        <button
          class="studio-link"
          @click=${this._openStudio}
          aria-label="Open WLED Studio panel"
        >
          Open Studio
        </button>
      </div>
    `}_openStudio(){history.pushState(null,"","/wled-studio"),window.dispatchEvent(new CustomEvent("location-changed"))}static{this.styles=[...o,i`
        .card {
          padding: 12px 16px;
          background: var(--card-background-color, var(--ha-card-background));
          border-radius: var(--ha-card-border-radius, 12px);
          box-shadow: var(--ha-card-box-shadow, none);
        }
        .header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .title {
          font-weight: 600;
          flex: 1;
        }
        .badge {
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 999px;
          background: var(--warning-color, orange);
          color: var(--text-primary-color);
        }
        .placeholder {
          opacity: 0.8;
          margin: 0 0 12px;
          font-size: 0.875rem;
        }
        .studio-link {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 8px;
          background: var(--primary-color);
          color: var(--text-primary-color, #fff);
          cursor: pointer;
          transition: opacity var(--m-tap) ease;
        }
        .studio-link:focus-visible {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }
      `]}};function h(){return{type:`custom:${p}`,controller:"",height:56}}a([r({attribute:!1})],u.prototype,"config",void 0),a([n()],u.prototype,"_pingOk",void 0),u=a([s(p)],u);let g=class extends d{setConfig(e){this._config={...e}}render(){return t`
      <div class="editor">
        <p>Configure WLED Studio card (Phase 0 scaffold).</p>
        <ha-textfield
          .label=${"Controller entity (optional)"}
          .value=${this._config.controller??""}
          @value-changed=${this._onController}
        ></ha-textfield>
      </div>
    `}_onController(e){const t=e.detail.value;this._fire({...this._config,controller:t})}_fire(e){const t=new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0});this.dispatchEvent(t)}};a([r({attribute:!1})],g.prototype,"hass",void 0),a([n()],g.prototype,"_config",void 0),g=a([s("wled-studio-card-editor")],g),customElements.get(p)||customElements.define(p,u),customElements.get(c)||customElements.define(c,l),window.wledStudioCard=u,console.info("[wled-studio] frontend bundle loaded",{card:p,panel:c});export{p as CARD_TAG,c as PANEL_TAG,u as WledStudioCard,l as WledStudioPanel,h as getStubConfig};
//# sourceMappingURL=wled-studio-card.js.map

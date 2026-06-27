import{c as t,A as i,b as o,i as e,_ as s,n,d as r}from"./wled-studio-core.js";import{z as a,R as d,j as c}from"./geometry-preview.js";import"./view-paint.js";import"./paint.js";const h="wled-painter-card";class l extends t{constructor(){super(...arguments),this._controllerId="",this._hint="Connecting to WLED Studio…",this._resolving=!1}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config=t,this._resolvedKey=void 0}getCardSize(){return 10}static getStubConfig(){return{type:`custom:${h}`,controller:"Cloud"}}updated(t){(t.has("hass")||t.has("_config"))&&this.hass?.connection&&this._resolve()}_pick(t){const i=(this._config?.controller??"").trim();if(!i)return t[0];const o=i.toLowerCase();return t.find(t=>{const e=String(t.title??"");return String(t.entry_id??"")===i||e===i||e.toLowerCase().includes(o)||e.toLowerCase().endsWith(`— ${o}`)||e.toLowerCase().endsWith(`- ${o}`)})??t[0]}async _resolve(){const t=(this._config?.controller??"").trim();if(this._resolving)return;if(this._controllerId&&this._resolvedKey===t)return;const i=this.hass?.connection;if(!i)return;this._resolving=!0;const o=[0,400,1200,2500];for(const i of o){if(i>0&&await new Promise(t=>setTimeout(t,i)),!this.hass?.connection)break;try{const i=await a(this.hass.connection),o=this._pick(i);if(o?.entry_id)return this._controllerId=String(o.entry_id),this._resolvedKey=t,this._hint="",this._resolving=!1,void this.requestUpdate();this._hint=i.length?"WLED Studio controller not found.":"No WLED Studio controllers found. Add the integration under Settings → Devices & services."}catch{this._hint="Connecting to WLED Studio…"}this.requestUpdate()}this._resolving=!1}render(){return this._config&&this.hass?this._controllerId?o`
      <ha-card class="wled-painter-card">
        <wled-view-paint
          .connection=${this.hass.connection}
          .hass=${this.hass}
          .controllerId=${this._controllerId}
        ></wled-view-paint>
      </ha-card>
    `:o`<ha-card class="wled-painter-card"
        ><div class="hint">${this._hint}</div></ha-card
      >`:i}static{this.styles=[d,e`
      :host {
        display: block;
      }
      ha-card.wled-painter-card {
        background: transparent;
        border: none;
        box-shadow: none;
        padding: 4px 2px;
      }
      .hint {
        padding: 18px 14px;
        font-size: 0.9rem;
        opacity: 0.82;
      }
      wled-view-paint {
        display: block;
      }
    `]}}s([n({attribute:!1})],l.prototype,"hass",void 0),s([r()],l.prototype,"_config",void 0),s([r()],l.prototype,"_controllerId",void 0),s([r()],l.prototype,"_hint",void 0),c(h,l),window.customCards=window.customCards||[],window.customCards.some(t=>t.type===h)||window.customCards.push({type:h,name:"WLED Painter",description:"Per-LED painter for a WLED Studio controller",preview:!1}),console.info("[wled-studio] painter bundle loaded",{card:h});
//# sourceMappingURL=wled-painter-card.js.map

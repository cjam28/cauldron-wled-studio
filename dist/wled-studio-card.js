import{B as t,b as e,s as i,i as s,_ as n,n as o,r,t as a,e as l,a as c,P as d,W as h}from"./wled-studio-panel.js";const u=/^[0-9a-fA-F]+$/;function p(t,e,i,s){let n,o=!1;const r=async()=>{n?.(),n=void 0,o||(n=await t.subscribeMessage(t=>{const e=t.event?.data??("wled_studio_live_frame"===t.type?t.data:void 0);if(!e)return;const s=function(t){if(!t||"object"!=typeof t)return null;const e=t,i=e.leds;if(!Array.isArray(i)||0===i.length)return null;const s=[];let n=3;for(const t of i){if("string"!=typeof t)continue;const e=t.trim().replace(/^#/,"");if(e&&e.length%2==0&&u.test(e)){if(8===e.length)n=4;else if(6!==e.length)continue;s.push(e.toLowerCase())}}if(0===s.length)return null;let o=s.length;if(void 0!==e.n){const t=Number(e.n);Number.isFinite(t)&&t>0&&(o=t)}return{leds_hex:s,n:o,channels:n,scale:o/s.length,count:s.length}}(e);s&&i({...s,entry_id:e.entry_id,controller_id:e.controller_id,fps:e.fps})},{type:"wled_studio/subscribe_live",schema_version:1,controller_id:e,remote:s?.remote??!1}))};r();const a=function(t,e){const i=()=>e();return t.addEventListener("ready",i),()=>t.removeEventListener("ready",i)}(t,()=>{r()});return()=>{o=!0,a(),n?.(),n=void 0}}let _=class extends t{constructor(){super(...arguments),this.heightPx=56,this.pixelCount=210,this._status="waiting",this._raf=0}setFrame(t){t&&this.isPowered&&(this._lastPixels=function(t,e){const i=new Uint8ClampedArray(4*e);for(let s=0;s<e;s++){const e=Math.min(t.count-1,Math.max(0,Math.round(s/t.scale))),n=t.leds_hex[e]??"000000",o=4*s;8===n.length?(i[o]=parseInt(n.slice(0,2),16),i[o+1]=parseInt(n.slice(2,4),16),i[o+2]=parseInt(n.slice(4,6),16),i[o+3]=parseInt(n.slice(6,8),16)):(i[o]=parseInt(n.slice(0,2),16),i[o+1]=parseInt(n.slice(2,4),16),i[o+2]=parseInt(n.slice(4,6),16),i[o+3]=255)}return i}(t,this.pixelCount),this._status="live",this._schedulePaint())}setStatus(t){this._status=t,this.requestUpdate()}onPoweredConnect(){this._schedulePaint()}onPoweredDisconnect(){this._raf&&cancelAnimationFrame(this._raf),this._raf=0}firstUpdated(){this._canvas=this.renderRoot.querySelector("canvas")??void 0,this._canvas&&(this._ctx=this._canvas.getContext("2d",{alpha:!1})??void 0)}_schedulePaint(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this._paint()}))}_paint(){const t=this._ctx,e=this._canvas;if(!t||!e||!this._lastPixels)return;const i=e.width,s=e.height,n=this.pixelCount,o=i/n;t.fillStyle="#111",t.fillRect(0,0,i,s);for(let e=0;e<n;e++){const i=4*e,n=this._lastPixels[i],r=this._lastPixels[i+1],a=this._lastPixels[i+2];t.fillStyle=`rgb(${n},${r},${a})`,t.shadowColor=`rgba(${n},${r},${a},0.85)`,t.shadowBlur=this.remote.state.disableBloom?0:6,t.fillRect(e*o,2,Math.max(1,o-1),s-4)}t.shadowBlur=0}render(){const t=Math.max(320,3*this.pixelCount);return e`
      <div class="wrap" role="img" aria-label="Live LED strip preview">
        <canvas width=${t} height=${this.heightPx}></canvas>
        ${"live"!==this._status?e`<span class="overlay">${this._status}</span>`:null}
      </div>
    `}static{this.styles=[...i,s`
      .wrap {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        background: #111;
      }
      canvas {
        display: block;
        width: 100%;
        height: auto;
      }
      .overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        background: rgba(0, 0, 0, 0.35);
      }
    `]}};n([o({type:Number})],_.prototype,"heightPx",void 0),n([o({type:Number})],_.prototype,"pixelCount",void 0),n([r()],_.prototype,"_status",void 0),_=n([a("wled-strip-preview")],_);const g="wled-studio-card";let v=class extends t{constructor(){super(...arguments),this._controllerId="",this._masterEntity="",this._pixelCount=210,this._connected=!1,this._previewStatus="connecting"}setConfig(t){if(!t.type?.startsWith("custom:"))throw new Error("Invalid card type");this.config=t}getCardSize(){return 5}updated(t){super.updated(t),t.has("hass")&&this.hass&&this._bootstrap()}onPoweredConnect(){this._bootstrap()}onPoweredDisconnect(){this._unsubLive?.(),this._unsubLive=void 0}async _bootstrap(){if(this.hass?.connection&&this.isConnected){try{const t=await async function(t){return(await t.sendMessagePromise({type:"wled_studio/list_controllers",schema_version:1})).controllers??[]}(this.hass.connection),e=t.find(t=>t.title===this.config?.controller||t.entry_id===this.config?.controller)??t[0];if(!e?.entry_id)return void(this._previewStatus="no controller");this._controllerId=String(e.entry_id),this._masterEntity=String(e.master_entity_id??""),this._pixelCount=Number(e.pixel_count)||210,this._connected=!0,this._startLive()}catch{this._connected=!1,this._previewStatus="offline"}this.requestUpdate()}}_startLive(){this.hass?.connection&&this._controllerId&&(this._unsubLive?.(),this._previewStatus="connecting",this._preview?.setStatus(this._previewStatus),this._unsubLive=p(this.hass.connection,this._controllerId,t=>{this._previewStatus="live",this._preview?.setFrame(t)},{remote:this.remote.state.isRemote}),this.addUnsub(()=>this._unsubLive?.()))}_togglePower(){this.hass&&this._masterEntity&&this.hass.callService("light","toggle",{entity_id:this._masterEntity})}_setBrightness(t){if(!this.hass||!this._masterEntity)return;const e=Number(t.target.value);this.hass.callService("light","turn_on",{entity_id:this._masterEntity,brightness_pct:e})}render(){const t=this.config?.height??56,i=this.remote.state;return e`
      <div class="card" role="region" aria-label="WLED Studio card">
        <header class="header">
          <ha-icon icon="mdi:led-strip-variant"></ha-icon>
          <span class="title">${this.config?.controller??"WLED Studio"}</span>
          ${i.isRemote?e`<span class="badge">Remote</span>`:null}
          <button
            class="icon-btn"
            @click=${this._togglePower}
            ?disabled=${!this._masterEntity}
            aria-label="Toggle power"
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </header>

        <wled-strip-preview
          .heightPx=${t}
          .pixelCount=${this._pixelCount}
          .hass=${this.hass}
        ></wled-strip-preview>

        <div class="controls">
          <label class="sr-only" for="brightness">Brightness</label>
          <ha-slider
            id="brightness"
            min="0"
            max="100"
            step="1"
            ?disabled=${!this._masterEntity}
            @change=${this._setBrightness}
          ></ha-slider>
        </div>

        <button
          class="studio-link"
          @click=${this._openStudio}
          aria-label="Open WLED Studio panel"
        >
          Open Studio
        </button>
        ${this._connected?null:e`<p class="hint">Attach WLED Studio to a WLED device in Settings.</p>`}
      </div>
    `}_openStudio(){history.pushState(null,"","/wled-studio"),window.dispatchEvent(new CustomEvent("location-changed"))}static{this.styles=[...i,s`
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
      }
      .icon-btn {
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 4px;
      }
      .controls {
        margin: 10px 0;
      }
      .studio-link {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
      }
      .hint {
        font-size: 0.8rem;
        opacity: 0.75;
        margin: 8px 0 0;
      }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
      }
    `]}};function f(){return{type:`custom:${g}`,controller:"",height:56}}n([o({attribute:!1})],v.prototype,"config",void 0),n([r()],v.prototype,"_controllerId",void 0),n([r()],v.prototype,"_masterEntity",void 0),n([r()],v.prototype,"_pixelCount",void 0),n([r()],v.prototype,"_connected",void 0),n([r()],v.prototype,"_previewStatus",void 0),n([l("wled-strip-preview")],v.prototype,"_preview",void 0),v=n([a(g)],v);let m=class extends c{setConfig(t){this._config={...t}}render(){return e`
      <div class="editor">
        <p>Configure WLED Studio card (Phase 0 scaffold).</p>
        <ha-textfield
          .label=${"Controller entity (optional)"}
          .value=${this._config.controller??""}
          @value-changed=${this._onController}
        ></ha-textfield>
      </div>
    `}_onController(t){const e=t.detail.value;this._fire({...this._config,controller:e})}_fire(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}};n([o({attribute:!1})],m.prototype,"hass",void 0),n([r()],m.prototype,"_config",void 0),m=n([a("wled-studio-card-editor")],m),customElements.get(g)||customElements.define(g,v),customElements.get(d)||customElements.define(d,h),window.wledStudioCard=v,console.info("[wled-studio] frontend bundle loaded",{card:g,panel:d});export{g as CARD_TAG,d as PANEL_TAG,v as WledStudioCard,h as WledStudioPanel,f as getStubConfig};
//# sourceMappingURL=wled-studio-card.js.map

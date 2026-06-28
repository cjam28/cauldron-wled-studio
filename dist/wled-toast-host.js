import{i as e,z as t,F as s,R as i,S as r,d as o,r as n,n as a,B as l,N as c,L as d,K as h,l as p,p as g,q as m,o as u,H as _,f,g as b,P as v,c as y,h as x,A as w,O as $,M as I,a as S,s as k,t as C,D as E,I as A}from"./geometry-preview.js";import{h as M,M as N,H as z,S as D,a as P,b as O,i as F,_ as T,n as L,d as B}from"./wled-studio-core.js";const U="0.11.10";function q(){const e=window.__WLED_STUDIO_BUILD__;e&&e!==U&&(window.__WLED_STUDIO_STALE__=!0),window.__WLED_STUDIO_BUILD__=U}function j(){return Boolean(window.__WLED_STUDIO_STALE__)}function W(e){if(!e)return 0;const t=e.attributes?.brightness_pct;if("number"==typeof t&&Number.isFinite(t))return Math.max(0,Math.min(100,Math.round(t)));const s=e.attributes?.brightness;return"number"==typeof s&&Number.isFinite(s)?Math.round(Math.max(0,Math.min(255,s))/255*100):"on"===e.state?100:0}function H(e){return Math.round(Math.max(0,Math.min(100,e))/100*255)}class R{constructor(e){this.host=e,this._selectedSegId=-1,this._highlightSegIds=[],this._segments=[],e.addController(this)}hostConnected(){}get selectedSegId(){return this._selectedSegId}get highlightSegIds(){return this._highlightSegIds}get segments(){return this._segments}selectSegment(e){this._selectedSegId!==e&&(this._selectedSegId=e,this.host.requestUpdate())}applyTargetsChanged(e){this._selectedSegId=e.segmentId,e.highlightIds?.length?this._highlightSegIds=[...e.highlightIds]:e.editIds?.length?this._highlightSegIds=[...e.editIds]:this._highlightSegIds=[e.segmentId],this.host.requestUpdate()}applySegmentChange(e){this._selectedSegId=e.segmentId,e.editIds?.length&&(this._highlightSegIds=[...e.editIds]),this.host.requestUpdate()}setSegments(e){this._segments=e,this.host.requestUpdate()}}function V(e,t,s,i={}){const r=function(e,t,s,i={}){const r=i.dark??!1,o=e=>Math.max(0,Math.min(255,Math.round(e))),n=P(o(e),o(t),o(s)),a=z.fromInt(n);return new D(a,r,0)}(e,t,s,i);return{accent:M(N.primary.getArgb(r)),onAccent:M(N.onPrimary.getArgb(r))}}const K="--wled-led-accent",G="--wled-on-led-accent";class J{constructor(t){this.host=t,this._controllerId="",this._controllers=[],this._lastSeed=null,this._applyAccentDebounced=e((e,t)=>{const s=this.host.style;if(!s)return;const{accent:i,onAccent:r}=V(e[0],e[1],e[2],t);s.setProperty(K,i),s.setProperty(G,r)},50,100),t.addController(this)}hostConnected(){}hostDisconnected(){this._applyAccentDebounced.cancel()}get controllerId(){return this._controllerId}get controllers(){return this._controllers}masterEntityFor(e){return this._controllers.find(t=>t.entry_id===e)?.master_entity_id??""}get masterEntity(){return this.masterEntityFor(this._controllerId)}setControllerId(e){e&&e!==this._controllerId&&(this._controllerId=e,this.host.requestUpdate())}applyAccentFromSegment(e,t={}){const i=function(e){const t=s(e?.col)[0];if(!t)return null;const[i,r,o]=[t[0]??0,t[1]??0,t[2]??0];return 0===i&&0===r&&0===o?null:[i,r,o]}(e);if(!i)return void this.clearAccent();const r=function(e){if("boolean"==typeof e)return e;try{return"function"==typeof matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches}catch{return!1}}(t.dark),o=`${i[0]},${i[1]},${i[2]},${r?1:0}`;o!==this._lastSeed&&(this._lastSeed=o,this._applyAccentDebounced(i,{...t,dark:r}))}clearAccent(){if(this._applyAccentDebounced.cancel(),null===this._lastSeed)return;this._lastSeed=null;const e=this.host.style;e&&(e.removeProperty?.(K),e.removeProperty?.(G))}async loadControllers(e){try{const s=await t(e);this._controllers=s;if(!(this._controllerId&&s.some(e=>e.entry_id===this._controllerId))){const e=s[0];e?.entry_id&&(this._controllerId=String(e.entry_id))}this.host.requestUpdate()}catch{}}}class Y{constructor(e,t){this.host=e,e.addController(this),this._normalize=t.normalize??(e=>e),this._view=this._normalize(t.initial)}hostConnected(){}get view(){return this._view}select(e){const t=this._normalize(e);t!==this._view&&(this._view=t,this.host.requestUpdate())}revalidate(){const e=this._normalize(this._view);e!==this._view&&(this._view=e,this.host.requestUpdate())}}const Q="wled-toast";function X(e,t){const s=t.trim();s&&e.dispatchEvent(new CustomEvent(Q,{detail:{message:s},bubbles:!0,composed:!0}))}class Z extends Error{constructor(e,t){super("Scene conflict"),this.name="SceneConflictError",this.remote=e,this.etag=t}}async function ee(e,t){return await i(e),e.sendMessagePromise({...t,schema_version:r})}async function te(e,t){return(await ee(e,{type:"wled_studio/scene_list",controller_id:t})).scenes??[]}async function se(e,t,s,i){try{return(await ee(e,{type:"wled_studio/scene_capture",controller_id:t,name:s,scene_id:i?.sceneId,layout_id:i?.layoutId,transition_ms:i?.transitionMs??2500})).scene??{id:"",controller_id:t,name:s,wled_state:{}}}catch(e){const t=e;if("conflict"===t?.code&&t.data?.scene)throw new Z(t.data.scene,String(t.data.etag??t.message??""));throw e}}function ie(e,t){const s=new Set(e);return s.has(t)?s.delete(t):s.add(t),[...s].sort((e,t)=>e-t)}function re(e,t){const s=e.id,i=t.find(e=>e.wled_segment_id===s||e.segment_index===s||e.entity_id.endsWith(`_segment_${s}`));return`${("string"==typeof e.n&&e.n.trim()?e.n.trim():"")||i?.name?.replace(/^.*\s—\s/,"")||`Seg ${s+1}`} (${e.start??"?"}–${e.stop??"?"})`}const oe="wled_studio.segment_snapshot",ne="wled_studio.merge_for_effects",ae=["start","stop","len","grp","spc","of","on","bri","col","fx","sx","ix","c1","c2","c3","o1","o2","o3","pal","n","rev","mi","sel","awm"];function le(e){try{const t=localStorage.getItem(e);if(!t)return{};const s=JSON.parse(t);return"object"==typeof s&&s?s:{}}catch{return{}}}function ce(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function de(e){if(!e)return!1;const t=le(ne);return!(e in t)||Boolean(t[e])}function he(e){if(!e)return!1;const t=le(ne);return e in t&&Boolean(t[e])}function pe(e,t){const s=e.find(e=>0===e.id);if(!s||t<=0)return!1;return(s.stop??0)-(s.start??0)>=.9*t}function ge(e,t){const s=le(ne);t?s[e]=!0:delete s[e],ce(ne,s)}function me(e){return le(oe)[e]??null}function ue(e,t,s){const i={savedAt:Date.now(),segments:t.map(e=>({...e})),pixelCount:s},r=le(oe);return r[e]=i,ce(oe,r),i}function _e(e){return{seg:e.segments.map(e=>function(e){const t=e,s={id:e.id};for(const e of ae){const i=t[e];void 0!==i&&(s[e]=i)}return s}(e))}}function fe(e,t,s){const i=e.length?[...e].sort((e,t)=>e.id-t.id):[{id:0,start:0,stop:t,on:!0}],r=s?.length?new Set(s):null,o=r?i.filter(e=>r.has(e.id)):i,n=o.filter(e=>(e.stop??0)>(e.start??0)),a=n.length?n:o.length?o:i,l=Math.min(...a.map(e=>e.start??0)),c=Math.max(...a.map(e=>e.stop??t)),d=a[0],h={id:0,start:l,stop:c,on:!1!==d.on,sel:!0,bri:d.bri??255,fx:d.fx??0,n:"Merged (effects)"};void 0!==d.col&&(h.col=d.col),void 0!==d.pal&&(h.pal=d.pal);const p=[h];for(const e of i){if(0===e.id)continue;const t=e.stop??e.start??0;p.push({id:e.id,start:t,stop:t,on:!1,sel:!1})}return{seg:p}}function be(e,t){return e.find(e=>0===e.id)?[0]:e.length?[e[0].id]:[0]}function ve(e){const t={id:e.id,on:e.on,bri:e.bri,fx:e.fx,sx:e.sx,ix:e.ix,c1:e.c1,c2:e.c2,c3:e.c3,o1:e.o1,o2:e.o2,o3:e.o3,pal:e.pal,col:s(e.col),awm:e.awm};return JSON.stringify(t)}function ye(t,i,r){let l,c=null,d=0;const h=()=>{l&&clearTimeout(l),l=setTimeout(()=>{(async()=>{try{const e=((await a(t,i)).segments??[]).find(e=>e.id===d);if(!e||!c)return;const o=ve(c);if(o===ve(e))return;!function(e,t){return e.fx!==t.fx||JSON.stringify(s(e.col))!==JSON.stringify(s(t.col))}(c,e)?r(e):r(e,"WLED applied a different color or effect than requested")}catch{}})()},500)},p=e((e,s)=>{c=s,d=s.id,o(t,i,e,{fullResponse:!0}).then(e=>{const t=e.seg,i=Array.isArray(t)?t.find(e=>e.id===s.id):void 0;i&&(c={...s,...i,id:s.id}),h()}).catch(e=>{r(s,`Failed to apply state to WLED: ${n(e)}`)})},50,100);return{push(e,t){p(e,t)},cancel(){p.cancel(),l&&clearTimeout(l)}}}let xe=class extends l{constructor(){super(...arguments),this.controllerId="",this.segments=[],this.editIds=[],this.pixelCount=210,this.compact=!1,this._merged=!1,this._busy=!1,this._error=""}onPoweredConnect(){this._merged=de(this.controllerId)}willUpdate(e){e.has("controllerId")&&(this._merged=de(this.controllerId))}render(){const e=me(this.controllerId),t=e&&this._merged?`${e.segments.length} segment layout saved`:null;return O`
      <label class="merge-row ${this._merged?"on":""}">
        <input
          type="checkbox"
          .checked=${this._merged}
          ?disabled=${this._busy||!this.connection}
          @change=${this._onToggle}
        />
        <span class="merge-label">
          <strong>Merge for effects</strong>
          ${this.compact?null:O`
                <span class="sub">
                  Combine highlighted segments into one span so chase-style effects
                  run across LED indices. Uncheck to restore the layout saved when
                  you merged.
                </span>
              `}
          ${t&&!this.compact?O`<span class="saved">${t}</span>`:null}
        </span>
      </label>
      ${this._error?O`<p class="err">${this._error}</p>`:null}
      ${this._busy?O`<p class="busy">Updating segments…</p>`:null}
    `}async _onToggle(e){const t=e.target.checked;if(this.connection&&this.controllerId){this._busy=!0,this._error="";try{if(t){const e=await a(this.connection,this.controllerId),t=e.segments??this.segments,s=e.info?.leds,i=Number(s?.count)||this.pixelCount;ue(this.controllerId,t,i);const r=fe(t,i,this.editIds.length?this.editIds:void 0);await o(this.connection,this.controllerId,r,{fullResponse:!0}),ge(this.controllerId,!0),this._merged=!0}else{const e=me(this.controllerId);if(!e)throw new Error("No saved segment layout to restore");await o(this.connection,this.controllerId,_e(e),{fullResponse:!0}),ge(this.controllerId,!1),function(e){const t=le(oe);delete t[e],ce(oe,t)}(this.controllerId),this._merged=!1}this.dispatchEvent(new CustomEvent("merge-changed",{detail:{merged:this._merged},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(t){this._error=t instanceof Error?t.message:String(t),e.target.checked=this._merged}finally{this._busy=!1}}}static{this.styles=[...c,F`
      .merge-row {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        padding: 10px 12px;
        margin-bottom: 12px;
        border-radius: 10px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        cursor: pointer;
      }
      .merge-row.on {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 12%, transparent);
      }
      :host([compact]) .merge-row {
        padding: 6px 10px;
        margin-bottom: 8px;
        align-items: center;
      }
      :host([compact]) .merge-row .merge-label {
        font-size: 0.8rem;
      }
      .merge-row input {
        margin-top: 4px;
        flex-shrink: 0;
      }
      .merge-label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.85rem;
      }
      .sub {
        opacity: 0.75;
        font-size: 0.78rem;
        line-height: 1.35;
        font-weight: normal;
      }
      .saved {
        font-size: 0.72rem;
        opacity: 0.6;
      }
      .err {
        color: var(--error-color, #f44);
        font-size: 0.8rem;
        margin: 4px 0 0;
      }
      .busy {
        font-size: 0.8rem;
        opacity: 0.7;
        margin: 4px 0 0;
      }
    `]}};T([L({attribute:!1})],xe.prototype,"connection",void 0),T([L()],xe.prototype,"controllerId",void 0),T([L({type:Array})],xe.prototype,"segments",void 0),T([L({type:Array})],xe.prototype,"editIds",void 0),T([L({type:Number})],xe.prototype,"pixelCount",void 0),T([L({type:Boolean,reflect:!0})],xe.prototype,"compact",void 0),T([B()],xe.prototype,"_merged",void 0),T([B()],xe.prototype,"_busy",void 0),T([B()],xe.prototype,"_error",void 0),xe=T([d("wled-effect-merge-toggle")],xe);let we=class extends l{constructor(){super(...arguments),this.palettesByName={},this.palettePreviews={},this.selectedPal=0,this.filter="",this.deviceHost="",this.compact=!1,this.collapsible=!1,this._open=!0,this._localFilter="",this._editorOpen=!1}willUpdate(e){e.has("filter")&&this.filter!==this._localFilter&&(this._localFilter=this.filter)}_paletteName(e){return Object.entries(this.palettesByName).find(([,t])=>t===e)?.[0]??`Palette ${e}`}_gradient(e,t){return h(e,t,this.palettePreviews)}_editorUrl(){const e=this.deviceHost.trim();if(!e)return null;return`${e.startsWith("http")?e.replace(/\/$/,""):`http://${e}`}/cpal.htm`}_renderEditorActions(e){return e?O`
      <div class="editor-actions">
        <button type="button" class="editor-btn" @click=${()=>this._openEditor()}>
          <ha-icon icon="mdi:palette-swatch-outline"></ha-icon>
          Edit palettes
        </button>
        <a class="editor-link" href=${e} target="_blank" rel="noopener noreferrer">
          Open in new tab
        </a>
      </div>
    `:null}_openEditor(){this._editorOpen=!0}_closeEditor(){this._editorOpen=!1,this.dispatchEvent(new CustomEvent("palette-catalog-changed",{bubbles:!0,composed:!0}))}render(){const e=(this._localFilter||this.filter).trim().toLowerCase(),t=Object.keys(this.palettesByName).sort((e,t)=>e.localeCompare(t)),s=t.filter(t=>!e||t.toLowerCase().includes(e)),i=this._paletteName(this.selectedPal),r=this._editorUrl(),o=O`
      <input
        class="search"
        type="search"
        placeholder="Search palettes…"
        aria-label="Filter palettes"
        .value=${this._localFilter}
        @input=${e=>{this._localFilter=e.target.value}}
      />
      <div class="list" role="listbox" aria-label="Palettes">
        ${0===s.length?O`<p class="empty">No palettes match.</p>`:s.map(e=>{const t=this.palettesByName[e],s=t===this.selectedPal;return O`
                <button
                  type="button"
                  class="row ${s?"active":""}"
                  role="option"
                  aria-selected=${s?"true":"false"}
                  aria-label=${e}
                  @click=${()=>this._pick(t)}
                >
                  <span
                    class="swatch"
                    style=${`background:${this._gradient(e,t)}`}
                  ></span>
                  <span class="name">${e}</span>
                  ${s?O`<span class="dot" aria-hidden="true"></span>`:null}
                </button>
              `})}
      </div>
      ${this._renderEditorActions(r)}
      <p class="count">${s.length} palette${1===s.length?"":"s"}</p>
    `,n=this._editorOpen&&r?O`
            <div
              class="editor-overlay"
              role="dialog"
              aria-modal="true"
              aria-label="WLED palette editor"
            >
              <div class="editor-panel">
                <header class="editor-header">
                  <span>Palette editor</span>
                  <button
                    type="button"
                    class="icon-btn"
                    aria-label="Close palette editor"
                    @click=${()=>this._closeEditor()}
                  >
                    <ha-icon icon="mdi:close"></ha-icon>
                  </button>
                </header>
                <p class="editor-hint">
                  Uses the WLED device UI. Custom palettes save on the controller; close
                  when done to refresh previews.
                </p>
                <iframe
                  class="editor-frame"
                  title="WLED palette editor"
                  src=${r}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                ></iframe>
              </div>
            </div>
          `:null;return this.collapsible?O`
        <details
          class="wrap collapsible ${this.compact?"compact":""}"
          ?open=${this._open}
          @toggle=${e=>{this._open=e.target.open}}
        >
          <summary class="summary">
            <span class="summary-label">Palette</span>
            <span
              class="summary-preview"
              style=${`background:${this._gradient(i,this.selectedPal)}`}
            ></span>
            <span class="summary-name">${i}</span>
          </summary>
          ${o}
        </details>
        ${n}
      `:O`
      <div class="wrap ${this.compact?"compact":""}">
        <div class="head">
          <span class="head-label">Palette</span>
          ${r?O`
                <button
                  type="button"
                  class="editor-link inline"
                  title="Edit palettes on WLED device"
                  @click=${()=>this._openEditor()}
                >
                  <ha-icon icon="mdi:pencil-outline"></ha-icon>
                  Edit
                </button>
              `:null}
        </div>
        ${o}
      </div>
      ${n}
    `}_pick(e){this.dispatchEvent(new CustomEvent("palette-select",{detail:{paletteId:e},bubbles:!0,composed:!0}))}static{this.styles=[...c,F`
      .wrap {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .head-label,
      .summary-label {
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--wled-text-muted);
      }
      .summary {
        border: 1px solid var(--divider-color);
        border-radius: 10px;
        padding: 8px 10px;
        background: color-mix(in srgb, var(--card-background-color) 80%, transparent);
      }
      .summary::marker,
      .summary::-webkit-details-marker {
        color: var(--wled-text-muted);
      }
      .summary {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        list-style: disclosure-closed;
      }
      details[open] > .summary {
        list-style: disclosure-open;
        margin-bottom: 8px;
      }
      .summary-preview {
        flex: 0 0 48px;
        height: 14px;
        border-radius: 4px;
        border: 1px solid color-mix(in srgb, var(--divider-color) 80%, transparent);
      }
      .summary-name {
        flex: 1 1 auto;
        font-size: 0.82rem;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .search {
        width: 100%;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
        font-size: 0.82rem;
      }
      .list {
        display: flex;
        flex-direction: column;
        gap: 4px;
        max-height: min(200px, 28vh);
        overflow-y: auto;
        scrollbar-width: thin;
      }
      .wrap.compact .list {
        max-height: min(160px, 24vh);
      }
      .row {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid transparent;
        background: transparent;
        color: inherit;
        cursor: pointer;
        text-align: left;
        font-size: 0.82rem;
      }
      .row:hover {
        background: color-mix(in srgb, var(--primary-color) 8%, transparent);
      }
      .row.active {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 14%, transparent);
      }
      .swatch {
        flex: 0 0 56px;
        height: 16px;
        border-radius: 4px;
        border: 1px solid color-mix(in srgb, var(--divider-color) 70%, transparent);
      }
      .name {
        flex: 1 1 auto;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dot {
        flex: 0 0 8px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--primary-color);
      }
      .empty {
        margin: 0;
        font-size: 0.82rem;
        color: var(--wled-text-muted);
      }
      .editor-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .editor-btn,
      .editor-link.inline {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 0.78rem;
        border-radius: 6px;
        cursor: pointer;
      }
      .editor-btn {
        padding: 4px 8px;
        border: 1px solid var(--divider-color);
        background: color-mix(in srgb, var(--primary-color) 10%, transparent);
        color: inherit;
      }
      .editor-link {
        color: var(--primary-color);
        text-decoration: none;
        font-size: 0.78rem;
      }
      .editor-link.inline {
        padding: 2px 6px;
        border: 1px solid var(--divider-color);
        background: transparent;
        color: inherit;
      }
      .editor-link ha-icon,
      .editor-btn ha-icon {
        --mdc-icon-size: 16px;
      }
      .count {
        margin: 0;
        font-size: 0.72rem;
        color: var(--wled-text-muted);
      }
      .editor-overlay {
        position: fixed;
        inset: 0;
        z-index: 999;
        background: rgba(0, 0, 0, 0.55);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
      }
      .editor-panel {
        width: min(960px, 100%);
        max-height: min(92vh, 820px);
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: var(--card-background-color);
        border-radius: var(--wled-radius, 12px);
        border: 1px solid var(--divider-color);
        box-shadow: var(--wled-shadow);
        overflow: hidden;
      }
      .editor-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px;
        border-bottom: 1px solid var(--divider-color);
        font-weight: 600;
      }
      .icon-btn {
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 4px;
        line-height: 0;
      }
      .editor-hint {
        margin: 0;
        padding: 0 12px;
        font-size: 0.78rem;
        color: var(--wled-text-muted);
      }
      .editor-frame {
        flex: 1 1 auto;
        min-height: 360px;
        width: 100%;
        border: none;
        background: #111;
      }
    `]}};T([L({type:Object})],we.prototype,"palettesByName",void 0),T([L({type:Object})],we.prototype,"palettePreviews",void 0),T([L({type:Number})],we.prototype,"selectedPal",void 0),T([L()],we.prototype,"filter",void 0),T([L()],we.prototype,"deviceHost",void 0),T([L({type:Boolean})],we.prototype,"compact",void 0),T([L({type:Boolean,attribute:"collapsible"})],we.prototype,"collapsible",void 0),T([B()],we.prototype,"_open",void 0),T([B()],we.prototype,"_localFilter",void 0),T([B()],we.prototype,"_editorOpen",void 0),we=T([d("wled-palette-chips")],we);let $e=class extends l{constructor(){super(...arguments),this.presets=[]}render(){const e=this.presets.filter(e=>e.ql),t=this.presets.filter(e=>!e.ql||e.name);return O`
      <div class="bar" aria-label="WLED presets">
        ${e.length?O`
              <div class="ql-row">
                ${e.map(e=>O`
                    <button
                      class="ql"
                      title=${e.name}
                      @click=${()=>this._pick(e.id)}
                    >
                      ${e.ql}
                    </button>
                  `)}
              </div>
            `:null}
        <ul class="named-list">
          ${t.map(e=>O`
              <li>
                <button class="named" @click=${()=>this._pick(e.id)}>
                  <span class="id">${e.id}</span>
                  <span class="name">${e.name}</span>
                  ${e.ql?O`<span class="ql-badge">${e.ql}</span>`:null}
                </button>
              </li>
            `)}
        </ul>
      </div>
    `}_pick(e){this.dispatchEvent(new CustomEvent("preset-select",{detail:{presetId:e},bubbles:!0,composed:!0}))}static{this.styles=[...c,F`
      .ql-row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 8px;
      }
      .ql {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        background: var(--secondary-background-color, #333);
        cursor: pointer;
        font-size: 1rem;
      }
      .named-list {
        list-style: none;
        margin: 0;
        padding: 0;
        max-height: 160px;
        overflow-y: auto;
      }
      .named {
        width: 100%;
        display: flex;
        gap: 8px;
        align-items: center;
        padding: 8px 10px;
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        text-align: left;
        border-radius: 6px;
      }
      .named:hover {
        background: var(--secondary-background-color, rgba(128, 128, 128, 0.2));
      }
      .id {
        opacity: 0.6;
        font-size: 0.75rem;
        min-width: 1.5rem;
      }
      .name {
        flex: 1;
        font-size: 0.85rem;
      }
      .ql-badge {
        font-size: 0.75rem;
        opacity: 0.8;
      }
    `]}};T([L({type:Array})],$e.prototype,"presets",void 0),$e=T([d("wled-preset-bar")],$e);const Ie=["For each","Bar","Arc","Corner"],Se=["Replace","Add","Subtract","Multiply","Lighten","Darken"],ke=["Off","GEQ pulse","WaveSin","Sweep"];let Ce=class extends l{constructor(){super(...arguments),this.compact=!1}_emit(e){this.dispatchEvent(new CustomEvent("segment-patch",{detail:e,bubbles:!0,composed:!0}))}_num(e,t,s,i){const r=this.segment;if(!r)return null;const o=r[e]??s;return O`
      <label class="cell">
        <span class="cell-label">${t}<span class="cell-val">${o}</span></span>
        <ha-slider
          min=${s}
          max=${i}
          step="1"
          .value=${o}
          @change=${t=>{const s=Number(t.target.value);this._emit({[e]:s})}}
        ></ha-slider>
      </label>
    `}_bool(e,t){const s=this.segment;if(!s)return null;const i=Boolean(s[e]);return O`
      <label class="check">
        <input
          type="checkbox"
          .checked=${i}
          @change=${t=>this._emit({[e]:t.target.checked})}
        />
        <span>${t}</span>
      </label>
    `}_select(e,t,s){const i=this.segment;if(!i)return null;const r=i[e]??0;return O`
      <label class="cell">
        <span class="cell-label">${t}</span>
        <select
          .value=${String(r)}
          @change=${t=>{const s=Number(t.target.value);this._emit({[e]:s})}}
        >
          ${s.map((e,t)=>O`<option value=${t} ?selected=${t===r}>${e}</option>`)}
        </select>
      </label>
    `}render(){if(!this.segment)return null;const e=this.meta,t=[];for(const s of["o1","o2","o3"])if(e?.sliders?.[s]){const i="string"==typeof e.defaults?.[s]&&e.defaults[s].trim()?e.defaults[s]:s.toUpperCase();t.push({key:s,label:i})}return O`
      <details class="adv" ?open=${!this.compact}>
        <summary>Advanced segment options</summary>
        <div class="grid">
          ${this._num("grp","Grouping",1,255)}
          ${this._num("spc","Spacing",0,255)}
          ${this._num("of","Offset",0,255)}
        </div>
        <div class="flags">
          ${this._bool("rev","Reverse")}
          ${this._bool("mi","Mirror")}
          ${this._bool("frz","Freeze effect")}
          ${this._bool("sel","Selected")}
        </div>
        ${t.length?O`
              <div class="flags">
                ${t.map(e=>this._bool(e.key,e.label))}
              </div>
            `:null}
        <div class="grid">
          ${this._select("si","Sound simulation",ke)}
          ${this._select("m12","1D-in-2D mode",Ie)}
          ${this._select("bm","Blend mode",Se)}
        </div>
      </details>
    `}static{this.styles=[...c,F`
      .adv {
        border: 1px solid var(--divider-color);
        border-radius: 10px;
        padding: 8px 12px;
        background: color-mix(in srgb, var(--secondary-background-color) 40%, transparent);
      }
      summary {
        cursor: pointer;
        font-size: 0.82rem;
        font-weight: 600;
        padding: 4px 0;
        outline: none;
      }
      summary:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 8px 14px;
        margin-top: 8px;
      }
      .flags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 14px;
        margin-top: 10px;
      }
      .cell {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.78rem;
      }
      .cell-label {
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }
      .cell-val {
        font-variant-numeric: tabular-nums;
        opacity: 0.75;
      }
      .check {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.82rem;
      }
      select {
        padding: 4px 6px;
        border-radius: 6px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
        font-size: 0.8rem;
      }
    `]}};T([L({attribute:!1})],Ce.prototype,"segment",void 0),T([L({attribute:!1})],Ce.prototype,"meta",void 0),T([L({type:Boolean})],Ce.prototype,"compact",void 0),Ce=T([d("wled-segment-advanced")],Ce);let Ee=class extends l{constructor(){super(...arguments),this.width="100%",this.height="1rem",this.roundedFull=!1}render(){return O`
      <div
        class="block ${this.roundedFull?"pill":""}"
        style="width:${this.width};height:${this.height}"
        aria-hidden="true"
      ></div>
    `}static{this.styles=[...c,F`
      :host {
        display: block;
      }
      .block {
        border-radius: var(--wled-radius-sm);
        background: linear-gradient(
          90deg,
          var(--wled-surface) 0%,
          var(--wled-surface-elevated) 45%,
          var(--wled-surface) 90%
        );
        background-size: 200% 100%;
        animation: wled-shimmer 1.2s ease-in-out infinite;
      }
      .block.pill {
        border-radius: 999px;
      }
      @keyframes wled-shimmer {
        0% {
          background-position: 100% 0;
        }
        100% {
          background-position: -100% 0;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .block {
          animation: none;
          background: var(--wled-surface-elevated);
        }
      }
    `]}};T([L()],Ee.prototype,"width",void 0),T([L()],Ee.prototype,"height",void 0),T([L({type:Boolean,attribute:"rounded-full"})],Ee.prototype,"roundedFull",void 0),Ee=T([d("wled-skeleton")],Ee);const Ae={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let Me=class extends l{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this.wholeMode=!1,this.hideSegmentBrightness=!1,this.selectedSegId=-1,this.masterEntity="",this._loading=!0,this._error="",this._segId=0,this._editIds=[],this._segments=[],this._effectFilter="",this._presets=[],this._colorSlot=0,this._mergeActive=!1,this._saveSceneOpen=!1,this._saveSceneName="",this._lastMasterBri255=null,this._lastHaColorKey="",this._dragSegId=null}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this.masterEntity&&this._syncFromMasterEntity(),this._syncColorFromHaEntity()),e.has("masterEntity")&&this.masterEntity&&this.hass&&this._syncFromMasterEntity(),(e.has("_segId")||e.has("_colorSlot"))&&this.hass&&this._syncColorFromHaEntity()}applyGlobalBrightness(e){const t=Math.max(0,Math.min(255,Math.round(e)));this._lastMasterBri255=t,this._segments.length&&(this._segments=this._segments.map(e=>({...e,bri:t})),this.requestUpdate())}_syncFromMasterEntity(){if(!this.hass||!this.masterEntity)return;const e=function(e){return H(W(e))}(this.hass.states[this.masterEntity]);this._lastMasterBri255!==e&&this.applyGlobalBrightness(e)}_syncColorFromHaEntity(){if(!this.hass)return;const e=this._colorEntityId();if(!e)return;const t=function(e){if(!e)return null;const t=e.attributes?.rgbw_color;if(Array.isArray(t)&&t.length>=3)return[Number(t[0])||0,Number(t[1])||0,Number(t[2])||0,Number(t[3])||0];const s=e.attributes?.rgb_color;return Array.isArray(s)&&s.length>=3?[Number(s[0])||0,Number(s[1])||0,Number(s[2])||0,0]:null}(this.hass.states[e]);if(!t)return;const s=`${e}:${t[0]},${t[1]},${t[2]},${t[3]}`;if(s===this._lastHaColorKey)return;const i=this._activeSeg();if(!i)return;const r=this._cols(i),o=r[this._colorSlot]??r[0];if(o[0]===t[0]&&o[1]===t[1]&&o[2]===t[2]&&o[3]===t[3])return void(this._lastHaColorKey=s);this._lastHaColorKey=s,r[this._colorSlot]=t;const n=this._segments.findIndex(e=>e.id===i.id);if(n<0)return;const a=[...this._segments];a[n]={...a[n],col:r.map(e=>[e[0],e[1],e[2],e[3]])},this._segments=a,this.requestUpdate()}_colorEntityId(){if(this.wholeMode&&this.masterEntity)return this.masterEntity;const e=this._activeSeg();return e?p(e.id,this._snapshot?.segment_entities??[])??"":""}onPoweredConnect(){this._mergeActive=de(this.controllerId),this._load()}willUpdate(e){e.has("selectedSegId")&&this.selectedSegId>=0&&(this._segId=this.selectedSegId,this._refreshMeta()),(e.has("connection")||e.has("controllerId"))&&this.connection&&this.controllerId&&(this._optimistic?.cancel(),this._optimistic=ye(this.connection,this.controllerId,(e,t)=>this._reconcile(e,t)),this._load())}onPoweredDisconnect(){this._optimistic?.cancel(),this._optimistic=void 0}get highlightSegmentIds(){return this._targetIds()}_emitTargetsChanged(){this.dispatchEvent(new CustomEvent("segment-targets-changed",{detail:{segmentId:this._segId,editIds:[...this._editIds],mergeActive:this._mergeActive,highlightIds:this.highlightSegmentIds},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("segment-change",{detail:{segmentId:this._segId,editIds:[...this._editIds]},bubbles:!0,composed:!0}))}selectSegment(e){if(this._mergeActive)return this._segId=0,void this._refreshMeta();this._editIds.includes(e)||(this._editIds=[...this._editIds,e].sort((e,t)=>e-t)),this._segId=e,this._colorSlot=0,this._refreshMeta(),this._syncSelToDevice(),this._emitTargetsChanged()}async _refreshPalettePreviews(){if(this.connection&&this.controllerId&&this._snapshot)try{const e=await g(this.connection,this.controllerId);this._snapshot={...this._snapshot,palette_previews:e}}catch{}}async _load(){if(this.connection&&this.controllerId){this._loading=!0,this._error="";try{const e=await a(this.connection,this.controllerId);if(this._snapshot=e,this._segments=[...e.segments??[]].sort((e,t)=>e.id-t.id),this._segments.length){const e=this._segments.map(e=>e.id);e.includes(this._segId)||(this._segId=this._segments[0].id);const t=this._editIds.filter(t=>e.includes(t));this._editIds=t.length?t:[this._segId]}await this._refreshMeta(),await this._loadPresets(),this._mergeActive=de(this.controllerId);const t=this._pixelCount();he(this.controllerId)&&pe(this._segments,t)&&(this._editIds=be(this._segments),this._segId=this._editIds[0]??0),this.wholeMode&&this._segments.length&&(this._editIds=this._segments.map(e=>e.id),this._segId=this._segments[0].id),this._emitTargetsChanged()}catch(e){this._error=n(e)}finally{this._loading=!1,null!==this._lastMasterBri255&&this.applyGlobalBrightness(this._lastMasterBri255)}}}async _loadPresets(){if(this.connection&&this.controllerId)try{const e=await m(this.connection,this.controllerId),t=[];for(const[s,i]of Object.entries(e)){if(!i||"object"!=typeof i)continue;const e=i;t.push({id:s,name:String(e.n??e.name??`Preset ${s}`),ql:e.ql?String(e.ql):void 0})}t.sort((e,t)=>Number(e.id)-Number(t.id)),this._presets=t}catch{this._presets=[]}}_reconcile(e,t){const s=this._segments.findIndex(t=>t.id===e.id);if(s>=0){const t=[...this._segments];t[s]={...t[s],...e,id:e.id},this._segments=t}t?X(this,t):this.requestUpdate()}_activeSeg(){return this._segments.find(e=>e.id===this._segId)??this._segments[0]}async _refreshMeta(){const e=this._activeSeg();this.connection&&this.controllerId&&e&&(this._meta=await u(this.connection,this.controllerId,e.fx??0))}async _syncHaSegment(e,t){if(!this.hass)return;const s=p(e.id,this._snapshot?.segment_entities??[]);if(!s)return;const i={entity_id:s};if(t.col?.length){const e=_(t.col[0]);e[3]>0?i.rgbw_color=[e[0],e[1],e[2],e[3]]:i.rgb_color=[e[0],e[1],e[2]]}if(void 0!==t.bri&&(i.brightness=t.bri),void 0!==t.fx&&this._snapshot?.effects_by_name){const e=Object.entries(this._snapshot.effects_by_name).find(([,e])=>e===t.fx)?.[0];e&&(i.effect=e)}!1!==t.on?Object.keys(i).length>1&&await this.hass.callService("light","turn_on",i):await this.hass.callService("light","turn_off",{entity_id:s})}_pixelCount(){const e=this._snapshot?.info?.leds;return Number(e?.count)||210}_targetIds(){if(this.wholeMode&&this._segments.length)return this._segments.map(e=>e.id);if(this._mergeActive){const e=be(this._segments);return e.length?e:[0]}return this._editIds.length?this._editIds:[this._segId]}_onMergeChanged(){this._mergeActive=de(this.controllerId),this._load(),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}_patchSeg(e){const t=this._targetIds();if(!t.length||!this._optimistic)return;const s=[...this._segments];for(const i of t){const t=s.findIndex(e=>e.id===i);if(t<0)continue;const r=s[t];s[t]={...r,...e,id:i,sel:!0,on:void 0!==e.on?e.on:!1!==r.on},this._syncHaSegment(r,e)}this._segments=s;const i=this._activeSeg();this._optimistic.push(f(t,e,this._segments),i??{id:t[0]})}async _syncSelToDevice(){if(!this.connection||!this.controllerId||!this._segments.length)return;const e=this._targetIds();await o(this.connection,this.controllerId,b(e,this._segments)),this._segments=this._segments.map(t=>({...t,sel:e.includes(t.id)}))}_toggleSegEdit(e){if(this._mergeActive)return;let t=ie(this._editIds,e);t.length||(t=[e]),this._editIds=t,this._segId=e,this._colorSlot=0,this._refreshMeta(),this._syncSelToDevice(),this._emitTargetsChanged()}_reorderSegmentsVisual(e,t){const s=this._segments.findIndex(t=>t.id===e),i=this._segments.findIndex(e=>e.id===t);if(s<0||i<0||s===i)return;const r=[...this._segments],[o]=r.splice(s,1);r.splice(i,0,o),this._segments=r}_onSegDragStart(e,t){this._dragSegId=e,t.dataTransfer?.setData("text/plain",String(e)),t.dataTransfer&&(t.dataTransfer.effectAllowed="move")}_onSegDragOver(e,t){t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="move")}_onSegDrop(e,t){t.preventDefault();const s=this._dragSegId;this._dragSegId=null,null!==s&&s!==e&&this._reorderSegmentsVisual(s,e)}_onSegDragEnd(){this._dragSegId=null}async _onEffectSelect(e){this._patchSeg({fx:e.detail.effectId}),await this._refreshMeta()}_cols(e){const t=e.col??[],s=[];for(let e=0;e<3;e++)s.push(_(t[e]));return s}_onColor(e){const t=this._activeSeg();if(!t)return;const{rgb:s,white:i}=e.detail;this._lastHaColorKey=`${this._colorEntityId()}:${s[0]},${s[1]},${s[2]},${i}`;const r=this._cols(t);r[this._colorSlot]=[s[0],s[1],s[2],i];const o=v(this._snapshot?.effects_by_name??{});this._patchSeg({col:r.map(e=>[e[0],e[1],e[2],e[3]]),fx:o}),this._refreshMeta()}async _onAwm(e){const t=e.detail.awm;if(this.connection&&this.controllerId)try{const e=await y(this.connection,this.controllerId,t);this._snapshot&&(this._snapshot={...this._snapshot,rgbwm:e}),this.requestUpdate()}catch(e){X(this,e instanceof Error?e.message:String(e))}}_slider(e,t){const s=x(Number(t.target.value));null!==s&&this._patchSeg({[e]:s})}async _loadPreset(e){this.connection&&this.controllerId&&(await o(this.connection,this.controllerId,{ps:Number(e)}),await this._load())}_renderSkeleton(){return O`
      <div class="skeleton-load" aria-busy="true" aria-label="Loading segments">
        <wled-skeleton height="2rem" width="100%"></wled-skeleton>
        <wled-skeleton height="220px" width="min(100%, 280px)"></wled-skeleton>
        <wled-skeleton height="1rem" width="70%"></wled-skeleton>
        <div class="sk-grid">
          ${Array.from({length:4},()=>O`<wled-skeleton height="56px"></wled-skeleton>`)}
        </div>
      </div>
    `}render(){if(this._loading)return this._renderSkeleton();if(this._error)return O`<p class="err">${this._error}</p>`;const e=this._activeSeg();if(!e)return O`<p class="muted">No segments on this controller.</p>`;const t=this._cols(e),s=t[this._colorSlot]??t[0],i=this._meta,r=i?.sliders??{},o=!1!==i?.colors_enabled?3:1,n=this._snapshot?.rgbwm??0;return O`
      <div class="controls ${this.compact?"compact":""}">
        ${this.wholeMode?O`<p class="seg-hint whole">Whole strip — color and effects apply to all segments.</p>`:null}
        ${!this.wholeMode&&this.connection&&this.controllerId?O`
              <wled-effect-merge-toggle
                ?compact=${this.compact}
                .connection=${this.connection}
                .controllerId=${this.controllerId}
                .segments=${this._segments}
                .editIds=${this._editIds}
                .pixelCount=${this._pixelCount()}
                @merge-changed=${this._onMergeChanged}
              ></wled-effect-merge-toggle>
            `:null}
        ${this.wholeMode?null:this._mergeActive?O`<p class="seg-hint">Merge active — effects apply to the combined segment.</p>`:O`<p class="seg-hint">Tap segments to toggle editing — changes apply to all highlighted segments.</p>`}
        ${this.wholeMode||this._mergeActive?null:O`
        <div class="seg-bar" role="group" aria-label="Segments">
          ${this._segments.map(e=>O`
              <button
                class="seg-tab ${this._editIds.includes(e.id)?"editing":""} ${e.id===this._segId?"focus":""} ${this._dragSegId===e.id?"dragging":""}"
                aria-pressed=${this._editIds.includes(e.id)}
                @click=${()=>this._toggleSegEdit(e.id)}
                @dragover=${t=>this._onSegDragOver(e.id,t)}
                @drop=${t=>this._onSegDrop(e.id,t)}
              >
                ${this.compact?null:O`
                      <span
                        class="seg-drag-handle"
                        draggable="true"
                        aria-hidden="true"
                        title="Drag to reorder (preview only)"
                        @dragstart=${t=>this._onSegDragStart(e.id,t)}
                        @dragend=${()=>this._onSegDragEnd()}
                        @click=${e=>e.stopPropagation()}
                        @mousedown=${e=>e.stopPropagation()}
                      >
                        <ha-icon icon="mdi:drag-vertical"></ha-icon>
                      </span>
                    `}
                <span class="seg-label">${re(e,this._snapshot?.segment_entities??[])}</span>
              </button>
            `)}
        </div>
            `}

        ${!this.compact&&this._presets.length?O`
              <wled-preset-bar
                .presets=${this._presets}
                @preset-select=${e=>this._loadPreset(e.detail.presetId)}
              ></wled-preset-bar>
            `:null}

        ${o>1?O`
              <div class="color-slots" role="tablist" aria-label="Color slots">
                ${["Primary","Secondary","Tertiary"].slice(0,o).map((e,t)=>O`
                    <button
                      class="slot ${this._colorSlot===t?"active":""}"
                      role="tab"
                      @click=${()=>{this._colorSlot=t}}
                    >
                      ${e}
                    </button>
                  `)}
              </div>
            `:null}

        ${this.hideSegmentBrightness?null:O`
              <label class="bri-label">
                Segment brightness
                <ha-slider
                  min="0"
                  max="255"
                  step="1"
                  .value=${e.bri??255}
                  @change=${e=>this._slider("bri",e)}
                ></ha-slider>
              </label>
            `}

        <wled-color-wheel-rgbw
          .controllerId=${this.controllerId}
          .rgb=${[s[0],s[1],s[2]]}
          .white=${s[3]}
          .awm=${n}
          .showWhite=${(this._snapshot?.led_order??0)>0}
          @color-change=${this._onColor}
          @awm-change=${this._onAwm}
        ></wled-color-wheel-rgbw>

        ${!1!==i?.palette_enabled&&Object.keys(this._snapshot?.palettes_by_name??{}).length?O`
              <wled-palette-chips
                ?compact=${this.compact}
                ?collapsible=${this.compact}
                .palettesByName=${this._snapshot?.palettes_by_name??{}}
                .palettePreviews=${this._snapshot?.palette_previews??{}}
                .selectedPal=${e.pal??0}
                .deviceHost=${this._snapshot?.host??""}
                @palette-select=${e=>{this._patchSeg({pal:e.detail.paletteId})}}
                @palette-catalog-changed=${()=>{this._refreshPalettePreviews()}}
              ></wled-palette-chips>
            `:null}

        <wled-segment-advanced
          .segment=${e}
          .meta=${i}
          ?compact=${this.compact}
          @segment-patch=${e=>this._patchSeg(e.detail)}
        ></wled-segment-advanced>

        ${this.compact?null:O`
              <input
                class="fx-search"
                type="search"
                placeholder="Search effects…"
                .value=${this._effectFilter}
                @input=${e=>{this._effectFilter=e.target.value}}
              />
            `}

        ${this.wholeMode&&this.compact&&this.hideSegmentBrightness?null:O`
              <wled-effect-chips
                .hass=${this.hass}
                .controllerId=${this.controllerId}
                .fwVer=${this._snapshot?.fw_ver??this._snapshot?.info?.ver??""}
                .thumbBasenames=${this._snapshot?.thumb_basenames??[]}
                .effectsByName=${this._snapshot?.effects_by_name??{}}
                .soundFlags=${this._snapshot?.sound_flags??[]}
                .selectedFx=${e.fx??0}
                .filter=${this.compact?"":this._effectFilter}
                .selectedPalette=${e.pal??0}
                .paletteAware=${!1!==i?.palette_enabled}
                @effect-select=${this._onEffectSelect}
              ></wled-effect-chips>
            `}

        <div class="sliders">
          ${Object.entries(Ae).map(([t,s])=>{if(!r[t])return null;const i=e[t];return O`
              <label>
                ${s}
                <ha-slider
                  min="0"
                  max="255"
                  step="1"
                  .value=${i??128}
                  @change=${e=>this._slider(t,e)}
                ></ha-slider>
              </label>
            `})}
        </div>

        ${this.compact&&this.connection&&this.controllerId?O`
              <div class="scene-row">
                ${this._saveSceneOpen?O`
                      <input
                        type="text"
                        class="scene-input"
                        placeholder="Scene name"
                        .value=${this._saveSceneName}
                        @input=${e=>{this._saveSceneName=e.target.value}}
                      />
                      <button
                        type="button"
                        class="scene-primary"
                        @click=${()=>{this._confirmSaveScene()}}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        class="scene-ghost"
                        @click=${()=>{this._saveSceneOpen=!1}}
                      >
                        Cancel
                      </button>
                    `:O`
                      <button
                        type="button"
                        class="scene-ghost"
                        @click=${()=>{this._saveSceneName="Color scene",this._saveSceneOpen=!0}}
                      >
                        <ha-icon icon="mdi:content-save-outline"></ha-icon>
                        Save as scene
                      </button>
                    `}
              </div>
            `:null}
      </div>
    `}async _confirmSaveScene(){if(this.connection&&this.controllerId&&this._saveSceneName.trim())try{await se(this.connection,this.controllerId,this._saveSceneName.trim()),this._saveSceneOpen=!1,X(this,`Scene "${this._saveSceneName.trim()}" saved`)}catch(e){X(this,e instanceof Error?e.message:String(e))}}get segments(){return this._segments}static{this.styles=[...c,F`
      .controls {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .seg-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .seg-tab {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        border: 1px solid var(--divider-color, #555);
        border-radius: 8px;
        padding: 6px 10px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.8rem;
      }
      .seg-drag-handle {
        display: inline-flex;
        align-items: center;
        cursor: grab;
        opacity: 0.55;
        touch-action: none;
        line-height: 0;
        padding: 0 2px 0 0;
      }
      .seg-drag-handle:active {
        cursor: grabbing;
      }
      .seg-drag-handle ha-icon {
        --mdc-icon-size: 16px;
      }
      .seg-tab.dragging {
        opacity: 0.65;
      }
      .seg-label {
        white-space: nowrap;
      }
      .seg-hint {
        margin: 0;
        font-size: 0.75rem;
        opacity: 0.72;
      }
      .scene-row {
        display: flex;
        gap: 6px;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 6px;
      }
      .scene-input {
        flex: 1 1 140px;
        min-width: 120px;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
        font-size: 0.78rem;
      }
      .scene-primary,
      .scene-ghost {
        font-size: 0.78rem;
        padding: 6px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: transparent;
        color: inherit;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .scene-primary {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .seg-tab.editing,
      .seg-tab.focus {
        background: transparent;
        border-color: var(--primary-color);
        outline: 2px solid var(--primary-color);
        outline-offset: 1px;
      }
      .fx-search {
        width: 100%;
        padding: 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, #555);
        background: transparent;
        color: inherit;
      }
      .sliders {
        display: grid;
        gap: 8px;
      }
      .sliders label {
        font-size: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .muted {
        opacity: 0.7;
        font-size: 0.85rem;
      }
      .skeleton-load {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .sk-grid {
        display: grid;
        gap: 8px;
        grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
      }
      .err {
        color: var(--error-color, #f44);
        font-size: 0.85rem;
      }
      .compact .sliders {
        display: none;
      }
      .color-slots {
        display: flex;
        gap: 6px;
      }
      .slot {
        flex: 1;
        padding: 6px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #555);
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.75rem;
      }
      .slot.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .bri-label {
        font-size: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
    `]}};T([L({attribute:!1})],Me.prototype,"connection",void 0),T([L({attribute:!1})],Me.prototype,"hass",void 0),T([L()],Me.prototype,"controllerId",void 0),T([L({type:Boolean})],Me.prototype,"compact",void 0),T([L({type:Boolean})],Me.prototype,"wholeMode",void 0),T([L({type:Boolean,attribute:"hide-segment-brightness"})],Me.prototype,"hideSegmentBrightness",void 0),T([L({type:Number})],Me.prototype,"selectedSegId",void 0),T([L()],Me.prototype,"masterEntity",void 0),T([B()],Me.prototype,"_loading",void 0),T([B()],Me.prototype,"_error",void 0),T([B()],Me.prototype,"_segId",void 0),T([B()],Me.prototype,"_editIds",void 0),T([B()],Me.prototype,"_segments",void 0),T([B()],Me.prototype,"_snapshot",void 0),T([B()],Me.prototype,"_meta",void 0),T([B()],Me.prototype,"_effectFilter",void 0),T([B()],Me.prototype,"_presets",void 0),T([B()],Me.prototype,"_colorSlot",void 0),T([B()],Me.prototype,"_mergeActive",void 0),T([B()],Me.prototype,"_saveSceneOpen",void 0),T([B()],Me.prototype,"_saveSceneName",void 0),Me=T([d("wled-segment-controls")],Me);let Ne=class extends l{constructor(){super(...arguments),this.segments=[],this.selectedIds=[],this.segmentEntities=[],this.hint="Tap segments to toggle",this._dragSegId=null}render(){return this.segments.length?O`
      <div class="block">
        <p class="hint">${this.hint}</p>
        <div class="bar" role="group" aria-label="Segments">
          ${this.segments.map(e=>O`
              <button
                type="button"
                class="btn ${this.selectedIds.includes(e.id)?"on":""} ${this._dragSegId===e.id?"dragging":""}"
                aria-pressed=${this.selectedIds.includes(e.id)}
                @click=${()=>this._toggle(e.id)}
                @dragover=${e=>{e.preventDefault()}}
                @drop=${t=>this._onDrop(e.id,t)}
              >
                <span
                  class="drag-handle"
                  draggable="true"
                  aria-hidden="true"
                  title="Drag to reorder (preview only)"
                  @dragstart=${t=>this._onDragStart(e.id,t)}
                  @dragend=${()=>{this._dragSegId=null}}
                  @click=${e=>e.stopPropagation()}
                  @mousedown=${e=>e.stopPropagation()}
                >
                  <ha-icon icon="mdi:drag-vertical"></ha-icon>
                </span>
                <span class="btn-label">${re(e,this.segmentEntities)}</span>
              </button>
            `)}
        </div>
      </div>
    `:null}_toggle(e){this.dispatchEvent(new CustomEvent("segment-toggle",{detail:{id:e},bubbles:!0,composed:!0}))}_onDragStart(e,t){this._dragSegId=e,t.dataTransfer?.setData("text/plain",String(e)),t.dataTransfer&&(t.dataTransfer.effectAllowed="move")}_onDrop(e,t){t.preventDefault();const s=this._dragSegId;this._dragSegId=null,null!==s&&s!==e&&this.dispatchEvent(new CustomEvent("segment-reorder",{detail:{fromId:s,toId:e},bubbles:!0,composed:!0}))}static{this.styles=[...c,F`
      .hint {
        margin: 0 0 8px;
        font-size: 0.8rem;
        opacity: 0.75;
      }
      .bar {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 12px;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        border: 1px solid var(--wled-border);
        border-radius: var(--wled-radius-sm);
        padding: 6px 10px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.8rem;
        min-height: var(--wled-tap);
        transition:
          border-color var(--wled-transition-fast),
          background var(--wled-transition-fast),
          outline-color var(--wled-transition-fast);
      }
      .drag-handle {
        display: inline-flex;
        align-items: center;
        cursor: grab;
        opacity: 0.55;
        touch-action: none;
        line-height: 0;
        padding: 0 2px 0 0;
      }
      .drag-handle:active {
        cursor: grabbing;
      }
      .drag-handle ha-icon {
        --mdc-icon-size: 16px;
      }
      .btn.dragging {
        opacity: 0.65;
      }
      .btn-label {
        white-space: nowrap;
      }
      .btn.on {
        border-color: var(--wled-accent);
        background: var(--wled-accent-soft);
        outline: 2px solid var(--wled-accent);
        outline-offset: 1px;
      }
    `]}};T([L({type:Array})],Ne.prototype,"segments",void 0),T([L({type:Array})],Ne.prototype,"selectedIds",void 0),T([L({type:Array})],Ne.prototype,"segmentEntities",void 0),T([L()],Ne.prototype,"hint",void 0),T([B()],Ne.prototype,"_dragSegId",void 0),Ne=T([d("wled-segment-bar")],Ne);const ze={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let De=class extends l{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this._segments=[],this._editIds=[],this._focusSegId=0,this._filter="",this._status="Loading effects…",this._mergeActive=!1,this._library=[],this._saveCopyOpen=!1,this._saveCopyName="",this._saveSceneOpen=!1,this._saveSceneName="",this._needsMergeApply=!1}onPoweredConnect(){this._mergeActive=de(this.controllerId),this._library=w(this.controllerId),this._load()}willUpdate(e){(e.has("connection")||e.has("controllerId"))&&this.connection&&this.controllerId&&this._load()}async _refreshPalettePreviews(){if(this.connection&&this.controllerId&&this._snapshot)try{const e=await g(this.connection,this.controllerId);this._snapshot={...this._snapshot,palette_previews:e}}catch{}}_onPaletteCatalogChanged(){this._refreshPalettePreviews()}async _load(){if(this.connection&&this.controllerId){this._status="Loading effects…";try{if(this._snapshot=await a(this.connection,this.controllerId),this._segments=[...this._snapshot.segments??[]].sort((e,t)=>e.id-t.id),this._segments.length){const e=this._segments.map(e=>e.id),t=this._editIds.filter(t=>e.includes(t));this._editIds=t.length?t:e,e.includes(this._focusSegId)||(this._focusSegId=this._segments[0].id)}const e=this._pixelCount();this._mergeActive=de(this.controllerId);const t=pe(this._segments,e);this._needsMergeApply=this._mergeActive&&this._segments.length>1&&!t,he(this.controllerId)&&t&&(this._editIds=be(this._segments),this._focusSegId=this._editIds[0]??0),await this._refreshMeta(),this._status="",this._emitTargetsChanged()}catch{this._status="Could not load device state."}}}get highlightSegmentIds(){return this._targetIds()}_emitTargetsChanged(){this.dispatchEvent(new CustomEvent("segment-targets-changed",{detail:{segmentId:this._focusSegId,editIds:[...this._editIds],mergeActive:this._mergeActive,highlightIds:this.highlightSegmentIds},bubbles:!0,composed:!0}))}async confirmMergeApply(){await this._applyMergeOnDevice(this._pixelCount()),this._needsMergeApply=!1,await this._load()}async _applyMergeOnDevice(e){if(!this.connection||!this.controllerId||!this._snapshot)return;ue(this.controllerId,this._segments,e);const t=fe(this._segments,e,this._editIds.length?this._editIds:void 0);await o(this.connection,this.controllerId,t,{fullResponse:!0}),ge(this.controllerId,!0),this._snapshot=await a(this.connection,this.controllerId),this._segments=[...this._snapshot.segments??[]].sort((e,t)=>e.id-t.id)}_activeSeg(){return this._segments.find(e=>e.id===this._focusSegId)??this._segments[0]}async _refreshMeta(){const e=this._activeSeg();this.connection&&this.controllerId&&e&&(this._meta=await u(this.connection,this.controllerId,e.fx??0))}selectSegmentFromPreview(e){if(this._mergeActive)return this._focusSegId=0,this._refreshMeta(),void this._emitTargetsChanged();this._editIds.includes(e)||(this._editIds=[...this._editIds,e].sort((e,t)=>e-t)),this._focusSegId=e,this._refreshMeta(),this._emitTargetsChanged()}_onSegToggle(e){if(this._mergeActive)return;let t=ie(this._editIds,e.detail.id);t.length||(t=[e.detail.id]),this._editIds=t,this._focusSegId=e.detail.id,this._refreshMeta(),this._emitTargetsChanged()}_pixelCount(){const e=this._snapshot?.info?.leds;return Number(e?.count)||210}_targetIds(){if(this._mergeActive){const e=be(this._segments);return e.length?e:[0]}return this._editIds.length?this._editIds:[this._focusSegId]}_onMergeChanged(){this._mergeActive=de(this.controllerId),this._load(),this._emitTargetsChanged()}_effectName(e){return Object.entries(this._snapshot?.effects_by_name??{}).find(([,t])=>t===e)?.[0]??`Effect ${e}`}_sliderValuesFromSeg(){const e=this._activeSeg();return e?$(e):{}}_saveAsDefault(){const e=this._activeSeg();e&&this.controllerId&&(I(this.controllerId,e.fx??0,this._sliderValuesFromSeg()),X(this,`Saved default options for ${this._effectName(e.fx??0)}`))}_openSaveCopy(){const e=this._activeSeg();e&&(this._saveCopyName=`${this._effectName(e.fx??0)} copy`,this._saveCopyOpen=!0)}_confirmSaveCopy(){const e=this._activeSeg();e&&this.controllerId&&this._saveCopyName.trim()&&(S(this.controllerId,{name:this._saveCopyName.trim(),effectId:e.fx??0,effectName:this._effectName(e.fx??0),pinned:!0,...this._sliderValuesFromSeg()}),this._library=w(this.controllerId),this._saveCopyOpen=!1,X(this,`Saved "${this._saveCopyName.trim()}" to library`))}_openSaveScene(){const e=this._activeSeg();e&&(this._saveSceneName=`${this._effectName(e.fx??0)} scene`,this._saveSceneOpen=!0)}async _confirmSaveScene(){if(this.connection&&this.controllerId&&this._saveSceneName.trim())try{await se(this.connection,this.controllerId,this._saveSceneName.trim()),this._saveSceneOpen=!1,X(this,`Scene "${this._saveSceneName.trim()}" saved`)}catch(e){X(this,e instanceof Error?e.message:String(e))}}async _applyLibraryEntry(e){if(!this.connection||!this._snapshot)return;const t=this._targetIds(),s={fx:e.effectId,on:!0};for(const t of["sx","ix","c1","c2","c3","o1","o2","o3"]){const i=e[t];"number"==typeof i&&(s[t]=i)}const i=f(t,s,this._segments);await o(this.connection,this.controllerId,i),await this._load(),X(this,`Applied ${e.name}`)}_isLoading(){return"Loading effects…"===this._status}_renderSkeleton(){return O`
      <div class="skeleton-load" aria-busy="true" aria-label="Loading effects">
        <wled-skeleton height="2rem" width="min(100%, 360px)"></wled-skeleton>
        <div class="sk-grid">
          ${Array.from({length:6},()=>O`<wled-skeleton height="72px"></wled-skeleton>`)}
        </div>
      </div>
    `}render(){const e=this._snapshot,t=this._activeSeg(),s=t?.fx??0,i=this._meta,r=i?.sliders??{},o=this._targetIds().length,n=this.compact;return O`
      <div class="wrap ${n?"compact":""}">
        ${n?null:O`
              <h2>Effects</h2>
              <p class="hint">
                Tap segments to choose targets. Tap the active effect again to return to Solid.
              </p>
              <details class="seg-note">
                <summary>Why do chase effects restart on each segment?</summary>
                <p>
                  WLED runs effects <strong>per segment</strong>: each segment’s effect uses LED
                  indices <code>start…stop</code> only inside that segment. The same effect on
                  neighbors does not continue across segment boundaries. For one motion across the
                  whole strip, use a <strong>single segment</strong> spanning all LEDs (Layout →
                  Apply segments) or external tools (LedFX / xLights). WLED+ uses the same model;
                  grouping is planned in firmware, not shipped yet.
                </p>
              </details>
            `}
        ${this._isLoading()?this._renderSkeleton():this._status?O`<p class="status">${this._status}</p>`:null}

        ${this._needsMergeApply?O`
              <div class="merge-prompt">
                <p>
                  Merge for effects is on, but WLED currently has
                  ${this._segments.length} segments. Apply merge so chase-style
                  effects span the whole strip?
                </p>
                <div class="merge-prompt-row">
                  <button
                    type="button"
                    class="primary"
                    @click=${()=>{this.confirmMergeApply()}}
                  >
                    Apply merge
                  </button>
                  <button
                    type="button"
                    class="ghost"
                    @click=${()=>{ge(this.controllerId,!1),this._mergeActive=!1,this._needsMergeApply=!1,this._emitTargetsChanged()}}
                  >
                    Keep ${this._segments.length} segments
                  </button>
                </div>
              </div>
            `:null}

        ${this.connection&&this.controllerId&&e&&t?O`
              <wled-effect-merge-toggle
                ?compact=${n}
                .connection=${this.connection}
                .controllerId=${this.controllerId}
                .segments=${this._segments}
                .editIds=${this._editIds}
                .pixelCount=${this._pixelCount()}
                @merge-changed=${this._onMergeChanged}
              ></wled-effect-merge-toggle>
            `:null}
        ${this._segments.length&&!this._mergeActive?O`
              <wled-segment-bar
                .segments=${this._segments}
                .selectedIds=${this._editIds}
                .segmentEntities=${e?.segment_entities??[]}
                hint=${n?"Tap segments to target effects":"Apply effects to highlighted segments"}
                @segment-toggle=${this._onSegToggle}
              ></wled-segment-bar>
            `:null}

        ${e&&t?O`
              <div class="effects-workspace ${n?"compact":""}">
                <div class="effects-toolbar">
                  <input
                    class="search"
                    type="search"
                    placeholder="Search effects…"
                    aria-label="Filter effects"
                    .value=${this._filter}
                    @input=${e=>{this._filter=e.target.value}}
                  />
                </div>
                <div class="effects-scroll">
                  <wled-effect-chips
                    scroll-pane
                    .hass=${this.hass}
                    .controllerId=${this.controllerId}
                    .fwVer=${e.fw_ver??e.info?.ver??""}
                    .thumbBasenames=${e.thumb_basenames??[]}
                    .effectsByName=${e.effects_by_name??{}}
                    .soundFlags=${e.sound_flags??[]}
                    .selectedFx=${s}
                    .filter=${this._filter}
                    .tileGrid=${n}
                    .selectedPalette=${t.pal??0}
                    .paletteAware=${!1!==i?.palette_enabled}
                    .palettesByName=${e.palettes_by_name??{}}
                    .palettePreviews=${e.palette_previews??{}}
                    @effect-select=${e=>this._onFx(e.detail.effectId,e.detail.toggledOff)}
                  ></wled-effect-chips>
                </div>

                <div class="effects-tuning">
                  ${!1!==i?.palette_enabled&&Object.keys(e.palettes_by_name??{}).length?O`
                        <wled-palette-chips
                          ?compact=${n}
                          ?collapsible=${n}
                          .palettesByName=${e.palettes_by_name??{}}
                          .palettePreviews=${e.palette_previews??{}}
                          .selectedPal=${t.pal??0}
                          .deviceHost=${e.host??""}
                          @palette-select=${e=>{this._segPatch({pal:e.detail.paletteId})}}
                          @palette-catalog-changed=${()=>this._onPaletteCatalogChanged()}
                        ></wled-palette-chips>
                      `:null}

                  <wled-segment-advanced
                    .segment=${t}
                    .meta=${i}
                    ?compact=${n}
                    @segment-patch=${e=>{this._segPatch(e.detail)}}
                  ></wled-segment-advanced>

                  <div class="sliders ${n?"compact":""}">
                    ${Object.entries(ze).map(([e,s])=>{if(!r[e])return null;const i=t[e];return O`
                        <label>
                          ${s}
                          <ha-slider
                            min="0"
                            max="255"
                            step="1"
                            .value=${i??128}
                            @change=${t=>this._slider(e,t)}
                          ></ha-slider>
                        </label>
                      `})}
                  </div>

                  ${Object.keys(r).length?O`
                        <div class="save-row">
                          <button type="button" class="ghost" @click=${()=>this._saveAsDefault()}>
                            Save as default
                          </button>
                          <button type="button" class="ghost" @click=${()=>this._openSaveCopy()}>
                            Save copy…
                          </button>
                          <button type="button" class="ghost" @click=${()=>this._openSaveScene()}>
                            Save as scene
                          </button>
                        </div>
                      `:null}

                  ${this._saveCopyOpen?O`
                        <div class="inline-form">
                          <input
                            type="text"
                            placeholder="Preset name"
                            .value=${this._saveCopyName}
                            @input=${e=>{this._saveCopyName=e.target.value}}
                          />
                          <button type="button" class="primary" @click=${()=>this._confirmSaveCopy()}>
                            Save
                          </button>
                          <button
                            type="button"
                            class="ghost"
                            @click=${()=>{this._saveCopyOpen=!1}}
                          >
                            Cancel
                          </button>
                        </div>
                      `:null}

                  ${this._saveSceneOpen?O`
                        <div class="inline-form">
                          <input
                            type="text"
                            placeholder="Scene name"
                            .value=${this._saveSceneName}
                            @input=${e=>{this._saveSceneName=e.target.value}}
                          />
                          <button type="button" class="primary" @click=${()=>{this._confirmSaveScene()}}>
                            Save scene
                          </button>
                          <button
                            type="button"
                            class="ghost"
                            @click=${()=>{this._saveSceneOpen=!1}}
                          >
                            Cancel
                          </button>
                        </div>
                      `:null}

                  ${this._library.length?O`
                        <div class="library-block">
                          <span class="library-label">Library</span>
                          <div class="library-row">
                            ${this._library.slice(0,n?6:12).map(e=>O`
                                <button
                                  type="button"
                                  class="library-chip"
                                  @click=${()=>{this._applyLibraryEntry(e)}}
                                >
                                  ${e.name}
                                </button>
                              `)}
                          </div>
                        </div>
                      `:null}

                  <p class="meta">
                    ${o} segment${1===o?"":"s"} · effect
                    #${s}
                    ${!1!==i?.palette_enabled&&void 0!==t.pal?O` · palette #${t.pal}`:null}
                  </p>
                </div>
              </div>
            `:null}
      </div>
    `}async _onFx(e,t){if(!this.connection||!this._snapshot)return;const s=this._targetIds(),i=f(s,{fx:e,on:!0},this._segments);try{await o(this.connection,this.controllerId,i);for(const t of s){const s=this._segments.findIndex(e=>e.id===t);if(s>=0){const t=[...this._segments];t[s]={...t[s],fx:e,on:!0},this._segments=t}}this._focusSegId=s[0],await this._refreshMeta();const r=Object.entries(this._snapshot.effects_by_name).find(([,t])=>t===e)?.[0]??(t?"Solid":`#${e}`),n=k(this.controllerId,e);if(n&&Object.keys(n).length){const e=f(s,n,this._segments);await o(this.connection,this.controllerId,e)}X(this,t?`Solid on ${s.length} segment(s)`:`Applied ${r}`),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(e){X(this,`Apply failed: ${e.message||"error"}`)}}_slider(e,t){const s=x(Number(t.target.value));null!==s&&this._segPatch({[e]:s})}async _segPatch(e){if(!this.connection||!this._snapshot)return;const t=this._targetIds(),s=f(t,e,this._segments);try{await o(this.connection,this.controllerId,s)}catch(e){return void X(this,`Apply failed: ${e.message||"error"}`)}const i=[...this._segments];for(const s of t){const t=i.findIndex(e=>e.id===s);t>=0&&(i[t]={...i[t],...e})}this._segments=i}static{this.styles=[...c,F`
      .wrap {
        max-width: 100%;
      }
      :host {
        display: block;
      }
      :host([compact]) {
        display: flex;
        flex-direction: column;
        min-height: 0;
        height: 100%;
      }
      .wrap.compact {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .effects-workspace {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-height: 0;
      }
      .effects-workspace.compact {
        flex: 1 1 auto;
        min-height: 0;
        height: 100%;
      }
      .effects-toolbar {
        flex: 0 0 auto;
      }
      .effects-scroll {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .effects-scroll wled-effect-chips {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .effects-tuning {
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-top: 1px solid var(--divider-color);
        padding-top: 8px;
        max-height: min(42vh, 280px);
        overflow-y: auto;
        scrollbar-width: thin;
      }
      .effects-workspace.compact .effects-tuning {
        max-height: min(46vh, 300px);
      }
      .wrap.compact .search {
        max-width: 100%;
      }
      .merge-prompt {
        margin: 0 0 12px;
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid var(--warning-color, orange);
        background: color-mix(in srgb, var(--warning-color) 12%, transparent);
        font-size: 0.85rem;
      }
      .merge-prompt p {
        margin: 0 0 8px;
      }
      .merge-prompt-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .merge-prompt .primary,
      .merge-prompt .ghost {
        font-size: 0.78rem;
        padding: 6px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: transparent;
        color: inherit;
        cursor: pointer;
      }
      .merge-prompt .primary {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      h2 {
        margin: 0 0 8px;
      }
      .hint {
        opacity: 0.75;
        font-size: 0.9rem;
        margin: 0 0 8px;
      }
      .seg-note {
        margin: 0 0 12px;
        font-size: 0.82rem;
        opacity: 0.85;
      }
      .seg-note p {
        margin: 8px 0 0;
        line-height: 1.4;
        opacity: 0.9;
      }
      .search {
        width: 100%;
        max-width: 360px;
        margin: 0 0 10px;
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
      }
      .status {
        font-size: 0.9rem;
        opacity: 0.85;
      }
      .skeleton-load {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .sk-grid {
        display: grid;
        gap: 8px;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      }
      .sliders {
        display: grid;
        gap: 8px;
        max-width: 320px;
        margin-top: 12px;
      }
      .sliders.compact {
        max-width: 100%;
      }
      .save-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 10px;
      }
      .save-row .ghost,
      .inline-form .ghost,
      .inline-form .primary {
        font-size: 0.78rem;
        padding: 6px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: transparent;
        color: inherit;
        cursor: pointer;
      }
      .inline-form .primary {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .inline-form {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 8px;
        align-items: center;
      }
      .inline-form input {
        flex: 1 1 140px;
        min-width: 120px;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
      }
      .library-block {
        margin-top: 10px;
      }
      .library-label {
        display: block;
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        opacity: 0.65;
        margin-bottom: 6px;
      }
      .library-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .library-chip {
        font-size: 0.78rem;
        padding: 6px 10px;
        border-radius: 999px;
        border: 1px solid var(--divider-color);
        background: color-mix(in srgb, var(--primary-color) 10%, transparent);
        color: inherit;
        cursor: pointer;
      }
      .sliders label {
        font-size: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .meta {
        font-size: 0.75rem;
        opacity: 0.6;
        margin: 8px 0 0;
      }
    `]}};function Pe(e,t){return Math.max(0,Math.min(255,Math.round(e*t)))}function Oe(e,t,s){return`rgb(${e}, ${t}, ${s})`}function Fe(e){return function(e){if(!e.length)return"linear-gradient(135deg, var(--wled-surface-elevated), var(--wled-surface))";if(1===e.length){const t=e[0];return`linear-gradient(135deg, ${t}, color-mix(in srgb, ${t} 55%, rgb(0 0 0)))`}const t=e.map((t,s)=>`${t} ${Math.round(s/(e.length-1)*100)}%`).join(", ");return`linear-gradient(135deg, ${t})`}(function(e){const t=e??{};if(!1===t.on)return["rgb(26, 26, 26)","rgb(13, 13, 13)"];const s="number"==typeof t.bri&&Number.isFinite(t.bri)?Math.max(0,Math.min(255,t.bri)):128,i=(Array.isArray(t.seg)?t.seg:[])[0]??{};if(!1===i.on)return["rgb(26, 26, 26)","rgb(13, 13, 13)"];const r=("number"==typeof i.bri&&Number.isFinite(i.bri)?Math.max(0,Math.min(255,i.bri)):s)/255,o=[];if(Array.isArray(i.col))for(const e of i.col.slice(0,3)){const[t,s,i]=_(e);o.push(Oe(Pe(t,r),Pe(s,r),Pe(i,r)))}if(!o.length){const e=Pe(255,r),t=Pe(220,r);o.push(Oe(e,t,Math.min(255,t-20)))}return o}(e.wled_state))}function Te(e){return Boolean(e.scene_thumb_url?.trim())}T([L({attribute:!1})],De.prototype,"connection",void 0),T([L()],De.prototype,"controllerId",void 0),T([L({type:Boolean,reflect:!0})],De.prototype,"compact",void 0),T([B()],De.prototype,"_snapshot",void 0),T([B()],De.prototype,"_segments",void 0),T([B()],De.prototype,"_editIds",void 0),T([B()],De.prototype,"_focusSegId",void 0),T([B()],De.prototype,"_filter",void 0),T([B()],De.prototype,"_status",void 0),T([B()],De.prototype,"_meta",void 0),T([B()],De.prototype,"_mergeActive",void 0),T([B()],De.prototype,"_library",void 0),T([B()],De.prototype,"_saveCopyOpen",void 0),T([B()],De.prototype,"_saveCopyName",void 0),T([B()],De.prototype,"_saveSceneOpen",void 0),T([B()],De.prototype,"_saveSceneName",void 0),T([B()],De.prototype,"_needsMergeApply",void 0),De=T([d("wled-view-effects")],De);let Le=class extends l{constructor(){super(...arguments),this.controllerId="",this.scenes=[],this.disabled=!1,this._recents=[],this._visibleCount=6}onPoweredConnect(){this._reload(),this._ro=new ResizeObserver(()=>this._measure()),this.addUnsub(()=>this._ro?.disconnect())}updated(e){e.has("controllerId")&&this._reload();const t=this.renderRoot.querySelector(".recent-row");t&&t!==this._rowEl&&(this._rowEl=t,this._ro?.observe(t),this._measure())}reload(){this._reload()}_reload(){this._recents=C(this.controllerId)}_measure(){const e=this._rowEl;if(!e)return;const t=E(e.clientWidth,104,8,8);t!==this._visibleCount&&(this._visibleCount=t)}_sceneFor(e){return this.scenes.find(t=>t.id===e)}render(){const e=this._recents.filter(e=>this.scenes.some(t=>t.id===e.id)).slice(0,this._visibleCount);return e.length?O`
      <div class="block">
        <span class="label">Recent scenes</span>
        <div class="recent-row" role="group" aria-label="Recent scenes">
          ${e.map(e=>{const t=this._sceneFor(e.id),s=t?.name??e.name,i=t?Fe(t):"linear-gradient(135deg, var(--wled-surface-elevated), var(--wled-surface))",r=t&&Te(t)?t.scene_thumb_url.trim():"";return O`
              <button
                type="button"
                class="chip"
                aria-label=${`Apply scene ${s}`}
                ?disabled=${this.disabled}
                @click=${()=>this.dispatchEvent(new CustomEvent("scene-select",{detail:{sceneId:e.id},bubbles:!0,composed:!0}))}
              >
                <span class="chip-visual">
                  <span
                    class="chip-gradient"
                    style="background:${i}"
                    aria-hidden="true"
                  ></span>
                  ${r?O`<img
                        class="chip-thumb"
                        src=${r}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        @error=${e=>{e.target.style.display="none"}}
                      />`:null}
                  <span class="chip-scrim">
                    <span class="chip-name">${s}</span>
                  </span>
                </span>
              </button>
            `})}
        </div>
      </div>
    `:null}static{this.styles=[...c,F`
      .block {
        margin-bottom: 14px;
      }
      .label {
        display: block;
        margin-bottom: 6px;
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--wled-text-muted);
      }
      .recent-row {
        display: flex;
        flex-wrap: nowrap;
        gap: 8px;
        overflow: hidden;
      }
      .chip {
        flex: 1 1 0;
        min-width: 0;
        max-width: 100%;
        min-height: 120px;
        border: 1px solid var(--wled-border);
        border-radius: var(--wled-radius-sm);
        padding: 0;
        background: var(--wled-surface);
        color: inherit;
        cursor: pointer;
        overflow: hidden;
        transition:
          border-color var(--wled-transition-fast),
          transform var(--wled-transition-fast);
      }
      .chip-visual {
        position: relative;
        display: block;
        width: 100%;
        aspect-ratio: 16 / 9;
        min-height: 72px;
        background: var(--wled-surface-elevated);
      }
      .chip-gradient,
      .chip-thumb {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .chip-thumb {
        object-fit: cover;
        z-index: 1;
      }
      .chip-scrim {
        position: absolute;
        inset: auto 0 0;
        z-index: 2;
        padding: 16px 8px 6px;
        background: linear-gradient(
          180deg,
          transparent 0%,
          color-mix(in srgb, rgb(0 0 0) 72%, transparent) 100%
        );
        pointer-events: none;
      }
      .chip-name {
        display: block;
        font-size: 0.78rem;
        font-weight: 600;
        line-height: 1.2;
        color: var(--wled-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
      }
      .chip:hover:not(:disabled) {
        border-color: color-mix(in srgb, var(--wled-accent) 35%, var(--wled-border));
      }
      .chip:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `]}};T([L()],Le.prototype,"controllerId",void 0),T([L({type:Array})],Le.prototype,"scenes",void 0),T([L({type:Boolean})],Le.prototype,"disabled",void 0),T([B()],Le.prototype,"_recents",void 0),T([B()],Le.prototype,"_visibleCount",void 0),Le=T([d("wled-recent-scenes-row")],Le);let Be=class extends l{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this._scenes=[],this._status="Loading scenes…",this._busy=!1,this._captureName="",this._segments=[],this._applySegIds=[]}onPoweredConnect(){this._load()}willUpdate(e){(e.has("connection")||e.has("controllerId"))&&this.connection&&this.controllerId&&this._load()}onPoweredDisconnect(){this._applyAbort?.abort(),this._applyAbort=void 0}async _load(){if(this.connection&&this.controllerId){this._status="Loading scenes…";try{const[e,t]=await Promise.all([te(this.connection,this.controllerId),a(this.connection,this.controllerId)]);if(this._scenes=e,this._snapshot=t,this._segments=[...t.segments??[]].sort((e,t)=>e.id-t.id),this._segments.length&&!this._applySegIds.length)this._applySegIds=this._segments.map(e=>e.id);else{const e=new Set(this._segments.map(e=>e.id));this._applySegIds=this._applySegIds.filter(t=>e.has(t)),!this._applySegIds.length&&this._segments.length&&(this._applySegIds=this._segments.map(e=>e.id))}this._status=0===this._scenes.length?"No scenes yet — capture the current look or use starter scenes after reload.":""}catch{this._status="Could not load scenes."}}}selectSegmentFromPreview(e){this._toggleApplySeg(e)}_toggleApplySeg(e){let t=ie(this._applySegIds,e);t.length||(t=[e]),this._applySegIds=t}_isLoading(){return"Loading scenes…"===this._status}_renderSkeleton(){return O`
      <div class="skeleton-load" aria-busy="true" aria-label="Loading scenes">
        <wled-skeleton height="2.5rem" width="100%"></wled-skeleton>
        <div class="sk-grid">
          ${Array.from({length:4},()=>O`<wled-skeleton height="120px"></wled-skeleton>`)}
        </div>
      </div>
    `}render(){const e=this.compact;return O`
      <div class="wrap ${e?"compact":""}">
        <header class="head">
          ${e?O`<span class="card-label">Scenes</span>`:O`
                <div>
                  <h2>Scenes</h2>
                  <p class="hint">
                    Apply uses WLED crossfade (<code>tt</code>) on the device — one POST, no
                    client tweening.
                  </p>
                </div>
              `}
          <div class="actions">
            <input
              class="name-in"
              type="text"
              placeholder="Scene name"
              aria-label="New scene name"
              .value=${this._captureName}
              @input=${e=>{this._captureName=e.target.value}}
            />
            <button
              type="button"
              class="primary"
              ?disabled=${this._busy||!this._captureName.trim()}
              @click=${()=>this._capture()}
            >
              ${e?"Save":"Save current look"}
            </button>
          </div>
        </header>

        ${this._isLoading()?this._renderSkeleton():this._status?O`<p class="status">${this._status}</p>`:null}

        ${!e&&this._segments.length?O`
              <wled-segment-bar
                .segments=${this._segments}
                .selectedIds=${this._applySegIds}
                .segmentEntities=${this._snapshot?.segment_entities??[]}
                hint="Apply scenes to highlighted segments"
                @segment-toggle=${e=>this._toggleApplySeg(e.detail.id)}
              ></wled-segment-bar>
            `:null}

        <wled-recent-scenes-row
          .controllerId=${this.controllerId}
          .scenes=${this._scenes}
          ?disabled=${this._busy}
          @scene-select=${e=>{const t=this._scenes.find(t=>t.id===e.detail.sceneId);t&&this._apply(t)}}
        ></wled-recent-scenes-row>

        ${this._conflict?O`
              <div class="conflict" role="alert">
                <p>
                  <strong>${this._conflict.name}</strong> changed on another client.
                  Reload or overwrite?
                </p>
                <div class="row">
                  <button type="button" @click=${()=>this._dismissConflict()}>
                    Reload list
                  </button>
                  <button
                    type="button"
                    class="warn"
                    @click=${()=>this._overwriteConflict()}
                  >
                    Overwrite anyway
                  </button>
                </div>
              </div>
            `:null}

        <div class="grid" role="list">
          ${this._scenes.map(e=>this._sceneTile(e))}
        </div>
      </div>
    `}_sceneTile(e){const t=e.transition_ms??2500,s=Fe(e),i=Te(e)?e.scene_thumb_url.trim():"";return O`
      <article class="tile" role="listitem">
        <button
          type="button"
          class="tile-main"
          aria-label=${`Apply scene ${e.name}`}
          ?disabled=${this._busy}
          @click=${()=>this._apply(e)}
        >
          <div class="tile-visual">
            <div
              class="tile-gradient"
              style="background:${s}"
              aria-hidden="true"
            ></div>
            ${i?O`<img
                  class="tile-thumb"
                  src=${i}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  @error=${e=>{e.target.style.display="none"}}
                />`:null}
            <div class="tile-scrim">
              <span class="tile-name">${e.name}</span>
              ${e.seeded?O`<span class="badge">Starter</span>`:null}
              <span class="tile-meta">${(t/1e3).toFixed(1)}s fade</span>
            </div>
          </div>
        </button>
        ${e.seeded?null:O`
              <button
                type="button"
                class="icon-btn"
                aria-label=${`Delete ${e.name}`}
                ?disabled=${this._busy}
                @click=${()=>this._delete(e)}
              >
                <ha-icon icon="mdi:delete-outline"></ha-icon>
              </button>
            `}
      </article>
    `}_recentScenesRow(){return this.renderRoot.querySelector("wled-recent-scenes-row")??null}async _apply(e){if(this.connection){this._busy=!0,this._applyAbort?.abort(),this._applyAbort=new AbortController;try{const t=this._segments.length>0&&this._applySegIds.length===this._segments.length;await async function(e,t,s,o){await i(e);const n={type:"wled_studio/scene_apply",schema_version:r,controller_id:t,scene_id:s,transition_ms:o?.transitionMs,segment_ids:o?.segmentIds?.length?o.segmentIds:void 0};return o?.signal?new Promise((t,s)=>{const i=()=>s(new DOMException("Aborted","AbortError"));o.signal?.aborted?i():(o.signal?.addEventListener("abort",i,{once:!0}),e.sendMessagePromise(n).then(e=>{o.signal?.removeEventListener("abort",i),t(e.state??{})}).catch(e=>{o.signal?.removeEventListener("abort",i),s(e)}))}):(await e.sendMessagePromise(n)).state??{}}(this.connection,this.controllerId,e.id,{signal:this._applyAbort.signal,segmentIds:t?void 0:[...this._applySegIds]}),A(this.controllerId,e.id,e.name),this._recentScenesRow()?.reload(),await this._load(),X(this,`Applied ${e.name}`),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(e){if("AbortError"!==e.name){X(this,`Apply failed: ${e.message||e.message||"error"}`)}}finally{this._busy=!1}}}async _capture(){if(!this.connection)return;const e=this._captureName.trim();if(e){this._busy=!0;try{const t=await se(this.connection,this.controllerId,e);this._captureName="",X(this,`Saved ${t.name}`),await this._load()}catch(t){X(this,t instanceof Z?`"${e}" was changed on another device — reload and save again.`:`Save failed: ${t.message||"error"}`)}finally{this._busy=!1}}}async _delete(e){if(this.connection&&confirm(`Delete scene "${e.name}"?`)){this._busy=!0;try{await async function(e,t,s){await ee(e,{type:"wled_studio/scene_delete",controller_id:t,scene_id:s})}(this.connection,this.controllerId,e.id),X(this,`Deleted ${e.name}`),await this._load()}catch{X(this,"Delete failed")}finally{this._busy=!1}}}_dismissConflict(){this._conflict=void 0,this._load()}async _overwriteConflict(){if(!this.connection||!this._conflict)return;const e=this._scenes.find(e=>e.id===this._conflict?.id);if(e){this._busy=!0;try{await async function(e,t,s,i){try{return(await ee(e,{type:"wled_studio/scene_save",controller_id:t,scene:s,if_match_etag:i?.ifMatchEtag})).scene??s}catch(e){const t=e;if("conflict"===t?.code&&t.data?.scene)throw new Z(t.data.scene,String(t.data.etag??t.message??""));throw e}}(this.connection,this.controllerId,e,{ifMatchEtag:this._conflict.etag}),this._conflict=void 0,X(this,"Scene overwritten"),await this._load()}catch(e){e instanceof Z?this._conflict=e.remote:X(this,`Overwrite failed: ${e.message||"error"}`)}finally{this._busy=!1}}}static{this.styles=[...c,F`
      .wrap {
        max-width: 960px;
      }
      .wrap.compact {
        max-width: none;
      }
      .wrap.compact .head {
        margin-bottom: 8px;
      }
      .wrap.compact .card-label {
        font-weight: 600;
        font-size: 0.85rem;
      }
      .wrap.compact .name-in {
        min-width: 6rem;
        padding: 6px 8px;
        font-size: 0.85rem;
      }
      .wrap.compact .primary {
        padding: 6px 10px;
        font-size: 0.85rem;
      }
      .wrap.compact .grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 8px;
      }
      .wrap.compact .tile-main {
        padding: 0;
      }
      .head {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
      }
      .head h2 {
        margin: 0 0 4px;
        font-size: 1.15rem;
      }
      .hint {
        margin: 0;
        font-size: 0.85rem;
        color: var(--wled-text-muted);
        max-width: 28rem;
      }
      .actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      .name-in {
        min-width: 10rem;
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
      }
      .status {
        font-size: 0.9rem;
        color: var(--wled-text-muted);
      }
      .skeleton-load {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 12px;
      }
      .sk-grid {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      }
      .conflict {
        padding: 12px;
        margin-bottom: 12px;
        border-radius: 8px;
        background: var(--error-color, #b71c1c);
        color: #fff;
      }
      .conflict .row {
        display: flex;
        gap: 8px;
        margin-top: 8px;
      }
      .warn {
        background: rgba(0, 0, 0, 0.25);
      }
      .grid {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      }
      @container wled-studio (min-width: 600px) {
        .grid {
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        }
      }
      @container wled-studio (min-width: 900px) {
        .grid {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
      }
      .tile {
        display: flex;
        align-items: stretch;
        min-height: 120px;
        border-radius: var(--wled-radius-sm);
        overflow: hidden;
        border: 1px solid var(--wled-border);
        background: var(--wled-surface);
        transition: border-color var(--wled-transition-fast);
      }
      .tile:hover {
        border-color: color-mix(in srgb, var(--wled-accent) 35%, var(--wled-border));
      }
      .tile-main {
        flex: 1;
        display: block;
        min-width: 0;
        padding: 0;
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        text-align: left;
      }
      .tile-main:hover:not(:disabled) {
        background: transparent;
      }
      .tile-main:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }
      .tile-visual {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        min-height: 72px;
        overflow: hidden;
        background: var(--wled-surface-elevated);
      }
      .tile-gradient,
      .tile-thumb {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .tile-thumb {
        object-fit: cover;
        z-index: 1;
      }
      .tile-scrim {
        position: absolute;
        inset: auto 0 0;
        z-index: 2;
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 18px 10px 8px;
        background: linear-gradient(
          180deg,
          transparent 0%,
          color-mix(in srgb, rgb(0 0 0) 72%, transparent) 100%
        );
        color: var(--wled-text);
        pointer-events: none;
      }
      .tile-name {
        font-weight: 600;
        font-size: 0.9rem;
        line-height: 1.2;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
      }
      .badge {
        font-size: 0.62rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
      }
      .tile-meta {
        font-size: 0.68rem;
        color: var(--wled-text-muted);
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
      }
      .icon-btn {
        align-self: stretch;
        border: none;
        border-left: 1px solid var(--wled-border);
        background: transparent;
        color: var(--wled-text-muted);
        padding: 0 10px;
        cursor: pointer;
        transition: background var(--wled-transition-fast);
      }
      .icon-btn:hover:not(:disabled) {
        background: var(--wled-surface-elevated);
        color: var(--wled-text);
      }
    `]}};T([L({attribute:!1})],Be.prototype,"connection",void 0),T([L()],Be.prototype,"controllerId",void 0),T([L({type:Boolean})],Be.prototype,"compact",void 0),T([B()],Be.prototype,"_scenes",void 0),T([B()],Be.prototype,"_status",void 0),T([B()],Be.prototype,"_busy",void 0),T([B()],Be.prototype,"_conflict",void 0),T([B()],Be.prototype,"_captureName",void 0),T([B()],Be.prototype,"_segments",void 0),T([B()],Be.prototype,"_applySegIds",void 0),T([B()],Be.prototype,"_snapshot",void 0),Be=T([d("wled-view-scenes")],Be);let Ue=class extends l{constructor(){super(...arguments),this._toasts=[],this._nextId=0,this._timers=new Map,this._onToast=e=>{const t=e.detail;if(!t?.message)return;const s=++this._nextId;this._toasts=[...this._toasts,{id:s,message:t.message}];const i=this._toastDurationMs(),r=window.setTimeout(()=>this._dismiss(s),i);this._timers.set(s,r)}}onPoweredConnect(){this.getRootNode().addEventListener(Q,this._onToast,{signal:this.abort.signal})}onPoweredDisconnect(){for(const e of this._timers.values())window.clearTimeout(e);this._timers.clear()}_toastDurationMs(){const e=getComputedStyle(this).getPropertyValue("--m-toast").trim(),t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:4e3}_dismiss(e){const t=this._timers.get(e);void 0!==t&&(window.clearTimeout(t),this._timers.delete(e)),this._toasts=this._toasts.filter(t=>t.id!==e)}render(){return this._toasts.length?O`
      <div class="stack" aria-live="polite">
        ${this._toasts.map(e=>O`
            <p class="toast" role="status">${e.message}</p>
          `)}
      </div>
    `:null}static{this.styles=[...c,F`
      :host {
        position: fixed;
        inset: auto 12px 12px;
        z-index: 100;
        display: flex;
        justify-content: center;
        pointer-events: none;
      }
      .stack {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        gap: 8px;
        width: min(100%, 420px);
      }
      .toast {
        margin: 0;
        padding: 10px 14px;
        border-radius: var(--wled-radius-sm);
        background: var(--wled-surface-elevated);
        color: var(--wled-text);
        border: 1px solid var(--wled-border);
        box-shadow: var(--wled-shadow);
        font-size: 0.875rem;
        line-height: 1.35;
        pointer-events: auto;
        animation: wled-toast-in var(--m-view-transition) ease;
      }
      @keyframes wled-toast-in {
        from {
          opacity: 0;
          transform: translateY(12px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .toast {
          animation: none;
        }
      }
    `]}};T([B()],Ue.prototype,"_toasts",void 0),Ue=T([d("wled-toast-host")],Ue);export{Y as S,R as a,J as b,X as c,q as d,j as i,H as p,W as r,te as s};
//# sourceMappingURL=wled-toast-host.js.map

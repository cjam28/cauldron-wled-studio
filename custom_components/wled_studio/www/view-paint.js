import{b as t,i as e,_ as i,n as s,d as o,e as n}from"./wled-studio-core.js";import{B as l,n as h,r,o as a,O as c,H as _,M as u,K as d,h as p,i as f,v as g}from"./geometry-preview.js";import{d as m,a as b,b as y,g as v,c as w,f as x,p as P,e as I}from"./paint.js";function $(t,e,i){const s=i?4:3,o=new Uint8ClampedArray(4*e);for(let n=0;n<e;n++){const e=n*s,l=4*n;o[l]=t[e]??0,o[l+1]=t[e+1]??0,o[l+2]=t[e+2]??0,o[l+3]=i?t[e+3]??0:255}return o}const C={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let F=class extends l{constructor(){super(...arguments),this.controllerId="",this.heading="Brush",this.showOnToggle=!1,this._loadingEffects=!0,this._error="",this._effectFilter=""}onPoweredConnect(){this._load()}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._load(),t.has("settings")&&void 0!==this.settings?.fx&&this._refreshMeta()}async _load(){if(this.connection&&this.controllerId){this._loadingEffects=!0,this._error="";try{this._snapshot=await h(this.connection,this.controllerId),await this._refreshMeta()}catch(t){this._error=r(t)}finally{this._loadingEffects=!1}}}async _refreshMeta(){this.connection&&this.controllerId&&this.settings&&(this._meta=await a(this.connection,this.controllerId,this.settings.fx))}_emit(t){const e={...this.settings,...t};this.dispatchEvent(new CustomEvent("settings-change",{detail:e,bubbles:!0,composed:!0}))}_onColor(t){const{rgb:e,white:i}=t.detail,s={col:[e[0],e[1],e[2],i]};"Fill look"!==this.heading&&(s.fx=c(this._snapshot?.effects_by_name??{})),this._emit(s)}async _onEffectSelect(t){this._emit({fx:t.detail.effectId}),await this._refreshMeta()}_slider(t,e){const i=e.target.value;if(t.startsWith("o"))return void this._emit({[t]:Number(i)>0});const s=p(Number(i));null!==s&&this._emit({[t]:s})}render(){if(!this.settings)return null;const e=_(this.settings.col),i=this._meta,s=i?.sliders??{},o=this._snapshot?.rgbwm??0;return t`
      <div class="block">
        <h3 class="heading">${this.heading}</h3>
        ${this._error?t`<p class="err">${this._error}</p>`:null}
        ${this.showOnToggle?t`
              <label class="row">
                <input
                  type="checkbox"
                  .checked=${this.settings.on}
                  @change=${t=>this._emit({on:t.target.checked})}
                />
                On
              </label>
            `:null}
        <label class="bri-label">
          Brightness
          <ha-slider
            min="0"
            max="255"
            step="1"
            .value=${this.settings.bri}
            @change=${t=>this._slider("bri",t)}
          ></ha-slider>
        </label>

        <wled-color-wheel-rgbw
          .controllerId=${this.controllerId}
          .rgb=${[e[0],e[1],e[2]]}
          .white=${e[3]}
          .awm=${o}
          .showWhite=${(this._snapshot?.led_order??0)>0}
          @color-change=${this._onColor}
        ></wled-color-wheel-rgbw>

        ${this._loadingEffects?t`<p class="muted">Loading effects…</p>`:t`
              <input
                class="fx-search"
                type="search"
                placeholder="Search effects…"
                .value=${this._effectFilter}
                @input=${t=>{this._effectFilter=t.target.value}}
              />

              <wled-effect-chips
                .hass=${this.hass}
                .controllerId=${this.controllerId}
                .fwVer=${this._snapshot?.fw_ver??this._snapshot?.info?.ver??""}
                .thumbBasenames=${this._snapshot?.thumb_basenames??[]}
                .effectsByName=${this._snapshot?.effects_by_name??{}}
                .soundFlags=${this._snapshot?.sound_flags??[]}
                .selectedFx=${this.settings.fx}
                .filter=${this._effectFilter}
                @effect-select=${this._onEffectSelect}
              ></wled-effect-chips>

              <div class="sliders">
                ${Object.entries(C).map(([e,i])=>{if(!s[e])return null;const o=this.settings[e];return"boolean"==typeof o?t`
                      <label class="row">
                        <input
                          type="checkbox"
                          .checked=${o}
                          @change=${t=>this._slider(e,t)}
                        />
                        ${i}
                      </label>
                    `:t`
                    <label>
                      ${i}
                      <ha-slider
                        min="0"
                        max="255"
                        step="1"
                        .value=${o}
                        @change=${t=>this._slider(e,t)}
                      ></ha-slider>
                    </label>
                  `})}
              </div>
            `}
      </div>
    `}static{this.styles=[...u,e`
      .block {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .heading {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 600;
      }
      .bri-label,
      .sliders label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.85rem;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.85rem;
      }
      .fx-search {
        width: 100%;
        box-sizing: border-box;
      }
      .sliders {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .muted {
        opacity: 0.7;
        font-size: 0.85rem;
      }
      .err {
        color: var(--error-color, #cf6679);
      }
    `]}};i([s({attribute:!1})],F.prototype,"connection",void 0),i([s({attribute:!1})],F.prototype,"hass",void 0),i([s()],F.prototype,"controllerId",void 0),i([s()],F.prototype,"heading",void 0),i([s({attribute:!1})],F.prototype,"settings",void 0),i([s({type:Boolean})],F.prototype,"showOnToggle",void 0),i([o()],F.prototype,"_loadingEffects",void 0),i([o()],F.prototype,"_error",void 0),i([o()],F.prototype,"_snapshot",void 0),i([o()],F.prototype,"_meta",void 0),i([o()],F.prototype,"_effectFilter",void 0),F=i([d("wled-paint-settings")],F);let E=class extends l{constructor(){super(...arguments),this.controllerId="",this.embedMode=!1,this.embedLayoutId="",this.embedFixtureId="",this.embedPixelCount=0,this._pixelCount=210,this._rgbw=!0,this._active=!1,this._brush=m(),this._fill=b("off"),this._brushSize=6,this._status="",this._warn="",this._effectsByName={},this._layouts=[],this._layoutId="",this._fixtureId="",this._connectionHealthy=!0,this._connectionReason="",this._segWarn=!1,this._segCount=null,this._maxSegments=null,this._buffer=null,this._previewPixels=null,this._touched=new Set,this._baselineFrame=null,this._healthPollTimer=null,this._healthPollInFlight=!1,this._flushInFlight=!1,this._flushQueued=!1,this._flushColor=function(t,e){let i,s,o=0;const n=(...n)=>{s=n;const l=Date.now(),h=l-o;if(h>=e)return o=l,i&&(clearTimeout(i),i=void 0),void t(...n);i||(i=setTimeout(()=>{i=void 0,o=Date.now(),s&&t(...s)},e-h))};return n.cancel=()=>{i&&clearTimeout(i),i=void 0,s=void 0},n}(()=>{this._flushNow()},20),this._flushEffect=f(()=>{this._flushNow()},60,180)}_previewEl(){return this.embedMode?this._externalPreview:this._internalPreview}get brushSize(){return this._brushSize}get paintLivePreview(){return this._brushIsEffect()}get paintExternalLive(){return!this._brushIsEffect()}bindExternalPreview(t){this._externalPreview=t,t&&this._active&&t.setStatus("live paint"),t&&this._previewPixels?this._syncPreviewPixels():t&&t.refresh()}handleExternalPaintStroke(t){this._onPaintStroke(t)}_emitPaintConfig(){this.dispatchEvent(new CustomEvent("paint-config-change",{bubbles:!0,composed:!0}))}_brushIsEffect(){return"effect"===y(this._brush,this._effectsByName)}updated(t){(t.has("_fill")||t.has("_brush")||t.has("_buffer")||t.has("_layoutId"))&&(this._applyFillToBuffer(),this._brushIsEffect()?this._previewEl()?.setPaintPixels(null):this._syncPreviewPixels()),(t.has("_brush")||t.has("_brushSize"))&&(this.requestUpdate(),this._emitPaintConfig()),this.embedMode&&(t.has("embedLayoutId")||t.has("embedFixtureId")||t.has("embedPixelCount"))&&(this.embedLayoutId&&(this._layoutId=this.embedLayoutId),this.embedFixtureId&&(this._fixtureId=this.embedFixtureId),this.embedPixelCount>0&&(this._pixelCount=this.embedPixelCount),this._previewEl()?.refresh())}async onPoweredConnect(){if(this.connection&&this.controllerId)try{const[t,e]=await Promise.all([h(this.connection,this.controllerId),g(this.connection,this.controllerId)]),i=t.info?.leds;i?.count&&(this._pixelCount=i.count),"boolean"==typeof i?.rgbw&&(this._rgbw=i.rgbw),this._effectsByName=t.effects_by_name??{};const s=t.segments?.[0];if(s){const t=s.col?.[0],e=Array.isArray(t)&&t.length>=3?[t[0],t[1],t[2],t[3]??0]:void 0;this._brush=m(s.fx??0,e)}this._layouts=e,this.embedMode&&this.embedLayoutId?(this._layoutId=this.embedLayoutId,this._fixtureId=this.embedFixtureId||"fixture-0",this.embedPixelCount>0&&(this._pixelCount=this.embedPixelCount)):this._applyLayout(e[0]),this._allocBuffer(),this._status=this.embedMode?this._layoutId?"Drag on the strip preview to paint":"Create a layout in Studio → Layout first":e.length?"Drag on the layout to paint":"Create a layout in the Layout tab first"}catch(t){this._status=r(t)}}_applyLayout(t){if(!t)return this._layoutId="",void(this._fixtureId="");this._layoutId=t.id;const e=t.fixtures[0];this._fixtureId=e?String(e.id??"fixture-0"):"fixture-0",t.pixel_count&&(this._pixelCount=t.pixel_count),this._previewEl()?.refresh()}_onLayoutPick(t){const e=t.target.value,i=this._layouts.find(t=>t.id===e);this._applyLayout(i),this._allocBuffer()}async onPoweredDisconnect(){if(this._flushColor.cancel(),this._flushEffect.cancel(),this._stopHealthPoll(),this._active&&this.connection&&this.controllerId)try{await v(this.connection,this.controllerId,!1)}catch{}this._active=!1,this._touched.clear()}async _ensureSession(){if(this._active||!this.connection||!this.controllerId)return this._active;try{const t=await w(this.connection,this.controllerId);return this._active=!0,this._touched.clear(),this._connectionHealthy=!0,this._connectionReason="",this._segWarn=!1,this._segCount=null,this._maxSegments=null,this._warn=t.wifi_sleep_warning??"",t.pixel_count&&(this._pixelCount=t.pixel_count),"boolean"==typeof t.rgbw&&(this._rgbw=t.rgbw),this._allocBuffer(),this._previewEl()?.setStatus("live paint"),this._status="Live paint",this._startHealthPoll(),"preserve"===this._fill.mode&&this._refreshBaselineFrame(),!0}catch(t){return this._status=r(t),!1}}_allocBuffer(){const t=this._rgbw?4:3;this._buffer=new Uint8Array(this._pixelCount*t),this._previewPixels=null,this._applyFillToBuffer(),this._syncPreviewPixels()}_syncPreviewPixels(t){const e=this._previewEl();if(!this._buffer||!e)return;if(!this._previewPixels||this._previewPixels.length!==4*this._pixelCount)this._previewPixels=$(this._buffer,this._pixelCount,this._rgbw);else if(t?.length){const e=this._rgbw?4:3,i=this._previewPixels;for(const s of t){const t=s*e,o=4*s;i[o]=this._buffer[t]??0,i[o+1]=this._buffer[t+1]??0,i[o+2]=this._buffer[t+2]??0,i[o+3]=this._rgbw?this._buffer[t+3]??0:255}}else this._previewPixels=$(this._buffer,this._pixelCount,this._rgbw);e.setPaintPixels(this._previewPixels)}_brushRgb(){const[t,e,i]=this._brushRgbw();return[t,e,i]}_brushRgbw(){const t=Math.max(0,Math.min(255,this._brush.bri))/255;return[Math.round(this._brush.col[0]*t),Math.round(this._brush.col[1]*t),Math.round(this._brush.col[2]*t),Math.round((this._brush.col[3]??0)*t)]}async cancelLiveIfActive(){if(!this._active||!this.connection||!this.controllerId)return!1;this._flushColor.cancel(),this._flushEffect.cancel(),this._stopHealthPoll();try{await v(this.connection,this.controllerId,!1),this._status="Live paint ended — layout segments restored",this._previewEl()?.setStatus("ready")}catch(t){return this._status=r(t),!1}return this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels(),this.dispatchEvent(new CustomEvent("wled-paint-ended",{bubbles:!0,composed:!0})),this._emitPaintConfig(),!0}_writeLed(t,e){if(!this._buffer)return;const i=t*(this._rgbw?4:3);this._buffer[i]=e[0],this._buffer[i+1]=e[1],this._buffer[i+2]=e[2],this._rgbw&&(this._buffer[i+3]=e[3]??0)}_applyFillToBuffer(){if(!this._buffer)return;if("preserve"===this._fill.mode&&this._hasBaselineFrame()){const t=this._baselineFrame,e=this._rgbw?4:3;for(let i=0;i<this._pixelCount;i++){if(this._touched.has(i))continue;const s=i*e,o=[t[s]??0,t[s+1]??0,t[s+2]??0,this._rgbw?t[s+3]??0:0];this._writeLed(i,o)}return}const t="off"===this._fill.mode?[0,0,0]:"custom"===this._fill.mode?[this._fill.col[0],this._fill.col[1],this._fill.col[2]]:[40,40,40];for(let e=0;e<this._pixelCount;e++)this._touched.has(e)||this._writeLed(e,t)}_hasBaselineFrame(){const t=this._rgbw?4:3;return null!==this._baselineFrame&&this._baselineFrame.length>=this._pixelCount*t}async _refreshBaselineFrame(){if("preserve"===this._fill.mode&&this.connection&&this.controllerId){try{const t=await x(this.connection,this.controllerId);if("preserve"!==this._fill.mode)return;if(t.count>0&&t.pixels.length){const e=Uint8Array.from(t.pixels);this._baselineFrame=t.rgbw===this._rgbw?e:this._realignBaseline(e,t.rgbw,t.count)}else this._baselineFrame=null}catch{this._baselineFrame=null}this._applyFillToBuffer(),this._syncPreviewPixels()}}_realignBaseline(t,e,i){const s=e?4:3,o=this._rgbw?4:3,n=new Uint8Array(i*o);for(let l=0;l<i;l++){const i=l*s,h=l*o;n[h]=t[i]??0,n[h+1]=t[i+1]??0,n[h+2]=t[i+2]??0,this._rgbw&&(n[h+3]=e?t[i+3]??0:0)}return n}_scheduleFlush(){this._brushIsEffect()?this._flushEffect():this._flushColor()}_strokeLeds(t){if(!this._buffer||!t.length)return;if(this._brushIsEffect()){for(const e of t)this._touched.add(e);this._previewEl()?.setPaintPixels(null)}else{const e=this._rgbw?this._brushRgbw():this._brushRgb();for(const i of t)this._writeLed(i,e),this._touched.add(i);this._syncPreviewPixels(t)}this._scheduleFlush()}async _onPaintStroke(t){await this._ensureSession()&&this._strokeLeds(t.detail.leds)}async _flushNow(){if(this._active&&this.connection&&this._buffer)if(this._flushInFlight)this._flushQueued=!0;else{this._flushInFlight=!0;try{const t=await P(this.connection,this.controllerId,this._buffer,{rgbw:this._rgbw,touched:[...this._touched],brush:this._brush,fill:this._fill,effectsByName:this._effectsByName});this._applyPaintHealth(t);const e=this._brushIsEffect()?"effect (device preview)":"color";this._status=`Live paint · ${this._touched.size} LEDs · ${e} · fill: ${this._fill.mode}`}catch(t){this._status=r(t),this._pollHealthNow()}finally{this._flushInFlight=!1,this._flushQueued&&(this._flushQueued=!1,this._flushNow())}}}_applyPaintHealth(t){this._connectionHealthy=t.connectionHealthy,this._connectionReason=t.connectionHealthy?"":t.connectionReason||"Paint connection lost — reconnecting…",this._segWarn=t.segWarn,null!==t.segCount&&(this._segCount=t.segCount),null!==t.maxSegments&&(this._maxSegments=t.maxSegments)}_startHealthPoll(){null===this._healthPollTimer&&(this._healthPollTimer=setInterval(()=>{this._pollHealthNow()},2e3),this.addUnsub(()=>this._stopHealthPoll()))}_stopHealthPoll(){null!==this._healthPollTimer&&(clearInterval(this._healthPollTimer),this._healthPollTimer=null),this._healthPollInFlight=!1}async _pollHealthNow(){if(this._active&&this.connection&&this.controllerId&&!this._healthPollInFlight){this._healthPollInFlight=!0;try{const t=await I(this.connection,this.controllerId);if(!this._active)return;if(!t.active)return void this._applyPaintHealth({...t,connectionHealthy:!1,connectionReason:t.connectionReason||"Paint connection lost — reconnecting…"});this._applyPaintHealth(t)}catch{this._active&&this._applyPaintHealth({connectionHealthy:!1,connectionReason:"Paint connection lost — reconnecting…",consecutiveSendFailures:0,segCount:this._segCount,maxSegments:this._maxSegments,segWarn:this._segWarn})}finally{this._healthPollInFlight=!1}}}_segWarnText(){if(!this._segWarn)return"";const t=this._maxSegments??"?";return`Using ${this._segCount??"?"}/${t} segments — simplify to avoid commit failure`}get paintConnectionHealthy(){return this._connectionHealthy}get paintSegmentWarn(){return this._segWarn}_onBrushChange(t){this._brush=t.detail,this._emitPaintConfig(),this._active&&this._scheduleFlush()}_onFillChange(t){this._fill={...t.detail,mode:this._fill.mode},this._applyFillToBuffer(),this._syncPreviewPixels(),this._active&&this._scheduleFlush()}_onFillModeChange(t){this._fill=b(t),"preserve"!==t&&(this._baselineFrame=null),this._applyFillToBuffer(),this._syncPreviewPixels(),this._active&&this._flushNow(),"preserve"===t&&this._refreshBaselineFrame()}async _commit(){if(this.connection&&this._active){this._flushColor.cancel(),this._flushEffect.cancel(),this._stopHealthPoll(),await this._flushNow();try{await v(this.connection,this.controllerId,!0),this._status="Committed to WLED",this._previewEl()?.setStatus("committed")}catch(t){this._status=r(t)}this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels()}}async _cancel(){if(this.connection&&this._active){this._flushColor.cancel(),this._flushEffect.cancel(),this._stopHealthPoll();try{await v(this.connection,this.controllerId,!1),this._status="Live mode released",this._previewEl()?.setStatus("ready")}catch(t){this._status=r(t)}this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels()}}render(){const e=Boolean(this._layoutId),i=this.embedMode;return t`
      <section class="paint ${i?"compact":""}">
        ${i?null:t`
              <p class="lead">
                Paint on your saved fixture layout (${this._pixelCount} LEDs). Unpainted
                areas use the fill below (default <strong>Off</strong>).
              </p>
            `}
        ${this._warn?t`<p class="warn">${this._warn}</p>`:null}
        ${this._active&&!this._connectionHealthy?t`<p class="recovery" role="status">
              ${this._connectionReason||"Paint connection lost — reconnecting…"}
            </p>`:null}
        ${this._active&&this._segWarn?t`<p class="seg-warn" role="status">${this._segWarnText()}</p>`:null}

        ${!this.embedMode&&this._layouts.length>1?t`
              <label class="layout-pick">
                Layout
                <select .value=${this._layoutId} @change=${this._onLayoutPick}>
                  ${this._layouts.map(e=>t`<option value=${e.id}>${e.name||e.id}</option>`)}
                </select>
              </label>
            `:e?null:t`
                <p class="hint warn-layout">
                  No layout saved —
                  ${this.embedMode?t`open <strong>Studio → Layout</strong> first.`:t`open <strong>Layout</strong> and save a fixture path first.`}
                </p>
              `}

        ${this.embedMode?null:t`
              <div class="layout-canvas">
                <wled-geometry-preview
                  paintMode
                  .externalLive=${!this._brushIsEffect()}
                  .paintLivePreview=${this._brushIsEffect()}
                  .connection=${this.connection}
                  .controllerId=${this.controllerId}
                  .layoutId=${this._layoutId}
                  .fixtureId=${this._fixtureId}
                  .pixelCount=${this._pixelCount}
                  .paintBrushSize=${this._brushSize}
                  @paint-stroke=${this._onPaintStroke}
                ></wled-geometry-preview>
              </div>
            `}

        <div class="settings-grid">
          <wled-paint-settings
            .connection=${this.connection}
            .hass=${this.hass}
            .controllerId=${this.controllerId}
            heading="Brush"
            .settings=${this._brush}
            @settings-change=${this._onBrushChange}
          ></wled-paint-settings>

          <div class="fill-panel">
            <h3 class="heading">Unpainted areas</h3>
            <label class="fill-mode">
              Fill
              <select
                .value=${this._fill.mode}
                @change=${t=>this._onFillModeChange(t.target.value)}
              >
                <option value="off">Off</option>
                <option value="preserve">Keep current look</option>
                <option value="custom">Custom look</option>
              </select>
            </label>
            ${"custom"===this._fill.mode?t`
                  <wled-paint-settings
                    .connection=${this.connection}
                    .hass=${this.hass}
                    .controllerId=${this.controllerId}
                    heading="Fill look"
                    .settings=${this._fill}
                    .showOnToggle=${!0}
                    @settings-change=${this._onFillChange}
                  ></wled-paint-settings>
                `:"preserve"===this._fill.mode?t`<p class="hint">Unpainted LEDs keep colors from before live paint.</p>`:t`<p class="hint">Unpainted LEDs commit as off.</p>`}
          </div>
        </div>

        <div class="tools">
          <label class="brush-row">
            <span>Brush · ${this._brushSize} px</span>
            <ha-slider
              min="1"
              max="20"
              step="1"
              .value=${this._brushSize}
              @change=${t=>{this._brushSize=Number(t.target.value),this._emitPaintConfig()}}
            ></ha-slider>
          </label>
          <button type="button" ?disabled=${!this._active} @click=${()=>this._commit()}>
            End live &amp; commit
          </button>
          <button type="button" ?disabled=${!this._active} @click=${()=>this._cancel()}>
            Cancel live
          </button>
        </div>

        <p class="status">${this._status}</p>
      </section>
    `}static{this.styles=[...u,e`
      .paint {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .paint.compact {
        gap: 8px;
      }
      .paint.compact .settings-grid {
        grid-template-columns: 1fr;
      }
      .paint.compact .tools {
        gap: 8px;
      }
      .paint.compact .tools button {
        font-size: 0.82rem;
        padding: 6px 10px;
      }
      .lead {
        margin: 0;
        opacity: 0.85;
        font-size: 0.9rem;
      }
      .warn,
      .warn-layout {
        color: var(--warning-color, #e6a700);
        margin: 0;
      }
      .recovery {
        margin: 0;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 0.85rem;
        color: var(--error-color, #db4437);
        background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent);
      }
      .seg-warn {
        margin: 0;
        padding: 6px 10px;
        border-radius: 999px;
        align-self: flex-start;
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--warning-color, #e6a700);
        background: color-mix(in srgb, var(--warning-color, #e6a700) 16%, transparent);
      }
      .layout-pick {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.85rem;
        max-width: 320px;
      }
      .layout-canvas {
        width: 100%;
        max-height: min(70vh, 480px);
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--divider-color);
      }
      .layout-canvas wled-geometry-preview {
        display: block;
        width: 100%;
      }
      .settings-grid {
        display: grid;
        gap: 16px;
        grid-template-columns: 1fr;
      }
      @media (min-width: 900px) {
        .settings-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
      .fill-panel {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .heading {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 600;
      }
      .fill-mode {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.85rem;
      }
      .hint {
        margin: 0;
        font-size: 0.85rem;
        opacity: 0.75;
      }
      .tools {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
      }
      .brush-row {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 160px;
        font-size: 0.85rem;
      }
      .status {
        font-size: 0.85rem;
        opacity: 0.8;
      }
    `]}};i([s({attribute:!1})],E.prototype,"connection",void 0),i([s({attribute:!1})],E.prototype,"hass",void 0),i([s()],E.prototype,"controllerId",void 0),i([s({type:Boolean,attribute:"embed-mode"})],E.prototype,"embedMode",void 0),i([s()],E.prototype,"embedLayoutId",void 0),i([s()],E.prototype,"embedFixtureId",void 0),i([s({type:Number})],E.prototype,"embedPixelCount",void 0),i([o()],E.prototype,"_pixelCount",void 0),i([o()],E.prototype,"_rgbw",void 0),i([o()],E.prototype,"_active",void 0),i([o()],E.prototype,"_brush",void 0),i([o()],E.prototype,"_fill",void 0),i([o()],E.prototype,"_brushSize",void 0),i([o()],E.prototype,"_status",void 0),i([o()],E.prototype,"_warn",void 0),i([o()],E.prototype,"_effectsByName",void 0),i([o()],E.prototype,"_layouts",void 0),i([o()],E.prototype,"_layoutId",void 0),i([o()],E.prototype,"_fixtureId",void 0),i([o()],E.prototype,"_connectionHealthy",void 0),i([o()],E.prototype,"_connectionReason",void 0),i([o()],E.prototype,"_segWarn",void 0),i([o()],E.prototype,"_segCount",void 0),i([o()],E.prototype,"_maxSegments",void 0),i([n("wled-geometry-preview")],E.prototype,"_internalPreview",void 0),E=i([d("wled-view-paint")],E);export{E as WledViewPaint};
//# sourceMappingURL=view-paint.js.map

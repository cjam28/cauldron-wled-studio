import{b as e,i as t,_ as i,n as s,d as r}from"./wled-studio-core.js";import{B as o,m as n,N as a,L as l,z as d,n as c,Q as h,j as p}from"./geometry-preview.js";import{b as u,S as v,a as m,i as w,d as g}from"./wled-toast-host.js";import"./view-layout.js";import"./view-devices.js";import"./view-paint.js";import"./view-settings.js";import"./view-audio.js";import"./view-voice.js";import"./view-schedules.js";import"./view-firmware.js";import"./paint.js";let b=class extends o{constructor(){super(...arguments),this.heightPx=56,this.pixelCount=210,this.segments=[],this.selectedSegId=-1,this.highlightSegIds=[],this._status="waiting",this._hoverLed=-1,this._raf=0,this._onCanvasClick=e=>{const t=this._ledAtEvent(e);if(t<0)return;const i=this._segmentForLed(t);i<0||this.dispatchEvent(new CustomEvent("segment-select",{detail:{segmentId:i,ledIndex:t},bubbles:!0,composed:!0}))},this._onCanvasMove=e=>{const t=this._ledAtEvent(e);t!==this._hoverLed&&(this._hoverLed=t,this.requestUpdate(),this._lastPixels&&this._schedulePaint())},this._onCanvasLeave=()=>{this._hoverLed>=0&&(this._hoverLed=-1,this.requestUpdate(),this._lastPixels&&this._schedulePaint())}}setFrame(e){e&&(this._lastPixels=n(e,this.pixelCount),this._status="live",this.requestUpdate(),this.isPowered&&this._schedulePaint())}setStatus(e){this._status=e,this.requestUpdate()}pulseApply(){const e=this.renderRoot.querySelector(".wrap");e&&(e.classList.remove("scene-pulse"),e.getBoundingClientRect(),e.classList.add("scene-pulse"),window.setTimeout(()=>e.classList.remove("scene-pulse"),200))}onPoweredConnect(){this._lastPixels&&this._schedulePaint()}onPoweredDisconnect(){this._raf&&cancelAnimationFrame(this._raf),this._raf=0}firstUpdated(){this._canvas=this.renderRoot.querySelector("canvas")??void 0,this._canvas&&(this._ctx=this._canvas.getContext("2d",{alpha:!1})??void 0,this._canvas.addEventListener("click",this._onCanvasClick),this._canvas.addEventListener("mousemove",this._onCanvasMove),this._canvas.addEventListener("mouseleave",this._onCanvasLeave),this.addUnsub(()=>{this._canvas?.removeEventListener("click",this._onCanvasClick),this._canvas?.removeEventListener("mousemove",this._onCanvasMove),this._canvas?.removeEventListener("mouseleave",this._onCanvasLeave)}))}_ledAtEvent(e){const t=this._canvas;if(!t)return-1;const i=t.getBoundingClientRect(),s=(e.clientX-i.left)/i.width;return Math.min(this.pixelCount-1,Math.max(0,Math.floor(s*this.pixelCount)))}_segmentForLed(e){for(const t of this.segments){const i=t.start??0,s=t.stop??t.len??this.pixelCount;if(e>=i&&e<s)return t.id}return 1===this.segments.length?this.segments[0].id:-1}_ledInSelectedSeg(e){const t=this.highlightSegIds.length>0?this.highlightSegIds:this.selectedSegId>=0?[this.selectedSegId]:[];for(const i of t){const t=this.segments.find(e=>e.id===i);if(!t)continue;const s=t.start??0,r=t.stop??t.len??this.pixelCount;if(e>=s&&e<r)return!0}return!1}_surfaceFill(){return getComputedStyle(this).getPropertyValue("--wled-surface").trim()||"#1e1e1e"}_schedulePaint(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this._paint()}))}_paint(){const e=this._ctx,t=this._canvas;if(!e||!t||!this._lastPixels)return;const i=t.width,s=t.height,r=this.pixelCount,o=i/r;e.fillStyle=this._surfaceFill(),e.fillRect(0,0,i,s);for(let t=0;t<r;t++){const i=4*t,r=this._lastPixels[i],n=this._lastPixels[i+1],a=this._lastPixels[i+2],l=this._ledInSelectedSeg(t),d=t===this._hoverLed;e.fillStyle=`rgb(${r},${n},${a})`,e.shadowColor=`rgba(${r},${n},${a},0.85)`,e.shadowBlur=this.remote.state.disableBloom?0:l||d?10:6;const c=l?0:2,h=l?s:s-4;e.fillRect(t*o,c,Math.max(1,o-1),h),l&&(e.strokeStyle="rgba(255,255,255,0.9)",e.lineWidth=2,e.strokeRect(t*o+.5,.5,Math.max(1,o-2),s-1))}e.shadowBlur=0}render(){const t=Math.max(320,3*this.pixelCount);return e`
      <div class="wrap" role="img" aria-label="Live LED strip preview — tap a pixel to select its segment">
        <canvas
          width=${t}
          height=${this.heightPx}
          style="cursor: crosshair"
        ></canvas>
        ${"live"!==this._status?e`<span class="overlay">${this._status}</span>`:null}
      </div>
    `}static{this.styles=[...a,t`
      .wrap {
        position: relative;
        border-radius: var(--wled-radius-sm);
        overflow: hidden;
        background: var(--wled-surface);
        transform-origin: center center;
      }
      .wrap.scene-pulse {
        animation: scene-apply-pulse var(--m-scene-confirm) ease;
      }
      @keyframes scene-apply-pulse {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        45% {
          transform: scale(1.02);
          opacity: 0.88;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .wrap.scene-pulse {
          animation: none;
        }
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
        color: var(--wled-text-muted);
        background: rgba(0, 0, 0, 0.35);
      }
    `]}};i([s({type:Number})],b.prototype,"heightPx",void 0),i([s({type:Number})],b.prototype,"pixelCount",void 0),i([s({type:Array})],b.prototype,"segments",void 0),i([s({type:Number})],b.prototype,"selectedSegId",void 0),i([s({type:Array})],b.prototype,"highlightSegIds",void 0),i([r()],b.prototype,"_status",void 0),i([r()],b.prototype,"_hoverLed",void 0),b=i([l("wled-strip-preview")],b);let _=class extends o{constructor(){super(...arguments),this.controllerId="",this.heightPx=56,this.selectedSegId=-1,this.highlightSegIds=[],this._pixelCount=210,this._segments=[],this._status="connecting"}willUpdate(e){(e.has("connection")||e.has("controllerId"))&&this.connection&&this.controllerId&&this._bootstrap()}onPoweredConnect(){this._bootstrap()}onPoweredDisconnect(){this._unsubLive?.(),this._unsubLive=void 0}async _bootstrap(){if(this.connection&&this.controllerId){this._status="connecting",this._preview()?.setStatus(this._status);try{const e=(await d(this.connection)).find(e=>String(e.entry_id)===this.controllerId);this._pixelCount=Number(e?.pixel_count)||210;const t=await c(this.connection,this.controllerId);this._segments=t.segments??[]}catch{this._segments=[]}this._startLive()}}_startLive(){this.connection&&this.controllerId&&(this._unsubLive?.(),this._unsubLive=h(this.connection,this.controllerId,e=>{this._status=function(e){return!0===e.stale||"stale"===e.status?"stale":"drop"===e.status||(e.dropped??0)>0?"throttled":"live"}(e),this._preview()?.setStatus(this._status),"stale"!==this._status&&this._preview()?.setFrame(e)},{remote:this.remote.state.isRemote}),this.addUnsub(()=>this._unsubLive?.()))}pulseApply(){this._preview()?.pulseApply()}async refreshSegments(){if(this.connection&&this.controllerId)try{const e=await c(this.connection,this.controllerId);this._segments=e.segments??[]}catch{}}_preview(){return this.renderRoot.querySelector("wled-strip-preview")??void 0}_isStale(){return"stale"===this._status}_isThrottled(){return"throttled"===this._status}_onSegmentSelect(e){this.dispatchEvent(new CustomEvent("segment-select",{detail:e.detail,bubbles:!0,composed:!0}))}render(){return e`
      <div class="rail-preview">
        <p class="label">Live strip</p>
        <wled-strip-preview
          .heightPx=${this.heightPx}
          .pixelCount=${this._pixelCount}
          .segments=${this._segments}
          .selectedSegId=${this.selectedSegId}
          .highlightSegIds=${this.highlightSegIds}
          @segment-select=${this._onSegmentSelect}
        ></wled-strip-preview>
        ${this._isStale()?e`<span class="status status-badge" role="status"
              >reconnecting</span
            >`:this._isThrottled()?e`<span class="status status-hint">throttled</span>`:"live"!==this._status?e`<span class="status">${this._status}</span>`:null}
      </div>
    `}static{this.styles=[...a,t`
      .rail-preview {
        margin-bottom: 14px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color);
      }
      .label {
        margin: 0 0 6px;
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        opacity: 0.65;
      }
      .status {
        display: block;
        margin-top: 4px;
        font-size: 0.75rem;
        opacity: 0.6;
      }
      /* Throttled hint — coalesced delivery is NORMAL for a remote viewer, so
         this is deliberately subtle (muted, lowercase, no chip): an informational
         note that frames are being skipped, NEVER an alarming "stale/dropped"
         badge and NEVER implying a freeze (the strip keeps painting). */
      .status-hint {
        display: inline-block;
        margin-top: 4px;
        font-size: 0.68rem;
        letter-spacing: 0.02em;
        opacity: 0.45;
      }
      /* LV-4 stale badge — reserved for a GENUINELY stale stream (upstream
         paused >= LIVE_STALE_SEC). Distinct from the muted connecting label and
         from the subtle throttled hint. Container-relative chip; M3 tokens with
         safe fallbacks; no viewport media queries (sizing follows the
         surrounding rail container). */
      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        width: max-content;
        max-width: 100%;
        margin-top: 6px;
        padding: 2px 8px;
        border-radius: var(--wled-radius-sm, 6px);
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        opacity: 1;
        color: var(--md-sys-color-on-tertiary-container, var(--wled-text, #fff));
        background: var(
          --md-sys-color-tertiary-container,
          var(--wled-accent-soft, rgba(255, 193, 7, 0.18))
        );
      }
    `]}};i([s({attribute:!1})],_.prototype,"connection",void 0),i([s()],_.prototype,"controllerId",void 0),i([s({type:Number})],_.prototype,"heightPx",void 0),i([s({type:Number})],_.prototype,"selectedSegId",void 0),i([s({type:Array})],_.prototype,"highlightSegIds",void 0),i([r()],_.prototype,"_pixelCount",void 0),i([r()],_.prototype,"_segments",void 0),i([r()],_.prototype,"_status",void 0),_=i([l("wled-studio-live-preview")],_);const f="wled-studio-panel",x="wled_studio.onboarded",y=[{id:"color",label:"Color",icon:"mdi:palette"},{id:"effects",label:"Effects",icon:"mdi:auto-fix"},{id:"scenes",label:"Scenes",icon:"mdi:palette-swatch"},{id:"paint",label:"Paint",icon:"mdi:brush"}],$=[{id:"layout",label:"Layout",icon:"mdi:vector-polygon"},{id:"devices",label:"Devices",icon:"mdi:devices"},{id:"audio",label:"Audio",icon:"mdi:music"},{id:"voice",label:"Voice",icon:"mdi:microphone-message"},{id:"schedules",label:"Schedules",icon:"mdi:clock-outline"},{id:"controller",label:"Controller",icon:"mdi:web"},{id:"settings",label:"Settings",icon:"mdi:cog"},{id:"firmware",label:"Firmware",icon:"mdi:chip"}];function S(e){return $.some(t=>t.id===e)}class k extends o{constructor(){super(...arguments),this._session=new u(this),this._nav=new v(this,{initial:"color",normalize:e=>"segments"===e?"color":e}),this._selection=new m(this),this._drawerOpen=!1,this._moreExpanded=!1,this._showOnboard=!1}get _view(){return this._nav.view}get _controllerId(){return this._session.controllerId}get _controllers(){return this._session.controllers}get _previewSegId(){return this._selection.selectedSegId}get _previewHighlightIds(){return this._selection.highlightSegIds}onPoweredConnect(){try{this._showOnboard=!localStorage.getItem(x)}catch{this._showOnboard=!1}S(this._view)&&(this._moreExpanded=!0),this._loadController()}onPoweredDisconnect(){this._unbindOnboardModal()}updated(e){super.updated(e),e.has("_showOnboard")&&(this._showOnboard?this._bindOnboardModal():this._unbindOnboardModal())}async _loadController(){this.hass?.connection&&await this._session.loadControllers(this.hass.connection)}_dismissOnboard(){try{localStorage.setItem(x,"1")}catch{}this._showOnboard=!1}_bindOnboardModal(){this._unbindOnboardModal(),this._onboardKeyHandler=e=>{if("Escape"===e.key)return e.preventDefault(),void this._dismissOnboard();if("Tab"!==e.key)return;const t=this.renderRoot.querySelector(".onboard-card");if(!t)return;const i=t.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');if(!i.length)return;const s=i[0],r=i[i.length-1];e.shiftKey&&document.activeElement===s?(e.preventDefault(),r.focus()):e.shiftKey||document.activeElement!==r||(e.preventDefault(),s.focus())},document.addEventListener("keydown",this._onboardKeyHandler),this.scheduleRaf(()=>{this.renderRoot.querySelector(".onboard-primary")?.focus()})}_unbindOnboardModal(){this._onboardKeyHandler&&(document.removeEventListener("keydown",this._onboardKeyHandler),this._onboardKeyHandler=void 0)}_onControllerPick(e){this._session.setControllerId(e.target.value)}render(){const t=this.remote.state;return e`
      <div class="shell" role="application" aria-label="WLED Studio">
        ${w()?e`
              <ha-alert alert-type="warning" class="stale-banner">
                WLED Studio updated — refresh this page to apply changes.
              </ha-alert>
            `:null}
        ${this._showOnboard?e`
              <div
                class="onboard-overlay"
                @click=${e=>{e.target===e.currentTarget&&this._dismissOnboard()}}
              >
                <div
                  class="onboard-card"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Welcome to WLED Studio"
                >
                  <h2>Welcome to WLED Studio</h2>
                  <p>
                    Pick colors in <strong>Color</strong>, browse
                    <strong>Effects</strong> and <strong>Scenes</strong>, then use
                    <strong>Layout</strong> (under More) to map your install.
                  </p>
                  <ol>
                    <li>Pick your controller in the header (if you have several).</li>
                    <li>Open Layout → apply segments from anchors.</li>
                    <li>Settings → Recapture thumbnails once (takes several minutes).</li>
                  </ol>
                  <button
                    type="button"
                    class="onboard-primary primary"
                    @click=${()=>this._dismissOnboard()}
                  >
                    Get started
                  </button>
                </div>
              </div>
            `:null}
        <div
          class="drawer-backdrop ${this._drawerOpen?"visible":""}"
          aria-hidden=${this._drawerOpen?"false":"true"}
          @click=${()=>this._closeDrawer()}
        ></div>
        <aside
          class="rail ${this._drawerOpen?"open":""}"
          aria-label="Navigation"
        >
          <div class="rail-head">
            <span class="rail-title">More</span>
            <button
              type="button"
              class="drawer-close cq-compact"
              aria-label="Close menu"
              @click=${()=>this._closeDrawer()}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <nav class="rail-nav desktop-primary" aria-label="Primary sections">
            ${y.map(e=>this._navItem(e.id,e.label,e.icon))}
          </nav>
          <div class="more-section desktop-more">
            <button
              type="button"
              class="more-toggle"
              aria-label="More sections"
              aria-expanded=${this._moreExpanded?"true":"false"}
              @click=${()=>this._toggleMore()}
            >
              <ha-icon
                .icon=${this._moreExpanded?"mdi:chevron-down":"mdi:chevron-right"}
              ></ha-icon>
              <span>More</span>
            </button>
            ${this._moreExpanded?e`
                  <nav class="more-nav" aria-label="More sections">
                    ${$.map(e=>this._navItem(e.id,e.label,e.icon))}
                  </nav>
                `:null}
          </div>
          <nav class="rail-nav mobile-more" aria-label="More sections">
            ${$.map(e=>this._navItem(e.id,e.label,e.icon))}
          </nav>
        </aside>
        <main class="stage">
          <header class="top">
            <button
              type="button"
              class="hamburger cq-compact"
              aria-label="Open more menu"
              aria-expanded=${this._drawerOpen?"true":"false"}
              @click=${()=>this._toggleDrawer()}
            >
              <ha-icon icon="mdi:menu"></ha-icon>
            </button>
            <h1>WLED Studio</h1>
            ${this._controllers.length>1?e`
                  <label class="controller-pick">
                    <span class="sr-only">Controller</span>
                    <select
                      aria-label="WLED controller"
                      @change=${this._onControllerPick}
                    >
                      ${this._controllers.map(t=>e`
                          <option
                            value=${t.entry_id}
                            ?selected=${t.entry_id===this._controllerId}
                          >
                            ${t.title??t.entry_id}
                          </option>
                        `)}
                    </select>
                  </label>
                `:null}
            ${t.isRemote?e`<span class="remote-pill">Remote preview</span>`:null}
          </header>
          <nav class="primary-bar" aria-label="Primary sections">
            ${y.map(e=>this._primaryTab(e.id,e.label,e.icon))}
          </nav>
          <section
            class="content"
            aria-live="polite"
            @wled-preview-refresh=${()=>this.refreshLivePreview()}
          >
            ${this._renderPreview()}
            ${this._renderView()}
          </section>
        </main>
      </div>
      <wled-toast-host></wled-toast-host>
    `}_navItem(t,i,s){const r=this._view===t;return e`
      <button
        class="nav ${r?"active":""}"
        aria-label=${i}
        aria-current=${r?"page":"false"}
        @click=${()=>this._selectView(t)}
      >
        <ha-icon .icon=${s}></ha-icon>
        <span>${i}</span>
      </button>
    `}_primaryTab(t,i,s){const r=this._view===t;return e`
      <button
        class="primary-tab ${r?"active":""}"
        role="tab"
        aria-label=${i}
        aria-selected=${r?"true":"false"}
        @click=${()=>this._selectView(t)}
      >
        <ha-icon .icon=${s}></ha-icon>
        <span>${i}</span>
      </button>
    `}_viewsWithStripPreview(){return"color"===this._view||"scenes"===this._view||"effects"===this._view}_renderPreview(){const t=this.hass?.connection,i=this._controllerId;return t&&i&&this._viewsWithStripPreview()?e`
      <wled-studio-live-preview
        .connection=${t}
        .controllerId=${i}
        .selectedSegId=${this._previewSegId}
        .highlightSegIds=${this._previewHighlightIds}
        @segment-select=${this._onPreviewSegmentSelect}
      ></wled-studio-live-preview>
    `:null}_onPreviewSegmentSelect(e){const t=e.detail.segmentId;this._selection.selectSegment(t),"color"===this._view?this.renderRoot.querySelector("wled-segment-controls")?.selectSegment(t):"effects"===this._view?this.renderRoot.querySelector("wled-view-effects")?.selectSegmentFromPreview(t):"scenes"===this._view&&this.renderRoot.querySelector("wled-view-scenes")?.selectSegmentFromPreview(t)}_onPreviewTargetsChanged(e){this._selection.applyTargetsChanged(e.detail)}_livePreview(){return this.renderRoot.querySelector("wled-studio-live-preview")??null}refreshLivePreview(){const e=this._livePreview();e?.pulseApply(),e?.refreshSegments()}_masterEntityForController(){return this._session.masterEntityFor(this._controllerId)}_renderFirmwareView(t,i){const s=this._controllers.find(e=>e.entry_id===i);return e`
      <wled-view-firmware
        .connection=${t}
        .controllerId=${i}
        .host=${s?.host??""}
        .controllerTitle=${s?.title??i}
      ></wled-view-firmware>
    `}_renderView(){const t=this.hass?.connection,i=this._controllerId;if("devices"!==this._view&&"settings"!==this._view&&!i)return e`
        <p>
          Connect a WLED Studio controller under
          <strong>Settings → Devices & services</strong>, then reload this panel.
        </p>
      `;if("devices"===this._view&&t)return e`
        <wled-view-devices .connection=${t}></wled-view-devices>
      `;if("layout"===this._view&&t&&i)return e`
        <wled-view-layout
          .connection=${t}
          .hass=${this.hass}
          .controllerId=${i}
        ></wled-view-layout>
      `;if("scenes"===this._view&&t&&i)return e`
        <wled-view-scenes .connection=${t} .controllerId=${i}></wled-view-scenes>
      `;if("effects"===this._view&&t&&i)return e`
        <wled-view-effects
          .hass=${this.hass}
          .connection=${t}
          .controllerId=${i}
          @segment-targets-changed=${this._onPreviewTargetsChanged}
        ></wled-view-effects>
      `;if("color"===this._view&&t&&i){const s=this._masterEntityForController();return e`
        <wled-segment-controls
          .hass=${this.hass}
          .connection=${t}
          .controllerId=${i}
          .masterEntity=${s}
          compact
          @segment-targets-changed=${this._onPreviewTargetsChanged}
        ></wled-segment-controls>
      `}return"paint"===this._view&&t&&i?e`
        <wled-view-paint
          .hass=${this.hass}
          .connection=${t}
          .controllerId=${i}
        ></wled-view-paint>
      `:("controller"===this._view||"firmware"===this._view)&&t&&i?this._renderFirmwareView(t,i):"audio"===this._view&&i?e`<wled-view-audio
        .connection=${t}
        .controllerId=${i}
      ></wled-view-audio>`:"voice"===this._view&&t&&i?e`
        <wled-view-voice
          .connection=${t}
          .controllerId=${i}
          .masterEntity=${this._masterEntityForController()}
        ></wled-view-voice>
      `:"schedules"===this._view&&t&&i?e`
        <wled-view-schedules .connection=${t} .controllerId=${i}></wled-view-schedules>
      `:"settings"===this._view&&t&&i?e`
        <wled-view-settings .connection=${t} .controllerId=${i}></wled-view-settings>
      `:e`<p>Select a section from the menu.</p>`}_selectView(e){const t="paint"===this._view&&"paint"!==e;t&&this._abortActivePaint(),this._nav.select(e),S(e)&&(this._moreExpanded=!0),this._closeDrawer(),t&&this.refreshLivePreview()}async _abortActivePaint(){const e=this.renderRoot.querySelector("wled-view-paint");if(!e||!("cancelLiveIfActive"in e))return;const t=e;await t.cancelLiveIfActive()}_toggleMore(){this._moreExpanded=!this._moreExpanded}_toggleDrawer(){this._drawerOpen=!this._drawerOpen}_closeDrawer(){this._drawerOpen=!1}static{this.styles=[...a,t`
      .shell {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        min-height: 100%;
        background: var(--primary-background-color);
        position: relative;
      }
      .stale-banner {
        display: block;
        margin: 8px 12px 0;
        grid-column: 1 / -1;
      }
      @container wled-studio (min-width: 600px) {
        .shell {
          grid-template-columns: 200px 1fr;
        }
      }
      .onboard-overlay {
        position: fixed;
        inset: 0;
        z-index: 300;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.45);
      }
      .onboard-card {
        width: min(100%, 420px);
        max-height: min(90vh, 520px);
        overflow: auto;
        padding: 20px;
        border-radius: var(--wled-radius);
        background: var(--wled-surface);
        color: var(--wled-text);
        box-shadow: var(--wled-shadow);
      }
      .onboard-card h2 {
        margin: 0 0 8px;
        font-size: 1.15rem;
      }
      .onboard-card p {
        margin: 0 0 8px;
        color: var(--wled-text-muted);
      }
      .onboard-card ol {
        margin: 8px 0 16px;
        padding-left: 1.2rem;
        color: var(--wled-text-muted);
      }
      .onboard-primary {
        width: 100%;
        min-height: var(--wled-tap);
        border: none;
        border-radius: var(--wled-radius-sm);
        background: var(--wled-accent);
        color: var(--text-primary-color, #fff);
        font-weight: 600;
        cursor: pointer;
      }
      .drawer-backdrop {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 40;
        background: rgba(0, 0, 0, 0.45);
      }
      .drawer-backdrop.visible {
        display: block;
      }
      @container wled-studio (min-width: 600px) {
        .drawer-backdrop {
          display: none !important;
        }
      }
      .rail {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 50;
        width: min(280px, 86vw);
        height: 100%;
        max-height: 100dvh;
        padding: 8px;
        box-sizing: border-box;
        border-right: 1px solid var(--wled-border);
        background: var(--wled-surface);
        box-shadow: 4px 0 24px rgba(0, 0, 0, 0.25);
        transform: translateX(-105%);
        transition: transform var(--wled-transition);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
      .rail.open {
        transform: translateX(0);
      }
      @container wled-studio (min-width: 600px) {
        .rail {
          position: static;
          z-index: auto;
          width: auto;
          height: auto;
          max-height: none;
          transform: none;
          box-shadow: none;
          transition: none;
        }
      }
      .rail-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 4px 12px;
      }
      .rail-title {
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--wled-text-muted);
      }
      .drawer-close {
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 6px;
        border-radius: var(--wled-radius-sm);
      }
      @container wled-studio (min-width: 600px) {
        .drawer-close,
        .rail-head,
        .mobile-more {
          display: none;
        }
      }
      .desktop-primary,
      .desktop-more {
        display: none;
      }
      @container wled-studio (min-width: 600px) {
        .desktop-primary {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .desktop-more {
          display: block;
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid var(--wled-border);
        }
      }
      .rail-nav,
      .more-nav {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .more-toggle {
        display: flex;
        align-items: center;
        gap: 6px;
        width: 100%;
        padding: 8px 12px;
        border: none;
        background: transparent;
        color: var(--wled-text-muted);
        cursor: pointer;
        border-radius: var(--wled-radius-sm);
        font-size: 0.82rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .more-toggle:hover {
        background: var(--wled-surface-elevated);
      }
      .nav {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        padding: 10px 12px;
        padding-left: 12px;
        border: none;
        border-left: 3px solid transparent;
        background: transparent;
        color: inherit;
        cursor: pointer;
        border-radius: var(--wled-radius-sm);
        transition: background var(--wled-transition);
        font-size: 0.95rem;
        text-align: left;
      }
      .nav.active {
        border-left-color: var(--wled-accent);
        padding-left: 9px;
        font-weight: 600;
      }
      .nav:not(.active):hover {
        background: var(--wled-surface-elevated);
      }
      .stage {
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .top {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--wled-border);
        flex-shrink: 0;
      }
      .top h1 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
      }
      .hamburger {
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 6px;
        border-radius: var(--wled-radius-sm);
        flex-shrink: 0;
      }
      @container wled-studio (min-width: 600px) {
        .hamburger {
          display: none;
        }
      }
      .primary-bar {
        display: flex;
        gap: 4px;
        padding: 0 8px 8px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        border-bottom: 1px solid var(--wled-border);
        flex-shrink: 0;
      }
      @container wled-studio (min-width: 600px) {
        .primary-bar {
          display: none;
        }
      }
      .primary-tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        min-width: var(--wled-tap);
        min-height: var(--wled-tap);
        padding: 6px 10px;
        border: none;
        border-bottom: 3px solid transparent;
        background: transparent;
        color: var(--wled-text-muted);
        cursor: pointer;
        border-radius: var(--wled-radius-sm) var(--wled-radius-sm) 0 0;
        font-size: 0.68rem;
        flex-shrink: 0;
        transition:
          color var(--wled-transition),
          border-color var(--wled-transition);
      }
      .primary-tab ha-icon {
        font-size: 22px;
      }
      .primary-tab.active {
        color: var(--wled-text);
        border-bottom-color: var(--wled-accent);
        font-weight: 600;
      }
      .primary-tab:not(.active):hover {
        color: var(--wled-text);
        background: var(--wled-surface-elevated);
      }
      .controller-pick select {
        max-width: 200px;
        font-size: 0.85rem;
      }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }
      .remote-pill {
        margin-left: auto;
        font-size: 0.75rem;
        padding: 4px 10px;
        border-radius: 999px;
        background: var(--warning-color, #e65100);
      }
      .content {
        padding: 16px;
        min-height: 0;
        flex: 1;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }
    `]}}i([r()],k.prototype,"_drawerOpen",void 0),i([r()],k.prototype,"_moreExpanded",void 0),i([r()],k.prototype,"_showOnboard",void 0),g(),p(f,k),console.info("[wled-studio] panel bundle loaded",{panel:f});
//# sourceMappingURL=wled-studio-panel.js.map

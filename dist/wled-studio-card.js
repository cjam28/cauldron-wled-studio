import{b as e,r as t,i,_ as o,n as s,d as a,e as n,c as r}from"./wled-studio-core.js";import{B as l,G as c,z as d,v as h,Q as p,n as u,d as g,N as v,L as m,j as f}from"./geometry-preview.js";import{a as w,b,S as y,r as _,p as x,i as $,d as S}from"./wled-toast-host.js";const I=[{id:"home",label:"Home",icon:"mdi:home-variant",group:"primary",density:"both"},{id:"color",label:"Color",icon:"mdi:palette",group:"primary",density:"both"},{id:"effects",label:"Effects",icon:"mdi:animation-play",group:"primary",density:"both"},{id:"scenes",label:"Scenes",icon:"mdi:palette-swatch",group:"primary",density:"both"},{id:"segments",label:"Segments",icon:"mdi:vector-line",group:"primary",density:"both"},{id:"paint",label:"Paint",icon:"mdi:brush",group:"more",density:"both"},{id:"layout",label:"Layout",icon:"mdi:vector-polygon",group:"more",density:"full"},{id:"audio",label:"Audio",icon:"mdi:music",group:"more",density:"full"},{id:"voice",label:"Voice",icon:"mdi:microphone-message",group:"more",density:"full"},{id:"schedules",label:"Schedules",icon:"mdi:clock-outline",group:"more",density:"full"},{id:"devices",label:"Devices",icon:"mdi:devices",group:"more",density:"full"},{id:"controller",label:"Controller",icon:"mdi:web",group:"more",density:"full"},{id:"settings",label:"Settings",icon:"mdi:cog",group:"more",density:"full"},{id:"firmware",label:"Firmware",icon:"mdi:chip",group:"more",density:"full"}];function C(e){return I.find(t=>t.id===e)}function k(e,t="card"){return e?e.map(e=>C(e)).filter(e=>void 0!==e):"card"===t?I.filter(e=>"full"!==e.density):[...I]}const P={paint:()=>import("./view-paint.js"),layout:()=>import("./view-layout.js"),audio:()=>import("./view-audio.js"),voice:()=>import("./view-voice.js"),schedules:()=>import("./view-schedules.js"),devices:()=>import("./view-devices.js"),controller:()=>import("./view-firmware.js"),settings:()=>import("./view-settings.js"),firmware:()=>import("./view-firmware.js")},E=new Map;function L(e){return!(e in P)}const B={home:t=>e`
  <wled-segment-controls
    class="tab-panel"
    .hass=${t.hass}
    .connection=${t.connection}
    .controllerId=${t.controllerId}
    .masterEntity=${t.masterEntity}
    .selectedSegId=${t.selectedSegId}
    compact
    hideSegmentBrightness
    @segment-change=${t.onSegmentChange}
    @segment-targets-changed=${t.onSegmentTargetsChanged}
  ></wled-segment-controls>
  <wled-view-scenes
    class="tab-panel"
    .connection=${t.connection}
    .controllerId=${t.controllerId}
    compact
  ></wled-view-scenes>
`,color:t=>e`
  <wled-segment-controls
    class="tab-panel"
    .hass=${t.hass}
    .connection=${t.connection}
    .controllerId=${t.controllerId}
    .masterEntity=${t.masterEntity}
    .selectedSegId=${t.selectedSegId}
    compact
    hideSegmentBrightness
    @segment-change=${t.onSegmentChange}
    @segment-targets-changed=${t.onSegmentTargetsChanged}
  ></wled-segment-controls>
`,effects:t=>e`
  <wled-view-effects
    class="tab-panel"
    compact
    .hass=${t.hass}
    .connection=${t.connection}
    .controllerId=${t.controllerId}
    @segment-targets-changed=${t.onSegmentTargetsChanged}
  ></wled-view-effects>
`,scenes:t=>e`
  <wled-view-scenes
    class="tab-panel"
    .connection=${t.connection}
    .controllerId=${t.controllerId}
    compact
  ></wled-view-scenes>
`,segments:t=>e`
  <wled-segment-controls
    class="tab-panel"
    .hass=${t.hass}
    .connection=${t.connection}
    .controllerId=${t.controllerId}
    .masterEntity=${t.masterEntity}
    .selectedSegId=${t.selectedSegId}
    compact
    @segment-change=${t.onSegmentChange}
    @segment-targets-changed=${t.onSegmentTargetsChanged}
  ></wled-segment-controls>
`,paint:t=>e`
  <wled-view-paint
    class="tab-panel"
    embed-mode
    .connection=${t.connection}
    .hass=${t.hass}
    .controllerId=${t.controllerId}
    .embedLayoutId=${t.layoutId}
    .embedFixtureId=${t.fixtureId}
    .embedPixelCount=${t.pixelCount}
    @paint-config-change=${t.onPaintConfigChange}
  ></wled-view-paint>
`,layout:t=>e`
  <wled-view-layout
    .connection=${t.connection}
    .hass=${t.hass}
    .controllerId=${t.controllerId}
  ></wled-view-layout>
`,audio:t=>e`
  <wled-view-audio
    .connection=${t.connection}
    .controllerId=${t.controllerId}
  ></wled-view-audio>
`,voice:t=>e`
  <wled-view-voice
    .connection=${t.connection}
    .controllerId=${t.controllerId}
    .masterEntity=${t.masterEntity}
  ></wled-view-voice>
`,schedules:t=>e`
  <wled-view-schedules
    .connection=${t.connection}
    .controllerId=${t.controllerId}
  ></wled-view-schedules>
`,devices:t=>e`
  <wled-view-devices .connection=${t.connection}></wled-view-devices>
`,controller:t=>e`
  <wled-view-firmware
    .connection=${t.connection}
    .controllerId=${t.controllerId}
  ></wled-view-firmware>
`,settings:t=>e`
  <wled-view-settings
    .connection=${t.connection}
    .controllerId=${t.controllerId}
  ></wled-view-settings>
`,firmware:t=>e`
  <wled-view-firmware
    .connection=${t.connection}
    .controllerId=${t.controllerId}
  ></wled-view-firmware>
`};const V=.6,D=.86,T="blur(24px) saturate(140%)";function R(e){return`color-mix(in srgb, var(--md-sys-color-surface-container, var(--ha-card-background, #f3edf7)) ${Math.round(100*e)}%, transparent)`}const z=i`
  .glass {
    background-color: ${t(R(.72))};
    backdrop-filter: ${t(T)};
    -webkit-backdrop-filter: ${t(T)};
    border: 1px solid
      var(--md-sys-color-outline-variant, var(--divider-color, #cac4d0));
    /* 24px to match the md3-wall/md3-port card convention (bespoke radius,
       not the standard M3 corner-large=16px which @material/web rounds from). */
    border-radius: var(--wled-radius, 24px);
    box-shadow: var(--md-sys-elevation-level2, 0 6px 18px rgba(0, 0, 0, 0.1));
    color: var(--md-sys-color-on-surface, var(--primary-text-color, #1d1b20));
  }

  /* Card surface: most translucent — wallpaper reads through. */
  :host([surface="card"]) .glass,
  .glass[data-surface="card"] {
    background-color: ${t(R(V))};
  }

  /* Panel surface: stronger alpha — denser, more opaque chrome. */
  :host([surface="panel"]) .glass,
  .glass[data-surface="panel"] {
    background-color: ${t(R(D))};
  }

  /*
   * No backdrop-filter support -> opaque surface-container, no blur. The card /
   * panel translucency is intentionally dropped: a partially-transparent panel
   * with nothing blurred behind it looks broken, so we go fully opaque.
   */
  @supports not ((backdrop-filter: blur(1px)) or
    (-webkit-backdrop-filter: blur(1px))) {
    .glass,
    :host([surface="card"]) .glass,
    :host([surface="panel"]) .glass,
    .glass[data-surface="card"],
    .glass[data-surface="panel"] {
      background-color: var(--md-sys-color-surface-container, var(--ha-card-background, #f3edf7));
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }

  /* Honor reduced transparency where the platform exposes it. */
  @media (prefers-reduced-transparency: reduce) {
    .glass,
    :host([surface="card"]) .glass,
    :host([surface="panel"]) .glass,
    .glass[data-surface="card"],
    .glass[data-surface="panel"] {
      background-color: var(--md-sys-color-surface-container, var(--ha-card-background, #f3edf7));
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }
`,N=.08,W=.12,G=.12;const A=function(e="currentColor"){const o=t(e);return i`
    .state-layer-target {
      position: relative;
      overflow: hidden;
      isolation: isolate;
    }

    .state-layer-target::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      border-radius: inherit;
      background-color: ${o};
      opacity: 0;
      transition: opacity 15ms linear;
    }

    /* Content above the overlay. */
    .state-layer-target > * {
      position: relative;
      z-index: 1;
    }

    @media (hover: hover) {
      .state-layer-target:hover::before {
        opacity: ${t(N)};
      }
    }

    .state-layer-target:focus-visible::before {
      opacity: ${t(W)};
    }

    .state-layer-target:active::before {
      opacity: ${t(G)};
    }

    .state-layer-target[disabled]::before,
    .state-layer-target:disabled::before {
      opacity: 0;
    }

    /* ---- Ripple (pressed feedback) ------------------------------------- */
    .state-layer-target::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      border-radius: inherit;
      background: radial-gradient(
        circle at center,
        ${o} 0%,
        transparent 60%
      );
      opacity: 0;
      transform: scale(0.2);
    }

    .state-layer-target.is-rippling::after {
      animation: wled-ripple 450ms cubic-bezier(0.2, 0, 0, 1);
    }

    @keyframes wled-ripple {
      0% {
        opacity: ${t(G)};
        transform: scale(0.2);
      }
      100% {
        opacity: 0;
        transform: scale(1.6);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .state-layer-target.is-rippling::after {
        animation: none;
      }
    }
  `}();let H=null,q=0;!function(){if("undefined"==typeof customElements)return;if(q+=1,H)return;H=customElements.define.bind(customElements),customElements.define=(e,t,i)=>{customElements.get(e)||H(e,t,i)}}(),"undefined"!=typeof customElements&&(q>0&&(q-=1),q>0||H&&(customElements.define=H,H=null));let j=class extends l{constructor(){super(...arguments),this.surface="card",this.density="auto",this.defaultView="home",this.previewHeight=200,this._controllerId="",this._masterEntity="",this._pixelCount=210,this._layoutId="",this._fixtureId="",this._previewStatus="connecting",this._hint="",this._globalBriPct=null,this._lastNonZeroBri=100,this._viewReady=!0,this._prevView="home",this._selection=new w(this),this._session=new b(this),this._nav=new y(this,{initial:this.defaultView,normalize:e=>this._normalizeView(e)}),this._bootstrapGen=0,this._bootstrapControllerKey="",this._loadedViewKey="",this._defaultViewSeeded=!1,this._onSegmentTargetsChanged=e=>{this._selection.applyTargetsChanged(e.detail)},this._onSegmentChange=e=>{this._selection.applySegmentChange(e.detail),this._refreshAccent()},this._onPaintConfigChange=()=>{this.requestUpdate()}}get _selectedSegId(){return this._selection.selectedSegId}get _highlightSegIds(){return this._selection.highlightSegIds}get _segments(){return this._selection.segments}get _connection(){return this.connection??this.hass?.connection}get _resolvedDensity(){return"full"===this.density?"full":"compact"}visibleNav(){return k(this.visibleViews,this.surface)}_normalizeView(e){const t=k(this.visibleViews,this.surface);return t.some(t=>t.id===e)?e:t[0]?.id??e}onPoweredConnect(){this._bindConnectionReady(),this._bootstrap()}onPoweredDisconnect(){this._bootstrapGen+=1,this._offConnReady?.(),this._offConnReady=void 0,this._unsubLive?.(),this._unsubLive=void 0}willUpdate(e){super.willUpdate(e),!this._defaultViewSeeded&&e.has("defaultView")&&(this._defaultViewSeeded=!0,this._nav.select(this.defaultView)),(e.has("visibleViews")||e.has("surface")||e.has("defaultView"))&&this._nav.revalidate()}updated(e){if(super.updated(e),e.has("hass")&&null!==this._globalBriPct){const e=this._readGlobalBrightnessPct();(0===e||Math.abs(e-this._globalBriPct)<=1)&&(this._globalBriPct=null)}if((e.has("hass")||e.has("_globalBriPct"))&&this._syncGlobalBriToSlider(),this._ensureActiveViewLoaded(),this._syncPaintWiring(),e.has("controller")||e.has("connection"))return this._bindConnectionReady(),void this._bootstrap(!0);e.has("hass")&&this.hass&&!this._controllerId&&(this._bindConnectionReady(),this._bootstrap())}async _ensureActiveViewLoaded(){const e=this._nav.view;if(this._loadedViewKey!==e)if(this._loadedViewKey=e,L(e))this._viewReady=!0;else{this._viewReady=!1;try{await function(e){const t=E.get(e);if(t)return t;const i=P[e],o=i?i().then(()=>{}):Promise.resolve();return E.set(e,o),o}(e)}finally{this._loadedViewKey===e&&(this._viewReady=!0,this.requestUpdate())}}}_bindConnectionReady(){const e=this._connection;e&&!this._offConnReady&&(this._offConnReady=c(e,()=>{this._bootstrap()}),this.addUnsub(()=>this._offConnReady?.()))}_pickController(e){const t=(this.controller??"").trim();if(!t)return e[0];const i=t.toLowerCase();return e.find(e=>{const o=String(e.title??"");return String(e.entry_id??"")===t||o===t||o.toLowerCase().includes(i)||o.toLowerCase().endsWith(`— ${i}`)||o.toLowerCase().endsWith(`- ${i}`)})??e[0]}_pickLayout(e){const t=(this.layoutId??"").trim();return t?e.find(e=>e.id===t||e.name===t):e[0]}async _bootstrap(e=!1){const t=this._connection;if(!t)return;const i=(this.controller??"").trim();if(!e&&this._controllerId&&this._unsubLive&&this._bootstrapControllerKey===i)return;const o=++this._bootstrapGen;this._controllerId||(this._hint="Connecting to WLED Studio…",this.requestUpdate());const s=[0,400,1200,2500];for(const e of s){if(o!==this._bootstrapGen||!this.isConnected)return;e>0&&await new Promise(t=>setTimeout(t,e));try{const e=await d(t),s=this._pickController(e);if(!s?.entry_id){o===this._bootstrapGen&&(this._hint=0===e.length?"No WLED Studio controllers found. Add the integration under Settings → Devices & services.":"Controller not found in list.",this.requestUpdate());continue}if(o!==this._bootstrapGen)return;return this._controllerId=String(s.entry_id),this._masterEntity=String(s.master_entity_id??""),this._pixelCount=Number(s.pixel_count)||210,this._bootstrapControllerKey=i,this._hint="",await this._loadLayout(),this._startLive(),this._loadSegments(),void this.requestUpdate()}catch(e){const t=e instanceof Error?e.message:String(e??"unknown");o===this._bootstrapGen&&(this._hint=`Connecting… (${t})`,this.requestUpdate())}}o===this._bootstrapGen&&(this._previewStatus="offline",this._preview?.setStatus(this._previewStatus),this._hint="WLED Studio is not responding. In Settings → Devices & services, open WLED Studio — Cloud → Reload, then hard-refresh this page (Ctrl+Shift+R).",this.requestUpdate())}async _loadLayout(){const e=this._connection;if(e&&this._controllerId)try{const t=await h(e,this._controllerId),i=this._pickLayout(t);if(!i)return this._layoutId="",void(this._fixtureId="");this._layoutId=i.id;const o=i.fixtures[0];this._fixtureId=o?String(o.id??"fixture-0"):"fixture-0",i.pixel_count&&(this._pixelCount=i.pixel_count),await(this._preview?.refresh())}catch{this._layoutId="",this._fixtureId=""}}_startLive(){const e=this._connection;if(!e||!this._controllerId)return;const t="live"===this._previewStatus;this._unsubLive?.(),t||(this._previewStatus="connecting",this._preview?.setStatus(this._previewStatus)),this._unsubLive=p(e,this._controllerId,e=>{this._previewStatus="live",this._preview?.setFrame(e)},{remote:this.remote.state.isRemote}),this.addUnsub(()=>this._unsubLive?.())}async _loadSegments(){const e=this._connection;if(e&&this._controllerId)try{const t=(await u(e,this._controllerId)).segments??[];this._selection.setSegments(t),t.length&&this._selection.selectedSegId<0&&this._selection.selectSegment(t[0].id),this._refreshAccent()}catch{}}_onStripSegmentSelect(e){"paint"!==this._nav.view&&(this._selection.selectSegment(e.detail.segmentId),this._refreshAccent())}_syncPaintWiring(){const e=this._nav.view,t=this._prevView;if(this._prevView=e,"paint"===e){const e=this._paintPanel,t=this._preview;return void(e&&t&&this._boundPaintPreview!==e&&(e.bindExternalPreview(t),this._boundPaintPreview=e))}"paint"===t&&this._boundPaintPreview&&(this._boundPaintPreview.cancelLiveIfActive(),this._boundPaintPreview=void 0)}_refreshAccent(){const e=this._selection.segments,t=this._selection.selectedSegId,i=e.find(e=>e.id===t);this._session.applyAccentFromSegment(i)}_readGlobalBrightnessPct(){return this.hass&&this._masterEntity?_(this.hass.states[this._masterEntity]):0}_globalBrightnessPct(){return null!==this._globalBriPct?this._globalBriPct:this._readGlobalBrightnessPct()}_syncGlobalBriToSlider(){const e=this._slider;if(!e)return;const t=this._globalBrightnessPct();var i,o;i={isPowered:this.isPowered},o=()=>{e.value=t},i.isPowered&&o()}_onGlobalBriInput(e){const t=e.target;let i=Number(t.value);0===(this._globalBriPct??this._readGlobalBrightnessPct())&&i>0&&this._lastNonZeroBri>0&&(i=this._lastNonZeroBri,t.value=i),i>0&&(this._lastNonZeroBri=i),this._globalBriPct=i}_setGlobalBrightness(e){if(!this.hass||!this._masterEntity)return;const t=Number(e.target.value);if(0===t){const e=this._globalBriPct??this._readGlobalBrightnessPct();e>0&&(this._lastNonZeroBri=e)}else this._lastNonZeroBri=t;this._globalBriPct=t;const i=x(t);0===t?this.hass.callService("light","turn_off",{entity_id:this._masterEntity}):this.hass.callService("light","turn_on",{entity_id:this._masterEntity,brightness_pct:t});const o=this._connection;o&&this._controllerId&&g(o,this._controllerId,{bri:i,on:t>0})}_togglePower(){this.hass&&this._masterEntity&&this.hass.callService("light","toggle",{entity_id:this._masterEntity})}_onExpand(){const e=this._nav.view,t=this._controllerId||(this.controller??"").trim(),i=new URLSearchParams;i.set("view",e),t&&i.set("controller",t),history.pushState(null,"",`/wled-studio#${i.toString()}`),window.dispatchEvent(new CustomEvent("location-changed"))}_selectView(e){this._nav.select(e)}_onNavActivate(e){const t=e.target,i=t?.activeIndex,o=this.visibleNav();"number"==typeof i&&o[i]&&this._selectView(o[i].id)}_renderHeader(){const t=this.remote.state,i=C(this._nav.view)??I[0],o=this.controller?.trim()||i.label||"WLED Studio";return e`
      <header class="header glass" part="header">
        <ha-icon icon="mdi:led-strip-variant"></ha-icon>
        <span class="title">${o}</span>
        ${t.isRemote?e`<span class="badge">Remote</span>`:null}
        <md-icon-button
          class="state-layer-target"
          aria-label="Toggle power"
          ?disabled=${!this._masterEntity}
          @click=${this._togglePower}
        >
          <ha-icon icon="mdi:power"></ha-icon>
        </md-icon-button>
        ${"card"===this.surface?e`
              <md-fab
                size="small"
                class="expand-fab"
                aria-label="Open WLED Studio"
                @click=${this._onExpand}
              >
                <ha-icon slot="icon" icon="mdi:arrow-expand"></ha-icon>
              </md-fab>
            `:null}
      </header>
    `}_renderPreview(){const t="paint"===this._nav.view,i=`--wled-preview-height: ${this.previewHeight}px`,o=this._paintPanel,s=o?.brushSize??6,a=!!t&&(o?.paintLivePreview??!1);return e`
      <wled-geometry-preview
        class="preview"
        style=${i}
        compact
        .externalLive=${!t||(o?.paintExternalLive??!0)}
        .paintLivePreview=${a}
        .paintBrushSize=${s}
        .heightPx=${this.previewHeight}
        .connection=${this._connection}
        .controllerId=${this._controllerId}
        .layoutId=${this._layoutId}
        .fixtureId=${this._fixtureId}
        .pixelCount=${this._pixelCount}
        .segments=${this._segments}
        .selectedSegId=${t?-1:this._selectedSegId}
        .highlightSegIds=${t?[]:this._highlightSegIds}
        .paintMode=${t}
        @segment-select=${this._onStripSegmentSelect}
        @paint-stroke=${this._onPreviewPaintStroke}
      ></wled-geometry-preview>
    `}_onPreviewPaintStroke(e){this._paintPanel?.handleExternalPaintStroke(e)}_renderRail(){const t=this.visibleNav(),i=this._nav.view;return e`
      <md-navigation-drawer class="nav nav-rail glass" opened part="nav">
        ${t.map(t=>e`
            <button
              type="button"
              class="rail-item state-layer-target ${t.id===i?"active":""}"
              role="tab"
              aria-selected=${t.id===i?"true":"false"}
              @click=${()=>this._selectView(t.id)}
            >
              <ha-icon .icon=${t.icon}></ha-icon>
              <span class="rail-label">${t.label}</span>
            </button>
          `)}
      </md-navigation-drawer>
    `}_renderBar(){const t=this.visibleNav(),i=this._nav.view,o=Math.max(0,t.findIndex(e=>e.id===i));return e`
      <md-navigation-bar
        class="nav nav-bar"
        part="nav"
        .activeIndex=${o}
        @navigation-bar-activated=${this._onNavActivate}
      >
        ${t.map(t=>e`
            <md-navigation-tab
              data-view=${t.id}
              ?active=${t.id===i}
              aria-label=${t.label}
              @click=${()=>this._selectView(t.id)}
            >
              <ha-icon slot="active-icon" .icon=${t.icon}></ha-icon>
              <ha-icon slot="inactive-icon" .icon=${t.icon}></ha-icon>
              <span>${t.label}</span>
            </md-navigation-tab>
          `)}
      </md-navigation-bar>
    `}_viewContext(){const e=this._resolvedDensity;return{hass:this.hass,connection:this._connection,controllerId:this._controllerId,masterEntity:this._masterEntity,layoutId:this._layoutId,fixtureId:this._fixtureId,pixelCount:this._pixelCount,selectedSegId:this._selectedSegId,highlightSegIds:this._highlightSegIds,segments:this._segments,density:e,compact:"compact"===e,onSegmentChange:this._onSegmentChange,onSegmentTargetsChanged:this._onSegmentTargetsChanged,onPaintConfigChange:this._onPaintConfigChange}}_renderBody(){const t=this._nav.view;return L(t)||this._viewReady?e`<div class="body" part="body">
      ${function(e,t){return B[e](t)}(t,this._viewContext())}
    </div>`:e`<div class="body" part="body">
        <wled-skeleton height="160px"></wled-skeleton>
      </div>`}_renderBrightness(){const t=this._globalBrightnessPct();return e`
      <div class="controls glass" part="controls">
        <div class="bri-row">
          <label class="bri-label" for="shell-brightness">Brightness</label>
          <span class="bri-pct" aria-live="polite">${t}%</span>
        </div>
        <md-slider
          id="shell-brightness"
          class="bri-slider"
          min="0"
          max="100"
          step="1"
          labeled
          .value=${t}
          ?disabled=${!this._masterEntity}
          @input=${this._onGlobalBriInput}
          @change=${this._setGlobalBrightness}
        ></md-slider>
      </div>
    `}render(){const t="full"===this.density?"is-full":"compact"===this.density?"is-compact":"is-auto",i=e`
      <div class="main">
        ${this._renderPreview()}
        ${this._renderBody()}
        ${this._renderBrightness()}
        ${this._hint?e`<p class="hint">${this._hint}</p>`:null}
      </div>
    `;return"is-full"===t?e`
        <div class="shell is-full" role="region" aria-label="WLED Studio">
          ${this._renderHeader()}
          <div class="layout">${this._renderRail()}${i}</div>
        </div>
      `:"is-compact"===t?e`
        <div class="shell is-compact" role="region" aria-label="WLED Studio">
          ${this._renderHeader()}
          <div class="layout">${i}</div>
          ${this._renderBar()}
        </div>
      `:e`
      <div class="shell is-auto" role="region" aria-label="WLED Studio">
        ${this._renderHeader()}
        <div class="layout">
          <div class="nav-slot rail-slot">${this._renderRail()}</div>
          ${i}
        </div>
        <div class="nav-slot bar-slot">${this._renderBar()}</div>
      </div>
    `}static{this.styles=[...v,z,A,i`
      :host {
        display: block;
        color: var(--md-sys-color-on-surface, var(--primary-text-color, #1d1b20));

        /*
         * Theme the @material/web navigation chrome to OUR M3 scheme.
         * ----------------------------------------------------------------
         * These components default several container tokens to a LIGHT M3
         * surface (md-navigation-drawer's --md-navigation-drawer-container-color
         * falls back to #fff !), so in dark mode they paint an opaque white box
         * over the dark glass. We pin every nav container/label/icon/indicator
         * token to a --md-sys-color-* role so the chrome ALWAYS follows the
         * inherited scheme (dark or light) and the glass surface shows through.
         * Token names verified against the installed @material/web nav
         * components (node_modules/@material/web/labs/navigation*).
         */

        /* Drawer (full left rail): keep the container TRANSPARENT so the
           .glass background painted on the same element is what shows — never
           the component's own #fff default. */
        --md-navigation-drawer-container-color: transparent;
        --md-navigation-drawer-divider-color: var(
          --md-sys-color-outline-variant,
          var(--divider-color, #cac4d0)
        );
        /* The drawer's stock 360px container width would dominate the row; pin
           it to the compact rail width so its internal scroller matches the
           .nav-rail host width and the content column gets the rest. */
        --md-navigation-drawer-container-width: var(--wled-rail-width, 112px);

        /* Bar (compact bottom bar): transparent container (the .glass/host
           surface shows), M3 active indicator + label/icon roles. */
        --md-navigation-bar-container-color: transparent;
        --md-navigation-bar-active-indicator-color: var(
          --md-sys-color-secondary-container
        );
        --md-navigation-bar-active-icon-color: var(--md-sys-color-on-surface);
        --md-navigation-bar-active-label-text-color: var(
          --md-sys-color-on-surface
        );
        --md-navigation-bar-active-focus-icon-color: var(
          --md-sys-color-on-surface
        );
        --md-navigation-bar-active-focus-label-text-color: var(
          --md-sys-color-on-surface
        );
        --md-navigation-bar-active-hover-icon-color: var(
          --md-sys-color-on-surface
        );
        --md-navigation-bar-active-hover-label-text-color: var(
          --md-sys-color-on-surface
        );
        --md-navigation-bar-active-pressed-icon-color: var(
          --md-sys-color-on-surface
        );
        --md-navigation-bar-active-pressed-label-text-color: var(
          --md-sys-color-on-surface
        );
        --md-navigation-bar-inactive-icon-color: var(
          --md-sys-color-on-surface-variant
        );
        --md-navigation-bar-inactive-label-text-color: var(
          --md-sys-color-on-surface-variant
        );
        --md-navigation-bar-inactive-focus-icon-color: var(
          --md-sys-color-on-surface-variant
        );
        --md-navigation-bar-inactive-focus-label-text-color: var(
          --md-sys-color-on-surface-variant
        );
        --md-navigation-bar-inactive-hover-icon-color: var(
          --md-sys-color-on-surface-variant
        );
        --md-navigation-bar-inactive-hover-label-text-color: var(
          --md-sys-color-on-surface-variant
        );
        --md-navigation-bar-inactive-pressed-icon-color: var(
          --md-sys-color-on-surface-variant
        );
        --md-navigation-bar-inactive-pressed-label-text-color: var(
          --md-sys-color-on-surface-variant
        );
      }
      .shell {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px;
      }
      .layout {
        display: flex;
        gap: 16px;
        min-height: 0;
      }
      .shell.is-full .layout {
        flex-direction: row;
      }
      /*
       * Wide-layout cap. At full density on a wide container the rail + content
       * row would otherwise stretch edge-to-edge (e.g. ~1680px), which is
       * unusable. Cap the WHOLE rail+content row (rail + gap + content) to a
       * sensible max-width and CENTER it (margin-inline:auto) so the dead space
       * splits evenly instead of pooling on the right. The header is capped +
       * centered to the same width so its edges line up with the content.
       * Explicit full density always gets the cap; the auto layout only gets it
       * once the container query flips to the wide (row) layout — so compact
       * (<600px) auto stays FULL-BLEED, unchanged.
       */
      .shell.is-full .layout,
      .shell.is-full .header {
        max-width: calc(
          var(--wled-rail-width, 112px) + 16px + var(--wled-content-max, 1100px)
        );
        margin-inline: auto;
        width: 100%;
        box-sizing: border-box;
      }
      /* auto density: pure-CSS @container reflow (no JS width measurement). */
      .shell.is-auto .layout {
        flex-direction: column;
      }
      .nav-slot {
        display: contents;
      }
      /* Below the breakpoint: bottom bar shows, left rail collapses. */
      .shell.is-auto .rail-slot {
        display: none;
      }
      .shell.is-auto .bar-slot {
        display: block;
      }
      @container wled-studio (min-width: 600px) {
        .shell.is-auto .layout {
          flex-direction: row;
        }
        .shell.is-auto .rail-slot {
          display: block;
          flex: 0 0 auto;
        }
        .shell.is-auto .bar-slot {
          display: none;
        }
        /* Wide auto layout (row): cap + CENTER the whole rail+content row (and
           the header) like is-full so it does not stretch edge-to-edge on a
           wide (e.g. 1680px) container and the dead space splits evenly. */
        .shell.is-auto .layout,
        .shell.is-auto .header {
          max-width: calc(
            var(--wled-rail-width, 112px) + 16px +
              var(--wled-content-max, 1100px)
          );
          margin-inline: auto;
          width: 100%;
          box-sizing: border-box;
        }
      }
      .main {
        display: flex;
        flex-direction: column;
        gap: 12px;
        flex: 1 1 auto;
        min-width: 0;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 16px;
      }
      .title {
        font: var(--md-sys-typescale-title-medium, 600 16px/1.2 system-ui);
        flex: 1;
        color: var(--md-sys-color-on-surface, var(--wled-text));
      }
      .badge {
        font-size: 0.75rem;
        padding: 4px 12px;
        border-radius: 999px;
        background: var(--md-sys-color-tertiary-container, var(--warning-color, orange));
        color: var(--md-sys-color-on-tertiary-container, var(--primary-text-color, #1a1200));
        font-weight: 600;
      }
      .expand-fab {
        --md-fab-container-width: 40px;
        --md-fab-container-height: 40px;
      }
      .preview {
        display: block;
        width: 100%;
      }
      .body {
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
      /* Compact: bottom navigation bar. */
      .nav-bar {
        width: 100%;
        position: sticky;
        bottom: 0;
      }
      /* Full: left rail. Fixed width so the row stays balanced against the
         capped content column (see .shell.is-full .main / wide auto layout). */
      .nav-rail {
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px;
        width: var(--wled-rail-width, 112px);
        box-sizing: border-box;
      }
      .rail-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 8px;
        border: none;
        border-radius: var(--md-sys-shape-corner-large, 16px);
        background: transparent;
        color: var(--md-sys-color-on-surface-variant, var(--wled-text-muted));
        cursor: pointer;
        font: inherit;
        min-height: var(--wled-tap, 44px);
      }
      .rail-item.active {
        color: var(--md-sys-color-on-secondary-container, var(--wled-text));
        background: var(--md-sys-color-secondary-container, transparent);
      }
      .rail-item ha-icon {
        --mdc-icon-size: 24px;
      }
      .rail-label {
        font-size: 11px;
        white-space: nowrap;
      }
      .controls {
        padding: 12px 16px;
      }
      .bri-row {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 8px;
      }
      .bri-label {
        font-size: 0.8rem;
        color: var(--md-sys-color-on-surface-variant, var(--wled-text-muted));
      }
      .bri-pct {
        font-size: 0.8rem;
        font-variant-numeric: tabular-nums;
        color: var(--md-sys-color-on-surface, var(--wled-text));
      }
      .bri-slider {
        width: 100%;
      }
      .hint {
        font-size: 0.8rem;
        color: var(--md-sys-color-on-surface-variant, var(--wled-text-muted));
        margin: 4px 0 0;
      }
    `]}};o([s({reflect:!0})],j.prototype,"surface",void 0),o([s({reflect:!0})],j.prototype,"density",void 0),o([s({reflect:!0,attribute:"default-view"})],j.prototype,"defaultView",void 0),o([s({attribute:!1})],j.prototype,"visibleViews",void 0),o([s({attribute:!1})],j.prototype,"controller",void 0),o([s({attribute:!1})],j.prototype,"layoutId",void 0),o([s({attribute:!1})],j.prototype,"previewHeight",void 0),o([s({attribute:!1})],j.prototype,"connection",void 0),o([a()],j.prototype,"_controllerId",void 0),o([a()],j.prototype,"_masterEntity",void 0),o([a()],j.prototype,"_pixelCount",void 0),o([a()],j.prototype,"_layoutId",void 0),o([a()],j.prototype,"_fixtureId",void 0),o([a()],j.prototype,"_previewStatus",void 0),o([a()],j.prototype,"_hint",void 0),o([a()],j.prototype,"_globalBriPct",void 0),o([a()],j.prototype,"_lastNonZeroBri",void 0),o([a()],j.prototype,"_viewReady",void 0),o([n("wled-geometry-preview")],j.prototype,"_preview",void 0),o([n("md-slider")],j.prototype,"_slider",void 0),o([n("wled-view-paint")],j.prototype,"_paintPanel",void 0),j=o([m("wled-studio-shell")],j);const U="wled-studio-card",F=["color","effects","scenes","segments","paint"];class M extends l{setConfig(e){if(!e.type?.startsWith("custom:"))throw new Error("Invalid card type");this.config=e}getCardSize(){return 8}getGridOptions(){return{columns:12,min_columns:6}}static getConfigElement(){const e=document.createElement("wled-studio-card-editor");return e.setConfig(M.getStubConfig()),e}static getStubConfig(){return{type:`custom:${U}`,controller:"Cloud",height:200,show_segments:!1}}_resolveVisibleViews(){const e=this.config;if(e)return e.views&&e.views.length?[...e.views]:F.filter(t=>("scenes"!==t||!1!==e.show_scenes)&&(("paint"!==t||!1!==e.show_paint)&&(("effects"!==t||!1!==e.show_effects)&&("segments"!==t||!0===e.show_segments))))}_resolveDefaultView(){return this.config?.default_view??I[0].id}render(){const t=this.config,i=t?.height??200,o=t?.density??"auto",s=this._resolveVisibleViews(),a=this._resolveDefaultView();return e`
      <div class="card-root">
        ${$()?e`
              <ha-alert alert-type="warning" class="stale-banner">
                WLED Studio updated — refresh this page to apply changes.
              </ha-alert>
            `:null}
        <wled-studio-shell
          class="shell"
          surface="card"
          .hass=${this.hass}
          .controller=${t?.controller}
          .layoutId=${t?.layout_id}
          .previewHeight=${i}
          .density=${o}
          .defaultView=${a}
          .visibleViews=${s}
        ></wled-studio-shell>
        <wled-toast-host></wled-toast-host>
      </div>
    `}static{this.styles=[...v,i`
      :host {
        display: block;
      }
      .card-root {
        /* The card is a thin wrapper; it establishes a query container so the
           shell's density container-query resolves against the card's box, and
           caps the body relative to that container (NO viewport-height unit). */
        display: block;
        container-type: inline-size;
        container-name: wled-studio;
      }
      .stale-banner {
        display: block;
        margin-bottom: 10px;
      }
      .shell {
        display: block;
        /* Container-relative cap: the body inside the shell grows but the whole
           card stays bounded to the available container height when one exists,
           replacing the former viewport-relative body max-height cap. */
        max-height: 100cqh;
      }
    `]}}function K(){return{type:`custom:${U}`,controller:"",height:200,show_segments:!1}}o([s({attribute:!1})],M.prototype,"config",void 0);const Z=[{key:"show_effects",label:"Show Effects tab (legacy)"},{key:"show_scenes",label:"Show Scenes tab (legacy)"},{key:"show_segments",label:"Show Segments tab (legacy)"},{key:"show_paint",label:"Show Paint tab (legacy)"}],O=[{value:"auto",label:"Auto (container decides)"},{value:"compact",label:"Compact (bottom bar)"},{value:"full",label:"Full (left rail)"}],J=I.filter(e=>"full"!==e.density),Q=I.filter(e=>"full"===e.density),Y=new Set(J.map(e=>e.id));let X=class extends r{constructor(){super(...arguments),this._config=K()}setConfig(e){this._config={...K(),...e,type:e.type??`custom:${U}`}}render(){const t=this._config,i=t.views??[];return e`
      <div class="editor">
        <p>WLED Studio card — pick the controller name (e.g. Cloud).</p>
        <ha-textfield
          .label=${"Controller"}
          .value=${t.controller??""}
          @value-changed=${this._onController}
        ></ha-textfield>
        <ha-textfield
          .label=${"Preview height (px)"}
          .value=${String(t.height??200)}
          @value-changed=${this._onHeight}
        ></ha-textfield>
        <ha-textfield
          .label=${"Layout id (optional)"}
          .value=${t.layout_id??""}
          @value-changed=${this._onLayoutId}
        ></ha-textfield>

        <label class="field">
          <span class="field-label">Density</span>
          <select class="select" @change=${this._onDensity}>
            ${O.map(i=>e`
                <option
                  value=${i.value}
                  ?selected=${(t.density??"auto")===i.value}
                >
                  ${i.label}
                </option>
              `)}
          </select>
        </label>

        <label class="field">
          <span class="field-label">Default view</span>
          <select class="select" @change=${this._onDefaultView}>
            <option value="" ?selected=${!t.default_view}>Auto (Home / first)</option>
            ${J.map(i=>e`
                <option
                  value=${i.id}
                  ?selected=${t.default_view===i.id}
                >
                  ${i.label}
                </option>
              `)}
          </select>
        </label>

        <fieldset class="tabs">
          <legend>Visible views</legend>
          <p class="hint">
            Tick views to show. Leave all unticked to use the default card views
            (with the legacy toggles below).
          </p>
          ${J.map(t=>e`
              <label class="toggle">
                <input
                  type="checkbox"
                  .checked=${i.includes(t.id)}
                  @change=${e=>this._onViewToggle(t.id,e)}
                />
                <span>${t.label}</span>
              </label>
            `)}
          ${Q.length?e`
                <p class="hint panel-only-note">
                  Panel-only views (heavy — available in the full WLED Studio
                  panel, not on a card):
                </p>
                ${Q.map(t=>e`
                    <label class="toggle disabled" title="Panel-only view — not available on a card">
                      <input type="checkbox" disabled .checked=${!1} />
                      <span>${t.label}</span>
                    </label>
                  `)}
              `:null}
        </fieldset>

        <fieldset class="tabs">
          <legend>Legacy tab toggles</legend>
          <p class="hint">
            Deprecated — ignored when “Visible views” has any selection. Kept for
            backward compatibility with older card configs.
          </p>
          ${Z.map(({key:i,label:o})=>e`
              <label class="toggle">
                <input
                  type="checkbox"
                  .checked=${"show_segments"===i?!0===t[i]:!1!==t[i]}
                  @change=${e=>this._onTabToggle(i,e)}
                />
                <span>${o}</span>
              </label>
            `)}
        </fieldset>
      </div>
    `}_onController(e){this._fire({...this._config,controller:e.detail.value})}_onHeight(e){const t=Number(e.detail.value);this._fire({...this._config,height:Number.isFinite(t)?t:200})}_onLayoutId(e){const t=e.detail.value.trim(),i={...this._config};t?i.layout_id=t:delete i.layout_id,this._fire(i)}_onDensity(e){const t=e.target.value,i={...this._config};"auto"===t?delete i.density:i.density=t,this._fire(i)}_onDefaultView(e){const t=e.target.value,i={...this._config};t&&Y.has(t)?i.default_view=t:delete i.default_view,this._fire(i)}_onViewToggle(e,t){if(!Y.has(e))return;const i=t.target.checked,o=this._config.views??[];let s;s=i?o.includes(e)?o:[...o,e]:o.filter(t=>t!==e);const a={...this._config};s.length?a.views=s:delete a.views,this._fire(a)}_onTabToggle(e,t){const i=t.target.checked;this._fire({...this._config,[e]:i})}_fire(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}static{this.styles=i`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .field-label {
      font-size: 0.9rem;
    }
    .select {
      padding: 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, inherit);
      font: inherit;
    }
    .tabs {
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 8px;
      padding: 12px;
      margin: 0;
    }
    .tabs legend {
      padding: 0 4px;
      font-size: 0.9rem;
    }
    .hint {
      font-size: 0.78rem;
      color: var(--secondary-text-color, rgba(0, 0, 0, 0.6));
      margin: 0 0 8px;
    }
    .toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .toggle:first-of-type {
      margin-top: 4px;
    }
    .toggle input {
      width: 16px;
      height: 16px;
      margin: 0;
    }
    .toggle.disabled {
      cursor: not-allowed;
      color: var(--secondary-text-color, rgba(0, 0, 0, 0.6));
    }
    .toggle.disabled input {
      cursor: not-allowed;
    }
    .panel-only-note {
      margin: 12px 0 0;
    }
  `}};o([s({attribute:!1})],X.prototype,"hass",void 0),o([a()],X.prototype,"_config",void 0),X=o([m("wled-studio-card-editor")],X),S(),f(U,M),window.customCards=window.customCards||[],window.customCards.some(e=>e.type===U)||window.customCards.push({type:U,name:"WLED Studio",description:"Live LED strip preview and controls",preview:!0}),console.info("[wled-studio] lovelace bundle loaded",{card:U});
//# sourceMappingURL=wled-studio-card.js.map

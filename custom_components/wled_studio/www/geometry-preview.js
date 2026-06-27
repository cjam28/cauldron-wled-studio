import{i as e,c as t,_ as i,n as s,b as n,d as r,e as o}from"./wled-studio-core.js";const a=e`
  :host {
    container-type: inline-size;
    container-name: wled-studio;
    display: block;
    --wled-bp-sm: 600px;
    --wled-bp-md: 900px;
    --wled-bp-lg: 1200px;
  }

  .cq-compact {
    display: block;
  }
  .cq-medium {
    display: none;
  }
  .cq-wide {
    display: none;
  }

  @container wled-studio (min-width: 600px) {
    .cq-compact {
      display: none;
    }
    .cq-medium {
      display: block;
    }
  }

  @container wled-studio (min-width: 900px) {
    .cq-wide {
      display: block;
    }
  }
`,l=e`
  :host {
    --m-tap: 100ms;
    --m-slider-settle: 180ms;
    --m-scene-confirm: 120ms;
    --m-view-transition: 180ms;
    --m-bottom-sheet: 240ms;
    --m-toast: 4000ms;
    --m-crossfade-default: 2500ms;
    --m-bloom-pulse: 600ms;
  }

  @media (prefers-reduced-motion: reduce) {
    :host {
      --m-tap: 1ms;
      --m-slider-settle: 1ms;
      --m-scene-confirm: 1ms;
      --m-view-transition: 1ms;
      --m-bottom-sheet: 1ms;
      --m-bloom-pulse: 1ms;
    }
  }
`,c=e`
  :host {
    /* ---------------------------------------------------------------------
     * M3 shape — corner radius scale (plain literals; M3 spec values).
     * Stock M3 "large" is 16px. The dashboards use 24px cards — that is a
     * bespoke radius, exposed as --wled-radius below, NOT by overloading the
     * standard --md-sys-shape-corner-large token.
     * ------------------------------------------------------------------- */
    --md-sys-shape-corner-none: 0px;
    --md-sys-shape-corner-extra-small: 4px;
    --md-sys-shape-corner-small: 8px;
    --md-sys-shape-corner-medium: 12px;
    --md-sys-shape-corner-large: 16px;
    --md-sys-shape-corner-large-increased: 20px;
    --md-sys-shape-corner-extra-large: 28px;
    --md-sys-shape-corner-full: 9999px;

    /* ---------------------------------------------------------------------
     * M3 typescale — size / line-height / weight per role.
     * Weights are exposed as their own *-weight tokens so callers can build
     * shorthand (font: weight size/line-height) or use pieces individually.
     * ------------------------------------------------------------------- */

    /* Display */
    --md-sys-typescale-display-large-size: 57px;
    --md-sys-typescale-display-large-line-height: 64px;
    --md-sys-typescale-display-large-weight: 400;
    --md-sys-typescale-display-medium-size: 45px;
    --md-sys-typescale-display-medium-line-height: 52px;
    --md-sys-typescale-display-medium-weight: 400;
    --md-sys-typescale-display-small-size: 36px;
    --md-sys-typescale-display-small-line-height: 44px;
    --md-sys-typescale-display-small-weight: 400;

    /* Headline */
    --md-sys-typescale-headline-large-size: 32px;
    --md-sys-typescale-headline-large-line-height: 40px;
    --md-sys-typescale-headline-large-weight: 400;
    --md-sys-typescale-headline-medium-size: 28px;
    --md-sys-typescale-headline-medium-line-height: 36px;
    --md-sys-typescale-headline-medium-weight: 400;
    --md-sys-typescale-headline-small-size: 24px;
    --md-sys-typescale-headline-small-line-height: 32px;
    --md-sys-typescale-headline-small-weight: 400;

    /* Title */
    --md-sys-typescale-title-large-size: 22px;
    --md-sys-typescale-title-large-line-height: 28px;
    --md-sys-typescale-title-large-weight: 400;
    --md-sys-typescale-title-medium-size: 16px;
    --md-sys-typescale-title-medium-line-height: 24px;
    --md-sys-typescale-title-medium-weight: 500;
    --md-sys-typescale-title-small-size: 14px;
    --md-sys-typescale-title-small-line-height: 20px;
    --md-sys-typescale-title-small-weight: 500;

    /* Body */
    --md-sys-typescale-body-large-size: 16px;
    --md-sys-typescale-body-large-line-height: 24px;
    --md-sys-typescale-body-large-weight: 400;
    --md-sys-typescale-body-medium-size: 14px;
    --md-sys-typescale-body-medium-line-height: 20px;
    --md-sys-typescale-body-medium-weight: 400;
    --md-sys-typescale-body-small-size: 12px;
    --md-sys-typescale-body-small-line-height: 16px;
    --md-sys-typescale-body-small-weight: 400;

    /* Label */
    --md-sys-typescale-label-large-size: 14px;
    --md-sys-typescale-label-large-line-height: 20px;
    --md-sys-typescale-label-large-weight: 500;
    --md-sys-typescale-label-medium-size: 12px;
    --md-sys-typescale-label-medium-line-height: 16px;
    --md-sys-typescale-label-medium-weight: 500;
    --md-sys-typescale-label-small-size: 11px;
    --md-sys-typescale-label-small-line-height: 16px;
    --md-sys-typescale-label-small-weight: 500;

    /* ---------------------------------------------------------------------
     * M3 elevation — tonal/shadow levels.
     * Dashboards use 0 6px 18px rgba(0,0,0,.10) for cards (level-2-ish).
     * The --wled-shadow alias below maps to level 2.
     * ------------------------------------------------------------------- */
    --md-sys-elevation-level0: none;
    --md-sys-elevation-level1: 0 1px 2px rgba(0, 0, 0, 0.3),
      0 1px 3px 1px rgba(0, 0, 0, 0.15);
    --md-sys-elevation-level2: var(
      --ha-card-box-shadow,
      0 6px 18px rgba(0, 0, 0, 0.1)
    );
    --md-sys-elevation-level3: 0 4px 8px 3px rgba(0, 0, 0, 0.15),
      0 1px 3px rgba(0, 0, 0, 0.3);
    --md-sys-elevation-level4: 0 6px 10px 4px rgba(0, 0, 0, 0.15),
      0 2px 3px rgba(0, 0, 0, 0.3);
    --md-sys-elevation-level5: 0 8px 12px 6px rgba(0, 0, 0, 0.15),
      0 4px 4px rgba(0, 0, 0, 0.3);

    /* =====================================================================
     * Legacy --wled-* aliases — the resilient consumer-facing layer.
     * Each alias carries the FULL non-cyclic fallback cascade
     *   var(--md-sys-color-X, var(--ha-fallback, <M3 baseline literal>))
     * so every existing var(--wled-X) consumer resolves in all 3 scenarios:
     * Material You on :root, HA theme var, or bare baseline (panel/tests).
     * The alias name differs from the role it references, so there is no
     * self-cycle. Migrate references per-file as phases touch them.
     * =================================================================== */
    --wled-accent: var(--md-sys-color-primary, var(--primary-color, #6750a4));
    --wled-accent-soft: color-mix(in srgb, var(--wled-accent) 18%, transparent);
    /* LED-specific accent: defaults to the theme accent; accent-from-LED
       (studio-session) overrides ONLY these tokens inline when a segment is
       selected, so the M3 chrome keeps following Material You. */
    --wled-led-accent: var(--wled-accent);
    --wled-on-led-accent: var(--md-sys-color-on-primary, #ffffff);
    --wled-surface: var(
      --md-sys-color-surface,
      var(--card-background-color, #fef7ff)
    );
    --wled-surface-elevated: var(
      --md-sys-color-surface-container-high,
      var(--secondary-background-color, #ece6f0)
    );
    --wled-text: var(
      --md-sys-color-on-surface,
      var(--primary-text-color, #1d1b20)
    );
    --wled-text-muted: var(
      --md-sys-color-on-surface-variant,
      var(--secondary-text-color, #49454f)
    );
    --wled-border: var(
      --md-sys-color-outline-variant,
      var(--divider-color, #cac4d0)
    );
    /* Dashboards use 24px cards — a bespoke radius, not a standard M3 step. */
    --wled-radius: 24px;
    --wled-radius-sm: var(--md-sys-shape-corner-small);
    --wled-radius-lg: var(--md-sys-shape-corner-extra-large);
    --wled-shadow: var(--md-sys-elevation-level2);
    --wled-tap: 44px;
  }
`;class h{constructor(e,t){this.host=e,this._hass=t,this._isRemote=!1,e.addController(this)}hostConnected(){this._refresh()}setHass(e){this._hass=e,this._refresh(),this.host.requestUpdate()}get state(){return{isRemote:this._isRemote,previewFps:this._isRemote?10:20,useBinaryPack:this._isRemote,disableBloom:this._isRemote}}_refresh(){if("undefined"==typeof location)return void(this._isRemote=!1);const e=location.hostname.endsWith(".ui.nabu.casa"),t=this._hass?.config?.external_url,i=!!t&&t.replace(/\/$/,"")===location.origin;this._isRemote=e||i}}const d=[c,a,l,e`
  :host {
    --wled-transition-fast: var(--m-tap) ease;
    --wled-transition: var(--m-view-transition) ease;
  }

  button:focus-visible,
  [role="tab"]:focus-visible,
  .tile:focus-visible,
  .btn:focus-visible {
    outline: 2px solid var(--wled-accent);
    outline-offset: 2px;
  }

  .primary {
    padding: 8px 14px;
    border-radius: 8px;
    border: none;
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    cursor: pointer;
    font: inherit;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: transform var(--wled-transition-fast);
  }
  .primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .primary:active:not(:disabled) {
    transform: scale(0.97);
  }
`];class u extends t{constructor(){super(...arguments),this.abort=new AbortController,this.rafIds=new Set,this.unsubs=new Set,this.remote=new h(this),this._visible=!0,this._inView=!0}static{this.styles=d}connectedCallback(){super.connectedCallback(),this._bindVisibility(),this._bindIntersection(),this.remote.setHass(this.hass),this.onPoweredConnect()}disconnectedCallback(){this.onPoweredDisconnect(),this._io?.disconnect(),this._io=void 0,this.abort.abort();for(const e of this.rafIds)cancelAnimationFrame(e);this.rafIds.clear();for(const e of this.unsubs)e();this.unsubs.clear(),super.disconnectedCallback()}updated(e){super.updated(e),e.has("hass")&&this.remote.setHass(this.hass)}get isPowered(){return this._visible&&this._inView}scheduleRaf(e){const t=requestAnimationFrame(i=>{this.rafIds.delete(t),this.isConnected&&!this.abort.signal.aborted&&e(i)});this.rafIds.add(t)}addUnsub(e){this.unsubs.add(e)}onPoweredConnect(){}onPoweredDisconnect(){}_bindVisibility(){document.addEventListener("visibilitychange",()=>{this._visible="visible"===document.visibilityState,this.requestUpdate()},{signal:this.abort.signal}),this._visible="visible"===document.visibilityState}_bindIntersection(){this._io=new IntersectionObserver(e=>{this._inView=e.some(e=>e.isIntersecting),this.requestUpdate()},{threshold:.01}),this._io.observe(this)}}function p(e){return(t,i)=>{const s=customElements.get(e);return s||(customElements.define(e,t),t)}}function f(e,t){const i=customElements.get(e);return i||(customElements.define(e,t),t)}function m(e,t){const i=()=>t();return e.addEventListener("ready",i),()=>e.removeEventListener("ready",i)}i([s({attribute:!1})],u.prototype,"hass",void 0);const g=1,v=/^[0-9a-fA-F]+$/;function _(e,t){const i=new Uint8ClampedArray(4*t);for(let s=0;s<t;s++){const t=Math.min(e.count-1,Math.max(0,Math.round(s/e.scale))),n=e.leds_hex[t]??"000000",r=4*s;8===n.length?(i[r]=parseInt(n.slice(0,2),16),i[r+1]=parseInt(n.slice(2,4),16),i[r+2]=parseInt(n.slice(4,6),16),i[r+3]=parseInt(n.slice(6,8),16)):(i[r]=parseInt(n.slice(0,2),16),i[r+1]=parseInt(n.slice(2,4),16),i[r+2]=parseInt(n.slice(4,6),16),i[r+3]=255)}return i}function y(e,t,i,s){let n,r=!1;const o=async()=>{n?.(),n=void 0,r||(n=await e.subscribeMessage(e=>{const t=e.event?.data??("wled_studio_live_frame"===e.type?e.data:void 0);if(!t)return;const s=function(e){if(!e||"object"!=typeof e)return null;const t=e;if(Array.isArray(t.leds_hex)&&t.leds_hex.length>0){const e=t.leds_hex.map(e=>String(e).toLowerCase()),i=Number(t.n)>0?Number(t.n):e.length;return{leds_hex:e,n:i,channels:4===t.channels?4:3,scale:i/e.length,count:e.length}}const i=t.leds;if(!Array.isArray(i)||0===i.length)return null;const s=[];let n=3;for(const e of i){if("string"!=typeof e)continue;const t=e.trim().replace(/^#/,"");if(t&&t.length%2==0&&v.test(t)){if(8===t.length)n=4;else if(6!==t.length)continue;s.push(t.toLowerCase())}}if(0===s.length)return null;let r=s.length;if(void 0!==t.n){const e=Number(t.n);Number.isFinite(e)&&e>0&&(r=e)}return{leds_hex:s,n:r,channels:n,scale:r/s.length,count:s.length}}(t);s&&i({...s,entry_id:t.entry_id,controller_id:t.controller_id,fps:t.fps,stale:t.stale,status:t.status,dropped:t.dropped})},{type:"wled_studio/subscribe_live",schema_version:1,controller_id:t,remote:s?.remote??!1}))};o();const a=m(e,()=>{o()});return()=>{r=!0,a(),n?.(),n=void 0}}async function b(e){e.connected||await new Promise((t,i)=>{const s=window.setTimeout(()=>{e.removeEventListener("ready",n),i(new Error("Home Assistant WebSocket not connected"))},15e3),n=()=>{e.connected&&(window.clearTimeout(s),e.removeEventListener("ready",n),t())};e.addEventListener("ready",n)})}async function w(e){await b(e);try{return(await e.sendMessagePromise({type:"wled_studio/list_controllers",schema_version:1})).controllers??[]}catch(e){const t=e,i=t?.code?`${t.code}: ${t.message??"failed"}`:e instanceof Error?e.message:String(e);throw new Error(`wled_studio/list_controllers — ${i}`)}}function x(e,t,i=100){let s,n,r;const o=()=>{if(s&&clearTimeout(s),n&&clearTimeout(n),s=n=void 0,r){const t=r;r=void 0,e(...t)}},a=(...e)=>{r=e,s&&clearTimeout(s),s=setTimeout(o,t),n||(n=setTimeout(o,i))};return a.cancel=()=>{s&&clearTimeout(s),n&&clearTimeout(n),s=n=void 0,r=void 0},a}async function k(e,t,i){return S(e,t,{AudioReactive:i})}async function $(e,t){await b(e);return await e.sendMessagePromise({type:"wled_studio/get_state",schema_version:1,controller_id:t})}async function S(e,t,i,s){await b(e);return(await e.sendMessagePromise({type:"wled_studio/apply_state",schema_version:1,controller_id:t,state:i,full_response:s?.fullResponse??!1})).state??{}}async function P(e,t,i){return(await e.sendMessagePromise({type:"wled_studio/effect_meta",schema_version:1,controller_id:t,effect_id:i})).meta??{sliders:{},colors_enabled:!0,palette_enabled:!0,flag:null,defaults:{}}}async function I(e,t,i,s=0){await b(e);return(await e.sendMessagePromise({type:"wled_studio/apply_rgbwm",schema_version:1,controller_id:t,rgbwm:i,bus_index:s})).rgbwm??i}async function C(e,t){return(await e.sendMessagePromise({type:"wled_studio/get_presets",schema_version:1,controller_id:t})).presets??{}}async function M(e,t){await b(e);return(await e.sendMessagePromise({type:"wled_studio/get_palette_previews",schema_version:1,controller_id:t})).palette_previews??{}}function E(e){return!e||e.length<3?[255,255,255,0]:[e[0]??0,e[1]??0,e[2]??0,e[3]??0]}function L(e){if(!Array.isArray(e))return[];const t=[];for(const i of e){if("string"==typeof i){const e=i.replace("#","").trim();if(e.length>=6){t.push([parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16),e.length>=8?parseInt(e.slice(6,8),16):0]);continue}}Array.isArray(i)&&t.push([Number(i[0])||0,Number(i[1])||0,Number(i[2])||0,Number(i[3])||0])}return t}function R(e){const t=e.match(/_segment_(\d+)$/);return t?Number(t[1]):void 0}function A(e,t){for(const i of t){if(i.wled_segment_id===e)return i.entity_id;if(R(i.entity_id)===e)return i.entity_id;if(i.segment_index===e)return i.entity_id}}function T(e,t,i){const s=new Set(e),n=(i.length?i:e.map(e=>({id:e}))).map(e=>s.has(e.id)?{...t,id:e.id,sel:!0,on:void 0!==t.on?t.on:!1===e.on||e.on}:{id:e.id,sel:!1});return{seg:n}}function z(e,t){const i=new Set(e);return{seg:t.map(e=>({id:e.id,sel:i.has(e.id)}))}}async function N(e,t){return await b(e),e.sendMessagePromise({...t,schema_version:1})}async function O(e,t){return(await N(e,{type:"wled_studio/layout_list",controller_id:t})).layouts??[]}async function D(e,t,i){return(await N(e,{type:"wled_studio/layout_get",controller_id:t,layout_id:i})).layout??null}async function B(e,t,i){return(await N(e,{type:"wled_studio/layout_save",controller_id:t,layout:i})).layout??i}async function W(e,t,i,s){return(await N(e,{type:"wled_studio/layout_resolve_positions",controller_id:t,fixture_id:i,layout_id:s})).positions??[]}async function j(e,t,i,s){return N(e,{type:"wled_studio/layout_to_segments",controller_id:t,layout_id:i,fixture_id:s})}const F="wled_studio.effect_defaults",H="wled_studio.effect_library";function U(e){return Number.isFinite(e)?Math.min(255,Math.max(0,Math.round(e))):null}function q(e){try{const t=localStorage.getItem(e);if(!t)return{};const i=JSON.parse(t);return"object"==typeof i&&i?i:{}}catch{return{}}}function V(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Y(e,t){if(!e)return null;const i=function(e){return q(F)[e]??{}}(e)[String(t)];return i??null}function X(e,t,i){if(!e)return;const s=q(F),n={...s[e]??{}};n[String(t)]={...i},s[e]=n,V(F,s)}function J(e){return e?q(H)[e]??[]:[]}function G(e,t){const i={...t,id:`fx-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,savedAt:Date.now()},s=q(H),n=[i,...s[e]??[]];return s[e]=n.slice(0,48),V(H,s),i}function K(e){const t={};for(const i of["sx","ix","c1","c2","c3","o1","o2","o3"]){const s=e[i];"number"==typeof s&&(t[i]=s)}return t}function Q(e){if(e instanceof Error)return e.message;if("string"==typeof e)return e;if(e&&"object"==typeof e){const t=e;if("string"==typeof t.message)return"string"==typeof t.code?`${t.code}: ${t.message}`:t.message;const i=t.error;if(i&&"object"==typeof i){const e=i;if("string"==typeof e.message)return"string"==typeof e.code?`${e.code}: ${e.message}`:e.message}if("string"==typeof t.code)return t.code}try{return JSON.stringify(e)}catch{return"Unknown error"}}const Z={all:"All","1d":"1D","2d":"2D",solid:"Solid",sound:"Music",palette:"Palette"};function ee(e){return void 0!==e.Solid?e.Solid:0}const te=/\b(dj|sound|music|audio|beat|freq|grav|jugg|ripple|water|pixel|rock|streak|popcorn|balls|fireworks|matrix|stream|peak|level|radio|sync|reactive|volume|puddle|ripple|noisem|noisep|noisemove|pixels|juggle|sinelon|phased|blurz|djlight)\b/i;function ie(e,t,i,s,n){if("all"===i)return!0;const r=s[t]??null,o=e.toLowerCase();return"solid"===i?t===ee(n):"2d"===i?"2"===r||o.includes("2d"):"1d"===i?"2"!==r&&!o.includes("2d"):"sound"===i?function(e,t,i){const s=i[t]??null;return"v"===s||"f"===s||te.test(e)}(e,t,s):"palette"!==i||(o.includes("palette")||o.includes("colorloop")||o.includes("pride")||o.includes("cycle"))}var se,ne,re,oe,ae,le={},ce=[],he=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function de(e,t){for(var i in t)e[i]=t[i];return e}function ue(e){var t=e.parentNode;t&&t.removeChild(e)}function pe(e,t,i){var s,n,r,o,a=arguments;if(t=de({},t),arguments.length>3)for(i=[i],s=3;s<arguments.length;s++)i.push(a[s]);if(null!=i&&(t.children=i),null!=e&&null!=e.defaultProps)for(n in e.defaultProps)void 0===t[n]&&(t[n]=e.defaultProps[n]);return o=t.key,null!=(r=t.ref)&&delete t.ref,null!=o&&delete t.key,fe(e,t,o,r)}function fe(e,t,i,s){var n={type:e,props:t,key:i,ref:s,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return se.vnode&&se.vnode(n),n}function me(e){return e.children}function ge(e,t){this.props=e,this.context=t}function ve(e,t){if(null==t)return e.__p?ve(e.__p,e.__p.__k.indexOf(e)+1):null;for(var i;t<e.__k.length;t++)if(null!=(i=e.__k[t])&&null!=i.__e)return i.__e;return"function"==typeof e.type?ve(e):null}function _e(e){var t,i;if(null!=(e=e.__p)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(i=e.__k[t])&&null!=i.__e){e.__e=e.__c.base=i.__e;break}return _e(e)}}function ye(e){(!e.__d&&(e.__d=!0)&&1===ne.push(e)||oe!==se.debounceRendering)&&(oe=se.debounceRendering,(se.debounceRendering||re)(be))}function be(){var e,t,i,s,n,r,o,a;for(ne.sort(function(e,t){return t.__v.__b-e.__v.__b});e=ne.pop();)e.__d&&(i=void 0,s=void 0,r=(n=(t=e).__v).__e,o=t.__P,a=t.u,t.u=!1,o&&(i=[],s=Pe(o,n,de({},n),t.__n,void 0!==o.ownerSVGElement,null,i,a,null==r?ve(n):r),Ie(i,n),s!=r&&_e(n)))}function we(e,t,i,s,n,r,o,a,l){var c,h,d,u,p,f,m,g=i&&i.__k||ce,v=g.length;if(a==le&&(a=null!=r?r[0]:v?ve(i,0):null),c=0,t.__k=xe(t.__k,function(i){if(null!=i){if(i.__p=t,i.__b=t.__b+1,null===(d=g[c])||d&&i.key==d.key&&i.type===d.type)g[c]=void 0;else for(h=0;h<v;h++){if((d=g[h])&&i.key==d.key&&i.type===d.type){g[h]=void 0;break}d=null}if(u=Pe(e,i,d=d||le,s,n,r,o,null,a,l),(h=i.ref)&&d.ref!=h&&(m||(m=[])).push(h,i.__c||u,i),null!=u){if(null==f&&(f=u),null!=i.l)u=i.l,i.l=null;else if(r==d||u!=a||null==u.parentNode){e:if(null==a||a.parentNode!==e)e.appendChild(u);else{for(p=a,h=0;(p=p.nextSibling)&&h<v;h+=2)if(p==u)break e;e.insertBefore(u,a)}"option"==t.type&&(e.value="")}a=u.nextSibling,"function"==typeof t.type&&(t.l=u)}}return c++,i}),t.__e=f,null!=r&&"function"!=typeof t.type)for(c=r.length;c--;)null!=r[c]&&ue(r[c]);for(c=v;c--;)null!=g[c]&&Ee(g[c],g[c]);if(m)for(c=0;c<m.length;c++)Me(m[c],m[++c],m[++c])}function xe(e,t,i){if(null==i&&(i=[]),null==e||"boolean"==typeof e)t&&i.push(t(null));else if(Array.isArray(e))for(var s=0;s<e.length;s++)xe(e[s],t,i);else i.push(t?t(function(e){if(null==e||"boolean"==typeof e)return null;if("string"==typeof e||"number"==typeof e)return fe(null,e,null,null);if(null!=e.__e||null!=e.__c){var t=fe(e.type,e.props,e.key,null);return t.__e=e.__e,t}return e}(e)):e);return i}function ke(e,t,i){"-"===t[0]?e.setProperty(t,i):e[t]="number"==typeof i&&!1===he.test(t)?i+"px":null==i?"":i}function $e(e,t,i,s,n){var r,o,a,l,c;if("key"===(t=n?"className"===t?"class":t:"class"===t?"className":t)||"children"===t);else if("style"===t)if(r=e.style,"string"==typeof i)r.cssText=i;else{if("string"==typeof s&&(r.cssText="",s=null),s)for(o in s)i&&o in i||ke(r,o,"");if(i)for(a in i)s&&i[a]===s[a]||ke(r,a,i[a])}else"o"===t[0]&&"n"===t[1]?(l=t!==(t=t.replace(/Capture$/,"")),c=t.toLowerCase(),t=(c in e?c:t).slice(2),i?(s||e.addEventListener(t,Se,l),(e.t||(e.t={}))[t]=i):e.removeEventListener(t,Se,l)):"list"!==t&&"tagName"!==t&&"form"!==t&&!n&&t in e?e[t]=null==i?"":i:"function"!=typeof i&&"dangerouslySetInnerHTML"!==t&&(t!==(t=t.replace(/^xlink:?/,""))?null==i||!1===i?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),i):null==i||!1===i?e.removeAttribute(t):e.setAttribute(t,i))}function Se(e){return this.t[e.type](se.event?se.event(e):e)}function Pe(e,t,i,s,n,r,o,a,l,c){var h,d,u,p,f,m,g,v,_,y,b=t.type;if(void 0!==t.constructor)return null;(h=se.__b)&&h(t);try{e:if("function"==typeof b){if(v=t.props,_=(h=b.contextType)&&s[h.__c],y=h?_?_.props.value:h.__p:s,i.__c?g=(d=t.__c=i.__c).__p=d.__E:("prototype"in b&&b.prototype.render?t.__c=d=new b(v,y):(t.__c=d=new ge(v,y),d.constructor=b,d.render=Le),_&&_.sub(d),d.props=v,d.state||(d.state={}),d.context=y,d.__n=s,u=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=b.getDerivedStateFromProps&&de(d.__s==d.state?d.__s=de({},d.__s):d.__s,b.getDerivedStateFromProps(v,d.__s)),u)null==b.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&o.push(d);else{if(null==b.getDerivedStateFromProps&&null==a&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(v,y),!a&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(v,d.__s,y)){for(d.props=v,d.state=d.__s,d.__d=!1,d.__v=t,t.__e=null!=l?l!==i.__e?l:i.__e:null,t.__k=i.__k,h=0;h<t.__k.length;h++)t.__k[h]&&(t.__k[h].__p=t);break e}null!=d.componentWillUpdate&&d.componentWillUpdate(v,d.__s,y)}for(p=d.props,f=d.state,d.context=y,d.props=v,d.state=d.__s,(h=se.__r)&&h(t),d.__d=!1,d.__v=t,d.__P=e,h=d.render(d.props,d.state,d.context),t.__k=xe(null!=h&&h.type==me&&null==h.key?h.props.children:h),null!=d.getChildContext&&(s=de(de({},s),d.getChildContext())),u||null==d.getSnapshotBeforeUpdate||(m=d.getSnapshotBeforeUpdate(p,f)),we(e,t,i,s,n,r,o,l,c),d.base=t.__e;h=d.__h.pop();)d.__s&&(d.state=d.__s),h.call(d);u||null==p||null==d.componentDidUpdate||d.componentDidUpdate(p,f,m),g&&(d.__E=d.__p=null)}else t.__e=Ce(i.__e,t,i,s,n,r,o,c);(h=se.diffed)&&h(t)}catch(e){se.__e(e,t,i)}return t.__e}function Ie(e,t){for(var i;i=e.pop();)try{i.componentDidMount()}catch(e){se.__e(e,i.__v)}se.__c&&se.__c(t)}function Ce(e,t,i,s,n,r,o,a){var l,c,h,d,u=i.props,p=t.props;if(n="svg"===t.type||n,null==e&&null!=r)for(l=0;l<r.length;l++)if(null!=(c=r[l])&&(null===t.type?3===c.nodeType:c.localName===t.type)){e=c,r[l]=null;break}if(null==e){if(null===t.type)return document.createTextNode(p);e=n?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type),r=null}return null===t.type?u!==p&&(null!=r&&(r[r.indexOf(e)]=null),e.data=p):t!==i&&(null!=r&&(r=ce.slice.call(e.childNodes)),h=(u=i.props||le).dangerouslySetInnerHTML,d=p.dangerouslySetInnerHTML,a||(d||h)&&(d&&h&&d.__html==h.__html||(e.innerHTML=d&&d.__html||"")),function(e,t,i,s,n){var r;for(r in i)r in t||$e(e,r,null,i[r],s);for(r in t)n&&"function"!=typeof t[r]||"value"===r||"checked"===r||i[r]===t[r]||$e(e,r,t[r],i[r],s)}(e,p,u,n,a),t.__k=t.props.children,d||we(e,t,i,s,"foreignObject"!==t.type&&n,r,o,le,a),a||("value"in p&&void 0!==p.value&&p.value!==e.value&&(e.value=null==p.value?"":p.value),"checked"in p&&void 0!==p.checked&&p.checked!==e.checked&&(e.checked=p.checked))),e}function Me(e,t,i){try{"function"==typeof e?e(t):e.current=t}catch(e){se.__e(e,i)}}function Ee(e,t,i){var s,n,r;if(se.unmount&&se.unmount(e),(s=e.ref)&&Me(s,null,t),i||"function"==typeof e.type||(i=null!=(n=e.__e)),e.__e=e.l=null,null!=(s=e.__c)){if(s.componentWillUnmount)try{s.componentWillUnmount()}catch(e){se.__e(e,t)}s.base=s.__P=null}if(s=e.__k)for(r=0;r<s.length;r++)s[r]&&Ee(s[r],t,i);null!=n&&ue(n)}function Le(e,t,i){return this.constructor(e,i)}function Re(e,t,i){return t&&function(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}(e.prototype,t),e}function Ae(){return Ae=Object.assign||function(e){for(var t=arguments,i=1;i<arguments.length;i++){var s=t[i];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}return e},Ae.apply(this,arguments)}se={},ge.prototype.setState=function(e,t){var i=this.__s!==this.state&&this.__s||(this.__s=de({},this.state));("function"!=typeof e||(e=e(i,this.props)))&&de(i,e),null!=e&&this.__v&&(this.u=!1,t&&this.__h.push(t),ye(this))},ge.prototype.forceUpdate=function(e){this.__v&&(e&&this.__h.push(e),this.u=!0,ye(this))},ge.prototype.render=me,ne=[],re="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,oe=se.debounceRendering,se.__e=function(e,t,i){for(var s;t=t.__p;)if((s=t.__c)&&!s.__p)try{if(s.constructor&&null!=s.constructor.getDerivedStateFromError)s.setState(s.constructor.getDerivedStateFromError(e));else{if(null==s.componentDidCatch)continue;s.componentDidCatch(e)}return ye(s.__E=s)}catch(t){e=t}throw e},ae=le;var Te="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",ze="[\\s|\\(]+("+Te+")[,|\\s]+("+Te+")[,|\\s]+("+Te+")\\s*\\)?",Ne="[\\s|\\(]+("+Te+")[,|\\s]+("+Te+")[,|\\s]+("+Te+")[,|\\s]+("+Te+")\\s*\\)?",Oe=new RegExp("rgb"+ze),De=new RegExp("rgba"+Ne),Be=new RegExp("hsl"+ze),We=new RegExp("hsla"+Ne),je="^(?:#?|0x?)",Fe="([0-9a-fA-F]{1})",He="([0-9a-fA-F]{2})",Ue=new RegExp(je+Fe+Fe+Fe+"$"),qe=new RegExp(je+Fe+Fe+Fe+Fe+"$"),Ve=new RegExp(je+He+He+He+"$"),Ye=new RegExp(je+He+He+He+He+"$"),Xe=Math.log,Je=Math.round,Ge=Math.floor;function Ke(e,t,i){return Math.min(Math.max(e,t),i)}function Qe(e,t){var i=e.indexOf("%")>-1,s=parseFloat(e);return i?t/100*s:s}function Ze(e){return parseInt(e,16)}function et(e){return e.toString(16).padStart(2,"0")}var tt=function(){function e(e,t){this.$={h:0,s:0,v:0,a:1},e&&this.set(e),this.onChange=t,this.initialValue=Ae({},this.$)}var t=e.prototype;return t.set=function(t){if("string"==typeof t)/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(t)?this.hexString=t:/^rgba?/.test(t)?this.rgbString=t:/^hsla?/.test(t)&&(this.hslString=t);else{if("object"!=typeof t)throw new Error("Invalid color value");t instanceof e?this.hsva=t.hsva:"r"in t&&"g"in t&&"b"in t?this.rgb=t:"h"in t&&"s"in t&&"v"in t?this.hsv=t:"h"in t&&"s"in t&&"l"in t?this.hsl=t:"kelvin"in t&&(this.kelvin=t.kelvin)}},t.setChannel=function(e,t,i){var s;this[e]=Ae({},this[e],((s={})[t]=i,s))},t.reset=function(){this.hsva=this.initialValue},t.clone=function(){return new e(this)},t.unbind=function(){this.onChange=void 0},e.hsvToRgb=function(e){var t=e.h/60,i=e.s/100,s=e.v/100,n=Ge(t),r=t-n,o=s*(1-i),a=s*(1-r*i),l=s*(1-(1-r)*i),c=n%6,h=[l,s,s,a,o,o][c],d=[o,o,l,s,s,a][c];return{r:Ke(255*[s,a,o,o,l,s][c],0,255),g:Ke(255*h,0,255),b:Ke(255*d,0,255)}},e.rgbToHsv=function(e){var t=e.r/255,i=e.g/255,s=e.b/255,n=Math.max(t,i,s),r=Math.min(t,i,s),o=n-r,a=0,l=n,c=0===n?0:o/n;switch(n){case r:a=0;break;case t:a=(i-s)/o+(i<s?6:0);break;case i:a=(s-t)/o+2;break;case s:a=(t-i)/o+4}return{h:60*a%360,s:Ke(100*c,0,100),v:Ke(100*l,0,100)}},e.hsvToHsl=function(e){var t=e.s/100,i=e.v/100,s=(2-t)*i,n=s<=1?s:2-s,r=n<1e-9?0:t*i/n;return{h:e.h,s:Ke(100*r,0,100),l:Ke(50*s,0,100)}},e.hslToHsv=function(e){var t=2*e.l,i=e.s*(t<=100?t:200-t)/100,s=t+i<1e-9?0:2*i/(t+i);return{h:e.h,s:Ke(100*s,0,100),v:Ke((t+i)/2,0,100)}},e.kelvinToRgb=function(e){var t,i,s,n=e/100;return n<66?(t=255,i=-155.25485562709179-.44596950469579133*(i=n-2)+104.49216199393888*Xe(i),s=n<20?0:.8274096064007395*(s=n-10)-254.76935184120902+115.67994401066147*Xe(s)):(t=351.97690566805693+.114206453784165*(t=n-55)-40.25366309332127*Xe(t),i=325.4494125711974+.07943456536662342*(i=n-50)-28.0852963507957*Xe(i),s=255),{r:Ke(Ge(t),0,255),g:Ke(Ge(i),0,255),b:Ke(Ge(s),0,255)}},e.rgbToKelvin=function(t){for(var i,s=t.r,n=t.b,r=2e3,o=4e4;o-r>.4;){i=.5*(o+r);var a=e.kelvinToRgb(i);a.b/a.r>=n/s?o=i:r=i}return i},Re(e,[{key:"hsv",get:function(){var e=this.$;return{h:e.h,s:e.s,v:e.v}},set:function(e){var t=this.$;if(e=Ae({},t,e),this.onChange){var i={h:!1,v:!1,s:!1,a:!1};for(var s in t)i[s]=e[s]!=t[s];this.$=e,(i.h||i.s||i.v||i.a)&&this.onChange(this,i)}else this.$=e}},{key:"hsva",get:function(){return Ae({},this.$)},set:function(e){this.hsv=e}},{key:"hue",get:function(){return this.$.h},set:function(e){this.hsv={h:e}}},{key:"saturation",get:function(){return this.$.s},set:function(e){this.hsv={s:e}}},{key:"value",get:function(){return this.$.v},set:function(e){this.hsv={v:e}}},{key:"alpha",get:function(){return this.$.a},set:function(e){this.hsv=Ae({},this.hsv,{a:e})}},{key:"kelvin",get:function(){return e.rgbToKelvin(this.rgb)},set:function(t){this.rgb=e.kelvinToRgb(t)}},{key:"red",get:function(){return this.rgb.r},set:function(e){this.rgb=Ae({},this.rgb,{r:e})}},{key:"green",get:function(){return this.rgb.g},set:function(e){this.rgb=Ae({},this.rgb,{g:e})}},{key:"blue",get:function(){return this.rgb.b},set:function(e){this.rgb=Ae({},this.rgb,{b:e})}},{key:"rgb",get:function(){var t=e.hsvToRgb(this.$),i=t.r,s=t.g,n=t.b;return{r:Je(i),g:Je(s),b:Je(n)}},set:function(t){this.hsv=Ae({},e.rgbToHsv(t),{a:void 0===t.a?1:t.a})}},{key:"rgba",get:function(){return Ae({},this.rgb,{a:this.alpha})},set:function(e){this.rgb=e}},{key:"hsl",get:function(){var t=e.hsvToHsl(this.$),i=t.h,s=t.s,n=t.l;return{h:Je(i),s:Je(s),l:Je(n)}},set:function(t){this.hsv=Ae({},e.hslToHsv(t),{a:void 0===t.a?1:t.a})}},{key:"hsla",get:function(){return Ae({},this.hsl,{a:this.alpha})},set:function(e){this.hsl=e}},{key:"rgbString",get:function(){var e=this.rgb;return"rgb("+e.r+", "+e.g+", "+e.b+")"},set:function(e){var t,i,s,n,r=1;if((t=Oe.exec(e))?(i=Qe(t[1],255),s=Qe(t[2],255),n=Qe(t[3],255)):(t=De.exec(e))&&(i=Qe(t[1],255),s=Qe(t[2],255),n=Qe(t[3],255),r=Qe(t[4],1)),!t)throw new Error("Invalid rgb string");this.rgb={r:i,g:s,b:n,a:r}}},{key:"rgbaString",get:function(){var e=this.rgba;return"rgba("+e.r+", "+e.g+", "+e.b+", "+e.a+")"},set:function(e){this.rgbString=e}},{key:"hexString",get:function(){var e=this.rgb;return"#"+et(e.r)+et(e.g)+et(e.b)},set:function(e){var t,i,s,n,r=255;if((t=Ue.exec(e))?(i=17*Ze(t[1]),s=17*Ze(t[2]),n=17*Ze(t[3])):(t=qe.exec(e))?(i=17*Ze(t[1]),s=17*Ze(t[2]),n=17*Ze(t[3]),r=17*Ze(t[4])):(t=Ve.exec(e))?(i=Ze(t[1]),s=Ze(t[2]),n=Ze(t[3])):(t=Ye.exec(e))&&(i=Ze(t[1]),s=Ze(t[2]),n=Ze(t[3]),r=Ze(t[4])),!t)throw new Error("Invalid hex string");this.rgb={r:i,g:s,b:n,a:r/255}}},{key:"hex8String",get:function(){var e=this.rgba;return"#"+et(e.r)+et(e.g)+et(e.b)+et(Ge(255*e.a))},set:function(e){this.hexString=e}},{key:"hslString",get:function(){var e=this.hsl;return"hsl("+e.h+", "+e.s+"%, "+e.l+"%)"},set:function(e){var t,i,s,n,r=1;if((t=Be.exec(e))?(i=Qe(t[1],360),s=Qe(t[2],100),n=Qe(t[3],100)):(t=We.exec(e))&&(i=Qe(t[1],360),s=Qe(t[2],100),n=Qe(t[3],100),r=Qe(t[4],1)),!t)throw new Error("Invalid hsl string");this.hsl={h:i,s:s,l:n,a:r}}},{key:"hslaString",get:function(){var e=this.hsla;return"hsla("+e.h+", "+e.s+"%, "+e.l+"%, "+e.a+")"},set:function(e){this.hslString=e}}]),e}();function it(e){var t,i=e.width,s=e.sliderSize,n=e.borderWidth,r=e.handleRadius,o=e.padding,a=e.sliderShape,l="horizontal"===e.layoutDirection;return s=null!=(t=s)?t:2*o+2*r,"circle"===a?{handleStart:e.padding+e.handleRadius,handleRange:i-2*o-2*r,width:i,height:i,cx:i/2,cy:i/2,radius:i/2-n/2}:{handleStart:s/2,handleRange:i-s,radius:s/2,x:0,y:0,width:l?s:i,height:l?i:s}}function st(e,t){var i=it(e),s=i.width,n=i.height,r=i.handleRange,o=i.handleStart,a="horizontal"===e.layoutDirection,l=function(e,t){var i=t.hsva,s=t.rgb;switch(e.sliderType){case"red":return s.r/2.55;case"green":return s.g/2.55;case"blue":return s.b/2.55;case"alpha":return 100*i.a;case"kelvin":var n=e.minTemperature,r=e.maxTemperature-n,o=(t.kelvin-n)/r*100;return Math.max(0,Math.min(o,100));case"hue":return i.h/=3.6;case"saturation":return i.s;default:return i.v}}(e,t),c=a?s/2:n/2,h=o+l/100*r;return a&&(h=-1*h+r+2*o),{x:a?c:h,y:a?h:c}}var nt,rt=2*Math.PI,ot=function(e,t){return Math.sqrt(e*e+t*t)};function at(e){return e.width/2-e.padding-e.handleRadius-e.borderWidth}function lt(e){var t=e.width/2;return{width:e.width,radius:t-e.borderWidth,cx:t,cy:t}}function ct(e,t,i){var s=e.wheelAngle,n=e.wheelDirection;return i&&"clockwise"===n?t=s+t:"clockwise"===n?t=360-s+t:i&&"anticlockwise"===n?t=s+180-t:"anticlockwise"===n&&(t=s-t),function(e,t){return(e%t+t)%t}(t,360)}function ht(e,t,i){var s=lt(e),n=s.cx,r=s.cy,o=at(e);t=n-t,i=r-i;var a=ct(e,Math.atan2(-i,-t)*(360/rt)),l=Math.min(ot(t,i),o);return{h:Math.round(a),s:Math.round(100/o*l)}}function dt(e){var t=e.width,i=e.boxHeight;return{width:t,height:null!=i?i:t,radius:e.padding+e.handleRadius}}function ut(e,t,i){var s=dt(e),n=s.width,r=s.height,o=s.radius,a=(t-o)/(n-2*o)*100,l=(i-o)/(r-2*o)*100;return{s:Math.max(0,Math.min(a,100)),v:Math.max(0,Math.min(100-l,100))}}function pt(e){nt||(nt=document.getElementsByTagName("base"));var t=window.navigator.userAgent,i=/^((?!chrome|android).)*safari/i.test(t),s=/iPhone|iPod|iPad/i.test(t),n=window.location;return(i||s)&&nt.length>0?n.protocol+"//"+n.host+n.pathname+n.search+e:e}function ft(e,t,i,s){for(var n=0;n<s.length;n++){var r=s[n].x-t,o=s[n].y-i;if(Math.sqrt(r*r+o*o)<e.handleRadius)return n}return null}function mt(e){return{boxSizing:"border-box",border:e.borderWidth+"px solid "+e.borderColor}}function gt(e,t,i){return e+"-gradient("+t+", "+i.map(function(e){var t=e[0];return e[1]+" "+t+"%"}).join(",")+")"}function vt(e){return"string"==typeof e?e:e+"px"}var _t=["mousemove","touchmove","mouseup","touchend"],yt=function(e){function t(t){e.call(this,t),this.uid=(Math.random()+1).toString(36).substring(5)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(e){var t=this.handleEvent.bind(this),i={onMouseDown:t,ontouchstart:t},s="horizontal"===e.layoutDirection,n=null===e.margin?e.sliderMargin:e.margin,r={overflow:"visible",display:s?"inline-block":"block"};return e.index>0&&(r[s?"marginLeft":"marginTop"]=n),pe(me,null,e.children(this.uid,i,r))},t.prototype.handleEvent=function(e){var t=this,i=this.props.onInput,s=this.base.getBoundingClientRect();e.preventDefault();var n=e.touches?e.changedTouches[0]:e,r=n.clientX-s.left,o=n.clientY-s.top;switch(e.type){case"mousedown":case"touchstart":!1!==i(r,o,0)&&_t.forEach(function(e){document.addEventListener(e,t,{passive:!1})});break;case"mousemove":case"touchmove":i(r,o,1);break;case"mouseup":case"touchend":i(r,o,2),_t.forEach(function(e){document.removeEventListener(e,t,{passive:!1})})}},t}(ge);function bt(e){var t=e.r,i=e.url,s=t,n=t;return pe("svg",{className:"IroHandle IroHandle--"+e.index+" "+(e.isActive?"IroHandle--isActive":""),style:{"-webkit-tap-highlight-color":"rgba(0, 0, 0, 0);",transform:"translate("+vt(e.x)+", "+vt(e.y)+")",willChange:"transform",top:vt(-t),left:vt(-t),width:vt(2*t),height:vt(2*t),position:"absolute",overflow:"visible"}},i&&pe("use",Object.assign({xlinkHref:pt(i)},e.props)),!i&&pe("circle",{cx:s,cy:n,r:t,fill:"none","stroke-width":2,stroke:"#000"}),!i&&pe("circle",{cx:s,cy:n,r:t-2,fill:e.fill,"stroke-width":2,stroke:"#fff"}))}function wt(e){var t=e.activeIndex,i=void 0!==t&&t<e.colors.length?e.colors[t]:e.color,s=it(e),n=s.width,r=s.height,o=s.radius,a=st(e,i),l=function(e,t){var i=t.hsv,s=t.rgb;switch(e.sliderType){case"red":return[[0,"rgb(0,"+s.g+","+s.b+")"],[100,"rgb(255,"+s.g+","+s.b+")"]];case"green":return[[0,"rgb("+s.r+",0,"+s.b+")"],[100,"rgb("+s.r+",255,"+s.b+")"]];case"blue":return[[0,"rgb("+s.r+","+s.g+",0)"],[100,"rgb("+s.r+","+s.g+",255)"]];case"alpha":return[[0,"rgba("+s.r+","+s.g+","+s.b+",0)"],[100,"rgb("+s.r+","+s.g+","+s.b+")"]];case"kelvin":for(var n=[],r=e.minTemperature,o=e.maxTemperature,a=o-r,l=r,c=0;l<o;l+=a/8,c+=1){var h=tt.kelvinToRgb(l),d=h.r,u=h.g,p=h.b;n.push([12.5*c,"rgb("+d+","+u+","+p+")"])}return n;case"hue":return[[0,"#f00"],[16.666,"#ff0"],[33.333,"#0f0"],[50,"#0ff"],[66.666,"#00f"],[83.333,"#f0f"],[100,"#f00"]];case"saturation":var f=tt.hsvToHsl({h:i.h,s:0,v:i.v}),m=tt.hsvToHsl({h:i.h,s:100,v:i.v});return[[0,"hsl("+f.h+","+f.s+"%,"+f.l+"%)"],[100,"hsl("+m.h+","+m.s+"%,"+m.l+"%)"]];default:var g=tt.hsvToHsl({h:i.h,s:i.s,v:100});return[[0,"#000"],[100,"hsl("+g.h+","+g.s+"%,"+g.l+"%)"]]}}(e,i);return pe(yt,Object.assign({},e,{onInput:function(t,s,n){var r=function(e,t,i){var s,n=it(e),r=n.handleRange,o=n.handleStart;s="horizontal"===e.layoutDirection?-1*i+r+o:t-o,s=Math.max(Math.min(s,r),0);var a=Math.round(100/r*s);switch(e.sliderType){case"kelvin":var l=e.minTemperature;return l+(e.maxTemperature-l)*(a/100);case"alpha":return a/100;case"hue":return 3.6*a;case"red":case"blue":case"green":return 2.55*a;default:return a}}(e,t,s);e.parent.inputActive=!0,i[e.sliderType]=r,e.onInput(n,e.id)}}),function(t,s,c){return pe("div",Object.assign({},s,{className:"IroSlider",style:Object.assign({},{position:"relative",width:vt(n),height:vt(r),borderRadius:vt(o),background:"conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)",backgroundSize:"8px 8px"},c)}),pe("div",{className:"IroSliderGradient",style:Object.assign({},{position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:vt(o),background:gt("linear","horizontal"===e.layoutDirection?"to top":"to right",l)},mt(e))}),pe(bt,{isActive:!0,index:i.index,r:e.handleRadius,url:e.handleSvg,props:e.handleProps,x:a.x,y:a.y}))})}function xt(e){var t=dt(e),i=t.width,s=t.height,n=t.radius,r=e.colors,o=e.parent,a=e.activeIndex,l=void 0!==a&&a<e.colors.length?e.colors[a]:e.color,c=[[[0,"#fff"],[100,"hsl("+l.hue+",100%,50%)"]],[[0,"rgba(0,0,0,0)"],[100,"#000"]]],h=r.map(function(t){return function(e,t){var i=dt(e),s=i.width,n=i.height,r=i.radius,o=t.hsv,a=r,l=s-2*r,c=n-2*r;return{x:a+o.s/100*l,y:a+(c-o.v/100*c)}}(e,t)});return pe(yt,Object.assign({},e,{onInput:function(t,i,s){if(0===s){var n=ft(e,t,i,h);null!==n?o.setActiveColor(n):(o.inputActive=!0,l.hsv=ut(e,t,i),e.onInput(s,e.id))}else 1===s&&(o.inputActive=!0,l.hsv=ut(e,t,i));e.onInput(s,e.id)}}),function(t,o,a){return pe("div",Object.assign({},o,{className:"IroBox",style:Object.assign({},{width:vt(i),height:vt(s),position:"relative"},a)}),pe("div",{className:"IroBox",style:Object.assign({},{width:"100%",height:"100%",borderRadius:vt(n)},mt(e),{background:gt("linear","to bottom",c[1])+","+gt("linear","to right",c[0])})}),r.filter(function(e){return e!==l}).map(function(t){return pe(bt,{isActive:!1,index:t.index,fill:t.hslString,r:e.handleRadius,url:e.handleSvg,props:e.handleProps,x:h[t.index].x,y:h[t.index].y})}),pe(bt,{isActive:!0,index:l.index,fill:l.hslString,r:e.activeHandleRadius||e.handleRadius,url:e.handleSvg,props:e.handleProps,x:h[l.index].x,y:h[l.index].y}))})}bt.defaultProps={fill:"none",x:0,y:0,r:8,url:null,props:{x:0,y:0}},wt.defaultProps=Object.assign({},{sliderShape:"bar",sliderType:"value",minTemperature:2200,maxTemperature:11e3});function kt(e){var t=lt(e).width,i=e.colors;e.borderWidth;var s=e.parent,n=e.color,r=n.hsv,o=i.map(function(t){return function(e,t){var i=t.hsv,s=lt(e),n=s.cx,r=s.cy,o=at(e),a=(180+ct(e,i.h,!0))*(rt/360),l=i.s/100*o,c="clockwise"===e.wheelDirection?-1:1;return{x:n+l*Math.cos(a)*c,y:r+l*Math.sin(a)*c}}(e,t)}),a={position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:"50%",boxSizing:"border-box"};return pe(yt,Object.assign({},e,{onInput:function(t,i,r){if(0===r){if(!function(e,t,i){var s=lt(e),n=s.cx,r=s.cy,o=e.width/2;return ot(n-t,r-i)<o}(e,t,i))return!1;var a=ft(e,t,i,o);null!==a?s.setActiveColor(a):(s.inputActive=!0,n.hsv=ht(e,t,i),e.onInput(r,e.id))}else 1===r&&(s.inputActive=!0,n.hsv=ht(e,t,i));e.onInput(r,e.id)}}),function(s,l,c){return pe("div",Object.assign({},l,{className:"IroWheel",style:Object.assign({},{width:vt(t),height:vt(t),position:"relative"},c)}),pe("div",{className:"IroWheelHue",style:Object.assign({},a,{transform:"rotateZ("+(e.wheelAngle+90)+"deg)",background:"clockwise"===e.wheelDirection?"conic-gradient(red, yellow, lime, aqua, blue, magenta, red)":"conic-gradient(red, magenta, blue, aqua, lime, yellow, red)"})}),pe("div",{className:"IroWheelSaturation",style:Object.assign({},a,{background:"radial-gradient(circle closest-side, #fff, transparent)"})}),e.wheelLightness&&pe("div",{className:"IroWheelLightness",style:Object.assign({},a,{background:"#000",opacity:1-r.v/100})}),pe("div",{className:"IroWheelBorder",style:Object.assign({},a,mt(e))}),i.filter(function(e){return e!==n}).map(function(t){return pe(bt,{isActive:!1,index:t.index,fill:t.hslString,r:e.handleRadius,url:e.handleSvg,props:e.handleProps,x:o[t.index].x,y:o[t.index].y})}),pe(bt,{isActive:!0,index:n.index,fill:n.hslString,r:e.activeHandleRadius||e.handleRadius,url:e.handleSvg,props:e.handleProps,x:o[n.index].x,y:o[n.index].y}))})}var $t=function(e){function t(t){var i=this;e.call(this,t),this.colors=[],this.inputActive=!1,this.events={},this.activeEvents={},this.deferredEvents={},this.id=t.id,(t.colors.length>0?t.colors:[t.color]).forEach(function(e){return i.addColor(e)}),this.setActiveColor(0),this.state=Object.assign({},t,{color:this.color,colors:this.colors,layout:t.layout})}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.addColor=function(e,t){void 0===t&&(t=this.colors.length);var i=new tt(e,this.onColorChange.bind(this));this.colors.splice(t,0,i),this.colors.forEach(function(e,t){return e.index=t}),this.state&&this.setState({colors:this.colors}),this.deferredEmit("color:init",i)},t.prototype.removeColor=function(e){var t=this.colors.splice(e,1)[0];t.unbind(),this.colors.forEach(function(e,t){return e.index=t}),this.state&&this.setState({colors:this.colors}),t.index===this.color.index&&this.setActiveColor(0),this.emit("color:remove",t)},t.prototype.setActiveColor=function(e){this.color=this.colors[e],this.state&&this.setState({color:this.color}),this.emit("color:setActive",this.color)},t.prototype.setColors=function(e,t){var i=this;void 0===t&&(t=0),this.colors.forEach(function(e){return e.unbind()}),this.colors=[],e.forEach(function(e){return i.addColor(e)}),this.setActiveColor(t),this.emit("color:setAll",this.colors)},t.prototype.on=function(e,t){var i=this,s=this.events;(Array.isArray(e)?e:[e]).forEach(function(e){(s[e]||(s[e]=[])).push(t),i.deferredEvents[e]&&(i.deferredEvents[e].forEach(function(e){t.apply(null,e)}),i.deferredEvents[e]=[])})},t.prototype.off=function(e,t){var i=this;(Array.isArray(e)?e:[e]).forEach(function(e){var s=i.events[e];s&&s.splice(s.indexOf(t),1)})},t.prototype.emit=function(e){for(var t=this,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var n=this.activeEvents;!!n.hasOwnProperty(e)&&n[e]||(n[e]=!0,(this.events[e]||[]).forEach(function(e){return e.apply(t,i)}),n[e]=!1)},t.prototype.deferredEmit=function(e){for(var t,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var n=this.deferredEvents;(t=this).emit.apply(t,[e].concat(i)),(n[e]||(n[e]=[])).push(i)},t.prototype.setOptions=function(e){this.setState(e)},t.prototype.resize=function(e){this.setOptions({width:e})},t.prototype.reset=function(){this.colors.forEach(function(e){return e.reset()}),this.setState({colors:this.colors})},t.prototype.onMount=function(e){this.el=e,this.deferredEmit("mount",this)},t.prototype.onColorChange=function(e,t){this.setState({color:this.color}),this.inputActive&&(this.inputActive=!1,this.emit("input:change",e,t)),this.emit("color:change",e,t)},t.prototype.emitInputEvent=function(e,t){0===e?this.emit("input:start",this.color,t):1===e?this.emit("input:move",this.color,t):2===e&&this.emit("input:end",this.color,t)},t.prototype.render=function(e,t){var i=this,s=t.layout;return Array.isArray(s)||(s=[{component:kt},{component:wt}],t.transparency&&s.push({component:wt,options:{sliderType:"alpha"}})),pe("div",{class:"IroColorPicker",id:t.id,style:{display:t.display}},s.map(function(e,s){var n=e.component,r=e.options;return pe(n,Object.assign({},t,r,{ref:void 0,onInput:i.emitInputEvent.bind(i),parent:i,index:s}))}))},t}(ge);$t.defaultProps=Object.assign({},{width:300,height:300,color:"#fff",colors:[],padding:6,layoutDirection:"vertical",borderColor:"#fff",borderWidth:0,handleRadius:8,activeHandleRadius:null,handleSvg:null,handleProps:{x:0,y:0},wheelLightness:!0,wheelAngle:0,wheelDirection:"anticlockwise",sliderSize:null,sliderMargin:12,boxHeight:null},{colors:[],display:"block",id:null,layout:"default",margin:null});var St,Pt,It,Ct=(Pt=function(e,t){var i,s=document.createElement("div");function n(){var t=e instanceof Element?e:document.querySelector(e);t.appendChild(i.base),i.onMount(t)}return function(e,t,i){var s,n,r;se.__p&&se.__p(e,t),n=(s=i===ae)?null:t.__k,e=pe(me,null,[e]),r=[],Pe(t,t.__k=e,n||le,le,void 0!==t.ownerSVGElement,n?null:ce.slice.call(t.childNodes),r,!1,le,s),Ie(r,e)}(pe(St,Object.assign({},{ref:function(e){return i=e}},t)),s),"loading"!==document.readyState?n():document.addEventListener("DOMContentLoaded",n),i},Pt.prototype=(St=$t).prototype,Object.assign(Pt,St),Pt.__component=St,Pt);!function(e){var t;e.version="5.5.2",e.Color=tt,e.ColorPicker=Ct,(t=e.ui||(e.ui={})).h=pe,t.ComponentBase=yt,t.Handle=bt,t.Slider=wt,t.Wheel=kt,t.Box=xt}(It||(It={}));var Mt=It;const Et="wled_studio.color_swatches";function Lt(e){return e.trim()||"_default"}function Rt(){try{const e=localStorage.getItem(Et);if(!e)return{};const t=JSON.parse(e);return t&&"object"==typeof t?t:{}}catch{return{}}}function At(e){const t=Rt()[Lt(e)];return Array.isArray(t)?[...t]:[]}function Tt(e,t){const i=Rt();var s;i[Lt(e)]=t.slice(0,32),s=i,localStorage.setItem(Et,JSON.stringify(s))}function zt(e,t){return`${e[0]},${e[1]},${e[2]},${t}`}function Nt(e,t){const i="#"+[e[0],e[1],e[2]].map(e=>Math.max(0,Math.min(255,e)).toString(16).padStart(2,"0")).join("");return t>0?`${i} +W`:i.toUpperCase()}let Ot=class extends u{constructor(){super(...arguments),this.controllerId="",this.rgb=[255,128,0],this.white=0,this._swatches=[],this._saving=!1,this._saveName="",this._editingId=null,this._editName="",this._pressTimer=null,this._pressSwatch=null,this._suppressChipClick=!1}onPoweredConnect(){this._reload()}updated(e){super.updated(e),e.has("controllerId")&&this._reload()}_reload(){this._swatches=At(this.controllerId)}_currentKey(){return zt(this.rgb,this.white)}_swatchCss(e){const[t,i,s]=e.rgb;return e.white>0?`linear-gradient(135deg, rgb(${t},${i},${s}) 55%, rgba(255,255,255,0.95) 55%)`:`rgb(${t},${i},${s})`}_apply(e){this.dispatchEvent(new CustomEvent("swatch-select",{detail:{rgb:[...e.rgb],white:e.white},bubbles:!0,composed:!0}))}_openSave(){this._saveName=Nt(this.rgb,this.white),this._saving=!0,this._editingId=null}_confirmSave(){!function(e,t){const i=At(e),s=zt(t.rgb,t.white),n=i.find(e=>zt(e.rgb,e.white)===s);if(n)return n.name=t.name.trim()||n.name,Tt(e,i),n;const r={id:`sw_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`,name:t.name.trim()||Nt(t.rgb,t.white),rgb:[...t.rgb],white:t.white};i.unshift(r),Tt(e,i)}(this.controllerId,{name:this._saveName,rgb:this.rgb,white:this.white}),this._saving=!1,this._reload(),this.dispatchEvent(new CustomEvent("swatches-changed",{bubbles:!0,composed:!0}))}_cancelSave(){this._saving=!1}_startEdit(e,t){t.stopPropagation(),this._editingId=e.id,this._editName=e.name,this._saving=!1}_confirmEdit(){this._editingId&&(!function(e,t,i){const s=At(e),n=s.findIndex(e=>e.id===t);if(n<0)return null;const r=s[n],o={...r,...i,rgb:i.rgb?[...i.rgb]:r.rgb};void 0!==i.name&&(o.name=i.name.trim()||Nt(o.rgb,o.white)),s[n]=o,Tt(e,s)}(this.controllerId,this._editingId,{name:this._editName}),this._editingId=null,this._reload())}_cancelEdit(){this._editingId=null}_delete(e,t){t?.stopPropagation(),function(e,t){const i=At(e).filter(e=>e.id!==t);Tt(e,i)}(this.controllerId,e),this._editingId===e&&(this._editingId=null),this._reload(),this.dispatchEvent(new CustomEvent("swatches-changed",{bubbles:!0,composed:!0}))}_clearPressTimer(){null!==this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null),this._pressSwatch=null}_confirmDelete(e){confirm(`Delete swatch "${e.name}"?`)&&this._delete(e.id),this._suppressChipClick=!1}_onChipTouchStart(e){this._clearPressTimer(),this._pressSwatch=e,this._pressTimer=setTimeout(()=>{this._pressTimer=null,this._suppressChipClick=!0,this._confirmDelete(e)},500)}_onChipTouchEnd(){this._clearPressTimer()}_onChipTouchMove(e){if(!this._pressSwatch||1!==e.touches.length)return;const t=e.touches[0],i=e.currentTarget.getBoundingClientRect();(t.clientX<i.left-12||t.clientX>i.right+12||t.clientY<i.top-12||t.clientY>i.bottom+12)&&this._clearPressTimer()}_onChipClick(e,t){if(this._suppressChipClick)return this._suppressChipClick=!1,t.preventDefault(),void t.stopPropagation();this._apply(e)}render(){const e=this._currentKey();return n`
      <section class="swatches" aria-label="Saved color swatches">
        <div class="head">
          <span class="label">Color library</span>
          <button
            type="button"
            class="save-btn"
            ?disabled=${this._saving}
            @click=${()=>this._openSave()}
            aria-label="Save current color to library"
          >
            <ha-icon icon="mdi:bookmark-plus-outline"></ha-icon>
            Save to library
          </button>
        </div>

        ${this._saving?n`
              <div class="inline-form" role="form">
                <input
                  type="text"
                  class="name-input"
                  placeholder="Swatch name"
                  .value=${this._saveName}
                  @input=${e=>{this._saveName=e.target.value}}
                  @keydown=${e=>{"Enter"===e.key&&this._confirmSave(),"Escape"===e.key&&this._cancelSave()}}
                />
                <button type="button" class="primary" @click=${()=>this._confirmSave()}>
                  Save
                </button>
                <button type="button" class="ghost" @click=${()=>this._cancelSave()}>
                  Cancel
                </button>
              </div>
            `:null}

        ${this._editingId?n`
              <div class="inline-form" role="form">
                <input
                  type="text"
                  class="name-input"
                  .value=${this._editName}
                  @input=${e=>{this._editName=e.target.value}}
                  @keydown=${e=>{"Enter"===e.key&&this._confirmEdit(),"Escape"===e.key&&this._cancelEdit()}}
                />
                <button type="button" class="primary" @click=${()=>this._confirmEdit()}>
                  Rename
                </button>
                <button type="button" class="ghost" @click=${()=>this._cancelEdit()}>
                  Cancel
                </button>
              </div>
            `:null}

        ${0!==this._swatches.length||this._saving?n`
              <div class="grid" role="list">
                ${this._swatches.map(t=>n`
                    <div
                      class="chip-wrap ${zt(t.rgb,t.white)===e?"active":""}"
                      role="listitem"
                    >
                      <button
                        type="button"
                        class="chip"
                        title=${t.name}
                        style="background: ${this._swatchCss(t)}"
                        @click=${e=>this._onChipClick(t,e)}
                        @touchstart=${()=>this._onChipTouchStart(t)}
                        @touchend=${()=>this._onChipTouchEnd()}
                        @touchcancel=${()=>this._onChipTouchEnd()}
                        @touchmove=${e=>this._onChipTouchMove(e)}
                        aria-label=${`Apply ${t.name}`}
                      ></button>
                      <span class="chip-name">${t.name}</span>
                      <div class="chip-actions">
                        <button
                          type="button"
                          class="icon"
                          aria-label=${`Rename ${t.name}`}
                          @click=${e=>this._startEdit(t,e)}
                        >
                          <ha-icon icon="mdi:pencil-outline"></ha-icon>
                        </button>
                        <button
                          type="button"
                          class="icon danger"
                          aria-label=${`Remove ${t.name}`}
                          @click=${e=>{e.stopPropagation(),this._confirmDelete(t)}}
                        >
                          <ha-icon icon="mdi:close"></ha-icon>
                        </button>
                      </div>
                    </div>
                  `)}
              </div>
            `:n`<p class="empty">Save colors you use often — tap a swatch to apply.</p>`}
      </section>
    `}static{this.styles=[...d,e`
      .swatches {
        width: 100%;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid var(--divider-color, rgba(128, 128, 128, 0.25));
      }
      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 8px;
      }
      .label {
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: var(--wled-text-muted);
      }
      .save-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.35));
        border-radius: 999px;
        padding: 4px 10px;
        font-size: 0.72rem;
        background: var(--card-background-color, transparent);
        color: inherit;
        cursor: pointer;
      }
      .save-btn:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }
      .save-btn ha-icon {
        --mdc-icon-size: 16px;
      }
      .inline-form {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        align-items: center;
        margin-bottom: 10px;
      }
      .name-input {
        flex: 1;
        min-width: 120px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, #444);
        padding: 6px 10px;
        font-size: 0.8rem;
        background: var(--card-background-color);
        color: inherit;
      }
      .primary,
      .ghost {
        border-radius: 8px;
        padding: 6px 12px;
        font-size: 0.75rem;
        cursor: pointer;
        border: none;
      }
      .primary {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .ghost {
        background: transparent;
        color: inherit;
        border: 1px solid var(--divider-color, #444);
      }
      .empty {
        margin: 0;
        font-size: 0.72rem;
        color: var(--wled-text-muted);
      }
      .grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .chip-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        width: 52px;
        position: relative;
      }
      .chip-wrap.active .chip {
        box-shadow:
          0 0 0 2px var(--card-background-color, #1a1a1a),
          0 0 0 4px var(--primary-color, #18a0fb);
      }
      .chip {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        cursor: pointer;
        padding: 0;
        transition: transform 0.12s ease;
      }
      .chip:hover {
        transform: scale(1.06);
      }
      .chip-name {
        font-size: 0.62rem;
        opacity: 0.75;
        max-width: 52px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
      .chip-actions {
        display: flex;
        gap: 2px;
        opacity: 0;
        transition: opacity 0.15s ease;
      }
      .chip-wrap:hover .chip-actions,
      .chip-wrap:focus-within .chip-actions,
      .chip-wrap:active .chip-actions,
      .chip-wrap.active .chip-actions {
        opacity: 1;
      }
      @media (hover: none) {
        .chip-actions {
          opacity: 1;
        }
      }
      .icon {
        border: none;
        background: transparent;
        color: inherit;
        padding: 0;
        cursor: pointer;
        opacity: 0.7;
        line-height: 0;
      }
      .icon:hover {
        opacity: 1;
        color: var(--primary-color);
      }
      .icon.danger:hover {
        color: var(--error-color, #e74c3c);
      }
      .icon ha-icon {
        --mdc-icon-size: 14px;
      }
    `]}};i([s()],Ot.prototype,"controllerId",void 0),i([s({type:Array})],Ot.prototype,"rgb",void 0),i([s({type:Number})],Ot.prototype,"white",void 0),i([r()],Ot.prototype,"_swatches",void 0),i([r()],Ot.prototype,"_saving",void 0),i([r()],Ot.prototype,"_saveName",void 0),i([r()],Ot.prototype,"_editingId",void 0),i([r()],Ot.prototype,"_editName",void 0),Ot=i([p("wled-color-swatch-bar")],Ot);let Dt=class extends u{constructor(){super(...arguments),this.rgb=[255,128,0],this.white=0,this.awm=0,this.showWhite=!0,this.controllerId="",this._suppress=!1,this._lastSize=0}onPoweredConnect(){this.isPowered&&this.scheduleRaf(()=>{this.isPowered&&this._ensurePicker()})}firstUpdated(){this.isPowered&&this._bindResizeObserver()}onPoweredDisconnect(){this._destroyPicker(),super.onPoweredDisconnect()}updated(e){super.updated(e),this.isPowered?this.updateComplete.then(()=>{this.isConnected&&this.isPowered&&(this._ensurePicker(),this._picker&&e.has("rgb")&&this._syncPicker())}):this._destroyPicker()}_pickerInDom(){const e=this._host;return!!e&&Boolean(e.querySelector(".IroColorPicker, .IroWheel"))}_ensurePicker(){this._picker&&!this._pickerInDom()&&this._destroyPicker(),this._picker||this._tryMountOrResize()}_bindResizeObserver(){const e=this._host;e&&!this._ro&&(this._ro=new ResizeObserver(()=>{this.isPowered&&this._ensurePicker()}),this._ro.observe(e),this.addUnsub(()=>{this._ro?.disconnect(),this._ro=void 0}),this.isPowered&&this._ensurePicker())}_hostBox(e){const t=e.getBoundingClientRect();let i=t.width,s=t.height;if((i<8||s<8)&&(i=e.offsetWidth,s=e.offsetHeight),i<8||s<8){const t=getComputedStyle(e);i=parseFloat(t.width)||0,s=parseFloat(t.height)||0}if(i<8||s<8){const e=this.getBoundingClientRect();i=e.width||this.offsetWidth,s=e.height||this.offsetHeight}if(i>=8&&s<8&&(s=i),i<8&&s>=8&&(i=s),i<8&&s<8){const e=this.offsetWidth||280;i=Math.min(280,e),s=i}return{width:i,height:s}}_wheelSize(e,t){return function(e){const t=Math.floor(.7*e);return Math.max(180,Math.min(280,t||180))}(Math.min(e,t))}_tryMountOrResize(){const e=this._host;if(!e)return;const{width:t,height:i}=this._hostBox(e);if(t<8||i<8)return;const s=this._wheelSize(t,i);this._picker?s!==this._lastSize&&"function"==typeof this._picker.resize&&(this._picker.resize(s),this._lastSize=s):this._createPicker(e,s)}_borderColor(){return getComputedStyle(this).getPropertyValue("--wled-border").trim()||"rgba(255, 255, 255, 0.12)"}_createPicker(e,t){this._picker||(e.replaceChildren(),this._lastSize=t,this._picker=Mt.ColorPicker(e,{width:t,color:{r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},borderWidth:1,borderColor:this._borderColor(),layout:[{component:Mt.ui.Wheel}]}),this._picker.on("color:change",e=>{this._suppress||this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:[e.rgb.r,e.rgb.g,e.rgb.b],white:this.white},bubbles:!0,composed:!0}))}),this._syncPicker())}_destroyPicker(){this._host?.replaceChildren(),this._picker=void 0,this._lastSize=0}_syncPicker(){this._picker&&(this._suppress=!0,this._picker.color.rgb={r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},this._suppress=!1)}_onWhite(e){const t=Number(e.target.value);this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:this.rgb,white:t},bubbles:!0,composed:!0}))}_onAwm(e){const t=Number(e.target.value);this.dispatchEvent(new CustomEvent("awm-change",{detail:{awm:t},bubbles:!0,composed:!0}))}_onSwatchSelect(e){this.dispatchEvent(new CustomEvent("color-change",{detail:e.detail,bubbles:!0,composed:!0}))}render(){return n`
      <div class="picker">
        <div class="wrap">
          <div class="wheel-host" aria-label="Color wheel"></div>
          <div class="extras">
            ${this.showWhite?n`
                  <label>
                    W
                    <ha-slider
                      min="0"
                      max="255"
                      step="1"
                      .value=${this.white}
                      @change=${this._onWhite}
                    ></ha-slider>
                  </label>
                `:null}
            <label>
              Auto-calculate W
              <select @change=${this._onAwm} aria-label="Auto-calculate W channel from RGB">
                <option value="0" ?selected=${0===this.awm}>Manual</option>
                <option value="1" ?selected=${1===this.awm}>Brighter</option>
                <option value="2" ?selected=${2===this.awm}>Accurate</option>
                <option value="3" ?selected=${3===this.awm}>Dual</option>
                <option value="4" ?selected=${4===this.awm}>Max</option>
              </select>
            </label>
            <p class="w-hint">
              Auto-calculate W is saved in WLED LED settings (device-wide). The W slider sets
              manual white in the segment color — full control in Manual; in Accurate, WLED still
              derives white from RGB and the slider can add extra W.
            </p>
          </div>
        </div>
        ${this.controllerId?n`
              <wled-color-swatch-bar
                .controllerId=${this.controllerId}
                .rgb=${this.rgb}
                .white=${this.white}
                @swatch-select=${this._onSwatchSelect}
              ></wled-color-swatch-bar>
            `:null}
      </div>
    `}static{this.styles=[...d,e`
      :host {
        display: block;
        width: 100%;
      }
      .picker {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
      }
      .wheel-host {
        width: 100%;
        max-width: 280px;
        min-width: 180px;
        aspect-ratio: 1;
        flex-shrink: 0;
        position: relative;
      }
      .wheel-host .IroColorPicker {
        display: block;
      }
      .wrap {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        flex-wrap: wrap;
      }
      .extras {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 120px;
        flex: 1;
      }
      label {
        font-size: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      select {
        border-radius: var(--wled-radius-sm);
        padding: 4px 8px;
        background: var(--wled-surface);
        color: var(--wled-text);
        border: 1px solid var(--wled-border);
      }
      .w-hint {
        margin: 0;
        font-size: 0.7rem;
        opacity: 0.72;
        line-height: 1.35;
        max-width: 18rem;
      }
    `]}};i([s({type:Array,hasChanged:(e,t)=>!e||!t||!function(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]}(e,t)})],Dt.prototype,"rgb",void 0),i([s({type:Number})],Dt.prototype,"white",void 0),i([s({type:Number})],Dt.prototype,"awm",void 0),i([s({type:Boolean})],Dt.prototype,"showWhite",void 0),i([s()],Dt.prototype,"controllerId",void 0),i([o(".wheel-host")],Dt.prototype,"_host",void 0),Dt=i([p("wled-color-wheel-rgbw")],Dt);function Bt(e,t="strip",i,s=0){let n=String(e);return s&&(n=`${n}_p${s}`),i?.trim()&&(n=`${n}_${function(e){return(e||"").trim().replace(/[^\w.-]+/g,"_")||"unknown"}(i)}`),`${n}_${t}.webp`}function Wt(e,t,i="strip",s,n=0){const r=t instanceof Set?t:new Set(t);if(!r.size)return;const o=[Bt(e,i,s,n),Bt(e,i,s),Bt(e,i,void 0,n),Bt(e,i)];for(const e of o)if(r.has(e))return e;const a=n?`${e}_p${n}_`:`${e}_`,l=`_${i}.webp`;for(const e of r)if(e.startsWith(a)&&e.endsWith(l))return e;return n?Wt(e,r,i,s,0):void 0}function jt(e,t,i="strip",s,n,r,o=0){if(!e||t<0)return;const a=void 0!==r?Wt(t,r,i,s,o):Bt(t,i,s,o);return a?function(e,t){if(!e.startsWith("/"))return e;const i=t?.auth?.data?.access_token;if(!i)return e;const s=e.includes("?")?"&":"?";return`${e}${s}auth=${encodeURIComponent(i)}`}(function(e,t){return`/local/wled_studio/thumbs/${encodeURIComponent(e)}/${encodeURIComponent(t)}`}(e,a),n):void 0}const Ft="wled_studio.recent_effects",Ht="wled_studio.recent_scenes";function Ut(e){try{const t=localStorage.getItem(e);if(!t)return{};const i=JSON.parse(t);return"object"==typeof i&&i?i:{}}catch{return{}}}function qt(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Vt(e){return e?Ut(Ft)[e]??[]:[]}function Yt(e){return e?Ut(Ht)[e]??[]:[]}function Xt(e,t,i){if(!e)return[];const s=Ut(Ht),n=(s[e]??[]).filter(e=>e.id!==t);return n.unshift({id:t,name:i}),s[e]=n.slice(0,10),qt(Ht,s),s[e]}function Jt(e,t=72,i=6,s=10){if(e<=0)return 1;const n=t+i;return Math.max(1,Math.min(s,Math.floor((e+i)/n)))}const Gt="wled_studio.pinned_effects";function Kt(e){try{const t=localStorage.getItem(e);if(!t)return{};const i=JSON.parse(t);return"object"==typeof i&&i?i:{}}catch{return{}}}function Qt(e,t,i){if(!e)return[];const s=Kt(Gt),n=s[e]??[],r=n.findIndex(e=>e.id===t);return r>=0?n.splice(r,1):n.unshift({id:t,name:i}),s[e]=n,function(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}(Gt,s),s[e]}let Zt=class extends u{constructor(){super(...arguments),this.fxId=0,this.thumbUrl="",this.thumbUrlAnimated="",this.label="",this.listboxOption=!1,this.selected=!1,this._hover=!1}render(){const e=this.thumbUrlAnimated||(this.thumbUrl.endsWith(".webp")?this.thumbUrl:""),t=this.thumbUrl||e,i=this._hover&&e?e:t,s=this.label||`Effect ${this.fxId}`;return n`
      <button
        class="tile"
        type="button"
        aria-label=${s}
        role=${this.listboxOption?"option":void 0}
        aria-selected=${this.listboxOption?this.selected?"true":"false":void 0}
        @mouseenter=${()=>{this._hover=!0}}
        @mouseleave=${()=>{this._hover=!1}}
        @focus=${()=>{this._hover=!0}}
        @blur=${()=>{this._hover=!1}}
      >
        ${i?n`<img
              class="thumb"
              src=${i}
              alt=""
              loading="lazy"
              decoding="async"
              @error=${e=>{e.target.style.display="none"}}
            />`:n`<span class="placeholder" aria-hidden="true"></span>`}
        <span class="label">${this.label}</span>
      </button>
    `}static{this.styles=[...d,e`
      .tile {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 4px;
        padding: 4px;
        border: 1px solid var(--wled-border);
        border-radius: var(--wled-radius-sm);
        background: transparent;
        color: inherit;
        cursor: pointer;
        min-width: 72px;
        max-width: 96px;
        transition:
          border-color var(--wled-transition-fast),
          transform var(--wled-transition-fast);
      }
      .thumb,
      .placeholder {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: 4px;
        background: var(--wled-surface-elevated);
      }
      .placeholder {
        display: block;
      }
      .label {
        font-size: 0.7rem;
        line-height: 1.2;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `]}};i([s({type:Number})],Zt.prototype,"fxId",void 0),i([s()],Zt.prototype,"thumbUrl",void 0),i([s()],Zt.prototype,"thumbUrlAnimated",void 0),i([s()],Zt.prototype,"label",void 0),i([s({type:Boolean,attribute:"listbox-option"})],Zt.prototype,"listboxOption",void 0),i([s({type:Boolean})],Zt.prototype,"selected",void 0),i([r()],Zt.prototype,"_hover",void 0),Zt=i([p("wled-effect-tile")],Zt);let ei=class extends u{constructor(){super(...arguments),this.effectsByName={},this.soundFlags=[],this.selectedFx=0,this.filter="",this.controllerId="",this.fwVer="",this.thumbBasenames=[],this.toggleOff=!0,this.showRecents=!0,this.tileGrid=!1,this.scrollPane=!1,this.selectedPalette=0,this.paletteAware=!1,this._category="all",this._recentEntries=[],this._pinnedEntries=[],this._recentVisible=6}onPoweredConnect(){this._loadRecents(),this._ro=new ResizeObserver(()=>this._measureRecents()),this.addUnsub(()=>this._ro?.disconnect())}updated(e){e.has("controllerId")&&this._loadRecents();const t=this.renderRoot.querySelector(".recent-row");t&&t!==this._recentRowEl&&(this._recentRowEl=t,this._ro?.observe(t),this._measureRecents())}_loadRecents(){var e;this._recentEntries=Vt(this.controllerId),this._pinnedEntries=(e=this.controllerId)?Kt(Gt)[e]??[]:[],this.soundFlags.length&&!this.soundFlags.some(e=>"v"===e||"f"===e)&&console.debug(`[wled-studio] sound_flags for ${this.controllerId} contain no v/f entries — Music filter will rely on name heuristics`)}_togglePin(e,t){t.stopPropagation(),this.controllerId&&(this._pinnedEntries=Qt(this.controllerId,e,this._effectName(e)))}_measureRecents(){const e=this._recentRowEl;if(!e)return;const t=Jt(e.clientWidth,76,6,10);t!==this._recentVisible&&(this._recentVisible=t)}_effectName(e){return Object.entries(this.effectsByName).find(([,t])=>t===e)?.[0]??`Effect ${e}`}render(){const e=this.filter.trim().toLowerCase(),t=Object.keys(this.effectsByName).sort((e,t)=>e.localeCompare(t)),i=ee(this.effectsByName),s=t.filter(t=>!!ie(t,this.effectsByName[t],this._category,this.soundFlags,this.effectsByName)&&!(e&&!t.toLowerCase().includes(e))),r=this.showRecents&&!e&&this._recentEntries.length>0,o=this._recentEntries.slice(0,this._recentVisible),a=!e&&this._pinnedEntries.length>0;return n`
      <div
        class="wrap ${this.tileGrid?"tile-grid":""} ${this.scrollPane?"scroll-pane":""}"
      >
        ${a?n`
              <div class="recent-block">
                <span class="recent-label">Library</span>
                <div class="recent-row" role="group" aria-label="Pinned effects">
                  ${this._pinnedEntries.map(e=>{const t=e.id,s=e.name,r=t===this.selectedFx;return n`
                      <button
                        type="button"
                        class="recent-chip library ${r?"active":""}"
                        aria-label=${`Apply pinned effect ${s}`}
                        aria-pressed=${r?"true":"false"}
                        @click=${()=>this._pick(t,i)}
                      >
                        ${s}
                      </button>
                    `})}
                </div>
              </div>
            `:null}
        ${r?n`
              <div class="recent-block">
                <span class="recent-label">Recent</span>
                <div class="recent-row" role="group" aria-label="Recent effects">
                  ${o.map(e=>{const t=e.id,s=e.name,r=this.soundFlags[t],o=t===this.selectedFx;return n`
                      <button
                        type="button"
                        class="recent-chip ${o?"active":""}"
                        aria-label=${`Apply effect ${s}`}
                        aria-pressed=${o?"true":"false"}
                        @click=${()=>this._pick(t,i)}
                      >
                        ${s}
                        ${"v"===r?n`<span class="badge">♪</span>`:null}
                        ${"f"===r?n`<span class="badge">♫</span>`:null}
                        ${"2"===r?n`<span class="badge dim">2D</span>`:null}
                      </button>
                    `})}
                </div>
              </div>
            `:null}
        <div class="filters" role="tablist" aria-label="Effect categories">
          ${["all","1d","2d","sound","palette","solid"].map(e=>n`
              <button
                type="button"
                class="cat ${this._category===e?"active":""}"
                role="tab"
                aria-selected=${this._category===e?"true":"false"}
                @click=${()=>{this._category=e}}
              >
                ${Z[e]}
              </button>
            `)}
        </div>
        <div class="grid" role="listbox" aria-label="Effects">
          ${0===s.length?n`<p class="empty">No effects match this filter.</p>`:s.map(e=>{const t=this.effectsByName[e],s=this.soundFlags[t],r=t===this.selectedFx,o=jt(this.controllerId,t,"strip",this.fwVer,this.hass,this.thumbBasenames,this.paletteAware?this.selectedPalette:0),a=e+("v"===s?" ♪":"")+("f"===s?" ♫":"")+("2"===s?" 2D":"");return o?n`
                    <wled-effect-tile
                      class="chip-tile ${r?"active":""}"
                      listbox-option
                      .selected=${r}
                      .fxId=${t}
                      .thumbUrl=${o}
                      .label=${a}
                      @click=${()=>this._pick(t,i)}
                    ></wled-effect-tile>
                  `:n`
                  <button
                    type="button"
                    class="chip ${r?"active":""}"
                    role="option"
                    aria-selected=${r?"true":"false"}
                    aria-label=${a}
                    @click=${()=>this._pick(t,i)}
                  >
                    ${e}
                    ${"v"===s?n`<span class="badge" title="Volume reactive">♪</span>`:null}
                    ${"f"===s?n`<span class="badge" title="Frequency reactive">♫</span>`:null}
                    ${"2"===s?n`<span class="badge dim" title="2D matrix">2D</span>`:null}
                  </button>
                `})}
        </div>
        <div class="footer-row">
          <p class="count">${s.length} effects</p>
          ${this.controllerId&&this.selectedFx>=0?n`
                <button
                  type="button"
                  class="pin-btn"
                  title="Pin to library"
                  aria-label="Pin current effect to library"
                  @click=${e=>this._togglePin(this.selectedFx,e)}
                >
                  <ha-icon
                    .icon=${this._pinnedEntries.some(e=>e.id===this.selectedFx)?"mdi:star":"mdi:star-outline"}
                  ></ha-icon>
                </button>
              `:null}
        </div>
      </div>
    `}_pick(e,t){this.toggleOff&&e===this.selectedFx?this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:t,toggledOff:!0},bubbles:!0,composed:!0})):(this.showRecents&&this.controllerId&&(this._recentEntries=function(e,t,i,s){if(!e)return[];if(t===(s.solidId??0))return Vt(e);const n=Ut(Ft),r=(n[e]??[]).filter(e=>e.id!==t);return r.unshift({id:t,name:i}),n[e]=r.slice(0,10),qt(Ft,n),n[e]}(this.controllerId,e,this._effectName(e),{solidId:t})),this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:e,toggledOff:!1},bubbles:!0,composed:!0})))}static{this.styles=[...d,e`
      .wrap {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .recent-block {
        margin-bottom: 2px;
      }
      .recent-label {
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
        gap: 6px;
        overflow: hidden;
      }
      .recent-chip {
        flex: 1 1 0;
        min-width: 0;
        border: 1px solid var(--divider-color, #555);
        border-radius: 999px;
        padding: 6px 10px;
        background: var(--secondary-background-color, transparent);
        color: inherit;
        cursor: pointer;
        font-size: 0.78rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .recent-chip.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: transparent;
      }
      .recent-chip.library {
        border-color: color-mix(in srgb, var(--primary-color) 40%, var(--divider-color));
      }
      .footer-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .pin-btn {
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 4px 8px;
        line-height: 0;
      }
      .filters {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .cat {
        border: 1px solid var(--divider-color, #555);
        border-radius: 999px;
        padding: 4px 10px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.75rem;
      }
      .cat.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: transparent;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(108px, 1fr));
        gap: 8px;
        max-height: min(280px, 42vh);
        min-height: 132px;
        overflow-y: auto;
        padding: 4px 2px;
        scrollbar-width: thin;
        align-content: start;
      }
      .tile-grid .grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        max-height: none;
        min-height: 0;
      }
      .scroll-pane {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .scroll-pane .grid {
        flex: 1 1 auto;
        min-height: 100px;
        max-height: min(240px, 36vh);
        overflow-y: auto;
      }
      .tile-grid.scroll-pane .grid {
        flex: 1 1 auto;
        min-height: 80px;
        max-height: none;
        overflow-y: auto;
      }
      .tile-grid .chip-tile {
        min-height: 0;
        max-width: none;
      }
      .tile-grid .chip-tile .tile {
        max-width: none;
        min-width: 0;
      }
      .tile-grid .chip-tile.active .tile {
        outline: 2px solid var(--wled-accent);
        outline-offset: 2px;
      }
      .chip {
        border: 1px solid var(--divider-color, #555);
        border-radius: 10px;
        padding: 8px 10px;
        background: var(--card-background-color, transparent);
        color: inherit;
        cursor: pointer;
        font-size: 0.78rem;
        text-align: left;
        min-height: 2.5rem;
      }
      .chip.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: transparent;
      }
      .badge {
        margin-left: 4px;
        font-size: 0.7rem;
      }
      .badge.dim {
        opacity: 0.7;
      }
      .chip-tile {
        min-height: 2.5rem;
      }
      .chip-tile.active .tile {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
      .empty {
        grid-column: 1 / -1;
        margin: 0;
        color: var(--wled-text-muted);
        font-size: 0.85rem;
      }
      .count {
        margin: 0;
        font-size: 0.72rem;
        color: var(--wled-text-muted);
      }
    `]}};i([s({type:Object})],ei.prototype,"effectsByName",void 0),i([s({type:Array})],ei.prototype,"soundFlags",void 0),i([s({type:Number})],ei.prototype,"selectedFx",void 0),i([s({type:String})],ei.prototype,"filter",void 0),i([s()],ei.prototype,"controllerId",void 0),i([s()],ei.prototype,"fwVer",void 0),i([s({type:Array})],ei.prototype,"thumbBasenames",void 0),i([s({type:Boolean})],ei.prototype,"toggleOff",void 0),i([s({type:Boolean})],ei.prototype,"showRecents",void 0),i([s({type:Boolean,attribute:"tile-grid"})],ei.prototype,"tileGrid",void 0),i([s({type:Boolean,attribute:"scroll-pane"})],ei.prototype,"scrollPane",void 0),i([s({type:Number})],ei.prototype,"selectedPalette",void 0),i([s({type:Boolean,attribute:"palette-aware"})],ei.prototype,"paletteAware",void 0),i([r()],ei.prototype,"_category",void 0),i([r()],ei.prototype,"_recentEntries",void 0),i([r()],ei.prototype,"_pinnedEntries",void 0),i([r()],ei.prototype,"_recentVisible",void 0),ei=i([p("wled-effect-chips")],ei);const ti=.55,ii=1,si=1,ni=0,ri=0,oi=0,ai=1,li=0,ci=0,hi=1,di=1;function ui(e,t){return e?{url:e,opacity:t?.opacity??ti,brightness:t?.brightness??ii,saturation:t?.saturation??si,rotation:t?.rotation??ni,offsetX:t?.offsetX??ri,offsetY:t?.offsetY??oi,scale:t?.scale??ai,cropX:t?.cropX??li,cropY:t?.cropY??ci,cropW:t?.cropW??hi,cropH:t?.cropH??di}:null}function pi(e){return ui(e.background?.url??e.background_url,e.background??null)}function fi(e,t,i,s,n){const r=n.opacity??ti,o=n.brightness??1,a=n.saturation??1,l=(n.rotation??0)*Math.PI/180,c=(n.offsetX??0)*t,h=(n.offsetY??0)*i,d=n.scale??1,u=n.cropX??0,p=n.cropY??0,f=n.cropW??1,m=n.cropH??1,g=s.naturalWidth*f,v=s.naturalHeight*m,_=s.naturalWidth*u,y=s.naturalHeight*p,b=Math.max(t/g,i/v)*d,w=g*b,x=v*b;e.save(),e.globalAlpha=r,e.filter=`brightness(${o}) saturate(${a})`,e.translate(t/2+c,i/2+h),e.rotate(l),e.drawImage(s,_,y,g,v,-w/2,-x/2,w,x),e.restore()}async function mi(e,t,i=2048){const s=t.cropX??0,n=t.cropY??0,r=t.cropW??1,o=t.cropH??1,a=Math.max(1,Math.floor(e.naturalWidth*r)),l=Math.max(1,Math.floor(e.naturalHeight*o)),c=Math.floor(e.naturalWidth*s),h=Math.floor(e.naturalHeight*n),d=Math.min(1,i/Math.max(a,l)),u=Math.max(1,Math.floor(a*d)),p=Math.max(1,Math.floor(l*d)),f=document.createElement("canvas");f.width=u,f.height=p;const m=f.getContext("2d");if(!m)throw new Error("Canvas unavailable");const g=t.brightness??1,v=t.saturation??1,_=(t.rotation??0)*Math.PI/180;return m.filter=`brightness(${g}) saturate(${v})`,m.translate(u/2,p/2),m.rotate(_),m.drawImage(e,c,h,a,l,-u/2,-p/2,u,p),new Promise((e,t)=>{f.toBlob(i=>i?e(i):t(new Error("Encode failed")),"image/jpeg",.9)})}function gi(e,t=!1){return new Promise((i,s)=>{const n=new Image;n.onload=()=>i(n),n.onerror=()=>s(new Error(`Could not load image (${e})`)),function(e,t,i=!1){let s=t;if(i&&!s.includes("?")&&(s=`${s}?v=${Date.now()}`),e.removeAttribute("crossorigin"),s.startsWith("http://")||s.startsWith("https://"))try{new URL(s,window.location.href).origin!==window.location.origin&&(e.crossOrigin="anonymous")}catch{e.crossOrigin="anonymous"}e.src=s}(n,e,t)})}let vi=class extends u{constructor(){super(...arguments),this.controllerId="",this.layoutId="",this.fixtureId="",this.pixelCount=210,this.dotRadius=4,this.compact=!1,this.heightPx=200,this.externalLive=!1,this.paintMode=!1,this.paintLivePreview=!1,this.paintBrushSize=6,this.segments=[],this.selectedSegId=-1,this.highlightSegIds=[],this._positions=[],this._status="waiting",this._showDots=!1,this._closed=!1,this._bgLayer=null,this._bgImage=null,this._raf=0,this._hoverLed=-1,this._painting=!1,this._lastLivePaintMs=0,this._onCanvasClick=e=>{if(this.paintMode)return;const t=this._ledAtEvent(e);if(t<0)return;const i=this._segmentForLed(t);i<0||this.dispatchEvent(new CustomEvent("segment-select",{detail:{segmentId:i,ledIndex:t},bubbles:!0,composed:!0}))},this._onPaintPointerDown=e=>{if(!this.paintMode)return;this._painting=!0,e.target.setPointerCapture(e.pointerId);const t=this._ledAtEvent(e);this._emitPaintStroke(t)},this._onPaintPointerMove=e=>{if(!this.paintMode||!this._painting)return;const t=this._ledAtEvent(e);this._emitPaintStroke(t)},this._onPaintPointerUp=e=>{if(this.paintMode){this._painting=!1;try{e.target.releasePointerCapture(e.pointerId)}catch{}}},this._onPaintPointerLeave=()=>{this._painting=!1},this._onCanvasMove=e=>{const t=this._ledAtEvent(e);t!==this._hoverLed&&(this._hoverLed=t,this._schedPaint())},this._onCanvasLeave=()=>{this._hoverLed>=0&&(this._hoverLed=-1,this._schedPaint())}}setFrame(e){if(e&&(!this.paintMode||this.paintLivePreview)){if(this.paintMode&&this.paintLivePreview){const e=performance.now();if(e-this._lastLivePaintMs<50)return;this._lastLivePaintMs=e}if(!0===e.stale||"stale"===e.status)return this._status="stale",void this.requestUpdate();this._pixels=_(e,this.pixelCount),this._status="drop"===e.status||(e.dropped??0)>0?"throttled":"live",this._schedPaint()}}setPaintPixels(e){this._paintPixels=e??void 0,this.paintMode&&(this._status=e?"paint":"ready"),this._schedPaint()}setStatus(e){this._status=e,this.requestUpdate()}async refresh(){await this._resolvePositions()}onPoweredConnect(){this._resolvePositions(),this._syncLiveSubscription()}onPoweredDisconnect(){this._raf&&cancelAnimationFrame(this._raf),this._raf=0,this._resizeObs?.disconnect(),this._unsubLive?.(),this._unsubLive=void 0}_wantsLiveStream(){return!this.externalLive||this.paintMode&&this.paintLivePreview}_syncLiveSubscription(){this._wantsLiveStream()?this._unsubLive||this._attachLiveStream():(this._unsubLive?.(),this._unsubLive=void 0)}updated(e){super.updated(e),(e.has("connection")||e.has("controllerId")||e.has("layoutId")||e.has("fixtureId"))&&(this._resolvePositions(),this._syncLiveSubscription()),(e.has("externalLive")||e.has("paintLivePreview")||e.has("paintMode"))&&this._syncLiveSubscription(),(e.has("selectedSegId")||e.has("highlightSegIds")||e.has("segments")||e.has("paintMode"))&&(this._schedPaint(),e.has("paintMode")&&this._canvas&&(this._canvas.style.cursor=this.paintMode?"crosshair":"pointer",this.paintMode&&queueMicrotask(()=>this._onResize())))}firstUpdated(){if(this._canvas=this.renderRoot.querySelector("canvas")??void 0,this._canvas){this._ctx=this._canvas.getContext("2d",{alpha:!0})??void 0,this._resizeObs=new ResizeObserver(()=>this._onResize()),this._resizeObs.observe(this._canvas);const e=this._canvas;e.style.touchAction="none",e.addEventListener("pointerdown",this._onPaintPointerDown),e.addEventListener("pointermove",this._onPaintPointerMove),e.addEventListener("pointerup",this._onPaintPointerUp),e.addEventListener("pointerleave",this._onPaintPointerLeave),e.addEventListener("click",this._onCanvasClick),e.addEventListener("mousemove",this._onCanvasMove),e.addEventListener("mouseleave",this._onCanvasLeave),this.addUnsub(()=>{e.removeEventListener("pointerdown",this._onPaintPointerDown),e.removeEventListener("pointermove",this._onPaintPointerMove),e.removeEventListener("pointerup",this._onPaintPointerUp),e.removeEventListener("pointerleave",this._onPaintPointerLeave),e.removeEventListener("click",this._onCanvasClick),e.removeEventListener("mousemove",this._onCanvasMove),e.removeEventListener("mouseleave",this._onCanvasLeave)})}this._onResize()}_emitPaintStroke(e){if(e<0)return;const t=Math.max(1,Math.floor(this.paintBrushSize/2)),i=[];for(let s=-t;s<=t;s++){const t=e+s;t>=0&&t<this.pixelCount&&i.push(t)}i.length&&this.dispatchEvent(new CustomEvent("paint-stroke",{detail:{led:e,leds:i},bubbles:!0,composed:!0}))}_segmentForLed(e){for(const t of this.segments){const i=t.start??0,s=t.stop??t.len??this.pixelCount;if(e>=i&&e<s)return t.id}return 1===this.segments.length?this.segments[0].id:-1}_ledInSegment(e,t){if(t<0)return!1;const i=this.segments.find(e=>e.id===t);if(!i)return!1;const s=i.start??0,n=i.stop??i.len??this.pixelCount;return e>=s&&e<n}_ledAtEvent(e){const t=this._hitTest(e.clientX,e.clientY);return t?.led??-1}_logicalCanvasSize(){const e=this._canvas;if(!e)return{w:0,h:0};const t=Math.min(2,window.devicePixelRatio||1);return{w:e.width/t,h:e.height/t}}_pointerToLogical(e,t){const i=this._canvas;if(!i)return null;const s=i.getBoundingClientRect();if(s.width<1||s.height<1)return null;const{w:n,h:r}=this._logicalCanvasSize();return[(e-s.left)/s.width*n,(t-s.top)/s.height*r]}_hitTest(e,t){if(!this._canvas||0===this._positions.length)return null;const i=this._pointerToLogical(e,t);if(!i)return null;const[s,n]=i,{w:r,h:o}=this._logicalCanvasSize(),a=this._layoutMap(r,o);if(!a)return null;const{toCanvas:l,hitR:c}=a;let h=null,d=c*c;for(const e of this._positions){const[t,i]=l(e.x,e.y),r=t-s,o=i-n,a=r*r+o*o;a<d&&(d=a,h=e)}return h}_positionExtents(){if(0===this._positions.length)return null;let e=1/0,t=-1/0,i=1/0,s=-1/0;for(const n of this._positions)n.x<e&&(e=n.x),n.x>t&&(t=n.x),n.y<i&&(i=n.y),n.y>s&&(s=n.y);return{minX:e,maxX:t,minY:i,maxY:s,rangeX:t-e||1,rangeY:s-i||1}}_applyLayoutAspectCss(){if(!this.paintMode)return void this.style.removeProperty("--wled-layout-aspect");const e=this._positionExtents();if(!e)return void this.style.removeProperty("--wled-layout-aspect");const t=Math.max(.35,Math.min(3.5,e.rangeX/e.rangeY));this.style.setProperty("--wled-layout-aspect",String(t)),queueMicrotask(()=>this._onResize())}_layoutMap(e,t){const i=this._positionExtents();if(!i)return null;const{minX:s,minY:n,rangeX:r,rangeY:o}=i,a=this.dotRadius,l=this.paintMode?2*a:3*a,c=(e-2*l)/r,h=(t-2*l)/o,d=Math.min(c,h),u=this.compact?Math.max(8,3*a):Math.max(3.5,1.75*a);return{toCanvas:(e,t)=>[l+(e-s)*d,l+(t-n)*d],hitR:Math.max(10,2.5*u),lineW:u}}_accentStroke(){return getComputedStyle(this).getPropertyValue("--wled-accent").trim()||"#03a9f4"}_surfaceFill(){return getComputedStyle(this).getPropertyValue("--wled-surface").trim()||"#1e1e1e"}_onResize(){const e=this._canvas;if(!e)return;const t=e.getBoundingClientRect();if(t.width<2||t.height<2)return;const i=Math.min(1200,Math.max(1,Math.floor(t.width))),s=Math.min(600,Math.max(1,Math.floor(t.height))),n=Math.min(2,window.devicePixelRatio||1),r=Math.floor(i*n),o=Math.floor(s*n);if(e.width!==r||e.height!==o){e.width=r,e.height=o;const t=this._ctx;t&&t.setTransform(n,0,0,n,0,0),this._schedPaint()}}async _resolvePositions(){if(this.connection&&this.controllerId&&this.fixtureId)try{if(this.layoutId){const e=await D(this.connection,this.controllerId,this.layoutId);if(e){this._bgLayer=pi(e),this._loadBackgroundImage();const t=e.fixtures??[],i=this.fixtureId?t.find(e=>String(e.id??"")===this.fixtureId):t[0];this._closed=Boolean(i?.closed??!1)}}this._positions=await W(this.connection,this.controllerId,this.fixtureId,this.layoutId||void 0),this._applyLayoutAspectCss(),queueMicrotask(()=>this._onResize()),this._schedPaint()}catch{this._positions=[],this._applyLayoutAspectCss()}}_loadBackgroundImage(){const e=this._bgLayer?.url;e?gi(e).then(e=>{this._bgImage=e,this._schedPaint()},()=>{this._bgImage=null}):this._bgImage=null}_attachLiveStream(){this.connection&&this.controllerId&&!this._unsubLive&&(this._unsubLive=y(this.connection,this.controllerId,e=>{this.setFrame(e)}),this.addUnsub(()=>{this._unsubLive?.(),this._unsubLive=void 0}))}_schedPaint(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this._paint()}))}_rgbForLed(e,t){if(!e)return[80,80,80];const i=4*t;return[e[i],e[i+1],e[i+2]]}_paint(){const e=this._ctx,t=this._canvas;if(!e||!t)return;const{w:i,h:s}=this._logicalCanvasSize();if(i<1||s<1)return;e.clearRect(0,0,i,s),e.fillStyle=this._surfaceFill(),e.fillRect(0,0,i,s),this._bgImage?.complete&&this._bgLayer&&fi(e,i,s,this._bgImage,this._bgLayer);const n=this.paintMode&&this._paintPixels&&!this.paintLivePreview?this._paintPixels:this._pixels,r=[...this._positions].sort((e,t)=>e.led-t.led),o=this.dotRadius,a=this._layoutMap(i,s);if(r.length>0&&a){const{toCanvas:t,lineW:i}=a,s=this.remote.state.disableBloom;if(!this._showDots){e.lineCap="round",e.lineJoin="round",e.lineWidth=i;const o=(r,o)=>{const[a,l]=t(r.x,r.y),[c,h]=t(o.x,o.y),[d,u,p]=this._rgbForLed(n,r.led);!s&&(d>10||u>10||p>10)?(e.shadowColor=`rgba(${d},${u},${p},0.55)`,e.shadowBlur=i*(this.compact?2:1.5)):e.shadowBlur=0,e.strokeStyle=`rgb(${d},${u},${p})`,e.beginPath(),e.moveTo(a,l),e.lineTo(c,h),e.stroke()};for(let e=0;e<r.length-1;e++)o(r[e],r[e+1]);this._closed&&r.length>=2&&o(r[r.length-1],r[0]),e.shadowBlur=0}if(this._showDots){for(const{x:i,y:a,led:l}of r){const[r,c]=t(i,a),[h,d,u]=this._rgbForLed(n,l);!s&&(h>10||d>10||u>10)?(e.shadowColor=`rgba(${h},${d},${u},0.7)`,e.shadowBlur=2.5*o):e.shadowBlur=0,e.beginPath(),e.arc(r,c,o,0,2*Math.PI),e.fillStyle=`rgb(${h},${d},${u})`,e.fill()}e.shadowBlur=0}this.paintMode?this._hoverLed>=0&&this._paintBrushHover(e,r,t):this._paintSegmentSelection(e,r,t,i)}else{const t=this.pixelCount,r=(i-8)/t,a=s/2;for(let i=0;i<t;i++){let t=80,s=80,l=80;if(n){const e=4*i;t=n[e],s=n[e+1],l=n[e+2]}e.beginPath(),e.arc(4+i*r+r/2,a,o,0,2*Math.PI),e.fillStyle=`rgb(${t},${s},${l})`,e.fill()}}}_paintBrushHover(e,t,i){const s=t.find(e=>e.led===this._hoverLed);if(!s)return;const[n,r]=i(s.x,s.y),o=Math.max(8,2.5*this.dotRadius);e.save(),e.strokeStyle="rgba(255, 255, 255, 0.9)",e.lineWidth=2,e.beginPath(),e.arc(n,r,o,0,2*Math.PI),e.stroke(),e.strokeStyle=this._accentStroke(),e.lineWidth=1.5,e.beginPath(),e.moveTo(n-o-4,r),e.lineTo(n+o+4,r),e.moveTo(n,r-o-4),e.lineTo(n,r+o+4),e.stroke(),e.restore()}_highlightIds(){if(this.highlightSegIds.length)return[...new Set(this.highlightSegIds)];if(this.selectedSegId>=0)return[this.selectedSegId];if(this._hoverLed>=0){const e=this._segmentForLed(this._hoverLed);return e>=0?[e]:[]}return[]}_paintSegmentSelection(e,t,i,s){const n=this._highlightIds();if(!n.length||0===this.segments.length)return;const r=this._accentStroke(),o=Math.max(1.25,Math.min(2.5,.45*s));e.save(),e.lineCap="round",e.lineJoin="round",e.shadowBlur=0;for(const s of n){const n=t.filter(e=>this._ledInSegment(e.led,s)).sort((e,t)=>e.led-t.led);if(n.length<2)continue;const[a,l]=i(n[0].x,n[0].y);e.beginPath(),e.moveTo(a,l);for(let t=1;t<n.length;t++){const[s,r]=i(n[t].x,n[t].y);e.lineTo(s,r)}e.strokeStyle="rgba(0, 0, 0, 0.55)",e.lineWidth=o+1.5,e.stroke(),e.strokeStyle=r,e.lineWidth=o,e.stroke()}e.restore()}render(){const e=this.paintMode?"Paint on layout — drag along the fixture path":this.compact?"Live layout preview — tap the strip to select a segment":"LED geometry preview — positions mapped from fixture layout",t=!this.paintMode&&"live"!==this._status&&"throttled"!==this._status&&"paint"!==this._status;return n`
      <div class="preview-shell ${this.compact?"compact":""} ${this.paintMode?"paint":""}">
        ${this.compact||this.paintMode?null:n`
              <label class="mode-toggle">
                <input
                  type="checkbox"
                  .checked=${this._showDots}
                  @change=${e=>{this._showDots=e.target.checked,this._schedPaint()}}
                />
                LED dots
              </label>
            `}
        <div class="wrap" role="img" aria-label=${e}>
          <canvas></canvas>
          ${t?n`<span class="overlay">${this._status}</span>`:null}
          ${this.paintMode&&0===this._positions.length?n`<span class="overlay">No layout — create one in Layout view</span>`:null}
        </div>
      </div>
    `}static{this.styles=[...d,e`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        max-height: 100%;
        overflow: hidden;
      }
      :host([paintmode]) {
        display: block;
        flex: none;
        max-height: none;
        overflow: visible;
      }
      :host([compact]) {
        display: block;
        flex: none;
        max-height: none;
        overflow: visible;
      }
      .preview-shell {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
        height: 100%;
        min-height: 0;
        max-height: 100%;
        overflow: hidden;
      }
      .mode-toggle {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.75rem;
        opacity: 0.85;
        cursor: pointer;
        user-select: none;
        flex-shrink: 0;
      }
      .mode-toggle input {
        margin: 0;
      }
      .preview-shell.compact .wrap {
        min-height: var(--wled-preview-height, 200px);
        aspect-ratio: 16 / 9;
        max-height: none;
        flex: none;
      }
      .preview-shell.paint .wrap {
        width: 100%;
        max-width: 100%;
        max-height: min(70vh, 480px);
        aspect-ratio: var(--wled-layout-aspect, 1);
        min-height: 120px;
        flex: none;
        height: auto;
      }
      .wrap {
        position: relative;
        border-radius: var(--wled-radius-sm);
        overflow: hidden;
        background: var(--wled-surface);
        width: 100%;
        flex: 1;
        min-height: 160px;
        max-height: 100%;
      }
      .preview-shell.paint {
        height: auto;
        max-height: none;
      }
      canvas {
        display: block;
        width: 100%;
        height: 100%;
        max-height: 100%;
      }
      .overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        color: var(--wled-text-muted);
        background: rgba(0, 0, 0, 0.45);
        pointer-events: none;
      }
    `]}};i([s({attribute:!1})],vi.prototype,"connection",void 0),i([s()],vi.prototype,"controllerId",void 0),i([s()],vi.prototype,"layoutId",void 0),i([s()],vi.prototype,"fixtureId",void 0),i([s({type:Number})],vi.prototype,"pixelCount",void 0),i([s({type:Number})],vi.prototype,"dotRadius",void 0),i([s({type:Boolean,reflect:!0})],vi.prototype,"compact",void 0),i([s({type:Number})],vi.prototype,"heightPx",void 0),i([s({type:Boolean})],vi.prototype,"externalLive",void 0),i([s({type:Boolean,reflect:!0})],vi.prototype,"paintMode",void 0),i([s({type:Boolean})],vi.prototype,"paintLivePreview",void 0),i([s({type:Number})],vi.prototype,"paintBrushSize",void 0),i([s({type:Array})],vi.prototype,"segments",void 0),i([s({type:Number})],vi.prototype,"selectedSegId",void 0),i([s({type:Array})],vi.prototype,"highlightSegIds",void 0),i([r()],vi.prototype,"_positions",void 0),i([r()],vi.prototype,"_status",void 0),i([r()],vi.prototype,"_showDots",void 0),i([r()],vi.prototype,"_closed",void 0),vi=i([p("wled-geometry-preview")],vi);export{J as A,u as B,gi as C,Jt as D,ui as E,L as F,m as G,E as H,Xt as I,mi as J,p as K,X as L,d as M,K as N,ee as O,y as P,b as Q,c as R,g as S,G as a,k as b,I as c,S as d,pi as e,T as f,z as g,U as h,x as i,f as j,fi as k,A as l,_ as m,$ as n,P as o,M as p,C as q,Q as r,Y as s,Yt as t,D as u,O as v,W as w,B as x,j as y,w as z};
//# sourceMappingURL=geometry-preview.js.map

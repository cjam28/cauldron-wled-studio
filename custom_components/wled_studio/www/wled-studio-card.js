function t(t,e,s,i){var n,o=arguments.length,r=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,s,r):n(e,s))||r);return o>3&&r&&Object.defineProperty(e,s,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new o(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:h,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,f=_.trustedTypes,m=f?f.emptyScript:"",g=_.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},$=(t,e)=>!h(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);n?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),n=e.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:y).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=i;const o=n.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(void 0!==t){const o=this.constructor;if(!1===i&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??$)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,g?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,E=t=>t,S=A.trustedTypes,C=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,R="?"+P,U=`<${R}>`,L=document,O=()=>L.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,N="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,I=/>/g,D=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),q=/'/g,j=/"/g,W=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),z=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),F=new WeakMap,G=L.createTreeWalker(L,129);function K(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const J=(t,e)=>{const s=t.length-1,i=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=H;for(let e=0;e<s;e++){const s=t[e];let a,h,c=-1,l=0;for(;l<s.length&&(r.lastIndex=l,h=r.exec(s),null!==h);)l=r.lastIndex,r===H?"!--"===h[1]?r=T:void 0!==h[1]?r=I:void 0!==h[2]?(W.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=D):void 0!==h[3]&&(r=D):r===D?">"===h[0]?(r=n??H,c=-1):void 0===h[1]?c=-2:(c=r.lastIndex-h[2].length,a=h[1],r=void 0===h[3]?D:'"'===h[3]?j:q):r===j||r===q?r=D:r===T||r===I?r=H:(r=D,n=void 0);const d=r===D&&t[e+1].startsWith("/>")?" ":"";o+=r===H?s+U:c>=0?(i.push(a),s.slice(0,c)+x+s.slice(c)+P+d):s+P+(-2===c?e:d)}return[K(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Z{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[h,c]=J(t,e);if(this.el=Z.createElement(h,s),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=G.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(x)){const e=c[o++],s=i.getAttribute(t).split(P),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:s,ctor:"."===r[1]?et:"?"===r[1]?st:"@"===r[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(W.test(i.tagName)){const t=i.textContent.split(P),e=t.length-1;if(e>0){i.textContent=S?S.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],O()),G.nextNode(),a.push({type:2,index:++n});i.append(t[e],O())}}}else if(8===i.nodeType)if(i.data===R)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(P,t+1));)a.push({type:7,index:n}),t+=P.length-1}n++}}static createElement(t,e){const s=L.createElement("template");return s.innerHTML=t,s}}function Q(t,e,s=t,i){if(e===z)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const o=k(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=Q(t,n._$AS(t,e.values),n,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??L).importNode(e,!0);G.currentNode=i;let n=G.nextNode(),o=0,r=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Y(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=s[++r]}o!==a?.index&&(n=G.nextNode(),o++)}return G.currentNode=L,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),k(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&k(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new Z(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new Y(this.O(O()),this.O(O()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(void 0===n)t=Q(this,t,e,0),o=!k(t)||t!==this._$AH&&t!==z,o&&(this._$AH=t);else{const i=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=Q(this,i[s+r],e,r),a===z&&(a=this._$AH[r]),o||=!k(a)||a!==this._$AH[r],a===V?t=V:t!==V&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class it extends tt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??V)===z)return;const s=this._$AH,i=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const ot=A.litHtmlPolyfillSupport;ot?.(Z,Y),(A.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new Y(e.insertBefore(O(),t),t,void 0,s??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ht=rt.litElementPolyfillSupport;ht?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const ct={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:$},lt=(t=ct,e,s)=>{const{kind:i,metadata:n}=s;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const n=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,n,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const n=this[i];e.call(this,s),this.requestUpdate(i,n,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function dt(t){return(e,s)=>"object"==typeof s?lt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function pt(t){return dt({...t,state:!0,attribute:!1})}function ut(t){return(e,s)=>(customElements.get(t)||customElements.define(t,e),e)}const _t=r`
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
`,ft=r`
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
`;class mt{constructor(t,e){this.host=t,this._hass=e,this._isRemote=!1,t.addController(this)}hostConnected(){this._refresh()}setHass(t){this._hass=t,this._refresh(),this.host.requestUpdate()}get state(){return{isRemote:this._isRemote,previewFps:this._isRemote?10:20,useBinaryPack:this._isRemote,disableBloom:this._isRemote}}_refresh(){if("undefined"==typeof location)return void(this._isRemote=!1);const t=location.hostname.endsWith(".ui.nabu.casa"),e=this._hass?.config?.external_url,s=!!e&&e.replace(/\/$/,"")===location.origin;this._isRemote=t||s}}const gt=[_t,ft];class vt extends at{constructor(){super(...arguments),this.abort=new AbortController,this.rafIds=new Set,this.unsubs=new Set,this.remote=new mt(this),this._visible=!0,this._inView=!0}static{this.styles=gt}connectedCallback(){super.connectedCallback(),this._bindVisibility(),this._bindIntersection(),this.remote.setHass(this.hass),this.onPoweredConnect()}disconnectedCallback(){this.onPoweredDisconnect(),this._io?.disconnect(),this._io=void 0,this.abort.abort();for(const t of this.rafIds)cancelAnimationFrame(t);this.rafIds.clear();for(const t of this.unsubs)t();this.unsubs.clear(),super.disconnectedCallback()}updated(t){super.updated(t),t.has("hass")&&this.remote.setHass(this.hass)}get isPowered(){return this._visible&&this._inView}scheduleRaf(t){const e=requestAnimationFrame(s=>{this.rafIds.delete(e),this.isConnected&&!this.abort.signal.aborted&&t(s)});this.rafIds.add(e)}addUnsub(t){this.unsubs.add(t)}onPoweredConnect(){}onPoweredDisconnect(){}_bindVisibility(){document.addEventListener("visibilitychange",()=>{this._visible="visible"===document.visibilityState,this.requestUpdate()},{signal:this.abort.signal}),this._visible="visible"===document.visibilityState}_bindIntersection(){this._io=new IntersectionObserver(t=>{this._inView=t.some(t=>t.isIntersecting),this.requestUpdate()},{threshold:.01}),this._io.observe(this)}}function yt(t,e){const s=()=>e();return t.addEventListener("ready",s),()=>t.removeEventListener("ready",s)}t([dt({attribute:!1})],vt.prototype,"hass",void 0);const $t=/^[0-9a-fA-F]+$/;function bt(t,e,s,i){let n,o=!1;const r=async()=>{n?.(),n=void 0,o||(n=await t.subscribeMessage(t=>{const e=t.event?.data??("wled_studio_live_frame"===t.type?t.data:void 0);if(!e)return;const i=function(t){if(!t||"object"!=typeof t)return null;const e=t;if(Array.isArray(e.leds_hex)&&e.leds_hex.length>0){const t=e.leds_hex.map(t=>String(t).toLowerCase()),s=Number(e.n)>0?Number(e.n):t.length;return{leds_hex:t,n:s,channels:4===e.channels?4:3,scale:s/t.length,count:t.length}}const s=e.leds;if(!Array.isArray(s)||0===s.length)return null;const i=[];let n=3;for(const t of s){if("string"!=typeof t)continue;const e=t.trim().replace(/^#/,"");if(e&&e.length%2==0&&$t.test(e)){if(8===e.length)n=4;else if(6!==e.length)continue;i.push(e.toLowerCase())}}if(0===i.length)return null;let o=i.length;if(void 0!==e.n){const t=Number(e.n);Number.isFinite(t)&&t>0&&(o=t)}return{leds_hex:i,n:o,channels:n,scale:o/i.length,count:i.length}}(e);i&&s({...i,entry_id:e.entry_id,controller_id:e.controller_id,fps:e.fps})},{type:"wled_studio/subscribe_live",schema_version:1,controller_id:e,remote:i?.remote??!1}))};r();const a=yt(t,()=>{r()});return()=>{o=!0,a(),n?.(),n=void 0}}async function wt(t){await async function(t){t.connected||await new Promise((e,s)=>{const i=window.setTimeout(()=>{t.removeEventListener("ready",n),s(new Error("Home Assistant WebSocket not connected"))},15e3),n=()=>{t.connected&&(window.clearTimeout(i),t.removeEventListener("ready",n),e())};t.addEventListener("ready",n)})}(t);try{return(await t.sendMessagePromise({type:"wled_studio/list_controllers",schema_version:1})).controllers??[]}catch(t){const e=t,s=e?.code?`${e.code}: ${e.message??"failed"}`:t instanceof Error?t.message:String(t);throw new Error(`wled_studio/list_controllers — ${s}`)}}let At=class extends vt{constructor(){super(...arguments),this.heightPx=56,this.pixelCount=210,this._status="waiting",this._raf=0}setFrame(t){t&&(this._lastPixels=function(t,e){const s=new Uint8ClampedArray(4*e);for(let i=0;i<e;i++){const e=Math.min(t.count-1,Math.max(0,Math.round(i/t.scale))),n=t.leds_hex[e]??"000000",o=4*i;8===n.length?(s[o]=parseInt(n.slice(0,2),16),s[o+1]=parseInt(n.slice(2,4),16),s[o+2]=parseInt(n.slice(4,6),16),s[o+3]=parseInt(n.slice(6,8),16)):(s[o]=parseInt(n.slice(0,2),16),s[o+1]=parseInt(n.slice(2,4),16),s[o+2]=parseInt(n.slice(4,6),16),s[o+3]=255)}return s}(t,this.pixelCount),this._status="live",this.requestUpdate(),this.isPowered&&this._schedulePaint())}setStatus(t){this._status=t,this.requestUpdate()}onPoweredConnect(){this._lastPixels&&this._schedulePaint()}onPoweredDisconnect(){this._raf&&cancelAnimationFrame(this._raf),this._raf=0}firstUpdated(){this._canvas=this.renderRoot.querySelector("canvas")??void 0,this._canvas&&(this._ctx=this._canvas.getContext("2d",{alpha:!1})??void 0)}_schedulePaint(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this._paint()}))}_paint(){const t=this._ctx,e=this._canvas;if(!t||!e||!this._lastPixels)return;const s=e.width,i=e.height,n=this.pixelCount,o=s/n;t.fillStyle="#111",t.fillRect(0,0,s,i);for(let e=0;e<n;e++){const s=4*e,n=this._lastPixels[s],r=this._lastPixels[s+1],a=this._lastPixels[s+2];t.fillStyle=`rgb(${n},${r},${a})`,t.shadowColor=`rgba(${n},${r},${a},0.85)`,t.shadowBlur=this.remote.state.disableBloom?0:6,t.fillRect(e*o,2,Math.max(1,o-1),i-4)}t.shadowBlur=0}render(){const t=Math.max(320,3*this.pixelCount);return B`
      <div class="wrap" role="img" aria-label="Live LED strip preview">
        <canvas width=${t} height=${this.heightPx}></canvas>
        ${"live"!==this._status?B`<span class="overlay">${this._status}</span>`:null}
      </div>
    `}static{this.styles=[...gt,r`
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
    `]}};var Et;t([dt({type:Number})],At.prototype,"heightPx",void 0),t([dt({type:Number})],At.prototype,"pixelCount",void 0),t([pt()],At.prototype,"_status",void 0),At=t([ut("wled-strip-preview")],At);const St="wled-studio-card";let Ct=class extends vt{constructor(){super(...arguments),this._controllerId="",this._masterEntity="",this._pixelCount=210,this._connected=!1,this._previewStatus="connecting",this._hint="",this._bootstrapGen=0,this._bootstrapControllerKey=""}static{Et=this}setConfig(t){if(!t.type?.startsWith("custom:"))throw new Error("Invalid card type");this.config=t}getCardSize(){return 5}static getConfigElement(){const t=document.createElement("wled-studio-card-editor");return t.setConfig(Et.getStubConfig()),t}static getStubConfig(){return{type:`custom:${St}`,controller:"Cloud",height:56}}updated(t){if(super.updated(t),t.has("config"))return this._bindConnectionReady(),void this._bootstrap(!0);t.has("hass")&&this.hass&&!this._controllerId&&(this._bindConnectionReady(),this._bootstrap())}onPoweredConnect(){this._bindConnectionReady(),this._bootstrap()}onPoweredDisconnect(){this._bootstrapGen+=1,this._offConnReady?.(),this._offConnReady=void 0,this._unsubLive?.(),this._unsubLive=void 0}_bindConnectionReady(){this.hass?.connection&&!this._offConnReady&&(this._offConnReady=yt(this.hass.connection,()=>{this._bootstrap()}),this.addUnsub(()=>this._offConnReady?.()))}_pickController(t){const e=(this.config?.controller??"").trim();if(!e)return t[0];const s=e.toLowerCase();return t.find(t=>{const i=String(t.title??"");return String(t.entry_id??"")===e||i===e||i.toLowerCase().includes(s)||i.toLowerCase().endsWith(`— ${s}`)||i.toLowerCase().endsWith(`- ${s}`)})??t[0]}async _bootstrap(t=!1){if(!this.hass?.connection)return;const e=(this.config?.controller??"").trim();if(!t&&this._controllerId&&this._unsubLive&&this._bootstrapControllerKey===e)return;const s=++this._bootstrapGen;this._controllerId||(this._hint="Connecting to WLED Studio…",this._connected=!1,this.requestUpdate());const i=[0,400,1200,2500];for(const t of i){if(s!==this._bootstrapGen||!this.isConnected)return;t>0&&await new Promise(e=>setTimeout(e,t));try{const t=await wt(this.hass.connection),i=this._pickController(t);if(!i?.entry_id){s===this._bootstrapGen&&(this._hint=0===t.length?"No WLED Studio controllers found. Add the integration under Settings → Devices & services.":"Controller not found in list.",this.requestUpdate());continue}if(s!==this._bootstrapGen)return;return this._controllerId=String(i.entry_id),this._masterEntity=String(i.master_entity_id??""),this._pixelCount=Number(i.pixel_count)||210,this._bootstrapControllerKey=e,this._connected=!0,this._hint="",this._startLive(),void this.requestUpdate()}catch(t){const e=t instanceof Error?t.message:String(t??"unknown");s===this._bootstrapGen&&(this._hint=`Connecting… (${e})`,this.requestUpdate())}}s===this._bootstrapGen&&(this._connected=!1,this._previewStatus="offline",this._preview?.setStatus(this._previewStatus),this._hint="WLED Studio is not responding. In Settings → Devices & services, open WLED Studio — Cloud → Reload, then hard-refresh this page (Ctrl+Shift+R).",this.requestUpdate())}_startLive(){if(!this.hass?.connection||!this._controllerId)return;const t="live"===this._previewStatus;this._unsubLive?.(),t||(this._previewStatus="connecting",this._preview?.setStatus(this._previewStatus)),this._unsubLive=bt(this.hass.connection,this._controllerId,t=>{this._previewStatus="live",this._preview?.setFrame(t)},{remote:this.remote.state.isRemote}),this.addUnsub(()=>this._unsubLive?.())}_togglePower(){this.hass&&this._masterEntity&&this.hass.callService("light","toggle",{entity_id:this._masterEntity})}_setBrightness(t){if(!this.hass||!this._masterEntity)return;const e=Number(t.target.value);this.hass.callService("light","turn_on",{entity_id:this._masterEntity,brightness_pct:e})}render(){const t=this.config?.height??56,e=this.remote.state;return B`
      <div class="card" role="region" aria-label="WLED Studio card">
        <header class="header">
          <ha-icon icon="mdi:led-strip-variant"></ha-icon>
          <span class="title">${this.config?.controller??"WLED Studio"}</span>
          ${e.isRemote?B`<span class="badge">Remote</span>`:null}
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
        ${this._hint?B`<p class="hint">${this._hint}</p>`:null}
      </div>
    `}_openStudio(){history.pushState(null,"","/wled-studio"),window.dispatchEvent(new CustomEvent("location-changed"))}static{this.styles=[...gt,r`
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
    `]}};function xt(){return{type:`custom:${St}`,controller:"",height:56}}t([dt({attribute:!1})],Ct.prototype,"config",void 0),t([pt()],Ct.prototype,"_controllerId",void 0),t([pt()],Ct.prototype,"_masterEntity",void 0),t([pt()],Ct.prototype,"_pixelCount",void 0),t([pt()],Ct.prototype,"_connected",void 0),t([pt()],Ct.prototype,"_previewStatus",void 0),t([pt()],Ct.prototype,"_hint",void 0),t([function(t){return(e,s,i)=>((t,e,s)=>(s.configurable=!0,s.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,s),s))(e,s,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}("wled-strip-preview")],Ct.prototype,"_preview",void 0),Ct=Et=t([ut(St)],Ct);const Pt=()=>({type:`custom:${St}`,controller:"Cloud",height:56});let Rt=class extends at{constructor(){super(...arguments),this._config=Pt()}setConfig(t){this._config={...Pt(),...t,type:t.type??`custom:${St}`}}render(){const t=this._config??Pt();return B`
      <div class="editor">
        <p>WLED Studio card — pick the controller name (e.g. Cloud).</p>
        <ha-textfield
          .label=${"Controller"}
          .value=${t.controller??""}
          @value-changed=${this._onController}
        ></ha-textfield>
        <ha-textfield
          .label=${"Preview height (px)"}
          .value=${String(t.height??56)}
          @value-changed=${this._onHeight}
        ></ha-textfield>
      </div>
    `}_onController(t){const e=t.detail.value;this._fire({...this._config??Pt(),controller:e})}_onHeight(t){const e=Number(t.detail.value);this._fire({...this._config??Pt(),height:Number.isFinite(e)?e:56})}_fire(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}};t([dt({attribute:!1})],Rt.prototype,"hass",void 0),t([pt()],Rt.prototype,"_config",void 0),Rt=t([ut("wled-studio-card-editor")],Rt),customElements.get(St)||customElements.define(St,Ct),window.customCards=window.customCards||[],window.customCards.some(t=>t.type===St)||window.customCards.push({type:St,name:"WLED Studio",description:"Live LED strip preview and controls",preview:!0}),console.info("[wled-studio] lovelace bundle loaded",{card:St});export{St as CARD_TAG,Ct as WledStudioCard,xt as getStubConfig};
//# sourceMappingURL=wled-studio-card.js.map

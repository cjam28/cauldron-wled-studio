function t(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,_=f?f.emptyScript:"",m=g.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const n=r.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const n=this.constructor;if(!1===s&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??b)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,m?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const S=globalThis,k=t=>t,C=S.trustedTypes,P=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,$="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+I,E=`<${M}>`,A=document,L=()=>A.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,F=Array.isArray,D="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,O=/>/g,U=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,G=/"/g,B=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),j=new WeakMap,q=A.createTreeWalker(A,129);function K(t,e){if(!F(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==P?P.createHTML(e):e}class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[l,h]=((t,e)=>{const i=t.length-1,s=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=R;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===R?"!--"===l[1]?o=N:void 0!==l[1]?o=O:void 0!==l[2]?(B.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=U):void 0!==l[3]&&(o=U):o===U?">"===l[0]?(o=r??R,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?U:'"'===l[3]?G:z):o===G||o===z?o=U:o===N||o===O?o=R:(o=U,r=void 0);const d=o===U&&t[e+1].startsWith("/>")?" ":"";n+=o===R?i+E:h>=0?(s.push(a),i.slice(0,h)+$+i.slice(h)+I+d):i+I+(-2===h?e:d)}return[K(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=Y.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith($)){const e=h[n++],i=s.getAttribute(t).split(I),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(I)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(I),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],L()),q.nextNode(),a.push({type:2,index:++r});s.append(t[e],L())}}}else if(8===s.nodeType)if(s.data===M)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(I,t+1));)a.push({type:7,index:r}),t+=I.length-1}r++}}static createElement(t,e){const i=A.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===H)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const n=T(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=X(t,r._$AS(t,e.values),r,s)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??A).importNode(e,!0);q.currentNode=s;let r=q.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Z(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new st(r,this,t)),this._$AV.push(e),a=i[++o]}n!==a?.index&&(r=q.nextNode(),n++)}return q.currentNode=A,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}let Z=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),T(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==H&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>F(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new J(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=j.get(t.strings);return void 0===e&&j.set(t.strings,e=new Y(t)),e}k(e){F(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,r=0;for(const n of e)r===i.length?i.push(s=new t(this.O(L()),this.O(L()),this,this.options)):s=i[r],s._$AI(n),r++;r<i.length&&(this._$AR(s&&s._$AB.nextSibling,r),i.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(void 0===r)t=X(this,t,e,0),n=!T(t)||t!==this._$AH&&t!==H,n&&(this._$AH=t);else{const s=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=X(this,s[i+o],e,o),a===H&&(a=this._$AH[o]),n||=!T(a)||a!==this._$AH[o],a===V?t=V:t!==V&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},tt=class extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}};class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}let it=class extends Q{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??V)===H)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const rt=S.litHtmlPolyfillSupport;rt?.(Y,Z),(S.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;let ot=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Z(e.insertBefore(L(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}};ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const at=nt.litElementPolyfillSupport;at?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.2");const lt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},ht=(t=lt,e,i)=>{const{kind:s,metadata:r}=i;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ct(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function dt(t){return ct({...t,state:!0,attribute:!1})}function pt(t,e){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const ut=o`
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
`,gt=o`
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
`,ft=o`
  :host {
    --wled-accent: var(--primary-color, #03a9f4);
    --wled-accent-soft: color-mix(in srgb, var(--wled-accent) 18%, transparent);
    --wled-surface: var(--card-background-color, #1e1e1e);
    --wled-surface-elevated: var(--secondary-background-color, #2a2a2a);
    --wled-text: var(--primary-text-color, #fff);
    --wled-text-muted: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
    --wled-border: var(--divider-color, rgba(255, 255, 255, 0.12));
    --wled-radius: var(--ha-card-border-radius, 12px);
    --wled-radius-sm: 8px;
    --wled-radius-lg: 20px;
    --wled-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.15));
    --wled-tap: 44px;
  }
`;class _t{constructor(t,e){this.host=t,this._hass=e,this._isRemote=!1,t.addController(this)}hostConnected(){this._refresh()}setHass(t){this._hass=t,this._refresh(),this.host.requestUpdate()}get state(){return{isRemote:this._isRemote,previewFps:this._isRemote?10:20,useBinaryPack:this._isRemote,disableBloom:this._isRemote}}_refresh(){if("undefined"==typeof location)return void(this._isRemote=!1);const t=location.hostname.endsWith(".ui.nabu.casa"),e=this._hass?.config?.external_url,i=!!e&&e.replace(/\/$/,"")===location.origin;this._isRemote=t||i}}const mt=[ft,ut,gt,o`
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
`];class vt extends ot{constructor(){super(...arguments),this.abort=new AbortController,this.rafIds=new Set,this.unsubs=new Set,this.remote=new _t(this),this._visible=!0,this._inView=!0}static{this.styles=mt}connectedCallback(){super.connectedCallback(),this._bindVisibility(),this._bindIntersection(),this.remote.setHass(this.hass),this.onPoweredConnect()}disconnectedCallback(){this.onPoweredDisconnect(),this._io?.disconnect(),this._io=void 0,this.abort.abort();for(const t of this.rafIds)cancelAnimationFrame(t);this.rafIds.clear();for(const t of this.unsubs)t();this.unsubs.clear(),super.disconnectedCallback()}updated(t){super.updated(t),t.has("hass")&&this.remote.setHass(this.hass)}get isPowered(){return this._visible&&this._inView}scheduleRaf(t){const e=requestAnimationFrame(i=>{this.rafIds.delete(e),this.isConnected&&!this.abort.signal.aborted&&t(i)});this.rafIds.add(e)}addUnsub(t){this.unsubs.add(t)}onPoweredConnect(){}onPoweredDisconnect(){}_bindVisibility(){document.addEventListener("visibilitychange",()=>{this._visible="visible"===document.visibilityState,this.requestUpdate()},{signal:this.abort.signal}),this._visible="visible"===document.visibilityState}_bindIntersection(){this._io=new IntersectionObserver(t=>{this._inView=t.some(t=>t.isIntersecting),this.requestUpdate()},{threshold:.01}),this._io.observe(this)}}t([ct({attribute:!1})],vt.prototype,"hass",void 0);const yt="0.11.4";function bt(t){return(e,i)=>{const s=customElements.get(t);return s||(customElements.define(t,e),e)}}const xt="wled-toast";function wt(t,e){const i=e.trim();i&&t.dispatchEvent(new CustomEvent(xt,{detail:{message:i},bubbles:!0,composed:!0}))}const St=/^[0-9a-fA-F]+$/;function kt(t,e){const i=new Uint8ClampedArray(4*e);for(let s=0;s<e;s++){const e=Math.min(t.count-1,Math.max(0,Math.round(s/t.scale))),r=t.leds_hex[e]??"000000",n=4*s;8===r.length?(i[n]=parseInt(r.slice(0,2),16),i[n+1]=parseInt(r.slice(2,4),16),i[n+2]=parseInt(r.slice(4,6),16),i[n+3]=parseInt(r.slice(6,8),16)):(i[n]=parseInt(r.slice(0,2),16),i[n+1]=parseInt(r.slice(2,4),16),i[n+2]=parseInt(r.slice(4,6),16),i[n+3]=255)}return i}function Ct(t,e,i,s){let r,n=!1;const o=async()=>{r?.(),r=void 0,n||(r=await t.subscribeMessage(t=>{const e=t.event?.data??("wled_studio_live_frame"===t.type?t.data:void 0);if(!e)return;const s=function(t){if(!t||"object"!=typeof t)return null;const e=t;if(Array.isArray(e.leds_hex)&&e.leds_hex.length>0){const t=e.leds_hex.map(t=>String(t).toLowerCase()),i=Number(e.n)>0?Number(e.n):t.length;return{leds_hex:t,n:i,channels:4===e.channels?4:3,scale:i/t.length,count:t.length}}const i=e.leds;if(!Array.isArray(i)||0===i.length)return null;const s=[];let r=3;for(const t of i){if("string"!=typeof t)continue;const e=t.trim().replace(/^#/,"");if(e&&e.length%2==0&&St.test(e)){if(8===e.length)r=4;else if(6!==e.length)continue;s.push(e.toLowerCase())}}if(0===s.length)return null;let n=s.length;if(void 0!==e.n){const t=Number(e.n);Number.isFinite(t)&&t>0&&(n=t)}return{leds_hex:s,n:n,channels:r,scale:n/s.length,count:s.length}}(e);s&&i({...s,entry_id:e.entry_id,controller_id:e.controller_id,fps:e.fps})},{type:"wled_studio/subscribe_live",schema_version:1,controller_id:e,remote:s?.remote??!1}))};o();const a=function(t,e){const i=()=>e();return t.addEventListener("ready",i),()=>t.removeEventListener("ready",i)}(t,()=>{o()});return()=>{n=!0,a(),r?.(),r=void 0}}async function Pt(t){t.connected||await new Promise((e,i)=>{const s=window.setTimeout(()=>{t.removeEventListener("ready",r),i(new Error("Home Assistant WebSocket not connected"))},15e3),r=()=>{t.connected&&(window.clearTimeout(s),t.removeEventListener("ready",r),e())};t.addEventListener("ready",r)})}async function $t(t){await Pt(t);try{return(await t.sendMessagePromise({type:"wled_studio/list_controllers",schema_version:1})).controllers??[]}catch(t){const e=t,i=e?.code?`${e.code}: ${e.message??"failed"}`:t instanceof Error?t.message:String(t);throw new Error(`wled_studio/list_controllers — ${i}`)}}class It extends Error{constructor(t,e){super("Scene conflict"),this.name="SceneConflictError",this.remote=t,this.etag=e}}async function Mt(t,e){return await Pt(t),t.sendMessagePromise({...e,schema_version:1})}async function Et(t,e){return(await Mt(t,{type:"wled_studio/scene_list",controller_id:e})).scenes??[]}async function At(t,e,i,s){return(await Mt(t,{type:"wled_studio/scene_capture",controller_id:e,name:i,scene_id:s?.sceneId,layout_id:s?.layoutId,transition_ms:2500})).scene??{id:"",controller_id:e,name:i,wled_state:{}}}function Lt(t,e,i=100){let s,r,n;const o=()=>{if(s&&clearTimeout(s),r&&clearTimeout(r),s=r=void 0,n){const e=n;n=void 0,t(...e)}},a=(...t)=>{n=t,s&&clearTimeout(s),s=setTimeout(o,e),r||(r=setTimeout(o,i))};return a.cancel=()=>{s&&clearTimeout(s),r&&clearTimeout(r),s=r=void 0,n=void 0},a}async function Tt(t,e){await Pt(t);return await t.sendMessagePromise({type:"wled_studio/get_state",schema_version:1,controller_id:e})}async function Ft(t,e,i,s){await Pt(t);return(await t.sendMessagePromise({type:"wled_studio/apply_state",schema_version:1,controller_id:e,state:i,full_response:s?.fullResponse??!1})).state??{}}async function Dt(t,e,i){return(await t.sendMessagePromise({type:"wled_studio/effect_meta",schema_version:1,controller_id:e,effect_id:i})).meta??{sliders:{},colors_enabled:!0,palette_enabled:!0,flag:null,defaults:{}}}async function Rt(t,e){await Pt(t);return(await t.sendMessagePromise({type:"wled_studio/get_palette_previews",schema_version:1,controller_id:e})).palette_previews??{}}function Nt(t){return!t||t.length<3?[255,255,255,0]:[t[0]??0,t[1]??0,t[2]??0,t[3]??0]}function Ot(t){if(!Array.isArray(t))return[];const e=[];for(const i of t){if("string"==typeof i){const t=i.replace("#","").trim();if(t.length>=6){e.push([parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16),t.length>=8?parseInt(t.slice(6,8),16):0]);continue}}Array.isArray(i)&&e.push([Number(i[0])||0,Number(i[1])||0,Number(i[2])||0,Number(i[3])||0])}return e}function Ut(t){const e=t.match(/_segment_(\d+)$/);return e?Number(e[1]):void 0}function zt(t,e){for(const i of e){if(i.wled_segment_id===t)return i.entity_id;if(Ut(i.entity_id)===t)return i.entity_id;if(i.segment_index===t)return i.entity_id}}function Gt(t,e,i){const s=new Set(t),r=(i.length?i:t.map(t=>({id:t}))).map(t=>s.has(t.id)?{...e,id:t.id,sel:!0,on:void 0!==e.on?e.on:!1===t.on||t.on}:{id:t.id,sel:!1});return{seg:r}}function Bt(t,e){const i=new Set(t);return i.has(e)?i.delete(e):i.add(e),[...i].sort((t,e)=>t-e)}function Wt(t,e){const i=t.id,s=e.find(t=>t.wled_segment_id===i||t.segment_index===i||t.entity_id.endsWith(`_segment_${i}`));return`${("string"==typeof t.n&&t.n.trim()?t.n.trim():"")||s?.name?.replace(/^.*\s—\s/,"")||`Seg ${i+1}`} (${t.start??"?"}–${t.stop??"?"})`}function Ht(t){if(t instanceof Error)return t.message;if("string"==typeof t)return t;if(t&&"object"==typeof t){const e=t;if("string"==typeof e.message)return"string"==typeof e.code?`${e.code}: ${e.message}`:e.message;const i=e.error;if(i&&"object"==typeof i){const t=i;if("string"==typeof t.message)return"string"==typeof t.code?`${t.code}: ${t.message}`:t.message}if("string"==typeof e.code)return e.code}try{return JSON.stringify(t)}catch{return"Unknown error"}}const Vt={all:"All","1d":"1D","2d":"2D",solid:"Solid",sound:"Music",palette:"Palette"};function jt(t){return void 0!==t.Solid?t.Solid:0}const qt=/\b(dj|sound|music|audio|beat|freq|grav|jugg|ripple|water|pixel|rock|streak|popcorn|balls|fireworks|matrix|stream|peak|level|radio|sync|reactive|volume|puddle|ripple|noisem|noisep|noisemove|pixels|juggle|sinelon|phased|blurz|djlight)\b/i;function Kt(t,e,i,s,r){if("all"===i)return!0;const n=s[e]??null,o=t.toLowerCase();return"solid"===i?e===jt(r):"2d"===i?"2"===n||o.includes("2d"):"1d"===i?"2"!==n&&!o.includes("2d"):"sound"===i?function(t,e,i){const s=i[e]??null;return"v"===s||"f"===s||qt.test(t)}(t,e,s):"palette"!==i||(o.includes("palette")||o.includes("colorloop")||o.includes("pride")||o.includes("cycle"))}const Yt="wled_studio.segment_snapshot",Xt="wled_studio.merge_for_effects",Jt=["start","stop","len","grp","spc","of","on","bri","col","fx","sx","ix","c1","c2","c3","o1","o2","o3","pal","n","rev","mi","sel","awm"];function Zt(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function Qt(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function te(t){if(!t)return!1;const e=Zt(Xt);return!(t in e)||Boolean(e[t])}function ee(t,e){const i=t.find(t=>0===t.id);if(!i||e<=0)return!1;return(i.stop??0)-(i.start??0)>=.9*e}function ie(t,e){const i=Zt(Xt);e?i[t]=!0:delete i[t],Qt(Xt,i)}function se(t){return Zt(Yt)[t]??null}function re(t,e,i){const s={savedAt:Date.now(),segments:e.map(t=>({...t})),pixelCount:i},r=Zt(Yt);return r[t]=s,Qt(Yt,r),s}function ne(t){return{seg:t.segments.map(t=>function(t){const e=t,i={id:t.id};for(const t of Jt){const s=e[t];void 0!==s&&(i[t]=s)}return i}(t))}}function oe(t,e,i){const s=t.length?[...t].sort((t,e)=>t.id-e.id):[{id:0,start:0,stop:e,on:!0}],r=i?.length?new Set(i):null,n=r?s.filter(t=>r.has(t.id)):s,o=n.filter(t=>(t.stop??0)>(t.start??0)),a=o.length?o:n.length?n:s,l=Math.min(...a.map(t=>t.start??0)),h=Math.max(...a.map(t=>t.stop??e)),c=a[0],d={id:0,start:l,stop:h,on:!1!==c.on,sel:!0,bri:c.bri??255,fx:c.fx??0,n:"Merged (effects)"};void 0!==c.col&&(d.col=c.col),void 0!==c.pal&&(d.pal=c.pal);const p=[d];for(const t of s){if(0===t.id)continue;const e=t.stop??t.start??0;p.push({id:t.id,start:e,stop:e,on:!1,sel:!1})}return{seg:p}}function ae(t,e){const i=t.find(t=>0===t.id);return i?[0]:t.length?[t[0].id]:[0]}function le(t){const e={id:t.id,on:t.on,bri:t.bri,fx:t.fx,sx:t.sx,ix:t.ix,c1:t.c1,c2:t.c2,c3:t.c3,o1:t.o1,o2:t.o2,o3:t.o3,pal:t.pal,col:Ot(t.col),awm:t.awm};return JSON.stringify(e)}function he(t,e,i){let s,r=null,n=0;const o=()=>{s&&clearTimeout(s),s=setTimeout(()=>{(async()=>{try{const s=((await Tt(t,e)).segments??[]).find(t=>t.id===n);if(!s||!r)return;const o=le(r);if(o===le(s))return;!function(t,e){return t.fx!==e.fx||JSON.stringify(Ot(t.col))!==JSON.stringify(Ot(e.col))}(r,s)?i(s):i(s,"WLED applied a different color or effect than requested")}catch{}})()},500)},a=Lt((s,a)=>{r=a,n=a.id,Ft(t,e,s,{fullResponse:!0}).then(t=>{const e=t.seg,i=Array.isArray(e)?e.find(t=>t.id===a.id):void 0;i&&(r={...a,...i,id:a.id}),o()}).catch(t=>{i(a,`Failed to apply state to WLED: ${Ht(t)}`)})},50,100);return{push(t,e){a(t,e)},cancel(){a.cancel(),s&&clearTimeout(s)}}}var ce,de,pe,ue,ge,fe={},_e=[],me=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function ve(t,e){for(var i in e)t[i]=e[i];return t}function ye(t){var e=t.parentNode;e&&e.removeChild(t)}function be(t,e,i){var s,r,n,o,a=arguments;if(e=ve({},e),arguments.length>3)for(i=[i],s=3;s<arguments.length;s++)i.push(a[s]);if(null!=i&&(e.children=i),null!=t&&null!=t.defaultProps)for(r in t.defaultProps)void 0===e[r]&&(e[r]=t.defaultProps[r]);return o=e.key,null!=(n=e.ref)&&delete e.ref,null!=o&&delete e.key,xe(t,e,o,n)}function xe(t,e,i,s){var r={type:t,props:e,key:i,ref:s,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return ce.vnode&&ce.vnode(r),r}function we(t){return t.children}function Se(t,e){this.props=t,this.context=e}function ke(t,e){if(null==e)return t.__p?ke(t.__p,t.__p.__k.indexOf(t)+1):null;for(var i;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e)return i.__e;return"function"==typeof t.type?ke(t):null}function Ce(t){var e,i;if(null!=(t=t.__p)&&null!=t.__c){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e){t.__e=t.__c.base=i.__e;break}return Ce(t)}}function Pe(t){(!t.__d&&(t.__d=!0)&&1===de.push(t)||ue!==ce.debounceRendering)&&(ue=ce.debounceRendering,(ce.debounceRendering||pe)($e))}function $e(){var t,e,i,s,r,n,o,a;for(de.sort(function(t,e){return e.__v.__b-t.__v.__b});t=de.pop();)t.__d&&(i=void 0,s=void 0,n=(r=(e=t).__v).__e,o=e.__P,a=e.u,e.u=!1,o&&(i=[],s=Te(o,r,ve({},r),e.__n,void 0!==o.ownerSVGElement,null,i,a,null==n?ke(r):n),Fe(i,r),s!=n&&Ce(r)))}function Ie(t,e,i,s,r,n,o,a,l){var h,c,d,p,u,g,f,_=i&&i.__k||_e,m=_.length;if(a==fe&&(a=null!=n?n[0]:m?ke(i,0):null),h=0,e.__k=Me(e.__k,function(i){if(null!=i){if(i.__p=e,i.__b=e.__b+1,null===(d=_[h])||d&&i.key==d.key&&i.type===d.type)_[h]=void 0;else for(c=0;c<m;c++){if((d=_[c])&&i.key==d.key&&i.type===d.type){_[c]=void 0;break}d=null}if(p=Te(t,i,d=d||fe,s,r,n,o,null,a,l),(c=i.ref)&&d.ref!=c&&(f||(f=[])).push(c,i.__c||p,i),null!=p){if(null==g&&(g=p),null!=i.l)p=i.l,i.l=null;else if(n==d||p!=a||null==p.parentNode){t:if(null==a||a.parentNode!==t)t.appendChild(p);else{for(u=a,c=0;(u=u.nextSibling)&&c<m;c+=2)if(u==p)break t;t.insertBefore(p,a)}"option"==e.type&&(t.value="")}a=p.nextSibling,"function"==typeof e.type&&(e.l=p)}}return h++,i}),e.__e=g,null!=n&&"function"!=typeof e.type)for(h=n.length;h--;)null!=n[h]&&ye(n[h]);for(h=m;h--;)null!=_[h]&&Ne(_[h],_[h]);if(f)for(h=0;h<f.length;h++)Re(f[h],f[++h],f[++h])}function Me(t,e,i){if(null==i&&(i=[]),null==t||"boolean"==typeof t)e&&i.push(e(null));else if(Array.isArray(t))for(var s=0;s<t.length;s++)Me(t[s],e,i);else i.push(e?e(function(t){if(null==t||"boolean"==typeof t)return null;if("string"==typeof t||"number"==typeof t)return xe(null,t,null,null);if(null!=t.__e||null!=t.__c){var e=xe(t.type,t.props,t.key,null);return e.__e=t.__e,e}return t}(t)):t);return i}function Ee(t,e,i){"-"===e[0]?t.setProperty(e,i):t[e]="number"==typeof i&&!1===me.test(e)?i+"px":null==i?"":i}function Ae(t,e,i,s,r){var n,o,a,l,h;if("key"===(e=r?"className"===e?"class":e:"class"===e?"className":e)||"children"===e);else if("style"===e)if(n=t.style,"string"==typeof i)n.cssText=i;else{if("string"==typeof s&&(n.cssText="",s=null),s)for(o in s)i&&o in i||Ee(n,o,"");if(i)for(a in i)s&&i[a]===s[a]||Ee(n,a,i[a])}else"o"===e[0]&&"n"===e[1]?(l=e!==(e=e.replace(/Capture$/,"")),h=e.toLowerCase(),e=(h in t?h:e).slice(2),i?(s||t.addEventListener(e,Le,l),(t.t||(t.t={}))[e]=i):t.removeEventListener(e,Le,l)):"list"!==e&&"tagName"!==e&&"form"!==e&&!r&&e in t?t[e]=null==i?"":i:"function"!=typeof i&&"dangerouslySetInnerHTML"!==e&&(e!==(e=e.replace(/^xlink:?/,""))?null==i||!1===i?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),i):null==i||!1===i?t.removeAttribute(e):t.setAttribute(e,i))}function Le(t){return this.t[t.type](ce.event?ce.event(t):t)}function Te(t,e,i,s,r,n,o,a,l,h){var c,d,p,u,g,f,_,m,v,y,b=e.type;if(void 0!==e.constructor)return null;(c=ce.__b)&&c(e);try{t:if("function"==typeof b){if(m=e.props,v=(c=b.contextType)&&s[c.__c],y=c?v?v.props.value:c.__p:s,i.__c?_=(d=e.__c=i.__c).__p=d.__E:("prototype"in b&&b.prototype.render?e.__c=d=new b(m,y):(e.__c=d=new Se(m,y),d.constructor=b,d.render=Oe),v&&v.sub(d),d.props=m,d.state||(d.state={}),d.context=y,d.__n=s,p=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=b.getDerivedStateFromProps&&ve(d.__s==d.state?d.__s=ve({},d.__s):d.__s,b.getDerivedStateFromProps(m,d.__s)),p)null==b.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&o.push(d);else{if(null==b.getDerivedStateFromProps&&null==a&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(m,y),!a&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(m,d.__s,y)){for(d.props=m,d.state=d.__s,d.__d=!1,d.__v=e,e.__e=null!=l?l!==i.__e?l:i.__e:null,e.__k=i.__k,c=0;c<e.__k.length;c++)e.__k[c]&&(e.__k[c].__p=e);break t}null!=d.componentWillUpdate&&d.componentWillUpdate(m,d.__s,y)}for(u=d.props,g=d.state,d.context=y,d.props=m,d.state=d.__s,(c=ce.__r)&&c(e),d.__d=!1,d.__v=e,d.__P=t,c=d.render(d.props,d.state,d.context),e.__k=Me(null!=c&&c.type==we&&null==c.key?c.props.children:c),null!=d.getChildContext&&(s=ve(ve({},s),d.getChildContext())),p||null==d.getSnapshotBeforeUpdate||(f=d.getSnapshotBeforeUpdate(u,g)),Ie(t,e,i,s,r,n,o,l,h),d.base=e.__e;c=d.__h.pop();)d.__s&&(d.state=d.__s),c.call(d);p||null==u||null==d.componentDidUpdate||d.componentDidUpdate(u,g,f),_&&(d.__E=d.__p=null)}else e.__e=De(i.__e,e,i,s,r,n,o,h);(c=ce.diffed)&&c(e)}catch(t){ce.__e(t,e,i)}return e.__e}function Fe(t,e){for(var i;i=t.pop();)try{i.componentDidMount()}catch(t){ce.__e(t,i.__v)}ce.__c&&ce.__c(e)}function De(t,e,i,s,r,n,o,a){var l,h,c,d,p=i.props,u=e.props;if(r="svg"===e.type||r,null==t&&null!=n)for(l=0;l<n.length;l++)if(null!=(h=n[l])&&(null===e.type?3===h.nodeType:h.localName===e.type)){t=h,n[l]=null;break}if(null==t){if(null===e.type)return document.createTextNode(u);t=r?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type),n=null}return null===e.type?p!==u&&(null!=n&&(n[n.indexOf(t)]=null),t.data=u):e!==i&&(null!=n&&(n=_e.slice.call(t.childNodes)),c=(p=i.props||fe).dangerouslySetInnerHTML,d=u.dangerouslySetInnerHTML,a||(d||c)&&(d&&c&&d.__html==c.__html||(t.innerHTML=d&&d.__html||"")),function(t,e,i,s,r){var n;for(n in i)n in e||Ae(t,n,null,i[n],s);for(n in e)r&&"function"!=typeof e[n]||"value"===n||"checked"===n||i[n]===e[n]||Ae(t,n,e[n],i[n],s)}(t,u,p,r,a),e.__k=e.props.children,d||Ie(t,e,i,s,"foreignObject"!==e.type&&r,n,o,fe,a),a||("value"in u&&void 0!==u.value&&u.value!==t.value&&(t.value=null==u.value?"":u.value),"checked"in u&&void 0!==u.checked&&u.checked!==t.checked&&(t.checked=u.checked))),t}function Re(t,e,i){try{"function"==typeof t?t(e):t.current=e}catch(t){ce.__e(t,i)}}function Ne(t,e,i){var s,r,n;if(ce.unmount&&ce.unmount(t),(s=t.ref)&&Re(s,null,e),i||"function"==typeof t.type||(i=null!=(r=t.__e)),t.__e=t.l=null,null!=(s=t.__c)){if(s.componentWillUnmount)try{s.componentWillUnmount()}catch(t){ce.__e(t,e)}s.base=s.__P=null}if(s=t.__k)for(n=0;n<s.length;n++)s[n]&&Ne(s[n],e,i);null!=r&&ye(r)}function Oe(t,e,i){return this.constructor(t,i)}function Ue(t,e,i){return e&&function(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}(t.prototype,e),t}function ze(){return ze=Object.assign||function(t){for(var e=arguments,i=1;i<arguments.length;i++){var s=e[i];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r])}return t},ze.apply(this,arguments)}ce={},Se.prototype.setState=function(t,e){var i=this.__s!==this.state&&this.__s||(this.__s=ve({},this.state));("function"!=typeof t||(t=t(i,this.props)))&&ve(i,t),null!=t&&this.__v&&(this.u=!1,e&&this.__h.push(e),Pe(this))},Se.prototype.forceUpdate=function(t){this.__v&&(t&&this.__h.push(t),this.u=!0,Pe(this))},Se.prototype.render=we,de=[],pe="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,ue=ce.debounceRendering,ce.__e=function(t,e,i){for(var s;e=e.__p;)if((s=e.__c)&&!s.__p)try{if(s.constructor&&null!=s.constructor.getDerivedStateFromError)s.setState(s.constructor.getDerivedStateFromError(t));else{if(null==s.componentDidCatch)continue;s.componentDidCatch(t)}return Pe(s.__E=s)}catch(e){t=e}throw t},ge=fe;var Ge="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",Be="[\\s|\\(]+("+Ge+")[,|\\s]+("+Ge+")[,|\\s]+("+Ge+")\\s*\\)?",We="[\\s|\\(]+("+Ge+")[,|\\s]+("+Ge+")[,|\\s]+("+Ge+")[,|\\s]+("+Ge+")\\s*\\)?",He=new RegExp("rgb"+Be),Ve=new RegExp("rgba"+We),je=new RegExp("hsl"+Be),qe=new RegExp("hsla"+We),Ke="^(?:#?|0x?)",Ye="([0-9a-fA-F]{1})",Xe="([0-9a-fA-F]{2})",Je=new RegExp(Ke+Ye+Ye+Ye+"$"),Ze=new RegExp(Ke+Ye+Ye+Ye+Ye+"$"),Qe=new RegExp(Ke+Xe+Xe+Xe+"$"),ti=new RegExp(Ke+Xe+Xe+Xe+Xe+"$"),ei=Math.log,ii=Math.round,si=Math.floor;function ri(t,e,i){return Math.min(Math.max(t,e),i)}function ni(t,e){var i=t.indexOf("%")>-1,s=parseFloat(t);return i?e/100*s:s}function oi(t){return parseInt(t,16)}function ai(t){return t.toString(16).padStart(2,"0")}var li=function(){function t(t,e){this.$={h:0,s:0,v:0,a:1},t&&this.set(t),this.onChange=e,this.initialValue=ze({},this.$)}var e=t.prototype;return e.set=function(e){if("string"==typeof e)/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(e)?this.hexString=e:/^rgba?/.test(e)?this.rgbString=e:/^hsla?/.test(e)&&(this.hslString=e);else{if("object"!=typeof e)throw new Error("Invalid color value");e instanceof t?this.hsva=e.hsva:"r"in e&&"g"in e&&"b"in e?this.rgb=e:"h"in e&&"s"in e&&"v"in e?this.hsv=e:"h"in e&&"s"in e&&"l"in e?this.hsl=e:"kelvin"in e&&(this.kelvin=e.kelvin)}},e.setChannel=function(t,e,i){var s;this[t]=ze({},this[t],((s={})[e]=i,s))},e.reset=function(){this.hsva=this.initialValue},e.clone=function(){return new t(this)},e.unbind=function(){this.onChange=void 0},t.hsvToRgb=function(t){var e=t.h/60,i=t.s/100,s=t.v/100,r=si(e),n=e-r,o=s*(1-i),a=s*(1-n*i),l=s*(1-(1-n)*i),h=r%6,c=[l,s,s,a,o,o][h],d=[o,o,l,s,s,a][h];return{r:ri(255*[s,a,o,o,l,s][h],0,255),g:ri(255*c,0,255),b:ri(255*d,0,255)}},t.rgbToHsv=function(t){var e=t.r/255,i=t.g/255,s=t.b/255,r=Math.max(e,i,s),n=Math.min(e,i,s),o=r-n,a=0,l=r,h=0===r?0:o/r;switch(r){case n:a=0;break;case e:a=(i-s)/o+(i<s?6:0);break;case i:a=(s-e)/o+2;break;case s:a=(e-i)/o+4}return{h:60*a%360,s:ri(100*h,0,100),v:ri(100*l,0,100)}},t.hsvToHsl=function(t){var e=t.s/100,i=t.v/100,s=(2-e)*i,r=s<=1?s:2-s,n=r<1e-9?0:e*i/r;return{h:t.h,s:ri(100*n,0,100),l:ri(50*s,0,100)}},t.hslToHsv=function(t){var e=2*t.l,i=t.s*(e<=100?e:200-e)/100,s=e+i<1e-9?0:2*i/(e+i);return{h:t.h,s:ri(100*s,0,100),v:ri((e+i)/2,0,100)}},t.kelvinToRgb=function(t){var e,i,s,r=t/100;return r<66?(e=255,i=-155.25485562709179-.44596950469579133*(i=r-2)+104.49216199393888*ei(i),s=r<20?0:.8274096064007395*(s=r-10)-254.76935184120902+115.67994401066147*ei(s)):(e=351.97690566805693+.114206453784165*(e=r-55)-40.25366309332127*ei(e),i=325.4494125711974+.07943456536662342*(i=r-50)-28.0852963507957*ei(i),s=255),{r:ri(si(e),0,255),g:ri(si(i),0,255),b:ri(si(s),0,255)}},t.rgbToKelvin=function(e){for(var i,s=e.r,r=e.b,n=2e3,o=4e4;o-n>.4;){i=.5*(o+n);var a=t.kelvinToRgb(i);a.b/a.r>=r/s?o=i:n=i}return i},Ue(t,[{key:"hsv",get:function(){var t=this.$;return{h:t.h,s:t.s,v:t.v}},set:function(t){var e=this.$;if(t=ze({},e,t),this.onChange){var i={h:!1,v:!1,s:!1,a:!1};for(var s in e)i[s]=t[s]!=e[s];this.$=t,(i.h||i.s||i.v||i.a)&&this.onChange(this,i)}else this.$=t}},{key:"hsva",get:function(){return ze({},this.$)},set:function(t){this.hsv=t}},{key:"hue",get:function(){return this.$.h},set:function(t){this.hsv={h:t}}},{key:"saturation",get:function(){return this.$.s},set:function(t){this.hsv={s:t}}},{key:"value",get:function(){return this.$.v},set:function(t){this.hsv={v:t}}},{key:"alpha",get:function(){return this.$.a},set:function(t){this.hsv=ze({},this.hsv,{a:t})}},{key:"kelvin",get:function(){return t.rgbToKelvin(this.rgb)},set:function(e){this.rgb=t.kelvinToRgb(e)}},{key:"red",get:function(){return this.rgb.r},set:function(t){this.rgb=ze({},this.rgb,{r:t})}},{key:"green",get:function(){return this.rgb.g},set:function(t){this.rgb=ze({},this.rgb,{g:t})}},{key:"blue",get:function(){return this.rgb.b},set:function(t){this.rgb=ze({},this.rgb,{b:t})}},{key:"rgb",get:function(){var e=t.hsvToRgb(this.$),i=e.r,s=e.g,r=e.b;return{r:ii(i),g:ii(s),b:ii(r)}},set:function(e){this.hsv=ze({},t.rgbToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"rgba",get:function(){return ze({},this.rgb,{a:this.alpha})},set:function(t){this.rgb=t}},{key:"hsl",get:function(){var e=t.hsvToHsl(this.$),i=e.h,s=e.s,r=e.l;return{h:ii(i),s:ii(s),l:ii(r)}},set:function(e){this.hsv=ze({},t.hslToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"hsla",get:function(){return ze({},this.hsl,{a:this.alpha})},set:function(t){this.hsl=t}},{key:"rgbString",get:function(){var t=this.rgb;return"rgb("+t.r+", "+t.g+", "+t.b+")"},set:function(t){var e,i,s,r,n=1;if((e=He.exec(t))?(i=ni(e[1],255),s=ni(e[2],255),r=ni(e[3],255)):(e=Ve.exec(t))&&(i=ni(e[1],255),s=ni(e[2],255),r=ni(e[3],255),n=ni(e[4],1)),!e)throw new Error("Invalid rgb string");this.rgb={r:i,g:s,b:r,a:n}}},{key:"rgbaString",get:function(){var t=this.rgba;return"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"},set:function(t){this.rgbString=t}},{key:"hexString",get:function(){var t=this.rgb;return"#"+ai(t.r)+ai(t.g)+ai(t.b)},set:function(t){var e,i,s,r,n=255;if((e=Je.exec(t))?(i=17*oi(e[1]),s=17*oi(e[2]),r=17*oi(e[3])):(e=Ze.exec(t))?(i=17*oi(e[1]),s=17*oi(e[2]),r=17*oi(e[3]),n=17*oi(e[4])):(e=Qe.exec(t))?(i=oi(e[1]),s=oi(e[2]),r=oi(e[3])):(e=ti.exec(t))&&(i=oi(e[1]),s=oi(e[2]),r=oi(e[3]),n=oi(e[4])),!e)throw new Error("Invalid hex string");this.rgb={r:i,g:s,b:r,a:n/255}}},{key:"hex8String",get:function(){var t=this.rgba;return"#"+ai(t.r)+ai(t.g)+ai(t.b)+ai(si(255*t.a))},set:function(t){this.hexString=t}},{key:"hslString",get:function(){var t=this.hsl;return"hsl("+t.h+", "+t.s+"%, "+t.l+"%)"},set:function(t){var e,i,s,r,n=1;if((e=je.exec(t))?(i=ni(e[1],360),s=ni(e[2],100),r=ni(e[3],100)):(e=qe.exec(t))&&(i=ni(e[1],360),s=ni(e[2],100),r=ni(e[3],100),n=ni(e[4],1)),!e)throw new Error("Invalid hsl string");this.hsl={h:i,s:s,l:r,a:n}}},{key:"hslaString",get:function(){var t=this.hsla;return"hsla("+t.h+", "+t.s+"%, "+t.l+"%, "+t.a+")"},set:function(t){this.hslString=t}}]),t}();function hi(t){var e,i=t.width,s=t.sliderSize,r=t.borderWidth,n=t.handleRadius,o=t.padding,a=t.sliderShape,l="horizontal"===t.layoutDirection;return s=null!=(e=s)?e:2*o+2*n,"circle"===a?{handleStart:t.padding+t.handleRadius,handleRange:i-2*o-2*n,width:i,height:i,cx:i/2,cy:i/2,radius:i/2-r/2}:{handleStart:s/2,handleRange:i-s,radius:s/2,x:0,y:0,width:l?s:i,height:l?i:s}}function ci(t,e){var i=hi(t),s=i.width,r=i.height,n=i.handleRange,o=i.handleStart,a="horizontal"===t.layoutDirection,l=function(t,e){var i=e.hsva,s=e.rgb;switch(t.sliderType){case"red":return s.r/2.55;case"green":return s.g/2.55;case"blue":return s.b/2.55;case"alpha":return 100*i.a;case"kelvin":var r=t.minTemperature,n=t.maxTemperature-r,o=(e.kelvin-r)/n*100;return Math.max(0,Math.min(o,100));case"hue":return i.h/=3.6;case"saturation":return i.s;default:return i.v}}(t,e),h=a?s/2:r/2,c=o+l/100*n;return a&&(c=-1*c+n+2*o),{x:a?h:c,y:a?c:h}}var di,pi=2*Math.PI,ui=function(t,e){return Math.sqrt(t*t+e*e)};function gi(t){return t.width/2-t.padding-t.handleRadius-t.borderWidth}function fi(t){var e=t.width/2;return{width:t.width,radius:e-t.borderWidth,cx:e,cy:e}}function _i(t,e,i){var s=t.wheelAngle,r=t.wheelDirection;return i&&"clockwise"===r?e=s+e:"clockwise"===r?e=360-s+e:i&&"anticlockwise"===r?e=s+180-e:"anticlockwise"===r&&(e=s-e),function(t,e){return(t%e+e)%e}(e,360)}function mi(t,e,i){var s=fi(t),r=s.cx,n=s.cy,o=gi(t);e=r-e,i=n-i;var a=_i(t,Math.atan2(-i,-e)*(360/pi)),l=Math.min(ui(e,i),o);return{h:Math.round(a),s:Math.round(100/o*l)}}function vi(t){var e=t.width,i=t.boxHeight;return{width:e,height:null!=i?i:e,radius:t.padding+t.handleRadius}}function yi(t,e,i){var s=vi(t),r=s.width,n=s.height,o=s.radius,a=(e-o)/(r-2*o)*100,l=(i-o)/(n-2*o)*100;return{s:Math.max(0,Math.min(a,100)),v:Math.max(0,Math.min(100-l,100))}}function bi(t){di||(di=document.getElementsByTagName("base"));var e=window.navigator.userAgent,i=/^((?!chrome|android).)*safari/i.test(e),s=/iPhone|iPod|iPad/i.test(e),r=window.location;return(i||s)&&di.length>0?r.protocol+"//"+r.host+r.pathname+r.search+t:t}function xi(t,e,i,s){for(var r=0;r<s.length;r++){var n=s[r].x-e,o=s[r].y-i;if(Math.sqrt(n*n+o*o)<t.handleRadius)return r}return null}function wi(t){return{boxSizing:"border-box",border:t.borderWidth+"px solid "+t.borderColor}}function Si(t,e,i){return t+"-gradient("+e+", "+i.map(function(t){var e=t[0];return t[1]+" "+e+"%"}).join(",")+")"}function ki(t){return"string"==typeof t?t:t+"px"}var Ci=["mousemove","touchmove","mouseup","touchend"],Pi=function(t){function e(e){t.call(this,e),this.uid=(Math.random()+1).toString(36).substring(5)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.render=function(t){var e=this.handleEvent.bind(this),i={onMouseDown:e,ontouchstart:e},s="horizontal"===t.layoutDirection,r=null===t.margin?t.sliderMargin:t.margin,n={overflow:"visible",display:s?"inline-block":"block"};return t.index>0&&(n[s?"marginLeft":"marginTop"]=r),be(we,null,t.children(this.uid,i,n))},e.prototype.handleEvent=function(t){var e=this,i=this.props.onInput,s=this.base.getBoundingClientRect();t.preventDefault();var r=t.touches?t.changedTouches[0]:t,n=r.clientX-s.left,o=r.clientY-s.top;switch(t.type){case"mousedown":case"touchstart":!1!==i(n,o,0)&&Ci.forEach(function(t){document.addEventListener(t,e,{passive:!1})});break;case"mousemove":case"touchmove":i(n,o,1);break;case"mouseup":case"touchend":i(n,o,2),Ci.forEach(function(t){document.removeEventListener(t,e,{passive:!1})})}},e}(Se);function $i(t){var e=t.r,i=t.url,s=e,r=e;return be("svg",{className:"IroHandle IroHandle--"+t.index+" "+(t.isActive?"IroHandle--isActive":""),style:{"-webkit-tap-highlight-color":"rgba(0, 0, 0, 0);",transform:"translate("+ki(t.x)+", "+ki(t.y)+")",willChange:"transform",top:ki(-e),left:ki(-e),width:ki(2*e),height:ki(2*e),position:"absolute",overflow:"visible"}},i&&be("use",Object.assign({xlinkHref:bi(i)},t.props)),!i&&be("circle",{cx:s,cy:r,r:e,fill:"none","stroke-width":2,stroke:"#000"}),!i&&be("circle",{cx:s,cy:r,r:e-2,fill:t.fill,"stroke-width":2,stroke:"#fff"}))}function Ii(t){var e=t.activeIndex,i=void 0!==e&&e<t.colors.length?t.colors[e]:t.color,s=hi(t),r=s.width,n=s.height,o=s.radius,a=ci(t,i),l=function(t,e){var i=e.hsv,s=e.rgb;switch(t.sliderType){case"red":return[[0,"rgb(0,"+s.g+","+s.b+")"],[100,"rgb(255,"+s.g+","+s.b+")"]];case"green":return[[0,"rgb("+s.r+",0,"+s.b+")"],[100,"rgb("+s.r+",255,"+s.b+")"]];case"blue":return[[0,"rgb("+s.r+","+s.g+",0)"],[100,"rgb("+s.r+","+s.g+",255)"]];case"alpha":return[[0,"rgba("+s.r+","+s.g+","+s.b+",0)"],[100,"rgb("+s.r+","+s.g+","+s.b+")"]];case"kelvin":for(var r=[],n=t.minTemperature,o=t.maxTemperature,a=o-n,l=n,h=0;l<o;l+=a/8,h+=1){var c=li.kelvinToRgb(l),d=c.r,p=c.g,u=c.b;r.push([12.5*h,"rgb("+d+","+p+","+u+")"])}return r;case"hue":return[[0,"#f00"],[16.666,"#ff0"],[33.333,"#0f0"],[50,"#0ff"],[66.666,"#00f"],[83.333,"#f0f"],[100,"#f00"]];case"saturation":var g=li.hsvToHsl({h:i.h,s:0,v:i.v}),f=li.hsvToHsl({h:i.h,s:100,v:i.v});return[[0,"hsl("+g.h+","+g.s+"%,"+g.l+"%)"],[100,"hsl("+f.h+","+f.s+"%,"+f.l+"%)"]];default:var _=li.hsvToHsl({h:i.h,s:i.s,v:100});return[[0,"#000"],[100,"hsl("+_.h+","+_.s+"%,"+_.l+"%)"]]}}(t,i);return be(Pi,Object.assign({},t,{onInput:function(e,s,r){var n=function(t,e,i){var s,r=hi(t),n=r.handleRange,o=r.handleStart;s="horizontal"===t.layoutDirection?-1*i+n+o:e-o,s=Math.max(Math.min(s,n),0);var a=Math.round(100/n*s);switch(t.sliderType){case"kelvin":var l=t.minTemperature;return l+(t.maxTemperature-l)*(a/100);case"alpha":return a/100;case"hue":return 3.6*a;case"red":case"blue":case"green":return 2.55*a;default:return a}}(t,e,s);t.parent.inputActive=!0,i[t.sliderType]=n,t.onInput(r,t.id)}}),function(e,s,h){return be("div",Object.assign({},s,{className:"IroSlider",style:Object.assign({},{position:"relative",width:ki(r),height:ki(n),borderRadius:ki(o),background:"conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)",backgroundSize:"8px 8px"},h)}),be("div",{className:"IroSliderGradient",style:Object.assign({},{position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:ki(o),background:Si("linear","horizontal"===t.layoutDirection?"to top":"to right",l)},wi(t))}),be($i,{isActive:!0,index:i.index,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:a.x,y:a.y}))})}function Mi(t){var e=vi(t),i=e.width,s=e.height,r=e.radius,n=t.colors,o=t.parent,a=t.activeIndex,l=void 0!==a&&a<t.colors.length?t.colors[a]:t.color,h=[[[0,"#fff"],[100,"hsl("+l.hue+",100%,50%)"]],[[0,"rgba(0,0,0,0)"],[100,"#000"]]],c=n.map(function(e){return function(t,e){var i=vi(t),s=i.width,r=i.height,n=i.radius,o=e.hsv,a=n,l=s-2*n,h=r-2*n;return{x:a+o.s/100*l,y:a+(h-o.v/100*h)}}(t,e)});return be(Pi,Object.assign({},t,{onInput:function(e,i,s){if(0===s){var r=xi(t,e,i,c);null!==r?o.setActiveColor(r):(o.inputActive=!0,l.hsv=yi(t,e,i),t.onInput(s,t.id))}else 1===s&&(o.inputActive=!0,l.hsv=yi(t,e,i));t.onInput(s,t.id)}}),function(e,o,a){return be("div",Object.assign({},o,{className:"IroBox",style:Object.assign({},{width:ki(i),height:ki(s),position:"relative"},a)}),be("div",{className:"IroBox",style:Object.assign({},{width:"100%",height:"100%",borderRadius:ki(r)},wi(t),{background:Si("linear","to bottom",h[1])+","+Si("linear","to right",h[0])})}),n.filter(function(t){return t!==l}).map(function(e){return be($i,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:c[e.index].x,y:c[e.index].y})}),be($i,{isActive:!0,index:l.index,fill:l.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:c[l.index].x,y:c[l.index].y}))})}$i.defaultProps={fill:"none",x:0,y:0,r:8,url:null,props:{x:0,y:0}},Ii.defaultProps=Object.assign({},{sliderShape:"bar",sliderType:"value",minTemperature:2200,maxTemperature:11e3});function Ei(t){var e=fi(t).width,i=t.colors;t.borderWidth;var s=t.parent,r=t.color,n=r.hsv,o=i.map(function(e){return function(t,e){var i=e.hsv,s=fi(t),r=s.cx,n=s.cy,o=gi(t),a=(180+_i(t,i.h,!0))*(pi/360),l=i.s/100*o,h="clockwise"===t.wheelDirection?-1:1;return{x:r+l*Math.cos(a)*h,y:n+l*Math.sin(a)*h}}(t,e)}),a={position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:"50%",boxSizing:"border-box"};return be(Pi,Object.assign({},t,{onInput:function(e,i,n){if(0===n){if(!function(t,e,i){var s=fi(t),r=s.cx,n=s.cy,o=t.width/2;return ui(r-e,n-i)<o}(t,e,i))return!1;var a=xi(t,e,i,o);null!==a?s.setActiveColor(a):(s.inputActive=!0,r.hsv=mi(t,e,i),t.onInput(n,t.id))}else 1===n&&(s.inputActive=!0,r.hsv=mi(t,e,i));t.onInput(n,t.id)}}),function(s,l,h){return be("div",Object.assign({},l,{className:"IroWheel",style:Object.assign({},{width:ki(e),height:ki(e),position:"relative"},h)}),be("div",{className:"IroWheelHue",style:Object.assign({},a,{transform:"rotateZ("+(t.wheelAngle+90)+"deg)",background:"clockwise"===t.wheelDirection?"conic-gradient(red, yellow, lime, aqua, blue, magenta, red)":"conic-gradient(red, magenta, blue, aqua, lime, yellow, red)"})}),be("div",{className:"IroWheelSaturation",style:Object.assign({},a,{background:"radial-gradient(circle closest-side, #fff, transparent)"})}),t.wheelLightness&&be("div",{className:"IroWheelLightness",style:Object.assign({},a,{background:"#000",opacity:1-n.v/100})}),be("div",{className:"IroWheelBorder",style:Object.assign({},a,wi(t))}),i.filter(function(t){return t!==r}).map(function(e){return be($i,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:o[e.index].x,y:o[e.index].y})}),be($i,{isActive:!0,index:r.index,fill:r.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:o[r.index].x,y:o[r.index].y}))})}var Ai=function(t){function e(e){var i=this;t.call(this,e),this.colors=[],this.inputActive=!1,this.events={},this.activeEvents={},this.deferredEvents={},this.id=e.id,(e.colors.length>0?e.colors:[e.color]).forEach(function(t){return i.addColor(t)}),this.setActiveColor(0),this.state=Object.assign({},e,{color:this.color,colors:this.colors,layout:e.layout})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.addColor=function(t,e){void 0===e&&(e=this.colors.length);var i=new li(t,this.onColorChange.bind(this));this.colors.splice(e,0,i),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),this.deferredEmit("color:init",i)},e.prototype.removeColor=function(t){var e=this.colors.splice(t,1)[0];e.unbind(),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),e.index===this.color.index&&this.setActiveColor(0),this.emit("color:remove",e)},e.prototype.setActiveColor=function(t){this.color=this.colors[t],this.state&&this.setState({color:this.color}),this.emit("color:setActive",this.color)},e.prototype.setColors=function(t,e){var i=this;void 0===e&&(e=0),this.colors.forEach(function(t){return t.unbind()}),this.colors=[],t.forEach(function(t){return i.addColor(t)}),this.setActiveColor(e),this.emit("color:setAll",this.colors)},e.prototype.on=function(t,e){var i=this,s=this.events;(Array.isArray(t)?t:[t]).forEach(function(t){(s[t]||(s[t]=[])).push(e),i.deferredEvents[t]&&(i.deferredEvents[t].forEach(function(t){e.apply(null,t)}),i.deferredEvents[t]=[])})},e.prototype.off=function(t,e){var i=this;(Array.isArray(t)?t:[t]).forEach(function(t){var s=i.events[t];s&&s.splice(s.indexOf(e),1)})},e.prototype.emit=function(t){for(var e=this,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var r=this.activeEvents;!!r.hasOwnProperty(t)&&r[t]||(r[t]=!0,(this.events[t]||[]).forEach(function(t){return t.apply(e,i)}),r[t]=!1)},e.prototype.deferredEmit=function(t){for(var e,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var r=this.deferredEvents;(e=this).emit.apply(e,[t].concat(i)),(r[t]||(r[t]=[])).push(i)},e.prototype.setOptions=function(t){this.setState(t)},e.prototype.resize=function(t){this.setOptions({width:t})},e.prototype.reset=function(){this.colors.forEach(function(t){return t.reset()}),this.setState({colors:this.colors})},e.prototype.onMount=function(t){this.el=t,this.deferredEmit("mount",this)},e.prototype.onColorChange=function(t,e){this.setState({color:this.color}),this.inputActive&&(this.inputActive=!1,this.emit("input:change",t,e)),this.emit("color:change",t,e)},e.prototype.emitInputEvent=function(t,e){0===t?this.emit("input:start",this.color,e):1===t?this.emit("input:move",this.color,e):2===t&&this.emit("input:end",this.color,e)},e.prototype.render=function(t,e){var i=this,s=e.layout;return Array.isArray(s)||(s=[{component:Ei},{component:Ii}],e.transparency&&s.push({component:Ii,options:{sliderType:"alpha"}})),be("div",{class:"IroColorPicker",id:e.id,style:{display:e.display}},s.map(function(t,s){var r=t.component,n=t.options;return be(r,Object.assign({},e,n,{ref:void 0,onInput:i.emitInputEvent.bind(i),parent:i,index:s}))}))},e}(Se);Ai.defaultProps=Object.assign({},{width:300,height:300,color:"#fff",colors:[],padding:6,layoutDirection:"vertical",borderColor:"#fff",borderWidth:0,handleRadius:8,activeHandleRadius:null,handleSvg:null,handleProps:{x:0,y:0},wheelLightness:!0,wheelAngle:0,wheelDirection:"anticlockwise",sliderSize:null,sliderMargin:12,boxHeight:null},{colors:[],display:"block",id:null,layout:"default",margin:null});var Li,Ti,Fi,Di=(Ti=function(t,e){var i,s=document.createElement("div");function r(){var e=t instanceof Element?t:document.querySelector(t);e.appendChild(i.base),i.onMount(e)}return function(t,e,i){var s,r,n;ce.__p&&ce.__p(t,e),r=(s=i===ge)?null:e.__k,t=be(we,null,[t]),n=[],Te(e,e.__k=t,r||fe,fe,void 0!==e.ownerSVGElement,r?null:_e.slice.call(e.childNodes),n,!1,fe,s),Fe(n,t)}(be(Li,Object.assign({},{ref:function(t){return i=t}},e)),s),"loading"!==document.readyState?r():document.addEventListener("DOMContentLoaded",r),i},Ti.prototype=(Li=Ai).prototype,Object.assign(Ti,Li),Ti.__component=Li,Ti);!function(t){var e;t.version="5.5.2",t.Color=li,t.ColorPicker=Di,(e=t.ui||(t.ui={})).h=be,e.ComponentBase=Pi,e.Handle=$i,e.Slider=Ii,e.Wheel=Ei,e.Box=Mi}(Fi||(Fi={}));var Ri=Fi;const Ni="wled_studio.color_swatches";function Oi(t){return t.trim()||"_default"}function Ui(){try{const t=localStorage.getItem(Ni);if(!t)return{};const e=JSON.parse(t);return e&&"object"==typeof e?e:{}}catch{return{}}}function zi(t){const e=Ui()[Oi(t)];return Array.isArray(e)?[...e]:[]}function Gi(t,e){const i=Ui();var s;i[Oi(t)]=e.slice(0,32),s=i,localStorage.setItem(Ni,JSON.stringify(s))}function Bi(t,e){return`${t[0]},${t[1]},${t[2]},${e}`}function Wi(t,e){const i="#"+[t[0],t[1],t[2]].map(t=>Math.max(0,Math.min(255,t)).toString(16).padStart(2,"0")).join("");return e>0?`${i} +W`:i.toUpperCase()}let Hi=class extends vt{constructor(){super(...arguments),this.controllerId="",this.rgb=[255,128,0],this.white=0,this._swatches=[],this._saving=!1,this._saveName="",this._editingId=null,this._editName="",this._pressTimer=null,this._pressSwatch=null,this._suppressChipClick=!1}onPoweredConnect(){this._reload()}updated(t){super.updated(t),t.has("controllerId")&&this._reload()}_reload(){this._swatches=zi(this.controllerId)}_currentKey(){return Bi(this.rgb,this.white)}_swatchCss(t){const[e,i,s]=t.rgb;return t.white>0?`linear-gradient(135deg, rgb(${e},${i},${s}) 55%, rgba(255,255,255,0.95) 55%)`:`rgb(${e},${i},${s})`}_apply(t){this.dispatchEvent(new CustomEvent("swatch-select",{detail:{rgb:[...t.rgb],white:t.white},bubbles:!0,composed:!0}))}_openSave(){this._saveName=Wi(this.rgb,this.white),this._saving=!0,this._editingId=null}_confirmSave(){!function(t,e){const i=zi(t),s=Bi(e.rgb,e.white),r=i.find(t=>Bi(t.rgb,t.white)===s);if(r)return r.name=e.name.trim()||r.name,Gi(t,i),r;const n={id:`sw_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`,name:e.name.trim()||Wi(e.rgb,e.white),rgb:[...e.rgb],white:e.white};i.unshift(n),Gi(t,i)}(this.controllerId,{name:this._saveName,rgb:this.rgb,white:this.white}),this._saving=!1,this._reload(),this.dispatchEvent(new CustomEvent("swatches-changed",{bubbles:!0,composed:!0}))}_cancelSave(){this._saving=!1}_startEdit(t,e){e.stopPropagation(),this._editingId=t.id,this._editName=t.name,this._saving=!1}_confirmEdit(){this._editingId&&(!function(t,e,i){const s=zi(t),r=s.findIndex(t=>t.id===e);if(r<0)return null;const n=s[r],o={...n,...i,rgb:i.rgb?[...i.rgb]:n.rgb};void 0!==i.name&&(o.name=i.name.trim()||Wi(o.rgb,o.white)),s[r]=o,Gi(t,s)}(this.controllerId,this._editingId,{name:this._editName}),this._editingId=null,this._reload())}_cancelEdit(){this._editingId=null}_delete(t,e){e?.stopPropagation(),function(t,e){const i=zi(t).filter(t=>t.id!==e);Gi(t,i)}(this.controllerId,t),this._editingId===t&&(this._editingId=null),this._reload(),this.dispatchEvent(new CustomEvent("swatches-changed",{bubbles:!0,composed:!0}))}_clearPressTimer(){null!==this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null),this._pressSwatch=null}_confirmDelete(t){confirm(`Delete swatch "${t.name}"?`)&&this._delete(t.id),this._suppressChipClick=!1}_onChipTouchStart(t){this._clearPressTimer(),this._pressSwatch=t,this._pressTimer=setTimeout(()=>{this._pressTimer=null,this._suppressChipClick=!0,this._confirmDelete(t)},500)}_onChipTouchEnd(){this._clearPressTimer()}_onChipTouchMove(t){if(!this._pressSwatch||1!==t.touches.length)return;const e=t.touches[0],i=t.currentTarget.getBoundingClientRect();(e.clientX<i.left-12||e.clientX>i.right+12||e.clientY<i.top-12||e.clientY>i.bottom+12)&&this._clearPressTimer()}_onChipClick(t,e){if(this._suppressChipClick)return this._suppressChipClick=!1,e.preventDefault(),void e.stopPropagation();this._apply(t)}render(){const t=this._currentKey();return W`
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

        ${this._saving?W`
              <div class="inline-form" role="form">
                <input
                  type="text"
                  class="name-input"
                  placeholder="Swatch name"
                  .value=${this._saveName}
                  @input=${t=>{this._saveName=t.target.value}}
                  @keydown=${t=>{"Enter"===t.key&&this._confirmSave(),"Escape"===t.key&&this._cancelSave()}}
                />
                <button type="button" class="primary" @click=${()=>this._confirmSave()}>
                  Save
                </button>
                <button type="button" class="ghost" @click=${()=>this._cancelSave()}>
                  Cancel
                </button>
              </div>
            `:null}

        ${this._editingId?W`
              <div class="inline-form" role="form">
                <input
                  type="text"
                  class="name-input"
                  .value=${this._editName}
                  @input=${t=>{this._editName=t.target.value}}
                  @keydown=${t=>{"Enter"===t.key&&this._confirmEdit(),"Escape"===t.key&&this._cancelEdit()}}
                />
                <button type="button" class="primary" @click=${()=>this._confirmEdit()}>
                  Rename
                </button>
                <button type="button" class="ghost" @click=${()=>this._cancelEdit()}>
                  Cancel
                </button>
              </div>
            `:null}

        ${0!==this._swatches.length||this._saving?W`
              <div class="grid" role="list">
                ${this._swatches.map(e=>W`
                    <div
                      class="chip-wrap ${Bi(e.rgb,e.white)===t?"active":""}"
                      role="listitem"
                    >
                      <button
                        type="button"
                        class="chip"
                        title=${e.name}
                        style="background: ${this._swatchCss(e)}"
                        @click=${t=>this._onChipClick(e,t)}
                        @touchstart=${()=>this._onChipTouchStart(e)}
                        @touchend=${()=>this._onChipTouchEnd()}
                        @touchcancel=${()=>this._onChipTouchEnd()}
                        @touchmove=${t=>this._onChipTouchMove(t)}
                        aria-label=${`Apply ${e.name}`}
                      ></button>
                      <span class="chip-name">${e.name}</span>
                      <div class="chip-actions">
                        <button
                          type="button"
                          class="icon"
                          aria-label=${`Rename ${e.name}`}
                          @click=${t=>this._startEdit(e,t)}
                        >
                          <ha-icon icon="mdi:pencil-outline"></ha-icon>
                        </button>
                        <button
                          type="button"
                          class="icon danger"
                          aria-label=${`Remove ${e.name}`}
                          @click=${t=>{t.stopPropagation(),this._confirmDelete(e)}}
                        >
                          <ha-icon icon="mdi:close"></ha-icon>
                        </button>
                      </div>
                    </div>
                  `)}
              </div>
            `:W`<p class="empty">Save colors you use often — tap a swatch to apply.</p>`}
      </section>
    `}static{this.styles=[...mt,o`
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
    `]}};t([ct()],Hi.prototype,"controllerId",void 0),t([ct({type:Array})],Hi.prototype,"rgb",void 0),t([ct({type:Number})],Hi.prototype,"white",void 0),t([dt()],Hi.prototype,"_swatches",void 0),t([dt()],Hi.prototype,"_saving",void 0),t([dt()],Hi.prototype,"_saveName",void 0),t([dt()],Hi.prototype,"_editingId",void 0),t([dt()],Hi.prototype,"_editName",void 0),Hi=t([bt("wled-color-swatch-bar")],Hi);let Vi=class extends vt{constructor(){super(...arguments),this.rgb=[255,128,0],this.white=0,this.awm=0,this.showWhite=!0,this.controllerId="",this._suppress=!1,this._lastSize=0}onPoweredConnect(){this.isPowered&&this.scheduleRaf(()=>{this.isPowered&&this._ensurePicker()})}firstUpdated(){this.isPowered&&this._bindResizeObserver()}onPoweredDisconnect(){this._destroyPicker(),super.onPoweredDisconnect()}updated(t){super.updated(t),this.isPowered?this.updateComplete.then(()=>{this.isConnected&&this.isPowered&&(this._ensurePicker(),this._picker&&t.has("rgb")&&this._syncPicker())}):this._destroyPicker()}_pickerInDom(){const t=this._host;return!!t&&Boolean(t.querySelector(".IroColorPicker, .IroWheel"))}_ensurePicker(){this._picker&&!this._pickerInDom()&&this._destroyPicker(),this._picker||this._tryMountOrResize()}_bindResizeObserver(){const t=this._host;t&&!this._ro&&(this._ro=new ResizeObserver(()=>{this.isPowered&&this._ensurePicker()}),this._ro.observe(t),this.addUnsub(()=>{this._ro?.disconnect(),this._ro=void 0}),this.isPowered&&this._ensurePicker())}_hostBox(t){const e=t.getBoundingClientRect();let i=e.width,s=e.height;if((i<8||s<8)&&(i=t.offsetWidth,s=t.offsetHeight),i<8||s<8){const e=getComputedStyle(t);i=parseFloat(e.width)||0,s=parseFloat(e.height)||0}if(i<8||s<8){const t=this.getBoundingClientRect();i=t.width||this.offsetWidth,s=t.height||this.offsetHeight}if(i>=8&&s<8&&(s=i),i<8&&s>=8&&(i=s),i<8&&s<8){const t=this.offsetWidth||280;i=Math.min(280,t),s=i}return{width:i,height:s}}_wheelSize(t,e){return function(t){const e=Math.floor(.7*t);return Math.max(180,Math.min(280,e||180))}(Math.min(t,e))}_tryMountOrResize(){const t=this._host;if(!t)return;const{width:e,height:i}=this._hostBox(t);if(e<8||i<8)return;const s=this._wheelSize(e,i);this._picker?s!==this._lastSize&&"function"==typeof this._picker.resize&&(this._picker.resize(s),this._lastSize=s):this._createPicker(t,s)}_borderColor(){return getComputedStyle(this).getPropertyValue("--wled-border").trim()||"rgba(255, 255, 255, 0.12)"}_createPicker(t,e){this._picker||(t.replaceChildren(),this._lastSize=e,this._picker=Ri.ColorPicker(t,{width:e,color:{r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},borderWidth:1,borderColor:this._borderColor(),layout:[{component:Ri.ui.Wheel}]}),this._picker.on("color:change",t=>{this._suppress||this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:[t.rgb.r,t.rgb.g,t.rgb.b],white:this.white},bubbles:!0,composed:!0}))}),this._syncPicker())}_destroyPicker(){this._host?.replaceChildren(),this._picker=void 0,this._lastSize=0}_syncPicker(){this._picker&&(this._suppress=!0,this._picker.color.rgb={r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},this._suppress=!1)}_onWhite(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:this.rgb,white:e},bubbles:!0,composed:!0}))}_onAwm(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("awm-change",{detail:{awm:e},bubbles:!0,composed:!0}))}_onSwatchSelect(t){this.dispatchEvent(new CustomEvent("color-change",{detail:t.detail,bubbles:!0,composed:!0}))}render(){return W`
      <div class="picker">
        <div class="wrap">
          <div class="wheel-host" aria-label="Color wheel"></div>
          <div class="extras">
            ${this.showWhite?W`
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
        ${this.controllerId?W`
              <wled-color-swatch-bar
                .controllerId=${this.controllerId}
                .rgb=${this.rgb}
                .white=${this.white}
                @swatch-select=${this._onSwatchSelect}
              ></wled-color-swatch-bar>
            `:null}
      </div>
    `}static{this.styles=[...mt,o`
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
    `]}};t([ct({type:Array,hasChanged:(t,e)=>!t||!e||!function(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}(t,e)})],Vi.prototype,"rgb",void 0),t([ct({type:Number})],Vi.prototype,"white",void 0),t([ct({type:Number})],Vi.prototype,"awm",void 0),t([ct({type:Boolean})],Vi.prototype,"showWhite",void 0),t([ct()],Vi.prototype,"controllerId",void 0),t([pt(".wheel-host")],Vi.prototype,"_host",void 0),Vi=t([bt("wled-color-wheel-rgbw")],Vi);function ji(t,e="strip",i,s=0){let r=String(t);return s&&(r=`${r}_p${s}`),i?.trim()&&(r=`${r}_${function(t){return(t||"").trim().replace(/[^\w.-]+/g,"_")||"unknown"}(i)}`),`${r}_${e}.webp`}function qi(t,e,i="strip",s,r=0){const n=e instanceof Set?e:new Set(e);if(!n.size)return;const o=[ji(t,i,s,r),ji(t,i,s),ji(t,i,void 0,r),ji(t,i)];for(const t of o)if(n.has(t))return t;const a=r?`${t}_p${r}_`:`${t}_`,l=`_${i}.webp`;for(const t of n)if(t.startsWith(a)&&t.endsWith(l))return t;return r?qi(t,n,i,s,0):void 0}function Ki(t,e,i="strip",s,r,n,o=0){if(!t||e<0)return;const a=void 0!==n?qi(e,n,i,s,o):ji(e,i,s,o);return a?function(t,e){if(!t.startsWith("/"))return t;const i=e?.auth?.data?.access_token;if(!i)return t;const s=t.includes("?")?"&":"?";return`${t}${s}auth=${encodeURIComponent(i)}`}(function(t,e){return`/local/wled_studio/thumbs/${encodeURIComponent(t)}/${encodeURIComponent(e)}`}(t,a),r):void 0}const Yi="wled_studio.recent_effects",Xi="wled_studio.recent_scenes";function Ji(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function Zi(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function Qi(t){return t?Ji(Yi)[t]??[]:[]}function ts(t,e=72,i=6,s=10){if(t<=0)return 1;const r=e+i;return Math.max(1,Math.min(s,Math.floor((t+i)/r)))}const es="wled_studio.pinned_effects";function is(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function ss(t,e,i){if(!t)return[];const s=is(es),r=s[t]??[],n=r.findIndex(t=>t.id===e);return n>=0?r.splice(n,1):r.unshift({id:e,name:i}),s[t]=r,function(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}(es,s),s[t]}let rs=class extends vt{constructor(){super(...arguments),this.fxId=0,this.thumbUrl="",this.thumbUrlAnimated="",this.label="",this.listboxOption=!1,this.selected=!1,this._hover=!1}render(){const t=this.thumbUrlAnimated||(this.thumbUrl.endsWith(".webp")?this.thumbUrl:""),e=this.thumbUrl||t,i=this._hover&&t?t:e,s=this.label||`Effect ${this.fxId}`;return W`
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
        ${i?W`<img
              class="thumb"
              src=${i}
              alt=""
              loading="lazy"
              decoding="async"
              @error=${t=>{t.target.style.display="none"}}
            />`:W`<span class="placeholder" aria-hidden="true"></span>`}
        <span class="label">${this.label}</span>
      </button>
    `}static{this.styles=[...mt,o`
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
    `]}};t([ct({type:Number})],rs.prototype,"fxId",void 0),t([ct()],rs.prototype,"thumbUrl",void 0),t([ct()],rs.prototype,"thumbUrlAnimated",void 0),t([ct()],rs.prototype,"label",void 0),t([ct({type:Boolean,attribute:"listbox-option"})],rs.prototype,"listboxOption",void 0),t([ct({type:Boolean})],rs.prototype,"selected",void 0),t([dt()],rs.prototype,"_hover",void 0),rs=t([bt("wled-effect-tile")],rs);let ns=class extends vt{constructor(){super(...arguments),this.effectsByName={},this.soundFlags=[],this.selectedFx=0,this.filter="",this.controllerId="",this.fwVer="",this.thumbBasenames=[],this.toggleOff=!0,this.showRecents=!0,this.tileGrid=!1,this.scrollPane=!1,this.selectedPalette=0,this.paletteAware=!1,this._category="all",this._recentEntries=[],this._pinnedEntries=[],this._recentVisible=6}onPoweredConnect(){this._loadRecents(),this._ro=new ResizeObserver(()=>this._measureRecents()),this.addUnsub(()=>this._ro?.disconnect())}updated(t){t.has("controllerId")&&this._loadRecents();const e=this.renderRoot.querySelector(".recent-row");e&&e!==this._recentRowEl&&(this._recentRowEl=e,this._ro?.observe(e),this._measureRecents())}_loadRecents(){var t;this._recentEntries=Qi(this.controllerId),this._pinnedEntries=(t=this.controllerId)?is(es)[t]??[]:[],this.soundFlags.length&&!this.soundFlags.some(t=>"v"===t||"f"===t)&&console.debug(`[wled-studio] sound_flags for ${this.controllerId} contain no v/f entries — Music filter will rely on name heuristics`)}_togglePin(t,e){e.stopPropagation(),this.controllerId&&(this._pinnedEntries=ss(this.controllerId,t,this._effectName(t)))}_measureRecents(){const t=this._recentRowEl;if(!t)return;const e=ts(t.clientWidth,76,6,10);e!==this._recentVisible&&(this._recentVisible=e)}_effectName(t){return Object.entries(this.effectsByName).find(([,e])=>e===t)?.[0]??`Effect ${t}`}render(){const t=this.filter.trim().toLowerCase(),e=Object.keys(this.effectsByName).sort((t,e)=>t.localeCompare(e)),i=jt(this.effectsByName),s=e.filter(e=>!!Kt(e,this.effectsByName[e],this._category,this.soundFlags,this.effectsByName)&&!(t&&!e.toLowerCase().includes(t))),r=this.showRecents&&!t&&this._recentEntries.length>0,n=this._recentEntries.slice(0,this._recentVisible),o=!t&&this._pinnedEntries.length>0;return W`
      <div
        class="wrap ${this.tileGrid?"tile-grid":""} ${this.scrollPane?"scroll-pane":""}"
      >
        ${o?W`
              <div class="recent-block">
                <span class="recent-label">Library</span>
                <div class="recent-row" role="group" aria-label="Pinned effects">
                  ${this._pinnedEntries.map(t=>{const e=t.id,s=t.name,r=e===this.selectedFx;return W`
                      <button
                        type="button"
                        class="recent-chip library ${r?"active":""}"
                        aria-label=${`Apply pinned effect ${s}`}
                        aria-pressed=${r?"true":"false"}
                        @click=${()=>this._pick(e,i)}
                      >
                        ${s}
                      </button>
                    `})}
                </div>
              </div>
            `:null}
        ${r?W`
              <div class="recent-block">
                <span class="recent-label">Recent</span>
                <div class="recent-row" role="group" aria-label="Recent effects">
                  ${n.map(t=>{const e=t.id,s=t.name,r=this.soundFlags[e],n=e===this.selectedFx;return W`
                      <button
                        type="button"
                        class="recent-chip ${n?"active":""}"
                        aria-label=${`Apply effect ${s}`}
                        aria-pressed=${n?"true":"false"}
                        @click=${()=>this._pick(e,i)}
                      >
                        ${s}
                        ${"v"===r?W`<span class="badge">♪</span>`:null}
                        ${"f"===r?W`<span class="badge">♫</span>`:null}
                        ${"2"===r?W`<span class="badge dim">2D</span>`:null}
                      </button>
                    `})}
                </div>
              </div>
            `:null}
        <div class="filters" role="tablist" aria-label="Effect categories">
          ${["all","1d","2d","sound","palette","solid"].map(t=>W`
              <button
                type="button"
                class="cat ${this._category===t?"active":""}"
                role="tab"
                aria-selected=${this._category===t?"true":"false"}
                @click=${()=>{this._category=t}}
              >
                ${Vt[t]}
              </button>
            `)}
        </div>
        <div class="grid" role="listbox" aria-label="Effects">
          ${0===s.length?W`<p class="empty">No effects match this filter.</p>`:s.map(t=>{const e=this.effectsByName[t],s=this.soundFlags[e],r=e===this.selectedFx,n=Ki(this.controllerId,e,"strip",this.fwVer,this.hass,this.thumbBasenames,this.paletteAware?this.selectedPalette:0),o=t+("v"===s?" ♪":"")+("f"===s?" ♫":"")+("2"===s?" 2D":"");return n?W`
                    <wled-effect-tile
                      class="chip-tile ${r?"active":""}"
                      listbox-option
                      .selected=${r}
                      .fxId=${e}
                      .thumbUrl=${n}
                      .label=${o}
                      @click=${()=>this._pick(e,i)}
                    ></wled-effect-tile>
                  `:W`
                  <button
                    type="button"
                    class="chip ${r?"active":""}"
                    role="option"
                    aria-selected=${r?"true":"false"}
                    aria-label=${o}
                    @click=${()=>this._pick(e,i)}
                  >
                    ${t}
                    ${"v"===s?W`<span class="badge" title="Volume reactive">♪</span>`:null}
                    ${"f"===s?W`<span class="badge" title="Frequency reactive">♫</span>`:null}
                    ${"2"===s?W`<span class="badge dim" title="2D matrix">2D</span>`:null}
                  </button>
                `})}
        </div>
        <div class="footer-row">
          <p class="count">${s.length} effects</p>
          ${this.controllerId&&this.selectedFx>=0?W`
                <button
                  type="button"
                  class="pin-btn"
                  title="Pin to library"
                  aria-label="Pin current effect to library"
                  @click=${t=>this._togglePin(this.selectedFx,t)}
                >
                  <ha-icon
                    .icon=${this._pinnedEntries.some(t=>t.id===this.selectedFx)?"mdi:star":"mdi:star-outline"}
                  ></ha-icon>
                </button>
              `:null}
        </div>
      </div>
    `}_pick(t,e){this.toggleOff&&t===this.selectedFx?this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:e,toggledOff:!0},bubbles:!0,composed:!0})):(this.showRecents&&this.controllerId&&(this._recentEntries=function(t,e,i,s){if(!t)return[];if(e===(s.solidId??0))return Qi(t);const r=Ji(Yi),n=(r[t]??[]).filter(t=>t.id!==e);return n.unshift({id:e,name:i}),r[t]=n.slice(0,10),Zi(Yi,r),r[t]}(this.controllerId,t,this._effectName(t),{solidId:e})),this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:t,toggledOff:!1},bubbles:!0,composed:!0})))}static{this.styles=[...mt,o`
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
    `]}};t([ct({type:Object})],ns.prototype,"effectsByName",void 0),t([ct({type:Array})],ns.prototype,"soundFlags",void 0),t([ct({type:Number})],ns.prototype,"selectedFx",void 0),t([ct({type:String})],ns.prototype,"filter",void 0),t([ct()],ns.prototype,"controllerId",void 0),t([ct()],ns.prototype,"fwVer",void 0),t([ct({type:Array})],ns.prototype,"thumbBasenames",void 0),t([ct({type:Boolean})],ns.prototype,"toggleOff",void 0),t([ct({type:Boolean})],ns.prototype,"showRecents",void 0),t([ct({type:Boolean,attribute:"tile-grid"})],ns.prototype,"tileGrid",void 0),t([ct({type:Boolean,attribute:"scroll-pane"})],ns.prototype,"scrollPane",void 0),t([ct({type:Number})],ns.prototype,"selectedPalette",void 0),t([ct({type:Boolean,attribute:"palette-aware"})],ns.prototype,"paletteAware",void 0),t([dt()],ns.prototype,"_category",void 0),t([dt()],ns.prototype,"_recentEntries",void 0),t([dt()],ns.prototype,"_pinnedEntries",void 0),t([dt()],ns.prototype,"_recentVisible",void 0),ns=t([bt("wled-effect-chips")],ns);let os=class extends vt{constructor(){super(...arguments),this.controllerId="",this.segments=[],this.editIds=[],this.pixelCount=210,this.compact=!1,this._merged=!1,this._busy=!1,this._error=""}onPoweredConnect(){this._merged=te(this.controllerId)}willUpdate(t){t.has("controllerId")&&(this._merged=te(this.controllerId))}render(){const t=se(this.controllerId),e=t&&this._merged?`${t.segments.length} segment layout saved`:null;return W`
      <label class="merge-row ${this._merged?"on":""} ${this.compact?"compact":""}">
        <input
          type="checkbox"
          .checked=${this._merged}
          ?disabled=${this._busy||!this.connection}
          @change=${this._onToggle}
        />
        <span class="merge-label">
          <strong>Merge for effects</strong>
          ${this.compact?null:W`
                <span class="sub">
                  Combine highlighted segments into one span so chase-style effects
                  run across LED indices. Uncheck to restore the layout saved when
                  you merged.
                </span>
              `}
          ${e&&!this.compact?W`<span class="saved">${e}</span>`:null}
        </span>
      </label>
      ${this._error?W`<p class="err">${this._error}</p>`:null}
      ${this._busy?W`<p class="busy">Updating segments…</p>`:null}
    `}async _onToggle(t){const e=t.target.checked;if(this.connection&&this.controllerId){this._busy=!0,this._error="";try{if(e){const t=await Tt(this.connection,this.controllerId),e=t.segments??this.segments,i=t.info?.leds,s=Number(i?.count)||this.pixelCount;re(this.controllerId,e,s);const r=oe(e,s,this.editIds.length?this.editIds:void 0);await Ft(this.connection,this.controllerId,r,{fullResponse:!0}),ie(this.controllerId,!0),this._merged=!0}else{const t=se(this.controllerId);if(!t)throw new Error("No saved segment layout to restore");await Ft(this.connection,this.controllerId,ne(t),{fullResponse:!0}),ie(this.controllerId,!1),function(t){const e=Zt(Yt);delete e[t],Qt(Yt,e)}(this.controllerId),this._merged=!1}this.dispatchEvent(new CustomEvent("merge-changed",{detail:{merged:this._merged},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(e){this._error=e instanceof Error?e.message:String(e),t.target.checked=this._merged}finally{this._busy=!1}}}static{this.styles=[...mt,o`
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
      .merge-row.compact {
        padding: 6px 10px;
        margin-bottom: 8px;
        align-items: center;
      }
      .merge-row.compact .merge-label {
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
    `]}};t([ct({attribute:!1})],os.prototype,"connection",void 0),t([ct()],os.prototype,"controllerId",void 0),t([ct({type:Array})],os.prototype,"segments",void 0),t([ct({type:Array})],os.prototype,"editIds",void 0),t([ct({type:Number})],os.prototype,"pixelCount",void 0),t([ct({type:Boolean,reflect:!0})],os.prototype,"compact",void 0),t([dt()],os.prototype,"_merged",void 0),t([dt()],os.prototype,"_busy",void 0),t([dt()],os.prototype,"_error",void 0),os=t([bt("wled-effect-merge-toggle")],os);const as={default:"linear-gradient(90deg, #000 0%, #444 50%, #fff 100%)","random cycle":"linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",lava:"linear-gradient(90deg, #000 0%, #800 25%, #f40 55%, #fc0 100%)",ocean:"linear-gradient(90deg, #001028 0%, #004080 40%, #0088cc 70%, #aaf 100%)",forest:"linear-gradient(90deg, #020 0%, #060 30%, #080 55%, #0a0 80%, #5f5 100%)",rainbow:"linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)","rainbow bands":"repeating-linear-gradient(90deg, #f00 0 8%, #ff0 8% 16%, #0f0 16% 24%, #0ff 24% 32%, #00f 32% 40%, #f0f 40% 48%)",sunset:"linear-gradient(90deg, #102 0%, #804 35%, #f60 65%, #fc0 100%)",rivendell:"linear-gradient(90deg, #234 0%, #356 45%, #8ab 100%)",breeze:"linear-gradient(90deg, #246 0%, #48a 50%, #bdf 100%)","red & blue":"linear-gradient(90deg, #900 0%, #900 45%, #009 55%, #009 100%)",yellowout:"linear-gradient(90deg, #000 0%, #880 40%, #ff0 100%)",analogous:"linear-gradient(90deg, #f80, #ff0, #8f0, #0f8)",splash:"linear-gradient(90deg, #08f, #0fa, #8f0, #fa0, #f08)",pastel:"linear-gradient(90deg, #f9a, #fd9, #9f9, #9cf, #c9f)","sunset 2":"linear-gradient(90deg, #201 0%, #906 40%, #f84 75%, #fe8 100%)",beech:"linear-gradient(90deg, #210 0%, #630 35%, #a80 70%, #da8 100%)",mint:"linear-gradient(90deg, #042 0%, #086 50%, #6fc 100%)","april night":"linear-gradient(90deg, #012 0%, #248 45%, #48c 75%, #acf 100%)",orangery:"linear-gradient(90deg, #310 0%, #f70 55%, #fc8 100%)",c9:"linear-gradient(90deg, #f00 0%, #f00 20%, #0f0 20%, #0f0 40%, #08f 40%, #08f 60%, #ff0 60%, #ff0 80%, #f0f 80%, #f0f 100%)",sakura:"linear-gradient(90deg, #304 0%, #c68 50%, #fbd 100%)",aurora:"linear-gradient(90deg, #020 0%, #0a6 35%, #28f 65%, #8af 100%)",atlantica:"linear-gradient(90deg, #024 0%, #068 40%, #0ac 70%, #4ef 100%)","c9 2":"linear-gradient(90deg, #f44, #4f4, #44f, #ff4, #f4f)","c9 new":"linear-gradient(90deg, #e33, #3e3, #33e, #ee3, #e3e)",magenta:"linear-gradient(90deg, #400 0%, #808 50%, #f0f 100%)",magred:"linear-gradient(90deg, #808 0%, #c04 50%, #f00 100%)",yelmag:"linear-gradient(90deg, #ff0 0%, #f80 50%, #f0f 100%)",yelblu:"linear-gradient(90deg, #ff0 0%, #0af 100%)","orange & teal":"linear-gradient(90deg, #f70 0%, #f70 48%, #088 52%, #088 100%)",tiamat:"linear-gradient(90deg, #208 0%, #408 30%, #80c 60%, #c4f 100%)","fire & ice":"linear-gradient(90deg, #f40 0%, #fc0 35%, #08f 65%, #acf 100%)",cyberpunk:"linear-gradient(90deg, #f0f 0%, #0ff 50%, #ff0 100%)","cyberpunk 2":"linear-gradient(90deg, #80f 0%, #0fa 45%, #f08 100%)","color gradient":"linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f)","color bands":"repeating-linear-gradient(90deg, #f00 0 12%, #ff0 12% 24%, #0f0 24% 36%, #0ff 36% 48%, #00f 48% 60%, #f0f 60% 72%)",party:"linear-gradient(90deg, #f00, #0f0, #00f, #ff0, #f0f, #0ff)",cloud:"linear-gradient(90deg, #456 0%, #789 50%, #cde 100%)",lava2:"linear-gradient(90deg, #100 0%, #a00 40%, #f60 75%, #ff0 100%)",ocean2:"linear-gradient(90deg, #012 0%, #036 40%, #09c 75%, #6df 100%)",pinkpurple:"linear-gradient(90deg, #608 0%, #a0a 50%, #f8f 100%)",esrever:"linear-gradient(90deg, #fff 0%, #888 50%, #000 100%)","empty slot":"linear-gradient(90deg, #333 0%, #555 50%, #333 100%)"};function ls(t,e,i){const s=i?.[String(e)];return s||function(t){const e=t.toLowerCase().trim(),i=as[e];if(i)return i;const s=function(t){let e=0;for(let i=0;i<t.length;i++)e=31*e+t.charCodeAt(i)>>>0;return e%360}(e);return`linear-gradient(90deg, hsl(${s} 75% 35%), hsl(${(s+72)%360} 80% 48%), hsl(${(s+144)%360} 75% 58%))`}(t)}let hs=class extends vt{constructor(){super(...arguments),this.palettesByName={},this.palettePreviews={},this.selectedPal=0,this.filter="",this.deviceHost="",this.compact=!1,this.collapsible=!1,this._open=!0,this._localFilter="",this._editorOpen=!1}willUpdate(t){t.has("filter")&&this.filter!==this._localFilter&&(this._localFilter=this.filter)}_paletteName(t){return Object.entries(this.palettesByName).find(([,e])=>e===t)?.[0]??`Palette ${t}`}_gradient(t,e){return ls(t,e,this.palettePreviews)}_editorUrl(){const t=this.deviceHost.trim();if(!t)return null;return`${t.startsWith("http")?t.replace(/\/$/,""):`http://${t}`}/cpal.htm`}_renderEditorActions(t){return t?W`
      <div class="editor-actions">
        <button type="button" class="editor-btn" @click=${()=>this._openEditor()}>
          <ha-icon icon="mdi:palette-swatch-outline"></ha-icon>
          Edit palettes
        </button>
        <a class="editor-link" href=${t} target="_blank" rel="noopener noreferrer">
          Open in new tab
        </a>
      </div>
    `:null}_openEditor(){this._editorOpen=!0}_closeEditor(){this._editorOpen=!1,this.dispatchEvent(new CustomEvent("palette-catalog-changed",{bubbles:!0,composed:!0}))}render(){const t=(this._localFilter||this.filter).trim().toLowerCase(),e=Object.keys(this.palettesByName).sort((t,e)=>t.localeCompare(e)),i=e.filter(e=>!t||e.toLowerCase().includes(t)),s=this._paletteName(this.selectedPal),r=this._editorUrl(),n=W`
      <input
        class="search"
        type="search"
        placeholder="Search palettes…"
        aria-label="Filter palettes"
        .value=${this._localFilter}
        @input=${t=>{this._localFilter=t.target.value}}
      />
      <div class="list" role="listbox" aria-label="Palettes">
        ${0===i.length?W`<p class="empty">No palettes match.</p>`:i.map(t=>{const e=this.palettesByName[t],i=e===this.selectedPal;return W`
                <button
                  type="button"
                  class="row ${i?"active":""}"
                  role="option"
                  aria-selected=${i?"true":"false"}
                  aria-label=${t}
                  @click=${()=>this._pick(e)}
                >
                  <span
                    class="swatch"
                    style=${`background:${this._gradient(t,e)}`}
                  ></span>
                  <span class="name">${t}</span>
                  ${i?W`<span class="dot" aria-hidden="true"></span>`:null}
                </button>
              `})}
      </div>
      ${this._renderEditorActions(r)}
      <p class="count">${i.length} palette${1===i.length?"":"s"}</p>
    `,o=this._editorOpen&&r?W`
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
          `:null;return this.collapsible?W`
        <details
          class="wrap collapsible ${this.compact?"compact":""}"
          ?open=${this._open}
          @toggle=${t=>{this._open=t.target.open}}
        >
          <summary class="summary">
            <span class="summary-label">Palette</span>
            <span
              class="summary-preview"
              style=${`background:${this._gradient(s,this.selectedPal)}`}
            ></span>
            <span class="summary-name">${s}</span>
          </summary>
          ${n}
        </details>
        ${o}
      `:W`
      <div class="wrap ${this.compact?"compact":""}">
        <div class="head">
          <span class="head-label">Palette</span>
          ${r?W`
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
        ${n}
      </div>
      ${o}
    `}_pick(t){this.dispatchEvent(new CustomEvent("palette-select",{detail:{paletteId:t},bubbles:!0,composed:!0}))}static{this.styles=[...mt,o`
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
    `]}};t([ct({type:Object})],hs.prototype,"palettesByName",void 0),t([ct({type:Object})],hs.prototype,"palettePreviews",void 0),t([ct({type:Number})],hs.prototype,"selectedPal",void 0),t([ct()],hs.prototype,"filter",void 0),t([ct()],hs.prototype,"deviceHost",void 0),t([ct({type:Boolean})],hs.prototype,"compact",void 0),t([ct({type:Boolean,attribute:"collapsible"})],hs.prototype,"collapsible",void 0),t([dt()],hs.prototype,"_open",void 0),t([dt()],hs.prototype,"_localFilter",void 0),t([dt()],hs.prototype,"_editorOpen",void 0),hs=t([bt("wled-palette-chips")],hs);let cs=class extends vt{constructor(){super(...arguments),this.presets=[]}render(){const t=this.presets.filter(t=>t.ql),e=this.presets.filter(t=>!t.ql||t.name);return W`
      <div class="bar" aria-label="WLED presets">
        ${t.length?W`
              <div class="ql-row">
                ${t.map(t=>W`
                    <button
                      class="ql"
                      title=${t.name}
                      @click=${()=>this._pick(t.id)}
                    >
                      ${t.ql}
                    </button>
                  `)}
              </div>
            `:null}
        <ul class="named-list">
          ${e.map(t=>W`
              <li>
                <button class="named" @click=${()=>this._pick(t.id)}>
                  <span class="id">${t.id}</span>
                  <span class="name">${t.name}</span>
                  ${t.ql?W`<span class="ql-badge">${t.ql}</span>`:null}
                </button>
              </li>
            `)}
        </ul>
      </div>
    `}_pick(t){this.dispatchEvent(new CustomEvent("preset-select",{detail:{presetId:t},bubbles:!0,composed:!0}))}static{this.styles=[...mt,o`
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
    `]}};t([ct({type:Array})],cs.prototype,"presets",void 0),cs=t([bt("wled-preset-bar")],cs);const ds=["For each","Bar","Arc","Corner"],ps=["Replace","Add","Subtract","Multiply","Lighten","Darken"],us=["Off","GEQ pulse","WaveSin","Sweep"];let gs=class extends vt{constructor(){super(...arguments),this.compact=!1}_emit(t){this.dispatchEvent(new CustomEvent("segment-patch",{detail:t,bubbles:!0,composed:!0}))}_num(t,e,i,s){const r=this.segment;if(!r)return null;const n=r[t]??i;return W`
      <label class="cell">
        <span class="cell-label">${e}<span class="cell-val">${n}</span></span>
        <ha-slider
          min=${i}
          max=${s}
          step="1"
          .value=${n}
          @change=${e=>{const i=Number(e.target.value);this._emit({[t]:i})}}
        ></ha-slider>
      </label>
    `}_bool(t,e){const i=this.segment;if(!i)return null;const s=Boolean(i[t]);return W`
      <label class="check">
        <input
          type="checkbox"
          .checked=${s}
          @change=${e=>this._emit({[t]:e.target.checked})}
        />
        <span>${e}</span>
      </label>
    `}_select(t,e,i){const s=this.segment;if(!s)return null;const r=s[t]??0;return W`
      <label class="cell">
        <span class="cell-label">${e}</span>
        <select
          .value=${String(r)}
          @change=${e=>{const i=Number(e.target.value);this._emit({[t]:i})}}
        >
          ${i.map((t,e)=>W`<option value=${e} ?selected=${e===r}>${t}</option>`)}
        </select>
      </label>
    `}render(){if(!this.segment)return null;const t=this.meta,e=[];for(const i of["o1","o2","o3"])if(t?.sliders?.[i]){const s="string"==typeof t.defaults?.[i]&&t.defaults[i].trim()?t.defaults[i]:i.toUpperCase();e.push({key:i,label:s})}return W`
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
        ${e.length?W`
              <div class="flags">
                ${e.map(t=>this._bool(t.key,t.label))}
              </div>
            `:null}
        <div class="grid">
          ${this._select("si","Sound simulation",us)}
          ${this._select("m12","1D-in-2D mode",ds)}
          ${this._select("bm","Blend mode",ps)}
        </div>
      </details>
    `}static{this.styles=[...mt,o`
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
    `]}};t([ct({attribute:!1})],gs.prototype,"segment",void 0),t([ct({attribute:!1})],gs.prototype,"meta",void 0),t([ct({type:Boolean})],gs.prototype,"compact",void 0),gs=t([bt("wled-segment-advanced")],gs);let fs=class extends vt{constructor(){super(...arguments),this.width="100%",this.height="1rem",this.roundedFull=!1}render(){return W`
      <div
        class="block ${this.roundedFull?"pill":""}"
        style="width:${this.width};height:${this.height}"
        aria-hidden="true"
      ></div>
    `}static{this.styles=[...mt,o`
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
    `]}};function _s(t){return e=function(t){if(!t)return 0;const e=t.attributes?.brightness_pct;if("number"==typeof e&&Number.isFinite(e))return Math.max(0,Math.min(100,Math.round(e)));const i=t.attributes?.brightness;return"number"==typeof i&&Number.isFinite(i)?Math.round(Math.max(0,Math.min(255,i))/255*100):"on"===t.state?100:0}(t),Math.round(Math.max(0,Math.min(100,e))/100*255);var e}t([ct()],fs.prototype,"width",void 0),t([ct()],fs.prototype,"height",void 0),t([ct({type:Boolean,attribute:"rounded-full"})],fs.prototype,"roundedFull",void 0),fs=t([bt("wled-skeleton")],fs);const ms={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let vs=class extends vt{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this.wholeMode=!1,this.hideSegmentBrightness=!1,this.selectedSegId=-1,this.masterEntity="",this._loading=!0,this._error="",this._segId=0,this._editIds=[],this._segments=[],this._effectFilter="",this._presets=[],this._colorSlot=0,this._mergeActive=!1,this._saveSceneOpen=!1,this._saveSceneName="",this._lastMasterBri255=null,this._lastHaColorKey="",this._dragSegId=null}updated(t){super.updated(t),t.has("hass")&&this.hass&&(this.masterEntity&&this._syncFromMasterEntity(),this._syncColorFromHaEntity()),t.has("masterEntity")&&this.masterEntity&&this.hass&&this._syncFromMasterEntity(),(t.has("_segId")||t.has("_colorSlot"))&&this.hass&&this._syncColorFromHaEntity()}applyGlobalBrightness(t){const e=Math.max(0,Math.min(255,Math.round(t)));this._lastMasterBri255=e,this._segments.length&&(this._segments=this._segments.map(t=>({...t,bri:e})),this.requestUpdate())}_syncFromMasterEntity(){if(!this.hass||!this.masterEntity)return;const t=_s(this.hass.states[this.masterEntity]);this._lastMasterBri255!==t&&this.applyGlobalBrightness(t)}_syncColorFromHaEntity(){if(!this.hass)return;const t=this._colorEntityId();if(!t)return;const e=function(t){if(!t)return null;const e=t.attributes?.rgbw_color;if(Array.isArray(e)&&e.length>=3)return[Number(e[0])||0,Number(e[1])||0,Number(e[2])||0,Number(e[3])||0];const i=t.attributes?.rgb_color;return Array.isArray(i)&&i.length>=3?[Number(i[0])||0,Number(i[1])||0,Number(i[2])||0,0]:null}(this.hass.states[t]);if(!e)return;const i=`${t}:${e[0]},${e[1]},${e[2]},${e[3]}`;if(i===this._lastHaColorKey)return;const s=this._activeSeg();if(!s)return;const r=this._cols(s),n=r[this._colorSlot]??r[0];if(n[0]===e[0]&&n[1]===e[1]&&n[2]===e[2]&&n[3]===e[3])return void(this._lastHaColorKey=i);this._lastHaColorKey=i,r[this._colorSlot]=e;const o=this._segments.findIndex(t=>t.id===s.id);if(o<0)return;const a=[...this._segments];a[o]={...a[o],col:r.map(t=>[t[0],t[1],t[2],t[3]])},this._segments=a,this.requestUpdate()}_colorEntityId(){if(this.wholeMode&&this.masterEntity)return this.masterEntity;const t=this._activeSeg();return t?zt(t.id,this._snapshot?.segment_entities??[])??"":""}onPoweredConnect(){this._mergeActive=te(this.controllerId),this._load()}willUpdate(t){t.has("selectedSegId")&&this.selectedSegId>=0&&(this._segId=this.selectedSegId,this._refreshMeta()),(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&(this._optimistic?.cancel(),this._optimistic=he(this.connection,this.controllerId,(t,e)=>this._reconcile(t,e)),this._load())}onPoweredDisconnect(){this._optimistic?.cancel(),this._optimistic=void 0}get highlightSegmentIds(){return this._targetIds()}_emitTargetsChanged(){this.dispatchEvent(new CustomEvent("segment-targets-changed",{detail:{segmentId:this._segId,editIds:[...this._editIds],mergeActive:this._mergeActive,highlightIds:this.highlightSegmentIds},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("segment-change",{detail:{segmentId:this._segId,editIds:[...this._editIds]},bubbles:!0,composed:!0}))}selectSegment(t){if(this._mergeActive)return this._segId=0,void this._refreshMeta();this._editIds.includes(t)||(this._editIds=[...this._editIds,t].sort((t,e)=>t-e)),this._segId=t,this._colorSlot=0,this._refreshMeta(),this._syncSelToDevice(),this._emitTargetsChanged()}async _refreshPalettePreviews(){if(this.connection&&this.controllerId&&this._snapshot)try{const t=await Rt(this.connection,this.controllerId);this._snapshot={...this._snapshot,palette_previews:t}}catch{}}async _load(){if(this.connection&&this.controllerId){this._loading=!0,this._error="";try{const t=await Tt(this.connection,this.controllerId);if(this._snapshot=t,this._segments=[...t.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length){const t=this._segments.map(t=>t.id);t.includes(this._segId)||(this._segId=this._segments[0].id);const e=this._editIds.filter(e=>t.includes(e));this._editIds=e.length?e:[this._segId]}await this._refreshMeta(),await this._loadPresets(),this._mergeActive=te(this.controllerId);const e=this._pixelCount();this._mergeActive&&ee(this._segments,e)&&(this._editIds=ae(this._segments),this._segId=this._editIds[0]??0),this.wholeMode&&this._segments.length&&(this._editIds=this._segments.map(t=>t.id),this._segId=this._segments[0].id),this._emitTargetsChanged()}catch(t){this._error=Ht(t)}finally{this._loading=!1,null!==this._lastMasterBri255&&this.applyGlobalBrightness(this._lastMasterBri255)}}}async _loadPresets(){if(this.connection&&this.controllerId)try{const t=await async function(t,e){return(await t.sendMessagePromise({type:"wled_studio/get_presets",schema_version:1,controller_id:e})).presets??{}}(this.connection,this.controllerId),e=[];for(const[i,s]of Object.entries(t)){if(!s||"object"!=typeof s)continue;const t=s;e.push({id:i,name:String(t.n??t.name??`Preset ${i}`),ql:t.ql?String(t.ql):void 0})}e.sort((t,e)=>Number(t.id)-Number(e.id)),this._presets=e}catch{this._presets=[]}}_reconcile(t,e){const i=this._segments.findIndex(e=>e.id===t.id);if(i>=0){const e=[...this._segments];e[i]={...e[i],...t,id:t.id},this._segments=e}e?wt(this,e):this.requestUpdate()}_activeSeg(){return this._segments.find(t=>t.id===this._segId)??this._segments[0]}async _refreshMeta(){const t=this._activeSeg();this.connection&&this.controllerId&&t&&(this._meta=await Dt(this.connection,this.controllerId,t.fx??0))}async _syncHaSegment(t,e){if(!this.hass)return;const i=zt(t.id,this._snapshot?.segment_entities??[]);if(!i)return;const s={entity_id:i};if(e.col?.length){const t=Nt(e.col[0]);t[3]>0?s.rgbw_color=[t[0],t[1],t[2],t[3]]:s.rgb_color=[t[0],t[1],t[2]]}if(void 0!==e.bri&&(s.brightness=e.bri),void 0!==e.fx&&this._snapshot?.effects_by_name){const t=Object.entries(this._snapshot.effects_by_name).find(([,t])=>t===e.fx)?.[0];t&&(s.effect=t)}!1!==e.on?Object.keys(s).length>1&&await this.hass.callService("light","turn_on",s):await this.hass.callService("light","turn_off",{entity_id:i})}_pixelCount(){const t=this._snapshot?.info?.leds;return Number(t?.count)||210}_targetIds(){if(this.wholeMode&&this._segments.length)return this._segments.map(t=>t.id);if(this._mergeActive){const t=ae(this._segments);return t.length?t:[0]}return this._editIds.length?this._editIds:[this._segId]}_onMergeChanged(){this._mergeActive=te(this.controllerId),this._load(),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}_patchSeg(t){const e=this._targetIds();if(!e.length||!this._optimistic)return;const i=[...this._segments];for(const s of e){const e=i.findIndex(t=>t.id===s);if(e<0)continue;const r=i[e];i[e]={...r,...t,id:s,sel:!0,on:void 0!==t.on?t.on:!1!==r.on},this._syncHaSegment(r,t)}this._segments=i;const s=this._activeSeg();this._optimistic.push(Gt(e,t,this._segments),s??{id:e[0]})}async _syncSelToDevice(){if(!this.connection||!this.controllerId||!this._segments.length)return;const t=this._targetIds();await Ft(this.connection,this.controllerId,function(t,e){const i=new Set(t);return{seg:e.map(t=>({id:t.id,sel:i.has(t.id)}))}}(t,this._segments)),this._segments=this._segments.map(e=>({...e,sel:t.includes(e.id)}))}_toggleSegEdit(t){if(this._mergeActive)return;let e=Bt(this._editIds,t);e.length||(e=[t]),this._editIds=e,this._segId=t,this._colorSlot=0,this._refreshMeta(),this._syncSelToDevice(),this._emitTargetsChanged()}_reorderSegmentsVisual(t,e){const i=this._segments.findIndex(e=>e.id===t),s=this._segments.findIndex(t=>t.id===e);if(i<0||s<0||i===s)return;const r=[...this._segments],[n]=r.splice(i,1);r.splice(s,0,n),this._segments=r}_onSegDragStart(t,e){this._dragSegId=t,e.dataTransfer?.setData("text/plain",String(t)),e.dataTransfer&&(e.dataTransfer.effectAllowed="move")}_onSegDragOver(t,e){e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="move")}_onSegDrop(t,e){e.preventDefault();const i=this._dragSegId;this._dragSegId=null,null!==i&&i!==t&&this._reorderSegmentsVisual(i,t)}_onSegDragEnd(){this._dragSegId=null}async _onEffectSelect(t){this._patchSeg({fx:t.detail.effectId}),await this._refreshMeta()}_cols(t){const e=t.col??[],i=[];for(let t=0;t<3;t++)i.push(Nt(e[t]));return i}_onColor(t){const e=this._activeSeg();if(!e)return;const{rgb:i,white:s}=t.detail;this._lastHaColorKey=`${this._colorEntityId()}:${i[0]},${i[1]},${i[2]},${s}`;const r=this._cols(e);r[this._colorSlot]=[i[0],i[1],i[2],s];const n=jt(this._snapshot?.effects_by_name??{});this._patchSeg({col:r.map(t=>[t[0],t[1],t[2],t[3]]),fx:n}),this._refreshMeta()}async _onAwm(t){const e=t.detail.awm;if(this.connection&&this.controllerId)try{const t=await async function(t,e,i,s=0){return await Pt(t),(await t.sendMessagePromise({type:"wled_studio/apply_rgbwm",schema_version:1,controller_id:e,rgbwm:i,bus_index:s})).rgbwm??i}(this.connection,this.controllerId,e);this._snapshot&&(this._snapshot={...this._snapshot,rgbwm:t}),this.requestUpdate()}catch(t){wt(this,t instanceof Error?t.message:String(t))}}_slider(t,e){const i=Number(e.target.value);this._patchSeg({[t]:i})}async _loadPreset(t){this.connection&&this.controllerId&&(await Ft(this.connection,this.controllerId,{ps:Number(t)}),await this._load())}_renderSkeleton(){return W`
      <div class="skeleton-load" aria-busy="true" aria-label="Loading segments">
        <wled-skeleton height="2rem" width="100%"></wled-skeleton>
        <wled-skeleton height="220px" width="min(100%, 280px)"></wled-skeleton>
        <wled-skeleton height="1rem" width="70%"></wled-skeleton>
        <div class="sk-grid">
          ${Array.from({length:4},()=>W`<wled-skeleton height="56px"></wled-skeleton>`)}
        </div>
      </div>
    `}render(){if(this._loading)return this._renderSkeleton();if(this._error)return W`<p class="err">${this._error}</p>`;const t=this._activeSeg();if(!t)return W`<p class="muted">No segments on this controller.</p>`;const e=this._cols(t),i=e[this._colorSlot]??e[0],s=this._meta,r=s?.sliders??{},n=!1!==s?.colors_enabled?3:1,o=this._snapshot?.rgbwm??0;return W`
      <div class="controls ${this.compact?"compact":""}">
        ${this.wholeMode?W`<p class="seg-hint whole">Whole strip — color and effects apply to all segments.</p>`:null}
        ${!this.wholeMode&&this.connection&&this.controllerId?W`
              <wled-effect-merge-toggle
                ?compact=${this.compact}
                class=${this.compact?"compact-merge":""}
                .connection=${this.connection}
                .controllerId=${this.controllerId}
                .segments=${this._segments}
                .editIds=${this._editIds}
                .pixelCount=${this._pixelCount()}
                @merge-changed=${this._onMergeChanged}
              ></wled-effect-merge-toggle>
            `:null}
        ${this.wholeMode?null:this._mergeActive?W`<p class="seg-hint">Merge active — effects apply to the combined segment.</p>`:W`<p class="seg-hint">Tap segments to toggle editing — changes apply to all highlighted segments.</p>`}
        ${this.wholeMode||this._mergeActive?null:W`
        <div class="seg-bar" role="group" aria-label="Segments">
          ${this._segments.map(t=>W`
              <button
                class="seg-tab ${this._editIds.includes(t.id)?"editing":""} ${t.id===this._segId?"focus":""} ${this._dragSegId===t.id?"dragging":""}"
                aria-pressed=${this._editIds.includes(t.id)}
                @click=${()=>this._toggleSegEdit(t.id)}
                @dragover=${e=>this._onSegDragOver(t.id,e)}
                @drop=${e=>this._onSegDrop(t.id,e)}
              >
                ${this.compact?null:W`
                      <span
                        class="seg-drag-handle"
                        draggable="true"
                        aria-hidden="true"
                        title="Drag to reorder (preview only)"
                        @dragstart=${e=>this._onSegDragStart(t.id,e)}
                        @dragend=${()=>this._onSegDragEnd()}
                        @click=${t=>t.stopPropagation()}
                        @mousedown=${t=>t.stopPropagation()}
                      >
                        <ha-icon icon="mdi:drag-vertical"></ha-icon>
                      </span>
                    `}
                <span class="seg-label">${Wt(t,this._snapshot?.segment_entities??[])}</span>
              </button>
            `)}
        </div>
            `}

        ${!this.compact&&this._presets.length?W`
              <wled-preset-bar
                .presets=${this._presets}
                @preset-select=${t=>this._loadPreset(t.detail.presetId)}
              ></wled-preset-bar>
            `:null}

        ${n>1?W`
              <div class="color-slots" role="tablist" aria-label="Color slots">
                ${["Primary","Secondary","Tertiary"].slice(0,n).map((t,e)=>W`
                    <button
                      class="slot ${this._colorSlot===e?"active":""}"
                      role="tab"
                      @click=${()=>{this._colorSlot=e}}
                    >
                      ${t}
                    </button>
                  `)}
              </div>
            `:null}

        ${this.hideSegmentBrightness?null:W`
              <label class="bri-label">
                Segment brightness
                <ha-slider
                  min="0"
                  max="255"
                  step="1"
                  .value=${t.bri??255}
                  @change=${t=>this._slider("bri",t)}
                ></ha-slider>
              </label>
            `}

        <wled-color-wheel-rgbw
          .controllerId=${this.controllerId}
          .rgb=${[i[0],i[1],i[2]]}
          .white=${i[3]}
          .awm=${o}
          .showWhite=${(this._snapshot?.led_order??0)>0}
          @color-change=${this._onColor}
          @awm-change=${this._onAwm}
        ></wled-color-wheel-rgbw>

        ${!1!==s?.palette_enabled&&Object.keys(this._snapshot?.palettes_by_name??{}).length?W`
              <wled-palette-chips
                ?compact=${this.compact}
                ?collapsible=${this.compact}
                .palettesByName=${this._snapshot?.palettes_by_name??{}}
                .palettePreviews=${this._snapshot?.palette_previews??{}}
                .selectedPal=${t.pal??0}
                .deviceHost=${this._snapshot?.host??""}
                @palette-select=${t=>{this._patchSeg({pal:t.detail.paletteId})}}
                @palette-catalog-changed=${()=>{this._refreshPalettePreviews()}}
              ></wled-palette-chips>
            `:null}

        <wled-segment-advanced
          .segment=${t}
          .meta=${s}
          ?compact=${this.compact}
          @segment-patch=${t=>this._patchSeg(t.detail)}
        ></wled-segment-advanced>

        ${this.compact?null:W`
              <input
                class="fx-search"
                type="search"
                placeholder="Search effects…"
                .value=${this._effectFilter}
                @input=${t=>{this._effectFilter=t.target.value}}
              />
            `}

        ${this.wholeMode&&this.compact&&this.hideSegmentBrightness?null:W`
              <wled-effect-chips
                .hass=${this.hass}
                .controllerId=${this.controllerId}
                .fwVer=${this._snapshot?.fw_ver??this._snapshot?.info?.ver??""}
                .thumbBasenames=${this._snapshot?.thumb_basenames??[]}
                .effectsByName=${this._snapshot?.effects_by_name??{}}
                .soundFlags=${this._snapshot?.sound_flags??[]}
                .selectedFx=${t.fx??0}
                .filter=${this.compact?"":this._effectFilter}
                .selectedPalette=${t.pal??0}
                .paletteAware=${!1!==s?.palette_enabled}
                @effect-select=${this._onEffectSelect}
              ></wled-effect-chips>
            `}

        <div class="sliders">
          ${Object.entries(ms).map(([e,i])=>{if(!r[e])return null;const s=t[e];return W`
              <label>
                ${i}
                <ha-slider
                  min="0"
                  max="255"
                  step="1"
                  .value=${s??128}
                  @change=${t=>this._slider(e,t)}
                ></ha-slider>
              </label>
            `})}
        </div>

        ${this.compact&&this.connection&&this.controllerId?W`
              <div class="scene-row">
                ${this._saveSceneOpen?W`
                      <input
                        type="text"
                        class="scene-input"
                        placeholder="Scene name"
                        .value=${this._saveSceneName}
                        @input=${t=>{this._saveSceneName=t.target.value}}
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
                    `:W`
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
    `}async _confirmSaveScene(){if(this.connection&&this.controllerId&&this._saveSceneName.trim())try{await At(this.connection,this.controllerId,this._saveSceneName.trim()),this._saveSceneOpen=!1,wt(this,`Scene "${this._saveSceneName.trim()}" saved`)}catch(t){wt(this,t instanceof Error?t.message:String(t))}}get segments(){return this._segments}static{this.styles=[...mt,o`
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
    `]}};t([ct({attribute:!1})],vs.prototype,"connection",void 0),t([ct({attribute:!1})],vs.prototype,"hass",void 0),t([ct()],vs.prototype,"controllerId",void 0),t([ct({type:Boolean})],vs.prototype,"compact",void 0),t([ct({type:Boolean})],vs.prototype,"wholeMode",void 0),t([ct({type:Boolean,attribute:"hide-segment-brightness"})],vs.prototype,"hideSegmentBrightness",void 0),t([ct({type:Number})],vs.prototype,"selectedSegId",void 0),t([ct()],vs.prototype,"masterEntity",void 0),t([dt()],vs.prototype,"_loading",void 0),t([dt()],vs.prototype,"_error",void 0),t([dt()],vs.prototype,"_segId",void 0),t([dt()],vs.prototype,"_editIds",void 0),t([dt()],vs.prototype,"_segments",void 0),t([dt()],vs.prototype,"_snapshot",void 0),t([dt()],vs.prototype,"_meta",void 0),t([dt()],vs.prototype,"_effectFilter",void 0),t([dt()],vs.prototype,"_presets",void 0),t([dt()],vs.prototype,"_colorSlot",void 0),t([dt()],vs.prototype,"_mergeActive",void 0),t([dt()],vs.prototype,"_saveSceneOpen",void 0),t([dt()],vs.prototype,"_saveSceneName",void 0),vs=t([bt("wled-segment-controls")],vs);let ys=class extends vt{constructor(){super(...arguments),this.heightPx=56,this.pixelCount=210,this.segments=[],this.selectedSegId=-1,this.highlightSegIds=[],this._status="waiting",this._hoverLed=-1,this._raf=0,this._onCanvasClick=t=>{const e=this._ledAtEvent(t);if(e<0)return;const i=this._segmentForLed(e);i<0||this.dispatchEvent(new CustomEvent("segment-select",{detail:{segmentId:i,ledIndex:e},bubbles:!0,composed:!0}))},this._onCanvasMove=t=>{const e=this._ledAtEvent(t);e!==this._hoverLed&&(this._hoverLed=e,this.requestUpdate(),this._lastPixels&&this._schedulePaint())},this._onCanvasLeave=()=>{this._hoverLed>=0&&(this._hoverLed=-1,this.requestUpdate(),this._lastPixels&&this._schedulePaint())}}setFrame(t){t&&(this._lastPixels=kt(t,this.pixelCount),this._status="live",this.requestUpdate(),this.isPowered&&this._schedulePaint())}setStatus(t){this._status=t,this.requestUpdate()}pulseApply(){const t=this.renderRoot.querySelector(".wrap");t&&(t.classList.remove("scene-pulse"),t.getBoundingClientRect(),t.classList.add("scene-pulse"),window.setTimeout(()=>t.classList.remove("scene-pulse"),200))}onPoweredConnect(){this._lastPixels&&this._schedulePaint()}onPoweredDisconnect(){this._raf&&cancelAnimationFrame(this._raf),this._raf=0}firstUpdated(){this._canvas=this.renderRoot.querySelector("canvas")??void 0,this._canvas&&(this._ctx=this._canvas.getContext("2d",{alpha:!1})??void 0,this._canvas.addEventListener("click",this._onCanvasClick),this._canvas.addEventListener("mousemove",this._onCanvasMove),this._canvas.addEventListener("mouseleave",this._onCanvasLeave),this.addUnsub(()=>{this._canvas?.removeEventListener("click",this._onCanvasClick),this._canvas?.removeEventListener("mousemove",this._onCanvasMove),this._canvas?.removeEventListener("mouseleave",this._onCanvasLeave)}))}_ledAtEvent(t){const e=this._canvas;if(!e)return-1;const i=e.getBoundingClientRect(),s=(t.clientX-i.left)/i.width;return Math.min(this.pixelCount-1,Math.max(0,Math.floor(s*this.pixelCount)))}_segmentForLed(t){for(const e of this.segments){const i=e.start??0,s=e.stop??e.len??this.pixelCount;if(t>=i&&t<s)return e.id}return 1===this.segments.length?this.segments[0].id:-1}_ledInSelectedSeg(t){const e=this.highlightSegIds.length>0?this.highlightSegIds:this.selectedSegId>=0?[this.selectedSegId]:[];for(const i of e){const e=this.segments.find(t=>t.id===i);if(!e)continue;const s=e.start??0,r=e.stop??e.len??this.pixelCount;if(t>=s&&t<r)return!0}return!1}_surfaceFill(){return getComputedStyle(this).getPropertyValue("--wled-surface").trim()||"#1e1e1e"}_schedulePaint(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this._paint()}))}_paint(){const t=this._ctx,e=this._canvas;if(!t||!e||!this._lastPixels)return;const i=e.width,s=e.height,r=this.pixelCount,n=i/r;t.fillStyle=this._surfaceFill(),t.fillRect(0,0,i,s);for(let e=0;e<r;e++){const i=4*e,r=this._lastPixels[i],o=this._lastPixels[i+1],a=this._lastPixels[i+2],l=this._ledInSelectedSeg(e),h=e===this._hoverLed;t.fillStyle=`rgb(${r},${o},${a})`,t.shadowColor=`rgba(${r},${o},${a},0.85)`,t.shadowBlur=this.remote.state.disableBloom?0:l||h?10:6;const c=l?0:2,d=l?s:s-4;t.fillRect(e*n,c,Math.max(1,n-1),d),l&&(t.strokeStyle="rgba(255,255,255,0.9)",t.lineWidth=2,t.strokeRect(e*n+.5,.5,Math.max(1,n-2),s-1))}t.shadowBlur=0}render(){const t=Math.max(320,3*this.pixelCount);return W`
      <div class="wrap" role="img" aria-label="Live LED strip preview — tap a pixel to select its segment">
        <canvas
          width=${t}
          height=${this.heightPx}
          style="cursor: crosshair"
        ></canvas>
        ${"live"!==this._status?W`<span class="overlay">${this._status}</span>`:null}
      </div>
    `}static{this.styles=[...mt,o`
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
    `]}};t([ct({type:Number})],ys.prototype,"heightPx",void 0),t([ct({type:Number})],ys.prototype,"pixelCount",void 0),t([ct({type:Array})],ys.prototype,"segments",void 0),t([ct({type:Number})],ys.prototype,"selectedSegId",void 0),t([ct({type:Array})],ys.prototype,"highlightSegIds",void 0),t([dt()],ys.prototype,"_status",void 0),t([dt()],ys.prototype,"_hoverLed",void 0),ys=t([bt("wled-strip-preview")],ys);let bs=class extends vt{constructor(){super(...arguments),this.controllerId="",this.heightPx=56,this.selectedSegId=-1,this.highlightSegIds=[],this._pixelCount=210,this._segments=[],this._status="connecting"}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._bootstrap()}onPoweredConnect(){this._bootstrap()}onPoweredDisconnect(){this._unsubLive?.(),this._unsubLive=void 0}async _bootstrap(){if(this.connection&&this.controllerId){this._status="connecting",this._preview()?.setStatus(this._status);try{const t=(await $t(this.connection)).find(t=>String(t.entry_id)===this.controllerId);this._pixelCount=Number(t?.pixel_count)||210;const e=await Tt(this.connection,this.controllerId);this._segments=e.segments??[]}catch{this._segments=[]}this._startLive()}}_startLive(){this.connection&&this.controllerId&&(this._unsubLive?.(),this._unsubLive=Ct(this.connection,this.controllerId,t=>{this._status="live",this._preview()?.setStatus(this._status),this._preview()?.setFrame(t)},{remote:this.remote.state.isRemote}),this.addUnsub(()=>this._unsubLive?.()))}pulseApply(){this._preview()?.pulseApply()}async refreshSegments(){if(this.connection&&this.controllerId)try{const t=await Tt(this.connection,this.controllerId);this._segments=t.segments??[]}catch{}}_preview(){return this.renderRoot.querySelector("wled-strip-preview")??void 0}_onSegmentSelect(t){this.dispatchEvent(new CustomEvent("segment-select",{detail:t.detail,bubbles:!0,composed:!0}))}render(){return W`
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
        ${"live"!==this._status?W`<span class="status">${this._status}</span>`:null}
      </div>
    `}static{this.styles=[...mt,o`
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
    `]}};t([ct({attribute:!1})],bs.prototype,"connection",void 0),t([ct()],bs.prototype,"controllerId",void 0),t([ct({type:Number})],bs.prototype,"heightPx",void 0),t([ct({type:Number})],bs.prototype,"selectedSegId",void 0),t([ct({type:Array})],bs.prototype,"highlightSegIds",void 0),t([dt()],bs.prototype,"_pixelCount",void 0),t([dt()],bs.prototype,"_segments",void 0),t([dt()],bs.prototype,"_status",void 0),bs=t([bt("wled-studio-live-preview")],bs);let xs=class extends vt{constructor(){super(...arguments),this._toasts=[],this._nextId=0,this._timers=new Map,this._onToast=t=>{const e=t.detail;if(!e?.message)return;const i=++this._nextId;this._toasts=[...this._toasts,{id:i,message:e.message}];const s=this._toastDurationMs(),r=window.setTimeout(()=>this._dismiss(i),s);this._timers.set(i,r)}}onPoweredConnect(){this.getRootNode().addEventListener(xt,this._onToast,{signal:this.abort.signal})}onPoweredDisconnect(){for(const t of this._timers.values())window.clearTimeout(t);this._timers.clear()}_toastDurationMs(){const t=getComputedStyle(this).getPropertyValue("--m-toast").trim(),e=Number.parseInt(t,10);return Number.isFinite(e)&&e>0?e:4e3}_dismiss(t){const e=this._timers.get(t);void 0!==e&&(window.clearTimeout(e),this._timers.delete(t)),this._toasts=this._toasts.filter(e=>e.id!==t)}render(){return this._toasts.length?W`
      <div class="stack" aria-live="polite">
        ${this._toasts.map(t=>W`
            <p class="toast" role="status">${t.message}</p>
          `)}
      </div>
    `:null}static{this.styles=[...mt,o`
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
    `]}};async function ws(t,e){return await Pt(t),t.sendMessagePromise({...e,schema_version:1})}async function Ss(t,e){return(await ws(t,{type:"wled_studio/layout_list",controller_id:e})).layouts??[]}async function ks(t,e,i){return(await ws(t,{type:"wled_studio/layout_get",controller_id:e,layout_id:i})).layout??null}async function Cs(t,e,i){return(await ws(t,{type:"wled_studio/layout_save",controller_id:e,layout:i})).layout??i}async function Ps(t,e,i,s){return(await ws(t,{type:"wled_studio/layout_resolve_positions",controller_id:e,fixture_id:i,layout_id:s})).positions??[]}t([dt()],xs.prototype,"_toasts",void 0),xs=t([bt("wled-toast-host")],xs);const $s=new Set(["layout","default","fixture"]);function Is(t){const e=t.trim();return e?e.split(/[-_]+/).filter(Boolean).map(t=>t.charAt(0).toUpperCase()+t.slice(1).toLowerCase()).join(" "):"Layout"}function Ms(t){const e=(t.name??"").trim();return e&&!$s.has(e.toLowerCase())?e:Is(String(t.id??""))}async function Es(t){const e=await(i=createImageBitmap(t),s=15e3,r="Image decode timed out — try JPEG or PNG instead.",Promise.race([i,new Promise((t,e)=>{setTimeout(()=>e(new Error(r)),s)})]));var i,s,r;const n=Math.min(1,2048/Math.max(e.width,e.height)),o=Math.max(1,Math.round(e.width*n)),a=Math.max(1,Math.round(e.height*n)),l=document.createElement("canvas");l.width=o,l.height=a;const h=l.getContext("2d");if(!h)throw new Error("Canvas unavailable");h.drawImage(e,0,0,o,a),e.close();const c=l.toDataURL("image/jpeg",.92),d=new Image;return await new Promise((t,e)=>{d.onload=()=>t(),d.onerror=()=>e(new Error("Image decode failed")),d.src=c}),d}async function As(t){if(function(t){const e=(t.type||"").toLowerCase();return e.includes("heic")||e.includes("heif")||/\.heic$/i.test(t.name)||/\.heif$/i.test(t.name)}(t))try{return await Es(t)}catch(t){throw new Error(t instanceof Error?`${t.message} Export HEIC to JPEG in Photos and try again.`:"HEIC not supported here. Export to JPEG in Photos and try again.")}try{return await async function(t){const e=URL.createObjectURL(t);try{const t=new Image;return await new Promise((i,s)=>{t.onload=()=>i(),t.onerror=()=>s(new Error("Image decode failed")),t.src=e}),t}finally{URL.revokeObjectURL(e)}}(t)}catch{return Es(t)}}async function Ls(t){return async function(t,e=2048){const i=Math.min(1,e/Math.max(t.naturalWidth,t.naturalHeight,1)),s=Math.max(1,Math.round(t.naturalWidth*i)),r=Math.max(1,Math.round(t.naturalHeight*i)),n=document.createElement("canvas");n.width=s,n.height=r;const o=n.getContext("2d");if(!o)throw new Error("Canvas unavailable");return o.drawImage(t,0,0,s,r),new Promise((t,e)=>{n.toBlob(i=>i?t(i):e(new Error("Encode failed")),"image/jpeg",.88)})}(await As(t))}async function Ts(t,e,i,s){if(!t)throw new Error("Not connected to Home Assistant");const r=await Ls(s),n=await function(t){return new Promise((e,i)=>{const s=new FileReader;s.onload=()=>{const t=s.result;if("string"!=typeof t)return void i(new Error("Encode failed"));const r=t.indexOf(",");e(r>=0?t.slice(r+1):t)},s.onerror=()=>i(new Error("Encode failed")),s.readAsDataURL(t)})}(r),o=await async function(t,e){await Pt(t);try{return await t.sendMessagePromise({...e,schema_version:1})}catch(t){throw new Error(Ht(t))}}(t,{type:"wled_studio/layout_upload_bg",controller_id:e,layout_id:i,data:n,content_type:r.type||"image/jpeg"});if(!o.background_url)throw new Error("Photo upload failed — no URL returned");return{background_url:o.background_url}}function Fs(t,e,i){const{segLens:s,total:r}=function(t,e){if(t.length<2)return{segLens:[],total:0};const i=[];let s=0;const r=t.length,n=e?r:r-1;for(let e=0;e<n;e++){const n=(e+1)%r,o=Math.hypot(t[n].x-t[e].x,t[n].y-t[e].y);i.push(o),s+=o}return{segLens:i,total:s}}(t,e);if(r<=0||0===t.length)return[0,0];let n=i%1*r;n<0&&(n+=r);const o=t.length,a=e?o:o-1;let l=0;for(let e=0;e<a;e++){const i=s[e]??0;if(i>0&&l+i>=n){const s=(n-l)/i,r=(e+1)%o;return[t[e].x+s*(t[r].x-t[e].x),t[e].y+s*(t[r].y-t[e].y)]}l+=i}return[t[t.length-1].x,t[t.length-1].y]}function Ds(t,e,i){const s=[...new Set(e.filter(t=>t>=0))].sort((t,e)=>t-e);if(0===s.length)return t;let r=t.length>=2?t.map(t=>({...t,anchorLed:null})):[{x:0,y:0,anchorLed:null},{x:100,y:0,anchorLed:null},{x:100,y:80,anchorLed:null},{x:0,y:80,anchorLed:null}];r.length!==s.length&&(r=function(t,e,i){if(e<2)return t;const s=[];for(let r=0;r<e;r++){const n=1===e?0:r/(e-1),[o,a]=Fs(t,i,n);s.push({x:o,y:a,anchorLed:null})}return s}(r,s.length,i));for(let t=0;t<s.length;t++)r[t]={...r[t],anchorLed:s[t]};return r}const Rs=.55,Ns=1,Os=1,Us=0,zs=0,Gs=0,Bs=1,Ws=0,Hs=0,Vs=1,js=1;function qs(t,e){return t?{url:t,opacity:e?.opacity??Rs,brightness:e?.brightness??Ns,saturation:e?.saturation??Os,rotation:e?.rotation??Us,offsetX:e?.offsetX??zs,offsetY:e?.offsetY??Gs,scale:e?.scale??Bs,cropX:e?.cropX??Ws,cropY:e?.cropY??Hs,cropW:e?.cropW??Vs,cropH:e?.cropH??js}:null}function Ks(t){return qs(t.background?.url??t.background_url,t.background??null)}function Ys(t,e,i,s,r){const n=r.opacity??Rs,o=r.brightness??1,a=r.saturation??1,l=(r.rotation??0)*Math.PI/180,h=(r.offsetX??0)*e,c=(r.offsetY??0)*i,d=r.scale??1,p=r.cropX??0,u=r.cropY??0,g=r.cropW??1,f=r.cropH??1,_=s.naturalWidth*g,m=s.naturalHeight*f,v=s.naturalWidth*p,y=s.naturalHeight*u,b=Math.max(e/_,i/m)*d,x=_*b,w=m*b;t.save(),t.globalAlpha=n,t.filter=`brightness(${o}) saturate(${a})`,t.translate(e/2+h,i/2+c),t.rotate(l),t.drawImage(s,v,y,_,m,-x/2,-w/2,x,w),t.restore()}const Xs={opacity:1,brightness:1,saturation:1,rotation:0,offsetX:0,offsetY:0,scale:1,cropX:0,cropY:0,cropW:1,cropH:1};let Js=class extends vt{constructor(){super(...arguments),this.open=!1,this._img=null,this._layer=null,this._cropDrag=null,this._cropStart={x:0,y:0,cx:0,cy:0,cw:1,ch:1},this._loadError="",this._onDown=t=>{if(!this._layer)return;const[e,i]=this._normFromEvent(t),s=this._hitCropHandle(e,i);s&&(this._cropDrag=s,this._cropStart={x:e,y:i,cx:this._layer.cropX??0,cy:this._layer.cropY??0,cw:this._layer.cropW??1,ch:this._layer.cropH??1},this._canvas?.setPointerCapture(t.pointerId))},this._onMove=t=>{if(!this._cropDrag||!this._layer)return;const[e,i]=this._normFromEvent(t),s=e-this._cropStart.x,r=i-this._cropStart.y,n=this._cropStart;let o=n.cx,a=n.cy,l=n.cw,h=n.ch;if("move"===this._cropDrag)o=Math.max(0,Math.min(1-l,n.cx+s)),a=Math.max(0,Math.min(1-h,n.cy+r));else if("nw"===this._cropDrag){const t=n.cx+n.cw,e=n.cy+n.ch;o=Math.max(0,Math.min(t-.05,n.cx+s)),a=Math.max(0,Math.min(e-.05,n.cy+r)),l=t-o,h=e-a}else"se"===this._cropDrag&&(l=Math.max(.05,Math.min(1-n.cx,n.cw+s)),h=Math.max(.05,Math.min(1-n.cy,n.ch+r)));this._layer={...this._layer,cropX:o,cropY:a,cropW:l,cropH:h},this._paint()},this._onUp=t=>{this._cropDrag=null,this._canvas?.releasePointerCapture(t.pointerId)}}async openWithFile(t){this._file=t,this._loadError="",this._img=null,this._layer=null,this.open=!0,await this.updateComplete,this._bindCanvas(),this.requestUpdate();try{const e=await As(t);this._img=e,this._layer=qs("local-preview",Xs),this._loadError="",this._paint()}catch(t){throw this._loadError=Ht(t),this._paint(),t}}updated(t){super.updated(t),t.has("open")&&(this.open?(this._bindCanvas(),requestAnimationFrame(()=>this._paint())):this._resizeObs?.disconnect())}_bindCanvas(){const t=this.renderRoot.querySelector("canvas")??void 0,e=this.renderRoot.querySelector(".preview-wrap")??void 0;t&&(t!==this._canvas&&(this._canvas?.removeEventListener("pointerdown",this._onDown),this._canvas?.removeEventListener("pointermove",this._onMove),this._canvas?.removeEventListener("pointerup",this._onUp),this._canvas=t,t.addEventListener("pointerdown",this._onDown),t.addEventListener("pointermove",this._onMove),t.addEventListener("pointerup",this._onUp)),e&&e!==this._previewWrap&&(this._resizeObs?.disconnect(),this._previewWrap=e,this._resizeObs=new ResizeObserver(()=>this._paint()),this._resizeObs.observe(e)))}disconnectedCallback(){super.disconnectedCallback(),this._resizeObs?.disconnect()}_canvasRect(){return this._canvas.getBoundingClientRect()}_normFromEvent(t){const e=this._canvasRect();return[(t.clientX-e.left)/e.width,(t.clientY-e.top)/e.height]}_hitCropHandle(t,e){const i=this._layer;if(!i)return null;const s=i.cropX??0,r=i.cropY??0,n=i.cropW??1,o=i.cropH??1;return Math.hypot(t-s,e-r)<.04?"nw":Math.hypot(t-(s+n),e-(r+o))<.04?"se":t>=s&&t<=s+n&&e>=r&&e<=r+o?"move":null}_paint(){const t=this._canvas,e=t?.getContext("2d"),i=this._img,s=this._layer;if(!t||!e)return;const r=this._previewWrap?.getBoundingClientRect()??t.getBoundingClientRect(),n=window.devicePixelRatio||1,o=Math.max(1,Math.floor((r.width||640)*n)),a=Math.max(1,Math.floor((r.height||360)*n));if(!i?.complete||!i.naturalWidth||!s)return e.fillStyle="#0f172a",e.fillRect(0,0,o,a),void(this._loadError&&(e.fillStyle="rgba(255,255,255,0.7)",e.font="14px sans-serif",e.textAlign="center",e.fillText(this._loadError,o/2,a/2)));t.width===o&&t.height===a||(t.width=o,t.height=a),e.fillStyle="#0f172a",e.fillRect(0,0,o,a),Ys(e,o,a,i,s);const l=(s.cropX??0)*o,h=(s.cropY??0)*a,c=(s.cropW??1)*o,d=(s.cropH??1)*a;e.fillStyle="rgba(0,0,0,0.55)",e.fillRect(0,0,o,h),e.fillRect(0,h+d,o,a-h-d),e.fillRect(0,h,l,d),e.fillRect(l+c,h,o-l-c,d),e.strokeStyle="#38bdf8",e.lineWidth=2,e.strokeRect(l,h,c,d);const p=10;e.fillStyle="#38bdf8",e.fillRect(l-5,h-5,p,p),e.fillRect(l+c-5,h+d-5,p,p)}_resetCrop(){this._layer&&(this._layer={...this._layer,cropX:0,cropY:0,cropW:1,cropH:1},this._paint())}_cancel(){this.open=!1,this._img=null,this._layer=null,this._file=void 0,this._loadError=""}async _apply(){if(this._img&&this._layer)try{const t=await async function(t,e,i=2048){const s=e.cropX??0,r=e.cropY??0,n=e.cropW??1,o=e.cropH??1,a=Math.max(1,Math.floor(t.naturalWidth*n)),l=Math.max(1,Math.floor(t.naturalHeight*o)),h=Math.floor(t.naturalWidth*s),c=Math.floor(t.naturalHeight*r),d=Math.min(1,i/Math.max(a,l)),p=Math.max(1,Math.floor(a*d)),u=Math.max(1,Math.floor(l*d)),g=document.createElement("canvas");g.width=p,g.height=u;const f=g.getContext("2d");if(!f)throw new Error("Canvas unavailable");const _=e.brightness??1,m=e.saturation??1,v=(e.rotation??0)*Math.PI/180;return f.filter=`brightness(${_}) saturate(${m})`,f.translate(p/2,u/2),f.rotate(v),f.drawImage(t,h,c,a,l,-p/2,-u/2,p,u),new Promise((t,e)=>{g.toBlob(i=>i?t(i):e(new Error("Encode failed")),"image/jpeg",.9)})}(this._img,this._layer),e=new File([t],this._file?.name?.replace(/\.\w+$/,"")+".jpg"||"floorplan.jpg",{type:"image/jpeg"});this.dispatchEvent(new CustomEvent("photo-apply",{detail:{file:e,layer:this._layer},bubbles:!0,composed:!0})),this._cancel()}catch(t){this.dispatchEvent(new CustomEvent("photo-error",{detail:{message:t instanceof Error?t.message:String(t)},bubbles:!0,composed:!0}))}}render(){if(!this.open)return W``;const t=this._layer;return W`
      <div class="overlay" role="dialog" aria-label="Edit floorplan photo">
        <div class="panel">
          <header>
            <h2>Photo overlay</h2>
            <button class="icon" @click=${this._cancel} aria-label="Close">✕</button>
          </header>
          <p class="hint">Crop the room photo, tune brightness, then apply. Draw your LED path on top in the designer.</p>
          <div class="preview-wrap">
            <canvas></canvas>
            ${this._img||this._loadError?null:W`<span class="loading">Loading photo…</span>`}
            ${this._loadError?W`<span class="load-error">${this._loadError}</span>`:null}
          </div>
          ${t?W`
                <div class="sliders">
                  <label
                    >Opacity
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      .value=${String(t.opacity??.55)}
                      @input=${e=>{this._layer={...t,opacity:parseFloat(e.target.value)},this._paint()}}
                    />
                  </label>
                  <label
                    >Brightness
                    <input
                      type="range"
                      min="0.4"
                      max="1.8"
                      step="0.05"
                      .value=${String(t.brightness??1)}
                      @input=${e=>{this._layer={...t,brightness:parseFloat(e.target.value)},this._paint()}}
                    />
                  </label>
                  <label
                    >Saturation
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.05"
                      .value=${String(t.saturation??1)}
                      @input=${e=>{this._layer={...t,saturation:parseFloat(e.target.value)},this._paint()}}
                    />
                  </label>
                  <label
                    >Rotation (°)
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      step="1"
                      .value=${String(t.rotation??0)}
                      @input=${e=>{this._layer={...t,rotation:parseFloat(e.target.value)},this._paint()}}
                    />
                  </label>
                </div>
              `:null}
          <div class="actions">
            <button class="secondary" @click=${this._resetCrop}>Reset crop</button>
            <button class="secondary" @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${()=>this._apply()}>Use photo</button>
          </div>
        </div>
      </div>
    `}static{this.styles=[...mt,o`
      .overlay {
        position: fixed;
        inset: 0;
        z-index: 200;
        background: rgba(0, 0, 0, 0.72);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        box-sizing: border-box;
      }
      .panel {
        background: var(--card-background-color, #1e293b);
        border-radius: 12px;
        max-width: 720px;
        width: 100%;
        max-height: 95vh;
        overflow: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      h2 {
        margin: 0;
        font-size: 1.1rem;
      }
      .icon {
        border: none;
        background: transparent;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
      }
      .hint {
        margin: 0;
        font-size: 0.82rem;
        opacity: 0.75;
      }
      .preview-wrap {
        position: relative;
        height: min(50vh, 360px);
        min-height: 200px;
        border-radius: 8px;
        overflow: hidden;
        background: #111;
      }
      .loading,
      .load-error {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        text-align: center;
        font-size: 0.85rem;
        pointer-events: none;
      }
      .load-error {
        color: #fca5a5;
      }
      canvas {
        width: 100%;
        height: 100%;
        display: block;
        touch-action: none;
      }
      .sliders {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .sliders label {
        font-size: 0.8rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .sliders input[type="range"] {
        width: 100%;
      }
      .actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      .primary,
      .secondary {
        padding: 8px 14px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-size: 0.85rem;
      }
      .primary {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .secondary {
        background: var(--card-background-color, #334155);
        color: inherit;
        border: 1px solid var(--divider-color, #475569);
      }
    `]}};t([ct({type:Boolean})],Js.prototype,"open",void 0),t([dt()],Js.prototype,"_img",void 0),t([dt()],Js.prototype,"_layer",void 0),t([dt()],Js.prototype,"_cropDrag",void 0),t([dt()],Js.prototype,"_cropStart",void 0),Js=t([bt("wled-layout-photo-editor")],Js);var Zs="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function Qs(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var tr,er={exports:{}};var ir,sr=(tr||(tr=1,ir=er,function(){function t(t,e){var i=t.x-e.x,s=t.y-e.y;return i*i+s*s}function e(t,e,i){var s=e.x,r=e.y,n=i.x-s,o=i.y-r;if(0!==n||0!==o){var a=((t.x-s)*n+(t.y-r)*o)/(n*n+o*o);a>1?(s=i.x,r=i.y):a>0&&(s+=n*a,r+=o*a)}return(n=t.x-s)*n+(o=t.y-r)*o}function i(t,s,r,n,o){for(var a,l=n,h=s+1;h<r;h++){var c=e(t[h],t[s],t[r]);c>l&&(a=h,l=c)}l>n&&(a-s>1&&i(t,s,a,n,o),o.push(t[a]),r-a>1&&i(t,a,r,n,o))}function s(t,e){var s=t.length-1,r=[t[0]];return i(t,0,s,e,r),r.push(t[s]),r}function r(e,i,r){if(e.length<=2)return e;var n=void 0!==i?i*i:1;return e=r?e:function(e,i){for(var s,r=e[0],n=[r],o=1,a=e.length;o<a;o++)t(s=e[o],r)>i&&(n.push(s),r=s);return r!==s&&n.push(s),n}(e,n),e=s(e,n)}ir.exports=r,ir.exports.default=r}()),er.exports),rr=Qs(sr);function nr(t,e,i,s){const r=Math.min(t,i),n=Math.max(t,i),o=Math.min(e,s),a=Math.max(e,s);return{points:[[r,o],[n,o],[n,a],[r,a]],closed:!0,kind:"rect"}}function or(t,e,i,s,r=48){const n=[];for(let o=0;o<r;o++){const a=o/r*Math.PI*2;n.push([t+Math.cos(a)*i,e+Math.sin(a)*s])}return{points:n,closed:!0,kind:"ellipse"}}function ar(t,e){return{points:[...t],closed:e,kind:"polyline"}}function lr(t,e,i){const s=t.points;if(0===s.length)return{x:e,y:i,t:0,dist:1/0};if(1===s.length){const t=Math.hypot(e-s[0][0],i-s[0][1]);return{x:s[0][0],y:s[0][1],t:0,dist:t}}const{segLens:r,total:n}=function(t,e){if(t.length<2)return{segLens:[],total:0};const i=[];let s=0;const r=t.length,n=e?r:r-1;for(let e=0;e<n;e++){const n=(e+1)%r,o=Math.hypot(t[n][0]-t[e][0],t[n][1]-t[e][1]);i.push(o),s+=o}return{segLens:i,total:s}}(s,t.closed);if(n<=0)return{x:e,y:i,t:0,dist:1/0};let o=1/0,a=e,l=i,h=0,c=0;const d=s.length,p=t.closed?d:d-1;for(let t=0;t<p;t++){const p=(t+1)%d,u=s[t][0],g=s[t][1],f=s[p][0],_=s[p][1],m=r[t]??0;let v=0;m>0&&(v=Math.max(0,Math.min(1,((e-u)*(f-u)+(i-g)*(_-g))/(m*m))));const y=u+v*(f-u),b=g+v*(_-g),x=Math.hypot(e-y,i-b);x<o&&(o=x,a=y,l=b,h=(c+v*m)/n),c+=m}return{x:a,y:l,t:h,dist:o}}function hr(t,e,i){return t<=0?0:function(t,e){const i=Math.max(0,e-1);return Math.max(0,Math.min(i,Math.round(t*i)))}(e,i)}const cr=2e6,dr=/([MLHVCSQTAZmlhvcsqtaz])|(-?\d*\.?\d+(?:e[-+]?\d+)?)/g;function pr(t,e){const i=function(t){const e=[];let i;for(dr.lastIndex=0;null!==(i=dr.exec(t));)i[1]?e.push(i[1]):i[2]&&e.push(parseFloat(i[2]));return e}(t.trim()),s=[];let r=0,n=0,o=0,a=0,l=0,h="",c=0;const d=()=>{const t=i[r++];return"number"==typeof t&&Number.isFinite(t)?t:0},p=(t,e)=>{n=t,o=e,s.push([n,o])},u=(t,e,i,s,r=12)=>{const a=n,l=o;for(let n=1;n<=r;n++){const o=n/r,h=1-o;p(h*h*a+2*h*o*t+o*o*i,h*h*l+2*h*o*e+o*o*s)}},g=(t,e,i,s,r,a,l=16)=>{const h=n,c=o;for(let n=1;n<=l;n++){const o=n/l,d=1-o;p(d*d*d*h+3*d*d*o*t+3*d*o*o*i+o*o*o*r,d*d*d*c+3*d*d*o*e+3*d*o*o*s+o*o*o*a)}},f=t=>{const e=function(t){switch(t.toUpperCase()){case"A":return 7;case"C":return 6;case"S":case"Q":return 4;case"T":case"L":case"M":default:return 2;case"H":case"V":return 1;case"Z":return 0}}(t);for(let t=0;t<e&&r<i.length&&"number"==typeof i[r];t++)d();"A"===t.toUpperCase()&&s.length>0&&p(n,o)};for(;r<i.length&&c++<5e4;){const t=i[r];if("string"==typeof t&&(h=t,r++),!h){"number"==typeof i[r]&&r++;continue}const e=h===h.toLowerCase()&&"Z"!==h&&"z"!==h,c=h.toUpperCase(),_=r;let m=!1;if("M"===c){const t=d()+(e?n:0),h=d()+(e?o:0);for(n=t,o=h,a=t,l=h,s.push([n,o]);r<i.length&&"number"==typeof i[r];)p(d()+(e?n:0),d()+(e?o:0));m=!0}else if("L"===c){for(;r<i.length&&"number"==typeof i[r];)p(d()+(e?n:0),d()+(e?o:0));m=!0}else if("H"===c){for(;r<i.length&&"number"==typeof i[r];)p(d()+(e?n:0),o);m=!0}else if("V"===c){for(;r<i.length&&"number"==typeof i[r];)p(n,d()+(e?o:0));m=!0}else if("Q"===c){for(;r<i.length&&"number"==typeof i[r];)u(d()+(e?n:0),d()+(e?o:0),d()+(e?n:0),d()+(e?o:0));m=!0}else if("C"===c){for(;r<i.length&&"number"==typeof i[r];)g(d()+(e?n:0),d()+(e?o:0),d()+(e?n:0),d()+(e?o:0),d()+(e?n:0),d()+(e?o:0));m=!0}else if("A"===c)d(),d(),d(),d(),d(),p(d()+(e?n:0),d()+(e?o:0)),m=!0;else if("S"===c){for(;r<i.length&&"number"==typeof i[r];)g(n,o,d()+(e?n:0),d()+(e?o:0),d()+(e?n:0),d()+(e?o:0));m=!0}else if("T"===c){for(;r<i.length&&"number"==typeof i[r];)u(n,o,d()+(e?n:0),d()+(e?o:0));m=!0}else"Z"===c&&(s.length>0&&p(a,l),n=a,o=l,m=!0);m||(f(c),r===_&&r<i.length&&r++)}return gr(s,e)}function ur(t,e){const i=function(t,e){if("undefined"==typeof document)return null;try{const i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",t);const s=i.getTotalLength();if(!Number.isFinite(s)||s<=0)return null;const r=Math.max(2,Math.min(e,Math.ceil(s/2))),n=[];for(let t=0;t<=r;t++){const e=i.getPointAtLength(s*t/r);Number.isFinite(e.x)&&Number.isFinite(e.y)&&n.push([e.x,e.y])}return n.length>=2?n:null}catch{return null}}(t,e);return i&&i.length>=2?i:pr(t,e)}function gr(t,e){if(t.length<=e)return t;const i=t.length/e,s=[];for(let r=0;r<e;r++)s.push(t[Math.floor(r*i)]);return s}function fr(t,e=200){if(0===t.length)return t;let i=1/0,s=-1/0,r=1/0,n=-1/0;for(const[e,o]of t)e<i&&(i=e),e>s&&(s=e),o<r&&(r=o),o>n&&(n=o);const o=s-i||1,a=n-r||1,l=e/Math.max(o,a);return t.map(([t,e])=>[(t-i)*l,(e-r)*l])}function _r(t,e){const i=t.trim().split(/[\s,]+/).map(parseFloat).filter(t=>Number.isFinite(t)),s=[];for(let t=0;t+1<i.length;t+=2)s.push([i[t],i[t+1]]);return gr(s,e)}function mr(t){if(t.length>cr)throw new Error("SVG too large (max 2 MB)");const e=(new DOMParser).parseFromString(t,"image/svg+xml");if(e.querySelector("parsererror"))throw new Error("Invalid SVG file");const i=Array.from(e.querySelectorAll("path")).slice(0,80);let s=[],r=!1;for(const t of i){const e=t.getAttribute("d");if(!e?.trim())continue;const i=ur(e,400);i.length>s.length&&(s=i,r=/z\s*$/i.test(e.trim()))}if(s.length<2){const t=Array.from(e.querySelectorAll("polygon, polyline")).slice(0,80);for(const e of t){const t=e.getAttribute("points");if(!t)continue;const i=_r(t,400);i.length>s.length&&(s=i,r="polygon"===e.tagName.toLowerCase())}}if(s.length<2)throw new Error("No paths found in SVG (use path, polyline, or polygon)");return s=function(t,e){if(t.length<=4)return t;const i=rr(t.map(([t,e])=>({x:t,y:e})),1.5,!0).map(t=>[t.x,t.y]);return gr(i,e)}(s,400),{points:fr(s),closed:r,kind:"svg"}}function vr(t,e=!1){return new Promise((i,s)=>{const r=new Image;r.onload=()=>i(r),r.onerror=()=>s(new Error(`Could not load image (${t})`)),function(t,e,i=!1){let s=e;if(i&&!s.includes("?")&&(s=`${s}?v=${Date.now()}`),t.removeAttribute("crossorigin"),s.startsWith("http://")||s.startsWith("https://"))try{new URL(s,window.location.href).origin!==window.location.origin&&(t.crossOrigin="anonymous")}catch{t.crossOrigin="anonymous"}t.src=s}(r,t,e)})}var yr,br={exports:{}},xr={},wr={},Sr={};function kr(){return yr||(yr=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t._registerNode=t.Konva=t.glob=void 0;const e=Math.PI/180;t.glob=void 0!==Zs?Zs:"undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope?self:{},t.Konva={_global:t.glob,version:"9.3.22",isBrowser:"undefined"!=typeof window&&("[object Window]"==={}.toString.call(window)||"[object global]"==={}.toString.call(window)),isUnminified:/param/.test(function(t){}.toString()),dblClickWindow:400,getAngle:i=>t.Konva.angleDeg?i*e:i,enableTrace:!1,pointerEventsEnabled:!0,autoDrawEnabled:!0,hitOnDragEnabled:!1,capturePointerEventsEnabled:!1,_mouseListenClick:!1,_touchListenClick:!1,_pointerListenClick:!1,_mouseInDblClickWindow:!1,_touchInDblClickWindow:!1,_pointerInDblClickWindow:!1,_mouseDblClickPointerId:null,_touchDblClickPointerId:null,_pointerDblClickPointerId:null,_fixTextRendering:!1,pixelRatio:"undefined"!=typeof window&&window.devicePixelRatio||1,dragDistance:3,angleDeg:!0,showWarnings:!0,dragButtons:[0,1],isDragging:()=>t.Konva.DD.isDragging,isTransforming(){var e;return null===(e=t.Konva.Transformer)||void 0===e?void 0:e.isTransforming()},isDragReady:()=>!!t.Konva.DD.node,releaseCanvasOnDestroy:!0,document:t.glob.document,_injectGlobal(e){t.glob.Konva=e}};t._registerNode=e=>{t.Konva[e.prototype.getClassName()]=e},t.Konva._injectGlobal(t.Konva)}(Sr)),Sr}var Cr,Pr={};function $r(){return Cr||(Cr=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.Util=t.Transform=void 0;const e=kr();class i{constructor(t=[1,0,0,1,0,0]){this.dirty=!1,this.m=t&&t.slice()||[1,0,0,1,0,0]}reset(){this.m[0]=1,this.m[1]=0,this.m[2]=0,this.m[3]=1,this.m[4]=0,this.m[5]=0}copy(){return new i(this.m)}copyInto(t){t.m[0]=this.m[0],t.m[1]=this.m[1],t.m[2]=this.m[2],t.m[3]=this.m[3],t.m[4]=this.m[4],t.m[5]=this.m[5]}point(t){const e=this.m;return{x:e[0]*t.x+e[2]*t.y+e[4],y:e[1]*t.x+e[3]*t.y+e[5]}}translate(t,e){return this.m[4]+=this.m[0]*t+this.m[2]*e,this.m[5]+=this.m[1]*t+this.m[3]*e,this}scale(t,e){return this.m[0]*=t,this.m[1]*=t,this.m[2]*=e,this.m[3]*=e,this}rotate(t){const e=Math.cos(t),i=Math.sin(t),s=this.m[0]*e+this.m[2]*i,r=this.m[1]*e+this.m[3]*i,n=this.m[0]*-i+this.m[2]*e,o=this.m[1]*-i+this.m[3]*e;return this.m[0]=s,this.m[1]=r,this.m[2]=n,this.m[3]=o,this}getTranslation(){return{x:this.m[4],y:this.m[5]}}skew(t,e){const i=this.m[0]+this.m[2]*e,s=this.m[1]+this.m[3]*e,r=this.m[2]+this.m[0]*t,n=this.m[3]+this.m[1]*t;return this.m[0]=i,this.m[1]=s,this.m[2]=r,this.m[3]=n,this}multiply(t){const e=this.m[0]*t.m[0]+this.m[2]*t.m[1],i=this.m[1]*t.m[0]+this.m[3]*t.m[1],s=this.m[0]*t.m[2]+this.m[2]*t.m[3],r=this.m[1]*t.m[2]+this.m[3]*t.m[3],n=this.m[0]*t.m[4]+this.m[2]*t.m[5]+this.m[4],o=this.m[1]*t.m[4]+this.m[3]*t.m[5]+this.m[5];return this.m[0]=e,this.m[1]=i,this.m[2]=s,this.m[3]=r,this.m[4]=n,this.m[5]=o,this}invert(){const t=1/(this.m[0]*this.m[3]-this.m[1]*this.m[2]),e=this.m[3]*t,i=-this.m[1]*t,s=-this.m[2]*t,r=this.m[0]*t,n=t*(this.m[2]*this.m[5]-this.m[3]*this.m[4]),o=t*(this.m[1]*this.m[4]-this.m[0]*this.m[5]);return this.m[0]=e,this.m[1]=i,this.m[2]=s,this.m[3]=r,this.m[4]=n,this.m[5]=o,this}getMatrix(){return this.m}decompose(){const e=this.m[0],i=this.m[1],s=this.m[2],r=this.m[3],n=e*r-i*s,o={x:this.m[4],y:this.m[5],rotation:0,scaleX:0,scaleY:0,skewX:0,skewY:0};if(0!=e||0!=i){const t=Math.sqrt(e*e+i*i);o.rotation=i>0?Math.acos(e/t):-Math.acos(e/t),o.scaleX=t,o.scaleY=n/t,o.skewX=(e*s+i*r)/n,o.skewY=0}else if(0!=s||0!=r){const t=Math.sqrt(s*s+r*r);o.rotation=Math.PI/2-(r>0?Math.acos(-s/t):-Math.acos(s/t)),o.scaleX=n/t,o.scaleY=t,o.skewX=0,o.skewY=(e*s+i*r)/n}return o.rotation=t.Util._getRotation(o.rotation),o}}t.Transform=i;const s=Math.PI/180,r=180/Math.PI,n="Konva error: ",o={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,132,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,255,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,203],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[119,128,144],slategrey:[119,128,144],snow:[255,255,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],transparent:[255,255,255,0],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,5]},a=/rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;let l=[];const h="undefined"!=typeof requestAnimationFrame&&requestAnimationFrame||function(t){setTimeout(t,60)};t.Util={_isElement:t=>!(!t||1!=t.nodeType),_isFunction:t=>!!(t&&t.constructor&&t.call&&t.apply),_isPlainObject:t=>!!t&&t.constructor===Object,_isArray:t=>"[object Array]"===Object.prototype.toString.call(t),_isNumber:t=>"[object Number]"===Object.prototype.toString.call(t)&&!isNaN(t)&&isFinite(t),_isString:t=>"[object String]"===Object.prototype.toString.call(t),_isBoolean:t=>"[object Boolean]"===Object.prototype.toString.call(t),isObject:t=>t instanceof Object,isValidSelector(t){if("string"!=typeof t)return!1;const e=t[0];return"#"===e||"."===e||e===e.toUpperCase()},_sign:t=>0===t||t>0?1:-1,requestAnimFrame(t){l.push(t),1===l.length&&h(function(){const t=l;l=[],t.forEach(function(t){t()})})},createCanvasElement(){const t=document.createElement("canvas");try{t.style=t.style||{}}catch(t){}return t},createImageElement:()=>document.createElement("img"),_isInDocument(t){for(;t=t.parentNode;)if(t==document)return!0;return!1},_urlToImage(e,i){const s=t.Util.createImageElement();s.onload=function(){i(s)},s.src=e},_rgbToHex:(t,e,i)=>((1<<24)+(t<<16)+(e<<8)+i).toString(16).slice(1),_hexToRgb(t){t=t.replace("#","");const e=parseInt(t,16);return{r:e>>16&255,g:e>>8&255,b:255&e}},getRandomColor(){let t=(16777215*Math.random()|0).toString(16);for(;t.length<6;)t="0"+t;return"#"+t},getRGB(t){let e;return t in o?(e=o[t],{r:e[0],g:e[1],b:e[2]}):"#"===t[0]?this._hexToRgb(t.substring(1)):"rgb("===t.substr(0,4)?(e=a.exec(t.replace(/ /g,"")),{r:parseInt(e[1],10),g:parseInt(e[2],10),b:parseInt(e[3],10)}):{r:0,g:0,b:0}},colorToRGBA:e=>(e=e||"black",t.Util._namedColorToRBA(e)||t.Util._hex3ColorToRGBA(e)||t.Util._hex4ColorToRGBA(e)||t.Util._hex6ColorToRGBA(e)||t.Util._hex8ColorToRGBA(e)||t.Util._rgbColorToRGBA(e)||t.Util._rgbaColorToRGBA(e)||t.Util._hslColorToRGBA(e)),_namedColorToRBA(t){const e=o[t.toLowerCase()];return e?{r:e[0],g:e[1],b:e[2],a:1}:null},_rgbColorToRGBA(t){if(0===t.indexOf("rgb(")){const e=(t=t.match(/rgb\(([^)]+)\)/)[1]).split(/ *, */).map(Number);return{r:e[0],g:e[1],b:e[2],a:1}}},_rgbaColorToRGBA(t){if(0===t.indexOf("rgba(")){const e=(t=t.match(/rgba\(([^)]+)\)/)[1]).split(/ *, */).map((t,e)=>"%"===t.slice(-1)?3===e?parseInt(t)/100:parseInt(t)/100*255:Number(t));return{r:e[0],g:e[1],b:e[2],a:e[3]}}},_hex8ColorToRGBA(t){if("#"===t[0]&&9===t.length)return{r:parseInt(t.slice(1,3),16),g:parseInt(t.slice(3,5),16),b:parseInt(t.slice(5,7),16),a:parseInt(t.slice(7,9),16)/255}},_hex6ColorToRGBA(t){if("#"===t[0]&&7===t.length)return{r:parseInt(t.slice(1,3),16),g:parseInt(t.slice(3,5),16),b:parseInt(t.slice(5,7),16),a:1}},_hex4ColorToRGBA(t){if("#"===t[0]&&5===t.length)return{r:parseInt(t[1]+t[1],16),g:parseInt(t[2]+t[2],16),b:parseInt(t[3]+t[3],16),a:parseInt(t[4]+t[4],16)/255}},_hex3ColorToRGBA(t){if("#"===t[0]&&4===t.length)return{r:parseInt(t[1]+t[1],16),g:parseInt(t[2]+t[2],16),b:parseInt(t[3]+t[3],16),a:1}},_hslColorToRGBA(t){if(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(t)){const[e,...i]=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t),s=Number(i[0])/360,r=Number(i[1])/100,n=Number(i[2])/100;let o,a,l;if(0===r)return l=255*n,{r:Math.round(l),g:Math.round(l),b:Math.round(l),a:1};o=n<.5?n*(1+r):n+r-n*r;const h=2*n-o,c=[0,0,0];for(let t=0;t<3;t++)a=s+1/3*-(t-1),a<0&&a++,a>1&&a--,l=6*a<1?h+6*(o-h)*a:2*a<1?o:3*a<2?h+(o-h)*(2/3-a)*6:h,c[t]=255*l;return{r:Math.round(c[0]),g:Math.round(c[1]),b:Math.round(c[2]),a:1}}},haveIntersection:(t,e)=>!(e.x>t.x+t.width||e.x+e.width<t.x||e.y>t.y+t.height||e.y+e.height<t.y),cloneObject(t){const e={};for(const i in t)this._isPlainObject(t[i])?e[i]=this.cloneObject(t[i]):this._isArray(t[i])?e[i]=this.cloneArray(t[i]):e[i]=t[i];return e},cloneArray:t=>t.slice(0),degToRad:t=>t*s,radToDeg:t=>t*r,_degToRad:e=>(t.Util.warn("Util._degToRad is removed. Please use public Util.degToRad instead."),t.Util.degToRad(e)),_radToDeg:e=>(t.Util.warn("Util._radToDeg is removed. Please use public Util.radToDeg instead."),t.Util.radToDeg(e)),_getRotation:i=>e.Konva.angleDeg?t.Util.radToDeg(i):i,_capitalize:t=>t.charAt(0).toUpperCase()+t.slice(1),throw(t){throw new Error(n+t)},error(t){console.error(n+t)},warn(t){e.Konva.showWarnings&&console.warn("Konva warning: "+t)},each(t,e){for(const i in t)e(i,t[i])},_inRange:(t,e,i)=>e<=t&&t<i,_getProjectionToSegment(t,e,i,s,r,n){let o,a,l;const h=(t-i)*(t-i)+(e-s)*(e-s);if(0==h)o=t,a=e,l=(r-i)*(r-i)+(n-s)*(n-s);else{const c=((r-t)*(i-t)+(n-e)*(s-e))/h;c<0?(o=t,a=e,l=(t-r)*(t-r)+(e-n)*(e-n)):c>1?(o=i,a=s,l=(i-r)*(i-r)+(s-n)*(s-n)):(o=t+c*(i-t),a=e+c*(s-e),l=(o-r)*(o-r)+(a-n)*(a-n))}return[o,a,l]},_getProjectionToLine(e,i,s){const r=t.Util.cloneObject(e);let n=Number.MAX_VALUE;return i.forEach(function(o,a){if(!s&&a===i.length-1)return;const l=i[(a+1)%i.length],h=t.Util._getProjectionToSegment(o.x,o.y,l.x,l.y,e.x,e.y),c=h[0],d=h[1],p=h[2];p<n&&(r.x=c,r.y=d,n=p)}),r},_prepareArrayForTween(e,i,s){const r=[],n=[];if(e.length>i.length){const t=i;i=e,e=t}for(let t=0;t<e.length;t+=2)r.push({x:e[t],y:e[t+1]});for(let t=0;t<i.length;t+=2)n.push({x:i[t],y:i[t+1]});const o=[];return n.forEach(function(e){const i=t.Util._getProjectionToLine(e,r,s);o.push(i.x),o.push(i.y)}),o},_prepareToStringify(e){let i;e.visitedByCircularReferenceRemoval=!0;for(const s in e)if(e.hasOwnProperty(s)&&e[s]&&"object"==typeof e[s])if(i=Object.getOwnPropertyDescriptor(e,s),e[s].visitedByCircularReferenceRemoval||t.Util._isElement(e[s])){if(!i.configurable)return null;delete e[s]}else if(null===t.Util._prepareToStringify(e[s])){if(!i.configurable)return null;delete e[s]}return delete e.visitedByCircularReferenceRemoval,e},_assign(t,e){for(const i in e)t[i]=e[i];return t},_getFirstPointerId:t=>t.touches?t.changedTouches[0].identifier:t.pointerId||999,releaseCanvas(...t){e.Konva.releaseCanvasOnDestroy&&t.forEach(t=>{t.width=0,t.height=0})},drawRoundedRectPath(t,e,i,s){let r=0,n=0,o=0,a=0;"number"==typeof s?r=n=o=a=Math.min(s,e/2,i/2):(r=Math.min(s[0]||0,e/2,i/2),n=Math.min(s[1]||0,e/2,i/2),a=Math.min(s[2]||0,e/2,i/2),o=Math.min(s[3]||0,e/2,i/2)),t.moveTo(r,0),t.lineTo(e-n,0),t.arc(e-n,n,n,3*Math.PI/2,0,!1),t.lineTo(e,i-a),t.arc(e-a,i-a,a,0,Math.PI/2,!1),t.lineTo(o,i),t.arc(o,i-o,o,Math.PI/2,Math.PI,!1),t.lineTo(0,r),t.arc(r,r,r,Math.PI,3*Math.PI/2,!1)}}}(Pr)),Pr}var Ir,Mr,Er={},Ar={},Lr={};function Tr(){if(Ir)return Lr;Ir=1,Object.defineProperty(Lr,"__esModule",{value:!0}),Lr.HitContext=Lr.SceneContext=Lr.Context=void 0;const t=$r(),e=kr();const i=["arc","arcTo","beginPath","bezierCurveTo","clearRect","clip","closePath","createLinearGradient","createPattern","createRadialGradient","drawImage","ellipse","fill","fillText","getImageData","createImageData","lineTo","moveTo","putImageData","quadraticCurveTo","rect","roundRect","restore","rotate","save","scale","setLineDash","setTransform","stroke","strokeText","transform","translate"];let s=class{constructor(t){this.canvas=t,e.Konva.enableTrace&&(this.traceArr=[],this._enableTrace())}fillShape(t){t.fillEnabled()&&this._fill(t)}_fill(t){}strokeShape(t){t.hasStroke()&&this._stroke(t)}_stroke(t){}fillStrokeShape(t){t.attrs.fillAfterStrokeEnabled?(this.strokeShape(t),this.fillShape(t)):(this.fillShape(t),this.strokeShape(t))}getTrace(e,i){let s,r,n,o,a=this.traceArr,l=a.length,h="";for(s=0;s<l;s++)r=a[s],n=r.method,n?(o=r.args,h+=n,e?h+="()":t.Util._isArray(o[0])?h+="(["+o.join(",")+"])":(i&&(o=o.map(t=>"number"==typeof t?Math.floor(t):t)),h+="("+o.join(",")+")")):(h+=r.property,e||(h+="="+r.val)),h+=";";return h}clearTrace(){this.traceArr=[]}_trace(t){let e,i=this.traceArr;i.push(t),e=i.length,e>=100&&i.shift()}reset(){const t=this.getCanvas().getPixelRatio();this.setTransform(1*t,0,0,1*t,0,0)}getCanvas(){return this.canvas}clear(t){const e=this.getCanvas();t?this.clearRect(t.x||0,t.y||0,t.width||0,t.height||0):this.clearRect(0,0,e.getWidth()/e.pixelRatio,e.getHeight()/e.pixelRatio)}_applyLineCap(t){const e=t.attrs.lineCap;e&&this.setAttr("lineCap",e)}_applyOpacity(t){const e=t.getAbsoluteOpacity();1!==e&&this.setAttr("globalAlpha",e)}_applyLineJoin(t){const e=t.attrs.lineJoin;e&&this.setAttr("lineJoin",e)}setAttr(t,e){this._context[t]=e}arc(t,e,i,s,r,n){this._context.arc(t,e,i,s,r,n)}arcTo(t,e,i,s,r){this._context.arcTo(t,e,i,s,r)}beginPath(){this._context.beginPath()}bezierCurveTo(t,e,i,s,r,n){this._context.bezierCurveTo(t,e,i,s,r,n)}clearRect(t,e,i,s){this._context.clearRect(t,e,i,s)}clip(...t){this._context.clip.apply(this._context,t)}closePath(){this._context.closePath()}createImageData(t,e){const i=arguments;return 2===i.length?this._context.createImageData(t,e):1===i.length?this._context.createImageData(t):void 0}createLinearGradient(t,e,i,s){return this._context.createLinearGradient(t,e,i,s)}createPattern(t,e){return this._context.createPattern(t,e)}createRadialGradient(t,e,i,s,r,n){return this._context.createRadialGradient(t,e,i,s,r,n)}drawImage(t,e,i,s,r,n,o,a,l){const h=arguments,c=this._context;3===h.length?c.drawImage(t,e,i):5===h.length?c.drawImage(t,e,i,s,r):9===h.length&&c.drawImage(t,e,i,s,r,n,o,a,l)}ellipse(t,e,i,s,r,n,o,a){this._context.ellipse(t,e,i,s,r,n,o,a)}isPointInPath(t,e,i,s){return i?this._context.isPointInPath(i,t,e,s):this._context.isPointInPath(t,e,s)}fill(...t){this._context.fill.apply(this._context,t)}fillRect(t,e,i,s){this._context.fillRect(t,e,i,s)}strokeRect(t,e,i,s){this._context.strokeRect(t,e,i,s)}fillText(t,e,i,s){s?this._context.fillText(t,e,i,s):this._context.fillText(t,e,i)}measureText(t){return this._context.measureText(t)}getImageData(t,e,i,s){return this._context.getImageData(t,e,i,s)}lineTo(t,e){this._context.lineTo(t,e)}moveTo(t,e){this._context.moveTo(t,e)}rect(t,e,i,s){this._context.rect(t,e,i,s)}roundRect(t,e,i,s,r){this._context.roundRect(t,e,i,s,r)}putImageData(t,e,i){this._context.putImageData(t,e,i)}quadraticCurveTo(t,e,i,s){this._context.quadraticCurveTo(t,e,i,s)}restore(){this._context.restore()}rotate(t){this._context.rotate(t)}save(){this._context.save()}scale(t,e){this._context.scale(t,e)}setLineDash(t){this._context.setLineDash?this._context.setLineDash(t):"mozDash"in this._context?this._context.mozDash=t:"webkitLineDash"in this._context&&(this._context.webkitLineDash=t)}getLineDash(){return this._context.getLineDash()}setTransform(t,e,i,s,r,n){this._context.setTransform(t,e,i,s,r,n)}stroke(t){t?this._context.stroke(t):this._context.stroke()}strokeText(t,e,i,s){this._context.strokeText(t,e,i,s)}transform(t,e,i,s,r,n){this._context.transform(t,e,i,s,r,n)}translate(t,e){this._context.translate(t,e)}_enableTrace(){let e,s,r=this,n=i.length,o=this.setAttr;const a=function(e){let i,n=r[e];r[e]=function(){return s=function(e){const i=[],s=e.length,r=t.Util;for(let t=0;t<s;t++){let s=e[t];r._isNumber(s)?s=Math.round(1e3*s)/1e3:r._isString(s)||(s+=""),i.push(s)}return i}(Array.prototype.slice.call(arguments,0)),i=n.apply(r,arguments),r._trace({method:e,args:s}),i}};for(e=0;e<n;e++)a(i[e]);r.setAttr=function(){o.apply(r,arguments);const t=arguments[0];let e=arguments[1];"shadowOffsetX"!==t&&"shadowOffsetY"!==t&&"shadowBlur"!==t||(e/=this.canvas.getPixelRatio()),r._trace({property:t,val:e})}}_applyGlobalCompositeOperation(t){const e=t.attrs.globalCompositeOperation;!e||"source-over"===e||this.setAttr("globalCompositeOperation",e)}};Lr.Context=s,["fillStyle","strokeStyle","shadowColor","shadowBlur","shadowOffsetX","shadowOffsetY","letterSpacing","lineCap","lineDashOffset","lineJoin","lineWidth","miterLimit","direction","font","textAlign","textBaseline","globalAlpha","globalCompositeOperation","imageSmoothingEnabled"].forEach(function(t){Object.defineProperty(s.prototype,t,{get(){return this._context[t]},set(e){this._context[t]=e}})});Lr.SceneContext=class extends s{constructor(t,{willReadFrequently:e=!1}={}){super(t),this._context=t._canvas.getContext("2d",{willReadFrequently:e})}_fillColor(t){const e=t.fill();this.setAttr("fillStyle",e),t._fillFunc(this)}_fillPattern(t){this.setAttr("fillStyle",t._getFillPattern()),t._fillFunc(this)}_fillLinearGradient(t){const e=t._getLinearGradient();e&&(this.setAttr("fillStyle",e),t._fillFunc(this))}_fillRadialGradient(t){const e=t._getRadialGradient();e&&(this.setAttr("fillStyle",e),t._fillFunc(this))}_fill(t){const e=t.fill(),i=t.getFillPriority();if(e&&"color"===i)return void this._fillColor(t);const s=t.getFillPatternImage();if(s&&"pattern"===i)return void this._fillPattern(t);const r=t.getFillLinearGradientColorStops();if(r&&"linear-gradient"===i)return void this._fillLinearGradient(t);const n=t.getFillRadialGradientColorStops();n&&"radial-gradient"===i?this._fillRadialGradient(t):e?this._fillColor(t):s?this._fillPattern(t):r?this._fillLinearGradient(t):n&&this._fillRadialGradient(t)}_strokeLinearGradient(t){const e=t.getStrokeLinearGradientStartPoint(),i=t.getStrokeLinearGradientEndPoint(),s=t.getStrokeLinearGradientColorStops(),r=this.createLinearGradient(e.x,e.y,i.x,i.y);if(s){for(let t=0;t<s.length;t+=2)r.addColorStop(s[t],s[t+1]);this.setAttr("strokeStyle",r)}}_stroke(t){const e=t.dash(),i=t.getStrokeScaleEnabled();if(t.hasStroke()){if(!i){this.save();const t=this.getCanvas().getPixelRatio();this.setTransform(t,0,0,t,0,0)}this._applyLineCap(t),e&&t.dashEnabled()&&(this.setLineDash(e),this.setAttr("lineDashOffset",t.dashOffset())),this.setAttr("lineWidth",t.strokeWidth()),t.getShadowForStrokeEnabled()||this.setAttr("shadowColor","rgba(0,0,0,0)");t.getStrokeLinearGradientColorStops()?this._strokeLinearGradient(t):this.setAttr("strokeStyle",t.stroke()),t._strokeFunc(this),i||this.restore()}}_applyShadow(t){var e,i,s;const r=null!==(e=t.getShadowRGBA())&&void 0!==e?e:"black",n=null!==(i=t.getShadowBlur())&&void 0!==i?i:5,o=null!==(s=t.getShadowOffset())&&void 0!==s?s:{x:0,y:0},a=t.getAbsoluteScale(),l=this.canvas.getPixelRatio(),h=a.x*l,c=a.y*l;this.setAttr("shadowColor",r),this.setAttr("shadowBlur",n*Math.min(Math.abs(h),Math.abs(c))),this.setAttr("shadowOffsetX",o.x*h),this.setAttr("shadowOffsetY",o.y*c)}};return Lr.HitContext=class extends s{constructor(t){super(t),this._context=t._canvas.getContext("2d",{willReadFrequently:!0})}_fill(t){this.save(),this.setAttr("fillStyle",t.colorKey),t._fillFuncHit(this),this.restore()}strokeShape(t){t.hasHitStroke()&&this._stroke(t)}_stroke(t){if(t.hasHitStroke()){const e=t.getStrokeScaleEnabled();if(!e){this.save();const t=this.getCanvas().getPixelRatio();this.setTransform(t,0,0,t,0,0)}this._applyLineCap(t);const i=t.hitStrokeWidth(),s="auto"===i?t.strokeWidth():i;this.setAttr("lineWidth",s),this.setAttr("strokeStyle",t.colorKey),t._strokeFuncHit(this),e||this.restore()}}},Lr}function Fr(){if(Mr)return Ar;Mr=1,Object.defineProperty(Ar,"__esModule",{value:!0}),Ar.HitCanvas=Ar.SceneCanvas=Ar.Canvas=void 0;const t=$r(),e=Tr(),i=kr();let s;let r=class{constructor(e){this.pixelRatio=1,this.width=0,this.height=0,this.isCache=!1;const r=(e||{}).pixelRatio||i.Konva.pixelRatio||function(){if(s)return s;const e=t.Util.createCanvasElement(),r=e.getContext("2d");return s=(i.Konva._global.devicePixelRatio||1)/(r.webkitBackingStorePixelRatio||r.mozBackingStorePixelRatio||r.msBackingStorePixelRatio||r.oBackingStorePixelRatio||r.backingStorePixelRatio||1),t.Util.releaseCanvas(e),s}();this.pixelRatio=r,this._canvas=t.Util.createCanvasElement(),this._canvas.style.padding="0",this._canvas.style.margin="0",this._canvas.style.border="0",this._canvas.style.background="transparent",this._canvas.style.position="absolute",this._canvas.style.top="0",this._canvas.style.left="0"}getContext(){return this.context}getPixelRatio(){return this.pixelRatio}setPixelRatio(t){const e=this.pixelRatio;this.pixelRatio=t,this.setSize(this.getWidth()/e,this.getHeight()/e)}setWidth(t){this.width=this._canvas.width=t*this.pixelRatio,this._canvas.style.width=t+"px";const e=this.pixelRatio;this.getContext()._context.scale(e,e)}setHeight(t){this.height=this._canvas.height=t*this.pixelRatio,this._canvas.style.height=t+"px";const e=this.pixelRatio;this.getContext()._context.scale(e,e)}getWidth(){return this.width}getHeight(){return this.height}setSize(t,e){this.setWidth(t||0),this.setHeight(e||0)}toDataURL(e,i){try{return this._canvas.toDataURL(e,i)}catch(e){try{return this._canvas.toDataURL()}catch(e){return t.Util.error("Unable to get data URL. "+e.message+" For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html."),""}}}};Ar.Canvas=r;Ar.SceneCanvas=class extends r{constructor(t={width:0,height:0,willReadFrequently:!1}){super(t),this.context=new e.SceneContext(this,{willReadFrequently:t.willReadFrequently}),this.setSize(t.width,t.height)}};return Ar.HitCanvas=class extends r{constructor(t={width:0,height:0}){super(t),this.hitCanvas=!0,this.context=new e.HitContext(this),this.setSize(t.width,t.height)}},Ar}var Dr,Rr={};function Nr(){return Dr||(Dr=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.DD=void 0;const e=kr(),i=$r();t.DD={get isDragging(){let e=!1;return t.DD._dragElements.forEach(t=>{"dragging"===t.dragStatus&&(e=!0)}),e},justDragged:!1,get node(){let e;return t.DD._dragElements.forEach(t=>{e=t.node}),e},_dragElements:new Map,_drag(e){const s=[];t.DD._dragElements.forEach((t,r)=>{const{node:n}=t,o=n.getStage();o.setPointersPositions(e),void 0===t.pointerId&&(t.pointerId=i.Util._getFirstPointerId(e));const a=o._changedPointerPositions.find(e=>e.id===t.pointerId);if(a){if("dragging"!==t.dragStatus){const i=n.dragDistance();if(Math.max(Math.abs(a.x-t.startPointerPos.x),Math.abs(a.y-t.startPointerPos.y))<i)return;if(n.startDrag({evt:e}),!n.isDragging())return}n._setDragPosition(e,t),s.push(n)}}),s.forEach(t=>{t.fire("dragmove",{type:"dragmove",target:t,evt:e},!0)})},_endDragBefore(i){const s=[];t.DD._dragElements.forEach(r=>{const{node:n}=r,o=n.getStage();i&&o.setPointersPositions(i);if(!o._changedPointerPositions.find(t=>t.id===r.pointerId))return;"dragging"!==r.dragStatus&&"stopped"!==r.dragStatus||(t.DD.justDragged=!0,e.Konva._mouseListenClick=!1,e.Konva._touchListenClick=!1,e.Konva._pointerListenClick=!1,r.dragStatus="stopped");const a=r.node.getLayer()||r.node instanceof e.Konva.Stage&&r.node;a&&-1===s.indexOf(a)&&s.push(a)}),s.forEach(t=>{t.draw()})},_endDragAfter(e){t.DD._dragElements.forEach((i,s)=>{"stopped"===i.dragStatus&&i.node.fire("dragend",{type:"dragend",target:i.node,evt:e},!0),"dragging"!==i.dragStatus&&t.DD._dragElements.delete(s)})}},e.Konva.isBrowser&&(window.addEventListener("mouseup",t.DD._endDragBefore,!0),window.addEventListener("touchend",t.DD._endDragBefore,!0),window.addEventListener("touchcancel",t.DD._endDragBefore,!0),window.addEventListener("mousemove",t.DD._drag),window.addEventListener("touchmove",t.DD._drag),window.addEventListener("mouseup",t.DD._endDragAfter,!1),window.addEventListener("touchend",t.DD._endDragAfter,!1),window.addEventListener("touchcancel",t.DD._endDragAfter,!1))}(Rr)),Rr}var Or,Ur,zr,Gr={},Br={};function Wr(){if(Or)return Br;Or=1,Object.defineProperty(Br,"__esModule",{value:!0}),Br.RGBComponent=function(t){if(t>255)return 255;if(t<0)return 0;return Math.round(t)},Br.alphaComponent=function(t){if(t>1)return 1;if(t<1e-4)return 1e-4;return t},Br.getNumberValidator=function(){if(t.Konva.isUnminified)return function(t,s){return e.Util._isNumber(t)||e.Util.warn(i(t)+' is a not valid value for "'+s+'" attribute. The value should be a number.'),t}},Br.getNumberOrArrayOfNumbersValidator=function(s){if(t.Konva.isUnminified)return function(t,r){let n=e.Util._isNumber(t),o=e.Util._isArray(t)&&t.length==s;return n||o||e.Util.warn(i(t)+' is a not valid value for "'+r+'" attribute. The value should be a number or Array<number>('+s+")"),t}},Br.getNumberOrAutoValidator=function(){if(t.Konva.isUnminified)return function(t,s){return e.Util._isNumber(t)||"auto"===t||e.Util.warn(i(t)+' is a not valid value for "'+s+'" attribute. The value should be a number or "auto".'),t}},Br.getStringValidator=function(){if(t.Konva.isUnminified)return function(t,s){return e.Util._isString(t)||e.Util.warn(i(t)+' is a not valid value for "'+s+'" attribute. The value should be a string.'),t}},Br.getStringOrGradientValidator=function(){if(t.Konva.isUnminified)return function(t,s){const r=e.Util._isString(t),n="[object CanvasGradient]"===Object.prototype.toString.call(t)||t&&t.addColorStop;return r||n||e.Util.warn(i(t)+' is a not valid value for "'+s+'" attribute. The value should be a string or a native gradient.'),t}},Br.getFunctionValidator=function(){if(t.Konva.isUnminified)return function(t,s){return e.Util._isFunction(t)||e.Util.warn(i(t)+' is a not valid value for "'+s+'" attribute. The value should be a function.'),t}},Br.getNumberArrayValidator=function(){if(t.Konva.isUnminified)return function(t,s){const r=Int8Array?Object.getPrototypeOf(Int8Array):null;return r&&t instanceof r||(e.Util._isArray(t)?t.forEach(function(t){e.Util._isNumber(t)||e.Util.warn('"'+s+'" attribute has non numeric element '+t+". Make sure that all elements are numbers.")}):e.Util.warn(i(t)+' is a not valid value for "'+s+'" attribute. The value should be a array of numbers.')),t}},Br.getBooleanValidator=function(){if(t.Konva.isUnminified)return function(t,s){return!0===t||!1===t||e.Util.warn(i(t)+' is a not valid value for "'+s+'" attribute. The value should be a boolean.'),t}},Br.getComponentValidator=function(s){if(t.Konva.isUnminified)return function(t,r){return null==t||e.Util.isObject(t)||e.Util.warn(i(t)+' is a not valid value for "'+r+'" attribute. The value should be an object with properties '+s),t}};const t=kr(),e=$r();function i(t){return e.Util._isString(t)?'"'+t+'"':"[object Number]"===Object.prototype.toString.call(t)||e.Util._isBoolean(t)?t:Object.prototype.toString.call(t)}return Br}function Hr(){return Ur||(Ur=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.Factory=void 0;const e=$r(),i=Wr(),s="get",r="set";t.Factory={addGetterSetter(e,i,s,r,n){t.Factory.addGetter(e,i,s),t.Factory.addSetter(e,i,r,n),t.Factory.addOverloadedGetterSetter(e,i)},addGetter(t,i,r){const n=s+e.Util._capitalize(i);t.prototype[n]=t.prototype[n]||function(){const t=this.attrs[i];return void 0===t?r:t}},addSetter(i,s,n,o){const a=r+e.Util._capitalize(s);i.prototype[a]||t.Factory.overWriteSetter(i,s,n,o)},overWriteSetter(t,i,s,n){const o=r+e.Util._capitalize(i);t.prototype[o]=function(t){return s&&null!=t&&(t=s.call(this,t,i)),this._setAttr(i,t),n&&n.call(this),this}},addComponentsGetterSetter(n,o,a,l,h){const c=a.length,d=e.Util._capitalize,p=s+d(o),u=r+d(o);n.prototype[p]=function(){const t={};for(let e=0;e<c;e++){const i=a[e];t[i]=this.getAttr(o+d(i))}return t};const g=(0,i.getComponentValidator)(a);n.prototype[u]=function(t){const e=this.attrs[o];l&&(t=l.call(this,t,o)),g&&g.call(this,t,o);for(const e in t)t.hasOwnProperty(e)&&this._setAttr(o+d(e),t[e]);return t||a.forEach(t=>{this._setAttr(o+d(t),void 0)}),this._fireChangeEvent(o,e,t),h&&h.call(this),this},t.Factory.addOverloadedGetterSetter(n,o)},addOverloadedGetterSetter(t,i){const n=e.Util._capitalize(i),o=r+n,a=s+n;t.prototype[i]=function(){return arguments.length?(this[o](arguments[0]),this):this[a]()}},addDeprecatedGetterSetter(i,r,n,o){e.Util.error("Adding deprecated "+r);const a=s+e.Util._capitalize(r),l=r+" property is deprecated and will be removed soon. Look at Konva change log for more information.";i.prototype[a]=function(){e.Util.error(l);const t=this.attrs[r];return void 0===t?n:t},t.Factory.addSetter(i,r,o,function(){e.Util.error(l)}),t.Factory.addOverloadedGetterSetter(i,r)},backCompat(t,i){e.Util.each(i,function(i,n){const o=t.prototype[n],a=s+e.Util._capitalize(i),l=r+e.Util._capitalize(i);function h(){o.apply(this,arguments),e.Util.error('"'+i+'" method is deprecated and will be removed soon. Use ""'+n+'" instead.')}t.prototype[i]=h,t.prototype[a]=h,t.prototype[l]=h})},afterSetFilter(){this._filterUpToDate=!1}}}(Gr)),Gr}function Vr(){if(zr)return Er;zr=1,Object.defineProperty(Er,"__esModule",{value:!0}),Er.Node=void 0;const t=Fr(),e=Nr(),i=Hr(),s=kr(),r=$r(),n=Wr(),o="absoluteOpacity",a="allEventListeners",l="absoluteTransform",h="absoluteScale",c="canvas",d="listening",p="Shape",u=" ",g="stage",f="transform",_="visible",m=["xChange.konva","yChange.konva","scaleXChange.konva","scaleYChange.konva","skewXChange.konva","skewYChange.konva","rotationChange.konva","offsetXChange.konva","offsetYChange.konva","transformsEnabledChange.konva"].join(u);let v=1,y=class i{constructor(t){this._id=v++,this.eventListeners={},this.attrs={},this.index=0,this._allEventListeners=null,this.parent=null,this._cache=new Map,this._attachedDepsListeners=new Map,this._lastPos=null,this._batchingTransformChange=!1,this._needClearTransformCache=!1,this._filterUpToDate=!1,this._isUnderCache=!1,this._dragEventId=null,this._shouldFireChangeEvents=!1,this.setAttrs(t),this._shouldFireChangeEvents=!0}hasChildren(){return!1}_clearCache(t){t!==f&&t!==l||!this._cache.get(t)?t?this._cache.delete(t):this._cache.clear():this._cache.get(t).dirty=!0}_getCache(t,e){let i=this._cache.get(t);return(void 0===i||(t===f||t===l)&&!0===i.dirty)&&(i=e.call(this),this._cache.set(t,i)),i}_calculate(t,e,i){if(!this._attachedDepsListeners.get(t)){const i=e.map(t=>t+"Change.konva").join(u);this.on(i,()=>{this._clearCache(t)}),this._attachedDepsListeners.set(t,!0)}return this._getCache(t,i)}_getCanvasCache(){return this._cache.get(c)}_clearSelfAndDescendantCache(t){this._clearCache(t),t===l&&this.fire("absoluteTransformChange")}clearCache(){if(this._cache.has(c)){const{scene:t,filter:e,hit:i,buffer:s}=this._cache.get(c);r.Util.releaseCanvas(t,e,i,s),this._cache.delete(c)}return this._clearSelfAndDescendantCache(),this._requestDraw(),this}cache(e){const i=e||{};let s={};void 0!==i.x&&void 0!==i.y&&void 0!==i.width&&void 0!==i.height||(s=this.getClientRect({skipTransform:!0,relativeTo:this.getParent()||void 0}));let n=Math.ceil(i.width||s.width),a=Math.ceil(i.height||s.height),l=i.pixelRatio,d=void 0===i.x?Math.floor(s.x):i.x,p=void 0===i.y?Math.floor(s.y):i.y,u=i.offset||0,g=i.drawBorder||!1,f=i.hitCanvasPixelRatio||1;if(!n||!a)return void r.Util.error("Can not cache the node. Width or height of the node equals 0. Caching is skipped.");n+=2*u+(Math.abs(Math.round(s.x)-d)>.5?1:0),a+=2*u+(Math.abs(Math.round(s.y)-p)>.5?1:0),d-=u,p-=u;const _=new t.SceneCanvas({pixelRatio:l,width:n,height:a}),m=new t.SceneCanvas({pixelRatio:l,width:0,height:0,willReadFrequently:!0}),v=new t.HitCanvas({pixelRatio:f,width:n,height:a}),y=_.getContext(),b=v.getContext(),x=new t.SceneCanvas({width:_.width/_.pixelRatio+Math.abs(d),height:_.height/_.pixelRatio+Math.abs(p),pixelRatio:_.pixelRatio}),w=x.getContext();return v.isCache=!0,_.isCache=!0,this._cache.delete(c),this._filterUpToDate=!1,!1===i.imageSmoothingEnabled&&(_.getContext()._context.imageSmoothingEnabled=!1,m.getContext()._context.imageSmoothingEnabled=!1),y.save(),b.save(),w.save(),y.translate(-d,-p),b.translate(-d,-p),w.translate(-d,-p),x.x=d,x.y=p,this._isUnderCache=!0,this._clearSelfAndDescendantCache(o),this._clearSelfAndDescendantCache(h),this.drawScene(_,this,x),this.drawHit(v,this),this._isUnderCache=!1,y.restore(),b.restore(),g&&(y.save(),y.beginPath(),y.rect(0,0,n,a),y.closePath(),y.setAttr("strokeStyle","red"),y.setAttr("lineWidth",5),y.stroke(),y.restore()),this._cache.set(c,{scene:_,filter:m,hit:v,buffer:x,x:d,y:p}),this._requestDraw(),this}isCached(){return this._cache.has(c)}getClientRect(t){throw new Error('abstract "getClientRect" method call')}_transformedRect(t,e){const i=[{x:t.x,y:t.y},{x:t.x+t.width,y:t.y},{x:t.x+t.width,y:t.y+t.height},{x:t.x,y:t.y+t.height}];let s=1/0,r=1/0,n=-1/0,o=-1/0;const a=this.getAbsoluteTransform(e);return i.forEach(function(t){const e=a.point(t);void 0===s&&(s=n=e.x,r=o=e.y),s=Math.min(s,e.x),r=Math.min(r,e.y),n=Math.max(n,e.x),o=Math.max(o,e.y)}),{x:s,y:r,width:n-s,height:o-r}}_drawCachedSceneCanvas(t){t.save(),t._applyOpacity(this),t._applyGlobalCompositeOperation(this);const e=this._getCanvasCache();t.translate(e.x,e.y);const i=this._getCachedSceneCanvas(),s=i.pixelRatio;t.drawImage(i._canvas,0,0,i.width/s,i.height/s),t.restore()}_drawCachedHitCanvas(t){const e=this._getCanvasCache(),i=e.hit;t.save(),t.translate(e.x,e.y),t.drawImage(i._canvas,0,0,i.width/i.pixelRatio,i.height/i.pixelRatio),t.restore()}_getCachedSceneCanvas(){let t,e,i,s,n=this.filters(),o=this._getCanvasCache(),a=o.scene,l=o.filter,h=l.getContext();if(n){if(!this._filterUpToDate){const o=a.pixelRatio;l.setSize(a.width/a.pixelRatio,a.height/a.pixelRatio);try{for(t=n.length,h.clear(),h.drawImage(a._canvas,0,0,a.getWidth()/o,a.getHeight()/o),e=h.getImageData(0,0,l.getWidth(),l.getHeight()),i=0;i<t;i++)s=n[i],"function"==typeof s?(s.call(this,e),h.putImageData(e,0,0)):r.Util.error("Filter should be type of function, but got "+typeof s+" instead. Please check correct filters")}catch(t){r.Util.error("Unable to apply filter. "+t.message+" This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.")}this._filterUpToDate=!0}return l}return a}on(t,e){if(this._cache&&this._cache.delete(a),3===arguments.length)return this._delegate.apply(this,arguments);const i=t.split(u);for(let t=0;t<i.length;t++){const s=i[t].split("."),r=s[0],n=s[1]||"";this.eventListeners[r]||(this.eventListeners[r]=[]),this.eventListeners[r].push({name:n,handler:e})}return this}off(t,e){let i,s,r,n,o,l,h=(t||"").split(u),c=h.length;if(this._cache&&this._cache.delete(a),!t)for(s in this.eventListeners)this._off(s);for(i=0;i<c;i++)if(r=h[i],n=r.split("."),o=n[0],l=n[1],o)this.eventListeners[o]&&this._off(o,l,e);else for(s in this.eventListeners)this._off(s,l,e);return this}dispatchEvent(t){const e={target:this,type:t.type,evt:t};return this.fire(t.type,e),this}addEventListener(t,e){return this.on(t,function(t){e.call(this,t.evt)}),this}removeEventListener(t){return this.off(t),this}_delegate(t,e,i){const s=this;this.on(t,function(t){const n=t.target.findAncestors(e,!0,s);for(let e=0;e<n.length;e++)(t=r.Util.cloneObject(t)).currentTarget=n[e],i.call(n[e],t)})}remove(){return this.isDragging()&&this.stopDrag(),e.DD._dragElements.delete(this._id),this._remove(),this}_clearCaches(){this._clearSelfAndDescendantCache(l),this._clearSelfAndDescendantCache(o),this._clearSelfAndDescendantCache(h),this._clearSelfAndDescendantCache(g),this._clearSelfAndDescendantCache(_),this._clearSelfAndDescendantCache(d)}_remove(){this._clearCaches();const t=this.getParent();t&&t.children&&(t.children.splice(this.index,1),t._setChildrenIndices(),this.parent=null)}destroy(){return this.remove(),this.clearCache(),this}getAttr(t){const e="get"+r.Util._capitalize(t);return r.Util._isFunction(this[e])?this[e]():this.attrs[t]}getAncestors(){let t=this.getParent(),e=[];for(;t;)e.push(t),t=t.getParent();return e}getAttrs(){return this.attrs||{}}setAttrs(t){return this._batchTransformChanges(()=>{let e,i;if(!t)return this;for(e in t)"children"!==e&&(i="set"+r.Util._capitalize(e),r.Util._isFunction(this[i])?this[i](t[e]):this._setAttr(e,t[e]))}),this}isListening(){return this._getCache(d,this._isListening)}_isListening(t){if(!this.listening())return!1;const e=this.getParent();return!e||e===t||this===t||e._isListening(t)}isVisible(){return this._getCache(_,this._isVisible)}_isVisible(t){if(!this.visible())return!1;const e=this.getParent();return!e||e===t||this===t||e._isVisible(t)}shouldDrawHit(t,i=!1){if(t)return this._isVisible(t)&&this._isListening(t);const r=this.getLayer();let n=!1;e.DD._dragElements.forEach(t=>{"dragging"===t.dragStatus&&("Stage"===t.node.nodeType||t.node.getLayer()===r)&&(n=!0)});const o=!i&&!s.Konva.hitOnDragEnabled&&(n||s.Konva.isTransforming());return this.isListening()&&this.isVisible()&&!o}show(){return this.visible(!0),this}hide(){return this.visible(!1),this}getZIndex(){return this.index||0}getAbsoluteZIndex(){let t,e,i,s,r=this.getDepth(),n=this,o=0;const a=this.getStage();return"Stage"!==n.nodeType&&a&&function a(l){for(t=[],e=l.length,i=0;i<e;i++)s=l[i],o++,s.nodeType!==p&&(t=t.concat(s.getChildren().slice())),s._id===n._id&&(i=e);t.length>0&&t[0].getDepth()<=r&&a(t)}(a.getChildren()),o}getDepth(){let t=0,e=this.parent;for(;e;)t++,e=e.parent;return t}_batchTransformChanges(t){this._batchingTransformChange=!0,t(),this._batchingTransformChange=!1,this._needClearTransformCache&&(this._clearCache(f),this._clearSelfAndDescendantCache(l)),this._needClearTransformCache=!1}setPosition(t){return this._batchTransformChanges(()=>{this.x(t.x),this.y(t.y)}),this}getPosition(){return{x:this.x(),y:this.y()}}getRelativePointerPosition(){const t=this.getStage();if(!t)return null;const e=t.getPointerPosition();if(!e)return null;const i=this.getAbsoluteTransform().copy();return i.invert(),i.point(e)}getAbsolutePosition(t){let e=!1,i=this.parent;for(;i;){if(i.isCached()){e=!0;break}i=i.parent}e&&!t&&(t=!0);const s=this.getAbsoluteTransform(t).getMatrix(),n=new r.Transform,o=this.offset();return n.m=s.slice(),n.translate(o.x,o.y),n.getTranslation()}setAbsolutePosition(t){const{x:e,y:i,...s}=this._clearTransform();this.attrs.x=e,this.attrs.y=i,this._clearCache(f);const r=this._getAbsoluteTransform().copy();return r.invert(),r.translate(t.x,t.y),t={x:this.attrs.x+r.getTranslation().x,y:this.attrs.y+r.getTranslation().y},this._setTransform(s),this.setPosition({x:t.x,y:t.y}),this._clearCache(f),this._clearSelfAndDescendantCache(l),this}_setTransform(t){let e;for(e in t)this.attrs[e]=t[e]}_clearTransform(){const t={x:this.x(),y:this.y(),rotation:this.rotation(),scaleX:this.scaleX(),scaleY:this.scaleY(),offsetX:this.offsetX(),offsetY:this.offsetY(),skewX:this.skewX(),skewY:this.skewY()};return this.attrs.x=0,this.attrs.y=0,this.attrs.rotation=0,this.attrs.scaleX=1,this.attrs.scaleY=1,this.attrs.offsetX=0,this.attrs.offsetY=0,this.attrs.skewX=0,this.attrs.skewY=0,t}move(t){let e=t.x,i=t.y,s=this.x(),r=this.y();return void 0!==e&&(s+=e),void 0!==i&&(r+=i),this.setPosition({x:s,y:r}),this}_eachAncestorReverse(t,e){let i,s,r=[],n=this.getParent();if(!e||e._id!==this._id){for(r.unshift(this);n&&(!e||n._id!==e._id);)r.unshift(n),n=n.parent;for(i=r.length,s=0;s<i;s++)t(r[s])}}rotate(t){return this.rotation(this.rotation()+t),this}moveToTop(){if(!this.parent)return r.Util.warn("Node has no parent. moveToTop function is ignored."),!1;const t=this.index;return t<this.parent.getChildren().length-1&&(this.parent.children.splice(t,1),this.parent.children.push(this),this.parent._setChildrenIndices(),!0)}moveUp(){if(!this.parent)return r.Util.warn("Node has no parent. moveUp function is ignored."),!1;const t=this.index;return t<this.parent.getChildren().length-1&&(this.parent.children.splice(t,1),this.parent.children.splice(t+1,0,this),this.parent._setChildrenIndices(),!0)}moveDown(){if(!this.parent)return r.Util.warn("Node has no parent. moveDown function is ignored."),!1;const t=this.index;return t>0&&(this.parent.children.splice(t,1),this.parent.children.splice(t-1,0,this),this.parent._setChildrenIndices(),!0)}moveToBottom(){if(!this.parent)return r.Util.warn("Node has no parent. moveToBottom function is ignored."),!1;const t=this.index;return t>0&&(this.parent.children.splice(t,1),this.parent.children.unshift(this),this.parent._setChildrenIndices(),!0)}setZIndex(t){if(!this.parent)return r.Util.warn("Node has no parent. zIndex parameter is ignored."),this;(t<0||t>=this.parent.children.length)&&r.Util.warn("Unexpected value "+t+" for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to "+(this.parent.children.length-1)+".");const e=this.index;return this.parent.children.splice(e,1),this.parent.children.splice(t,0,this),this.parent._setChildrenIndices(),this}getAbsoluteOpacity(){return this._getCache(o,this._getAbsoluteOpacity)}_getAbsoluteOpacity(){let t=this.opacity();const e=this.getParent();return e&&!e._isUnderCache&&(t*=e.getAbsoluteOpacity()),t}moveTo(t){return this.getParent()!==t&&(this._remove(),t.add(this)),this}toObject(){let t,e,i,s,n,o=this.getAttrs();const a={attrs:{},className:this.getClassName()};for(t in o)e=o[t],n=r.Util.isObject(e)&&!r.Util._isPlainObject(e)&&!r.Util._isArray(e),n||(i="function"==typeof this[t]&&this[t],delete o[t],s=i?i.call(this):null,o[t]=e,s!==e&&(a.attrs[t]=e));return r.Util._prepareToStringify(a)}toJSON(){return JSON.stringify(this.toObject())}getParent(){return this.parent}findAncestors(t,e,i){const s=[];e&&this._isMatch(t)&&s.push(this);let r=this.parent;for(;r;){if(r===i)return s;r._isMatch(t)&&s.push(r),r=r.parent}return s}isAncestorOf(t){return!1}findAncestor(t,e,i){return this.findAncestors(t,e,i)[0]}_isMatch(t){if(!t)return!1;if("function"==typeof t)return t(this);let e,i,s=t.replace(/ /g,"").split(","),n=s.length;for(e=0;e<n;e++)if(i=s[e],r.Util.isValidSelector(i)||(r.Util.warn('Selector "'+i+'" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'),r.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'),r.Util.warn("Konva is awesome, right?")),"#"===i.charAt(0)){if(this.id()===i.slice(1))return!0}else if("."===i.charAt(0)){if(this.hasName(i.slice(1)))return!0}else if(this.className===i||this.nodeType===i)return!0;return!1}getLayer(){const t=this.getParent();return t?t.getLayer():null}getStage(){return this._getCache(g,this._getStage)}_getStage(){const t=this.getParent();return t?t.getStage():null}fire(t,e={},i){return e.target=e.target||this,i?this._fireAndBubble(t,e):this._fire(t,e),this}getAbsoluteTransform(t){return t?this._getAbsoluteTransform(t):this._getCache(l,this._getAbsoluteTransform)}_getAbsoluteTransform(t){let e;if(t)return e=new r.Transform,this._eachAncestorReverse(function(t){const i=t.transformsEnabled();"all"===i?e.multiply(t.getTransform()):"position"===i&&e.translate(t.x()-t.offsetX(),t.y()-t.offsetY())},t),e;{e=this._cache.get(l)||new r.Transform,this.parent?this.parent.getAbsoluteTransform().copyInto(e):e.reset();const t=this.transformsEnabled();if("all"===t)e.multiply(this.getTransform());else if("position"===t){const t=this.attrs.x||0,i=this.attrs.y||0,s=this.attrs.offsetX||0,r=this.attrs.offsetY||0;e.translate(t-s,i-r)}return e.dirty=!1,e}}getAbsoluteScale(t){let e=this;for(;e;)e._isUnderCache&&(t=e),e=e.getParent();const i=this.getAbsoluteTransform(t).decompose();return{x:i.scaleX,y:i.scaleY}}getAbsoluteRotation(){return this.getAbsoluteTransform().decompose().rotation}getTransform(){return this._getCache(f,this._getTransform)}_getTransform(){var t,e;const i=this._cache.get(f)||new r.Transform;i.reset();const n=this.x(),o=this.y(),a=s.Konva.getAngle(this.rotation()),l=null!==(t=this.attrs.scaleX)&&void 0!==t?t:1,h=null!==(e=this.attrs.scaleY)&&void 0!==e?e:1,c=this.attrs.skewX||0,d=this.attrs.skewY||0,p=this.attrs.offsetX||0,u=this.attrs.offsetY||0;return 0===n&&0===o||i.translate(n,o),0!==a&&i.rotate(a),0===c&&0===d||i.skew(c,d),1===l&&1===h||i.scale(l,h),0===p&&0===u||i.translate(-1*p,-1*u),i.dirty=!1,i}clone(t){let e,i,s,n,o,a=r.Util.cloneObject(this.attrs);for(e in t)a[e]=t[e];const l=new this.constructor(a);for(e in this.eventListeners)for(i=this.eventListeners[e],s=i.length,n=0;n<s;n++)o=i[n],o.name.indexOf("konva")<0&&(l.eventListeners[e]||(l.eventListeners[e]=[]),l.eventListeners[e].push(o));return l}_toKonvaCanvas(e){e=e||{};const i=this.getClientRect(),s=this.getStage(),r=void 0!==e.x?e.x:Math.floor(i.x),n=void 0!==e.y?e.y:Math.floor(i.y),o=e.pixelRatio||1,a=new t.SceneCanvas({width:e.width||Math.ceil(i.width)||(s?s.width():0),height:e.height||Math.ceil(i.height)||(s?s.height():0),pixelRatio:o}),l=a.getContext(),h=new t.SceneCanvas({width:a.width/a.pixelRatio+Math.abs(r),height:a.height/a.pixelRatio+Math.abs(n),pixelRatio:a.pixelRatio});return!1===e.imageSmoothingEnabled&&(l._context.imageSmoothingEnabled=!1),l.save(),(r||n)&&l.translate(-1*r,-1*n),this.drawScene(a,void 0,h),l.restore(),a}toCanvas(t){return this._toKonvaCanvas(t)._canvas}toDataURL(t){const e=(t=t||{}).mimeType||null,i=t.quality||null,s=this._toKonvaCanvas(t).toDataURL(e,i);return t.callback&&t.callback(s),s}toImage(t){return new Promise((e,i)=>{try{const i=null==t?void 0:t.callback;i&&delete t.callback,r.Util._urlToImage(this.toDataURL(t),function(t){e(t),null==i||i(t)})}catch(t){i(t)}})}toBlob(t){return new Promise((e,i)=>{try{const i=null==t?void 0:t.callback;i&&delete t.callback,this.toCanvas(t).toBlob(t=>{e(t),null==i||i(t)},null==t?void 0:t.mimeType,null==t?void 0:t.quality)}catch(t){i(t)}})}setSize(t){return this.width(t.width),this.height(t.height),this}getSize(){return{width:this.width(),height:this.height()}}getClassName(){return this.className||this.nodeType}getType(){return this.nodeType}getDragDistance(){return void 0!==this.attrs.dragDistance?this.attrs.dragDistance:this.parent?this.parent.getDragDistance():s.Konva.dragDistance}_off(t,e,i){let s,r,n,o=this.eventListeners[t];for(s=0;s<o.length;s++)if(r=o[s].name,n=o[s].handler,!("konva"===r&&"konva"!==e||e&&r!==e||i&&i!==n)){if(o.splice(s,1),0===o.length){delete this.eventListeners[t];break}s--}}_fireChangeEvent(t,e,i){this._fire(t+"Change",{oldVal:e,newVal:i})}addName(t){if(!this.hasName(t)){const e=this.name(),i=e?e+" "+t:t;this.name(i)}return this}hasName(t){if(!t)return!1;const e=this.name();if(!e)return!1;return-1!==(e||"").split(/\s/g).indexOf(t)}removeName(t){const e=(this.name()||"").split(/\s/g),i=e.indexOf(t);return-1!==i&&(e.splice(i,1),this.name(e.join(" "))),this}setAttr(t,e){const i=this["set"+r.Util._capitalize(t)];return r.Util._isFunction(i)?i.call(this,e):this._setAttr(t,e),this}_requestDraw(){if(s.Konva.autoDrawEnabled){const t=this.getLayer()||this.getStage();null==t||t.batchDraw()}}_setAttr(t,e){const i=this.attrs[t];(i!==e||r.Util.isObject(e))&&(null==e?delete this.attrs[t]:this.attrs[t]=e,this._shouldFireChangeEvents&&this._fireChangeEvent(t,i,e),this._requestDraw())}_setComponentAttr(t,e,i){let s;void 0!==i&&(s=this.attrs[t],s||(this.attrs[t]=this.getAttr(t)),this.attrs[t][e]=i,this._fireChangeEvent(t,s,i))}_fireAndBubble(t,e,i){e&&this.nodeType===p&&(e.target=this);const s=["mouseenter","mouseleave","pointerenter","pointerleave","touchenter","touchleave"];if(!(-1!==s.indexOf(t)&&(i&&(this===i||this.isAncestorOf&&this.isAncestorOf(i))||"Stage"===this.nodeType&&!i))){this._fire(t,e);const r=-1!==s.indexOf(t)&&i&&i.isAncestorOf&&i.isAncestorOf(this)&&!i.isAncestorOf(this.parent);(e&&!e.cancelBubble||!e)&&this.parent&&this.parent.isListening()&&!r&&(i&&i.parent?this._fireAndBubble.call(this.parent,t,e,i):this._fireAndBubble.call(this.parent,t,e))}}_getProtoListeners(t){var e,i,s;const r=null!==(e=this._cache.get(a))&&void 0!==e?e:{};let n=null==r?void 0:r[t];if(void 0===n){n=[];let e=Object.getPrototypeOf(this);for(;e;){const r=null!==(s=null===(i=e.eventListeners)||void 0===i?void 0:i[t])&&void 0!==s?s:[];n.push(...r),e=Object.getPrototypeOf(e)}r[t]=n,this._cache.set(a,r)}return n}_fire(t,e){(e=e||{}).currentTarget=this,e.type=t;const i=this._getProtoListeners(t);if(i)for(let t=0;t<i.length;t++)i[t].handler.call(this,e);const s=this.eventListeners[t];if(s)for(let t=0;t<s.length;t++)s[t].handler.call(this,e)}draw(){return this.drawScene(),this.drawHit(),this}_createDragElement(t){const i=t?t.pointerId:void 0,s=this.getStage(),r=this.getAbsolutePosition();if(!s)return;const n=s._getPointerById(i)||s._changedPointerPositions[0]||r;e.DD._dragElements.set(this._id,{node:this,startPointerPos:n,offset:{x:n.x-r.x,y:n.y-r.y},dragStatus:"ready",pointerId:i})}startDrag(t,i=!0){e.DD._dragElements.has(this._id)||this._createDragElement(t);e.DD._dragElements.get(this._id).dragStatus="dragging",this.fire("dragstart",{type:"dragstart",target:this,evt:t&&t.evt},i)}_setDragPosition(t,e){const i=this.getStage()._getPointerById(e.pointerId);if(!i)return;let s={x:i.x-e.offset.x,y:i.y-e.offset.y};const n=this.dragBoundFunc();if(void 0!==n){const e=n.call(this,s,t);e?s=e:r.Util.warn("dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.")}this._lastPos&&this._lastPos.x===s.x&&this._lastPos.y===s.y||(this.setAbsolutePosition(s),this._requestDraw()),this._lastPos=s}stopDrag(t){const i=e.DD._dragElements.get(this._id);i&&(i.dragStatus="stopped"),e.DD._endDragBefore(t),e.DD._endDragAfter(t)}setDraggable(t){this._setAttr("draggable",t),this._dragChange()}isDragging(){const t=e.DD._dragElements.get(this._id);return!!t&&"dragging"===t.dragStatus}_listenDrag(){this._dragCleanup(),this.on("mousedown.konva touchstart.konva",function(t){if(!(!(void 0!==t.evt.button)||s.Konva.dragButtons.indexOf(t.evt.button)>=0))return;if(this.isDragging())return;let i=!1;e.DD._dragElements.forEach(t=>{this.isAncestorOf(t.node)&&(i=!0)}),i||this._createDragElement(t)})}_dragChange(){if(this.attrs.draggable)this._listenDrag();else{this._dragCleanup();if(!this.getStage())return;const t=e.DD._dragElements.get(this._id),i=t&&"dragging"===t.dragStatus,s=t&&"ready"===t.dragStatus;i?this.stopDrag():s&&e.DD._dragElements.delete(this._id)}}_dragCleanup(){this.off("mousedown.konva"),this.off("touchstart.konva")}isClientRectOnScreen(t={x:0,y:0}){const e=this.getStage();if(!e)return!1;const i={x:-t.x,y:-t.y,width:e.width()+2*t.x,height:e.height()+2*t.y};return r.Util.haveIntersection(i,this.getClientRect())}static create(t,e){return r.Util._isString(t)&&(t=JSON.parse(t)),this._createNode(t,e)}static _createNode(t,e){let n,o,a,l=i.prototype.getClassName.call(t),h=t.children;e&&(t.attrs.container=e),s.Konva[l]||(r.Util.warn('Can not find a node with class name "'+l+'". Fallback to "Shape".'),l="Shape");if(n=new(0,s.Konva[l])(t.attrs),h)for(o=h.length,a=0;a<o;a++)n.add(i._createNode(h[a]));return n}};Er.Node=y,y.prototype.nodeType="Node",y.prototype._attrsAffectingSize=[],y.prototype.eventListeners={},y.prototype.on.call(y.prototype,m,function(){this._batchingTransformChange?this._needClearTransformCache=!0:(this._clearCache(f),this._clearSelfAndDescendantCache(l))}),y.prototype.on.call(y.prototype,"visibleChange.konva",function(){this._clearSelfAndDescendantCache(_)}),y.prototype.on.call(y.prototype,"listeningChange.konva",function(){this._clearSelfAndDescendantCache(d)}),y.prototype.on.call(y.prototype,"opacityChange.konva",function(){this._clearSelfAndDescendantCache(o)});const b=i.Factory.addGetterSetter;return b(y,"zIndex"),b(y,"absolutePosition"),b(y,"position"),b(y,"x",0,(0,n.getNumberValidator)()),b(y,"y",0,(0,n.getNumberValidator)()),b(y,"globalCompositeOperation","source-over",(0,n.getStringValidator)()),b(y,"opacity",1,(0,n.getNumberValidator)()),b(y,"name","",(0,n.getStringValidator)()),b(y,"id","",(0,n.getStringValidator)()),b(y,"rotation",0,(0,n.getNumberValidator)()),i.Factory.addComponentsGetterSetter(y,"scale",["x","y"]),b(y,"scaleX",1,(0,n.getNumberValidator)()),b(y,"scaleY",1,(0,n.getNumberValidator)()),i.Factory.addComponentsGetterSetter(y,"skew",["x","y"]),b(y,"skewX",0,(0,n.getNumberValidator)()),b(y,"skewY",0,(0,n.getNumberValidator)()),i.Factory.addComponentsGetterSetter(y,"offset",["x","y"]),b(y,"offsetX",0,(0,n.getNumberValidator)()),b(y,"offsetY",0,(0,n.getNumberValidator)()),b(y,"dragDistance",void 0,(0,n.getNumberValidator)()),b(y,"width",0,(0,n.getNumberValidator)()),b(y,"height",0,(0,n.getNumberValidator)()),b(y,"listening",!0,(0,n.getBooleanValidator)()),b(y,"preventDefault",!0,(0,n.getBooleanValidator)()),b(y,"filters",void 0,function(t){return this._filterUpToDate=!1,t}),b(y,"visible",!0,(0,n.getBooleanValidator)()),b(y,"transformsEnabled","all",(0,n.getStringValidator)()),b(y,"size"),b(y,"dragBoundFunc"),b(y,"draggable",!1,(0,n.getBooleanValidator)()),i.Factory.backCompat(y,{rotateDeg:"rotate",setRotationDeg:"setRotation",getRotationDeg:"getRotation"}),Er}var jr,qr={};function Kr(){if(jr)return qr;jr=1,Object.defineProperty(qr,"__esModule",{value:!0}),qr.Container=void 0;const t=Hr(),e=Vr(),i=Wr();let s=class extends e.Node{constructor(){super(...arguments),this.children=[]}getChildren(t){const e=this.children||[];return t?e.filter(t):e}hasChildren(){return this.getChildren().length>0}removeChildren(){return this.getChildren().forEach(t=>{t.parent=null,t.index=0,t.remove()}),this.children=[],this._requestDraw(),this}destroyChildren(){return this.getChildren().forEach(t=>{t.parent=null,t.index=0,t.destroy()}),this.children=[],this._requestDraw(),this}add(...t){if(0===t.length)return this;if(t.length>1){for(let e=0;e<t.length;e++)this.add(t[e]);return this}const e=t[0];return e.getParent()?(e.moveTo(this),this):(this._validateAdd(e),e.index=this.getChildren().length,e.parent=this,e._clearCaches(),this.getChildren().push(e),this._fire("add",{child:e}),this._requestDraw(),this)}destroy(){return this.hasChildren()&&this.destroyChildren(),super.destroy(),this}find(t){return this._generalFind(t,!1)}findOne(t){const e=this._generalFind(t,!0);return e.length>0?e[0]:void 0}_generalFind(t,e){const i=[];return this._descendants(s=>{const r=s._isMatch(t);return r&&i.push(s),!(!r||!e)}),i}_descendants(t){let e=!1;const i=this.getChildren();for(const s of i){if(e=t(s),e)return!0;if(s.hasChildren()&&(e=s._descendants(t),e))return!0}return!1}toObject(){const t=e.Node.prototype.toObject.call(this);return t.children=[],this.getChildren().forEach(e=>{t.children.push(e.toObject())}),t}isAncestorOf(t){let e=t.getParent();for(;e;){if(e._id===this._id)return!0;e=e.getParent()}return!1}clone(t){const i=e.Node.prototype.clone.call(this,t);return this.getChildren().forEach(function(t){i.add(t.clone())}),i}getAllIntersections(t){const e=[];return this.find("Shape").forEach(i=>{i.isVisible()&&i.intersects(t)&&e.push(i)}),e}_clearSelfAndDescendantCache(t){var e;super._clearSelfAndDescendantCache(t),this.isCached()||null===(e=this.children)||void 0===e||e.forEach(function(e){e._clearSelfAndDescendantCache(t)})}_setChildrenIndices(){var t;null===(t=this.children)||void 0===t||t.forEach(function(t,e){t.index=e}),this._requestDraw()}drawScene(t,e,i){const s=this.getLayer(),r=t||s&&s.getCanvas(),n=r&&r.getContext(),o=this._getCanvasCache(),a=o&&o.scene,l=r&&r.isCache;if(!this.isVisible()&&!l)return this;if(a){n.save();const t=this.getAbsoluteTransform(e).getMatrix();n.transform(t[0],t[1],t[2],t[3],t[4],t[5]),this._drawCachedSceneCanvas(n),n.restore()}else this._drawChildren("drawScene",r,e,i);return this}drawHit(t,e){if(!this.shouldDrawHit(e))return this;const i=this.getLayer(),s=t||i&&i.hitCanvas,r=s&&s.getContext(),n=this._getCanvasCache();if(n&&n.hit){r.save();const t=this.getAbsoluteTransform(e).getMatrix();r.transform(t[0],t[1],t[2],t[3],t[4],t[5]),this._drawCachedHitCanvas(r),r.restore()}else this._drawChildren("drawHit",s,e);return this}_drawChildren(t,e,i,s){var r;const n=e&&e.getContext(),o=this.clipWidth(),a=this.clipHeight(),l=this.clipFunc(),h="number"==typeof o&&"number"==typeof a||l,c=i===this;if(h){n.save();const t=this.getAbsoluteTransform(i);let e,s=t.getMatrix();if(n.transform(s[0],s[1],s[2],s[3],s[4],s[5]),n.beginPath(),l)e=l.call(this,n,this);else{const t=this.clipX(),e=this.clipY();n.rect(t||0,e||0,o,a)}n.clip.apply(n,e),s=t.copy().invert().getMatrix(),n.transform(s[0],s[1],s[2],s[3],s[4],s[5])}const d=!c&&"source-over"!==this.globalCompositeOperation()&&"drawScene"===t;d&&(n.save(),n._applyGlobalCompositeOperation(this)),null===(r=this.children)||void 0===r||r.forEach(function(r){r[t](e,i,s)}),d&&n.restore(),h&&n.restore()}getClientRect(t={}){var e;const i=t.skipTransform,s=t.relativeTo;let r,n,o,a,l={x:1/0,y:1/0,width:0,height:0};const h=this;null===(e=this.children)||void 0===e||e.forEach(function(e){if(!e.visible())return;const i=e.getClientRect({relativeTo:h,skipShadow:t.skipShadow,skipStroke:t.skipStroke});0===i.width&&0===i.height||(void 0===r?(r=i.x,n=i.y,o=i.x+i.width,a=i.y+i.height):(r=Math.min(r,i.x),n=Math.min(n,i.y),o=Math.max(o,i.x+i.width),a=Math.max(a,i.y+i.height)))});const c=this.find("Shape");let d=!1;for(let t=0;t<c.length;t++){if(c[t]._isVisible(this)){d=!0;break}}return l=d&&void 0!==r?{x:r,y:n,width:o-r,height:a-n}:{x:0,y:0,width:0,height:0},i?l:this._transformedRect(l,s)}};return qr.Container=s,t.Factory.addComponentsGetterSetter(s,"clip",["x","y","width","height"]),t.Factory.addGetterSetter(s,"clipX",void 0,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(s,"clipY",void 0,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(s,"clipWidth",void 0,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(s,"clipHeight",void 0,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(s,"clipFunc"),qr}var Yr,Xr,Jr={},Zr={};function Qr(){if(Yr)return Zr;Yr=1,Object.defineProperty(Zr,"__esModule",{value:!0}),Zr.getCapturedShape=function(t){return e.get(t)},Zr.createEvent=s,Zr.hasPointerCapture=function(t,i){return e.get(t)===i},Zr.setPointerCapture=function(t,n){r(t);if(!n.getStage())return;e.set(t,n),i&&n._fire("gotpointercapture",s(new PointerEvent("gotpointercapture")))},Zr.releaseCapture=r;const t=kr(),e=new Map,i=void 0!==t.Konva._global.PointerEvent;function s(t){return{evt:t,pointerId:t.pointerId}}function r(t,r){const n=e.get(t);if(!n)return;const o=n.getStage();o&&o.content,e.delete(t),i&&n._fire("lostpointercapture",s(new PointerEvent("lostpointercapture")))}return Zr}var tn,en,sn={},rn={};function nn(){return tn||(tn=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.Shape=t.shapes=void 0;const e=kr(),i=$r(),s=Hr(),r=Vr(),n=Wr(),o=kr(),a=Qr(),l="hasShadow",h="shadowRGBA",c="patternImage",d="linearGradient",p="radialGradient";let u;function g(){return u||(u=i.Util.createCanvasElement().getContext("2d"),u)}t.shapes={};class f extends r.Node{constructor(e){let s;for(super(e);s=i.Util.getRandomColor(),!s||s in t.shapes;);this.colorKey=s,t.shapes[s]=this}getContext(){return i.Util.warn("shape.getContext() method is deprecated. Please do not use it."),this.getLayer().getContext()}getCanvas(){return i.Util.warn("shape.getCanvas() method is deprecated. Please do not use it."),this.getLayer().getCanvas()}getSceneFunc(){return this.attrs.sceneFunc||this._sceneFunc}getHitFunc(){return this.attrs.hitFunc||this._hitFunc}hasShadow(){return this._getCache(l,this._hasShadow)}_hasShadow(){return this.shadowEnabled()&&0!==this.shadowOpacity()&&!!(this.shadowColor()||this.shadowBlur()||this.shadowOffsetX()||this.shadowOffsetY())}_getFillPattern(){return this._getCache(c,this.__getFillPattern)}__getFillPattern(){if(this.fillPatternImage()){const t=g().createPattern(this.fillPatternImage(),this.fillPatternRepeat()||"repeat");if(t&&t.setTransform){const s=new i.Transform;s.translate(this.fillPatternX(),this.fillPatternY()),s.rotate(e.Konva.getAngle(this.fillPatternRotation())),s.scale(this.fillPatternScaleX(),this.fillPatternScaleY()),s.translate(-1*this.fillPatternOffsetX(),-1*this.fillPatternOffsetY());const r=s.getMatrix(),n="undefined"==typeof DOMMatrix?{a:r[0],b:r[1],c:r[2],d:r[3],e:r[4],f:r[5]}:new DOMMatrix(r);t.setTransform(n)}return t}}_getLinearGradient(){return this._getCache(d,this.__getLinearGradient)}__getLinearGradient(){const t=this.fillLinearGradientColorStops();if(t){const e=g(),i=this.fillLinearGradientStartPoint(),s=this.fillLinearGradientEndPoint(),r=e.createLinearGradient(i.x,i.y,s.x,s.y);for(let e=0;e<t.length;e+=2)r.addColorStop(t[e],t[e+1]);return r}}_getRadialGradient(){return this._getCache(p,this.__getRadialGradient)}__getRadialGradient(){const t=this.fillRadialGradientColorStops();if(t){const e=g(),i=this.fillRadialGradientStartPoint(),s=this.fillRadialGradientEndPoint(),r=e.createRadialGradient(i.x,i.y,this.fillRadialGradientStartRadius(),s.x,s.y,this.fillRadialGradientEndRadius());for(let e=0;e<t.length;e+=2)r.addColorStop(t[e],t[e+1]);return r}}getShadowRGBA(){return this._getCache(h,this._getShadowRGBA)}_getShadowRGBA(){if(!this.hasShadow())return;const t=i.Util.colorToRGBA(this.shadowColor());return t?"rgba("+t.r+","+t.g+","+t.b+","+t.a*(this.shadowOpacity()||1)+")":void 0}hasFill(){return this._calculate("hasFill",["fillEnabled","fill","fillPatternImage","fillLinearGradientColorStops","fillRadialGradientColorStops"],()=>this.fillEnabled()&&!!(this.fill()||this.fillPatternImage()||this.fillLinearGradientColorStops()||this.fillRadialGradientColorStops()))}hasStroke(){return this._calculate("hasStroke",["strokeEnabled","strokeWidth","stroke","strokeLinearGradientColorStops"],()=>this.strokeEnabled()&&this.strokeWidth()&&!(!this.stroke()&&!this.strokeLinearGradientColorStops()))}hasHitStroke(){const t=this.hitStrokeWidth();return"auto"===t?this.hasStroke():this.strokeEnabled()&&!!t}intersects(t){const e=this.getStage();if(!e)return!1;const i=e.bufferHitCanvas;i.getContext().clear(),this.drawHit(i,void 0,!0);return i.context.getImageData(Math.round(t.x),Math.round(t.y),1,1).data[3]>0}destroy(){return r.Node.prototype.destroy.call(this),delete t.shapes[this.colorKey],delete this.colorKey,this}_useBufferCanvas(t){var e;if(!(null===(e=this.attrs.perfectDrawEnabled)||void 0===e||e))return!1;const i=t||this.hasFill(),s=this.hasStroke(),r=1!==this.getAbsoluteOpacity();if(i&&s&&r)return!0;const n=this.hasShadow(),o=this.shadowForStrokeEnabled();return!!(i&&s&&n&&o)}setStrokeHitEnabled(t){i.Util.warn("strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead."),t?this.hitStrokeWidth("auto"):this.hitStrokeWidth(0)}getStrokeHitEnabled(){return 0!==this.hitStrokeWidth()}getSelfRect(){const t=this.size();return{x:this._centroid?-t.width/2:0,y:this._centroid?-t.height/2:0,width:t.width,height:t.height}}getClientRect(t={}){let e=!1,i=this.getParent();for(;i;){if(i.isCached()){e=!0;break}i=i.getParent()}const s=t.skipTransform,r=t.relativeTo||e&&this.getStage()||void 0,n=this.getSelfRect(),o=!t.skipStroke&&this.hasStroke()&&this.strokeWidth()||0,a=n.width+o,l=n.height+o,h=!t.skipShadow&&this.hasShadow(),c=h?this.shadowOffsetX():0,d=h?this.shadowOffsetY():0,p=a+Math.abs(c),u=l+Math.abs(d),g=h&&this.shadowBlur()||0,f={width:p+2*g,height:u+2*g,x:-(o/2+g)+Math.min(c,0)+n.x,y:-(o/2+g)+Math.min(d,0)+n.y};return s?f:this._transformedRect(f,r)}drawScene(t,e,i){const s=this.getLayer(),r=(t||s.getCanvas()).getContext(),n=this._getCanvasCache(),o=this.getSceneFunc(),a=this.hasShadow();let l;const h=e===this;if(!this.isVisible()&&!h)return this;if(n){r.save();const t=this.getAbsoluteTransform(e).getMatrix();return r.transform(t[0],t[1],t[2],t[3],t[4],t[5]),this._drawCachedSceneCanvas(r),r.restore(),this}if(!o)return this;if(r.save(),this._useBufferCanvas()){l=this.getStage();const t=i||l.bufferCanvas,s=t.getContext();s.clear(),s.save(),s._applyLineJoin(this);const n=this.getAbsoluteTransform(e).getMatrix();s.transform(n[0],n[1],n[2],n[3],n[4],n[5]),o.call(this,s,this),s.restore();const h=t.pixelRatio;a&&r._applyShadow(this),r._applyOpacity(this),r._applyGlobalCompositeOperation(this),r.drawImage(t._canvas,t.x||0,t.y||0,t.width/h,t.height/h)}else{if(r._applyLineJoin(this),!h){const t=this.getAbsoluteTransform(e).getMatrix();r.transform(t[0],t[1],t[2],t[3],t[4],t[5]),r._applyOpacity(this),r._applyGlobalCompositeOperation(this)}a&&r._applyShadow(this),o.call(this,r,this)}return r.restore(),this}drawHit(t,e,s=!1){if(!this.shouldDrawHit(e,s))return this;const r=this.getLayer(),n=t||r.hitCanvas,o=n&&n.getContext(),a=this.hitFunc()||this.sceneFunc(),l=this._getCanvasCache(),h=l&&l.hit;if(this.colorKey||i.Util.warn("Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. If you want to reuse shape you should call remove() instead of destroy()"),h){o.save();const t=this.getAbsoluteTransform(e).getMatrix();return o.transform(t[0],t[1],t[2],t[3],t[4],t[5]),this._drawCachedHitCanvas(o),o.restore(),this}if(!a)return this;o.save(),o._applyLineJoin(this);if(!(this===e)){const t=this.getAbsoluteTransform(e).getMatrix();o.transform(t[0],t[1],t[2],t[3],t[4],t[5])}return a.call(this,o,this),o.restore(),this}drawHitFromCache(t=0){const e=this._getCanvasCache(),s=this._getCachedSceneCanvas(),r=e.hit,n=r.getContext(),o=r.getWidth(),a=r.getHeight();n.clear(),n.drawImage(s._canvas,0,0,o,a);try{const e=n.getImageData(0,0,o,a),s=e.data,r=s.length,l=i.Util._hexToRgb(this.colorKey);for(let e=0;e<r;e+=4){s[e+3]>t?(s[e]=l.r,s[e+1]=l.g,s[e+2]=l.b,s[e+3]=255):s[e+3]=0}n.putImageData(e,0,0)}catch(t){i.Util.error("Unable to draw hit graph from cached scene canvas. "+t.message)}return this}hasPointerCapture(t){return a.hasPointerCapture(t,this)}setPointerCapture(t){a.setPointerCapture(t,this)}releaseCapture(t){a.releaseCapture(t,this)}}t.Shape=f,f.prototype._fillFunc=function(t){const e=this.attrs.fillRule;e?t.fill(e):t.fill()},f.prototype._strokeFunc=function(t){t.stroke()},f.prototype._fillFuncHit=function(t){const e=this.attrs.fillRule;e?t.fill(e):t.fill()},f.prototype._strokeFuncHit=function(t){t.stroke()},f.prototype._centroid=!1,f.prototype.nodeType="Shape",(0,o._registerNode)(f),f.prototype.eventListeners={},f.prototype.on.call(f.prototype,"shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva",function(){this._clearCache(l)}),f.prototype.on.call(f.prototype,"shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva",function(){this._clearCache(h)}),f.prototype.on.call(f.prototype,"fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva fillPatternOffsetXChange.konva fillPatternOffsetYChange.konva fillPatternXChange.konva fillPatternYChange.konva fillPatternRotationChange.konva",function(){this._clearCache(c)}),f.prototype.on.call(f.prototype,"fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva",function(){this._clearCache(d)}),f.prototype.on.call(f.prototype,"fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva",function(){this._clearCache(p)}),s.Factory.addGetterSetter(f,"stroke",void 0,(0,n.getStringOrGradientValidator)()),s.Factory.addGetterSetter(f,"strokeWidth",2,(0,n.getNumberValidator)()),s.Factory.addGetterSetter(f,"fillAfterStrokeEnabled",!1),s.Factory.addGetterSetter(f,"hitStrokeWidth","auto",(0,n.getNumberOrAutoValidator)()),s.Factory.addGetterSetter(f,"strokeHitEnabled",!0,(0,n.getBooleanValidator)()),s.Factory.addGetterSetter(f,"perfectDrawEnabled",!0,(0,n.getBooleanValidator)()),s.Factory.addGetterSetter(f,"shadowForStrokeEnabled",!0,(0,n.getBooleanValidator)()),s.Factory.addGetterSetter(f,"lineJoin"),s.Factory.addGetterSetter(f,"lineCap"),s.Factory.addGetterSetter(f,"sceneFunc"),s.Factory.addGetterSetter(f,"hitFunc"),s.Factory.addGetterSetter(f,"dash"),s.Factory.addGetterSetter(f,"dashOffset",0,(0,n.getNumberValidator)()),s.Factory.addGetterSetter(f,"shadowColor",void 0,(0,n.getStringValidator)()),s.Factory.addGetterSetter(f,"shadowBlur",0,(0,n.getNumberValidator)()),s.Factory.addGetterSetter(f,"shadowOpacity",1,(0,n.getNumberValidator)()),s.Factory.addComponentsGetterSetter(f,"shadowOffset",["x","y"]),s.Factory.addGetterSetter(f,"shadowOffsetX",0,(0,n.getNumberValidator)()),s.Factory.addGetterSetter(f,"shadowOffsetY",0,(0,n.getNumberValidator)()),s.Factory.addGetterSetter(f,"fillPatternImage"),s.Factory.addGetterSetter(f,"fill",void 0,(0,n.getStringOrGradientValidator)()),s.Factory.addGetterSetter(f,"fillPatternX",0,(0,n.getNumberValidator)()),s.Factory.addGetterSetter(f,"fillPatternY",0,(0,n.getNumberValidator)()),s.Factory.addGetterSetter(f,"fillLinearGradientColorStops"),s.Factory.addGetterSetter(f,"strokeLinearGradientColorStops"),s.Factory.addGetterSetter(f,"fillRadialGradientStartRadius",0),s.Factory.addGetterSetter(f,"fillRadialGradientEndRadius",0),s.Factory.addGetterSetter(f,"fillRadialGradientColorStops"),s.Factory.addGetterSetter(f,"fillPatternRepeat","repeat"),s.Factory.addGetterSetter(f,"fillEnabled",!0),s.Factory.addGetterSetter(f,"strokeEnabled",!0),s.Factory.addGetterSetter(f,"shadowEnabled",!0),s.Factory.addGetterSetter(f,"dashEnabled",!0),s.Factory.addGetterSetter(f,"strokeScaleEnabled",!0),s.Factory.addGetterSetter(f,"fillPriority","color"),s.Factory.addComponentsGetterSetter(f,"fillPatternOffset",["x","y"]),s.Factory.addGetterSetter(f,"fillPatternOffsetX",0,(0,n.getNumberValidator)()),s.Factory.addGetterSetter(f,"fillPatternOffsetY",0,(0,n.getNumberValidator)()),s.Factory.addComponentsGetterSetter(f,"fillPatternScale",["x","y"]),s.Factory.addGetterSetter(f,"fillPatternScaleX",1,(0,n.getNumberValidator)()),s.Factory.addGetterSetter(f,"fillPatternScaleY",1,(0,n.getNumberValidator)()),s.Factory.addComponentsGetterSetter(f,"fillLinearGradientStartPoint",["x","y"]),s.Factory.addComponentsGetterSetter(f,"strokeLinearGradientStartPoint",["x","y"]),s.Factory.addGetterSetter(f,"fillLinearGradientStartPointX",0),s.Factory.addGetterSetter(f,"strokeLinearGradientStartPointX",0),s.Factory.addGetterSetter(f,"fillLinearGradientStartPointY",0),s.Factory.addGetterSetter(f,"strokeLinearGradientStartPointY",0),s.Factory.addComponentsGetterSetter(f,"fillLinearGradientEndPoint",["x","y"]),s.Factory.addComponentsGetterSetter(f,"strokeLinearGradientEndPoint",["x","y"]),s.Factory.addGetterSetter(f,"fillLinearGradientEndPointX",0),s.Factory.addGetterSetter(f,"strokeLinearGradientEndPointX",0),s.Factory.addGetterSetter(f,"fillLinearGradientEndPointY",0),s.Factory.addGetterSetter(f,"strokeLinearGradientEndPointY",0),s.Factory.addComponentsGetterSetter(f,"fillRadialGradientStartPoint",["x","y"]),s.Factory.addGetterSetter(f,"fillRadialGradientStartPointX",0),s.Factory.addGetterSetter(f,"fillRadialGradientStartPointY",0),s.Factory.addComponentsGetterSetter(f,"fillRadialGradientEndPoint",["x","y"]),s.Factory.addGetterSetter(f,"fillRadialGradientEndPointX",0),s.Factory.addGetterSetter(f,"fillRadialGradientEndPointY",0),s.Factory.addGetterSetter(f,"fillPatternRotation",0),s.Factory.addGetterSetter(f,"fillRule",void 0,(0,n.getStringValidator)()),s.Factory.backCompat(f,{dashArray:"dash",getDashArray:"getDash",setDashArray:"getDash",drawFunc:"sceneFunc",getDrawFunc:"getSceneFunc",setDrawFunc:"setSceneFunc",drawHitFunc:"hitFunc",getDrawHitFunc:"getHitFunc",setDrawHitFunc:"setHitFunc"})}(rn)),rn}function on(){if(en)return sn;en=1,Object.defineProperty(sn,"__esModule",{value:!0}),sn.Layer=void 0;const t=$r(),e=Kr(),i=Vr(),s=Hr(),r=Fr(),n=Wr(),o=nn(),a=kr(),l=[{x:0,y:0},{x:-1,y:-1},{x:1,y:-1},{x:1,y:1},{x:-1,y:1}],h=l.length;let c=class extends e.Container{constructor(t){super(t),this.canvas=new r.SceneCanvas,this.hitCanvas=new r.HitCanvas({pixelRatio:1}),this._waitingForDraw=!1,this.on("visibleChange.konva",this._checkVisibility),this._checkVisibility(),this.on("imageSmoothingEnabledChange.konva",this._setSmoothEnabled),this._setSmoothEnabled()}createPNGStream(){return this.canvas._canvas.createPNGStream()}getCanvas(){return this.canvas}getNativeCanvasElement(){return this.canvas._canvas}getHitCanvas(){return this.hitCanvas}getContext(){return this.getCanvas().getContext()}clear(t){return this.getContext().clear(t),this.getHitCanvas().getContext().clear(t),this}setZIndex(t){super.setZIndex(t);const e=this.getStage();return e&&e.content&&(e.content.removeChild(this.getNativeCanvasElement()),t<e.children.length-1?e.content.insertBefore(this.getNativeCanvasElement(),e.children[t+1].getCanvas()._canvas):e.content.appendChild(this.getNativeCanvasElement())),this}moveToTop(){i.Node.prototype.moveToTop.call(this);const t=this.getStage();return t&&t.content&&(t.content.removeChild(this.getNativeCanvasElement()),t.content.appendChild(this.getNativeCanvasElement())),!0}moveUp(){if(!i.Node.prototype.moveUp.call(this))return!1;const t=this.getStage();return!(!t||!t.content)&&(t.content.removeChild(this.getNativeCanvasElement()),this.index<t.children.length-1?t.content.insertBefore(this.getNativeCanvasElement(),t.children[this.index+1].getCanvas()._canvas):t.content.appendChild(this.getNativeCanvasElement()),!0)}moveDown(){if(i.Node.prototype.moveDown.call(this)){const t=this.getStage();if(t){const e=t.children;t.content&&(t.content.removeChild(this.getNativeCanvasElement()),t.content.insertBefore(this.getNativeCanvasElement(),e[this.index+1].getCanvas()._canvas))}return!0}return!1}moveToBottom(){if(i.Node.prototype.moveToBottom.call(this)){const t=this.getStage();if(t){const e=t.children;t.content&&(t.content.removeChild(this.getNativeCanvasElement()),t.content.insertBefore(this.getNativeCanvasElement(),e[1].getCanvas()._canvas))}return!0}return!1}getLayer(){return this}remove(){const e=this.getNativeCanvasElement();return i.Node.prototype.remove.call(this),e&&e.parentNode&&t.Util._isInDocument(e)&&e.parentNode.removeChild(e),this}getStage(){return this.parent}setSize({width:t,height:e}){return this.canvas.setSize(t,e),this.hitCanvas.setSize(t,e),this._setSmoothEnabled(),this}_validateAdd(e){const i=e.getType();"Group"!==i&&"Shape"!==i&&t.Util.throw("You may only add groups and shapes to a layer.")}_toKonvaCanvas(t){return(t=t||{}).width=t.width||this.getWidth(),t.height=t.height||this.getHeight(),t.x=void 0!==t.x?t.x:this.x(),t.y=void 0!==t.y?t.y:this.y(),i.Node.prototype._toKonvaCanvas.call(this,t)}_checkVisibility(){const t=this.visible();this.canvas._canvas.style.display=t?"block":"none"}_setSmoothEnabled(){this.getContext()._context.imageSmoothingEnabled=this.imageSmoothingEnabled()}getWidth(){if(this.parent)return this.parent.width()}setWidth(){t.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.')}getHeight(){if(this.parent)return this.parent.height()}setHeight(){t.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.')}batchDraw(){return this._waitingForDraw||(this._waitingForDraw=!0,t.Util.requestAnimFrame(()=>{this.draw(),this._waitingForDraw=!1})),this}getIntersection(t){if(!this.isListening()||!this.isVisible())return null;let e=1,i=!1;for(;;){for(let s=0;s<h;s++){const r=l[s],n=this._getIntersection({x:t.x+r.x*e,y:t.y+r.y*e}),o=n.shape;if(o)return o;if(i=!!n.antialiased,!n.antialiased)break}if(!i)return null;e+=1}}_getIntersection(e){const i=this.hitCanvas.pixelRatio,s=this.hitCanvas.context.getImageData(Math.round(e.x*i),Math.round(e.y*i),1,1).data,r=s[3];if(255===r){const e=t.Util._rgbToHex(s[0],s[1],s[2]),i=o.shapes["#"+e];return i?{shape:i}:{antialiased:!0}}return r>0?{antialiased:!0}:{}}drawScene(t,i,s){const r=this.getLayer(),n=t||r&&r.getCanvas();return this._fire("beforeDraw",{node:this}),this.clearBeforeDraw()&&n.getContext().clear(),e.Container.prototype.drawScene.call(this,n,i,s),this._fire("draw",{node:this}),this}drawHit(t,i){const s=this.getLayer(),r=t||s&&s.hitCanvas;return s&&s.clearBeforeDraw()&&s.getHitCanvas().getContext().clear(),e.Container.prototype.drawHit.call(this,r,i),this}enableHitGraph(){return this.hitGraphEnabled(!0),this}disableHitGraph(){return this.hitGraphEnabled(!1),this}setHitGraphEnabled(e){t.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."),this.listening(e)}getHitGraphEnabled(e){return t.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."),this.listening()}toggleHitCanvas(){if(!this.parent||!this.parent.content)return;const t=this.parent;!!this.hitCanvas._canvas.parentNode?t.content.removeChild(this.hitCanvas._canvas):t.content.appendChild(this.hitCanvas._canvas)}destroy(){return t.Util.releaseCanvas(this.getNativeCanvasElement(),this.getHitCanvas()._canvas),super.destroy()}};return sn.Layer=c,c.prototype.nodeType="Layer",(0,a._registerNode)(c),s.Factory.addGetterSetter(c,"imageSmoothingEnabled",!0),s.Factory.addGetterSetter(c,"clearBeforeDraw",!0),s.Factory.addGetterSetter(c,"hitGraphEnabled",!0,(0,n.getBooleanValidator)()),sn}var an,ln={};var hn,cn={};function dn(){if(hn)return cn;hn=1,Object.defineProperty(cn,"__esModule",{value:!0}),cn.Group=void 0;const t=$r(),e=Kr(),i=kr();let s=class extends e.Container{_validateAdd(e){const i=e.getType();"Group"!==i&&"Shape"!==i&&t.Util.throw("You may only add groups and shapes to groups.")}};return cn.Group=s,s.prototype.nodeType="Group",(0,i._registerNode)(s),cn}var pn,un={};function gn(){if(pn)return un;pn=1,Object.defineProperty(un,"__esModule",{value:!0}),un.Animation=void 0;const t=kr(),e=$r(),i=t.glob.performance&&t.glob.performance.now?function(){return t.glob.performance.now()}:function(){return(new Date).getTime()};let s=class t{constructor(e,s){this.id=t.animIdCounter++,this.frame={time:0,timeDiff:0,lastTime:i(),frameRate:0},this.func=e,this.setLayers(s)}setLayers(t){let e=[];return t&&(e=Array.isArray(t)?t:[t]),this.layers=e,this}getLayers(){return this.layers}addLayer(t){const e=this.layers,i=e.length;for(let s=0;s<i;s++)if(e[s]._id===t._id)return!1;return this.layers.push(t),!0}isRunning(){const e=t.animations,i=e.length;for(let t=0;t<i;t++)if(e[t].id===this.id)return!0;return!1}start(){return this.stop(),this.frame.timeDiff=0,this.frame.lastTime=i(),t._addAnimation(this),this}stop(){return t._removeAnimation(this),this}_updateFrameObject(t){this.frame.timeDiff=t-this.frame.lastTime,this.frame.lastTime=t,this.frame.time+=this.frame.timeDiff,this.frame.frameRate=1e3/this.frame.timeDiff}static _addAnimation(t){this.animations.push(t),this._handleAnimation()}static _removeAnimation(t){const e=t.id,i=this.animations,s=i.length;for(let t=0;t<s;t++)if(i[t].id===e){this.animations.splice(t,1);break}}static _runFrames(){const t={},e=this.animations;for(let s=0;s<e.length;s++){const r=e[s],n=r.layers,o=r.func;r._updateFrameObject(i());const a=n.length;let l;if(l=!o||!1!==o.call(r,r.frame),l)for(let e=0;e<a;e++){const i=n[e];void 0!==i._id&&(t[i._id]=i)}}for(const e in t)t.hasOwnProperty(e)&&t[e].batchDraw()}static _animationLoop(){const i=t;i.animations.length?(i._runFrames(),e.Util.requestAnimFrame(i._animationLoop)):i.animRunning=!1}static _handleAnimation(){this.animRunning||(this.animRunning=!0,e.Util.requestAnimFrame(this._animationLoop))}};return un.Animation=s,s.animations=[],s.animIdCounter=0,s.animRunning=!1,un}var fn,_n,mn={};function vn(){return _n||(_n=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.Konva=void 0;const e=kr(),i=$r(),s=Vr(),r=Kr(),n=(Xr||(Xr=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.Stage=t.stages=void 0;const e=$r(),i=Hr(),s=Kr(),r=kr(),n=Fr(),o=Nr(),a=kr(),l=Qr(),h="mouseleave",c="mouseover",d="mouseenter",p="mousemove",u="mousedown",g="mouseup",f="pointermove",_="pointerdown",m="pointerup",v="pointercancel",y="pointerout",b="pointerleave",x="pointerover",w="pointerenter",S="contextmenu",k="touchstart",C="touchend",P="touchmove",$="touchcancel",I="wheel",M=[[d,"_pointerenter"],[u,"_pointerdown"],[p,"_pointermove"],[g,"_pointerup"],[h,"_pointerleave"],[k,"_pointerdown"],[P,"_pointermove"],[C,"_pointerup"],[$,"_pointercancel"],[c,"_pointerover"],[I,"_wheel"],[S,"_contextmenu"],[_,"_pointerdown"],[f,"_pointermove"],[m,"_pointerup"],[v,"_pointercancel"],[b,"_pointerleave"],["lostpointercapture","_lostpointercapture"]],E={mouse:{[y]:"mouseout",[b]:h,[x]:c,[w]:d,[f]:p,[_]:u,[m]:g,[v]:"mousecancel",pointerclick:"click",pointerdblclick:"dblclick"},touch:{[y]:"touchout",[b]:"touchleave",[x]:"touchover",[w]:"touchenter",[f]:P,[_]:k,[m]:C,[v]:$,pointerclick:"tap",pointerdblclick:"dbltap"},pointer:{[y]:y,[b]:b,[x]:x,[w]:w,[f]:f,[_]:_,[m]:m,[v]:v,pointerclick:"pointerclick",pointerdblclick:"pointerdblclick"}},A=t=>t.indexOf("pointer")>=0?"pointer":t.indexOf("touch")>=0?"touch":"mouse",L=t=>{const e=A(t);return"pointer"===e?r.Konva.pointerEventsEnabled&&E.pointer:"touch"===e?E.touch:"mouse"===e?E.mouse:void 0};function T(t={}){return(t.clipFunc||t.clipWidth||t.clipHeight)&&e.Util.warn("Stage does not support clipping. Please use clip for Layers or Groups."),t}t.stages=[];class F extends s.Container{constructor(e){super(T(e)),this._pointerPositions=[],this._changedPointerPositions=[],this._buildDOM(),this._bindContentEvents(),t.stages.push(this),this.on("widthChange.konva heightChange.konva",this._resizeDOM),this.on("visibleChange.konva",this._checkVisibility),this.on("clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva",()=>{T(this.attrs)}),this._checkVisibility()}_validateAdd(t){const i="Layer"===t.getType(),s="FastLayer"===t.getType();i||s||e.Util.throw("You may only add layers to the stage.")}_checkVisibility(){if(!this.content)return;const t=this.visible()?"":"none";this.content.style.display=t}setContainer(t){if("string"==typeof t){let e;if("."===t.charAt(0)){const e=t.slice(1);t=document.getElementsByClassName(e)[0]}else e="#"!==t.charAt(0)?t:t.slice(1),t=document.getElementById(e);if(!t)throw"Can not find container in document with id "+e}return this._setAttr("container",t),this.content&&(this.content.parentElement&&this.content.parentElement.removeChild(this.content),t.appendChild(this.content)),this}shouldDrawHit(){return!0}clear(){const t=this.children,e=t.length;for(let i=0;i<e;i++)t[i].clear();return this}clone(t){return t||(t={}),t.container="undefined"!=typeof document&&document.createElement("div"),s.Container.prototype.clone.call(this,t)}destroy(){super.destroy();const i=this.content;i&&e.Util._isInDocument(i)&&this.container().removeChild(i);const s=t.stages.indexOf(this);return s>-1&&t.stages.splice(s,1),e.Util.releaseCanvas(this.bufferCanvas._canvas,this.bufferHitCanvas._canvas),this}getPointerPosition(){const t=this._pointerPositions[0]||this._changedPointerPositions[0];return t?{x:t.x,y:t.y}:(e.Util.warn("Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);"),null)}_getPointerById(t){return this._pointerPositions.find(e=>e.id===t)}getPointersPositions(){return this._pointerPositions}getStage(){return this}getContent(){return this.content}_toKonvaCanvas(t){(t=t||{}).x=t.x||0,t.y=t.y||0,t.width=t.width||this.width(),t.height=t.height||this.height();const e=new n.SceneCanvas({width:t.width,height:t.height,pixelRatio:t.pixelRatio||1}),i=e.getContext()._context,s=this.children;return(t.x||t.y)&&i.translate(-1*t.x,-1*t.y),s.forEach(function(e){if(!e.isVisible())return;const s=e._toKonvaCanvas(t);i.drawImage(s._canvas,t.x,t.y,s.getWidth()/s.getPixelRatio(),s.getHeight()/s.getPixelRatio())}),e}getIntersection(t){if(!t)return null;const e=this.children;for(let i=e.length-1;i>=0;i--){const s=e[i].getIntersection(t);if(s)return s}return null}_resizeDOM(){const t=this.width(),e=this.height();this.content&&(this.content.style.width=t+"px",this.content.style.height=e+"px"),this.bufferCanvas.setSize(t,e),this.bufferHitCanvas.setSize(t,e),this.children.forEach(i=>{i.setSize({width:t,height:e}),i.draw()})}add(t,...i){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}super.add(t);const s=this.children.length;return s>5&&e.Util.warn("The stage has "+s+" layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group."),t.setSize({width:this.width(),height:this.height()}),t.draw(),r.Konva.isBrowser&&this.content.appendChild(t.canvas._canvas),this}getParent(){return null}getLayer(){return null}hasPointerCapture(t){return l.hasPointerCapture(t,this)}setPointerCapture(t){l.setPointerCapture(t,this)}releaseCapture(t){l.releaseCapture(t,this)}getLayers(){return this.children}_bindContentEvents(){r.Konva.isBrowser&&M.forEach(([t,e])=>{this.content.addEventListener(t,t=>{this[e](t)},{passive:!1})})}_pointerenter(t){this.setPointersPositions(t);const e=L(t.type);e&&this._fire(e.pointerenter,{evt:t,target:this,currentTarget:this})}_pointerover(t){this.setPointersPositions(t);const e=L(t.type);e&&this._fire(e.pointerover,{evt:t,target:this,currentTarget:this})}_getTargetShape(t){let e=this[t+"targetShape"];return e&&!e.getStage()&&(e=null),e}_pointerleave(t){const e=L(t.type),i=A(t.type);if(!e)return;this.setPointersPositions(t);const s=this._getTargetShape(i),n=!(r.Konva.isDragging()||r.Konva.isTransforming())||r.Konva.hitOnDragEnabled;s&&n?(s._fireAndBubble(e.pointerout,{evt:t}),s._fireAndBubble(e.pointerleave,{evt:t}),this._fire(e.pointerleave,{evt:t,target:this,currentTarget:this}),this[i+"targetShape"]=null):n&&(this._fire(e.pointerleave,{evt:t,target:this,currentTarget:this}),this._fire(e.pointerout,{evt:t,target:this,currentTarget:this})),this.pointerPos=null,this._pointerPositions=[]}_pointerdown(t){const e=L(t.type),i=A(t.type);if(!e)return;this.setPointersPositions(t);let s=!1;this._changedPointerPositions.forEach(n=>{const a=this.getIntersection(n);if(o.DD.justDragged=!1,r.Konva["_"+i+"ListenClick"]=!0,!a||!a.isListening())return void(this[i+"ClickStartShape"]=void 0);r.Konva.capturePointerEventsEnabled&&a.setPointerCapture(n.id),this[i+"ClickStartShape"]=a,a._fireAndBubble(e.pointerdown,{evt:t,pointerId:n.id}),s=!0;const l=t.type.indexOf("touch")>=0;a.preventDefault()&&t.cancelable&&l&&t.preventDefault()}),s||this._fire(e.pointerdown,{evt:t,target:this,currentTarget:this,pointerId:this._pointerPositions[0].id})}_pointermove(t){const e=L(t.type),i=A(t.type);if(!e)return;if(r.Konva.isDragging()&&o.DD.node.preventDefault()&&t.cancelable&&t.preventDefault(),this.setPointersPositions(t),(r.Konva.isDragging()||r.Konva.isTransforming())&&!r.Konva.hitOnDragEnabled)return;const s={};let n=!1;const a=this._getTargetShape(i);this._changedPointerPositions.forEach(r=>{const o=l.getCapturedShape(r.id)||this.getIntersection(r),h=r.id,c={evt:t,pointerId:h},d=a!==o;if(d&&a&&(a._fireAndBubble(e.pointerout,{...c},o),a._fireAndBubble(e.pointerleave,{...c},o)),o){if(s[o._id])return;s[o._id]=!0}o&&o.isListening()?(n=!0,d&&(o._fireAndBubble(e.pointerover,{...c},a),o._fireAndBubble(e.pointerenter,{...c},a),this[i+"targetShape"]=o),o._fireAndBubble(e.pointermove,{...c})):a&&(this._fire(e.pointerover,{evt:t,target:this,currentTarget:this,pointerId:h}),this[i+"targetShape"]=null)}),n||this._fire(e.pointermove,{evt:t,target:this,currentTarget:this,pointerId:this._changedPointerPositions[0].id})}_pointerup(t){const e=L(t.type),i=A(t.type);if(!e)return;this.setPointersPositions(t);const s=this[i+"ClickStartShape"],n=this[i+"ClickEndShape"],a={};let h=!1;this._changedPointerPositions.forEach(c=>{const d=l.getCapturedShape(c.id)||this.getIntersection(c);if(d){if(d.releaseCapture(c.id),a[d._id])return;a[d._id]=!0}const p=c.id,u={evt:t,pointerId:p};let g=!1;r.Konva["_"+i+"InDblClickWindow"]?(g=!0,clearTimeout(this[i+"DblTimeout"])):o.DD.justDragged||(r.Konva["_"+i+"InDblClickWindow"]=!0,clearTimeout(this[i+"DblTimeout"])),this[i+"DblTimeout"]=setTimeout(function(){r.Konva["_"+i+"InDblClickWindow"]=!1},r.Konva.dblClickWindow),d&&d.isListening()?(h=!0,this[i+"ClickEndShape"]=d,d._fireAndBubble(e.pointerup,{...u}),r.Konva["_"+i+"ListenClick"]&&s&&s===d&&(d._fireAndBubble(e.pointerclick,{...u}),g&&n&&n===d&&d._fireAndBubble(e.pointerdblclick,{...u}))):(this[i+"ClickEndShape"]=null,r.Konva["_"+i+"ListenClick"]&&this._fire(e.pointerclick,{evt:t,target:this,currentTarget:this,pointerId:p}),g&&this._fire(e.pointerdblclick,{evt:t,target:this,currentTarget:this,pointerId:p}))}),h||this._fire(e.pointerup,{evt:t,target:this,currentTarget:this,pointerId:this._changedPointerPositions[0].id}),r.Konva["_"+i+"ListenClick"]=!1,t.cancelable&&"touch"!==i&&"pointer"!==i&&t.preventDefault()}_contextmenu(t){this.setPointersPositions(t);const e=this.getIntersection(this.getPointerPosition());e&&e.isListening()?e._fireAndBubble(S,{evt:t}):this._fire(S,{evt:t,target:this,currentTarget:this})}_wheel(t){this.setPointersPositions(t);const e=this.getIntersection(this.getPointerPosition());e&&e.isListening()?e._fireAndBubble(I,{evt:t}):this._fire(I,{evt:t,target:this,currentTarget:this})}_pointercancel(t){this.setPointersPositions(t);const e=l.getCapturedShape(t.pointerId)||this.getIntersection(this.getPointerPosition());e&&e._fireAndBubble(m,l.createEvent(t)),l.releaseCapture(t.pointerId)}_lostpointercapture(t){l.releaseCapture(t.pointerId)}setPointersPositions(t){const i=this._getContentPosition();let s=null,r=null;void 0!==(t=t||window.event).touches?(this._pointerPositions=[],this._changedPointerPositions=[],Array.prototype.forEach.call(t.touches,t=>{this._pointerPositions.push({id:t.identifier,x:(t.clientX-i.left)/i.scaleX,y:(t.clientY-i.top)/i.scaleY})}),Array.prototype.forEach.call(t.changedTouches||t.touches,t=>{this._changedPointerPositions.push({id:t.identifier,x:(t.clientX-i.left)/i.scaleX,y:(t.clientY-i.top)/i.scaleY})})):(s=(t.clientX-i.left)/i.scaleX,r=(t.clientY-i.top)/i.scaleY,this.pointerPos={x:s,y:r},this._pointerPositions=[{x:s,y:r,id:e.Util._getFirstPointerId(t)}],this._changedPointerPositions=[{x:s,y:r,id:e.Util._getFirstPointerId(t)}])}_setPointerPosition(t){e.Util.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.'),this.setPointersPositions(t)}_getContentPosition(){if(!this.content||!this.content.getBoundingClientRect)return{top:0,left:0,scaleX:1,scaleY:1};const t=this.content.getBoundingClientRect();return{top:t.top,left:t.left,scaleX:t.width/this.content.clientWidth||1,scaleY:t.height/this.content.clientHeight||1}}_buildDOM(){if(this.bufferCanvas=new n.SceneCanvas({width:this.width(),height:this.height()}),this.bufferHitCanvas=new n.HitCanvas({pixelRatio:1,width:this.width(),height:this.height()}),!r.Konva.isBrowser)return;const t=this.container();if(!t)throw"Stage has no container. A container is required.";t.innerHTML="",this.content=document.createElement("div"),this.content.style.position="relative",this.content.style.userSelect="none",this.content.className="konvajs-content",this.content.setAttribute("role","presentation"),t.appendChild(this.content),this._resizeDOM()}cache(){return e.Util.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes."),this}clearCache(){return this}batchDraw(){return this.getChildren().forEach(function(t){t.batchDraw()}),this}}t.Stage=F,F.prototype.nodeType="Stage",(0,a._registerNode)(F),i.Factory.addGetterSetter(F,"container"),r.Konva.isBrowser&&document.addEventListener("visibilitychange",()=>{t.stages.forEach(t=>{t.batchDraw()})})}(Jr)),Jr),o=on(),a=function(){if(an)return ln;an=1,Object.defineProperty(ln,"__esModule",{value:!0}),ln.FastLayer=void 0;const t=$r(),e=on(),i=kr();let s=class extends e.Layer{constructor(e){super(e),this.listening(!1),t.Util.warn('Konva.Fast layer is deprecated. Please use "new Konva.Layer({ listening: false })" instead.')}};return ln.FastLayer=s,s.prototype.nodeType="FastLayer",(0,i._registerNode)(s),ln}(),l=dn(),h=Nr(),c=nn(),d=gn(),p=(fn||(fn=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.Easings=t.Tween=void 0;const e=$r(),i=gn(),s=Vr(),r=kr(),n={node:1,duration:1,easing:1,onFinish:1,yoyo:1},o=["fill","stroke","shadowColor"];let a=0;class l{constructor(t,e,i,s,r,n,o){this.prop=t,this.propFunc=e,this.begin=s,this._pos=s,this.duration=n,this._change=0,this.prevPos=0,this.yoyo=o,this._time=0,this._position=0,this._startTime=0,this._finish=0,this.func=i,this._change=r-this.begin,this.pause()}fire(t){const e=this[t];e&&e()}setTime(t){t>this.duration?this.yoyo?(this._time=this.duration,this.reverse()):this.finish():t<0?this.yoyo?(this._time=0,this.play()):this.reset():(this._time=t,this.update())}getTime(){return this._time}setPosition(t){this.prevPos=this._pos,this.propFunc(t),this._pos=t}getPosition(t){return void 0===t&&(t=this._time),this.func(t,this.begin,this._change,this.duration)}play(){this.state=2,this._startTime=this.getTimer()-this._time,this.onEnterFrame(),this.fire("onPlay")}reverse(){this.state=3,this._time=this.duration-this._time,this._startTime=this.getTimer()-this._time,this.onEnterFrame(),this.fire("onReverse")}seek(t){this.pause(),this._time=t,this.update(),this.fire("onSeek")}reset(){this.pause(),this._time=0,this.update(),this.fire("onReset")}finish(){this.pause(),this._time=this.duration,this.update(),this.fire("onFinish")}update(){this.setPosition(this.getPosition(this._time)),this.fire("onUpdate")}onEnterFrame(){const t=this.getTimer()-this._startTime;2===this.state?this.setTime(t):3===this.state&&this.setTime(this.duration-t)}pause(){this.state=1,this.fire("onPause")}getTimer(){return(new Date).getTime()}}class h{constructor(s){const o=this,c=s.node,d=c._id,p=s.easing||t.Easings.Linear,u=!!s.yoyo;let g,f;g=void 0===s.duration?.3:0===s.duration?.001:s.duration,this.node=c,this._id=a++;const _=c.getLayer()||(c instanceof r.Konva.Stage?c.getLayers():null);for(f in _||e.Util.error("Tween constructor have `node` that is not in a layer. Please add node into layer first."),this.anim=new i.Animation(function(){o.tween.onEnterFrame()},_),this.tween=new l(f,function(t){o._tweenFunc(t)},p,0,1,1e3*g,u),this._addListeners(),h.attrs[d]||(h.attrs[d]={}),h.attrs[d][this._id]||(h.attrs[d][this._id]={}),h.tweens[d]||(h.tweens[d]={}),s)void 0===n[f]&&this._addAttr(f,s[f]);this.reset(),this.onFinish=s.onFinish,this.onReset=s.onReset,this.onUpdate=s.onUpdate}_addAttr(t,i){const s=this.node,r=s._id;let n,a,l,c,d;const p=h.tweens[r][t];p&&delete h.attrs[r][p][t];let u=s.getAttr(t);if(e.Util._isArray(i))if(n=[],a=Math.max(i.length,u.length),"points"===t&&i.length!==u.length&&(i.length>u.length?(c=u,u=e.Util._prepareArrayForTween(u,i,s.closed())):(l=i,i=e.Util._prepareArrayForTween(i,u,s.closed()))),0===t.indexOf("fill"))for(let t=0;t<a;t++)if(t%2==0)n.push(i[t]-u[t]);else{const s=e.Util.colorToRGBA(u[t]);d=e.Util.colorToRGBA(i[t]),u[t]=s,n.push({r:d.r-s.r,g:d.g-s.g,b:d.b-s.b,a:d.a-s.a})}else for(let t=0;t<a;t++)n.push(i[t]-u[t]);else-1!==o.indexOf(t)?(u=e.Util.colorToRGBA(u),d=e.Util.colorToRGBA(i),n={r:d.r-u.r,g:d.g-u.g,b:d.b-u.b,a:d.a-u.a}):n=i-u;h.attrs[r][this._id][t]={start:u,diff:n,end:i,trueEnd:l,trueStart:c},h.tweens[r][t]=this._id}_tweenFunc(t){const i=this.node,s=h.attrs[i._id][this._id];let r,n,a,l,c,d,p,u;for(r in s){if(n=s[r],a=n.start,l=n.diff,u=n.end,e.Util._isArray(a))if(c=[],p=Math.max(a.length,u.length),0===r.indexOf("fill"))for(d=0;d<p;d++)d%2==0?c.push((a[d]||0)+l[d]*t):c.push("rgba("+Math.round(a[d].r+l[d].r*t)+","+Math.round(a[d].g+l[d].g*t)+","+Math.round(a[d].b+l[d].b*t)+","+(a[d].a+l[d].a*t)+")");else for(d=0;d<p;d++)c.push((a[d]||0)+l[d]*t);else c=-1!==o.indexOf(r)?"rgba("+Math.round(a.r+l.r*t)+","+Math.round(a.g+l.g*t)+","+Math.round(a.b+l.b*t)+","+(a.a+l.a*t)+")":a+l*t;i.setAttr(r,c)}}_addListeners(){this.tween.onPlay=()=>{this.anim.start()},this.tween.onReverse=()=>{this.anim.start()},this.tween.onPause=()=>{this.anim.stop()},this.tween.onFinish=()=>{const t=this.node,e=h.attrs[t._id][this._id];e.points&&e.points.trueEnd&&t.setAttr("points",e.points.trueEnd),this.onFinish&&this.onFinish.call(this)},this.tween.onReset=()=>{const t=this.node,e=h.attrs[t._id][this._id];e.points&&e.points.trueStart&&t.points(e.points.trueStart),this.onReset&&this.onReset()},this.tween.onUpdate=()=>{this.onUpdate&&this.onUpdate.call(this)}}play(){return this.tween.play(),this}reverse(){return this.tween.reverse(),this}reset(){return this.tween.reset(),this}seek(t){return this.tween.seek(1e3*t),this}pause(){return this.tween.pause(),this}finish(){return this.tween.finish(),this}destroy(){const t=this.node._id,e=this._id,i=h.tweens[t];this.pause(),this.anim&&this.anim.stop();for(const e in i)delete h.tweens[t][e];delete h.attrs[t][e],h.tweens[t]&&(0===Object.keys(h.tweens[t]).length&&delete h.tweens[t],0===Object.keys(h.attrs[t]).length&&delete h.attrs[t])}}t.Tween=h,h.attrs={},h.tweens={},s.Node.prototype.to=function(t){const e=t.onFinish;t.node=this,t.onFinish=function(){this.destroy(),e&&e()},new h(t).play()},t.Easings={BackEaseIn(t,e,i,s){const r=1.70158;return i*(t/=s)*t*((r+1)*t-r)+e},BackEaseOut(t,e,i,s){const r=1.70158;return i*((t=t/s-1)*t*((r+1)*t+r)+1)+e},BackEaseInOut(t,e,i,s){let r=1.70158;return(t/=s/2)<1?i/2*(t*t*((1+(r*=1.525))*t-r))+e:i/2*((t-=2)*t*((1+(r*=1.525))*t+r)+2)+e},ElasticEaseIn(t,e,i,s,r,n){let o=0;return 0===t?e:1===(t/=s)?e+i:(n||(n=.3*s),!r||r<Math.abs(i)?(r=i,o=n/4):o=n/(2*Math.PI)*Math.asin(i/r),-r*Math.pow(2,10*(t-=1))*Math.sin((t*s-o)*(2*Math.PI)/n)+e)},ElasticEaseOut(t,e,i,s,r,n){let o=0;return 0===t?e:1===(t/=s)?e+i:(n||(n=.3*s),!r||r<Math.abs(i)?(r=i,o=n/4):o=n/(2*Math.PI)*Math.asin(i/r),r*Math.pow(2,-10*t)*Math.sin((t*s-o)*(2*Math.PI)/n)+i+e)},ElasticEaseInOut(t,e,i,s,r,n){let o=0;return 0===t?e:2==(t/=s/2)?e+i:(n||(n=s*(.3*1.5)),!r||r<Math.abs(i)?(r=i,o=n/4):o=n/(2*Math.PI)*Math.asin(i/r),t<1?r*Math.pow(2,10*(t-=1))*Math.sin((t*s-o)*(2*Math.PI)/n)*-.5+e:r*Math.pow(2,-10*(t-=1))*Math.sin((t*s-o)*(2*Math.PI)/n)*.5+i+e)},BounceEaseOut:(t,e,i,s)=>(t/=s)<1/2.75?i*(7.5625*t*t)+e:t<2/2.75?i*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?i*(7.5625*(t-=2.25/2.75)*t+.9375)+e:i*(7.5625*(t-=2.625/2.75)*t+.984375)+e,BounceEaseIn:(e,i,s,r)=>s-t.Easings.BounceEaseOut(r-e,0,s,r)+i,BounceEaseInOut:(e,i,s,r)=>e<r/2?.5*t.Easings.BounceEaseIn(2*e,0,s,r)+i:.5*t.Easings.BounceEaseOut(2*e-r,0,s,r)+.5*s+i,EaseIn:(t,e,i,s)=>i*(t/=s)*t+e,EaseOut:(t,e,i,s)=>-i*(t/=s)*(t-2)+e,EaseInOut:(t,e,i,s)=>(t/=s/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e,StrongEaseIn:(t,e,i,s)=>i*(t/=s)*t*t*t*t+e,StrongEaseOut:(t,e,i,s)=>i*((t=t/s-1)*t*t*t*t+1)+e,StrongEaseInOut:(t,e,i,s)=>(t/=s/2)<1?i/2*t*t*t*t*t+e:i/2*((t-=2)*t*t*t*t+2)+e,Linear:(t,e,i,s)=>i*t/s+e}}(mn)),mn),u=Tr(),g=Fr();t.Konva=i.Util._assign(e.Konva,{Util:i.Util,Transform:i.Transform,Node:s.Node,Container:r.Container,Stage:n.Stage,stages:n.stages,Layer:o.Layer,FastLayer:a.FastLayer,Group:l.Group,DD:h.DD,Shape:c.Shape,shapes:c.shapes,Animation:d.Animation,Tween:p.Tween,Easings:p.Easings,Context:u.Context,Canvas:g.Canvas}),t.default=t.Konva}(wr)),wr}var yn,bn={};var xn,wn={},Sn={};function kn(){if(xn)return Sn;xn=1,Object.defineProperty(Sn,"__esModule",{value:!0}),Sn.Line=void 0;const t=Hr(),e=kr(),i=nn(),s=Wr();function r(t,e,i,s,r,n,o){const a=Math.sqrt(Math.pow(i-t,2)+Math.pow(s-e,2)),l=Math.sqrt(Math.pow(r-i,2)+Math.pow(n-s,2)),h=o*a/(a+l),c=o*l/(a+l);return[i-h*(r-t),s-h*(n-e),i+c*(r-t),s+c*(n-e)]}function n(t,e){const i=t.length,s=[];for(let n=2;n<i-2;n+=2){const i=r(t[n-2],t[n-1],t[n],t[n+1],t[n+2],t[n+3],e);isNaN(i[0])||(s.push(i[0]),s.push(i[1]),s.push(t[n]),s.push(t[n+1]),s.push(i[2]),s.push(i[3]))}return s}let o=class extends i.Shape{constructor(t){super(t),this.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva",function(){this._clearCache("tensionPoints")})}_sceneFunc(t){const e=this.points(),i=e.length,s=this.tension(),r=this.closed(),n=this.bezier();if(!i)return;let o=0;if(t.beginPath(),t.moveTo(e[0],e[1]),0!==s&&i>4){const s=this.getTensionPoints(),n=s.length;for(o=r?0:4,r||t.quadraticCurveTo(s[0],s[1],s[2],s[3]);o<n-2;)t.bezierCurveTo(s[o++],s[o++],s[o++],s[o++],s[o++],s[o++]);r||t.quadraticCurveTo(s[n-2],s[n-1],e[i-2],e[i-1])}else if(n)for(o=2;o<i;)t.bezierCurveTo(e[o++],e[o++],e[o++],e[o++],e[o++],e[o++]);else for(o=2;o<i;o+=2)t.lineTo(e[o],e[o+1]);r?(t.closePath(),t.fillStrokeShape(this)):t.strokeShape(this)}getTensionPoints(){return this._getCache("tensionPoints",this._getTensionPoints)}_getTensionPoints(){return this.closed()?this._getTensionPointsClosed():n(this.points(),this.tension())}_getTensionPointsClosed(){const t=this.points(),e=t.length,i=this.tension(),s=r(t[e-2],t[e-1],t[0],t[1],t[2],t[3],i),o=r(t[e-4],t[e-3],t[e-2],t[e-1],t[0],t[1],i),a=n(t,i);return[s[2],s[3]].concat(a).concat([o[0],o[1],t[e-2],t[e-1],o[2],o[3],s[0],s[1],t[0],t[1]])}getWidth(){return this.getSelfRect().width}getHeight(){return this.getSelfRect().height}getSelfRect(){let t=this.points();if(t.length<4)return{x:t[0]||0,y:t[1]||0,width:0,height:0};t=0!==this.tension()?[t[0],t[1],...this._getTensionPoints(),t[t.length-2],t[t.length-1]]:this.points();let e,i,s=t[0],r=t[0],n=t[1],o=t[1];for(let a=0;a<t.length/2;a++)e=t[2*a],i=t[2*a+1],s=Math.min(s,e),r=Math.max(r,e),n=Math.min(n,i),o=Math.max(o,i);return{x:s,y:n,width:r-s,height:o-n}}};return Sn.Line=o,o.prototype.className="Line",o.prototype._attrsAffectingSize=["points","bezier","tension"],(0,e._registerNode)(o),t.Factory.addGetterSetter(o,"closed",!1),t.Factory.addGetterSetter(o,"bezier",!1),t.Factory.addGetterSetter(o,"tension",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(o,"points",[],(0,s.getNumberArrayValidator)()),Sn}var Cn,Pn,$n,In={},Mn={};function En(){if(Pn)return In;Pn=1,Object.defineProperty(In,"__esModule",{value:!0}),In.Path=void 0;const t=Hr(),e=kr(),i=nn(),s=(Cn||(Cn=1,function(t){function e(t,e,s){const r=i(1,s,t),n=i(1,s,e),o=r*r+n*n;return Math.sqrt(o)}Object.defineProperty(t,"__esModule",{value:!0}),t.t2length=t.getQuadraticArcLength=t.getCubicArcLength=t.binomialCoefficients=t.cValues=t.tValues=void 0,t.tValues=[[],[],[-.5773502691896257,.5773502691896257],[0,-.7745966692414834,.7745966692414834],[-.33998104358485626,.33998104358485626,-.8611363115940526,.8611363115940526],[0,-.5384693101056831,.5384693101056831,-.906179845938664,.906179845938664],[.6612093864662645,-.6612093864662645,-.2386191860831969,.2386191860831969,-.932469514203152,.932469514203152],[0,.4058451513773972,-.4058451513773972,-.7415311855993945,.7415311855993945,-.9491079123427585,.9491079123427585],[-.1834346424956498,.1834346424956498,-.525532409916329,.525532409916329,-.7966664774136267,.7966664774136267,-.9602898564975363,.9602898564975363],[0,-.8360311073266358,.8360311073266358,-.9681602395076261,.9681602395076261,-.3242534234038089,.3242534234038089,-.6133714327005904,.6133714327005904],[-.14887433898163122,.14887433898163122,-.4333953941292472,.4333953941292472,-.6794095682990244,.6794095682990244,-.8650633666889845,.8650633666889845,-.9739065285171717,.9739065285171717],[0,-.26954315595234496,.26954315595234496,-.5190961292068118,.5190961292068118,-.7301520055740494,.7301520055740494,-.8870625997680953,.8870625997680953,-.978228658146057,.978228658146057],[-.1252334085114689,.1252334085114689,-.3678314989981802,.3678314989981802,-.5873179542866175,.5873179542866175,-.7699026741943047,.7699026741943047,-.9041172563704749,.9041172563704749,-.9815606342467192,.9815606342467192],[0,-.2304583159551348,.2304583159551348,-.44849275103644687,.44849275103644687,-.6423493394403402,.6423493394403402,-.8015780907333099,.8015780907333099,-.9175983992229779,.9175983992229779,-.9841830547185881,.9841830547185881],[-.10805494870734367,.10805494870734367,-.31911236892788974,.31911236892788974,-.5152486363581541,.5152486363581541,-.6872929048116855,.6872929048116855,-.827201315069765,.827201315069765,-.9284348836635735,.9284348836635735,-.9862838086968123,.9862838086968123],[0,-.20119409399743451,.20119409399743451,-.3941513470775634,.3941513470775634,-.5709721726085388,.5709721726085388,-.7244177313601701,.7244177313601701,-.8482065834104272,.8482065834104272,-.937273392400706,.937273392400706,-.9879925180204854,.9879925180204854],[-.09501250983763744,.09501250983763744,-.2816035507792589,.2816035507792589,-.45801677765722737,.45801677765722737,-.6178762444026438,.6178762444026438,-.755404408355003,.755404408355003,-.8656312023878318,.8656312023878318,-.9445750230732326,.9445750230732326,-.9894009349916499,.9894009349916499],[0,-.17848418149584785,.17848418149584785,-.3512317634538763,.3512317634538763,-.5126905370864769,.5126905370864769,-.6576711592166907,.6576711592166907,-.7815140038968014,.7815140038968014,-.8802391537269859,.8802391537269859,-.9506755217687678,.9506755217687678,-.9905754753144174,.9905754753144174],[-.0847750130417353,.0847750130417353,-.2518862256915055,.2518862256915055,-.41175116146284263,.41175116146284263,-.5597708310739475,.5597708310739475,-.6916870430603532,.6916870430603532,-.8037049589725231,.8037049589725231,-.8926024664975557,.8926024664975557,-.9558239495713977,.9558239495713977,-.9915651684209309,.9915651684209309],[0,-.16035864564022537,.16035864564022537,-.31656409996362983,.31656409996362983,-.46457074137596094,.46457074137596094,-.600545304661681,.600545304661681,-.7209661773352294,.7209661773352294,-.8227146565371428,.8227146565371428,-.9031559036148179,.9031559036148179,-.96020815213483,.96020815213483,-.9924068438435844,.9924068438435844],[-.07652652113349734,.07652652113349734,-.22778585114164507,.22778585114164507,-.37370608871541955,.37370608871541955,-.5108670019508271,.5108670019508271,-.636053680726515,.636053680726515,-.7463319064601508,.7463319064601508,-.8391169718222188,.8391169718222188,-.912234428251326,.912234428251326,-.9639719272779138,.9639719272779138,-.9931285991850949,.9931285991850949],[0,-.1455618541608951,.1455618541608951,-.2880213168024011,.2880213168024011,-.4243421202074388,.4243421202074388,-.5516188358872198,.5516188358872198,-.6671388041974123,.6671388041974123,-.7684399634756779,.7684399634756779,-.8533633645833173,.8533633645833173,-.9200993341504008,.9200993341504008,-.9672268385663063,.9672268385663063,-.9937521706203895,.9937521706203895],[-.06973927331972223,.06973927331972223,-.20786042668822127,.20786042668822127,-.34193582089208424,.34193582089208424,-.469355837986757,.469355837986757,-.5876404035069116,.5876404035069116,-.6944872631866827,.6944872631866827,-.7878168059792081,.7878168059792081,-.8658125777203002,.8658125777203002,-.926956772187174,.926956772187174,-.9700604978354287,.9700604978354287,-.9942945854823992,.9942945854823992],[0,-.1332568242984661,.1332568242984661,-.26413568097034495,.26413568097034495,-.3903010380302908,.3903010380302908,-.5095014778460075,.5095014778460075,-.6196098757636461,.6196098757636461,-.7186613631319502,.7186613631319502,-.8048884016188399,.8048884016188399,-.8767523582704416,.8767523582704416,-.9329710868260161,.9329710868260161,-.9725424712181152,.9725424712181152,-.9947693349975522,.9947693349975522],[-.06405689286260563,.06405689286260563,-.1911188674736163,.1911188674736163,-.3150426796961634,.3150426796961634,-.4337935076260451,.4337935076260451,-.5454214713888396,.5454214713888396,-.6480936519369755,.6480936519369755,-.7401241915785544,.7401241915785544,-.820001985973903,.820001985973903,-.8864155270044011,.8864155270044011,-.9382745520027328,.9382745520027328,-.9747285559713095,.9747285559713095,-.9951872199970213,.9951872199970213]],t.cValues=[[],[],[1,1],[.8888888888888888,.5555555555555556,.5555555555555556],[.6521451548625461,.6521451548625461,.34785484513745385,.34785484513745385],[.5688888888888889,.47862867049936647,.47862867049936647,.23692688505618908,.23692688505618908],[.3607615730481386,.3607615730481386,.46791393457269104,.46791393457269104,.17132449237917036,.17132449237917036],[.4179591836734694,.3818300505051189,.3818300505051189,.27970539148927664,.27970539148927664,.1294849661688697,.1294849661688697],[.362683783378362,.362683783378362,.31370664587788727,.31370664587788727,.22238103445337448,.22238103445337448,.10122853629037626,.10122853629037626],[.3302393550012598,.1806481606948574,.1806481606948574,.08127438836157441,.08127438836157441,.31234707704000286,.31234707704000286,.26061069640293544,.26061069640293544],[.29552422471475287,.29552422471475287,.26926671930999635,.26926671930999635,.21908636251598204,.21908636251598204,.1494513491505806,.1494513491505806,.06667134430868814,.06667134430868814],[.2729250867779006,.26280454451024665,.26280454451024665,.23319376459199048,.23319376459199048,.18629021092773426,.18629021092773426,.1255803694649046,.1255803694649046,.05566856711617366,.05566856711617366],[.24914704581340277,.24914704581340277,.2334925365383548,.2334925365383548,.20316742672306592,.20316742672306592,.16007832854334622,.16007832854334622,.10693932599531843,.10693932599531843,.04717533638651183,.04717533638651183],[.2325515532308739,.22628318026289723,.22628318026289723,.2078160475368885,.2078160475368885,.17814598076194574,.17814598076194574,.13887351021978725,.13887351021978725,.09212149983772845,.09212149983772845,.04048400476531588,.04048400476531588],[.2152638534631578,.2152638534631578,.2051984637212956,.2051984637212956,.18553839747793782,.18553839747793782,.15720316715819355,.15720316715819355,.12151857068790319,.12151857068790319,.08015808715976021,.08015808715976021,.03511946033175186,.03511946033175186],[.2025782419255613,.19843148532711158,.19843148532711158,.1861610000155622,.1861610000155622,.16626920581699392,.16626920581699392,.13957067792615432,.13957067792615432,.10715922046717194,.10715922046717194,.07036604748810812,.07036604748810812,.03075324199611727,.03075324199611727],[.1894506104550685,.1894506104550685,.18260341504492358,.18260341504492358,.16915651939500254,.16915651939500254,.14959598881657674,.14959598881657674,.12462897125553388,.12462897125553388,.09515851168249279,.09515851168249279,.062253523938647894,.062253523938647894,.027152459411754096,.027152459411754096],[.17944647035620653,.17656270536699264,.17656270536699264,.16800410215645004,.16800410215645004,.15404576107681028,.15404576107681028,.13513636846852548,.13513636846852548,.11188384719340397,.11188384719340397,.08503614831717918,.08503614831717918,.0554595293739872,.0554595293739872,.02414830286854793,.02414830286854793],[.1691423829631436,.1691423829631436,.16427648374583273,.16427648374583273,.15468467512626524,.15468467512626524,.14064291467065065,.14064291467065065,.12255520671147846,.12255520671147846,.10094204410628717,.10094204410628717,.07642573025488905,.07642573025488905,.0497145488949698,.0497145488949698,.02161601352648331,.02161601352648331],[.1610544498487837,.15896884339395434,.15896884339395434,.15276604206585967,.15276604206585967,.1426067021736066,.1426067021736066,.12875396253933621,.12875396253933621,.11156664554733399,.11156664554733399,.09149002162245,.09149002162245,.06904454273764123,.06904454273764123,.0448142267656996,.0448142267656996,.019461788229726478,.019461788229726478],[.15275338713072584,.15275338713072584,.14917298647260374,.14917298647260374,.14209610931838204,.14209610931838204,.13168863844917664,.13168863844917664,.11819453196151841,.11819453196151841,.10193011981724044,.10193011981724044,.08327674157670475,.08327674157670475,.06267204833410907,.06267204833410907,.04060142980038694,.04060142980038694,.017614007139152118,.017614007139152118],[.14608113364969041,.14452440398997005,.14452440398997005,.13988739479107315,.13988739479107315,.13226893863333747,.13226893863333747,.12183141605372853,.12183141605372853,.10879729916714838,.10879729916714838,.09344442345603386,.09344442345603386,.0761001136283793,.0761001136283793,.057134425426857205,.057134425426857205,.036953789770852494,.036953789770852494,.016017228257774335,.016017228257774335],[.13925187285563198,.13925187285563198,.13654149834601517,.13654149834601517,.13117350478706238,.13117350478706238,.12325237681051242,.12325237681051242,.11293229608053922,.11293229608053922,.10041414444288096,.10041414444288096,.08594160621706773,.08594160621706773,.06979646842452049,.06979646842452049,.052293335152683286,.052293335152683286,.03377490158481415,.03377490158481415,.0146279952982722,.0146279952982722],[.13365457218610619,.1324620394046966,.1324620394046966,.12890572218808216,.12890572218808216,.12304908430672953,.12304908430672953,.11499664022241136,.11499664022241136,.10489209146454141,.10489209146454141,.09291576606003515,.09291576606003515,.07928141177671895,.07928141177671895,.06423242140852585,.06423242140852585,.04803767173108467,.04803767173108467,.030988005856979445,.030988005856979445,.013411859487141771,.013411859487141771],[.12793819534675216,.12793819534675216,.1258374563468283,.1258374563468283,.12167047292780339,.12167047292780339,.1155056680537256,.1155056680537256,.10744427011596563,.10744427011596563,.09761865210411388,.09761865210411388,.08619016153195327,.08619016153195327,.0733464814110803,.0733464814110803,.05929858491543678,.05929858491543678,.04427743881741981,.04427743881741981,.028531388628933663,.028531388628933663,.0123412297999872,.0123412297999872]],t.binomialCoefficients=[[1],[1,1],[1,2,1],[1,3,3,1]],t.getCubicArcLength=(i,s,r)=>{let n,o;const a=r/2;n=0;for(let r=0;r<20;r++)o=a*t.tValues[20][r]+a,n+=t.cValues[20][r]*e(i,s,o);return a*n},t.getQuadraticArcLength=(t,e,i)=>{void 0===i&&(i=1);const s=t[0]-2*t[1]+t[2],r=e[0]-2*e[1]+e[2],n=2*t[1]-2*t[0],o=2*e[1]-2*e[0],a=4*(s*s+r*r),l=4*(s*n+r*o),h=n*n+o*o;if(0===a)return i*Math.sqrt(Math.pow(t[2]-t[0],2)+Math.pow(e[2]-e[0],2));const c=l/(2*a),d=i+c,p=h/a-c*c,u=d*d+p>0?Math.sqrt(d*d+p):0,g=c*c+p>0?Math.sqrt(c*c+p):0,f=c+Math.sqrt(c*c+p)!==0?p*Math.log(Math.abs((d+u)/(c+g))):0;return Math.sqrt(a)/2*(d*u-c*g+f)};const i=(e,s,r)=>{const n=r.length-1;let o,a;if(0===n)return 0;if(0===e){a=0;for(let e=0;e<=n;e++)a+=t.binomialCoefficients[n][e]*Math.pow(1-s,n-e)*Math.pow(s,e)*r[e];return a}o=new Array(n);for(let t=0;t<n;t++)o[t]=n*(r[t+1]-r[t]);return i(e-1,s,o)};t.t2length=(t,e,i)=>{let s=1,r=t/e,n=(t-i(r))/e,o=0;for(;s>.001;){const a=i(r+n),l=Math.abs(t-a)/e;if(l<s)s=l,r+=n;else{const o=i(r-n),a=Math.abs(t-o)/e;a<s?(s=a,r-=n):n/=2}if(o++,o>500)break}return r}}(Mn)),Mn);let r=class t extends i.Shape{constructor(t){super(t),this.dataArray=[],this.pathLength=0,this._readDataAttribute(),this.on("dataChange.konva",function(){this._readDataAttribute()})}_readDataAttribute(){this.dataArray=t.parsePathData(this.data()),this.pathLength=t.getPathLength(this.dataArray)}_sceneFunc(t){const e=this.dataArray;t.beginPath();let i=!1;for(let s=0;s<e.length;s++){const r=e[s].command,n=e[s].points;switch(r){case"L":t.lineTo(n[0],n[1]);break;case"M":t.moveTo(n[0],n[1]);break;case"C":t.bezierCurveTo(n[0],n[1],n[2],n[3],n[4],n[5]);break;case"Q":t.quadraticCurveTo(n[0],n[1],n[2],n[3]);break;case"A":const e=n[0],s=n[1],r=n[2],o=n[3],a=n[4],l=n[5],h=n[6],c=n[7],d=r>o?r:o,p=r>o?1:r/o,u=r>o?o/r:1;t.translate(e,s),t.rotate(h),t.scale(p,u),t.arc(0,0,d,a,a+l,1-c),t.scale(1/p,1/u),t.rotate(-h),t.translate(-e,-s);break;case"z":i=!0,t.closePath()}}i||this.hasFill()?t.fillStrokeShape(this):t.strokeShape(this)}getSelfRect(){let e=[];this.dataArray.forEach(function(i){if("A"===i.command){const s=i.points[4],r=i.points[5],n=i.points[4]+r;let o=Math.PI/180;if(Math.abs(s-n)<o&&(o=Math.abs(s-n)),r<0)for(let r=s-o;r>n;r-=o){const s=t.getPointOnEllipticalArc(i.points[0],i.points[1],i.points[2],i.points[3],r,0);e.push(s.x,s.y)}else for(let r=s+o;r<n;r+=o){const s=t.getPointOnEllipticalArc(i.points[0],i.points[1],i.points[2],i.points[3],r,0);e.push(s.x,s.y)}}else if("C"===i.command)for(let s=0;s<=1;s+=.01){const r=t.getPointOnCubicBezier(s,i.start.x,i.start.y,i.points[0],i.points[1],i.points[2],i.points[3],i.points[4],i.points[5]);e.push(r.x,r.y)}else e=e.concat(i.points)});let i,s,r=e[0],n=e[0],o=e[1],a=e[1];for(let t=0;t<e.length/2;t++)i=e[2*t],s=e[2*t+1],isNaN(i)||(r=Math.min(r,i),n=Math.max(n,i)),isNaN(s)||(o=Math.min(o,s),a=Math.max(a,s));return{x:r,y:o,width:n-r,height:a-o}}getLength(){return this.pathLength}getPointAtLength(e){return t.getPointAtLengthOfDataArray(e,this.dataArray)}static getLineLength(t,e,i,s){return Math.sqrt((i-t)*(i-t)+(s-e)*(s-e))}static getPathLength(t){let e=0;for(let i=0;i<t.length;++i)e+=t[i].pathLength;return e}static getPointAtLengthOfDataArray(e,i){let r,n=0,o=i.length;if(!o)return null;for(;n<o&&e>i[n].pathLength;)e-=i[n].pathLength,++n;if(n===o)return r=i[n-1].points.slice(-2),{x:r[0],y:r[1]};if(e<.01){return"M"===i[n].command?(r=i[n].points.slice(0,2),{x:r[0],y:r[1]}):{x:i[n].start.x,y:i[n].start.y}}const a=i[n],l=a.points;switch(a.command){case"L":return t.getPointOnLine(e,a.start.x,a.start.y,l[0],l[1]);case"C":return t.getPointOnCubicBezier((0,s.t2length)(e,t.getPathLength(i),t=>(0,s.getCubicArcLength)([a.start.x,l[0],l[2],l[4]],[a.start.y,l[1],l[3],l[5]],t)),a.start.x,a.start.y,l[0],l[1],l[2],l[3],l[4],l[5]);case"Q":return t.getPointOnQuadraticBezier((0,s.t2length)(e,t.getPathLength(i),t=>(0,s.getQuadraticArcLength)([a.start.x,l[0],l[2]],[a.start.y,l[1],l[3]],t)),a.start.x,a.start.y,l[0],l[1],l[2],l[3]);case"A":const r=l[0],n=l[1],o=l[2],h=l[3],c=l[5],d=l[6];let p=l[4];return p+=c*e/a.pathLength,t.getPointOnEllipticalArc(r,n,o,h,p,d)}return null}static getPointOnLine(t,e,i,s,r,n,o){n=null!=n?n:e,o=null!=o?o:i;const a=this.getLineLength(e,i,s,r);if(a<1e-10)return{x:e,y:i};if(s===e)return{x:n,y:o+(r>i?t:-t)};const l=(r-i)/(s-e),h=Math.sqrt(t*t/(1+l*l))*(s<e?-1:1),c=l*h;if(Math.abs(o-i-l*(n-e))<1e-10)return{x:n+h,y:o+c};const d=((n-e)*(s-e)+(o-i)*(r-i))/(a*a),p=e+d*(s-e),u=i+d*(r-i),g=this.getLineLength(n,o,p,u),f=Math.sqrt(t*t-g*g),_=Math.sqrt(f*f/(1+l*l))*(s<e?-1:1);return{x:p+_,y:u+l*_}}static getPointOnCubicBezier(t,e,i,s,r,n,o,a,l){function h(t){return t*t*t}function c(t){return 3*t*t*(1-t)}function d(t){return 3*t*(1-t)*(1-t)}function p(t){return(1-t)*(1-t)*(1-t)}return{x:a*h(t)+n*c(t)+s*d(t)+e*p(t),y:l*h(t)+o*c(t)+r*d(t)+i*p(t)}}static getPointOnQuadraticBezier(t,e,i,s,r,n,o){function a(t){return t*t}function l(t){return 2*t*(1-t)}function h(t){return(1-t)*(1-t)}return{x:n*a(t)+s*l(t)+e*h(t),y:o*a(t)+r*l(t)+i*h(t)}}static getPointOnEllipticalArc(t,e,i,s,r,n){const o=Math.cos(n),a=Math.sin(n),l=i*Math.cos(r),h=s*Math.sin(r);return{x:t+(l*o-h*a),y:e+(l*a+h*o)}}static parsePathData(t){if(!t)return[];let e=t;const i=["m","M","l","L","v","V","h","H","z","Z","c","C","q","Q","t","T","s","S","a","A"];e=e.replace(new RegExp(" ","g"),",");for(let t=0;t<i.length;t++)e=e.replace(new RegExp(i[t],"g"),"|"+i[t]);const s=e.split("|"),r=[],n=[];let o=0,a=0;const l=/([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;let h;for(let t=1;t<s.length;t++){let e=s[t],i=e.charAt(0);for(e=e.slice(1),n.length=0;h=l.exec(e);)n.push(h[0]);const c=[];for(let t=0,e=n.length;t<e;t++){if("00"===n[t]){c.push(0,0);continue}const e=parseFloat(n[t]);isNaN(e)?c.push(0):c.push(e)}for(;c.length>0&&!isNaN(c[0]);){let t="",e=[];const s=o,n=a;let l,h,d,p,u,g,f,_,m,v;switch(i){case"l":o+=c.shift(),a+=c.shift(),t="L",e.push(o,a);break;case"L":o=c.shift(),a=c.shift(),e.push(o,a);break;case"m":const s=c.shift(),n=c.shift();if(o+=s,a+=n,t="M",r.length>2&&"z"===r[r.length-1].command)for(let t=r.length-2;t>=0;t--)if("M"===r[t].command){o=r[t].points[0]+s,a=r[t].points[1]+n;break}e.push(o,a),i="l";break;case"M":o=c.shift(),a=c.shift(),t="M",e.push(o,a),i="L";break;case"h":o+=c.shift(),t="L",e.push(o,a);break;case"H":o=c.shift(),t="L",e.push(o,a);break;case"v":a+=c.shift(),t="L",e.push(o,a);break;case"V":a=c.shift(),t="L",e.push(o,a);break;case"C":e.push(c.shift(),c.shift(),c.shift(),c.shift()),o=c.shift(),a=c.shift(),e.push(o,a);break;case"c":e.push(o+c.shift(),a+c.shift(),o+c.shift(),a+c.shift()),o+=c.shift(),a+=c.shift(),t="C",e.push(o,a);break;case"S":h=o,d=a,l=r[r.length-1],"C"===l.command&&(h=o+(o-l.points[2]),d=a+(a-l.points[3])),e.push(h,d,c.shift(),c.shift()),o=c.shift(),a=c.shift(),t="C",e.push(o,a);break;case"s":h=o,d=a,l=r[r.length-1],"C"===l.command&&(h=o+(o-l.points[2]),d=a+(a-l.points[3])),e.push(h,d,o+c.shift(),a+c.shift()),o+=c.shift(),a+=c.shift(),t="C",e.push(o,a);break;case"Q":e.push(c.shift(),c.shift()),o=c.shift(),a=c.shift(),e.push(o,a);break;case"q":e.push(o+c.shift(),a+c.shift()),o+=c.shift(),a+=c.shift(),t="Q",e.push(o,a);break;case"T":h=o,d=a,l=r[r.length-1],"Q"===l.command&&(h=o+(o-l.points[0]),d=a+(a-l.points[1])),o=c.shift(),a=c.shift(),t="Q",e.push(h,d,o,a);break;case"t":h=o,d=a,l=r[r.length-1],"Q"===l.command&&(h=o+(o-l.points[0]),d=a+(a-l.points[1])),o+=c.shift(),a+=c.shift(),t="Q",e.push(h,d,o,a);break;case"A":p=c.shift(),u=c.shift(),g=c.shift(),f=c.shift(),_=c.shift(),m=o,v=a,o=c.shift(),a=c.shift(),t="A",e=this.convertEndpointToCenterParameterization(m,v,o,a,f,_,p,u,g);break;case"a":p=c.shift(),u=c.shift(),g=c.shift(),f=c.shift(),_=c.shift(),m=o,v=a,o+=c.shift(),a+=c.shift(),t="A",e=this.convertEndpointToCenterParameterization(m,v,o,a,f,_,p,u,g)}r.push({command:t||i,points:e,start:{x:s,y:n},pathLength:this.calcLength(s,n,t||i,e)})}"z"!==i&&"Z"!==i||r.push({command:"z",points:[],start:void 0,pathLength:0})}return r}static calcLength(e,i,r,n){let o,a,l,h;const c=t;switch(r){case"L":return c.getLineLength(e,i,n[0],n[1]);case"C":return(0,s.getCubicArcLength)([e,n[0],n[2],n[4]],[i,n[1],n[3],n[5]],1);case"Q":return(0,s.getQuadraticArcLength)([e,n[0],n[2]],[i,n[1],n[3]],1);case"A":o=0;const t=n[4],r=n[5],d=n[4]+r;let p=Math.PI/180;if(Math.abs(t-d)<p&&(p=Math.abs(t-d)),a=c.getPointOnEllipticalArc(n[0],n[1],n[2],n[3],t,0),r<0)for(h=t-p;h>d;h-=p)l=c.getPointOnEllipticalArc(n[0],n[1],n[2],n[3],h,0),o+=c.getLineLength(a.x,a.y,l.x,l.y),a=l;else for(h=t+p;h<d;h+=p)l=c.getPointOnEllipticalArc(n[0],n[1],n[2],n[3],h,0),o+=c.getLineLength(a.x,a.y,l.x,l.y),a=l;return l=c.getPointOnEllipticalArc(n[0],n[1],n[2],n[3],d,0),o+=c.getLineLength(a.x,a.y,l.x,l.y),o}return 0}static convertEndpointToCenterParameterization(t,e,i,s,r,n,o,a,l){const h=l*(Math.PI/180),c=Math.cos(h)*(t-i)/2+Math.sin(h)*(e-s)/2,d=-1*Math.sin(h)*(t-i)/2+Math.cos(h)*(e-s)/2,p=c*c/(o*o)+d*d/(a*a);p>1&&(o*=Math.sqrt(p),a*=Math.sqrt(p));let u=Math.sqrt((o*o*(a*a)-o*o*(d*d)-a*a*(c*c))/(o*o*(d*d)+a*a*(c*c)));r===n&&(u*=-1),isNaN(u)&&(u=0);const g=u*o*d/a,f=u*-a*c/o,_=(t+i)/2+Math.cos(h)*g-Math.sin(h)*f,m=(e+s)/2+Math.sin(h)*g+Math.cos(h)*f,v=function(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1])},y=function(t,e){return(t[0]*e[0]+t[1]*e[1])/(v(t)*v(e))},b=function(t,e){return(t[0]*e[1]<t[1]*e[0]?-1:1)*Math.acos(y(t,e))},x=b([1,0],[(c-g)/o,(d-f)/a]),w=[(c-g)/o,(d-f)/a],S=[(-1*c-g)/o,(-1*d-f)/a];let k=b(w,S);return y(w,S)<=-1&&(k=Math.PI),y(w,S)>=1&&(k=0),0===n&&k>0&&(k-=2*Math.PI),1===n&&k<0&&(k+=2*Math.PI),[_,m,o,a,x,k,h,n]}};return In.Path=r,r.prototype.className="Path",r.prototype._attrsAffectingSize=["data"],(0,e._registerNode)(r),t.Factory.addGetterSetter(r,"data"),In}var An,Ln={};var Tn,Fn={};var Dn,Rn={};var Nn,On={};var Un,zn={};function Gn(){if(Un)return zn;Un=1,Object.defineProperty(zn,"__esModule",{value:!0}),zn.Rect=void 0;const t=Hr(),e=nn(),i=kr(),s=$r(),r=Wr();let n=class extends e.Shape{_sceneFunc(t){const e=this.cornerRadius(),i=this.width(),r=this.height();t.beginPath(),e?s.Util.drawRoundedRectPath(t,i,r,e):t.rect(0,0,i,r),t.closePath(),t.fillStrokeShape(this)}};return zn.Rect=n,n.prototype.className="Rect",(0,i._registerNode)(n),t.Factory.addGetterSetter(n,"cornerRadius",0,(0,r.getNumberOrArrayOfNumbersValidator)(4)),zn}var Bn,Wn={};var Hn,Vn={};var jn,qn={};var Kn,Yn={};var Xn,Jn={};function Zn(){if(Xn)return Jn;Xn=1,Object.defineProperty(Jn,"__esModule",{value:!0}),Jn.Text=void 0,Jn.stringToArray=o;const t=$r(),e=Hr(),i=nn(),s=kr(),r=Wr(),n=kr();function o(t){return[...t].reduce((t,e,i,s)=>{if(/\p{Emoji}/u.test(e)){const r=s[i+1];r&&/\p{Emoji_Modifier}|\u200D/u.test(r)?(t.push(e+r),s[i+1]=""):t.push(e)}else/\p{Regional_Indicator}{2}/u.test(e+(s[i+1]||""))?t.push(e+s[i+1]):i>0&&/\p{Mn}|\p{Me}|\p{Mc}/u.test(e)?t[t.length-1]+=e:e&&t.push(e);return t},[])}const a="auto",l="inherit",h="justify",c="left",d="middle",p="normal",u=" ",g="none",f=["direction","fontFamily","fontSize","fontStyle","fontVariant","padding","align","verticalAlign","lineHeight","text","width","height","wrap","ellipsis","letterSpacing"],_=f.length;let m;function v(){return m||(m=t.Util.createCanvasElement().getContext("2d"),m)}let y=class extends i.Shape{constructor(t){super(function(t){return(t=t||{}).fillLinearGradientColorStops||t.fillRadialGradientColorStops||t.fillPatternImage||(t.fill=t.fill||"black"),t}(t)),this._partialTextX=0,this._partialTextY=0;for(let t=0;t<_;t++)this.on(f[t]+"Change.konva",this._setTextData);this._setTextData()}_sceneFunc(t){const e=this.textArr,i=e.length;if(!this.text())return;let r,n=this.padding(),a=this.fontSize(),p=this.lineHeight()*a,u=this.verticalAlign(),g=this.direction(),f=0,_=this.align(),m=this.getWidth(),v=this.letterSpacing(),y=this.fill(),b=this.textDecoration(),x=-1!==b.indexOf("underline"),w=-1!==b.indexOf("line-through");g=g===l?t.direction:g;let S=p/2,k=d;if(s.Konva._fixTextRendering){const t=this.measureSize("M");k="alphabetic",S=(t.fontBoundingBoxAscent-t.fontBoundingBoxDescent)/2+p/2}for("rtl"===g&&t.setAttr("direction",g),t.setAttr("font",this._getContextFont()),t.setAttr("textBaseline",k),t.setAttr("textAlign",c),u===d?f=(this.getHeight()-i*p-2*n)/2:"bottom"===u&&(f=this.getHeight()-i*p-2*n),t.translate(n,f+n),r=0;r<i;r++){let l=0,c=0;const d=e[r],u=d.text,f=d.width,b=d.lastInParagraph;if(t.save(),"right"===_?l+=m-f-2*n:"center"===_&&(l+=(m-f-2*n)/2),x){t.save(),t.beginPath();const e=l,i=S+c+(s.Konva._fixTextRendering?Math.round(a/4):Math.round(a/2));t.moveTo(e,i);const r=_!==h||b?f:m-2*n;t.lineTo(e+Math.round(r),i),t.lineWidth=a/15;const o=this._getLinearGradient();t.strokeStyle=o||y,t.stroke(),t.restore()}if(w){t.save(),t.beginPath();const e=s.Konva._fixTextRendering?-Math.round(a/4):0;t.moveTo(l,S+c+e);const i=_!==h||b?f:m-2*n;t.lineTo(l+Math.round(i),S+c+e),t.lineWidth=a/15;const r=this._getLinearGradient();t.strokeStyle=r||y,t.stroke(),t.restore()}if("rtl"===g||0===v&&_!==h)0!==v&&t.setAttr("letterSpacing",`${v}px`),this._partialTextX=l,this._partialTextY=S+c,this._partialText=u,t.fillStrokeShape(this);else{const e=u.split(" ").length-1,i=o(u);for(let s=0;s<i.length;s++){const r=i[s];" "!==r||b||_!==h||(l+=(m-2*n-f)/e),this._partialTextX=l,this._partialTextY=S+c,this._partialText=r,t.fillStrokeShape(this),l+=this.measureSize(r).width+v}}t.restore(),i>1&&(S+=p)}}_hitFunc(t){const e=this.getWidth(),i=this.getHeight();t.beginPath(),t.rect(0,0,e,i),t.closePath(),t.fillStrokeShape(this)}setText(e){const i=t.Util._isString(e)?e:null==e?"":e+"";return this._setAttr("text",i),this}getWidth(){return this.attrs.width===a||void 0===this.attrs.width?this.getTextWidth()+2*this.padding():this.attrs.width}getHeight(){return this.attrs.height===a||void 0===this.attrs.height?this.fontSize()*this.textArr.length*this.lineHeight()+2*this.padding():this.attrs.height}getTextWidth(){return this.textWidth}getTextHeight(){return t.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."),this.textHeight}measureSize(t){var e,i,s,r,n,o,a,l,h,c,d;let p,u=v(),g=this.fontSize();u.save(),u.font=this._getContextFont(),p=u.measureText(t),u.restore();const f=g/100;return{actualBoundingBoxAscent:null!==(e=p.actualBoundingBoxAscent)&&void 0!==e?e:71.58203125*f,actualBoundingBoxDescent:null!==(i=p.actualBoundingBoxDescent)&&void 0!==i?i:0,actualBoundingBoxLeft:null!==(s=p.actualBoundingBoxLeft)&&void 0!==s?s:-7.421875*f,actualBoundingBoxRight:null!==(r=p.actualBoundingBoxRight)&&void 0!==r?r:75.732421875*f,alphabeticBaseline:null!==(n=p.alphabeticBaseline)&&void 0!==n?n:0,emHeightAscent:null!==(o=p.emHeightAscent)&&void 0!==o?o:100*f,emHeightDescent:null!==(a=p.emHeightDescent)&&void 0!==a?a:-20*f,fontBoundingBoxAscent:null!==(l=p.fontBoundingBoxAscent)&&void 0!==l?l:91*f,fontBoundingBoxDescent:null!==(h=p.fontBoundingBoxDescent)&&void 0!==h?h:21*f,hangingBaseline:null!==(c=p.hangingBaseline)&&void 0!==c?c:72.80000305175781*f,ideographicBaseline:null!==(d=p.ideographicBaseline)&&void 0!==d?d:-21*f,width:p.width,height:g}}_getContextFont(){return this.fontStyle()+u+this.fontVariant()+u+(this.fontSize()+"px ")+this.fontFamily().split(",").map(t=>{const e=(t=t.trim()).indexOf(" ")>=0,i=t.indexOf('"')>=0||t.indexOf("'")>=0;return e&&!i&&(t=`"${t}"`),t}).join(", ")}_addTextLine(t){this.align()===h&&(t=t.trim());const e=this._getTextWidth(t);return this.textArr.push({text:t,width:e,lastInParagraph:!1})}_getTextWidth(t){const e=this.letterSpacing(),i=t.length;return v().measureText(t).width+e*i}_setTextData(){let t=this.text().split("\n"),e=+this.fontSize(),i=0,s=this.lineHeight()*e,r=this.attrs.width,n=this.attrs.height,l=r!==a&&void 0!==r,h=n!==a&&void 0!==n,c=this.padding(),d=r-2*c,p=n-2*c,f=0,_=this.wrap(),m="char"!==_&&_!==g,y=this.ellipsis();this.textArr=[],v().font=this._getContextFont();const b=y?this._getTextWidth("…"):0;for(let e=0,r=t.length;e<r;++e){let n=t[e],a=this._getTextWidth(n);if(l&&a>d)for(;n.length>0;){let t=0,e=o(n).length,r="",l=0;for(;t<e;){const i=t+e>>>1,a=o(n).slice(0,i+1).join(""),c=this._getTextWidth(a);(y&&h&&f+s>p?c+b:c)<=d?(t=i+1,r=a,l=c):e=i}if(!r)break;if(m){const e=o(n),i=o(r),s=e[i.length];let a;if((s===u||"-"===s)&&l<=d)a=i.length;else{const t=i.lastIndexOf(u),e=i.lastIndexOf("-");a=Math.max(t,e)+1}a>0&&(t=a,r=e.slice(0,t).join(""),l=this._getTextWidth(r))}r=r.trimRight(),this._addTextLine(r),i=Math.max(i,l),f+=s;if(this._shouldHandleEllipsis(f)){this._tryToAddEllipsisToLastLine();break}if(n=o(n).slice(t).join("").trimLeft(),n.length>0&&(a=this._getTextWidth(n),a<=d)){this._addTextLine(n),f+=s,i=Math.max(i,a);break}}else this._addTextLine(n),f+=s,i=Math.max(i,a),this._shouldHandleEllipsis(f)&&e<r-1&&this._tryToAddEllipsisToLastLine();if(this.textArr[this.textArr.length-1]&&(this.textArr[this.textArr.length-1].lastInParagraph=!0),h&&f+s>p)break}this.textHeight=e,this.textWidth=i}_shouldHandleEllipsis(t){const e=+this.fontSize(),i=this.lineHeight()*e,s=this.attrs.height,r=s!==a&&void 0!==s,n=s-2*this.padding();return!(this.wrap()!==g)||r&&t+i>n}_tryToAddEllipsisToLastLine(){const t=this.attrs.width,e=t!==a&&void 0!==t,i=t-2*this.padding(),s=this.ellipsis(),r=this.textArr[this.textArr.length-1];if(r&&s){if(e){this._getTextWidth(r.text+"…")<i||(r.text=r.text.slice(0,r.text.length-3))}this.textArr.splice(this.textArr.length-1,1),this._addTextLine(r.text+"…")}}getStrokeScaleEnabled(){return!0}_useBufferCanvas(){const t=-1!==this.textDecoration().indexOf("underline")||-1!==this.textDecoration().indexOf("line-through"),e=this.hasShadow();return!(!t||!e)||super._useBufferCanvas()}};return Jn.Text=y,y.prototype._fillFunc=function(t){t.fillText(this._partialText,this._partialTextX,this._partialTextY)},y.prototype._strokeFunc=function(t){t.setAttr("miterLimit",2),t.strokeText(this._partialText,this._partialTextX,this._partialTextY)},y.prototype.className="Text",y.prototype._attrsAffectingSize=["text","fontSize","padding","wrap","lineHeight","letterSpacing"],(0,n._registerNode)(y),e.Factory.overWriteSetter(y,"width",(0,r.getNumberOrAutoValidator)()),e.Factory.overWriteSetter(y,"height",(0,r.getNumberOrAutoValidator)()),e.Factory.addGetterSetter(y,"direction",l),e.Factory.addGetterSetter(y,"fontFamily","Arial"),e.Factory.addGetterSetter(y,"fontSize",12,(0,r.getNumberValidator)()),e.Factory.addGetterSetter(y,"fontStyle",p),e.Factory.addGetterSetter(y,"fontVariant",p),e.Factory.addGetterSetter(y,"padding",0,(0,r.getNumberValidator)()),e.Factory.addGetterSetter(y,"align",c),e.Factory.addGetterSetter(y,"verticalAlign","top"),e.Factory.addGetterSetter(y,"lineHeight",1,(0,r.getNumberValidator)()),e.Factory.addGetterSetter(y,"wrap","word"),e.Factory.addGetterSetter(y,"ellipsis",!1,(0,r.getBooleanValidator)()),e.Factory.addGetterSetter(y,"letterSpacing",0,(0,r.getNumberValidator)()),e.Factory.addGetterSetter(y,"text","",(0,r.getStringValidator)()),e.Factory.addGetterSetter(y,"textDecoration",""),Jn}var Qn,to={};var eo,io={};function so(){if(eo)return io;eo=1,Object.defineProperty(io,"__esModule",{value:!0}),io.Transformer=void 0;const t=$r(),e=Hr(),i=Vr(),s=nn(),r=Gn(),n=dn(),o=kr(),a=Wr(),l=kr(),h="tr-konva",c=["resizeEnabledChange","rotateAnchorOffsetChange","rotateEnabledChange","enabledAnchorsChange","anchorSizeChange","borderEnabledChange","borderStrokeChange","borderStrokeWidthChange","borderDashChange","anchorStrokeChange","anchorStrokeWidthChange","anchorFillChange","anchorCornerRadiusChange","ignoreStrokeChange","anchorStyleFuncChange"].map(t=>t+`.${h}`).join(" "),d="nodesRect",p=["widthChange","heightChange","scaleXChange","scaleYChange","skewXChange","skewYChange","rotationChange","offsetXChange","offsetYChange","transformsEnabledChange","strokeWidthChange"],u={"top-left":-45,"top-center":0,"top-right":45,"middle-right":-90,"middle-left":90,"bottom-left":-135,"bottom-center":180,"bottom-right":135},g="ontouchstart"in o.Konva._global;const f=["top-left","top-center","top-right","middle-right","middle-left","bottom-left","bottom-center","bottom-right"];function _(t,e,i){const s=i.x+(t.x-i.x)*Math.cos(e)-(t.y-i.y)*Math.sin(e),r=i.y+(t.x-i.x)*Math.sin(e)+(t.y-i.y)*Math.cos(e);return{...t,rotation:t.rotation+e,x:s,y:r}}function m(t,e){const i=function(t){return{x:t.x+t.width/2*Math.cos(t.rotation)+t.height/2*Math.sin(-t.rotation),y:t.y+t.height/2*Math.cos(t.rotation)+t.width/2*Math.sin(t.rotation)}}(t);return _(t,e,i)}let v=0,y=class extends n.Group{constructor(t){super(t),this._movingAnchorName=null,this._transforming=!1,this._createElements(),this._handleMouseMove=this._handleMouseMove.bind(this),this._handleMouseUp=this._handleMouseUp.bind(this),this.update=this.update.bind(this),this.on(c,this.update),this.getNode()&&this.update()}attachTo(t){return this.setNode(t),this}setNode(e){return t.Util.warn("tr.setNode(shape), tr.node(shape) and tr.attachTo(shape) methods are deprecated. Please use tr.nodes(nodesArray) instead."),this.setNodes([e])}getNode(){return this._nodes&&this._nodes[0]}_getEventNamespace(){return h+this._id}setNodes(e=[]){this._nodes&&this._nodes.length&&this.detach();const i=e.filter(e=>!e.isAncestorOf(this)||(t.Util.error("Konva.Transformer cannot be an a child of the node you are trying to attach"),!1));this._nodes=e=i,1===e.length&&this.useSingleNodeRotation()?this.rotation(e[0].getAbsoluteRotation()):this.rotation(0),this._nodes.forEach(t=>{const e=()=>{1===this.nodes().length&&this.useSingleNodeRotation()&&this.rotation(this.nodes()[0].getAbsoluteRotation()),this._resetTransformCache(),this._transforming||this.isDragging()||this.update()};if(t._attrsAffectingSize.length){const i=t._attrsAffectingSize.map(t=>t+"Change."+this._getEventNamespace()).join(" ");t.on(i,e)}t.on(p.map(t=>t+`.${this._getEventNamespace()}`).join(" "),e),t.on(`absoluteTransformChange.${this._getEventNamespace()}`,e),this._proxyDrag(t)}),this._resetTransformCache();return!!this.findOne(".top-left")&&this.update(),this}_proxyDrag(t){let e;t.on(`dragstart.${this._getEventNamespace()}`,i=>{e=t.getAbsolutePosition(),this.isDragging()||t===this.findOne(".back")||this.startDrag(i,!1)}),t.on(`dragmove.${this._getEventNamespace()}`,i=>{if(!e)return;const s=t.getAbsolutePosition(),r=s.x-e.x,n=s.y-e.y;this.nodes().forEach(e=>{if(e===t)return;if(e.isDragging())return;const s=e.getAbsolutePosition();e.setAbsolutePosition({x:s.x+r,y:s.y+n}),e.startDrag(i)}),e=null})}getNodes(){return this._nodes||[]}getActiveAnchor(){return this._movingAnchorName}detach(){this._nodes&&this._nodes.forEach(t=>{t.off("."+this._getEventNamespace())}),this._nodes=[],this._resetTransformCache()}_resetTransformCache(){this._clearCache(d),this._clearCache("transform"),this._clearSelfAndDescendantCache("absoluteTransform")}_getNodeRect(){return this._getCache(d,this.__getNodeRect)}__getNodeShape(t,e=this.rotation(),i){const s=t.getClientRect({skipTransform:!0,skipShadow:!0,skipStroke:this.ignoreStroke()}),r=t.getAbsoluteScale(i),n=t.getAbsolutePosition(i),a=s.x*r.x-t.offsetX()*r.x,l=s.y*r.y-t.offsetY()*r.y,h=(o.Konva.getAngle(t.getAbsoluteRotation())+2*Math.PI)%(2*Math.PI);return _({x:n.x+a*Math.cos(h)+l*Math.sin(-h),y:n.y+l*Math.cos(h)+a*Math.sin(h),width:s.width*r.x,height:s.height*r.y,rotation:h},-o.Konva.getAngle(e),{x:0,y:0})}__getNodeRect(){if(!this.getNode())return{x:-1e8,y:-1e8,width:0,height:0,rotation:0};const e=[];this.nodes().map(t=>{const i=t.getClientRect({skipTransform:!0,skipShadow:!0,skipStroke:this.ignoreStroke()}),s=[{x:i.x,y:i.y},{x:i.x+i.width,y:i.y},{x:i.x+i.width,y:i.y+i.height},{x:i.x,y:i.y+i.height}],r=t.getAbsoluteTransform();s.forEach(function(t){const i=r.point(t);e.push(i)})});const i=new t.Transform;i.rotate(-o.Konva.getAngle(this.rotation()));let s=1/0,r=1/0,n=-1/0,a=-1/0;e.forEach(function(t){const e=i.point(t);void 0===s&&(s=n=e.x,r=a=e.y),s=Math.min(s,e.x),r=Math.min(r,e.y),n=Math.max(n,e.x),a=Math.max(a,e.y)}),i.invert();const l=i.point({x:s,y:r});return{x:l.x,y:l.y,width:n-s,height:a-r,rotation:o.Konva.getAngle(this.rotation())}}getX(){return this._getNodeRect().x}getY(){return this._getNodeRect().y}getWidth(){return this._getNodeRect().width}getHeight(){return this._getNodeRect().height}_createElements(){this._createBack(),f.forEach(t=>{this._createAnchor(t)}),this._createAnchor("rotater")}_createAnchor(e){const i=new r.Rect({stroke:"rgb(0, 161, 255)",fill:"white",strokeWidth:1,name:e+" _anchor",dragDistance:0,draggable:!0,hitStrokeWidth:g?10:"auto"}),s=this;i.on("mousedown touchstart",function(t){s._handleMouseDown(t)}),i.on("dragstart",t=>{i.stopDrag(),t.cancelBubble=!0}),i.on("dragend",t=>{t.cancelBubble=!0}),i.on("mouseenter",()=>{const s=o.Konva.getAngle(this.rotation()),r=this.rotateAnchorCursor(),n=function(e,i,s){if("rotater"===e)return s;i+=t.Util.degToRad(u[e]||0);const r=(t.Util.radToDeg(i)%360+360)%360;return t.Util._inRange(r,337.5,360)||t.Util._inRange(r,0,22.5)?"ns-resize":t.Util._inRange(r,22.5,67.5)?"nesw-resize":t.Util._inRange(r,67.5,112.5)?"ew-resize":t.Util._inRange(r,112.5,157.5)?"nwse-resize":t.Util._inRange(r,157.5,202.5)?"ns-resize":t.Util._inRange(r,202.5,247.5)?"nesw-resize":t.Util._inRange(r,247.5,292.5)?"ew-resize":t.Util._inRange(r,292.5,337.5)?"nwse-resize":(t.Util.error("Transformer has unknown angle for cursor detection: "+r),"pointer")}(e,s,r);i.getStage().content&&(i.getStage().content.style.cursor=n),this._cursorChange=!0}),i.on("mouseout",()=>{i.getStage().content&&(i.getStage().content.style.cursor=""),this._cursorChange=!1}),this.add(i)}_createBack(){const e=new s.Shape({name:"back",width:0,height:0,draggable:!0,sceneFunc(e,i){const s=i.getParent(),r=s.padding();e.beginPath(),e.rect(-r,-r,i.width()+2*r,i.height()+2*r),e.moveTo(i.width()/2,-r),s.rotateEnabled()&&s.rotateLineVisible()&&e.lineTo(i.width()/2,-s.rotateAnchorOffset()*t.Util._sign(i.height())-r),e.fillStrokeShape(i)},hitFunc:(t,e)=>{if(!this.shouldOverdrawWholeArea())return;const i=this.padding();t.beginPath(),t.rect(-i,-i,e.width()+2*i,e.height()+2*i),t.fillStrokeShape(e)}});this.add(e),this._proxyDrag(e),e.on("dragstart",t=>{t.cancelBubble=!0}),e.on("dragmove",t=>{t.cancelBubble=!0}),e.on("dragend",t=>{t.cancelBubble=!0}),this.on("dragmove",t=>{this.update()})}_handleMouseDown(t){if(this._transforming)return;this._movingAnchorName=t.target.name().split(" ")[0];const e=this._getNodeRect(),i=e.width,s=e.height,r=Math.sqrt(Math.pow(i,2)+Math.pow(s,2));this.sin=Math.abs(s/r),this.cos=Math.abs(i/r),"undefined"!=typeof window&&(window.addEventListener("mousemove",this._handleMouseMove),window.addEventListener("touchmove",this._handleMouseMove),window.addEventListener("mouseup",this._handleMouseUp,!0),window.addEventListener("touchend",this._handleMouseUp,!0)),this._transforming=!0;const n=t.target.getAbsolutePosition(),o=t.target.getStage().getPointerPosition();this._anchorDragOffset={x:o.x-n.x,y:o.y-n.y},v++,this._fire("transformstart",{evt:t.evt,target:this.getNode()}),this._nodes.forEach(e=>{e._fire("transformstart",{evt:t.evt,target:e})})}_handleMouseMove(t){let e,i,s;const r=this.findOne("."+this._movingAnchorName),n=r.getStage();n.setPointersPositions(t);const a=n.getPointerPosition();let l={x:a.x-this._anchorDragOffset.x,y:a.y-this._anchorDragOffset.y};const h=r.getAbsolutePosition();this.anchorDragBoundFunc()&&(l=this.anchorDragBoundFunc()(h,l,t)),r.setAbsolutePosition(l);const c=r.getAbsolutePosition();if(h.x===c.x&&h.y===c.y)return;if("rotater"===this._movingAnchorName){const s=this._getNodeRect();e=r.x()-s.width/2,i=-r.y()+s.height/2;let n=Math.atan2(-i,e)+Math.PI/2;s.height<0&&(n-=Math.PI);const a=o.Konva.getAngle(this.rotation())+n,l=o.Konva.getAngle(this.rotationSnapTolerance()),h=function(t,e,i){let s=e;for(let r=0;r<t.length;r++){const n=o.Konva.getAngle(t[r]),a=Math.abs(n-e)%(2*Math.PI);Math.min(a,2*Math.PI-a)<i&&(s=n)}return s}(this.rotationSnaps(),a,l),c=m(s,h-s.rotation);return void this._fitNodesInto(c,t)}const d=this.shiftBehavior();let p;p="inverted"===d?this.keepRatio()&&!t.shiftKey:"none"===d?this.keepRatio():this.keepRatio()||t.shiftKey;let u=this.centeredScaling()||t.altKey;if("top-left"===this._movingAnchorName){if(p){const t=u?{x:this.width()/2,y:this.height()/2}:{x:this.findOne(".bottom-right").x(),y:this.findOne(".bottom-right").y()};s=Math.sqrt(Math.pow(t.x-r.x(),2)+Math.pow(t.y-r.y(),2));const n=this.findOne(".top-left").x()>t.x?-1:1,o=this.findOne(".top-left").y()>t.y?-1:1;e=s*this.cos*n,i=s*this.sin*o,this.findOne(".top-left").x(t.x-e),this.findOne(".top-left").y(t.y-i)}}else if("top-center"===this._movingAnchorName)this.findOne(".top-left").y(r.y());else if("top-right"===this._movingAnchorName){if(p){const t=u?{x:this.width()/2,y:this.height()/2}:{x:this.findOne(".bottom-left").x(),y:this.findOne(".bottom-left").y()};s=Math.sqrt(Math.pow(r.x()-t.x,2)+Math.pow(t.y-r.y(),2));const n=this.findOne(".top-right").x()<t.x?-1:1,o=this.findOne(".top-right").y()>t.y?-1:1;e=s*this.cos*n,i=s*this.sin*o,this.findOne(".top-right").x(t.x+e),this.findOne(".top-right").y(t.y-i)}var g=r.position();this.findOne(".top-left").y(g.y),this.findOne(".bottom-right").x(g.x)}else if("middle-left"===this._movingAnchorName)this.findOne(".top-left").x(r.x());else if("middle-right"===this._movingAnchorName)this.findOne(".bottom-right").x(r.x());else if("bottom-left"===this._movingAnchorName){if(p){const t=u?{x:this.width()/2,y:this.height()/2}:{x:this.findOne(".top-right").x(),y:this.findOne(".top-right").y()};s=Math.sqrt(Math.pow(t.x-r.x(),2)+Math.pow(r.y()-t.y,2));const n=t.x<r.x()?-1:1,o=r.y()<t.y?-1:1;e=s*this.cos*n,i=s*this.sin*o,r.x(t.x-e),r.y(t.y+i)}g=r.position(),this.findOne(".top-left").x(g.x),this.findOne(".bottom-right").y(g.y)}else if("bottom-center"===this._movingAnchorName)this.findOne(".bottom-right").y(r.y());else if("bottom-right"===this._movingAnchorName){if(p){const t=u?{x:this.width()/2,y:this.height()/2}:{x:this.findOne(".top-left").x(),y:this.findOne(".top-left").y()};s=Math.sqrt(Math.pow(r.x()-t.x,2)+Math.pow(r.y()-t.y,2));const n=this.findOne(".bottom-right").x()<t.x?-1:1,o=this.findOne(".bottom-right").y()<t.y?-1:1;e=s*this.cos*n,i=s*this.sin*o,this.findOne(".bottom-right").x(t.x+e),this.findOne(".bottom-right").y(t.y+i)}}else console.error(new Error("Wrong position argument of selection resizer: "+this._movingAnchorName));if(u=this.centeredScaling()||t.altKey,u){const t=this.findOne(".top-left"),e=this.findOne(".bottom-right"),i=t.x(),s=t.y(),r=this.getWidth()-e.x(),n=this.getHeight()-e.y();e.move({x:-i,y:-s}),t.move({x:r,y:n})}const f=this.findOne(".top-left").getAbsolutePosition();e=f.x,i=f.y;const _=this.findOne(".bottom-right").x()-this.findOne(".top-left").x(),v=this.findOne(".bottom-right").y()-this.findOne(".top-left").y();this._fitNodesInto({x:e,y:i,width:_,height:v,rotation:o.Konva.getAngle(this.rotation())},t)}_handleMouseUp(t){this._removeEvents(t)}getAbsoluteTransform(){return this.getTransform()}_removeEvents(t){var e;if(this._transforming){this._transforming=!1,"undefined"!=typeof window&&(window.removeEventListener("mousemove",this._handleMouseMove),window.removeEventListener("touchmove",this._handleMouseMove),window.removeEventListener("mouseup",this._handleMouseUp,!0),window.removeEventListener("touchend",this._handleMouseUp,!0));const i=this.getNode();v--,this._fire("transformend",{evt:t,target:i}),null===(e=this.getLayer())||void 0===e||e.batchDraw(),i&&this._nodes.forEach(e=>{var i;e._fire("transformend",{evt:t,target:e}),null===(i=e.getLayer())||void 0===i||i.batchDraw()}),this._movingAnchorName=null}}_fitNodesInto(e,i){const s=this._getNodeRect();if(t.Util._inRange(e.width,2*-this.padding()-1,1))return void this.update();if(t.Util._inRange(e.height,2*-this.padding()-1,1))return void this.update();const r=new t.Transform;if(r.rotate(o.Konva.getAngle(this.rotation())),this._movingAnchorName&&e.width<0&&this._movingAnchorName.indexOf("left")>=0){const t=r.point({x:2*-this.padding(),y:0});e.x+=t.x,e.y+=t.y,e.width+=2*this.padding(),this._movingAnchorName=this._movingAnchorName.replace("left","right"),this._anchorDragOffset.x-=t.x,this._anchorDragOffset.y-=t.y}else if(this._movingAnchorName&&e.width<0&&this._movingAnchorName.indexOf("right")>=0){const t=r.point({x:2*this.padding(),y:0});this._movingAnchorName=this._movingAnchorName.replace("right","left"),this._anchorDragOffset.x-=t.x,this._anchorDragOffset.y-=t.y,e.width+=2*this.padding()}if(this._movingAnchorName&&e.height<0&&this._movingAnchorName.indexOf("top")>=0){const t=r.point({x:0,y:2*-this.padding()});e.x+=t.x,e.y+=t.y,this._movingAnchorName=this._movingAnchorName.replace("top","bottom"),this._anchorDragOffset.x-=t.x,this._anchorDragOffset.y-=t.y,e.height+=2*this.padding()}else if(this._movingAnchorName&&e.height<0&&this._movingAnchorName.indexOf("bottom")>=0){const t=r.point({x:0,y:2*this.padding()});this._movingAnchorName=this._movingAnchorName.replace("bottom","top"),this._anchorDragOffset.x-=t.x,this._anchorDragOffset.y-=t.y,e.height+=2*this.padding()}if(this.boundBoxFunc()){const i=this.boundBoxFunc()(s,e);i?e=i:t.Util.warn("boundBoxFunc returned falsy. You should return new bound rect from it!")}const n=1e7,a=new t.Transform;a.translate(s.x,s.y),a.rotate(s.rotation),a.scale(s.width/n,s.height/n);const l=new t.Transform,h=e.width/n,c=e.height/n;!1===this.flipEnabled()?(l.translate(e.x,e.y),l.rotate(e.rotation),l.translate(e.width<0?e.width:0,e.height<0?e.height:0),l.scale(Math.abs(h),Math.abs(c))):(l.translate(e.x,e.y),l.rotate(e.rotation),l.scale(h,c));const d=l.multiply(a.invert());this._nodes.forEach(e=>{var i;const s=e.getParent().getAbsoluteTransform(),r=e.getTransform().copy();r.translate(e.offsetX(),e.offsetY());const n=new t.Transform;n.multiply(s.copy().invert()).multiply(d).multiply(s).multiply(r);const o=n.decompose();e.setAttrs(o),null===(i=e.getLayer())||void 0===i||i.batchDraw()}),this.rotation(t.Util._getRotation(e.rotation)),this._nodes.forEach(t=>{this._fire("transform",{evt:i,target:t}),t._fire("transform",{evt:i,target:t})}),this._resetTransformCache(),this.update(),this.getLayer().batchDraw()}forceUpdate(){this._resetTransformCache(),this.update()}_batchChangeChild(t,e){this.findOne(t).setAttrs(e)}update(){var e;const i=this._getNodeRect();this.rotation(t.Util._getRotation(i.rotation));const s=i.width,r=i.height,n=this.enabledAnchors(),o=this.resizeEnabled(),a=this.padding(),l=this.anchorSize(),h=this.find("._anchor");h.forEach(t=>{t.setAttrs({width:l,height:l,offsetX:l/2,offsetY:l/2,stroke:this.anchorStroke(),strokeWidth:this.anchorStrokeWidth(),fill:this.anchorFill(),cornerRadius:this.anchorCornerRadius()})}),this._batchChangeChild(".top-left",{x:0,y:0,offsetX:l/2+a,offsetY:l/2+a,visible:o&&n.indexOf("top-left")>=0}),this._batchChangeChild(".top-center",{x:s/2,y:0,offsetY:l/2+a,visible:o&&n.indexOf("top-center")>=0}),this._batchChangeChild(".top-right",{x:s,y:0,offsetX:l/2-a,offsetY:l/2+a,visible:o&&n.indexOf("top-right")>=0}),this._batchChangeChild(".middle-left",{x:0,y:r/2,offsetX:l/2+a,visible:o&&n.indexOf("middle-left")>=0}),this._batchChangeChild(".middle-right",{x:s,y:r/2,offsetX:l/2-a,visible:o&&n.indexOf("middle-right")>=0}),this._batchChangeChild(".bottom-left",{x:0,y:r,offsetX:l/2+a,offsetY:l/2-a,visible:o&&n.indexOf("bottom-left")>=0}),this._batchChangeChild(".bottom-center",{x:s/2,y:r,offsetY:l/2-a,visible:o&&n.indexOf("bottom-center")>=0}),this._batchChangeChild(".bottom-right",{x:s,y:r,offsetX:l/2-a,offsetY:l/2-a,visible:o&&n.indexOf("bottom-right")>=0}),this._batchChangeChild(".rotater",{x:s/2,y:-this.rotateAnchorOffset()*t.Util._sign(r)-a,visible:this.rotateEnabled()}),this._batchChangeChild(".back",{width:s,height:r,visible:this.borderEnabled(),stroke:this.borderStroke(),strokeWidth:this.borderStrokeWidth(),dash:this.borderDash(),x:0,y:0});const c=this.anchorStyleFunc();c&&h.forEach(t=>{c(t)}),null===(e=this.getLayer())||void 0===e||e.batchDraw()}isTransforming(){return this._transforming}stopTransform(){if(this._transforming){this._removeEvents();const t=this.findOne("."+this._movingAnchorName);t&&t.stopDrag()}}destroy(){return this.getStage()&&this._cursorChange&&this.getStage().content&&(this.getStage().content.style.cursor=""),n.Group.prototype.destroy.call(this),this.detach(),this._removeEvents(),this}toObject(){return i.Node.prototype.toObject.call(this)}clone(t){return i.Node.prototype.clone.call(this,t)}getClientRect(){return this.nodes().length>0?super.getClientRect():{x:0,y:0,width:0,height:0}}};return io.Transformer=y,y.isTransforming=()=>v>0,y.prototype.className="Transformer",(0,l._registerNode)(y),e.Factory.addGetterSetter(y,"enabledAnchors",f,function(e){return e instanceof Array||t.Util.warn("enabledAnchors value should be an array"),e instanceof Array&&e.forEach(function(e){-1===f.indexOf(e)&&t.Util.warn("Unknown anchor name: "+e+". Available names are: "+f.join(", "))}),e||[]}),e.Factory.addGetterSetter(y,"flipEnabled",!0,(0,a.getBooleanValidator)()),e.Factory.addGetterSetter(y,"resizeEnabled",!0),e.Factory.addGetterSetter(y,"anchorSize",10,(0,a.getNumberValidator)()),e.Factory.addGetterSetter(y,"rotateEnabled",!0),e.Factory.addGetterSetter(y,"rotateLineVisible",!0),e.Factory.addGetterSetter(y,"rotationSnaps",[]),e.Factory.addGetterSetter(y,"rotateAnchorOffset",50,(0,a.getNumberValidator)()),e.Factory.addGetterSetter(y,"rotateAnchorCursor","crosshair"),e.Factory.addGetterSetter(y,"rotationSnapTolerance",5,(0,a.getNumberValidator)()),e.Factory.addGetterSetter(y,"borderEnabled",!0),e.Factory.addGetterSetter(y,"anchorStroke","rgb(0, 161, 255)"),e.Factory.addGetterSetter(y,"anchorStrokeWidth",1,(0,a.getNumberValidator)()),e.Factory.addGetterSetter(y,"anchorFill","white"),e.Factory.addGetterSetter(y,"anchorCornerRadius",0,(0,a.getNumberValidator)()),e.Factory.addGetterSetter(y,"borderStroke","rgb(0, 161, 255)"),e.Factory.addGetterSetter(y,"borderStrokeWidth",1,(0,a.getNumberValidator)()),e.Factory.addGetterSetter(y,"borderDash"),e.Factory.addGetterSetter(y,"keepRatio",!0),e.Factory.addGetterSetter(y,"shiftBehavior","default"),e.Factory.addGetterSetter(y,"centeredScaling",!1),e.Factory.addGetterSetter(y,"ignoreStroke",!1),e.Factory.addGetterSetter(y,"padding",0,(0,a.getNumberValidator)()),e.Factory.addGetterSetter(y,"nodes"),e.Factory.addGetterSetter(y,"node"),e.Factory.addGetterSetter(y,"boundBoxFunc"),e.Factory.addGetterSetter(y,"anchorDragBoundFunc"),e.Factory.addGetterSetter(y,"anchorStyleFunc"),e.Factory.addGetterSetter(y,"shouldOverdrawWholeArea",!1),e.Factory.addGetterSetter(y,"useSingleNodeRotation",!0),e.Factory.backCompat(y,{lineEnabled:"borderEnabled",rotateHandlerOffset:"rotateAnchorOffset",enabledHandlers:"enabledAnchors"}),io}var ro,no={};var oo,ao={};function lo(){if(oo)return ao;oo=1,Object.defineProperty(ao,"__esModule",{value:!0}),ao.Blur=void 0;const t=Hr(),e=Vr(),i=Wr();function s(){this.r=0,this.g=0,this.b=0,this.a=0,this.next=null}const r=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],n=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];return ao.Blur=function(t){const e=Math.round(this.blurRadius());e>0&&function(t,e){const i=t.data,o=t.width,a=t.height;let l,h,c,d,p,u,g,f,_,m,v,y,b,x,w,S,k,C,P,$;const I=e+e+1,M=o-1,E=a-1,A=e+1,L=A*(A+1)/2,T=new s,F=r[e],D=n[e];let R=null,N=T,O=null,U=null;for(let t=1;t<I;t++)N=N.next=new s,t===A&&(R=N);N.next=T,c=h=0;for(let t=0;t<a;t++){y=b=x=w=d=p=u=g=0,f=A*(S=i[h]),_=A*(k=i[h+1]),m=A*(C=i[h+2]),v=A*(P=i[h+3]),d+=L*S,p+=L*k,u+=L*C,g+=L*P,N=T;for(let t=0;t<A;t++)N.r=S,N.g=k,N.b=C,N.a=P,N=N.next;for(let t=1;t<A;t++)l=h+((M<t?M:t)<<2),d+=(N.r=S=i[l])*($=A-t),p+=(N.g=k=i[l+1])*$,u+=(N.b=C=i[l+2])*$,g+=(N.a=P=i[l+3])*$,y+=S,b+=k,x+=C,w+=P,N=N.next;O=T,U=R;for(let t=0;t<o;t++)i[h+3]=P=g*F>>D,0!==P?(P=255/P,i[h]=(d*F>>D)*P,i[h+1]=(p*F>>D)*P,i[h+2]=(u*F>>D)*P):i[h]=i[h+1]=i[h+2]=0,d-=f,p-=_,u-=m,g-=v,f-=O.r,_-=O.g,m-=O.b,v-=O.a,l=c+((l=t+e+1)<M?l:M)<<2,y+=O.r=i[l],b+=O.g=i[l+1],x+=O.b=i[l+2],w+=O.a=i[l+3],d+=y,p+=b,u+=x,g+=w,O=O.next,f+=S=U.r,_+=k=U.g,m+=C=U.b,v+=P=U.a,y-=S,b-=k,x-=C,w-=P,U=U.next,h+=4;c+=o}for(let t=0;t<o;t++){b=x=w=y=p=u=g=d=0,h=t<<2,f=A*(S=i[h]),_=A*(k=i[h+1]),m=A*(C=i[h+2]),v=A*(P=i[h+3]),d+=L*S,p+=L*k,u+=L*C,g+=L*P,N=T;for(let t=0;t<A;t++)N.r=S,N.g=k,N.b=C,N.a=P,N=N.next;let s=o;for(let r=1;r<=e;r++)h=s+t<<2,d+=(N.r=S=i[h])*($=A-r),p+=(N.g=k=i[h+1])*$,u+=(N.b=C=i[h+2])*$,g+=(N.a=P=i[h+3])*$,y+=S,b+=k,x+=C,w+=P,N=N.next,r<E&&(s+=o);h=t,O=T,U=R;for(let e=0;e<a;e++)l=h<<2,i[l+3]=P=g*F>>D,P>0?(P=255/P,i[l]=(d*F>>D)*P,i[l+1]=(p*F>>D)*P,i[l+2]=(u*F>>D)*P):i[l]=i[l+1]=i[l+2]=0,d-=f,p-=_,u-=m,g-=v,f-=O.r,_-=O.g,m-=O.b,v-=O.a,l=t+((l=e+A)<E?l:E)*o<<2,d+=y+=O.r=i[l],p+=b+=O.g=i[l+1],u+=x+=O.b=i[l+2],g+=w+=O.a=i[l+3],O=O.next,f+=S=U.r,_+=k=U.g,m+=C=U.b,v+=P=U.a,y-=S,b-=k,x-=C,w-=P,U=U.next,h+=o}}(t,e)},t.Factory.addGetterSetter(e.Node,"blurRadius",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),ao}var ho,co={};var po,uo={};var go,fo={};var _o,mo={};var vo,yo={};var bo,xo={};var wo,So={};var ko,Co={};var Po,$o={};function Io(){if(Po)return $o;Po=1,Object.defineProperty($o,"__esModule",{value:!0}),$o.Kaleidoscope=void 0;const t=Hr(),e=Vr(),i=$r(),s=Wr();return $o.Kaleidoscope=function(t){const e=t.width,s=t.height;let r,n,o,a,l,h,c,d,p,u,g=Math.round(this.kaleidoscopePower());const f=Math.round(this.kaleidoscopeAngle()),_=Math.floor(e*(f%360)/360);if(g<1)return;const m=i.Util.createCanvasElement();m.width=e,m.height=s;const v=m.getContext("2d").getImageData(0,0,e,s);i.Util.releaseCanvas(m),function(t,e,i){const s=t.data,r=e.data,n=t.width,o=t.height,a=i.polarCenterX||n/2,l=i.polarCenterY||o/2;let h=Math.sqrt(a*a+l*l),c=n-a,d=o-l;const p=Math.sqrt(c*c+d*d);h=p>h?p:h;const u=o,g=n,f=360/g*Math.PI/180;for(let t=0;t<g;t+=1){const e=Math.sin(t*f),i=Math.cos(t*f);for(let o=0;o<u;o+=1){c=Math.floor(a+h*o/u*i),d=Math.floor(l+h*o/u*e);let p=4*(d*n+c);const g=s[p+0],f=s[p+1],_=s[p+2],m=s[p+3];p=4*(t+o*n),r[p+0]=g,r[p+1]=f,r[p+2]=_,r[p+3]=m}}}(t,v,{polarCenterX:e/2,polarCenterY:s/2});let y=e/Math.pow(2,g);for(;y<=8;)y*=2,g-=1;y=Math.ceil(y);let b=y,x=0,w=b,S=1;for(_+y>e&&(x=b,w=0,S=-1),n=0;n<s;n+=1)for(r=x;r!==w;r+=S)o=Math.round(r+_)%e,p=4*(e*n+o),l=v.data[p+0],h=v.data[p+1],c=v.data[p+2],d=v.data[p+3],u=4*(e*n+r),v.data[u+0]=l,v.data[u+1]=h,v.data[u+2]=c,v.data[u+3]=d;for(n=0;n<s;n+=1)for(b=Math.floor(y),a=0;a<g;a+=1){for(r=0;r<b+1;r+=1)p=4*(e*n+r),l=v.data[p+0],h=v.data[p+1],c=v.data[p+2],d=v.data[p+3],u=4*(e*n+2*b-r-1),v.data[u+0]=l,v.data[u+1]=h,v.data[u+2]=c,v.data[u+3]=d;b*=2}!function(t,e,i){const s=t.data,r=e.data,n=t.width,o=t.height,a=i.polarCenterX||n/2,l=i.polarCenterY||o/2;let h=Math.sqrt(a*a+l*l),c=n-a,d=o-l;const p=Math.sqrt(c*c+d*d);h=p>h?p:h;const u=o,g=n;let f,_;for(c=0;c<n;c+=1)for(d=0;d<o;d+=1){const t=c-a,e=d-l,i=Math.sqrt(t*t+e*e)*u/h;let o=(180*Math.atan2(e,t)/Math.PI+360+0)%360;o=o*g/360,f=Math.floor(o),_=Math.floor(i);let p=4*(_*n+f);const m=s[p+0],v=s[p+1],y=s[p+2],b=s[p+3];p=4*(d*n+c),r[p+0]=m,r[p+1]=v,r[p+2]=y,r[p+3]=b}}(v,t,{})},t.Factory.addGetterSetter(e.Node,"kaleidoscopePower",2,(0,s.getNumberValidator)(),t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"kaleidoscopeAngle",0,(0,s.getNumberValidator)(),t.Factory.afterSetFilter),$o}var Mo,Eo={};function Ao(){if(Mo)return Eo;Mo=1,Object.defineProperty(Eo,"__esModule",{value:!0}),Eo.Mask=void 0;const t=Hr(),e=Vr(),i=Wr();function s(t,e,i){let s=4*(i*t.width+e);const r=[];return r.push(t.data[s++],t.data[s++],t.data[s++],t.data[s++]),r}function r(t,e){return Math.sqrt(Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2)+Math.pow(t[2]-e[2],2))}return Eo.Mask=function(t){let e=function(t,e){const i=s(t,0,0),n=s(t,t.width-1,0),o=s(t,0,t.height-1),a=s(t,t.width-1,t.height-1),l=e||10;if(r(i,n)<l&&r(n,a)<l&&r(a,o)<l&&r(o,i)<l){const e=function(t){const e=[0,0,0];for(let i=0;i<t.length;i++)e[0]+=t[i][0],e[1]+=t[i][1],e[2]+=t[i][2];return e[0]/=t.length,e[1]/=t.length,e[2]/=t.length,e}([n,i,a,o]),s=[];for(let i=0;i<t.width*t.height;i++){const n=r(e,[t.data[4*i],t.data[4*i+1],t.data[4*i+2]]);s[i]=n<l?0:255}return s}}(t,this.threshold());return e&&(e=function(t,e,i){const s=[1,1,1,1,0,1,1,1,1],r=Math.round(Math.sqrt(s.length)),n=Math.floor(r/2),o=[];for(let a=0;a<i;a++)for(let l=0;l<e;l++){const h=a*e+l;let c=0;for(let o=0;o<r;o++)for(let h=0;h<r;h++){const d=a+o-n,p=l+h-n;if(d>=0&&d<i&&p>=0&&p<e){const i=s[o*r+h];c+=t[d*e+p]*i}}o[h]=2040===c?255:0}return o}(e,t.width,t.height),e=function(t,e,i){const s=[1,1,1,1,1,1,1,1,1],r=Math.round(Math.sqrt(s.length)),n=Math.floor(r/2),o=[];for(let a=0;a<i;a++)for(let l=0;l<e;l++){const h=a*e+l;let c=0;for(let o=0;o<r;o++)for(let h=0;h<r;h++){const d=a+o-n,p=l+h-n;if(d>=0&&d<i&&p>=0&&p<e){const i=s[o*r+h];c+=t[d*e+p]*i}}o[h]=c>=1020?255:0}return o}(e,t.width,t.height),e=function(t,e,i){const s=[1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9],r=Math.round(Math.sqrt(s.length)),n=Math.floor(r/2),o=[];for(let a=0;a<i;a++)for(let l=0;l<e;l++){const h=a*e+l;let c=0;for(let o=0;o<r;o++)for(let h=0;h<r;h++){const d=a+o-n,p=l+h-n;if(d>=0&&d<i&&p>=0&&p<e){const i=s[o*r+h];c+=t[d*e+p]*i}}o[h]=c}return o}(e,t.width,t.height),function(t,e){for(let i=0;i<t.width*t.height;i++)t.data[4*i+3]=e[i]}(t,e)),t},t.Factory.addGetterSetter(e.Node,"threshold",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),Eo}var Lo,To={};var Fo,Do={};var Ro,No={};var Oo,Uo={};var zo,Go={};var Bo,Wo={};var Ho,Vo={};var jo,qo,Ko={};function Yo(){if(qo)return xr;qo=1,Object.defineProperty(xr,"__esModule",{value:!0}),xr.Konva=void 0;const t=vn(),e=function(){if(yn)return bn;yn=1,Object.defineProperty(bn,"__esModule",{value:!0}),bn.Arc=void 0;const t=Hr(),e=nn(),i=kr(),s=Wr(),r=kr();let n=class extends e.Shape{_sceneFunc(t){const e=i.Konva.getAngle(this.angle()),s=this.clockwise();t.beginPath(),t.arc(0,0,this.outerRadius(),0,e,s),t.arc(0,0,this.innerRadius(),e,0,!s),t.closePath(),t.fillStrokeShape(this)}getWidth(){return 2*this.outerRadius()}getHeight(){return 2*this.outerRadius()}setWidth(t){this.outerRadius(t/2)}setHeight(t){this.outerRadius(t/2)}getSelfRect(){const t=this.innerRadius(),e=this.outerRadius(),s=this.clockwise(),r=i.Konva.getAngle(s?360-this.angle():this.angle()),n=Math.cos(Math.min(r,Math.PI)),o=Math.sin(Math.min(Math.max(Math.PI,r),3*Math.PI/2)),a=Math.sin(Math.min(r,Math.PI/2)),l=n*(n>0?t:e),h=o*(o>0?t:e),c=a*(a>0?e:t);return{x:l,y:s?-1*c:h,width:1*e-l,height:c-h}}};return bn.Arc=n,n.prototype._centroid=!0,n.prototype.className="Arc",n.prototype._attrsAffectingSize=["innerRadius","outerRadius","angle","clockwise"],(0,r._registerNode)(n),t.Factory.addGetterSetter(n,"innerRadius",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(n,"outerRadius",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(n,"angle",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(n,"clockwise",!1,(0,s.getBooleanValidator)()),bn}(),i=function(){if($n)return wn;$n=1,Object.defineProperty(wn,"__esModule",{value:!0}),wn.Arrow=void 0;const t=Hr(),e=kn(),i=Wr(),s=kr(),r=En();let n=class extends e.Line{_sceneFunc(t){super._sceneFunc(t);const e=2*Math.PI,i=this.points();let s=i;const n=0!==this.tension()&&i.length>4;n&&(s=this.getTensionPoints());const o=this.pointerLength(),a=i.length;let l,h;if(n){const t=[s[s.length-4],s[s.length-3],s[s.length-2],s[s.length-1],i[a-2],i[a-1]],e=r.Path.calcLength(s[s.length-4],s[s.length-3],"C",t),n=r.Path.getPointOnQuadraticBezier(Math.min(1,1-o/e),t[0],t[1],t[2],t[3],t[4],t[5]);l=i[a-2]-n.x,h=i[a-1]-n.y}else l=i[a-2]-i[a-4],h=i[a-1]-i[a-3];const c=(Math.atan2(h,l)+e)%e,d=this.pointerWidth();this.pointerAtEnding()&&(t.save(),t.beginPath(),t.translate(i[a-2],i[a-1]),t.rotate(c),t.moveTo(0,0),t.lineTo(-o,d/2),t.lineTo(-o,-d/2),t.closePath(),t.restore(),this.__fillStroke(t)),this.pointerAtBeginning()&&(t.save(),t.beginPath(),t.translate(i[0],i[1]),n?(l=(s[0]+s[2])/2-i[0],h=(s[1]+s[3])/2-i[1]):(l=i[2]-i[0],h=i[3]-i[1]),t.rotate((Math.atan2(-h,-l)+e)%e),t.moveTo(0,0),t.lineTo(-o,d/2),t.lineTo(-o,-d/2),t.closePath(),t.restore(),this.__fillStroke(t))}__fillStroke(t){const e=this.dashEnabled();e&&(this.attrs.dashEnabled=!1,t.setLineDash([])),t.fillStrokeShape(this),e&&(this.attrs.dashEnabled=!0)}getSelfRect(){const t=super.getSelfRect(),e=this.pointerWidth()/2;return{x:t.x,y:t.y-e,width:t.width,height:t.height+2*e}}};return wn.Arrow=n,n.prototype.className="Arrow",(0,s._registerNode)(n),t.Factory.addGetterSetter(n,"pointerLength",10,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(n,"pointerWidth",10,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(n,"pointerAtBeginning",!1),t.Factory.addGetterSetter(n,"pointerAtEnding",!0),wn}(),s=function(){if(An)return Ln;An=1,Object.defineProperty(Ln,"__esModule",{value:!0}),Ln.Circle=void 0;const t=Hr(),e=nn(),i=Wr(),s=kr();let r=class extends e.Shape{_sceneFunc(t){t.beginPath(),t.arc(0,0,this.attrs.radius||0,0,2*Math.PI,!1),t.closePath(),t.fillStrokeShape(this)}getWidth(){return 2*this.radius()}getHeight(){return 2*this.radius()}setWidth(t){this.radius()!==t/2&&this.radius(t/2)}setHeight(t){this.radius()!==t/2&&this.radius(t/2)}};return Ln.Circle=r,r.prototype._centroid=!0,r.prototype.className="Circle",r.prototype._attrsAffectingSize=["radius"],(0,s._registerNode)(r),t.Factory.addGetterSetter(r,"radius",0,(0,i.getNumberValidator)()),Ln}(),r=function(){if(Tn)return Fn;Tn=1,Object.defineProperty(Fn,"__esModule",{value:!0}),Fn.Ellipse=void 0;const t=Hr(),e=nn(),i=Wr(),s=kr();let r=class extends e.Shape{_sceneFunc(t){const e=this.radiusX(),i=this.radiusY();t.beginPath(),t.save(),e!==i&&t.scale(1,i/e),t.arc(0,0,e,0,2*Math.PI,!1),t.restore(),t.closePath(),t.fillStrokeShape(this)}getWidth(){return 2*this.radiusX()}getHeight(){return 2*this.radiusY()}setWidth(t){this.radiusX(t/2)}setHeight(t){this.radiusY(t/2)}};return Fn.Ellipse=r,r.prototype.className="Ellipse",r.prototype._centroid=!0,r.prototype._attrsAffectingSize=["radiusX","radiusY"],(0,s._registerNode)(r),t.Factory.addComponentsGetterSetter(r,"radius",["x","y"]),t.Factory.addGetterSetter(r,"radiusX",0,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(r,"radiusY",0,(0,i.getNumberValidator)()),Fn}(),n=function(){if(Dn)return Rn;Dn=1,Object.defineProperty(Rn,"__esModule",{value:!0}),Rn.Image=void 0;const t=$r(),e=Hr(),i=nn(),s=kr(),r=Wr();class n extends i.Shape{constructor(t){super(t),this._loadListener=()=>{this._requestDraw()},this.on("imageChange.konva",t=>{this._removeImageLoad(t.oldVal),this._setImageLoad()}),this._setImageLoad()}_setImageLoad(){const t=this.image();t&&t.complete||t&&4===t.readyState||t&&t.addEventListener&&t.addEventListener("load",this._loadListener)}_removeImageLoad(t){t&&t.removeEventListener&&t.removeEventListener("load",this._loadListener)}destroy(){return this._removeImageLoad(this.image()),super.destroy(),this}_useBufferCanvas(){const t=!!this.cornerRadius(),e=this.hasShadow();return!(!t||!e)||super._useBufferCanvas(!0)}_sceneFunc(e){const i=this.getWidth(),s=this.getHeight(),r=this.cornerRadius(),n=this.attrs.image;let o;if(n){const t=this.attrs.cropWidth,e=this.attrs.cropHeight;o=t&&e?[n,this.cropX(),this.cropY(),t,e,0,0,i,s]:[n,0,0,i,s]}(this.hasFill()||this.hasStroke()||r)&&(e.beginPath(),r?t.Util.drawRoundedRectPath(e,i,s,r):e.rect(0,0,i,s),e.closePath(),e.fillStrokeShape(this)),n&&(r&&e.clip(),e.drawImage.apply(e,o))}_hitFunc(e){const i=this.width(),s=this.height(),r=this.cornerRadius();e.beginPath(),r?t.Util.drawRoundedRectPath(e,i,s,r):e.rect(0,0,i,s),e.closePath(),e.fillStrokeShape(this)}getWidth(){var t,e;return null!==(t=this.attrs.width)&&void 0!==t?t:null===(e=this.image())||void 0===e?void 0:e.width}getHeight(){var t,e;return null!==(t=this.attrs.height)&&void 0!==t?t:null===(e=this.image())||void 0===e?void 0:e.height}static fromURL(e,i,s=null){const r=t.Util.createImageElement();r.onload=function(){const t=new n({image:r});i(t)},r.onerror=s,r.crossOrigin="Anonymous",r.src=e}}return Rn.Image=n,n.prototype.className="Image",(0,s._registerNode)(n),e.Factory.addGetterSetter(n,"cornerRadius",0,(0,r.getNumberOrArrayOfNumbersValidator)(4)),e.Factory.addGetterSetter(n,"image"),e.Factory.addComponentsGetterSetter(n,"crop",["x","y","width","height"]),e.Factory.addGetterSetter(n,"cropX",0,(0,r.getNumberValidator)()),e.Factory.addGetterSetter(n,"cropY",0,(0,r.getNumberValidator)()),e.Factory.addGetterSetter(n,"cropWidth",0,(0,r.getNumberValidator)()),e.Factory.addGetterSetter(n,"cropHeight",0,(0,r.getNumberValidator)()),Rn}(),o=function(){if(Nn)return On;Nn=1,Object.defineProperty(On,"__esModule",{value:!0}),On.Tag=On.Label=void 0;const t=Hr(),e=nn(),i=dn(),s=Wr(),r=kr(),n=["fontFamily","fontSize","fontStyle","padding","lineHeight","text","width","height","pointerDirection","pointerWidth","pointerHeight"],o="up",a="right",l="down",h="left",c=n.length;let d=class extends i.Group{constructor(t){super(t),this.on("add.konva",function(t){this._addListeners(t.child),this._sync()})}getText(){return this.find("Text")[0]}getTag(){return this.find("Tag")[0]}_addListeners(t){let e,i=this;const s=function(){i._sync()};for(e=0;e<c;e++)t.on(n[e]+"Change.konva",s)}getWidth(){return this.getText().width()}getHeight(){return this.getText().height()}_sync(){let t,e,i,s,r,n,c,d=this.getText(),p=this.getTag();if(d&&p){switch(t=d.width(),e=d.height(),i=p.pointerDirection(),s=p.pointerWidth(),c=p.pointerHeight(),r=0,n=0,i){case o:r=t/2,n=-1*c;break;case a:r=t+s,n=e/2;break;case l:r=t/2,n=e+c;break;case h:r=-1*s,n=e/2}p.setAttrs({x:-1*r,y:-1*n,width:t,height:e}),d.setAttrs({x:-1*r,y:-1*n})}}};On.Label=d,d.prototype.className="Label",(0,r._registerNode)(d);class p extends e.Shape{_sceneFunc(t){const e=this.width(),i=this.height(),s=this.pointerDirection(),r=this.pointerWidth(),n=this.pointerHeight(),c=this.cornerRadius();let d=0,p=0,u=0,g=0;"number"==typeof c?d=p=u=g=Math.min(c,e/2,i/2):(d=Math.min(c[0]||0,e/2,i/2),p=Math.min(c[1]||0,e/2,i/2),g=Math.min(c[2]||0,e/2,i/2),u=Math.min(c[3]||0,e/2,i/2)),t.beginPath(),t.moveTo(d,0),s===o&&(t.lineTo((e-r)/2,0),t.lineTo(e/2,-1*n),t.lineTo((e+r)/2,0)),t.lineTo(e-p,0),t.arc(e-p,p,p,3*Math.PI/2,0,!1),s===a&&(t.lineTo(e,(i-n)/2),t.lineTo(e+r,i/2),t.lineTo(e,(i+n)/2)),t.lineTo(e,i-g),t.arc(e-g,i-g,g,0,Math.PI/2,!1),s===l&&(t.lineTo((e+r)/2,i),t.lineTo(e/2,i+n),t.lineTo((e-r)/2,i)),t.lineTo(u,i),t.arc(u,i-u,u,Math.PI/2,Math.PI,!1),s===h&&(t.lineTo(0,(i+n)/2),t.lineTo(-1*r,i/2),t.lineTo(0,(i-n)/2)),t.lineTo(0,d),t.arc(d,d,d,Math.PI,3*Math.PI/2,!1),t.closePath(),t.fillStrokeShape(this)}getSelfRect(){let t=0,e=0,i=this.pointerWidth(),s=this.pointerHeight(),r=this.pointerDirection(),n=this.width(),c=this.height();return r===o?(e-=s,c+=s):r===l?c+=s:r===h?(t-=1.5*i,n+=i):r===a&&(n+=1.5*i),{x:t,y:e,width:n,height:c}}}return On.Tag=p,p.prototype.className="Tag",(0,r._registerNode)(p),t.Factory.addGetterSetter(p,"pointerDirection","none"),t.Factory.addGetterSetter(p,"pointerWidth",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(p,"pointerHeight",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(p,"cornerRadius",0,(0,s.getNumberOrArrayOfNumbersValidator)(4)),On}(),a=kn(),l=En(),h=Gn(),c=function(){if(Bn)return Wn;Bn=1,Object.defineProperty(Wn,"__esModule",{value:!0}),Wn.RegularPolygon=void 0;const t=Hr(),e=nn(),i=Wr(),s=kr();let r=class extends e.Shape{_sceneFunc(t){const e=this._getPoints();t.beginPath(),t.moveTo(e[0].x,e[0].y);for(let i=1;i<e.length;i++)t.lineTo(e[i].x,e[i].y);t.closePath(),t.fillStrokeShape(this)}_getPoints(){const t=this.attrs.sides,e=this.attrs.radius||0,i=[];for(let s=0;s<t;s++)i.push({x:e*Math.sin(2*s*Math.PI/t),y:-1*e*Math.cos(2*s*Math.PI/t)});return i}getSelfRect(){const t=this._getPoints();let e=t[0].x,i=t[0].y,s=t[0].x,r=t[0].y;return t.forEach(t=>{e=Math.min(e,t.x),i=Math.max(i,t.x),s=Math.min(s,t.y),r=Math.max(r,t.y)}),{x:e,y:s,width:i-e,height:r-s}}getWidth(){return 2*this.radius()}getHeight(){return 2*this.radius()}setWidth(t){this.radius(t/2)}setHeight(t){this.radius(t/2)}};return Wn.RegularPolygon=r,r.prototype.className="RegularPolygon",r.prototype._centroid=!0,r.prototype._attrsAffectingSize=["radius"],(0,s._registerNode)(r),t.Factory.addGetterSetter(r,"radius",0,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(r,"sides",0,(0,i.getNumberValidator)()),Wn}(),d=function(){if(Hn)return Vn;Hn=1,Object.defineProperty(Vn,"__esModule",{value:!0}),Vn.Ring=void 0;const t=Hr(),e=nn(),i=Wr(),s=kr(),r=2*Math.PI;let n=class extends e.Shape{_sceneFunc(t){t.beginPath(),t.arc(0,0,this.innerRadius(),0,r,!1),t.moveTo(this.outerRadius(),0),t.arc(0,0,this.outerRadius(),r,0,!0),t.closePath(),t.fillStrokeShape(this)}getWidth(){return 2*this.outerRadius()}getHeight(){return 2*this.outerRadius()}setWidth(t){this.outerRadius(t/2)}setHeight(t){this.outerRadius(t/2)}};return Vn.Ring=n,n.prototype.className="Ring",n.prototype._centroid=!0,n.prototype._attrsAffectingSize=["innerRadius","outerRadius"],(0,s._registerNode)(n),t.Factory.addGetterSetter(n,"innerRadius",0,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(n,"outerRadius",0,(0,i.getNumberValidator)()),Vn}(),p=function(){if(jn)return qn;jn=1,Object.defineProperty(qn,"__esModule",{value:!0}),qn.Sprite=void 0;const t=Hr(),e=nn(),i=gn(),s=Wr(),r=kr();let n=class extends e.Shape{constructor(t){super(t),this._updated=!0,this.anim=new i.Animation(()=>{const t=this._updated;return this._updated=!1,t}),this.on("animationChange.konva",function(){this.frameIndex(0)}),this.on("frameIndexChange.konva",function(){this._updated=!0}),this.on("frameRateChange.konva",function(){this.anim.isRunning()&&(clearInterval(this.interval),this._setInterval())})}_sceneFunc(t){const e=this.animation(),i=this.frameIndex(),s=4*i,r=this.animations()[e],n=this.frameOffsets(),o=r[s+0],a=r[s+1],l=r[s+2],h=r[s+3],c=this.image();if((this.hasFill()||this.hasStroke())&&(t.beginPath(),t.rect(0,0,l,h),t.closePath(),t.fillStrokeShape(this)),c)if(n){const s=n[e],r=2*i;t.drawImage(c,o,a,l,h,s[r+0],s[r+1],l,h)}else t.drawImage(c,o,a,l,h,0,0,l,h)}_hitFunc(t){const e=this.animation(),i=this.frameIndex(),s=4*i,r=this.animations()[e],n=this.frameOffsets(),o=r[s+2],a=r[s+3];if(t.beginPath(),n){const s=n[e],r=2*i;t.rect(s[r+0],s[r+1],o,a)}else t.rect(0,0,o,a);t.closePath(),t.fillShape(this)}_useBufferCanvas(){return super._useBufferCanvas(!0)}_setInterval(){const t=this;this.interval=setInterval(function(){t._updateIndex()},1e3/this.frameRate())}start(){if(this.isRunning())return;const t=this.getLayer();this.anim.setLayers(t),this._setInterval(),this.anim.start()}stop(){this.anim.stop(),clearInterval(this.interval)}isRunning(){return this.anim.isRunning()}_updateIndex(){const t=this.frameIndex(),e=this.animation();t<this.animations()[e].length/4-1?this.frameIndex(t+1):this.frameIndex(0)}};return qn.Sprite=n,n.prototype.className="Sprite",(0,r._registerNode)(n),t.Factory.addGetterSetter(n,"animation"),t.Factory.addGetterSetter(n,"animations"),t.Factory.addGetterSetter(n,"frameOffsets"),t.Factory.addGetterSetter(n,"image"),t.Factory.addGetterSetter(n,"frameIndex",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(n,"frameRate",17,(0,s.getNumberValidator)()),t.Factory.backCompat(n,{index:"frameIndex",getIndex:"getFrameIndex",setIndex:"setFrameIndex"}),qn}(),u=function(){if(Kn)return Yn;Kn=1,Object.defineProperty(Yn,"__esModule",{value:!0}),Yn.Star=void 0;const t=Hr(),e=nn(),i=Wr(),s=kr();let r=class extends e.Shape{_sceneFunc(t){const e=this.innerRadius(),i=this.outerRadius(),s=this.numPoints();t.beginPath(),t.moveTo(0,0-i);for(let r=1;r<2*s;r++){const n=r%2==0?i:e,o=n*Math.sin(r*Math.PI/s),a=-1*n*Math.cos(r*Math.PI/s);t.lineTo(o,a)}t.closePath(),t.fillStrokeShape(this)}getWidth(){return 2*this.outerRadius()}getHeight(){return 2*this.outerRadius()}setWidth(t){this.outerRadius(t/2)}setHeight(t){this.outerRadius(t/2)}};return Yn.Star=r,r.prototype.className="Star",r.prototype._centroid=!0,r.prototype._attrsAffectingSize=["innerRadius","outerRadius"],(0,s._registerNode)(r),t.Factory.addGetterSetter(r,"numPoints",5,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(r,"innerRadius",0,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(r,"outerRadius",0,(0,i.getNumberValidator)()),Yn}(),g=Zn(),f=function(){if(Qn)return to;Qn=1,Object.defineProperty(to,"__esModule",{value:!0}),to.TextPath=void 0;const t=$r(),e=Hr(),i=nn(),s=En(),r=Zn(),n=Wr(),o=kr(),a="normal";function l(t){t.fillText(this.partialText,0,0)}function h(t){t.strokeText(this.partialText,0,0)}let c=class extends i.Shape{constructor(e){super(e),this.dummyCanvas=t.Util.createCanvasElement(),this.dataArray=[],this._readDataAttribute(),this.on("dataChange.konva",function(){this._readDataAttribute(),this._setTextData()}),this.on("textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva fontSizeChange.konva fontFamilyChange.konva",this._setTextData),this._setTextData()}_getTextPathLength(){return s.Path.getPathLength(this.dataArray)}_getPointAtLength(t){return this.attrs.data?t-1>this.pathLength?null:s.Path.getPointAtLengthOfDataArray(t,this.dataArray):null}_readDataAttribute(){this.dataArray=s.Path.parsePathData(this.attrs.data),this.pathLength=this._getTextPathLength()}_sceneFunc(t){t.setAttr("font",this._getContextFont()),t.setAttr("textBaseline",this.textBaseline()),t.setAttr("textAlign","left"),t.save();const e=this.textDecoration(),i=this.fill(),s=this.fontSize(),r=this.glyphInfo;"underline"===e&&t.beginPath();for(let i=0;i<r.length;i++){t.save();const n=r[i].p0;t.translate(n.x,n.y),t.rotate(r[i].rotation),this.partialText=r[i].text,t.fillStrokeShape(this),"underline"===e&&(0===i&&t.moveTo(0,s/2+1),t.lineTo(s,s/2+1)),t.restore()}"underline"===e&&(t.strokeStyle=i,t.lineWidth=s/20,t.stroke()),t.restore()}_hitFunc(t){t.beginPath();const e=this.glyphInfo;if(e.length>=1){const i=e[0].p0;t.moveTo(i.x,i.y)}for(let i=0;i<e.length;i++){const s=e[i].p1;t.lineTo(s.x,s.y)}t.setAttr("lineWidth",this.fontSize()),t.setAttr("strokeStyle",this.colorKey),t.stroke()}getTextWidth(){return this.textWidth}getTextHeight(){return t.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."),this.textHeight}setText(t){return r.Text.prototype.setText.call(this,t)}_getContextFont(){return r.Text.prototype._getContextFont.call(this)}_getTextSize(t){const e=this.dummyCanvas.getContext("2d");e.save(),e.font=this._getContextFont();const i=e.measureText(t);return e.restore(),{width:i.width,height:parseInt(`${this.fontSize()}`,10)}}_setTextData(){const{width:t,height:e}=this._getTextSize(this.attrs.text);if(this.textWidth=t,this.textHeight=e,this.glyphInfo=[],!this.attrs.data)return null;const i=this.letterSpacing(),n=this.align(),o=this.kerningFunc(),a=Math.max(this.textWidth+((this.attrs.text||"").length-1)*i,0);let l=0;"center"===n&&(l=Math.max(0,this.pathLength/2-a/2)),"right"===n&&(l=Math.max(0,this.pathLength-a));const h=(0,r.stringToArray)(this.text());let c=l;for(let t=0;t<h.length;t++){const e=this._getPointAtLength(c);if(!e)return;let r=this._getTextSize(h[t]).width+i;if(" "===h[t]&&"justify"===n){const t=this.text().split(" ").length-1;r+=(this.pathLength-a)/t}const l=this._getPointAtLength(c+r);if(!l)return;const d=s.Path.getLineLength(e.x,e.y,l.x,l.y);let p=0;if(o)try{p=o(h[t-1],h[t])*this.fontSize()}catch(t){p=0}e.x+=p,l.x+=p,this.textWidth+=p;const u=s.Path.getPointOnLine(p+d/2,e.x,e.y,l.x,l.y),g=Math.atan2(l.y-e.y,l.x-e.x);this.glyphInfo.push({transposeX:u.x,transposeY:u.y,text:h[t],rotation:g,p0:e,p1:l}),c+=r}}getSelfRect(){if(!this.glyphInfo.length)return{x:0,y:0,width:0,height:0};const t=[];this.glyphInfo.forEach(function(e){t.push(e.p0.x),t.push(e.p0.y),t.push(e.p1.x),t.push(e.p1.y)});let e,i,s=t[0]||0,r=t[0]||0,n=t[1]||0,o=t[1]||0;for(let a=0;a<t.length/2;a++)e=t[2*a],i=t[2*a+1],s=Math.min(s,e),r=Math.max(r,e),n=Math.min(n,i),o=Math.max(o,i);const a=this.fontSize();return{x:s-a/2,y:n-a/2,width:r-s+a,height:o-n+a}}destroy(){return t.Util.releaseCanvas(this.dummyCanvas),super.destroy()}};return to.TextPath=c,c.prototype._fillFunc=l,c.prototype._strokeFunc=h,c.prototype._fillFuncHit=l,c.prototype._strokeFuncHit=h,c.prototype.className="TextPath",c.prototype._attrsAffectingSize=["text","fontSize","data"],(0,o._registerNode)(c),e.Factory.addGetterSetter(c,"data"),e.Factory.addGetterSetter(c,"fontFamily","Arial"),e.Factory.addGetterSetter(c,"fontSize",12,(0,n.getNumberValidator)()),e.Factory.addGetterSetter(c,"fontStyle",a),e.Factory.addGetterSetter(c,"align","left"),e.Factory.addGetterSetter(c,"letterSpacing",0,(0,n.getNumberValidator)()),e.Factory.addGetterSetter(c,"textBaseline","middle"),e.Factory.addGetterSetter(c,"fontVariant",a),e.Factory.addGetterSetter(c,"text",""),e.Factory.addGetterSetter(c,"textDecoration",""),e.Factory.addGetterSetter(c,"kerningFunc",void 0),to}(),_=so(),m=function(){if(ro)return no;ro=1,Object.defineProperty(no,"__esModule",{value:!0}),no.Wedge=void 0;const t=Hr(),e=nn(),i=kr(),s=Wr(),r=kr();let n=class extends e.Shape{_sceneFunc(t){t.beginPath(),t.arc(0,0,this.radius(),0,i.Konva.getAngle(this.angle()),this.clockwise()),t.lineTo(0,0),t.closePath(),t.fillStrokeShape(this)}getWidth(){return 2*this.radius()}getHeight(){return 2*this.radius()}setWidth(t){this.radius(t/2)}setHeight(t){this.radius(t/2)}};return no.Wedge=n,n.prototype.className="Wedge",n.prototype._centroid=!0,n.prototype._attrsAffectingSize=["radius"],(0,r._registerNode)(n),t.Factory.addGetterSetter(n,"radius",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(n,"angle",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(n,"clockwise",!1),t.Factory.backCompat(n,{angleDeg:"angle",getAngleDeg:"getAngle",setAngleDeg:"setAngle"}),no}(),v=lo(),y=function(){if(ho)return co;ho=1,Object.defineProperty(co,"__esModule",{value:!0}),co.Brighten=void 0;const t=Hr(),e=Vr(),i=Wr();return co.Brighten=function(t){const e=255*this.brightness(),i=t.data,s=i.length;for(let t=0;t<s;t+=4)i[t]+=e,i[t+1]+=e,i[t+2]+=e},t.Factory.addGetterSetter(e.Node,"brightness",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),co}(),b=function(){if(po)return uo;po=1,Object.defineProperty(uo,"__esModule",{value:!0}),uo.Contrast=void 0;const t=Hr(),e=Vr(),i=Wr();return uo.Contrast=function(t){const e=Math.pow((this.contrast()+100)/100,2),i=t.data,s=i.length;let r=150,n=150,o=150;for(let t=0;t<s;t+=4)r=i[t],n=i[t+1],o=i[t+2],r/=255,r-=.5,r*=e,r+=.5,r*=255,n/=255,n-=.5,n*=e,n+=.5,n*=255,o/=255,o-=.5,o*=e,o+=.5,o*=255,r=r<0?0:r>255?255:r,n=n<0?0:n>255?255:n,o=o<0?0:o>255?255:o,i[t]=r,i[t+1]=n,i[t+2]=o},t.Factory.addGetterSetter(e.Node,"contrast",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),uo}(),x=function(){if(go)return fo;go=1,Object.defineProperty(fo,"__esModule",{value:!0}),fo.Emboss=void 0;const t=Hr(),e=Vr(),i=$r(),s=Wr();return fo.Emboss=function(t){const e=10*this.embossStrength(),s=255*this.embossWhiteLevel(),r=this.embossDirection(),n=this.embossBlend(),o=t.data,a=t.width,l=t.height,h=4*a;let c=0,d=0,p=l;switch(r){case"top-left":c=-1,d=-1;break;case"top":c=-1,d=0;break;case"top-right":c=-1,d=1;break;case"right":c=0,d=1;break;case"bottom-right":c=1,d=1;break;case"bottom":c=1,d=0;break;case"bottom-left":c=1,d=-1;break;case"left":c=0,d=-1;break;default:i.Util.error("Unknown emboss direction: "+r)}do{const t=(p-1)*h;let i=c;p+i<1&&(i=0),p+i>l&&(i=0);const r=(p-1+i)*a*4;let u=a;do{const i=t+4*(u-1);let l=d;u+l<1&&(l=0),u+l>a&&(l=0);const h=r+4*(u-1+l),c=o[i]-o[h],p=o[i+1]-o[h+1],g=o[i+2]-o[h+2];let f=c;const _=f>0?f:-f;if((p>0?p:-p)>_&&(f=p),(g>0?g:-g)>_&&(f=g),f*=e,n){const t=o[i]+f,e=o[i+1]+f,s=o[i+2]+f;o[i]=t>255?255:t<0?0:t,o[i+1]=e>255?255:e<0?0:e,o[i+2]=s>255?255:s<0?0:s}else{let t=s-f;t<0?t=0:t>255&&(t=255),o[i]=o[i+1]=o[i+2]=t}}while(--u)}while(--p)},t.Factory.addGetterSetter(e.Node,"embossStrength",.5,(0,s.getNumberValidator)(),t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"embossWhiteLevel",.5,(0,s.getNumberValidator)(),t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"embossDirection","top-left",void 0,t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"embossBlend",!1,void 0,t.Factory.afterSetFilter),fo}(),w=function(){if(_o)return mo;_o=1,Object.defineProperty(mo,"__esModule",{value:!0}),mo.Enhance=void 0;const t=Hr(),e=Vr(),i=Wr();function s(t,e,i,s,r){const n=i-e,o=r-s;if(0===n)return s+o/2;if(0===o)return s;let a=(t-e)/n;return a=o*a+s,a}return mo.Enhance=function(t){const e=t.data,i=e.length;let r,n,o,a=e[0],l=a,h=e[1],c=h,d=e[2],p=d;const u=this.enhance();if(0===u)return;for(let t=0;t<i;t+=4)r=e[t+0],r<a?a=r:r>l&&(l=r),n=e[t+1],n<h?h=n:n>c&&(c=n),o=e[t+2],o<d?d=o:o>p&&(p=o);let g,f,_,m,v,y;if(l===a&&(l=255,a=0),c===h&&(c=255,h=0),p===d&&(p=255,d=0),u>0)g=l+u*(255-l),f=a-u*(a-0),_=c+u*(255-c),m=h-u*(h-0),v=p+u*(255-p),y=d-u*(d-0);else{const t=.5*(l+a);g=l+u*(l-t),f=a+u*(a-t);const e=.5*(c+h);_=c+u*(c-e),m=h+u*(h-e);const i=.5*(p+d);v=p+u*(p-i),y=d+u*(d-i)}for(let t=0;t<i;t+=4)e[t+0]=s(e[t+0],a,l,f,g),e[t+1]=s(e[t+1],h,c,m,_),e[t+2]=s(e[t+2],d,p,y,v)},t.Factory.addGetterSetter(e.Node,"enhance",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),mo}(),S=(vo||(vo=1,Object.defineProperty(yo,"__esModule",{value:!0}),yo.Grayscale=void 0,yo.Grayscale=function(t){const e=t.data,i=e.length;for(let t=0;t<i;t+=4){const i=.34*e[t]+.5*e[t+1]+.16*e[t+2];e[t]=i,e[t+1]=i,e[t+2]=i}}),yo),k=function(){if(bo)return xo;bo=1,Object.defineProperty(xo,"__esModule",{value:!0}),xo.HSL=void 0;const t=Hr(),e=Vr(),i=Wr();return t.Factory.addGetterSetter(e.Node,"hue",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"saturation",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"luminance",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),xo.HSL=function(t){const e=t.data,i=e.length,s=Math.pow(2,this.saturation()),r=Math.abs(this.hue()+360)%360,n=127*this.luminance(),o=1*s*Math.cos(r*Math.PI/180),a=1*s*Math.sin(r*Math.PI/180),l=.299+.701*o+.167*a,h=.587-.587*o+.33*a,c=.114-.114*o-.497*a,d=.299-.299*o-.328*a,p=.587+.413*o+.035*a,u=.114-.114*o+.293*a,g=.299-.3*o+1.25*a,f=.587-.586*o-1.05*a,_=.114+.886*o-.2*a;let m,v,y,b;for(let t=0;t<i;t+=4)m=e[t+0],v=e[t+1],y=e[t+2],b=e[t+3],e[t+0]=l*m+h*v+c*y+n,e[t+1]=d*m+p*v+u*y+n,e[t+2]=g*m+f*v+_*y+n,e[t+3]=b},xo}(),C=function(){if(wo)return So;wo=1,Object.defineProperty(So,"__esModule",{value:!0}),So.HSV=void 0;const t=Hr(),e=Vr(),i=Wr();return So.HSV=function(t){const e=t.data,i=e.length,s=Math.pow(2,this.value()),r=Math.pow(2,this.saturation()),n=Math.abs(this.hue()+360)%360,o=s*r*Math.cos(n*Math.PI/180),a=s*r*Math.sin(n*Math.PI/180),l=.299*s+.701*o+.167*a,h=.587*s-.587*o+.33*a,c=.114*s-.114*o-.497*a,d=.299*s-.299*o-.328*a,p=.587*s+.413*o+.035*a,u=.114*s-.114*o+.293*a,g=.299*s-.3*o+1.25*a,f=.587*s-.586*o-1.05*a,_=.114*s+.886*o-.2*a;for(let t=0;t<i;t+=4){const i=e[t+0],s=e[t+1],r=e[t+2],n=e[t+3];e[t+0]=l*i+h*s+c*r,e[t+1]=d*i+p*s+u*r,e[t+2]=g*i+f*s+_*r,e[t+3]=n}},t.Factory.addGetterSetter(e.Node,"hue",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"saturation",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"value",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),So}(),P=(ko||(ko=1,Object.defineProperty(Co,"__esModule",{value:!0}),Co.Invert=void 0,Co.Invert=function(t){const e=t.data,i=e.length;for(let t=0;t<i;t+=4)e[t]=255-e[t],e[t+1]=255-e[t+1],e[t+2]=255-e[t+2]}),Co),$=Io(),I=Ao(),M=function(){if(Lo)return To;Lo=1,Object.defineProperty(To,"__esModule",{value:!0}),To.Noise=void 0;const t=Hr(),e=Vr(),i=Wr();return To.Noise=function(t){const e=255*this.noise(),i=t.data,s=i.length,r=e/2;for(let t=0;t<s;t+=4)i[t+0]+=r-2*r*Math.random(),i[t+1]+=r-2*r*Math.random(),i[t+2]+=r-2*r*Math.random()},t.Factory.addGetterSetter(e.Node,"noise",.2,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),To}(),E=function(){if(Fo)return Do;Fo=1,Object.defineProperty(Do,"__esModule",{value:!0}),Do.Pixelate=void 0;const t=Hr(),e=$r(),i=Vr(),s=Wr();return Do.Pixelate=function(t){let i=Math.ceil(this.pixelSize()),s=t.width,r=t.height,n=Math.ceil(s/i),o=Math.ceil(r/i),a=t.data;if(i<=0)e.Util.error("pixelSize value can not be <= 0");else for(let t=0;t<n;t+=1)for(let e=0;e<o;e+=1){let n=0,o=0,l=0,h=0;const c=t*i,d=c+i,p=e*i,u=p+i;let g=0;for(let t=c;t<d;t+=1)if(!(t>=s))for(let e=p;e<u;e+=1){if(e>=r)continue;const i=4*(s*e+t);n+=a[i+0],o+=a[i+1],l+=a[i+2],h+=a[i+3],g+=1}n/=g,o/=g,l/=g,h/=g;for(let t=c;t<d;t+=1)if(!(t>=s))for(let e=p;e<u;e+=1){if(e>=r)continue;const i=4*(s*e+t);a[i+0]=n,a[i+1]=o,a[i+2]=l,a[i+3]=h}}},t.Factory.addGetterSetter(i.Node,"pixelSize",8,(0,s.getNumberValidator)(),t.Factory.afterSetFilter),Do}(),A=function(){if(Ro)return No;Ro=1,Object.defineProperty(No,"__esModule",{value:!0}),No.Posterize=void 0;const t=Hr(),e=Vr(),i=Wr();return No.Posterize=function(t){const e=Math.round(254*this.levels())+1,i=t.data,s=i.length,r=255/e;for(let t=0;t<s;t+=1)i[t]=Math.floor(i[t]/r)*r},t.Factory.addGetterSetter(e.Node,"levels",.5,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),No}(),L=function(){if(Oo)return Uo;Oo=1,Object.defineProperty(Uo,"__esModule",{value:!0}),Uo.RGB=void 0;const t=Hr(),e=Vr(),i=Wr();return Uo.RGB=function(t){const e=t.data,i=e.length,s=this.red(),r=this.green(),n=this.blue();for(let t=0;t<i;t+=4){const i=(.34*e[t]+.5*e[t+1]+.16*e[t+2])/255;e[t]=i*s,e[t+1]=i*r,e[t+2]=i*n,e[t+3]=e[t+3]}},t.Factory.addGetterSetter(e.Node,"red",0,function(t){return this._filterUpToDate=!1,t>255?255:t<0?0:Math.round(t)}),t.Factory.addGetterSetter(e.Node,"green",0,function(t){return this._filterUpToDate=!1,t>255?255:t<0?0:Math.round(t)}),t.Factory.addGetterSetter(e.Node,"blue",0,i.RGBComponent,t.Factory.afterSetFilter),Uo}(),T=function(){if(zo)return Go;zo=1,Object.defineProperty(Go,"__esModule",{value:!0}),Go.RGBA=void 0;const t=Hr(),e=Vr(),i=Wr();return Go.RGBA=function(t){const e=t.data,i=e.length,s=this.red(),r=this.green(),n=this.blue(),o=this.alpha();for(let t=0;t<i;t+=4){const i=1-o;e[t]=s*o+e[t]*i,e[t+1]=r*o+e[t+1]*i,e[t+2]=n*o+e[t+2]*i}},t.Factory.addGetterSetter(e.Node,"red",0,function(t){return this._filterUpToDate=!1,t>255?255:t<0?0:Math.round(t)}),t.Factory.addGetterSetter(e.Node,"green",0,function(t){return this._filterUpToDate=!1,t>255?255:t<0?0:Math.round(t)}),t.Factory.addGetterSetter(e.Node,"blue",0,i.RGBComponent,t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"alpha",1,function(t){return this._filterUpToDate=!1,t>1?1:t<0?0:t}),Go}(),F=(Bo||(Bo=1,Object.defineProperty(Wo,"__esModule",{value:!0}),Wo.Sepia=void 0,Wo.Sepia=function(t){const e=t.data,i=e.length;for(let t=0;t<i;t+=4){const i=e[t+0],s=e[t+1],r=e[t+2];e[t+0]=Math.min(255,.393*i+.769*s+.189*r),e[t+1]=Math.min(255,.349*i+.686*s+.168*r),e[t+2]=Math.min(255,.272*i+.534*s+.131*r)}}),Wo),D=(Ho||(Ho=1,Object.defineProperty(Vo,"__esModule",{value:!0}),Vo.Solarize=void 0,Vo.Solarize=function(t){const e=t.data,i=t.width,s=4*i;let r=t.height;do{const t=(r-1)*s;let n=i;do{const i=t+4*(n-1);let s=e[i],r=e[i+1],o=e[i+2];s>127&&(s=255-s),r>127&&(r=255-r),o>127&&(o=255-o),e[i]=s,e[i+1]=r,e[i+2]=o}while(--n)}while(--r)}),Vo),R=function(){if(jo)return Ko;jo=1,Object.defineProperty(Ko,"__esModule",{value:!0}),Ko.Threshold=void 0;const t=Hr(),e=Vr(),i=Wr();return Ko.Threshold=function(t){const e=255*this.threshold(),i=t.data,s=i.length;for(let t=0;t<s;t+=1)i[t]=i[t]<e?0:255},t.Factory.addGetterSetter(e.Node,"threshold",.5,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),Ko}();return xr.Konva=t.Konva.Util._assign(t.Konva,{Arc:e.Arc,Arrow:i.Arrow,Circle:s.Circle,Ellipse:r.Ellipse,Image:n.Image,Label:o.Label,Tag:o.Tag,Line:a.Line,Path:l.Path,Rect:h.Rect,RegularPolygon:c.RegularPolygon,Ring:d.Ring,Sprite:p.Sprite,Star:u.Star,Text:g.Text,TextPath:f.TextPath,Transformer:_.Transformer,Wedge:m.Wedge,Filters:{Blur:v.Blur,Brighten:y.Brighten,Contrast:b.Contrast,Emboss:x.Emboss,Enhance:w.Enhance,Grayscale:S.Grayscale,HSL:k.HSL,HSV:C.HSV,Invert:P.Invert,Kaleidoscope:$.Kaleidoscope,Mask:I.Mask,Noise:M.Noise,Pixelate:E.Pixelate,Posterize:A.Posterize,RGB:L.RGB,RGBA:T.RGBA,Sepia:F.Sepia,Solarize:D.Solarize,Threshold:R.Threshold}}),xr}var Xo,Jo=br.exports;var Zo=Qs(function(){if(Xo)return br.exports;Xo=1,Object.defineProperty(Jo,"__esModule",{value:!0});const t=Yo();return br.exports=t.Konva,br.exports}());function Qo(t){const e=Math.max(t,.01);return Math.max(9,Math.min(13,11/e))}function ta(t,e){return`v${t} · ${e}`}function ea(t){return`v${t}`}const ia="#6366f1";function sa(t){const e=[];for(const[i,s]of t.points)e.push(i,s);return e}function ra(t,e){if(e<=0||t.length<3)return!1;const i=t.length-1;if(e!==i)return!1;const s=t[0],r=t[i];return Math.hypot(s.x-r.x,s.y-r.y)<.5}class na{constructor(t,e,i){this.viewOx=40,this.viewOy=40,this.viewScale=1,this.stage=new Zo.Stage({container:t,width:e,height:i}),this._layer=new Zo.Layer,this._bgCanvas=document.createElement("canvas"),this._bgImage=new Zo.Image({image:this._bgCanvas,listening:!1}),this._world=new Zo.Group,this._leds=new Zo.Group({listening:!1}),this._guide=new Zo.Group({listening:!1}),this._edges=new Zo.Group({listening:!1}),this._vertices=new Zo.Group,this._overlay=new Zo.Group({listening:!1}),this._hint=new Zo.Text({text:"Draw a shape, then use Place vertices",fontSize:14,fill:"rgba(255,255,255,0.25)",align:"center",verticalAlign:"middle",width:e,height:i,listening:!1}),this._world.add(this._leds),this._world.add(this._guide),this._world.add(this._edges),this._world.add(this._vertices),this._world.add(this._overlay),this._layer.add(this._bgImage),this._layer.add(this._world),this._layer.add(this._hint),this.stage.add(this._layer),this._applyWorldTransform()}resize(t,e){this.stage.width(t),this.stage.height(e),this._hint.width(t),this._hint.height(e),this._hint.position({x:0,y:e/2-10})}destroy(){this.stage.destroy()}updatePointerFromEvent(t){this.stage.setPointersPositions(t)}getModelPointer(t){t&&this.updatePointerFromEvent(t);const e=this._world.getRelativePointerPosition();return e?[e.x,e.y]:this._modelFromStagePointer()}_modelFromStagePointer(){const t=this.stage.getPointerPosition();return t?[(t.x-this.viewOx)/this.viewScaleSafe,(t.y-this.viewOy)/this.viewScaleSafe]:null}get viewScaleSafe(){return Math.max(this.viewScale,.01)}_applyWorldTransform(){this._world.position({x:this.viewOx,y:this.viewOy}),this._world.scale({x:this.viewScale,y:this.viewScale})}fitView(t,e){let i=1/0,s=-1/0,r=1/0,n=-1/0;const o=(t,e)=>{t<i&&(i=t),t>s&&(s=t),e<r&&(r=e),e>n&&(n=e)};for(const e of t)o(e.x,e.y);for(const t of e)o(t[0],t[1]);const a=this.stage.width(),l=this.stage.height();if(!Number.isFinite(i))return this.viewOx=40,this.viewOy=40,this.viewScale=1,void this._applyWorldTransform();const h=s-i||100,c=n-r||100;this.viewScale=Math.min((a-96)/h,(l-96)/c,4),this.viewOx=48-i*this.viewScale,this.viewOy=48-r*this.viewScale,this._applyWorldTransform()}setViewScale(t,e,i){const s=e??this.stage.width()/2,r=i??this.stage.height()/2,n=this.viewScale,o=Math.max(.15,Math.min(8,t)),a=(s-this.viewOx)/n,l=(r-this.viewOy)/n;this.viewScale=o,this.viewOx=s-a*o,this.viewOy=r-l*o,this._applyWorldTransform()}redraw(t){const e=this.stage.width(),i=this.stage.height();this._layer.getStage()?.container().style.setProperty("background","#111827"),this._drawBackground(e,i,t.bgImage,t.bgLayer),this._leds.destroyChildren(),this._guide.destroyChildren(),this._edges.destroyChildren(),this._vertices.destroyChildren(),this._overlay.destroyChildren();const s=2/this.viewScaleSafe,r=[8/this.viewScaleSafe,6/this.viewScaleSafe],n=(t,e=.75)=>{!t||t.points.length<2||this._guide.add(new Zo.Line({points:sa(t),stroke:`rgba(168,85,247,${e})`,strokeWidth:3/this.viewScaleSafe,lineCap:"round",lineJoin:"round",dash:r,closed:t.closed,listening:!1}))};if(n(t.guide),n(t.guidePreview,.55),t.polylinePts.length>=2&&n(ar(t.polylinePts,!1),.75),t.penStroke.length>=2){const e=[];for(const[i,s]of t.penStroke)e.push(i,s);this._overlay.add(new Zo.Line({points:e,stroke:"rgba(168,85,247,0.5)",strokeWidth:s,lineCap:"round",lineJoin:"round",listening:!1}))}const o=t.vertices,a=0===o.length&&!t.guide;this._hint.visible(a);const l=Boolean(t.bgImage?.naturalWidth);for(const{x:e,y:i}of t.ledPositions)this._leds.add(new Zo.Circle({x:e,y:i,radius:(l?4:3)/this.viewScaleSafe,fill:"rgba(120,220,120,0.65)",shadowBlur:l?10/this.viewScaleSafe:0,shadowColor:"rgba(120,255,160,0.85)",listening:!1}));if(o.length>=2){const e=o.length>=2&&ra(o,o.length-1)?o.slice(0,-1):o;if(e.length>=2){const i=[];for(const t of e)i.push(t.x,t.y);this._edges.add(new Zo.Line({points:i,stroke:"rgba(99,102,241,0.6)",strokeWidth:s,closed:t.closed&&e.length>=3,listening:!1}))}}for(const[e,i]of t.calibPts)this._overlay.add(new Zo.Circle({x:e,y:i,radius:6/this.viewScaleSafe,fill:"#22d3ee",listening:!1}));for(let e=0;e<o.length;e++){if(ra(o,e))continue;const i=o[e],s=null!==i.anchorLed,r=e===t.selectedVtx,n=(s?5:4)/this.viewScaleSafe,a=new Zo.Circle({x:i.x,y:i.y,radius:n,fill:r?"white":s?"#f59e0b":ia,stroke:r?ia:void 0,strokeWidth:r?2/this.viewScaleSafe:0,listening:"select"===t.tool||"place"===t.tool,name:`vertex-${e}`});this._vertices.add(a);const l=3/this.viewScaleSafe,h=Qo(this.viewScaleSafe),c=s&&null!==i.anchorLed?ta(e,i.anchorLed):ea(e),d=new Zo.Text({x:i.x+n+l,y:i.y-n-l,text:c,fontSize:h,fontStyle:"bold",fontFamily:"system-ui, -apple-system, sans-serif",fill:"#ffffff",shadowColor:"rgba(0,0,0,0.85)",shadowBlur:3/this.viewScaleSafe,shadowOffset:{x:0,y:1/this.viewScaleSafe},listening:!1});d.y(i.y-n-l-d.height()),this._vertices.add(d)}this._layer.batchDraw()}_drawBackground(t,e,i,s){const r=this._bgCanvas.getContext("2d");r&&i?.complete&&i.naturalWidth&&s?(this._bgCanvas.width===t&&this._bgCanvas.height===e||(this._bgCanvas.width=t,this._bgCanvas.height=e),r.clearRect(0,0,t,e),r.fillStyle="#111827",r.fillRect(0,0,t,e),Ys(r,t,e,i,s),this._bgImage.image(this._bgCanvas),this._bgImage.width(t),this._bgImage.height(e),this._bgImage.visible(!0)):this._bgImage.visible(!1)}}const oa=.15,aa=.25;function la(t){const e=Math.max(oa,Math.min(8,t)),i=(Math.log(e)-Math.log(oa))/(Math.log(8)-Math.log(oa));return Math.round(100*i)}function ha(t){const e=Math.max(aa,Math.min(4,t)),i=(Math.log(e)-Math.log(aa))/(Math.log(4)-Math.log(aa));return Math.round(100*i)}function ca(t){const e=Math.max(0,Math.min(100,t))/100;return Math.exp(Math.log(aa)+e*(Math.log(4)-Math.log(aa)))}const da=.3048;function pa(t){const e=t?.config?.unit_system?.length;return"mi"!==e}function ua(t){return pa(t)?"m":"ft"}function ga(t,e){if(e)return`${t.toFixed(1)} px/m`;return`${(t*da).toFixed(1)} px/ft`}function fa(t,e,i){return t+(e-t)*i}let _a=class extends vt{constructor(){super(...arguments),this.controllerId="",this.layoutId="",this.fixtureId="",this.pixelCount=210,this._vertices=[],this._ledPositions=[],this._selectedVtx=-1,this._anchorInput="",this._status="",this._busy=!1,this._closed=!1,this._tool="select",this._guide=null,this._backgroundUrl=null,this._bgLayer=null,this._scalePxPerM=null,this._layoutName="Layout",this._fixtureName="Fixture",this._calibActive=!1,this._calibDistance="1",this._canUndo=!1,this._canRedo=!1,this._zoomSlider=50,this._anchorScaleEnd=-1,this._calibPts=[],this._undoStack=[],this._redoStack=[],this._suspendHistory=!1,this._penStroke=[],this._shapeStart=null,this._lineStart=null,this._polylinePts=[],this._bgImage=null,this._photoPan=null,this._drag=null,this._onWheel=t=>{t.preventDefault()},this._onKeyDown=t=>{(t.metaKey||t.ctrlKey)&&("z"!==t.key||t.shiftKey?("z"===t.key&&t.shiftKey||"y"===t.key)&&(t.preventDefault(),this._redo()):(t.preventDefault(),this._undo()))},this._onPointerDown=t=>{t.preventDefault();const e=this._pointerModel(t);if(!e)return;const[i,s]=e;if(this._calibActive)return this._calibPts.push([i,s]),this._calibPts.length>=2&&this._applyCalibration(),void this._syncStage();if("photo"===this._tool&&this._bgLayer){const e=this._konva?.stage,i=e?.getPointerPosition();return this._photoPan={px:i?.x??0,py:i?.y??0,ox:this._bgLayer.offsetX??0,oy:this._bgLayer.offsetY??0},void this._stageContainer()?.setPointerCapture(t.pointerId)}if("place"===this._tool){const t=this._hitVertex(i,s);return t>=0?(this._selectedVtx=t,this._anchorInput=String(this._vertices[t].anchorLed??"")):this._placeVertexOnGuide(i,s),void this._syncStage()}if("pen"===this._tool)return this._recordUndo(),this._beginNewGuideDrawing(),this._penStroke=[[i,s]],this._stageContainer()?.setPointerCapture(t.pointerId),void this._syncStage();if("line"===this._tool)return this._lineStart?(this._guide=function(t,e){return{points:[t,e],closed:!1,kind:"line"}}(this._lineStart,[i,s]),this._lineStart=null,this._status="Line guide ready — switch to Place vertices"):(this._recordUndo(),this._beginNewGuideDrawing(),this._lineStart=[i,s],this._status="Line: click end point"),void this._syncStage();if("rect"===this._tool||"ellipse"===this._tool)return this._recordUndo(),this._beginNewGuideDrawing(),this._shapeStart=[i,s],this._status="rect"===this._tool?"Rectangle: drag to size, release to finish":"Ellipse: drag to size, release to finish",this._stageContainer()?.setPointerCapture(t.pointerId),void this._syncStage();if("polyline"===this._tool)return 0===this._polylinePts.length&&(this._recordUndo(),this._beginNewGuideDrawing()),this._polylinePts=[...this._polylinePts,[i,s]],this._status=`Polyline: ${this._polylinePts.length} pts — double-click to finish`,void this._syncStage();const r=this._hitVertex(i,s);r>=0?(this._recordUndo(),this._selectedVtx=r,this._anchorInput=String(this._vertices[r].anchorLed??""),this._drag={idx:r},this._stageContainer()?.setPointerCapture(t.pointerId)):this._selectedVtx=-1,this._syncStage()},this._onPointerMove=t=>{const e=this._pointerModel(t);if(!e)return;const[i,s]=e;if(this._photoPan&&this._bgLayer&&this._konva){this._konva.updatePointerFromEvent(t);const e=this._konva.stage.getPointerPosition();if(!e)return;const i=this._konva.stage.width(),s=this._konva.stage.height(),r=(e.x-this._photoPan.px)/i,n=(e.y-this._photoPan.py)/s;return this._bgLayer={...this._bgLayer,offsetX:this._photoPan.ox+r,offsetY:this._photoPan.oy+n},void this._syncStage()}if("pen"===this._tool&&this._penStroke.length>0){const t=this._penStroke[this._penStroke.length-1],e=2/(this._konva?.viewScaleSafe??1);return void(Math.hypot(i-t[0],s-t[1])>e&&(this._penStroke=[...this._penStroke,[i,s]],this._syncStage()))}if(this._shapeStart&&("rect"===this._tool||"ellipse"===this._tool)){const[t,e]=this._shapeStart,r="rect"===this._tool?nr(t,e,i,s):or((t+i)/2,(e+s)/2,Math.abs(i-t)/2,Math.abs(s-e)/2);return void this._syncStage(r)}if(!this._drag)return;const r=[...this._vertices];r[this._drag.idx]={...r[this._drag.idx],x:i,y:s},this._vertices=r,this._syncStage()},this._onPointerUp=t=>{if(this._photoPan)return this._stageContainer()?.releasePointerCapture(t.pointerId),void(this._photoPan=null);if("pen"===this._tool&&this._penStroke.length>0)return this._stageContainer()?.releasePointerCapture(t.pointerId),void this._finishPenGuide();if(this._shapeStart&&("rect"===this._tool||"ellipse"===this._tool)){const e=this._pointerModel(t);if(!e)return;const[i,s]=e,[r,n]=this._shapeStart,o=4/(this._konva?.viewScaleSafe??1);return Math.hypot(i-r,s-n)<o?(this._stageContainer()?.releasePointerCapture(t.pointerId),this._status="rect"===this._tool?"Rectangle: drag to size (release was too short)":"Ellipse: drag to size (release was too short)",void this._syncStage()):(this._guide="rect"===this._tool?nr(r,n,i,s):or((r+i)/2,(n+s)/2,Math.abs(i-r)/2,Math.abs(s-n)/2),this._shapeStart=null,this._status="Shape guide ready — switch to Place vertices",this._stageContainer()?.releasePointerCapture(t.pointerId),void this._syncStage())}this._drag&&(this._stageContainer()?.releasePointerCapture(t.pointerId),this._drag=null,this._refreshPositions())},this._onDblClick=t=>{if("polyline"===this._tool)return t.preventDefault(),void this._finishPolyline();if("select"!==this._tool)return;const e=this._pointerModel(t);if(!e)return;const[i,s]=e;this._hitVertex(i,s)>=0||(this._recordUndo(),this._vertices=[...this._vertices,{x:i,y:s,anchorLed:null}],this._selectedVtx=this._vertices.length-1,this._anchorInput="",this._syncStage(),this._refreshPositions())},this._onContextMenu=t=>{t.preventDefault();const e=this._pointerModel(t);if(!e)return;const i=this._hitVertex(e[0],e[1]);i<0||(this._recordUndo(),this._vertices=this._vertices.filter((t,e)=>e!==i),this._selectedVtx===i?this._selectedVtx=-1:this._selectedVtx>i&&this._selectedVtx--,this._syncStage(),this._refreshPositions())}}onPoweredConnect(){this._loadLayout()}firstUpdated(){if(this._stageMount=this.renderRoot.querySelector(".stage-mount")??void 0,this._stageMount){const t=this._stageMount.getBoundingClientRect(),e=Math.max(1,Math.floor(t.width)),i=Math.max(1,Math.floor(t.height));this._konva=new na(this._stageMount,e,i);const s=this._konva.stage.container();s.addEventListener("pointerdown",this._onPointerDown),s.addEventListener("pointermove",this._onPointerMove),s.addEventListener("pointerup",this._onPointerUp),s.addEventListener("pointercancel",this._onPointerUp),s.addEventListener("dblclick",this._onDblClick),s.addEventListener("contextmenu",this._onContextMenu),s.addEventListener("wheel",this._onWheel,{passive:!1}),this._resizeObs=new ResizeObserver(()=>this._onResize()),this._resizeObs.observe(this._stageMount),this._onResize(),this._syncZoomSliderFromView()}}updated(t){super.updated(t),(t.has("connection")||t.has("layoutId")||t.has("fixtureId"))&&this._loadLayout()}disconnectedCallback(){this._resizeObs?.disconnect();const t=this._konva?.stage.container();t&&(t.removeEventListener("pointerdown",this._onPointerDown),t.removeEventListener("pointermove",this._onPointerMove),t.removeEventListener("pointerup",this._onPointerUp),t.removeEventListener("pointercancel",this._onPointerUp),t.removeEventListener("dblclick",this._onDblClick),t.removeEventListener("contextmenu",this._onContextMenu),t.removeEventListener("wheel",this._onWheel)),this._konva?.destroy(),this._konva=void 0,super.disconnectedCallback()}_onResize(){const t=this._stageMount,e=this._konva;if(!t||!e)return;const i=t.getBoundingClientRect(),s=Math.max(1,Math.floor(i.width)),r=Math.max(1,Math.floor(i.height));e.resize(s,r),this._syncStage()}_fitView(){this._konva?.fitView(this._vertices,this._guide?.points??[]),this._syncZoomSliderFromView()}_captureSnapshot(){return{vertices:this._vertices.map(t=>({...t})),guide:this._guide?{points:this._guide.points.map(t=>[t[0],t[1]]),closed:this._guide.closed,kind:this._guide.kind}:null,closed:this._closed,bgLayer:this._bgLayer?{...this._bgLayer}:null,backgroundUrl:this._backgroundUrl,scalePxPerM:this._scalePxPerM,selectedVtx:this._selectedVtx,anchorInput:this._anchorInput}}_recordUndo(){this._suspendHistory||(this._undoStack.push(this._captureSnapshot()),this._undoStack.length>50&&this._undoStack.shift(),this._redoStack=[],this._canUndo=this._undoStack.length>0,this._canRedo=!1)}_applySnapshot(t){const e=function(t){return{vertices:t.vertices.map(t=>({...t})),guide:t.guide?{points:t.guide.points.map(t=>[t[0],t[1]]),closed:t.guide.closed,kind:t.guide.kind}:null,closed:t.closed,bgLayer:t.bgLayer?{...t.bgLayer}:null,backgroundUrl:t.backgroundUrl,scalePxPerM:t.scalePxPerM,selectedVtx:t.selectedVtx,anchorInput:t.anchorInput}}(t);this._vertices=e.vertices,this._guide=e.guide,this._closed=e.closed,this._bgLayer=e.bgLayer,this._backgroundUrl=e.backgroundUrl,this._scalePxPerM=e.scalePxPerM,this._selectedVtx=e.selectedVtx,this._anchorInput=e.anchorInput,this._penStroke=[],this._shapeStart=null,this._lineStart=null,this._polylinePts=[],this._backgroundUrl?this._loadBackgroundImage():this._bgImage=null,this._refreshPositions(),this._syncZoomSliderFromView(),this._syncStage()}_undo(){if(!this._undoStack.length)return;this._redoStack.push(this._captureSnapshot());const t=this._undoStack.pop();this._suspendHistory=!0,this._applySnapshot(t),this._suspendHistory=!1,this._canUndo=this._undoStack.length>0,this._canRedo=this._redoStack.length>0,this._status="Undo"}_redo(){if(!this._redoStack.length)return;this._undoStack.push(this._captureSnapshot());const t=this._redoStack.pop();this._suspendHistory=!0,this._applySnapshot(t),this._suspendHistory=!1,this._canUndo=this._undoStack.length>0,this._canRedo=this._redoStack.length>0,this._status="Redo"}_syncZoomSliderFromView(){"photo"===this._tool&&this._bgLayer?this._zoomSlider=ha(this._bgLayer.scale??1):this._konva&&(this._zoomSlider=la(this._konva.viewScale))}_onZoomSlider(t){const e=parseInt(t.target.value,10);isNaN(e)||(this._zoomSlider=e,"photo"===this._tool&&this._bgLayer?this._bgLayer={...this._bgLayer,scale:ca(e)}:this._konva&&this._konva.setViewScale(function(t){const e=Math.max(0,Math.min(100,t))/100;return Math.exp(Math.log(oa)+e*(Math.log(8)-Math.log(oa)))}(e)),this._syncStage())}_nudgeZoom(t){if("photo"===this._tool&&this._bgLayer){const e=Math.max(.25,Math.min(4,(this._bgLayer.scale??1)*t));this._bgLayer={...this._bgLayer,scale:e},this._zoomSlider=ha(e)}else if(this._konva){const e=Math.max(.15,Math.min(8,this._konva.viewScale*t));this._konva.setViewScale(e),this._zoomSlider=la(e)}this._syncStage()}_pointerModel(t){return this._konva?.getModelPointer(t)??null}_stageContainer(){return this._konva?.stage.container()}_isClosingDuplicate(t){if(t<=0||this._vertices.length<3)return!1;const e=this._vertices.length-1;if(t!==e)return!1;const i=this._vertices[0],s=this._vertices[e];return Math.hypot(i.x-s.x,i.y-s.y)<.5}_hitVertex(t,e){const i=14/(this._konva?.viewScaleSafe??1);let s=-1,r=i+1;for(let n=0;n<this._vertices.length;n++){if(this._isClosingDuplicate(n))continue;const o=this._vertices[n],a=Math.hypot(t-o.x,e-o.y);if(a>i)continue;const l=null!==this._vertices[n].anchorLed,h=s>=0&&null!==this._vertices[s].anchorLed;(s<0||a<r-.5||Math.abs(a-r)<=1&&l&&!h)&&(s=n,r=a)}return s}_beginNewGuideDrawing(){this._guide=null,this._vertices=[],this._ledPositions=[],this._selectedVtx=-1,this._anchorInput=""}_placeVertexOnGuide(t,e){if(!this._guide||this._guide.points.length<2)return void(this._status="Draw a shape first (pen, line, rect, …), then place vertices.");const i=lr(this._guide,t,e),s=24/(this._konva?.viewScaleSafe??1);if(i.dist>s)return void(this._status="Click closer to the purple guide line.");for(const t of this._vertices)if(Math.hypot(t.x-i.x,t.y-i.y)<.5*s)return void(this._status="Vertex already placed near here.");const r=hr(this._vertices.length,i.t,this.pixelCount);this._recordUndo(),this._vertices=[...this._vertices,{x:i.x,y:i.y,anchorLed:r}],this._selectedVtx=this._vertices.length-1,this._anchorInput=String(r),this._status=0===this._selectedVtx?"Placed v0 @ LED 0 (start) — next clicks use position along guide":`Placed v${this._selectedVtx} @ LED ${r} (${Math.round(100*i.t)}% along guide)`,this._refreshPositions(),this._syncStage()}_finishPenGuide(){const t=this._penStroke;this._penStroke=[],t.length>=2&&(this._guide=function(t,e,i=!1){if(t.length<2)return{points:[],closed:!1,kind:"freehand"};const s=rr(t.map(([t,e])=>({x:t,y:e})),4,!0),r=s.map(t=>e(t.x,t.y));return{points:r,closed:i,kind:"freehand"}}(t,(t,e)=>[t,e],this._closed)),this._status=this._guide&&this._guide.points.length>=2?"Smooth guide drawn — switch to Place vertices and click along the line":"Stroke too short",this._syncStage()}_finishPolyline(){this._polylinePts.length<2?this._status="Need at least 2 points":(this._recordUndo(),this._guide=ar(this._polylinePts,this._closed),this._polylinePts=[],this._status="Polyline guide ready — Place vertices along the path",this._syncStage())}_lengthMetric(){return pa(this.hass)}_applyCalibration(){if(this._calibPts.length<2)return;const[t,e]=this._calibPts,i=Math.hypot(e[0]-t[0],e[1]-t[1]),s=parseFloat(this._calibDistance),r=(n=s,this._lengthMetric()?n:n*da);var n;i>0&&r>0&&(this._scalePxPerM=i/r,this._status=`Scale: ${ga(this._scalePxPerM,this._lengthMetric())}`),this._calibActive=!1,this._calibPts=[]}_syncStage(t=null){const e=this._konva?.stage.container();e&&(e.style.cursor="photo"===this._tool&&this._bgLayer?"grab":"crosshair"),this._konva?.redraw({vertices:this._vertices,selectedVtx:this._selectedVtx,guide:this._guide,guidePreview:t,ledPositions:this._ledPositions,closed:this._closed,polylinePts:this._polylinePts,penStroke:this._penStroke,calibPts:this._calibPts,bgImage:this._bgImage,bgLayer:this._bgLayer,tool:this._tool})}async _loadLayout(){if(this.connection&&this.controllerId&&this.layoutId){this._suspendHistory=!0,this._undoStack=[],this._redoStack=[],this._canUndo=!1,this._canRedo=!1;try{const t=await ks(this.connection,this.controllerId,this.layoutId);if(!t)return;const e=this._findFixture(t);if(!e)return void(this._vertices=[]);const i=e.points??[],s=e.anchors??[],r=new Map(s.map(t=>[t.vertex_index,t.led]));let n=i.map((t,e)=>({x:t[0],y:t[1],anchorLed:r.get(e)??null}));if(n.length>=2){const t=n[0],e=n[n.length-1];Math.hypot(t.x-e.x,t.y-e.y)<.5&&(n=n.slice(0,-1))}this._vertices=n;const o=e.guide_points,a=e.guide_kind;Array.isArray(o)&&o.length>=2&&(this._guide={points:o.map(t=>[Number(t[0]),Number(t[1])]),closed:Boolean(e.closed),kind:a??"polyline"}),this._closed=Boolean(e.closed),this._bgLayer=Ks(t),this._backgroundUrl=this._bgLayer?.url??t.background_url??null,this._scalePxPerM=t.scale_px_per_m??null,this._layoutName=function(t,e){const i=(t??"").trim();return i&&!$s.has(i.toLowerCase())?i:Is(e)}(t.name,this.layoutId),this._fixtureName=function(t,e){const i=(t??"").trim();return i&&!$s.has(i.toLowerCase())?i:Is(e)}(String(e.name??""),this.fixtureId||String(e.id??"fixture-0")),this._loadBackgroundImage(),this._fitView(),await this._refreshPositions(),this._syncStage()}catch(t){this._status=t instanceof Error?t.message:String(t)}finally{this._suspendHistory=!1}}}_findFixture(t){const e=t.fixtures??[];return this.fixtureId?e.find(t=>t.id===this.fixtureId)??null:e[0]??null}async _refreshPositions(){if(this.connection&&this.controllerId&&this.fixtureId)try{this._ledPositions=await Ps(this.connection,this.controllerId,this.fixtureId,this.layoutId||void 0),this._syncStage()}catch{this._ledPositions=[]}}_buildLayout(){const t=this._vertices.map(t=>[t.x,t.y]),e=this._vertices.map((t,e)=>null!==t.anchorLed?{led:t.anchorLed,vertex_index:e}:null).filter(t=>null!==t);return{id:this.layoutId||"layout-0",controller_id:this.controllerId,name:this._layoutName,pixel_count:this.pixelCount,background_url:this._backgroundUrl,background:this._bgLayer,scale_px_per_m:this._scalePxPerM,fixtures:[{id:this.fixtureId||"fixture-0",name:this._fixtureName,kind:"polyline",closed:this._closed,points:t,anchors:e,guide_points:this._guide?.points??[],guide_kind:this._guide?.kind??null}]}}async _onSvgFile(t){const e=t.target,i=e.files?.[0];if(e.value="",i)if(i.size>cr)this._status="SVG too large (max 2 MB)";else{this._busy=!0,this._status="Importing SVG…";try{const t=await i.text();await new Promise(t=>setTimeout(t,0)),this._recordUndo(),this._beginNewGuideDrawing(),this._guide=mr(t),this._status=`SVG guide loaded (${this._guide.points.length} pts) — Place vertices along the path`,this._fitView(),this._syncStage()}catch(t){this._status=t instanceof Error?t.message:String(t)}finally{this._busy=!1}}}_clearGuide(){this._recordUndo(),this._guide=null,this._polylinePts=[],this._lineStart=null,this._beginNewGuideDrawing(),this._syncStage()}_loadBackgroundImage(t=!1){const e=this._backgroundUrl;e?vr(e,t).then(t=>{this._bgImage=t,this._syncStage()}).catch(t=>{this._bgImage=null,this._status=Ht(t),this._syncStage()}):this._bgImage=null}async _importFromWled(){if(this.connection&&this.controllerId){this._busy=!0,this._status="Reading WLED segments…";try{const t=(await Tt(this.connection,this.controllerId)).segments.map(t=>t.start??0).filter((t,e,i)=>i.indexOf(t)===e).sort((t,e)=>t-e);this._recordUndo(),this._vertices=Ds(this._vertices,t,this._closed),this._status=`Imported ${t.length} segment boundary(ies) from WLED`,this._refreshPositions(),this._syncStage()}catch(t){this._status=t instanceof Error?t.message:String(t)}finally{this._busy=!1}}}async _onBackgroundFile(t){const e=t.target,i=e.files?.[0];if(e.value="",!i)return;const s=this.renderRoot.querySelector("wled-layout-photo-editor");if(s)try{await s.openWithFile(i)}catch(t){this._status=t instanceof Error?t.message:String(t)}}async _onPhotoApply(t){const{file:e,layer:i}=t.detail;if(this.connection&&this.controllerId&&this.layoutId){this._busy=!0,this._status="Uploading photo…";try{const{background_url:t}=await Ts(this.connection,this.controllerId,this.layoutId,e);this._recordUndo(),this._backgroundUrl=t,this._bgLayer={...i,url:t,cropX:0,cropY:0,cropW:1,cropH:1},this._loadBackgroundImage(!0),this._status="Photo ready — align with Photo tool, then Save layout"}catch(t){this._status=Ht(t)}finally{this._busy=!1}}else this._status="Cannot upload photo — not connected to Home Assistant"}_updateBgLayer(t){this._bgLayer&&(this._bgLayer={...this._bgLayer,...t},this._syncStage())}_clearPhoto(){this._recordUndo(),this._bgLayer=null,this._backgroundUrl=null,this._bgImage=null,this._syncStage()}async _save(){if(this.connection&&this.controllerId&&!this._busy){this._busy=!0,this._status="Saving…";try{await Cs(this.connection,this.controllerId,this._buildLayout()),this._status="Saved",await this._refreshPositions(),this.dispatchEvent(new CustomEvent("layout-saved",{bubbles:!0,composed:!0}))}catch(t){this._status=t instanceof Error?t.message:String(t)}finally{this._busy=!1}}}_setAnchorLed(){const t=this._selectedVtx;if(t<0)return;this._recordUndo();const e=this._anchorInput.trim(),i=""===e?null:parseInt(e,10);if(null!==i&&(isNaN(i)||i<0||i>=this.pixelCount))return;const s=[...this._vertices];s[t]={...s[t],anchorLed:i},this._vertices=s,this._syncStage()}_anchorScaleMax(){return Math.max(0,this.pixelCount-1)}_anchorScaleSliderValue(){const t=this._anchorScaleMax();return this._anchorScaleEnd<0?t:Math.min(t,this._anchorScaleEnd)}_onAnchorScaleSlider(t){const e=t.target,i=parseInt(e.value,10);if(isNaN(i)||0===this._vertices.length)return;this._recordUndo();const s=this._anchorScaleMax(),r=[...this._vertices];for(let t=0;t<r.length;t++){const e=r[t].anchorLed;if(null===e)continue;const n=s>0?e/s:0,o=Math.round(fa(0,i,n));r[t]={...r[t],anchorLed:o}}this._vertices=r,this._anchorScaleEnd=i,this._status=`Anchors rescaled to LEDs 0–${i} (spacing preserved)`,this._refreshPositions(),this._syncStage()}_zoomLabel(){return"photo"===this._tool&&this._bgLayer?`${Math.round(100*(this._bgLayer.scale??1))}%`:`${Math.round(100*(this._konva?.viewScale??1))}%`}render(){const t=this._vertices[this._selectedVtx],e="photo"===this._tool&&this._bgLayer?"Photo":"View";return W`
      <div class="designer-root" tabindex="0" @keydown=${this._onKeyDown}>
        <header class="edit-toolbar">
          <div class="toolbar-cluster">
            <span class="cluster-label">Edit</span>
            <div class="tool-row">
              <button
                class=${"select"===this._tool?"tool active":"tool"}
                @click=${()=>{this._tool="select",this._syncZoomSliderFromView()}}
              >
                Select
              </button>
              <button
                class=${"place"===this._tool?"tool active":"tool"}
                @click=${()=>{this._tool="place"}}
              >
                Place ●
              </button>
              <button
                class=${"photo"===this._tool?"tool active":"tool"}
                ?disabled=${!this._bgLayer}
                @click=${()=>{this._tool="photo",this._syncZoomSliderFromView()}}
              >
                Photo
              </button>
            </div>
          </div>

          <div class="toolbar-divider" aria-hidden="true"></div>

          <div class="toolbar-cluster">
            <span class="cluster-label">Draw</span>
            <div class="tool-row wrap">
              <button
                class=${"pen"===this._tool?"tool active":"tool"}
                @click=${()=>{this._tool="pen"}}
              >
                Freehand
              </button>
              <button
                class=${"line"===this._tool?"tool active":"tool"}
                @click=${()=>{this._tool="line",this._lineStart=null}}
              >
                Line
              </button>
              <button
                class=${"rect"===this._tool?"tool active":"tool"}
                @click=${()=>{this._tool="rect"}}
              >
                Rect
              </button>
              <button
                class=${"ellipse"===this._tool?"tool active":"tool"}
                @click=${()=>{this._tool="ellipse"}}
              >
                Oval
              </button>
              <button
                class=${"polyline"===this._tool?"tool active":"tool"}
                @click=${()=>{this._tool="polyline",this._polylinePts=[]}}
              >
                Polyline
              </button>
            </div>
          </div>

          <label class="check-row compact">
            <input
              type="checkbox"
              .checked=${this._closed}
              @change=${t=>{this._recordUndo(),this._closed=t.target.checked,this._syncStage(),this._refreshPositions()}}
            />
            Close path
          </label>

          <div class="toolbar-divider" aria-hidden="true"></div>

          <div class="toolbar-cluster stage-actions">
            <button
              type="button"
              class="secondary small"
              ?disabled=${!this._canUndo}
              title="Undo (Ctrl+Z)"
              @click=${()=>this._undo()}
            >
              Undo
            </button>
            <button
              type="button"
              class="secondary small"
              ?disabled=${!this._canRedo}
              title="Redo (Ctrl+Shift+Z)"
              @click=${()=>this._redo()}
            >
              Redo
            </button>
            <button
              type="button"
              class="secondary small"
              @click=${()=>{this._fitView(),this._syncStage()}}
            >
              Fit view
            </button>
          </div>

          <div class="toolbar-divider" aria-hidden="true"></div>

          <div class="toolbar-cluster file-actions">
            <button class="secondary small" ?disabled=${this._busy} @click=${()=>this._importFromWled()}>
              Import WLED
            </button>
            <label class="file-btn secondary small">
              Photo…
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic,.heic"
                capture="environment"
                hidden
                @change=${this._onBackgroundFile}
              />
            </label>
            <label class="file-btn secondary small">
              SVG…
              <input
                type="file"
                accept="image/svg+xml,.svg"
                hidden
                @change=${this._onSvgFile}
              />
            </label>
            <button class="secondary small" @click=${()=>this._clearGuide()}>
              Clear guide
            </button>
            ${"polyline"===this._tool&&this._polylinePts.length>=2?W`
                  <button class="secondary small" @click=${()=>this._finishPolyline()}>
                    Finish poly
                  </button>
                `:null}
            <button
              class="secondary small"
              ?disabled=${this._busy}
              @click=${()=>{this._calibActive=!0,this._calibPts=[],this._calibDistance=pa(this.hass)?"1":"3.28",this._status=function(t){return`Click two points on the floorplan, then enter real distance (${ua(t)})`}(this.hass)}}
            >
              Calibrate
            </button>
          </div>

          ${void 0!==t?W`
                <div class="toolbar-cluster anchor-inline">
                  <label>
                    v${this._selectedVtx} LED
                    <input
                      type="number"
                      min="0"
                      max=${this.pixelCount-1}
                      .value=${this._anchorInput}
                      @input=${t=>{this._anchorInput=t.target.value}}
                      @change=${()=>this._setAnchorLed()}
                    />
                  </label>
                  <button class="secondary small" @click=${()=>this._setAnchorLed()}>
                    Set
                  </button>
                </div>
              `:null}

          <div class="toolbar-cluster scale-inline">
            <label title="Rescale all pinned anchors to LEDs 0…N (spacing preserved)">
              Scale anchors →
              <input
                type="range"
                min="0"
                max=${this._anchorScaleMax()}
                .value=${String(this._anchorScaleSliderValue())}
                @change=${this._onAnchorScaleSlider}
              />
              <span class="scale-val">${this._anchorScaleSliderValue()}</span>
            </label>
          </div>

          <div class="toolbar-spacer"></div>

          <details class="help-details">
            <summary>Help</summary>
            <p>Draw a purple guide → <strong>Place ●</strong>: first corner LED 0, then LED from click position along the path → Save.</p>
          </details>

          <button
            class="primary save-btn"
            ?disabled=${this._busy||this._vertices.length<2}
            @click=${()=>this._save()}
          >
            Save layout
          </button>
        </header>

        ${this._calibActive?W`
              <div class="context-bar">
                <label>
                  Distance (${ua(this.hass)})
                  <input
                    type="number"
                    min=${this._lengthMetric()?"0.01":"0.1"}
                    step=${this._lengthMetric()?"0.01":"0.1"}
                    .value=${this._calibDistance}
                    @input=${t=>{this._calibDistance=t.target.value}}
                  />
                </label>
              </div>
            `:null}
        ${this._bgLayer&&"photo"===this._tool?W`
              <div class="context-bar photo-tune">
                <label
                  >Opacity
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    .value=${String(this._bgLayer.opacity??.55)}
                    @input=${t=>this._updateBgLayer({opacity:parseFloat(t.target.value)})}
                  />
                </label>
                <label
                  >Brightness
                  <input
                    type="range"
                    min="0.4"
                    max="1.8"
                    step="0.05"
                    .value=${String(this._bgLayer.brightness??1)}
                    @input=${t=>this._updateBgLayer({brightness:parseFloat(t.target.value)})}
                  />
                </label>
                <label
                  >Saturation
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.05"
                    .value=${String(this._bgLayer.saturation??1)}
                    @input=${t=>this._updateBgLayer({saturation:parseFloat(t.target.value)})}
                  />
                </label>
                <label
                  >Rotation
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    step="1"
                    .value=${String(this._bgLayer.rotation??0)}
                    @input=${t=>this._updateBgLayer({rotation:parseFloat(t.target.value)})}
                  />
                </label>
                <label
                  >Zoom
                  <input
                    type="range"
                    min="0.25"
                    max="4"
                    step="0.05"
                    .value=${String(this._bgLayer.scale??1)}
                    @input=${t=>this._updateBgLayer({scale:parseFloat(t.target.value)})}
                  />
                </label>
                <button class="secondary small" @click=${()=>this._clearPhoto()}>
                  Remove photo
                </button>
              </div>
            `:null}

        ${this._status?W`<p class="status-bar">${this._status}</p>`:null}
        ${this._scalePxPerM?W`<p class="status-bar meta">
              Scale: ${ga(this._scalePxPerM,this._lengthMetric())}
            </p>`:null}

        <div class="split-body">
        <div class="workspace">
          <aside class="zoom-rail" aria-label="Zoom">
            <button
              type="button"
              class="zoom-btn"
              title="Zoom in"
              @click=${()=>this._nudgeZoom(1.2)}
            >
              +
            </button>
            <input
              type="range"
              class="zoom-slider"
              min="0"
              max="100"
              .value=${String(this._zoomSlider)}
              @input=${this._onZoomSlider}
              aria-label="${e} zoom"
            />
            <button
              type="button"
              class="zoom-btn"
              title="Zoom out"
              @click=${()=>this._nudgeZoom(1/1.2)}
            >
              −
            </button>
            <span class="zoom-pct">${this._zoomLabel()}</span>
            <span class="zoom-cap">${e}</span>
          </aside>
          <div class="canvas-wrap">
            <div class="stage-mount"></div>
          </div>
        </div>

        <div class="preview-pane">
          <slot name="preview"></slot>
        </div>
        </div>
      </div>
      <wled-layout-photo-editor
        @photo-apply=${t=>{this._onPhotoApply(t).catch(t=>{this._status=Ht(t),this._busy=!1})}}
        @photo-error=${t=>{this._status=t.detail.message}}
      ></wled-layout-photo-editor>
    `}static{this.styles=[...mt,o`
      :host {
        display: flex;
        flex-direction: column;
        min-height: 0;
        height: 100%;
        max-height: 100%;
        overflow: hidden;
      }
      .designer-root {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto 1fr;
        gap: 10px;
        height: 100%;
        min-height: 0;
        outline: none;
      }
      .split-body {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        min-height: 0;
        height: 100%;
        overflow: hidden;
      }
      .edit-toolbar {
        grid-column: 1 / -1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px 10px;
        padding: 10px 12px;
        border-radius: 10px;
        background: var(--card-background-color, #1f2937);
        border: 1px solid var(--divider-color, #374151);
      }
      .toolbar-cluster {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }
      .cluster-label {
        font-size: 0.68rem;
        opacity: 0.55;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        flex-shrink: 0;
      }
      .toolbar-divider {
        width: 1px;
        align-self: stretch;
        min-height: 28px;
        background: var(--divider-color, #374151);
        flex-shrink: 0;
      }
      .toolbar-spacer {
        flex: 1;
        min-width: 8px;
      }
      .context-bar {
        grid-column: 1 / -1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px 14px;
        padding: 8px 12px;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.25);
        border: 1px solid var(--divider-color, #374151);
      }
      .context-bar label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.78rem;
      }
      .context-bar input[type="range"] {
        width: 88px;
      }
      .photo-tune {
        gap: 12px;
      }
      .status-bar {
        grid-column: 1 / -1;
        margin: 0;
        font-size: 0.78rem;
        opacity: 0.85;
        padding: 0 4px;
      }
      .status-bar.meta {
        opacity: 0.65;
        margin-top: -6px;
      }
      .workspace {
        display: flex;
        flex-direction: row;
        min-height: 0;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid var(--divider-color, #374151);
      }
      .preview-pane {
        display: flex;
        flex-direction: column;
        min-height: 0;
        height: 100%;
        overflow: hidden;
        border-radius: 10px;
        border: 1px solid var(--divider-color, #374151);
        background: var(--card-background-color, #111827);
        padding: 8px;
        box-sizing: border-box;
      }
      .preview-pane ::slotted(*) {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .zoom-rail {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 40px;
        flex-shrink: 0;
        padding: 8px 4px;
        background: rgba(0, 0, 0, 0.45);
        border-radius: 8px 0 0 8px;
      }
      .zoom-btn {
        width: 28px;
        height: 28px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #374151);
        background: rgba(255, 255, 255, 0.06);
        color: inherit;
        cursor: pointer;
        font-size: 1rem;
        line-height: 1;
        padding: 0;
      }
      .zoom-btn:hover {
        background: rgba(255, 255, 255, 0.12);
      }
      .zoom-slider {
        writing-mode: vertical-lr;
        direction: rtl;
        height: min(28vh, 200px);
        width: 28px;
        margin: 4px 0;
        accent-color: var(--primary-color, #6366f1);
      }
      .zoom-pct {
        font-size: 0.65rem;
        font-variant-numeric: tabular-nums;
        opacity: 0.85;
      }
      .zoom-cap {
        font-size: 0.6rem;
        opacity: 0.5;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .canvas-wrap {
        position: relative;
        flex: 1;
        overflow: hidden;
        background: #111827;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .stage-mount {
        flex: 1;
        width: 100%;
        min-height: 200px;
        cursor: crosshair;
        touch-action: none;
      }
      .stage-mount > div {
        width: 100% !important;
        height: 100% !important;
      }
      .tool-row {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
      }
      .tool {
        padding: 5px 10px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #374151);
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.78rem;
        white-space: nowrap;
      }
      .tool.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: transparent;
      }
      .check-row.compact {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.78rem;
        white-space: nowrap;
        margin: 0;
      }
      .secondary,
      .file-btn {
        padding: 5px 10px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #374151);
        background: rgba(255, 255, 255, 0.04);
        color: inherit;
        cursor: pointer;
        font-size: 0.78rem;
        white-space: nowrap;
      }
      .file-btn input {
        display: none;
      }
      .anchor-inline {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .anchor-inline label {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.78rem;
        margin: 0;
      }
      .anchor-inline input[type="number"] {
        width: 4.5rem;
        padding: 4px 6px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #374151);
        background: var(--primary-background-color, #111827);
        color: inherit;
        font-size: 0.85rem;
      }
      .scale-inline label {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.75rem;
        margin: 0;
        white-space: nowrap;
      }
      .scale-inline input[type="range"] {
        width: 100px;
      }
      .scale-val {
        font-variant-numeric: tabular-nums;
        min-width: 2ch;
      }
      .help-details {
        font-size: 0.75rem;
        opacity: 0.85;
      }
      .help-details summary {
        cursor: pointer;
        list-style: none;
      }
      .help-details p {
        margin: 6px 0 0;
        max-width: 280px;
        line-height: 1.4;
      }
      .save-btn {
        flex-shrink: 0;
      }
      .primary,
      .small {
        padding: 6px 12px;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
        font-size: 0.82rem;
      }
      .small {
        padding: 5px 10px;
        font-size: 0.76rem;
      }
      .primary:disabled {
        opacity: 0.45;
        cursor: default;
      }
      @container wled-studio (max-width: 720px) {
        .split-body {
          grid-template-columns: 1fr;
          grid-template-rows: 1fr minmax(200px, 36vh);
        }
        .workspace {
          min-height: min(42vh, 360px);
        }
      }
    `]}};t([ct({attribute:!1})],_a.prototype,"connection",void 0),t([ct()],_a.prototype,"controllerId",void 0),t([ct()],_a.prototype,"layoutId",void 0),t([ct()],_a.prototype,"fixtureId",void 0),t([ct({type:Number})],_a.prototype,"pixelCount",void 0),t([dt()],_a.prototype,"_vertices",void 0),t([dt()],_a.prototype,"_ledPositions",void 0),t([dt()],_a.prototype,"_selectedVtx",void 0),t([dt()],_a.prototype,"_anchorInput",void 0),t([dt()],_a.prototype,"_status",void 0),t([dt()],_a.prototype,"_busy",void 0),t([dt()],_a.prototype,"_closed",void 0),t([dt()],_a.prototype,"_tool",void 0),t([dt()],_a.prototype,"_guide",void 0),t([dt()],_a.prototype,"_backgroundUrl",void 0),t([dt()],_a.prototype,"_bgLayer",void 0),t([dt()],_a.prototype,"_scalePxPerM",void 0),t([dt()],_a.prototype,"_layoutName",void 0),t([dt()],_a.prototype,"_fixtureName",void 0),t([dt()],_a.prototype,"_calibActive",void 0),t([dt()],_a.prototype,"_calibDistance",void 0),t([dt()],_a.prototype,"_canUndo",void 0),t([dt()],_a.prototype,"_canRedo",void 0),t([dt()],_a.prototype,"_zoomSlider",void 0),t([dt()],_a.prototype,"_anchorScaleEnd",void 0),_a=t([bt("wled-layout-designer")],_a);let ma=class extends vt{constructor(){super(...arguments),this.controllerId="",this.layoutId="",this.fixtureId="",this.pixelCount=210,this.dotRadius=4,this.compact=!1,this.heightPx=200,this.externalLive=!1,this.paintMode=!1,this.paintLivePreview=!1,this.paintBrushSize=6,this.segments=[],this.selectedSegId=-1,this.highlightSegIds=[],this._positions=[],this._status="waiting",this._showDots=!1,this._closed=!1,this._bgLayer=null,this._bgImage=null,this._raf=0,this._hoverLed=-1,this._painting=!1,this._lastLivePaintMs=0,this._onCanvasClick=t=>{if(this.paintMode)return;const e=this._ledAtEvent(t);if(e<0)return;const i=this._segmentForLed(e);i<0||this.dispatchEvent(new CustomEvent("segment-select",{detail:{segmentId:i,ledIndex:e},bubbles:!0,composed:!0}))},this._onPaintPointerDown=t=>{if(!this.paintMode)return;this._painting=!0,t.target.setPointerCapture(t.pointerId);const e=this._ledAtEvent(t);this._emitPaintStroke(e)},this._onPaintPointerMove=t=>{if(!this.paintMode||!this._painting)return;const e=this._ledAtEvent(t);this._emitPaintStroke(e)},this._onPaintPointerUp=t=>{if(this.paintMode){this._painting=!1;try{t.target.releasePointerCapture(t.pointerId)}catch{}}},this._onPaintPointerLeave=()=>{this._painting=!1},this._onCanvasMove=t=>{const e=this._ledAtEvent(t);e!==this._hoverLed&&(this._hoverLed=e,this._schedPaint())},this._onCanvasLeave=()=>{this._hoverLed>=0&&(this._hoverLed=-1,this._schedPaint())}}setFrame(t){if(t&&(!this.paintMode||this.paintLivePreview)){if(this.paintMode&&this.paintLivePreview){const t=performance.now();if(t-this._lastLivePaintMs<50)return;this._lastLivePaintMs=t}this._pixels=kt(t,this.pixelCount),this._status="live",this._schedPaint()}}setPaintPixels(t){this._paintPixels=t??void 0,this.paintMode&&(this._status=t?"paint":"ready"),this._schedPaint()}setStatus(t){this._status=t,this.requestUpdate()}async refresh(){await this._resolvePositions()}onPoweredConnect(){this._resolvePositions(),this._syncLiveSubscription()}onPoweredDisconnect(){this._raf&&cancelAnimationFrame(this._raf),this._raf=0,this._resizeObs?.disconnect(),this._unsubLive?.(),this._unsubLive=void 0}_wantsLiveStream(){return!this.externalLive||this.paintMode&&this.paintLivePreview}_syncLiveSubscription(){this._wantsLiveStream()?this._unsubLive||this._attachLiveStream():(this._unsubLive?.(),this._unsubLive=void 0)}updated(t){super.updated(t),(t.has("connection")||t.has("controllerId")||t.has("layoutId")||t.has("fixtureId"))&&(this._resolvePositions(),this._syncLiveSubscription()),(t.has("externalLive")||t.has("paintLivePreview")||t.has("paintMode"))&&this._syncLiveSubscription(),(t.has("selectedSegId")||t.has("highlightSegIds")||t.has("segments")||t.has("paintMode"))&&(this._schedPaint(),t.has("paintMode")&&this._canvas&&(this._canvas.style.cursor=this.paintMode?"crosshair":"pointer",this.paintMode&&queueMicrotask(()=>this._onResize())))}firstUpdated(){if(this._canvas=this.renderRoot.querySelector("canvas")??void 0,this._canvas){this._ctx=this._canvas.getContext("2d",{alpha:!0})??void 0,this._resizeObs=new ResizeObserver(()=>this._onResize()),this._resizeObs.observe(this._canvas);const t=this._canvas;t.style.touchAction="none",t.addEventListener("pointerdown",this._onPaintPointerDown),t.addEventListener("pointermove",this._onPaintPointerMove),t.addEventListener("pointerup",this._onPaintPointerUp),t.addEventListener("pointerleave",this._onPaintPointerLeave),t.addEventListener("click",this._onCanvasClick),t.addEventListener("mousemove",this._onCanvasMove),t.addEventListener("mouseleave",this._onCanvasLeave),this.addUnsub(()=>{t.removeEventListener("pointerdown",this._onPaintPointerDown),t.removeEventListener("pointermove",this._onPaintPointerMove),t.removeEventListener("pointerup",this._onPaintPointerUp),t.removeEventListener("pointerleave",this._onPaintPointerLeave),t.removeEventListener("click",this._onCanvasClick),t.removeEventListener("mousemove",this._onCanvasMove),t.removeEventListener("mouseleave",this._onCanvasLeave)})}this._onResize()}_emitPaintStroke(t){if(t<0)return;const e=Math.max(1,Math.floor(this.paintBrushSize/2)),i=[];for(let s=-e;s<=e;s++){const e=t+s;e>=0&&e<this.pixelCount&&i.push(e)}i.length&&this.dispatchEvent(new CustomEvent("paint-stroke",{detail:{led:t,leds:i},bubbles:!0,composed:!0}))}_segmentForLed(t){for(const e of this.segments){const i=e.start??0,s=e.stop??e.len??this.pixelCount;if(t>=i&&t<s)return e.id}return 1===this.segments.length?this.segments[0].id:-1}_ledInSegment(t,e){if(e<0)return!1;const i=this.segments.find(t=>t.id===e);if(!i)return!1;const s=i.start??0,r=i.stop??i.len??this.pixelCount;return t>=s&&t<r}_ledAtEvent(t){const e=this._hitTest(t.clientX,t.clientY);return e?.led??-1}_logicalCanvasSize(){const t=this._canvas;if(!t)return{w:0,h:0};const e=Math.min(2,window.devicePixelRatio||1);return{w:t.width/e,h:t.height/e}}_pointerToLogical(t,e){const i=this._canvas;if(!i)return null;const s=i.getBoundingClientRect();if(s.width<1||s.height<1)return null;const{w:r,h:n}=this._logicalCanvasSize();return[(t-s.left)/s.width*r,(e-s.top)/s.height*n]}_hitTest(t,e){if(!this._canvas||0===this._positions.length)return null;const i=this._pointerToLogical(t,e);if(!i)return null;const[s,r]=i,{w:n,h:o}=this._logicalCanvasSize(),a=this._layoutMap(n,o);if(!a)return null;const{toCanvas:l,hitR:h}=a;let c=null,d=h*h;for(const t of this._positions){const[e,i]=l(t.x,t.y),n=e-s,o=i-r,a=n*n+o*o;a<d&&(d=a,c=t)}return c}_positionExtents(){if(0===this._positions.length)return null;let t=1/0,e=-1/0,i=1/0,s=-1/0;for(const r of this._positions)r.x<t&&(t=r.x),r.x>e&&(e=r.x),r.y<i&&(i=r.y),r.y>s&&(s=r.y);return{minX:t,maxX:e,minY:i,maxY:s,rangeX:e-t||1,rangeY:s-i||1}}_applyLayoutAspectCss(){if(!this.paintMode)return void this.style.removeProperty("--wled-layout-aspect");const t=this._positionExtents();if(!t)return void this.style.removeProperty("--wled-layout-aspect");const e=Math.max(.35,Math.min(3.5,t.rangeX/t.rangeY));this.style.setProperty("--wled-layout-aspect",String(e)),queueMicrotask(()=>this._onResize())}_layoutMap(t,e){const i=this._positionExtents();if(!i)return null;const{minX:s,minY:r,rangeX:n,rangeY:o}=i,a=this.dotRadius,l=this.paintMode?2*a:3*a,h=(t-2*l)/n,c=(e-2*l)/o,d=Math.min(h,c),p=this.compact?Math.max(8,3*a):Math.max(3.5,1.75*a);return{toCanvas:(t,e)=>[l+(t-s)*d,l+(e-r)*d],hitR:Math.max(10,2.5*p),lineW:p}}_accentStroke(){return getComputedStyle(this).getPropertyValue("--wled-accent").trim()||"#03a9f4"}_surfaceFill(){return getComputedStyle(this).getPropertyValue("--wled-surface").trim()||"#1e1e1e"}_onResize(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect();if(e.width<2||e.height<2)return;const i=Math.min(1200,Math.max(1,Math.floor(e.width))),s=Math.min(600,Math.max(1,Math.floor(e.height))),r=Math.min(2,window.devicePixelRatio||1),n=Math.floor(i*r),o=Math.floor(s*r);if(t.width!==n||t.height!==o){t.width=n,t.height=o;const e=this._ctx;e&&e.setTransform(r,0,0,r,0,0),this._schedPaint()}}async _resolvePositions(){if(this.connection&&this.controllerId&&this.fixtureId)try{if(this.layoutId){const t=await ks(this.connection,this.controllerId,this.layoutId);if(t){this._bgLayer=Ks(t),this._loadBackgroundImage();const e=t.fixtures??[],i=this.fixtureId?e.find(t=>String(t.id??"")===this.fixtureId):e[0];this._closed=Boolean(i?.closed??!1)}}this._positions=await Ps(this.connection,this.controllerId,this.fixtureId,this.layoutId||void 0),this._applyLayoutAspectCss(),queueMicrotask(()=>this._onResize()),this._schedPaint()}catch{this._positions=[],this._applyLayoutAspectCss()}}_loadBackgroundImage(){const t=this._bgLayer?.url;t?vr(t).then(t=>{this._bgImage=t,this._schedPaint()},()=>{this._bgImage=null}):this._bgImage=null}_attachLiveStream(){this.connection&&this.controllerId&&!this._unsubLive&&(this._unsubLive=Ct(this.connection,this.controllerId,t=>{this.setFrame(t)}),this.addUnsub(()=>{this._unsubLive?.(),this._unsubLive=void 0}))}_schedPaint(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this._paint()}))}_rgbForLed(t,e){if(!t)return[80,80,80];const i=4*e;return[t[i],t[i+1],t[i+2]]}_paint(){const t=this._ctx,e=this._canvas;if(!t||!e)return;const{w:i,h:s}=this._logicalCanvasSize();if(i<1||s<1)return;t.clearRect(0,0,i,s),t.fillStyle=this._surfaceFill(),t.fillRect(0,0,i,s),this._bgImage?.complete&&this._bgLayer&&Ys(t,i,s,this._bgImage,this._bgLayer);const r=this.paintMode&&this._paintPixels&&!this.paintLivePreview?this._paintPixels:this._pixels,n=[...this._positions].sort((t,e)=>t.led-e.led),o=this.dotRadius,a=this._layoutMap(i,s);if(n.length>0&&a){const{toCanvas:e,lineW:i}=a,s=this.remote.state.disableBloom;if(!this._showDots){t.lineCap="round",t.lineJoin="round",t.lineWidth=i;const o=(n,o)=>{const[a,l]=e(n.x,n.y),[h,c]=e(o.x,o.y),[d,p,u]=this._rgbForLed(r,n.led);!s&&(d>10||p>10||u>10)?(t.shadowColor=`rgba(${d},${p},${u},0.55)`,t.shadowBlur=i*(this.compact?2:1.5)):t.shadowBlur=0,t.strokeStyle=`rgb(${d},${p},${u})`,t.beginPath(),t.moveTo(a,l),t.lineTo(h,c),t.stroke()};for(let t=0;t<n.length-1;t++)o(n[t],n[t+1]);this._closed&&n.length>=2&&o(n[n.length-1],n[0]),t.shadowBlur=0}if(this._showDots){for(const{x:i,y:a,led:l}of n){const[n,h]=e(i,a),[c,d,p]=this._rgbForLed(r,l);!s&&(c>10||d>10||p>10)?(t.shadowColor=`rgba(${c},${d},${p},0.7)`,t.shadowBlur=2.5*o):t.shadowBlur=0,t.beginPath(),t.arc(n,h,o,0,2*Math.PI),t.fillStyle=`rgb(${c},${d},${p})`,t.fill()}t.shadowBlur=0}this.paintMode?this._hoverLed>=0&&this._paintBrushHover(t,n,e):this._paintSegmentSelection(t,n,e,i)}else{const e=this.pixelCount,n=(i-8)/e,a=s/2;for(let i=0;i<e;i++){let e=80,s=80,l=80;if(r){const t=4*i;e=r[t],s=r[t+1],l=r[t+2]}t.beginPath(),t.arc(4+i*n+n/2,a,o,0,2*Math.PI),t.fillStyle=`rgb(${e},${s},${l})`,t.fill()}}}_paintBrushHover(t,e,i){const s=e.find(t=>t.led===this._hoverLed);if(!s)return;const[r,n]=i(s.x,s.y),o=Math.max(8,2.5*this.dotRadius);t.save(),t.strokeStyle="rgba(255, 255, 255, 0.9)",t.lineWidth=2,t.beginPath(),t.arc(r,n,o,0,2*Math.PI),t.stroke(),t.strokeStyle=this._accentStroke(),t.lineWidth=1.5,t.beginPath(),t.moveTo(r-o-4,n),t.lineTo(r+o+4,n),t.moveTo(r,n-o-4),t.lineTo(r,n+o+4),t.stroke(),t.restore()}_highlightIds(){if(this.highlightSegIds.length)return[...new Set(this.highlightSegIds)];if(this.selectedSegId>=0)return[this.selectedSegId];if(this._hoverLed>=0){const t=this._segmentForLed(this._hoverLed);return t>=0?[t]:[]}return[]}_paintSegmentSelection(t,e,i,s){const r=this._highlightIds();if(!r.length||0===this.segments.length)return;const n=this._accentStroke(),o=Math.max(1.25,Math.min(2.5,.45*s));t.save(),t.lineCap="round",t.lineJoin="round",t.shadowBlur=0;for(const s of r){const r=e.filter(t=>this._ledInSegment(t.led,s)).sort((t,e)=>t.led-e.led);if(r.length<2)continue;const[a,l]=i(r[0].x,r[0].y);t.beginPath(),t.moveTo(a,l);for(let e=1;e<r.length;e++){const[s,n]=i(r[e].x,r[e].y);t.lineTo(s,n)}t.strokeStyle="rgba(0, 0, 0, 0.55)",t.lineWidth=o+1.5,t.stroke(),t.strokeStyle=n,t.lineWidth=o,t.stroke()}t.restore()}render(){const t=this.paintMode?"Paint on layout — drag along the fixture path":this.compact?"Live layout preview — tap the strip to select a segment":"LED geometry preview — positions mapped from fixture layout",e=!this.paintMode&&"live"!==this._status&&"paint"!==this._status;return W`
      <div class="preview-shell ${this.compact?"compact":""} ${this.paintMode?"paint":""}">
        ${this.compact||this.paintMode?null:W`
              <label class="mode-toggle">
                <input
                  type="checkbox"
                  .checked=${this._showDots}
                  @change=${t=>{this._showDots=t.target.checked,this._schedPaint()}}
                />
                LED dots
              </label>
            `}
        <div class="wrap" role="img" aria-label=${t}>
          <canvas></canvas>
          ${e?W`<span class="overlay">${this._status}</span>`:null}
          ${this.paintMode&&0===this._positions.length?W`<span class="overlay">No layout — create one in Layout view</span>`:null}
        </div>
      </div>
    `}static{this.styles=[...mt,o`
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
    `]}};t([ct({attribute:!1})],ma.prototype,"connection",void 0),t([ct()],ma.prototype,"controllerId",void 0),t([ct()],ma.prototype,"layoutId",void 0),t([ct()],ma.prototype,"fixtureId",void 0),t([ct({type:Number})],ma.prototype,"pixelCount",void 0),t([ct({type:Number})],ma.prototype,"dotRadius",void 0),t([ct({type:Boolean,reflect:!0})],ma.prototype,"compact",void 0),t([ct({type:Number})],ma.prototype,"heightPx",void 0),t([ct({type:Boolean})],ma.prototype,"externalLive",void 0),t([ct({type:Boolean,reflect:!0})],ma.prototype,"paintMode",void 0),t([ct({type:Boolean})],ma.prototype,"paintLivePreview",void 0),t([ct({type:Number})],ma.prototype,"paintBrushSize",void 0),t([ct({type:Array})],ma.prototype,"segments",void 0),t([ct({type:Number})],ma.prototype,"selectedSegId",void 0),t([ct({type:Array})],ma.prototype,"highlightSegIds",void 0),t([dt()],ma.prototype,"_positions",void 0),t([dt()],ma.prototype,"_status",void 0),t([dt()],ma.prototype,"_showDots",void 0),t([dt()],ma.prototype,"_closed",void 0),ma=t([bt("wled-geometry-preview")],ma);let va=class extends vt{constructor(){super(...arguments),this.controllerId="",this._layouts=[],this._status="Loading layouts…",this._busy=!1,this._viewMode="list",this._activeLayoutId="",this._activeFixtureId="",this._activePixelCount=210,this._onDesignerSave=async()=>{await this._load();const t=this.renderRoot.querySelector("wled-geometry-preview");await(t?.refresh()),this._activeLayoutId&&await this._applySegments(this._activeLayoutId)}}onPoweredConnect(){this._load(),this._attachLive()}onPoweredDisconnect(){this._liveUnsub?.(),this._liveUnsub=void 0}updated(t){super.updated(t),(t.has("connection")||t.has("controllerId"))&&(this._load(),this._attachLive())}_attachLive(){this._liveUnsub?.(),this.connection&&this.controllerId&&(this._liveUnsub=Ct(this.connection,this.controllerId,t=>{this._forwardFrame(t)}))}_forwardFrame(t){const e=this.renderRoot.querySelector("wled-geometry-preview");e?.setFrame(t)}async _load(){if(this.connection&&this.controllerId)try{this._layouts=await Ss(this.connection,this.controllerId),this._status=0===this._layouts.length?"No layouts yet — use the button below to seed the kitchen-island template.":`${this._layouts.length} layout(s) saved`}catch(t){this._status=t instanceof Error?t.message:String(t)}}async _seedKitchenIsland(){if(this.connection&&this.controllerId){this._busy=!0;try{await Cs(this.connection,this.controllerId,(t=this.controllerId,{id:"kitchen-island",controller_id:t,name:"Kitchen island",pixel_count:210,fixtures:[{id:"kitchen-island",name:"Kitchen island",kind:"polyline",closed:!0,points:[[0,0],[100,0],[110,10],[200,10]],anchors:[{led:0,vertex_index:0},{led:85,vertex_index:1},{led:96,vertex_index:2},{led:186,vertex_index:3}]}]})),await this._load()}finally{this._busy=!1}var t}}async _applySegments(t){if(this.connection&&this.controllerId){this._busy=!0;try{await async function(t,e,i,s){return ws(t,{type:"wled_studio/layout_to_segments",controller_id:e,layout_id:i,fixture_id:s})}(this.connection,this.controllerId,t),this._status="WLED segments updated from layout anchors"}catch(t){this._status=t instanceof Error?t.message:String(t)}finally{this._busy=!1}}}_activeLayoutLabel(){const t=this._layouts.find(t=>String(t.id)===this._activeLayoutId);return t?Ms(t):this._activeLayoutId}_openDesigner(t){this._activeLayoutId=String(t.id);const e=t.fixtures[0];this._activeFixtureId=e?String(e.id??"fixture-0"):"fixture-0",this._activePixelCount=t.pixel_count??210,this._viewMode="designer"}render(){return"designer"===this._viewMode?this._renderDesigner():this._renderList()}_renderList(){return W`
      <div class="layout-view">
        <p class="status-line">${this._status}</p>

        <div class="actions">
          <button
            class="primary"
            ?disabled=${this._busy}
            @click=${()=>this._seedKitchenIsland()}
          >
            Add kitchen-island template
          </button>
        </div>

        ${this._layouts.length>0?W`
              <ul class="layout-list">
                ${this._layouts.map(t=>W`
                    <li class="layout-item">
                      <div class="layout-info">
                        <span class="layout-name">${Ms(t)}</span>
                        <span class="meta">${t.pixel_count} px</span>
                      </div>
                      <div class="layout-btns">
                        <button
                          class="small"
                          ?disabled=${this._busy}
                          @click=${()=>this._openDesigner(t)}
                        >
                          Edit
                        </button>
                        <button
                          class="small"
                          ?disabled=${this._busy}
                          @click=${()=>this._applySegments(String(t.id))}
                        >
                          Apply segments
                        </button>
                      </div>
                    </li>
                  `)}
              </ul>
            `:null}
      </div>
    `}_renderDesigner(){return W`
      <div class="designer-view">
        <div class="designer-header">
          <button
            class="back"
            @click=${()=>{this._viewMode="list"}}
          >
            ← Back to layouts
          </button>
          <span class="layout-id-label">${this._activeLayoutLabel()}</span>
          <button
            class="small"
            ?disabled=${this._busy}
            @click=${()=>this._applySegments(this._activeLayoutId)}
          >
            Apply segments to WLED
          </button>
        </div>

        <wled-layout-designer
          class="designer-main"
          .connection=${this.connection}
          .hass=${this.hass}
          controllerId=${this.controllerId}
          layoutId=${this._activeLayoutId}
          fixtureId=${this._activeFixtureId}
          pixelCount=${this._activePixelCount}
          @layout-saved=${this._onDesignerSave}
        >
          <div slot="preview" class="preview-slot">
            <div class="preview-label">Live geometry preview</div>
            <wled-geometry-preview
              .connection=${this.connection}
              controllerId=${this.controllerId}
              layoutId=${this._activeLayoutId}
              fixtureId=${this._activeFixtureId}
              pixelCount=${this._activePixelCount}
            ></wled-geometry-preview>
          </div>
        </wled-layout-designer>

        ${this._status?W`<p class="status-line">${this._status}</p>`:null}
      </div>
    `}static{this.styles=[...mt,o`
      /* ── list view ─────────────────────────────────────── */
      .layout-view {
        padding: 8px 0;
      }
      .status-line {
        margin: 0 0 10px;
        font-size: 0.85rem;
        opacity: 0.8;
      }
      .actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 12px;
      }
      .layout-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .layout-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 8px;
        background: var(--card-background-color, #1f2937);
      }
      .layout-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .layout-name {
        font-weight: 500;
      }
      .meta {
        font-size: 0.78rem;
        opacity: 0.65;
      }
      .layout-btns {
        display: flex;
        gap: 6px;
      }

      /* ── designer view ──────────────────────────────────── */
      .designer-view {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: calc(100dvh - 8rem);
        overflow: hidden;
      }
      .designer-header {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }
      .layout-id-label {
        flex: 1;
        font-size: 0.85rem;
        opacity: 0.7;
        font-family: monospace;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .designer-main {
        flex: 1;
        min-height: min(78vh, calc(100dvh - 9rem));
        max-height: min(78vh, calc(100dvh - 9rem));
        overflow: hidden;
      }
      .preview-slot {
        display: flex;
        flex-direction: column;
        gap: 6px;
        height: 100%;
        min-height: 0;
      }
      .preview-label {
        font-size: 0.8rem;
        opacity: 0.65;
        flex-shrink: 0;
      }
      .preview-slot wled-geometry-preview {
        flex: 1;
        min-height: 0;
      }

      /* ── shared buttons ─────────────────────────────────── */
      .primary,
      .small,
      .back {
        padding: 8px 14px;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
        font-size: 0.85rem;
        white-space: nowrap;
      }
      .small {
        padding: 5px 10px;
        font-size: 0.78rem;
      }
      .back {
        background: transparent;
        border: 1px solid var(--divider-color, #374151);
        color: var(--primary-text-color);
      }
      .primary:disabled,
      .small:disabled {
        opacity: 0.45;
        cursor: default;
      }
    `]}};function ya(t,e){return Math.max(0,Math.min(255,Math.round(t*e)))}function ba(t,e,i){return`rgb(${t}, ${e}, ${i})`}function xa(t){return function(t){if(!t.length)return"linear-gradient(135deg, var(--wled-surface-elevated), var(--wled-surface))";if(1===t.length){const e=t[0];return`linear-gradient(135deg, ${e}, color-mix(in srgb, ${e} 55%, rgb(0 0 0)))`}const e=t.map((e,i)=>`${e} ${Math.round(i/(t.length-1)*100)}%`).join(", ");return`linear-gradient(135deg, ${e})`}(function(t){const e=t??{};if(!1===e.on)return["rgb(26, 26, 26)","rgb(13, 13, 13)"];const i="number"==typeof e.bri&&Number.isFinite(e.bri)?Math.max(0,Math.min(255,e.bri)):128,s=(Array.isArray(e.seg)?e.seg:[])[0]??{};if(!1===s.on)return["rgb(26, 26, 26)","rgb(13, 13, 13)"];const r=("number"==typeof s.bri&&Number.isFinite(s.bri)?Math.max(0,Math.min(255,s.bri)):i)/255,n=[];if(Array.isArray(s.col))for(const t of s.col.slice(0,3)){const[e,i,s]=Nt(t);n.push(ba(ya(e,r),ya(i,r),ya(s,r)))}if(!n.length){const t=ya(255,r),e=ya(220,r);n.push(ba(t,e,Math.min(255,e-20)))}return n}(t.wled_state))}function wa(t){return Boolean(t.scene_thumb_url?.trim())}t([ct({attribute:!1})],va.prototype,"connection",void 0),t([ct({attribute:!1})],va.prototype,"hass",void 0),t([ct()],va.prototype,"controllerId",void 0),t([dt()],va.prototype,"_layouts",void 0),t([dt()],va.prototype,"_status",void 0),t([dt()],va.prototype,"_busy",void 0),t([dt()],va.prototype,"_viewMode",void 0),t([dt()],va.prototype,"_activeLayoutId",void 0),t([dt()],va.prototype,"_activeFixtureId",void 0),t([dt()],va.prototype,"_activePixelCount",void 0),va=t([bt("wled-view-layout")],va);let Sa=class extends vt{constructor(){super(...arguments),this.segments=[],this.selectedIds=[],this.segmentEntities=[],this.hint="Tap segments to toggle",this._dragSegId=null}render(){return this.segments.length?W`
      <div class="block">
        <p class="hint">${this.hint}</p>
        <div class="bar" role="group" aria-label="Segments">
          ${this.segments.map(t=>W`
              <button
                type="button"
                class="btn ${this.selectedIds.includes(t.id)?"on":""} ${this._dragSegId===t.id?"dragging":""}"
                aria-pressed=${this.selectedIds.includes(t.id)}
                @click=${()=>this._toggle(t.id)}
                @dragover=${t=>{t.preventDefault()}}
                @drop=${e=>this._onDrop(t.id,e)}
              >
                <span
                  class="drag-handle"
                  draggable="true"
                  aria-hidden="true"
                  title="Drag to reorder (preview only)"
                  @dragstart=${e=>this._onDragStart(t.id,e)}
                  @dragend=${()=>{this._dragSegId=null}}
                  @click=${t=>t.stopPropagation()}
                  @mousedown=${t=>t.stopPropagation()}
                >
                  <ha-icon icon="mdi:drag-vertical"></ha-icon>
                </span>
                <span class="btn-label">${Wt(t,this.segmentEntities)}</span>
              </button>
            `)}
        </div>
      </div>
    `:null}_toggle(t){this.dispatchEvent(new CustomEvent("segment-toggle",{detail:{id:t},bubbles:!0,composed:!0}))}_onDragStart(t,e){this._dragSegId=t,e.dataTransfer?.setData("text/plain",String(t)),e.dataTransfer&&(e.dataTransfer.effectAllowed="move")}_onDrop(t,e){e.preventDefault();const i=this._dragSegId;this._dragSegId=null,null!==i&&i!==t&&this.dispatchEvent(new CustomEvent("segment-reorder",{detail:{fromId:i,toId:t},bubbles:!0,composed:!0}))}static{this.styles=[...mt,o`
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
    `]}};t([ct({type:Array})],Sa.prototype,"segments",void 0),t([ct({type:Array})],Sa.prototype,"selectedIds",void 0),t([ct({type:Array})],Sa.prototype,"segmentEntities",void 0),t([ct()],Sa.prototype,"hint",void 0),t([dt()],Sa.prototype,"_dragSegId",void 0),Sa=t([bt("wled-segment-bar")],Sa);let ka=class extends vt{constructor(){super(...arguments),this.controllerId="",this.scenes=[],this.disabled=!1,this._recents=[],this._visibleCount=6}onPoweredConnect(){this._reload(),this._ro=new ResizeObserver(()=>this._measure()),this.addUnsub(()=>this._ro?.disconnect())}updated(t){t.has("controllerId")&&this._reload();const e=this.renderRoot.querySelector(".recent-row");e&&e!==this._rowEl&&(this._rowEl=e,this._ro?.observe(e),this._measure())}reload(){this._reload()}_reload(){var t;this._recents=(t=this.controllerId)?Ji(Xi)[t]??[]:[]}_measure(){const t=this._rowEl;if(!t)return;const e=ts(t.clientWidth,104,8,8);e!==this._visibleCount&&(this._visibleCount=e)}_sceneFor(t){return this.scenes.find(e=>e.id===t)}render(){const t=this._recents.filter(t=>this.scenes.some(e=>e.id===t.id)).slice(0,this._visibleCount);return t.length?W`
      <div class="block">
        <span class="label">Recent scenes</span>
        <div class="recent-row" role="group" aria-label="Recent scenes">
          ${t.map(t=>{const e=this._sceneFor(t.id),i=e?.name??t.name,s=e?xa(e):"linear-gradient(135deg, var(--wled-surface-elevated), var(--wled-surface))",r=e&&wa(e)?e.scene_thumb_url.trim():"";return W`
              <button
                type="button"
                class="chip"
                aria-label=${`Apply scene ${i}`}
                ?disabled=${this.disabled}
                @click=${()=>this.dispatchEvent(new CustomEvent("scene-select",{detail:{sceneId:t.id},bubbles:!0,composed:!0}))}
              >
                <span class="chip-visual">
                  <span
                    class="chip-gradient"
                    style="background:${s}"
                    aria-hidden="true"
                  ></span>
                  ${r?W`<img
                        class="chip-thumb"
                        src=${r}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        @error=${t=>{t.target.style.display="none"}}
                      />`:null}
                  <span class="chip-scrim">
                    <span class="chip-name">${i}</span>
                  </span>
                </span>
              </button>
            `})}
        </div>
      </div>
    `:null}static{this.styles=[...mt,o`
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
    `]}};t([ct()],ka.prototype,"controllerId",void 0),t([ct({type:Array})],ka.prototype,"scenes",void 0),t([ct({type:Boolean})],ka.prototype,"disabled",void 0),t([dt()],ka.prototype,"_recents",void 0),t([dt()],ka.prototype,"_visibleCount",void 0),ka=t([bt("wled-recent-scenes-row")],ka);let Ca=class extends vt{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this._scenes=[],this._status="Loading scenes…",this._busy=!1,this._captureName="",this._segments=[],this._applySegIds=[]}onPoweredConnect(){this._load()}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._load()}onPoweredDisconnect(){this._applyAbort?.abort(),this._applyAbort=void 0}async _load(){if(this.connection&&this.controllerId){this._status="Loading scenes…";try{const[t,e]=await Promise.all([Et(this.connection,this.controllerId),Tt(this.connection,this.controllerId)]);if(this._scenes=t,this._snapshot=e,this._segments=[...e.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length&&!this._applySegIds.length)this._applySegIds=this._segments.map(t=>t.id);else{const t=new Set(this._segments.map(t=>t.id));this._applySegIds=this._applySegIds.filter(e=>t.has(e)),!this._applySegIds.length&&this._segments.length&&(this._applySegIds=this._segments.map(t=>t.id))}this._status=0===this._scenes.length?"No scenes yet — capture the current look or use starter scenes after reload.":""}catch{this._status="Could not load scenes."}}}selectSegmentFromPreview(t){this._toggleApplySeg(t)}_toggleApplySeg(t){let e=Bt(this._applySegIds,t);e.length||(e=[t]),this._applySegIds=e}_isLoading(){return"Loading scenes…"===this._status}_renderSkeleton(){return W`
      <div class="skeleton-load" aria-busy="true" aria-label="Loading scenes">
        <wled-skeleton height="2.5rem" width="100%"></wled-skeleton>
        <div class="sk-grid">
          ${Array.from({length:4},()=>W`<wled-skeleton height="120px"></wled-skeleton>`)}
        </div>
      </div>
    `}render(){const t=this.compact;return W`
      <div class="wrap ${t?"compact":""}">
        <header class="head">
          ${t?W`<span class="card-label">Scenes</span>`:W`
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
              @input=${t=>{this._captureName=t.target.value}}
            />
            <button
              type="button"
              class="primary"
              ?disabled=${this._busy||!this._captureName.trim()}
              @click=${()=>this._capture()}
            >
              ${t?"Save":"Save current look"}
            </button>
          </div>
        </header>

        ${this._isLoading()?this._renderSkeleton():this._status?W`<p class="status">${this._status}</p>`:null}

        ${!t&&this._segments.length?W`
              <wled-segment-bar
                .segments=${this._segments}
                .selectedIds=${this._applySegIds}
                .segmentEntities=${this._snapshot?.segment_entities??[]}
                hint="Apply scenes to highlighted segments"
                @segment-toggle=${t=>this._toggleApplySeg(t.detail.id)}
              ></wled-segment-bar>
            `:null}

        <wled-recent-scenes-row
          .controllerId=${this.controllerId}
          .scenes=${this._scenes}
          ?disabled=${this._busy}
          @scene-select=${t=>{const e=this._scenes.find(e=>e.id===t.detail.sceneId);e&&this._apply(e)}}
        ></wled-recent-scenes-row>

        ${this._conflict?W`
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
          ${this._scenes.map(t=>this._sceneTile(t))}
        </div>
      </div>
    `}_sceneTile(t){const e=t.transition_ms??2500,i=xa(t),s=wa(t)?t.scene_thumb_url.trim():"";return W`
      <article class="tile" role="listitem">
        <button
          type="button"
          class="tile-main"
          aria-label=${`Apply scene ${t.name}`}
          ?disabled=${this._busy}
          @click=${()=>this._apply(t)}
        >
          <div class="tile-visual">
            <div
              class="tile-gradient"
              style="background:${i}"
              aria-hidden="true"
            ></div>
            ${s?W`<img
                  class="tile-thumb"
                  src=${s}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  @error=${t=>{t.target.style.display="none"}}
                />`:null}
            <div class="tile-scrim">
              <span class="tile-name">${t.name}</span>
              ${t.seeded?W`<span class="badge">Starter</span>`:null}
              <span class="tile-meta">${(e/1e3).toFixed(1)}s fade</span>
            </div>
          </div>
        </button>
        ${t.seeded?null:W`
              <button
                type="button"
                class="icon-btn"
                aria-label=${`Delete ${t.name}`}
                ?disabled=${this._busy}
                @click=${()=>this._delete(t)}
              >
                <ha-icon icon="mdi:delete-outline"></ha-icon>
              </button>
            `}
      </article>
    `}_recentScenesRow(){return this.renderRoot.querySelector("wled-recent-scenes-row")??null}async _apply(t){if(this.connection){this._busy=!0,this._applyAbort?.abort(),this._applyAbort=new AbortController;try{const e=this._segments.length>0&&this._applySegIds.length===this._segments.length;await async function(t,e,i,s){await Pt(t);const r={type:"wled_studio/scene_apply",schema_version:1,controller_id:e,scene_id:i,transition_ms:s?.transitionMs,segment_ids:s?.segmentIds?.length?s.segmentIds:void 0};return s?.signal?new Promise((e,i)=>{const n=()=>i(new DOMException("Aborted","AbortError"));s.signal?.aborted?n():(s.signal?.addEventListener("abort",n,{once:!0}),t.sendMessagePromise(r).then(t=>{s.signal?.removeEventListener("abort",n),e(t.state??{})}).catch(t=>{s.signal?.removeEventListener("abort",n),i(t)}))}):(await t.sendMessagePromise(r)).state??{}}(this.connection,this.controllerId,t.id,{signal:this._applyAbort.signal,segmentIds:e?void 0:[...this._applySegIds]}),function(t,e,i){if(!t)return[];const s=Ji(Xi),r=(s[t]??[]).filter(t=>t.id!==e);r.unshift({id:e,name:i}),s[t]=r.slice(0,10),Zi(Xi,s),s[t]}(this.controllerId,t.id,t.name),this._recentScenesRow()?.reload(),await this._load(),wt(this,`Applied ${t.name}`),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(t){if("AbortError"!==t.name){wt(this,`Apply failed: ${t.message||t.message||"error"}`)}}finally{this._busy=!1}}}async _capture(){if(!this.connection)return;const t=this._captureName.trim();if(t){this._busy=!0;try{const e=await At(this.connection,this.controllerId,t);this._captureName="",wt(this,`Saved ${e.name}`),await this._load()}catch(t){wt(this,`Save failed: ${t.message||"error"}`)}finally{this._busy=!1}}}async _delete(t){if(this.connection&&confirm(`Delete scene "${t.name}"?`)){this._busy=!0;try{await async function(t,e,i){await Mt(t,{type:"wled_studio/scene_delete",controller_id:e,scene_id:i})}(this.connection,this.controllerId,t.id),wt(this,`Deleted ${t.name}`),await this._load()}catch{wt(this,"Delete failed")}finally{this._busy=!1}}}_dismissConflict(){this._conflict=void 0,this._load()}async _overwriteConflict(){if(!this.connection||!this._conflict)return;const t=this._scenes.find(t=>t.id===this._conflict?.id);if(t){this._busy=!0;try{await async function(t,e,i,s){try{return(await Mt(t,{type:"wled_studio/scene_save",controller_id:e,scene:i,if_match_etag:s?.ifMatchEtag})).scene??i}catch(t){const e=t;if("conflict"===e?.code&&e.data?.scene)throw new It(e.data.scene,String(e.data.etag??e.message??""));throw t}}(this.connection,this.controllerId,t),this._conflict=void 0,wt(this,"Scene overwritten"),await this._load()}catch(t){t instanceof It&&(this._conflict=t.remote)}finally{this._busy=!1}}}static{this.styles=[...mt,o`
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
    `]}};t([ct({attribute:!1})],Ca.prototype,"connection",void 0),t([ct()],Ca.prototype,"controllerId",void 0),t([ct({type:Boolean})],Ca.prototype,"compact",void 0),t([dt()],Ca.prototype,"_scenes",void 0),t([dt()],Ca.prototype,"_status",void 0),t([dt()],Ca.prototype,"_busy",void 0),t([dt()],Ca.prototype,"_conflict",void 0),t([dt()],Ca.prototype,"_captureName",void 0),t([dt()],Ca.prototype,"_segments",void 0),t([dt()],Ca.prototype,"_applySegIds",void 0),t([dt()],Ca.prototype,"_snapshot",void 0),Ca=t([bt("wled-view-scenes")],Ca);let Pa=class extends vt{constructor(){super(...arguments),this._controllers=[],this._status="Loading…",this._cardUrl="",this._cardToast=""}onPoweredConnect(){this._load()}async _load(){if(this.connection)try{const t=await $t(this.connection);this._controllers=t.map(t=>({entry_id:String(t.entry_id??""),title:t.title,host:t.host,pixel_count:t.pixel_count,fw_ver:t.fw_ver,master_entity_id:t.master_entity_id})),this._status=0===this._controllers.length?"No WLED Studio controllers. Add the integration under Settings → Devices & services.":""}catch{this._status="Could not list controllers."}}render(){return W`
      <div class="wrap">
        <h2>Devices</h2>
        <p class="hint">
          WLED Studio attaches to your stock WLED integration. Select a controller in the sidebar
          views (Layout, Scenes, Segments).
        </p>
        ${this._status?W`<p>${this._status}</p>`:null}
        <ul class="list">
          ${this._controllers.map(t=>W`
              <li class="card">
                <strong>${t.title??t.entry_id}</strong>
                <span>${t.host??"—"}</span>
                <span>${t.pixel_count??"?"} LEDs</span>
                ${t.fw_ver?W`<span class="dim">WLED ${t.fw_ver}</span>`:null}
                ${t.master_entity_id?W`<code class="entity">${t.master_entity_id}</code>`:null}
              </li>
            `)}
        </ul>

        <section class="card-section">
          <h3>Lovelace card</h3>
          <p class="hint">
            The dashboard card is registered automatically on startup. If it is missing from
            <strong>Settings → Dashboards → Resources</strong>, register it here or open
            <strong>Settings → Devices & services → WLED Studio → Configure</strong>.
          </p>
          ${this._cardUrl?W`<code class="resource-url">${this._cardUrl}</code>`:null}
          <button
            type="button"
            class="primary"
            ?disabled=${!this.connection}
            @click=${()=>this._registerCard()}
          >
            Register card resource
          </button>
          ${this._cardToast?W`<p class="toast" role="status">${this._cardToast}</p>`:null}
        </section>
      </div>
    `}async _registerCard(){if(this.connection){this._cardToast="";try{const{url:t}=await async function(t){return{url:(await t.sendMessagePromise({type:"wled_studio/register_lovelace_resource",schema_version:1})).url??""}}(this.connection);this._cardUrl=t,this._cardToast=t?"Card resource registered. Hard-refresh dashboards (Ctrl+F5).":"Registration sent — check HA logs if the card still does not appear."}catch(t){this._cardToast=t instanceof Error?t.message:String(t)}}}static{this.styles=[...mt,o`
      .wrap {
        max-width: 640px;
      }
      h2 {
        margin: 0 0 8px;
      }
      .hint {
        opacity: 0.75;
        font-size: 0.9rem;
      }
      .list {
        list-style: none;
        padding: 0;
        margin: 16px 0 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .card-section {
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px solid var(--divider-color);
      }
      .card-section h3 {
        margin: 0 0 8px;
        font-size: 1rem;
      }
      .resource-url {
        display: block;
        margin: 8px 0;
        font-size: 0.75rem;
        word-break: break-all;
      }
      .primary {
        padding: 8px 14px;
        border-radius: 8px;
        border: none;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
      }
      .toast {
        font-size: 0.85rem;
        color: var(--primary-color);
        margin-top: 8px;
      }
      .card {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 14px;
        border-radius: 10px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
      }
      .dim {
        opacity: 0.65;
        font-size: 0.85rem;
      }
      .entity {
        font-size: 0.8rem;
        opacity: 0.8;
      }
    `]}};t([ct({attribute:!1})],Pa.prototype,"connection",void 0),t([dt()],Pa.prototype,"_controllers",void 0),t([dt()],Pa.prototype,"_status",void 0),t([dt()],Pa.prototype,"_cardUrl",void 0),t([dt()],Pa.prototype,"_cardToast",void 0),Pa=t([bt("wled-view-devices")],Pa);const $a="wled_studio.effect_defaults",Ia="wled_studio.effect_library";function Ma(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function Ea(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function Aa(t,e){if(!t)return null;const i=function(t){return Ma($a)[t]??{}}(t)[String(e)];return i??null}function La(t){return t?Ma(Ia)[t]??[]:[]}const Ta={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let Fa=class extends vt{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this._segments=[],this._editIds=[],this._focusSegId=0,this._filter="",this._status="Loading effects…",this._mergeActive=!1,this._library=[],this._saveCopyOpen=!1,this._saveCopyName="",this._saveSceneOpen=!1,this._saveSceneName="",this._needsMergeApply=!1}onPoweredConnect(){this._mergeActive=te(this.controllerId),this._library=La(this.controllerId),this._load()}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._load()}async _refreshPalettePreviews(){if(this.connection&&this.controllerId&&this._snapshot)try{const t=await Rt(this.connection,this.controllerId);this._snapshot={...this._snapshot,palette_previews:t}}catch{}}_onPaletteCatalogChanged(){this._refreshPalettePreviews()}async _load(){if(this.connection&&this.controllerId){this._status="Loading effects…";try{if(this._snapshot=await Tt(this.connection,this.controllerId),this._segments=[...this._snapshot.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length){const t=this._segments.map(t=>t.id),e=this._editIds.filter(e=>t.includes(e));this._editIds=e.length?e:t,t.includes(this._focusSegId)||(this._focusSegId=this._segments[0].id)}const t=this._pixelCount();this._mergeActive=te(this.controllerId);const e=ee(this._segments,t);this._needsMergeApply=this._mergeActive&&this._segments.length>1&&!e,this._mergeActive&&e&&(this._editIds=ae(this._segments),this._focusSegId=this._editIds[0]??0),await this._refreshMeta(),this._status="",this._emitTargetsChanged()}catch{this._status="Could not load device state."}}}get highlightSegmentIds(){return this._targetIds()}_emitTargetsChanged(){this.dispatchEvent(new CustomEvent("segment-targets-changed",{detail:{segmentId:this._focusSegId,editIds:[...this._editIds],mergeActive:this._mergeActive,highlightIds:this.highlightSegmentIds},bubbles:!0,composed:!0}))}async confirmMergeApply(){await this._applyMergeOnDevice(this._pixelCount()),this._needsMergeApply=!1,await this._load()}async _applyMergeOnDevice(t){if(!this.connection||!this.controllerId||!this._snapshot)return;re(this.controllerId,this._segments,t);const e=oe(this._segments,t,this._editIds.length?this._editIds:void 0);await Ft(this.connection,this.controllerId,e,{fullResponse:!0}),ie(this.controllerId,!0),this._snapshot=await Tt(this.connection,this.controllerId),this._segments=[...this._snapshot.segments??[]].sort((t,e)=>t.id-e.id)}_activeSeg(){return this._segments.find(t=>t.id===this._focusSegId)??this._segments[0]}async _refreshMeta(){const t=this._activeSeg();this.connection&&this.controllerId&&t&&(this._meta=await Dt(this.connection,this.controllerId,t.fx??0))}selectSegmentFromPreview(t){if(this._mergeActive)return this._focusSegId=0,this._refreshMeta(),void this._emitTargetsChanged();this._editIds.includes(t)||(this._editIds=[...this._editIds,t].sort((t,e)=>t-e)),this._focusSegId=t,this._refreshMeta(),this._emitTargetsChanged()}_onSegToggle(t){if(this._mergeActive)return;let e=Bt(this._editIds,t.detail.id);e.length||(e=[t.detail.id]),this._editIds=e,this._focusSegId=t.detail.id,this._refreshMeta(),this._emitTargetsChanged()}_pixelCount(){const t=this._snapshot?.info?.leds;return Number(t?.count)||210}_targetIds(){if(this._mergeActive){const t=ae(this._segments);return t.length?t:[0]}return this._editIds.length?this._editIds:[this._focusSegId]}_onMergeChanged(){this._mergeActive=te(this.controllerId),this._load(),this._emitTargetsChanged()}_effectName(t){return Object.entries(this._snapshot?.effects_by_name??{}).find(([,e])=>e===t)?.[0]??`Effect ${t}`}_sliderValuesFromSeg(){const t=this._activeSeg();return t?function(t){const e={};for(const i of["sx","ix","c1","c2","c3","o1","o2","o3"]){const s=t[i];"number"==typeof s&&(e[i]=s)}return e}(t):{}}_saveAsDefault(){const t=this._activeSeg();t&&this.controllerId&&(!function(t,e,i){if(!t)return;const s=Ma($a),r={...s[t]??{}};r[String(e)]={...i},s[t]=r,Ea($a,s)}(this.controllerId,t.fx??0,this._sliderValuesFromSeg()),wt(this,`Saved default options for ${this._effectName(t.fx??0)}`))}_openSaveCopy(){const t=this._activeSeg();t&&(this._saveCopyName=`${this._effectName(t.fx??0)} copy`,this._saveCopyOpen=!0)}_confirmSaveCopy(){const t=this._activeSeg();t&&this.controllerId&&this._saveCopyName.trim()&&(!function(t,e){const i={...e,id:`fx-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,savedAt:Date.now()},s=Ma(Ia),r=[i,...s[t]??[]];s[t]=r.slice(0,48),Ea(Ia,s)}(this.controllerId,{name:this._saveCopyName.trim(),effectId:t.fx??0,effectName:this._effectName(t.fx??0),pinned:!0,...this._sliderValuesFromSeg()}),this._library=La(this.controllerId),this._saveCopyOpen=!1,wt(this,`Saved "${this._saveCopyName.trim()}" to library`))}_openSaveScene(){const t=this._activeSeg();t&&(this._saveSceneName=`${this._effectName(t.fx??0)} scene`,this._saveSceneOpen=!0)}async _confirmSaveScene(){if(this.connection&&this.controllerId&&this._saveSceneName.trim())try{await At(this.connection,this.controllerId,this._saveSceneName.trim()),this._saveSceneOpen=!1,wt(this,`Scene "${this._saveSceneName.trim()}" saved`)}catch(t){wt(this,t instanceof Error?t.message:String(t))}}async _applyLibraryEntry(t){if(!this.connection||!this._snapshot)return;const e=this._targetIds(),i={fx:t.effectId,on:!0};for(const e of["sx","ix","c1","c2","c3","o1","o2","o3"]){const s=t[e];"number"==typeof s&&(i[e]=s)}const s=Gt(e,i,this._segments);await Ft(this.connection,this.controllerId,s),await this._load(),wt(this,`Applied ${t.name}`)}_isLoading(){return"Loading effects…"===this._status}_renderSkeleton(){return W`
      <div class="skeleton-load" aria-busy="true" aria-label="Loading effects">
        <wled-skeleton height="2rem" width="min(100%, 360px)"></wled-skeleton>
        <div class="sk-grid">
          ${Array.from({length:6},()=>W`<wled-skeleton height="72px"></wled-skeleton>`)}
        </div>
      </div>
    `}render(){const t=this._snapshot,e=this._activeSeg(),i=e?.fx??0,s=this._meta,r=s?.sliders??{},n=this._targetIds().length,o=this.compact;return W`
      <div class="wrap ${o?"compact":""}">
        ${o?null:W`
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
        ${this._isLoading()?this._renderSkeleton():this._status?W`<p class="status">${this._status}</p>`:null}

        ${this._needsMergeApply?W`
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
                    @click=${()=>{ie(this.controllerId,!1),this._mergeActive=!1,this._needsMergeApply=!1,this._emitTargetsChanged()}}
                  >
                    Keep ${this._segments.length} segments
                  </button>
                </div>
              </div>
            `:null}

        ${this.connection&&this.controllerId&&t&&e?W`
              <wled-effect-merge-toggle
                ?compact=${o}
                class=${o?"compact-merge":""}
                .connection=${this.connection}
                .controllerId=${this.controllerId}
                .segments=${this._segments}
                .editIds=${this._editIds}
                .pixelCount=${this._pixelCount()}
                @merge-changed=${this._onMergeChanged}
              ></wled-effect-merge-toggle>
            `:null}
        ${this._segments.length&&!this._mergeActive?W`
              <wled-segment-bar
                .segments=${this._segments}
                .selectedIds=${this._editIds}
                .segmentEntities=${t?.segment_entities??[]}
                hint=${o?"Tap segments to target effects":"Apply effects to highlighted segments"}
                @segment-toggle=${this._onSegToggle}
              ></wled-segment-bar>
            `:null}

        ${t&&e?W`
              <div class="effects-workspace ${o?"compact":""}">
                <div class="effects-toolbar">
                  <input
                    class="search"
                    type="search"
                    placeholder="Search effects…"
                    aria-label="Filter effects"
                    .value=${this._filter}
                    @input=${t=>{this._filter=t.target.value}}
                  />
                </div>
                <div class="effects-scroll">
                  <wled-effect-chips
                    scroll-pane
                    .hass=${this.hass}
                    .controllerId=${this.controllerId}
                    .fwVer=${t.fw_ver??t.info?.ver??""}
                    .thumbBasenames=${t.thumb_basenames??[]}
                    .effectsByName=${t.effects_by_name??{}}
                    .soundFlags=${t.sound_flags??[]}
                    .selectedFx=${i}
                    .filter=${this._filter}
                    .tileGrid=${o}
                    .selectedPalette=${e.pal??0}
                    .paletteAware=${!1!==s?.palette_enabled}
                    @effect-select=${t=>this._onFx(t.detail.effectId,t.detail.toggledOff)}
                  ></wled-effect-chips>
                </div>

                <div class="effects-tuning">
                  ${!1!==s?.palette_enabled&&Object.keys(t.palettes_by_name??{}).length?W`
                        <wled-palette-chips
                          ?compact=${o}
                          ?collapsible=${o}
                          .palettesByName=${t.palettes_by_name??{}}
                          .palettePreviews=${t.palette_previews??{}}
                          .selectedPal=${e.pal??0}
                          .deviceHost=${t.host??""}
                          @palette-select=${t=>{this._segPatch({pal:t.detail.paletteId})}}
                          @palette-catalog-changed=${()=>this._onPaletteCatalogChanged()}
                        ></wled-palette-chips>
                      `:null}

                  <wled-segment-advanced
                    .segment=${e}
                    .meta=${s}
                    ?compact=${o}
                    @segment-patch=${t=>{this._segPatch(t.detail)}}
                  ></wled-segment-advanced>

                  <div class="sliders ${o?"compact":""}">
                    ${Object.entries(Ta).map(([t,i])=>{if(!r[t])return null;const s=e[t];return W`
                        <label>
                          ${i}
                          <ha-slider
                            min="0"
                            max="255"
                            step="1"
                            .value=${s??128}
                            @change=${e=>this._slider(t,e)}
                          ></ha-slider>
                        </label>
                      `})}
                  </div>

                  ${Object.keys(r).length?W`
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

                  ${this._saveCopyOpen?W`
                        <div class="inline-form">
                          <input
                            type="text"
                            placeholder="Preset name"
                            .value=${this._saveCopyName}
                            @input=${t=>{this._saveCopyName=t.target.value}}
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

                  ${this._saveSceneOpen?W`
                        <div class="inline-form">
                          <input
                            type="text"
                            placeholder="Scene name"
                            .value=${this._saveSceneName}
                            @input=${t=>{this._saveSceneName=t.target.value}}
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

                  ${this._library.length?W`
                        <div class="library-block">
                          <span class="library-label">Library</span>
                          <div class="library-row">
                            ${this._library.slice(0,o?6:12).map(t=>W`
                                <button
                                  type="button"
                                  class="library-chip"
                                  @click=${()=>{this._applyLibraryEntry(t)}}
                                >
                                  ${t.name}
                                </button>
                              `)}
                          </div>
                        </div>
                      `:null}

                  <p class="meta">
                    ${n} segment${1===n?"":"s"} · effect
                    #${i}
                    ${!1!==s?.palette_enabled&&void 0!==e.pal?W` · palette #${e.pal}`:null}
                  </p>
                </div>
              </div>
            `:null}
      </div>
    `}async _onFx(t,e){if(!this.connection||!this._snapshot)return;const i=this._targetIds(),s=Gt(i,{fx:t,on:!0},this._segments);try{await Ft(this.connection,this.controllerId,s);for(const e of i){const i=this._segments.findIndex(t=>t.id===e);if(i>=0){const e=[...this._segments];e[i]={...e[i],fx:t,on:!0},this._segments=e}}this._focusSegId=i[0],await this._refreshMeta();const r=Object.entries(this._snapshot.effects_by_name).find(([,e])=>e===t)?.[0]??(e?"Solid":`#${t}`),n=Aa(this.controllerId,t);if(n&&Object.keys(n).length){const t=Gt(i,n,this._segments);await Ft(this.connection,this.controllerId,t)}wt(this,e?`Solid on ${i.length} segment(s)`:`Applied ${r}`),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(t){wt(this,`Apply failed: ${t.message||"error"}`)}}_slider(t,e){const i=Number(e.target.value);this._segPatch({[t]:i})}async _segPatch(t){if(!this.connection||!this._snapshot)return;const e=this._targetIds(),i=Gt(e,t,this._segments);try{await Ft(this.connection,this.controllerId,i)}catch(t){return void wt(this,`Apply failed: ${t.message||"error"}`)}const s=[...this._segments];for(const i of e){const e=s.findIndex(t=>t.id===i);e>=0&&(s[e]={...s[e],...t})}this._segments=s}static{this.styles=[...mt,o`
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
      .compact-merge {
        display: block;
      }
      :host(.compact-merge) .merge-row,
      .compact-merge .merge-row {
        padding: 8px 10px;
        margin-bottom: 8px;
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
    `]}};function Da(t=0,e=[255,51,102,0]){return{on:!0,bri:255,fx:t,pal:0,col:e,sx:128,ix:128,c1:128,c2:128,c3:128,o1:!1,o2:!1,o3:!1}}function Ra(t="off"){return{mode:t,on:"off"!==t,bri:"off"===t?0:128,fx:0,pal:0,col:"custom"===t?[72,72,72,0]:[0,0,0,0],sx:128,ix:128,c1:128,c2:128,c3:128,o1:!1,o2:!1,o3:!1}}function Na(t,e){const i=e.Solid??0;return t.fx===i?"color":"effect"}async function Oa(t,e){await Pt(t);try{return await t.sendMessagePromise({...e,schema_version:1})}catch(t){throw new Error(Ht(t))}}async function Ua(t,e,i,s){const r=function(t){let e="";for(let i=0;i<t.length;i+=32768){const s=t.subarray(i,i+32768);e+=String.fromCharCode(...s)}return btoa(e)}(i),n=s?.brush,o=s?.fill,a=n?Na(n,s?.effectsByName??{}):"color";await Oa(t,{type:"wled_studio/paint_frame",controller_id:e,data:r,rgbw:s?.rgbw??!0,paint_mode:a,...s?.touched?.length?{touched:s.touched}:{},...n?{brush:n}:{},...o?{fill:o}:{},..."effect"===a&&n?{effect_id:n.fx}:{}})}async function za(t,e,i=!0){await Oa(t,{type:"wled_studio/paint_stop",controller_id:e,commit:i})}function Ga(t,e,i){const s=i?4:3,r=new Uint8ClampedArray(4*e);for(let n=0;n<e;n++){const e=n*s,o=4*n;r[o]=t[e]??0,r[o+1]=t[e+1]??0,r[o+2]=t[e+2]??0,r[o+3]=i?t[e+3]??0:255}return r}t([ct({attribute:!1})],Fa.prototype,"connection",void 0),t([ct()],Fa.prototype,"controllerId",void 0),t([ct({type:Boolean,reflect:!0})],Fa.prototype,"compact",void 0),t([dt()],Fa.prototype,"_snapshot",void 0),t([dt()],Fa.prototype,"_segments",void 0),t([dt()],Fa.prototype,"_editIds",void 0),t([dt()],Fa.prototype,"_focusSegId",void 0),t([dt()],Fa.prototype,"_filter",void 0),t([dt()],Fa.prototype,"_status",void 0),t([dt()],Fa.prototype,"_meta",void 0),t([dt()],Fa.prototype,"_mergeActive",void 0),t([dt()],Fa.prototype,"_library",void 0),t([dt()],Fa.prototype,"_saveCopyOpen",void 0),t([dt()],Fa.prototype,"_saveCopyName",void 0),t([dt()],Fa.prototype,"_saveSceneOpen",void 0),t([dt()],Fa.prototype,"_saveSceneName",void 0),t([dt()],Fa.prototype,"_needsMergeApply",void 0),Fa=t([bt("wled-view-effects")],Fa);const Ba={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let Wa=class extends vt{constructor(){super(...arguments),this.controllerId="",this.heading="Brush",this.showOnToggle=!1,this._loadingEffects=!0,this._error="",this._effectFilter=""}onPoweredConnect(){this._load()}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._load(),t.has("settings")&&void 0!==this.settings?.fx&&this._refreshMeta()}async _load(){if(this.connection&&this.controllerId){this._loadingEffects=!0,this._error="";try{this._snapshot=await Tt(this.connection,this.controllerId),await this._refreshMeta()}catch(t){this._error=Ht(t)}finally{this._loadingEffects=!1}}}async _refreshMeta(){this.connection&&this.controllerId&&this.settings&&(this._meta=await Dt(this.connection,this.controllerId,this.settings.fx))}_emit(t){const e={...this.settings,...t};this.dispatchEvent(new CustomEvent("settings-change",{detail:e,bubbles:!0,composed:!0}))}_onColor(t){const{rgb:e,white:i}=t.detail,s={col:[e[0],e[1],e[2],i]};"Fill look"!==this.heading&&(s.fx=jt(this._snapshot?.effects_by_name??{})),this._emit(s)}async _onEffectSelect(t){this._emit({fx:t.detail.effectId}),await this._refreshMeta()}_slider(t,e){const i=e.target.value,s=t.startsWith("o")?Number(i)>0:Number(i);this._emit({[t]:s})}render(){if(!this.settings)return null;const t=Nt(this.settings.col),e=this._meta,i=e?.sliders??{},s=this._snapshot?.rgbwm??0;return W`
      <div class="block">
        <h3 class="heading">${this.heading}</h3>
        ${this._error?W`<p class="err">${this._error}</p>`:null}
        ${this.showOnToggle?W`
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
          .rgb=${[t[0],t[1],t[2]]}
          .white=${t[3]}
          .awm=${s}
          .showWhite=${(this._snapshot?.led_order??0)>0}
          @color-change=${this._onColor}
        ></wled-color-wheel-rgbw>

        ${this._loadingEffects?W`<p class="muted">Loading effects…</p>`:W`
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
                ${Object.entries(Ba).map(([t,e])=>{if(!i[t])return null;const s=this.settings[t];return"boolean"==typeof s?W`
                      <label class="row">
                        <input
                          type="checkbox"
                          .checked=${s}
                          @change=${e=>this._slider(t,e)}
                        />
                        ${e}
                      </label>
                    `:W`
                    <label>
                      ${e}
                      <ha-slider
                        min="0"
                        max="255"
                        step="1"
                        .value=${s}
                        @change=${e=>this._slider(t,e)}
                      ></ha-slider>
                    </label>
                  `})}
              </div>
            `}
      </div>
    `}static{this.styles=[...mt,o`
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
    `]}};t([ct({attribute:!1})],Wa.prototype,"connection",void 0),t([ct({attribute:!1})],Wa.prototype,"hass",void 0),t([ct()],Wa.prototype,"controllerId",void 0),t([ct()],Wa.prototype,"heading",void 0),t([ct({attribute:!1})],Wa.prototype,"settings",void 0),t([ct({type:Boolean})],Wa.prototype,"showOnToggle",void 0),t([dt()],Wa.prototype,"_loadingEffects",void 0),t([dt()],Wa.prototype,"_error",void 0),t([dt()],Wa.prototype,"_snapshot",void 0),t([dt()],Wa.prototype,"_meta",void 0),t([dt()],Wa.prototype,"_effectFilter",void 0),Wa=t([bt("wled-paint-settings")],Wa);let Ha=class extends vt{constructor(){super(...arguments),this.controllerId="",this.embedMode=!1,this.embedLayoutId="",this.embedFixtureId="",this.embedPixelCount=0,this._pixelCount=210,this._rgbw=!0,this._active=!1,this._brush=Da(),this._fill=Ra("off"),this._brushSize=6,this._status="",this._warn="",this._effectsByName={},this._layouts=[],this._layoutId="",this._fixtureId="",this._buffer=null,this._previewPixels=null,this._touched=new Set,this._flushInFlight=!1,this._flushQueued=!1,this._flushColor=function(t,e){let i,s,r=0;const n=(...n)=>{s=n;const o=Date.now(),a=o-r;if(a>=e)return r=o,i&&(clearTimeout(i),i=void 0),void t(...n);i||(i=setTimeout(()=>{i=void 0,r=Date.now(),s&&t(...s)},e-a))};return n.cancel=()=>{i&&clearTimeout(i),i=void 0,s=void 0},n}(()=>{this._flushNow()},20),this._flushEffect=Lt(()=>{this._flushNow()},60,180)}_previewEl(){return this.embedMode?this._externalPreview:this._internalPreview}get brushSize(){return this._brushSize}get paintLivePreview(){return this._brushIsEffect()}get paintExternalLive(){return!this._brushIsEffect()}bindExternalPreview(t){this._externalPreview=t,t&&this._active&&t.setStatus("live paint"),t&&this._previewPixels?this._syncPreviewPixels():t&&t.refresh()}handleExternalPaintStroke(t){this._onPaintStroke(t)}_emitPaintConfig(){this.dispatchEvent(new CustomEvent("paint-config-change",{bubbles:!0,composed:!0}))}_brushIsEffect(){return"effect"===Na(this._brush,this._effectsByName)}updated(t){(t.has("_fill")||t.has("_brush")||t.has("_buffer")||t.has("_layoutId"))&&(this._applyFillToBuffer(),this._brushIsEffect()?this._previewEl()?.setPaintPixels(null):this._syncPreviewPixels()),(t.has("_brush")||t.has("_brushSize"))&&(this.requestUpdate(),this._emitPaintConfig()),this.embedMode&&(t.has("embedLayoutId")||t.has("embedFixtureId")||t.has("embedPixelCount"))&&(this.embedLayoutId&&(this._layoutId=this.embedLayoutId),this.embedFixtureId&&(this._fixtureId=this.embedFixtureId),this.embedPixelCount>0&&(this._pixelCount=this.embedPixelCount),this._previewEl()?.refresh())}async onPoweredConnect(){if(this.connection&&this.controllerId)try{const[t,e]=await Promise.all([Tt(this.connection,this.controllerId),Ss(this.connection,this.controllerId)]),i=t.info?.leds;i?.count&&(this._pixelCount=i.count),"boolean"==typeof i?.rgbw&&(this._rgbw=i.rgbw),this._effectsByName=t.effects_by_name??{};const s=t.segments?.[0];if(s){const t=s.col?.[0],e=Array.isArray(t)&&t.length>=3?[t[0],t[1],t[2],t[3]??0]:void 0;this._brush=Da(s.fx??0,e)}this._layouts=e,this.embedMode&&this.embedLayoutId?(this._layoutId=this.embedLayoutId,this._fixtureId=this.embedFixtureId||"fixture-0",this.embedPixelCount>0&&(this._pixelCount=this.embedPixelCount)):this._applyLayout(e[0]),this._allocBuffer(),this._status=this.embedMode?this._layoutId?"Drag on the strip preview to paint":"Create a layout in Studio → Layout first":e.length?"Drag on the layout to paint":"Create a layout in the Layout tab first"}catch(t){this._status=Ht(t)}}_applyLayout(t){if(!t)return this._layoutId="",void(this._fixtureId="");this._layoutId=t.id;const e=t.fixtures[0];this._fixtureId=e?String(e.id??"fixture-0"):"fixture-0",t.pixel_count&&(this._pixelCount=t.pixel_count),this._previewEl()?.refresh()}_onLayoutPick(t){const e=t.target.value,i=this._layouts.find(t=>t.id===e);this._applyLayout(i),this._allocBuffer()}async onPoweredDisconnect(){if(this._flushColor.cancel(),this._flushEffect.cancel(),this._active&&this.connection&&this.controllerId)try{await za(this.connection,this.controllerId,!1)}catch{}this._active=!1,this._touched.clear()}async _ensureSession(){if(this._active||!this.connection||!this.controllerId)return this._active;try{const t=await async function(t,e){return Oa(t,{type:"wled_studio/paint_start",controller_id:e})}(this.connection,this.controllerId);return this._active=!0,this._touched.clear(),this._warn=t.wifi_sleep_warning??"",t.pixel_count&&(this._pixelCount=t.pixel_count),"boolean"==typeof t.rgbw&&(this._rgbw=t.rgbw),this._allocBuffer(),this._previewEl()?.setStatus("live paint"),this._status="Live paint",!0}catch(t){return this._status=Ht(t),!1}}_allocBuffer(){const t=this._rgbw?4:3;this._buffer=new Uint8Array(this._pixelCount*t),this._previewPixels=null,this._applyFillToBuffer(),this._syncPreviewPixels()}_syncPreviewPixels(t){const e=this._previewEl();if(!this._buffer||!e)return;if(!this._previewPixels||this._previewPixels.length!==4*this._pixelCount)this._previewPixels=Ga(this._buffer,this._pixelCount,this._rgbw);else if(t?.length){const e=this._rgbw?4:3,i=this._previewPixels;for(const s of t){const t=s*e,r=4*s;i[r]=this._buffer[t]??0,i[r+1]=this._buffer[t+1]??0,i[r+2]=this._buffer[t+2]??0,i[r+3]=this._rgbw?this._buffer[t+3]??0:255}}else this._previewPixels=Ga(this._buffer,this._pixelCount,this._rgbw);e.setPaintPixels(this._previewPixels)}_brushRgb(){const t=Math.max(0,Math.min(255,this._brush.bri))/255;return[Math.round(this._brush.col[0]*t),Math.round(this._brush.col[1]*t),Math.round(this._brush.col[2]*t)]}async cancelLiveIfActive(){if(!this._active||!this.connection||!this.controllerId)return!1;this._flushColor.cancel(),this._flushEffect.cancel();try{await za(this.connection,this.controllerId,!1),this._status="Live paint ended — layout segments restored",this._previewEl()?.setStatus("ready")}catch(t){return this._status=Ht(t),!1}return this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels(),this.dispatchEvent(new CustomEvent("wled-paint-ended",{bubbles:!0,composed:!0})),this._emitPaintConfig(),!0}_writeLed(t,e){if(!this._buffer)return;const i=t*(this._rgbw?4:3);this._buffer[i]=e[0],this._buffer[i+1]=e[1],this._buffer[i+2]=e[2],this._rgbw&&(this._buffer[i+3]=0)}_applyFillToBuffer(){if(!this._buffer)return;const t="off"===this._fill.mode?[0,0,0]:"custom"===this._fill.mode?[this._fill.col[0],this._fill.col[1],this._fill.col[2]]:[40,40,40];for(let e=0;e<this._pixelCount;e++)this._touched.has(e)||this._writeLed(e,t)}_scheduleFlush(){this._brushIsEffect()?this._flushEffect():this._flushColor()}_strokeLeds(t){if(!this._buffer||!t.length)return;if(this._brushIsEffect()){for(const e of t)this._touched.add(e);this._previewEl()?.setPaintPixels(null)}else{const e=this._brushRgb();for(const i of t)this._writeLed(i,e),this._touched.add(i);this._syncPreviewPixels(t)}this._scheduleFlush()}async _onPaintStroke(t){await this._ensureSession()&&this._strokeLeds(t.detail.leds)}async _flushNow(){if(this._active&&this.connection&&this._buffer)if(this._flushInFlight)this._flushQueued=!0;else{this._flushInFlight=!0;try{await Ua(this.connection,this.controllerId,this._buffer,{rgbw:this._rgbw,touched:[...this._touched],brush:this._brush,fill:this._fill,effectsByName:this._effectsByName});const t=this._brushIsEffect()?"effect (device preview)":"color";this._status=`Live paint · ${this._touched.size} LEDs · ${t} · fill: ${this._fill.mode}`}catch(t){this._status=Ht(t)}finally{this._flushInFlight=!1,this._flushQueued&&(this._flushQueued=!1,this._flushNow())}}}_onBrushChange(t){this._brush=t.detail,this._emitPaintConfig(),this._active&&this._scheduleFlush()}_onFillChange(t){this._fill={...t.detail,mode:this._fill.mode},this._applyFillToBuffer(),this._syncPreviewPixels(),this._active&&this._scheduleFlush()}_onFillModeChange(t){this._fill=Ra(t),this._applyFillToBuffer(),this._syncPreviewPixels(),this._active&&this._flushNow()}async _commit(){if(this.connection&&this._active){this._flushColor.cancel(),this._flushEffect.cancel(),await this._flushNow();try{await za(this.connection,this.controllerId,!0),this._status="Committed to WLED",this._previewEl()?.setStatus("committed")}catch(t){this._status=Ht(t)}this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels()}}async _cancel(){if(this.connection&&this._active){this._flushColor.cancel(),this._flushEffect.cancel();try{await za(this.connection,this.controllerId,!1),this._status="Live mode released",this._previewEl()?.setStatus("ready")}catch(t){this._status=Ht(t)}this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels()}}render(){const t=Boolean(this._layoutId),e=this.embedMode;return W`
      <section class="paint ${e?"compact":""}">
        ${e?null:W`
              <p class="lead">
                Paint on your saved fixture layout (${this._pixelCount} LEDs). Unpainted
                areas use the fill below (default <strong>Off</strong>).
              </p>
            `}
        ${this._warn?W`<p class="warn">${this._warn}</p>`:null}

        ${!this.embedMode&&this._layouts.length>1?W`
              <label class="layout-pick">
                Layout
                <select .value=${this._layoutId} @change=${this._onLayoutPick}>
                  ${this._layouts.map(t=>W`<option value=${t.id}>${t.name||t.id}</option>`)}
                </select>
              </label>
            `:t?null:W`
                <p class="hint warn-layout">
                  No layout saved —
                  ${this.embedMode?W`open <strong>Studio → Layout</strong> first.`:W`open <strong>Layout</strong> and save a fixture path first.`}
                </p>
              `}

        ${this.embedMode?null:W`
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
            ${"custom"===this._fill.mode?W`
                  <wled-paint-settings
                    .connection=${this.connection}
                    .hass=${this.hass}
                    .controllerId=${this.controllerId}
                    heading="Fill look"
                    .settings=${this._fill}
                    .showOnToggle=${!0}
                    @settings-change=${this._onFillChange}
                  ></wled-paint-settings>
                `:"preserve"===this._fill.mode?W`<p class="hint">Unpainted LEDs keep colors from before live paint.</p>`:W`<p class="hint">Unpainted LEDs commit as off.</p>`}
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
    `}static{this.styles=[...mt,o`
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
    `]}};t([ct({attribute:!1})],Ha.prototype,"connection",void 0),t([ct({attribute:!1})],Ha.prototype,"hass",void 0),t([ct()],Ha.prototype,"controllerId",void 0),t([ct({type:Boolean,attribute:"embed-mode"})],Ha.prototype,"embedMode",void 0),t([ct()],Ha.prototype,"embedLayoutId",void 0),t([ct()],Ha.prototype,"embedFixtureId",void 0),t([ct({type:Number})],Ha.prototype,"embedPixelCount",void 0),t([dt()],Ha.prototype,"_pixelCount",void 0),t([dt()],Ha.prototype,"_rgbw",void 0),t([dt()],Ha.prototype,"_active",void 0),t([dt()],Ha.prototype,"_brush",void 0),t([dt()],Ha.prototype,"_fill",void 0),t([dt()],Ha.prototype,"_brushSize",void 0),t([dt()],Ha.prototype,"_status",void 0),t([dt()],Ha.prototype,"_warn",void 0),t([dt()],Ha.prototype,"_effectsByName",void 0),t([dt()],Ha.prototype,"_layouts",void 0),t([dt()],Ha.prototype,"_layoutId",void 0),t([dt()],Ha.prototype,"_fixtureId",void 0),t([pt("wled-geometry-preview")],Ha.prototype,"_internalPreview",void 0),Ha=t([bt("wled-view-paint")],Ha);let Va=class extends vt{constructor(){super(...arguments),this.controllerId="",this._thumbStatus="",this._capturing=!1}onPoweredConnect(){const t=this.hass?.connection;if(!t?.subscribeEvents)return;const e=t.subscribeEvents(t=>{const e=t.data??{},i=String(e.status??"");"started"===i?(this._thumbStatus=`Capturing 0/${e.total??"?"}`,this._capturing=!0):"progress"===i?(this._thumbStatus=`${e.done}/${e.total}: ${e.name}`,this._capturing=!0):"complete"===i||"cancelled"===i?(this._thumbStatus="complete"===i?"Thumbnails complete — open Effects to view tiles":"Cancelled",this._capturing=!1):"error"===i&&(this._thumbStatus=String(e.message??"Error"),this._capturing=!1),this.requestUpdate()},"wled_studio_thumb_progress");this.addUnsub(()=>{e.then(t=>t?.())})}async _recapture(){if(this.connection&&this.controllerId){this._capturing=!0,this._thumbStatus="Starting capture…";try{await async function(t,e){await Oa(t,{type:"wled_studio/thumb_capture_start",controller_id:e})}(this.connection,this.controllerId)}catch(t){this._capturing=!1,this._thumbStatus=Ht(t)}}}async _cancelCapture(){this.connection&&this.controllerId&&(await async function(t,e){await Oa(t,{type:"wled_studio/thumb_capture_cancel",controller_id:e})}(this.connection,this.controllerId),this._capturing=!1,this._thumbStatus="Cancel requested")}_clearOnboard(){localStorage.removeItem("wled_studio.onboarded"),this._thumbStatus="Onboarding flag cleared — reload Studio"}render(){return W`
      <section class="settings">
        <h2>Settings</h2>
        <div class="card">
          <h3>Effect thumbnails</h3>
          <p>Captures ~2s WebP loops per effect (several minutes total).</p>
          <div class="row">
            <button
              type="button"
              class="primary"
              ?disabled=${this._capturing}
              @click=${()=>this._recapture()}
            >
              Recapture thumbnails
            </button>
            ${this._capturing?W`
                  <button type="button" @click=${()=>this._cancelCapture()}>
                    Cancel
                  </button>
                `:null}
          </div>
          <p class="status">${this._thumbStatus}</p>
        </div>
        <div class="card">
          <h3>Onboarding</h3>
          <button type="button" @click=${()=>this._clearOnboard()}>
            Reset first-run wizard
          </button>
        </div>
      </section>
    `}static{this.styles=[...mt,o`
      .settings h2 {
        margin: 0 0 12px;
      }
      .card {
        padding: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        margin-bottom: 12px;
      }
      .card h3 {
        margin: 0 0 8px;
        font-size: 1rem;
      }
      .row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .status {
        font-size: 0.85rem;
        opacity: 0.8;
      }
    `]}};t([ct({attribute:!1})],Va.prototype,"connection",void 0),t([ct()],Va.prototype,"controllerId",void 0),t([dt()],Va.prototype,"_thumbStatus",void 0),t([dt()],Va.prototype,"_capturing",void 0),Va=t([bt("wled-view-settings")],Va);const ja=["Off","Normal","Vivid","Lazy"],qa=["Off","Send","Receive"],Ka=["Linear","Square root","Logarithmic"],Ya=["Off","GEQ pulse","WaveSin","Sweep"];let Xa=class extends vt{constructor(){super(...arguments),this.controllerId="",this._cfg={},this._info={},this._status="idle",this._busy=!1}onPoweredConnect(){this._load()}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._load()}async _load(){if(this.connection&&this.controllerId){this._status="loading";try{const t=(await Tt(this.connection,this.controllerId)).state,e=t?.AudioReactive??{};this._cfg={inputLevel:"number"==typeof e.inputLevel?e.inputLevel:128,squelch:"number"==typeof e.squelch?e.squelch:10,gain:"number"==typeof e.gain?e.gain:40,AGC:"number"==typeof e.AGC?e.AGC:2,sync:"number"==typeof e.sync?e.sync:0,port:"number"==typeof e.port?e.port:11988,freqDist:"number"==typeof e.freqDist?e.freqDist:0,limiterRise:"number"==typeof e.limiterRise?e.limiterRise:100,limiterFall:"number"==typeof e.limiterFall?e.limiterFall:400,PalAR:!0===e.PalAR},this._info=e,this._status="ready"}catch(t){this._status=t instanceof Error?t.message:"error"}}}async _patch(t){if(this.connection&&this.controllerId&&!this._busy){this._busy=!0,this._cfg={...this._cfg,...t};try{await async function(t,e,i){return Ft(t,e,{AudioReactive:i})}(this.connection,this.controllerId,t)}catch(t){wt(this,t instanceof Error?t.message:String(t))}finally{this._busy=!1}}}_slider(t,e,i,s,r=""){const n=this._cfg[t]??i;return W`
      <label class="ctrl">
        <span class="ctrl-label">${e}<span class="ctrl-val">${n}${r}</span></span>
        <ha-slider
          min=${i}
          max=${s}
          step="1"
          .value=${n}
          @change=${e=>{const i=Number(e.target.value);this._patch({[t]:i})}}
        ></ha-slider>
      </label>
    `}_select(t,e,i){const s=this._cfg[t]??0;return W`
      <label class="ctrl">
        <span class="ctrl-label">${e}</span>
        <select
          .value=${String(s)}
          @change=${e=>{const i=Number(e.target.value);this._patch({[t]:i})}}
        >
          ${i.map((t,e)=>W`<option value=${e} ?selected=${e===s}>${t}</option>`)}
        </select>
      </label>
    `}_checkbox(t,e){const i=Boolean(this._cfg[t]);return W`
      <label class="ctrl-check">
        <input
          type="checkbox"
          .checked=${i}
          @change=${e=>{this._patch({[t]:e.target.checked})}}
        />
        <span>${e}</span>
      </label>
    `}render(){return"loading"===this._status?W`<p class="muted">Loading audio settings…</p>`:W`
      <section class="ar" aria-label="AudioReactive usermod controls">
        <h3>AudioReactive</h3>
        <p class="hint">
          Tunes the AudioReactive usermod on the device — affects every reactive effect.
        </p>
        <div class="grid">
          ${this._slider("inputLevel","GEQ input level",0,255)}
          ${this._slider("squelch","Squelch (noise floor)",0,255)}
          ${this._slider("gain","Gain",0,255)}
          ${this._select("AGC","AGC mode",ja)}
          ${this._select("freqDist","Frequency scale",Ka)}
          ${this._slider("limiterRise","Limiter rise",1,1e3," ms")}
          ${this._slider("limiterFall","Limiter fall",1,1e3," ms")}
          ${this._select("sync","Audio sync",qa)}
          ${this._slider("port","Sync port",1,65535)}
          ${this._checkbox("PalAR","AudioReactive palette injection")}
        </div>
        ${"number"==typeof this._info.samplePeak?W`
              <p class="meta">
                Peak ${this._info.samplePeak} · FPS ${this._info.FPS??"?"} · Source
                ${this._info.audioSource??"?"}
              </p>
            `:null}
      </section>
    `}static simulationLabels(){return Ya}static{this.styles=[...mt,o`
      .ar h3 {
        margin: 0 0 6px;
        font-size: 1rem;
      }
      .hint {
        margin: 0 0 12px;
        opacity: 0.75;
        font-size: 0.82rem;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 10px 16px;
      }
      .ctrl {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.8rem;
      }
      .ctrl-label {
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }
      .ctrl-val {
        font-variant-numeric: tabular-nums;
        opacity: 0.75;
      }
      .ctrl-check {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.85rem;
      }
      select {
        padding: 4px 6px;
        border-radius: 6px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
        font-size: 0.82rem;
      }
      .meta {
        margin: 10px 0 0;
        font-size: 0.75rem;
        opacity: 0.65;
      }
      .muted {
        opacity: 0.7;
        font-size: 0.85rem;
      }
    `]}};t([ct({attribute:!1})],Xa.prototype,"connection",void 0),t([ct()],Xa.prototype,"controllerId",void 0),t([dt()],Xa.prototype,"_cfg",void 0),t([dt()],Xa.prototype,"_info",void 0),t([dt()],Xa.prototype,"_status",void 0),t([dt()],Xa.prototype,"_busy",void 0),Xa=t([bt("wled-audio-reactive-controls")],Xa);let Ja=class extends vt{constructor(){super(...arguments),this.controllerId="",this._fft=Array(16).fill(0),this._peak=0,this._hasData=!1}onPoweredConnect(){const t=this.hass?.connection;if(!t?.subscribeEvents)return;const e=t.subscribeEvents(t=>{const e=t.data??{};if(!e.controller_id||e.controller_id===this.controllerId){if(Array.isArray(e.fft))for(this._fft=e.fft.slice(0,16);this._fft.length<16;)this._fft.push(0);"number"==typeof e.sample_peak&&(this._peak=e.sample_peak),this._hasData=!0}},"wled_studio_audio_frame");this.addUnsub(()=>{e.then(t=>t?.())})}_peakPct(){return Math.min(100,Math.round(this._peak/255*100))}_renderReactiveCtl(){return this.connection&&this.controllerId?W`
      <wled-audio-reactive-controls
        .connection=${this.connection}
        .controllerId=${this.controllerId}
      ></wled-audio-reactive-controls>
    `:null}render(){if(!this._hasData)return W`
        <section class="audio empty">
          <h2>Music sync</h2>
          <p class="lead">No UDP audiosync packets yet.</p>
          <ol class="steps">
            <li>
              In WLED, enable <strong>Sync</strong> under Sound settings and set UDP
              port <code>11988</code> (AudioReactive v2).
            </li>
            <li>
              Point audiosync at this Home Assistant host (same LAN as the controller).
            </li>
            <li>Play audio near the microphone — bands update at 10 Hz.</li>
          </ol>
          <a
            class="primary"
            href=${"https://www.home-assistant.io/integrations/wled/#audio-reactive"}
            target="_blank"
            rel="noopener noreferrer"
          >
            WLED audio sync docs
          </a>
          ${this._renderReactiveCtl()}
        </section>
      `;const t=Math.max(1,...this._fft),e=this._peakPct();return W`
      <section class="audio">
        <h2>Music sync</h2>
        <p class="lead">16-band FFT from UDP audiosync (10 Hz)</p>
        <div class="peak-row">
          <span class="peak-label">Peak</span>
          <div
            class="peak-meter"
            role="meter"
            aria-label="Sample peak level"
            aria-valuemin="0"
            aria-valuemax="255"
            aria-valuenow=${this._peak}
          >
            <div class="peak-fill" style="width:${e}%"></div>
          </div>
          <span class="peak-value">${this._peak}</span>
        </div>
        <div class="bars" role="img" aria-label="FFT band levels">
          ${this._fft.map((e,i)=>W`
              <div class="bar-col">
                <div
                  class="bar"
                  style="height:${Math.round(e/t*100)}%"
                  title="Band ${i+1}: ${e}"
                ></div>
                <span class="band-num">${i+1}</span>
              </div>
            `)}
        </div>
        ${this._renderReactiveCtl()}
      </section>
    `}static{this.styles=[...mt,o`
      .audio h2 {
        margin: 0 0 6px;
        font-size: 1.15rem;
      }
      .lead {
        margin: 0 0 12px;
        opacity: 0.85;
        font-size: 0.9rem;
      }
      .empty .steps {
        margin: 0 0 16px;
        padding-left: 1.25rem;
        font-size: 0.9rem;
        opacity: 0.9;
      }
      .empty .steps li + li {
        margin-top: 8px;
      }
      .peak-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
      }
      .peak-label {
        font-size: 0.85rem;
        opacity: 0.8;
        min-width: 2.5rem;
      }
      .peak-meter {
        flex: 1;
        height: 10px;
        border-radius: 5px;
        background: var(--divider-color, rgba(255, 255, 255, 0.12));
        overflow: hidden;
      }
      .peak-fill {
        height: 100%;
        background: var(--primary-color);
        border-radius: 5px;
        transition: width 80ms linear;
      }
      .peak-value {
        font-size: 0.85rem;
        font-variant-numeric: tabular-nums;
        min-width: 2rem;
        text-align: right;
        opacity: 0.85;
      }
      .bars {
        display: flex;
        align-items: flex-end;
        gap: 4px;
        height: 120px;
      }
      .bar-col {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 0;
        height: 100%;
      }
      .bar {
        width: 100%;
        min-width: 8px;
        flex: 1;
        align-self: stretch;
        background: var(--primary-color);
        border-radius: 4px 4px 0 0;
      }
      .band-num {
        font-size: 0.65rem;
        opacity: 0.65;
        margin-top: 4px;
        font-variant-numeric: tabular-nums;
      }
    `]}};t([ct({attribute:!1})],Ja.prototype,"connection",void 0),t([ct()],Ja.prototype,"controllerId",void 0),t([dt()],Ja.prototype,"_fft",void 0),t([dt()],Ja.prototype,"_peak",void 0),t([dt()],Ja.prototype,"_hasData",void 0),Ja=t([bt("wled-view-audio")],Ja);let Za=class extends vt{constructor(){super(...arguments),this.controllerId="",this.masterEntity="",this._scenes=[],this._copied=""}async onPoweredConnect(){if(this.connection&&this.controllerId)try{this._scenes=await Et(this.connection,this.controllerId)}catch{this._scenes=[]}}async _copy(t,e){if(t)try{await navigator.clipboard.writeText(t),this._copied=e,window.setTimeout(()=>{this._copied===e&&(this._copied="")},2e3)}catch{this._copied=""}}render(){const t=this.masterEntity.trim();return W`
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

        ${t?W`
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
          ${this._scenes.map(t=>W`
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
    `}static{this.styles=[...mt,o`
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
    `]}};t([ct({attribute:!1})],Za.prototype,"connection",void 0),t([ct()],Za.prototype,"controllerId",void 0),t([ct()],Za.prototype,"masterEntity",void 0),t([dt()],Za.prototype,"_scenes",void 0),t([dt()],Za.prototype,"_copied",void 0),Za=t([bt("wled-view-voice")],Za);let Qa=class extends vt{constructor(){super(...arguments),this.controllerId="",this._minutes=15,this._status="",this._fading=!1,this._fadeProgress=0}async _sleepFade(){if(this.connection&&this.controllerId&&!this._fading){this._status="Starting sleep fade…",this._fading=!0,this._fadeProgress=0;try{const t=await Tt(this.connection,this.controllerId),e=t.state?.bri??t.segments?.[0]?.bri??128,i=Math.max(4,Math.min(30,Math.floor(2*this._minutes))),s=60*this._minutes*1e3/i;for(let t=0;t<=i;t++){const r=Math.round(e*(1-t/i));await Ft(this.connection,this.controllerId,{bri:r,on:t<i,tt:Math.min(25,Math.ceil(s/100))}),this._fadeProgress=Math.round(t/i*100),this._status=`Sleep fade ${this._fadeProgress}% — ${this._minutes} min total`,t<i&&await new Promise(t=>setTimeout(t,s))}this._fadeProgress=100,this._status=`Sleep fade complete (${this._minutes} min)`}catch(t){this._status=t instanceof Error?t.message:String(t)}finally{this._fading=!1}}}render(){return W`
      <section class="schedules">
        <h2>Schedules</h2>
        <p class="lead">
          Sleep timer fades brightness to off over the selected duration using device-side
          <code>tt</code> crossfade steps.
        </p>
        <div class="card">
          <h3>Sleep timer</h3>
          <label>
            Minutes
            <input
              type="number"
              min="1"
              max="120"
              ?disabled=${this._fading}
              .value=${String(this._minutes)}
              @change=${t=>{this._minutes=parseInt(t.target.value,10)}}
            />
          </label>
          <button
            type="button"
            class="primary"
            ?disabled=${this._fading}
            @click=${()=>this._sleepFade()}
          >
            Start sleep fade
          </button>
          ${this._fading?W`
                <div
                  class="progress-wrap"
                  role="progressbar"
                  aria-label="Sleep fade progress"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow=${this._fadeProgress}
                >
                  <div class="progress-bar" style="width:${this._fadeProgress}%"></div>
                </div>
              `:null}
        </div>
        <p class="status">${this._status}</p>
        <p class="hint">
          Sunrise alarms and multi-controller groups are planned; use HA automations with
          <code>wled_studio.notify</code> for doorbell flashes today.
        </p>
      </section>
    `}static{this.styles=[...mt,o`
      .schedules h2 {
        margin: 0 0 8px;
      }
      .lead {
        opacity: 0.85;
      }
      .card {
        padding: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        margin: 12px 0;
      }
      .card h3 {
        margin: 0 0 8px;
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 8px;
      }
      .progress-wrap {
        margin-top: 12px;
        height: 8px;
        border-radius: 4px;
        background: var(--divider-color, rgba(255, 255, 255, 0.12));
        overflow: hidden;
      }
      .progress-bar {
        height: 100%;
        background: var(--primary-color);
        border-radius: 4px;
        transition: width 200ms ease;
      }
      .status {
        font-size: 0.85rem;
      }
      .hint {
        font-size: 0.85rem;
        opacity: 0.75;
      }
    `]}};t([ct({attribute:!1})],Qa.prototype,"connection",void 0),t([ct()],Qa.prototype,"controllerId",void 0),t([dt()],Qa.prototype,"_minutes",void 0),t([dt()],Qa.prototype,"_status",void 0),t([dt()],Qa.prototype,"_fading",void 0),t([dt()],Qa.prototype,"_fadeProgress",void 0),Qa=t([bt("wled-view-schedules")],Qa);let tl=class extends vt{constructor(){super(...arguments),this.controllerId="",this.host="",this.controllerTitle="",this._frameKey=0,this._skinStatus="",this._skinBusy=!1}onPoweredConnect(){this._maybeApplyEmbedSkin()}updated(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._maybeApplyEmbedSkin()}_skinStorageKey(){return`wled_studio.embed_skin_applied.${this.controllerId}`}async _maybeApplyEmbedSkin(){if(this.connection&&this.controllerId&&this.host){try{if(localStorage.getItem(this._skinStorageKey()))return}catch{}await this._applyEmbedSkin(!0)}}async _applyEmbedSkin(t=!1){if(this.connection&&this.controllerId){this._skinBusy=!0,t||(this._skinStatus="Applying outline style to WLED…");try{await this.connection.sendMessagePromise({type:"wled_studio/apply_embed_skin",schema_version:1,controller_id:this.controllerId});try{localStorage.setItem(this._skinStorageKey(),"1")}catch{}this._skinStatus="Segment selection uses outline only (skin.css on device). Reload if needed.",this._reloadFrame()}catch(t){this._skinStatus=Ht(t)}finally{this._skinBusy=!1}}}_firmwareUrl(){const t=(this.host??"").trim();if(!t)return"";const e=/^https?:\/\//i.test(t)?t:`http://${t}`;if(!this._frameKey)return e;const i=e.includes("?")?"&":"?";return`${e}${i}_reload=${this._frameKey}`}_reloadFrame(){this._frameKey+=1}render(){const t=this._firmwareUrl(),e=this.controllerTitle||"WLED controller";return W`
      <section class="firmware" aria-label="WLED firmware UI">
        <header class="head">
          <h2>Controller</h2>
          <p class="hint">
            Native WLED web UI for <strong>${e}</strong>. Selected segments use
            an outline only (no gray fill) after Studio applies
            <code>skin.css</code> once per controller. Some browsers block HTTP
            devices inside HTTPS Home Assistant — use
            <strong>Open in new tab</strong> if the frame stays blank.
          </p>
        </header>

        ${t?W`
              <div class="toolbar">
                <a class="primary" href=${t} target="_blank" rel="noopener noreferrer">
                  <ha-icon icon="mdi:open-in-new"></ha-icon>
                  Open in new tab
                </a>
                <button
                  type="button"
                  class="ghost"
                  ?disabled=${this._skinBusy}
                  @click=${()=>this._applyEmbedSkin(!1)}
                >
                  <ha-icon icon="mdi:format-textbox"></ha-icon>
                  Outline segments
                </button>
                <button type="button" class="ghost" @click=${this._reloadFrame}>
                  <ha-icon icon="mdi:refresh"></ha-icon>
                  Reload
                </button>
                <span class="url" title=${t}>${t}</span>
              </div>
              ${this._skinStatus?W`<p class="skin-status">${this._skinStatus}</p>`:null}
              <div class="frame-wrap">
                <iframe
                  src=${t}
                  title=${`WLED firmware — ${e}`}
                  loading="lazy"
                  referrerpolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                ></iframe>
              </div>
            `:W`
              <p class="empty">
                No host address for this controller. Reload the integration or pick
                another device in the header.
              </p>
            `}
      </section>
    `}static{this.styles=[...mt,o`
      .firmware {
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-height: 0;
      }
      .head h2 {
        margin: 0 0 6px;
        font-size: 1.15rem;
      }
      .hint {
        margin: 0;
        font-size: 0.88rem;
        opacity: 0.8;
        max-width: 42rem;
      }
      .hint code {
        font-size: 0.85em;
      }
      .toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
      }
      .ghost {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 0.88rem;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
      }
      .ghost {
        border: 1px solid var(--divider-color);
        background: var(--secondary-background-color);
      }
      .ghost:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .skin-status {
        margin: 0;
        font-size: 0.82rem;
        opacity: 0.75;
      }
      .url {
        font-size: 0.78rem;
        opacity: 0.65;
        word-break: break-all;
        flex: 1;
        min-width: 8rem;
      }
      .frame-wrap {
        flex: 1;
        min-height: min(72vh, 720px);
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid var(--divider-color);
        background: #111;
      }
      iframe {
        display: block;
        width: 100%;
        height: min(72vh, 720px);
        border: none;
        background: #111;
      }
      .empty {
        opacity: 0.75;
        font-size: 0.9rem;
      }
    `]}};t([ct({attribute:!1})],tl.prototype,"connection",void 0),t([ct()],tl.prototype,"controllerId",void 0),t([ct()],tl.prototype,"host",void 0),t([ct()],tl.prototype,"controllerTitle",void 0),t([dt()],tl.prototype,"_frameKey",void 0),t([dt()],tl.prototype,"_skinStatus",void 0),t([dt()],tl.prototype,"_skinBusy",void 0),tl=t([bt("wled-view-firmware")],tl);const el="wled-studio-panel",il="wled_studio.onboarded",sl=[{id:"color",label:"Color",icon:"mdi:palette"},{id:"effects",label:"Effects",icon:"mdi:auto-fix"},{id:"scenes",label:"Scenes",icon:"mdi:palette-swatch"},{id:"paint",label:"Paint",icon:"mdi:brush"}],rl=[{id:"layout",label:"Layout",icon:"mdi:vector-polygon"},{id:"devices",label:"Devices",icon:"mdi:devices"},{id:"audio",label:"Audio",icon:"mdi:music"},{id:"voice",label:"Voice",icon:"mdi:microphone-message"},{id:"schedules",label:"Schedules",icon:"mdi:clock-outline"},{id:"controller",label:"Controller",icon:"mdi:web"},{id:"settings",label:"Settings",icon:"mdi:cog"},{id:"firmware",label:"Firmware",icon:"mdi:chip"}];function nl(t){return rl.some(e=>e.id===t)}class ol extends vt{constructor(){super(...arguments),this._view="color",this._controllerId="",this._controllers=[],this._drawerOpen=!1,this._moreExpanded=!1,this._previewSegId=-1,this._previewHighlightIds=[],this._showOnboard=!1}onPoweredConnect(){try{this._showOnboard=!localStorage.getItem(il)}catch{this._showOnboard=!1}"segments"===this._view&&(this._view="color"),nl(this._view)&&(this._moreExpanded=!0),this._loadController()}willUpdate(t){t.has("_view")&&"segments"===this._view&&(this._view="color")}onPoweredDisconnect(){this._unbindOnboardModal()}updated(t){super.updated(t),t.has("_showOnboard")&&(this._showOnboard?this._bindOnboardModal():this._unbindOnboardModal())}async _loadController(){if(this.hass?.connection)try{const t=await $t(this.hass.connection);if(this._controllers=t,this._controllerId&&t.some(t=>t.entry_id===this._controllerId))return;const e=t[0];e?.entry_id&&(this._controllerId=String(e.entry_id))}catch{}}_dismissOnboard(){try{localStorage.setItem(il,"1")}catch{}this._showOnboard=!1}_bindOnboardModal(){this._unbindOnboardModal(),this._onboardKeyHandler=t=>{if("Escape"===t.key)return t.preventDefault(),void this._dismissOnboard();if("Tab"!==t.key)return;const e=this.renderRoot.querySelector(".onboard-card");if(!e)return;const i=e.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');if(!i.length)return;const s=i[0],r=i[i.length-1];t.shiftKey&&document.activeElement===s?(t.preventDefault(),r.focus()):t.shiftKey||document.activeElement!==r||(t.preventDefault(),s.focus())},document.addEventListener("keydown",this._onboardKeyHandler),this.scheduleRaf(()=>{this.renderRoot.querySelector(".onboard-primary")?.focus()})}_unbindOnboardModal(){this._onboardKeyHandler&&(document.removeEventListener("keydown",this._onboardKeyHandler),this._onboardKeyHandler=void 0)}_onControllerPick(t){const e=t.target.value;e&&(this._controllerId=e)}render(){const t=this.remote.state;return W`
      <div class="shell" role="application" aria-label="WLED Studio">
        ${Boolean(window.__WLED_STUDIO_STALE__)?W`
              <ha-alert alert-type="warning" class="stale-banner">
                WLED Studio updated — refresh this page to apply changes.
              </ha-alert>
            `:null}
        ${this._showOnboard?W`
              <div
                class="onboard-overlay"
                @click=${t=>{t.target===t.currentTarget&&this._dismissOnboard()}}
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
            ${sl.map(t=>this._navItem(t.id,t.label,t.icon))}
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
            ${this._moreExpanded?W`
                  <nav class="more-nav" aria-label="More sections">
                    ${rl.map(t=>this._navItem(t.id,t.label,t.icon))}
                  </nav>
                `:null}
          </div>
          <nav class="rail-nav mobile-more" aria-label="More sections">
            ${rl.map(t=>this._navItem(t.id,t.label,t.icon))}
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
            ${this._controllers.length>1?W`
                  <label class="controller-pick">
                    <span class="sr-only">Controller</span>
                    <select
                      aria-label="WLED controller"
                      @change=${this._onControllerPick}
                    >
                      ${this._controllers.map(t=>W`
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
            ${t.isRemote?W`<span class="remote-pill">Remote preview</span>`:null}
          </header>
          <nav class="primary-bar" aria-label="Primary sections">
            ${sl.map(t=>this._primaryTab(t.id,t.label,t.icon))}
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
    `}_navItem(t,e,i){const s=this._view===t;return W`
      <button
        class="nav ${s?"active":""}"
        aria-label=${e}
        aria-current=${s?"page":"false"}
        @click=${()=>this._selectView(t)}
      >
        <ha-icon .icon=${i}></ha-icon>
        <span>${e}</span>
      </button>
    `}_primaryTab(t,e,i){const s=this._view===t;return W`
      <button
        class="primary-tab ${s?"active":""}"
        role="tab"
        aria-label=${e}
        aria-selected=${s?"true":"false"}
        @click=${()=>this._selectView(t)}
      >
        <ha-icon .icon=${i}></ha-icon>
        <span>${e}</span>
      </button>
    `}_viewsWithStripPreview(){return"color"===this._view||"scenes"===this._view||"effects"===this._view}_renderPreview(){const t=this.hass?.connection,e=this._controllerId;return t&&e&&this._viewsWithStripPreview()?W`
      <wled-studio-live-preview
        .connection=${t}
        .controllerId=${e}
        .selectedSegId=${this._previewSegId}
        .highlightSegIds=${this._previewHighlightIds}
        @segment-select=${this._onPreviewSegmentSelect}
      ></wled-studio-live-preview>
    `:null}_onPreviewSegmentSelect(t){const e=t.detail.segmentId;this._previewSegId=e,"color"===this._view?this.renderRoot.querySelector("wled-segment-controls")?.selectSegment(e):"effects"===this._view?this.renderRoot.querySelector("wled-view-effects")?.selectSegmentFromPreview(e):"scenes"===this._view&&this.renderRoot.querySelector("wled-view-scenes")?.selectSegmentFromPreview(e)}_onPreviewTargetsChanged(t){this._previewSegId=t.detail.segmentId,t.detail.highlightIds?.length?this._previewHighlightIds=t.detail.highlightIds:t.detail.editIds?.length?this._previewHighlightIds=t.detail.editIds:this._previewHighlightIds=[t.detail.segmentId]}_livePreview(){return this.renderRoot.querySelector("wled-studio-live-preview")??null}refreshLivePreview(){const t=this._livePreview();t?.pulseApply(),t?.refreshSegments()}_masterEntityForController(){return this._controllers.find(t=>t.entry_id===this._controllerId)?.master_entity_id??""}_renderFirmwareView(t,e){const i=this._controllers.find(t=>t.entry_id===e);return W`
      <wled-view-firmware
        .connection=${t}
        .controllerId=${e}
        .host=${i?.host??""}
        .controllerTitle=${i?.title??e}
      ></wled-view-firmware>
    `}_renderView(){const t=this.hass?.connection,e=this._controllerId;if("devices"!==this._view&&"settings"!==this._view&&!e)return W`
        <p>
          Connect a WLED Studio controller under
          <strong>Settings → Devices & services</strong>, then reload this panel.
        </p>
      `;if("devices"===this._view&&t)return W`
        <wled-view-devices .connection=${t}></wled-view-devices>
      `;if("layout"===this._view&&t&&e)return W`
        <wled-view-layout
          .connection=${t}
          .hass=${this.hass}
          .controllerId=${e}
        ></wled-view-layout>
      `;if("scenes"===this._view&&t&&e)return W`
        <wled-view-scenes .connection=${t} .controllerId=${e}></wled-view-scenes>
      `;if("effects"===this._view&&t&&e)return W`
        <wled-view-effects
          .hass=${this.hass}
          .connection=${t}
          .controllerId=${e}
          @segment-targets-changed=${this._onPreviewTargetsChanged}
        ></wled-view-effects>
      `;if("color"===this._view&&t&&e){const i=this._masterEntityForController();return W`
        <wled-segment-controls
          .hass=${this.hass}
          .connection=${t}
          .controllerId=${e}
          .masterEntity=${i}
          compact
          @segment-targets-changed=${this._onPreviewTargetsChanged}
        ></wled-segment-controls>
      `}return"paint"===this._view&&t&&e?W`
        <wled-view-paint
          .hass=${this.hass}
          .connection=${t}
          .controllerId=${e}
        ></wled-view-paint>
      `:("controller"===this._view||"firmware"===this._view)&&t&&e?this._renderFirmwareView(t,e):"audio"===this._view&&e?W`<wled-view-audio
        .connection=${t}
        .controllerId=${e}
      ></wled-view-audio>`:"voice"===this._view&&t&&e?W`
        <wled-view-voice
          .connection=${t}
          .controllerId=${e}
          .masterEntity=${this._masterEntityForController()}
        ></wled-view-voice>
      `:"schedules"===this._view&&t&&e?W`
        <wled-view-schedules .connection=${t} .controllerId=${e}></wled-view-schedules>
      `:"settings"===this._view&&t&&e?W`
        <wled-view-settings .connection=${t} .controllerId=${e}></wled-view-settings>
      `:W`<p>Select a section from the menu.</p>`}_selectView(t){const e="paint"===this._view&&"paint"!==t;e&&this._abortActivePaint(),this._view=t,nl(t)&&(this._moreExpanded=!0),this._closeDrawer(),e&&this.refreshLivePreview()}async _abortActivePaint(){const t=this.renderRoot.querySelector("wled-view-paint");if(!t||!("cancelLiveIfActive"in t))return;const e=t;await e.cancelLiveIfActive()}_toggleMore(){this._moreExpanded=!this._moreExpanded}_toggleDrawer(){this._drawerOpen=!this._drawerOpen}_closeDrawer(){this._drawerOpen=!1}static{this.styles=[...mt,o`
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
    `]}}t([dt()],ol.prototype,"_view",void 0),t([dt()],ol.prototype,"_controllerId",void 0),t([dt()],ol.prototype,"_controllers",void 0),t([dt()],ol.prototype,"_drawerOpen",void 0),t([dt()],ol.prototype,"_moreExpanded",void 0),t([dt()],ol.prototype,"_previewSegId",void 0),t([dt()],ol.prototype,"_previewHighlightIds",void 0),t([dt()],ol.prototype,"_showOnboard",void 0),function(){const t=window.__WLED_STUDIO_BUILD__;t&&t!==yt&&(window.__WLED_STUDIO_STALE__=!0),window.__WLED_STUDIO_BUILD__=yt}(),function(t,e){const i=customElements.get(t);i||customElements.define(t,e)}(el,ol),console.info("[wled-studio] panel bundle loaded",{panel:el});export{el as PANEL_TAG,ol as WledStudioPanel};
//# sourceMappingURL=wled-studio-panel.js.map

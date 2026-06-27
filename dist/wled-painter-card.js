function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,f=globalThis,_=f.trustedTypes,g=_?_.emptyScript:"",m=f.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,m?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=t=>t,S=$.trustedTypes,P=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,I="?"+C,A=`<${I}>`,M=document,L=()=>M.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,N="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,B=/>/g,D=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,F=/"/g,W=/^(?:script|style|textarea|title)$/i,H=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),j=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,X=M.createTreeWalker(M,129);function Y(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==P?P.createHTML(e):e}class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[l,h]=((t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=O;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,c=0;for(;c<i.length&&(r.lastIndex=c,l=r.exec(i),null!==l);)c=r.lastIndex,r===O?"!--"===l[1]?r=z:void 0!==l[1]?r=B:void 0!==l[2]?(W.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=D):void 0!==l[3]&&(r=D):r===D?">"===l[0]?(r=n??O,h=-1):void 0===l[1]?h=-2:(h=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?D:'"'===l[3]?F:U):r===F||r===U?r=D:r===z||r===B?r=O:(r=D,n=void 0);const d=r===D&&t[e+1].startsWith("/>")?" ":"";o+=r===O?i+A:h>=0?(s.push(a),i.slice(0,h)+E+i.slice(h)+C+d):i+C+(-2===h?e:d)}return[Y(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=J.createElement(l,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=h[o++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:Z}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(W.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],L()),X.nextNode(),a.push({type:2,index:++n});s.append(t[e],L())}}}else if(8===s.nodeType)if(s.data===I)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){if(e===j)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=R(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=K(t,n._$AS(t,e.values),n,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);X.currentNode=s;let n=X.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=X.nextNode(),o++)}return X.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}let Q=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),R(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new J(t)),e}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,n=0;for(const o of e)n===i.length?i.push(s=new t(this.O(L()),this.O(L()),this,this.options)):s=i[n],s._$AI(o),n++;n<i.length&&(this._$AR(s&&s._$AB.nextSibling,n),i.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},Z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=K(this,t,e,0),o=!R(t)||t!==this._$AH&&t!==j,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=K(this,s[i+r],e,r),a===j&&(a=this._$AH[r]),o||=!R(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},tt=class extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}};class et extends Z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}let it=class extends Z{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??q)===j)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const nt=$.litHtmlPolyfillSupport;nt?.(J,Q),($.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;let rt=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(L(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}};rt._$litElement$=!0,rt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:rt});const at=ot.litElementPolyfillSupport;at?.({LitElement:rt}),(ot.litElementVersions??=[]).push("4.2.2");const lt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},ht=(t=lt,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ct(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function dt(t){return ct({...t,state:!0,attribute:!1})}function ut(t,e){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const pt=r`
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
`;const ft=/^[0-9a-fA-F]+$/;function _t(t,e,i,s){let n,o=!1;const r=async()=>{n?.(),n=void 0,o||(n=await t.subscribeMessage(t=>{const e=t.event?.data??("wled_studio_live_frame"===t.type?t.data:void 0);if(!e)return;const s=function(t){if(!t||"object"!=typeof t)return null;const e=t;if(Array.isArray(e.leds_hex)&&e.leds_hex.length>0){const t=e.leds_hex.map(t=>String(t).toLowerCase()),i=Number(e.n)>0?Number(e.n):t.length;return{leds_hex:t,n:i,channels:4===e.channels?4:3,scale:i/t.length,count:t.length}}const i=e.leds;if(!Array.isArray(i)||0===i.length)return null;const s=[];let n=3;for(const t of i){if("string"!=typeof t)continue;const e=t.trim().replace(/^#/,"");if(e&&e.length%2==0&&ft.test(e)){if(8===e.length)n=4;else if(6!==e.length)continue;s.push(e.toLowerCase())}}if(0===s.length)return null;let o=s.length;if(void 0!==e.n){const t=Number(e.n);Number.isFinite(t)&&t>0&&(o=t)}return{leds_hex:s,n:o,channels:n,scale:o/s.length,count:s.length}}(e);s&&i({...s,entry_id:e.entry_id,controller_id:e.controller_id,fps:e.fps})},{type:"wled_studio/subscribe_live",schema_version:1,controller_id:e,remote:!1}))};r();const a=function(t,e){const i=()=>e();return t.addEventListener("ready",i),()=>t.removeEventListener("ready",i)}(t,()=>{r()});return()=>{o=!0,a(),n?.(),n=void 0}}async function gt(t){t.connected||await new Promise((e,i)=>{const s=window.setTimeout(()=>{t.removeEventListener("ready",n),i(new Error("Home Assistant WebSocket not connected"))},15e3),n=()=>{t.connected&&(window.clearTimeout(s),t.removeEventListener("ready",n),e())};t.addEventListener("ready",n)})}async function mt(t){await gt(t);try{return(await t.sendMessagePromise({type:"wled_studio/list_controllers",schema_version:1})).controllers??[]}catch(t){const e=t,i=e?.code?`${e.code}: ${e.message??"failed"}`:t instanceof Error?t.message:String(t);throw new Error(`wled_studio/list_controllers — ${i}`)}}function vt(t){return(e,i)=>{const s=customElements.get(t);return s||(customElements.define(t,e),e)}}const yt=r`
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
`,bt=r`
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
`;class wt{constructor(t,e){this.host=t,this._hass=e,this._isRemote=!1,t.addController(this)}hostConnected(){this._refresh()}setHass(t){this._hass=t,this._refresh(),this.host.requestUpdate()}get state(){return{isRemote:this._isRemote,previewFps:this._isRemote?10:20,useBinaryPack:this._isRemote,disableBloom:this._isRemote}}_refresh(){if("undefined"==typeof location)return void(this._isRemote=!1);const t=location.hostname.endsWith(".ui.nabu.casa"),e=this._hass?.config?.external_url,i=!!e&&e.replace(/\/$/,"")===location.origin;this._isRemote=t||i}}const xt=r`
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
`,$t=[pt,yt,bt,xt];class kt extends rt{constructor(){super(...arguments),this.abort=new AbortController,this.rafIds=new Set,this.unsubs=new Set,this.remote=new wt(this),this._visible=!0,this._inView=!0}static{this.styles=$t}connectedCallback(){super.connectedCallback(),this._bindVisibility(),this._bindIntersection(),this.remote.setHass(this.hass),this.onPoweredConnect()}disconnectedCallback(){this.onPoweredDisconnect(),this._io?.disconnect(),this._io=void 0,this.abort.abort();for(const t of this.rafIds)cancelAnimationFrame(t);this.rafIds.clear();for(const t of this.unsubs)t();this.unsubs.clear(),super.disconnectedCallback()}updated(t){super.updated(t),t.has("hass")&&this.remote.setHass(this.hass)}get isPowered(){return this._visible&&this._inView}scheduleRaf(t){const e=requestAnimationFrame(i=>{this.rafIds.delete(e),this.isConnected&&!this.abort.signal.aborted&&t(i)});this.rafIds.add(e)}addUnsub(t){this.unsubs.add(t)}onPoweredConnect(){}onPoweredDisconnect(){}_bindVisibility(){document.addEventListener("visibilitychange",()=>{this._visible="visible"===document.visibilityState,this.requestUpdate()},{signal:this.abort.signal}),this._visible="visible"===document.visibilityState}_bindIntersection(){this._io=new IntersectionObserver(t=>{this._inView=t.some(t=>t.isIntersecting),this.requestUpdate()},{threshold:.01}),this._io.observe(this)}}function St(t){if(t instanceof Error)return t.message;if("string"==typeof t)return t;if(t&&"object"==typeof t){const e=t;if("string"==typeof e.message)return"string"==typeof e.code?`${e.code}: ${e.message}`:e.message;const i=e.error;if(i&&"object"==typeof i){const t=i;if("string"==typeof t.message)return"string"==typeof t.code?`${t.code}: ${t.message}`:t.message}if("string"==typeof e.code)return e.code}try{return JSON.stringify(t)}catch{return"Unknown error"}}async function Pt(t,e){await gt(t);return await t.sendMessagePromise({type:"wled_studio/get_state",schema_version:1,controller_id:e})}async function Et(t,e){return await gt(t),t.sendMessagePromise({...e,schema_version:1})}async function Ct(t,e){return(await Et(t,{type:"wled_studio/layout_list",controller_id:e})).layouts??[]}function It(t=0,e=[255,51,102,0]){return{on:!0,bri:255,fx:t,pal:0,col:e,sx:128,ix:128,c1:128,c2:128,c3:128,o1:!1,o2:!1,o3:!1}}function At(t="off"){return{mode:t,on:"off"!==t,bri:"off"===t?0:128,fx:0,pal:0,col:"custom"===t?[72,72,72,0]:[0,0,0,0],sx:128,ix:128,c1:128,c2:128,c3:128,o1:!1,o2:!1,o3:!1}}function Mt(t,e){const i=e.Solid??0;return t.fx===i?"color":"effect"}async function Lt(t,e){await gt(t);try{return await t.sendMessagePromise({...e,schema_version:1})}catch(t){throw new Error(St(t))}}async function Rt(t,e,i,s){const n=function(t){let e="";for(let i=0;i<t.length;i+=32768){const s=t.subarray(i,i+32768);e+=String.fromCharCode(...s)}return btoa(e)}(i),o=s?.brush,r=s?.fill,a=o?Mt(o,s?.effectsByName??{}):"color";await Lt(t,{type:"wled_studio/paint_frame",controller_id:e,data:n,rgbw:s?.rgbw??!0,paint_mode:a,...s?.touched?.length?{touched:s.touched}:{},...o?{brush:o}:{},...r?{fill:r}:{},..."effect"===a&&o?{effect_id:o.fx}:{}})}async function Tt(t,e,i=!0){await Lt(t,{type:"wled_studio/paint_stop",controller_id:e,commit:i})}function Nt(t,e,i){const s=i?4:3,n=new Uint8ClampedArray(4*e);for(let o=0;o<e;o++){const e=o*s,r=4*o;n[r]=t[e]??0,n[r+1]=t[e+1]??0,n[r+2]=t[e+2]??0,n[r+3]=i?t[e+3]??0:255}return n}t([ct({attribute:!1})],kt.prototype,"hass",void 0);const Ot={all:"All","1d":"1D","2d":"2D",solid:"Solid",sound:"Music",palette:"Palette"};function zt(t){return void 0!==t.Solid?t.Solid:0}const Bt=/\b(dj|sound|music|audio|beat|freq|grav|jugg|ripple|water|pixel|rock|streak|popcorn|balls|fireworks|matrix|stream|peak|level|radio|sync|reactive|volume|puddle|ripple|noisem|noisep|noisemove|pixels|juggle|sinelon|phased|blurz|djlight)\b/i;function Dt(t,e,i,s,n){if("all"===i)return!0;const o=s[e]??null,r=t.toLowerCase();return"solid"===i?e===zt(n):"2d"===i?"2"===o||r.includes("2d"):"1d"===i?"2"!==o&&!r.includes("2d"):"sound"===i?function(t,e,i){const s=i[e]??null;return"v"===s||"f"===s||Bt.test(t)}(t,e,s):"palette"!==i||(r.includes("palette")||r.includes("colorloop")||r.includes("pride")||r.includes("cycle"))}var Ut,Ft,Wt,Ht,jt,qt={},Vt=[],Xt=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function Yt(t,e){for(var i in e)t[i]=e[i];return t}function Jt(t){var e=t.parentNode;e&&e.removeChild(t)}function Kt(t,e,i){var s,n,o,r,a=arguments;if(e=Yt({},e),arguments.length>3)for(i=[i],s=3;s<arguments.length;s++)i.push(a[s]);if(null!=i&&(e.children=i),null!=t&&null!=t.defaultProps)for(n in t.defaultProps)void 0===e[n]&&(e[n]=t.defaultProps[n]);return r=e.key,null!=(o=e.ref)&&delete e.ref,null!=r&&delete e.key,Gt(t,e,r,o)}function Gt(t,e,i,s){var n={type:t,props:e,key:i,ref:s,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return Ut.vnode&&Ut.vnode(n),n}function Qt(t){return t.children}function Zt(t,e){this.props=t,this.context=e}function te(t,e){if(null==e)return t.__p?te(t.__p,t.__p.__k.indexOf(t)+1):null;for(var i;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e)return i.__e;return"function"==typeof t.type?te(t):null}function ee(t){var e,i;if(null!=(t=t.__p)&&null!=t.__c){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e){t.__e=t.__c.base=i.__e;break}return ee(t)}}function ie(t){(!t.__d&&(t.__d=!0)&&1===Ft.push(t)||Ht!==Ut.debounceRendering)&&(Ht=Ut.debounceRendering,(Ut.debounceRendering||Wt)(se))}function se(){var t,e,i,s,n,o,r,a;for(Ft.sort(function(t,e){return e.__v.__b-t.__v.__b});t=Ft.pop();)t.__d&&(i=void 0,s=void 0,o=(n=(e=t).__v).__e,r=e.__P,a=e.u,e.u=!1,r&&(i=[],s=he(r,n,Yt({},n),e.__n,void 0!==r.ownerSVGElement,null,i,a,null==o?te(n):o),ce(i,n),s!=o&&ee(n)))}function ne(t,e,i,s,n,o,r,a,l){var h,c,d,u,p,f,_,g=i&&i.__k||Vt,m=g.length;if(a==qt&&(a=null!=o?o[0]:m?te(i,0):null),h=0,e.__k=oe(e.__k,function(i){if(null!=i){if(i.__p=e,i.__b=e.__b+1,null===(d=g[h])||d&&i.key==d.key&&i.type===d.type)g[h]=void 0;else for(c=0;c<m;c++){if((d=g[c])&&i.key==d.key&&i.type===d.type){g[c]=void 0;break}d=null}if(u=he(t,i,d=d||qt,s,n,o,r,null,a,l),(c=i.ref)&&d.ref!=c&&(_||(_=[])).push(c,i.__c||u,i),null!=u){if(null==f&&(f=u),null!=i.l)u=i.l,i.l=null;else if(o==d||u!=a||null==u.parentNode){t:if(null==a||a.parentNode!==t)t.appendChild(u);else{for(p=a,c=0;(p=p.nextSibling)&&c<m;c+=2)if(p==u)break t;t.insertBefore(u,a)}"option"==e.type&&(t.value="")}a=u.nextSibling,"function"==typeof e.type&&(e.l=u)}}return h++,i}),e.__e=f,null!=o&&"function"!=typeof e.type)for(h=o.length;h--;)null!=o[h]&&Jt(o[h]);for(h=m;h--;)null!=g[h]&&pe(g[h],g[h]);if(_)for(h=0;h<_.length;h++)ue(_[h],_[++h],_[++h])}function oe(t,e,i){if(null==i&&(i=[]),null==t||"boolean"==typeof t)e&&i.push(e(null));else if(Array.isArray(t))for(var s=0;s<t.length;s++)oe(t[s],e,i);else i.push(e?e(function(t){if(null==t||"boolean"==typeof t)return null;if("string"==typeof t||"number"==typeof t)return Gt(null,t,null,null);if(null!=t.__e||null!=t.__c){var e=Gt(t.type,t.props,t.key,null);return e.__e=t.__e,e}return t}(t)):t);return i}function re(t,e,i){"-"===e[0]?t.setProperty(e,i):t[e]="number"==typeof i&&!1===Xt.test(e)?i+"px":null==i?"":i}function ae(t,e,i,s,n){var o,r,a,l,h;if("key"===(e=n?"className"===e?"class":e:"class"===e?"className":e)||"children"===e);else if("style"===e)if(o=t.style,"string"==typeof i)o.cssText=i;else{if("string"==typeof s&&(o.cssText="",s=null),s)for(r in s)i&&r in i||re(o,r,"");if(i)for(a in i)s&&i[a]===s[a]||re(o,a,i[a])}else"o"===e[0]&&"n"===e[1]?(l=e!==(e=e.replace(/Capture$/,"")),h=e.toLowerCase(),e=(h in t?h:e).slice(2),i?(s||t.addEventListener(e,le,l),(t.t||(t.t={}))[e]=i):t.removeEventListener(e,le,l)):"list"!==e&&"tagName"!==e&&"form"!==e&&!n&&e in t?t[e]=null==i?"":i:"function"!=typeof i&&"dangerouslySetInnerHTML"!==e&&(e!==(e=e.replace(/^xlink:?/,""))?null==i||!1===i?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),i):null==i||!1===i?t.removeAttribute(e):t.setAttribute(e,i))}function le(t){return this.t[t.type](Ut.event?Ut.event(t):t)}function he(t,e,i,s,n,o,r,a,l,h){var c,d,u,p,f,_,g,m,v,y,b=e.type;if(void 0!==e.constructor)return null;(c=Ut.__b)&&c(e);try{t:if("function"==typeof b){if(m=e.props,v=(c=b.contextType)&&s[c.__c],y=c?v?v.props.value:c.__p:s,i.__c?g=(d=e.__c=i.__c).__p=d.__E:("prototype"in b&&b.prototype.render?e.__c=d=new b(m,y):(e.__c=d=new Zt(m,y),d.constructor=b,d.render=fe),v&&v.sub(d),d.props=m,d.state||(d.state={}),d.context=y,d.__n=s,u=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=b.getDerivedStateFromProps&&Yt(d.__s==d.state?d.__s=Yt({},d.__s):d.__s,b.getDerivedStateFromProps(m,d.__s)),u)null==b.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&r.push(d);else{if(null==b.getDerivedStateFromProps&&null==a&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(m,y),!a&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(m,d.__s,y)){for(d.props=m,d.state=d.__s,d.__d=!1,d.__v=e,e.__e=null!=l?l!==i.__e?l:i.__e:null,e.__k=i.__k,c=0;c<e.__k.length;c++)e.__k[c]&&(e.__k[c].__p=e);break t}null!=d.componentWillUpdate&&d.componentWillUpdate(m,d.__s,y)}for(p=d.props,f=d.state,d.context=y,d.props=m,d.state=d.__s,(c=Ut.__r)&&c(e),d.__d=!1,d.__v=e,d.__P=t,c=d.render(d.props,d.state,d.context),e.__k=oe(null!=c&&c.type==Qt&&null==c.key?c.props.children:c),null!=d.getChildContext&&(s=Yt(Yt({},s),d.getChildContext())),u||null==d.getSnapshotBeforeUpdate||(_=d.getSnapshotBeforeUpdate(p,f)),ne(t,e,i,s,n,o,r,l,h),d.base=e.__e;c=d.__h.pop();)d.__s&&(d.state=d.__s),c.call(d);u||null==p||null==d.componentDidUpdate||d.componentDidUpdate(p,f,_),g&&(d.__E=d.__p=null)}else e.__e=de(i.__e,e,i,s,n,o,r,h);(c=Ut.diffed)&&c(e)}catch(t){Ut.__e(t,e,i)}return e.__e}function ce(t,e){for(var i;i=t.pop();)try{i.componentDidMount()}catch(t){Ut.__e(t,i.__v)}Ut.__c&&Ut.__c(e)}function de(t,e,i,s,n,o,r,a){var l,h,c,d,u=i.props,p=e.props;if(n="svg"===e.type||n,null==t&&null!=o)for(l=0;l<o.length;l++)if(null!=(h=o[l])&&(null===e.type?3===h.nodeType:h.localName===e.type)){t=h,o[l]=null;break}if(null==t){if(null===e.type)return document.createTextNode(p);t=n?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type),o=null}return null===e.type?u!==p&&(null!=o&&(o[o.indexOf(t)]=null),t.data=p):e!==i&&(null!=o&&(o=Vt.slice.call(t.childNodes)),c=(u=i.props||qt).dangerouslySetInnerHTML,d=p.dangerouslySetInnerHTML,a||(d||c)&&(d&&c&&d.__html==c.__html||(t.innerHTML=d&&d.__html||"")),function(t,e,i,s,n){var o;for(o in i)o in e||ae(t,o,null,i[o],s);for(o in e)n&&"function"!=typeof e[o]||"value"===o||"checked"===o||i[o]===e[o]||ae(t,o,e[o],i[o],s)}(t,p,u,n,a),e.__k=e.props.children,d||ne(t,e,i,s,"foreignObject"!==e.type&&n,o,r,qt,a),a||("value"in p&&void 0!==p.value&&p.value!==t.value&&(t.value=null==p.value?"":p.value),"checked"in p&&void 0!==p.checked&&p.checked!==t.checked&&(t.checked=p.checked))),t}function ue(t,e,i){try{"function"==typeof t?t(e):t.current=e}catch(t){Ut.__e(t,i)}}function pe(t,e,i){var s,n,o;if(Ut.unmount&&Ut.unmount(t),(s=t.ref)&&ue(s,null,e),i||"function"==typeof t.type||(i=null!=(n=t.__e)),t.__e=t.l=null,null!=(s=t.__c)){if(s.componentWillUnmount)try{s.componentWillUnmount()}catch(t){Ut.__e(t,e)}s.base=s.__P=null}if(s=t.__k)for(o=0;o<s.length;o++)s[o]&&pe(s[o],e,i);null!=n&&Jt(n)}function fe(t,e,i){return this.constructor(t,i)}function _e(t,e,i){return e&&function(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}(t.prototype,e),t}function ge(){return ge=Object.assign||function(t){for(var e=arguments,i=1;i<arguments.length;i++){var s=e[i];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},ge.apply(this,arguments)}Ut={},Zt.prototype.setState=function(t,e){var i=this.__s!==this.state&&this.__s||(this.__s=Yt({},this.state));("function"!=typeof t||(t=t(i,this.props)))&&Yt(i,t),null!=t&&this.__v&&(this.u=!1,e&&this.__h.push(e),ie(this))},Zt.prototype.forceUpdate=function(t){this.__v&&(t&&this.__h.push(t),this.u=!0,ie(this))},Zt.prototype.render=Qt,Ft=[],Wt="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Ht=Ut.debounceRendering,Ut.__e=function(t,e,i){for(var s;e=e.__p;)if((s=e.__c)&&!s.__p)try{if(s.constructor&&null!=s.constructor.getDerivedStateFromError)s.setState(s.constructor.getDerivedStateFromError(t));else{if(null==s.componentDidCatch)continue;s.componentDidCatch(t)}return ie(s.__E=s)}catch(e){t=e}throw t},jt=qt;var me="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",ve="[\\s|\\(]+("+me+")[,|\\s]+("+me+")[,|\\s]+("+me+")\\s*\\)?",ye="[\\s|\\(]+("+me+")[,|\\s]+("+me+")[,|\\s]+("+me+")[,|\\s]+("+me+")\\s*\\)?",be=new RegExp("rgb"+ve),we=new RegExp("rgba"+ye),xe=new RegExp("hsl"+ve),$e=new RegExp("hsla"+ye),ke="^(?:#?|0x?)",Se="([0-9a-fA-F]{1})",Pe="([0-9a-fA-F]{2})",Ee=new RegExp(ke+Se+Se+Se+"$"),Ce=new RegExp(ke+Se+Se+Se+Se+"$"),Ie=new RegExp(ke+Pe+Pe+Pe+"$"),Ae=new RegExp(ke+Pe+Pe+Pe+Pe+"$"),Me=Math.log,Le=Math.round,Re=Math.floor;function Te(t,e,i){return Math.min(Math.max(t,e),i)}function Ne(t,e){var i=t.indexOf("%")>-1,s=parseFloat(t);return i?e/100*s:s}function Oe(t){return parseInt(t,16)}function ze(t){return t.toString(16).padStart(2,"0")}var Be=function(){function t(t,e){this.$={h:0,s:0,v:0,a:1},t&&this.set(t),this.onChange=e,this.initialValue=ge({},this.$)}var e=t.prototype;return e.set=function(e){if("string"==typeof e)/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(e)?this.hexString=e:/^rgba?/.test(e)?this.rgbString=e:/^hsla?/.test(e)&&(this.hslString=e);else{if("object"!=typeof e)throw new Error("Invalid color value");e instanceof t?this.hsva=e.hsva:"r"in e&&"g"in e&&"b"in e?this.rgb=e:"h"in e&&"s"in e&&"v"in e?this.hsv=e:"h"in e&&"s"in e&&"l"in e?this.hsl=e:"kelvin"in e&&(this.kelvin=e.kelvin)}},e.setChannel=function(t,e,i){var s;this[t]=ge({},this[t],((s={})[e]=i,s))},e.reset=function(){this.hsva=this.initialValue},e.clone=function(){return new t(this)},e.unbind=function(){this.onChange=void 0},t.hsvToRgb=function(t){var e=t.h/60,i=t.s/100,s=t.v/100,n=Re(e),o=e-n,r=s*(1-i),a=s*(1-o*i),l=s*(1-(1-o)*i),h=n%6,c=[l,s,s,a,r,r][h],d=[r,r,l,s,s,a][h];return{r:Te(255*[s,a,r,r,l,s][h],0,255),g:Te(255*c,0,255),b:Te(255*d,0,255)}},t.rgbToHsv=function(t){var e=t.r/255,i=t.g/255,s=t.b/255,n=Math.max(e,i,s),o=Math.min(e,i,s),r=n-o,a=0,l=n,h=0===n?0:r/n;switch(n){case o:a=0;break;case e:a=(i-s)/r+(i<s?6:0);break;case i:a=(s-e)/r+2;break;case s:a=(e-i)/r+4}return{h:60*a%360,s:Te(100*h,0,100),v:Te(100*l,0,100)}},t.hsvToHsl=function(t){var e=t.s/100,i=t.v/100,s=(2-e)*i,n=s<=1?s:2-s,o=n<1e-9?0:e*i/n;return{h:t.h,s:Te(100*o,0,100),l:Te(50*s,0,100)}},t.hslToHsv=function(t){var e=2*t.l,i=t.s*(e<=100?e:200-e)/100,s=e+i<1e-9?0:2*i/(e+i);return{h:t.h,s:Te(100*s,0,100),v:Te((e+i)/2,0,100)}},t.kelvinToRgb=function(t){var e,i,s,n=t/100;return n<66?(e=255,i=-155.25485562709179-.44596950469579133*(i=n-2)+104.49216199393888*Me(i),s=n<20?0:.8274096064007395*(s=n-10)-254.76935184120902+115.67994401066147*Me(s)):(e=351.97690566805693+.114206453784165*(e=n-55)-40.25366309332127*Me(e),i=325.4494125711974+.07943456536662342*(i=n-50)-28.0852963507957*Me(i),s=255),{r:Te(Re(e),0,255),g:Te(Re(i),0,255),b:Te(Re(s),0,255)}},t.rgbToKelvin=function(e){for(var i,s=e.r,n=e.b,o=2e3,r=4e4;r-o>.4;){i=.5*(r+o);var a=t.kelvinToRgb(i);a.b/a.r>=n/s?r=i:o=i}return i},_e(t,[{key:"hsv",get:function(){var t=this.$;return{h:t.h,s:t.s,v:t.v}},set:function(t){var e=this.$;if(t=ge({},e,t),this.onChange){var i={h:!1,v:!1,s:!1,a:!1};for(var s in e)i[s]=t[s]!=e[s];this.$=t,(i.h||i.s||i.v||i.a)&&this.onChange(this,i)}else this.$=t}},{key:"hsva",get:function(){return ge({},this.$)},set:function(t){this.hsv=t}},{key:"hue",get:function(){return this.$.h},set:function(t){this.hsv={h:t}}},{key:"saturation",get:function(){return this.$.s},set:function(t){this.hsv={s:t}}},{key:"value",get:function(){return this.$.v},set:function(t){this.hsv={v:t}}},{key:"alpha",get:function(){return this.$.a},set:function(t){this.hsv=ge({},this.hsv,{a:t})}},{key:"kelvin",get:function(){return t.rgbToKelvin(this.rgb)},set:function(e){this.rgb=t.kelvinToRgb(e)}},{key:"red",get:function(){return this.rgb.r},set:function(t){this.rgb=ge({},this.rgb,{r:t})}},{key:"green",get:function(){return this.rgb.g},set:function(t){this.rgb=ge({},this.rgb,{g:t})}},{key:"blue",get:function(){return this.rgb.b},set:function(t){this.rgb=ge({},this.rgb,{b:t})}},{key:"rgb",get:function(){var e=t.hsvToRgb(this.$),i=e.r,s=e.g,n=e.b;return{r:Le(i),g:Le(s),b:Le(n)}},set:function(e){this.hsv=ge({},t.rgbToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"rgba",get:function(){return ge({},this.rgb,{a:this.alpha})},set:function(t){this.rgb=t}},{key:"hsl",get:function(){var e=t.hsvToHsl(this.$),i=e.h,s=e.s,n=e.l;return{h:Le(i),s:Le(s),l:Le(n)}},set:function(e){this.hsv=ge({},t.hslToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"hsla",get:function(){return ge({},this.hsl,{a:this.alpha})},set:function(t){this.hsl=t}},{key:"rgbString",get:function(){var t=this.rgb;return"rgb("+t.r+", "+t.g+", "+t.b+")"},set:function(t){var e,i,s,n,o=1;if((e=be.exec(t))?(i=Ne(e[1],255),s=Ne(e[2],255),n=Ne(e[3],255)):(e=we.exec(t))&&(i=Ne(e[1],255),s=Ne(e[2],255),n=Ne(e[3],255),o=Ne(e[4],1)),!e)throw new Error("Invalid rgb string");this.rgb={r:i,g:s,b:n,a:o}}},{key:"rgbaString",get:function(){var t=this.rgba;return"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"},set:function(t){this.rgbString=t}},{key:"hexString",get:function(){var t=this.rgb;return"#"+ze(t.r)+ze(t.g)+ze(t.b)},set:function(t){var e,i,s,n,o=255;if((e=Ee.exec(t))?(i=17*Oe(e[1]),s=17*Oe(e[2]),n=17*Oe(e[3])):(e=Ce.exec(t))?(i=17*Oe(e[1]),s=17*Oe(e[2]),n=17*Oe(e[3]),o=17*Oe(e[4])):(e=Ie.exec(t))?(i=Oe(e[1]),s=Oe(e[2]),n=Oe(e[3])):(e=Ae.exec(t))&&(i=Oe(e[1]),s=Oe(e[2]),n=Oe(e[3]),o=Oe(e[4])),!e)throw new Error("Invalid hex string");this.rgb={r:i,g:s,b:n,a:o/255}}},{key:"hex8String",get:function(){var t=this.rgba;return"#"+ze(t.r)+ze(t.g)+ze(t.b)+ze(Re(255*t.a))},set:function(t){this.hexString=t}},{key:"hslString",get:function(){var t=this.hsl;return"hsl("+t.h+", "+t.s+"%, "+t.l+"%)"},set:function(t){var e,i,s,n,o=1;if((e=xe.exec(t))?(i=Ne(e[1],360),s=Ne(e[2],100),n=Ne(e[3],100)):(e=$e.exec(t))&&(i=Ne(e[1],360),s=Ne(e[2],100),n=Ne(e[3],100),o=Ne(e[4],1)),!e)throw new Error("Invalid hsl string");this.hsl={h:i,s:s,l:n,a:o}}},{key:"hslaString",get:function(){var t=this.hsla;return"hsla("+t.h+", "+t.s+"%, "+t.l+"%, "+t.a+")"},set:function(t){this.hslString=t}}]),t}();function De(t){var e,i=t.width,s=t.sliderSize,n=t.borderWidth,o=t.handleRadius,r=t.padding,a=t.sliderShape,l="horizontal"===t.layoutDirection;return s=null!=(e=s)?e:2*r+2*o,"circle"===a?{handleStart:t.padding+t.handleRadius,handleRange:i-2*r-2*o,width:i,height:i,cx:i/2,cy:i/2,radius:i/2-n/2}:{handleStart:s/2,handleRange:i-s,radius:s/2,x:0,y:0,width:l?s:i,height:l?i:s}}function Ue(t,e){var i=De(t),s=i.width,n=i.height,o=i.handleRange,r=i.handleStart,a="horizontal"===t.layoutDirection,l=function(t,e){var i=e.hsva,s=e.rgb;switch(t.sliderType){case"red":return s.r/2.55;case"green":return s.g/2.55;case"blue":return s.b/2.55;case"alpha":return 100*i.a;case"kelvin":var n=t.minTemperature,o=t.maxTemperature-n,r=(e.kelvin-n)/o*100;return Math.max(0,Math.min(r,100));case"hue":return i.h/=3.6;case"saturation":return i.s;default:return i.v}}(t,e),h=a?s/2:n/2,c=r+l/100*o;return a&&(c=-1*c+o+2*r),{x:a?h:c,y:a?c:h}}var Fe,We=2*Math.PI,He=function(t,e){return Math.sqrt(t*t+e*e)};function je(t){return t.width/2-t.padding-t.handleRadius-t.borderWidth}function qe(t){var e=t.width/2;return{width:t.width,radius:e-t.borderWidth,cx:e,cy:e}}function Ve(t,e,i){var s=t.wheelAngle,n=t.wheelDirection;return i&&"clockwise"===n?e=s+e:"clockwise"===n?e=360-s+e:i&&"anticlockwise"===n?e=s+180-e:"anticlockwise"===n&&(e=s-e),function(t,e){return(t%e+e)%e}(e,360)}function Xe(t,e,i){var s=qe(t),n=s.cx,o=s.cy,r=je(t);e=n-e,i=o-i;var a=Ve(t,Math.atan2(-i,-e)*(360/We)),l=Math.min(He(e,i),r);return{h:Math.round(a),s:Math.round(100/r*l)}}function Ye(t){var e=t.width,i=t.boxHeight;return{width:e,height:null!=i?i:e,radius:t.padding+t.handleRadius}}function Je(t,e,i){var s=Ye(t),n=s.width,o=s.height,r=s.radius,a=(e-r)/(n-2*r)*100,l=(i-r)/(o-2*r)*100;return{s:Math.max(0,Math.min(a,100)),v:Math.max(0,Math.min(100-l,100))}}function Ke(t){Fe||(Fe=document.getElementsByTagName("base"));var e=window.navigator.userAgent,i=/^((?!chrome|android).)*safari/i.test(e),s=/iPhone|iPod|iPad/i.test(e),n=window.location;return(i||s)&&Fe.length>0?n.protocol+"//"+n.host+n.pathname+n.search+t:t}function Ge(t,e,i,s){for(var n=0;n<s.length;n++){var o=s[n].x-e,r=s[n].y-i;if(Math.sqrt(o*o+r*r)<t.handleRadius)return n}return null}function Qe(t){return{boxSizing:"border-box",border:t.borderWidth+"px solid "+t.borderColor}}function Ze(t,e,i){return t+"-gradient("+e+", "+i.map(function(t){var e=t[0];return t[1]+" "+e+"%"}).join(",")+")"}function ti(t){return"string"==typeof t?t:t+"px"}var ei=["mousemove","touchmove","mouseup","touchend"],ii=function(t){function e(e){t.call(this,e),this.uid=(Math.random()+1).toString(36).substring(5)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.render=function(t){var e=this.handleEvent.bind(this),i={onMouseDown:e,ontouchstart:e},s="horizontal"===t.layoutDirection,n=null===t.margin?t.sliderMargin:t.margin,o={overflow:"visible",display:s?"inline-block":"block"};return t.index>0&&(o[s?"marginLeft":"marginTop"]=n),Kt(Qt,null,t.children(this.uid,i,o))},e.prototype.handleEvent=function(t){var e=this,i=this.props.onInput,s=this.base.getBoundingClientRect();t.preventDefault();var n=t.touches?t.changedTouches[0]:t,o=n.clientX-s.left,r=n.clientY-s.top;switch(t.type){case"mousedown":case"touchstart":!1!==i(o,r,0)&&ei.forEach(function(t){document.addEventListener(t,e,{passive:!1})});break;case"mousemove":case"touchmove":i(o,r,1);break;case"mouseup":case"touchend":i(o,r,2),ei.forEach(function(t){document.removeEventListener(t,e,{passive:!1})})}},e}(Zt);function si(t){var e=t.r,i=t.url,s=e,n=e;return Kt("svg",{className:"IroHandle IroHandle--"+t.index+" "+(t.isActive?"IroHandle--isActive":""),style:{"-webkit-tap-highlight-color":"rgba(0, 0, 0, 0);",transform:"translate("+ti(t.x)+", "+ti(t.y)+")",willChange:"transform",top:ti(-e),left:ti(-e),width:ti(2*e),height:ti(2*e),position:"absolute",overflow:"visible"}},i&&Kt("use",Object.assign({xlinkHref:Ke(i)},t.props)),!i&&Kt("circle",{cx:s,cy:n,r:e,fill:"none","stroke-width":2,stroke:"#000"}),!i&&Kt("circle",{cx:s,cy:n,r:e-2,fill:t.fill,"stroke-width":2,stroke:"#fff"}))}function ni(t){var e=t.activeIndex,i=void 0!==e&&e<t.colors.length?t.colors[e]:t.color,s=De(t),n=s.width,o=s.height,r=s.radius,a=Ue(t,i),l=function(t,e){var i=e.hsv,s=e.rgb;switch(t.sliderType){case"red":return[[0,"rgb(0,"+s.g+","+s.b+")"],[100,"rgb(255,"+s.g+","+s.b+")"]];case"green":return[[0,"rgb("+s.r+",0,"+s.b+")"],[100,"rgb("+s.r+",255,"+s.b+")"]];case"blue":return[[0,"rgb("+s.r+","+s.g+",0)"],[100,"rgb("+s.r+","+s.g+",255)"]];case"alpha":return[[0,"rgba("+s.r+","+s.g+","+s.b+",0)"],[100,"rgb("+s.r+","+s.g+","+s.b+")"]];case"kelvin":for(var n=[],o=t.minTemperature,r=t.maxTemperature,a=r-o,l=o,h=0;l<r;l+=a/8,h+=1){var c=Be.kelvinToRgb(l),d=c.r,u=c.g,p=c.b;n.push([12.5*h,"rgb("+d+","+u+","+p+")"])}return n;case"hue":return[[0,"#f00"],[16.666,"#ff0"],[33.333,"#0f0"],[50,"#0ff"],[66.666,"#00f"],[83.333,"#f0f"],[100,"#f00"]];case"saturation":var f=Be.hsvToHsl({h:i.h,s:0,v:i.v}),_=Be.hsvToHsl({h:i.h,s:100,v:i.v});return[[0,"hsl("+f.h+","+f.s+"%,"+f.l+"%)"],[100,"hsl("+_.h+","+_.s+"%,"+_.l+"%)"]];default:var g=Be.hsvToHsl({h:i.h,s:i.s,v:100});return[[0,"#000"],[100,"hsl("+g.h+","+g.s+"%,"+g.l+"%)"]]}}(t,i);return Kt(ii,Object.assign({},t,{onInput:function(e,s,n){var o=function(t,e,i){var s,n=De(t),o=n.handleRange,r=n.handleStart;s="horizontal"===t.layoutDirection?-1*i+o+r:e-r,s=Math.max(Math.min(s,o),0);var a=Math.round(100/o*s);switch(t.sliderType){case"kelvin":var l=t.minTemperature;return l+(t.maxTemperature-l)*(a/100);case"alpha":return a/100;case"hue":return 3.6*a;case"red":case"blue":case"green":return 2.55*a;default:return a}}(t,e,s);t.parent.inputActive=!0,i[t.sliderType]=o,t.onInput(n,t.id)}}),function(e,s,h){return Kt("div",Object.assign({},s,{className:"IroSlider",style:Object.assign({},{position:"relative",width:ti(n),height:ti(o),borderRadius:ti(r),background:"conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)",backgroundSize:"8px 8px"},h)}),Kt("div",{className:"IroSliderGradient",style:Object.assign({},{position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:ti(r),background:Ze("linear","horizontal"===t.layoutDirection?"to top":"to right",l)},Qe(t))}),Kt(si,{isActive:!0,index:i.index,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:a.x,y:a.y}))})}function oi(t){var e=Ye(t),i=e.width,s=e.height,n=e.radius,o=t.colors,r=t.parent,a=t.activeIndex,l=void 0!==a&&a<t.colors.length?t.colors[a]:t.color,h=[[[0,"#fff"],[100,"hsl("+l.hue+",100%,50%)"]],[[0,"rgba(0,0,0,0)"],[100,"#000"]]],c=o.map(function(e){return function(t,e){var i=Ye(t),s=i.width,n=i.height,o=i.radius,r=e.hsv,a=o,l=s-2*o,h=n-2*o;return{x:a+r.s/100*l,y:a+(h-r.v/100*h)}}(t,e)});return Kt(ii,Object.assign({},t,{onInput:function(e,i,s){if(0===s){var n=Ge(t,e,i,c);null!==n?r.setActiveColor(n):(r.inputActive=!0,l.hsv=Je(t,e,i),t.onInput(s,t.id))}else 1===s&&(r.inputActive=!0,l.hsv=Je(t,e,i));t.onInput(s,t.id)}}),function(e,r,a){return Kt("div",Object.assign({},r,{className:"IroBox",style:Object.assign({},{width:ti(i),height:ti(s),position:"relative"},a)}),Kt("div",{className:"IroBox",style:Object.assign({},{width:"100%",height:"100%",borderRadius:ti(n)},Qe(t),{background:Ze("linear","to bottom",h[1])+","+Ze("linear","to right",h[0])})}),o.filter(function(t){return t!==l}).map(function(e){return Kt(si,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:c[e.index].x,y:c[e.index].y})}),Kt(si,{isActive:!0,index:l.index,fill:l.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:c[l.index].x,y:c[l.index].y}))})}si.defaultProps={fill:"none",x:0,y:0,r:8,url:null,props:{x:0,y:0}},ni.defaultProps=Object.assign({},{sliderShape:"bar",sliderType:"value",minTemperature:2200,maxTemperature:11e3});function ri(t){var e=qe(t).width,i=t.colors;t.borderWidth;var s=t.parent,n=t.color,o=n.hsv,r=i.map(function(e){return function(t,e){var i=e.hsv,s=qe(t),n=s.cx,o=s.cy,r=je(t),a=(180+Ve(t,i.h,!0))*(We/360),l=i.s/100*r,h="clockwise"===t.wheelDirection?-1:1;return{x:n+l*Math.cos(a)*h,y:o+l*Math.sin(a)*h}}(t,e)}),a={position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:"50%",boxSizing:"border-box"};return Kt(ii,Object.assign({},t,{onInput:function(e,i,o){if(0===o){if(!function(t,e,i){var s=qe(t),n=s.cx,o=s.cy,r=t.width/2;return He(n-e,o-i)<r}(t,e,i))return!1;var a=Ge(t,e,i,r);null!==a?s.setActiveColor(a):(s.inputActive=!0,n.hsv=Xe(t,e,i),t.onInput(o,t.id))}else 1===o&&(s.inputActive=!0,n.hsv=Xe(t,e,i));t.onInput(o,t.id)}}),function(s,l,h){return Kt("div",Object.assign({},l,{className:"IroWheel",style:Object.assign({},{width:ti(e),height:ti(e),position:"relative"},h)}),Kt("div",{className:"IroWheelHue",style:Object.assign({},a,{transform:"rotateZ("+(t.wheelAngle+90)+"deg)",background:"clockwise"===t.wheelDirection?"conic-gradient(red, yellow, lime, aqua, blue, magenta, red)":"conic-gradient(red, magenta, blue, aqua, lime, yellow, red)"})}),Kt("div",{className:"IroWheelSaturation",style:Object.assign({},a,{background:"radial-gradient(circle closest-side, #fff, transparent)"})}),t.wheelLightness&&Kt("div",{className:"IroWheelLightness",style:Object.assign({},a,{background:"#000",opacity:1-o.v/100})}),Kt("div",{className:"IroWheelBorder",style:Object.assign({},a,Qe(t))}),i.filter(function(t){return t!==n}).map(function(e){return Kt(si,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:r[e.index].x,y:r[e.index].y})}),Kt(si,{isActive:!0,index:n.index,fill:n.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:r[n.index].x,y:r[n.index].y}))})}var ai=function(t){function e(e){var i=this;t.call(this,e),this.colors=[],this.inputActive=!1,this.events={},this.activeEvents={},this.deferredEvents={},this.id=e.id,(e.colors.length>0?e.colors:[e.color]).forEach(function(t){return i.addColor(t)}),this.setActiveColor(0),this.state=Object.assign({},e,{color:this.color,colors:this.colors,layout:e.layout})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.addColor=function(t,e){void 0===e&&(e=this.colors.length);var i=new Be(t,this.onColorChange.bind(this));this.colors.splice(e,0,i),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),this.deferredEmit("color:init",i)},e.prototype.removeColor=function(t){var e=this.colors.splice(t,1)[0];e.unbind(),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),e.index===this.color.index&&this.setActiveColor(0),this.emit("color:remove",e)},e.prototype.setActiveColor=function(t){this.color=this.colors[t],this.state&&this.setState({color:this.color}),this.emit("color:setActive",this.color)},e.prototype.setColors=function(t,e){var i=this;void 0===e&&(e=0),this.colors.forEach(function(t){return t.unbind()}),this.colors=[],t.forEach(function(t){return i.addColor(t)}),this.setActiveColor(e),this.emit("color:setAll",this.colors)},e.prototype.on=function(t,e){var i=this,s=this.events;(Array.isArray(t)?t:[t]).forEach(function(t){(s[t]||(s[t]=[])).push(e),i.deferredEvents[t]&&(i.deferredEvents[t].forEach(function(t){e.apply(null,t)}),i.deferredEvents[t]=[])})},e.prototype.off=function(t,e){var i=this;(Array.isArray(t)?t:[t]).forEach(function(t){var s=i.events[t];s&&s.splice(s.indexOf(e),1)})},e.prototype.emit=function(t){for(var e=this,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var n=this.activeEvents;!!n.hasOwnProperty(t)&&n[t]||(n[t]=!0,(this.events[t]||[]).forEach(function(t){return t.apply(e,i)}),n[t]=!1)},e.prototype.deferredEmit=function(t){for(var e,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var n=this.deferredEvents;(e=this).emit.apply(e,[t].concat(i)),(n[t]||(n[t]=[])).push(i)},e.prototype.setOptions=function(t){this.setState(t)},e.prototype.resize=function(t){this.setOptions({width:t})},e.prototype.reset=function(){this.colors.forEach(function(t){return t.reset()}),this.setState({colors:this.colors})},e.prototype.onMount=function(t){this.el=t,this.deferredEmit("mount",this)},e.prototype.onColorChange=function(t,e){this.setState({color:this.color}),this.inputActive&&(this.inputActive=!1,this.emit("input:change",t,e)),this.emit("color:change",t,e)},e.prototype.emitInputEvent=function(t,e){0===t?this.emit("input:start",this.color,e):1===t?this.emit("input:move",this.color,e):2===t&&this.emit("input:end",this.color,e)},e.prototype.render=function(t,e){var i=this,s=e.layout;return Array.isArray(s)||(s=[{component:ri},{component:ni}],e.transparency&&s.push({component:ni,options:{sliderType:"alpha"}})),Kt("div",{class:"IroColorPicker",id:e.id,style:{display:e.display}},s.map(function(t,s){var n=t.component,o=t.options;return Kt(n,Object.assign({},e,o,{ref:void 0,onInput:i.emitInputEvent.bind(i),parent:i,index:s}))}))},e}(Zt);ai.defaultProps=Object.assign({},{width:300,height:300,color:"#fff",colors:[],padding:6,layoutDirection:"vertical",borderColor:"#fff",borderWidth:0,handleRadius:8,activeHandleRadius:null,handleSvg:null,handleProps:{x:0,y:0},wheelLightness:!0,wheelAngle:0,wheelDirection:"anticlockwise",sliderSize:null,sliderMargin:12,boxHeight:null},{colors:[],display:"block",id:null,layout:"default",margin:null});var li,hi,ci,di=(hi=function(t,e){var i,s=document.createElement("div");function n(){var e=t instanceof Element?t:document.querySelector(t);e.appendChild(i.base),i.onMount(e)}return function(t,e,i){var s,n,o;Ut.__p&&Ut.__p(t,e),n=(s=i===jt)?null:e.__k,t=Kt(Qt,null,[t]),o=[],he(e,e.__k=t,n||qt,qt,void 0!==e.ownerSVGElement,n?null:Vt.slice.call(e.childNodes),o,!1,qt,s),ce(o,t)}(Kt(li,Object.assign({},{ref:function(t){return i=t}},e)),s),"loading"!==document.readyState?n():document.addEventListener("DOMContentLoaded",n),i},hi.prototype=(li=ai).prototype,Object.assign(hi,li),hi.__component=li,hi);!function(t){var e;t.version="5.5.2",t.Color=Be,t.ColorPicker=di,(e=t.ui||(t.ui={})).h=Kt,e.ComponentBase=ii,e.Handle=si,e.Slider=ni,e.Wheel=ri,e.Box=oi}(ci||(ci={}));var ui=ci;const pi="wled_studio.color_swatches";function fi(t){return t.trim()||"_default"}function _i(){try{const t=localStorage.getItem(pi);if(!t)return{};const e=JSON.parse(t);return e&&"object"==typeof e?e:{}}catch{return{}}}function gi(t){const e=_i()[fi(t)];return Array.isArray(e)?[...e]:[]}function mi(t,e){const i=_i();var s;i[fi(t)]=e.slice(0,32),s=i,localStorage.setItem(pi,JSON.stringify(s))}function vi(t,e){return`${t[0]},${t[1]},${t[2]},${e}`}function yi(t,e){const i="#"+[t[0],t[1],t[2]].map(t=>Math.max(0,Math.min(255,t)).toString(16).padStart(2,"0")).join("");return e>0?`${i} +W`:i.toUpperCase()}let bi=class extends kt{constructor(){super(...arguments),this.controllerId="",this.rgb=[255,128,0],this.white=0,this._swatches=[],this._saving=!1,this._saveName="",this._editingId=null,this._editName="",this._pressTimer=null,this._pressSwatch=null,this._suppressChipClick=!1}onPoweredConnect(){this._reload()}updated(t){super.updated(t),t.has("controllerId")&&this._reload()}_reload(){this._swatches=gi(this.controllerId)}_currentKey(){return vi(this.rgb,this.white)}_swatchCss(t){const[e,i,s]=t.rgb;return t.white>0?`linear-gradient(135deg, rgb(${e},${i},${s}) 55%, rgba(255,255,255,0.95) 55%)`:`rgb(${e},${i},${s})`}_apply(t){this.dispatchEvent(new CustomEvent("swatch-select",{detail:{rgb:[...t.rgb],white:t.white},bubbles:!0,composed:!0}))}_openSave(){this._saveName=yi(this.rgb,this.white),this._saving=!0,this._editingId=null}_confirmSave(){!function(t,e){const i=gi(t),s=vi(e.rgb,e.white),n=i.find(t=>vi(t.rgb,t.white)===s);if(n)return n.name=e.name.trim()||n.name,mi(t,i),n;const o={id:`sw_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`,name:e.name.trim()||yi(e.rgb,e.white),rgb:[...e.rgb],white:e.white};i.unshift(o),mi(t,i)}(this.controllerId,{name:this._saveName,rgb:this.rgb,white:this.white}),this._saving=!1,this._reload(),this.dispatchEvent(new CustomEvent("swatches-changed",{bubbles:!0,composed:!0}))}_cancelSave(){this._saving=!1}_startEdit(t,e){e.stopPropagation(),this._editingId=t.id,this._editName=t.name,this._saving=!1}_confirmEdit(){this._editingId&&(!function(t,e,i){const s=gi(t),n=s.findIndex(t=>t.id===e);if(n<0)return null;const o=s[n],r={...o,...i,rgb:i.rgb?[...i.rgb]:o.rgb};void 0!==i.name&&(r.name=i.name.trim()||yi(r.rgb,r.white)),s[n]=r,mi(t,s)}(this.controllerId,this._editingId,{name:this._editName}),this._editingId=null,this._reload())}_cancelEdit(){this._editingId=null}_delete(t,e){e?.stopPropagation(),function(t,e){const i=gi(t).filter(t=>t.id!==e);mi(t,i)}(this.controllerId,t),this._editingId===t&&(this._editingId=null),this._reload(),this.dispatchEvent(new CustomEvent("swatches-changed",{bubbles:!0,composed:!0}))}_clearPressTimer(){null!==this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null),this._pressSwatch=null}_confirmDelete(t){confirm(`Delete swatch "${t.name}"?`)&&this._delete(t.id),this._suppressChipClick=!1}_onChipTouchStart(t){this._clearPressTimer(),this._pressSwatch=t,this._pressTimer=setTimeout(()=>{this._pressTimer=null,this._suppressChipClick=!0,this._confirmDelete(t)},500)}_onChipTouchEnd(){this._clearPressTimer()}_onChipTouchMove(t){if(!this._pressSwatch||1!==t.touches.length)return;const e=t.touches[0],i=t.currentTarget.getBoundingClientRect();(e.clientX<i.left-12||e.clientX>i.right+12||e.clientY<i.top-12||e.clientY>i.bottom+12)&&this._clearPressTimer()}_onChipClick(t,e){if(this._suppressChipClick)return this._suppressChipClick=!1,e.preventDefault(),void e.stopPropagation();this._apply(t)}render(){const t=this._currentKey();return H`
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

        ${this._saving?H`
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

        ${this._editingId?H`
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

        ${0!==this._swatches.length||this._saving?H`
              <div class="grid" role="list">
                ${this._swatches.map(e=>H`
                    <div
                      class="chip-wrap ${vi(e.rgb,e.white)===t?"active":""}"
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
            `:H`<p class="empty">Save colors you use often — tap a swatch to apply.</p>`}
      </section>
    `}static{this.styles=[...$t,r`
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
    `]}};t([ct()],bi.prototype,"controllerId",void 0),t([ct({type:Array})],bi.prototype,"rgb",void 0),t([ct({type:Number})],bi.prototype,"white",void 0),t([dt()],bi.prototype,"_swatches",void 0),t([dt()],bi.prototype,"_saving",void 0),t([dt()],bi.prototype,"_saveName",void 0),t([dt()],bi.prototype,"_editingId",void 0),t([dt()],bi.prototype,"_editName",void 0),bi=t([vt("wled-color-swatch-bar")],bi);let wi=class extends kt{constructor(){super(...arguments),this.rgb=[255,128,0],this.white=0,this.awm=0,this.showWhite=!0,this.controllerId="",this._suppress=!1,this._lastSize=0}onPoweredConnect(){this.isPowered&&this.scheduleRaf(()=>{this.isPowered&&this._ensurePicker()})}firstUpdated(){this.isPowered&&this._bindResizeObserver()}onPoweredDisconnect(){this._destroyPicker(),super.onPoweredDisconnect()}updated(t){super.updated(t),this.isPowered?this.updateComplete.then(()=>{this.isConnected&&this.isPowered&&(this._ensurePicker(),this._picker&&t.has("rgb")&&this._syncPicker())}):this._destroyPicker()}_pickerInDom(){const t=this._host;return!!t&&Boolean(t.querySelector(".IroColorPicker, .IroWheel"))}_ensurePicker(){this._picker&&!this._pickerInDom()&&this._destroyPicker(),this._picker||this._tryMountOrResize()}_bindResizeObserver(){const t=this._host;t&&!this._ro&&(this._ro=new ResizeObserver(()=>{this.isPowered&&this._ensurePicker()}),this._ro.observe(t),this.addUnsub(()=>{this._ro?.disconnect(),this._ro=void 0}),this.isPowered&&this._ensurePicker())}_hostBox(t){const e=t.getBoundingClientRect();let i=e.width,s=e.height;if((i<8||s<8)&&(i=t.offsetWidth,s=t.offsetHeight),i<8||s<8){const e=getComputedStyle(t);i=parseFloat(e.width)||0,s=parseFloat(e.height)||0}if(i<8||s<8){const t=this.getBoundingClientRect();i=t.width||this.offsetWidth,s=t.height||this.offsetHeight}if(i>=8&&s<8&&(s=i),i<8&&s>=8&&(i=s),i<8&&s<8){const t=this.offsetWidth||280;i=Math.min(280,t),s=i}return{width:i,height:s}}_wheelSize(t,e){return function(t){const e=Math.floor(.7*t);return Math.max(180,Math.min(280,e||180))}(Math.min(t,e))}_tryMountOrResize(){const t=this._host;if(!t)return;const{width:e,height:i}=this._hostBox(t);if(e<8||i<8)return;const s=this._wheelSize(e,i);this._picker?s!==this._lastSize&&"function"==typeof this._picker.resize&&(this._picker.resize(s),this._lastSize=s):this._createPicker(t,s)}_borderColor(){return getComputedStyle(this).getPropertyValue("--wled-border").trim()||"rgba(255, 255, 255, 0.12)"}_createPicker(t,e){this._picker||(t.replaceChildren(),this._lastSize=e,this._picker=ui.ColorPicker(t,{width:e,color:{r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},borderWidth:1,borderColor:this._borderColor(),layout:[{component:ui.ui.Wheel}]}),this._picker.on("color:change",t=>{this._suppress||this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:[t.rgb.r,t.rgb.g,t.rgb.b],white:this.white},bubbles:!0,composed:!0}))}),this._syncPicker())}_destroyPicker(){this._host?.replaceChildren(),this._picker=void 0,this._lastSize=0}_syncPicker(){this._picker&&(this._suppress=!0,this._picker.color.rgb={r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},this._suppress=!1)}_onWhite(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:this.rgb,white:e},bubbles:!0,composed:!0}))}_onAwm(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("awm-change",{detail:{awm:e},bubbles:!0,composed:!0}))}_onSwatchSelect(t){this.dispatchEvent(new CustomEvent("color-change",{detail:t.detail,bubbles:!0,composed:!0}))}render(){return H`
      <div class="picker">
        <div class="wrap">
          <div class="wheel-host" aria-label="Color wheel"></div>
          <div class="extras">
            ${this.showWhite?H`
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
        ${this.controllerId?H`
              <wled-color-swatch-bar
                .controllerId=${this.controllerId}
                .rgb=${this.rgb}
                .white=${this.white}
                @swatch-select=${this._onSwatchSelect}
              ></wled-color-swatch-bar>
            `:null}
      </div>
    `}static{this.styles=[...$t,r`
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
    `]}};t([ct({type:Array,hasChanged:(t,e)=>!t||!e||!function(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}(t,e)})],wi.prototype,"rgb",void 0),t([ct({type:Number})],wi.prototype,"white",void 0),t([ct({type:Number})],wi.prototype,"awm",void 0),t([ct({type:Boolean})],wi.prototype,"showWhite",void 0),t([ct()],wi.prototype,"controllerId",void 0),t([ut(".wheel-host")],wi.prototype,"_host",void 0),wi=t([vt("wled-color-wheel-rgbw")],wi);function xi(t,e="strip",i,s=0){let n=String(t);return s&&(n=`${n}_p${s}`),i?.trim()&&(n=`${n}_${function(t){return(t||"").trim().replace(/[^\w.-]+/g,"_")||"unknown"}(i)}`),`${n}_${e}.webp`}function $i(t,e,i="strip",s,n=0){const o=e instanceof Set?e:new Set(e);if(!o.size)return;const r=[xi(t,i,s,n),xi(t,i,s),xi(t,i,void 0,n),xi(t,i)];for(const t of r)if(o.has(t))return t;const a=n?`${t}_p${n}_`:`${t}_`,l=`_${i}.webp`;for(const t of o)if(t.startsWith(a)&&t.endsWith(l))return t;return n?$i(t,o,i,s,0):void 0}function ki(t,e,i="strip",s,n,o,r=0){if(!t||e<0)return;const a=void 0!==o?$i(e,o,i,s,r):xi(e,i,s,r);return a?function(t,e){if(!t.startsWith("/"))return t;const i=e?.auth?.data?.access_token;if(!i)return t;const s=t.includes("?")?"&":"?";return`${t}${s}auth=${encodeURIComponent(i)}`}(function(t,e){return`/local/wled_studio/thumbs/${encodeURIComponent(t)}/${encodeURIComponent(e)}`}(t,a),n):void 0}const Si="wled_studio.recent_effects";function Pi(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function Ei(t){return t?Pi(Si)[t]??[]:[]}function Ci(t,e,i,s){if(!t)return[];if(e===(s.solidId??0))return Ei(t);const n=Pi(Si),o=(n[t]??[]).filter(t=>t.id!==e);return o.unshift({id:e,name:i}),n[t]=o.slice(0,10),function(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}(Si,n),n[t]}const Ii="wled_studio.pinned_effects";function Ai(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function Mi(t,e,i){if(!t)return[];const s=Ai(Ii),n=s[t]??[],o=n.findIndex(t=>t.id===e);return o>=0?n.splice(o,1):n.unshift({id:e,name:i}),s[t]=n,function(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}(Ii,s),s[t]}let Li=class extends kt{constructor(){super(...arguments),this.fxId=0,this.thumbUrl="",this.thumbUrlAnimated="",this.label="",this.listboxOption=!1,this.selected=!1,this._hover=!1}render(){const t=this.thumbUrlAnimated||(this.thumbUrl.endsWith(".webp")?this.thumbUrl:""),e=this.thumbUrl||t,i=this._hover&&t?t:e,s=this.label||`Effect ${this.fxId}`;return H`
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
        ${i?H`<img
              class="thumb"
              src=${i}
              alt=""
              loading="lazy"
              decoding="async"
              @error=${t=>{t.target.style.display="none"}}
            />`:H`<span class="placeholder" aria-hidden="true"></span>`}
        <span class="label">${this.label}</span>
      </button>
    `}static{this.styles=[...$t,r`
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
    `]}};t([ct({type:Number})],Li.prototype,"fxId",void 0),t([ct()],Li.prototype,"thumbUrl",void 0),t([ct()],Li.prototype,"thumbUrlAnimated",void 0),t([ct()],Li.prototype,"label",void 0),t([ct({type:Boolean,attribute:"listbox-option"})],Li.prototype,"listboxOption",void 0),t([ct({type:Boolean})],Li.prototype,"selected",void 0),t([dt()],Li.prototype,"_hover",void 0),Li=t([vt("wled-effect-tile")],Li);let Ri=class extends kt{constructor(){super(...arguments),this.effectsByName={},this.soundFlags=[],this.selectedFx=0,this.filter="",this.controllerId="",this.fwVer="",this.thumbBasenames=[],this.toggleOff=!0,this.showRecents=!0,this.tileGrid=!1,this.scrollPane=!1,this.selectedPalette=0,this.paletteAware=!1,this._category="all",this._recentEntries=[],this._pinnedEntries=[],this._recentVisible=6}onPoweredConnect(){this._loadRecents(),this._ro=new ResizeObserver(()=>this._measureRecents()),this.addUnsub(()=>this._ro?.disconnect())}updated(t){t.has("controllerId")&&this._loadRecents();const e=this.renderRoot.querySelector(".recent-row");e&&e!==this._recentRowEl&&(this._recentRowEl=e,this._ro?.observe(e),this._measureRecents())}_loadRecents(){var t;this._recentEntries=Ei(this.controllerId),this._pinnedEntries=(t=this.controllerId)?Ai(Ii)[t]??[]:[],this.soundFlags.length&&!this.soundFlags.some(t=>"v"===t||"f"===t)&&console.debug(`[wled-studio] sound_flags for ${this.controllerId} contain no v/f entries — Music filter will rely on name heuristics`)}_togglePin(t,e){e.stopPropagation(),this.controllerId&&(this._pinnedEntries=Mi(this.controllerId,t,this._effectName(t)))}_measureRecents(){const t=this._recentRowEl;if(!t)return;const e=function(t,e=72,i=6,s=10){if(t<=0)return 1;const n=e+i;return Math.max(1,Math.min(s,Math.floor((t+i)/n)))}(t.clientWidth,76,6,10);e!==this._recentVisible&&(this._recentVisible=e)}_effectName(t){return Object.entries(this.effectsByName).find(([,e])=>e===t)?.[0]??`Effect ${t}`}render(){const t=this.filter.trim().toLowerCase(),e=Object.keys(this.effectsByName).sort((t,e)=>t.localeCompare(e)),i=zt(this.effectsByName),s=e.filter(e=>!!Dt(e,this.effectsByName[e],this._category,this.soundFlags,this.effectsByName)&&!(t&&!e.toLowerCase().includes(t))),n=this.showRecents&&!t&&this._recentEntries.length>0,o=this._recentEntries.slice(0,this._recentVisible),r=!t&&this._pinnedEntries.length>0;return H`
      <div
        class="wrap ${this.tileGrid?"tile-grid":""} ${this.scrollPane?"scroll-pane":""}"
      >
        ${r?H`
              <div class="recent-block">
                <span class="recent-label">Library</span>
                <div class="recent-row" role="group" aria-label="Pinned effects">
                  ${this._pinnedEntries.map(t=>{const e=t.id,s=t.name,n=e===this.selectedFx;return H`
                      <button
                        type="button"
                        class="recent-chip library ${n?"active":""}"
                        aria-label=${`Apply pinned effect ${s}`}
                        aria-pressed=${n?"true":"false"}
                        @click=${()=>this._pick(e,i)}
                      >
                        ${s}
                      </button>
                    `})}
                </div>
              </div>
            `:null}
        ${n?H`
              <div class="recent-block">
                <span class="recent-label">Recent</span>
                <div class="recent-row" role="group" aria-label="Recent effects">
                  ${o.map(t=>{const e=t.id,s=t.name,n=this.soundFlags[e],o=e===this.selectedFx;return H`
                      <button
                        type="button"
                        class="recent-chip ${o?"active":""}"
                        aria-label=${`Apply effect ${s}`}
                        aria-pressed=${o?"true":"false"}
                        @click=${()=>this._pick(e,i)}
                      >
                        ${s}
                        ${"v"===n?H`<span class="badge">♪</span>`:null}
                        ${"f"===n?H`<span class="badge">♫</span>`:null}
                        ${"2"===n?H`<span class="badge dim">2D</span>`:null}
                      </button>
                    `})}
                </div>
              </div>
            `:null}
        <div class="filters" role="tablist" aria-label="Effect categories">
          ${["all","1d","2d","sound","palette","solid"].map(t=>H`
              <button
                type="button"
                class="cat ${this._category===t?"active":""}"
                role="tab"
                aria-selected=${this._category===t?"true":"false"}
                @click=${()=>{this._category=t}}
              >
                ${Ot[t]}
              </button>
            `)}
        </div>
        <div class="grid" role="listbox" aria-label="Effects">
          ${0===s.length?H`<p class="empty">No effects match this filter.</p>`:s.map(t=>{const e=this.effectsByName[t],s=this.soundFlags[e],n=e===this.selectedFx,o=ki(this.controllerId,e,"strip",this.fwVer,this.hass,this.thumbBasenames,this.paletteAware?this.selectedPalette:0),r=t+("v"===s?" ♪":"")+("f"===s?" ♫":"")+("2"===s?" 2D":"");return o?H`
                    <wled-effect-tile
                      class="chip-tile ${n?"active":""}"
                      listbox-option
                      .selected=${n}
                      .fxId=${e}
                      .thumbUrl=${o}
                      .label=${r}
                      @click=${()=>this._pick(e,i)}
                    ></wled-effect-tile>
                  `:H`
                  <button
                    type="button"
                    class="chip ${n?"active":""}"
                    role="option"
                    aria-selected=${n?"true":"false"}
                    aria-label=${r}
                    @click=${()=>this._pick(e,i)}
                  >
                    ${t}
                    ${"v"===s?H`<span class="badge" title="Volume reactive">♪</span>`:null}
                    ${"f"===s?H`<span class="badge" title="Frequency reactive">♫</span>`:null}
                    ${"2"===s?H`<span class="badge dim" title="2D matrix">2D</span>`:null}
                  </button>
                `})}
        </div>
        <div class="footer-row">
          <p class="count">${s.length} effects</p>
          ${this.controllerId&&this.selectedFx>=0?H`
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
    `}_pick(t,e){this.toggleOff&&t===this.selectedFx?this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:e,toggledOff:!0},bubbles:!0,composed:!0})):(this.showRecents&&this.controllerId&&(this._recentEntries=Ci(this.controllerId,t,this._effectName(t),{solidId:e})),this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:t,toggledOff:!1},bubbles:!0,composed:!0})))}static{this.styles=[...$t,r`
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
    `]}};t([ct({type:Object})],Ri.prototype,"effectsByName",void 0),t([ct({type:Array})],Ri.prototype,"soundFlags",void 0),t([ct({type:Number})],Ri.prototype,"selectedFx",void 0),t([ct({type:String})],Ri.prototype,"filter",void 0),t([ct()],Ri.prototype,"controllerId",void 0),t([ct()],Ri.prototype,"fwVer",void 0),t([ct({type:Array})],Ri.prototype,"thumbBasenames",void 0),t([ct({type:Boolean})],Ri.prototype,"toggleOff",void 0),t([ct({type:Boolean})],Ri.prototype,"showRecents",void 0),t([ct({type:Boolean,attribute:"tile-grid"})],Ri.prototype,"tileGrid",void 0),t([ct({type:Boolean,attribute:"scroll-pane"})],Ri.prototype,"scrollPane",void 0),t([ct({type:Number})],Ri.prototype,"selectedPalette",void 0),t([ct({type:Boolean,attribute:"palette-aware"})],Ri.prototype,"paletteAware",void 0),t([dt()],Ri.prototype,"_category",void 0),t([dt()],Ri.prototype,"_recentEntries",void 0),t([dt()],Ri.prototype,"_pinnedEntries",void 0),t([dt()],Ri.prototype,"_recentVisible",void 0),Ri=t([vt("wled-effect-chips")],Ri);const Ti={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let Ni=class extends kt{constructor(){super(...arguments),this.controllerId="",this.heading="Brush",this.showOnToggle=!1,this._loadingEffects=!0,this._error="",this._effectFilter=""}onPoweredConnect(){this._load()}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._load(),t.has("settings")&&void 0!==this.settings?.fx&&this._refreshMeta()}async _load(){if(this.connection&&this.controllerId){this._loadingEffects=!0,this._error="";try{this._snapshot=await Pt(this.connection,this.controllerId),await this._refreshMeta()}catch(t){this._error=St(t)}finally{this._loadingEffects=!1}}}async _refreshMeta(){this.connection&&this.controllerId&&this.settings&&(this._meta=await async function(t,e,i){return(await t.sendMessagePromise({type:"wled_studio/effect_meta",schema_version:1,controller_id:e,effect_id:i})).meta??{sliders:{},colors_enabled:!0,palette_enabled:!0,flag:null,defaults:{}}}(this.connection,this.controllerId,this.settings.fx))}_emit(t){const e={...this.settings,...t};this.dispatchEvent(new CustomEvent("settings-change",{detail:e,bubbles:!0,composed:!0}))}_onColor(t){const{rgb:e,white:i}=t.detail,s={col:[e[0],e[1],e[2],i]};"Fill look"!==this.heading&&(s.fx=zt(this._snapshot?.effects_by_name??{})),this._emit(s)}async _onEffectSelect(t){this._emit({fx:t.detail.effectId}),await this._refreshMeta()}_slider(t,e){const i=e.target.value;if(t.startsWith("o"))return void this._emit({[t]:Number(i)>0});const s=function(t){return Number.isFinite(t)?Math.min(255,Math.max(0,Math.round(t))):null}(Number(i));null!==s&&this._emit({[t]:s})}render(){if(!this.settings)return null;const t=!(e=this.settings.col)||e.length<3?[255,255,255,0]:[e[0]??0,e[1]??0,e[2]??0,e[3]??0];var e;const i=this._meta,s=i?.sliders??{},n=this._snapshot?.rgbwm??0;return H`
      <div class="block">
        <h3 class="heading">${this.heading}</h3>
        ${this._error?H`<p class="err">${this._error}</p>`:null}
        ${this.showOnToggle?H`
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
          .awm=${n}
          .showWhite=${(this._snapshot?.led_order??0)>0}
          @color-change=${this._onColor}
        ></wled-color-wheel-rgbw>

        ${this._loadingEffects?H`<p class="muted">Loading effects…</p>`:H`
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
                ${Object.entries(Ti).map(([t,e])=>{if(!s[t])return null;const i=this.settings[t];return"boolean"==typeof i?H`
                      <label class="row">
                        <input
                          type="checkbox"
                          .checked=${i}
                          @change=${e=>this._slider(t,e)}
                        />
                        ${e}
                      </label>
                    `:H`
                    <label>
                      ${e}
                      <ha-slider
                        min="0"
                        max="255"
                        step="1"
                        .value=${i}
                        @change=${e=>this._slider(t,e)}
                      ></ha-slider>
                    </label>
                  `})}
              </div>
            `}
      </div>
    `}static{this.styles=[...$t,r`
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
    `]}};t([ct({attribute:!1})],Ni.prototype,"connection",void 0),t([ct({attribute:!1})],Ni.prototype,"hass",void 0),t([ct()],Ni.prototype,"controllerId",void 0),t([ct()],Ni.prototype,"heading",void 0),t([ct({attribute:!1})],Ni.prototype,"settings",void 0),t([ct({type:Boolean})],Ni.prototype,"showOnToggle",void 0),t([dt()],Ni.prototype,"_loadingEffects",void 0),t([dt()],Ni.prototype,"_error",void 0),t([dt()],Ni.prototype,"_snapshot",void 0),t([dt()],Ni.prototype,"_meta",void 0),t([dt()],Ni.prototype,"_effectFilter",void 0),Ni=t([vt("wled-paint-settings")],Ni);const Oi=.55,zi=1,Bi=1,Di=0,Ui=0,Fi=0,Wi=1,Hi=0,ji=0,qi=1,Vi=1;function Xi(t){return function(t,e){return t?{url:t,opacity:e?.opacity??Oi,brightness:e?.brightness??zi,saturation:e?.saturation??Bi,rotation:e?.rotation??Di,offsetX:e?.offsetX??Ui,offsetY:e?.offsetY??Fi,scale:e?.scale??Wi,cropX:e?.cropX??Hi,cropY:e?.cropY??ji,cropW:e?.cropW??qi,cropH:e?.cropH??Vi}:null}(t.background?.url??t.background_url,t.background??null)}function Yi(t,e=!1){return new Promise((i,s)=>{const n=new Image;n.onload=()=>i(n),n.onerror=()=>s(new Error(`Could not load image (${t})`)),function(t,e,i=!1){let s=e;if(i&&!s.includes("?")&&(s=`${s}?v=${Date.now()}`),t.removeAttribute("crossorigin"),s.startsWith("http://")||s.startsWith("https://"))try{new URL(s,window.location.href).origin!==window.location.origin&&(t.crossOrigin="anonymous")}catch{t.crossOrigin="anonymous"}t.src=s}(n,t,e)})}let Ji=class extends kt{constructor(){super(...arguments),this.controllerId="",this.layoutId="",this.fixtureId="",this.pixelCount=210,this.dotRadius=4,this.compact=!1,this.heightPx=200,this.externalLive=!1,this.paintMode=!1,this.paintLivePreview=!1,this.paintBrushSize=6,this.segments=[],this.selectedSegId=-1,this.highlightSegIds=[],this._positions=[],this._status="waiting",this._showDots=!1,this._closed=!1,this._bgLayer=null,this._bgImage=null,this._raf=0,this._hoverLed=-1,this._painting=!1,this._lastLivePaintMs=0,this._onCanvasClick=t=>{if(this.paintMode)return;const e=this._ledAtEvent(t);if(e<0)return;const i=this._segmentForLed(e);i<0||this.dispatchEvent(new CustomEvent("segment-select",{detail:{segmentId:i,ledIndex:e},bubbles:!0,composed:!0}))},this._onPaintPointerDown=t=>{if(!this.paintMode)return;this._painting=!0,t.target.setPointerCapture(t.pointerId);const e=this._ledAtEvent(t);this._emitPaintStroke(e)},this._onPaintPointerMove=t=>{if(!this.paintMode||!this._painting)return;const e=this._ledAtEvent(t);this._emitPaintStroke(e)},this._onPaintPointerUp=t=>{if(this.paintMode){this._painting=!1;try{t.target.releasePointerCapture(t.pointerId)}catch{}}},this._onPaintPointerLeave=()=>{this._painting=!1},this._onCanvasMove=t=>{const e=this._ledAtEvent(t);e!==this._hoverLed&&(this._hoverLed=e,this._schedPaint())},this._onCanvasLeave=()=>{this._hoverLed>=0&&(this._hoverLed=-1,this._schedPaint())}}setFrame(t){if(t&&(!this.paintMode||this.paintLivePreview)){if(this.paintMode&&this.paintLivePreview){const t=performance.now();if(t-this._lastLivePaintMs<50)return;this._lastLivePaintMs=t}this._pixels=function(t,e){const i=new Uint8ClampedArray(4*e);for(let s=0;s<e;s++){const e=Math.min(t.count-1,Math.max(0,Math.round(s/t.scale))),n=t.leds_hex[e]??"000000",o=4*s;8===n.length?(i[o]=parseInt(n.slice(0,2),16),i[o+1]=parseInt(n.slice(2,4),16),i[o+2]=parseInt(n.slice(4,6),16),i[o+3]=parseInt(n.slice(6,8),16)):(i[o]=parseInt(n.slice(0,2),16),i[o+1]=parseInt(n.slice(2,4),16),i[o+2]=parseInt(n.slice(4,6),16),i[o+3]=255)}return i}(t,this.pixelCount),this._status="live",this._schedPaint()}}setPaintPixels(t){this._paintPixels=t??void 0,this.paintMode&&(this._status=t?"paint":"ready"),this._schedPaint()}setStatus(t){this._status=t,this.requestUpdate()}async refresh(){await this._resolvePositions()}onPoweredConnect(){this._resolvePositions(),this._syncLiveSubscription()}onPoweredDisconnect(){this._raf&&cancelAnimationFrame(this._raf),this._raf=0,this._resizeObs?.disconnect(),this._unsubLive?.(),this._unsubLive=void 0}_wantsLiveStream(){return!this.externalLive||this.paintMode&&this.paintLivePreview}_syncLiveSubscription(){this._wantsLiveStream()?this._unsubLive||this._attachLiveStream():(this._unsubLive?.(),this._unsubLive=void 0)}updated(t){super.updated(t),(t.has("connection")||t.has("controllerId")||t.has("layoutId")||t.has("fixtureId"))&&(this._resolvePositions(),this._syncLiveSubscription()),(t.has("externalLive")||t.has("paintLivePreview")||t.has("paintMode"))&&this._syncLiveSubscription(),(t.has("selectedSegId")||t.has("highlightSegIds")||t.has("segments")||t.has("paintMode"))&&(this._schedPaint(),t.has("paintMode")&&this._canvas&&(this._canvas.style.cursor=this.paintMode?"crosshair":"pointer",this.paintMode&&queueMicrotask(()=>this._onResize())))}firstUpdated(){if(this._canvas=this.renderRoot.querySelector("canvas")??void 0,this._canvas){this._ctx=this._canvas.getContext("2d",{alpha:!0})??void 0,this._resizeObs=new ResizeObserver(()=>this._onResize()),this._resizeObs.observe(this._canvas);const t=this._canvas;t.style.touchAction="none",t.addEventListener("pointerdown",this._onPaintPointerDown),t.addEventListener("pointermove",this._onPaintPointerMove),t.addEventListener("pointerup",this._onPaintPointerUp),t.addEventListener("pointerleave",this._onPaintPointerLeave),t.addEventListener("click",this._onCanvasClick),t.addEventListener("mousemove",this._onCanvasMove),t.addEventListener("mouseleave",this._onCanvasLeave),this.addUnsub(()=>{t.removeEventListener("pointerdown",this._onPaintPointerDown),t.removeEventListener("pointermove",this._onPaintPointerMove),t.removeEventListener("pointerup",this._onPaintPointerUp),t.removeEventListener("pointerleave",this._onPaintPointerLeave),t.removeEventListener("click",this._onCanvasClick),t.removeEventListener("mousemove",this._onCanvasMove),t.removeEventListener("mouseleave",this._onCanvasLeave)})}this._onResize()}_emitPaintStroke(t){if(t<0)return;const e=Math.max(1,Math.floor(this.paintBrushSize/2)),i=[];for(let s=-e;s<=e;s++){const e=t+s;e>=0&&e<this.pixelCount&&i.push(e)}i.length&&this.dispatchEvent(new CustomEvent("paint-stroke",{detail:{led:t,leds:i},bubbles:!0,composed:!0}))}_segmentForLed(t){for(const e of this.segments){const i=e.start??0,s=e.stop??e.len??this.pixelCount;if(t>=i&&t<s)return e.id}return 1===this.segments.length?this.segments[0].id:-1}_ledInSegment(t,e){if(e<0)return!1;const i=this.segments.find(t=>t.id===e);if(!i)return!1;const s=i.start??0,n=i.stop??i.len??this.pixelCount;return t>=s&&t<n}_ledAtEvent(t){const e=this._hitTest(t.clientX,t.clientY);return e?.led??-1}_logicalCanvasSize(){const t=this._canvas;if(!t)return{w:0,h:0};const e=Math.min(2,window.devicePixelRatio||1);return{w:t.width/e,h:t.height/e}}_pointerToLogical(t,e){const i=this._canvas;if(!i)return null;const s=i.getBoundingClientRect();if(s.width<1||s.height<1)return null;const{w:n,h:o}=this._logicalCanvasSize();return[(t-s.left)/s.width*n,(e-s.top)/s.height*o]}_hitTest(t,e){if(!this._canvas||0===this._positions.length)return null;const i=this._pointerToLogical(t,e);if(!i)return null;const[s,n]=i,{w:o,h:r}=this._logicalCanvasSize(),a=this._layoutMap(o,r);if(!a)return null;const{toCanvas:l,hitR:h}=a;let c=null,d=h*h;for(const t of this._positions){const[e,i]=l(t.x,t.y),o=e-s,r=i-n,a=o*o+r*r;a<d&&(d=a,c=t)}return c}_positionExtents(){if(0===this._positions.length)return null;let t=1/0,e=-1/0,i=1/0,s=-1/0;for(const n of this._positions)n.x<t&&(t=n.x),n.x>e&&(e=n.x),n.y<i&&(i=n.y),n.y>s&&(s=n.y);return{minX:t,maxX:e,minY:i,maxY:s,rangeX:e-t||1,rangeY:s-i||1}}_applyLayoutAspectCss(){if(!this.paintMode)return void this.style.removeProperty("--wled-layout-aspect");const t=this._positionExtents();if(!t)return void this.style.removeProperty("--wled-layout-aspect");const e=Math.max(.35,Math.min(3.5,t.rangeX/t.rangeY));this.style.setProperty("--wled-layout-aspect",String(e)),queueMicrotask(()=>this._onResize())}_layoutMap(t,e){const i=this._positionExtents();if(!i)return null;const{minX:s,minY:n,rangeX:o,rangeY:r}=i,a=this.dotRadius,l=this.paintMode?2*a:3*a,h=(t-2*l)/o,c=(e-2*l)/r,d=Math.min(h,c),u=this.compact?Math.max(8,3*a):Math.max(3.5,1.75*a);return{toCanvas:(t,e)=>[l+(t-s)*d,l+(e-n)*d],hitR:Math.max(10,2.5*u),lineW:u}}_accentStroke(){return getComputedStyle(this).getPropertyValue("--wled-accent").trim()||"#03a9f4"}_surfaceFill(){return getComputedStyle(this).getPropertyValue("--wled-surface").trim()||"#1e1e1e"}_onResize(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect();if(e.width<2||e.height<2)return;const i=Math.min(1200,Math.max(1,Math.floor(e.width))),s=Math.min(600,Math.max(1,Math.floor(e.height))),n=Math.min(2,window.devicePixelRatio||1),o=Math.floor(i*n),r=Math.floor(s*n);if(t.width!==o||t.height!==r){t.width=o,t.height=r;const e=this._ctx;e&&e.setTransform(n,0,0,n,0,0),this._schedPaint()}}async _resolvePositions(){if(this.connection&&this.controllerId&&this.fixtureId)try{if(this.layoutId){const t=await async function(t,e,i){return(await Et(t,{type:"wled_studio/layout_get",controller_id:e,layout_id:i})).layout??null}(this.connection,this.controllerId,this.layoutId);if(t){this._bgLayer=Xi(t),this._loadBackgroundImage();const e=t.fixtures??[],i=this.fixtureId?e.find(t=>String(t.id??"")===this.fixtureId):e[0];this._closed=Boolean(i?.closed??!1)}}this._positions=await async function(t,e,i,s){return(await Et(t,{type:"wled_studio/layout_resolve_positions",controller_id:e,fixture_id:i,layout_id:s})).positions??[]}(this.connection,this.controllerId,this.fixtureId,this.layoutId||void 0),this._applyLayoutAspectCss(),queueMicrotask(()=>this._onResize()),this._schedPaint()}catch{this._positions=[],this._applyLayoutAspectCss()}}_loadBackgroundImage(){const t=this._bgLayer?.url;t?Yi(t).then(t=>{this._bgImage=t,this._schedPaint()},()=>{this._bgImage=null}):this._bgImage=null}_attachLiveStream(){this.connection&&this.controllerId&&!this._unsubLive&&(this._unsubLive=_t(this.connection,this.controllerId,t=>{this.setFrame(t)}),this.addUnsub(()=>{this._unsubLive?.(),this._unsubLive=void 0}))}_schedPaint(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this._paint()}))}_rgbForLed(t,e){if(!t)return[80,80,80];const i=4*e;return[t[i],t[i+1],t[i+2]]}_paint(){const t=this._ctx,e=this._canvas;if(!t||!e)return;const{w:i,h:s}=this._logicalCanvasSize();if(i<1||s<1)return;t.clearRect(0,0,i,s),t.fillStyle=this._surfaceFill(),t.fillRect(0,0,i,s),this._bgImage?.complete&&this._bgLayer&&function(t,e,i,s,n){const o=n.opacity??Oi,r=n.brightness??1,a=n.saturation??1,l=(n.rotation??0)*Math.PI/180,h=(n.offsetX??0)*e,c=(n.offsetY??0)*i,d=n.scale??1,u=n.cropX??0,p=n.cropY??0,f=n.cropW??1,_=n.cropH??1,g=s.naturalWidth*f,m=s.naturalHeight*_,v=s.naturalWidth*u,y=s.naturalHeight*p,b=Math.max(e/g,i/m)*d,w=g*b,x=m*b;t.save(),t.globalAlpha=o,t.filter=`brightness(${r}) saturate(${a})`,t.translate(e/2+h,i/2+c),t.rotate(l),t.drawImage(s,v,y,g,m,-w/2,-x/2,w,x),t.restore()}(t,i,s,this._bgImage,this._bgLayer);const n=this.paintMode&&this._paintPixels&&!this.paintLivePreview?this._paintPixels:this._pixels,o=[...this._positions].sort((t,e)=>t.led-e.led),r=this.dotRadius,a=this._layoutMap(i,s);if(o.length>0&&a){const{toCanvas:e,lineW:i}=a,s=this.remote.state.disableBloom;if(!this._showDots){t.lineCap="round",t.lineJoin="round",t.lineWidth=i;const r=(o,r)=>{const[a,l]=e(o.x,o.y),[h,c]=e(r.x,r.y),[d,u,p]=this._rgbForLed(n,o.led);!s&&(d>10||u>10||p>10)?(t.shadowColor=`rgba(${d},${u},${p},0.55)`,t.shadowBlur=i*(this.compact?2:1.5)):t.shadowBlur=0,t.strokeStyle=`rgb(${d},${u},${p})`,t.beginPath(),t.moveTo(a,l),t.lineTo(h,c),t.stroke()};for(let t=0;t<o.length-1;t++)r(o[t],o[t+1]);this._closed&&o.length>=2&&r(o[o.length-1],o[0]),t.shadowBlur=0}if(this._showDots){for(const{x:i,y:a,led:l}of o){const[o,h]=e(i,a),[c,d,u]=this._rgbForLed(n,l);!s&&(c>10||d>10||u>10)?(t.shadowColor=`rgba(${c},${d},${u},0.7)`,t.shadowBlur=2.5*r):t.shadowBlur=0,t.beginPath(),t.arc(o,h,r,0,2*Math.PI),t.fillStyle=`rgb(${c},${d},${u})`,t.fill()}t.shadowBlur=0}this.paintMode?this._hoverLed>=0&&this._paintBrushHover(t,o,e):this._paintSegmentSelection(t,o,e,i)}else{const e=this.pixelCount,o=(i-8)/e,a=s/2;for(let i=0;i<e;i++){let e=80,s=80,l=80;if(n){const t=4*i;e=n[t],s=n[t+1],l=n[t+2]}t.beginPath(),t.arc(4+i*o+o/2,a,r,0,2*Math.PI),t.fillStyle=`rgb(${e},${s},${l})`,t.fill()}}}_paintBrushHover(t,e,i){const s=e.find(t=>t.led===this._hoverLed);if(!s)return;const[n,o]=i(s.x,s.y),r=Math.max(8,2.5*this.dotRadius);t.save(),t.strokeStyle="rgba(255, 255, 255, 0.9)",t.lineWidth=2,t.beginPath(),t.arc(n,o,r,0,2*Math.PI),t.stroke(),t.strokeStyle=this._accentStroke(),t.lineWidth=1.5,t.beginPath(),t.moveTo(n-r-4,o),t.lineTo(n+r+4,o),t.moveTo(n,o-r-4),t.lineTo(n,o+r+4),t.stroke(),t.restore()}_highlightIds(){if(this.highlightSegIds.length)return[...new Set(this.highlightSegIds)];if(this.selectedSegId>=0)return[this.selectedSegId];if(this._hoverLed>=0){const t=this._segmentForLed(this._hoverLed);return t>=0?[t]:[]}return[]}_paintSegmentSelection(t,e,i,s){const n=this._highlightIds();if(!n.length||0===this.segments.length)return;const o=this._accentStroke(),r=Math.max(1.25,Math.min(2.5,.45*s));t.save(),t.lineCap="round",t.lineJoin="round",t.shadowBlur=0;for(const s of n){const n=e.filter(t=>this._ledInSegment(t.led,s)).sort((t,e)=>t.led-e.led);if(n.length<2)continue;const[a,l]=i(n[0].x,n[0].y);t.beginPath(),t.moveTo(a,l);for(let e=1;e<n.length;e++){const[s,o]=i(n[e].x,n[e].y);t.lineTo(s,o)}t.strokeStyle="rgba(0, 0, 0, 0.55)",t.lineWidth=r+1.5,t.stroke(),t.strokeStyle=o,t.lineWidth=r,t.stroke()}t.restore()}render(){const t=this.paintMode?"Paint on layout — drag along the fixture path":this.compact?"Live layout preview — tap the strip to select a segment":"LED geometry preview — positions mapped from fixture layout",e=!this.paintMode&&"live"!==this._status&&"paint"!==this._status;return H`
      <div class="preview-shell ${this.compact?"compact":""} ${this.paintMode?"paint":""}">
        ${this.compact||this.paintMode?null:H`
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
          ${e?H`<span class="overlay">${this._status}</span>`:null}
          ${this.paintMode&&0===this._positions.length?H`<span class="overlay">No layout — create one in Layout view</span>`:null}
        </div>
      </div>
    `}static{this.styles=[...$t,r`
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
    `]}};t([ct({attribute:!1})],Ji.prototype,"connection",void 0),t([ct()],Ji.prototype,"controllerId",void 0),t([ct()],Ji.prototype,"layoutId",void 0),t([ct()],Ji.prototype,"fixtureId",void 0),t([ct({type:Number})],Ji.prototype,"pixelCount",void 0),t([ct({type:Number})],Ji.prototype,"dotRadius",void 0),t([ct({type:Boolean,reflect:!0})],Ji.prototype,"compact",void 0),t([ct({type:Number})],Ji.prototype,"heightPx",void 0),t([ct({type:Boolean})],Ji.prototype,"externalLive",void 0),t([ct({type:Boolean,reflect:!0})],Ji.prototype,"paintMode",void 0),t([ct({type:Boolean})],Ji.prototype,"paintLivePreview",void 0),t([ct({type:Number})],Ji.prototype,"paintBrushSize",void 0),t([ct({type:Array})],Ji.prototype,"segments",void 0),t([ct({type:Number})],Ji.prototype,"selectedSegId",void 0),t([ct({type:Array})],Ji.prototype,"highlightSegIds",void 0),t([dt()],Ji.prototype,"_positions",void 0),t([dt()],Ji.prototype,"_status",void 0),t([dt()],Ji.prototype,"_showDots",void 0),t([dt()],Ji.prototype,"_closed",void 0),Ji=t([vt("wled-geometry-preview")],Ji);let Ki=class extends kt{constructor(){super(...arguments),this.controllerId="",this.embedMode=!1,this.embedLayoutId="",this.embedFixtureId="",this.embedPixelCount=0,this._pixelCount=210,this._rgbw=!0,this._active=!1,this._brush=It(),this._fill=At("off"),this._brushSize=6,this._status="",this._warn="",this._effectsByName={},this._layouts=[],this._layoutId="",this._fixtureId="",this._buffer=null,this._previewPixels=null,this._touched=new Set,this._flushInFlight=!1,this._flushQueued=!1,this._flushColor=function(t,e){let i,s,n=0;const o=(...o)=>{s=o;const r=Date.now(),a=r-n;if(a>=e)return n=r,i&&(clearTimeout(i),i=void 0),void t(...o);i||(i=setTimeout(()=>{i=void 0,n=Date.now(),s&&t(...s)},e-a))};return o.cancel=()=>{i&&clearTimeout(i),i=void 0,s=void 0},o}(()=>{this._flushNow()},20),this._flushEffect=function(t,e,i=100){let s,n,o;const r=()=>{if(s&&clearTimeout(s),n&&clearTimeout(n),s=n=void 0,o){const e=o;o=void 0,t(...e)}},a=(...t)=>{o=t,s&&clearTimeout(s),s=setTimeout(r,e),n||(n=setTimeout(r,i))};return a.cancel=()=>{s&&clearTimeout(s),n&&clearTimeout(n),s=n=void 0,o=void 0},a}(()=>{this._flushNow()},60,180)}_previewEl(){return this.embedMode?this._externalPreview:this._internalPreview}get brushSize(){return this._brushSize}get paintLivePreview(){return this._brushIsEffect()}get paintExternalLive(){return!this._brushIsEffect()}bindExternalPreview(t){this._externalPreview=t,t&&this._active&&t.setStatus("live paint"),t&&this._previewPixels?this._syncPreviewPixels():t&&t.refresh()}handleExternalPaintStroke(t){this._onPaintStroke(t)}_emitPaintConfig(){this.dispatchEvent(new CustomEvent("paint-config-change",{bubbles:!0,composed:!0}))}_brushIsEffect(){return"effect"===Mt(this._brush,this._effectsByName)}updated(t){(t.has("_fill")||t.has("_brush")||t.has("_buffer")||t.has("_layoutId"))&&(this._applyFillToBuffer(),this._brushIsEffect()?this._previewEl()?.setPaintPixels(null):this._syncPreviewPixels()),(t.has("_brush")||t.has("_brushSize"))&&(this.requestUpdate(),this._emitPaintConfig()),this.embedMode&&(t.has("embedLayoutId")||t.has("embedFixtureId")||t.has("embedPixelCount"))&&(this.embedLayoutId&&(this._layoutId=this.embedLayoutId),this.embedFixtureId&&(this._fixtureId=this.embedFixtureId),this.embedPixelCount>0&&(this._pixelCount=this.embedPixelCount),this._previewEl()?.refresh())}async onPoweredConnect(){if(this.connection&&this.controllerId)try{const[t,e]=await Promise.all([Pt(this.connection,this.controllerId),Ct(this.connection,this.controllerId)]),i=t.info?.leds;i?.count&&(this._pixelCount=i.count),"boolean"==typeof i?.rgbw&&(this._rgbw=i.rgbw),this._effectsByName=t.effects_by_name??{};const s=t.segments?.[0];if(s){const t=s.col?.[0],e=Array.isArray(t)&&t.length>=3?[t[0],t[1],t[2],t[3]??0]:void 0;this._brush=It(s.fx??0,e)}this._layouts=e,this.embedMode&&this.embedLayoutId?(this._layoutId=this.embedLayoutId,this._fixtureId=this.embedFixtureId||"fixture-0",this.embedPixelCount>0&&(this._pixelCount=this.embedPixelCount)):this._applyLayout(e[0]),this._allocBuffer(),this._status=this.embedMode?this._layoutId?"Drag on the strip preview to paint":"Create a layout in Studio → Layout first":e.length?"Drag on the layout to paint":"Create a layout in the Layout tab first"}catch(t){this._status=St(t)}}_applyLayout(t){if(!t)return this._layoutId="",void(this._fixtureId="");this._layoutId=t.id;const e=t.fixtures[0];this._fixtureId=e?String(e.id??"fixture-0"):"fixture-0",t.pixel_count&&(this._pixelCount=t.pixel_count),this._previewEl()?.refresh()}_onLayoutPick(t){const e=t.target.value,i=this._layouts.find(t=>t.id===e);this._applyLayout(i),this._allocBuffer()}async onPoweredDisconnect(){if(this._flushColor.cancel(),this._flushEffect.cancel(),this._active&&this.connection&&this.controllerId)try{await Tt(this.connection,this.controllerId,!1)}catch{}this._active=!1,this._touched.clear()}async _ensureSession(){if(this._active||!this.connection||!this.controllerId)return this._active;try{const t=await async function(t,e){return Lt(t,{type:"wled_studio/paint_start",controller_id:e})}(this.connection,this.controllerId);return this._active=!0,this._touched.clear(),this._warn=t.wifi_sleep_warning??"",t.pixel_count&&(this._pixelCount=t.pixel_count),"boolean"==typeof t.rgbw&&(this._rgbw=t.rgbw),this._allocBuffer(),this._previewEl()?.setStatus("live paint"),this._status="Live paint",!0}catch(t){return this._status=St(t),!1}}_allocBuffer(){const t=this._rgbw?4:3;this._buffer=new Uint8Array(this._pixelCount*t),this._previewPixels=null,this._applyFillToBuffer(),this._syncPreviewPixels()}_syncPreviewPixels(t){const e=this._previewEl();if(!this._buffer||!e)return;if(!this._previewPixels||this._previewPixels.length!==4*this._pixelCount)this._previewPixels=Nt(this._buffer,this._pixelCount,this._rgbw);else if(t?.length){const e=this._rgbw?4:3,i=this._previewPixels;for(const s of t){const t=s*e,n=4*s;i[n]=this._buffer[t]??0,i[n+1]=this._buffer[t+1]??0,i[n+2]=this._buffer[t+2]??0,i[n+3]=this._rgbw?this._buffer[t+3]??0:255}}else this._previewPixels=Nt(this._buffer,this._pixelCount,this._rgbw);e.setPaintPixels(this._previewPixels)}_brushRgb(){const t=Math.max(0,Math.min(255,this._brush.bri))/255;return[Math.round(this._brush.col[0]*t),Math.round(this._brush.col[1]*t),Math.round(this._brush.col[2]*t)]}async cancelLiveIfActive(){if(!this._active||!this.connection||!this.controllerId)return!1;this._flushColor.cancel(),this._flushEffect.cancel();try{await Tt(this.connection,this.controllerId,!1),this._status="Live paint ended — layout segments restored",this._previewEl()?.setStatus("ready")}catch(t){return this._status=St(t),!1}return this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels(),this.dispatchEvent(new CustomEvent("wled-paint-ended",{bubbles:!0,composed:!0})),this._emitPaintConfig(),!0}_writeLed(t,e){if(!this._buffer)return;const i=t*(this._rgbw?4:3);this._buffer[i]=e[0],this._buffer[i+1]=e[1],this._buffer[i+2]=e[2],this._rgbw&&(this._buffer[i+3]=0)}_applyFillToBuffer(){if(!this._buffer)return;const t="off"===this._fill.mode?[0,0,0]:"custom"===this._fill.mode?[this._fill.col[0],this._fill.col[1],this._fill.col[2]]:[40,40,40];for(let e=0;e<this._pixelCount;e++)this._touched.has(e)||this._writeLed(e,t)}_scheduleFlush(){this._brushIsEffect()?this._flushEffect():this._flushColor()}_strokeLeds(t){if(!this._buffer||!t.length)return;if(this._brushIsEffect()){for(const e of t)this._touched.add(e);this._previewEl()?.setPaintPixels(null)}else{const e=this._brushRgb();for(const i of t)this._writeLed(i,e),this._touched.add(i);this._syncPreviewPixels(t)}this._scheduleFlush()}async _onPaintStroke(t){await this._ensureSession()&&this._strokeLeds(t.detail.leds)}async _flushNow(){if(this._active&&this.connection&&this._buffer)if(this._flushInFlight)this._flushQueued=!0;else{this._flushInFlight=!0;try{await Rt(this.connection,this.controllerId,this._buffer,{rgbw:this._rgbw,touched:[...this._touched],brush:this._brush,fill:this._fill,effectsByName:this._effectsByName});const t=this._brushIsEffect()?"effect (device preview)":"color";this._status=`Live paint · ${this._touched.size} LEDs · ${t} · fill: ${this._fill.mode}`}catch(t){this._status=St(t)}finally{this._flushInFlight=!1,this._flushQueued&&(this._flushQueued=!1,this._flushNow())}}}_onBrushChange(t){this._brush=t.detail,this._emitPaintConfig(),this._active&&this._scheduleFlush()}_onFillChange(t){this._fill={...t.detail,mode:this._fill.mode},this._applyFillToBuffer(),this._syncPreviewPixels(),this._active&&this._scheduleFlush()}_onFillModeChange(t){this._fill=At(t),this._applyFillToBuffer(),this._syncPreviewPixels(),this._active&&this._flushNow()}async _commit(){if(this.connection&&this._active){this._flushColor.cancel(),this._flushEffect.cancel(),await this._flushNow();try{await Tt(this.connection,this.controllerId,!0),this._status="Committed to WLED",this._previewEl()?.setStatus("committed")}catch(t){this._status=St(t)}this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels()}}async _cancel(){if(this.connection&&this._active){this._flushColor.cancel(),this._flushEffect.cancel();try{await Tt(this.connection,this.controllerId,!1),this._status="Live mode released",this._previewEl()?.setStatus("ready")}catch(t){this._status=St(t)}this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels()}}render(){const t=Boolean(this._layoutId),e=this.embedMode;return H`
      <section class="paint ${e?"compact":""}">
        ${e?null:H`
              <p class="lead">
                Paint on your saved fixture layout (${this._pixelCount} LEDs). Unpainted
                areas use the fill below (default <strong>Off</strong>).
              </p>
            `}
        ${this._warn?H`<p class="warn">${this._warn}</p>`:null}

        ${!this.embedMode&&this._layouts.length>1?H`
              <label class="layout-pick">
                Layout
                <select .value=${this._layoutId} @change=${this._onLayoutPick}>
                  ${this._layouts.map(t=>H`<option value=${t.id}>${t.name||t.id}</option>`)}
                </select>
              </label>
            `:t?null:H`
                <p class="hint warn-layout">
                  No layout saved —
                  ${this.embedMode?H`open <strong>Studio → Layout</strong> first.`:H`open <strong>Layout</strong> and save a fixture path first.`}
                </p>
              `}

        ${this.embedMode?null:H`
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
            ${"custom"===this._fill.mode?H`
                  <wled-paint-settings
                    .connection=${this.connection}
                    .hass=${this.hass}
                    .controllerId=${this.controllerId}
                    heading="Fill look"
                    .settings=${this._fill}
                    .showOnToggle=${!0}
                    @settings-change=${this._onFillChange}
                  ></wled-paint-settings>
                `:"preserve"===this._fill.mode?H`<p class="hint">Unpainted LEDs keep colors from before live paint.</p>`:H`<p class="hint">Unpainted LEDs commit as off.</p>`}
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
    `}static{this.styles=[...$t,r`
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
    `]}};t([ct({attribute:!1})],Ki.prototype,"connection",void 0),t([ct({attribute:!1})],Ki.prototype,"hass",void 0),t([ct()],Ki.prototype,"controllerId",void 0),t([ct({type:Boolean,attribute:"embed-mode"})],Ki.prototype,"embedMode",void 0),t([ct()],Ki.prototype,"embedLayoutId",void 0),t([ct()],Ki.prototype,"embedFixtureId",void 0),t([ct({type:Number})],Ki.prototype,"embedPixelCount",void 0),t([dt()],Ki.prototype,"_pixelCount",void 0),t([dt()],Ki.prototype,"_rgbw",void 0),t([dt()],Ki.prototype,"_active",void 0),t([dt()],Ki.prototype,"_brush",void 0),t([dt()],Ki.prototype,"_fill",void 0),t([dt()],Ki.prototype,"_brushSize",void 0),t([dt()],Ki.prototype,"_status",void 0),t([dt()],Ki.prototype,"_warn",void 0),t([dt()],Ki.prototype,"_effectsByName",void 0),t([dt()],Ki.prototype,"_layouts",void 0),t([dt()],Ki.prototype,"_layoutId",void 0),t([dt()],Ki.prototype,"_fixtureId",void 0),t([ut("wled-geometry-preview")],Ki.prototype,"_internalPreview",void 0),Ki=t([vt("wled-view-paint")],Ki);const Gi="wled-painter-card";class Qi extends rt{constructor(){super(...arguments),this._controllerId="",this._hint="Connecting to WLED Studio…",this._resolving=!1}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config=t,this._resolvedKey=void 0}getCardSize(){return 10}static getStubConfig(){return{type:`custom:${Gi}`,controller:"Cloud"}}updated(t){(t.has("hass")||t.has("_config"))&&this.hass?.connection&&this._resolve()}_pick(t){const e=(this._config?.controller??"").trim();if(!e)return t[0];const i=e.toLowerCase();return t.find(t=>{const s=String(t.title??"");return String(t.entry_id??"")===e||s===e||s.toLowerCase().includes(i)||s.toLowerCase().endsWith(`— ${i}`)||s.toLowerCase().endsWith(`- ${i}`)})??t[0]}async _resolve(){const t=(this._config?.controller??"").trim();if(this._resolving)return;if(this._controllerId&&this._resolvedKey===t)return;const e=this.hass?.connection;if(!e)return;this._resolving=!0;const i=[0,400,1200,2500];for(const e of i){if(e>0&&await new Promise(t=>setTimeout(t,e)),!this.hass?.connection)break;try{const e=await mt(this.hass.connection),i=this._pick(e);if(i?.entry_id)return this._controllerId=String(i.entry_id),this._resolvedKey=t,this._hint="",this._resolving=!1,void this.requestUpdate();this._hint=e.length?"WLED Studio controller not found.":"No WLED Studio controllers found. Add the integration under Settings → Devices & services."}catch{this._hint="Connecting to WLED Studio…"}this.requestUpdate()}this._resolving=!1}render(){return this._config&&this.hass?this._controllerId?H`
      <ha-card class="wled-painter-card">
        <wled-view-paint
          .connection=${this.hass.connection}
          .hass=${this.hass}
          .controllerId=${this._controllerId}
        ></wled-view-paint>
      </ha-card>
    `:H`<ha-card class="wled-painter-card"
        ><div class="hint">${this._hint}</div></ha-card
      >`:q}static{this.styles=[pt,r`
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
    `]}}t([ct({attribute:!1})],Qi.prototype,"hass",void 0),t([dt()],Qi.prototype,"_config",void 0),t([dt()],Qi.prototype,"_controllerId",void 0),t([dt()],Qi.prototype,"_hint",void 0),function(t,e){const i=customElements.get(t);i||customElements.define(t,e)}(Gi,Qi),window.customCards=window.customCards||[],window.customCards.some(t=>t.type===Gi)||window.customCards.push({type:Gi,name:"WLED Painter",description:"Per-LED painter for a WLED Studio controller",preview:!1}),console.info("[wled-studio] painter bundle loaded",{card:Gi});export{Gi as PAINTER_TAG,Qi as WledPainterCard};
//# sourceMappingURL=wled-painter-card.js.map

import{b as t,i as r,_ as s,n as e,d as o}from"./wled-studio-core.js";import{S as i,B as a,z as n,M as c,K as d}from"./geometry-preview.js";const l="wled-view-devices";let p=class extends a{constructor(){super(...arguments),this._controllers=[],this._status="Loading…",this._cardUrl="",this._cardToast=""}onPoweredConnect(){this._load()}async _load(){if(this.connection)try{const t=await n(this.connection);this._controllers=t.map(t=>({entry_id:String(t.entry_id??""),title:t.title,host:t.host,pixel_count:t.pixel_count,fw_ver:t.fw_ver,master_entity_id:t.master_entity_id})),this._status=0===this._controllers.length?"No WLED Studio controllers. Add the integration under Settings → Devices & services.":""}catch{this._status="Could not list controllers."}}render(){return t`
      <div class="wrap">
        <h2>Devices</h2>
        <p class="hint">
          WLED Studio attaches to your stock WLED integration. Select a controller in the sidebar
          views (Layout, Scenes, Segments).
        </p>
        ${this._status?t`<p>${this._status}</p>`:null}
        <ul class="list">
          ${this._controllers.map(r=>t`
              <li class="card">
                <strong>${r.title??r.entry_id}</strong>
                <span>${r.host??"—"}</span>
                <span>${r.pixel_count??"?"} LEDs</span>
                ${r.fw_ver?t`<span class="dim">WLED ${r.fw_ver}</span>`:null}
                ${r.master_entity_id?t`<code class="entity">${r.master_entity_id}</code>`:null}
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
          ${this._cardUrl?t`<code class="resource-url">${this._cardUrl}</code>`:null}
          <button
            type="button"
            class="primary"
            ?disabled=${!this.connection}
            @click=${()=>this._registerCard()}
          >
            Register card resource
          </button>
          ${this._cardToast?t`<p class="toast" role="status">${this._cardToast}</p>`:null}
        </section>
      </div>
    `}async _registerCard(){if(this.connection){this._cardToast="";try{const{url:t}=await async function(t){return{url:(await t.sendMessagePromise({type:"wled_studio/register_lovelace_resource",schema_version:i})).url??""}}(this.connection);this._cardUrl=t,this._cardToast=t?"Card resource registered. Hard-refresh dashboards (Ctrl+F5).":"Registration sent — check HA logs if the card still does not appear."}catch(t){this._cardToast=t instanceof Error?t.message:String(t)}}}static{this.styles=[...c,r`
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
    `]}};s([e({attribute:!1})],p.prototype,"connection",void 0),s([o()],p.prototype,"_controllers",void 0),s([o()],p.prototype,"_status",void 0),s([o()],p.prototype,"_cardUrl",void 0),s([o()],p.prototype,"_cardToast",void 0),p=s([d(l)],p);export{l as VIEW_DEVICES_TAG,p as WledViewDevices};
//# sourceMappingURL=view-devices.js.map

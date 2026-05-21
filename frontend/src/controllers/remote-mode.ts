import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { HomeAssistant } from "custom-card-helpers";

export const NABU_CASA_HOST_SUFFIX = ".ui.nabu.casa";

export interface RemoteModeState {
  readonly isRemote: boolean;
  readonly previewFps: number;
  readonly useBinaryPack: boolean;
  readonly disableBloom: boolean;
}

/** Detect Nabu Casa / remote HA; clamp preview when remote. */
export class RemoteModeController implements ReactiveController {
  private _isRemote = false;

  constructor(
    private readonly host: ReactiveControllerHost,
    private _hass?: HomeAssistant
  ) {
    host.addController(this);
  }

  hostConnected(): void {
    this._refresh();
  }

  setHass(hass: HomeAssistant | undefined): void {
    this._hass = hass;
    this._refresh();
    this.host.requestUpdate();
  }

  get state(): RemoteModeState {
    return {
      isRemote: this._isRemote,
      previewFps: this._isRemote ? 10 : 20,
      useBinaryPack: this._isRemote,
      disableBloom: this._isRemote,
    };
  }

  private _refresh(): void {
    if (typeof location === "undefined") {
      this._isRemote = false;
      return;
    }
    const onNabu = location.hostname.endsWith(NABU_CASA_HOST_SUFFIX);
    const external = this._hass?.config?.external_url;
    const originMatch =
      !!external && external.replace(/\/$/, "") === location.origin;
    this._isRemote = onNabu || originMatch;
  }
}

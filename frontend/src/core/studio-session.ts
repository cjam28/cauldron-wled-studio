import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { Connection } from "home-assistant-js-websocket";
import { listControllers, type ControllerInfo } from "../api/live-stream.js";

/**
 * Owns controller discovery and the active controller selection shared by the
 * card and panel shells. Phase 1 covers the panel's needs (list + pick + master
 * entity lookup); the card's retry-ladder bootstrap is folded in at Phase 2.
 */
export class StudioSessionController implements ReactiveController {
  private _controllerId = "";
  private _controllers: ControllerInfo[] = [];

  constructor(private readonly host: ReactiveControllerHost) {
    host.addController(this);
  }

  hostConnected(): void {
    /* no-op */
  }

  get controllerId(): string {
    return this._controllerId;
  }

  get controllers(): ControllerInfo[] {
    return this._controllers;
  }

  /** The HA light entity that acts as the master for a given controller. */
  masterEntityFor(id: string): string {
    return (
      this._controllers.find((c) => c.entry_id === id)?.master_entity_id ?? ""
    );
  }

  /** Master entity for the currently selected controller. */
  get masterEntity(): string {
    return this.masterEntityFor(this._controllerId);
  }

  /** Explicit user/controller pick (e.g. from the picker dropdown). */
  setControllerId(id: string): void {
    if (!id || id === this._controllerId) return;
    this._controllerId = id;
    this.host.requestUpdate();
  }

  /**
   * Fetch the controller list; keep the current selection if it is still
   * present, otherwise pick the first. Swallows errors so the surface stays
   * usable when discovery fails (matches the panel's prior behavior).
   */
  async loadControllers(connection: Connection): Promise<void> {
    try {
      const controllers = await listControllers(connection);
      this._controllers = controllers;
      const stillValid =
        this._controllerId &&
        controllers.some((c) => c.entry_id === this._controllerId);
      if (!stillValid) {
        const pick = controllers[0];
        if (pick?.entry_id) this._controllerId = String(pick.entry_id);
      }
      this.host.requestUpdate();
    } catch {
      /* surface remains usable without a controller list */
    }
  }
}

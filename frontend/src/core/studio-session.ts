import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { Connection } from "home-assistant-js-websocket";
import { listControllers, type ControllerInfo } from "../api/live-stream.js";
import type { WledSegment } from "../api/wled-state.js";
import { normalizeCols } from "../api/wled-state.js";
import { debounce } from "../utils/debounce.js";
import { accentPairFromRgb, type DynamicSchemeOptions } from "./m3-color.js";

/**
 * Scoped LED-accent tokens written by accent-from-LED. We deliberately do NOT
 * touch `--md-sys-color-*` — the card stays fully themed by Material You; the
 * selected LED color only tints LED-specific affordances via these aliases.
 */
const LED_ACCENT_TOKEN = "--wled-led-accent";
const LED_ON_ACCENT_TOKEN = "--wled-on-led-accent";

/** Minimal style surface we write/clear M3 tokens through. */
interface TokenStyleTarget {
  setProperty(property: string, value: string, priority?: string): void;
  removeProperty?(property: string): void;
}

/** A Lit host that can also receive CSS custom-property writes (`.style`). */
type StyleableHost = ReactiveControllerHost & { style?: TokenStyleTarget };

/**
 * Resolve dark-mode for scheme generation. The caller (card/panel) should pass
 * `dark` explicitly so the scheme follows HA / Material You; when omitted we
 * fall back to `prefers-color-scheme` (the admin/standalone behavior), and to
 * light when no `matchMedia` is available (e.g. SSR / tests).
 */
export function resolveDark(dark?: boolean): boolean {
  if (typeof dark === "boolean") return dark;
  try {
    return (
      typeof matchMedia === "function" &&
      matchMedia("(prefers-color-scheme: dark)").matches
    );
  } catch {
    return false;
  }
}

/** Returns the active segment's primary color (col slot 0) as an RGB triplet,
 * or `null` when no usable, non-black color is available. */
export function primaryRgbForSegment(
  segment: WledSegment | undefined,
): [number, number, number] | null {
  const cols = normalizeCols(segment?.col);
  const slot = cols[0];
  if (!slot) return null;
  const [r, g, b] = [slot[0] ?? 0, slot[1] ?? 0, slot[2] ?? 0];
  // A black/off primary carries no accent signal — fall back to inherited.
  if (r === 0 && g === 0 && b === 0) return null;
  return [r, g, b];
}

/**
 * Owns controller discovery and the active controller selection shared by the
 * card and panel shells. Phase 1 covers the panel's needs (list + pick + master
 * entity lookup); the card's retry-ladder bootstrap is folded in at Phase 2.
 *
 * It also owns the accent-from-LED path: when the active segment's primary
 * color changes, the host's `--md-sys-color-*` scheme is regenerated from that
 * LED color via the m3-color engine (TONAL_SPOT, MCU-derived `on-*` contrast —
 * never hand-mixed). The write is debounced; when no segment/color is available
 * it is a no-op that clears any local override so the inherited scheme shows
 * through. The Material You module still owns generation on the dashboards;
 * this only writes onto the local host, consuming the same token contract.
 */
export class StudioSessionController implements ReactiveController {
  private _controllerId = "";
  private _controllers: ControllerInfo[] = [];

  /** Last RGB seed actually applied (dedupes redundant scheme regen). */
  private _lastSeed: string | null = null;

  /** Debounced LED-accent write; coalesces rapid segment-color edits. */
  private readonly _applyAccentDebounced = debounce(
    (rgb: [number, number, number], options: DynamicSchemeOptions) => {
      const style = (this.host as StyleableHost).style;
      if (!style) return; // host can't receive token writes (e.g. test stub)
      // Scoped tint only — never the full --md-sys-color-* scheme (the card
      // follows Material You; the LED color drives only --wled-led-accent).
      const { accent, onAccent } = accentPairFromRgb(rgb[0], rgb[1], rgb[2], options);
      style.setProperty(LED_ACCENT_TOKEN, accent);
      style.setProperty(LED_ON_ACCENT_TOKEN, onAccent);
    },
    50,
    100,
  );

  constructor(private readonly host: ReactiveControllerHost) {
    host.addController(this);
  }

  hostConnected(): void {
    /* no-op */
  }

  hostDisconnected(): void {
    this._applyAccentDebounced.cancel();
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
   * Accent-from-LED entry point. Reads the active segment's primary color and
   * (debounced) writes a scoped `--wled-led-accent` (+ on-accent) from it. The
   * card's M3 chrome stays fully themed by Material You — this only tints
   * LED-specific affordances. A no-op when no segment/color is available — the
   * scoped tokens are cleared so they fall back to the theme accent default.
   *
   * @param segment the active segment, or `undefined` when none is selected.
   * @param options scheme options; `dark` should follow HA / Material You.
   */
  applyAccentFromSegment(
    segment: WledSegment | undefined,
    options: DynamicSchemeOptions = {},
  ): void {
    const rgb = primaryRgbForSegment(segment);
    if (!rgb) {
      this.clearAccent();
      return;
    }
    const dark = resolveDark(options.dark);
    const seed = `${rgb[0]},${rgb[1]},${rgb[2]},${dark ? 1 : 0}`;
    if (seed === this._lastSeed) return; // already applied — skip redundant regen
    this._lastSeed = seed;
    this._applyAccentDebounced(rgb, { ...options, dark });
  }

  /**
   * Drop the scoped LED-accent tokens so `--wled-led-accent` falls back to its
   * theme-accent default (the Material You primary). Idempotent. The M3 color
   * roles are never touched here — they were never overridden.
   */
  clearAccent(): void {
    this._applyAccentDebounced.cancel();
    if (this._lastSeed === null) return;
    this._lastSeed = null;
    const style = (this.host as StyleableHost).style;
    if (!style) return;
    style.removeProperty?.(LED_ACCENT_TOKEN);
    style.removeProperty?.(LED_ON_ACCENT_TOKEN);
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

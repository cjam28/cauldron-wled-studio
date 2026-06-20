import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { WledSegment } from "../api/wled-state.js";

export interface SegmentTargetsDetail {
  segmentId: number;
  highlightIds?: number[];
  editIds?: number[];
}

/**
 * Owns the active segment selection, highlight set, and segment cache shared by
 * the card and panel shells. The targets-changed reducer (highlightIds >
 * editIds > [segmentId]) lives here so both surfaces agree on what is selected.
 */
export class StudioSelectionController implements ReactiveController {
  private _selectedSegId = -1;
  private _highlightSegIds: number[] = [];
  private _segments: WledSegment[] = [];

  constructor(private readonly host: ReactiveControllerHost) {
    host.addController(this);
  }

  hostConnected(): void {
    /* no-op: state is driven by host events */
  }

  get selectedSegId(): number {
    return this._selectedSegId;
  }

  get highlightSegIds(): number[] {
    return this._highlightSegIds;
  }

  get segments(): WledSegment[] {
    return this._segments;
  }

  /** Set the focused segment id (e.g. from a preview tap). */
  selectSegment(segId: number): void {
    if (this._selectedSegId === segId) return;
    this._selectedSegId = segId;
    this.host.requestUpdate();
  }

  /**
   * Reduce a `segment-targets-changed` detail into selection + highlights.
   * Priority: explicit highlightIds, then editIds, else just the segment id.
   */
  applyTargetsChanged(detail: SegmentTargetsDetail): void {
    this._selectedSegId = detail.segmentId;
    if (detail.highlightIds?.length) {
      this._highlightSegIds = [...detail.highlightIds];
    } else if (detail.editIds?.length) {
      this._highlightSegIds = [...detail.editIds];
    } else {
      this._highlightSegIds = [detail.segmentId];
    }
    this.host.requestUpdate();
  }

  /** Replace the cached segment list (card strip preview). */
  setSegments(segments: WledSegment[]): void {
    this._segments = segments;
    this.host.requestUpdate();
  }
}

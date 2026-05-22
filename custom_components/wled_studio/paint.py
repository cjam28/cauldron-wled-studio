"""DDP paint transport (UDP primary) with keep-alive and commit flush."""

from __future__ import annotations

import asyncio
import copy
import logging
from typing import TYPE_CHECKING, Any

from .ddp import build_ddp_packets
from .paint_commit import (
    build_paint_commit_state,
    expand_segments_to_payload,
    live_frame_to_payload,
)

if TYPE_CHECKING:
    from .coordinator import WledStudioCoordinator
    from .wled_client import WledClient

_LOGGER = logging.getLogger(__name__)

DDP_PORT = 4048
KEEPALIVE_SEC = 1.5
EFFECT_PREVIEW_DEBOUNCE_SEC = 0.1


class PaintSession:
    """One active paint session per coordinator entry."""

    def __init__(self, host: str, client: WledClient) -> None:
        self._host = host
        self._client = client
        self._seq = 1
        self._last_payload: bytes | None = None
        self._last_rgbw = True
        self._baseline_payload: bytes | None = None
        self._segment_snapshot: list[dict[str, Any]] = []
        self._global_bri = 255
        self._touched: set[int] = set()
        self._touched_fx: dict[int, int] = {}
        self._paint_mode = "color"
        self._brush: dict[str, Any] = {}
        self._fill: dict[str, Any] = {"mode": "off"}
        self._ddp_live = True
        self._transport: asyncio.DatagramTransport | None = None
        self._keepalive_task: asyncio.Task[None] | None = None
        self._commit_lock = asyncio.Lock()
        self._effect_preview_task: asyncio.Task[None] | None = None
        self._active = False
        self._coordinator: WledStudioCoordinator | None = None

    @property
    def active(self) -> bool:
        return self._active

    async def start(self, coordinator: WledStudioCoordinator | None = None) -> None:
        if self._active:
            return
        self._coordinator = coordinator
        await self._client.get_state(refresh=True)
        await self._capture_baseline(coordinator)
        loop = asyncio.get_running_loop()
        self._transport, _ = await loop.create_datagram_endpoint(
            asyncio.DatagramProtocol,
            local_addr=("0.0.0.0", 0),
            family=2,  # AF_INET
        )
        self._active = True
        self._touched.clear()
        self._touched_fx.clear()
        self._paint_mode = "color"
        self._brush = {}
        self._fill = {"mode": "off"}
        self._ddp_live = True
        self._keepalive_task = asyncio.create_task(self._keepalive_loop())
        await self._client.apply_state({"live": True})

    async def stop(self, *, commit: bool = False) -> None:
        was_active = self._active
        self._active = False
        await self._cancel_effect_preview_task()
        if self._keepalive_task and not self._keepalive_task.done():
            self._keepalive_task.cancel()
            try:
                await self._keepalive_task
            except asyncio.CancelledError:
                pass
        self._keepalive_task = None
        try:
            if was_active and commit and self._last_payload:
                async with self._commit_lock:
                    if self._transport:
                        packets = build_ddp_packets(
                            self._last_payload,
                            rgbw=self._last_rgbw,
                            byte_offset=0,
                            start_seq=self._seq,
                        )
                        self._seq = (self._seq + len(packets)) & 0x0F or 1
                        for pkt in packets:
                            self._transport.sendto(pkt, (self._host, DDP_PORT))
                    try:
                        await self._commit_buffer_to_state()
                    except Exception:  # noqa: BLE001
                        _LOGGER.warning(
                            "Paint commit to WLED state failed on %s",
                            self._host,
                            exc_info=True,
                        )
                        await self._client.apply_state({"live": False})
            elif was_active:
                try:
                    if self._segment_snapshot:
                        await self._restore_segment_snapshot()
                    else:
                        await self._client.apply_state({"live": False})
                except Exception:  # noqa: BLE001
                    _LOGGER.warning(
                        "Failed to restore layout after paint on %s",
                        self._host,
                        exc_info=True,
                    )
        finally:
            if self._transport:
                self._transport.close()
                self._transport = None

    async def send_frame(
        self,
        payload: bytes,
        *,
        rgbw: bool = True,
        touched: list[int] | None = None,
        paint_mode: str = "color",
        effect_id: int | None = None,
        brush: dict[str, Any] | None = None,
        fill: dict[str, Any] | None = None,
    ) -> None:
        if not self._active or not self._transport:
            await self.start(self._coordinator)
        self._last_payload = payload
        self._last_rgbw = rgbw
        if paint_mode in ("color", "effect"):
            self._paint_mode = paint_mode
        if isinstance(brush, dict):
            self._brush = brush
        if isinstance(fill, dict):
            self._fill = fill
        if touched:
            for led in touched:
                if 0 <= led < len(payload) // (4 if rgbw else 3):
                    self._touched.add(led)
                    if paint_mode == "effect" and effect_id is not None:
                        self._touched_fx[led] = int(effect_id)
        if self._paint_mode == "effect" and self._touched:
            self._schedule_effect_preview()
            return
        if self._paint_mode == "color" and not self._ddp_live:
            await self._client.apply_state({"live": True})
            self._ddp_live = True
        packets = build_ddp_packets(
            payload, rgbw=rgbw, byte_offset=0, start_seq=self._seq
        )
        self._seq = (self._seq + len(packets) - 1) & 0x0F or 1
        for pkt in packets:
            self._transport.sendto(pkt, (self._host, DDP_PORT))

    def _schedule_effect_preview(self) -> None:
        """Debounce WLED /json/state pushes so paint strokes stay responsive."""
        if self._effect_preview_task and not self._effect_preview_task.done():
            self._effect_preview_task.cancel()

        async def _run() -> None:
            await asyncio.sleep(EFFECT_PREVIEW_DEBOUNCE_SEC)
            await self._apply_effect_preview()

        self._effect_preview_task = asyncio.create_task(_run())

    async def _cancel_effect_preview_task(self) -> None:
        task = self._effect_preview_task
        self._effect_preview_task = None
        if not task or task.done():
            return
        task.cancel()
        try:
            await task
        except asyncio.CancelledError:
            pass

    async def _await_effect_preview_idle(self) -> None:
        await self._cancel_effect_preview_task()
        if self._paint_mode == "effect" and self._touched:
            await self._apply_effect_preview()

    async def _capture_baseline(
        self, coordinator: WledStudioCoordinator | None
    ) -> None:
        info = self._client.info if isinstance(self._client.info, dict) else {}
        leds_raw = info.get("leds")
        leds = leds_raw if isinstance(leds_raw, dict) else {}
        pixel_count = int(leds.get("count") or 0)
        rgbw = bool(leds.get("rgbw", True))
        self._last_rgbw = rgbw

        state = self._client.state or {}
        self._global_bri = int(state.get("bri") or 255)
        segs_raw = state.get("seg")
        self._segment_snapshot = (
            copy.deepcopy(segs_raw) if isinstance(segs_raw, list) else []
        )

        baseline: bytes | None = None
        proxy = coordinator.live_proxy if coordinator else None
        if proxy is not None:
            frame = proxy.last_good_frame
            if isinstance(frame, dict):
                baseline = live_frame_to_payload(
                    frame, pixel_count, rgbw=rgbw
                )
        if baseline is None:
            baseline = expand_segments_to_payload(
                self._segment_snapshot, pixel_count, rgbw=rgbw
            )
        self._baseline_payload = baseline

    async def _restore_segment_snapshot(self) -> None:
        """Revert temporary paint segments to the layout saved at paint start."""
        segs = copy.deepcopy(self._segment_snapshot)
        if not segs:
            await self._client.apply_state({"live": False})
            return
        await self._client.apply_state(
            {"live": False, "on": True, "bri": self._global_bri, "seg": segs},
            full_response=True,
        )

    async def _apply_effect_preview(self) -> None:
        """Push segment effects to WLED (DDP cannot preview animated effects)."""
        if not self._last_payload:
            return
        self._ddp_live = False
        info = self._client.info if isinstance(self._client.info, dict) else {}
        leds_raw = info.get("leds")
        leds = leds_raw if isinstance(leds_raw, dict) else {}
        pixel_count = int(leds.get("count") or 0)
        bpp = 4 if self._last_rgbw else 3
        if pixel_count <= 0 and bpp > 0:
            pixel_count = len(self._last_payload) // bpp
        max_seg = int(leds.get("maxseg") or 32)
        patch = build_paint_commit_state(
            payload=self._last_payload,
            rgbw=self._last_rgbw,
            live_segments=self._segment_snapshot,
            pixel_count=pixel_count,
            effects_by_name=self._client.effects_by_name,
            touched=self._touched,
            baseline=self._baseline_payload,
            paint_mode="effect",
            touched_fx=self._touched_fx,
            max_segments=max_seg,
            brush=self._brush,
            fill=self._fill,
            global_bri=self._global_bri,
        )
        await self._client.apply_state(patch)

    async def _commit_buffer_to_state(self) -> None:
        """Push painted pixels into WLED (per-LED or effect segments) and exit live."""
        if not self._last_payload:
            return
        await self._await_effect_preview_idle()
        await self._client.get_state(refresh=True)
        state = self._client.state or {}
        segs_raw = state.get("seg")
        live_segments = (
            self._segment_snapshot
            if self._segment_snapshot
            else (segs_raw if isinstance(segs_raw, list) else [])
        )
        info = self._client.info if isinstance(self._client.info, dict) else {}
        leds_raw = info.get("leds")
        leds = leds_raw if isinstance(leds_raw, dict) else {}
        pixel_count = int(leds.get("count") or 0)
        bpp = 4 if self._last_rgbw else 3
        if pixel_count <= 0 and bpp > 0:
            pixel_count = len(self._last_payload) // bpp
        max_seg = int(leds.get("maxseg") or 32)
        patch = build_paint_commit_state(
            payload=self._last_payload,
            rgbw=self._last_rgbw,
            live_segments=live_segments,
            pixel_count=pixel_count,
            effects_by_name=self._client.effects_by_name,
            touched=self._touched,
            baseline=self._baseline_payload,
            paint_mode=self._paint_mode,
            touched_fx=self._touched_fx,
            max_segments=max_seg,
            brush=self._brush,
            fill=self._fill,
            global_bri=self._global_bri,
        )
        await self._client.apply_state(patch, full_response=True)

    async def _keepalive_loop(self) -> None:
        while self._active:
            await asyncio.sleep(KEEPALIVE_SEC)
            if not self._active or not self._last_payload or not self._transport:
                continue
            if self._paint_mode == "effect":
                if (
                    not self._effect_preview_task
                    or self._effect_preview_task.done()
                ):
                    try:
                        await self._apply_effect_preview()
                    except Exception:  # noqa: BLE001
                        _LOGGER.debug(
                            "paint effect keepalive failed", exc_info=True
                        )
                continue
            try:
                packets = build_ddp_packets(
                    self._last_payload,
                    rgbw=self._last_rgbw,
                    byte_offset=0,
                    start_seq=self._seq,
                )
                self._seq = (self._seq + len(packets) - 1) & 0x0F or 1
                for pkt in packets:
                    self._transport.sendto(pkt, (self._host, DDP_PORT))
            except Exception:  # noqa: BLE001
                _LOGGER.debug("paint keepalive failed", exc_info=True)

    def wifi_sleep_warning(self) -> str | None:
        wifi = self._client.info.get("wifi") if self._client.info else {}
        if isinstance(wifi, dict) and wifi.get("sleep"):
            return "WiFi sleep is enabled on the controller — disable it for stable paint."
        return None

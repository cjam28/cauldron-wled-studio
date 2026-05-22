"""Capture effect thumbnails from the lv:true text stream."""

from __future__ import annotations

import asyncio
import logging
from typing import TYPE_CHECKING, Any, Callable

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import (
    async_dispatcher_connect,
    async_dispatcher_send,
)

from .thumbnails import (
    ThumbKey,
    ensure_thumb_dir,
    should_skip_effect_name,
    thumb_path,
)

if TYPE_CHECKING:
    from .coordinator import WledStudioCoordinator

_LOGGER = logging.getLogger(__name__)

SIGNAL_THUMB_PROGRESS = "wled_studio_thumb_progress"
FRAMES_PER_THUMB = 48
FRAME_INTERVAL = 0.04
SETTLE_SEC = 0.35
THUMB_WIDTH = 128
THUMB_HEIGHT = 8


def _hex_to_rgb(hex_str: str) -> tuple[int, int, int]:
    h = (hex_str or "").strip().lower()
    if len(h) >= 6:
        return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return 0, 0, 0


def _render_strip_frame(leds: list[str], width: int, height: int):
    from PIL import Image

    n = max(len(leds), 1)
    img = Image.new("RGB", (width, height))
    px = img.load()
    for x in range(width):
        idx = min(int(x * n / width), n - 1)
        r, g, b = _hex_to_rgb(leds[idx] if idx < len(leds) else "000000")
        for y in range(height):
            px[x, y] = (r, g, b)
    return img


def _save_animated_webp(frames: list, dest) -> None:
    from PIL import Image

    if not frames:
        return
    first, *rest = frames
    duration = int(1000 * FRAME_INTERVAL)
    first.save(
        dest,
        format="WEBP",
        save_all=True,
        append_images=rest,
        duration=duration,
        loop=0,
        quality=82,
        method=4,
    )


class ThumbCaptureRunner:
    """Sequential per-effect thumbnail capture (cancellable)."""

    def __init__(self, hass: HomeAssistant, coord: WledStudioCoordinator) -> None:
        self.hass = hass
        self.coord = coord
        self._cancel = asyncio.Event()
        self._task: asyncio.Task[None] | None = None

    def cancel(self) -> None:
        self._cancel.set()

    @property
    def running(self) -> bool:
        return self._task is not None and not self._task.done()

    def start(self) -> None:
        if self.running:
            return
        self._cancel.clear()
        self._task = asyncio.create_task(self._run())

    def _emit(self, payload: dict[str, Any]) -> None:
        async_dispatcher_send(self.hass, SIGNAL_THUMB_PROGRESS, payload)
        self.hass.bus.async_fire("wled_studio_thumb_progress", payload)

    async def _collect_frames(self, count: int) -> list[list[str]]:
        frames: list[list[str]] = []
        done = asyncio.Event()

        def on_frame(data: dict[str, Any]) -> None:
            leds = data.get("leds")
            if isinstance(leds, list) and leds:
                frames.append([str(x) for x in leds])
                if len(frames) >= count:
                    done.set()

        unsub = self.coord.live_proxy.subscribe(on_frame) if self.coord.live_proxy else None
        try:
            await asyncio.wait_for(done.wait(), timeout=count * FRAME_INTERVAL + 2.0)
        except TimeoutError:
            pass
        finally:
            if unsub:
                unsub()
        return frames

    async def _capture_one(self, fx_id: int, fx_name: str, fw_ver: str) -> bool:
        client = self.coord.client
        if not client:
            return False
        await client.apply_state(
            {
                "seg": [
                    {
                        "id": 0,
                        "fx": fx_id,
                        "on": True,
                        "bri": 180,
                    }
                ]
            }
        )
        await asyncio.sleep(SETTLE_SEC)
        raw_frames = await self._collect_frames(FRAMES_PER_THUMB)
        if len(raw_frames) < 8:
            return False
        pil_frames = [
            _render_strip_frame(f, THUMB_WIDTH, THUMB_HEIGHT) for f in raw_frames
        ]
        key = ThumbKey(fx_id=fx_id, palette_id=0, fw_ver=fw_ver)
        ensure_thumb_dir(self.hass, self.coord.entry_id)
        dest = thumb_path(self.hass, self.coord.entry_id, key, variant="strip")
        await asyncio.to_thread(_save_animated_webp, pil_frames, dest)
        return True

    async def _run(self) -> None:
        client = self.coord.client
        if not client or not self.coord.live_proxy:
            self._emit({"status": "error", "message": "Controller not ready"})
            return

        saved_state: dict[str, Any] | None = None
        try:
            await client.get_state(refresh=True)
            saved_state = dict(client.state)
        except Exception:  # noqa: BLE001
            saved_state = None

        items = sorted(client.effects_by_name.items(), key=lambda x: x[1])
        total = sum(1 for name, _ in items if not should_skip_effect_name(name))
        done = 0
        fw_ver = client.fw_ver or "unknown"
        self._emit({"status": "started", "total": total})

        for name, fx_id in items:
            if self._cancel.is_set():
                self._emit({"status": "cancelled", "done": done, "total": total})
                if saved_state:
                    try:
                        await client.apply_state(saved_state)
                    except Exception:  # noqa: BLE001
                        pass
                return
            if should_skip_effect_name(name):
                continue
            ok = False
            try:
                ok = await self._capture_one(fx_id, name, fw_ver)
            except Exception as err:  # noqa: BLE001
                _LOGGER.warning("thumb capture failed for %s (%s): %s", name, fx_id, err)
            done += 1
            self._emit(
                {
                    "status": "progress",
                    "done": done,
                    "total": total,
                    "fx_id": fx_id,
                    "name": name,
                    "ok": ok,
                }
            )

        self._emit({"status": "complete", "done": done, "total": total})
        if saved_state:
            try:
                await client.apply_state(saved_state)
            except Exception:  # noqa: BLE001
                _LOGGER.debug("thumb capture restore failed", exc_info=True)


@callback
def async_subscribe_thumb_progress(
    hass: HomeAssistant,
    callback_fn: Callable[[dict[str, Any]], None],
) -> Callable[[], None]:
    """Subscribe to thumbnail capture progress events."""

    @callback
    def _forward(data: dict[str, Any]) -> None:
        callback_fn(data)

    remove = async_dispatcher_connect(hass, SIGNAL_THUMB_PROGRESS, _forward)

    @callback
    def _unsub() -> None:
        remove()

    return _unsub

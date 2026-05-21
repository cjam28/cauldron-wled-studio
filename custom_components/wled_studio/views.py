"""HTTP views for WLED Studio (thumbnails, layout backgrounds)."""

from __future__ import annotations

import logging
from pathlib import Path

from aiohttp import web
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant

from .const import DOMAIN, LAYOUT_BG_API_URL, LAYOUT_BG_LOCAL_PREFIX, THUMB_API_URL
from .thumbnails import controller_thumb_dir

_LOGGER = logging.getLogger(__name__)

_VIEWS_REGISTERED_KEY = f"{DOMAIN}_http_views_registered"


def layout_bg_dir(hass: HomeAssistant, controller_id: str) -> Path:
    """Directory under config/www for layout floorplan images."""
    directory = Path(hass.config.path) / "www" / "wled_studio" / "layouts" / controller_id
    directory.mkdir(parents=True, exist_ok=True)
    return directory


def _layout_bg_ext(content_type: str) -> str:
    return "png" if "png" in (content_type or "").lower() else "jpg"


def save_layout_background(
    hass: HomeAssistant,
    controller_id: str,
    layout_id: str,
    raw: bytes,
    content_type: str = "image/jpeg",
) -> str:
    """Write floorplan bytes under www and return /local/... URL."""
    if not controller_id or not layout_id or ".." in controller_id or ".." in layout_id:
        raise ValueError("Invalid controller or layout id")
    if not raw or len(raw) > 8 * 1024 * 1024:
        raise ValueError("Invalid image size")
    ext = _layout_bg_ext(content_type)
    directory = layout_bg_dir(hass, controller_id)
    dest = (directory / f"{layout_id}.{ext}").resolve()
    try:
        dest.relative_to(directory.resolve())
    except ValueError as err:
        raise ValueError("Invalid layout path") from err
    dest.write_bytes(raw)
    return f"{LAYOUT_BG_LOCAL_PREFIX}/{controller_id}/{layout_id}.{ext}"


def _safe_filename(filename: str) -> str | None:
    """Reject path traversal; allow basenames only."""
    name = (filename or "").strip()
    if not name or "/" in name or "\\" in name or name in (".", ".."):
        return None
    if ".." in name:
        return None
    return name


class WledStudioThumbView(HomeAssistantView):
    """Serve captured effect thumbnails from www with Cache-Control: no-cache."""

    requires_auth = True
    url = THUMB_API_URL
    name = "api:wled_studio:thumb"

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(
        self,
        request: web.Request,
        controller_id: str,
        filename: str,
    ) -> web.StreamResponse:
        """GET /api/wled_studio/thumb/{controller_id}/{filename}."""
        safe_name = _safe_filename(filename)
        if safe_name is None:
            raise web.HTTPBadRequest

        directory = controller_thumb_dir(self.hass, controller_id)
        path = (directory / safe_name).resolve()
        try:
            path.relative_to(directory.resolve())
        except ValueError:
            raise web.HTTPForbidden from None

        if not path.is_file():
            raise web.HTTPNotFound

        return web.FileResponse(
            path,
            headers={"Cache-Control": "no-cache"},
        )


class WledStudioLayoutBgView(HomeAssistantView):
    """POST floorplan image for a layout (stored under /config/www)."""

    requires_auth = True
    url = LAYOUT_BG_API_URL
    name = "api:wled_studio:layout_bg"

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def post(
        self,
        request: web.Request,
        controller_id: str,
        layout_id: str,
    ) -> web.Response:
        """POST /api/wled_studio/layout_bg/{controller_id}/{layout_id}."""
        if not controller_id or not layout_id or ".." in controller_id or ".." in layout_id:
            raise web.HTTPBadRequest

        reader = await request.multipart()
        field = await reader.next()
        if field is None or field.name != "file":
            raise web.HTTPBadRequest

        raw = await field.read()
        ctype = (field.headers.get("Content-Type") or "").lower()
        try:
            background_url = save_layout_background(
                self.hass, controller_id, layout_id, raw, ctype
            )
        except ValueError:
            raise web.HTTPBadRequest from None
        return web.json_response({"background_url": background_url})


def async_register_views(hass: HomeAssistant) -> None:
    """Register HTTP views once per HA instance."""
    if hass.data.get(_VIEWS_REGISTERED_KEY):
        return
    hass.http.register_view(WledStudioThumbView(hass))
    hass.http.register_view(WledStudioLayoutBgView(hass))
    hass.data[_VIEWS_REGISTERED_KEY] = True
    _LOGGER.debug(
        "Registered WLED Studio HTTP views: %s, %s",
        THUMB_API_URL,
        LAYOUT_BG_API_URL,
    )

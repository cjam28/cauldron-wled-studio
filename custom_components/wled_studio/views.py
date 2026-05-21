"""HTTP views for WLED Studio (thumbnail cache with no-cache headers)."""

from __future__ import annotations

import logging

from aiohttp import web
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant

from .const import DOMAIN, THUMB_API_URL
from .thumbnails import controller_thumb_dir

_LOGGER = logging.getLogger(__name__)

_THUMB_REGISTERED_KEY = f"{DOMAIN}_thumb_view_registered"


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


def async_register_views(hass: HomeAssistant) -> None:
    """Register HTTP views once per HA instance."""
    if hass.data.get(_THUMB_REGISTERED_KEY):
        return
    hass.http.register_view(WledStudioThumbView(hass))
    hass.data[_THUMB_REGISTERED_KEY] = True
    _LOGGER.debug("Registered WLED Studio thumbnail view at %s", THUMB_API_URL)

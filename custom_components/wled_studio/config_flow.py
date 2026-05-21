"""Config flow — attach to an existing WLED integration entry."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.core import HomeAssistant, callback
from homeassistant.data_entry_flow import FlowResult
from homeassistant.helpers import device_registry as dr

from .attach import get_wled_entries
from .const import CONF_DEVICE_ID, CONF_WLED_CONFIG_ENTRY, DOMAIN

WLED_DOMAIN = "wled"


async def _wled_entry_options(hass: HomeAssistant) -> list[tuple[str, str]]:
    """Build select options from stock WLED config entries."""
    options: list[tuple[str, str]] = []
    for entry in await get_wled_entries(hass):
        title = entry.title or entry.data.get("host", entry.entry_id)
        options.append((entry.entry_id, title))
    return options


class WledStudioConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle WLED Studio config flow."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """Pick an existing WLED config entry to attach to."""
        errors: dict[str, str] = {}
        wled_options = await _wled_entry_options(self.hass)

        if user_input is not None:
            wled_entry_id = user_input[CONF_WLED_CONFIG_ENTRY]
            wled_entry = self.hass.config_entries.async_get_entry(wled_entry_id)
            if wled_entry is None or wled_entry.domain != WLED_DOMAIN:
                errors["base"] = "wled_not_found"
            else:
                await self.async_set_unique_id(wled_entry_id)
                self._abort_if_unique_id_configured()
                device_id: str | None = None
                dev_reg = dr.async_get(self.hass)
                for device in dev_reg.devices.values():
                    for ident in device.identifiers:
                        if ident[0] == WLED_DOMAIN and ident[1] == wled_entry.unique_id:
                            device_id = device.id
                            break
                return self.async_create_entry(
                    title=f"WLED Studio — {wled_entry.title}",
                    data={
                        CONF_WLED_CONFIG_ENTRY: wled_entry_id,
                        CONF_DEVICE_ID: device_id,
                    },
                )

        if not wled_options:
            return self.async_abort(
                reason="no_wled",
                description_placeholders={
                    "hint": "Add the stock WLED integration first, then return here."
                },
            )

        schema = vol.Schema(
            {
                vol.Required(CONF_WLED_CONFIG_ENTRY): vol.In(
                    {k: v for k, v in wled_options}
                )
            }
        )
        return self.async_show_form(
            step_id="user",
            data_schema=schema,
            errors=errors,
        )

    @staticmethod
    @callback
    def async_get_options_flow(
        config_entry: config_entries.ConfigEntry,
    ) -> config_entries.OptionsFlow:
        """Options flow placeholder."""
        return WledStudioOptionsFlowHandler(config_entry)


class WledStudioOptionsFlowHandler(config_entries.OptionsFlow):
    """Options flow stub for future settings."""

    def __init__(self, config_entry: config_entries.ConfigEntry) -> None:
        self.config_entry = config_entry

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """No options in Phase 0."""
        return self.async_create_entry(title="", data={})

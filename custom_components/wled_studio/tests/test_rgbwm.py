"""Auto-white (rgbwm) cfg helpers."""

from wled_studio.wled_client import WledClient


def test_led_bus_rgbwm_per_bus() -> None:
    client = WledClient.__new__(WledClient)
    client.cfg = {
        "hw": {
            "led": {
                "rgbwm": 255,
                "ins": [{"rgbwm": 2, "order": 16}, {"rgbwm": 0, "order": 0}],
            }
        }
    }
    assert client.led_bus_rgbwm(0) == 2
    assert client.led_bus_rgbwm(1) == 0


def test_led_bus_rgbwm_global_override() -> None:
    client = WledClient.__new__(WledClient)
    client.cfg = {
        "hw": {
            "led": {
                "rgbwm": 1,
                "ins": [{"rgbwm": 2}],
            }
        }
    }
    assert client.led_bus_rgbwm(0) == 1

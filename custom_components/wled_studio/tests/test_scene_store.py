"""Scene store unit tests (no HA instance required)."""

from wled_studio.scene_store import SceneRecord


def test_scene_record_round_trip() -> None:
    raw = {
        "id": "movie",
        "controller_id": "abc",
        "name": "Movie",
        "wled_state": {"on": True, "bri": 90, "seg": [{"id": 0, "fx": 0}]},
        "layout_id": "kitchen",
        "transition_ms": 2500,
        "etag": "etag-1",
        "seeded": True,
    }
    record = SceneRecord.from_dict(raw)
    out = record.to_dict()
    assert out["id"] == "movie"
    assert out["transition_ms"] == 2500
    assert out["seeded"] is True
    assert out["scene_thumb_url"] is None


def test_transition_tt_helper() -> None:
    from unittest.mock import MagicMock

    from wled_studio.coordinator import WledStudioCoordinator
    from wled_studio.scene_store import SceneRecord

    coord = WledStudioCoordinator.__new__(WledStudioCoordinator)
    coord.hass = MagicMock()
    scene = SceneRecord("x", "c", "X", transition_ms=2500)
    assert coord.transition_tt(None, scene) == 25
    assert coord.transition_tt(1000, scene) == 10
    assert coord.transition_tt(30000, scene) == 255

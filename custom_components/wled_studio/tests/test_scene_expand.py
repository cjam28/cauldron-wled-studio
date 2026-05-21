"""Scene state expansion across segments."""

from wled_studio.scene_expand import build_starter_segment_template, expand_scene_state


def test_expand_scene_all_segments() -> None:
    scene = build_starter_segment_template(
        fx=0, bri=200, col=[[255, 0, 0, 0]]
    )
    live = [
        {"id": 0, "start": 0, "stop": 85, "on": True},
        {"id": 1, "start": 85, "stop": 96, "on": True},
    ]
    out = expand_scene_state(scene, live)
    segs = out["seg"]
    assert len(segs) == 2
    assert segs[0]["id"] == 0
    assert segs[0]["start"] == 0
    assert segs[0]["stop"] == 85
    assert segs[0]["fx"] == 0
    assert segs[0]["col"] == [[255, 0, 0, 0]]
    assert segs[1]["id"] == 1
    assert segs[1]["start"] == 85
    assert segs[1]["fx"] == 0
    assert segs[1]["col"] == [[255, 0, 0, 0]]


def test_scene_template_overrides_live_fx() -> None:
    scene = build_starter_segment_template(
        fx=7, bri=200, col=[[0, 0, 255, 0]]
    )
    live = [{"id": 0, "start": 0, "stop": 100, "fx": 99, "col": [[1, 2, 3, 0]]}]
    out = expand_scene_state(scene, live)
    seg = out["seg"][0]
    assert seg["fx"] == 7
    assert seg["col"] == [[0, 0, 255, 0]]
    assert seg["start"] == 0
    assert seg["stop"] == 100


def test_expand_scene_subset() -> None:
    scene = build_starter_segment_template(
        fx=1, bri=128, col=[[0, 255, 0, 0]]
    )
    live = [
        {"id": 0, "start": 0, "stop": 10},
        {"id": 1, "start": 10, "stop": 20},
        {"id": 2, "start": 20, "stop": 30},
    ]
    out = expand_scene_state(scene, live, target_ids=[0, 2])
    segs = out["seg"]
    assert len(segs) == 2
    assert {s["id"] for s in segs} == {0, 2}
    assert segs[1]["start"] == 20

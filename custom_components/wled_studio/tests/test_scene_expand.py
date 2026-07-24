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


def test_expand_captured_multi_segment_scene_keeps_per_segment_looks() -> None:
    """A captured 4-segment scene must replay each segment's OWN look.

    Regression: the first scene segment used to be broadcast as the template
    for every target id, collapsing a multi-segment capture to segment 0's
    fx/color everywhere.
    """
    scene = {
        "on": True,
        "bri": 250,
        "seg": [
            {"id": 0, "start": 0, "stop": 85, "fx": 183, "col": [[255, 255, 255, 0]]},
            {"id": 1, "start": 85, "stop": 96, "fx": 0, "col": [[255, 0, 73, 0]]},
            {"id": 2, "start": 96, "stop": 186, "fx": 0, "col": [[0, 255, 0, 0]]},
            {"id": 3, "start": 186, "stop": 210, "fx": 183, "col": [[0, 0, 255, 0]]},
        ],
    }
    live = [
        {"id": 0, "start": 0, "stop": 85},
        {"id": 1, "start": 85, "stop": 96},
        {"id": 2, "start": 96, "stop": 186},
        {"id": 3, "start": 186, "stop": 210},
    ]
    out = expand_scene_state(scene, live)
    segs = {s["id"]: s for s in out["seg"]}
    assert segs[0]["fx"] == 183 and segs[0]["col"] == [[255, 255, 255, 0]]
    assert segs[1]["fx"] == 0 and segs[1]["col"] == [[255, 0, 73, 0]]
    assert segs[2]["fx"] == 0 and segs[2]["col"] == [[0, 255, 0, 0]]
    assert segs[3]["fx"] == 183 and segs[3]["col"] == [[0, 0, 255, 0]]


def test_expand_captured_scene_subset_uses_matching_segment() -> None:
    scene = {
        "seg": [
            {"id": 0, "start": 0, "stop": 10, "fx": 1, "col": [[9, 9, 9, 0]]},
            {"id": 2, "start": 20, "stop": 30, "fx": 5, "col": [[7, 7, 7, 0]]},
        ]
    }
    live = [
        {"id": 0, "start": 0, "stop": 10},
        {"id": 1, "start": 10, "stop": 20},
        {"id": 2, "start": 20, "stop": 30},
    ]
    out = expand_scene_state(scene, live, target_ids=[2])
    (seg,) = out["seg"]
    assert seg["id"] == 2
    assert seg["fx"] == 5
    assert seg["col"] == [[7, 7, 7, 0]]
    # A target id with no matching scene segment falls back to the first
    # scene segment (starter-scene broadcast behavior).
    out2 = expand_scene_state(scene, live, target_ids=[1])
    (seg1,) = out2["seg"]
    assert seg1["fx"] == 1
    assert seg1["start"] == 10 and seg1["stop"] == 20


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

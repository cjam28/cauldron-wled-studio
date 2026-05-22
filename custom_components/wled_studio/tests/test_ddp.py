"""DDP packet builder tests."""

from wled_studio.ddp import (
    DDP_FLAG_PUSH,
    DDP_FLAG_V1,
    DDP_HEADER_LEN,
    DDP_ID_DISPLAY,
    DDP_TYPE_RGB24,
    DDP_TYPE_RGBW32,
    DdpBuildError,
    build_ddp_packets,
    parse_ddp_packet,
    reassemble_ddp_packets,
)


def test_single_rgbw_packet_push() -> None:
    payload = bytes(range(12))  # 3 RGBW pixels
    packets = build_ddp_packets(payload, rgbw=True, start_seq=1)
    assert len(packets) == 1
    parsed = parse_ddp_packet(packets[0])
    assert parsed["v1"] is True
    assert parsed["push"] is True
    assert parsed["type"] == DDP_TYPE_RGBW32
    assert parsed["dest_id"] == DDP_ID_DISPLAY
    assert parsed["length"] == 12
    assert bytes(parsed["payload"]) == payload


def test_fragment_push_only_on_last() -> None:
    payload = bytes(1998)
    packets = build_ddp_packets(payload, rgbw=False, start_seq=3)
    assert len(packets) >= 2
    for pkt in packets[:-1]:
        p = parse_ddp_packet(pkt)
        assert not p["push"]
        assert p["v1"]
    last = parse_ddp_packet(packets[-1])
    assert last["push"]
    assert (last["flags"] & DDP_FLAG_PUSH) == DDP_FLAG_PUSH
    assert (last["flags"] & DDP_FLAG_V1) == DDP_FLAG_V1


def test_round_trip_rgb() -> None:
    payload = bytes([1, 2, 3, 4, 5, 6])
    packets = build_ddp_packets(payload, rgbw=False)
    merged, rgbw = reassemble_ddp_packets(packets)
    assert merged == payload
    assert rgbw is False


def test_round_trip_rgbw() -> None:
    payload = bytes(840)  # 210 RGBW
    packets = build_ddp_packets(payload, rgbw=True)
    assert len(packets) == 1
    assert len(packets[0]) == DDP_HEADER_LEN + 840
    merged, rgbw = reassemble_ddp_packets(packets)
    assert merged == payload
    assert rgbw is True


def test_rejects_bad_dest() -> None:
    try:
        build_ddp_packets(b"\x00\x00\x00", rgbw=True, dest_id=246)
    except DdpBuildError:
        pass
    else:
        raise AssertionError("expected DdpBuildError")

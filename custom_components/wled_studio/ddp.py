"""DDP packet builder (verified against WLED udp.cpp conventions)."""

from __future__ import annotations

import struct
from typing import Final

DDP_FLAG_V1: Final[int] = 0x40
DDP_FLAG_PUSH: Final[int] = 0x01
DDP_TYPE_RGB24: Final[int] = 0x0B
DDP_TYPE_RGBW32: Final[int] = 0x1B
DDP_ID_DISPLAY: Final[int] = 0x01
DDP_HEADER_LEN: Final[int] = 10
DDP_MAX_PAYLOAD: Final[int] = 1440
FORBIDDEN_DEST_IDS: Final[frozenset[int]] = frozenset({246, 250, 251})


class DdpBuildError(ValueError):
    """Invalid DDP build parameters."""


def _seq_byte(seq: int) -> int:
    return int(seq) & 0x0F


def build_ddp_packets(
    payload: bytes,
    *,
    rgbw: bool,
    byte_offset: int = 0,
    start_seq: int = 1,
    dest_id: int = DDP_ID_DISPLAY,
) -> list[bytes]:
    """Fragment *payload* into one or more DDP packets.

    PUSH (0x01) is set only on the last fragment. *byte_offset* is the raw
    byte offset into the LED buffer (not a pixel index).
    """
    if dest_id in FORBIDDEN_DEST_IDS or dest_id != DDP_ID_DISPLAY:
        raise DdpBuildError(f"dest_id must be {DDP_ID_DISPLAY}, got {dest_id}")
    if byte_offset < 0:
        raise DdpBuildError("byte_offset must be non-negative")
    if not payload:
        raise DdpBuildError("payload must not be empty")

    bpp = 4 if rgbw else 3
    if len(payload) % bpp != 0:
        raise DdpBuildError(f"payload length {len(payload)} not divisible by {bpp}")

    pkt_type = DDP_TYPE_RGBW32 if rgbw else DDP_TYPE_RGB24
    packets: list[bytes] = []
    seq = _seq_byte(start_seq)
    off = 0
    total = len(payload)
    global_off = byte_offset

    while off < total:
        chunk = payload[off : off + DDP_MAX_PAYLOAD]
        off += len(chunk)
        is_last = off >= total
        flags = DDP_FLAG_V1 | (DDP_FLAG_PUSH if is_last else 0)
        header = struct.pack(
            ">BBBIH",
            flags,
            seq,
            pkt_type,
            dest_id,
            global_off,
            len(chunk),
        )
        if len(header) != DDP_HEADER_LEN:
            raise DdpBuildError("DDP header length mismatch")
        packets.append(header + chunk)
        global_off += len(chunk)
        seq = _seq_byte(seq + 1)

    return packets


def parse_ddp_packet(packet: bytes) -> dict[str, int | bytes]:
    """Parse one DDP packet (for tests / round-trip)."""
    if len(packet) < DDP_HEADER_LEN:
        raise DdpBuildError("packet too short")
    flags, seq, pkt_type, dest_id, data_off, data_len = struct.unpack(
        ">BBBIH", packet[:DDP_HEADER_LEN]
    )
    payload = packet[DDP_HEADER_LEN : DDP_HEADER_LEN + data_len]
    if len(payload) != data_len:
        raise DdpBuildError("payload length mismatch")
    return {
        "flags": flags,
        "seq": seq,
        "type": pkt_type,
        "dest_id": dest_id,
        "offset": data_off,
        "length": data_len,
        "payload": payload,
        "push": bool(flags & DDP_FLAG_PUSH),
        "v1": bool(flags & DDP_FLAG_V1),
    }


def reassemble_ddp_packets(packets: list[bytes]) -> tuple[bytes, bool]:
    """Concatenate payloads in order; returns (bytes, rgbw)."""
    if not packets:
        raise DdpBuildError("no packets")
    rgbw: bool | None = None
    chunks: list[bytes] = []
    for raw in packets:
        parsed = parse_ddp_packet(raw)
        if parsed["dest_id"] != DDP_ID_DISPLAY:
            raise DdpBuildError("invalid dest_id")
        t = int(parsed["type"])
        if t == DDP_TYPE_RGBW32:
            is_rgbw = True
        elif t == DDP_TYPE_RGB24:
            is_rgbw = False
        else:
            raise DdpBuildError(f"unknown type {t}")
        if rgbw is None:
            rgbw = is_rgbw
        elif rgbw != is_rgbw:
            raise DdpBuildError("mixed rgb/rgbw in one frame")
        chunks.append(bytes(parsed["payload"]))
    return b"".join(chunks), bool(rgbw)

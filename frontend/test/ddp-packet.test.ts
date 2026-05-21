import { describe, expect, it } from "vitest";
import * as fc from "fast-check";

const DDP_FLAG_V1 = 0x40;
const DDP_FLAG_PUSH = 0x01;
const DDP_TYPE_RGB24 = 0x0b;
const DDP_TYPE_RGBW32 = 0x1b;
const DDP_ID_DISPLAY = 1;
const DDP_HEADER_LEN = 10;
const DDP_MAX_PAYLOAD = 1440;

function buildDdpPackets(
  payload: Uint8Array,
  rgbw: boolean,
  byteOffset = 0,
  startSeq = 1
): Uint8Array[] {
  const bpp = rgbw ? 4 : 3;
  if (payload.length % bpp !== 0) {
    throw new Error("bad length");
  }
  const pktType = rgbw ? DDP_TYPE_RGBW32 : DDP_TYPE_RGB24;
  const packets: Uint8Array[] = [];
  let seq = startSeq & 0x0f;
  let off = 0;
  let globalOff = byteOffset;
  while (off < payload.length) {
    const chunk = payload.subarray(off, off + DDP_MAX_PAYLOAD);
    off += chunk.length;
    const isLast = off >= payload.length;
    const flags = DDP_FLAG_V1 | (isLast ? DDP_FLAG_PUSH : 0);
    const header = new ArrayBuffer(DDP_HEADER_LEN);
    const view = new DataView(header);
    view.setUint8(0, flags);
    view.setUint8(1, seq);
    view.setUint8(2, pktType);
    view.setUint8(3, DDP_ID_DISPLAY);
    view.setUint32(4, globalOff, false);
    view.setUint16(8, chunk.length, false);
    const pkt = new Uint8Array(DDP_HEADER_LEN + chunk.length);
    pkt.set(new Uint8Array(header), 0);
    pkt.set(chunk, DDP_HEADER_LEN);
    packets.push(pkt);
    globalOff += chunk.length;
    seq = (seq + 1) & 0x0f;
  }
  return packets;
}

function parsePacket(packet: Uint8Array) {
  const view = new DataView(packet.buffer, packet.byteOffset, packet.byteLength);
  const flags = view.getUint8(0);
  const length = view.getUint16(8, false);
  return {
    push: Boolean(flags & DDP_FLAG_PUSH),
    v1: Boolean(flags & DDP_FLAG_V1),
    length,
    payload: packet.subarray(DDP_HEADER_LEN, DDP_HEADER_LEN + length),
  };
}

describe("DDP packet builder", () => {
  it("single RGBW frame has PUSH on last only", () => {
    const pixels = new Uint8Array(12);
    const packets = buildDdpPackets(pixels, true);
    expect(packets).toHaveLength(1);
    const p = parsePacket(packets[0]!);
    expect(p.push).toBe(true);
    expect(p.v1).toBe(true);
    expect(p.length).toBe(12);
  });

  it("property: round-trip arbitrary RGB payloads", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 120 }),
        fc.integer({ min: 0, max: 15 }),
        (pixelCount, startSeq) => {
          const payload = new Uint8Array(pixelCount * 3);
          for (let i = 0; i < payload.length; i++) {
            payload[i] = i % 256;
          }
          const packets = buildDdpPackets(payload, false, 0, startSeq);
          let merged = new Uint8Array(0);
          for (const pkt of packets) {
            const p = parsePacket(pkt);
            const next = new Uint8Array(merged.length + p.payload.length);
            next.set(merged);
            next.set(p.payload, merged.length);
            merged = next;
          }
          expect(merged).toEqual(payload);
          for (let i = 0; i < packets.length - 1; i++) {
            expect(parsePacket(packets[i]!).push).toBe(false);
          }
          expect(parsePacket(packets[packets.length - 1]!).push).toBe(true);
        }
      )
    );
  });
});

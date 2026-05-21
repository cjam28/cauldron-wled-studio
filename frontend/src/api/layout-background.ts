/** Upload floorplan background for a layout (authenticated WebSocket). */

import type { Connection } from "home-assistant-js-websocket";
import { waitForConnection } from "./live-stream.js";
import { SCHEMA_VERSION } from "./types.js";
import { formatHaError } from "../utils/ha-error.js";

const MAX_EDGE = 2048;
const DECODE_TIMEOUT_MS = 15_000;

function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error(message)), ms);
    }),
  ]);
}

function isHeicFile(file: File): boolean {
  const t = (file.type || "").toLowerCase();
  return (
    t.includes("heic") ||
    t.includes("heif") ||
    /\.heic$/i.test(file.name) ||
    /\.heif$/i.test(file.name)
  );
}

async function loadImageFromObjectUrl(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Image decode failed"));
      img.src = url;
    });
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function loadImageFromBitmap(file: File): Promise<HTMLImageElement> {
  const bitmap = await withTimeout(
    createImageBitmap(file),
    DECODE_TIMEOUT_MS,
    "Image decode timed out — try JPEG or PNG instead."
  );
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Image decode failed"));
    img.src = dataUrl;
  });
  return img;
}

async function layoutWs<T>(
  connection: Connection,
  payload: { type: string } & Record<string, unknown>
): Promise<T> {
  await waitForConnection(connection);
  try {
    return (await connection.sendMessagePromise({
      ...payload,
      schema_version: SCHEMA_VERSION,
    })) as T;
  } catch (err) {
    throw new Error(formatHaError(err));
  }
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Encode failed"));
        return;
      }
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(new Error("Encode failed"));
    reader.readAsDataURL(blob);
  });
}

/** Decode room photo for the crop editor (JPEG/PNG fast; HEIC with timeout). */
export async function loadImageElementFromFile(file: File): Promise<HTMLImageElement> {
  if (isHeicFile(file)) {
    try {
      return await loadImageFromBitmap(file);
    } catch (err) {
      throw new Error(
        err instanceof Error
          ? `${err.message} Export HEIC to JPEG in Photos and try again.`
          : "HEIC not supported here. Export to JPEG in Photos and try again."
      );
    }
  }
  try {
    return await loadImageFromObjectUrl(file);
  } catch {
    return loadImageFromBitmap(file);
  }
}

export async function imageToJpegBlob(
  img: HTMLImageElement,
  maxEdge = MAX_EDGE
): Promise<Blob> {
  const scale = Math.min(1, maxEdge / Math.max(img.naturalWidth, img.naturalHeight, 1));
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.drawImage(img, 0, 0, w, h);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Encode failed"))),
      "image/jpeg",
      0.88
    );
  });
}

export async function resizeImageFile(file: File): Promise<Blob> {
  const img = await loadImageElementFromFile(file);
  return imageToJpegBlob(img);
}

export async function uploadLayoutBackground(
  connection: Connection,
  controllerId: string,
  layoutId: string,
  file: File
): Promise<{ background_url: string }> {
  if (!connection) {
    throw new Error("Not connected to Home Assistant");
  }
  const blob = await resizeImageFile(file);
  const data = await blobToBase64(blob);
  const res = await layoutWs<{ background_url?: string; ok?: boolean }>(
    connection,
    {
      type: "wled_studio/layout_upload_bg",
      controller_id: controllerId,
      layout_id: layoutId,
      data,
      content_type: blob.type || "image/jpeg",
    }
  );
  if (!res.background_url) {
    throw new Error("Photo upload failed — no URL returned");
  }
  return { background_url: res.background_url };
}

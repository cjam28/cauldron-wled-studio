/** Upload floorplan background for a layout (authenticated WebSocket). */

import type { Connection } from "home-assistant-js-websocket";
import { waitForConnection } from "./live-stream.js";
import { SCHEMA_VERSION } from "./types.js";

const MAX_EDGE = 2048;

async function layoutWs<T>(
  connection: Connection,
  payload: { type: string } & Record<string, unknown>
): Promise<T> {
  await waitForConnection(connection);
  return connection.sendMessagePromise({
    ...payload,
    schema_version: SCHEMA_VERSION,
  }) as Promise<T>;
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

/** Decode any browser-supported image (incl. HEIC where createImageBitmap works). */
export async function loadImageElementFromFile(file: File): Promise<HTMLImageElement> {
  const decodeViaBitmap = async (): Promise<HTMLImageElement> => {
    const bitmap = await createImageBitmap(file);
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
  };

  try {
    return await decodeViaBitmap();
  } catch {
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () =>
          reject(
            new Error(
              "Could not load this image. Try JPEG/PNG, or export HEIC to JPEG in Photos first."
            )
          );
        img.src = url;
      });
      return img;
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}

export async function resizeImageFile(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
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
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Encode failed"))),
      file.type.startsWith("image/png") ? "image/png" : "image/jpeg",
      0.88
    );
  });
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

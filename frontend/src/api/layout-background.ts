/** Upload floorplan background for a layout (POST multipart to HA API). */

const MAX_EDGE = 2048;

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
  controllerId: string,
  layoutId: string,
  file: File
): Promise<{ background_url: string }> {
  const blob = await resizeImageFile(file);
  const ext = blob.type === "image/png" ? "png" : "jpg";
  const form = new FormData();
  form.append(
    "file",
    new File([blob], `background.${ext}`, { type: blob.type })
  );
  const res = await fetch(
    `/api/wled_studio/layout_bg/${encodeURIComponent(controllerId)}/${encodeURIComponent(layoutId)}`,
    { method: "POST", body: form, credentials: "same-origin" }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Upload failed (${res.status})`);
  }
  return (await res.json()) as { background_url: string };
}

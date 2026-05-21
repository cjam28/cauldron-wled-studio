/** Load HA /local and remote images for canvas without breaking CORS. */

export function configureHaImageSrc(img: HTMLImageElement, url: string, bustCache = false): void {
  let src = url;
  if (bustCache && !src.includes("?")) {
    src = `${src}?v=${Date.now()}`;
  }
  img.removeAttribute("crossorigin");
  if (src.startsWith("http://") || src.startsWith("https://")) {
    try {
      const u = new URL(src, window.location.href);
      if (u.origin !== window.location.origin) {
        img.crossOrigin = "anonymous";
      }
    } catch {
      img.crossOrigin = "anonymous";
    }
  }
  img.src = src;
}

export function loadHaImage(
  url: string,
  bustCache = false
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error(`Could not load image (${url})`));
    configureHaImageSrc(img, url, bustCache);
  });
}

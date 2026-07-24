/**
 * Copy the built bundle into the integration's static dir.
 *
 * Phase 3 (build split): the build now emits MANY files into dist/ — the three
 * entry chunks (wled-studio-card / wled-studio-panel / wled-painter-card), the
 * shared `wled-studio-core` chunk, and one lazy chunk per heavy view (view-layout,
 * view-paint, view-audio, …) plus any other auto-split shared chunks. Each entry
 * imports its siblings by RELATIVE path (`./wled-studio-core.js`, dynamic
 * `import("./view-layout.js")`), so EVERY `.js`/`.map` in dist/ must land next to
 * the entries in www/ for those imports to resolve. The whole www/ dir is served
 * from STATIC_URL_PREFIX with cache_headers=False (see custom_components/.../__init__.py),
 * so the chunks are always revalidated; the entry resource URLs additionally carry
 * the ?hacstag query for an explicit cache-bust.
 */
import { cpSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const dist = join(root, "dist");
const www = join(root, "custom_components/wled_studio/www");

mkdirSync(www, { recursive: true });
// Clear stale chunks first so removed/renamed chunks never linger in www/.
for (const name of readdirSync(www)) {
  if (name.endsWith(".js") || name.endsWith(".map")) {
    unlinkSync(join(www, name));
  }
}
let copied = 0;
for (const name of readdirSync(dist)) {
  if (name.endsWith(".js") || name.endsWith(".map")) {
    cpSync(join(dist, name), join(www, name), { force: true });
    copied += 1;
  }
}
console.log(`Copied ${copied} files (dist/*.js + *.map) → custom_components/wled_studio/www/`);

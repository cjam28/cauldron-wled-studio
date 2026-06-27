import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const production = !process.env.ROLLUP_WATCH;
const preview = !!process.env.WLED_PREVIEW;

const here = fileURLToPath(new URL(".", import.meta.url));
const previewEntry = "preview/preview-entry.ts";
const previewDir = join(here, "preview");

const sharedPlugins = () => [
  // @material/web ships ESM built on lit; resolve + commonjs interop keeps the
  // bundle as a single ESM artifact (no code-splitting — that is Phase 3).
  resolve({ browser: true, exportConditions: ["browser", "import", "default"] }),
  commonjs(),
  typescript({ tsconfig: "./tsconfig.json" }),
  production && terser({ format: { comments: false } }),
];

const sharedOutput = {
  format: "esm",
  sourcemap: true,
  inlineDynamicImports: true,
};

const onwarn = (warning, warn) => {
  if (warning.code === "CIRCULAR_DEPENDENCY") return;
  warn(warning);
};

const entry = (input, file) => ({
  input,
  output: { file, ...sharedOutput },
  plugins: sharedPlugins(),
  onwarn,
});

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
};

/**
 * Tiny dependency-free static server for `preview/` so the design harness can
 * render the card at 414 / 500 / 1680 widths during `npm run preview`.
 * Implemented inline (no extra dep) and only attached in preview mode.
 */
function servePreview({ port = 5174, root = previewDir, dist } = {}) {
  let started = false;
  const roots = [root, dist].filter(Boolean);
  const send = (res, status, body, type) => {
    res.writeHead(status, { "content-type": type || "text/plain; charset=utf-8" });
    res.end(body);
  };
  return {
    name: "serve-preview",
    writeBundle() {
      if (started) return;
      started = true;
      const server = createServer((req, res) => {
        const url = (req.url || "/").split("?")[0];
        const rel = normalize(decodeURIComponent(url)).replace(/^(\.\.[/\\])+/, "");
        const candidate = rel === "/" || rel === "" ? "index.html" : rel.replace(/^[/\\]+/, "");
        for (const base of roots) {
          let file = join(base, candidate);
          try {
            if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
            if (existsSync(file) && statSync(file).isFile()) {
              return send(res, 200, readFileSync(file), MIME[extname(file)]);
            }
          } catch {
            /* fall through to next root / 404 */
          }
        }
        send(res, 404, `Not found: ${candidate}`);
      });
      server.on("error", (err) => {
        this.warn(`preview server error: ${err.message}`);
      });
      server.listen(port, () => {
        this.warn(`preview: serving ${root} at http://localhost:${port}/`);
      });
    },
  };
}

/** @type {import('rollup').RollupOptions[]} */
const configs = [
  entry("src/lovelace.ts", "../dist/wled-studio-card.js"),
  entry("src/panel-entry.ts", "../dist/wled-studio-panel.js"),
  entry("src/painter-entry.ts", "../dist/wled-painter-card.js"),
];

// Preview entry: bundles the M3 design harness + @material/web. Added only when
// its source exists so the foundation build stays green before the entry lands
// (this task adds preview/preview-entry.ts). Keeps the existing 3 entries
// untouched. Bundles to preview/preview-bundle.js, served alongside
// preview/index.html by the preview server below.
if (existsSync(join(here, previewEntry))) {
  const previewConfig = entry(previewEntry, "preview/preview-bundle.js");
  if (preview) previewConfig.plugins.push(servePreview({ dist: "../dist" }));
  configs.push(previewConfig);
}

export default configs;

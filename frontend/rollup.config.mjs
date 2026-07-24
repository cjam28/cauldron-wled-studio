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
  // @material/web ships ESM built on lit; resolve + commonjs interop keeps every
  // emitted chunk valid ESM.
  resolve({ browser: true, exportConditions: ["browser", "import", "default"] }),
  commonjs(),
  typescript({ tsconfig: "./tsconfig.json" }),
  production && terser({ format: { comments: false } }),
];

/**
 * Phase 3 build split.
 *
 * The card / panel / painter entries are built together into a single `output.dir`
 * so rollup can extract the code they share into ONE shared chunk instead of
 * inlining it into every entry. We force that shared chunk to a FIXED, stable
 * filename — `wled-studio-core.js` — via `manualChunks`, so the integration can
 * serve it (and cache-bust it) by a known name.
 *
 * The heavy panel views (layout / audio / voice / schedules / devices / settings
 * / firmware / paint) reach the card ONLY through the dynamic `import()` thunks in
 * `core/view-registry.ts`. Because we no longer set `inlineDynamicImports`, rollup
 * splits each of those into its own async chunk, so they are NOT part of the card
 * entry bundle — the card downloads them lazily when a heavy view is first opened.
 *
 * `manualChunks` only pins the shared *runtime* (lit + the framework code reachable
 * from more than one entry's STATIC graph) into `wled-studio-core`. It deliberately
 * does NOT pull the heavy-view-only vendors (konva / iro / twgl / kdbush / …) into
 * core: those are reachable only via dynamic import, so leaving them out keeps them
 * in the lazy view chunks and out of the card's critical path.
 */
const CORE_CHUNK = "wled-studio-core";

// Vendors that are part of the shared runtime (used by every entry's static graph
// and the lazy views alike). Pinning them into the core chunk keeps a single copy
// of lit/@lit/@material across all entries and chunks.
const CORE_VENDORS = ["/lit/", "/lit-html/", "/lit-element/", "/@lit/", "/@material/"];

const manualChunks = (id) => {
  const norm = id.replace(/\\/g, "/");
  if (CORE_VENDORS.some((frag) => norm.includes(`node_modules${frag}`))) {
    return CORE_CHUNK;
  }
  return undefined;
};

const sharedOutput = {
  format: "esm",
  sourcemap: true,
  // No `inlineDynamicImports` — that is what neutered the split before.
  chunkFileNames: "[name].js",
  entryFileNames: "[name].js",
  manualChunks,
};

const onwarn = (warning, warn) => {
  if (warning.code === "CIRCULAR_DEPENDENCY") return;
  warn(warning);
};

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

/**
 * Main build: the three production entries share ONE config so rollup can hoist
 * their common code into the single `wled-studio-core` chunk and split the heavy
 * lazy views (via view-registry's dynamic imports) into their own chunks. Named
 * inputs give each entry a stable `[name].js` filename in `../dist`.
 */
const mainConfig = {
  input: {
    "wled-studio-card": "src/lovelace.ts",
    "wled-studio-panel": "src/panel-entry.ts",
    "wled-painter-card": "src/painter-entry.ts",
  },
  output: {
    dir: "../dist",
    ...sharedOutput,
  },
  plugins: sharedPlugins(),
  onwarn,
  // These are app entry points (custom-element side effects + a few re-exports),
  // not a consumed library API. Dropping the preserved entry signature lets rollup
  // emit each entry as a real chunk instead of a thin re-export facade.
  preserveEntrySignatures: false,
};

/** @type {import('rollup').RollupOptions[]} */
const configs = [mainConfig];

// Preview entry: bundles the M3 design harness + @material/web. Added only when
// its source exists so the foundation build stays green before the entry lands.
// Built into its own `output.dir` (preview/) — served alongside preview/index.html
// by the preview server below — with the same split semantics (shared core chunk +
// lazy view chunks) so the harness exercises the real, split card bundle.
if (existsSync(join(here, previewEntry))) {
  const previewConfig = {
    input: { "preview-bundle": previewEntry },
    output: {
      dir: "preview",
      ...sharedOutput,
    },
    plugins: sharedPlugins(),
    onwarn,
    preserveEntrySignatures: false,
  };
  if (preview) previewConfig.plugins.push(servePreview({ dist: "../dist" }));
  configs.push(previewConfig);
}

export default configs;

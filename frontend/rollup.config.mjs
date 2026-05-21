import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.ts",
  output: {
    dir: "../dist",
    format: "esm",
    sourcemap: true,
    entryFileNames: "wled-studio-card.js",
    chunkFileNames: "[name].js",
    manualChunks(id) {
      if (id.includes("panel/wled-studio-panel")) return "wled-studio-panel";
      if (id.includes("/layout/")) return "layout-designer";
    },
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    production && terser({ format: { comments: false } }),
  ],
  onwarn(warning, warn) {
    if (warning.code === "CIRCULAR_DEPENDENCY") return;
    warn(warning);
  },
};

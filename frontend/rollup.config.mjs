import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const production = !process.env.ROLLUP_WATCH;

const sharedPlugins = [
  resolve({ browser: true }),
  commonjs(),
  typescript({ tsconfig: "./tsconfig.json" }),
  production && terser({ format: { comments: false } }),
];

const sharedOutput = {
  format: "esm",
  sourcemap: true,
  inlineDynamicImports: true,
};

/** @type {import('rollup').RollupOptions[]} */
export default [
  {
    input: "src/lovelace.ts",
    output: { file: "../dist/wled-studio-card.js", ...sharedOutput },
    plugins: sharedPlugins,
    onwarn(warning, warn) {
      if (warning.code === "CIRCULAR_DEPENDENCY") return;
      warn(warning);
    },
  },
  {
    input: "src/panel-entry.ts",
    output: { file: "../dist/wled-studio-panel.js", ...sharedOutput },
    plugins: sharedPlugins,
    onwarn(warning, warn) {
      if (warning.code === "CIRCULAR_DEPENDENCY") return;
      warn(warning);
    },
  },
];

import { defineConfig } from "tsup";

export default defineConfig([
  // Core + framework wrappers — ESM & CJS
  {
    entry: {
      index: "src/core/index.ts",
      "react/index": "src/react/index.tsx",
      "vue/index": "src/vue/index.ts",
      "angular/index": "src/angular/index.ts",
      "svelte/index": "src/svelte/index.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: false,
    treeshake: true,
    external: [
      "react",
      "react-dom",
      "vue",
      "@angular/core",
      "@angular/common",
      "svelte",
    ],
    esbuildOptions(options) {
      options.banner = {
        js: "/* ramadan-overlay — MIT License */",
      };
    },
  },
  // IIFE bundle for CDN <script> usage — bundles canvas-confetti inline
  {
    entry: { "ramadan-overlay.min": "src/core/index.ts" },
    format: ["iife"],
    globalName: "RamadanOverlay",
    outDir: "dist",
    outExtension: () => ({ js: ".js" }),
    minify: true,
    sourcemap: false,
    clean: false,
    noExternal: ["canvas-confetti"],
    esbuildOptions(options) {
      options.banner = {
        js: "/* ramadan-overlay — MIT License */",
      };
    },
  },
]);

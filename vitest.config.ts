/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "ramadan-overlay/react": path.resolve(__dirname, "src/react/index.tsx"),
      "ramadan-overlay/vue": path.resolve(__dirname, "src/vue/index.ts"),
      "ramadan-overlay/angular": path.resolve(
        __dirname,
        "src/angular/index.ts"
      ),
      "ramadan-overlay/svelte": path.resolve(__dirname, "src/svelte/index.ts"),
      "ramadan-overlay": path.resolve(__dirname, "src/core/index.ts"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: [
      "src/**/*.test.ts",
      "demo/**/*.test.ts",
      "demo/**/*.test.tsx",
      "scripts/**/*.test.ts",
    ],
  },
});

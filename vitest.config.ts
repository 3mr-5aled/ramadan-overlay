/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
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

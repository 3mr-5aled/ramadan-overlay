import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  base: "./",
  plugins: [react()],
  root: path.resolve(__dirname, "."),
  resolve: {
    alias: {
      "ramadan-overlay/react": path.resolve(
        __dirname,
        "../src/react/index.tsx"
      ),
      "ramadan-overlay": path.resolve(__dirname, "../src/core/index.ts"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "../dist-demo"),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: false,
  },
});

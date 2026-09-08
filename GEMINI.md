# 🌙 ramadan-overlay Project Context

A lightweight, framework-agnostic TypeScript library that injects beautiful Ramadan decorations into any web application.

## Project Overview

- **Purpose:** Automatically trigger visual Ramadan decorations (lanterns, sparkles, crescent & stars, etc.) based on the Hijri calendar.
- **Key Features:**
  - **Auto-detection:** Uses `Intl.DateTimeFormat` (islamic-umalqura) with a fallback table for legacy environments.
  - **Multi-variant:** Supports 5 visual styles (`lanterns`, `sparkles`, `crescent-stars`, `geometric`, `banner`).
  - **Cross-framework:** First-class support for React, Vue 3, Angular, and Svelte via dedicated wrappers.
  - **Zero Dependencies:** Core library is standalone (only uses `canvas-confetti` as a small runtime dependency).
- **Tech Stack:**
  - **Language:** TypeScript
  - **Bundler:** `tsup` (generates ESM, CJS, and browser-ready IIFE)
  - **Testing:** `vitest` with `jsdom`
  - **Styling:** CSS-in-JS (styles inlined in `injector.ts` to avoid external CSS imports for consumers)

## Architecture

- `src/core/`: The platform-agnostic core.
  - `injector.ts`: The main `init()` logic, config resolution, and overlay controller.
  - `host.ts`: DOM host mounting seam, CSS injection, and root container lifecycle.
  - `motion.ts`: Unified motion engine handling reduced-motion constraints and tab-visibility synchronization.
  - `detector.ts`: Hijri date calculation and Ramadan state detection.
  - `variants/`: Logic for rendering each decoration style.
  - `confetti.ts`: Integration with `canvas-confetti`.
- `src/react/`, `src/vue/`, `src/angular/`, `src/svelte/`: Framework-specific adapter components and hooks/composables.
- `src/types.ts`: Central source of truth for configuration and state interfaces.
- `assets/`: Icons and metadata for PWA/demo.
- `lanterns/`: SVG assets for the lantern variant.

## Building and Running

- **Install Dependencies:** `npm install`
- **Build Project:** `npm run build` (outputs to `dist/`)
- **Development Mode:** `npm run dev` (watch mode for `tsup`)
- **Run Tests:** `npm run test` or `npm run test:watch`
- **Type Check:** `npm run typecheck`
- **Lint:** `npm run lint`

## Development Conventions

- **Surgical Updates:** When modifying core logic, ensure framework adapters remain compatible. Check `src/types.ts` first for interface changes.
- **CSS Injection:** Base styles are defined in `src/core/host.ts` (orchestrated by `injector.ts`) and injected into the document head at runtime. Avoid adding external `.css` files unless they are processed by the build pipeline.
- **Testing:** Any logic changes in `detector.ts`, `host.ts`, or `injector.ts` MUST be accompanied by updates to test suites (`detector.test.ts`, `host.test.ts`, `motion.test.ts`).
- **Framework Wrappers:** Keep the wrappers thin. They should primarily call `init()` from `core` and handle lifecycle cleanup via `overlay.destroy()`.
- **SVG Optimization:** When adding new lanterns or decorations, keep SVGs optimized and small to maintain the library's "lightweight" promise.

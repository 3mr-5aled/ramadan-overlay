# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.8.0] - 2026-09-18

### Added

- **Multi-LTS Continuous Integration (CI)**: Automated GitHub Actions CI workflow running linting, typechecking, test suites, and bundle compilation on pull requests and pushes to `main` across Node.js 20 and 22.
- **Automated GitHub Pages Showcase Deployment**: Direct artifact deployment (`dist-demo/`) to GitHub Pages on every merge to `main` via official Actions artifacts.
- **Cryptographic Release Pipeline**: Tag-triggered automated npm publishing with cryptographic build provenance (`--provenance --access public`) and GitHub Release creation attaching the standalone CDN bundle (`ramadan-overlay.min.js`).
- **Release Preparation Utility**: Interactive CLI tool (`scripts/release-prep.cjs`, `npm run release:prep`) ensuring clean Git trees, semantic version validation, pre-flight gates, and matching tag creation.
- **Node Engine Specifications**: Added `"engines": { "node": ">=20.0.0" }` in `package.json` aligning with active LTS runtimes and `jsdom@28.1.0`.

### Changed

- **Pure Artifact Demo Build**: Modified `npm run build:demo` to output cleanly to `dist-demo/` without root Git working tree pollution, removing legacy `demo/sync-to-root.cjs`.
- **Vitest Source Resolution**: Added source module aliases in `vitest.config.ts` so tests can execute against TypeScript sources in clean checkouts without requiring a pre-built `dist/` folder.

### Fixed

- **Module Resolution in Clean Clones**: Resolved `ramadan-overlay/react` import failure in `demo/src/App.test.tsx` when running tests prior to bundle generation.
- **Git Hook Environment Isolation**: Prevented `GIT_*` environment variables from leaking into test subshells during pre-commit execution.

## [0.7.0] - 2026-09-17

### Added

- **Multi-Occasion Architecture**: Native auto-detection and celebratory styling for Ramadan, Eid Al-Fitr, and Eid Al-Adha (`occasions: ['ramadan', 'eid-fitr', 'eid-adha']`), with contextual greeting phrases in Arabic and English.
- **8 Visual Variants**:
  - `lanterns`: 12 authentic SVG silhouette styles with configurable rope swag and side columns.
  - `sparkles`: Ambient star-dust particle drift.
  - `crescent-stars`: Ascending crescent and celestial star motifs.
  - `geometric`: Traditional Islamic geometric border margins.
  - `eid-fitr`: Celebratory floating balloons, gift boxes, and stars.
  - `eid-adha`: Geometric sheep, crescents, and festive stars.
  - `eid`: Intelligent auto-routing variant selecting `eid-fitr` or `eid-adha` based on current holiday.
  - `banner`: Top greeting bar prepended to page layout with responsive controls.
- **Iftar Countdown Widget**: Standalone floating countdown card and minimizable docked pill (`🌙 18:45 · 14m 20s`) for daily Iftar alerts.
- **Web Audio Harmonic Chime**: Zero-dependency synthesised alert tone with harmonic overtone decay and user gesture priming.
- **7 Predefined Theme Presets**: Curated cultural palettes (`classic`, `midnight`, `emerald`, `royal`, `desert-dusk`, `platinum-minimal`, `rose-sahara`) with dynamic runtime hot-swapping via `overlay.setTheme()`.
- **Content Safe Zone (`clearance: 'edges' | 'full'`)**: Central reading corridor clearance keeping headlines, text, and action buttons unobstructed by floating motifs.
- **Layer Stacking (`layer: 'foreground' | 'background'`)**: Ambient wallpaper mode mounting overlay behind application content (`z-index: -1`).
- **Lantern Stacking (`lanternZIndex`)**: Granular z-index elevation control specifically for lantern rows and suspended units (`--ro-lantern-z`).
- **Advanced Suspension Styles**: Scalloped festoon (`u-shaped`) and dual parallel catenary cables (`dual`) with configurable sag depth (`ropeSag`).
- **Vertical Viewport Positioning**: Support for `'left'`, `'right'`, `'sides'`, `'start'`, and `'end'` margin channels with mobile breakpoint controls (`mobileSideBehavior`).
- **Variant Preview Screenshots**: High-resolution gallery assets stored in `assets/previews/` and documented in `README.md`.
- **Interactive React Demo**: Celestial nocturnal workbench with bilingual RTL Arabic/LTR English support, preset gallery, and AI agent prompt generator.

### Changed

- **Lantern Silhouette Fills**: Removed center yellow radial gradient flame highlight to restore authentic silhouette color fidelity across custom themes, while keeping outer glow pulse intact.
- **Package Version**: Bumped library release to `0.7.0`.

### Fixed

- Resolved phantom container creation when switching between fixed overlay and top banner mode.
- Corrected midnight transition recalculation across tab visibility and focus changes.
- Stabilized canvas confetti firing in preview mode and custom dates.

## [0.1.0] - 2026-08-20

### Added

- Initial release of `ramadan-overlay`.
- Hijri calendar auto-detection using `Intl.DateTimeFormat` (islamic-umalqura) with static offline astronomical fallback table.
- Framework wrappers for React, Vue 3, Angular, and Svelte.
- Standalone zero-dependency browser bundle (`dist/ramadan-overlay.min.js`).

[0.8.0]: https://github.com/3mr-5aled/ramadan-overlay/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/3mr-5aled/ramadan-overlay/compare/v0.1.0...v0.7.0
[0.1.0]: https://github.com/3mr-5aled/ramadan-overlay/releases/tag/v0.1.0

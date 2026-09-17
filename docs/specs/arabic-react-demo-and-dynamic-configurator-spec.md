# Specification: Arabic React Demo Application & Dynamic Variant Configurator

**Feature Issue:** [#46 - [Spec] Arabic React Demo Application & Dynamic Variant Configurator](https://github.com/3mr-5aled/ramadan-overlay/issues/46)  
**Status:** Ready for Implementation (`ready-for-agent`)

---

The existing demonstration workbench for `ramadan-overlay` is hosted as a single monolithic 3,559-line HTML file (`index.html`). This legacy structure presents several major challenges:

1. **Maintenance & Extensibility Friction**: Maintaining extensive UI controls, code viewers, sandboxes, and safety consoles inside a single static HTML file is error-prone and prevents modular component reuse.
2. **Missing Native Arabic Experience**: Although the library celebrates Ramadan and Eid, the demo is presented exclusively in English with `dir="ltr"`. Arab developers, businesses, and users lack a native, culturally authentic Arabic-first experience with appropriate typography, right-to-left (RTL) layout, and localized controls.
3. **Incompatible Options Cluttering the Configurator**: The configurator currently displays all configuration options for all variants at all times. In reality, different **Overlay Variants** have distinct physical and geometric models. For example, `'lanterns'` suspends from the ceiling rail or side margins and does not support bottom placement; `'banner'` only supports top or bottom and cannot hang on side gutters; rope style and sag only apply to lanterns; and content safe zone clearance only applies to floating motif variants. Exposing invalid options confuses developers and creates expectations of visual behaviors that the engine does not support.

## Solution

Build a modern, modular, component-driven React demonstration application powered by Vite that serves as the official interactive showcase for `ramadan-overlay`:

1. **Bilingual Arabic & English Architecture**: A first-class Arabic experience enabled by default (`lang="ar"`, `dir="rtl"`), paired with a seamless 1-click toggle to English (`en`, `dir="ltr"`). The design incorporates authentic Arabic calligraphy (**Amiri**) for decorative headings and festive greetings, paired with a modern geometric typeface (**Cairo** / **Plus Jakarta Sans**) for crisp form inputs and UI labels.
2. **Dynamic Variant Capability Matrix**: A reactive state machine that strictly filters form controls based on the active **Overlay Variant**. Unsupported options and invalid viewport positions are cleanly removed from the DOM, and switching variants automatically sanitizes out-of-bounds configurations to safe defaults.
3. **Dogfooding the Official React Adapter**: The interactive demo backdrop is rendered using the library's own `<RamadanOverlay />` component, verifying real-world React compatibility and generating copy-pasteable React snippets.
4. **Advanced Developer Lab**: A collapsible drawer holding the **Iftar Countdown Sandbox** (testing docked pill states, audio alerts, and manual overrides) and the **Defensive Safety & Resilience Console** (triggering runtime clamping, invalid date handling, and error containment tests).
5. **Zero-Disruption Production Build**: Vite sources live cleanly in `demo/src/`, while the build step emits production assets directly to root `index.html` and `assets/`, preserving compatibility with current static hosting and GitHub Pages workflows.

---

## User Stories

1. As an Arabic-speaking developer, I want the demo page to load in Arabic by default with proper RTL alignment, so that I feel immediate cultural alignment and ease of use.
2. As an English-speaking developer, I want a persistent language switcher in the navbar, so that I can switch the entire interface to English with a single click.
3. As a developer exploring the `'lanterns'` variant, I want the position picker to only offer `top`, `sides`, `left`, `right`, `start`, and `end`, so that I am not offered impossible options like `bottom`, `both`, or `full`.
4. As a developer selecting `'banner'`, I want the position picker to only offer `top` and `bottom`, so that I cannot configure unsupported side positions.
5. As a developer configuring the `'banner'` variant, I want dedicated text input fields for both Arabic and English greeting texts, so that I can test custom seasonal copy.
6. As a developer switching from `'geometric'` positioned at `bottom` to `'lanterns'`, I want the position to automatically and silently reset to `top`, so that the overlay engine receives a valid configuration without throwing warnings.
7. As a developer tweaking lantern aesthetics, I want to adjust rope style (`straight`, `u-shaped`, `dual`) and sag depth only when `'lanterns'` is active, so that irrelevant rope options do not clutter other variants.
8. As a developer testing floating motifs (`'crescent-stars'`, `'eid'`), I want to toggle the Content Safe Zone clearance between `edges` and `full`, so that I can see how peripheral gutters preserve readable content space.
9. As a developer testing ambient particles (`'sparkles'`), I want to adjust particle density without seeing lantern rope or banner greeting controls.
10. As an engineer evaluating the library for React, I want to see the demo rendered using the official `<RamadanOverlay />` component, so that I have confidence in the library's React export.
11. As an engineer copying integration code, I want tabbed code snippets for React, Vanilla JS, Vue, Svelte, and Angular, so that I can easily integrate the overlay into my framework of choice.
12. As a developer using AI coding assistants (Cursor, Claude Code, Copilot), I want an **Agent Prompt Seam** tab that generates a customized integration prompt in my active language, so that I can instruct my AI agent to integrate the overlay into my codebase.
13. As a user visiting a shared link with an encoded configuration hash, I want the demo to restore the exact variant, theme, and language state, so that colleagues see what I configured.
14. As a developer testing seasonal occasions, I want a dropdown to preview `ramadan`, `eid-fitr`, and `eid-adha`, so that I can see occasion-specific visual themes and greetings.
15. As a developer testing the countdown feature, I want an interactive Countdown Sandbox where I can trigger the countdown, minimize it to a Docked Pill, expand it, mute/unmute audio, and preview the celebration chime.
16. As a technical evaluator verifying resilience, I want interactive test buttons that simulate extreme configurations, invalid Date objects, and stylesheet injection crashes, so that I can verify the library's Error Containment Boundary and Atomic DOM Rollback.
17. As a developer testing festive moments, I want a "Confetti" trigger button in the navbar, so that I can preview the celebration flare on demand.
18. As a developer testing dark mode and contrast, I want to switch between all 7 ratified Theme Presets (`classic`, `midnight`, `emerald`, `royal`, `desert-dusk`, `platinum-minimal`, `rose-sahara`), so that I can evaluate color harmonies against my site's palette.
19. As a developer customizing theme colors, I want color pickers for custom palettes that update the live preview instantaneously.
20. As a mobile developer, I want the demo layout and controls to collapse into an ergonomic touch-friendly drawer on mobile viewports, so that I can preview overlays on phones.
21. As a developer concerned with bundle size, I want the demo to build cleanly without heavy UI library dependencies, so that it loads instantly.
22. As a maintainer editing demo components, I want modular React files (`Navbar.tsx`, `Configurator.tsx`, `CodeViewer.tsx`), so that I can make updates without scrolling through thousands of lines of HTML.

---

## Implementation Decisions

### 1. Application Layout & Architecture

- The demo application will reside in a dedicated directory (`demo/`) powered by Vite.
- Component structure will be strictly modular:
  - `demo/src/App.tsx`: Root state container, locale provider, and layout orchestration.
  - `demo/src/components/Navbar.tsx`: Brand, occasion badge, language switcher, master overlay toggle, audio chime trigger, and confetti launcher.
  - `demo/src/components/HeroCanopy.tsx`: Decorative typography header, festive sub-headline, and quick-start actions.
  - `demo/src/components/Workbench/`:
    - `Workbench.tsx`: Two-column container hosting the configuration controls and code generator.
    - `VariantSelector.tsx`: Grid of cards for selecting among the 8 **Overlay Variants**.
    - `UniversalControls.tsx`: Controls shared across all variants (Theme Preset, Layer Stacking, Opacity, Shadows, Auto-Trigger, Iftar Countdown toggle).
    - `PositionPicker.tsx`: Viewport position control that dynamically renders only allowed positions for the active variant.
    - `VariantSpecificControls.tsx`: Dynamic container rendering variant-specific sub-panels (`LanternControls`, `BannerControls`, `MotifControls`).
    - `ColorCustomizer.tsx`: Dynamic color picker panel for theme overrides.
    - `CodeViewer.tsx`: Multi-framework code box and Agent Prompt Seam with 1-click clipboard copying.
  - `demo/src/components/AdvancedLab/`:
    - `AdvancedLab.tsx`: Collapsible drawer for advanced developer utilities.
    - `CountdownSandbox.tsx`: Controller interface for interacting with the active Iftar Countdown Widget (show, dismiss, minimize, expand, toggle mute, play chime).
    - `ResilienceConsole.tsx`: Interactive test harness demonstrating defensive clamping, NaN date handling, DOM rollback, and double-contained `onError` hooks with real-time log output.
  - `demo/src/translations/`: Typed localization dictionaries (`ar.ts`, `en.ts`).

### 2. Variant Capability Matrix

The following matrix defines the exact valid positions and visible option fields for each **Overlay Variant**:

| Variant                             | Allowed Positions                                         | Visible Specific Controls                                                                                                      |
| :---------------------------------- | :-------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| **`lanterns`**                      | `top`, `left`, `right`, `sides`, `start`, `end`           | `lanternStyle` (1–12 or 0), `ropeStyle` (`straight`, `u-shaped`, `dual`), `ropeSag` (when curved), `ceilingColor`, `ropeColor` |
| **`banner`**                        | `top`, `bottom`                                           | `bannerBg`, `bannerTextColor`, `bannerIconColor`, `bannerTextEn`, `bannerTextAr`                                               |
| **`crescent-stars`**                | `full`, `both`, `top`, `bottom`, `sides`                  | `clearance` (`edges`, `full`), `intensity` (`low`, `normal`, `high`), `shadows` (`none`, `soft`, `deep`)                       |
| **`eid` / `eid-fitr` / `eid-adha`** | `full`, `both`, `top`, `bottom`, `sides`                  | `clearance` (`edges`, `full`), `intensity`, `shadows`                                                                          |
| **`geometric`**                     | `full`, `both`, `top`, `bottom`, `sides`, `left`, `right` | `density` (`low`, `normal`, `high`), custom palette pickers                                                                    |
| **`sparkles`**                      | `full`, `both`, `top`, `bottom`, `sides`                  | `density` (`low`, `normal`, `high`), `glowColor`                                                                               |

Universal controls visible across all variants:

- `theme` (7 Theme Presets + Custom)
- `opacity` (slider 0.1 – 1.0)
- `layer` (`foreground` | `background`)
- `shadows` (for variants with physical elevation)
- `autoTrigger` (boolean)
- `countdown` (boolean / toggle)
- `confetti` (`on` | `off`)

### 3. State Reconciliation & Auto-Sanitization

- When the user selects a new variant:
  - If the current `position` is not included in the new variant's allowed positions list, `position` immediately resets to the variant's canonical default (e.g. `'top'` for `lanterns` and `banner`, `'both'` or `'full'` for motifs).
  - If the previous variant had active custom fields that do not apply to the new variant, those fields are dormant and excluded from the generated configuration object and code viewer snippets.

### 4. Internationalization & Cultural Tokens

- **Default Locale**: `'ar'` (Arabic).
- **RTL Enforcement**: Toggling language updates `document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr')` and `document.documentElement.setAttribute('lang', locale)`.
- **Typography Stack**:
  - Headers & Festive Accents: `'Amiri', 'Traditional Arabic', serif`
  - UI Labels, Buttons & Form Inputs: `'Cairo', 'Plus Jakarta Sans', system-ui, sans-serif`
  - Code & Technical Outputs: `'JetBrains Mono', monospace`
- **Numeral Convention**: Western Arabic numerals (`1, 2, 3...`) are used for technical form controls, sliders, and code snippets, while Arabic calligraphy is used for festive greetings, month titles, and badges.
- **State Persistence**: Locale is saved in `localStorage` under key `ro_demo_lang` and synchronized to the URL hash parameters (`&lang=ar`).

### 5. Build & Output Pipeline

- Vite configuration (`demo/vite.config.ts`) configured with:
  - Root directory set to `demo/`.
  - Build output directory configured to emit directly to the repository root (`emptyOutDir: false`, writing `index.html` and assets to `assets/demo/`).
  - Aliases pointing to local source packages (`ramadan-overlay` -> `src/index.ts`, `ramadan-overlay/react` -> `src/react/index.ts`).
- `package.json` scripts:
  - `"demo"`: `"vite demo"`
  - `"build:demo"`: `"vite build demo"`

---

## Testing Decisions

### 1. Definition of a Good Test

Tests must focus strictly on **external behavior and observable state contracts**, never internal private component state:

- Given an active variant, does the capability resolver emit the exact allowable position list?
- Given an invalid position transition, does the auto-sanitization hook output a valid safe configuration?
- Given a locale switch, does the direction attribute flip and translation strings update?
- Does the production build script exit with status code 0 and emit valid HTML and JS bundle artifacts?

### 2. Modules Under Test

- **Capability Matrix Seam**: Pure utility function mapping variants to valid positions and options (`demo/src/utils/matrix.test.ts`).
- **Locale & Direction Seam**: Language state and DOM synchronization tests (`demo/src/utils/locale.test.ts`).
- **Build Pipeline Seam**: End-to-end Vite build execution verifying asset generation.

### 3. Prior Art

- Existing test suites in `src/core/positioning.test.ts` (verifying allowed positions) and `src/core/injector.test.ts` (verifying configuration clamping and sanitization).

---

## Out of Scope

1. **Modifying Core Library Geometry**: Changes to SVG paths, mathematical Bézier curve formulations, or core injection logic in `src/core/`.
2. **Third Language Support**: Translating the demo into languages other than Arabic and English (e.g. Turkish, Urdu, French).
3. **Heavy External Component Frameworks**: Introducing UI suites like Material UI, Ant Design, or Tailwind CSS; the demo will use clean, zero-dependency token-based CSS.
4. **Altering Library Package Bundler**: The library core will remain bundled via `tsup`; Vite is used exclusively for the demo application.

---

## Further Notes

- **Domain Glossary Compliance**: All terminology strictly adheres to `CONTEXT.md` (**Overlay Variant**, **Visual Theme**, **Theme Preset**, **Countdown Host**, **Countdown Card**, **Docked Pill**, **Content Safe Zone**, **Elevation Shadow**, **Agent Prompt Seam**).
- **URL Compatibility**: Existing shared URLs with hashes generated by the legacy demo will remain fully parseable by the new React configurator.

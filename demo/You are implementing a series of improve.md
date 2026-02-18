## Implementation Plan

### Feature breakdown & file map

| #   | Feature                  | Files touched                                                         |
| --- | ------------------------ | --------------------------------------------------------------------- |
| 1   | GPU layer hints          | overlay.css + injected CSS string in injector.ts                      |
| 2   | Pause on tab-hidden      | injector.ts (shared `visibilitychange` listener)                      |
| 3   | Single shared RAF        | New `src/core/scheduler.ts` · sparkles.ts · lanterns.ts               |
| 4   | Responsive density       | types.ts (new option) · sparkles.ts · crescent-stars.ts · injector.ts |
| 5   | Lantern glow pulse       | lanterns.ts · injector.ts (CSS keyframe) · overlay.css                |
| 6   | Framework prop expansion | index.tsx · index.ts · index.ts                                       |
| 7   | CDN badge + unpkg        | `README.md`                                                           |

---

## Copilot Instructions

Copy and paste this to a new Copilot Chat session to start implementation:

---

````
You are implementing a series of improvements to the `ramadan-overlay` TypeScript library.
The workspace is at `d:\02-Projects\01-Development\02-Planning\ramadan-overlay`.

Project structure:
- src/types.ts               — all public types and ResolvedConfig
- src/core/injector.ts       — init(), injectStyles(), the STYLE_ID CSS string
- src/core/variants/sparkles.ts   — sparkles+crescent+star RAF loop
- src/core/variants/lanterns.ts   — lantern SVG + swing animation
- src/core/variants/crescent-stars.ts — static float variant
- src/styles/overlay.css     — source CSS (not used at runtime, injector.ts has the inlined copy)
- src/react/index.tsx        — useRamadanOverlay hook + RamadanOverlay component
- src/vue/index.ts           — useRamadanOverlay composable + RamadanOverlay component
- src/angular/index.ts       — RamadanOverlayDirective + RamadanOverlayModule
- demo/index.html            — standalone demo page, loads dist/ramadan-overlay.min.js
- package.json               — build: "tsup"

After ALL changes, run `npm run build` and confirm it succeeds.

---

## Task 1 — GPU layer hints on particles

In `injector.ts`, inside the inlined CSS string (the `css` template literal in `injectStyles()`):

Add `will-change:transform,opacity` to these existing rules:
- `#ramadan-overlay-root .ro-sparkle`
- `#ramadan-overlay-root .ro-crescent, #ramadan-overlay-root .ro-star`
- `#ramadan-overlay-root .ro-lantern`

Also apply the same to `src/styles/overlay.css` in the matching rule blocks.

---

## Task 2 — Pause on tab-hidden (visibilitychange)

In `src/core/injector.ts`, inside the `init()` function, after `const cleanupVariant = mountFn(root, config);`:

Add a `visibilitychange` listener on `document` that calls a `pause()` / `resume()` method.
The variant mount functions don't expose pause/resume yet, so instead use the simpler approach:
set `root.style.visibility = 'hidden'` when `document.hidden === true` and restore it when visible.
This stops the browser from painting the overlay while the tab is hidden (RAF loops still tick but produce no paint cost).

Make sure the listener is removed in the `destroy()` function.

---

## Task 3 — Single shared RAF scheduler

Create a new file `src/core/scheduler.ts`:

```ts
// Shared requestAnimationFrame scheduler.
// All variant tick functions register here instead of calling rAF directly.
// Benefits: single rAF loop, automatic pause when document is hidden.

type TickFn = (dt: number) => void;

const subscribers = new Set<TickFn>();
let rafId: number | null = null;
let lastTime = 0;

function loop(now: number) {
  if (document.hidden) {
    rafId = requestAnimationFrame(loop);
    return;
  }
  const dt = now - lastTime;
  lastTime = now;
  subscribers.forEach((fn) => fn(dt));
  rafId = subscribers.size > 0 ? requestAnimationFrame(loop) : null;
}

export function scheduleRender(fn: TickFn): () => void {
  subscribers.add(fn);
  if (rafId === null) {
    lastTime = performance.now();
    rafId = requestAnimationFrame(loop);
  }
  return () => {
    subscribers.delete(fn);
  };
}
````

Then refactor sparkles.ts:

- Remove the local `let rafId: number` and `let running = true` variables.
- Replace the `rafId = requestAnimationFrame(tick)` call at the bottom with `const cancelSchedule = scheduleRender(tick)`.
- Change the `tick` function signature to `function tick(_dt: number)` (accepts dt, ignores it for now).
- In the returned cleanup function, replace `cancelAnimationFrame(rafId)` with `cancelSchedule()`.

---

## Task 4 — Responsive density

In types.ts, add a new optional field to `RamadanOverlayConfig`:

```ts
/**
 * Override the particle/decoration count. When omitted the library picks
 * a count automatically based on screen area (mobile gets fewer particles).
 * @default undefined (auto)
 */
density?: 'low' | 'normal' | 'high';
```

Also add `density` to `ResolvedConfig` as `density: 'low' | 'normal' | 'high'`.

In injector.ts → `resolveConfig()`, add:

```ts
density: userConfig.density ?? (window.innerWidth < 640 ? 'low' : 'normal'),
```

In sparkles.ts, replace the hardcoded `MAX_PARTICLES = 40` with:

```ts
const DENSITY_MAP = { low: 18, normal: 40, high: 70 };
const MAX_PARTICLES = DENSITY_MAP[config.density] ?? 40;
```

In crescent-stars.ts, replace the `Math.round(window.innerWidth * window.innerHeight / 60000)` formula with:

```ts
const DENSITY_MAP = { low: 6, normal: 14, high: 24 };
const totalItems = DENSITY_MAP[config.density] ?? 14;
```

In index.html, add a `<select id="densitySelect">` control in the controls grid with options: `auto`, `low`, `normal`, `high`.
Wire it into `getConfig()` so it maps `auto` → omit the field (undefined), others pass through.

---

## Task 5 — Lantern glow pulse

In lanterns.ts, find where each lantern `<svg>` element is created and its `filter` style is set.
Add a CSS custom property `--ro-glow-pulse` that drives a `@keyframes` animation on the SVG's `filter`.

In injector.ts, add a new keyframe to the inlined CSS string:

```css
@keyframes ro-glow-pulse {
  0%,
  100% {
    filter: drop-shadow(0 2px 6px var(--ro-glow, rgba(201, 168, 76, 0.5)));
  }
  50% {
    filter: drop-shadow(0 2px 18px var(--ro-glow, rgba(201, 168, 76, 0.9)))
      drop-shadow(0 0 8px var(--ro-glow, rgba(201, 168, 76, 0.6)));
  }
}
```

Update the `.ro-lantern svg` rule in the inlined CSS to:

```css
#ramadan-overlay-root .ro-lantern svg {
  width: var(--ro-lantern-size, clamp(18px, 2.5vw, 38px));
  height: auto;
  animation: ro-glow-pulse 2.5s ease-in-out infinite;
}
```

Remove the `filter` property that was previously set inline — the keyframe now handles it.
Also apply the same keyframe rule in overlay.css.

---

## Task 6 — Vue/React/Angular flat component props

### React (index.tsx)

Expand `RamadanOverlayProps` to accept all config fields as top-level props in addition to the existing `config` prop (top-level props take precedence, merged over `config`):

```tsx
export interface RamadanOverlayProps extends Partial<RamadanOverlayConfig> {
  /** Alternatively pass all options as a single object */
  config?: RamadanOverlayConfig;
  children?: (state: RamadanState) => React.ReactNode;
}
```

In the component body, merge: `const mergedConfig = { ...config, ...rest }` where `rest` strips `config` and `children` from props, then pass `mergedConfig` to `useRamadanOverlay`.

### Vue (index.ts)

Expand the component `props` definition to list every `RamadanOverlayConfig` key individually as typed props (in addition to the existing `config` object prop).
In `setup()`, merge spread props over the `config` object: `const merged = { ...props.config, ...omit(props, ['config']) }`.

### Angular (index.ts)

Add individual `@Input()` decorators for: `variant`, `position`, `opacity`, `colors`, `previewMode`, `confetti`, `locale`, `glowColor`, `region`, `density`.
In `mount()`, merge them: `const cfg = { ...this.ramadanConfig, ...individualInputs }` (individual inputs override the config object when set).

---

## Task 7 — CDN badge + unpkg link in README

Open (or create) `README.md`. At the top, after the title, add these badge lines:

```md
[![npm](https://img.shields.io/npm/v/ramadan-overlay)](https://www.npmjs.com/package/ramadan-overlay)
[![unpkg](https://img.shields.io/badge/CDN-unpkg-orange)](https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js)
[![gzip size](https://img.badgesize.io/https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js?compression=gzip)](https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js)
```

Add a **CDN / Script tag** section to the README:

````md
## CDN / Script tag

No bundler required. Load directly from unpkg:

```html
<script src="https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js"></script>
<script>
  RamadanOverlay.init({ variant: "sparkles", previewMode: true });
</script>
```
````

```

---

## Final step

After completing all tasks:
1. Run `npm run build` and confirm all outputs succeed with no TypeScript errors.
2. Check `demo/index.html` — make sure the new `density` control is wired up in `getConfig()` and the `syncColorPanels()` function doesn't need changes.
3. Confirm there are no `const` redeclarations or missing imports.
```

# Implementation Specification: Vertical Viewport Positioning

**Feature Issue:** [#7 - Support for 'left', 'right', and 'sides' positioning](https://github.com/3mr-5aled/ramadan-overlay/issues/7)  
**Parent Wayfinder Map:** [#24 - Wayfinder Map: Vertical Viewport Positioning (left, right, sides)](https://github.com/3mr-5aled/ramadan-overlay/issues/24)  
**Status:** Ready for Implementation (`ready-for-agent` / `ready-for-human`)

---

## 1. Executive Summary

This specification defines the architecture, DOM structure, CSS layout, and animation kinematics for supporting vertical viewport positioning in `ramadan-overlay`.

Beyond standard top and bottom banners, web applications frequently require festive decorations along vertical page margins—leaving the primary content column completely clear. This feature introduces vertical viewport anchoring (`left`, `right`, `sides`, and bidirectional logical `start`, `end`), vertical lantern hanging spines with non-colliding swing physics, continuous SVG pattern bands for geometric ornaments, side gutter clamping for ambient particles, and responsive mobile adaptation (`mobileSideBehavior`) to prevent content obstruction on smaller displays.

---

## 2. Settled Decisions Index

| Decision Ticket                                               | Title                                                              | Core Resolution                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [#25](https://github.com/3mr-5aled/ramadan-overlay/issues/25) | Research: Vertical hanging string geometry & animation physics     | Adopted continuous vertical spine rope (`ro-lantern-spine`) with localized lateral/angled tethers ($L \approx 28\text{px}$), tamed oscillation angle ($\pm 3.5^\circ$), responsive gutter clamp (`clamp(28px, 4vw, 64px)`), and mobile hiding below $768\text{px}$.                                          |
| [#26](https://github.com/3mr-5aled/ramadan-overlay/issues/26) | Prototype: CSS and SVG structure for vertical geometric bands      | Adopted single-node inline SVG with `<defs><pattern>` (Approach D) for single-node DOM efficiency, 100% CSS variable theme reactivity (`var(--ro-color-*)`), zero subpixel hairline seams, logical alignment classes (`.ro-side-band--start`, `.ro-side-band--end`), and mobile hiding below $768\text{px}$. |
| [#27](https://github.com/3mr-5aled/ramadan-overlay/issues/27) | Grilling: Finalize API surface and responsive mobile side behavior | Finalized `OverlayPosition` union with physical (`left`, `right`, `sides`) and logical (`start`, `end`) coordinates, added `mobileSideBehavior` (`hide` \| `top` \| `show`, default `hide`) at `768px` threshold, banner fallback to `top`, and gutter coordinate clamping for particle variants.            |

---

## 3. Public API Contracts (`src/types.ts`)

### 3.1. `OverlayPosition` Union

```typescript
/**
 * Viewport anchoring for decorative overlays:
 * - 'top': Anchored to the top ceiling bar.
 * - 'bottom': Anchored to the viewport bottom floor.
 * - 'both': Anchored to both top and bottom edges.
 * - 'full': Spans the entire viewport area.
 * - 'left': Anchored to the physical left margin gutter.
 * - 'right': Anchored to the physical right margin gutter.
 * - 'sides': Anchored to both physical left and right margins.
 * - 'start': Anchored to the logical inline-start margin (left in LTR, right in RTL).
 * - 'end': Anchored to the logical inline-end margin (right in LTR, left in RTL).
 */
export type OverlayPosition =
  | "top"
  | "bottom"
  | "both"
  | "full"
  | "left"
  | "right"
  | "sides"
  | "start"
  | "end";
```

### 3.2. `MobileSideBehavior` Type

```typescript
/**
 * Viewport adaptation strategy for side-mounted overlays on mobile screens (< 768px):
 * - 'hide' (default): Hides side decorations completely to preserve content readability.
 * - 'top': Automatically falls back to top-mounted horizontal decoration on mobile.
 * - 'show': Retains side decorations across all screen sizes.
 */
export type MobileSideBehavior = "hide" | "top" | "show";
```

### 3.3. Config Extensions (`RamadanOverlayConfig`)

```typescript
export interface RamadanOverlayConfig {
  // ... existing fields ...

  /**
   * Where the overlay is positioned relative to the viewport.
   * @default 'both'
   */
  position?: OverlayPosition;

  /**
   * Behavior of side decorations on viewports below 768px.
   * @default 'hide'
   */
  mobileSideBehavior?: MobileSideBehavior;
}
```

### 3.4. Resolved Configuration (`ResolvedConfig`)

```typescript
export interface ResolvedConfig {
  // ... existing resolved fields ...
  position: OverlayPosition;
  mobileSideBehavior: MobileSideBehavior;
}
```

---

## 4. Variant Support Matrix & Fallback Rules

| Variant                         | Side Positioning Support | Behavior / Implementation                                                                                                                                                   |
| ------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lanterns`                      | Full Support             | Renders vertical spine rail (`.ro-lantern-spine`) in active gutter(s) with localized dangling lanterns.                                                                     |
| `geometric`                     | Full Support             | Renders vertical SVG band (`.ro-side-band`) using `<pattern id="...">` girih star tiles.                                                                                    |
| `crescent-stars`                | Full Support             | Clamps particle generation X-coordinates to the active gutter width `[0, W_gutter]` or `[W_screen - W_gutter, W_screen]`.                                                   |
| `sparkles`                      | Full Support             | Clamps particle generation X-coordinates to active gutter boundaries.                                                                                                       |
| `eid` / `eid-fitr` / `eid-adha` | Full Support             | Particle-based balloons/gifts and sheep/stars are clamped to side gutters when side position is selected.                                                                   |
| `banner`                        | Graceful Fallback        | Falls back to `position: "top"` and logs a dev-only console warning (`[ramadan-overlay] Banner variant does not support vertical side positioning; falling back to "top"`). |

---

## 5. Architectural Design & DOM Layout

### 5.1. Common Side Gutter Metrics

All side variants operate within unified responsive CSS tokens:

```css
#ramadan-overlay-root {
  --ro-gutter-width: clamp(28px, 4vw, 64px);
  --ro-lantern-side-size: clamp(20px, 2.8vw, 36px);
}
```

### 5.2. Logical & Physical Edge Resolution

A helper function `resolveSidePositions(position: OverlayPosition): Array<'left' | 'right'>` resolves physical vs logical orientations:

```typescript
export function resolveSidePositions(
  pos: OverlayPosition,
  isRtl = typeof document !== "undefined" &&
    (document.documentElement.dir === "rtl" || document.body?.dir === "rtl")
): Array<"left" | "right"> {
  switch (pos) {
    case "left":
      return ["left"];
    case "right":
      return ["right"];
    case "sides":
      return ["left", "right"];
    case "start":
      return [isRtl ? "right" : "left"];
    case "end":
      return [isRtl ? "left" : "right"];
    default:
      return [];
  }
}
```

### 5.3. Vertical Lanterns DOM Architecture

```html
<div class="ro-lantern-side ro-lantern-side--left" aria-hidden="true">
  <!-- Continuous vertical spine rope -->
  <div class="ro-lantern-spine"></div>

  <!-- Vertically distributed lantern units -->
  <div
    class="ro-lantern-unit"
    style="top: 15%; --ro-swing-duration: 3.6s; animation-delay: -1.2s;"
  >
    <div class="ro-lantern-dropline"></div>
    <div class="ro-lantern-svg-wrap">
      <svg ...>...</svg>
    </div>
  </div>
  ...
</div>
```

#### Swing Kinematics & Physics

- **Transform Origin:** `top center` of `.ro-lantern-unit`.
- **Oscillation Amplitude:** Constrained to $\pm 3.5^\circ$ (`@keyframes ro-swing-side`) to prevent margin edge or viewport boundary clipping.
- **Responsive Count:** Calculated as `Math.max(2, Math.min(6, Math.round(window.innerHeight / 220)))` per active side.

### 5.4. Vertical Geometric DOM Architecture

```html
<div class="ro-side-band ro-side-band--left" aria-hidden="true">
  <svg width="100%" height="100%" preserveAspectRatio="none">
    <defs>
      <pattern
        id="ro-geo-tile-left"
        x="0"
        y="0"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <!-- Girih pattern with var(--ro-color-1) and var(--ro-color-2) -->
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#ro-geo-tile-left)" />
  </svg>
</div>
```

---

## 6. CSS Injection & Responsive Rules (`src/core/host.ts`)

```css
/* Base side container */
#ramadan-overlay-root .ro-lantern-side,
#ramadan-overlay-root .ro-side-band {
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100vh;
  height: 100dvh;
  width: var(--ro-gutter-width, clamp(28px, 4vw, 64px));
  pointer-events: none;
  overflow: hidden;
  contain: strict;
  z-index: var(--ro-z, 9999);
}

#ramadan-overlay-root .ro-lantern-side--left,
#ramadan-overlay-root .ro-side-band--left {
  left: 0;
}

#ramadan-overlay-root .ro-lantern-side--right,
#ramadan-overlay-root .ro-side-band--right {
  right: 0;
}

/* Vertical lantern spine */
#ramadan-overlay-root .ro-lantern-spine {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--ro-ceiling, #8b4513) 5%,
    var(--ro-ceiling, #8b4513) 95%,
    transparent 100%
  );
  opacity: 0.5;
}

/* Individual side lantern unit */
#ramadan-overlay-root .ro-lantern-unit {
  position: absolute;
  left: 50%;
  transform-origin: top center;
  animation: ro-swing-side var(--ro-swing-duration, 3.5s) ease-in-out infinite
    alternate;
  will-change: transform;
}

#ramadan-overlay-root .ro-lantern-dropline {
  width: 1.5px;
  height: 24px;
  margin: 0 auto;
  background: var(--ro-rope, #8b4513);
}

#ramadan-overlay-root .ro-lantern-svg-wrap svg {
  display: block;
  width: var(--ro-lantern-side-size, clamp(20px, 2.8vw, 36px));
  height: auto;
  filter: drop-shadow(0 2px 8px rgba(232, 201, 107, 0.4));
}

@keyframes ro-swing-side {
  0% {
    transform: translateX(-50%) rotate(-3.5deg);
  }
  100% {
    transform: translateX(-50%) rotate(3.5deg);
  }
}

/* Mobile Side Behavior: Hide (Default) */
@media (max-width: 767px) {
  #ramadan-overlay-root[data-mobile-side="hide"] .ro-lantern-side,
  #ramadan-overlay-root[data-mobile-side="hide"] .ro-side-band {
    display: none !important;
  }
}
```

---

## 7. Framework Adapters Parity

All framework packages export the updated types and forward the `position` and `mobileSideBehavior` props:

- **React:** `<RamadanOverlay position="sides" mobileSideBehavior="hide" />` and `useRamadanOverlay(...)`
- **Vue 3:** `<RamadanOverlay position="start" mobileSideBehavior="top" />`
- **Angular:** `<ramadan-overlay [position]="'sides'" [mobileSideBehavior]="'hide'"></ramadan-overlay>`
- **Svelte:** `<RamadanOverlay position="right" mobileSideBehavior="hide" />`

---

## 8. Test Matrix & Verification Plan

### 8.1. Unit & Integration Tests (`vitest`)

1. **Config Resolution (`test/config.test.ts` or `test/injector.test.ts`):**
   - Resolves all 9 `OverlayPosition` values (`top`, `bottom`, `both`, `full`, `left`, `right`, `sides`, `start`, `end`).
   - Default `position` remains `'both'`.
   - Default `mobileSideBehavior` resolves to `'hide'`.
   - `banner` variant with side position gracefully falls back to `'top'` with console warning.
2. **Side Positioning & RTL Alignment (`test/positioning.test.ts`):**
   - `position: 'left'` mounts only left gutter.
   - `position: 'right'` mounts only right gutter.
   - `position: 'sides'` mounts both left and right gutters.
   - `position: 'start'` mounts left gutter in LTR, right gutter when `document.documentElement.dir = 'rtl'`.
   - `position: 'end'` mounts right gutter in LTR, left gutter in RTL.
3. **Lanterns Variant (`test/variants/lanterns.test.ts`):**
   - Renders `.ro-lantern-spine` and `.ro-lantern-unit` elements when side positioning is selected.
   - Applies swing animation with negative delay and proper duration.
   - Responds to window resize event by re-adjusting lantern counts.
4. **Geometric Variant (`test/variants/geometric.test.ts`):**
   - Renders `.ro-side-band` with inline SVG `<pattern>` tiles.
   - Applies CSS custom properties for theme colors.
5. **Mobile Side Adaptation (`test/host.test.ts`):**
   - Sets `data-mobile-side` attribute on container root matching `mobileSideBehavior`.
   - Handles `mobileSideBehavior: 'top'` fallback mode on narrow screens.

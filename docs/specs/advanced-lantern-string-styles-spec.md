# Implementation Specification: Advanced Lantern String Styles

**Feature Issue:** [#5 - [Feature] Advanced Lantern String Styles: U-Shaped and Dual Ropes](https://github.com/3mr-5aled/ramadan-overlay/issues/5)  
**Parent Wayfinder Map:** [#34 - Wayfinder Map: Advanced Lantern String Styles (U-Shaped and Dual Ropes)](https://github.com/3mr-5aled/ramadan-overlay/issues/34)  
**Status:** Ready for Implementation (`ready-for-agent` / `ready-for-human`)

---

## 1. Executive Summary

This specification defines the architectural model, mathematical geometry, SVG overlay rendering, and configuration API for **Advanced Lantern String Styles** in `ramadan-overlay`.

In earlier versions, the `'lanterns'` variant suspended lanterns from a rigid horizontal ceiling line (`ceilingColor` CSS bar) via fixed vertical cords (`.ro-lantern-string`). This feature upgrades the suspension infrastructure to support organic, festive hanging rope styles inspired by traditional Ramadan street festoons and Middle Eastern night markets:

1. **`straight` (default):** Traditional linear ceiling rail with vertical droplines (100% backward compatible).
2. **`u-shaped`:** Festive multi-scallop swag dipping between each adjacent lantern via Quadratic Bézier curves (`Q cx cy, x y`).
3. **`dual`:** Suspended dual parallel catenary cables replicating authentic layered festival canopy stringing.

The feature introduces a decoupled DOM/SVG hybrid architecture where an absolute vector `<svg class="ro-lantern-ropes" aria-hidden="true">` overlay renders the curved cables behind the HTML `.ro-lantern` row. This completely eliminates DOM layout thrashing (`getBoundingClientRect()` calls = 0), preserves all GPU-accelerated CSS swing keyframe physics and drop-shadow glow filters, synchronizes flawlessly with predefined visual themes (`--ro-ceiling`, `--ro-rope`), and falls back gracefully to a vertical spine line on side viewport margins (`left`, `right`, `sides`).

---

## 2. Settled Decisions Index

| Decision Ticket                                               | Title                                                            | Core Resolution                                                                                                                                                                                                                                                                                                                           |
| :------------------------------------------------------------ | :--------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [#35](https://github.com/3mr-5aled/ramadan-overlay/issues/35) | Research: Mathematical curve modeling & SVG overlay architecture | Proved parabolic approximation of physical catenary ($y = a \cosh(x/a)$) differs by $<0.5\text{px}$ for festive swag depths ($S/L \le 0.20$). Ratified $\mathcal{O}(1)$ closed-form Quadratic Bézier formula ($x_c = \frac{x_0+x_1}{2}, y_c = y_0 + 2S$). Ratified decoupled SVG overlay behind HTML lanterns.                            |
| [#36](https://github.com/3mr-5aled/ramadan-overlay/issues/36) | Prototype: SVG curve generator & dual rope topology              | Validated interactive prototype (`docs/prototypes/prototype-lantern-strings.html`). Ratified multi-scallop festoon geometry with droplines hanging from scallop anchor nodes; verified dual parallel catenaries ($\Delta y = 14\text{px}$) with secondary cable at $0.65$ opacity; verified smooth 60fps resize without layout thrashing. |
| [#37](https://github.com/3mr-5aled/ramadan-overlay/issues/37) | Grilling: Configuration API, sag depth & side positioning        | Ratified `ropeStyle?: 'straight'                                                                                                                                                                                                                                                                                                          | 'u-shaped' | 'dual'`and`ropeSag?: number`(default`20`). Settled graceful fallback to straight vertical spine on side positions (`left`, `right`, `sides`). Mapped `--ro-ceiling`to cables and`--ro-rope` to droplines. Defined framework wrapper prop forwarding. |

---

## 3. Mathematical Formulations & Geometry

### 3.1. Quadratic Bézier Curve Parabolic Equivalence

A uniform cable suspended under gravity sags in a catenary curve $y(x) = a \cosh(x/a)$. Via Taylor expansion:
$$\cosh(u) = 1 + \frac{u^2}{2!} + \mathcal{O}(u^4) \implies y(x) \approx y_0 + \frac{4S}{L^2} x (L - x)$$

In an SVG `<path>`, a Quadratic Bézier curve is parameterized by start point $P_0 = (x_0, y_0)$, control point $P_c = (x_c, y_c)$, and end point $P_1 = (x_1, y_1)$:
$$B(t) = (1 - t)^2 P_0 + 2(1 - t)t P_c + t^2 P_1, \quad t \in [0, 1]$$

At the midpoint $t = 0.5$, the curve sag $S$ below the chord midpoint $\frac{y_0 + y_1}{2}$ is:
$$B(0.5) = \frac{P_0 + 2P_c + P_1}{4} \implies y(0.5) - \frac{y_0 + y_1}{2} = \frac{y_c - \frac{y_0 + y_1}{2}}{2} = S$$

Solving for the vertical control point offset:
$$y_c = \frac{y_0 + y_1}{2} + 2S$$
$$x_c = \frac{x_0 + x_1}{2}$$

This yields the exact parabolic swag dip in closed elementary form with **zero transcendental calls and zero iteration**.

### 3.2. Multi-Span Scallop Topology (`u-shaped`)

For $N$ lanterns distributed horizontally across container width $W$:

1. Lantern horizontal centers:
   $$x_i = \left(i + \frac{1}{2}\right) \frac{W}{N}, \quad i \in \{0, 1, \dots, N-1\}$$
2. Cable anchor elevation: $y_{top} = 4\text{px}$.
3. Lead-in span: From left wall $(0, y_{top})$ to first lantern $(x_0, y_{top})$ with control point $\left(\frac{x_0}{2}, y_{top} + 1.5S\right)$.
4. Internal spans ($N - 1$ spans): Between adjacent lanterns $(x_i, y_{top})$ and $(x_{i+1}, y_{top})$ with control point:
   $$x_c = \frac{x_i + x_{i+1}}{2}, \quad y_c = y_{top} + 2S$$
5. Lead-out span: From last lantern $(x_{N-1}, y_{top})$ to right wall $(W, y_{top})$ with control point $\left(\frac{x_{N-1} + W}{2}, y_{top} + 1.5S\right)$.
6. Vertical dropline cords: Straight vertical segments connecting from $(x_i, y_{top})$ down to $(x_i, y_{top} + D)$ where $D$ is the dropline length.

### 3.3. Dual Parallel Catenaries (`dual`)

For the `dual` rope style:

1. **Primary Suspension Cable:** Rendered at $y_1 = 2\text{px}$ using the multi-scallop swag curve with stroke width `2.0px` and stroke opacity `0.85`.
2. **Secondary Canopy Cable:** Rendered parallel to the primary cable at $y_2 = y_1 + 14\text{px}$ with stroke width `1.6px` and stroke opacity `0.65`.
3. **Droplines:** Vertical cords extending from the primary cable ($y_1$) down through the secondary cable ($y_2$) to the lantern fixture ($y_2 + D$).

### 3.4. Vertical Viewport Fallback (`left`, `right`, `sides`)

When `position` is `'left'`, `'right'`, or `'sides'`:

- Horizontal festoon swag is physically inapplicable along vertical edges and would collide with viewport gutters.
- The overlay **gracefully falls back to the straight vertical spine** (`.ro-lantern-spine` and `.ro-lantern-dropline`), ignoring `ropeStyle` without throwing or emitting warnings.

---

## 4. Public API Contracts (`src/types.ts`)

### 4.1. Rope Style Types

```typescript
/**
 * Advanced lantern suspension rope styles.
 * - 'straight': Linear horizontal ceiling rail with vertical cords (default).
 * - 'u-shaped': Multi-scallop festoon swag dipping between adjacent lanterns.
 * - 'dual': Dual parallel catenary cables mimicking night-market festival stringing.
 */
export type RopeStyle = "straight" | "u-shaped" | "dual";
```

### 4.2. Configuration Interface Additions

Extend `RamadanOverlayConfig` and `OverlayConfig`:

```typescript
export interface RamadanOverlayConfig {
  // ... existing fields ...

  /**
   * Visual style for lantern suspension strings/ropes.
   * Only applies when variant is 'lanterns' and position is 'top' or 'bottom'.
   * On vertical side positions ('left', 'right', 'sides'), gracefully falls back to 'straight'.
   * @default 'straight'
   */
  ropeStyle?: RopeStyle;

  /**
   * Sag depth in pixels for curved rope styles ('u-shaped' and 'dual').
   * Clamped between 6 and 60. Automatically scaled down on compact screens (<600px).
   * @default 20
   */
  ropeSag?: number;
}
```

### 4.3. Framework Adapter Props

All framework components expose:

- React: `<RamadanOverlay ropeStyle="u-shaped" :ropeSag="24" />`
- Vue: `<RamadanOverlay rope-style="dual" :rope-sag="20" />`
- Svelte: `<RamadanOverlay ropeStyle="u-shaped" ropeSag={20} />`
- Angular: `<ramadan-overlay [ropeStyle]="'dual'" [ropeSag]="20"></ramadan-overlay>`

---

## 5. Implementation Details

### 5.1. File Modifications

1. [`src/types.ts`](file:///D:/02-Projects/02-Deployed/01-Production/ramadan-overlay/src/types.ts):
   - Export type `RopeStyle = "straight" | "u-shaped" | "dual"`.
   - Add `ropeStyle?: RopeStyle` and `ropeSag?: number` to `RamadanOverlayConfig` and `OverlayConfig`.
2. [`src/core/variants/lanterns.ts`](file:///D:/02-Projects/02-Deployed/01-Production/ramadan-overlay/src/core/variants/lanterns.ts):
   - Refactor top-mounted lantern rendering to use the decoupled SVG overlay layer `<svg class="ro-lantern-ropes" aria-hidden="true">`.
   - Implement curve generators:
     - `renderStraightStrings(svg, W, lanternX, ceilingColor, ropeColor, dropline)`
     - `renderScallopStrings(svg, W, lanternX, sag, ceilingColor, ropeColor, dropline)`
     - `renderDualStrings(svg, W, lanternX, sag, ceilingColor, ropeColor, dropline)`
   - Position HTML `.ro-lantern` elements using mathematical coordinates:
     $$x_i = \left(i + \frac{1}{2}\right) \frac{W}{N}$$
   - On window resize, dynamically update SVG `<path>` and lantern `left` coordinates.
3. [`src/core/host.ts`](file:///D:/02-Projects/02-Deployed/01-Production/ramadan-overlay/src/core/host.ts):
   - Add CSS classes:
     ```css
     #ramadan-overlay-root .ro-lantern-ropes {
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       pointer-events: none;
       z-index: 1;
       shape-rendering: geometricPrecision;
     }
     #ramadan-overlay-root .ro-rope-path {
       fill: none;
       stroke-linecap: round;
       stroke-linejoin: round;
       vector-effect: non-scaling-stroke;
     }
     #ramadan-overlay-root .ro-dropline-path {
       fill: none;
       stroke-linecap: round;
       vector-effect: non-scaling-stroke;
     }
     ```
   - Update config resolution in `resolveConfig()` to supply defaults: `ropeStyle: "straight"`, `ropeSag: 20`.
4. Framework Wrappers:
   - Forward `ropeStyle` and `ropeSag` in `src/react/RamadanOverlay.tsx`, `src/vue/RamadanOverlay.vue`, `src/svelte/RamadanOverlay.svelte`, `src/angular/ramadan-overlay.component.ts`.

---

## 6. Verification Plan & Test Matrix

### 6.1. Test Suites

Create comprehensive unit tests in `src/core/variants/lanterns.test.ts` (or add to `injector.test.ts` / `positioning.test.ts`):

1. **Default Baseline (`ropeStyle: 'straight'`):**
   - Verify SVG overlay renders horizontal ceiling line with stroke `var(--ro-ceiling)` and vertical droplines with stroke `var(--ro-rope)`.
2. **`ropeStyle: 'u-shaped'`:**
   - Verify SVG contains a `<path class="ro-rope-path">` with Quadratic Bézier commands (`Q ...`).
   - Verify number of scallop spans equals $N - 1$ internal spans + 2 lead-in/lead-out spans.
   - Verify droplines anchor to scallop node elevations.
3. **`ropeStyle: 'dual'`:**
   - Verify SVG contains two `<path class="ro-rope-path">` elements offset vertically by $14\text{px}$.
   - Verify secondary cable has reduced opacity (`0.65`).
4. **`ropeSag` Customization & Clamping:**
   - Verify custom `ropeSag: 35` reflects in Bézier control point coordinates.
   - Verify out-of-bounds `ropeSag` is clamped between `6` and `60`.
5. **Vertical Margin Fallback:**
   - When `position: 'left' | 'right' | 'sides'`, verify that `.ro-lantern-spine` is rendered and no curved horizontal SVG paths are created.
6. **Theme Token Integration:**
   - Verify stroke attributes inherit `--ro-ceiling` and `--ro-rope` values across all 5 preset themes.
7. **Resize Recalculation:**
   - Trigger window resize; verify SVG path definitions update to match new width without console errors.

### 6.2. Command Verification

- `npm run test` (all 14 test files pass)
- `npm run typecheck` (zero TypeScript errors)
- `npm run lint` (zero ESLint/Prettier warnings)
- `npm run build` (clean ESM, CJS, and IIFE builds)

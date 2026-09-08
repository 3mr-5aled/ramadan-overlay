# Implementation Specification: Content Safe Zone and Layer Stacking for Floating Motifs

**Feature Issue:** [#44 - [Feature] Content Safe Zone and Layer Stacking for Floating Motifs](https://github.com/3mr-5aled/ramadan-overlay/issues/44)  
**Status:** Ready for Implementation (`ready-for-agent` / `ready-for-human`)

---

## Problem Statement

When web applications integrate celebratory Islamic holiday overlays—specifically variants featuring floating motifs such as `crescent-stars`, `eid` (festive mix), `eid-fitr`, and `eid-adha`—the animated motifs currently scatter randomly across the entire viewport dimensions (0% to 95% horizontally and 0% to 90% vertically).

On reading-heavy web applications, content dashboards, ecommerce stores, news portals, and mobile devices, these motifs drift directly through the center of the page. Although `pointer-events: none` prevents click interception, having crescents, stars, sheep, Kaaba icons, gift boxes, and balloons drifting directly over headlines, primary text paragraphs, checkout forms, and action buttons causes visual distraction and partially obscures critical content.

Additionally, the overlay container is hardcoded to render on top of the host application in the foreground with `z-index: 9999`. While this works well for celebratory splashes, developers wanting a subtle, ambient decorative background behind their content cards, hero typography, or page layout have no supported way to place the overlay in the background (`z-index: -1`) or mount it inside a specific scoped hero container element without breaking library encapsulation.

---

## Solution

Introduce two complementary configuration features with sensible, zero-friction defaults:

1. **Content Safe Zone (`clearance: 'edges' | 'full'`)**:
   - Defaults to `'edges'` for floating motif variants (`crescent-stars`, `eid`, `eid-fitr`, `eid-adha`).
   - In `'edges'` mode, floating motifs are constrained to **Peripheral Gutters** along the lateral margins of the viewport (Left Gutter: `x: 2%–18%`, Right Gutter: `x: 82%–98%`), leaving the central 64% corridor (18% to 82%) completely sterile of floating motifs.
   - On mobile viewports (<640px), where horizontal gutters are narrow, the algorithm automatically adapts by splitting vertical placement into upper (`y: 2%–22%`) and lower (`y: 78%–96%`) margins and scaling motif sizes down by ~30% (e.g. 22px crescent instead of 32px), preserving central readability.
   - When configured with `'full'`, floating motifs drift freely across the full viewport (`x: 0%–95%`, `y: 0%–90%`), ideal for landing pages or minimal splash screens.
   - Ambient micro-particles (`sparkles`) remain exempt by default to preserve delicate full-screen ambient drift.

2. **Layer Stacking (`layer: 'foreground' | 'background'`) & Scoped Container Mounting (`mountTarget?: string | HTMLElement`)**:
   - Defaults to `'foreground'` (`position: fixed; z-index: 9999; pointer-events: none`).
   - When set to `'background'`, the container mounts with `z-index: -1; pointer-events: none;`, styling as an ambient animated wallpaper behind host application content.
   - Supports `mountTarget` option allowing consumers to target either a CSS selector string (e.g., `"#hero-section"`) or a direct `HTMLElement` reference, seamlessly adapting container styling (`position: absolute; inset: 0; overflow: hidden;`) to stay constrained within the target element bounds.

3. **Interactive Configurator Support**:
   - Expose both `Clearance` (`Edges (Safe Zone)` vs `Full Screen`) and `Layer` (`Foreground` vs `Background`) controls in the interactive demo page (`index.html`), reactive to active variant selection and synchronized with copyable code snippets across vanilla TS, React, Vue, Angular, and Svelte tabs.

---

## User Stories

1. As a content site developer, I want floating holiday motifs to automatically stay along the edges of the page, so that article text, blog posts, and documentation remain unobstructed and easy to read.
2. As an ecommerce site developer, I want floating motifs to avoid the center of the screen, so that product titles, pricing, add-to-cart buttons, and checkout forms are never visually covered.
3. As a landing page developer, I want to optionally configure `clearance: 'full'`, so that festive floating motifs drift across the entire screen for a joyful, immersive hero splash experience.
4. As a mobile website visitor, I want floating motifs on small screens to cluster in top and bottom peripheral margins and scale down in size, so that my narrow vertical reading column is not cluttered by large floating graphics.
5. As a website designer, I want the option to set `layer: 'background'`, so that Ramadan and Eid decorations appear gracefully behind my application's content cards and hero typography rather than floating on top.
6. As an application developer, I want to specify a `mountTarget` element (such as `#hero-banner`), so that decorations are scoped strictly to a specific visual container rather than taking over the entire document body.
7. As a developer using the `crescent-stars` variant, I want the central 64% corridor of the viewport to remain sterile by default, so that I get content-safe behavior out of the box without manual configuration.
8. As a developer using the `eid`, `eid-fitr`, or `eid-adha` variants, I want festive sheep, Kaaba, balloon, and gift motifs to distribute evenly between the left and right peripheral gutters, so that both sides of my layout receive balanced festive flair.
9. As a developer using the `sparkles` variant, I want ambient micro-sparkles to continue drifting across the entire viewport by default, so that delicate ambient star dust continues to shimmer naturally across the background without harsh artificial boundaries.
10. As a developer modifying configuration at runtime via `overlay.update()`, I want changes between `clearance: 'edges'` and `clearance: 'full'` or between `layer: 'foreground'` and `layer: 'background'` to seamlessly transition without layout thrashing or orphan DOM nodes.
11. As a React developer using `@ramadan-overlay/react`, I want `clearance`, `layer`, and `mountTarget` props exposed on `<RamadanOverlay />`, so that I can configure edge clearance and background layering declaratively in JSX.
12. As a Vue, Angular, or Svelte developer, I want `clearance`, `layer`, and `mountTarget` typed inputs/props on their respective wrappers, so that I have first-class ergonomic configuration in my framework of choice.
13. As an interactive demo user, I want to toggle between "Edges (Safe Zone)" and "Full Screen" clearance and between "Foreground" and "Background" layer in the live configurator, so that I can visually verify how my web application will look before copying the generated snippet.
14. As an accessibility-focused developer, I want all peripheral floating motifs and background layers to retain `pointer-events: none` and `aria-hidden="true"`, so that keyboard navigation, screen reader accessibility, and user click targets are never impacted regardless of clearance or layer setting.

---

## Implementation Decisions

- **Modules Built / Modified**:
  - The configuration and types contract module will be expanded to include the new clearance and layer stacking types and optional properties on user configuration and resolved configuration models.
  - The DOM host mounting module will be updated to handle background layer styling (`z-index: -1`), scoped `mountTarget` resolution, and corresponding styling classes.
  - The particle and motif coordinate generation module will introduce a mathematical distribution algorithm partitioning coordinates into left and right peripheral gutters, with mobile vertical splitting and size scaling.
  - The floating motif variant rendering modules (`crescent-stars` and `eid`) will consume the clearance configuration and gutter coordinate calculation.
  - The core orchestrator module will establish default values per variant, forward resolved settings to host mounting and variant rendering, and handle dynamic updates.
  - Framework wrapper components (React, Vue, Angular, Svelte) will expose the new properties as typed component inputs and pass them to the core initialization.
  - The interactive demonstration application will add UI controls for clearance and layer stacking in the overlay configuration panel, linked reactively to active variant selection and code export tabs.

- **Interface & Type Shapes**:

```typescript
export type ClearanceMode = "edges" | "full";
export type LayerStacking = "foreground" | "background";

export interface OverlayConfig {
  // ... existing options
  clearance?: ClearanceMode;
  layer?: LayerStacking;
  mountTarget?: string | HTMLElement;
}
```

- **Peripheral Gutter Coordinate Calculation**:
  - Left Gutter horizontal range: 2% to 18% viewport width.
  - Right Gutter horizontal range: 82% to 98% viewport width.
  - Motifs are assigned alternately or balanced between left and right gutters to guarantee symmetrical visual weight.
  - Mobile breakpoint adaptation (<640px width or mobile viewport): vertical coordinates split into upper quadrant (2% to 22%) and lower quadrant (78% to 96%), and motif SVG dimensions scale down by ~30% (e.g. 22px crescent, 14px star, 18px Eid motifs).

- **Layer Stacking & Scoped Container Styling**:
  - `layer: 'foreground'` applies `position: fixed; inset: 0; z-index: <zIndex || 9999>; pointer-events: none;`.
  - `layer: 'background'` applies `position: fixed; inset: 0; z-index: -1; pointer-events: none;`.
  - When `mountTarget` is specified and resolves to a valid element: the container applies `position: absolute; inset: 0; overflow: hidden;`, and the target element is styled with `position: relative` if its computed position is static. If target resolution fails, fallback to `document.body` and emit a diagnostic warning when debug mode is enabled.

- **Variant Default Clearance Matrix**:
  - `crescent-stars`, `eid`, `eid-fitr`, `eid-adha`: default `clearance = 'edges'`.
  - `sparkles`: default `clearance = 'full'`.
  - `lanterns`, `geometric`, `banner`: unaffected by particle clearance (they occupy fixed ceiling/margin anchors), but fully respect `layer` and `mountTarget`.

---

## Testing Decisions

- **What Makes a Good Test**:
  Tests must verify externally observable DOM contracts and visual behavior rather than private implementation details. Specifically, tests should verify that the overlay container mounts into the expected parent element with the expected styles (`z-index: -1`, `position: absolute` vs `fixed`), and that floating motif DOM children have coordinate positioning (`style.left`, `style.top`) that strictly fall within peripheral gutters and never inside the sterile central corridor when `clearance: 'edges'` is active.

- **Modules Tested**:
  - Core initialization and host mounting integration (`init()`) verifying container z-index, position, and mount target hierarchy.
  - Floating motif variant rendering (`crescent-stars` and `eid`) verifying particle count, gutter distribution, and style properties.
  - Coordinate calculation logic verifying gutter boundary adherence and mobile adaptation.
  - Framework wrapper component mounting with new props.

- **Prior Art in Codebase**:
  - `tests/positioning.test.ts` (validates side and margin positioning coordinates and CSS classes).
  - `tests/host.test.ts` (validates DOM host creation, container classes, and cleanup).
  - `tests/variants/eid.test.ts` and `tests/variants/crescent-stars.test.ts` (validate motif generation and styling).

---

## Out of Scope

- Automatic dynamic DOM text collision detection via `getBoundingClientRect()` or IntersectionObserver on arbitrary host application DOM nodes (computationally expensive and fragile across scrolls/resizes; peripheral gutter geometry provides 100% predictable zero-overhead clearance).
- Custom user-defined coordinate polygon exclusion zones or canvas masks.
- Physics-based collision avoidance simulation between floating particles themselves.
- Drag-and-drop interactive repositioning of floating motifs.

---

## Further Notes

- **Backwards Compatibility**: All new options are purely additive with defensive defaults. Existing applications that do not pass `clearance` or `layer` will automatically benefit from edge-safe floating motifs while maintaining foreground stacking and body mounting.
- **Performance**: The peripheral gutter distribution uses simple arithmetic during particle generation, adding zero runtime overhead or layout recalculations.
- **Reduced Motion**: Floating motifs continue to respect `prefers-reduced-motion: reduce` by remaining statically anchored in their initial peripheral positions without floating animations.

# Implementation Specification: Eid Al-Fitr & Eid Al-Adha Support

**Feature Issue:** [#8 - Support for Eid Al-Fitr and Eid Al-Adha with dedicated variants](https://github.com/3mr-5aled/ramadan-overlay/issues/8)  
**Parent Wayfinder Map:** [#10 - [Wayfinder Map] Eid Al-Fitr & Eid Al-Adha Support Specification](https://github.com/3mr-5aled/ramadan-overlay/issues/10)  
**Status:** Ready for Implementation (`ready-for-agent` / `ready-for-human`)

---

## 1. Executive Summary

This specification defines the architectural and technical changes required to extend `ramadan-overlay` to support **Eid Al-Fitr** and **Eid Al-Adha** celebrations.

The library automatically detects the active occasion, supports both dedicated holiday motifs and contextual adaptations of existing variants, seamlessly hot-swaps decorations across midnight boundaries without requiring page reloads, and preserves 100% backward compatibility with all existing installations.

---

## 2. Settled Decisions Index

| Decision Ticket                                               | Title                                           | Core Resolution                                                                                                                                                                                                                                 |
| ------------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [#11](https://github.com/3mr-5aled/ramadan-overlay/issues/11) | Astronomical Gregorian Dates (1443–1460 AH)     | Computed and verified exact start dates for 1 Shawwal and 10 Dhu al-Hijjah across 1443–1460 AH against ICU and astronomical ephemeris; established `EID_FITR_STARTS` and `EID_ADHA_STARTS`.                                                     |
| [#12](https://github.com/3mr-5aled/ramadan-overlay/issues/12) | Visual Variant Architecture & Asset Composition | Unified `'eid'` variant resolving dynamically to Fitr (floating balloons, gifts, stars) and Adha (geometric sheep, Kaaba, crescent motifs), `'eid-fitr'` / `'eid-adha'` keys, `eidVariant` config setting, and localized banner greeting swaps. |
| [#13](https://github.com/3mr-5aled/ramadan-overlay/issues/13) | Occasion Domain Model & State API               | Non-breaking extension to `RamadanState` (`occasion: Occasion`, `isEid: boolean`, Hijri month/day), `getOccasionState` alias, `occasions` filter array, and `onOccasionChange` / `onEidStart` lifecycle callbacks.                              |
| [#14](https://github.com/3mr-5aled/ramadan-overlay/issues/14) | Midnight Live-Swap Lifecycle & Timer Management | Hybrid target midnight timer (`setTimeout`) + `visibilitychange` / `window.focus` synchronization, deferred initialization watcher, live variant hot-swapping with confetti burst, and resource leak prevention.                                |

---

## 3. Domain Model & TypeScript API (`src/types.ts`)

### 3.1. Occasion & Variant Types

```typescript
export type Occasion = "ramadan" | "eid-fitr" | "eid-adha" | "none";

export type OverlayVariant =
  | "lanterns"
  | "crescent-stars"
  | "geometric"
  | "sparkles"
  | "banner"
  | "eid"
  | "eid-fitr"
  | "eid-adha";
```

### 3.2. Enriched `RamadanState`

```typescript
export interface RamadanState {
  /** True when current date falls within Ramadan (Hijri month 9). Preserved for backwards compatibility. */
  isRamadan: boolean;
  /** Current active occasion: 'ramadan' | 'eid-fitr' | 'eid-adha' | 'none'. */
  occasion: Occasion;
  /** True when either Eid Al-Fitr or Eid Al-Adha is active. */
  isEid: boolean;
  /** Current Hijri year number (e.g. 1447). */
  hijriYear: number;
  /** Current Hijri month number (1–12). */
  hijriMonth: number;
  /** Current Hijri day of the month (1–30). */
  hijriDay: number;
  /** Day number within the active occasion (1–30 for Ramadan, 1–3 for Fitr, 1–4 for Adha), or 0 if none. */
  dayNumber: number;
}
```

### 3.3. Config Extensions (`RamadanOverlayConfig`)

```typescript
export interface RamadanOverlayConfig {
  // ... existing options preserved ...

  /**
   * List of occasions that trigger overlay display when autoTrigger is true.
   * @default ['ramadan', 'eid-fitr', 'eid-adha']
   */
  occasions?: Occasion[];

  /**
   * Which variant to show during Eid celebrations when auto-triggered.
   * @default 'eid'
   */
  eidVariant?: OverlayVariant;

  /**
   * Whether to automatically detect midnight transitions and hot-swap active occasions in live tabs.
   * @default true
   */
  liveTransition?: boolean;

  /**
   * Called when Eid Al-Fitr or Eid Al-Adha starts.
   */
  onEidStart?: (state: RamadanState) => void;

  /**
   * Called whenever the active occasion changes (at init, midnight transition, or dynamic update).
   */
  onOccasionChange?: (occasion: Occasion, state: RamadanState) => void;
}
```

---

## 4. Calendar & Occasion Detection (`src/core/detector.ts`)

### 4.1. Calculation Rules

- **Ramadan**: Month 9, Days 1–30.
- **Eid Al-Fitr**: Month 10 (Shawwal), Days 1–3.
- **Eid Al-Adha**: Month 12 (Dhu al-Hijjah), Days 10–13.

### 4.2. Pre-computed Fallback Tables (1443–1460 AH)

```typescript
export const EID_FITR_STARTS: Record<number, string> = {
  1443: "2022-05-02",
  1444: "2023-04-21",
  1445: "2024-04-10",
  1446: "2025-03-30",
  1447: "2026-03-20",
  1448: "2027-03-09",
  1449: "2028-02-26",
  1450: "2029-02-14",
  1451: "2030-02-04",
  1452: "2031-01-24",
  1453: "2032-01-14",
  1454: "2033-01-03",
  1455: "2033-12-23",
  1456: "2034-12-12",
  1457: "2035-12-01",
  1458: "2036-11-19",
  1459: "2037-11-09",
  1460: "2038-10-29",
};

export const EID_ADHA_STARTS: Record<number, string> = {
  1443: "2022-07-09",
  1444: "2023-06-28",
  1445: "2024-06-16",
  1446: "2025-06-06",
  1447: "2026-05-27",
  1448: "2027-05-16",
  1449: "2028-05-05",
  1450: "2029-04-24",
  1451: "2030-04-13",
  1452: "2031-04-02",
  1453: "2032-03-22",
  1454: "2033-03-12",
  1455: "2034-03-01",
  1456: "2035-02-19",
  1457: "2036-02-08",
  1458: "2037-01-27",
  1459: "2038-01-16",
  1460: "2039-01-05",
};
```

### 4.3. Exports

- `getRamadanState(queryOrDate?: Date | RamadanDateQuery): RamadanState`
- `getOccasionState(queryOrDate?: Date | RamadanDateQuery): RamadanState` (aliased directly to `getRamadanState`).

---

## 5. Visual Variant Architecture (`src/core/variants/`)

### 5.1. New Dedicated Variant: `src/core/variants/eid.ts`

Export `mountEid(container: HTMLElement, config: ResolvedConfig, occasion: Occasion): () => void`:

- If `occasion === 'eid-adha'` (or explicit variant `eid-adha`):
  - Renders stylized geometric sheep silhouettes, Kaaba motifs, and golden crescent stars.
  - Subdued, elegant floating/drifting motion with ambient glow.
- If `occasion === 'eid-fitr'` (or explicit variant `eid-fitr` / default fallback):
  - Renders floating colorful balloons, gift boxes, and twinkle stars.
  - Joyful upward floating keyframe animation with subtle lateral sway.
- Lightweight inline SVG implementations (<5KB bundle impact).

### 5.2. Contextual Adaptation for Existing Variants

- **`src/core/variants/banner.ts`**:
  - When active occasion is `eid-fitr` or `eid-adha`:
    - Default English: `"Eid Mubarak - May this blessed day bring joy, peace, and prosperity"`
    - Default Arabic: `"عيد مبارك - تقبل الله منا ومنكم صالح الأعمال وكل عام وأنتم بخير"`
    - Icon: Swaps lantern-3 with celebratory crescent/star or festive gift motif.
- **`src/core/variants/crescent-stars.ts` & `src/core/variants/sparkles.ts`**:
  - Automatically incorporate celebratory palette highlights and fire confetti on load during Eid.

---

## 6. Live Midnight Transition Engine (`src/core/injector.ts`)

### 6.1. Scheduling Architecture

1. **Target Delta Calculation**:
   ```typescript
   function getMsUntilNextMidnight(): number {
     const now = new Date();
     const nextMidnight = new Date(
       now.getFullYear(),
       now.getMonth(),
       now.getDate() + 1,
       0,
       0,
       1
     );
     return nextMidnight.getTime() - now.getTime();
   }
   ```
2. **Hybrid Listener**:
   - Set single `setTimeout` using `getMsUntilNextMidnight()`.
   - Add listeners for `document.addEventListener('visibilitychange', checkBoundary)` and `window.addEventListener('focus', checkBoundary)`.
   - `checkBoundary()` verifies if current calendar day has advanced since last evaluation. If so, triggers re-evaluation immediately.

### 6.2. Deferred Mount Execution

- If initial evaluation finds no active occasion (`shouldMount: false` on the eve of Ramadan or Eid), do not mount DOM, but arm the midnight scheduler if `autoTrigger && liveTransition`.
- Upon midnight, if state changes to an active occasion in `config.occasions`:
  - Mount host element.
  - Mount appropriate variant.
  - Fire `onOccasionChange` and `onRamadanStart` or `onEidStart`.
  - Fire celebratory confetti if enabled.

### 6.3. Cleanup on `destroy()`

- Always clear midnight timeout via `clearTimeout`.
- Detach `visibilitychange` and `focus` event listeners.

---

## 7. Framework Wrappers & Backward Compatibility

- **React (`src/react/`):** `useRamadanOverlay` and `<RamadanOverlay />` forward new props (`occasions`, `eidVariant`, `liveTransition`, `onEidStart`, `onOccasionChange`).
- **Vue (`src/vue/`):** `useRamadanOverlay` composable and `<RamadanOverlay />` component forward all props reactively.
- **Angular (`src/angular/`):** `RamadanOverlayComponent` inputs and outputs updated.
- **Svelte (`src/svelte/`):** `RamadanOverlay.svelte` exports updated.
- **No breaking changes:** Any code currently calling `init()` with zero configuration or only Ramadan properties will continue to work exactly as before.

---

## 8. Verification & Test Plan

1. **`test/detector.test.ts`**:
   - Verify Ramadan detection (1443–1460 AH) using both `Intl` and fallback table.
   - Verify Eid Al-Fitr detection (Shawwal 1–3) using `Intl` and `EID_FITR_STARTS`.
   - Verify Eid Al-Adha detection (Dhu al-Hijjah 10–13) using `Intl` and `EID_ADHA_STARTS`.
   - Verify region presets (e.g. `egypt` +1 day offset) apply accurately to Eid detection.
2. **`test/injector.test.ts`**:
   - Test `occasions` filtering (e.g. opting out of Eid or Ramadan).
   - Test live transition scheduler arming and unbinding on `destroy()`.
   - Verify `onOccasionChange` and `onEidStart` callback invocations.
3. **`test/eid.test.ts`**:
   - Verify DOM mounting and cleanup of `mountEid`.
   - Verify variant resolution (`variant: 'eid'` vs `'eid-fitr'` vs `'eid-adha'`).

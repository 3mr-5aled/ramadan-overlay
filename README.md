<div align="center">

# 🌙 ramadan-overlay

**Beautiful, auto-triggering Ramadan and Eid decorations for any website**

[![npm version](https://img.shields.io/npm/v/ramadan-overlay?style=flat-square&color=c9a84c)](https://www.npmjs.com/package/ramadan-overlay)
[![npm downloads](https://img.shields.io/npm/dm/ramadan-overlay?style=flat-square&color=c9a84c)](https://www.npmjs.com/package/ramadan-overlay)
[![gzip size](https://img.badgesize.io/https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js?compression=gzip&style=flat-square&color=c9a84c)](https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-c9a84c.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[![CDN jsDelivr](https://img.shields.io/badge/CDN-jsDelivr-blue?style=flat-square)](https://cdn.jsdelivr.net/npm/ramadan-overlay/dist/ramadan-overlay.min.js)
[![CDN unpkg](https://img.shields.io/badge/CDN-unpkg-orange?style=flat-square)](https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js)

A lightweight TypeScript library that injects beautiful Ramadan and Eid decorations into any web app —
**zero dependencies, no build step required.** Auto-detects Ramadan, Eid Al-Fitr, and Eid Al-Adha via the Hijri calendar
with support for 10+ regional presets.

[**🔴 Live Demo & Config Generator →**](https://3mr-5aled.github.io/ramadan-overlay/)

</div>

---

## ✨ Features

- 🗓️ **Auto-detection** — activates automatically during Ramadan, Eid Al-Fitr, and Eid Al-Adha using Hijri calendar conversion
- 🎨 **8 visual variants** — Lanterns, Sparkles, Crescent & Stars, Geometric, Eid Al-Fitr, Eid Al-Adha, Auto-Eid, and Contextual Banner
- 🕛 **Live midnight transitions** — dynamic transitions and automatic re-synchronization across midnight and tab focus changes
- 🌍 **Region-aware** — 10+ regional calendar presets with configurable day offsets
- ⚡ **Zero dependencies** — tree-shakeable, framework-agnostic
- 🧩 **All frameworks** — React, Vue 3, Angular, Svelte, or plain HTML / CDN
- 🎊 **Confetti** — celebratory bursts for festive holidays
- 🖌️ **Fully customizable** — colors, opacity, density, position, and more

---

## 📦 Installation

```bash
npm install ramadan-overlay
# or
pnpm add ramadan-overlay
# or
yarn add ramadan-overlay
```

**CDN (no bundler needed):**

```html
<!-- jsDelivr (recommended) -->
<script src="https://cdn.jsdelivr.net/npm/ramadan-overlay/dist/ramadan-overlay.min.js"></script>

<!-- unpkg -->
<script src="https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js"></script>

<script>
  RamadanOverlay.init({ variant: "lanterns", previewMode: true });
</script>
```

---

## 🚀 Quick Start

```ts
import { init } from "ramadan-overlay";

const overlay = init({
  variant: "lanterns", // 'lanterns' | 'sparkles' | 'crescent-stars' | 'geometric' | 'banner'
  previewMode: true, // force-show outside Ramadan (great for testing)
  opacity: 0.85,
});

// Ramadan state detected at mount time
console.log(overlay.state.dayNumber); // e.g. 5

// The overlay's root DOM element (null when not mounted)
console.log(overlay.container);

// Clean up when done
overlay.destroy();
```

---

## 🎨 Variants

| Variant          | Description                                                                         |
| ---------------- | ----------------------------------------------------------------------------------- |
| `lanterns`       | Classic hanging lanterns with customizable colors and styles (12 designs)           |
| `sparkles`       | Glittering sparkle particles                                                        |
| `crescent-stars` | Crescent moon and star motifs                                                       |
| `geometric`      | Decorative Islamic geometric patterns                                               |
| `eid`            | Auto-adapting Eid variant: mounts `eid-fitr` or `eid-adha` based on current holiday |
| `eid-fitr`       | Eid Al-Fitr celebration with floating festive balloons, gift boxes, and stars       |
| `eid-adha`       | Eid Al-Adha celebration with geometric sheep, the Kaaba motif, and crescents        |
| `banner`         | Fixed greeting bar prepended to the page (contextually adapts for Ramadan and Eids) |

---

## ⚙️ Options

### General

| Option       | Type             | Default                               | Description                                                                                                                              |
| ------------ | ---------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`    | `OverlayVariant` | `'lanterns'`                          | Visual decoration style (`'lanterns'`, `'sparkles'`, `'crescent-stars'`, `'geometric'`, `'eid'`, `'eid-fitr'`, `'eid-adha'`, `'banner'`) |
| `occasions`  | `Occasion[]`     | `['ramadan', 'eid-fitr', 'eid-adha']` | Filter which occasions display decorations                                                                                               |
| `eidVariant` | `OverlayVariant` | `'eid'`                               | Visual variant to render during Eid when `variant` is Ramadan-specific                                                                   |
| `position`   | `string`         | `'both'`                              | `'top'` \| `'bottom'` \| `'both'` \| `'full'`                                                                                            |
| `opacity`    | `number`         | `0.85`                                | Overlay opacity `0`–`1`                                                                                                                  |
| `colors`     | `string[]`       | Festive palette                       | Custom CSS color array                                                                                                                   |
| `density`    | `string`         | auto                                  | `'low'` \| `'normal'` \| `'high'` — defaults to `'low'` on mobile, `'normal'` on desktop                                                 |
| `zIndex`     | `number`         | `9999`                                | CSS z-index of the overlay                                                                                                               |
| `locale`     | `string`         | `'en'`                                | `'en'` \| `'ar'`                                                                                                                         |

### Behaviour

| Option           | Type      | Default | Description                                                                    |
| ---------------- | --------- | ------- | ------------------------------------------------------------------------------ |
| `autoTrigger`    | `boolean` | `true`  | Only show during detected holidays                                             |
| `previewMode`    | `boolean` | `false` | Force display regardless of date (simulates active occasion)                   |
| `confetti`       | `string`  | `'on'`  | `'on'` = fires during active festive days, `'off'` = disabled                  |
| `liveTransition` | `boolean` | `true`  | Automatic midnight re-evaluation and tab visibility / focus re-synchronization |

### Date & Region

| Option            | Type     | Default      | Description                                                            |
| ----------------- | -------- | ------------ | ---------------------------------------------------------------------- |
| `region`          | `string` | `'standard'` | Hijri calendar region preset (see table below)                         |
| `hijriAdjustment` | `number` | `0`          | Manual day offset — overrides `region`. Typical: `-1`, `0`, `+1`, `+2` |

#### Region presets

| Preset      | Offset | Notes                                  |
| ----------- | :----: | -------------------------------------- |
| `standard`  |   0    | Umm al-Qura — Saudi Arabia _(default)_ |
| `saudi`     |   0    | Alias for `standard`                   |
| `uae`       |   0    | Follows Saudi most years               |
| `malaysia`  |   0    | JAKIM / follows Saudi                  |
| `egypt`     |   +1   | Egyptian Dar al-Ifta                   |
| `turkey`    |   +1   | Diyanet calculation                    |
| `pakistan`  |   +1   | Moon-sighting committee                |
| `indonesia` |   +1   | BIMAS calculation                      |
| `morocco`   |   +1   | Ministry of Habous                     |
| `us`        |   +1   | ISNA / Fiqh Council                    |
| `uk`        |   +1   | Follows ISNA / local sighting          |

> Use `hijriAdjustment` for a custom numeric offset when no preset matches your region.

### Lanterns variant

| Option         | Type     | Default                   | Description                                           |
| -------------- | -------- | ------------------------- | ----------------------------------------------------- |
| `lanternStyle` | `number` | `0`                       | `1`–`12` pins a single design; `0` cycles through all |
| `ceilingColor` | `string` | `'#c9a84c'`               | Color of the horizontal ceiling bar                   |
| `ropeColor`    | `string` | `'#c9a84c'`               | Color of the lantern strings                          |
| `glowColor`    | `string` | `'rgba(201,168,76,0.55)'` | Drop-shadow / glow color                              |

### Banner variant

| Option            | Type     | Default                   | Description                                                   |
| ----------------- | -------- | ------------------------- | ------------------------------------------------------------- |
| `bannerBg`        | `string` | `'rgba(15,15,20,0.92)'`   | Background color of the banner bar                            |
| `bannerTextColor` | `string` | `colors[0]`               | Greeting text color                                           |
| `bannerIconColor` | `string` | `colors[1]`               | Color of the icon beside the text                             |
| `bannerTextEn`    | `string` | built-in English greeting | Custom English greeting (defaults to Ramadan or Eid Mubarak)  |
| `bannerTextAr`    | `string` | built-in Arabic greeting  | Custom Arabic greeting (defaults to رمضان مبارك or عيد مبارك) |

### Callbacks

| Option             | Type                                                | Description                                                |
| ------------------ | --------------------------------------------------- | ---------------------------------------------------------- |
| `onRamadanStart`   | `(state: RamadanState) => void`                     | Called once when Ramadan is active                         |
| `onEidStart`       | `(state: RamadanState) => void`                     | Called once when an Eid holiday is active                  |
| `onOccasionChange` | `(occasion: Occasion, state: RamadanState) => void` | Called whenever the active occasion transitions or updates |
| `onRamadanEnd`     | `() => void`                                        | Called when `overlay.destroy()` is invoked                 |

```ts
import { init } from "ramadan-overlay";

init({
  variant: "lanterns",
  eidVariant: "eid", // automatically displays festive balloons or sheep/Kaaba during Eid!
  onOccasionChange: (occasion, state) => {
    console.log(`Active occasion: ${occasion} (Hijri ${state.hijriYear})`);
  },
  onRamadanEnd: () => {
    console.log("Overlay removed");
  },
});
```

---

## 📊 Checking Occasion & Calendar State

```ts
import { getOccasionState, getRamadanState } from "ramadan-overlay";

// Today's state (standard calendar)
const state = getOccasionState();
console.log(state.occasion); // 'ramadan' | 'eid-fitr' | 'eid-adha' | 'none'
console.log(state.isRamadan); // boolean
console.log(state.isEid); // boolean
console.log(state.hijriMonth); // e.g. 9 (Ramadan), 10 (Shawwal), 12 (Dhu al-Hijjah)
console.log(state.hijriDay); // e.g. 1
console.log(state.dayNumber); // e.g. 1-30

// Optional: pass a specific date and/or a Hijri day offset
const eidAdhaState = getOccasionState(new Date("2025-06-06"), 0);
console.log(eidAdhaState.occasion); // 'eid-adha'
```

| Parameter         | Type     | Default      | Description                                                  |
| ----------------- | -------- | ------------ | ------------------------------------------------------------ |
| `date`            | `Date`   | `new Date()` | Date to evaluate                                             |
| `hijriAdjustment` | `number` | `0`          | Day offset applied before detection (positive = later start) |

| Field        | Type       | Description                                                 |
| ------------ | ---------- | ----------------------------------------------------------- |
| `occasion`   | `Occasion` | `'ramadan'`, `'eid-fitr'`, `'eid-adha'`, or `'none'`        |
| `isRamadan`  | `boolean`  | Whether the date falls within Ramadan                       |
| `isEid`      | `boolean`  | Whether the date falls within Eid Al-Fitr or Eid Al-Adha    |
| `hijriYear`  | `number`   | Current Hijri year                                          |
| `hijriMonth` | `number`   | Hijri month (9: Ramadan, 10: Shawwal, 12: Dhu al-Hijjah)    |
| `hijriDay`   | `number`   | Day within current Hijri month                              |
| `dayNumber`  | `number`   | Day within Ramadan (`1`–`30`) or Eid (`1`–`4`), `0` outside |

---

## 🧩 Framework Integrations

<details open>
<summary><strong>⚛️ React</strong></summary>

**Hook**

```tsx
import { useRamadanOverlay } from "ramadan-overlay/react";

function App() {
  const { state } = useRamadanOverlay({ variant: "lanterns" });
  return state.isRamadan ? <p>Ramadan Mubarak!</p> : null;
}
```

**Component — flat props**

```tsx
import { RamadanOverlay } from "ramadan-overlay/react";

function App() {
  return (
    <>
      <RamadanOverlay variant="lanterns" previewMode />
      <YourApp />
    </>
  );
}
```

**Component — `config` object + render prop**

```tsx
function App() {
  return (
    <RamadanOverlay config={{ variant: "lanterns", previewMode: true }}>
      {(state) => state.isRamadan && <p>Ramadan Mubarak!</p>}
    </RamadanOverlay>
  );
}
```

</details>

<details>
<summary><strong>💚 Vue 3</strong></summary>

**Composable**

```vue
<script setup>
import { useRamadanOverlay } from "ramadan-overlay/vue";
const { state } = useRamadanOverlay({ variant: "lanterns" });
</script>

<template>
  <p v-if="state.isRamadan">Ramadan Mubarak!</p>
</template>
```

**Component — flat props**

```vue
<template>
  <RamadanOverlay variant="crescent-stars" :previewMode="true" />
</template>

<script setup>
import { RamadanOverlay } from "ramadan-overlay/vue";
</script>
```

**Component — `:config` object**

```vue
<template>
  <RamadanOverlay
    :config="{ variant: 'geometric', previewMode: true }"
    @ramadan-start="onStart"
    @ramadan-end="onEnd"
  />
</template>

<script setup>
import { RamadanOverlay } from "ramadan-overlay/vue";
</script>
```

</details>

<details>
<summary><strong>🔴 Angular</strong></summary>

**Standalone — individual inputs**

```ts
import { RamadanOverlayDirective } from "ramadan-overlay/angular";

@Component({
  imports: [RamadanOverlayDirective],
  template: `
    <div ramadanOverlay variant="sparkles" [previewMode]="true"></div>
  `,
})
export class AppComponent {}
```

**Standalone — `[ramadanConfig]` object input**

```ts
@Component({
  imports: [RamadanOverlayDirective],
  template: `
    <div
      ramadanOverlay
      [ramadanConfig]="{ variant: 'lanterns', previewMode: true }"
    ></div>
  `,
})
export class AppComponent {}
```

**NgModule-based app**

```ts
import { RamadanOverlayModule } from "ramadan-overlay/angular";

@NgModule({ imports: [RamadanOverlayModule] })
export class AppModule {}
```

</details>

<details>
<summary><strong>🧡 Svelte</strong></summary>

**Action (`use:ramadanOverlay`)**

```svelte
<script>
  import { ramadanOverlay } from "ramadan-overlay/svelte";
</script>

<div use:ramadanOverlay={{ variant: "geometric", previewMode: true }}></div>
```

**Composable (`useRamadanOverlay`)**

```svelte
<script>
  import { useRamadanOverlay } from "ramadan-overlay/svelte";
  const { state } = useRamadanOverlay({ variant: "geometric" });
</script>

{#if $state.isRamadan}<p>Ramadan Mubarak!</p>{/if}
```

</details>

<details>
<summary><strong>🌐 CDN / Script tag</strong></summary>

```html
<script src="https://cdn.jsdelivr.net/npm/ramadan-overlay/dist/ramadan-overlay.min.js"></script>
<script>
  RamadanOverlay.init({
    variant: "lanterns",
    region: "egypt",
    previewMode: true,
  });
</script>
```

</details>

---

## 📄 License

MIT © [3mr-5aled](https://github.com/3mr-5aled/)

<div align="center">

# 🌙 ramadan-overlay

**Beautiful, auto-triggering Ramadan decorations for any website**

[![npm version](https://img.shields.io/npm/v/ramadan-overlay?style=flat-square&color=c9a84c)](https://www.npmjs.com/package/ramadan-overlay)
[![npm downloads](https://img.shields.io/npm/dm/ramadan-overlay?style=flat-square&color=c9a84c)](https://www.npmjs.com/package/ramadan-overlay)
[![gzip size](https://img.badgesize.io/https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js?compression=gzip&style=flat-square&color=c9a84c)](https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-c9a84c.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[![CDN jsDelivr](https://img.shields.io/badge/CDN-jsDelivr-blue?style=flat-square)](https://cdn.jsdelivr.net/npm/ramadan-overlay/dist/ramadan-overlay.min.js)
[![CDN unpkg](https://img.shields.io/badge/CDN-unpkg-orange?style=flat-square)](https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js)

A lightweight TypeScript library that injects beautiful Ramadan decorations into any web app —
**zero dependencies, no build step required.** Auto-detects Ramadan via the Hijri calendar
with support for 10+ regional presets.

[**🔴 Live Demo & Config Generator →**](https://3mr-5aled.github.io/ramadan-overlay/)

</div>

---

## ✨ Features

- 🗓️ **Auto-detection** — activates automatically during Ramadan using Hijri calendar conversion
- 🎨 **5 visual variants** — Lanterns, Sparkles, Crescent & Stars, Geometric, Banner
- 🌍 **Region-aware** — 10+ regional calendar presets with configurable day offsets
- ⚡ **Zero dependencies** — tree-shakeable, framework-agnostic
- 🧩 **All frameworks** — React, Vue 3, Angular, Svelte, or plain HTML / CDN
- 🎊 **Confetti** — on or off
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

| Variant          | Description                                                                    |
| ---------------- | ------------------------------------------------------------------------------ |
| `lanterns`       | Classic hanging lanterns with customizable colors and styles (12 designs)      |
| `sparkles`       | Glittering sparkle particles                                                   |
| `crescent-stars` | Crescent moon and star motifs                                                  |
| `geometric`      | Decorative Islamic geometric patterns                                          |
| `banner`         | Fixed greeting bar prepended to the page (pushes content down, not an overlay) |

---

## ⚙️ Options

### General

| Option     | Type       | Default         | Description                                                                              |
| ---------- | ---------- | --------------- | ---------------------------------------------------------------------------------------- |
| `variant`  | `string`   | `'lanterns'`    | Visual decoration style                                                                  |
| `position` | `string`   | `'both'`        | `'top'` \| `'bottom'` \| `'both'` \| `'full'`                                            |
| `opacity`  | `number`   | `0.85`          | Overlay opacity `0`–`1`                                                                  |
| `colors`   | `string[]` | Ramadan palette | Custom CSS color array                                                                   |
| `density`  | `string`   | auto            | `'low'` \| `'normal'` \| `'high'` — defaults to `'low'` on mobile, `'normal'` on desktop |
| `zIndex`   | `number`   | `9999`          | CSS z-index of the overlay                                                               |
| `locale`   | `string`   | `'en'`          | `'en'` \| `'ar'`                                                                         |

### Behaviour

| Option        | Type      | Default | Description                               |
| ------------- | --------- | ------- | ----------------------------------------- |
| `autoTrigger` | `boolean` | `true`  | Only show during Hijri Ramadan            |
| `previewMode` | `boolean` | `false` | Force display regardless of date          |
| `confetti`    | `string` | `'on'`        | `'on'` = fires every day of Ramadan, `'off'` = disabled                   |

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

| Option            | Type     | Default                   | Description                               |
| ----------------- | -------- | ------------------------- | ----------------------------------------- |
| `bannerBg`        | `string` | `'rgba(15,15,20,0.92)'`   | Background color of the banner bar        |
| `bannerTextColor` | `string` | `colors[0]`               | Greeting text color                       |
| `bannerIconColor` | `string` | `colors[1]`               | Color of the lantern icon beside the text |
| `bannerTextEn`    | `string` | built-in English greeting | Custom English greeting text              |
| `bannerTextAr`    | `string` | built-in Arabic greeting  | Custom Arabic greeting text               |

### Callbacks

| Option           | Type                            | Description                                  |
| ---------------- | ------------------------------- | -------------------------------------------- |
| `onRamadanStart` | `(state: RamadanState) => void` | Called once when Ramadan is detected at init |
| `onRamadanEnd`   | `() => void`                    | Called when `overlay.destroy()` is invoked   |

```ts
import { init } from "ramadan-overlay";

init({
  variant: "lanterns",
  onRamadanStart: (state) => {
    console.log(`Ramadan ${state.hijriYear} — day ${state.dayNumber}`);
  },
  onRamadanEnd: () => {
    console.log("Overlay removed");
  },
});
```

---

## 📊 Checking Ramadan State

```ts
import { getRamadanState } from "ramadan-overlay";

// Today's state (standard calendar)
const { isRamadan, hijriYear, dayNumber } = getRamadanState();

// Optional: pass a specific date and/or a Hijri day offset
const state = getRamadanState(new Date("2025-03-01"), +1);
```

| Parameter         | Type     | Default      | Description                                                  |
| ----------------- | -------- | ------------ | ------------------------------------------------------------ |
| `date`            | `Date`   | `new Date()` | Date to evaluate                                             |
| `hijriAdjustment` | `number` | `0`          | Day offset applied before detection (positive = later start) |

| Field       | Type      | Description                                |
| ----------- | --------- | ------------------------------------------ |
| `isRamadan` | `boolean` | Whether today is within Ramadan            |
| `hijriYear` | `number`  | Current Hijri year                         |
| `dayNumber` | `number`  | Day within Ramadan (`1`–`30`), `0` outside |

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

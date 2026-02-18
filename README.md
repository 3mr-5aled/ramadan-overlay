# ramadan-overlay

[![npm](https://img.shields.io/npm/v/ramadan-overlay)](https://www.npmjs.com/package/ramadan-overlay)
[![gzip size](https://img.badgesize.io/https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js?compression=gzip)](https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js)
[![unpkg](https://img.shields.io/badge/CDN-unpkg-orange)](https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js)
[![jsDelivr](https://img.shields.io/badge/CDN-jsDelivr-blue)](https://cdn.jsdelivr.net/npm/ramadan-overlay/dist/ramadan-overlay.min.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight TypeScript library that injects beautiful Ramadan decorations into any web application — no build step required. Auto-detects Ramadan dates via Hijri calendar, supports 5 visual variants, and works with React, Vue, Angular, Svelte, or plain HTML.

🌙 **[Live demo & config generator →](https://3mr-5aled.github.io/ramadan-overlay/)**

---

## Table of Contents

- [CDN / Script tag](#cdn--script-tag)
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Callbacks](#callbacks)
- [Checking Ramadan State](#checking-ramadan-state)
- [React](#react)
- [Vue 3](#vue-3)
- [Angular](#angular)
- [Svelte](#svelte)
- [License](#license)

---

## CDN / Script tag

No bundler required. Load directly from jsDelivr or unpkg:

```html
<!-- jsDelivr (recommended) -->
<script src="https://cdn.jsdelivr.net/npm/ramadan-overlay/dist/ramadan-overlay.min.js"></script>

<!-- unpkg -->
<script src="https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js"></script>

<script>
  RamadanOverlay.init({ variant: "sparkles", previewMode: true });
</script>
```

---

## Installation

```bash
npm install ramadan-overlay
# or
pnpm add ramadan-overlay
# or
yarn add ramadan-overlay
```

---

## Usage

```ts
import { init } from "ramadan-overlay";

const overlay = init({
  variant: "lanterns", // 'lanterns' | 'sparkles' | 'crescent-stars' | 'geometric' | 'minimal'
  previewMode: true, // force display outside Ramadan (for testing)
  opacity: 0.85,
});

// Remove the overlay later:
overlay.destroy();
```

---

## Options

| Option            | Type              | Default                   | Description                                                     |
| ----------------- | ----------------- | ------------------------- | --------------------------------------------------------------- |
| `variant`         | `string`          | `'lanterns'`              | Decoration style                                                |
| `position`        | `string`          | `'both'`                  | `'top'` \| `'bottom'` \| `'both'` \| `'full'`                   |
| `opacity`         | `number`          | `0.85`                    | Overall overlay opacity (0–1)                                   |
| `colors`          | `string[]`        | Ramadan palette           | Custom CSS color strings                                        |
| `density`         | `string`          | `'auto'`                  | `'low'` \| `'normal'` \| `'high'` — particle count              |
| `zIndex`          | `number`          | `9999`                    | CSS z-index of the overlay container                            |
| `previewMode`     | `boolean`         | `false`                   | Force display regardless of date                                |
| `autoTrigger`     | `boolean`         | `true`                    | Only show during Hijri Ramadan                                  |
| `confetti`        | `boolean`         | `true`                    | Fire confetti on day 1 of Ramadan                               |
| `locale`          | `string`          | `'en'`                    | `'en'` \| `'ar'`                                                |
| `region`          | `string`          | `'standard'`              | Hijri calendar region preset (see table below)                  |
| `hijriAdjustment` | `number`          | `0`                       | Manual day offset (overrides `region`). Typical: -1, 0, +1, +2  |
| `glowColor`       | `string`          | `'rgba(201,168,76,0.55)'` | Drop-shadow / glow color                                        |
| `lanternStyle`    | `number`          | `0`                       | Lanterns variant only. 1–12 pins a design; 0 cycles through all |
| `ceilingColor`    | `string`          | `'#c9a84c'`               | Lanterns variant only. Color of the horizontal ceiling bar      |
| `ropeColor`       | `string`          | `'#c9a84c'`               | Lanterns variant only. Color of the lantern strings             |
| `onRamadanStart`  | `(state) => void` | —                         | Called once when Ramadan is detected at init                    |
| `onRamadanEnd`    | `() => void`      | —                         | Called when `destroy()` is invoked                              |

### Region presets

| Preset      | Offset | Notes                                |
| ----------- | :----: | ------------------------------------ |
| `standard`  |   0    | Umm al-Qura — Saudi Arabia (default) |
| `saudi`     |   0    | Alias for `standard`                 |
| `uae`       |   0    | Follows Saudi most years             |
| `malaysia`  |   0    | JAKIM / follows Saudi                |
| `egypt`     |   +1   | Egyptian Dar al-Ifta                 |
| `turkey`    |   +1   | Diyanet calculation                  |
| `pakistan`  |   +1   | Moon-sighting committee              |
| `indonesia` |   +1   | BIMAS calculation                    |
| `morocco`   |   +1   | Ministry of Habous                   |
| `us`        |   +1   | ISNA / Fiqh Council                  |
| `uk`        |   +1   | Follows ISNA / local sighting        |

Use `hijriAdjustment` for a custom numeric offset when no preset matches your region.

---

## Callbacks

```ts
import { init } from "ramadan-overlay";

init({
  variant: "lanterns",
  onRamadanStart: (state) => {
    console.log(`Ramadan ${state.hijriYear} started — day ${state.dayNumber}`);
  },
  onRamadanEnd: () => {
    console.log("Overlay destroyed");
  },
});
```

---

## Checking Ramadan State

```ts
import { getRamadanState } from "ramadan-overlay";

const state = getRamadanState();
// {
//   isRamadan: boolean,
//   isFirstDay: boolean,
//   hijriYear: number,
//   dayNumber: number
// }
```

---

## React

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

---

## Vue 3

```vue
<template>
  <RamadanOverlay variant="crescent-stars" :previewMode="true" />
</template>

<script setup>
import { RamadanOverlay } from "ramadan-overlay/vue";
</script>
```

---

## Angular

```ts
import { RamadanOverlayDirective } from "ramadan-overlay/angular";

@Component({
  imports: [RamadanOverlayDirective],
  template: `<div
    ramadanOverlay
    variant="sparkles"
    [previewMode]="true"
  ></div>`,
})
export class AppComponent {}
```

---

## Svelte

```svelte
<script>
  import { RamadanOverlay } from "ramadan-overlay/svelte";
</script>

<RamadanOverlay variant="geometric" previewMode={true} />
```

---

## License

MIT © [3mr-5aled](https://github.com/3mr-5aled/)

## CDN / Script tag

No bundler required. Load directly from unpkg:

```html
<script src="https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js"></script>
<script>
  RamadanOverlay.init({ variant: "sparkles", previewMode: true });
</script>
```

## Installation

```bash
npm install ramadan-overlay
```

## Usage

```ts
import { init } from "ramadan-overlay";

const overlay = init({
  variant: "lanterns", // 'lanterns' | 'sparkles' | 'crescent-stars' | 'geometric' | 'minimal'
  previewMode: true, // force display outside Ramadan (for testing)
  opacity: 0.85,
});

// Remove the overlay later:
overlay.destroy();
```

## Options

| Option        | Type       | Default                   | Description                                        |
| ------------- | ---------- | ------------------------- | -------------------------------------------------- |
| `variant`     | `string`   | `'lanterns'`              | Decoration style                                   |
| `position`    | `string`   | `'both'`                  | `'top'` \| `'bottom'` \| `'both'` \| `'full'`      |
| `opacity`     | `number`   | `0.85`                    | Overall overlay opacity (0–1)                      |
| `colors`      | `string[]` | Ramadan palette           | Custom CSS color strings                           |
| `density`     | `string`   | auto                      | `'low'` \| `'normal'` \| `'high'` — particle count |
| `previewMode` | `boolean`  | `false`                   | Force display regardless of date                   |
| `autoTrigger` | `boolean`  | `true`                    | Only show during Hijri Ramadan                     |
| `confetti`    | `boolean`  | `true`                    | Fire confetti on day 1 of Ramadan                  |
| `locale`      | `string`   | `'en'`                    | `'en'` \| `'ar'`                                   |
| `region`      | `string`   | `'standard'`              | Hijri calendar region preset                       |
| `glowColor`   | `string`   | `'rgba(201,168,76,0.55)'` | Drop-shadow / glow color                           |

## React

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

## Vue 3

```vue
<template>
  <RamadanOverlay variant="crescent-stars" :previewMode="true" />
</template>
<script setup>
import { RamadanOverlay } from "ramadan-overlay/vue";
</script>
```

## Angular

```ts
import { RamadanOverlayDirective } from "ramadan-overlay/angular";

@Component({
  imports: [RamadanOverlayDirective],
  template: `<div
    ramadanOverlay
    variant="sparkles"
    [previewMode]="true"
  ></div>`,
})
export class AppComponent {}
```

## License

MIT

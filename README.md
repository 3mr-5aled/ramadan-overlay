# ramadan-overlay

[![npm](https://img.shields.io/npm/v/ramadan-overlay)](https://www.npmjs.com/package/ramadan-overlay)
[![unpkg](https://img.shields.io/badge/CDN-unpkg-orange)](https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js)
[![gzip size](https://img.badgesize.io/https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js?compression=gzip)](https://unpkg.com/ramadan-overlay/dist/ramadan-overlay.min.js)

A lightweight TypeScript library that injects beautiful Ramadan decorations into any web application — no build step required.

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

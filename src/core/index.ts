/**
 * ramadan-overlay — core entry point
 *
 * @example Vanilla JS
 * ```ts
 * import { init } from 'ramadan-overlay';
 * const overlay = init({ variant: 'lanterns', position: 'both' });
 * ```
 *
 * @example React  →  import from 'ramadan-overlay/react'
 * @example Vue    →  import from 'ramadan-overlay/vue'
 * @example Angular →  import from 'ramadan-overlay/angular'
 * @example Svelte →  import from 'ramadan-overlay/svelte'
 */

export { getOccasionState, getRamadanState, init } from "./injector";
export { fireRamadanConfetti, shouldFireConfetti } from "./confetti";
export { createCountdownManager } from "./countdown";
export { THEME_PRESETS, themes, resolveTheme } from "./themes";

export type {
  Occasion,
  OverlayInstance,
  RamadanOverlayInstance,
  OverlayPosition,
  MobileSideBehavior,
  OverlayVariant,
  RamadanDateQuery,
  RamadanOverlayConfig,
  RamadanState,
  ThemePreset,
  ThemeDefinition,
  ThemeOption,
  IftarCountdownConfig,
  IftarCountdownController,
  IftarCountdownLabels,
  IftarTimeResolver,
  IftarTimeValue,
  CountdownAnchorPosition,
} from "../types";

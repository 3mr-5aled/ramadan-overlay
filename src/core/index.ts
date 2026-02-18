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

export { getRamadanState, init } from "./injector";

export type {
  OverlayInstance,
  OverlayPosition,
  OverlayVariant,
  RamadanOverlayConfig,
  RamadanState,
} from "../types";

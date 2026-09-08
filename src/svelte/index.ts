import { onDestroy, onMount } from "svelte";
import { getOccasionState, getRamadanState, init } from "../core/index";
import type {
  Occasion,
  OverlayInstance,
  OverlayVariant,
  RamadanDateQuery,
  RamadanOverlayConfig,
  RamadanState,
} from "../types";

/**
 * Svelte action — attach to any element to mount the overlay.
 *
 * @example
 * ```svelte
 * <script>
 *   import { ramadanOverlay } from 'ramadan-overlay/svelte';
 * </script>
 * <div use:ramadanOverlay={{ variant: 'lanterns', previewMode: true }}></div>
 * ```
 */
export function ramadanOverlay(
  _node: HTMLElement,
  config: RamadanOverlayConfig = {}
) {
  let instance: OverlayInstance | null = init(config);

  return {
    update(newConfig: RamadanOverlayConfig) {
      if (!instance) {
        instance = init(newConfig);
      } else {
        instance.update(newConfig);
      }
    },
    destroy() {
      instance?.destroy();
      instance = null;
    },
  };
}

/**
 * Svelte composable-style function (call inside a component's <script>).
 *
 * @example
 * ```svelte
 * <script>
 *   import { useRamadanOverlay } from 'ramadan-overlay/svelte';
 *   const { state } = useRamadanOverlay({ variant: 'geometric' });
 * </script>
 * {#if $state.isRamadan}<p>Ramadan Mubarak!</p>{/if}
 * ```
 */
export function useRamadanOverlay(config: RamadanOverlayConfig = {}): {
  state: { subscribe: (fn: (v: RamadanState) => void) => () => void };
} {
  let subscribers: Array<(v: RamadanState) => void> = [];
  let currentState: RamadanState = getRamadanState(config);

  const store = {
    subscribe(fn: (v: RamadanState) => void) {
      subscribers.push(fn);
      fn(currentState);
      return () => {
        subscribers = subscribers.filter((s) => s !== fn);
      };
    },
  };

  onMount(() => {
    const overlay = init({
      ...config,
      onOccasionChange: (_occasion, s) => {
        currentState = s;
        subscribers.forEach((fn) => fn(s));
        config.onOccasionChange?.(_occasion, s);
      },
      onRamadanStart: (s) => {
        currentState = s;
        subscribers.forEach((fn) => fn(s));
        config.onRamadanStart?.(s);
      },
    });
    currentState = overlay.state;
    subscribers.forEach((fn) => fn(currentState));

    onDestroy(() => {
      overlay.destroy();
    });
  });

  return { state: store };
}

export { getOccasionState, getRamadanState };
export type {
  Occasion,
  OverlayInstance,
  OverlayVariant,
  RamadanDateQuery,
  RamadanOverlayConfig,
  RamadanState,
};

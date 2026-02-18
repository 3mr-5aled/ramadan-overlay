import { onDestroy, onMount } from "svelte";
import { getRamadanState, init } from "../core/index";
import type {
  OverlayInstance,
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
  config: RamadanOverlayConfig = {},
) {
  let instance: OverlayInstance | null = init(config);

  return {
    update(newConfig: RamadanOverlayConfig) {
      instance?.destroy();
      instance = init(newConfig);
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
  let currentState: RamadanState = getRamadanState();

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
      onRamadanStart: (s) => {
        currentState = s;
        subscribers.forEach((fn) => fn(s));
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

export { getRamadanState };
export type { OverlayInstance, RamadanOverlayConfig, RamadanState };

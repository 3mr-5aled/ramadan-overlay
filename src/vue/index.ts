import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch,
  type PropType,
} from "vue";
import { getRamadanState, init } from "../core/index";
import type {
  OverlayInstance,
  RamadanOverlayConfig,
  RamadanState,
} from "../types";

// ─── Composable ───────────────────────────────────────────────────────────────

/**
 * Vue 3 composable that mounts the Ramadan overlay.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useRamadanOverlay } from 'ramadan-overlay/vue';
 * const { state } = useRamadanOverlay({ variant: 'lanterns' });
 * </script>
 * ```
 */
export function useRamadanOverlay(config: RamadanOverlayConfig = {}): {
  state: ReturnType<typeof ref<RamadanState>>;
  instance: ReturnType<typeof ref<OverlayInstance | null>>;
} {
  const state = ref<RamadanState>(getRamadanState());
  const instance = ref<OverlayInstance | null>(null);

  onMounted(() => {
    const overlay = init(config);
    instance.value = overlay;
    state.value = overlay.state;
  });

  onUnmounted(() => {
    instance.value?.destroy();
    instance.value = null;
  });

  return { state, instance };
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Vue 3 component — renders nothing but injects the overlay into document.body.
 *
 * @example
 * ```vue
 * <template>
 *   <RamadanOverlay :config="{ variant: 'crescent-stars', previewMode: true }" />
 * </template>
 * <script setup>
 * import { RamadanOverlay } from 'ramadan-overlay/vue';
 * </script>
 * ```
 */
export const RamadanOverlay = defineComponent({
  name: "RamadanOverlay",
  props: {
    config: {
      type: Object as PropType<RamadanOverlayConfig>,
      default: () => ({}),
    },
  },
  emits: ["ramadan-start", "ramadan-end"],
  setup(props, { emit }) {
    let instance: OverlayInstance | null = null;

    const mount = () => {
      instance?.destroy();
      const cfg: RamadanOverlayConfig = {
        ...props.config,
        onRamadanStart: (s) => emit("ramadan-start", s),
        onRamadanEnd: () => emit("ramadan-end"),
      };
      instance = init(cfg);
    };

    onMounted(mount);

    watch(
      () => JSON.stringify(props.config),
      () => mount(),
    );

    onUnmounted(() => {
      instance?.destroy();
      instance = null;
    });

    return () => null;
  },
});

export { getRamadanState };
export type { OverlayInstance, RamadanOverlayConfig, RamadanState };

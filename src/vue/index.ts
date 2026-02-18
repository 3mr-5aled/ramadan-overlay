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
    variant: {
      type: String as PropType<RamadanOverlayConfig["variant"]>,
      default: undefined,
    },
    position: {
      type: String as PropType<RamadanOverlayConfig["position"]>,
      default: undefined,
    },
    opacity: { type: Number as PropType<number>, default: undefined },
    colors: { type: Array as PropType<string[]>, default: undefined },
    zIndex: { type: Number as PropType<number>, default: undefined },
    autoTrigger: { type: Boolean as PropType<boolean>, default: undefined },
    previewMode: { type: Boolean as PropType<boolean>, default: undefined },
    confetti: { type: String as PropType<RamadanOverlayConfig["confetti"]>, default: undefined },
    locale: {
      type: String as PropType<RamadanOverlayConfig["locale"]>,
      default: undefined,
    },
    lanternStyle: {
      type: Number as PropType<RamadanOverlayConfig["lanternStyle"]>,
      default: undefined,
    },
    glowColor: { type: String as PropType<string>, default: undefined },
    region: {
      type: String as PropType<RamadanOverlayConfig["region"]>,
      default: undefined,
    },
    hijriAdjustment: { type: Number as PropType<number>, default: undefined },
    density: {
      type: String as PropType<RamadanOverlayConfig["density"]>,
      default: undefined,
    },
  },
  emits: ["ramadan-start", "ramadan-end"],
  setup(props, { emit }) {
    let instance: OverlayInstance | null = null;

    const mount = () => {
      instance?.destroy();
      // Individual props override the config object
      const { config, ...individualProps } = props;
      // Remove undefined entries so they don't overwrite config defaults
      const overrides = Object.fromEntries(
        Object.entries(individualProps).filter(([, v]) => v !== undefined),
      ) as Partial<RamadanOverlayConfig>;
      const merged: RamadanOverlayConfig = {
        ...config,
        ...overrides,
        onRamadanStart: (s) => emit("ramadan-start", s),
        onRamadanEnd: () => emit("ramadan-end"),
      };
      instance = init(merged);
    };

    onMounted(mount);

    watch(
      () => JSON.stringify(props),
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

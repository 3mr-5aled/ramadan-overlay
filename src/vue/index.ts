import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch,
  type PropType,
} from "vue";
import { getOccasionState, getRamadanState, init } from "../core/index";
import type {
  LanternStyle,
  Occasion,
  OverlayInstance,
  OverlayPosition,
  OverlayVariant,
  RamadanDateQuery,
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
  const state = ref<RamadanState>(getRamadanState(config));
  const instance = ref<OverlayInstance | null>(null);

  onMounted(() => {
    const overlay = init({
      ...config,
      onOccasionChange: (occasion, newState) => {
        state.value = newState;
        config.onOccasionChange?.(occasion, newState);
      },
    });
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
      type: String as PropType<OverlayVariant>,
      default: undefined,
    },
    position: {
      type: String as PropType<OverlayPosition>,
      default: undefined,
    },
    opacity: { type: Number as PropType<number>, default: undefined },
    colors: { type: Array as PropType<string[]>, default: undefined },
    zIndex: { type: Number as PropType<number>, default: undefined },
    autoTrigger: { type: Boolean as PropType<boolean>, default: undefined },
    previewMode: { type: Boolean as PropType<boolean>, default: undefined },
    confetti: {
      type: String as PropType<RamadanOverlayConfig["confetti"]>,
      default: undefined,
    },
    locale: {
      type: String as PropType<RamadanOverlayConfig["locale"]>,
      default: undefined,
    },
    lanternStyle: {
      type: Number as PropType<LanternStyle>,
      default: undefined,
    },
    ceilingColor: { type: String as PropType<string>, default: undefined },
    ropeColor: { type: String as PropType<string>, default: undefined },
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
    bannerBg: { type: String as PropType<string>, default: undefined },
    bannerTextColor: { type: String as PropType<string>, default: undefined },
    bannerTextEn: { type: String as PropType<string>, default: undefined },
    bannerTextAr: { type: String as PropType<string>, default: undefined },
    bannerIconColor: { type: String as PropType<string>, default: undefined },
    occasions: {
      type: Array as PropType<Occasion[]>,
      default: undefined,
    },
    eidVariant: {
      type: String as PropType<OverlayVariant>,
      default: undefined,
    },
    liveTransition: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
  },
  emits: ["ramadan-start", "ramadan-end", "eid-start", "occasion-change"],
  setup(props, { emit }) {
    let instance: OverlayInstance | null = null;

    const buildConfig = (): RamadanOverlayConfig => {
      const { config, ...individualProps } = props;
      const overrides = Object.fromEntries(
        Object.entries(individualProps).filter(([, v]) => v !== undefined)
      ) as Partial<RamadanOverlayConfig>;
      return {
        ...config,
        ...overrides,
        onRamadanStart: (s) => emit("ramadan-start", s),
        onRamadanEnd: () => emit("ramadan-end"),
        onEidStart: (s) => emit("eid-start", s),
        onOccasionChange: (occasion, s) => emit("occasion-change", occasion, s),
      };
    };

    onMounted(() => {
      instance = init(buildConfig());
    });

    watch(
      () => JSON.stringify(props),
      () => {
        const newConfig = buildConfig();
        if (!instance) {
          instance = init(newConfig);
        } else {
          instance.update(newConfig);
        }
      }
    );

    onUnmounted(() => {
      instance?.destroy();
      instance = null;
    });

    return () => null;
  },
});

export { getOccasionState, getRamadanState };
export type {
  Occasion,
  OverlayInstance,
  OverlayPosition,
  OverlayVariant,
  RamadanDateQuery,
  RamadanOverlayConfig,
  RamadanState,
};

import type {
  OverlayInstance,
  RamadanOverlayConfig,
  ResolvedConfig,
} from "../types";
import { fireRamadanConfetti, shouldFireConfetti } from "./confetti";
import { getRamadanState, resolveHijriOffset } from "./detector";
import { mountHost } from "./host";

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_COLORS = [
  "#c9a84c",
  "#e8c96b",
  "#8b4513",
  "#2d5a27",
  "#4a8a3a",
  "#fff7cc",
];

// ─── Config resolution ────────────────────────────────────────────────────────

function resolveConfig(userConfig: RamadanOverlayConfig): ResolvedConfig {
  const colors =
    userConfig.colors && userConfig.colors.length > 0
      ? userConfig.colors
      : [...DEFAULT_COLORS];

  return {
    variant: userConfig.variant ?? "lanterns",
    position: userConfig.position ?? "both",
    opacity: userConfig.opacity ?? 0.85,
    colors,
    zIndex: userConfig.zIndex ?? 9999,
    autoTrigger: userConfig.autoTrigger ?? true,
    previewMode: userConfig.previewMode ?? false,
    confetti: userConfig.confetti ?? "on",
    locale: userConfig.locale ?? "en",
    bannerBg: userConfig.bannerBg ?? "rgba(15,15,20,0.92)",
    bannerTextColor:
      userConfig.bannerTextColor ?? userConfig.colors?.[0] ?? DEFAULT_COLORS[0],
    bannerTextEn: userConfig.bannerTextEn ?? "",
    bannerTextAr: userConfig.bannerTextAr ?? "",
    bannerIconColor:
      userConfig.bannerIconColor ?? userConfig.colors?.[1] ?? DEFAULT_COLORS[1],
    lanternStyle: userConfig.lanternStyle ?? 0,
    glowColor: userConfig.glowColor ?? "rgba(201,168,76,0.55)",
    ceilingColor: userConfig.ceilingColor ?? "#c9a84c",
    ropeColor: userConfig.ropeColor ?? "#c9a84c",
    region: userConfig.region ?? "standard",
    hijriAdjustment: resolveHijriOffset(
      userConfig.region,
      userConfig.hijriAdjustment
    ),
    density:
      userConfig.density ??
      (typeof window !== "undefined" && window.innerWidth < 640
        ? "low"
        : "normal"),
    onRamadanStart: userConfig.onRamadanStart,
    onRamadanEnd: userConfig.onRamadanEnd,
  };
}

// ─── Public: init ─────────────────────────────────────────────────────────────

/**
 * Mount the Ramadan overlay.
 *
 * @example
 * ```ts
 * import { init } from 'ramadan-overlay';
 * const overlay = init({ variant: 'lanterns', previewMode: true });
 *
 * // Update styling dynamically:
 * overlay.update({ opacity: 0.5 });
 *
 * // Destroy when done:
 * overlay.destroy();
 * ```
 */
export function init(userConfig: RamadanOverlayConfig = {}): OverlayInstance {
  if (typeof document === "undefined") {
    // SSR — return a no-op instance
    return {
      destroy: () => undefined,
      update: () => undefined,
      container: null,
      state: {
        isRamadan: false,
        occasion: "none",
        isEid: false,
        hijriYear: 0,
        hijriMonth: 0,
        hijriDay: 0,
        dayNumber: 0,
      },
    };
  }

  let currentConfig = resolveConfig(userConfig);
  const state = getRamadanState({
    date: new Date(),
    region: currentConfig.region,
    hijriAdjustment: currentConfig.hijriAdjustment,
  });

  const shouldMount =
    currentConfig.previewMode || !currentConfig.autoTrigger || state.isRamadan;

  if (!shouldMount) {
    return {
      destroy: () => undefined,
      update: () => undefined,
      container: null,
      state,
    };
  }

  // Mount the host DOM structure
  let hostMount = mountHost(currentConfig);

  // Callbacks
  if (state.isRamadan || currentConfig.previewMode) {
    currentConfig.onRamadanStart?.(state);
  }

  // Confetti — runs async, non-blocking
  if (shouldFireConfetti(state, currentConfig.confetti)) {
    const confettiYear = state.hijriYear || 1447;
    void fireRamadanConfetti(confettiYear, currentConfig.colors);
  }

  const instance: OverlayInstance = {
    destroy: () => {
      hostMount.cleanup();
      instance.container = null;
      currentConfig.onRamadanEnd?.();
    },
    update: (partialConfig: Partial<RamadanOverlayConfig>) => {
      const newConfig = resolveConfig({
        ...currentConfig,
        ...partialConfig,
      });

      const bannerChanged =
        newConfig.variant === "banner" &&
        (newConfig.bannerBg !== currentConfig.bannerBg ||
          newConfig.bannerTextColor !== currentConfig.bannerTextColor ||
          newConfig.bannerTextEn !== currentConfig.bannerTextEn ||
          newConfig.bannerTextAr !== currentConfig.bannerTextAr ||
          newConfig.bannerIconColor !== currentConfig.bannerIconColor ||
          newConfig.locale !== currentConfig.locale);

      const structuralChange =
        newConfig.variant !== currentConfig.variant ||
        newConfig.position !== currentConfig.position ||
        newConfig.density !== currentConfig.density ||
        newConfig.lanternStyle !== currentConfig.lanternStyle ||
        bannerChanged;

      if (structuralChange) {
        hostMount.cleanup();
        hostMount = mountHost(newConfig);
        instance.container = hostMount.container;
      } else {
        hostMount.updateTokens(newConfig);
      }

      currentConfig = newConfig;
    },
    container: hostMount.container,
    state,
  };

  return instance;
}

// ─── Public: exports ──────────────────────────────────────────────────────────

export type {
  OverlayInstance,
  OverlayPosition,
  OverlayVariant,
  RamadanDateQuery,
  RamadanOverlayConfig,
  RamadanState,
} from "../types";
export { getRamadanState } from "./detector";

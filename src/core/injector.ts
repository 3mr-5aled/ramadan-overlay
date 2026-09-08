import type {
  OverlayInstance,
  OverlayVariant,
  RamadanOverlayConfig,
  RamadanState,
  ResolvedConfig,
} from "../types";
import { fireRamadanConfetti, shouldFireConfetti } from "./confetti";
import { getRamadanState, resolveHijriOffset } from "./detector";
import { mountHost, type HostMountResult } from "./host";

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_COLORS = [
  "#c9a84c",
  "#e8c96b",
  "#8b4513",
  "#2d5a27",
  "#4a8a3a",
  "#fff7cc",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMsUntilNextMidnight(): number {
  const now = new Date();
  const nextMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    1
  );
  return Math.max(1000, nextMidnight.getTime() - now.getTime());
}

function resolveEffectiveVariant(
  config: ResolvedConfig,
  state: RamadanState
): OverlayVariant {
  if (
    state.isEid &&
    (config.variant === "lanterns" || config.variant === "eid")
  ) {
    return config.eidVariant;
  }
  return config.variant;
}

function isOccasionActive(
  state: RamadanState,
  config: ResolvedConfig
): boolean {
  if (config.previewMode || !config.autoTrigger) return true;
  if (state.occasion === "none") return false;
  return config.occasions.includes(state.occasion);
}

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
    occasions: userConfig.occasions ?? ["ramadan", "eid-fitr", "eid-adha"],
    eidVariant: userConfig.eidVariant ?? "eid",
    liveTransition: userConfig.liveTransition ?? true,
    onRamadanStart: userConfig.onRamadanStart,
    onRamadanEnd: userConfig.onRamadanEnd,
    onEidStart: userConfig.onEidStart,
    onOccasionChange: userConfig.onOccasionChange,
  };
}

// ─── Public: init ─────────────────────────────────────────────────────────────

/**
 * Mount the Ramadan or Eid overlay.
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
  let currentState = getRamadanState({
    date: new Date(),
    region: currentConfig.region,
    hijriAdjustment: currentConfig.hijriAdjustment,
  });

  let hostMount: HostMountResult | null = null;
  let lastCheckedDateString = new Date().toDateString();

  const mountCurrent = (state: RamadanState): void => {
    const effectiveVariant = resolveEffectiveVariant(currentConfig, state);
    const effectiveConfig = { ...currentConfig, variant: effectiveVariant };
    hostMount = mountHost(effectiveConfig, state.occasion);
    instance.container = hostMount.container;
  };

  const unmountCurrent = (): void => {
    if (hostMount) {
      hostMount.cleanup();
      hostMount = null;
      instance.container = null;
    }
  };

  const fireOccasionCallbacks = (
    prevState: RamadanState | null,
    newState: RamadanState
  ): void => {
    if (!prevState || prevState.occasion !== newState.occasion) {
      currentConfig.onOccasionChange?.(newState.occasion, newState);
    }

    if (
      (newState.isRamadan || currentConfig.previewMode) &&
      (!prevState || !prevState.isRamadan)
    ) {
      currentConfig.onRamadanStart?.(newState);
    }

    if (newState.isEid && (!prevState || !prevState.isEid)) {
      currentConfig.onEidStart?.(newState);
    }

    if (prevState?.isRamadan && !newState.isRamadan) {
      currentConfig.onRamadanEnd?.();
    }

    if (shouldFireConfetti(newState, currentConfig.confetti)) {
      const confettiYear = newState.hijriYear || 1447;
      void fireRamadanConfetti(confettiYear, currentConfig.colors);
    }
  };

  // Live Midnight Transition Engine
  let midnightTimeoutId: ReturnType<typeof setTimeout> | null = null;

  const scheduleNextMidnight = (): void => {
    if (!currentConfig.liveTransition || typeof window === "undefined") return;
    if (midnightTimeoutId) clearTimeout(midnightTimeoutId);
    const msUntilMidnight = getMsUntilNextMidnight();
    midnightTimeoutId = setTimeout(() => {
      evaluateTransition();
    }, msUntilMidnight);
  };

  const evaluateTransition = (): void => {
    const now = new Date();
    lastCheckedDateString = now.toDateString();

    const newState = getRamadanState({
      date: now,
      region: currentConfig.region,
      hijriAdjustment: currentConfig.hijriAdjustment,
    });

    const prevState = currentState;
    const prevOccasion = prevState.occasion;
    const prevIsActive = isOccasionActive(prevState, currentConfig);
    const newIsActive = isOccasionActive(newState, currentConfig);

    currentState = newState;
    instance.state = newState;

    if (newIsActive) {
      if (!prevIsActive) {
        mountCurrent(newState);
        fireOccasionCallbacks(prevState, newState);
      } else if (prevOccasion !== newState.occasion) {
        unmountCurrent();
        mountCurrent(newState);
        fireOccasionCallbacks(prevState, newState);
      }
    } else if (prevIsActive) {
      unmountCurrent();
      currentConfig.onOccasionChange?.(newState.occasion, newState);
      if (prevState.isRamadan) {
        currentConfig.onRamadanEnd?.();
      }
    }

    scheduleNextMidnight();
  };

  const onBoundaryCheck = (): void => {
    const now = new Date();
    if (now.toDateString() !== lastCheckedDateString) {
      evaluateTransition();
    }
  };

  if (currentConfig.liveTransition && typeof document !== "undefined") {
    scheduleNextMidnight();
    document.addEventListener("visibilitychange", onBoundaryCheck);
    if (typeof window !== "undefined") {
      window.addEventListener("focus", onBoundaryCheck);
    }
  }

  const instance: OverlayInstance = {
    destroy: () => {
      if (midnightTimeoutId) {
        clearTimeout(midnightTimeoutId);
        midnightTimeoutId = null;
      }
      if (typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", onBoundaryCheck);
      }
      if (typeof window !== "undefined") {
        window.removeEventListener("focus", onBoundaryCheck);
      }
      unmountCurrent();
      if (currentState.isRamadan) {
        currentConfig.onRamadanEnd?.();
      }
    },
    update: (partialConfig: Partial<RamadanOverlayConfig>) => {
      const newConfig = resolveConfig({
        ...currentConfig,
        ...partialConfig,
      });

      const shouldBeMounted = isOccasionActive(currentState, newConfig);
      const wasMounted = !!hostMount;

      if (shouldBeMounted && !wasMounted) {
        currentConfig = newConfig;
        mountCurrent(currentState);
      } else if (!shouldBeMounted && wasMounted) {
        currentConfig = newConfig;
        unmountCurrent();
      } else if (hostMount) {
        const oldEffectiveVariant = resolveEffectiveVariant(
          currentConfig,
          currentState
        );
        const newEffectiveVariant = resolveEffectiveVariant(
          newConfig,
          currentState
        );

        const bannerChanged =
          newConfig.variant === "banner" &&
          (newConfig.bannerBg !== currentConfig.bannerBg ||
            newConfig.bannerTextColor !== currentConfig.bannerTextColor ||
            newConfig.bannerTextEn !== currentConfig.bannerTextEn ||
            newConfig.bannerTextAr !== currentConfig.bannerTextAr ||
            newConfig.bannerIconColor !== currentConfig.bannerIconColor ||
            newConfig.locale !== currentConfig.locale);

        const structuralChange =
          newEffectiveVariant !== oldEffectiveVariant ||
          newConfig.position !== currentConfig.position ||
          newConfig.density !== currentConfig.density ||
          newConfig.lanternStyle !== currentConfig.lanternStyle ||
          bannerChanged;

        currentConfig = newConfig;

        if (structuralChange) {
          unmountCurrent();
          mountCurrent(currentState);
        } else {
          hostMount.updateTokens(newConfig);
        }
      } else {
        currentConfig = newConfig;
      }

      if (currentConfig.liveTransition) {
        scheduleNextMidnight();
      } else if (midnightTimeoutId) {
        clearTimeout(midnightTimeoutId);
        midnightTimeoutId = null;
      }
    },
    container: null,
    state: currentState,
  };

  // Initial evaluation
  if (isOccasionActive(currentState, currentConfig)) {
    mountCurrent(currentState);
  }
  fireOccasionCallbacks(null, currentState);

  return instance;
}

// ─── Public: exports ──────────────────────────────────────────────────────────

export type {
  Occasion,
  OverlayInstance,
  OverlayPosition,
  OverlayVariant,
  RamadanDateQuery,
  RamadanOverlayConfig,
  RamadanState,
} from "../types";
export { getOccasionState, getRamadanState } from "./detector";

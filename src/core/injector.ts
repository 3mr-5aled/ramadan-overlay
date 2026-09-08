import type {
  OverlayInstance,
  OverlayPosition,
  OverlayVariant,
  RamadanOverlayConfig,
  RamadanState,
  ResolvedConfig,
  ThemeOption,
} from "../types";
import { fireRamadanConfetti, shouldFireConfetti } from "./confetti";
import { getRamadanState, resolveHijriOffset } from "./detector";
import { mountHost, resolveSidePositions, type HostMountResult } from "./host";
import {
  createCountdownManager,
  type IftarCountdownManager,
} from "./countdown";
import { resolveTheme } from "./themes";

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

function resolveEffectivePosition(config: ResolvedConfig): OverlayPosition {
  if (
    config.mobileSideBehavior === "top" &&
    resolveSidePositions(config.position).length > 0 &&
    typeof window !== "undefined" &&
    window.innerWidth < 768
  ) {
    return "top";
  }
  return config.position;
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
  const resolvedTheme = resolveTheme(userConfig.theme, userConfig);

  let position = userConfig.position ?? "both";
  if (
    userConfig.variant === "banner" &&
    ["left", "right", "sides", "start", "end"].includes(position)
  ) {
    if (typeof console !== "undefined" && console.warn) {
      console.warn(
        '[ramadan-overlay] Banner variant does not support vertical side positioning; falling back to "top"'
      );
    }
    position = "top";
  }

  return {
    theme: userConfig.theme ?? "classic",
    themeName: resolvedTheme.name ?? "classic",
    variant: userConfig.variant ?? "lanterns",
    position,
    mobileSideBehavior: userConfig.mobileSideBehavior ?? "hide",
    opacity: userConfig.opacity ?? 0.85,
    colors: resolvedTheme.colors,
    zIndex: userConfig.zIndex ?? 9999,
    autoTrigger: userConfig.autoTrigger ?? true,
    previewMode: userConfig.previewMode ?? false,
    confetti: userConfig.confetti ?? "on",
    locale: userConfig.locale ?? "en",
    bannerBg: resolvedTheme.bannerBg,
    bannerTextColor: resolvedTheme.bannerTextColor,
    bannerTextEn: userConfig.bannerTextEn ?? "",
    bannerTextAr: userConfig.bannerTextAr ?? "",
    bannerIconColor: resolvedTheme.bannerIconColor,
    lanternStyle: userConfig.lanternStyle ?? 0,
    glowColor: resolvedTheme.glowColor,
    ceilingColor: resolvedTheme.ceilingColor,
    ropeColor: resolvedTheme.ropeColor,
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
    countdown: userConfig.countdown ?? false,
    countdownBg: resolvedTheme.countdownBg,
    countdownBorder: resolvedTheme.countdownBorder,
    countdownAccent: resolvedTheme.countdownAccent,
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
      setTheme: () => undefined,
      container: null,
      config: resolveConfig(userConfig),
      state: {
        isRamadan: false,
        occasion: "none",
        isEid: false,
        hijriYear: 0,
        hijriMonth: 0,
        hijriDay: 0,
        dayNumber: 0,
      },
      getCountdownController: () => null,
      getState: () => ({
        isRamadan: false,
        occasion: "none",
        isEid: false,
        hijriYear: 0,
        hijriMonth: 0,
        hijriDay: 0,
        dayNumber: 0,
      }),
    };
  }

  let currentUserConfig: RamadanOverlayConfig = { ...userConfig };
  let currentConfig = resolveConfig(currentUserConfig);
  let currentState = getRamadanState({
    date: new Date(),
    region: currentConfig.region,
    hijriAdjustment: currentConfig.hijriAdjustment,
  });

  let hostMount: HostMountResult | null = null;
  let lastCheckedDateString = new Date().toDateString();

  const mountCurrent = (state: RamadanState): void => {
    const effectiveVariant = resolveEffectiveVariant(currentConfig, state);
    const effectivePosition = resolveEffectivePosition(currentConfig);
    const effectiveConfig = {
      ...currentConfig,
      variant: effectiveVariant,
      position: effectivePosition,
    };
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

  let lastEffectivePosition = resolveEffectivePosition(currentConfig);
  const onResizePositionCheck = (): void => {
    const newEffectivePosition = resolveEffectivePosition(currentConfig);
    if (newEffectivePosition !== lastEffectivePosition) {
      lastEffectivePosition = newEffectivePosition;
      if (hostMount && isOccasionActive(currentState, currentConfig)) {
        unmountCurrent();
        mountCurrent(currentState);
      }
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("resize", onResizePositionCheck, { passive: true });
  }

  const isCountdownActive = (
    state: RamadanState,
    config: ResolvedConfig
  ): boolean => state.isRamadan || config.previewMode || !config.autoTrigger;

  let countdownManager: IftarCountdownManager | null = null;
  if (currentConfig.countdown) {
    countdownManager = createCountdownManager(currentConfig.countdown, {
      isBannerActive: currentConfig.variant === "banner",
      hijriYear: currentState.hijriYear || 1447,
      colors: currentConfig.colors,
    });
    if (isCountdownActive(currentState, currentConfig)) {
      countdownManager.start();
    }
  }

  const instance: OverlayInstance = {
    destroy: () => {
      if (countdownManager) {
        countdownManager.destroy();
        countdownManager = null;
      }
      if (midnightTimeoutId) {
        clearTimeout(midnightTimeoutId);
        midnightTimeoutId = null;
      }
      if (typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", onBoundaryCheck);
      }
      if (typeof window !== "undefined") {
        window.removeEventListener("focus", onBoundaryCheck);
        window.removeEventListener("resize", onResizePositionCheck);
      }
      unmountCurrent();
      if (currentState.isRamadan) {
        currentConfig.onRamadanEnd?.();
      }
    },
    update: (partialConfig: Partial<RamadanOverlayConfig>) => {
      currentUserConfig = {
        ...currentUserConfig,
        ...partialConfig,
      };
      const newConfig = resolveConfig(currentUserConfig);

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
          (newConfig.bannerTextEn !== currentConfig.bannerTextEn ||
            newConfig.bannerTextAr !== currentConfig.bannerTextAr ||
            newConfig.locale !== currentConfig.locale);

        const oldEffectivePosition = resolveEffectivePosition(currentConfig);
        const newEffectivePosition = resolveEffectivePosition(newConfig);

        const structuralChange =
          newEffectiveVariant !== oldEffectiveVariant ||
          newEffectivePosition !== oldEffectivePosition ||
          newConfig.mobileSideBehavior !== currentConfig.mobileSideBehavior ||
          newConfig.density !== currentConfig.density ||
          newConfig.lanternStyle !== currentConfig.lanternStyle ||
          bannerChanged;

        currentConfig = newConfig;
        lastEffectivePosition = newEffectivePosition;

        if (structuralChange) {
          unmountCurrent();
          mountCurrent(currentState);
        } else {
          hostMount.updateTokens(newConfig);
        }
      } else {
        currentConfig = newConfig;
        lastEffectivePosition = resolveEffectivePosition(newConfig);
      }

      if (currentConfig.liveTransition) {
        scheduleNextMidnight();
      } else if (midnightTimeoutId) {
        clearTimeout(midnightTimeoutId);
        midnightTimeoutId = null;
      }

      if (partialConfig.countdown !== undefined) {
        if (countdownManager) {
          countdownManager.destroy();
          countdownManager = null;
        }
        if (newConfig.countdown) {
          countdownManager = createCountdownManager(newConfig.countdown, {
            isBannerActive: newConfig.variant === "banner",
            hijriYear: currentState.hijriYear || 1447,
            colors: newConfig.colors,
          });
          if (isCountdownActive(currentState, newConfig)) {
            countdownManager.start();
          }
        }
      }
    },
    setTheme: (theme: ThemeOption) => {
      instance.update({ theme });
    },
    container: null,
    state: currentState,
    get config() {
      return currentConfig;
    },
    getCountdownController: () =>
      countdownManager ? countdownManager.controller : null,
    getState: () => currentState,
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
  MobileSideBehavior,
  OverlayVariant,
  RamadanDateQuery,
  RamadanOverlayConfig,
  RamadanState,
  IftarCountdownConfig,
  IftarCountdownController,
  IftarCountdownLabels,
  IftarTimeResolver,
  IftarTimeValue,
  CountdownAnchorPosition,
  ThemePreset,
  ThemeDefinition,
  ThemeOption,
} from "../types";
export { getOccasionState, getRamadanState } from "./detector";
export * from "./countdown";

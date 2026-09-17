import type {
  ClearanceMode,
  HijriRegion,
  LayerStacking,
  MobileSideBehavior,
  Occasion,
  OverlayInstance,
  OverlayPosition,
  OverlayVariant,
  IntensityOption,
  RamadanOverlayConfig,
  RamadanState,
  ResolvedConfig,
  RopeStyle,
  ShadowMode,
  ThemeOption,
  ThemePreset,
} from "../types";
import { fireRamadanConfetti, shouldFireConfetti } from "./confetti";
import {
  getRamadanState,
  resolveHijriOffset,
  INERT_RAMADAN_STATE,
} from "./detector";
import {
  mountHost,
  resolveSidePositions,
  performHostRollback,
  type HostMountResult,
} from "./host";
import {
  createCountdownManager,
  type IftarCountdownManager,
} from "./countdown";
import { performCountdownHostRollback } from "./countdown/host";
import { resolveTheme } from "./themes";

// ─── Defaults & Validation Sets ──────────────────────────────────────────────

const VALID_THEMES: readonly ThemePreset[] = [
  "classic",
  "midnight",
  "emerald",
  "royal",
  "desert-dusk",
  "platinum-minimal",
  "rose-sahara",
];

const VALID_SHADOW_MODES: readonly ShadowMode[] = ["none", "soft", "deep"];

const VALID_VARIANTS: readonly OverlayVariant[] = [
  "lanterns",
  "crescent-stars",
  "geometric",
  "sparkles",
  "banner",
  "eid",
  "eid-fitr",
  "eid-adha",
];

const VALID_POSITIONS: readonly OverlayPosition[] = [
  "top",
  "bottom",
  "left",
  "right",
  "sides",
  "both",
  "full",
  "start",
  "end",
];

const VALID_DENSITIES = ["low", "normal", "high"] as const;
const VALID_ROPE_STYLES: readonly RopeStyle[] = [
  "straight",
  "u-shaped",
  "dual",
];
const VALID_OCCASIONS: readonly Occasion[] = [
  "ramadan",
  "eid-fitr",
  "eid-adha",
];
const VALID_MOBILE_SIDE_BEHAVIORS: readonly MobileSideBehavior[] = [
  "hide",
  "top",
  "show",
];
const VALID_CONFETTI_OPTIONS = ["on", "off"] as const;
const VALID_LOCALES = ["en", "ar"] as const;
const VALID_CLEARANCE_MODES: readonly ClearanceMode[] = ["edges", "full"];
const VALID_LAYER_STACKINGS: readonly LayerStacking[] = [
  "foreground",
  "background",
];

// ─── Defensive Helpers ────────────────────────────────────────────────────────

/**
 * Evaluates whether diagnostic logging should be active.
 * Hierarchy: explicit config.debug -> window.__RAMADAN_OVERLAY_DEBUG__ -> NODE_ENV !== 'production'.
 */
export function isDebugActive(config?: { debug?: boolean }): boolean {
  if (config && typeof config.debug === "boolean") {
    return config.debug;
  }
  if (
    typeof window !== "undefined" &&
    Boolean(
      (window as unknown as Record<string, unknown>).__RAMADAN_OVERLAY_DEBUG__
    ) === true
  ) {
    return true;
  }
  try {
    if (
      typeof process !== "undefined" &&
      process?.env?.NODE_ENV &&
      process.env.NODE_ENV !== "production"
    ) {
      return true;
    }
  } catch {
    // Suppress ReferenceError in restricted sandbox
  }
  return false;
}

/**
 * Safely clamp a numeric configuration value.
 * Falls back if the value is not a finite number or is NaN.
 */
export function clampNumber(
  val: unknown,
  min: number,
  max: number,
  fallback: number
): number {
  if (typeof val !== "number" || isNaN(val) || !isFinite(val)) {
    return fallback;
  }
  return Math.max(min, Math.min(max, val));
}

/**
 * Diagnostic Logger for consistent debug output.
 * Guarantees zero console noise in production when debug is falsy.
 */
export function createDiagnosticLogger(debug: boolean) {
  return {
    info: (msg: string, ...args: unknown[]) => {
      if (debug && typeof console !== "undefined" && console.info) {
        console.info(msg, ...args);
      }
    },
    warn: (msg: string, ...args: unknown[]) => {
      if (debug && typeof console !== "undefined" && console.warn) {
        console.warn(msg, ...args);
      }
    },
    error: (msg: string, ...args: unknown[]) => {
      if (debug && typeof console !== "undefined" && console.error) {
        console.error(msg, ...args);
      }
    },
  };
}

/**
 * Sanitize string union literal properties.
 * If unrecognized or malformed, emits a debug warning and returns fallback.
 */
export function sanitizeStringUnion<T extends string>(
  val: unknown,
  validList: readonly T[],
  fallback: T,
  propertyName: string,
  debug: boolean
): T {
  if (
    typeof val === "string" &&
    (validList as readonly string[]).includes(val)
  ) {
    return val as T;
  }
  if (val !== undefined) {
    createDiagnosticLogger(debug).warn(
      `[ramadan-overlay] Invalid ${propertyName} "${String(val)}"; falling back to "${fallback}".`
    );
  }
  return fallback;
}

/**
 * Deterministically removes partial overlay roots and styles on catastrophic failure.
 * Delegates cleanly to host modules to preserve architectural boundaries.
 */
export function performAtomicDomRollback(): void {
  performHostRollback();
  performCountdownHostRollback();
}

/**
 * Double-contained telemetry error invoker.
 * Prevents consumer onError callback errors from escaping and crashing the host.
 */
export function safeInvokeTelemetry(
  handler: ((error: unknown) => void) | undefined,
  error: unknown,
  debug: boolean
): void {
  if (typeof handler !== "function") return;
  try {
    handler(error);
  } catch (telemetryError) {
    createDiagnosticLogger(debug).warn(
      "[ramadan-overlay] Exception thrown inside consumer onError callback:",
      telemetryError
    );
  }
}

/**
 * Factory for creating an infallible safe no-op instance on failure or SSR.
 */
export function createSafeNoopInstance(
  config: ResolvedConfig,
  state: RamadanState = INERT_RAMADAN_STATE
): OverlayInstance {
  return {
    destroy: () => undefined,
    update: () => undefined,
    setTheme: () => undefined,
    container: null,
    config,
    state,
    getState: () => ({ ...state }),
    getCountdownController: () => null,
    countdown: null,
    fireConfetti: async () => undefined,
  };
}

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
  const debug = isDebugActive(userConfig);
  const logger = createDiagnosticLogger(debug);

  let theme: ThemeOption = "classic";
  if (typeof userConfig.theme === "string") {
    theme = sanitizeStringUnion(
      userConfig.theme,
      VALID_THEMES,
      "classic",
      "theme",
      debug
    );
  } else if (
    typeof userConfig.theme === "object" &&
    userConfig.theme !== null
  ) {
    theme = userConfig.theme;
  }

  const resolvedTheme = resolveTheme(theme, userConfig);

  const variant = sanitizeStringUnion(
    userConfig.variant,
    VALID_VARIANTS,
    "lanterns",
    "variant",
    debug
  );

  let position = sanitizeStringUnion(
    userConfig.position,
    VALID_POSITIONS,
    "both",
    "position",
    debug
  );
  if (
    variant === "banner" &&
    ["left", "right", "sides", "start", "end"].includes(position)
  ) {
    logger.warn(
      '[ramadan-overlay] Banner variant does not support vertical side positioning; falling back to "top"'
    );
    position = "top";
  }

  const defaultDensity =
    typeof window !== "undefined" && window.innerWidth < 640 ? "low" : "normal";
  const density = sanitizeStringUnion(
    userConfig.density,
    VALID_DENSITIES,
    defaultDensity,
    "density",
    debug
  );

  let rawRopeStyle = userConfig.ropeStyle as string | undefined;
  if (rawRopeStyle === "u-shape" || rawRopeStyle === "curved") {
    rawRopeStyle = "u-shaped";
  } else if (rawRopeStyle === "dual-rope") {
    rawRopeStyle = "dual";
  }

  const ropeStyle = sanitizeStringUnion(
    rawRopeStyle as RopeStyle | undefined,
    VALID_ROPE_STYLES,
    "straight",
    "ropeStyle",
    debug
  );

  const mobileSideBehavior = sanitizeStringUnion(
    userConfig.mobileSideBehavior,
    VALID_MOBILE_SIDE_BEHAVIORS,
    "hide",
    "mobileSideBehavior",
    debug
  );

  const confetti = sanitizeStringUnion(
    userConfig.confetti,
    VALID_CONFETTI_OPTIONS,
    "on",
    "confetti",
    debug
  );

  const locale = sanitizeStringUnion(
    userConfig.locale,
    VALID_LOCALES,
    "en",
    "locale",
    debug
  );

  const opacity = clampNumber(userConfig.opacity, 0.0, 1.0, 0.85);
  const zIndex = clampNumber(userConfig.zIndex, -2147483648, 2147483647, 9999);
  const ropeSag = clampNumber(userConfig.ropeSag, 6, 60, 20);

  const shadows = sanitizeStringUnion(
    userConfig.shadows,
    VALID_SHADOW_MODES,
    "soft",
    "shadows",
    debug
  );

  const defaultClearance: ClearanceMode = [
    "crescent-stars",
    "eid",
    "eid-fitr",
    "eid-adha",
  ].includes(variant)
    ? "edges"
    : "full";

  const clearance = sanitizeStringUnion(
    userConfig.clearance,
    VALID_CLEARANCE_MODES,
    defaultClearance,
    "clearance",
    debug
  );

  const layer = sanitizeStringUnion(
    userConfig.layer,
    VALID_LAYER_STACKINGS,
    "foreground",
    "layer",
    debug
  );

  let mountTarget: string | HTMLElement | undefined;
  if (
    typeof userConfig.mountTarget === "string" &&
    userConfig.mountTarget.trim().length > 0
  ) {
    mountTarget = userConfig.mountTarget.trim();
  } else if (
    typeof HTMLElement !== "undefined" &&
    userConfig.mountTarget instanceof HTMLElement
  ) {
    mountTarget = userConfig.mountTarget;
  }

  let occasions: Occasion[] = ["ramadan", "eid-fitr", "eid-adha"];
  if (Array.isArray(userConfig.occasions)) {
    const filtered = userConfig.occasions.filter((occ) =>
      VALID_OCCASIONS.includes(occ as Occasion)
    );
    if (filtered.length > 0) {
      occasions = filtered as Occasion[];
    }
  }

  let date: Date | undefined;
  if (userConfig.date instanceof Date) {
    date = isNaN(userConfig.date.getTime()) ? undefined : userConfig.date;
  } else if (
    typeof userConfig.date === "string" ||
    typeof userConfig.date === "number"
  ) {
    const parsed = new Date(userConfig.date);
    date = isNaN(parsed.getTime()) ? undefined : parsed;
  }

  let intensity: IntensityOption = "normal";
  if (typeof userConfig.intensity === "number") {
    intensity = Math.max(1, Math.min(10, Math.round(userConfig.intensity)));
  } else if (
    userConfig.intensity === "low" ||
    userConfig.intensity === "normal" ||
    userConfig.intensity === "high"
  ) {
    intensity = userConfig.intensity;
  } else if (
    userConfig.density === "low" ||
    userConfig.density === "normal" ||
    userConfig.density === "high"
  ) {
    intensity = userConfig.density;
  }

  return {
    date,
    debug,
    onError: userConfig.onError,
    theme: userConfig.theme ?? "classic",
    themeName: resolvedTheme.name ?? "classic",
    variant,
    position,
    clearance,
    layer,
    mountTarget,
    mobileSideBehavior,
    opacity,
    shadows,
    colors: resolvedTheme.colors,
    zIndex,
    autoTrigger: userConfig.autoTrigger ?? true,
    previewMode: userConfig.previewMode ?? false,
    confetti,
    locale,
    bannerBg: resolvedTheme.bannerBg,
    bannerTextColor: resolvedTheme.bannerTextColor,
    bannerTextEn: userConfig.bannerTextEn ?? "",
    bannerTextAr: userConfig.bannerTextAr ?? "",
    bannerIconColor: resolvedTheme.bannerIconColor,
    lanternStyle: userConfig.lanternStyle ?? 0,
    glowColor: resolvedTheme.glowColor,
    ceilingColor: resolvedTheme.ceilingColor,
    ropeColor: resolvedTheme.ropeColor,
    ropeStyle,
    ropeSag,
    region: userConfig.region ?? "standard",
    hijriAdjustment: resolveHijriOffset(
      userConfig.region,
      userConfig.hijriAdjustment
    ),
    density,
    intensity,
    occasions,
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
    return createSafeNoopInstance(
      resolveConfig(userConfig),
      INERT_RAMADAN_STATE
    );
  }

  let currentUserConfig: RamadanOverlayConfig = { ...userConfig };
  let currentConfig: ResolvedConfig;
  try {
    currentConfig = resolveConfig(currentUserConfig);
  } catch {
    currentConfig = resolveConfig({});
  }
  const debug = isDebugActive(currentConfig);

  try {
    let currentState = getRamadanState({
      date: currentConfig.date ?? new Date(),
      region: currentConfig.region,
      hijriAdjustment: currentConfig.hijriAdjustment,
    });

    const logger = createDiagnosticLogger(debug);

    if (
      currentConfig.autoTrigger &&
      !currentConfig.previewMode &&
      currentState.occasion === "none"
    ) {
      const evalDate = currentConfig.date ?? new Date();
      logger.info(
        `[ramadan-overlay] Overlay dormant: autoTrigger is enabled, but current date (${evalDate.toISOString().slice(0, 10)}) does not fall within configured occasions (${currentConfig.occasions.join(", ")}). Pass previewMode: true to force display during development.`
      );
    }

    if (currentConfig.previewMode) {
      logger.info(
        "[ramadan-overlay] Preview mode active: overlay forced visible regardless of Hijri calendar date."
      );
    }

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

      if (
        shouldFireConfetti(
          newState,
          currentConfig.confetti,
          currentConfig.previewMode
        )
      ) {
        const confettiYear = newState.hijriYear || 1447;
        void fireRamadanConfetti(confettiYear, currentConfig.colors);
      }
    };

    // Live Midnight Transition Engine
    let midnightTimeoutId: ReturnType<typeof setTimeout> | null = null;

    const scheduleNextMidnight = (): void => {
      if (!currentConfig.liveTransition || typeof window === "undefined")
        return;
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
      window.addEventListener("resize", onResizePositionCheck, {
        passive: true,
      });
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
        try {
          currentUserConfig = {
            ...currentUserConfig,
            ...partialConfig,
          };
          const newConfig = resolveConfig(currentUserConfig);

          if (
            partialConfig.date !== undefined ||
            partialConfig.region !== undefined ||
            partialConfig.hijriAdjustment !== undefined
          ) {
            const previousState = currentState;
            currentState = getRamadanState({
              date: newConfig.date ?? new Date(),
              region: newConfig.region,
              hijriAdjustment: newConfig.hijriAdjustment,
            });
            instance.state = currentState;
            if (previousState.occasion !== currentState.occasion) {
              fireOccasionCallbacks(previousState, currentState);
            }
          }

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
              (JSON.stringify(newConfig.bannerTextEn) !==
                JSON.stringify(currentConfig.bannerTextEn) ||
                JSON.stringify(newConfig.bannerTextAr) !==
                  JSON.stringify(currentConfig.bannerTextAr) ||
                newConfig.locale !== currentConfig.locale);

            const oldEffectivePosition =
              resolveEffectivePosition(currentConfig);
            const newEffectivePosition = resolveEffectivePosition(newConfig);

            const structuralChange =
              newEffectiveVariant !== oldEffectiveVariant ||
              newEffectivePosition !== oldEffectivePosition ||
              newConfig.mobileSideBehavior !==
                currentConfig.mobileSideBehavior ||
              newConfig.density !== currentConfig.density ||
              newConfig.intensity !== currentConfig.intensity ||
              newConfig.lanternStyle !== currentConfig.lanternStyle ||
              newConfig.ropeStyle !== currentConfig.ropeStyle ||
              newConfig.ropeSag !== currentConfig.ropeSag ||
              newConfig.clearance !== currentConfig.clearance ||
              newConfig.mountTarget !== currentConfig.mountTarget ||
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
        } catch (updateError) {
          safeInvokeTelemetry(currentUserConfig.onError, updateError, debug);
          logger.error(
            "[ramadan-overlay] Dynamic update error caught by containment boundary:",
            updateError
          );
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
      get countdown() {
        return countdownManager ? countdownManager.controller : null;
      },
      getState: () => currentState,
      fireConfetti: async () => {
        const confettiYear = currentState.hijriYear || 1447;
        await fireRamadanConfetti(confettiYear, currentConfig.colors);
      },
    };

    // Initial evaluation
    if (isOccasionActive(currentState, currentConfig)) {
      mountCurrent(currentState);
    }
    fireOccasionCallbacks(null, currentState);

    return instance;
  } catch (catastrophicError) {
    performAtomicDomRollback();
    safeInvokeTelemetry(userConfig.onError, catastrophicError, debug);
    createDiagnosticLogger(debug).error(
      "[ramadan-overlay] Catastrophic initialization error caught by containment boundary:",
      catastrophicError
    );
    return createSafeNoopInstance(currentConfig, INERT_RAMADAN_STATE);
  }
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

/**
 * MotionEngine — Unified animation scheduling, tab visibility synchronization,
 * and reduced-motion constraints.
 */

import type { IntensityMode, IntensityOption } from "../types";

export type TickFn = (dt: number) => void;

export interface MotionEngineOptions {
  /** If false, animations run regardless of system reduced-motion preference. Defaults to true. */
  respectReducedMotion?: boolean;
}

export interface MotionEngine {
  isMotionAllowed(): boolean;
  scheduleRender(fn: TickFn): () => void;
  destroy(): void;
}

/**
 * Returns true if animations are permitted by the user's environment.
 * Respects CSS `prefers-reduced-motion: reduce` when `respectReducedMotion` is true.
 */
export function isMotionAllowed(respectReducedMotion = true): boolean {
  if (typeof window === "undefined") return false;
  if (!respectReducedMotion) return true;
  return !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Creates an isolated MotionEngine instance managing animation scheduling and tab visibility.
 */
export function createMotionEngine(
  options: MotionEngineOptions = {}
): MotionEngine {
  const respectReducedMotion = options.respectReducedMotion ?? true;
  const subscribers = new Set<TickFn>();
  let rafId: number | null = null;
  let lastTime = 0;
  let isListeningVisibility = false;

  const onVisibilityChange = (): void => {
    if (typeof document === "undefined") return;
    if (!document.hidden && subscribers.size > 0 && rafId === null) {
      if (isListeningVisibility) {
        document.removeEventListener("visibilitychange", onVisibilityChange);
        isListeningVisibility = false;
      }
      lastTime =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      rafId = requestAnimationFrame(loop);
    }
  };

  const loop = (now: number): void => {
    if (typeof document !== "undefined" && document.hidden) {
      // Pause loop without busy-looping on rAF
      rafId = null;
      if (!isListeningVisibility) {
        isListeningVisibility = true;
        document.addEventListener("visibilitychange", onVisibilityChange);
      }
      return;
    }

    const dt = now - lastTime;
    lastTime = now;
    subscribers.forEach((fn) => fn(dt));
    rafId = subscribers.size > 0 ? requestAnimationFrame(loop) : null;
  };

  const startLoopIfNeeded = (): void => {
    if (rafId !== null) return;
    if (typeof document !== "undefined" && document.hidden) {
      if (!isListeningVisibility) {
        isListeningVisibility = true;
        document.addEventListener("visibilitychange", onVisibilityChange);
      }
      return;
    }
    lastTime =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    rafId = requestAnimationFrame(loop);
  };

  return {
    isMotionAllowed: () => isMotionAllowed(respectReducedMotion),
    scheduleRender: (fn: TickFn): (() => void) => {
      if (!isMotionAllowed(respectReducedMotion)) {
        return () => undefined;
      }

      subscribers.add(fn);
      startLoopIfNeeded();

      return () => {
        subscribers.delete(fn);
        if (subscribers.size === 0) {
          if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
          if (isListeningVisibility && typeof document !== "undefined") {
            document.removeEventListener(
              "visibilitychange",
              onVisibilityChange
            );
            isListeningVisibility = false;
          }
        }
      };
    },
    destroy: () => {
      subscribers.clear();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (isListeningVisibility && typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", onVisibilityChange);
        isListeningVisibility = false;
      }
    },
  };
}

const defaultEngine = createMotionEngine();

/**
 * Register a frame update callback using the default motion engine.
 */
export function scheduleRender(fn: TickFn): () => void {
  return defaultEngine.scheduleRender(fn);
}

/**
 * Resolves an intensity option (preset or 1..10 numeric) and falls back to density or 'normal'.
 */
export function resolveIntensityValue(
  intensity?: IntensityOption,
  density?: "low" | "normal" | "high"
): number {
  if (typeof intensity === "number") {
    return Math.min(10, Math.max(1, Math.round(intensity)));
  }
  const mode =
    intensity && intensity !== "normal"
      ? intensity
      : (density ?? intensity ?? "normal");

  if (mode === "low") return 3;
  if (mode === "high") return 8;
  return 5;
}

/**
 * Calculates item density for ascending flying shapes.
 */
export function calculateAscendingItemCount(
  intensityValue: number,
  isMobile = false
): number {
  const base = Math.round(5 + intensityValue * 3.1);
  if (isMobile) {
    return Math.max(4, Math.round(base * 0.6));
  }
  return base;
}

/**
 * Calculates duration range (in seconds) for ascending flying shapes.
 * Higher intensity yields faster ascent velocities.
 */
export function calculateAscendingDurationRange(intensityValue: number): {
  minDuration: number;
  maxDuration: number;
} {
  const minDuration = Math.max(4, 18.5 - intensityValue * 1.35);
  const spread = Math.max(3, 9 - intensityValue * 0.5);
  return {
    minDuration: Number(minDuration.toFixed(1)),
    maxDuration: Number((minDuration + spread).toFixed(1)),
  };
}

import type {
  OverlayInstance,
  RamadanOverlayConfig,
  ResolvedConfig,
  VariantMountFn,
} from "../types";
import { fireRamadanConfetti, shouldFireConfetti } from "./confetti";
import { getRamadanState } from "./detector";
import { mountCrescentStars } from "./variants/crescent-stars";
import { mountGeometric } from "./variants/geometric";
import { mountLanterns } from "./variants/lanterns";
import { mountMinimal } from "./variants/minimal";
import { mountSparkles } from "./variants/sparkles";

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_COLORS = [
  "#c9a84c",
  "#e8c96b",
  "#8b4513",
  "#2d5a27",
  "#4a8a3a",
  "#fff7cc",
];

const VARIANT_MAP: Record<string, VariantMountFn> = {
  lanterns: mountLanterns,
  "crescent-stars": mountCrescentStars,
  geometric: mountGeometric,
  sparkles: mountSparkles,
  minimal: mountMinimal,
};

// ─── Config resolution ────────────────────────────────────────────────────────

function resolveConfig(userConfig: RamadanOverlayConfig): ResolvedConfig {
  return {
    variant: userConfig.variant ?? "lanterns",
    position: userConfig.position ?? "both",
    opacity: userConfig.opacity ?? 0.85,
    colors: userConfig.colors?.length ? userConfig.colors : [...DEFAULT_COLORS],
    zIndex: userConfig.zIndex ?? 9999,
    autoTrigger: userConfig.autoTrigger ?? true,
    previewMode: userConfig.previewMode ?? false,
    confetti: userConfig.confetti ?? true,
    locale: userConfig.locale ?? "en",
    onRamadanStart: userConfig.onRamadanStart,
    onRamadanEnd: userConfig.onRamadanEnd,
  };
}

// ─── CSS injection ────────────────────────────────────────────────────────────

const STYLE_ID = "ramadan-overlay-styles";

function injectStyles(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;

  // Styles are inlined at build time via the CSS-in-JS approach to avoid
  // requiring a separate CSS import step from consumers.
  const css = `
#ramadan-overlay-root{--ro-color-1:#c9a84c;--ro-color-2:#e8c96b;--ro-color-3:#8b4513;--ro-color-4:#2d5a27;--ro-color-5:#1a3a1a;--ro-opacity:0.85;--ro-z:9999;position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:var(--ro-z);overflow:hidden;opacity:var(--ro-opacity);will-change:opacity;contain:strict}
#ramadan-overlay-root .ro-lantern-row{position:absolute;top:0;left:0;width:100%;display:flex;justify-content:space-around;align-items:flex-start}
#ramadan-overlay-root .ro-lantern{display:flex;flex-direction:column;align-items:center;transform-origin:top center;animation:ro-swing var(--ro-swing-duration,3s) ease-in-out infinite alternate}
#ramadan-overlay-root .ro-lantern svg{width:var(--ro-lantern-size,clamp(28px,4vw,60px));height:auto;filter:drop-shadow(0 2px 6px rgba(201,168,76,0.5))}
#ramadan-overlay-root .ro-lantern-string{width:1px;height:var(--ro-string-height,clamp(20px,3vw,48px));background:var(--ro-color-1);opacity:.7}
#ramadan-overlay-root .ro-crescent,#ramadan-overlay-root .ro-star{position:absolute;animation:ro-float var(--ro-float-duration,6s) ease-in-out infinite alternate}
#ramadan-overlay-root .ro-sparkle{position:absolute;border-radius:50%;background:var(--ro-color-2);opacity:0}
#ramadan-overlay-root .ro-border-top,#ramadan-overlay-root .ro-border-bottom{position:absolute;left:0;width:100%;overflow:hidden}
#ramadan-overlay-root .ro-border-top{top:0}
#ramadan-overlay-root .ro-border-bottom{bottom:0}
#ramadan-overlay-root .ro-geo-band{position:absolute;left:0;width:100%;overflow:hidden;opacity:.6}
#ramadan-overlay-root .ro-geo-band--top{top:0}
#ramadan-overlay-root .ro-geo-band--bottom{bottom:0}
#ramadan-overlay-root .ro-geo-band svg{width:100%;height:100%}
@keyframes ro-swing{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}
@keyframes ro-float{from{transform:translateY(0) rotate(0deg);opacity:.7}to{transform:translateY(-12px) rotate(10deg);opacity:1}}
@media(prefers-reduced-motion:reduce){#ramadan-overlay-root *{animation:none!important;transition:none!important}}
  `;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = css;
  document.head.appendChild(style);
}

// ─── Apply config tokens ──────────────────────────────────────────────────────

function applyTokens(root: HTMLElement, config: ResolvedConfig): void {
  const el = root.style;
  el.setProperty("--ro-opacity", String(config.opacity));
  el.setProperty("--ro-z", String(config.zIndex));
  config.colors.forEach((c, i) => {
    el.setProperty(`--ro-color-${i + 1}`, c);
  });
}

// ─── Public: init ─────────────────────────────────────────────────────────────

/**
 * Mount the Ramadan overlay.
 *
 * @example
 * ```ts
 * import { init } from 'ramadan-overlay';
 * const overlay = init({ variant: 'lanterns', previewMode: true });
 * // later:
 * overlay.destroy();
 * ```
 */
export function init(userConfig: RamadanOverlayConfig = {}): OverlayInstance {
  if (typeof document === "undefined") {
    // SSR — return a no-op instance
    return {
      destroy: () => undefined,
      container: null,
      state: {
        isRamadan: false,
        isFirstDay: false,
        hijriYear: 0,
        dayNumber: 0,
      },
    };
  }

  const config = resolveConfig(userConfig);
  const state = getRamadanState();

  const shouldMount =
    config.previewMode || !config.autoTrigger || state.isRamadan;

  if (!shouldMount) {
    return { destroy: () => undefined, container: null, state };
  }

  // Inject base styles once
  injectStyles();

  // Build root container
  const root = document.createElement("div");
  root.id = "ramadan-overlay-root";
  root.setAttribute("aria-hidden", "true");
  root.setAttribute("role", "presentation");
  applyTokens(root, config);

  document.body.appendChild(root);

  // Mount the chosen variant
  const mountFn = VARIANT_MAP[config.variant] ?? mountLanterns;
  const cleanupVariant = mountFn(root, config);

  // Callbacks
  if (state.isRamadan || config.previewMode) {
    config.onRamadanStart?.(state);
  }

  // Day-1 confetti (runs async, non-blocking)
  if (
    shouldFireConfetti(state, config.confetti) ||
    (config.previewMode && config.confetti)
  ) {
    const confettiYear = state.hijriYear || 1447;
    void fireRamadanConfetti(confettiYear, config.colors);
  }

  // Cleanup
  const destroy = (): void => {
    cleanupVariant();
    root.remove();
    config.onRamadanEnd?.();
  };

  return { destroy, container: root, state };
}

// ─── Public: isRamadan helper ─────────────────────────────────────────────────

export type {
  OverlayInstance,
  OverlayPosition,
  OverlayVariant,
  RamadanOverlayConfig,
  RamadanState,
} from "../types";
export { getRamadanState } from "./detector";

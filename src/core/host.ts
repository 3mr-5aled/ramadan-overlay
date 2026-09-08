import type {
  Occasion,
  OverlayPosition,
  ResolvedConfig,
  VariantMountFn,
} from "../types";
import { mountBannerElements } from "./variants/banner";
import { mountCrescentStars } from "./variants/crescent-stars";
import { mountEid } from "./variants/eid";
import { mountGeometric } from "./variants/geometric";
import { mountLanterns } from "./variants/lanterns";
import { mountSparkles } from "./variants/sparkles";

export function resolveSidePositions(
  pos: OverlayPosition,
  isRtl = typeof document !== "undefined" &&
    (document.documentElement.dir === "rtl" || document.body?.dir === "rtl")
): Array<"left" | "right"> {
  switch (pos) {
    case "left":
      return ["left"];
    case "right":
      return ["right"];
    case "sides":
      return ["left", "right"];
    case "start":
      return [isRtl ? "right" : "left"];
    case "end":
      return [isRtl ? "left" : "right"];
    default:
      return [];
  }
}

export function calculateParticleCoords(position: OverlayPosition): {
  x: number;
  y: number;
} {
  const sidePositions = resolveSidePositions(position);
  if (sidePositions.length > 0) {
    const side =
      sidePositions[Math.floor(Math.random() * sidePositions.length)];
    return {
      x: side === "left" ? Math.random() * 3.5 : 96.5 + Math.random() * 3.5,
      y: Math.random() * 90,
    };
  }
  if (position === "top") {
    return { x: Math.random() * 95, y: Math.random() * 25 };
  }
  if (position === "bottom") {
    return { x: Math.random() * 95, y: 75 + Math.random() * 20 };
  }
  if (position === "full") {
    return { x: Math.random() * 95, y: Math.random() * 90 };
  }
  // 'both'
  return {
    x: Math.random() * 95,
    y: Math.random() < 0.5 ? Math.random() * 25 : 75 + Math.random() * 20,
  };
}

const VARIANT_MAP: Record<string, VariantMountFn> = {
  lanterns: mountLanterns,
  "crescent-stars": mountCrescentStars,
  geometric: mountGeometric,
  sparkles: mountSparkles,
  eid: mountEid,
  "eid-fitr": mountEid,
  "eid-adha": mountEid,
};

export const HOST_ID = "ramadan-overlay-root";
export const STYLE_ID = "ramadan-overlay-styles";

export function performHostRollback(): void {
  try {
    if (typeof document === "undefined") return;
    document.getElementById(HOST_ID)?.remove();
    document.getElementById(STYLE_ID)?.remove();
  } catch {
    // Suppress DOM removal errors in restrictive environments
  }
}

export function injectStyles(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;

  const css = `
#ramadan-overlay-root{--ro-color-1:#c9a84c;--ro-color-2:#e8c96b;--ro-color-3:#8b4513;--ro-color-4:#2d5a27;--ro-color-5:#1a3a1a;--ro-opacity:0.85;--ro-z:9999;--ro-gutter-width:clamp(28px,4vw,64px);--ro-lantern-side-size:clamp(20px,2.8vw,36px);position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:var(--ro-z);overflow:hidden;opacity:var(--ro-opacity);will-change:opacity;contain:strict}
#ramadan-overlay-root .ro-lantern-row{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:2}
#ramadan-overlay-root .ro-lantern{position:absolute;display:flex;flex-direction:column;align-items:center;translate:-50% 0;transform-origin:top center;animation:ro-swing var(--ro-swing-duration,3s) ease-in-out infinite alternate}
#ramadan-overlay-root .ro-lantern svg{width:var(--ro-lantern-size,clamp(18px,2.5vw,38px));height:auto;animation:ro-glow-pulse 2.5s ease-in-out infinite;will-change:transform,opacity}
#ramadan-overlay-root .ro-lantern-string{width:1px;height:var(--ro-string-height,clamp(20px,3vw,48px));background:var(--ro-color-1);opacity:.7}
#ramadan-overlay-root .ro-lantern-ropes{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;shape-rendering:geometricPrecision}
#ramadan-overlay-root .ro-rope-path{fill:none;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
#ramadan-overlay-root .ro-dropline-path{fill:none;stroke-linecap:round;vector-effect:non-scaling-stroke}
#ramadan-overlay-root .ro-lantern-side,#ramadan-overlay-root .ro-side-band{position:fixed;top:0;bottom:0;height:100vh;height:100dvh;width:var(--ro-gutter-width,clamp(28px,4vw,64px));pointer-events:none;overflow:hidden;contain:strict;z-index:var(--ro-z,9999)}
#ramadan-overlay-root .ro-lantern-side--left,#ramadan-overlay-root .ro-side-band--left{left:0}
#ramadan-overlay-root .ro-lantern-side--right,#ramadan-overlay-root .ro-side-band--right{right:0}
#ramadan-overlay-root .ro-lantern-spine{position:absolute;top:0;bottom:0;left:50%;width:2px;transform:translateX(-50%);background:linear-gradient(180deg,transparent 0%,var(--ro-ceiling,#8b4513) 5%,var(--ro-ceiling,#8b4513) 95%,transparent 100%);opacity:0.5}
#ramadan-overlay-root .ro-lantern-unit{position:absolute;left:50%;transform-origin:top center;animation:ro-swing-side var(--ro-swing-duration,3.5s) ease-in-out infinite alternate;will-change:transform}
#ramadan-overlay-root .ro-lantern-dropline{width:1.5px;height:24px;margin:0 auto;background:var(--ro-rope,#8b4513)}
#ramadan-overlay-root .ro-lantern-svg-wrap svg{display:block;width:var(--ro-lantern-side-size,clamp(20px,2.8vw,36px));height:auto;filter:drop-shadow(0 2px 8px rgba(232,201,107,0.4))}
#ramadan-overlay-root .ro-side-band svg{width:100%;height:100%;display:block}
#ramadan-overlay-root .ro-crescent,#ramadan-overlay-root .ro-star,#ramadan-overlay-root .ro-balloon,#ramadan-overlay-root .ro-gift,#ramadan-overlay-root .ro-sheep,#ramadan-overlay-root .ro-kaaba{position:absolute;animation:ro-float var(--ro-float-duration,6s) ease-in-out infinite alternate;will-change:transform,opacity}
#ramadan-overlay-root .ro-sparkle{position:absolute;border-radius:50%;background:var(--ro-color-2);opacity:0;will-change:transform,opacity}
#ramadan-overlay-root .ro-geo-band{position:absolute;left:0;width:100%;overflow:hidden;opacity:.6}
#ramadan-overlay-root .ro-geo-band--top{top:0}
#ramadan-overlay-root .ro-geo-band--bottom{bottom:0}
#ramadan-overlay-root .ro-geo-band svg{width:100%;height:100%}
@keyframes ro-swing{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}
@keyframes ro-swing-side{0%{transform:translateX(-50%) rotate(-3.5deg)}100%{transform:translateX(-50%) rotate(3.5deg)}}
@keyframes ro-float{from{transform:translateY(0) rotate(0deg);opacity:.7}to{transform:translateY(-12px) rotate(10deg);opacity:1}}
@keyframes ro-glow-pulse{0%,100%{filter:drop-shadow(0 2px 6px var(--ro-glow,rgba(201,168,76,0.5)))}50%{filter:drop-shadow(0 2px 18px var(--ro-glow,rgba(201,168,76,0.9))) drop-shadow(0 0 8px var(--ro-glow,rgba(201,168,76,0.6)))}}
@media(prefers-reduced-motion:reduce){#ramadan-overlay-root *{animation:none!important;transition:none!important}}
@media (max-width: 767px){#ramadan-overlay-root[data-mobile-side="hide"] .ro-lantern-side,#ramadan-overlay-root[data-mobile-side="hide"] .ro-side-band,#ramadan-overlay-root[data-mobile-side="hide"][data-is-side="true"] > *{display:none!important}}
  `;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = css;
  document.head.appendChild(style);
}

export function applyTokens(root: HTMLElement, config: ResolvedConfig): void {
  const el = root.style;
  el.setProperty("--ro-opacity", String(config.opacity));
  el.setProperty("--ro-z", String(config.zIndex));
  el.setProperty("--ro-glow", config.glowColor);
  el.setProperty("--ro-ceiling", config.ceilingColor);
  el.setProperty("--ro-rope", config.ropeColor);
  el.setProperty("--ro-banner-bg", config.bannerBg);
  el.setProperty("--ro-banner-text", config.bannerTextColor);
  el.setProperty("--ro-banner-icon", config.bannerIconColor);

  if (config.countdownBg) {
    el.setProperty("--ro-countdown-bg", config.countdownBg);
  }
  if (config.countdownBorder) {
    el.setProperty("--ro-countdown-border", config.countdownBorder);
  }
  if (config.countdownAccent) {
    el.setProperty("--ro-countdown-gold", config.countdownAccent);
  }

  config.colors.forEach((c, i) => {
    el.setProperty(`--ro-color-${i + 1}`, c);
  });
  root.setAttribute("data-theme", config.themeName ?? "classic");
  root.setAttribute("data-mobile-side", config.mobileSideBehavior);
  root.setAttribute("data-position", config.position);
  if (resolveSidePositions(config.position).length > 0) {
    root.setAttribute("data-is-side", "true");
  } else {
    root.removeAttribute("data-is-side");
  }
}

export interface HostMountResult {
  container: HTMLElement;
  cleanup: () => void;
  updateTokens: (config: ResolvedConfig) => void;
}

export function mountHost(
  config: ResolvedConfig,
  occasion?: Occasion
): HostMountResult {
  if (config.variant === "banner") {
    return mountBannerHost(config, occasion);
  }
  return mountOverlayHost(config, occasion);
}

function mountOverlayHost(
  config: ResolvedConfig,
  occasion?: Occasion
): HostMountResult {
  injectStyles();

  const root = document.createElement("div");
  root.id = "ramadan-overlay-root";
  root.setAttribute("aria-hidden", "true");
  root.setAttribute("role", "presentation");
  applyTokens(root, config);

  document.body.appendChild(root);

  const mountFn = VARIANT_MAP[config.variant] ?? mountLanterns;
  const cleanupVariant = mountFn(root, config, occasion);

  const onVisibilityChange = (): void => {
    root.style.visibility = document.hidden ? "hidden" : "";
  };
  document.addEventListener("visibilitychange", onVisibilityChange);

  const cleanup = (): void => {
    cleanupVariant();
    document.removeEventListener("visibilitychange", onVisibilityChange);
    root.remove();
  };

  const updateTokens = (newConfig: ResolvedConfig): void => {
    applyTokens(root, newConfig);
  };

  return { container: root, cleanup, updateTokens };
}

function mountBannerHost(
  config: ResolvedConfig,
  occasion?: Occasion
): HostMountResult {
  const { elements, cleanup: cleanupBanner } = mountBannerElements(
    config,
    occasion
  );
  const container = elements[0] ?? document.body;

  const updateTokens = (newConfig: ResolvedConfig): void => {
    for (const el of elements) {
      el.style.setProperty("--ro-banner-bg", newConfig.bannerBg);
      el.style.setProperty("--ro-banner-text", newConfig.bannerTextColor);
      el.style.setProperty("--ro-banner-icon", newConfig.bannerIconColor);
    }
  };

  return { container, cleanup: cleanupBanner, updateTokens };
}

import type { ResolvedConfig, VariantMountFn } from "../types";
import { mountBannerElements } from "./variants/banner";
import { mountCrescentStars } from "./variants/crescent-stars";
import { mountGeometric } from "./variants/geometric";
import { mountLanterns } from "./variants/lanterns";
import { mountSparkles } from "./variants/sparkles";

const VARIANT_MAP: Record<string, VariantMountFn> = {
  lanterns: mountLanterns,
  "crescent-stars": mountCrescentStars,
  geometric: mountGeometric,
  sparkles: mountSparkles,
};

const STYLE_ID = "ramadan-overlay-styles";

export function injectStyles(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;

  const css = `
#ramadan-overlay-root{--ro-color-1:#c9a84c;--ro-color-2:#e8c96b;--ro-color-3:#8b4513;--ro-color-4:#2d5a27;--ro-color-5:#1a3a1a;--ro-opacity:0.85;--ro-z:9999;position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:var(--ro-z);overflow:hidden;opacity:var(--ro-opacity);will-change:opacity;contain:strict}
#ramadan-overlay-root .ro-lantern-row{position:absolute;top:0;left:0;width:100%;display:flex;justify-content:space-around;align-items:flex-start}
#ramadan-overlay-root .ro-lantern{display:flex;flex-direction:column;align-items:center;transform-origin:top center;animation:ro-swing var(--ro-swing-duration,3s) ease-in-out infinite alternate}
#ramadan-overlay-root .ro-lantern svg{width:var(--ro-lantern-size,clamp(18px,2.5vw,38px));height:auto;animation:ro-glow-pulse 2.5s ease-in-out infinite;will-change:transform,opacity}
#ramadan-overlay-root .ro-lantern-string{width:1px;height:var(--ro-string-height,clamp(20px,3vw,48px));background:var(--ro-color-1);opacity:.7}
#ramadan-overlay-root .ro-crescent,#ramadan-overlay-root .ro-star{position:absolute;animation:ro-float var(--ro-float-duration,6s) ease-in-out infinite alternate;will-change:transform,opacity}
#ramadan-overlay-root .ro-sparkle{position:absolute;border-radius:50%;background:var(--ro-color-2);opacity:0;will-change:transform,opacity}
#ramadan-overlay-root .ro-geo-band{position:absolute;left:0;width:100%;overflow:hidden;opacity:.6}
#ramadan-overlay-root .ro-geo-band--top{top:0}
#ramadan-overlay-root .ro-geo-band--bottom{bottom:0}
#ramadan-overlay-root .ro-geo-band svg{width:100%;height:100%}
@keyframes ro-swing{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}
@keyframes ro-float{from{transform:translateY(0) rotate(0deg);opacity:.7}to{transform:translateY(-12px) rotate(10deg);opacity:1}}
@keyframes ro-glow-pulse{0%,100%{filter:drop-shadow(0 2px 6px var(--ro-glow,rgba(201,168,76,0.5)))}50%{filter:drop-shadow(0 2px 18px var(--ro-glow,rgba(201,168,76,0.9))) drop-shadow(0 0 8px var(--ro-glow,rgba(201,168,76,0.6)))}}
@media(prefers-reduced-motion:reduce){#ramadan-overlay-root *{animation:none!important;transition:none!important}}
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
  config.colors.forEach((c, i) => {
    el.setProperty(`--ro-color-${i + 1}`, c);
  });
}

export interface HostMountResult {
  container: HTMLElement;
  cleanup: () => void;
  updateTokens: (config: ResolvedConfig) => void;
}

export function mountHost(config: ResolvedConfig): HostMountResult {
  if (config.variant === "banner") {
    return mountBannerHost(config);
  }
  return mountOverlayHost(config);
}

function mountOverlayHost(config: ResolvedConfig): HostMountResult {
  injectStyles();

  const root = document.createElement("div");
  root.id = "ramadan-overlay-root";
  root.setAttribute("aria-hidden", "true");
  root.setAttribute("role", "presentation");
  applyTokens(root, config);

  document.body.appendChild(root);

  const mountFn = VARIANT_MAP[config.variant] ?? mountLanterns;
  const cleanupVariant = mountFn(root, config);

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

function mountBannerHost(config: ResolvedConfig): HostMountResult {
  const { elements, cleanup: cleanupBanner } = mountBannerElements(config);
  const container = elements[0] ?? document.body;

  const updateTokens = (_newConfig: ResolvedConfig): void => {
    // Banner styling is set on individual elements during mount
  };

  return { container, cleanup: cleanupBanner, updateTokens };
}

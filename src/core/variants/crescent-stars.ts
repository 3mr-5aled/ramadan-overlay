import type { VariantMountFn } from "../../types";
import { calculateMotifCoords } from "../host";
import {
  calculateAscendingDurationRange,
  calculateAscendingItemCount,
  resolveIntensityValue,
} from "../motion";

function buildCrescentSVG(color: string, size: number): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 3 C8 3 2 11 2 20 C2 29 8 37 20 37 C14 32 11 26 11 20 C11 14 14 8 20 3Z" fill="${color}"/>
  </svg>`;
}

function build8StarSVG(color: string, size: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const outerR = 18;
    const innerR = 9;
    const outer = (i * Math.PI) / 4;
    const inner = outer + Math.PI / 8;
    pts.push(
      `${20 + outerR * Math.sin(outer)},${20 - outerR * Math.cos(outer)}`
    );
    pts.push(
      `${20 + innerR * Math.sin(inner)},${20 - innerR * Math.cos(inner)}`
    );
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="${pts.join(" ")}" fill="${color}"/>
  </svg>`;
}

export const mountCrescentStars: VariantMountFn = (
  container,
  config
): (() => void) => {
  const colors = config.colors;
  const elements: HTMLElement[] = [];

  const intensityVal = resolveIntensityValue(config.intensity, config.density);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const totalItems = calculateAscendingItemCount(intensityVal, isMobile);
  const { minDuration, maxDuration } =
    calculateAscendingDurationRange(intensityVal);
  const sizeScale = isMobile ? 0.7 : 1.0;

  for (let i = 0; i < totalItems; i++) {
    const isCrescent = Math.random() < 0.35;
    const color =
      colors[Math.floor(Math.random() * Math.min(colors.length, 4))] ??
      "#c9a84c";
    const sizeBase = (isCrescent ? 32 : 20) * sizeScale;
    const size = sizeBase + Math.random() * sizeBase * 0.6;

    const el = document.createElement("div");
    el.className = isCrescent ? "ro-crescent" : "ro-star";
    el.innerHTML = isCrescent
      ? buildCrescentSVG(color, size)
      : build8StarSVG(color, size);

    const { x } = calculateMotifCoords(
      config.position,
      config.clearance,
      isMobile
    );

    const durationNum =
      minDuration + Math.random() * (maxDuration - minDuration);
    const duration = durationNum.toFixed(1);
    const delay = (-Math.random() * durationNum).toFixed(1);

    const sway1 = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1);
    const sway2 = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1);
    const swayEnd = (8 + Math.random() * 14) * (Math.random() < 0.5 ? 1 : -1);
    const rot1 = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1);
    const rot2 = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1);
    const rot3 = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1);

    el.style.cssText = `
      left:${x}%;
      top:102%;
      --ro-float-duration:${duration}s;
      --ro-sway-1:${sway1.toFixed(1)}px;
      --ro-sway-2:${sway2.toFixed(1)}px;
      --ro-sway-end:${swayEnd.toFixed(1)}px;
      --ro-rot-1:${rot1.toFixed(1)}deg;
      --ro-rot-2:${rot2.toFixed(1)}deg;
      --ro-rot-3:${rot3.toFixed(1)}deg;
      animation-delay:${delay}s;
    `;

    container.appendChild(el);
    elements.push(el);
  }

  return () => {
    elements.forEach((el) => el.remove());
  };
};

import type { VariantMountFn } from "../../types";

function buildCrescentSVG(color: string, size: number): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 5 A15 15 0 1 0 20 35 A10 10 0 1 1 20 5Z" fill="${color}"/>
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
      `${20 + outerR * Math.sin(outer)},${20 - outerR * Math.cos(outer)}`,
    );
    pts.push(
      `${20 + innerR * Math.sin(inner)},${20 - innerR * Math.cos(inner)}`,
    );
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="${pts.join(" ")}" fill="${color}"/>
  </svg>`;
}

export const mountCrescentStars: VariantMountFn = (
  container,
  config,
): (() => void) => {
  const colors = config.colors;
  const elements: HTMLElement[] = [];

  const totalItems = Math.max(
    8,
    Math.min(24, Math.round((window.innerWidth * window.innerHeight) / 60000)),
  );

  for (let i = 0; i < totalItems; i++) {
    const isCrescent = Math.random() < 0.35;
    const color =
      colors[Math.floor(Math.random() * Math.min(colors.length, 4))] ??
      "#c9a84c";
    const sizeBase = isCrescent ? 32 : 20;
    const size = sizeBase + Math.random() * sizeBase * 0.6;

    const el = document.createElement("div");
    el.className = isCrescent ? "ro-crescent" : "ro-star";
    el.innerHTML = isCrescent
      ? buildCrescentSVG(color, size)
      : build8StarSVG(color, size);

    const x = Math.random() * 95;
    let y: number;
    // Scatter more towards top/bottom edges for a "both" feel
    if (config.position === "top") {
      y = Math.random() * 25;
    } else if (config.position === "bottom") {
      y = 75 + Math.random() * 20;
    } else if (config.position === "full") {
      y = Math.random() * 90;
    } else {
      // 'both'
      y = Math.random() < 0.5 ? Math.random() * 25 : 75 + Math.random() * 20;
    }

    const duration = (4 + Math.random() * 4).toFixed(1);
    const delay = (Math.random() * 3).toFixed(1);

    el.style.cssText = `
      left:${x}%;
      top:${y}%;
      --ro-float-duration:${duration}s;
      animation-delay:${delay}s;
    `;

    container.appendChild(el);
    elements.push(el);
  }

  return () => {
    elements.forEach((el) => el.remove());
  };
};

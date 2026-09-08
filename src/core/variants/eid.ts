import type { Occasion, ResolvedConfig, VariantMountFn } from "../../types";

function buildBalloonSVG(
  color: string,
  accentColor: string,
  size: number
): string {
  return `<svg width="${size}" height="${(size * 1.5).toFixed(0)}" viewBox="0 0 32 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="overflow:visible">
    <ellipse cx="16" cy="18" rx="13" ry="16" fill="${color}" opacity="0.95"/>
    <ellipse cx="12" cy="12" rx="3.5" ry="6" fill="white" opacity="0.3" transform="rotate(-20 12 12)"/>
    <polygon points="16,34 13,38 19,38" fill="${color}"/>
    <path d="M16 38 Q19 43 14 46 T16 52" stroke="${accentColor}" fill="none" stroke-width="1.2" opacity="0.75"/>
  </svg>`;
}

function buildGiftSVG(
  color: string,
  ribbonColor: string,
  size: number
): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="4" y="10" width="24" height="18" rx="2" fill="${color}"/>
    <rect x="2" y="8" width="28" height="5" rx="1.5" fill="${ribbonColor}"/>
    <rect x="14" y="8" width="4" height="20" fill="${ribbonColor}"/>
    <path d="M16 8 C13 3 8 4 10 7 C13 9 16 8 16 8 C16 8 19 9 22 7 C24 4 19 3 16 8" fill="none" stroke="${ribbonColor}" stroke-width="1.8"/>
  </svg>`;
}

function buildTwinkleStarSVG(color: string, size: number): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 0 C12 7 17 12 24 12 C17 12 12 17 12 24 C12 17 7 12 0 12 C7 12 12 7 12 0 Z" fill="${color}"/>
  </svg>`;
}

function buildSheepSVG(
  woolColor: string,
  faceColor: string,
  size: number
): string {
  return `<svg width="${size}" height="${(size * 0.8).toFixed(0)}" viewBox="0 0 40 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- Legs -->
    <rect x="13" y="22" width="2.5" height="7" rx="1.2" fill="${faceColor}"/>
    <rect x="23" y="22" width="2.5" height="7" rx="1.2" fill="${faceColor}"/>
    <!-- Fluffy Wool Body -->
    <path d="M14 6 C16 4 20 4 22 6 C24 4 28 5 29 8 C32 9 34 12 33 15 C35 18 33 22 30 23 C28 25 24 25 22 24 C20 26 16 26 14 24 C12 25 8 24 6 22 C4 19 5 15 7 13 C5 10 8 7 11 7 C12 6 13 6 14 6 Z" fill="${woolColor}"/>
    <!-- Head & Ears -->
    <ellipse cx="8" cy="14" rx="4" ry="5" fill="${faceColor}"/>
    <ellipse cx="5" cy="11" rx="1.5" ry="3" transform="rotate(-30 5 11)" fill="${faceColor}"/>
    <!-- Eye dot -->
    <circle cx="7" cy="13" r="0.8" fill="white"/>
  </svg>`;
}

function buildKaabaSVG(
  wallColor: string,
  goldColor: string,
  size: number
): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- Kaaba Cube -->
    <rect x="4" y="6" width="24" height="23" rx="1.5" fill="${wallColor}"/>
    <!-- Kiswa Gold Band -->
    <line x1="4" y1="12" x2="28" y2="12" stroke="${goldColor}" stroke-width="2.5"/>
    <line x1="4" y1="16" x2="28" y2="16" stroke="${goldColor}" stroke-width="0.8" stroke-dasharray="2 1"/>
    <!-- Kaaba Door -->
    <rect x="18" y="15" width="4.5" height="11" rx="0.5" fill="${goldColor}"/>
  </svg>`;
}

function buildCrescentSVG(color: string, size: number): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 3 C8 3 2 11 2 20 C2 29 8 37 20 37 C14 32 11 26 11 20 C11 14 14 8 20 3Z" fill="${color}"/>
    <polygon points="26,11 27.5,15.5 32,15.5 28.5,18 30,22 26,19.5 22,22 23.5,18 20,15.5 24.5,15.5" fill="${color}"/>
  </svg>`;
}

export const mountEid: VariantMountFn = (
  container: HTMLElement,
  config: ResolvedConfig,
  occasion?: Occasion
): (() => void) => {
  const isAdha =
    config.variant === "eid-adha" ||
    (config.variant === "eid" && occasion === "eid-adha");

  const colors = config.colors;
  const elements: HTMLElement[] = [];

  const DENSITY_MAP = { low: 6, normal: 14, high: 24 };
  const totalItems = DENSITY_MAP[config.density] ?? 14;

  for (let i = 0; i < totalItems; i++) {
    const el = document.createElement("div");

    const color1 = colors[0] ?? "#c9a84c";
    const color2 = colors[1] ?? "#e8c96b";
    const color3 = colors[2] ?? "#2d5a27";
    const randomColor =
      colors[Math.floor(Math.random() * colors.length)] ?? color1;

    if (isAdha) {
      // Adha motifs: Sheep, Kaaba, Crescent
      const motifRand = Math.random();
      if (motifRand < 0.4) {
        el.className = "ro-sheep";
        el.innerHTML = buildSheepSVG("#f8f9fa", color3, 36);
      } else if (motifRand < 0.7) {
        el.className = "ro-kaaba";
        el.innerHTML = buildKaabaSVG("#1a1a1a", color1, 28);
      } else {
        el.className = "ro-crescent";
        el.innerHTML = buildCrescentSVG(color2, 30);
      }
    } else {
      // Fitr motifs: Balloons, Gifts, Stars
      const motifRand = Math.random();
      if (motifRand < 0.45) {
        el.className = "ro-balloon";
        el.innerHTML = buildBalloonSVG(randomColor, color1, 26);
      } else if (motifRand < 0.75) {
        el.className = "ro-gift";
        el.innerHTML = buildGiftSVG(randomColor, color2, 24);
      } else {
        el.className = "ro-star";
        el.innerHTML = buildTwinkleStarSVG(color2, 18);
      }
    }

    const x = Math.random() * 95;
    let y: number;
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

import type { VariantMountFn } from "../../types";

/**
 * A tileable 8-fold Islamic star / girih pattern rendered as an inline SVG.
 * The pattern repeats seamlessly via <pattern> elements.
 */
function buildGeometricSVG(
  color1: string,
  color2: string,
  width: number,
  height: number,
): string {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <pattern id="ro-geo-tile" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <!-- 8-pointed star (inner) -->
        <polygon
          points="20,4 23.1,14.5 34,11.7 26.9,19.4 34,27.1 23.1,25.5 20,36 16.9,25.5 6,27.1 13.1,19.4 6,11.7 16.9,14.5"
          fill="none" stroke="${color1}" stroke-width="1.2"/>
        <!-- Connecting girih lines -->
        <line x1="0" y1="20" x2="40" y2="20" stroke="${color2}" stroke-width="0.5" opacity="0.5"/>
        <line x1="20" y1="0" x2="20" y2="40" stroke="${color2}" stroke-width="0.5" opacity="0.5"/>
        <line x1="0" y1="0" x2="40" y2="40" stroke="${color2}" stroke-width="0.4" opacity="0.35"/>
        <line x1="40" y1="0" x2="0" y2="40" stroke="${color2}" stroke-width="0.4" opacity="0.35"/>
        <!-- Corner diamonds -->
        <polygon points="0,20 5,15 10,20 5,25" fill="${color1}" opacity="0.6"/>
        <polygon points="40,20 35,15 30,20 35,25" fill="${color1}" opacity="0.6"/>
        <polygon points="20,0 25,5 20,10 15,5" fill="${color1}" opacity="0.6"/>
        <polygon points="20,40 25,35 20,30 15,35" fill="${color1}" opacity="0.6"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#ro-geo-tile)"/>
  </svg>`;
}

export const mountGeometric: VariantMountFn = (
  container,
  config,
): (() => void) => {
  const colors = config.colors;
  const color1 = colors[0] ?? "#c9a84c";
  const color2 = colors[1] ?? "#e8c96b";

  const bands: HTMLElement[] = [];
  const positions =
    config.position === "top"
      ? ["top"]
      : config.position === "bottom"
        ? ["bottom"]
        : config.position === "full"
          ? ["top", "bottom"]
          : ["top", "bottom"];

  const bandH = Math.max(
    28,
    Math.min(56, Math.round(window.innerWidth * 0.035)),
  );

  for (const pos of positions) {
    const band = document.createElement("div");
    band.className = `ro-geo-band ro-geo-band--${pos}`;
    band.innerHTML = buildGeometricSVG(
      color1,
      color2,
      window.innerWidth,
      bandH,
    );
    container.appendChild(band);
    bands.push(band);
  }

  if (config.position === "full") {
    // Also tile the full background with very low opacity
    const bg = document.createElement("div");
    bg.style.cssText = `
      position:absolute;inset:0;width:100%;height:100%;opacity:0.08;overflow:hidden;
    `;
    bg.innerHTML = buildGeometricSVG(
      color1,
      color2,
      window.innerWidth,
      window.innerHeight,
    );
    container.appendChild(bg);
    bands.push(bg);
  }

  return () => {
    bands.forEach((b) => b.remove());
  };
};

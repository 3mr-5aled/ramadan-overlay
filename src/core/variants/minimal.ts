import type { VariantMountFn } from "../../types";

/**
 * Arabesque border ribbon — a repeating SVG motif strip at top and/or bottom.
 * Lightest variant, suitable for sites that want something subtle.
 */
function buildArabesqueSVG(
  color1: string,
  color2: string,
  height: number,
): string {
  const h = height;
  const unit = h * 2; // one tile width

  return `<svg width="${unit * 10}" height="${h}" viewBox="0 0 ${unit * 10} ${h}"
         preserveAspectRatio="xMidYMid slice"
         xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <pattern id="ro-arabesque" x="0" y="0" width="${unit}" height="${h}" patternUnits="userSpaceOnUse">
        <!-- Top arch -->
        <path d="M0,${h} Q${unit / 2},0 ${unit},${h}" fill="none" stroke="${color1}" stroke-width="1.5"/>
        <!-- Inner petal -->
        <path d="M${unit * 0.2},${h} Q${unit / 2},${h * 0.3} ${unit * 0.8},${h}"
              fill="${color2}" opacity="0.25"/>
        <!-- Dot accent -->
        <circle cx="${unit / 2}" cy="${h * 0.25}" r="${Math.max(1.5, h * 0.08)}"
                fill="${color1}" opacity="0.8"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#ro-arabesque)"/>
  </svg>`;
}

export const mountMinimal: VariantMountFn = (
  container,
  config,
): (() => void) => {
  const color1 = config.colors[0] ?? "#c9a84c";
  const color2 = config.colors[1] ?? "#e8c96b";

  const bandH = Math.max(
    12,
    Math.min(24, Math.round(window.innerWidth * 0.015)),
  );
  const elements: HTMLElement[] = [];

  const showTop = config.position !== "bottom";
  const showBottom = config.position !== "top";

  if (showTop) {
    const top = document.createElement("div");
    top.className = "ro-border-top";
    top.style.height = `${bandH}px`;
    top.innerHTML = buildArabesqueSVG(color1, color2, bandH);
    container.appendChild(top);
    elements.push(top);
  }

  if (showBottom) {
    const bottom = document.createElement("div");
    bottom.className = "ro-border-bottom";
    bottom.style.height = `${bandH}px`;
    // Flip vertically for bottom border
    bottom.innerHTML = `<div style="transform:scaleY(-1);transform-origin:center top;height:${bandH}px;">
      ${buildArabesqueSVG(color1, color2, bandH)}
    </div>`;
    container.appendChild(bottom);
    elements.push(bottom);
  }

  return () => {
    elements.forEach((el) => el.remove());
  };
};

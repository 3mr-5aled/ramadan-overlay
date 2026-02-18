import type { VariantMountFn } from "../../types";

// SVG for a single Ramadan lantern in the chosen color
function buildLanternSVG(
  color1: string,
  color2: string,
  color3: string,
): string {
  return `<svg viewBox="0 0 40 70" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- Cap -->
    <rect x="13" y="2" width="14" height="4" rx="2" fill="${color3}"/>
    <!-- Top ring -->
    <ellipse cx="20" cy="8" rx="9" ry="3" fill="${color3}"/>
    <!-- Body -->
    <path d="M10 12 Q5 30 8 50 Q14 62 20 64 Q26 62 32 50 Q35 30 30 12 Q26 8 20 8 Q14 8 10 12Z"
          fill="${color1}" stroke="${color2}" stroke-width="1.2"/>
    <!-- Crescent window cutout -->
    <path d="M20 22 A8 8 0 0 1 28 30 A6 6 0 0 0 20 26 A6 6 0 0 0 12 30 A8 8 0 0 1 20 22Z"
          fill="${color3}" opacity="0.5"/>
    <!-- Glow -->
    <ellipse cx="20" cy="40" rx="6" ry="9" fill="${color2}" opacity="0.35"/>
    <!-- Bottom tassel -->
    <line x1="20" y1="64" x2="18" y2="70" stroke="${color2}" stroke-width="1"/>
    <line x1="20" y1="64" x2="20" y2="71" stroke="${color2}" stroke-width="1"/>
    <line x1="20" y1="64" x2="22" y2="70" stroke="${color2}" stroke-width="1"/>
  </svg>`;
}

export const mountLanterns: VariantMountFn = (
  container,
  config,
): (() => void) => {
  const colors = config.colors;
  const colorPairs: Array<[string, string, string]> = [
    [colors[0] ?? "#c9a84c", colors[1] ?? "#e8c96b", colors[2] ?? "#8b4513"],
    [colors[3] ?? "#2d5a27", colors[4] ?? "#4a8a3a", colors[2] ?? "#8b4513"],
    [colors[0] ?? "#c9a84c", colors[1] ?? "#e8c96b", colors[3] ?? "#2d5a27"],
    ["#8b1a1a", "#cc4444", colors[2] ?? "#8b4513"],
    ["#1a3a6b", "#3a6ab8", colors[1] ?? "#e8c96b"],
  ];

  // Responsive lantern count: fewer on narrow viewports
  const count = Math.max(4, Math.min(12, Math.round(window.innerWidth / 120)));

  const row = document.createElement("div");
  row.className = "ro-lantern-row";

  // Dangle a connecting rope across the top
  const rope = document.createElement("div");
  rope.style.cssText = `
    position:absolute;top:0;left:0;width:100%;height:3px;
    background:linear-gradient(90deg,transparent 0%,${colors[0] ?? "#c9a84c"} 10%,${colors[0] ?? "#c9a84c"} 90%,transparent 100%);
    opacity:0.6;
  `;
  container.appendChild(rope);

  for (let i = 0; i < count; i++) {
    const pair = colorPairs[i % colorPairs.length];
    const delay = (i * 0.4).toFixed(1);
    const duration = (2.5 + Math.random() * 1.5).toFixed(1);

    const wrap = document.createElement("div");
    wrap.className = "ro-lantern";
    wrap.style.setProperty("--ro-swing-duration", `${duration}s`);
    wrap.style.animationDelay = `${delay}s`;

    const stringEl = document.createElement("div");
    stringEl.className = "ro-lantern-string";

    const svgWrap = document.createElement("div");
    svgWrap.innerHTML = buildLanternSVG(...pair);

    wrap.appendChild(stringEl);
    wrap.appendChild(svgWrap);
    row.appendChild(wrap);
  }

  container.appendChild(row);

  // Resize handler
  const onResize = () => {
    const newCount = Math.max(
      4,
      Math.min(12, Math.round(window.innerWidth / 120)),
    );
    if (newCount !== count) {
      row.remove();
      rope.remove();
      // Re-mount with new count
      mountLanterns(container, config);
    }
  };
  window.addEventListener("resize", onResize, { passive: true });

  return () => {
    row.remove();
    rope.remove();
    window.removeEventListener("resize", onResize);
  };
};

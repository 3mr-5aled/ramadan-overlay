import type { VariantMountFn } from "../../types";
import { scheduleRender } from "../scheduler";

interface SparkleParticle {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
}

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

export const mountSparkles: VariantMountFn = (
  container,
  config,
): (() => void) => {
  const colors = config.colors.length
    ? config.colors
    : ["#c9a84c", "#e8c96b", "#fff7cc", "#4a8a3a"];
  const DENSITY_MAP = { low: 18, normal: 40, high: 70 };
  const MAX_PARTICLES = DENSITY_MAP[config.density] ?? 40;
  const particles: SparkleParticle[] = [];

  function spawnParticle(): SparkleParticle {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const roll = Math.random();
    const el = document.createElement("div");
    let particleSize: number;

    if (roll < 0.18) {
      // Crescent
      particleSize = 18 + Math.random() * 14;
      el.className = "ro-crescent";
      el.innerHTML = buildCrescentSVG(color, particleSize);
      el.style.cssText = `
        position:absolute;
        width:${particleSize}px;height:${particleSize}px;
        filter:drop-shadow(0 0 ${particleSize * 0.5}px ${color});
        animation:none;
      `;
    } else if (roll < 0.38) {
      // 8-pointed star
      particleSize = 14 + Math.random() * 12;
      el.className = "ro-star";
      el.innerHTML = build8StarSVG(color, particleSize);
      el.style.cssText = `
        position:absolute;
        width:${particleSize}px;height:${particleSize}px;
        filter:drop-shadow(0 0 ${particleSize * 0.5}px ${color});
        animation:none;
      `;
    } else {
      // Glowing dot
      particleSize = 3 + Math.random() * 7;
      el.className = "ro-sparkle";
      el.style.cssText = `
        position:absolute;
        width:${particleSize}px;height:${particleSize}px;
        background:${color};
        box-shadow:0 0 ${particleSize * 1.5}px ${color};
        animation:none;
      `;
    }

    container.appendChild(el);

    let x: number, y: number;
    const pos = config.position;
    if (pos === "top") {
      x = Math.random() * 100;
      y = Math.random() * 20;
    } else if (pos === "bottom") {
      x = Math.random() * 100;
      y = 80 + Math.random() * 20;
    } else if (pos === "full") {
      x = Math.random() * 100;
      y = Math.random() * 100;
    } else {
      x = Math.random() * 100;
      y = Math.random() < 0.5 ? Math.random() * 20 : 80 + Math.random() * 20;
    }

    const maxLife = 80 + Math.random() * 80;
    return {
      el,
      x,
      y,
      vx: (Math.random() - 0.5) * 0.06,
      vy: -0.04 - Math.random() * 0.06,
      size: particleSize,
      opacity: 0,
      life: 0,
      maxLife,
      color,
    };
  }

  function tick(_dt: number) {
    // Spawn new particles up to max
    while (particles.length < MAX_PARTICLES) {
      particles.push(spawnParticle());
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life++;
      p.x += p.vx;
      p.y += p.vy;

      // Fade in / fade out
      const ratio = p.life / p.maxLife;
      p.opacity =
        ratio < 0.3 ? ratio / 0.3 : ratio > 0.7 ? (1 - ratio) / 0.3 : 1;

      p.el.style.left = `${p.x}%`;
      p.el.style.top = `${p.y}%`;
      p.el.style.opacity = String(Math.min(1, Math.max(0, p.opacity)));
      p.el.style.transform = `scale(${0.5 + p.opacity * 0.5})`;

      if (p.life >= p.maxLife) {
        p.el.remove();
        particles.splice(i, 1);
      }
    }
  }

  const cancelSchedule = scheduleRender(tick);

  return () => {
    cancelSchedule();
    particles.forEach((p) => p.el.remove());
    particles.length = 0;
  };
};

import type { VariantMountFn } from "../../types";

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

export const mountSparkles: VariantMountFn = (
  container,
  config,
): (() => void) => {
  const colors = config.colors.length
    ? config.colors
    : ["#c9a84c", "#e8c96b", "#fff7cc", "#4a8a3a"];
  const MAX_PARTICLES = 40;
  const particles: SparkleParticle[] = [];
  let rafId: number;
  let running = true;

  function spawnParticle(): SparkleParticle {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 3 + Math.random() * 7;
    const el = document.createElement("div");
    el.className = "ro-sparkle";
    el.style.cssText = `
      width:${size}px;height:${size}px;
      background:${color};
      box-shadow:0 0 ${size * 1.5}px ${color};
      animation:none;
    `;
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
      size,
      opacity: 0,
      life: 0,
      maxLife,
      color,
    };
  }

  function tick() {
    if (!running) return;

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

    rafId = requestAnimationFrame(tick);
  }

  rafId = requestAnimationFrame(tick);

  return () => {
    running = false;
    cancelAnimationFrame(rafId);
    particles.forEach((p) => p.el.remove());
    particles.length = 0;
  };
};

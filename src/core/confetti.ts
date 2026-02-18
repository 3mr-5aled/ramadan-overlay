import confetti from "canvas-confetti";
import type { RamadanState } from "../types";

const DEFAULT_GOLD = "#c9a84c";
const DEFAULT_GREEN = "#2d5a27";
const DEFAULT_CREAM = "#fff7cc";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Fire a 3-burst Ramadan confetti sequence on day 1.
 * Uses crescent moon + star emoji shapes via canvas-confetti's shapeFromText API.
 */
export async function fireRamadanConfetti(
  hijriYear: number,
  colors?: string[],
): Promise<void> {
  if (prefersReducedMotion()) return;

  const palette = colors?.length
    ? colors
    : [
        DEFAULT_GOLD,
        DEFAULT_GREEN,
        DEFAULT_CREAM,
        "#e8c96b",
        "#4a8a3a",
        "#ffffff",
      ];

  // Emoji shapes for cultural flair
  const crescentShape = confetti.shapeFromText({ text: "🌙", scalar: 2 });
  const starShape = confetti.shapeFromText({ text: "✨", scalar: 2 });
  const yearStr = hijriYear.toString();
  const yearShape = confetti.shapeFromText({ text: yearStr, scalar: 1.5 });

  const baseOptions = {
    particleCount: 60,
    spread: 70,
    colors: palette,
    ticks: 200,
    gravity: 0.8,
    scalar: 1.8,
    drift: 0,
    disableForReducedMotion: true,
  };

  // Burst 1 — left cannon
  confetti({
    ...baseOptions,
    angle: 60,
    origin: { x: 0, y: 0.85 },
    shapes: [crescentShape, starShape],
  });

  await delay(300);

  // Burst 2 — right cannon
  confetti({
    ...baseOptions,
    angle: 120,
    origin: { x: 1, y: 0.85 },
    shapes: [crescentShape, starShape],
  });

  await delay(300);

  // Burst 3 — center with Hijri year label
  await confetti({
    ...baseOptions,
    angle: 90,
    particleCount: 80,
    spread: 100,
    origin: { x: 0.5, y: 0.7 },
    shapes: [crescentShape, starShape, yearShape],
    scalar: 2,
  });
}

export function shouldFireConfetti(
  state: RamadanState,
  enabled: boolean,
): boolean {
  return (
    enabled && state.isRamadan && state.isFirstDay && !prefersReducedMotion()
  );
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

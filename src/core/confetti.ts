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

  // Build a bitmap shape for the year with white fill + black stroke
  // so it stands out on any background color in the confetti burst.
  const yearShape = buildYearShape(yearStr);

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

/**
 * Renders the Hijri year string onto an OffscreenCanvas with white fill and a
 * black stroke, then returns a canvas-confetti bitmap shape so it reads clearly
 * against any confetti particle colour.
 */
function buildYearShape(text: string): confetti.Shape {
  const scalar = 1.5;
  const fontSize = 10 * scalar; // matches canvas-confetti's own convention
  const fontFamily =
    "bold " + fontSize + "px system-ui, -apple-system, sans-serif";

  // Measure on a temporary canvas first
  let cv = new OffscreenCanvas(1, 1);
  let ctx = cv.getContext("2d") as OffscreenCanvasRenderingContext2D;
  ctx.font = fontFamily;
  const m = ctx.measureText(text);
  const padding = 3;
  const w =
    Math.ceil(m.actualBoundingBoxRight + m.actualBoundingBoxLeft) + padding * 2;
  const h =
    Math.ceil(m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) +
    padding * 2;
  const x = m.actualBoundingBoxLeft + padding;
  const y = m.actualBoundingBoxAscent + padding;

  // Draw on correctly-sized canvas
  cv = new OffscreenCanvas(w, h);
  ctx = cv.getContext("2d") as OffscreenCanvasRenderingContext2D;
  ctx.font = fontFamily;
  ctx.lineJoin = "round";
  ctx.lineWidth = fontSize * 0.28; // thick enough stroke
  ctx.strokeStyle = "#000000";
  ctx.strokeText(text, x, y);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(text, x, y);

  const scale = 1 / scalar;
  return {
    type: "bitmap",
    bitmap: cv.transferToImageBitmap(),
    matrix: [scale, 0, 0, scale, (-w * scale) / 2, (-h * scale) / 2],
  } as unknown as confetti.Shape;
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

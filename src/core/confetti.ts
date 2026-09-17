import confetti from "canvas-confetti";
import type { Occasion, RamadanState } from "../types";
import { isMotionAllowed } from "./motion";

const DEFAULT_GOLD = "#c9a84c";
const DEFAULT_GREEN = "#2d5a27";
const DEFAULT_CREAM = "#fff7cc";

export function isCanvasSupported(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext && canvas.getContext("2d"));
  } catch {
    return false;
  }
}

/**
 * Resolves the primary and secondary festive emojis tailored to the active holiday.
 * - Ramadan: ['🌙', '✨'] (crescent moon + star)
 * - Eid Al-Fitr: ['🎁', '✨'] (gift box + sparkles)
 * - Eid Al-Adha: ['🐑', '🎁'] (sacrificial sheep + gift box)
 */
export function getOccasionConfettiEmojis(
  occasion?: Occasion | "none" | string
): [string, string] {
  if (occasion === "eid-adha") {
    return ["🐑", "🎁"];
  }
  if (occasion === "eid-fitr" || occasion === "eid") {
    return ["🎁", "✨"];
  }
  return ["🌙", "✨"];
}

/**
 * Fire a 3-burst festive celebration confetti sequence.
 * Uses occasion-specific emoji shapes:
 * - Ramadan: crescent moon ("🌙") and star ("✨")
 * - Eid Al-Fitr: gift box ("🎁") and star ("✨")
 * - Eid Al-Adha: sheep ("🐑") and gift box ("🎁")
 * with graceful fallback to standard geometric confetti shapes when OffscreenCanvas is unavailable.
 */
export async function fireRamadanConfetti(
  hijriYear: number,
  colors?: string[],
  occasion?: Occasion | "none" | string
): Promise<void> {
  if (!isMotionAllowed()) return;
  if (!isCanvasSupported()) return;

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

  const [primaryEmoji, secondaryEmoji] = getOccasionConfettiEmojis(occasion);

  let shapes: confetti.Shape[] | undefined;
  if (typeof OffscreenCanvas !== "undefined") {
    try {
      const primaryShape = buildEmojiShape(primaryEmoji);
      const secondaryShape = buildEmojiShape(secondaryEmoji);
      const yearStr = (hijriYear || 1447).toString();
      const yearShape = buildYearShape(yearStr);
      shapes = [primaryShape, secondaryShape, yearShape];
    } catch {
      // Fallback to default confetti shapes if canvas shape generation fails
      shapes = undefined;
    }
  }

  const baseOptions: confetti.Options = {
    particleCount: 60,
    spread: 70,
    colors: palette,
    ticks: 200,
    gravity: 0.8,
    scalar: shapes ? 1.8 : 1.2,
    drift: 0,
    disableForReducedMotion: true,
  };

  if (shapes) {
    // Burst 1 — left cannon
    confetti({
      ...baseOptions,
      angle: 60,
      origin: { x: 0, y: 0.85 },
      shapes: [shapes[0], shapes[1]],
    });

    await delay(300);

    // Burst 2 — right cannon
    confetti({
      ...baseOptions,
      angle: 120,
      origin: { x: 1, y: 0.85 },
      shapes: [shapes[0], shapes[1]],
    });

    await delay(300);

    // Burst 3 — center with Hijri year label
    await confetti({
      ...baseOptions,
      angle: 90,
      particleCount: 80,
      spread: 100,
      origin: { x: 0.5, y: 0.7 },
      shapes,
      scalar: 2,
    });
  } else {
    // Fallback: standard geometric confetti shapes
    confetti({
      ...baseOptions,
      angle: 60,
      origin: { x: 0, y: 0.85 },
    });

    await delay(300);

    confetti({
      ...baseOptions,
      angle: 120,
      origin: { x: 1, y: 0.85 },
    });

    await delay(300);

    await confetti({
      ...baseOptions,
      angle: 90,
      particleCount: 80,
      spread: 100,
      origin: { x: 0.5, y: 0.7 },
      scalar: 1.4,
    });
  }
}

/**
 * Renders an emoji onto an OffscreenCanvas with a dark stroke behind it so it
 * reads clearly on any background colour in the confetti burst.
 */
function buildEmojiShape(emoji: string): confetti.Shape {
  const scalar = 2;
  const fontSize = 10 * scalar;
  const font = fontSize + "px serif";
  const strokeWidth = fontSize * 0.15;

  // Measure
  let cv = new OffscreenCanvas(1, 1);
  let ctx = cv.getContext("2d") as OffscreenCanvasRenderingContext2D;
  ctx.font = font;
  const m = ctx.measureText(emoji);
  const pad = strokeWidth + 2;
  const left =
    typeof m.actualBoundingBoxLeft === "number" ? m.actualBoundingBoxLeft : 0;
  const right =
    typeof m.actualBoundingBoxRight === "number"
      ? m.actualBoundingBoxRight
      : m.width || fontSize;
  const ascent =
    typeof m.actualBoundingBoxAscent === "number"
      ? m.actualBoundingBoxAscent
      : fontSize;
  const descent =
    typeof m.actualBoundingBoxDescent === "number"
      ? m.actualBoundingBoxDescent
      : 0;
  const w = Math.max(1, Math.ceil(right + left) + pad * 2);
  const h = Math.max(1, Math.ceil(ascent + descent) + pad * 2);
  const x = left + pad;
  const y = ascent + pad;

  // Draw with stroke then fill
  cv = new OffscreenCanvas(w, h);
  ctx = cv.getContext("2d") as OffscreenCanvasRenderingContext2D;
  ctx.font = font;
  ctx.lineJoin = "round";
  ctx.lineWidth = strokeWidth * 2; // paint behind fill
  ctx.strokeStyle = "rgba(0,0,0,0.55)";
  ctx.strokeText(emoji, x, y);
  ctx.fillText(emoji, x, y);

  const scale = 1 / scalar;
  return {
    type: "bitmap",
    bitmap: cv.transferToImageBitmap(),
    matrix: [scale, 0, 0, scale, (-w * scale) / 2, (-h * scale) / 2],
  } as unknown as confetti.Shape;
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
  const left =
    typeof m.actualBoundingBoxLeft === "number" ? m.actualBoundingBoxLeft : 0;
  const right =
    typeof m.actualBoundingBoxRight === "number"
      ? m.actualBoundingBoxRight
      : m.width || fontSize;
  const ascent =
    typeof m.actualBoundingBoxAscent === "number"
      ? m.actualBoundingBoxAscent
      : fontSize;
  const descent =
    typeof m.actualBoundingBoxDescent === "number"
      ? m.actualBoundingBoxDescent
      : 0;
  const w = Math.max(1, Math.ceil(right + left) + padding * 2);
  const h = Math.max(1, Math.ceil(ascent + descent) + padding * 2);
  const x = left + padding;
  const y = ascent + padding;

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

/**
 * Decide whether confetti should fire.
 *
 * Fires when option is 'on', motion is allowed, and either:
 * - Current state is Ramadan or Eid
 * - previewMode is true
 *
 * | option  | fires when                                  |
 * |---------|---------------------------------------------|
 * | `'off'` | never                                       |
 * | `'on'`  | isRamadan || isEid || previewMode           |
 */
export function shouldFireConfetti(
  state: RamadanState,
  option: "on" | "off",
  previewMode = false
): boolean {
  if (option === "off") return false;
  if (!isMotionAllowed()) return false;
  return state.isRamadan || state.isEid || previewMode;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { fireRamadanConfetti as fireOccasionConfetti };

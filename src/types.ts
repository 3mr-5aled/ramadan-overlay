// ─── Variant Types ────────────────────────────────────────────────────────────

export type OverlayVariant =
  | "lanterns"
  | "crescent-stars"
  | "geometric"
  | "sparkles"
  | "minimal";

/**
 * Which of the 12 lantern SVG designs to display.
 * 1–12 pins a single design; 0 / omitted cycles through all designs.
 */
export type LanternStyle = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Named region presets that map to a Hijri calendar day offset.
 *
 * Different countries determine the start of Ramadan by different moon-sighting
 * conventions, which can place them 1–2 days apart:
 *
 * | Region | Offset | Notes |
 * |---|---|---|
 * | `"standard"` | 0 | Umm al-Qura (Saudi Arabia astronomical) |
 * | `"saudi"` | 0 | Alias for standard |
 * | `"uae"` | 0 | Follows Saudi most years |
 * | `"egypt"` | +1 | Egyptian Dar al-Ifta sighting is often 1 day later |
 * | `"turkey"` | +1 | Diyanet calculation is typically 1 day after Saudi |
 * | `"pakistan"` | +1 | Pakistan moon-sighting committee |
 * | `"indonesia"` | +1 | Indonesian BIMAS calculation |
 * | `"morocco"` | +1 | Moroccan Ministry of Habous |
 * | `"malaysia"` | 0 | Follows Saudi / JAKIM |
 * | `"us"` | +1 | ISNA / Fiqh Council typically follows Egypt/Turkey |
 * | `"uk"` | +1 | Follows ISNA / local sighting |
 *
 * Use `hijriAdjustment` for a custom offset when a preset doesn’t match.
 */
export type HijriRegion =
  | "standard"
  | "saudi"
  | "uae"
  | "malaysia"
  | "egypt"
  | "turkey"
  | "pakistan"
  | "indonesia"
  | "morocco"
  | "us"
  | "uk";

export type OverlayPosition = "top" | "bottom" | "both" | "full";

// ─── Config ───────────────────────────────────────────────────────────────────

export interface RamadanOverlayConfig {
  /**
   * Visual decoration variant.
   * @default 'lanterns'
   */
  variant?: OverlayVariant;

  /**
   * Where the overlay is positioned relative to the viewport.
   * @default 'both'
   */
  position?: OverlayPosition;

  /**
   * Overall opacity of the decoration layer (0–1).
   * @default 0.85
   */
  opacity?: number;

  /**
   * Custom color palette (CSS color strings). Falls back to Ramadan defaults.
   */
  colors?: string[];

  /**
   * z-index of the overlay container.
   * @default 9999
   */
  zIndex?: number;

  /**
   * When true (default), the overlay only shows during the Hijri month of Ramadan.
   * Set to false to permanently display the overlay.
   * @default true
   */
  autoTrigger?: boolean;

  /**
   * Force the overlay to display regardless of the current date.
   * Useful for development and testing.
   * @default false
   */
  previewMode?: boolean;

  /**
   * Fire confetti on the first day of Ramadan.
   * @default true
   */
  confetti?: boolean;

  /**
   * Display locale for any text elements (e.g. crescent greeting).
   * @default 'en'
   */
  locale?: "en" | "ar";

  /**
   * Called once when Ramadan is detected at init time (or day 1).
   */
  onRamadanStart?: (state: RamadanState) => void;

  /**
   * Which of the 12 lantern SVG designs to show (lanterns variant only).
   * 1–12 pins a single design; 0 or omitted cycles through all designs.
   * @default 0
   */
  lanternStyle?: LanternStyle;

  /**
   * CSS color for the horizontal ceiling bar at the top of the lanterns row (lanterns variant only).
   * @default '#c9a84c'
   */
  ceilingColor?: string;

  /**
   * CSS color for the individual strings connecting each lantern to the ceiling bar (lanterns variant only).
   * @default '#c9a84c'
   */
  ropeColor?: string;

  /**
   * CSS color used for the glow / drop-shadow effect on decorations.
   * @default 'rgba(201,168,76,0.55)'
   */
  glowColor?: string;

  /**
   * Named region preset for Hijri calendar start-of-Ramadan convention.
   * Sets a day offset relative to the Umm al-Qura (Saudi) calendar.
   * Overridden by `hijriAdjustment` when both are provided.
   * @example 'turkey' // +1 day offset
   */
  region?: HijriRegion;

  /**
   * Manual day offset applied to the Hijri date before Ramadan detection.
   * Positive values shift the calendar forward (later start), negative backward.
   * Typical values: -1, 0, +1, +2.
   * Takes precedence over `region`.
   * @default 0
   */
  hijriAdjustment?: number;

  /**
   * Called when the overlay is manually destroyed.
   */
  onRamadanEnd?: () => void;

  /**
   * Override the particle/decoration count. When omitted the library picks
   * a count automatically based on screen area (mobile gets fewer particles).
   * @default undefined (auto)
   */
  density?: "low" | "normal" | "high";
}

// ─── State & Instance ─────────────────────────────────────────────────────────

export interface RamadanState {
  /** True when the current date falls within Ramadan (Hijri month 9). */
  isRamadan: boolean;
  /** True on the exact first day of Ramadan (day 1 of Hijri month 9). */
  isFirstDay: boolean;
  /** Current Hijri year number. */
  hijriYear: number;
  /** Day number within Ramadan (1–30). */
  dayNumber: number;
}

export interface OverlayInstance {
  /** Remove the overlay from the DOM and clean up all resources. */
  destroy: () => void;
  /** The root container element (null if overlay was not mounted). */
  container: HTMLElement | null;
  /** The detected Ramadan state at mount time. */
  state: RamadanState;
}

// ─── Variant Module Contract ────────────────────────────────────────────────

/**
 * Each variant module must export a function matching this signature.
 * It mounts decoration elements into `container` and returns a cleanup function.
 */
export type VariantMountFn = (
  container: HTMLElement,
  config: ResolvedConfig,
) => () => void;

// ─── Internal Resolved Config ─────────────────────────────────────────────────

export interface ResolvedConfig extends Required<
  Omit<RamadanOverlayConfig, "onRamadanStart" | "onRamadanEnd">
> {
  lanternStyle: LanternStyle;
  glowColor: string;
  region: HijriRegion;
  hijriAdjustment: number;
  onRamadanStart: RamadanOverlayConfig["onRamadanStart"];
  onRamadanEnd: RamadanOverlayConfig["onRamadanEnd"];
}

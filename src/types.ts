// ─── Variant Types ────────────────────────────────────────────────────────────

export type OverlayVariant =
  | "lanterns"
  | "crescent-stars"
  | "geometric"
  | "sparkles"
  | "minimal";

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
   * Called when the overlay is manually destroyed.
   */
  onRamadanEnd?: () => void;
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
  onRamadanStart: RamadanOverlayConfig["onRamadanStart"];
  onRamadanEnd: RamadanOverlayConfig["onRamadanEnd"];
}

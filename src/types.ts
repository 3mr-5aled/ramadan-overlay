// ─── Variant Types ────────────────────────────────────────────────────────────

export type OverlayVariant =
  | "lanterns"
  | "crescent-stars"
  | "geometric"
  | "sparkles"
  | "banner"
  | "eid"
  | "eid-fitr"
  | "eid-adha";

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

export type OverlayPosition =
  | "top"
  | "bottom"
  | "both"
  | "full"
  | "left"
  | "right"
  | "sides"
  | "start"
  | "end";

export type MobileSideBehavior = "hide" | "top" | "show";

/**
 * Content Safe Zone clearance modes for floating festive motifs.
 * - 'edges': Constrains motifs to peripheral gutters (left 2%–18% and right 82%–98%), keeping the central reading column sterile.
 * - 'full': Scatters motifs freely across the entire viewport dimensions (0%–95%).
 */
export type ClearanceMode = "edges" | "full";

/**
 * Layer stacking z-plane placement mode.
 * - 'foreground': Mounts overlay on top with z-index: 9999 (default).
 * - 'background': Mounts overlay in the background with z-index: -1 as ambient backdrop.
 */
export type LayerStacking = "foreground" | "background";

/**
 * Advanced lantern suspension rope styles.
 * - 'straight': Linear horizontal ceiling rail with vertical cords (default).
 * - 'u-shaped': Multi-scallop festoon swag dipping between adjacent lanterns.
 * - 'dual': Dual parallel catenary cables mimicking night-market festival stringing.
 */
export type RopeStyle = "straight" | "u-shaped" | "dual";

/**
 * Physical elevation occlusion shadow depth for lanterns, ropes, and motifs.
 * - 'none': Emissive glow only (flat minimalist).
 * - 'soft': Subtle realistic depth shadow (default).
 * - 'deep': Dramatic high-contrast depth shadow.
 */
export type ShadowMode = "none" | "soft" | "deep";

/**
 * Motion and density intensity for flying/floating shapes.
 * - 'low': Calm, gentle float with minimal shapes.
 * - 'normal': Balanced, festive ambient float (default).
 * - 'high': Lively, abundant celebratory stream of shapes.
 * Also supports a numeric scale from 1 to 10.
 */
export type IntensityMode = "low" | "normal" | "high";
export type IntensityOption = IntensityMode | number;

/**
 * Custom banner greeting text — either a simple string (applied across occasions)
 * or a dictionary mapping distinct messages to 'ramadan', 'eid-fitr', and 'eid-adha'.
 */
export type BannerTextOption = string | Partial<Record<Occasion, string>>;

// ─── Visual Theme Types ──────────────────────────────────────────────────────

/**
 * Built-in cultural theme presets.
 */
export type ThemePreset =
  | "classic"
  | "midnight"
  | "emerald"
  | "royal"
  | "desert-dusk"
  | "platinum-minimal"
  | "rose-sahara";

/**
 * Complete visual theme definition schema.
 */
export interface ThemeDefinition {
  /** Optional theme identifier name */
  name?: string;
  /** Optional preset name to inherit unprovided tokens from (defaults to 'classic') */
  extends?: ThemePreset;
  /** Primary 6-slot color palette for multi-variant rendering */
  colors: [string, string, string, string, string, string] | string[];
  /** Drop-shadow halo and ambient particle glow (rgba) */
  glowColor: string;
  /** Ceiling mounting line and vertical spine cord color */
  ceilingColor: string;
  /** Individual lantern dropline cord color */
  ropeColor: string;
  /** Banner bar background color (rgba) */
  bannerBg: string;
  /** Banner greeting text typography color */
  bannerTextColor: string;
  /** Banner icon accent color */
  bannerIconColor: string;
  /** Countdown widget card background */
  countdownBg?: string;
  /** Countdown widget border outline */
  countdownBorder?: string;
  /** Countdown widget tabular digits & milestone celebration flare */
  countdownAccent?: string;
}

/**
 * Theme configuration option: either a preset name or a partial/complete custom theme.
 */
export type ThemeOption = ThemePreset | Partial<ThemeDefinition>;

// ─── Config ───────────────────────────────────────────────────────────────────

export interface RamadanOverlayConfig {
  /**
   * Predefined visual theme preset or custom theme object.
   * Harmonizes colors, glow, ceiling, rope, banner, and countdown tokens across all variants.
   * @default 'classic'
   */
  theme?: ThemeOption;

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
   * Behavior of side decorations on viewports below 768px.
   * @default 'hide'
   */
  mobileSideBehavior?: MobileSideBehavior;

  /**
   * Overall opacity of the decoration layer (0–1).
   * @default 0.85
   */
  opacity?: number;

  /**
   * Physical elevation occlusion shadow depth for lanterns, ropes, and floating motifs.
   * - 'none': Emissive glow only (flat minimalist).
   * - 'soft': Subtle realistic depth shadow (default).
   * - 'deep': Dramatic high-contrast depth shadow.
   * @default 'soft'
   */
  shadows?: ShadowMode;

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
   * Stacking elevation (z-index) specifically applied to lantern rows, hanging units, and side bands (lanterns variant).
   * Maps to the `--ro-lantern-z` CSS custom property.
   * @default 2
   */
  lanternZIndex?: number;

  /**
   * Content safe zone clearance mode for floating motifs (crescent-stars, eid).
   * - 'edges': Constrains motifs to lateral peripheral gutters, keeping central reading area sterile.
   * - 'full': Unconstrained full-viewport drift.
   * @default 'edges' for floating motif variants, 'full' for sparkles
   */
  clearance?: ClearanceMode;

  /**
   * Layer stacking placement mode.
   * - 'foreground': Positioned above host content with high z-index (default).
   * - 'background': Positioned behind host content with z-index: -1 as ambient backdrop.
   * @default 'foreground'
   */
  layer?: LayerStacking;

  /**
   * CSS selector string (e.g. '.site-header', '#navbar') or HTMLElement to attach the overlay decorations to.
   * When specified, the overlay is anchored to that element rather than the full viewport.
   * Default is undefined ("overlay above all" full-screen overlay).
   * @default undefined ("overlay above all")
   * @example attachTo: ".site-header"
   * @example attachTo: "#main-navbar"
   */
  attachTo?: string | HTMLElement;

  /**
   * Which edge of the attached element to hang decorations from (e.g. lanterns).
   * - 'bottom': Hangs along the bottom edge of the attached element, dangling downwards (default).
   * - 'top': Hangs along the top ceiling of the attached element.
   * @default 'bottom'
   */
  attachEdge?: "bottom" | "top";

  /**
   * Optional custom container element or CSS selector string to mount the overlay into.
   * Alias for `attachTo`.
   */
  mountTarget?: string | HTMLElement;

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
   * Target date to evaluate for occasion/Ramadan detection (defaults to `new Date()`).
   * Can be a Date object, ISO string, or numeric timestamp.
   * Useful for simulation, testing, and SSR environments.
   */
  date?: Date | string | number;

  /**
   * Controls whether confetti fires:
   * - `'on'`  — fires every day throughout Ramadan (default)
   * - `'off'` — disabled
   * @default 'on'
   */
  confetti?: "on" | "off";

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
   * Maximum or explicit count of hanging lanterns rendered along the ceiling (lanterns variant).
   * If omitted, calculates an airy decorative count (2–6 lanterns based on viewport width).
   * Clamped between 1 and 12.
   * @default undefined (auto-calculated: 2–6 based on screen width and density)
   */
  lanternCount?: number;

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
   * Visual style for lantern suspension strings/ropes (lanterns variant only).
   * - 'straight': Linear horizontal ceiling rail with vertical cords (default).
   * - 'u-shaped': Multi-scallop festoon swag dipping between adjacent lanterns.
   * - 'dual': Dual parallel catenary cables mimicking night-market festival stringing.
   * On vertical side positions ('left', 'right', 'sides'), gracefully falls back to 'straight'.
   * @default 'straight'
   */
  ropeStyle?: RopeStyle;

  /**
   * Sag depth in pixels for curved rope styles ('u-shaped' and 'dual').
   * Clamped between 6 and 60. Automatically scaled down on compact screens (<600px).
   * @default 20
   */
  ropeSag?: number;

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

  /**
   * Motion and density intensity for flying/floating shapes.
   * Accepts 'low' | 'normal' | 'high' or a numeric scale from 1 (serene) to 10 (festive surge).
   * Governs both the number of concurrent ascending shapes and their floating cadence.
   * Defaults to matching `density` if omitted, or 'normal'.
   * @default 'normal'
   */
  intensity?: IntensityOption;

  // ─── Banner variant options ──────────────────────────────────────────────

  /**
   * Background color of the banner bar (banner variant only).
   * @default 'rgba(15,15,20,0.92)'
   */
  bannerBg?: string;

  /**
   * Color of the greeting text in the banner (banner variant only).
   * Falls back to `colors[0]` when omitted.
   */
  bannerTextColor?: string;

  /**
   * Custom English greeting text shown in the banner (banner variant only).
   * Supports either a string or an occasion-specific dictionary.
   * When omitted the built-in occasion English greeting is used.
   */
  bannerTextEn?: BannerTextOption;

  /**
   * Custom Arabic greeting text shown in the banner (banner variant only).
   * Supports either a string or an occasion-specific dictionary.
   * When omitted the built-in occasion Arabic greeting is used.
   */
  bannerTextAr?: BannerTextOption;

  /**
   * Color of the lantern icon shown beside the banner text (banner variant only).
   * Falls back to `colors[1]` when omitted.
   */
  bannerIconColor?: string;

  /**
   * List of occasions that trigger overlay display when autoTrigger is true.
   * @default ['ramadan', 'eid-fitr', 'eid-adha']
   */
  occasions?: Occasion[];

  /**
   * Which variant to show during Eid celebrations when auto-triggered.
   * @default 'eid'
   */
  eidVariant?: OverlayVariant;

  /**
   * Whether to automatically detect midnight transitions and hot-swap active occasions in live tabs.
   * @default true
   */
  liveTransition?: boolean;

  /**
   * Called when Eid Al-Fitr or Eid Al-Adha starts.
   */
  onEidStart?: (state: RamadanState) => void;

  /**
   * Called whenever the active occasion changes (at init, midnight transition, or dynamic update).
   */
  onOccasionChange?: (occasion: Occasion, state: RamadanState) => void;

  /**
   * Iftar Countdown Widget configuration.
   * Pass an IftarCountdownConfig object to enable with custom settings,
   * true to enable with defaults, or false to disable.
   * @default false
   */
  countdown?: boolean | IftarCountdownConfig;

  /**
   * Enable diagnostic developer console logging.
   * When true, emits guidance when autoTrigger is dormant and warnings on clamped config values.
   * Defaults to active in non-production environments (`NODE_ENV !== 'production'`).
   * @default false
   */
  debug?: boolean;

  /**
   * Telemetry Hook invoked if overlay initialization or dynamic update fails.
   * Enclosed within an Error Containment Boundary so exceptions thrown within the
   * hook never crash the host application.
   */
  onError?: (error: unknown) => void;
}

// ─── State & Instance ─────────────────────────────────────────────────────────

export type Occasion = "ramadan" | "eid-fitr" | "eid-adha" | "none";

export interface RamadanDateQuery {
  /** Target Gregorian date to evaluate. Defaults to `new Date()`. */
  date?: Date | string | number;
  /** Named region preset mapping to a Hijri calendar day offset, or a custom region string. */
  region?: HijriRegion | string;
  /** Manual day offset (-3, -2, -1, 0, +1, +2, +3). Overrides `region`. */
  hijriAdjustment?: number;
  /** Enable diagnostic developer console logging */
  debug?: boolean;
}

export type OccasionDateQuery = RamadanDateQuery;

export interface RamadanState {
  /** True when the current date falls within Ramadan (Hijri month 9). */
  isRamadan: boolean;
  /** Current active occasion: 'ramadan' | 'eid-fitr' | 'eid-adha' | 'none'. */
  occasion: Occasion;
  /** True when either Eid Al-Fitr or Eid Al-Adha is active. */
  isEid: boolean;
  /** Current Hijri year number. */
  hijriYear: number;
  /** Current Hijri month number (1–12). */
  hijriMonth: number;
  /** Current Hijri day of the month (1–30). */
  hijriDay: number;
  /** Day number within active occasion (1–30 for Ramadan, 1–3 for Fitr, 1–4 for Adha), or 0 if none. */
  dayNumber: number;
}

export interface OverlayInstance {
  /** Remove the overlay from the DOM and clean up all resources. */
  destroy: () => void;
  /** Update overlay configuration dynamically without full re-creation where possible. */
  update: (config: Partial<RamadanOverlayConfig>) => void;
  /** Dynamically switch the active visual theme. Equivalent to `update({ theme })`. */
  setTheme: (theme: ThemeOption) => void;
  /** The root container element (null if overlay was not mounted). */
  container: HTMLElement | null;
  /** The detected Ramadan state at mount time. */
  state: RamadanState;
  /** The active resolved overlay configuration. */
  readonly config: ResolvedConfig;
  /** Access the active Iftar countdown widget controller, if enabled. */
  getCountdownController: () => IftarCountdownController | null;
  /** Convenient property accessor for the active Iftar countdown widget controller. */
  readonly countdown?: IftarCountdownController | null;
  /** Get the current detected Ramadan and occasion state. */
  getState: () => RamadanState;
  /** Programmatically fire the festive Ramadan / Eid celebration confetti burst. */
  fireConfetti: (occasion?: Occasion | string) => Promise<void>;
}

// ─── Countdown Types ─────────────────────────────────────────────────────────

/**
 * Dynamic callback providing the target Iftar time for a given calendar date.
 */
export type IftarTimeResolver = (
  date: Date
) => Date | string | null | undefined;

/**
 * Accepted representations of Iftar time:
 * - "HH:mm" (24-hour local time format, e.g. "18:45")
 * - ISO-8601 string (e.g. "2026-03-10T18:45:00+03:00")
 * - JavaScript Date object representing target Iftar
 * - Dynamic resolver function evaluated per calendar day
 */
export type IftarTimeValue = string | Date | IftarTimeResolver;

/**
 * Viewport anchor corner for the countdown widget.
 */
export type CountdownAnchorPosition =
  "bottom-right" | "bottom-left" | "top-right" | "top-left";

/**
 * Localized string dictionary for the countdown widget UI and screen reader announcements.
 */
export interface IftarCountdownLabels {
  title: string;
  targetTime: string;
  hours: string;
  minutes: string;
  seconds: string;
  celebration: string;
  dismissButton: string;
  minimizeButton: string;
  expandButton: string;
  muteButton: string;
  unmuteButton: string;
  playButton: string;
  srInitialAnnouncement: string;
  srMilestoneMinutes: string;
  srArrivedAnnouncement: string;
}

/**
 * Configuration options for the Iftar Countdown Widget.
 */
export interface IftarCountdownConfig {
  /**
   * Target Iftar time: "HH:mm" string, ISO string, Date object, or dynamic resolver function.
   */
  iftarTime?: IftarTimeValue;

  /**
   * Backward-compatible alias for iftarTime.
   */
  maghribTime?: IftarTimeValue;

  /**
   * Number of minutes prior to Iftar when the countdown widget becomes visible.
   * @default 30
   */
  alertWindowMinutes?: number;

  /**
   * Screen corner anchor position.
   * @default 'bottom-right'
   */
  position?: CountdownAnchorPosition;

  /**
   * Whether the countdown widget can be collapsed into a compact docked pill.
   * @default true
   */
  minimizable?: boolean;

  /**
   * Whether the widget starts in the minimized docked pill state.
   * @default false
   */
  initiallyMinimized?: boolean;

  /**
   * Number of minutes after Iftar arrives before the widget automatically dismisses and unmounts.
   * Set to 0 to disable auto-dismiss.
   * @default 10
   */
  autoDismissAfterMinutes?: number;

  /**
   * Duration in milliseconds for the celebratory gold pulse and confetti flare at T-0.
   * @default 30000 (30 seconds)
   */
  celebrationDurationMs?: number;

  /**
   * Whether audio alerts are enabled on the countdown widget.
   * When true, a sound toggle button is displayed and an alert chime plays at T-0 (if unmuted).
   * @default true
   */
  sound?: boolean;

  /**
   * Optional consumer-supplied audio chime or Adhan URL.
   * If omitted or 'default', a built-in Web Audio API harmonic chime is used.
   * Set to `false` or `'none'` to completely disable audio.
   */
  soundUrl?: string | false;

  /**
   * Whether audio alerts start muted by default.
   * @default true
   */
  defaultMuted?: boolean;

  /**
   * Whether to fire a festive confetti burst at T-0.
   * @default true
   */
  confetti?: boolean;

  /**
   * UI language locale: 'auto' detects document language, 'ar' forces Arabic, 'en' forces English.
   * @default 'auto'
   */
  locale?: "auto" | "en" | "ar";

  /**
   * Custom label overrides for card text, tooltips, and screen reader announcements.
   */
  labels?: Partial<IftarCountdownLabels>;

  /**
   * Callback fired at T-0 when Iftar arrives.
   */
  onIftar?: () => void;

  /**
   * Callback fired when audio alert playback was blocked by browser autoplay policy.
   */
  onAudioBlocked?: () => void;

  /**
   * Callback fired when the widget is dismissed.
   */
  onDismiss?: () => void;
}

/**
 * Controller interface for interacting with the active Iftar Countdown Widget.
 */
export interface IftarCountdownController {
  show: () => void;
  dismiss: () => void;
  minimize?: () => void;
  expand?: () => void;
  isMinimized?: () => boolean;
  toggleMute: () => boolean;
  isMuted: () => boolean;
  /** Programmatically play the alert chime if unmuted. Resolves true if played, false if muted or blocked. */
  playAlert?: () => Promise<boolean>;
  getTargetTime: () => Date | null;
  updateConfig: (config: Partial<IftarCountdownConfig>) => void;
}

// ─── Variant Module Contract ────────────────────────────────────────────────

/**
 * Each variant module must export a function matching this signature.
 * It mounts decoration elements into `container` and returns a cleanup function.
 */
export type VariantMountFn = (
  container: HTMLElement,
  config: ResolvedConfig,
  occasion?: Occasion
) => () => void;

// ─── Internal Resolved Config ─────────────────────────────────────────────────

export interface ResolvedConfig extends Required<
  Omit<
    RamadanOverlayConfig,
    | "theme"
    | "onError"
    | "onRamadanStart"
    | "onRamadanEnd"
    | "onEidStart"
    | "onOccasionChange"
    | "countdown"
    | "date"
    | "mountTarget"
    | "attachTo"
    | "attachEdge"
    | "lanternCount"
  >
> {
  mountTarget?: string | HTMLElement;
  attachTo?: string | HTMLElement;
  attachEdge?: "bottom" | "top";
  lanternCount?: number;
  clearance: ClearanceMode;
  layer: LayerStacking;
  date?: Date;
  debug: boolean;
  onError?: (error: unknown) => void;
  theme: ThemeOption;
  themeName: string;
  lanternStyle: LanternStyle;
  glowColor: string;
  region: HijriRegion;
  hijriAdjustment: number;
  occasions: Occasion[];
  eidVariant: OverlayVariant;
  liveTransition: boolean;
  countdown: boolean | IftarCountdownConfig;
  countdownBg?: string;
  countdownBorder?: string;
  countdownAccent?: string;
  onRamadanStart: RamadanOverlayConfig["onRamadanStart"];
  onRamadanEnd: RamadanOverlayConfig["onRamadanEnd"];
  onEidStart: RamadanOverlayConfig["onEidStart"];
  onOccasionChange: RamadanOverlayConfig["onOccasionChange"];
}

export type RamadanOverlayInstance = OverlayInstance;

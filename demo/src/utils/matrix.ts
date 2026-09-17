import type {
  OverlayVariant,
  OverlayPosition,
  RamadanOverlayConfig,
} from "ramadan-overlay";

/**
 * Maps each OverlayVariant to its physically and visually supported positions.
 */
export const VARIANT_ALLOWED_POSITIONS: Record<
  OverlayVariant,
  OverlayPosition[]
> = {
  lanterns: ["top", "left", "right", "sides", "start", "end"],
  banner: ["top", "bottom"],
  "crescent-stars": ["full", "both", "top", "bottom", "sides"],
  eid: ["full", "both", "top", "bottom", "sides"],
  "eid-fitr": ["full", "both", "top", "bottom", "sides"],
  "eid-adha": ["full", "both", "top", "bottom", "sides"],
  geometric: ["full", "both", "top", "bottom", "sides", "left", "right"],
  sparkles: ["full", "both", "top", "bottom", "sides"],
};

/**
 * Returns allowed viewport positions for the specified variant.
 */
export function getAllowedPositions(
  variant: OverlayVariant
): OverlayPosition[] {
  return VARIANT_ALLOWED_POSITIONS[variant] || ["top"];
}

/**
 * Returns the canonical default position for the specified variant.
 */
export function getDefaultPosition(variant: OverlayVariant): OverlayPosition {
  switch (variant) {
    case "lanterns":
    case "banner":
      return "top";
    case "sparkles":
      return "full";
    case "crescent-stars":
    case "eid":
    case "eid-fitr":
    case "eid-adha":
    case "geometric":
    default:
      return "both";
  }
}

/**
 * Checks if a specific configuration parameter should be rendered in the UI
 * based on the active variant and current configuration state.
 */
export function isOptionVisible(
  optionKey: string,
  variant: OverlayVariant,
  currentConfig?: Partial<RamadanOverlayConfig>
): boolean {
  switch (optionKey) {
    case "lanternStyle":
    case "lanternCount":
    case "lanternZIndex":
    case "ropeStyle":
    case "ceilingColor":
    case "ropeColor":
      return variant === "lanterns";

    case "ropeSag":
      return (
        variant === "lanterns" &&
        (currentConfig?.ropeStyle === "u-shaped" ||
          currentConfig?.ropeStyle === "dual")
      );

    case "bannerBg":
    case "bannerTextColor":
    case "bannerIconColor":
    case "bannerTextEn":
    case "bannerTextAr":
      return variant === "banner";

    case "clearance":
      return (
        variant === "crescent-stars" ||
        variant === "eid" ||
        variant === "eid-fitr" ||
        variant === "eid-adha"
      );

    case "intensity":
      return (
        variant === "crescent-stars" ||
        variant === "eid" ||
        variant === "eid-fitr" ||
        variant === "eid-adha"
      );

    case "density":
      return variant === "geometric" || variant === "sparkles";

    case "shadows":
      return (
        variant === "lanterns" ||
        variant === "crescent-stars" ||
        variant === "eid" ||
        variant === "eid-fitr" ||
        variant === "eid-adha"
      );

    case "glowColor":
      return variant === "sparkles";

    case "colors":
      return variant === "lanterns" || variant === "geometric";

    // Universal controls
    case "theme":
    case "position":
    case "opacity":
    case "layer":
    case "autoTrigger":
    case "countdown":
    case "confetti":
    case "attachTo":
      return true;

    case "attachEdge":
      return Boolean(currentConfig?.attachTo);

    case "mobileSideBehavior":
      return ["left", "right", "sides", "start", "end"].includes(
        currentConfig?.position || ""
      );

    default:
      return false;
  }
}

/**
 * Automatically sanitizes an existing configuration when switching to a new variant,
 * ensuring out-of-bounds positions or attributes default cleanly.
 */
export function sanitizeConfigForVariant(
  config: Partial<RamadanOverlayConfig>,
  newVariant: OverlayVariant
): Partial<RamadanOverlayConfig> {
  const allowedPositions = getAllowedPositions(newVariant);
  let position = config.position;

  if (!position || !allowedPositions.includes(position)) {
    position = getDefaultPosition(newVariant);
  }

  return {
    ...config,
    variant: newVariant,
    position,
  };
}

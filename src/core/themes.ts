import type {
  RamadanOverlayConfig,
  ThemeDefinition,
  ThemeOption,
  ThemePreset,
} from "../types";

export const THEME_PRESETS: Record<ThemePreset, ThemeDefinition> = {
  classic: {
    name: "classic",
    colors: ["#c9a84c", "#e5c158", "#8b4513", "#2d5a27", "#fff7cc", "#1a3a1a"],
    glowColor: "rgba(201, 168, 76, 0.55)",
    ceilingColor: "#8b4513",
    ropeColor: "#c9a84c",
    bannerBg: "rgba(24, 19, 8, 0.95)",
    bannerTextColor: "#fae17d",
    bannerIconColor: "#e5c158",
    countdownBg: "rgba(26, 20, 10, 0.95)",
    countdownBorder: "rgba(201, 168, 76, 0.35)",
    countdownAccent: "#e5c158",
  },
  midnight: {
    name: "midnight",
    colors: ["#fbbf24", "#e2e8f0", "#38bdf8", "#6366f1", "#f8fafc", "#1e293b"],
    glowColor: "rgba(56, 189, 248, 0.55)",
    ceilingColor: "#1e293b",
    ropeColor: "#64748b",
    bannerBg: "rgba(15, 23, 42, 0.95)",
    bannerTextColor: "#f8fafc",
    bannerIconColor: "#fbbf24",
    countdownBg: "rgba(15, 23, 42, 0.95)",
    countdownBorder: "rgba(56, 189, 248, 0.35)",
    countdownAccent: "#fbbf24",
  },
  emerald: {
    name: "emerald",
    colors: ["#f59e0b", "#10b981", "#059669", "#064e3b", "#fde68a", "#022c22"],
    glowColor: "rgba(16, 185, 129, 0.55)",
    ceilingColor: "#064e3b",
    ropeColor: "#059669",
    bannerBg: "rgba(2, 44, 34, 0.95)",
    bannerTextColor: "#fef3c7",
    bannerIconColor: "#f59e0b",
    countdownBg: "rgba(4, 38, 28, 0.95)",
    countdownBorder: "rgba(16, 185, 129, 0.35)",
    countdownAccent: "#f59e0b",
  },
  royal: {
    name: "royal",
    colors: ["#fcd34d", "#a78bfa", "#7c3aed", "#4c1d95", "#fef08a", "#2e1065"],
    glowColor: "rgba(167, 139, 250, 0.55)",
    ceilingColor: "#4c1d95",
    ropeColor: "#8b5cf6",
    bannerBg: "rgba(30, 11, 64, 0.95)",
    bannerTextColor: "#fef08a",
    bannerIconColor: "#fcd34d",
    countdownBg: "rgba(32, 13, 64, 0.95)",
    countdownBorder: "rgba(167, 139, 250, 0.35)",
    countdownAccent: "#fcd34d",
  },
  "desert-dusk": {
    name: "desert-dusk",
    colors: ["#f97316", "#fde047", "#ea580c", "#c2410c", "#fed7aa", "#7c2d12"],
    glowColor: "rgba(249, 115, 22, 0.55)",
    ceilingColor: "#7c2d12",
    ropeColor: "#c2410c",
    bannerBg: "rgba(43, 14, 5, 0.95)",
    bannerTextColor: "#fef3c7",
    bannerIconColor: "#f97316",
    countdownBg: "rgba(43, 14, 5, 0.95)",
    countdownBorder: "rgba(249, 115, 22, 0.35)",
    countdownAccent: "#fde047",
  },
  "platinum-minimal": {
    name: "platinum-minimal",
    colors: ["#e2e8f0", "#94a3b8", "#cbd5e1", "#64748b", "#f8fafc", "#334155"],
    glowColor: "rgba(226, 232, 240, 0.45)",
    ceilingColor: "#475569",
    ropeColor: "#94a3b8",
    bannerBg: "rgba(15, 23, 42, 0.95)",
    bannerTextColor: "#f8fafc",
    bannerIconColor: "#e2e8f0",
    countdownBg: "rgba(15, 23, 42, 0.95)",
    countdownBorder: "rgba(148, 163, 184, 0.35)",
    countdownAccent: "#f8fafc",
  },
  "rose-sahara": {
    name: "rose-sahara",
    colors: ["#fb7185", "#f43f5e", "#fda4af", "#e11d48", "#fff1f2", "#be123c"],
    glowColor: "rgba(251, 113, 133, 0.55)",
    ceilingColor: "#881337",
    ropeColor: "#e11d48",
    bannerBg: "rgba(40, 10, 20, 0.95)",
    bannerTextColor: "#fff1f2",
    bannerIconColor: "#fb7185",
    countdownBg: "rgba(40, 10, 20, 0.95)",
    countdownBorder: "rgba(251, 113, 133, 0.35)",
    countdownAccent: "#fda4af",
  },
};

export const themes = {
  classic: THEME_PRESETS.classic,
  midnight: THEME_PRESETS.midnight,
  emerald: THEME_PRESETS.emerald,
  royal: THEME_PRESETS.royal,
  desertDusk: THEME_PRESETS["desert-dusk"],
  platinumMinimal: THEME_PRESETS["platinum-minimal"],
  roseSahara: THEME_PRESETS["rose-sahara"],
};

export function resolveTheme(
  themeOption?: ThemeOption,
  explicitConfig?: Partial<RamadanOverlayConfig>
): ThemeDefinition {
  let basePresetName: ThemePreset = "classic";
  let customOverrides: Partial<ThemeDefinition> = {};

  if (typeof themeOption === "string") {
    if (THEME_PRESETS[themeOption]) {
      basePresetName = themeOption;
    }
  } else if (typeof themeOption === "object" && themeOption !== null) {
    if (themeOption.extends && THEME_PRESETS[themeOption.extends]) {
      basePresetName = themeOption.extends;
    }
    customOverrides = themeOption;
  }

  const baseTheme = THEME_PRESETS[basePresetName];

  // Resolve colors
  let colors: string[] = [...baseTheme.colors];
  if (explicitConfig?.colors && explicitConfig.colors.length > 0) {
    colors = explicitConfig.colors;
  } else if (customOverrides.colors && customOverrides.colors.length > 0) {
    colors = customOverrides.colors;
  }

  return {
    name:
      typeof themeOption === "string"
        ? THEME_PRESETS[themeOption]
          ? themeOption
          : "classic"
        : (customOverrides.name ?? (themeOption ? "custom" : "classic")),
    extends: basePresetName,
    colors,
    glowColor:
      explicitConfig?.glowColor ??
      customOverrides.glowColor ??
      baseTheme.glowColor,
    ceilingColor:
      explicitConfig?.ceilingColor ??
      customOverrides.ceilingColor ??
      baseTheme.ceilingColor,
    ropeColor:
      explicitConfig?.ropeColor ??
      customOverrides.ropeColor ??
      baseTheme.ropeColor,
    bannerBg:
      explicitConfig?.bannerBg ??
      customOverrides.bannerBg ??
      baseTheme.bannerBg,
    bannerTextColor:
      explicitConfig?.bannerTextColor ??
      customOverrides.bannerTextColor ??
      baseTheme.bannerTextColor,
    bannerIconColor:
      explicitConfig?.bannerIconColor ??
      customOverrides.bannerIconColor ??
      baseTheme.bannerIconColor,
    countdownBg: customOverrides.countdownBg ?? baseTheme.countdownBg,
    countdownBorder:
      customOverrides.countdownBorder ?? baseTheme.countdownBorder,
    countdownAccent:
      customOverrides.countdownAccent ?? baseTheme.countdownAccent,
  };
}

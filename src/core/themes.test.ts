import { describe, expect, it } from "vitest";
import { resolveTheme, THEME_PRESETS, themes } from "./themes";
import type { ThemeDefinition } from "../types";

describe("Theme Resolution Engine", () => {
  it("exports THEME_PRESETS and themes dictionary with all 5 ratified presets", () => {
    expect(THEME_PRESETS).toBeDefined();
    expect(themes).toBeDefined();

    const expectedPresets = [
      "classic",
      "midnight",
      "emerald",
      "royal",
      "desert-dusk",
    ];

    expectedPresets.forEach((name) => {
      expect(THEME_PRESETS[name as keyof typeof THEME_PRESETS]).toBeDefined();
    });

    expect(themes.classic).toBe(THEME_PRESETS.classic);
    expect(themes.midnight).toBe(THEME_PRESETS.midnight);
    expect(themes.emerald).toBe(THEME_PRESETS.emerald);
    expect(themes.royal).toBe(THEME_PRESETS.royal);
    expect(themes.desertDusk).toBe(THEME_PRESETS["desert-dusk"]);
  });

  it("resolves classic preset by default when themeOption is omitted", () => {
    const theme = resolveTheme();
    expect(theme.name).toBe("classic");
    expect(theme.colors).toEqual([
      "#c9a84c",
      "#e5c158",
      "#8b4513",
      "#2d5a27",
      "#fff7cc",
      "#1a3a1a",
    ]);
    expect(theme.glowColor).toBe("rgba(201, 168, 76, 0.55)");
    expect(theme.ceilingColor).toBe("#8b4513");
    expect(theme.ropeColor).toBe("#c9a84c");
    expect(theme.bannerBg).toBe("rgba(24, 19, 8, 0.95)");
    expect(theme.bannerTextColor).toBe("#fae17d");
    expect(theme.bannerIconColor).toBe("#e5c158");
    expect(theme.countdownBg).toBe("rgba(26, 20, 10, 0.95)");
    expect(theme.countdownBorder).toBe("rgba(201, 168, 76, 0.35)");
    expect(theme.countdownAccent).toBe("#e5c158");
  });

  it("resolves midnight preset with ratified nocturnal tokens", () => {
    const theme = resolveTheme("midnight");
    expect(theme.name).toBe("midnight");
    expect(theme.colors).toEqual([
      "#fbbf24",
      "#e2e8f0",
      "#38bdf8",
      "#6366f1",
      "#f8fafc",
      "#1e293b",
    ]);
    expect(theme.glowColor).toBe("rgba(56, 189, 248, 0.55)");
    expect(theme.ceilingColor).toBe("#1e293b");
    expect(theme.ropeColor).toBe("#64748b");
    expect(theme.bannerBg).toBe("rgba(15, 23, 42, 0.95)");
    expect(theme.bannerTextColor).toBe("#f8fafc");
    expect(theme.bannerIconColor).toBe("#fbbf24");
    expect(theme.countdownBg).toBe("rgba(15, 23, 42, 0.95)");
    expect(theme.countdownBorder).toBe("rgba(56, 189, 248, 0.35)");
    expect(theme.countdownAccent).toBe("#fbbf24");
  });

  it("resolves emerald, royal, and desert-dusk presets accurately", () => {
    const emerald = resolveTheme("emerald");
    expect(emerald.name).toBe("emerald");
    expect(emerald.colors[0]).toBe("#f59e0b");
    expect(emerald.glowColor).toBe("rgba(16, 185, 129, 0.55)");

    const royal = resolveTheme("royal");
    expect(royal.name).toBe("royal");
    expect(royal.colors[0]).toBe("#fcd34d");
    expect(royal.glowColor).toBe("rgba(167, 139, 250, 0.55)");

    const desertDusk = resolveTheme("desert-dusk");
    expect(desertDusk.name).toBe("desert-dusk");
    expect(desertDusk.colors[0]).toBe("#f97316");
    expect(desertDusk.glowColor).toBe("rgba(249, 115, 22, 0.55)");
  });

  it("falls back to classic preset when unknown string preset is provided", () => {
    // @ts-expect-error Testing invalid runtime string
    const theme = resolveTheme("unknown-preset");
    expect(theme.name).toBe("classic");
    expect(theme.colors).toEqual(THEME_PRESETS.classic.colors);
  });

  it("resolves partial custom theme and inherits omitted tokens from classic", () => {
    const custom: Partial<ThemeDefinition> = {
      name: "cyberpunk",
      colors: ["#ff007f", "#00f0ff", "#ffe600"],
      glowColor: "rgba(255, 0, 127, 0.8)",
    };

    const theme = resolveTheme(custom);
    expect(theme.name).toBe("cyberpunk");
    expect(theme.colors).toEqual(["#ff007f", "#00f0ff", "#ffe600"]);
    expect(theme.glowColor).toBe("rgba(255, 0, 127, 0.8)");
    // Fallbacks from classic
    expect(theme.ceilingColor).toBe(THEME_PRESETS.classic.ceilingColor);
    expect(theme.ropeColor).toBe(THEME_PRESETS.classic.ropeColor);
    expect(theme.bannerBg).toBe(THEME_PRESETS.classic.bannerBg);
    expect(theme.countdownBg).toBe(THEME_PRESETS.classic.countdownBg);
  });

  it("resolves custom theme with extends: 'midnight' inheriting from midnight", () => {
    const custom: Partial<ThemeDefinition> = {
      name: "custom-nocturne",
      extends: "midnight",
      colors: ["#ffffff", "#00ffcc"],
    };

    const theme = resolveTheme(custom);
    expect(theme.name).toBe("custom-nocturne");
    expect(theme.colors).toEqual(["#ffffff", "#00ffcc"]);
    // Inherited from midnight
    expect(theme.glowColor).toBe(THEME_PRESETS.midnight.glowColor);
    expect(theme.ceilingColor).toBe(THEME_PRESETS.midnight.ceilingColor);
    expect(theme.ropeColor).toBe(THEME_PRESETS.midnight.ropeColor);
    expect(theme.bannerBg).toBe(THEME_PRESETS.midnight.bannerBg);
  });

  it("enforces strict precedence: explicit user configuration overrides theme tokens", () => {
    const theme = resolveTheme("royal", {
      colors: ["#111111", "#222222"],
      glowColor: "rgba(255, 255, 255, 0.9)",
      ceilingColor: "#000000",
      ropeColor: "#ffffff",
      bannerBg: "rgba(0, 0, 0, 0.8)",
      bannerTextColor: "#ffcc00",
      bannerIconColor: "#00ffcc",
    });

    expect(theme.name).toBe("royal");
    expect(theme.colors).toEqual(["#111111", "#222222"]);
    expect(theme.glowColor).toBe("rgba(255, 255, 255, 0.9)");
    expect(theme.ceilingColor).toBe("#000000");
    expect(theme.ropeColor).toBe("#ffffff");
    expect(theme.bannerBg).toBe("rgba(0, 0, 0, 0.8)");
    expect(theme.bannerTextColor).toBe("#ffcc00");
    expect(theme.bannerIconColor).toBe("#00ffcc");
  });
});

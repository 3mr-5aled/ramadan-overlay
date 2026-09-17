import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  resolveIntensityValue,
  calculateAscendingItemCount,
  calculateAscendingDurationRange,
} from "../motion";
import { mountCrescentStars } from "./crescent-stars";
import { mountEid } from "./eid";
import type { ResolvedConfig } from "../../types";

describe("Ascending Flying Shapes & Intensity", () => {
  let container: HTMLElement;

  const createConfig = (
    overrides: Partial<ResolvedConfig> = {}
  ): ResolvedConfig => ({
    debug: false,
    variant: "crescent-stars",
    theme: "classic",
    themeName: "classic",
    position: "both",
    mobileSideBehavior: "hide",
    opacity: 0.85,
    colors: ["#c9a84c", "#e8c96b", "#2d5a27", "#8b4513", "#1a3a1a"],
    clearance: "edges",
    layer: "foreground",
    density: "normal",
    intensity: "normal",
    shadows: "soft",
    lanternStyle: 0,
    zIndex: 9999,
    glowColor: "rgba(201,168,76,0.5)",
    ceilingColor: "#c9a84c",
    ropeColor: "#c9a84c",
    ropeStyle: "straight",
    ropeSag: 20,
    confetti: "on",
    region: "standard",
    hijriAdjustment: 0,
    autoTrigger: true,
    previewMode: false,
    bannerBg: "#1a3a1a",
    bannerTextColor: "#e8c96b",
    bannerIconColor: "#c9a84c",
    bannerTextEn: "",
    bannerTextAr: "",
    locale: "en",
    occasions: ["ramadan", "eid-fitr", "eid-adha"],
    eidVariant: "eid",
    liveTransition: true,
    countdown: false,
    countdownBg: "#1a162b",
    countdownBorder: "rgba(201,168,76,0.25)",
    countdownAccent: "#c9a84c",
    onRamadanStart: undefined,
    onRamadanEnd: undefined,
    onEidStart: undefined,
    onOccasionChange: undefined,
    ...overrides,
  });

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("resolveIntensityValue", () => {
    it("resolves presets: low -> 3, normal -> 5, high -> 8", () => {
      expect(resolveIntensityValue("low")).toBe(3);
      expect(resolveIntensityValue("normal")).toBe(5);
      expect(resolveIntensityValue("high")).toBe(8);
      expect(resolveIntensityValue(undefined)).toBe(5);
    });

    it("clamps numeric values to 1..10", () => {
      expect(resolveIntensityValue(1)).toBe(1);
      expect(resolveIntensityValue(7)).toBe(7);
      expect(resolveIntensityValue(10)).toBe(10);
      expect(resolveIntensityValue(0)).toBe(1);
      expect(resolveIntensityValue(15)).toBe(10);
    });

    it("falls back to density when intensity is normal or omitted", () => {
      expect(resolveIntensityValue("normal", "low")).toBe(3);
      expect(resolveIntensityValue("normal", "high")).toBe(8);
      expect(resolveIntensityValue(undefined, "high")).toBe(8);
    });

    it("prefers explicit non-normal intensity over density", () => {
      expect(resolveIntensityValue("high", "low")).toBe(8);
      expect(resolveIntensityValue(9, "low")).toBe(9);
    });
  });

  describe("calculateAscendingItemCount & calculateAscendingDurationRange", () => {
    it("increases item count as intensity increases", () => {
      const lowCount = calculateAscendingItemCount(3, false);
      const normalCount = calculateAscendingItemCount(5, false);
      const highCount = calculateAscendingItemCount(8, false);
      const maxCount = calculateAscendingItemCount(10, false);

      expect(normalCount).toBeGreaterThan(lowCount);
      expect(highCount).toBeGreaterThan(normalCount);
      expect(maxCount).toBeGreaterThan(highCount);
    });

    it("scales item count down on mobile", () => {
      const desktop = calculateAscendingItemCount(5, false);
      const mobile = calculateAscendingItemCount(5, true);
      expect(desktop).toBeGreaterThan(mobile);
      expect(mobile).toBeGreaterThanOrEqual(4);
    });

    it("decreases duration (faster ascent) as intensity increases", () => {
      const lowDuration = calculateAscendingDurationRange(3);
      const highDuration = calculateAscendingDurationRange(8);

      expect(lowDuration.minDuration).toBeGreaterThan(highDuration.minDuration);
      expect(lowDuration.maxDuration).toBeGreaterThan(highDuration.maxDuration);
    });
  });

  describe("mountCrescentStars ascending geometry & intensity", () => {
    it("mounts elements anchored at top: 102% with pre-warmed negative animation delay", () => {
      const config = createConfig();
      const cleanup = mountCrescentStars(container, config);

      const children = Array.from(container.children) as HTMLElement[];
      expect(children.length).toBeGreaterThan(0);

      for (const el of children) {
        expect(el.style.top).toBe("102%");
        // Negative animation delay ensures instant visual distribution
        expect(el.style.animationDelay).toMatch(/^-?\d+(\.\d+)?s$/);
        expect(parseFloat(el.style.animationDelay)).toBeLessThanOrEqual(0);
        expect(el.style.getPropertyValue("--ro-float-duration")).toBeTruthy();
        expect(el.style.getPropertyValue("--ro-sway-1")).toBeTruthy();
      }

      cleanup();
      expect(container.children.length).toBe(0);
    });

    it("mounts more shapes when intensity is high than when low", () => {
      const configLow = createConfig({ intensity: "low" });
      const cleanupLow = mountCrescentStars(container, configLow);
      const lowCount = container.children.length;
      cleanupLow();

      const configHigh = createConfig({ intensity: "high" });
      const cleanupHigh = mountCrescentStars(container, configHigh);
      const highCount = container.children.length;
      cleanupHigh();

      expect(highCount).toBeGreaterThan(lowCount);
    });

    it("respects custom numeric intensity (e.g. 10 vs 2)", () => {
      const configLow = createConfig({ intensity: 2 });
      const cleanupLow = mountCrescentStars(container, configLow);
      const lowCount = container.children.length;
      cleanupLow();

      const configMax = createConfig({ intensity: 10 });
      const cleanupMax = mountCrescentStars(container, configMax);
      const maxCount = container.children.length;
      cleanupMax();

      expect(maxCount).toBeGreaterThan(lowCount);
    });
  });

  describe("mountEid ascending geometry & intensity", () => {
    it("mounts Eid motifs anchored at top: 102% with negative animation delay", () => {
      const config = createConfig({ variant: "eid" });
      const cleanup = mountEid(container, config, "eid-fitr");

      const children = Array.from(container.children) as HTMLElement[];
      expect(children.length).toBeGreaterThan(0);

      for (const el of children) {
        expect(el.style.top).toBe("102%");
        expect(parseFloat(el.style.animationDelay)).toBeLessThanOrEqual(0);
        expect(el.style.getPropertyValue("--ro-float-duration")).toBeTruthy();
      }

      cleanup();
    });

    it("scales Eid motifs with numeric intensity", () => {
      const configLow = createConfig({ variant: "eid", intensity: 2 });
      const cleanupLow = mountEid(container, configLow, "eid-fitr");
      const lowCount = container.children.length;
      cleanupLow();

      const configHigh = createConfig({ variant: "eid", intensity: 9 });
      const cleanupHigh = mountEid(container, configHigh, "eid-fitr");
      const highCount = container.children.length;
      cleanupHigh();

      expect(highCount).toBeGreaterThan(lowCount);
    });
  });
});

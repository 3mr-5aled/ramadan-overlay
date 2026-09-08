import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { init } from "./injector";
import type { OverlayPosition, MobileSideBehavior } from "../types";

describe("Vertical Viewport Positioning", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Config & Fallback Seam", () => {
    it("resolves all side positions on overlay instance config", () => {
      const positions: OverlayPosition[] = [
        "left",
        "right",
        "sides",
        "start",
        "end",
      ];

      for (const pos of positions) {
        const overlay = init({
          previewMode: true,
          position: pos,
        });

        expect(overlay.config.position).toBe(pos);
        expect(overlay.config.mobileSideBehavior).toBe("hide");
        overlay.destroy();
      }
    });

    it("preserves custom mobileSideBehavior", () => {
      const behaviors: MobileSideBehavior[] = ["hide", "top", "show"];

      for (const behavior of behaviors) {
        const overlay = init({
          previewMode: true,
          position: "sides",
          mobileSideBehavior: behavior,
        });

        expect(overlay.config.mobileSideBehavior).toBe(behavior);
        overlay.destroy();
      }
    });

    it("falls back banner variant with side position to 'top' and emits console.warn", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const overlay = init({
        previewMode: true,
        variant: "banner",
        position: "sides",
      });

      expect(overlay.config.position).toBe("top");
      expect(warnSpy).toHaveBeenCalledWith(
        '[ramadan-overlay] Banner variant does not support vertical side positioning; falling back to "top"'
      );

      warnSpy.mockRestore();
      overlay.destroy();
    });
  });

  describe("DOM Host & CSS Seam", () => {
    it("sets data-mobile-side and data-position attributes on overlay root", () => {
      const overlay = init({
        previewMode: true,
        position: "sides",
        mobileSideBehavior: "show",
      });

      expect(overlay.container).not.toBeNull();
      expect(overlay.container?.getAttribute("data-mobile-side")).toBe("show");
      expect(overlay.container?.getAttribute("data-position")).toBe("sides");

      overlay.destroy();
    });

    it("injects vertical positioning styles and keyframes into document head", () => {
      const overlay = init({
        previewMode: true,
        position: "sides",
      });

      const styleEl = document.getElementById("ramadan-overlay-styles");
      expect(styleEl).not.toBeNull();
      const css = styleEl?.textContent ?? "";

      expect(css).toContain(".ro-lantern-side");
      expect(css).toContain(".ro-side-band");
      expect(css).toContain("ro-swing-side");
      expect(css).toContain("max-width: 767px");
      expect(css).toContain("clamp(28px,4vw,64px)");

      overlay.destroy();
    });

    it("updates data-mobile-side and data-position on dynamic update", () => {
      const overlay = init({
        previewMode: true,
        position: "left",
        mobileSideBehavior: "hide",
      });

      expect(overlay.container?.getAttribute("data-mobile-side")).toBe("hide");
      expect(overlay.container?.getAttribute("data-position")).toBe("left");

      overlay.update({
        position: "right",
        mobileSideBehavior: "top",
      });

      expect(overlay.container?.getAttribute("data-mobile-side")).toBe("top");
      expect(overlay.container?.getAttribute("data-position")).toBe("right");

      overlay.destroy();
    });

    it("sets and unsets data-is-side attribute based on side positioning", () => {
      const overlay = init({
        previewMode: true,
        position: "sides",
      });

      expect(overlay.container?.getAttribute("data-is-side")).toBe("true");

      overlay.update({ position: "top" });
      expect(overlay.container?.getAttribute("data-is-side")).toBeNull();

      overlay.destroy();
    });

    it("falls back to top position on narrow screens (< 768px) when mobileSideBehavior is 'top'", () => {
      const originalWidth = window.innerWidth;
      try {
        Object.defineProperty(window, "innerWidth", {
          writable: true,
          configurable: true,
          value: 480,
        });

        const overlay = init({
          previewMode: true,
          variant: "lanterns",
          position: "sides",
          mobileSideBehavior: "top",
        });

        expect(
          overlay.container?.querySelector(".ro-lantern-row")
        ).not.toBeNull();
        expect(overlay.container?.querySelector(".ro-lantern-side")).toBeNull();

        overlay.destroy();
      } finally {
        Object.defineProperty(window, "innerWidth", {
          writable: true,
          configurable: true,
          value: originalWidth,
        });
      }
    });
  });

  describe("Variant Visual Seams - Lanterns", () => {
    it("mounts vertical lantern spine and units for 'left' position", () => {
      const overlay = init({
        previewMode: true,
        variant: "lanterns",
        position: "left",
      });

      expect(overlay.container).not.toBeNull();
      expect(overlay.container?.querySelector(".ro-lantern-row")).toBeNull();

      const leftSide = overlay.container?.querySelector(
        ".ro-lantern-side--left"
      );
      expect(leftSide).not.toBeNull();
      expect(
        overlay.container?.querySelector(".ro-lantern-side--right")
      ).toBeNull();

      const spine = leftSide?.querySelector(".ro-lantern-spine");
      expect(spine).not.toBeNull();

      const units = leftSide?.querySelectorAll(".ro-lantern-unit");
      expect(units && units.length).toBeGreaterThanOrEqual(2);

      const firstUnit = units?.[0];
      expect(firstUnit?.querySelector(".ro-lantern-dropline")).not.toBeNull();
      expect(
        firstUnit?.querySelector(".ro-lantern-svg-wrap svg")
      ).not.toBeNull();

      overlay.destroy();
    });

    it("mounts both left and right sides for 'sides' position", () => {
      const overlay = init({
        previewMode: true,
        variant: "lanterns",
        position: "sides",
      });

      expect(
        overlay.container?.querySelector(".ro-lantern-side--left")
      ).not.toBeNull();
      expect(
        overlay.container?.querySelector(".ro-lantern-side--right")
      ).not.toBeNull();

      overlay.destroy();
    });

    it("resolves logical 'start' and 'end' based on RTL direction", () => {
      // Test LTR (default)
      document.documentElement.dir = "ltr";
      const overlayLtr = init({
        previewMode: true,
        variant: "lanterns",
        position: "start",
      });
      expect(
        overlayLtr.container?.querySelector(".ro-lantern-side--left")
      ).not.toBeNull();
      expect(
        overlayLtr.container?.querySelector(".ro-lantern-side--right")
      ).toBeNull();
      overlayLtr.destroy();

      // Test RTL
      document.documentElement.dir = "rtl";
      const overlayRtl = init({
        previewMode: true,
        variant: "lanterns",
        position: "start",
      });
      expect(
        overlayRtl.container?.querySelector(".ro-lantern-side--right")
      ).not.toBeNull();
      expect(
        overlayRtl.container?.querySelector(".ro-lantern-side--left")
      ).toBeNull();
      overlayRtl.destroy();

      document.documentElement.dir = "";
    });

    it("updates lantern unit count dynamically on window resize without leaking listeners", () => {
      const originalHeight = window.innerHeight;
      try {
        Object.defineProperty(window, "innerHeight", {
          writable: true,
          configurable: true,
          value: 600,
        });

        const overlay = init({
          previewMode: true,
          variant: "lanterns",
          position: "left",
        });

        const initialUnits =
          overlay.container?.querySelectorAll(".ro-lantern-unit").length;

        Object.defineProperty(window, "innerHeight", {
          writable: true,
          configurable: true,
          value: 1200,
        });
        window.dispatchEvent(new Event("resize"));

        const updatedUnits =
          overlay.container?.querySelectorAll(".ro-lantern-unit").length;
        expect(updatedUnits).toBeGreaterThan(initialUnits ?? 0);

        overlay.destroy();
      } finally {
        Object.defineProperty(window, "innerHeight", {
          writable: true,
          configurable: true,
          value: originalHeight,
        });
      }
    });
  });

  describe("Variant Visual Seams - Geometric", () => {
    it("mounts vertical SVG pattern bands for side positions", () => {
      const overlay = init({
        previewMode: true,
        variant: "geometric",
        position: "sides",
      });

      expect(overlay.container?.querySelector(".ro-geo-band--top")).toBeNull();
      expect(
        overlay.container?.querySelector(".ro-geo-band--bottom")
      ).toBeNull();

      const leftBand = overlay.container?.querySelector(".ro-side-band--left");
      const rightBand = overlay.container?.querySelector(
        ".ro-side-band--right"
      );

      expect(leftBand).not.toBeNull();
      expect(rightBand).not.toBeNull();

      const pattern = leftBand?.querySelector("defs pattern");
      expect(pattern).not.toBeNull();

      const rect = leftBand?.querySelector("rect");
      expect(rect?.getAttribute("fill")).toContain("url(#");

      overlay.destroy();
    });

    it("uses CSS variable theme tokens inside pattern definitions", () => {
      const overlay = init({
        previewMode: true,
        variant: "geometric",
        position: "left",
      });

      const pattern = overlay.container?.querySelector("defs pattern");
      expect(pattern?.innerHTML).toContain("var(--ro-color-1");
      expect(pattern?.innerHTML).toContain("var(--ro-color-2");

      overlay.destroy();
    });
  });

  describe("Variant Visual Seams - Ambient Particles", () => {
    it("constrains sparkles particle spawning to the active left gutter", () => {
      const overlay = init({
        previewMode: true,
        variant: "sparkles",
        position: "left",
      });

      const sparkles = overlay.container?.querySelectorAll(".ro-sparkle");
      expect(sparkles && sparkles.length).toBeGreaterThan(0);

      // In jsdom or normal window, all sparkles should have left coordinate constrained
      sparkles?.forEach((s) => {
        const leftVal = parseFloat((s as HTMLElement).style.left);
        expect(leftVal).toBeLessThanOrEqual(5);
      });

      overlay.destroy();
    });
  });
});

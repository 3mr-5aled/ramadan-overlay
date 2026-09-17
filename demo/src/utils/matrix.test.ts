import { describe, it, expect } from "vitest";
import type { OverlayVariant, OverlayPosition } from "../../../src/types";
import {
  getAllowedPositions,
  isOptionVisible,
  sanitizeConfigForVariant,
} from "./matrix";

describe("Variant Capability Matrix", () => {
  describe("getAllowedPositions", () => {
    it("restricts lanterns strictly to ceiling and side positions, excluding bottom, both, and full", () => {
      const allowed = getAllowedPositions("lanterns");
      expect(allowed).toEqual([
        "top",
        "left",
        "right",
        "sides",
        "start",
        "end",
      ]);
      expect(allowed).not.toContain("bottom");
      expect(allowed).not.toContain("both");
      expect(allowed).not.toContain("full");
    });

    it("restricts banner strictly to top and bottom, excluding sides, both, and full", () => {
      const allowed = getAllowedPositions("banner");
      expect(allowed).toEqual(["top", "bottom"]);
      expect(allowed).not.toContain("sides");
      expect(allowed).not.toContain("left");
      expect(allowed).not.toContain("right");
      expect(allowed).not.toContain("both");
      expect(allowed).not.toContain("full");
    });

    it("allows full, both, top, bottom, sides for crescent-stars and eid variants", () => {
      const variants: OverlayVariant[] = [
        "crescent-stars",
        "eid",
        "eid-fitr",
        "eid-adha",
      ];
      for (const v of variants) {
        const allowed = getAllowedPositions(v);
        expect(allowed).toContain("full");
        expect(allowed).toContain("both");
        expect(allowed).toContain("top");
        expect(allowed).toContain("bottom");
        expect(allowed).toContain("sides");
      }
    });

    it("allows full, both, top, bottom, sides, left, right for geometric", () => {
      const allowed = getAllowedPositions("geometric");
      expect(allowed).toContain("full");
      expect(allowed).toContain("both");
      expect(allowed).toContain("top");
      expect(allowed).toContain("bottom");
      expect(allowed).toContain("sides");
      expect(allowed).toContain("left");
      expect(allowed).toContain("right");
    });

    it("allows full, both, top, bottom, sides for sparkles", () => {
      const allowed = getAllowedPositions("sparkles");
      expect(allowed).toEqual(["full", "both", "top", "bottom", "sides"]);
    });
  });

  describe("isOptionVisible", () => {
    it("flags lantern-specific controls as visible only when variant is lanterns", () => {
      expect(isOptionVisible("lanternStyle", "lanterns")).toBe(true);
      expect(isOptionVisible("ropeStyle", "lanterns")).toBe(true);
      expect(isOptionVisible("ceilingColor", "lanterns")).toBe(true);
      expect(isOptionVisible("ropeColor", "lanterns")).toBe(true);

      expect(isOptionVisible("lanternStyle", "banner")).toBe(false);
      expect(isOptionVisible("ropeStyle", "crescent-stars")).toBe(false);
      expect(isOptionVisible("ceilingColor", "geometric")).toBe(false);
    });

    it("flags ropeSag visible only when ropeStyle is curved (u-shaped or dual)", () => {
      expect(
        isOptionVisible("ropeSag", "lanterns", { ropeStyle: "straight" })
      ).toBe(false);
      expect(
        isOptionVisible("ropeSag", "lanterns", { ropeStyle: "u-shaped" })
      ).toBe(true);
      expect(
        isOptionVisible("ropeSag", "lanterns", { ropeStyle: "dual" })
      ).toBe(true);
      expect(
        isOptionVisible("ropeSag", "banner", { ropeStyle: "u-shaped" })
      ).toBe(false);
    });

    it("flags banner-specific controls visible only for banner variant", () => {
      expect(isOptionVisible("bannerBg", "banner")).toBe(true);
      expect(isOptionVisible("bannerTextColor", "banner")).toBe(true);
      expect(isOptionVisible("bannerTextAr", "banner")).toBe(true);
      expect(isOptionVisible("bannerTextEn", "banner")).toBe(true);

      expect(isOptionVisible("bannerBg", "lanterns")).toBe(false);
      expect(isOptionVisible("bannerTextColor", "geometric")).toBe(false);
      expect(isOptionVisible("bannerTextAr", "crescent-stars")).toBe(false);
    });

    it("flags clearance visible only for floating motif variants", () => {
      expect(isOptionVisible("clearance", "crescent-stars")).toBe(true);
      expect(isOptionVisible("clearance", "eid")).toBe(true);
      expect(isOptionVisible("clearance", "eid-fitr")).toBe(true);
      expect(isOptionVisible("clearance", "eid-adha")).toBe(true);

      expect(isOptionVisible("clearance", "lanterns")).toBe(false);
      expect(isOptionVisible("clearance", "banner")).toBe(false);
      expect(isOptionVisible("clearance", "geometric")).toBe(false);
      expect(isOptionVisible("clearance", "sparkles")).toBe(false);
    });

    it("flags glowColor visible only for sparkles variant", () => {
      expect(isOptionVisible("glowColor", "sparkles")).toBe(true);
      expect(isOptionVisible("glowColor", "lanterns")).toBe(false);
      expect(isOptionVisible("glowColor", "geometric")).toBe(false);
      expect(isOptionVisible("glowColor", "banner")).toBe(false);
    });

    it("flags universal controls as visible across all variants", () => {
      expect(isOptionVisible("confetti", "lanterns")).toBe(true);
      expect(isOptionVisible("theme", "banner")).toBe(true);
      expect(isOptionVisible("position", "sparkles")).toBe(true);
    });
  });

  describe("sanitizeConfigForVariant", () => {
    it("silently sanitizes position to top when transitioning to lanterns from bottom", () => {
      const sanitized = sanitizeConfigForVariant(
        { position: "bottom", variant: "geometric" },
        "lanterns"
      );
      expect(sanitized.variant).toBe("lanterns");
      expect(sanitized.position).toBe("top");
    });

    it("silently sanitizes position to top when transitioning to banner from sides", () => {
      const sanitized = sanitizeConfigForVariant(
        { position: "sides", variant: "lanterns" },
        "banner"
      );
      expect(sanitized.variant).toBe("banner");
      expect(sanitized.position).toBe("top");
    });

    it("preserves valid positions across compatible variant switches", () => {
      const sanitized = sanitizeConfigForVariant(
        { position: "sides", variant: "lanterns" },
        "geometric"
      );
      expect(sanitized.variant).toBe("geometric");
      expect(sanitized.position).toBe("sides");
    });
  });
});

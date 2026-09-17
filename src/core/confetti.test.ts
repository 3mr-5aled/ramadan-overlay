import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getOccasionConfettiEmojis,
  fireRamadanConfetti,
  shouldFireConfetti,
} from "./confetti";
import type { RamadanState } from "../types";
import { init } from "./injector";

describe("occasion-aware confetti", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  describe("getOccasionConfettiEmojis", () => {
    it("returns crescent and sparkles for Ramadan", () => {
      expect(getOccasionConfettiEmojis("ramadan")).toEqual(["🌙", "✨"]);
      expect(getOccasionConfettiEmojis(undefined)).toEqual(["🌙", "✨"]);
      expect(getOccasionConfettiEmojis("none")).toEqual(["🌙", "✨"]);
    });

    it("returns gift and sparkles for Eid Al-Fitr", () => {
      expect(getOccasionConfettiEmojis("eid-fitr")).toEqual(["🎁", "✨"]);
      expect(getOccasionConfettiEmojis("eid")).toEqual(["🎁", "✨"]);
    });

    it("returns sheep and gift for Eid Al-Adha", () => {
      expect(getOccasionConfettiEmojis("eid-adha")).toEqual(["🐑", "🎁"]);
    });
  });

  describe("shouldFireConfetti", () => {
    const baseState: RamadanState = {
      isRamadan: false,
      isEid: false,
      occasion: "none",
      hijriYear: 1447,
      hijriMonth: 1,
      hijriDay: 1,
      dayNumber: 0,
    };

    it("returns false when confetti option is off", () => {
      expect(shouldFireConfetti({ ...baseState, isRamadan: true }, "off")).toBe(
        false
      );
      expect(shouldFireConfetti({ ...baseState, isEid: true }, "off")).toBe(
        false
      );
      expect(shouldFireConfetti(baseState, "off", true)).toBe(false);
    });

    it("returns true during active occasions or previewMode when on", () => {
      expect(shouldFireConfetti({ ...baseState, isRamadan: true }, "on")).toBe(
        true
      );
      expect(
        shouldFireConfetti(
          { ...baseState, isEid: true, occasion: "eid-fitr" },
          "on"
        )
      ).toBe(true);
      expect(
        shouldFireConfetti(
          { ...baseState, isEid: true, occasion: "eid-adha" },
          "on"
        )
      ).toBe(true);
      expect(shouldFireConfetti(baseState, "on", false)).toBe(false);
      expect(shouldFireConfetti(baseState, "on", true)).toBe(true);
    });
  });

  describe("fireRamadanConfetti execution", () => {
    it("fires without throwing in standard and mock environments", async () => {
      await expect(
        fireRamadanConfetti(1447, ["#c9a84c", "#2d5a27"], "ramadan")
      ).resolves.toBeUndefined();
      await expect(
        fireRamadanConfetti(1447, ["#c9a84c", "#2d5a27"], "eid-fitr")
      ).resolves.toBeUndefined();
      await expect(
        fireRamadanConfetti(1447, ["#c9a84c", "#2d5a27"], "eid-adha")
      ).resolves.toBeUndefined();
    });
  });

  describe("overlay.fireConfetti integration", () => {
    it("allows triggering confetti programmatically with specific occasion", async () => {
      const overlay = init({ previewMode: true, variant: "eid-adha" });
      expect(typeof overlay.fireConfetti).toBe("function");

      const ramadanPromise = overlay.fireConfetti("ramadan");
      await vi.advanceTimersByTimeAsync(1000);
      await expect(ramadanPromise).resolves.toBeUndefined();

      const fitrPromise = overlay.fireConfetti("eid-fitr");
      await vi.advanceTimersByTimeAsync(1000);
      await expect(fitrPromise).resolves.toBeUndefined();

      const adhaPromise = overlay.fireConfetti("eid-adha");
      await vi.advanceTimersByTimeAsync(1000);
      await expect(adhaPromise).resolves.toBeUndefined();

      overlay.destroy();
    });
  });
});

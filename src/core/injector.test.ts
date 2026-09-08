import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { init } from "./injector";
import type { RamadanState } from "../types";

describe("init orchestration & live transition", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Clean up any remaining elements in document.body
    document.body.innerHTML = "";
    document.body.style.paddingTop = "";
    document.body.style.paddingBottom = "";
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  describe("occasions filtering", () => {
    it("respects occasions filter to opt out of Ramadan", () => {
      // 2026-02-18 is 1 Ramadan
      vi.setSystemTime(new Date("2026-02-18T12:00:00Z"));

      const overlay = init({
        occasions: ["eid-fitr", "eid-adha"], // opted out of Ramadan
        autoTrigger: true,
      });

      expect(overlay.container).toBeNull();
      overlay.destroy();
    });

    it("respects occasions filter to opt out of Eid", () => {
      // 2026-03-20 is 1 Shawwal (Eid Al-Fitr)
      vi.setSystemTime(new Date("2026-03-20T12:00:00Z"));

      const overlay = init({
        occasions: ["ramadan"], // opted out of Eid
        autoTrigger: true,
      });

      expect(overlay.container).toBeNull();
      overlay.destroy();
    });

    it("auto-triggers on Eid Al-Fitr by default", () => {
      vi.setSystemTime(new Date("2026-03-20T12:00:00Z"));

      const overlay = init({ autoTrigger: true });
      expect(overlay.container).not.toBeNull();
      expect(overlay.state.occasion).toBe("eid-fitr");
      expect(overlay.state.isEid).toBe(true);

      overlay.destroy();
    });
  });

  describe("callbacks", () => {
    it("invokes onOccasionChange and onEidStart during Eid", () => {
      vi.setSystemTime(new Date("2026-03-20T12:00:00Z"));

      const onOccasionChange = vi.fn();
      const onEidStart = vi.fn();
      const onRamadanStart = vi.fn();

      const overlay = init({
        onOccasionChange,
        onEidStart,
        onRamadanStart,
      });

      expect(onOccasionChange).toHaveBeenCalledWith(
        "eid-fitr",
        expect.objectContaining({ occasion: "eid-fitr", isEid: true })
      );
      expect(onEidStart).toHaveBeenCalledWith(
        expect.objectContaining({ occasion: "eid-fitr" })
      );
      expect(onRamadanStart).not.toHaveBeenCalled();

      overlay.destroy();
    });
  });

  describe("variant resolution", () => {
    it("resolves default lanterns variant to eid during Eid", () => {
      vi.setSystemTime(new Date("2026-03-20T12:00:00Z"));

      const overlay = init({
        variant: "lanterns", // default
        autoTrigger: true,
      });

      // Should render Eid Al-Fitr motifs (balloons/gifts/stars), not lanterns
      expect(overlay.container).not.toBeNull();
      const hasFitrMotif = Array.from(overlay.container!.children).some(
        (el) =>
          el.classList.contains("ro-balloon") ||
          el.classList.contains("ro-gift") ||
          el.classList.contains("ro-star")
      );
      expect(hasFitrMotif).toBe(true);

      overlay.destroy();
    });

    it("preserves explicit custom variant during Eid", () => {
      vi.setSystemTime(new Date("2026-03-20T12:00:00Z"));

      const overlay = init({
        variant: "crescent-stars",
        autoTrigger: true,
      });

      expect(overlay.container).not.toBeNull();
      const hasCrescentStars = Array.from(overlay.container!.children).some(
        (el) =>
          el.classList.contains("ro-crescent") ||
          el.classList.contains("ro-star")
      );
      expect(hasCrescentStars).toBe(true);

      overlay.destroy();
    });
  });

  describe("live midnight transition", () => {
    it("automatically hot-swaps from Ramadan to Eid Al-Fitr at midnight", () => {
      // Eve of Eid Al-Fitr: 2026-03-19 at 23:59:50
      const eve = new Date("2026-03-19T23:59:50");
      vi.setSystemTime(eve);

      const onOccasionChange = vi.fn();
      const onEidStart = vi.fn();

      const overlay = init({
        autoTrigger: true,
        liveTransition: true,
        onOccasionChange,
        onEidStart,
      });

      expect(overlay.state.occasion).toBe("ramadan");
      expect(overlay.container).not.toBeNull();

      // Fast forward 20 seconds across midnight into 2026-03-20
      vi.advanceTimersByTime(20_000);

      expect(overlay.state.occasion).toBe("eid-fitr");
      expect(overlay.state.isEid).toBe(true);
      expect(onEidStart).toHaveBeenCalled();
      expect(onOccasionChange).toHaveBeenCalledWith(
        "eid-fitr",
        expect.objectContaining({ occasion: "eid-fitr" })
      );

      // Verify DOM hot-swapped to Eid motifs
      const hasFitrMotif = Array.from(overlay.container!.children).some(
        (el) =>
          el.classList.contains("ro-balloon") ||
          el.classList.contains("ro-gift") ||
          el.classList.contains("ro-star")
      );
      expect(hasFitrMotif).toBe(true);

      overlay.destroy();
    });

    it("supports deferred initialization when armed before holiday starts", () => {
      // Day before Ramadan: 2026-02-17 at 23:59:50
      const eve = new Date("2026-02-17T23:59:50");
      vi.setSystemTime(eve);

      const onRamadanStart = vi.fn();
      const onOccasionChange = vi.fn();

      const overlay = init({
        autoTrigger: true,
        liveTransition: true,
        onRamadanStart,
        onOccasionChange,
      });

      // Not mounted yet
      expect(overlay.container).toBeNull();
      expect(overlay.state.occasion).toBe("none");

      // Fast forward 20 seconds across midnight to 2026-02-18 (Ramadan start)
      vi.advanceTimersByTime(20_000);

      expect(overlay.state.occasion).toBe("ramadan");
      expect(overlay.state.isRamadan).toBe(true);
      expect(overlay.container).not.toBeNull();
      expect(onRamadanStart).toHaveBeenCalled();

      overlay.destroy();
    });

    it("syncs transition on visibilitychange if device slept across midnight", () => {
      const eve = new Date("2026-03-19T22:00:00");
      vi.setSystemTime(eve);

      const overlay = init({
        autoTrigger: true,
        liveTransition: true,
      });

      expect(overlay.state.occasion).toBe("ramadan");

      // Simulate system sleep: time jumps 5 hours without timer ticks executing
      vi.setSystemTime(new Date("2026-03-20T03:00:00"));

      // Tab becomes visible again
      document.dispatchEvent(new Event("visibilitychange"));

      expect(overlay.state.occasion).toBe("eid-fitr");
      expect(overlay.state.isEid).toBe(true);

      overlay.destroy();
    });

    it("cleans up timers and event listeners on destroy()", () => {
      const eve = new Date("2026-03-19T23:59:50");
      vi.setSystemTime(eve);

      const onOccasionChange = vi.fn();
      const overlay = init({
        autoTrigger: true,
        liveTransition: true,
        onOccasionChange,
      });

      overlay.destroy();
      expect(overlay.container).toBeNull();

      // Fast forward across midnight
      vi.advanceTimersByTime(20_000);

      // Should NOT have triggered any transition or callback after destroy
      expect(onOccasionChange).toHaveBeenCalledTimes(1); // only the initial init call
    });
  });
});

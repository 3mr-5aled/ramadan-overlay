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
    vi.restoreAllMocks();
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

  describe("countdown widget integration", () => {
    it("initializes countdown widget when within alert window and cleans up on destroy", () => {
      // 18:30 (within 30m of 18:45)
      const now = new Date(2026, 2, 10, 18, 30, 0);
      vi.setSystemTime(now);

      const overlay = init({
        previewMode: true,
        countdown: {
          iftarTime: "18:45",
          alertWindowMinutes: 30,
        },
      });

      expect(overlay.getCountdownController()).not.toBeNull();
      expect(document.getElementById("ramadan-countdown-root")).not.toBeNull();
      expect(document.getElementById("ramadan-overlay-root")).not.toBeNull();

      overlay.destroy();
      expect(document.getElementById("ramadan-countdown-root")).toBeNull();
      expect(document.getElementById("ramadan-overlay-root")).toBeNull();
    });

    it("schedules countdown widget via dormant timer when outside alert window", () => {
      // 17:00 (outside 30m window for 18:00)
      const now = new Date(2026, 2, 10, 17, 0, 0);
      vi.setSystemTime(now);

      const overlay = init({
        previewMode: true,
        countdown: {
          iftarTime: "18:00",
          alertWindowMinutes: 30,
        },
      });

      expect(document.getElementById("ramadan-countdown-root")).toBeNull();

      // Advance 30 minutes to 17:30 (alert window entry)
      vi.advanceTimersByTime(30 * 60 * 1000);
      expect(document.getElementById("ramadan-countdown-root")).not.toBeNull();

      overlay.destroy();
    });
  });

  describe("vertical viewport positioning & fallback", () => {
    it("resolves side positions and exposes resolved config", () => {
      const overlay = init({
        previewMode: true,
        position: "sides",
        mobileSideBehavior: "show",
      });

      expect(overlay.config.position).toBe("sides");
      expect(overlay.config.mobileSideBehavior).toBe("show");

      overlay.destroy();
    });

    it("falls back banner with side position to 'top' with warning", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const overlay = init({
        previewMode: true,
        variant: "banner",
        position: "left",
      });

      expect(overlay.config.position).toBe("top");
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "Banner variant does not support vertical side positioning"
        )
      );
      warnSpy.mockRestore();
      overlay.destroy();
    });
  });

  describe("predefined visual themes & dynamic hot-swapping", () => {
    it("initializes with default classic theme and sets data-theme attribute", () => {
      const overlay = init({ previewMode: true });
      expect(overlay.config.theme).toBe("classic");
      expect(overlay.config.themeName).toBe("classic");
      expect(overlay.container?.getAttribute("data-theme")).toBe("classic");
      expect(overlay.container?.style.getPropertyValue("--ro-color-1")).toBe(
        "#c9a84c"
      );
      expect(overlay.getState()).toBe(overlay.state);
      overlay.destroy();
    });

    it("supports switching through all 5 preset themes via setTheme() without DOM remount", () => {
      const overlay = init({ previewMode: true, theme: "classic" });
      const originalContainer = overlay.container;

      const presets: Array<{ name: string; color1: string; ceiling: string }> =
        [
          { name: "midnight", color1: "#fbbf24", ceiling: "#1e293b" },
          { name: "emerald", color1: "#f59e0b", ceiling: "#064e3b" },
          { name: "royal", color1: "#fcd34d", ceiling: "#4c1d95" },
          { name: "desert-dusk", color1: "#f97316", ceiling: "#7c2d12" },
          { name: "classic", color1: "#c9a84c", ceiling: "#8b4513" },
        ];

      for (const preset of presets) {
        // @ts-expect-error preset name string
        overlay.setTheme(preset.name);
        expect(overlay.container).toBe(originalContainer);
        expect(overlay.container?.getAttribute("data-theme")).toBe(preset.name);
        expect(overlay.container?.style.getPropertyValue("--ro-color-1")).toBe(
          preset.color1
        );
        expect(overlay.container?.style.getPropertyValue("--ro-ceiling")).toBe(
          preset.ceiling
        );
      }

      overlay.destroy();
    });

    it("supports custom theme object extending a preset with partial overrides", () => {
      const overlay = init({
        previewMode: true,
        theme: {
          name: "custom-emerald-gold",
          extends: "emerald",
          colors: ["#ffd700", "#ffae00"],
          glowColor: "rgba(255, 215, 0, 0.7)",
        },
      });

      expect(overlay.container?.getAttribute("data-theme")).toBe(
        "custom-emerald-gold"
      );
      expect(overlay.container?.style.getPropertyValue("--ro-color-1")).toBe(
        "#ffd700"
      );
      expect(overlay.container?.style.getPropertyValue("--ro-color-2")).toBe(
        "#ffae00"
      );
      // Inherited from emerald preset:
      expect(overlay.container?.style.getPropertyValue("--ro-ceiling")).toBe(
        "#064e3b"
      );
      expect(overlay.container?.style.getPropertyValue("--ro-glow")).toBe(
        "rgba(255, 215, 0, 0.7)"
      );

      overlay.destroy();
    });

    it("respects precedence: explicit user prop overrides custom theme prop overrides preset default", () => {
      const overlay = init({
        previewMode: true,
        glowColor: "rgba(255, 0, 0, 0.9)", // Explicit user prop
        theme: {
          extends: "midnight",
          glowColor: "rgba(0, 0, 255, 0.5)", // Custom theme prop
          ceilingColor: "#112233", // Custom theme prop overriding midnight
        },
      });

      // Explicit user prop wins over custom theme prop:
      expect(overlay.container?.style.getPropertyValue("--ro-glow")).toBe(
        "rgba(255, 0, 0, 0.9)"
      );
      // Custom theme prop wins over preset default:
      expect(overlay.container?.style.getPropertyValue("--ro-ceiling")).toBe(
        "#112233"
      );
      // Preset default applies where neither specified:
      expect(overlay.container?.style.getPropertyValue("--ro-color-1")).toBe(
        "#fbbf24"
      );

      overlay.destroy();
    });

    it("hot-swaps banner colors when theme changes without remounting banner bar", () => {
      const overlay = init({
        previewMode: true,
        variant: "banner",
        theme: "classic",
      });

      const originalBanner = overlay.container;
      expect(originalBanner).not.toBeNull();
      expect(originalBanner?.style.getPropertyValue("--ro-banner-bg")).toBe(
        "rgba(24, 19, 8, 0.95)"
      );

      // Switch to emerald
      overlay.setTheme("emerald");
      expect(overlay.container).toBe(originalBanner);
      expect(originalBanner?.style.getPropertyValue("--ro-banner-bg")).toBe(
        "rgba(2, 44, 34, 0.95)"
      );
      expect(originalBanner?.style.getPropertyValue("--ro-banner-text")).toBe(
        "#fef3c7"
      );

      // Switch to royal
      overlay.update({ theme: "royal" });
      expect(overlay.container).toBe(originalBanner);
      expect(originalBanner?.style.getPropertyValue("--ro-banner-bg")).toBe(
        "rgba(30, 11, 64, 0.95)"
      );
      expect(originalBanner?.style.getPropertyValue("--ro-banner-text")).toBe(
        "#fef08a"
      );

      overlay.destroy();
    });
  });

  describe("defensive configuration clamping & sanitization", () => {
    it("clamps opacity between 0.0 and 1.0", () => {
      const overlayNegative = init({ opacity: -2.5 });
      expect(overlayNegative.config.opacity).toBe(0.0);
      overlayNegative.destroy();

      const overlayExcess = init({ opacity: 99.5 });
      expect(overlayExcess.config.opacity).toBe(1.0);
      overlayExcess.destroy();

      const overlayNaN = init({ opacity: NaN as any });
      expect(overlayNaN.config.opacity).toBe(0.85);
      overlayNaN.destroy();
    });

    it("clamps zIndex to safe 32-bit range and falls back on non-numbers", () => {
      const overlayInvalid = init({ zIndex: "high" as any });
      expect(overlayInvalid.config.zIndex).toBe(9999);
      overlayInvalid.destroy();

      const overlayNaN = init({ zIndex: NaN as any });
      expect(overlayNaN.config.zIndex).toBe(9999);
      overlayNaN.destroy();

      const overlayValid = init({ zIndex: 50000 });
      expect(overlayValid.config.zIndex).toBe(50000);
      overlayValid.destroy();
    });

    it("clamps ropeSag to [6, 60] with fallback to 20", () => {
      const overlaySmall = init({ ropeSag: 2 });
      expect(overlaySmall.config.ropeSag).toBe(6);
      overlaySmall.destroy();

      const overlayLarge = init({ ropeSag: 999 });
      expect(overlayLarge.config.ropeSag).toBe(60);
      overlayLarge.destroy();

      const overlayInvalid = init({ ropeSag: "deep" as any });
      expect(overlayInvalid.config.ropeSag).toBe(20);
      overlayInvalid.destroy();
    });

    it("sanitizes string union properties with safe fallbacks and debug warnings", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const overlay = init({
        variant: "3d-hologram" as any,
        position: "floating" as any,
        density: "ultra" as any,
        debug: true,
      });

      expect(overlay.config.variant).toBe("lanterns");
      expect(overlay.config.position).toBe("both");
      expect(overlay.config.density).toBe("normal");

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Invalid variant "3d-hologram"; falling back to "lanterns"'
        )
      );

      warnSpy.mockRestore();
      overlay.destroy();
    });

    it("sanitizes occasions array and defaults if empty or malformed", () => {
      const overlayNull = init({ occasions: null as any });
      expect(overlayNull.config.occasions).toEqual([
        "ramadan",
        "eid-fitr",
        "eid-adha",
      ]);
      overlayNull.destroy();

      const overlayEmpty = init({ occasions: [] });
      expect(overlayEmpty.config.occasions).toEqual([
        "ramadan",
        "eid-fitr",
        "eid-adha",
      ]);
      overlayEmpty.destroy();
    });
  });

  describe("catastrophic error containment & atomic DOM rollback", () => {
    it("safely catches unexpected mount errors, returns no-op instance, and invokes onError", () => {
      // Intentionally break document.createElement to simulate a fatal DOM crash
      const originalCreateElement = document.createElement.bind(document);
      const onError = vi.fn();

      vi.spyOn(document, "createElement").mockImplementation((tag) => {
        if (tag === "div") {
          throw new Error("Simulated DOM host mounting crash");
        }
        return originalCreateElement(tag);
      });

      const overlay = init({
        previewMode: true,
        onError,
        debug: true,
      });

      expect(overlay).toBeDefined();
      expect(overlay.container).toBeNull();
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Simulated DOM host mounting crash",
        })
      );

      // Verify no-op instance methods safely execute without throwing
      expect(() => overlay.destroy()).not.toThrow();
      expect(() => overlay.update({ opacity: 0.5 })).not.toThrow();
      expect(() => overlay.setTheme("royal")).not.toThrow();
      expect(overlay.getCountdownController()).toBeNull();
      expect(overlay.getState()).toEqual(
        expect.objectContaining({ isRamadan: false, occasion: "none" })
      );

      vi.restoreAllMocks();
    });

    it("performs atomic DOM rollback removing partial roots and style elements on error", () => {
      const onError = vi.fn();

      // Create fake leaked nodes that would simulate a partial initialization leak
      const leakedStyle = document.createElement("style");
      leakedStyle.id = "ramadan-overlay-styles";
      document.head.appendChild(leakedStyle);

      const leakedRoot = document.createElement("div");
      leakedRoot.id = "ramadan-overlay-root";
      document.body.appendChild(leakedRoot);

      // Force crash during mountHost by breaking document.getElementById after styles appended
      const originalAppend = document.body.appendChild.bind(document.body);
      vi.spyOn(document.body, "appendChild").mockImplementation((node) => {
        if ((node as HTMLElement).id === "ramadan-overlay-root") {
          throw new Error("Simulated appendChild fatal failure");
        }
        return originalAppend(node);
      });

      const overlay = init({
        previewMode: true,
        onError,
      });

      expect(overlay.container).toBeNull();
      // Atomic DOM Rollback should have removed the leaked nodes
      expect(document.getElementById("ramadan-overlay-styles")).toBeNull();
      expect(document.getElementById("ramadan-overlay-root")).toBeNull();

      vi.restoreAllMocks();
    });

    it("isolates consumer onError callback errors (double-containment seam)", () => {
      const faultyOnError = vi.fn().mockImplementation(() => {
        throw new Error("Consumer telemetry reporter crashed");
      });

      // Force crash
      vi.spyOn(document, "createElement").mockImplementation(() => {
        throw new Error("Fatal host creation failure");
      });

      // init() must NOT throw even if onError throws!
      expect(() => {
        init({
          previewMode: true,
          onError: faultyOnError,
        });
      }).not.toThrow();

      expect(faultyOnError).toHaveBeenCalled();

      vi.restoreAllMocks();
    });
  });

  describe("developer diagnostic logging", () => {
    it("emits informative diagnostic notice when autoTrigger is dormant outside Ramadan/Eid and debug is true", () => {
      // 2026-01-01 is outside Ramadan/Eid
      vi.setSystemTime(new Date("2026-01-01T12:00:00Z"));

      const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

      const overlay = init({
        autoTrigger: true,
        debug: true,
      });

      expect(infoSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "[ramadan-overlay] Overlay dormant: autoTrigger is enabled"
        )
      );

      infoSpy.mockRestore();
      overlay.destroy();
    });

    it("preserves 100% console silence when debug is false (production guarantee)", () => {
      vi.setSystemTime(new Date("2026-01-01T12:00:00Z"));

      const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const overlay = init({
        autoTrigger: true,
        debug: false,
      });

      expect(infoSpy).not.toHaveBeenCalled();
      expect(warnSpy).not.toHaveBeenCalled();

      infoSpy.mockRestore();
      warnSpy.mockRestore();
      overlay.destroy();
    });

    it("emits preview mode diagnostic notice when previewMode and debug are active", () => {
      const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

      const overlay = init({
        previewMode: true,
        debug: true,
      });

      expect(infoSpy).toHaveBeenCalledWith(
        expect.stringContaining("[ramadan-overlay] Preview mode active")
      );

      infoSpy.mockRestore();
      overlay.destroy();
    });
  });
});

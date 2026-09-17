import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createCountdownManager } from "./index";

describe("createCountdownManager", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    const existing = document.getElementById("ramadan-countdown-root");
    if (existing) existing.remove();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    const existing = document.getElementById("ramadan-countdown-root");
    if (existing) existing.remove();
  });

  it("returns inactive manager when countdown config is false or omitted", () => {
    const manager = createCountdownManager(false);
    expect(manager.controller).toBeNull();
    manager.start();
    expect(document.getElementById("ramadan-countdown-root")).toBeNull();
    manager.destroy();
  });

  it("mounts countdown host when within alert window and responds to controller actions", () => {
    const now = new Date(2026, 2, 10, 18, 30, 0); // 18:30 (15m before 18:45)
    vi.setSystemTime(now);

    const onDismiss = vi.fn();
    const manager = createCountdownManager({
      iftarTime: "18:45",
      alertWindowMinutes: 30,
      onDismiss,
    });

    manager.start();

    // Within alert window -> mounted
    const root = document.getElementById("ramadan-countdown-root");
    expect(root).not.toBeNull();
    expect(manager.controller).not.toBeNull();
    expect(manager.controller?.getTargetTime()?.getHours()).toBe(18);
    expect(manager.controller?.getTargetTime()?.getMinutes()).toBe(45);

    // Dismiss via controller
    manager.controller?.dismiss();
    expect(document.getElementById("ramadan-countdown-root")).toBeNull();
    expect(onDismiss).toHaveBeenCalledTimes(1);

    manager.destroy();
  });

  it("triggers confetti and onIftar callback at T-0", () => {
    const now = new Date(2026, 2, 10, 18, 44, 59); // 1 second before 18:45
    vi.setSystemTime(now);

    const onIftar = vi.fn();
    const manager = createCountdownManager({
      iftarTime: "18:45",
      alertWindowMinutes: 30,
      onIftar,
      confetti: false, // disable confetti in test environment
    });

    manager.start();

    // Advance 1 second to T-0
    vi.advanceTimersByTime(1000);
    expect(onIftar).toHaveBeenCalledTimes(1);

    const card = document.querySelector(".ro-countdown-card");
    expect(card?.classList.contains("ro-countdown--celebrating")).toBe(true);

    manager.destroy();
  });

  it("forces immediate display and ticking via controller.show() even when outside alert window", () => {
    // 17:00 (1 hour 45m before 18:45, with 30m alert window)
    const now = new Date(2026, 2, 10, 17, 0, 0);
    vi.setSystemTime(now);

    const manager = createCountdownManager({
      iftarTime: "18:45",
      alertWindowMinutes: 30,
    });

    manager.start();
    // Inactive because 17:00 is outside the 30m window
    expect(document.getElementById("ramadan-countdown-root")).toBeNull();

    // Call show() to force bypass dormant timer
    manager.controller?.show();
    expect(document.getElementById("ramadan-countdown-root")).not.toBeNull();

    // Digits are populated with hours, minutes, seconds (1h 45m = 01:45:00)
    const hoursVal = document.querySelector(".ro-val-hours");
    const minutesVal = document.querySelector(".ro-val-minutes");
    expect(hoursVal?.textContent).toBe("01");
    expect(minutesVal?.textContent).toBe("45");

    manager.destroy();
  });

  it("updates target time and configuration dynamically via updateConfig()", () => {
    const now = new Date(2026, 2, 10, 18, 30, 0);
    vi.setSystemTime(now);

    const manager = createCountdownManager({
      iftarTime: "18:45",
      alertWindowMinutes: 30,
    });

    manager.start();
    expect(manager.controller?.getTargetTime()?.getMinutes()).toBe(45);

    // Update target time to 19:00
    manager.controller?.updateConfig({ iftarTime: "19:00" });
    expect(manager.controller?.getTargetTime()?.getMinutes()).toBe(0);
    expect(manager.controller?.getTargetTime()?.getHours()).toBe(19);

    manager.destroy();
  });

  it("clears celebration flare after celebrationDurationMs expires", () => {
    const now = new Date(2026, 2, 10, 18, 44, 59);
    vi.setSystemTime(now);

    const manager = createCountdownManager({
      iftarTime: "18:45",
      alertWindowMinutes: 30,
      celebrationDurationMs: 10000, // 10 seconds
      confetti: false,
    });

    manager.start();
    vi.advanceTimersByTime(1000); // T-0

    const card = document.querySelector(".ro-countdown-card");
    expect(card?.classList.contains("ro-countdown--celebrating")).toBe(true);

    // Advance past celebration duration
    vi.advanceTimersByTime(10000);
    expect(card?.classList.contains("ro-countdown--celebrating")).toBe(false);

    manager.destroy();
  });

  it("controls minimization state via controller.minimize() and controller.expand()", () => {
    const now = new Date(2026, 2, 10, 18, 30, 0);
    vi.setSystemTime(now);
    sessionStorage.clear();

    const manager = createCountdownManager({
      iftarTime: "18:45",
      alertWindowMinutes: 30,
    });

    manager.start();
    expect(manager.controller?.isMinimized?.()).toBe(false);

    manager.controller?.minimize?.();
    expect(manager.controller?.isMinimized?.()).toBe(true);
    expect(
      document
        .getElementById("ramadan-countdown-root")
        ?.classList.contains("ro-countdown-host--minimized")
    ).toBe(true);

    manager.controller?.expand?.();
    expect(manager.controller?.isMinimized?.()).toBe(false);
    expect(
      document
        .getElementById("ramadan-countdown-root")
        ?.classList.contains("ro-countdown-host--minimized")
    ).toBe(false);

    manager.destroy();
  });

  it("renders sound button by default and allows toggling mute state", () => {
    const now = new Date(2026, 2, 10, 18, 30, 0);
    vi.setSystemTime(now);

    const manager = createCountdownManager({
      iftarTime: "18:45",
      alertWindowMinutes: 30,
      defaultMuted: true,
    });

    manager.start();
    const soundBtn = document.querySelector(
      ".ro-countdown-sound-btn"
    ) as HTMLButtonElement;
    expect(soundBtn).not.toBeNull();
    expect(soundBtn.getAttribute("aria-pressed")).toBe("false");
    expect(manager.controller?.isMuted()).toBe(true);

    // Toggle mute via controller
    const nowMuted = manager.controller?.toggleMute();
    expect(nowMuted).toBe(false);
    expect(manager.controller?.isMuted()).toBe(false);
    expect(soundBtn.getAttribute("aria-pressed")).toBe("true");

    manager.destroy();
  });

  it("omits sound button when sound is explicitly disabled", () => {
    const now = new Date(2026, 2, 10, 18, 30, 0);
    vi.setSystemTime(now);

    const manager = createCountdownManager({
      iftarTime: "18:45",
      alertWindowMinutes: 30,
      sound: false,
    });

    manager.start();
    const soundBtn = document.querySelector(".ro-countdown-sound-btn");
    expect(soundBtn).toBeNull();

    manager.destroy();
  });

  it("exposes playAlert on controller and resolves boolean", async () => {
    const now = new Date(2026, 2, 10, 18, 30, 0);
    vi.setSystemTime(now);

    const manager = createCountdownManager({
      iftarTime: "18:45",
      alertWindowMinutes: 30,
      defaultMuted: false,
    });

    manager.start();
    expect(typeof manager.controller?.playAlert).toBe("function");

    const res = await manager.controller?.playAlert?.();
    expect(typeof res).toBe("boolean");

    manager.destroy();
  });
});

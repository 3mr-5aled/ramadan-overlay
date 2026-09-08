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
});

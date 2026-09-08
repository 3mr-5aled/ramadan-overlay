import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CountdownTimerEngine } from "./timer";

describe("CountdownTimerEngine", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("arms dormant scheduler when target is outside alert window and triggers onAlertWindow when window arrives", () => {
    const now = new Date(2026, 2, 10, 17, 0, 0); // 17:00
    vi.setSystemTime(now);

    const targetTime = new Date(2026, 2, 10, 18, 0, 0); // 18:00 (60m in future)
    const alertWindowMinutes = 30; // window starts at 17:30 (in 30 mins)

    const onAlertWindow = vi.fn();
    const onTick = vi.fn();

    const engine = new CountdownTimerEngine(targetTime, {
      alertWindowMinutes,
      onAlertWindow,
      onTick,
    });

    engine.start();

    // At 17:00, outside window
    expect(engine.isAlertWindowActive()).toBe(false);
    expect(onAlertWindow).not.toHaveBeenCalled();
    expect(onTick).not.toHaveBeenCalled();

    // Advance 29 minutes (17:29) -> still dormant
    vi.advanceTimersByTime(29 * 60 * 1000);
    expect(engine.isAlertWindowActive()).toBe(false);
    expect(onAlertWindow).not.toHaveBeenCalled();

    // Advance 1 minute (17:30) -> alert window enters
    vi.advanceTimersByTime(60 * 1000);
    expect(engine.isAlertWindowActive()).toBe(true);
    expect(onAlertWindow).toHaveBeenCalledTimes(1);
    expect(onTick).toHaveBeenCalled();

    engine.destroy();
  });

  it("immediately enters active tick loop if current time is already within alert window", () => {
    const now = new Date(2026, 2, 10, 17, 45, 0); // 17:45 (15m before target)
    vi.setSystemTime(now);

    const targetTime = new Date(2026, 2, 10, 18, 0, 0);
    const onAlertWindow = vi.fn();
    const onTick = vi.fn();

    const engine = new CountdownTimerEngine(targetTime, {
      alertWindowMinutes: 30,
      onAlertWindow,
      onTick,
    });

    engine.start();

    expect(engine.isAlertWindowActive()).toBe(true);
    expect(onAlertWindow).toHaveBeenCalledTimes(1);
    expect(onTick).toHaveBeenCalled();

    engine.destroy();
  });

  it("fires onT0 when countdown reaches zero and triggers onAutoDismiss after dismiss window", () => {
    const now = new Date(2026, 2, 10, 17, 59, 58); // 2 seconds before target
    vi.setSystemTime(now);

    const targetTime = new Date(2026, 2, 10, 18, 0, 0);
    const onT0 = vi.fn();
    const onAutoDismiss = vi.fn();

    const engine = new CountdownTimerEngine(targetTime, {
      alertWindowMinutes: 30,
      autoDismissMinutes: 5,
      onT0,
      onAutoDismiss,
    });

    engine.start();

    // Advance 2 seconds to T-0
    vi.advanceTimersByTime(2000);
    expect(onT0).toHaveBeenCalledTimes(1);
    expect(onAutoDismiss).not.toHaveBeenCalled();

    // Advance 5 minutes (autoDismiss window)
    vi.advanceTimersByTime(5 * 60 * 1000);
    expect(onAutoDismiss).toHaveBeenCalledTimes(1);

    engine.destroy();
  });

  it("cleans up all timers on destroy", () => {
    const now = new Date(2026, 2, 10, 17, 50, 0);
    vi.setSystemTime(now);

    const targetTime = new Date(2026, 2, 10, 18, 0, 0);
    const onTick = vi.fn();

    const engine = new CountdownTimerEngine(targetTime, {
      alertWindowMinutes: 30,
      onTick,
    });

    engine.start();
    expect(onTick).toHaveBeenCalled();

    engine.destroy();
    onTick.mockClear();

    // Advance time after destroy - no further ticks should occur
    vi.advanceTimersByTime(10000);
    expect(onTick).not.toHaveBeenCalled();
  });
});

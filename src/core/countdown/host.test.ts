import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mountCountdownHost } from "./host";
import { DEFAULT_COUNTDOWN_LABELS } from "./a11y";

describe("mountCountdownHost", () => {
  beforeEach(() => {
    const existing = document.getElementById("ramadan-countdown-root");
    if (existing) existing.remove();
  });

  afterEach(() => {
    const existing = document.getElementById("ramadan-countdown-root");
    if (existing) existing.remove();
    vi.restoreAllMocks();
  });

  it("mounts <aside id='ramadan-countdown-root'> to document.body with correct anchor class", () => {
    const hostResult = mountCountdownHost({
      targetTime: new Date(2026, 2, 10, 18, 45, 0),
      position: "bottom-right",
      hasSound: true,
      initialMuted: true,
      labels: DEFAULT_COUNTDOWN_LABELS.en,
      isRtl: false,
      lang: "en",
      onDismiss: vi.fn(),
      onToggleSound: vi.fn(),
    });

    const rootEl = document.getElementById("ramadan-countdown-root");
    expect(rootEl).not.toBeNull();
    expect(rootEl?.tagName).toBe("ASIDE");
    expect(rootEl?.classList.contains("ro-countdown-host--bottom-right")).toBe(
      true
    );

    hostResult.destroy();
    expect(document.getElementById("ramadan-countdown-root")).toBeNull();
  });

  it("applies banner collision avoidance class when banner is active at top", () => {
    const hostResult = mountCountdownHost({
      targetTime: new Date(2026, 2, 10, 18, 45, 0),
      position: "top-right",
      isBannerTopActive: true,
      hasSound: false,
      initialMuted: true,
      labels: DEFAULT_COUNTDOWN_LABELS.en,
      isRtl: false,
      lang: "en",
      onDismiss: vi.fn(),
      onToggleSound: vi.fn(),
    });

    const rootEl = document.getElementById("ramadan-countdown-root");
    expect(
      rootEl?.classList.contains("ro-countdown-host--banner-offset-top")
    ).toBe(true);

    hostResult.destroy();
  });

  it("sets dir='rtl' and lang='ar' when isRtl is true", () => {
    const hostResult = mountCountdownHost({
      targetTime: new Date(2026, 2, 10, 18, 45, 0),
      position: "bottom-left",
      hasSound: true,
      initialMuted: true,
      labels: DEFAULT_COUNTDOWN_LABELS.ar,
      isRtl: true,
      lang: "ar",
      onDismiss: vi.fn(),
      onToggleSound: vi.fn(),
    });

    const rootEl = document.getElementById("ramadan-countdown-root");
    expect(rootEl?.getAttribute("dir")).toBe("rtl");
    expect(rootEl?.getAttribute("lang")).toBe("ar");

    hostResult.destroy();
  });

  it("updates digit elements correctly during ticks", () => {
    const hostResult = mountCountdownHost({
      targetTime: new Date(2026, 2, 10, 18, 45, 0),
      position: "bottom-right",
      hasSound: true,
      initialMuted: true,
      labels: DEFAULT_COUNTDOWN_LABELS.en,
      isRtl: false,
      lang: "en",
      onDismiss: vi.fn(),
      onToggleSound: vi.fn(),
    });

    // 1 hour, 23 minutes, 45 seconds remaining = 5025000ms
    hostResult.updateDigits(5025000);

    const root = hostResult.root;
    const hours = root.querySelector(".ro-val-hours");
    const minutes = root.querySelector(".ro-val-minutes");
    const seconds = root.querySelector(".ro-val-seconds");

    expect(hours?.textContent).toBe("01");
    expect(minutes?.textContent).toBe("23");
    expect(seconds?.textContent).toBe("45");

    hostResult.destroy();
  });

  it("transitions into celebration state on showCelebration()", () => {
    const hostResult = mountCountdownHost({
      targetTime: new Date(2026, 2, 10, 18, 45, 0),
      position: "bottom-right",
      hasSound: true,
      initialMuted: true,
      labels: DEFAULT_COUNTDOWN_LABELS.en,
      isRtl: false,
      lang: "en",
      onDismiss: vi.fn(),
      onToggleSound: vi.fn(),
    });

    hostResult.showCelebration();

    const card = hostResult.root.querySelector(".ro-countdown-card");
    expect(card?.classList.contains("ro-countdown--celebrating")).toBe(true);

    const celebrationEl = hostResult.root.querySelector(
      ".ro-countdown-celebration"
    );
    expect((celebrationEl as HTMLElement)?.style.display).not.toBe("none");

    hostResult.destroy();
  });

  it("supports collapsing into docked pill via minimize button and expanding via pill click", () => {
    const onMinimize = vi.fn();
    const onExpand = vi.fn();
    sessionStorage.clear();

    const hostResult = mountCountdownHost({
      targetTime: new Date(2026, 2, 10, 18, 45, 0),
      position: "bottom-right",
      hasSound: false,
      initialMuted: true,
      labels: DEFAULT_COUNTDOWN_LABELS.en,
      isRtl: false,
      lang: "en",
      onDismiss: vi.fn(),
      onToggleSound: vi.fn(),
      onMinimize,
      onExpand,
    });

    const minBtn = hostResult.root.querySelector(
      ".ro-countdown-minimize-btn"
    ) as HTMLButtonElement;
    expect(minBtn).not.toBeNull();
    expect(hostResult.isMinimized()).toBe(false);

    // Click minimize button
    minBtn.click();
    expect(hostResult.isMinimized()).toBe(true);
    expect(
      hostResult.root.classList.contains("ro-countdown-host--minimized")
    ).toBe(true);
    expect(sessionStorage.getItem("ro_countdown_minimized")).toBe("true");
    expect(onMinimize).toHaveBeenCalledTimes(1);

    // Pill element exists
    const pill = hostResult.root.querySelector(
      ".ro-countdown-pill"
    ) as HTMLDivElement;
    expect(pill).not.toBeNull();

    // Click pill to expand
    pill.click();
    expect(hostResult.isMinimized()).toBe(false);
    expect(
      hostResult.root.classList.contains("ro-countdown-host--minimized")
    ).toBe(false);
    expect(sessionStorage.getItem("ro_countdown_minimized")).toBe("false");
    expect(onExpand).toHaveBeenCalledTimes(1);

    hostResult.destroy();
  });

  it("supports keyboard expansion on pill (Enter and Space)", () => {
    sessionStorage.clear();
    const hostResult = mountCountdownHost({
      targetTime: new Date(2026, 2, 10, 18, 45, 0),
      position: "bottom-right",
      hasSound: false,
      initialMuted: true,
      initiallyMinimized: true,
      labels: DEFAULT_COUNTDOWN_LABELS.en,
      isRtl: false,
      lang: "en",
      onDismiss: vi.fn(),
      onToggleSound: vi.fn(),
    });

    expect(hostResult.isMinimized()).toBe(true);
    const pill = hostResult.root.querySelector(
      ".ro-countdown-pill"
    ) as HTMLDivElement;

    // Enter key expands
    pill.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
    );
    expect(hostResult.isMinimized()).toBe(false);

    // Minimize again
    hostResult.minimize();
    expect(hostResult.isMinimized()).toBe(true);

    // Space key expands
    pill.dispatchEvent(
      new KeyboardEvent("keydown", { key: " ", bubbles: true })
    );
    expect(hostResult.isMinimized()).toBe(false);

    hostResult.destroy();
  });

  it("respects minimizable: false by not rendering minimize button or pill", () => {
    const hostResult = mountCountdownHost({
      targetTime: new Date(2026, 2, 10, 18, 45, 0),
      position: "bottom-right",
      hasSound: false,
      initialMuted: true,
      minimizable: false,
      labels: DEFAULT_COUNTDOWN_LABELS.en,
      isRtl: false,
      lang: "en",
      onDismiss: vi.fn(),
      onToggleSound: vi.fn(),
    });

    const minBtn = hostResult.root.querySelector(".ro-countdown-minimize-btn");
    const pill = hostResult.root.querySelector(".ro-countdown-pill");

    expect(minBtn).toBeNull();
    expect(pill).toBeNull();
    expect(hostResult.isMinimized()).toBe(false);

    hostResult.minimize();
    expect(hostResult.isMinimized()).toBe(false);

    hostResult.destroy();
  });

  it("updates docked pill text during updateDigits and celebration", () => {
    const hostResult = mountCountdownHost({
      targetTime: new Date(2026, 2, 10, 18, 45, 0),
      position: "bottom-right",
      hasSound: false,
      initialMuted: true,
      labels: DEFAULT_COUNTDOWN_LABELS.en,
      isRtl: false,
      lang: "en",
      onDismiss: vi.fn(),
      onToggleSound: vi.fn(),
    });

    const pillTime = hostResult.root.querySelector(".ro-countdown-pill-time");

    // 14 minutes, 20 seconds = (14 * 60 + 20) * 1000 = 860000ms
    hostResult.updateDigits(860000);
    expect(pillTime?.textContent).toBe("14m 20s");

    // 2 hours, 5 minutes = (2 * 3600 + 5 * 60) * 1000 = 7500000ms
    hostResult.updateDigits(7500000);
    expect(pillTime?.textContent).toBe("2h 5m");

    // Celebration
    hostResult.showCelebration();
    expect(pillTime?.textContent).toBe(DEFAULT_COUNTDOWN_LABELS.en.celebration);

    hostResult.destroy();
  });

  it("restores minimized state from sessionStorage when present", () => {
    sessionStorage.setItem("ro_countdown_minimized", "true");

    const hostResult = mountCountdownHost({
      targetTime: new Date(2026, 2, 10, 18, 45, 0),
      position: "bottom-right",
      hasSound: false,
      initialMuted: true,
      labels: DEFAULT_COUNTDOWN_LABELS.en,
      isRtl: false,
      lang: "en",
      onDismiss: vi.fn(),
      onToggleSound: vi.fn(),
    });

    expect(hostResult.isMinimized()).toBe(true);
    expect(
      hostResult.root.classList.contains("ro-countdown-host--minimized")
    ).toBe(true);

    hostResult.destroy();
    sessionStorage.clear();
  });
});

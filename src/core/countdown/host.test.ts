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
});

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  DEFAULT_COUNTDOWN_LABELS,
  resolveCountdownLabels,
  MilestoneAnnouncer,
  attachKeyboardNavigation,
} from "./a11y";

describe("resolveCountdownLabels", () => {
  beforeEach(() => {
    document.documentElement.lang = "en";
  });

  it("resolves English dictionary by default when document is English", () => {
    const { dict, isRtl, lang } = resolveCountdownLabels("auto");
    expect(lang).toBe("en");
    expect(isRtl).toBe(false);
    expect(dict.title).toBe("Iftar Countdown");
  });

  it("resolves Arabic dictionary and sets isRtl when document lang is Arabic", () => {
    document.documentElement.lang = "ar-EG";
    const { dict, isRtl, lang } = resolveCountdownLabels("auto");
    expect(lang).toBe("ar");
    expect(isRtl).toBe(true);
    expect(dict.title).toBe("العد التنازلي للإفطار");
  });

  it("allows forcing Arabic locale explicitly", () => {
    document.documentElement.lang = "en-US";
    const { dict, isRtl, lang } = resolveCountdownLabels("ar");
    expect(lang).toBe("ar");
    expect(isRtl).toBe(true);
  });

  it("merges custom label overrides over default dictionary", () => {
    const { dict } = resolveCountdownLabels("en", {
      title: "Maghrib Timer",
    });
    expect(dict.title).toBe("Maghrib Timer");
    expect(dict.hours).toBe(DEFAULT_COUNTDOWN_LABELS.en.hours);
  });
});

describe("MilestoneAnnouncer", () => {
  let announcerEl: HTMLElement;

  beforeEach(() => {
    announcerEl = document.createElement("div");
    document.body.appendChild(announcerEl);
  });

  afterEach(() => {
    announcerEl.remove();
  });

  it("announces initial alert window arrival", () => {
    const announcer = new MilestoneAnnouncer(
      announcerEl,
      DEFAULT_COUNTDOWN_LABELS.en
    );
    announcer.announceInitial(30);

    expect(announcerEl.textContent).toContain(
      "30 minutes remaining until Maghrib"
    );
  });

  it("announces intermediate milestone minutes (30m, 15m, 5m, 1m) only once per milestone", () => {
    const announcer = new MilestoneAnnouncer(
      announcerEl,
      DEFAULT_COUNTDOWN_LABELS.en
    );

    // 30 minutes remaining
    announcer.checkMilestone(30 * 60 * 1000);
    expect(announcerEl.textContent).toBe("30 minutes remaining until Iftar.");

    // 15 minutes remaining
    announcer.checkMilestone(15 * 60 * 1000);
    expect(announcerEl.textContent).toBe("15 minutes remaining until Iftar.");

    // Subsequent tick in same minute window does not re-announce
    announcerEl.textContent = "";
    announcer.checkMilestone(15 * 60 * 1000 - 1000);
    expect(announcerEl.textContent).toBe("");

    // 5 minutes remaining
    announcer.checkMilestone(5 * 60 * 1000);
    expect(announcerEl.textContent).toBe("5 minutes remaining until Iftar.");

    // 1 minute remaining
    announcer.checkMilestone(60 * 1000);
    expect(announcerEl.textContent).toBe("1 minutes remaining until Iftar.");
  });

  it("announces Iftar arrival at T-0", () => {
    const announcer = new MilestoneAnnouncer(
      announcerEl,
      DEFAULT_COUNTDOWN_LABELS.en
    );
    announcer.checkMilestone(0);
    expect(announcerEl.textContent).toBe(
      DEFAULT_COUNTDOWN_LABELS.en.srArrivedAnnouncement
    );
  });
});

describe("attachKeyboardNavigation", () => {
  it("dismisses on Escape key press and restores focus to document.body", () => {
    const root = document.createElement("aside");
    document.body.appendChild(root);
    const onDismiss = vi.fn();
    const focusSpy = vi.spyOn(document.body, "focus");

    const cleanup = attachKeyboardNavigation(root, onDismiss);

    // Press Escape inside root
    const escapeEvent = new KeyboardEvent("keydown", {
      key: "Escape",
      bubbles: true,
    });
    root.dispatchEvent(escapeEvent);

    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(focusSpy).toHaveBeenCalled();

    cleanup();
    root.remove();
  });

  it("cleans up event listener on teardown", () => {
    const root = document.createElement("aside");
    document.body.appendChild(root);
    const onDismiss = vi.fn();

    const cleanup = attachKeyboardNavigation(root, onDismiss);
    cleanup();

    const escapeEvent = new KeyboardEvent("keydown", {
      key: "Escape",
      bubbles: true,
    });
    root.dispatchEvent(escapeEvent);

    expect(onDismiss).not.toHaveBeenCalled();
    root.remove();
  });
});

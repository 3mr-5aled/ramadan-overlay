import type { IftarCountdownLabels } from "../../types";

export const DEFAULT_COUNTDOWN_LABELS: Record<
  "en" | "ar",
  IftarCountdownLabels
> = {
  en: {
    title: "Iftar Countdown",
    targetTime: "Maghrib at {time}",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    celebration: "Iftar Mubarak!",
    dismissButton: "Dismiss countdown",
    minimizeButton: "Minimize countdown widget",
    expandButton: "Expand countdown widget",
    muteButton: "Mute alert sound",
    unmuteButton: "Enable alert sound",
    playButton: "Tap to play Iftar chime",
    srInitialAnnouncement:
      "Iftar countdown active: {minutes} minutes remaining until Maghrib.",
    srMilestoneMinutes: "{minutes} minutes remaining until Iftar.",
    srArrivedAnnouncement:
      "Iftar time! Maghrib prayer has arrived. Iftar Mubarak!",
  },
  ar: {
    title: "العد التنازلي للإفطار",
    targetTime: "المغرب في {time}",
    hours: "ساعة",
    minutes: "دقيقة",
    seconds: "ثانية",
    celebration: "إفطار مبارك!",
    dismissButton: "إغلاق العد التنازلي",
    minimizeButton: "تصغير أداة العد التنازلي",
    expandButton: "توسيع أداة العد التنازلي",
    muteButton: "كتم صوت التنبيه",
    unmuteButton: "تشغيل صوت التنبيه",
    playButton: "انقر لتشغيل تكبيرات الإفطار",
    srInitialAnnouncement:
      "العد التنازلي للإفطار نشط: متبقي {minutes} دقيقة حتى أذان المغرب.",
    srMilestoneMinutes: "متبقي {minutes} دقيقة حتى موعد الإفطار.",
    srArrivedAnnouncement: "حان الآن موعد أذان المغرب. إفطار مبارك وذنب مغفور!",
  },
};

export interface ResolvedLabelsResult {
  dict: IftarCountdownLabels;
  isRtl: boolean;
  lang: "en" | "ar";
}

export function resolveCountdownLabels(
  locale: "auto" | "en" | "ar" = "auto",
  customLabels?: Partial<IftarCountdownLabels>
): ResolvedLabelsResult {
  let lang: "en" | "ar" = "en";

  if (locale === "ar") {
    lang = "ar";
  } else if (locale === "en") {
    lang = "en";
  } else {
    // Auto-detection
    if (typeof document !== "undefined") {
      const docLang = document.documentElement.lang?.toLowerCase() || "";
      if (docLang.startsWith("ar")) {
        lang = "ar";
      } else if (
        typeof navigator !== "undefined" &&
        navigator.language?.toLowerCase().startsWith("ar")
      ) {
        lang = "ar";
      }
    }
  }

  const baseDict = DEFAULT_COUNTDOWN_LABELS[lang];
  const mergedDict: IftarCountdownLabels = {
    ...baseDict,
    ...customLabels,
  };

  return {
    dict: mergedDict,
    isRtl: lang === "ar",
    lang,
  };
}

const MILESTONES = [30, 15, 5, 1];

export class MilestoneLiveRegion {
  private announcerEl: HTMLElement;
  private dict: IftarCountdownLabels;
  private announcedMilestones = new Set<number>();
  private initialAnnounced = false;
  private arrivedAnnounced = false;

  constructor(announcerEl: HTMLElement, dict: IftarCountdownLabels) {
    this.announcerEl = announcerEl;
    this.dict = dict;
  }

  public announceInitial(minutes: number): void {
    if (this.initialAnnounced) return;
    this.initialAnnounced = true;
    const msg = this.dict.srInitialAnnouncement.replace(
      "{minutes}",
      String(minutes)
    );
    this.announcerEl.textContent = msg;
  }

  public checkMilestone(remainingMs: number): void {
    if (remainingMs <= 0) {
      if (!this.arrivedAnnounced) {
        this.arrivedAnnounced = true;
        this.announcerEl.textContent = this.dict.srArrivedAnnouncement;
      }
      return;
    }

    const minutesRemaining = Math.floor(remainingMs / 60000);
    if (
      MILESTONES.includes(minutesRemaining) &&
      !this.announcedMilestones.has(minutesRemaining)
    ) {
      this.announcedMilestones.add(minutesRemaining);
      const msg = this.dict.srMilestoneMinutes.replace(
        "{minutes}",
        String(minutesRemaining)
      );
      this.announcerEl.textContent = msg;
    }
  }
}

export { MilestoneLiveRegion as MilestoneAnnouncer };

export function attachKeyboardNavigation(
  rootEl: HTMLElement,
  onDismiss: () => void
): () => void {
  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onDismiss();
      if (typeof document !== "undefined" && document.body) {
        document.body.focus?.();
      }
    }
  };

  rootEl.addEventListener("keydown", onKeyDown);

  return () => {
    rootEl.removeEventListener("keydown", onKeyDown);
  };
}

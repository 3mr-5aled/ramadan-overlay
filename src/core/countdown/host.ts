import type {
  CountdownAnchorPosition,
  IftarCountdownLabels,
} from "../../types";
import { MilestoneAnnouncer, attachKeyboardNavigation } from "./a11y";

const COUNTDOWN_STYLE_ID = "ramadan-countdown-styles";

export function injectCountdownStyles(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(COUNTDOWN_STYLE_ID)) return;

  const css = `
:root {
  --ro-countdown-z: calc(var(--ro-z, 99999) + 1);
  --ro-countdown-margin: 24px;
  --ro-countdown-bg: rgba(18, 24, 38, 0.95);
  --ro-countdown-border: rgba(245, 158, 11, 0.3);
  --ro-countdown-gold: #f59e0b;
  --ro-countdown-text: #ffffff;
  --ro-countdown-muted: #9ca3af;
}

.ro-countdown-host {
  position: fixed;
  z-index: var(--ro-countdown-z);
  pointer-events: auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.ro-countdown-host--bottom-right {
  bottom: calc(var(--ro-countdown-margin) + env(safe-area-inset-bottom, 0px));
  inset-inline-end: calc(var(--ro-countdown-margin) + env(safe-area-inset-right, 0px));
}

.ro-countdown-host--bottom-left {
  bottom: calc(var(--ro-countdown-margin) + env(safe-area-inset-bottom, 0px));
  inset-inline-start: calc(var(--ro-countdown-margin) + env(safe-area-inset-left, 0px));
}

.ro-countdown-host--top-right {
  top: calc(var(--ro-countdown-margin) + env(safe-area-inset-top, 0px));
  inset-inline-end: calc(var(--ro-countdown-margin) + env(safe-area-inset-right, 0px));
}

.ro-countdown-host--top-left {
  top: calc(var(--ro-countdown-margin) + env(safe-area-inset-top, 0px));
  inset-inline-start: calc(var(--ro-countdown-margin) + env(safe-area-inset-left, 0px));
}

.ro-countdown-host--banner-offset-top {
  top: calc(var(--ro-countdown-margin) + env(safe-area-inset-top, 0px) + var(--ro-banner-height, 48px) + 16px) !important;
}

.ro-countdown-card {
  background: var(--ro-countdown-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--ro-countdown-border);
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
  padding: 14px 18px;
  min-width: 270px;
  max-width: 320px;
  color: var(--ro-countdown-text);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

.ro-countdown-card.ro-countdown--celebrating {
  border-color: var(--ro-countdown-gold);
  box-shadow: 0 0 24px rgba(245, 158, 11, 0.5), 0 10px 25px -5px rgba(0, 0, 0, 0.4);
  animation: ro-countdown-pulse 2s infinite alternate;
}

@keyframes ro-countdown-pulse {
  from { box-shadow: 0 0 12px rgba(245, 158, 11, 0.3), 0 10px 25px -5px rgba(0, 0, 0, 0.4); }
  to { box-shadow: 0 0 28px rgba(245, 158, 11, 0.7), 0 10px 25px -5px rgba(0, 0, 0, 0.4); }
}

.ro-countdown-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ro-countdown-badge {
  font-size: 20px;
  line-height: 1;
}

.ro-countdown-titles {
  flex: 1;
  min-width: 0;
}

.ro-countdown-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--ro-countdown-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ro-countdown-target {
  display: block;
  font-size: 11px;
  color: var(--ro-countdown-muted);
  margin-top: 2px;
}

.ro-countdown-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ro-countdown-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 8px;
  color: var(--ro-countdown-muted);
  font-size: 14px;
  line-height: 1;
  transition: background 0.15s ease, color 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ro-countdown-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--ro-countdown-text);
}

.ro-countdown-btn:focus-visible {
  outline: 2px solid var(--ro-countdown-gold);
  outline-offset: 2px;
}

.ro-countdown-btn--prompt {
  color: var(--ro-countdown-gold);
  background: rgba(245, 158, 11, 0.15);
}

.ro-countdown-digits {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 12px 0 2px;
}

.ro-countdown-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ro-countdown-value {
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
  color: var(--ro-countdown-gold);
}

.ro-countdown-sep {
  font-size: 22px;
  font-weight: 700;
  color: var(--ro-countdown-muted);
  margin-top: -10px;
}

.ro-countdown-label {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ro-countdown-muted);
  margin-top: 4px;
}

.ro-countdown-celebration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 10px 0 2px;
  padding: 8px 12px;
  background: rgba(245, 158, 11, 0.15);
  border-radius: 8px;
}

.ro-celebration-badge {
  font-size: 18px;
}

.ro-celebration-text {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--ro-countdown-gold);
}

.ro-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@media (prefers-reduced-motion: reduce) {
  #ramadan-countdown-root * {
    animation: none !important;
    transition: none !important;
  }
}
  `;

  const style = document.createElement("style");
  style.id = COUNTDOWN_STYLE_ID;
  style.textContent = css;
  document.head.appendChild(style);
}

export interface MountCountdownHostOptions {
  targetTime: Date;
  position?: CountdownAnchorPosition;
  isBannerTopActive?: boolean;
  hasSound: boolean;
  initialMuted: boolean;
  labels: IftarCountdownLabels;
  isRtl: boolean;
  lang: string;
  onDismiss: () => void;
  onToggleSound: () => void;
  onPlayAlert?: () => void;
}

export interface CountdownHostResult {
  root: HTMLElement;
  updateDigits: (remainingMs: number) => void;
  showCelebration: () => void;
  triggerCelebrationFlare: () => void;
  endCelebration: () => void;
  updateSoundButton: (muted: boolean, isBlocked?: boolean) => void;
  announcer: MilestoneAnnouncer;
  destroy: () => void;
}

export function mountCountdownHost(
  options: MountCountdownHostOptions
): CountdownHostResult {
  injectCountdownStyles();

  const root = document.createElement("aside");
  root.id = "ramadan-countdown-root";
  root.setAttribute("role", "complementary");
  root.setAttribute("aria-label", options.labels.title);

  const position = options.position ?? "bottom-right";
  root.className = `ro-countdown-host ro-countdown-host--${position}`;
  if (options.isBannerTopActive && position.startsWith("top-")) {
    root.classList.add("ro-countdown-host--banner-offset-top");
  }

  if (options.isRtl) {
    root.setAttribute("dir", "rtl");
  }
  root.setAttribute("lang", options.lang);

  // Time formatted string
  const timeString = options.targetTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const targetLabel = options.labels.targetTime.replace("{time}", timeString);

  // Card container
  const card = document.createElement("div");
  card.className = "ro-countdown-card";
  card.setAttribute("role", "region");
  card.setAttribute("aria-label", options.labels.title);

  // Header
  const header = document.createElement("div");
  header.className = "ro-countdown-header";

  const badge = document.createElement("span");
  badge.className = "ro-countdown-badge";
  badge.textContent = "🌙";

  const titles = document.createElement("div");
  titles.className = "ro-countdown-titles";

  const title = document.createElement("h3");
  title.className = "ro-countdown-title";
  title.textContent = options.labels.title;

  const targetSub = document.createElement("span");
  targetSub.className = "ro-countdown-target";
  targetSub.textContent = targetLabel;

  titles.appendChild(title);
  titles.appendChild(targetSub);

  const actions = document.createElement("div");
  actions.className = "ro-countdown-actions";

  // Sound button
  let soundBtn: HTMLButtonElement | null = null;
  if (options.hasSound) {
    soundBtn = document.createElement("button");
    soundBtn.type = "button";
    soundBtn.className = "ro-countdown-btn ro-countdown-sound-btn";
    soundBtn.setAttribute(
      "aria-label",
      options.initialMuted
        ? options.labels.unmuteButton
        : options.labels.muteButton
    );
    soundBtn.setAttribute("aria-pressed", String(!options.initialMuted));
    soundBtn.innerHTML = options.initialMuted
      ? '<span class="ro-countdown-icon">🔇</span>'
      : '<span class="ro-countdown-icon">🔊</span>';

    soundBtn.addEventListener("click", () => {
      if (soundBtn?.classList.contains("ro-countdown-btn--prompt")) {
        soundBtn.classList.remove("ro-countdown-btn--prompt");
        options.onPlayAlert?.();
      } else {
        options.onToggleSound();
      }
    });
    actions.appendChild(soundBtn);
  }

  // Dismiss button
  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "ro-countdown-btn ro-countdown-close-btn";
  closeBtn.setAttribute("aria-label", options.labels.dismissButton);
  closeBtn.innerHTML = '<span class="ro-countdown-icon">✕</span>';
  closeBtn.addEventListener("click", () => {
    options.onDismiss();
  });
  actions.appendChild(closeBtn);

  header.appendChild(badge);
  header.appendChild(titles);
  header.appendChild(actions);
  card.appendChild(header);

  // Tabular Digits
  const digits = document.createElement("div");
  digits.className = "ro-countdown-digits";
  digits.setAttribute("aria-hidden", "true");

  const createTimeUnit = (
    valClass: string,
    labelText: string
  ): { unit: HTMLDivElement; val: HTMLSpanElement } => {
    const val = document.createElement("span");
    val.className = `ro-countdown-value ${valClass}`;
    val.textContent = "00";
    const unit = document.createElement("div");
    unit.className = "ro-countdown-unit";
    const lbl = document.createElement("span");
    lbl.className = "ro-countdown-label";
    lbl.textContent = labelText;
    unit.appendChild(val);
    unit.appendChild(lbl);
    return { unit, val };
  };

  const { unit: hUnit, val: hVal } = createTimeUnit(
    "ro-val-hours",
    options.labels.hours
  );
  const sep1 = document.createElement("span");
  sep1.className = "ro-countdown-sep";
  sep1.textContent = ":";

  const { unit: mUnit, val: mVal } = createTimeUnit(
    "ro-val-minutes",
    options.labels.minutes
  );
  const sep2 = document.createElement("span");
  sep2.className = "ro-countdown-sep";
  sep2.textContent = ":";

  const { unit: sUnit, val: sVal } = createTimeUnit(
    "ro-val-seconds",
    options.labels.seconds
  );

  digits.appendChild(hUnit);
  digits.appendChild(sep1);
  digits.appendChild(mUnit);
  digits.appendChild(sep2);
  digits.appendChild(sUnit);
  card.appendChild(digits);

  // Celebration Banner (Celebration Flare)
  const celebration = document.createElement("div");
  celebration.className = "ro-countdown-celebration";
  celebration.style.display = "none";
  celebration.innerHTML = `
    <span class="ro-celebration-badge">✨</span>
    <p class="ro-celebration-text">${options.labels.celebration}</p>
  `;
  card.appendChild(celebration);

  // Offscreen Announcer
  const announcerEl = document.createElement("div");
  announcerEl.className = "ro-sr-only ro-countdown-announcer";
  announcerEl.setAttribute("role", "status");
  announcerEl.setAttribute("aria-live", "polite");
  announcerEl.setAttribute("aria-atomic", "true");
  card.appendChild(announcerEl);

  root.appendChild(card);
  document.body.appendChild(root);

  const cleanupKeyboard = attachKeyboardNavigation(root, options.onDismiss);
  const announcer = new MilestoneAnnouncer(announcerEl, options.labels);

  const updateDigits = (remainingMs: number): void => {
    const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    hVal.textContent = String(hours).padStart(2, "0");
    mVal.textContent = String(minutes).padStart(2, "0");
    sVal.textContent = String(seconds).padStart(2, "0");

    announcer.checkMilestone(remainingMs);
  };

  const triggerCelebrationFlare = (): void => {
    card.classList.add("ro-countdown--celebrating");
    digits.style.display = "none";
    celebration.style.display = "flex";
    announcer.checkMilestone(0);
  };

  const endCelebration = (): void => {
    card.classList.remove("ro-countdown--celebrating");
    celebration.style.display = "none";
    digits.style.display = "flex";
  };

  const updateSoundButton = (muted: boolean, isBlocked?: boolean): void => {
    if (!soundBtn) return;
    soundBtn.setAttribute(
      "aria-label",
      muted ? options.labels.unmuteButton : options.labels.muteButton
    );
    soundBtn.setAttribute("aria-pressed", String(!muted));

    if (isBlocked) {
      soundBtn.classList.add("ro-countdown-btn--prompt");
      soundBtn.innerHTML = '<span class="ro-countdown-icon">🔊</span>';
      soundBtn.setAttribute("aria-label", options.labels.playButton);
    } else {
      soundBtn.classList.remove("ro-countdown-btn--prompt");
      soundBtn.innerHTML = muted
        ? '<span class="ro-countdown-icon">🔇</span>'
        : '<span class="ro-countdown-icon">🔊</span>';
    }
  };

  const destroy = (): void => {
    cleanupKeyboard();
    root.remove();
  };

  return {
    root,
    updateDigits,
    showCelebration: triggerCelebrationFlare,
    triggerCelebrationFlare,
    endCelebration,
    updateSoundButton,
    announcer,
    destroy,
  };
}

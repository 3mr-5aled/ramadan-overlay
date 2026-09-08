# Implementation Specification: Iftar Countdown Widget with Configurable Maghrib Alerts

**Feature Issue:** [#9 - Feature: Iftar Countdown Widget with configurable Maghrib alerts](https://github.com/3mr-5aled/ramadan-overlay/issues/9)  
**Parent Wayfinder Map:** [#16 - [Wayfinder Map] Iftar Countdown Widget Specification](https://github.com/3mr-5aled/ramadan-overlay/issues/16)  
**Status:** Ready for Implementation (`ready-for-agent` / `ready-for-human`)

---

## 1. Executive Summary

This specification defines the architectural design, configuration API, timing engine, DOM mounting, audio playback, accessibility, and bilingual localization requirements for the **Iftar Countdown Widget**.

The widget is an ambient, non-intrusive micro-widget designed to display a festive, tabular digital countdown during the final window of the daily fast preceding Maghrib (Iftar). Upon reaching $T-0$, the widget triggers a celebratory flare (confetti burst, visual gold pulse, and optional audio chime alert) before entering an auto-dismiss lifecycle.

### Guiding Principles:

- **Zero Heavy Dependencies**: Operates with no bundled astronomy calculation libraries or geolocation lookups; time is consumer-provided or scheduled via callback.
- **Zero Audio Binaries**: Package ships no binary MP3/WAV files (<10KB library footprint); consumers provide audio URLs.
- **Zero-Throw Guarantee**: Autoplay policy blocks (`NotAllowedError`) or audio fetch errors never throw unhandled exceptions or disrupt the host application.
- **Power & Performance First**: Employs a low-power **Dormant Scheduler** until the alert window threshold, avoiding continuous per-second intervals for hours.
- **Screen Reader Accessible**: Silences high-frequency 1-second digit changes from assistive tech, broadcasting progress only at meaningful temporal milestones via a polite ARIA live region.
- **Native Bilingual Support**: Ships complete English and Arabic dictionaries with automatic locale detection and CSS-logical Right-To-Left (RTL) layout mirroring.

---

## 2. Settled Decisions Index

| Decision Ticket                                               | Title                                      | Core Resolution                                                                                                                                                                                                                                                                                                      |
| :------------------------------------------------------------ | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [#17](https://github.com/3mr-5aled/ramadan-overlay/issues/17) | Audio Autoplay Policies & Priming          | Evaluated browser autoplay rules (Chrome MEI, WebKit iOS audio unlock, Firefox). Established preference for `HTMLAudioElement` over Web Audio API (avoids cross-origin CDN CORS pre-flight failure), synchronous sound button gesture priming, and silent `safePlayAudio()` error handling.                          |
| [#18](https://github.com/3mr-5aled/ramadan-overlay/issues/18) | Time Input Contract & Config Schema        | Defined `IftarCountdownConfig`, flexible `IftarTimeValue` union (`"HH:mm"`, ISO string, `Date`, dynamic `IftarTimeResolver` callback), default 30-minute alert window, next-day rollover logic, and validation fallbacks.                                                                                            |
| [#19](https://github.com/3mr-5aled/ramadan-overlay/issues/19) | DOM Mounting Architecture & Anchoring      | Isolated `<aside id="ramadan-countdown-root">` mounted directly to `document.body` as sibling to `#ramadan-overlay-root`. Z-index `calc(var(--ro-z, 99999) + 1)`, 4-corner safe area anchoring, collision avoidance with top banner variant, and BEM `.ro-countdown-*` scoped styles.                                |
| [#20](https://github.com/3mr-5aled/ramadan-overlay/issues/20) | Countdown Timer Engine & Lifecycle         | Two-phase timing architecture: Dormant Scheduler (single `setTimeout`) transitioning to Active Tick Loop (self-correcting wall-clock delta calculation aligned to second boundaries). Background tab `visibilitychange` resync, 30s celebration state, and 10-minute auto-dismiss.                                   |
| [#21](https://github.com/3mr-5aled/ramadan-overlay/issues/21) | Audio Alert Engine & T-0 Celebration Flare | `AmbientAudioController` pre-warms media on alert window entry. `safePlayAudio()` catches `NotAllowedError` without throwing, triggers `onAudioBlocked?.()`, and switches button to tap-to-play cue. T-0 invokes `fireRamadanConfetti()`, gold card glow, and single-play audio cleanup.                             |
| [#22](https://github.com/3mr-5aled/ramadan-overlay/issues/22) | A11y Live Regions & Bilingual Localization | High-frequency ticking digits hidden with `aria-hidden="true"`. Offscreen `Milestone Live Region` (`aria-live="polite"`) announces mount, 15m, 5m, 1m, and T-0. Non-modal focus management with high-contrast `:focus-visible` rings and Escape dismissal. Auto-detected English/Arabic with CSS logical properties. |

---

## 3. Domain Model & TypeScript API (`src/types.ts`)

### 3.1. Time Value Contract & Resolver Function

```typescript
/**
 * Dynamic callback providing the target Iftar time for a given calendar date.
 * Allows consumers to integrate external prayer calculation engines (Adhan, PrayTimes) or backend APIs.
 */
export type IftarTimeResolver = (
  date: Date
) => Date | string | null | undefined;

/**
 * Accepted representations of Iftar time.
 * - "HH:mm" (24-hour local time format, e.g. "18:45")
 * - ISO-8601 string (e.g. "2026-03-10T18:45:00+03:00")
 * - JavaScript Date object representing target Iftar
 * - Dynamic resolver function evaluated per calendar day
 */
export type IftarTimeValue = string | Date | IftarTimeResolver;
```

### 3.2. Positioning & Localization Types

```typescript
/**
 * Viewport anchor corner for the countdown widget.
 */
export type CountdownAnchorPosition =
  "bottom-right" | "bottom-left" | "top-right" | "top-left";

/**
 * Localized string dictionary for the countdown widget UI and screen reader announcements.
 */
export interface IftarCountdownLabels {
  /** Title header displayed on the card (default: "Iftar Countdown" / "العد التنازلي للإفطار") */
  title: string;
  /** Label for target time subtitle (e.g. "Maghrib at {time}" / "المغرب في {time}") */
  targetTime: string;
  /** Units for tabular countdown */
  hours: string;
  minutes: string;
  seconds: string;
  /** Celebratory message displayed at T-0 (default: "Iftar Mubarak!" / "إفطار مبارك!") */
  celebration: string;
  /** Accessible labels for interactive buttons */
  dismissButton: string;
  muteButton: string;
  unmuteButton: string;
  playButton: string;
  /** Screen reader announcement milestones */
  srInitialAnnouncement: string;
  srMilestoneMinutes: string;
  srArrivedAnnouncement: string;
}
```

### 3.3. Configuration Schema (`IftarCountdownConfig`)

```typescript
export interface IftarCountdownConfig {
  /**
   * Target Iftar time: "HH:mm" string, ISO string, Date object, or dynamic resolver function.
   * If omitted, widget remains inactive unless configured.
   */
  iftarTime: IftarTimeValue;

  /**
   * Number of minutes prior to Iftar when the countdown widget becomes visible.
   * @default 30
   */
  alertWindowMinutes?: number;

  /**
   * Screen corner anchor position.
   * @default 'bottom-right'
   */
  position?: CountdownAnchorPosition;

  /**
   * Number of minutes after Iftar arrives before the widget automatically dismisses and unmounts.
   * Set to 0 to disable auto-dismiss (remain visible until manual dismiss or page navigation).
   * @default 10
   */
  autoDismissAfterMinutes?: number;

  /**
   * Duration in milliseconds for the celebratory gold pulse and confetti flare at T-0.
   * @default 30000 (30 seconds)
   */
  celebrationDurationMs?: number;

  /**
   * Optional consumer-supplied audio chime or Adhan URL.
   * If omitted, audio alert is disabled.
   */
  soundUrl?: string;

  /**
   * Whether audio alerts start muted by default.
   * @default true
   */
  defaultMuted?: boolean;

  /**
   * Whether to fire a festive confetti burst at T-0.
   * Automatically suppressed if prefers-reduced-motion is active.
   * @default true
   */
  confetti?: boolean;

  /**
   * UI language locale: 'auto' detects document language, 'ar' forces Arabic, 'en' forces English.
   * @default 'auto'
   */
  locale?: "auto" | "en" | "ar";

  /**
   * Custom label overrides for card text, tooltips, and screen reader announcements.
   */
  labels?: Partial<IftarCountdownLabels>;

  /**
   * Callback fired at T-0 when Iftar arrives.
   */
  onIftar?: () => void;

  /**
   * Callback fired when audio alert playback was blocked by browser autoplay policy.
   */
  onAudioBlocked?: () => void;

  /**
   * Callback fired when the widget is dismissed (manually by user or automatically post-Iftar).
   */
  onDismiss?: () => void;
}
```

### 3.4. Root Configuration Integration (`RamadanOverlayConfig`)

```typescript
export interface RamadanOverlayConfig {
  // ... existing options preserved ...

  /**
   * Iftar Countdown Widget configuration.
   * Pass an IftarCountdownConfig object to enable with custom settings,
   * or false to explicitly disable.
   */
  countdown?: boolean | IftarCountdownConfig;
}
```

### 3.5. Controller Interface Extensions (`OverlayController`)

```typescript
export interface IftarCountdownController {
  /** Force widget to open immediately (bypassing dormant alert window scheduler). */
  show(): void;
  /** Manually dismiss and unmount the widget. */
  dismiss(): void;
  /** Toggle audio mute state. */
  toggleMute(): boolean;
  /** Check current muted state. */
  isMuted(): boolean;
  /** Get current target Iftar timestamp. */
  getTargetTime(): Date | null;
  /** Update configuration dynamically. */
  updateConfig(config: Partial<IftarCountdownConfig>): void;
}

export interface OverlayController {
  // ... existing methods preserved ...

  /** Access the active Iftar countdown widget controller, if enabled. */
  getCountdownController(): IftarCountdownController | null;
}
```

---

## 4. DOM Mounting Architecture & Styling Isolation

### 4.1. DOM Hierarchy & Sibling Relationship

The countdown host is **never** nested inside `#ramadan-overlay-root`. `#ramadan-overlay-root` has `pointer-events: none;` and `aria-hidden="true"`, which would break interactive button clicking and screen reader discoverability.

Instead, the countdown host mounts directly into `document.body` as an independent sibling:

```html
<body>
  <!-- Host Application DOM -->
  <div id="app">...</div>

  <!-- Decorative Overlay Root (Passive, Pointer-Events None, aria-hidden) -->
  <div id="ramadan-overlay-root" aria-hidden="true">
    <!-- SVGs, sparkles, canvas elements -->
  </div>

  <!-- Countdown Host Root (Interactive, Pointer-Events Auto, Accessible Tree) -->
  <aside
    id="ramadan-countdown-root"
    role="complementary"
    aria-label="Iftar Countdown"
    class="ro-countdown-host ro-countdown-host--bottom-right"
  >
    <!-- Countdown Card Container -->
    <div class="ro-countdown-card" role="region" aria-label="Iftar Timer">
      <!-- Card Header: Title & Target Subtitle -->
      <div class="ro-countdown-header">
        <span class="ro-countdown-badge">🌙</span>
        <div class="ro-countdown-titles">
          <h3 class="ro-countdown-title">Iftar Countdown</h3>
          <span class="ro-countdown-target">Maghrib at 18:45</span>
        </div>
        <div class="ro-countdown-actions">
          <!-- Audio Toggle Button (rendered only if soundUrl configured) -->
          <button
            type="button"
            class="ro-countdown-btn ro-countdown-sound-btn"
            aria-label="Toggle alert sound"
            aria-pressed="false"
          >
            <span class="ro-countdown-icon ro-icon-sound">🔇</span>
          </button>
          <!-- Dismiss Button -->
          <button
            type="button"
            class="ro-countdown-btn ro-countdown-close-btn"
            aria-label="Dismiss countdown"
          >
            <span class="ro-countdown-icon ro-icon-close">✕</span>
          </button>
        </div>
      </div>

      <!-- Tabular Digits Display (aria-hidden to protect screen readers from second ticks) -->
      <div class="ro-countdown-digits" aria-hidden="true">
        <div class="ro-countdown-unit">
          <span class="ro-countdown-value ro-val-hours">00</span>
          <span class="ro-countdown-label">Hours</span>
        </div>
        <span class="ro-countdown-sep">:</span>
        <div class="ro-countdown-unit">
          <span class="ro-countdown-value ro-val-minutes">29</span>
          <span class="ro-countdown-label">Minutes</span>
        </div>
        <span class="ro-countdown-sep">:</span>
        <div class="ro-countdown-unit">
          <span class="ro-countdown-value ro-val-seconds">59</span>
          <span class="ro-countdown-label">Seconds</span>
        </div>
      </div>

      <!-- Celebratory Banner (shown at T-0 during celebration state) -->
      <div class="ro-countdown-celebration" style="display: none;">
        <span class="ro-celebration-badge">✨</span>
        <p class="ro-celebration-text">Iftar Mubarak!</p>
      </div>

      <!-- Milestone Live Region (offscreen screen reader announcer) -->
      <div
        class="ro-sr-only ro-countdown-announcer"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      ></div>
    </div>
  </aside>
</body>
```

### 4.2. Safe Area Viewport Anchoring & Z-Index Layering

```css
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
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 4-Corner Anchors with Mobile Safe-Area Insets */
.ro-countdown-host--bottom-right {
  bottom: calc(var(--ro-countdown-margin) + env(safe-area-inset-bottom, 0px));
  inset-inline-end: calc(
    var(--ro-countdown-margin) + env(safe-area-inset-right, 0px)
  );
}

.ro-countdown-host--bottom-left {
  bottom: calc(var(--ro-countdown-margin) + env(safe-area-inset-bottom, 0px));
  inset-inline-start: calc(
    var(--ro-countdown-margin) + env(safe-area-inset-left, 0px)
  );
}

.ro-countdown-host--top-right {
  top: calc(var(--ro-countdown-margin) + env(safe-area-inset-top, 0px));
  inset-inline-end: calc(
    var(--ro-countdown-margin) + env(safe-area-inset-right, 0px)
  );
}

.ro-countdown-host--top-left {
  top: calc(var(--ro-countdown-margin) + env(safe-area-inset-top, 0px));
  inset-inline-start: calc(
    var(--ro-countdown-margin) + env(safe-area-inset-left, 0px)
  );
}

/* Banner Collision Avoidance Offset */
.ro-countdown-host--banner-offset-top {
  top: calc(
    var(--ro-countdown-margin) + env(safe-area-inset-top, 0px) +
      var(--ro-banner-height, 48px) + 16px
  );
}
```

### 4.3. Card Styling & Tabular Numbers

```css
.ro-countdown-card {
  background: var(--ro-countdown-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--ro-countdown-border);
  border-radius: 16px;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.4),
    0 8px 10px -6px rgba(0, 0, 0, 0.3);
  padding: 16px 20px;
  min-width: 280px;
  max-width: 340px;
  color: var(--ro-countdown-text);
  transition:
    transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.25s ease,
    border-color 0.3s ease;
}

.ro-countdown-digits {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 12px 0 4px;
}

.ro-countdown-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ro-countdown-value {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
  color: var(--ro-countdown-gold);
}

.ro-countdown-sep {
  font-size: 24px;
  font-weight: 700;
  color: var(--ro-countdown-muted);
  margin-top: -12px;
}

.ro-countdown-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ro-countdown-muted);
  margin-top: 4px;
}

/* Accessible Offscreen Screen Reader Utility */
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
```

---

## 5. Timing Engine, Drift Compensation, & Lifecycle

### 5.1. Two-Phase Timing Lifecycle Architecture

```
[Init / Mount]
      │
      ▼
Resolve Iftar Time ──► Delta > alertWindowMinutes?
      │                           │
      │ YES                       │ NO (Already within window or in past)
      ▼                           ▼
[Phase 1: Dormant Scheduler]  [Phase 2: Active Tick Loop]
Single setTimeout arms to     1-second drift-compensated loop
target - alertWindow          Mounts <aside> & updates digits
      │                               │
      ▼                               ▼
Alert window arrived ────────► Target reached (T-0)?
                                      │
                                      ▼ YES
                              [Celebration Flare]
                              Confetti + Gold Pulse + Audio
                              Celebration duration timer (30s)
                                      │
                                      ▼
                              [Auto-Dismiss Timer]
                              Dismisses after autoDismissMinutes (10m)
```

### 5.2. Time Normalization Rules

1. **`"HH:mm"` Format**:
   - Parsed against local device clock: `target = new Date()`, sets `target.setHours(h, m, 0, 0)`.
   - **Rollover**: If `target.getTime() <= now.getTime() - autoDismissAfterMinutes * 60000`, the time is recognized as having passed today, and rolls over to tomorrow: `target.setDate(target.getDate() + 1)`.
2. **ISO String / Date Object**:
   - Verified via `date.getTime()`. If NaN, an error is logged to debug console and initialization aborts safely.
3. **`IftarTimeResolver` Callback**:
   - Invoked with current `new Date()`. Can return `"HH:mm"`, ISO string, `Date`, or `null`/`undefined` (skips).

### 5.3. Drift Compensation Algorithm

To prevent timer skew caused by browser task execution jitter:

```typescript
class ActiveTickEngine {
  private timerId: number | null = null;
  private targetTimeMs: number;
  private onTick: (remainingMs: number) => void;
  private onComplete: () => void;

  constructor(
    targetTime: Date,
    onTick: (remainingMs: number) => void,
    onComplete: () => void
  ) {
    this.targetTimeMs = targetTime.getTime();
    this.onTick = onTick;
    this.onComplete = onComplete;
  }

  public start(): void {
    const tick = () => {
      const now = Date.now();
      const remainingMs = this.targetTimeMs - now;

      if (remainingMs <= 0) {
        this.onTick(0);
        this.onComplete();
        return;
      }

      this.onTick(remainingMs);

      // Self-correcting delay: align to next exact second boundary
      const delay = 1000 - (Date.now() % 1000);
      this.timerId = window.setTimeout(tick, delay);
    };

    tick();
  }

  public stop(): void {
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}
```

### 5.4. Background Tab Synchronization (`visibilitychange`)

When tabs are backgrounded, browsers throttle timers down to 1 minute. The countdown engine attaches an event listener:

```typescript
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && activeEngine) {
    // Immediately calculate exact remaining wall-clock time
    const now = Date.now();
    const remainingMs = targetTime.getTime() - now;
    if (remainingMs <= 0) {
      handleT0Arrival();
    } else {
      activeEngine.forceTick();
    }
  }
});
```

---

## 6. Ambient Audio Controller & Celebration Flare

### 6.1. Browser Autoplay Policies & Priming Strategy

To comply with WHATWG media playback rules, Chrome's Media Engagement Index (MEI), and WebKit/iOS audio unlock requirements:

1. An `HTMLAudioElement` (`<audio>`) is instantiated when entering the active alert window with `preload="auto"`.
2. When the user interacts with the countdown card (clicking the mute/unmute button), the element is unlocked within the synchronous user gesture stack:
   ```typescript
   function primeAudio(audio: HTMLAudioElement): void {
     const p = audio.play();
     if (p !== undefined) {
       p.then(() => {
         audio.pause();
         audio.currentTime = 0;
       }).catch(() => {
         // Silently catch priming rejections
       });
     }
   }
   ```
3. `safePlayAudio()` wraps playback to ensure zero unhandled rejections:
   ```typescript
   export async function safePlayAudio(
     audio: HTMLAudioElement
   ): Promise<boolean> {
     try {
       const playPromise = audio.play();
       if (playPromise !== undefined) {
         await playPromise;
         return true;
       }
       return true;
     } catch (error: unknown) {
       if (error instanceof DOMException && error.name === "NotAllowedError") {
         console.debug(
           "[ramadan-overlay] Audio alert blocked by browser autoplay policy."
         );
       }
       return false;
     }
   }
   ```

### 6.2. Autoplay Block Feedback (Tap-to-Play Fallback)

If the user unmuted the widget, but browser autoplay blocks programmatic playback at T-0:

- The error is swallowed completely without throwing.
- `onAudioBlocked?.()` is fired.
- The sound button transitions into an interactive "Tap to play chime" (`🔊`) indicator, enabling one-click manual playback during the celebration window.

### 6.3. T-0 Celebration Flare

At $T-0$:

1. **Confetti Burst**: Invokes `fireRamadanConfetti()` from `src/core/confetti.ts` (if `confetti !== false` and `motionEngine.allowsMotion()`).
2. **Card Visual Transformation**: Adds `.ro-countdown--celebrating` class, presenting the localized headline ("Iftar Mubarak!" / "إفطار مبارك!") with an elegant gold border glow.
3. **Reduced Motion Adaptation**: Under `prefers-reduced-motion: reduce`, confetti is suppressed and keyframe pulsing animations are replaced with a static golden accent border.
4. **Lifecycle Teardown**: On widget auto-dismiss or `overlay.destroy()`, audio is stopped, cleared (`audio.removeAttribute('src')`), and unloaded to prevent memory or hardware leaks.

---

## 7. Accessibility (a11y) & Bilingual Localization

### 7.1. Milestone Live Region Announcer

To satisfy WCAG 2.1 (4.1.3 & 2.2.4), high-frequency 1-second digit changes are marked `aria-hidden="true"`. Screen readers receive polite, concise milestone broadcasts:

```typescript
const MILESTONE_MINUTES = [30, 15, 5, 1];

function checkAndAnnounceMilestone(
  remainingMs: number,
  announcerEl: HTMLElement,
  dict: IftarCountdownLabels
): void {
  const remainingMinutes = Math.floor(remainingMs / 60000);

  if (remainingMs <= 0) {
    announcerEl.textContent = dict.srArrivedAnnouncement;
    return;
  }

  if (MILESTONE_MINUTES.includes(remainingMinutes)) {
    announcerEl.textContent = dict.srMilestoneMinutes.replace(
      "{minutes}",
      String(remainingMinutes)
    );
  }
}
```

### 7.2. Keyboard Focus Management

- **Non-Modal Mount**: The widget never steals focus upon appearance.
- **Tab Navigation**: Natural keyboard tab order between the sound toggle button and the dismiss button.
- **Focus Rings**: Custom `:focus-visible` styling (`outline: 2px solid var(--ro-countdown-gold); outline-offset: 2px;`).
- **Escape Key Dismiss**: Pressing `Escape` while focus is inside `#ramadan-countdown-root` dismisses the widget and restores focus to `document.body`.

### 7.3. Built-In Dictionaries & RTL Mirroring

Built-in dictionaries for English and Arabic:

```typescript
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
    muteButton: "كتم صوت التنبيه",
    unmuteButton: "تشغيل صوت التنبيه",
    playButton: "انقر لتشغيل تكبيرات الإفطار",
    srInitialAnnouncement:
      "العد التنازلي للإفطار نشط: متبقي {minutes} دقيقة حتى أذان المغرب.",
    srMilestoneMinutes: "متبقي {minutes} دقيقة حتى موعد الإفطار.",
    srArrivedAnnouncement: "حان الآن موعد أذان المغرب. إفطار مبارك وذنب مغفور!",
  },
};
```

When Arabic is active:

- `<aside id="ramadan-countdown-root">` sets `dir="rtl"` and `lang="ar"`.
- Layout uses CSS logical properties (`inset-inline-start`, `inset-inline-end`, `margin-inline-start`, `padding-inline`) to mirror buttons and text cleanly.
- Tabular numerals retain `font-variant-numeric: tabular-nums` to eliminate jitter.

---

## 8. Testing & Verification Plan

| Test File                               | Verification Scope                                                                              | Key Assertions                                                                                                                                                                          |
| :-------------------------------------- | :---------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/core/countdown/normalizer.test.ts` | Time string parsing, ISO strings, Date objects, dynamic resolvers, and next-day rollover logic. | Verifies correct Date normalization across `"18:45"`, ISO formats, past-time rollover (+24h), and invalid input fallbacks.                                                              |
| `src/core/countdown/timer.test.ts`      | Two-stage lifecycle: Dormant Scheduler and Active Tick Loop with `vi.useFakeTimers()`.          | Verifies dormant timer transitions into active tick loop exactly at $T - \text{alertWindow}$, verifies second-boundary drift compensation, and verifies auto-dismiss timeout execution. |
| `src/core/countdown/audio.test.ts`      | `AmbientAudioController` and `safePlayAudio()` error trapping.                                  | Simulates `DOMException('NotAllowedError')` and verifies no exception is thrown, `onAudioBlocked` callback fires, and audio hardware is unloaded on `destroy()`.                        |
| `src/core/countdown/a11y.test.ts`       | Milestone Live Region, keyboard navigation, and focus restoration.                              | Verifies ticking digits have `aria-hidden="true"`, checks polite live region broadcasts at 30m, 15m, 5m, 1m, and T-0, and tests `Escape` key dismissal.                                 |
| `src/core/countdown/host.test.ts`       | DOM mounting, 4-corner safe area anchoring, BEM style injection, and banner collision offset.   | Verifies `<aside id="ramadan-countdown-root">` mounts as sibling in `document.body`, checks CSS classes, and validates banner offset class application.                                 |

---

## 9. Implementation Checklist & Phase Plan

- [ ] **Phase 1: Domain & Types (`src/types.ts`)**
  - Export `IftarTimeValue`, `IftarTimeResolver`, `CountdownAnchorPosition`, `IftarCountdownLabels`, `IftarCountdownConfig`.
  - Extend `RamadanOverlayConfig` with `countdown?: boolean | IftarCountdownConfig`.
  - Extend `OverlayController` with `getCountdownController()`.
- [ ] **Phase 2: Core Time Normalizer & Scheduling Engine (`src/core/countdown/`)**
  - Implement `src/core/countdown/normalizer.ts` (time resolution, rollover, validation).
  - Implement `src/core/countdown/timer.ts` (Dormant Scheduler, Active Tick Loop, drift compensation).
- [ ] **Phase 3: Ambient Audio Controller (`src/core/countdown/audio.ts`)**
  - Implement `AmbientAudioController` wrapping `HTMLAudioElement`.
  - Implement `safePlayAudio()` zero-throw error trapping and tap-to-play cue state.
- [ ] **Phase 4: DOM Host & CSS-in-JS Architecture (`src/core/countdown/host.ts`)**
  - Create `<aside id="ramadan-countdown-root">` mounting seam.
  - Add CSS styles to `src/core/host.ts` with safe area anchors and logical properties.
  - Implement collision avoidance when `banner` variant is active.
- [ ] **Phase 5: Accessibility & Localization (`src/core/countdown/a11y.ts`)**
  - Implement Milestone Live Region announcer.
  - Implement keyboard listeners (Tab order, `:focus-visible`, `Escape` dismissal).
  - Implement built-in English and Arabic dictionaries with auto-detection.
- [ ] **Phase 6: Injector Orchestration & Test Suite**
  - Wire countdown controller lifecycle into `src/core/injector.ts`.
  - Write test suites in `src/core/countdown/*.test.ts`.
  - Verify all unit tests, typecheck, and lint pass cleanly.

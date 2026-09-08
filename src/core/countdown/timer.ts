export interface CountdownTimerOptions {
  alertWindowMinutes?: number;
  autoDismissMinutes?: number;
  celebrationDurationMs?: number;
  onAlertWindow?: () => void;
  onTick?: (remainingMs: number) => void;
  onT0?: () => void;
  onCelebrationEnd?: () => void;
  onAutoDismiss?: () => void;
}

export class CountdownTimerEngine {
  private targetTime: Date;
  private alertWindowMinutes: number;
  private autoDismissMinutes: number;
  private celebrationDurationMs: number;
  private onAlertWindow?: () => void;
  private onTick?: (remainingMs: number) => void;
  private onT0?: () => void;
  private onCelebrationEnd?: () => void;
  private onAutoDismiss?: () => void;

  private dormantTimeoutId: number | null = null;
  private tickTimeoutId: number | null = null;
  private celebrationTimeoutId: number | null = null;
  private autoDismissTimeoutId: number | null = null;

  private alertWindowActive = false;
  private t0Fired = false;
  private celebrationEndFired = false;
  private autoDismissFired = false;
  private destroyed = false;

  private onVisibilityChange = (): void => {
    if (
      typeof document !== "undefined" &&
      !document.hidden &&
      !this.destroyed
    ) {
      this.forceTick();
    }
  };

  constructor(targetTime: Date, options: CountdownTimerOptions = {}) {
    this.targetTime = new Date(targetTime.getTime());
    this.alertWindowMinutes = options.alertWindowMinutes ?? 30;
    this.autoDismissMinutes = options.autoDismissMinutes ?? 10;
    this.celebrationDurationMs = options.celebrationDurationMs ?? 30000;
    this.onAlertWindow = options.onAlertWindow;
    this.onTick = options.onTick;
    this.onT0 = options.onT0;
    this.onCelebrationEnd = options.onCelebrationEnd;
    this.onAutoDismiss = options.onAutoDismiss;
  }

  public start(): void {
    if (this.destroyed) return;

    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", this.onVisibilityChange);
    }

    const now = Date.now();
    const targetMs = this.targetTime.getTime();
    const windowStartMs = targetMs - this.alertWindowMinutes * 60000;

    if (now >= windowStartMs) {
      this.enterAlertWindow();
    } else {
      const delay = windowStartMs - now;
      this.dormantTimeoutId = window.setTimeout(() => {
        this.enterAlertWindow();
      }, delay);
    }
  }

  private enterAlertWindow(): void {
    if (this.destroyed || this.alertWindowActive) return;
    this.alertWindowActive = true;
    this.onAlertWindow?.();
    this.startActiveTickLoop();
  }

  private startActiveTickLoop(): void {
    const runTick = (): void => {
      if (this.destroyed) return;

      const now = Date.now();
      const remainingMs = this.targetTime.getTime() - now;

      if (remainingMs <= 0) {
        if (!this.t0Fired) {
          this.t0Fired = true;
          this.onTick?.(0);
          this.onT0?.();
          this.scheduleCelebrationEnd();
          this.scheduleAutoDismiss();
        }
        return;
      }

      this.onTick?.(remainingMs);

      // Self-correcting delay: align to next exact second boundary
      const delay = 1000 - (Date.now() % 1000);
      this.tickTimeoutId = window.setTimeout(runTick, delay);
    };

    runTick();
  }

  private scheduleCelebrationEnd(): void {
    if (this.celebrationDurationMs <= 0 || this.celebrationEndFired) return;

    const now = Date.now();
    const celebrationEndMs =
      this.targetTime.getTime() + this.celebrationDurationMs;
    const delay = Math.max(0, celebrationEndMs - now);

    this.celebrationTimeoutId = window.setTimeout(() => {
      if (!this.destroyed && !this.celebrationEndFired) {
        this.celebrationEndFired = true;
        this.onCelebrationEnd?.();
      }
    }, delay);
  }

  private scheduleAutoDismiss(): void {
    if (this.autoDismissMinutes <= 0 || this.autoDismissFired) return;

    const now = Date.now();
    const dismissAtMs =
      this.targetTime.getTime() + this.autoDismissMinutes * 60000;
    const delay = Math.max(0, dismissAtMs - now);

    this.autoDismissTimeoutId = window.setTimeout(() => {
      if (!this.destroyed && !this.autoDismissFired) {
        this.autoDismissFired = true;
        this.onAutoDismiss?.();
      }
    }, delay);
  }

  public forceOpen(): void {
    if (this.destroyed) return;

    if (this.dormantTimeoutId !== null) {
      clearTimeout(this.dormantTimeoutId);
      this.dormantTimeoutId = null;
    }

    if (!this.alertWindowActive) {
      this.enterAlertWindow();
    } else if (!this.t0Fired) {
      if (this.tickTimeoutId !== null) {
        clearTimeout(this.tickTimeoutId);
        this.tickTimeoutId = null;
      }
      this.startActiveTickLoop();
    }
  }

  public forceTick(): void {
    if (this.destroyed) return;

    const now = Date.now();
    const targetMs = this.targetTime.getTime();
    const windowStartMs = targetMs - this.alertWindowMinutes * 60000;

    if (!this.alertWindowActive && now >= windowStartMs) {
      if (this.dormantTimeoutId !== null) {
        clearTimeout(this.dormantTimeoutId);
        this.dormantTimeoutId = null;
      }
      this.enterAlertWindow();
      return;
    }

    if (this.alertWindowActive && !this.t0Fired) {
      if (this.tickTimeoutId !== null) {
        clearTimeout(this.tickTimeoutId);
        this.tickTimeoutId = null;
      }
      this.startActiveTickLoop();
    }
  }

  public updateTarget(
    targetTime: Date,
    alertWindowMinutes?: number,
    autoDismissMinutes?: number,
    celebrationDurationMs?: number
  ): void {
    this.targetTime = new Date(targetTime.getTime());
    if (alertWindowMinutes !== undefined) {
      this.alertWindowMinutes = alertWindowMinutes;
    }
    if (autoDismissMinutes !== undefined) {
      this.autoDismissMinutes = autoDismissMinutes;
    }
    if (celebrationDurationMs !== undefined) {
      this.celebrationDurationMs = celebrationDurationMs;
    }

    this.stop();
    this.alertWindowActive = false;
    this.t0Fired = false;
    this.celebrationEndFired = false;
    this.autoDismissFired = false;
    this.start();
  }

  public isAlertWindowActive(): boolean {
    return this.alertWindowActive;
  }

  public getTargetTime(): Date {
    return new Date(this.targetTime.getTime());
  }

  public stop(): void {
    if (this.dormantTimeoutId !== null) {
      clearTimeout(this.dormantTimeoutId);
      this.dormantTimeoutId = null;
    }
    if (this.tickTimeoutId !== null) {
      clearTimeout(this.tickTimeoutId);
      this.tickTimeoutId = null;
    }
    if (this.celebrationTimeoutId !== null) {
      clearTimeout(this.celebrationTimeoutId);
      this.celebrationTimeoutId = null;
    }
    if (this.autoDismissTimeoutId !== null) {
      clearTimeout(this.autoDismissTimeoutId);
      this.autoDismissTimeoutId = null;
    }
  }

  public destroy(): void {
    this.destroyed = true;
    this.stop();
    if (typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", this.onVisibilityChange);
    }
  }
}

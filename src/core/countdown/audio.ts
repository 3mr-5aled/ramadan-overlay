/**
 * Safely plays an HTMLAudioElement, catching browser autoplay rejections
 * (NotAllowedError) and other runtime errors without throwing.
 */
export async function safePlayAudio(audio: HTMLAudioElement): Promise<boolean> {
  try {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      await playPromise;
      return true;
    }
    return true;
  } catch (error: unknown) {
    if (error instanceof DOMException) {
      switch (error.name) {
        case "NotAllowedError":
          console.debug(
            "[ramadan-overlay] Audio alert autoplay blocked by browser policy."
          );
          return false;
        case "NotSupportedError":
          console.warn(
            "[ramadan-overlay] Audio source format unsupported or invalid."
          );
          return false;
        default:
          console.debug(
            `[ramadan-overlay] Audio playback failed with DOMException: ${error.name}`
          );
          return false;
      }
    }
    return false;
  }
}

export interface AmbientAudioOptions {
  soundUrl?: string;
  defaultMuted?: boolean;
  onAudioBlocked?: () => void;
}

export class AmbientAudioController {
  private audio: HTMLAudioElement | null = null;
  private muted: boolean;
  private onAudioBlocked?: () => void;
  private soundUrl?: string;

  constructor(options: AmbientAudioOptions = {}) {
    this.muted = options.defaultMuted ?? true;
    this.onAudioBlocked = options.onAudioBlocked;
    this.soundUrl = options.soundUrl;

    if (options.soundUrl && typeof Audio !== "undefined") {
      try {
        this.audio = new Audio(options.soundUrl);
        this.audio.preload = "auto";
        this.audio.loop = false;
      } catch {
        this.audio = null;
      }
    }
  }

  public setSoundUrl(url?: string): void {
    if (this.soundUrl === url) return;
    this.soundUrl = url;
    if (this.audio) {
      try {
        this.audio.pause();
        this.audio.removeAttribute("src");
        this.audio.load();
      } catch {
        // Ignore
      }
      this.audio = null;
    }
    if (url && typeof Audio !== "undefined") {
      try {
        this.audio = new Audio(url);
        this.audio.preload = "auto";
        this.audio.loop = false;
      } catch {
        this.audio = null;
      }
    }
  }

  /**
   * Pre-warms / primes the media element within a synchronous user gesture.
   */
  public prime(): void {
    if (!this.audio) return;
    try {
      const p = this.audio.play();
      if (p !== undefined) {
        p.then(() => {
          if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
          }
        }).catch(() => {
          // Silently ignore priming rejection
        });
      }
    } catch {
      // Silently catch synchronous priming errors
    }
  }

  /**
   * Plays the alert chime if unmuted.
   */
  public async playAlert(): Promise<boolean> {
    if (this.muted || !this.audio) {
      return false;
    }

    const played = await safePlayAudio(this.audio);
    if (!played) {
      this.onAudioBlocked?.();
    }
    return played;
  }

  public setMuted(muted: boolean): void {
    this.muted = muted;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    return this.muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public destroy(): void {
    if (this.audio) {
      try {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.removeAttribute("src");
        this.audio.load();
      } catch {
        // Ignore teardown errors
      }
      this.audio = null;
    }
  }
}

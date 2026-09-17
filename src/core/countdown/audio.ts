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

/**
 * Synthesizes a soothing harmonic chime using the Web Audio API.
 * Uses a serene arpeggiated Oriental bell triad:
 * - C5 (523.25 Hz)
 * - E5 (659.25 Hz)
 * - G5 (783.99 Hz)
 * - C6 (1046.50 Hz)
 * Each tone combines fundamental and subtle harmonic overtone oscillators with smooth exponential decay.
 *
 * @param audioContext Optional active AudioContext instance.
 * @returns Promise resolving to true if played successfully, or false if audio was blocked/unsupported.
 */
export async function playSynthesizedChime(
  audioContext?: AudioContext | null
): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    let ctx = audioContext;
    if (!ctx || ctx.state === "closed") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return false;
      ctx = new AudioCtx();
    }

    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        // Resume rejected (e.g. autoplay restriction without user gesture)
      }
    }

    if (ctx.state === "suspended") {
      console.debug(
        "[ramadan-overlay] Web Audio chime playback blocked by browser autoplay policy."
      );
      return false;
    }

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.7, now);
    masterGain.connect(ctx.destination);

    // Serene bell chime arpeggio
    const notes = [
      { freq: 523.25, time: 0, duration: 1.8, gain: 0.28 },
      { freq: 659.25, time: 0.16, duration: 1.7, gain: 0.25 },
      { freq: 783.99, time: 0.32, duration: 1.8, gain: 0.22 },
      { freq: 1046.5, time: 0.48, duration: 2.0, gain: 0.2 },
    ];

    for (const note of notes) {
      const startTime = now + note.time;
      const endTime = startTime + note.duration;

      // Fundamental sine oscillator
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(note.freq, startTime);

      // Subtle metallic overtone (second harmonic with slight warmth detune)
      const overtone = ctx.createOscillator();
      overtone.type = "sine";
      overtone.frequency.setValueAtTime(note.freq * 2.01, startTime);

      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(0.0001, startTime);
      noteGain.gain.exponentialRampToValueAtTime(note.gain, startTime + 0.025);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, endTime);

      const overtoneGain = ctx.createGain();
      overtoneGain.gain.setValueAtTime(0.0001, startTime);
      overtoneGain.gain.exponentialRampToValueAtTime(
        note.gain * 0.2,
        startTime + 0.02
      );
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.7);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      overtone.connect(overtoneGain);
      overtoneGain.connect(masterGain);

      osc.start(startTime);
      osc.stop(endTime);
      overtone.start(startTime);
      overtone.stop(startTime + 0.75);
    }

    return true;
  } catch (err) {
    console.debug("[ramadan-overlay] Web Audio chime error:", err);
    return false;
  }
}

export interface AmbientAudioOptions {
  soundUrl?: string | false;
  defaultMuted?: boolean;
  onAudioBlocked?: () => void;
}

export class AmbientAudioController {
  private audio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private muted: boolean;
  private onAudioBlocked?: () => void;
  private soundUrl?: string | false;

  constructor(options: AmbientAudioOptions = {}) {
    this.muted = options.defaultMuted ?? true;
    this.onAudioBlocked = options.onAudioBlocked;
    this.soundUrl = options.soundUrl;

    if (
      this.hasCustomSoundUrl(options.soundUrl) &&
      typeof Audio !== "undefined"
    ) {
      try {
        this.audio = new Audio(options.soundUrl as string);
        this.audio.preload = "auto";
        this.audio.loop = false;
      } catch {
        this.audio = null;
      }
    }
  }

  private hasCustomSoundUrl(url?: string | false): boolean {
    return (
      typeof url === "string" &&
      url.trim().length > 0 &&
      url !== "default" &&
      url !== "none"
    );
  }

  public setSoundUrl(url?: string | false): void {
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
    if (this.hasCustomSoundUrl(url) && typeof Audio !== "undefined") {
      try {
        this.audio = new Audio(url as string);
        this.audio.preload = "auto";
        this.audio.loop = false;
      } catch {
        this.audio = null;
      }
    }
  }

  /**
   * Pre-warms / primes the media element and AudioContext within an active user gesture.
   */
  public prime(): void {
    // Prime custom HTMLAudioElement if configured
    if (this.audio) {
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

    // Prime Web Audio context if available
    try {
      if (typeof window !== "undefined") {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (AudioCtx) {
          if (!this.audioCtx || this.audioCtx.state === "closed") {
            this.audioCtx = new AudioCtx();
          }
          if (this.audioCtx && this.audioCtx.state === "suspended") {
            void this.audioCtx.resume();
          }
        }
      }
    } catch {
      // Ignore context creation errors in unsupported environments
    }
  }

  /**
   * Plays the alert chime if unmuted.
   */
  public async playAlert(): Promise<boolean> {
    if (this.muted || this.soundUrl === false || this.soundUrl === "none") {
      return false;
    }

    // 1. If custom soundUrl is configured and audio element is ready
    if (this.hasCustomSoundUrl(this.soundUrl) && this.audio) {
      const played = await safePlayAudio(this.audio);
      if (!played) {
        this.onAudioBlocked?.();
      }
      return played;
    }

    // 2. Default to built-in synthesized Web Audio chime
    const played = await playSynthesizedChime(this.audioCtx);
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
    if (this.audioCtx && this.audioCtx.state !== "closed") {
      try {
        void this.audioCtx.close();
      } catch {
        // Ignore teardown errors
      }
      this.audioCtx = null;
    }
  }
}

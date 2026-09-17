import type {
  IftarCountdownConfig,
  IftarCountdownController,
} from "../../types";
import { resolveCountdownLabels } from "./a11y";
import { AmbientAudioController } from "./audio";
import { mountCountdownHost, type CountdownHostResult } from "./host";
import { resolveTargetIftarTime } from "./normalizer";
import { CountdownTimerEngine } from "./timer";
import { fireRamadanConfetti } from "../confetti";

export * from "./normalizer";
export * from "./timer";
export * from "./audio";
export * from "./a11y";
export * from "./host";

export interface IftarCountdownManager {
  start: () => void;
  stop: () => void;
  destroy: () => void;
  isMounted: () => boolean;
  controller: IftarCountdownController | null;
}

export interface CountdownManagerOptions {
  isBannerActive?: boolean;
  hijriYear?: number;
  colors?: string[];
}

export function createCountdownManager(
  config: boolean | IftarCountdownConfig | undefined,
  options: CountdownManagerOptions = {}
): IftarCountdownManager {
  if (!config) {
    return {
      start: () => {},
      stop: () => {},
      destroy: () => {},
      isMounted: () => false,
      controller: null,
    };
  }

  const { isBannerActive = false, hijriYear = 1447, colors } = options;

  const rawConfig: IftarCountdownConfig =
    typeof config === "boolean" ? {} : config;
  const iftarTime = rawConfig.iftarTime ?? rawConfig.maghribTime ?? "18:45";

  const resolvedConfig: IftarCountdownConfig = {
    ...rawConfig,
    iftarTime,
  };

  const alertWindowMinutes = resolvedConfig.alertWindowMinutes ?? 30;
  const autoDismissMinutes =
    resolvedConfig.autoDismissAfterMinutes !== undefined
      ? resolvedConfig.autoDismissAfterMinutes
      : 10;
  const celebrationDurationMs = resolvedConfig.celebrationDurationMs ?? 30000;

  const targetTime = resolveTargetIftarTime(
    resolvedConfig.iftarTime,
    new Date(),
    autoDismissMinutes
  );

  if (!targetTime) {
    console.debug(
      "[ramadan-overlay] Invalid or unresolvable Iftar time provided."
    );
    return {
      start: () => {},
      stop: () => {},
      destroy: () => {},
      isMounted: () => false,
      controller: null,
    };
  }

  const { dict, isRtl, lang } = resolveCountdownLabels(
    resolvedConfig.locale,
    resolvedConfig.labels
  );

  const audioController = new AmbientAudioController({
    soundUrl: resolvedConfig.soundUrl,
    defaultMuted: resolvedConfig.defaultMuted,
    onAudioBlocked: () => {
      resolvedConfig.onAudioBlocked?.();
      if (hostResult) {
        hostResult.updateSoundButton(audioController.isMuted(), true);
      }
    },
  });

  let hostResult: CountdownHostResult | null = null;
  let isDestroyed = false;
  let pendingMinimized: boolean | undefined = undefined;

  const mountHost = (): void => {
    if (hostResult || isDestroyed) return;

    hostResult = mountCountdownHost({
      targetTime: timerEngine.getTargetTime(),
      position: resolvedConfig.position ?? "bottom-right",
      isBannerTopActive: isBannerActive,
      hasSound: Boolean(resolvedConfig.soundUrl),
      initialMuted: audioController.isMuted(),
      minimizable: resolvedConfig.minimizable,
      initiallyMinimized:
        pendingMinimized !== undefined
          ? pendingMinimized
          : resolvedConfig.initiallyMinimized,
      labels: dict,
      isRtl,
      lang,
      onDismiss: () => {
        controller.dismiss();
      },
      onToggleSound: () => {
        controller.toggleMute();
      },
      onPlayAlert: () => {
        audioController.playAlert();
      },
    });

    // Prime audio on mount (or first card interaction)
    audioController.prime();

    // Announce initial appearance and initialize digits
    const currentTarget = timerEngine.getTargetTime();
    const remainingMs = currentTarget.getTime() - Date.now();
    hostResult.updateDigits(remainingMs);
    const remainingMinutes = Math.max(1, Math.floor(remainingMs / 60000));
    hostResult.announcer.announceInitial(remainingMinutes);
  };

  const timerEngine = new CountdownTimerEngine(targetTime, {
    alertWindowMinutes,
    autoDismissMinutes,
    celebrationDurationMs,
    onAlertWindow: () => {
      mountHost();
    },
    onTick: (remainingMs) => {
      if (hostResult) {
        hostResult.updateDigits(remainingMs);
      }
    },
    onT0: () => {
      if (hostResult) {
        hostResult.triggerCelebrationFlare();
      }

      // Fire confetti if enabled
      if (resolvedConfig.confetti !== false) {
        try {
          void fireRamadanConfetti(hijriYear, colors);
        } catch {
          // Non-critical confetti error
        }
      }

      // Play chime alert
      audioController.playAlert();

      // Fire consumer callback
      resolvedConfig.onIftar?.();
    },
    onCelebrationEnd: () => {
      if (hostResult) {
        hostResult.endCelebration();
      }
    },
    onAutoDismiss: () => {
      controller.dismiss();
    },
  });

  const controller: IftarCountdownController = {
    show: () => {
      mountHost();
      timerEngine.forceOpen();
    },
    dismiss: () => {
      if (hostResult) {
        hostResult.destroy();
        hostResult = null;
      }
      timerEngine.stop();
      audioController.destroy();
      resolvedConfig.onDismiss?.();
    },
    minimize: () => {
      pendingMinimized = true;
      hostResult?.minimize();
    },
    expand: () => {
      pendingMinimized = false;
      hostResult?.expand();
    },
    isMinimized: () => {
      if (hostResult) {
        return hostResult.isMinimized();
      }
      return pendingMinimized ?? (resolvedConfig.initiallyMinimized || false);
    },
    toggleMute: () => {
      const isMuted = audioController.toggleMute();
      if (!isMuted) {
        audioController.prime();
      }
      if (hostResult) {
        hostResult.updateSoundButton(isMuted, false);
      }
      return isMuted;
    },
    isMuted: () => audioController.isMuted(),
    getTargetTime: () => timerEngine.getTargetTime(),
    updateConfig: (partial) => {
      Object.assign(resolvedConfig, partial);
      if (partial.defaultMuted !== undefined) {
        audioController.setMuted(partial.defaultMuted);
      }
      if (partial.soundUrl !== undefined) {
        audioController.setSoundUrl(partial.soundUrl);
      }
      if (
        partial.iftarTime !== undefined ||
        partial.alertWindowMinutes !== undefined ||
        partial.autoDismissAfterMinutes !== undefined ||
        partial.celebrationDurationMs !== undefined
      ) {
        const newTarget = resolveTargetIftarTime(
          resolvedConfig.iftarTime,
          new Date(),
          resolvedConfig.autoDismissAfterMinutes ?? 10
        );
        if (newTarget) {
          timerEngine.updateTarget(
            newTarget,
            resolvedConfig.alertWindowMinutes ?? 30,
            resolvedConfig.autoDismissAfterMinutes ?? 10,
            resolvedConfig.celebrationDurationMs ?? 30000
          );
        }
      }
      if (partial.position && hostResult) {
        hostResult.root.className = `ro-countdown-host ro-countdown-host--${partial.position}`;
        if (isBannerActive && partial.position.startsWith("top-")) {
          hostResult.root.classList.add("ro-countdown-host--banner-offset-top");
        }
      }
    },
  };

  return {
    start: () => {
      if (!isDestroyed) {
        timerEngine.start();
      }
    },
    stop: () => {
      timerEngine.stop();
    },
    destroy: () => {
      isDestroyed = true;
      controller.dismiss();
      timerEngine.destroy();
    },
    isMounted: () => hostResult !== null,
    controller,
  };
}

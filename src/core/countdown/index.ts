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

export function createCountdownManager(
  config: boolean | IftarCountdownConfig | undefined,
  isBannerActive = false,
  hijriYear = 1447,
  colors?: string[]
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

  const resolvedConfig: IftarCountdownConfig =
    typeof config === "boolean" ? { iftarTime: "18:45" } : { ...config };

  const alertWindowMinutes = resolvedConfig.alertWindowMinutes ?? 30;
  const autoDismissMinutes =
    resolvedConfig.autoDismissAfterMinutes !== undefined
      ? resolvedConfig.autoDismissAfterMinutes
      : 10;

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

  const mountHost = (): void => {
    if (hostResult || isDestroyed) return;

    hostResult = mountCountdownHost({
      targetTime,
      position: resolvedConfig.position ?? "bottom-right",
      isBannerTopActive: isBannerActive,
      hasSound: Boolean(resolvedConfig.soundUrl),
      initialMuted: audioController.isMuted(),
      labels: dict,
      isRtl,
      lang,
      onDismiss: () => {
        controller.dismiss();
      },
      onToggleSound: () => {
        controller.toggleMute();
      },
    });

    // Prime audio on mount (or first card interaction)
    audioController.prime();

    // Announce initial appearance
    const remainingMs = targetTime.getTime() - Date.now();
    const remainingMinutes = Math.max(1, Math.floor(remainingMs / 60000));
    hostResult.announcer.announceInitial(remainingMinutes);
  };

  const timerEngine = new CountdownTimerEngine(targetTime, {
    alertWindowMinutes,
    autoDismissMinutes,
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
        hostResult.showCelebration();
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
    onAutoDismiss: () => {
      controller.dismiss();
    },
  });

  const controller: IftarCountdownController = {
    show: () => {
      mountHost();
      timerEngine.forceTick();
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
    getTargetTime: () => new Date(targetTime.getTime()),
    updateConfig: (partial) => {
      Object.assign(resolvedConfig, partial);
      if (partial.defaultMuted !== undefined) {
        audioController.setMuted(partial.defaultMuted);
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

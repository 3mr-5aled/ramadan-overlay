import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { AmbientAudioController, safePlayAudio } from "./audio";

describe("safePlayAudio", () => {
  it("resolves true when audio.play() resolves successfully", async () => {
    const mockAudio = {
      play: vi.fn().mockResolvedValue(undefined),
    } as unknown as HTMLAudioElement;

    const result = await safePlayAudio(mockAudio);
    expect(result).toBe(true);
  });

  it("swallows NotAllowedError and resolves false without throwing", async () => {
    const domException = new DOMException(
      "The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.",
      "NotAllowedError"
    );
    const mockAudio = {
      play: vi.fn().mockRejectedValue(domException),
    } as unknown as HTMLAudioElement;

    const result = await safePlayAudio(mockAudio);
    expect(result).toBe(false);
  });

  it("swallows generic errors and resolves false without throwing", async () => {
    const mockAudio = {
      play: vi.fn().mockRejectedValue(new Error("Network failure")),
    } as unknown as HTMLAudioElement;

    const result = await safePlayAudio(mockAudio);
    expect(result).toBe(false);
  });
});

describe("AmbientAudioController", () => {
  let originalAudio: typeof Audio;

  beforeEach(() => {
    originalAudio = global.Audio;
  });

  afterEach(() => {
    global.Audio = originalAudio;
    vi.restoreAllMocks();
  });

  it("initializes as muted by default when defaultMuted is not specified", () => {
    const controller = new AmbientAudioController({
      soundUrl: "https://example.com/chime.mp3",
    });
    expect(controller.isMuted()).toBe(true);
    controller.destroy();
  });

  it("toggles mute state and returns updated state", () => {
    const controller = new AmbientAudioController({
      soundUrl: "https://example.com/chime.mp3",
      defaultMuted: true,
    });
    expect(controller.isMuted()).toBe(true);

    const nowMuted = controller.toggleMute();
    expect(nowMuted).toBe(false);
    expect(controller.isMuted()).toBe(false);

    controller.destroy();
  });

  it("does not play when muted", async () => {
    const playMock = vi.fn().mockResolvedValue(undefined);
    global.Audio = vi.fn().mockImplementation(() => ({
      play: playMock,
      pause: vi.fn(),
      removeAttribute: vi.fn(),
      load: vi.fn(),
    })) as unknown as typeof Audio;

    const controller = new AmbientAudioController({
      soundUrl: "https://example.com/chime.mp3",
      defaultMuted: true,
    });
    const played = await controller.playAlert();

    expect(played).toBe(false);
    expect(playMock).not.toHaveBeenCalled();

    controller.destroy();
  });

  it("invokes onAudioBlocked when unmuted playback fails due to autoplay policy", async () => {
    const notAllowed = new DOMException("Autoplay blocked", "NotAllowedError");
    global.Audio = vi.fn().mockImplementation(() => ({
      play: vi.fn().mockRejectedValue(notAllowed),
      pause: vi.fn(),
      removeAttribute: vi.fn(),
      load: vi.fn(),
    })) as unknown as typeof Audio;

    const onAudioBlocked = vi.fn();
    const controller = new AmbientAudioController({
      soundUrl: "https://example.com/chime.mp3",
      defaultMuted: false,
      onAudioBlocked,
    });

    const played = await controller.playAlert();
    expect(played).toBe(false);
    expect(onAudioBlocked).toHaveBeenCalledTimes(1);

    controller.destroy();
  });

  it("cleans up audio resource on destroy", () => {
    const pauseMock = vi.fn();
    const removeAttrMock = vi.fn();
    const loadMock = vi.fn();

    global.Audio = vi.fn().mockImplementation(() => ({
      play: vi.fn().mockResolvedValue(undefined),
      pause: pauseMock,
      removeAttribute: removeAttrMock,
      load: loadMock,
      currentTime: 10,
    })) as unknown as typeof Audio;

    const controller = new AmbientAudioController({
      soundUrl: "https://example.com/chime.mp3",
    });
    controller.destroy();

    expect(pauseMock).toHaveBeenCalled();
    expect(removeAttrMock).toHaveBeenCalledWith("src");
    expect(loadMock).toHaveBeenCalled();
  });
});

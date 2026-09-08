import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mountEid } from "./eid";
import { mountBannerElements } from "./banner";
import type { ResolvedConfig } from "../../types";

describe("mountEid", () => {
  let container: HTMLElement;

  const createConfig = (
    overrides: Partial<ResolvedConfig> = {}
  ): ResolvedConfig => ({
    variant: "eid",
    position: "both",
    opacity: 0.85,
    colors: ["#c9a84c", "#e8c96b", "#2d5a27", "#8b4513", "#1a3a1a"],
    density: "normal",
    lanternStyle: 0,
    zIndex: 9999,
    glowColor: "rgba(201,168,76,0.5)",
    ceilingColor: "#c9a84c",
    ropeColor: "#c9a84c",
    confetti: "on",
    region: "standard",
    hijriAdjustment: 0,
    autoTrigger: true,
    previewMode: false,
    bannerBg: "#1a3a1a",
    bannerTextColor: "#e8c96b",
    bannerIconColor: "#c9a84c",
    bannerTextEn: "",
    bannerTextAr: "",
    locale: "en",
    occasions: ["ramadan", "eid-fitr", "eid-adha"],
    eidVariant: "eid",
    liveTransition: true,
    onRamadanStart: undefined,
    onRamadanEnd: undefined,
    onEidStart: undefined,
    onOccasionChange: undefined,
    ...overrides,
  });

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it("mounts Eid Al-Fitr motifs (balloons, gifts, stars) when occasion is eid-fitr", () => {
    const config = createConfig();
    const cleanup = mountEid(container, config, "eid-fitr");

    expect(container.children.length).toBeGreaterThan(0);
    const hasFitrMotifs = Array.from(container.children).some(
      (el) =>
        el.classList.contains("ro-balloon") ||
        el.classList.contains("ro-gift") ||
        el.classList.contains("ro-star")
    );
    expect(hasFitrMotifs).toBe(true);

    cleanup();
    expect(container.children.length).toBe(0);
  });

  it("mounts Eid Al-Adha motifs (sheep, kaaba, crescents) when occasion is eid-adha", () => {
    const config = createConfig();
    const cleanup = mountEid(container, config, "eid-adha");

    expect(container.children.length).toBeGreaterThan(0);
    const hasAdhaMotifs = Array.from(container.children).some(
      (el) =>
        el.classList.contains("ro-sheep") ||
        el.classList.contains("ro-kaaba") ||
        el.classList.contains("ro-crescent")
    );
    expect(hasAdhaMotifs).toBe(true);

    cleanup();
    expect(container.children.length).toBe(0);
  });

  it("respects explicit eid-fitr and eid-adha variant overrides", () => {
    const configFitr = createConfig({ variant: "eid-fitr" });
    const cleanupFitr = mountEid(container, configFitr, "eid-adha"); // variant override wins
    expect(
      Array.from(container.children).some((el) =>
        el.classList.contains("ro-balloon")
      )
    ).toBe(true);
    cleanupFitr();

    const configAdha = createConfig({ variant: "eid-adha" });
    const cleanupAdha = mountEid(container, configAdha, "eid-fitr"); // variant override wins
    expect(
      Array.from(container.children).some((el) =>
        el.classList.contains("ro-sheep")
      )
    ).toBe(true);
    cleanupAdha();
  });

  it("respects density configurations", () => {
    const configLow = createConfig({ density: "low" });
    const cleanupLow = mountEid(container, configLow, "eid-fitr");
    const countLow = container.children.length;
    cleanupLow();

    const configHigh = createConfig({ density: "high" });
    const cleanupHigh = mountEid(container, configHigh, "eid-fitr");
    const countHigh = container.children.length;
    cleanupHigh();

    expect(countHigh).toBeGreaterThan(countLow);
  });
});

describe("mountBannerElements with Eid occasion", () => {
  const createConfig = (
    overrides: Partial<ResolvedConfig> = {}
  ): ResolvedConfig => ({
    variant: "banner",
    position: "top",
    opacity: 0.85,
    colors: ["#c9a84c", "#e8c96b", "#2d5a27", "#8b4513", "#1a3a1a"],
    density: "normal",
    lanternStyle: 0,
    zIndex: 9999,
    glowColor: "rgba(201,168,76,0.5)",
    ceilingColor: "#c9a84c",
    ropeColor: "#c9a84c",
    confetti: "on",
    region: "standard",
    hijriAdjustment: 0,
    autoTrigger: true,
    previewMode: false,
    bannerBg: "#1a3a1a",
    bannerTextColor: "#e8c96b",
    bannerIconColor: "#c9a84c",
    bannerTextEn: "",
    bannerTextAr: "",
    locale: "en",
    occasions: ["ramadan", "eid-fitr", "eid-adha"],
    eidVariant: "eid",
    liveTransition: true,
    onRamadanStart: undefined,
    onRamadanEnd: undefined,
    onEidStart: undefined,
    onOccasionChange: undefined,
    ...overrides,
  });

  it("uses default Ramadan greeting when occasion is ramadan", () => {
    const config = createConfig();
    const { elements, cleanup } = mountBannerElements(config, "ramadan");
    expect(elements[0].textContent).toContain("Ramadan Mubarak");
    cleanup();
  });

  it("uses contextual Eid greeting in English when occasion is eid-fitr", () => {
    const config = createConfig({ locale: "en" });
    const { elements, cleanup } = mountBannerElements(config, "eid-fitr");
    expect(elements[0].textContent).toContain("Eid Mubarak");
    cleanup();
  });

  it("uses contextual Eid greeting in Arabic when locale is ar and occasion is eid-adha", () => {
    const config = createConfig({ locale: "ar" });
    const { elements, cleanup } = mountBannerElements(config, "eid-adha");
    expect(elements[0].textContent).toContain("عيد مبارك");
    cleanup();
  });
});

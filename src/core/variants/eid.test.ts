import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mountEid } from "./eid";
import { mountBannerElements } from "./banner";
import type { ResolvedConfig } from "../../types";

describe("mountEid", () => {
  let container: HTMLElement;

  const createConfig = (
    overrides: Partial<ResolvedConfig> = {}
  ): ResolvedConfig => ({
    debug: false,
    variant: "eid",
    theme: "classic",
    themeName: "classic",
    position: "both",
    mobileSideBehavior: "hide",
    opacity: 0.85,
    colors: ["#c9a84c", "#e8c96b", "#2d5a27", "#8b4513", "#1a3a1a"],
    clearance: "edges",
    layer: "foreground",
    density: "normal",
    intensity: "normal",
    shadows: "soft",
    lanternStyle: 0,
    zIndex: 9999,
    lanternZIndex: 2,
    glowColor: "rgba(201,168,76,0.5)",
    ceilingColor: "#c9a84c",
    ropeColor: "#c9a84c",
    ropeStyle: "straight",
    ropeSag: 20,
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
    countdown: false,
    countdownBg: "#1a162b",
    countdownBorder: "rgba(201,168,76,0.25)",
    countdownAccent: "#c9a84c",
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

  it("mounts Eid Al-Adha motifs (sheep, crescents) when occasion is eid-adha and never floats Kaaba", () => {
    const config = createConfig();
    const cleanup = mountEid(container, config, "eid-adha");

    expect(container.children.length).toBeGreaterThan(0);
    const hasAdhaMotifs = Array.from(container.children).some(
      (el) =>
        el.classList.contains("ro-sheep") ||
        el.classList.contains("ro-crescent")
    );
    expect(hasAdhaMotifs).toBe(true);

    // Kaaba is strictly removed from floating visual variants
    const hasFloatingKaaba = Array.from(container.children).some(
      (el) =>
        el.classList.contains("ro-kaaba") ||
        el.innerHTML.toLowerCase().includes("kaaba")
    );
    expect(hasFloatingKaaba).toBe(false);

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
    debug: false,
    variant: "banner",
    theme: "classic",
    themeName: "classic",
    position: "top",
    mobileSideBehavior: "hide",
    opacity: 0.85,
    colors: ["#c9a84c", "#e8c96b", "#2d5a27", "#8b4513", "#1a3a1a"],
    clearance: "edges",
    layer: "foreground",
    density: "normal",
    intensity: "normal",
    shadows: "soft",
    lanternStyle: 0,
    zIndex: 9999,
    lanternZIndex: 2,
    glowColor: "rgba(201,168,76,0.5)",
    ceilingColor: "#c9a84c",
    ropeColor: "#c9a84c",
    ropeStyle: "straight",
    ropeSag: 20,
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
    countdown: false,
    countdownBg: "#1a162b",
    countdownBorder: "rgba(201,168,76,0.25)",
    countdownAccent: "#c9a84c",
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
    expect(elements[0].innerHTML).toContain("ro-banner-icon");
    cleanup();
  });

  it("uses specific Eid Al-Fitr greeting in English and Arabic when occasion is eid-fitr", () => {
    const configEn = createConfig({ locale: "en" });
    const { elements: elEn, cleanup: cleanupEn } = mountBannerElements(
      configEn,
      "eid-fitr"
    );
    expect(elEn[0].textContent).toContain("Eid Al-Fitr");
    cleanupEn();

    const configAr = createConfig({ locale: "ar" });
    const { elements: elAr, cleanup: cleanupAr } = mountBannerElements(
      configAr,
      "eid-fitr"
    );
    expect(elAr[0].textContent).toContain("عيد فطر مبارك");
    cleanupAr();
  });

  it("uses specific Eid Al-Adha greeting in English and Arabic when occasion is eid-adha", () => {
    const configEn = createConfig({ locale: "en" });
    const { elements: elEn, cleanup: cleanupEn } = mountBannerElements(
      configEn,
      "eid-adha"
    );
    expect(elEn[0].textContent).toContain("Eid Al-Adha");
    cleanupEn();

    const configAr = createConfig({ locale: "ar" });
    const { elements: elAr, cleanup: cleanupAr } = mountBannerElements(
      configAr,
      "eid-adha"
    );
    expect(elAr[0].textContent).toContain("عيد أضحى مبارك");
    cleanupAr();
  });

  it("resolves occasion-specific text from dictionary config", () => {
    const configDict = createConfig({
      bannerTextEn: {
        ramadan: "Bespoke Ramadan Message",
        "eid-fitr": "Bespoke Fitr Message",
        "eid-adha": "Bespoke Adha Message",
      },
    });

    const { elements: elRamadan, cleanup: cRamadan } = mountBannerElements(
      configDict,
      "ramadan"
    );
    expect(elRamadan[0].textContent).toContain("Bespoke Ramadan Message");
    cRamadan();

    const { elements: elFitr, cleanup: cFitr } = mountBannerElements(
      configDict,
      "eid-fitr"
    );
    expect(elFitr[0].textContent).toContain("Bespoke Fitr Message");
    cFitr();

    const { elements: elAdha, cleanup: cAdha } = mountBannerElements(
      configDict,
      "eid-adha"
    );
    expect(elAdha[0].textContent).toContain("Bespoke Adha Message");
    cAdha();
  });

  it("verifies Eid Al-Adha banner icon contains Kaaba, excludes crescent, and remains black regardless of theme", () => {
    const configTheme = createConfig({
      theme: "emerald",
      bannerIconColor: "#00ff88", // theme-colored green
    });

    const { elements, cleanup } = mountBannerElements(configTheme, "eid-adha");
    expect(elements.length).toBeGreaterThan(0);

    const bannerEl = elements[0];
    const svgEl = bannerEl.querySelector("svg");
    expect(svgEl).not.toBeNull();
    const svgContent = svgEl!.outerHTML;

    // 1. Must contain Kaaba body with strictly black fill (#121212)
    expect(svgContent).toContain('fill="#121212"');

    // 2. Must contain gold Kiswah belt and door
    expect(svgContent).toContain('stroke="#d4af37"');
    expect(svgContent).toContain('fill="#d4af37"');

    // 3. Must NOT contain crescent path
    expect(svgContent).not.toContain("M14 4 C7 4");
    expect(svgContent).not.toContain("M18 3 C9 3");

    // 4. Must NOT color the Kaaba cube with theme/banner icon color
    expect(svgContent).not.toContain('fill="var(--ro-banner-icon');
    expect(svgContent).not.toContain('fill="#00ff88"');

    cleanup();
  });
});

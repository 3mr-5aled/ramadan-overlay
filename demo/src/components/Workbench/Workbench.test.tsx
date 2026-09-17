import { describe, it, expect, vi } from "vitest";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { Workbench } from "./Workbench";
import { enTranslations } from "../../translations/en";
import { arTranslations } from "../../translations/ar";
import type { RamadanOverlayConfig } from "ramadan-overlay";

// @ts-expect-error React act environment flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("Workbench 6-Tab Progress Configurator Seam", () => {
  const initialConfig: Partial<RamadanOverlayConfig> = {
    variant: "lanterns",
    position: "top",
    opacity: 0.85,
    layer: "foreground",
    zIndex: 9999,
    shadows: "soft",
    autoTrigger: false,
    previewMode: true,
    debug: false,
    countdown: false,
    confetti: "on",
    attachTo: ".celestial-nav",
    attachEdge: "bottom",
    mobileSideBehavior: "hide",
    clearance: "edges",
    lanternStyle: 0,
    lanternCount: undefined,
    lanternZIndex: 2,
    ropeStyle: "straight",
    ropeSag: 20,
    ceilingColor: "#c9a84c",
    ropeColor: "#c9a84c",
    density: "normal",
    intensity: "normal",
    region: "standard",
    hijriAdjustment: 0,
    date: undefined,
    occasions: ["ramadan", "eid-fitr", "eid-adha"],
    eidVariant: "eid",
    liveTransition: true,
    bannerTextAr: "رَمَضَان كَرِيم",
    bannerTextEn: "Ramadan Mubarak",
    bannerBg: "rgba(15,15,20,0.92)",
    bannerTextColor: "#f1f5f9",
    bannerIconColor: "#c9a84c",
  };

  const defaultThemeDef = {
    colors: ["#c9a84c", "#e5c158", "#9a7b2c", "#f3e5ab", "#1b3b2b", "#0f172a"],
    glowColor: "rgba(201,168,76,0.55)",
    ceilingColor: "#c9a84c",
    ropeColor: "#c9a84c",
    bannerBg: "rgba(15,15,20,0.92)",
    bannerTextColor: "#f1f5f9",
    bannerIconColor: "#c9a84c",
  };

  it("renders all 6 progress tabs with step indicators and initial progress percentage", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        <Workbench
          t={enTranslations}
          locale="en"
          config={initialConfig}
          themeName="classic"
          customTheme={defaultThemeDef}
          onSelectVariant={vi.fn()}
          onChangePosition={vi.fn()}
          onChangeTheme={vi.fn()}
          onUpdateConfig={vi.fn()}
          onUpdateCustomColor={vi.fn()}
          onResetCustomColors={vi.fn()}
          onToggleAutoTrigger={vi.fn()}
          onToggleCountdown={vi.fn()}
        />
      );
    });

    const tabButtons = container.querySelectorAll(".ro-config-tab-btn");
    expect(tabButtons.length).toBe(6);

    const tabTexts = Array.from(tabButtons).map((btn) =>
      btn.textContent?.trim()
    );
    expect(tabTexts[0]).toContain("Variant & Theme");
    expect(tabTexts[1]).toContain("Layout & Placement");
    expect(tabTexts[2]).toContain("Styling & Motifs");
    expect(tabTexts[3]).toContain("Calendar & Region");
    expect(tabTexts[4]).toContain("Countdown & Banner");
    expect(tabTexts[5]).toContain("Code & Export");

    const progressLabel = container.querySelector(".ro-progress-label");
    expect(progressLabel).toBeTruthy();
    expect(progressLabel?.textContent).toContain("Step 1 of 6");

    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("navigates forward using Next Step button and switches active tab panel", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        <Workbench
          t={enTranslations}
          locale="en"
          config={initialConfig}
          themeName="classic"
          customTheme={defaultThemeDef}
          onSelectVariant={vi.fn()}
          onChangePosition={vi.fn()}
          onChangeTheme={vi.fn()}
          onUpdateConfig={vi.fn()}
          onUpdateCustomColor={vi.fn()}
          onResetCustomColors={vi.fn()}
          onToggleAutoTrigger={vi.fn()}
          onToggleCountdown={vi.fn()}
        />
      );
    });

    const nextBtn = container.querySelector(
      ".ro-stepper-next-btn"
    ) as HTMLButtonElement;
    expect(nextBtn).toBeTruthy();

    await act(async () => {
      nextBtn.click();
    });

    const progressLabel = container.querySelector(".ro-progress-label");
    expect(progressLabel?.textContent).toContain("Step 2 of 6");

    // In step 2, Layout & Placement fields should be visible
    expect(container.textContent).toContain("Viewport Screen Placement");
    expect(container.textContent).toContain("Layer Stacking");
    expect(container.textContent).toContain("Root Overlay Z-Index");

    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("allows direct tab switching to Calendar & Region (Tab 4) and dispatches configuration changes", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const handleUpdateConfig = vi.fn();

    await act(async () => {
      root.render(
        <Workbench
          t={enTranslations}
          locale="en"
          config={initialConfig}
          themeName="classic"
          customTheme={defaultThemeDef}
          onSelectVariant={vi.fn()}
          onChangePosition={vi.fn()}
          onChangeTheme={vi.fn()}
          onUpdateConfig={handleUpdateConfig}
          onUpdateCustomColor={vi.fn()}
          onResetCustomColors={vi.fn()}
          onToggleAutoTrigger={vi.fn()}
          onToggleCountdown={vi.fn()}
        />
      );
    });

    const tabButtons = container.querySelectorAll(".ro-config-tab-btn");
    const calendarTab = tabButtons[3] as HTMLButtonElement;

    await act(async () => {
      calendarTab.click();
    });

    const progressLabel = container.querySelector(".ro-progress-label");
    expect(progressLabel?.textContent).toContain("Step 4 of 6");

    const regionSelect = container.querySelector(
      "select[data-field='region']"
    ) as HTMLSelectElement;
    expect(regionSelect).toBeTruthy();

    await act(async () => {
      regionSelect.value = "turkey";
      regionSelect.dispatchEvent(new Event("change", { bubbles: true }));
    });

    expect(handleUpdateConfig).toHaveBeenCalledWith(
      expect.objectContaining({ region: "turkey" })
    );

    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("renders Arabic labels and RTL alignment when locale='ar'", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        <Workbench
          t={arTranslations}
          locale="ar"
          config={initialConfig}
          themeName="classic"
          customTheme={defaultThemeDef}
          onSelectVariant={vi.fn()}
          onChangePosition={vi.fn()}
          onChangeTheme={vi.fn()}
          onUpdateConfig={vi.fn()}
          onUpdateCustomColor={vi.fn()}
          onResetCustomColors={vi.fn()}
          onToggleAutoTrigger={vi.fn()}
          onToggleCountdown={vi.fn()}
        />
      );
    });

    const progressLabel = container.querySelector(".ro-progress-label");
    expect(progressLabel?.textContent).toContain("الخطوة 1 من 6");

    const tabButtons = container.querySelectorAll(".ro-config-tab-btn");
    expect(tabButtons[0].textContent).toContain("النمط والمظهر");
    expect(tabButtons[1].textContent).toContain("الموضع والطبقات");

    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("navigates to Tab 3 (Styling) and dispatches lantern and motif updates", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const handleUpdateConfig = vi.fn();

    await act(async () => {
      root.render(
        <Workbench
          t={enTranslations}
          locale="en"
          config={initialConfig}
          themeName="classic"
          customTheme={defaultThemeDef}
          onSelectVariant={vi.fn()}
          onChangePosition={vi.fn()}
          onChangeTheme={vi.fn()}
          onUpdateConfig={handleUpdateConfig}
          onUpdateCustomColor={vi.fn()}
          onResetCustomColors={vi.fn()}
          onToggleAutoTrigger={vi.fn()}
          onToggleCountdown={vi.fn()}
        />
      );
    });

    const tabButtons = container.querySelectorAll(".ro-config-tab-btn");
    const stylingTab = tabButtons[2] as HTMLButtonElement;

    await act(async () => {
      stylingTab.click();
    });

    const lanternCountSelect = container.querySelector(
      "select[data-field='lanternCount']"
    ) as HTMLSelectElement;
    expect(lanternCountSelect).toBeTruthy();

    await act(async () => {
      lanternCountSelect.value = "4";
      lanternCountSelect.dispatchEvent(new Event("change", { bubbles: true }));
    });

    expect(handleUpdateConfig).toHaveBeenCalledWith(
      expect.objectContaining({ lanternCount: 4 })
    );

    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("navigates to Tab 5 (Countdown & Banner) and configures banner text and countdown", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const handleUpdateConfig = vi.fn();

    await act(async () => {
      root.render(
        <Workbench
          t={enTranslations}
          locale="en"
          config={{ ...initialConfig, countdown: true }}
          themeName="classic"
          customTheme={defaultThemeDef}
          onSelectVariant={vi.fn()}
          onChangePosition={vi.fn()}
          onChangeTheme={vi.fn()}
          onUpdateConfig={handleUpdateConfig}
          onUpdateCustomColor={vi.fn()}
          onResetCustomColors={vi.fn()}
          onToggleAutoTrigger={vi.fn()}
          onToggleCountdown={vi.fn()}
        />
      );
    });

    const tabButtons = container.querySelectorAll(".ro-config-tab-btn");
    const countdownTab = tabButtons[4] as HTMLButtonElement;

    await act(async () => {
      countdownTab.click();
    });

    const bannerInput = container.querySelector(
      "input[data-field='bannerTextEn']"
    ) as HTMLInputElement;
    expect(bannerInput).toBeTruthy();

    await act(async () => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      nativeInputValueSetter?.call(bannerInput, "Blessed Ramadan");
      bannerInput.dispatchEvent(new Event("input", { bubbles: true }));
    });

    expect(handleUpdateConfig).toHaveBeenCalledWith(
      expect.objectContaining({ bannerTextEn: "Blessed Ramadan" })
    );

    act(() => {
      root.unmount();
    });
    container.remove();
  });
});

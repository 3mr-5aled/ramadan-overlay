import React, { useState } from "react";
import type {
  OverlayVariant,
  OverlayPosition,
  RamadanOverlayConfig,
  ThemeDefinition,
} from "ramadan-overlay";
import type { Translations } from "../../translations/types";
import type { DemoLocale } from "../../utils/locale";
import type { ThemeChoice } from "./TabVariantTheme";
import {
  WorkbenchTabs,
  StepperFooter,
  type ConfigTabKey,
  CONFIG_TABS,
} from "./WorkbenchTabs";
import { TabVariantTheme } from "./TabVariantTheme";
import { TabLayout } from "./TabLayout";
import { TabStyling } from "./TabStyling";
import { TabCalendar } from "./TabCalendar";
import { TabCountdownBanner } from "./TabCountdownBanner";
import { TabCodeExport } from "./TabCodeExport";

export interface WorkbenchProps {
  t: Translations;
  locale: DemoLocale;
  config: Partial<RamadanOverlayConfig>;
  themeName: ThemeChoice;
  customTheme: Partial<ThemeDefinition>;
  onSelectVariant: (variant: OverlayVariant) => void;
  onChangePosition: (pos: OverlayPosition) => void;
  onChangeTheme: (theme: ThemeChoice) => void;
  onUpdateConfig: (patch: Partial<RamadanOverlayConfig>) => void;
  onUpdateCustomColor: (
    key: keyof ThemeDefinition | "primaryColor" | "accentColor",
    value: string
  ) => void;
  onResetCustomColors: () => void;
  onToggleAutoTrigger: () => void;
  onToggleCountdown: () => void;
}

export const Workbench: React.FC<WorkbenchProps> = ({
  t,
  locale,
  config,
  themeName,
  customTheme,
  onSelectVariant,
  onChangePosition,
  onChangeTheme,
  onUpdateConfig,
  onUpdateCustomColor,
  onResetCustomColors,
  onToggleAutoTrigger,
  onToggleCountdown,
}) => {
  const [activeTab, setActiveTab] = useState<ConfigTabKey>("variantTheme");

  const activeVariant: OverlayVariant = config.variant || "lanterns";
  const position: OverlayPosition = config.position || "top";

  const handlePrevTab = () => {
    const currentIndex = CONFIG_TABS.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(CONFIG_TABS[currentIndex - 1]);
    }
  };

  const handleNextTab = () => {
    const currentIndex = CONFIG_TABS.indexOf(activeTab);
    if (currentIndex < CONFIG_TABS.length - 1) {
      setActiveTab(CONFIG_TABS[currentIndex + 1]);
    }
  };

  const handleResetDefaults = () => {
    onResetCustomColors();
    onChangeTheme("classic");
    onChangePosition("top");
    onSelectVariant("lanterns");
    onUpdateConfig({
      variant: "lanterns",
      position: "top",
      opacity: 0.85,
      layer: "foreground",
      zIndex: 9999,
      shadows: "soft",
      autoTrigger: false,
      previewMode: true,
      countdown: false,
      confetti: "on",
      attachTo: ".celestial-nav",
      attachEdge: "bottom",
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
      clearance: "edges",
    });
  };

  return (
    <section id="workbench" className="workbench-section">
      <div className="section-header">
        <h2 className="section-title font-display">{t.workbench.title}</h2>
        <p className="section-subtitle">{t.workbench.subtitle}</p>
      </div>

      <div className="workbench-grid">
        {/* Left Column: Tab Progress Configurator Studio */}
        <div className="controls-column ro-controls-column-studio">
          {/* Progress Header & Horizontal Tabs */}
          <WorkbenchTabs
            t={t}
            locale={locale}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            onPrevTab={handlePrevTab}
            onNextTab={handleNextTab}
            onResetDefaults={handleResetDefaults}
          />

          {/* Active Tab Panel with Internal Scroll Container */}
          <div className="ro-tab-viewport">
            {activeTab === "variantTheme" && (
              <TabVariantTheme
                t={t}
                activeVariant={activeVariant}
                onSelectVariant={onSelectVariant}
                themeName={themeName}
                onChangeTheme={onChangeTheme}
                customTheme={customTheme}
                onUpdateCustomColor={onUpdateCustomColor}
                onResetCustomColors={onResetCustomColors}
                config={config}
                onUpdateConfig={onUpdateConfig}
              />
            )}

            {activeTab === "layout" && (
              <TabLayout
                t={t}
                variant={activeVariant}
                position={position}
                onChangePosition={onChangePosition}
                config={config}
                onUpdateConfig={onUpdateConfig}
              />
            )}

            {activeTab === "styling" && (
              <TabStyling
                t={t}
                config={config}
                onUpdateConfig={onUpdateConfig}
              />
            )}

            {activeTab === "calendar" && (
              <TabCalendar
                t={t}
                config={config}
                onUpdateConfig={onUpdateConfig}
              />
            )}

            {activeTab === "countdownBanner" && (
              <TabCountdownBanner
                t={t}
                config={config}
                onUpdateConfig={onUpdateConfig}
              />
            )}

            {activeTab === "codeExport" && (
              <TabCodeExport
                t={t}
                locale={locale}
                config={config}
                themeName={themeName}
                onResetDefaults={handleResetDefaults}
              />
            )}

            {/* Step Navigation Footer */}
            <StepperFooter
              t={t}
              activeTab={activeTab}
              onPrevTab={handlePrevTab}
              onNextTab={handleNextTab}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

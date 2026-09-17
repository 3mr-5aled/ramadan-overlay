import React from "react";
import type { Translations } from "../../translations/types";
import type { DemoLocale } from "../../utils/locale";

export type ConfigTabKey =
  | "variantTheme"
  | "layout"
  | "styling"
  | "calendar"
  | "countdownBanner"
  | "codeExport";

export interface TabDefinition {
  key: ConfigTabKey;
  icon: string;
  label: string;
  step: number;
}

interface WorkbenchTabsProps {
  t: Translations;
  locale: DemoLocale;
  activeTab: ConfigTabKey;
  onSelectTab: (tab: ConfigTabKey) => void;
  onPrevTab: () => void;
  onNextTab: () => void;
  onResetDefaults?: () => void;
}

export const CONFIG_TABS: ConfigTabKey[] = [
  "variantTheme",
  "layout",
  "styling",
  "calendar",
  "countdownBanner",
  "codeExport",
];

export const WorkbenchTabs: React.FC<WorkbenchTabsProps> = ({
  t,
  locale,
  activeTab,
  onSelectTab,
  onPrevTab,
  onNextTab,
  onResetDefaults,
}) => {
  const tabDefs: TabDefinition[] = [
    {
      key: "variantTheme",
      icon: "🎨",
      label: t.workbench.tabs.variantTheme,
      step: 1,
    },
    {
      key: "layout",
      icon: "📐",
      label: t.workbench.tabs.layout,
      step: 2,
    },
    {
      key: "styling",
      icon: "🏮",
      label: t.workbench.tabs.styling,
      step: 3,
    },
    {
      key: "calendar",
      icon: "📅",
      label: t.workbench.tabs.calendar,
      step: 4,
    },
    {
      key: "countdownBanner",
      icon: "⏳",
      label: t.workbench.tabs.countdownBanner,
      step: 5,
    },
    {
      key: "codeExport",
      icon: "💻",
      label: t.workbench.tabs.codeExport,
      step: 6,
    },
  ];

  const activeIndex = CONFIG_TABS.indexOf(activeTab);
  const totalSteps = CONFIG_TABS.length;
  const currentStep = activeIndex >= 0 ? activeIndex + 1 : 1;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === totalSteps - 1;

  return (
    <div className="ro-config-tabs-container">
      {/* ── Top Progress Bar & Step Label ── */}
      <div className="ro-progress-header">
        <div className="ro-progress-meta">
          <span className="ro-progress-label font-mono">
            {t.workbench.stepper.step} {currentStep} {t.workbench.stepper.of}{" "}
            {totalSteps} · {progressPercent}% {t.workbench.stepper.progress}
          </span>
          {onResetDefaults && (
            <button
              type="button"
              className="ro-tab-reset-btn"
              onClick={onResetDefaults}
              title={t.workbench.stepper.reset}
            >
              🔄 {t.workbench.stepper.reset}
            </button>
          )}
        </div>
        <div
          className="ro-progress-track"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="ro-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ── Horizontal Navigation Tabs ── */}
      <nav className="ro-config-tabs-nav" aria-label="Configuration Steps">
        {tabDefs.map((tab) => {
          const isActive = tab.key === activeTab;
          const isPassed = tab.step < currentStep;
          return (
            <button
              key={tab.key}
              type="button"
              className={`ro-config-tab-btn ${isActive ? "active" : ""} ${
                isPassed ? "passed" : ""
              }`}
              onClick={() => onSelectTab(tab.key)}
              aria-selected={isActive}
              role="tab"
            >
              <span className="ro-tab-step-badge">{tab.step}</span>
              <span className="ro-tab-icon">{tab.icon}</span>
              <span className="ro-tab-title">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export interface StepperFooterProps {
  t: Translations;
  activeTab: ConfigTabKey;
  onPrevTab: () => void;
  onNextTab: () => void;
}

export const StepperFooter: React.FC<StepperFooterProps> = ({
  t,
  activeTab,
  onPrevTab,
  onNextTab,
}) => {
  const activeIndex = CONFIG_TABS.indexOf(activeTab);
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === CONFIG_TABS.length - 1;

  return (
    <div className="ro-stepper-footer">
      <button
        type="button"
        className="ro-stepper-btn ro-stepper-back-btn"
        onClick={onPrevTab}
        disabled={isFirst}
        aria-disabled={isFirst}
      >
        {t.workbench.stepper.back}
      </button>

      <button
        type="button"
        className="ro-stepper-btn ro-stepper-next-btn btn-primary"
        onClick={onNextTab}
      >
        {isLast ? t.workbench.stepper.finish : t.workbench.stepper.next}
      </button>
    </div>
  );
};

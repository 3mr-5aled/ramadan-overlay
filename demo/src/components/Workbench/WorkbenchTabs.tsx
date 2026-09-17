import React, { useRef, useEffect, useState, useCallback } from "react";
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

  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isRtl = locale === "ar";

  const updateScrollState = useCallback(() => {
    const el = scrollTrackRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    // Headless / jsdom test environment fallback: keep buttons interactive
    if (scrollWidth === 0 && clientWidth === 0) {
      setCanScrollLeft(true);
      setCanScrollRight(true);
      return;
    }

    if (scrollWidth <= clientWidth + 2) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    if (isRtl) {
      // In RTL across modern Chromium / Gecko / WebKit:
      const maxScroll = scrollWidth - clientWidth;
      const absScroll = Math.abs(scrollLeft);
      const atRight = absScroll <= 2 || scrollLeft >= maxScroll - 2;
      const atLeft = absScroll >= maxScroll - 2 || scrollLeft <= 2;
      setCanScrollLeft(!atLeft);
      setCanScrollRight(!atRight);
    } else {
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
    }
  }, [isRtl]);

  useEffect(() => {
    updateScrollState();
    const handleResize = () => updateScrollState();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateScrollState]);

  // Center active tab into view whenever activeTab changes
  useEffect(() => {
    const el = scrollTrackRef.current?.querySelector<HTMLElement>(
      ".ro-config-tab-btn.active"
    );
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
    const timer = setTimeout(updateScrollState, 350);
    return () => clearTimeout(timer);
  }, [activeTab, updateScrollState]);

  const handleScrollLeft = () => {
    const el = scrollTrackRef.current;
    if (el) {
      if (typeof el.scrollBy === "function") {
        el.scrollBy({ left: -220, behavior: "smooth" });
      } else {
        el.scrollLeft -= 220;
      }
      setTimeout(updateScrollState, 300);
    }
  };

  const handleScrollRight = () => {
    const el = scrollTrackRef.current;
    if (el) {
      if (typeof el.scrollBy === "function") {
        el.scrollBy({ left: 220, behavior: "smooth" });
      } else {
        el.scrollLeft += 220;
      }
      setTimeout(updateScrollState, 300);
    }
  };

  const scrollLeftText = t.workbench.stepper.scrollLeft || "Scroll Left";
  const scrollRightText = t.workbench.stepper.scrollRight || "Scroll Right";

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

      {/* ── Horizontal Navigation Tabs with Static End Arrows ── */}
      <div className="ro-config-tabs-wrapper">
        <button
          type="button"
          className="ro-tab-arrow-btn ro-tab-arrow-left"
          onClick={handleScrollLeft}
          disabled={!canScrollLeft}
          aria-label={scrollLeftText}
          title={scrollLeftText}
          data-testid="tab-arrow-left"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div
          className="ro-tabs-scroll-track"
          ref={scrollTrackRef}
          onScroll={updateScrollState}
          dir={isRtl ? "rtl" : "ltr"}
          data-testid="tabs-scroll-track"
        >
          <nav
            className="ro-config-tabs-nav"
            aria-label="Configuration Steps"
            role="tablist"
          >
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

        <button
          type="button"
          className="ro-tab-arrow-btn ro-tab-arrow-right"
          onClick={handleScrollRight}
          disabled={!canScrollRight}
          aria-label={scrollRightText}
          title={scrollRightText}
          data-testid="tab-arrow-right"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
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

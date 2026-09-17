import React from "react";
import type { Translations } from "../translations/types";
import type { DemoLocale } from "../utils/locale";

export type OccasionPreview = "ramadan" | "eid-fitr" | "eid-adha";

interface NavbarProps {
  t: Translations;
  locale: DemoLocale;
  onToggleLocale: () => void;
  occasion: OccasionPreview;
  onChangeOccasion: (occasion: OccasionPreview) => void;
  overlayOn: boolean;
  onToggleOverlay: () => void;
  onPlayChime: () => void;
  onFireConfetti: () => void;
  onToggleDrawer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  t,
  locale,
  onToggleLocale,
  occasion,
  onChangeOccasion,
  overlayOn,
  onToggleOverlay,
  onPlayChime,
  onFireConfetti,
  onToggleDrawer,
}) => {
  return (
    <header className="celestial-nav">
      <div
        className="nav-brand"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span className="nav-crescent-icon" role="img" aria-label="crescent">
          🌙
        </span>
        <span className="nav-title font-display">{t.nav.brandTitle}</span>
        <span className="nav-version-badge">{t.nav.versionBadge}</span>
        <span className="nav-occasion-badge" title={t.nav.occasionBadge}>
          {t.nav.occasions[occasion]}
        </span>
      </div>

      <div className="nav-controls">
        {/* Occasion Switcher Dropdown */}
        <div className="nav-dropdown-wrap">
          <select
            className="nav-select"
            value={occasion}
            aria-label={t.nav.occasionSelectLabel}
            onChange={(e) =>
              onChangeOccasion(e.target.value as OccasionPreview)
            }
          >
            <option value="ramadan">{t.nav.occasions.ramadan}</option>
            <option value="eid-fitr">{t.nav.occasions["eid-fitr"]}</option>
            <option value="eid-adha">{t.nav.occasions["eid-adha"]}</option>
          </select>
        </div>

        {/* Language Switcher */}
        <button
          className="nav-btn-pill lang-toggle"
          onClick={onToggleLocale}
          title={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
        >
          <span style={{ fontSize: "1rem" }}>🌐</span>
          <span>{t.nav.switchLang}</span>
        </button>

        {/* Master Overlay Toggle */}
        <button
          className={`nav-btn-pill ${overlayOn ? "active" : ""}`}
          onClick={onToggleOverlay}
        >
          <span style={{ fontSize: "0.9rem" }}>{overlayOn ? "✨" : "💤"}</span>
          <span>{overlayOn ? t.nav.overlayOn : t.nav.overlayOff}</span>
        </button>

        {/* Audio Chime Trigger */}
        <button
          className="nav-btn-pill chime-btn"
          onClick={onPlayChime}
          title={t.nav.chimeTest}
        >
          <div className="audio-wave">
            <div className="audio-bar" />
            <div className="audio-bar" />
            <div className="audio-bar" />
          </div>
          <span>{t.nav.chimeTest}</span>
        </button>

        {/* Confetti Launch */}
        <button
          className="nav-btn-pill"
          onClick={onFireConfetti}
          title={t.nav.confettiLaunch}
        >
          <span>🎉</span>
          <span>{t.nav.confettiLaunch}</span>
        </button>

        {/* Mobile Drawer Trigger */}
        {onToggleDrawer && (
          <button
            className="nav-btn-pill mobile-drawer-btn"
            onClick={onToggleDrawer}
            title={t.nav.toggleMobileDrawer}
          >
            <span>🎛️</span>
          </button>
        )}

        {/* GitHub Link */}
        <a
          href="https://github.com/3mr-5aled/ramadan-overlay"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-btn-pill"
          style={{ padding: "7px 12px" }}
          title={t.nav.githubLink}
        >
          <svg
            height="18"
            width="18"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </div>
    </header>
  );
};

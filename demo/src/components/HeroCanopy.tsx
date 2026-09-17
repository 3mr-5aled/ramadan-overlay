import React, { useState } from "react";
import type { Translations } from "../translations/types";
import type { DemoLocale } from "../utils/locale";
import type { OccasionPreview } from "./Navbar";

interface HeroCanopyProps {
  t: Translations;
  locale?: DemoLocale;
  occasion?: OccasionPreview;
  onFireConfetti?: () => void;
  onScrollToWorkbench: () => void;
  onScrollToLab: () => void;
}

const logoUrl = new URL("../../../assets/logo.png", import.meta.url).href;

export const HeroCanopy: React.FC<HeroCanopyProps> = ({
  t,
  locale = "ar",
  occasion = "ramadan",
  onFireConfetti,
  onScrollToWorkbench,
  onScrollToLab,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText("npm i ramadan-overlay");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const occasionBadgeText = t.nav.occasions[occasion] ?? t.hero.badge;

  const occasionEmoji =
    occasion === "eid-adha" ? "🐑" : occasion === "eid-fitr" ? "🎁" : "🌙";

  return (
    <section id="hero" className="canopy-stage">
      <div
        className="canopy-logo-wrap"
        onClick={onFireConfetti}
        title={t.nav.confettiLaunch}
        role={onFireConfetti ? "button" : undefined}
        tabIndex={onFireConfetti ? 0 : undefined}
        onKeyDown={(e) => {
          if (onFireConfetti && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onFireConfetti();
          }
        }}
      >
        <img
          src={logoUrl}
          alt="ramadan-overlay logo"
          className="canopy-hero-logo clickable"
        />
      </div>

      <div className="canopy-badge-wrap font-calligraphy">
        <span role="img" aria-label="occasion icon">
          {occasionEmoji}
        </span>
        <span>{occasionBadgeText}</span>
      </div>

      <h1 className="canopy-title font-display">{t.hero.title}</h1>
      <p className="canopy-subtitle">{t.hero.subtitle}</p>

      {/* Quick Package Install Box */}
      <div className="quick-install-box">
        <span className="quick-install-prompt">$</span>
        <code className="quick-install-code">npm i ramadan-overlay</code>
        <button
          className="quick-install-copy-btn"
          onClick={handleCopyInstall}
          aria-label={copied ? "Copied" : "Copy install command"}
          title={copied ? "Copied!" : "Copy command"}
        >
          {copied ? "✓" : "📋"}
        </button>
        {copied && (
          <span className="quick-install-toast">
            {locale === "ar" ? "تم النسخ!" : "Copied!"}
          </span>
        )}
      </div>

      <div className="canopy-actions">
        <button className="btn-primary" onClick={onScrollToWorkbench}>
          <span>🎨</span>
          <span>{t.hero.ctaWorkbench}</span>
        </button>
        {onFireConfetti && (
          <button
            className="btn-celebrate"
            onClick={onFireConfetti}
            title={t.nav.confettiLaunch}
          >
            <span>{occasionEmoji}</span>
            <span>{t.nav.confettiLaunch}</span>
          </button>
        )}
        <button className="btn-secondary" onClick={onScrollToLab}>
          <span>⚡</span>
          <span>{t.hero.ctaLab}</span>
        </button>
      </div>

      <div className="canopy-stats">
        <div className="stat-item">
          <span className="stat-icon">❖</span>
          <span>{t.hero.statVariants}</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">⚡</span>
          <span>{t.hero.statZeroDeps}</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">⚛</span>
          <span>{t.hero.statFrameworks}</span>
        </div>
      </div>
    </section>
  );
};

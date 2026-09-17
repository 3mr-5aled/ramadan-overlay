import React from "react";
import type { Translations } from "../translations/types";

interface HeroCanopyProps {
  t: Translations;
  onScrollToWorkbench: () => void;
  onScrollToLab: () => void;
}

const logoUrl = new URL("../../../assets/logo.png", import.meta.url).href;

export const HeroCanopy: React.FC<HeroCanopyProps> = ({
  t,
  onScrollToWorkbench,
  onScrollToLab,
}) => {
  return (
    <section className="canopy-stage">
      <div className="canopy-logo-wrap">
        <img
          src={logoUrl}
          alt="ramadan-overlay logo"
          className="canopy-hero-logo"
        />
      </div>

      <div className="canopy-badge-wrap font-calligraphy">
        <span role="img" aria-label="sparkles">
          ✨
        </span>
        <span>{t.hero.badge}</span>
      </div>

      <h1 className="canopy-title font-display">{t.hero.title}</h1>
      <p className="canopy-subtitle">{t.hero.subtitle}</p>

      <div className="canopy-actions">
        <button className="btn-primary" onClick={onScrollToWorkbench}>
          <span>🎨</span>
          <span>{t.hero.ctaWorkbench}</span>
        </button>
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

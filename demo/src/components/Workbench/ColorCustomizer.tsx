import React from "react";
import type { ThemeDefinition } from "ramadan-overlay";
import type { Translations } from "../../translations/types";

export interface ColorCustomizerProps {
  customTheme: Partial<ThemeDefinition>;
  onChangeColor: (
    key: keyof ThemeDefinition | "primaryColor" | "accentColor",
    value: string
  ) => void;
  onReset: () => void;
  translations: Translations["workbench"]["colors"];
}

export const ColorCustomizer: React.FC<ColorCustomizerProps> = ({
  customTheme,
  onChangeColor,
  onReset,
  translations,
}) => {
  const colors = customTheme.colors || [
    "#c9a84c",
    "#e5c158",
    "#9a7b2c",
    "#f3e5ab",
    "#1b3b2b",
    "#0f172a",
  ];
  const primaryColor = colors[0] || "#c9a84c";
  const accentColor = colors[3] || "#f3e5ab";

  return (
    <div className="card-panel color-customizer-panel">
      <div className="panel-header">
        <h3 className="panel-title">{translations.heading}</h3>
        <button type="button" className="btn-outline btn-sm" onClick={onReset}>
          {translations.resetBtn}
        </button>
      </div>

      <div className="color-grid">
        <div className="color-field">
          <label htmlFor="color-primary">{translations.primary}</label>
          <div className="color-input-wrapper">
            <input
              id="color-primary"
              type="color"
              value={primaryColor}
              onChange={(e) => onChangeColor("primaryColor", e.target.value)}
              className="color-picker"
            />
            <span className="color-code">{primaryColor}</span>
          </div>
        </div>

        <div className="color-field">
          <label htmlFor="color-accent">{translations.accent}</label>
          <div className="color-input-wrapper">
            <input
              id="color-accent"
              type="color"
              value={accentColor}
              onChange={(e) => onChangeColor("accentColor", e.target.value)}
              className="color-picker"
            />
            <span className="color-code">{accentColor}</span>
          </div>
        </div>

        <div className="color-field">
          <label htmlFor="color-glow">{translations.glow}</label>
          <div className="color-input-wrapper">
            <input
              id="color-glow"
              type="text"
              value={customTheme.glowColor || "rgba(201,168,76,0.55)"}
              onChange={(e) => onChangeColor("glowColor", e.target.value)}
              className="form-input text-mono"
            />
          </div>
        </div>

        <div className="color-field">
          <label htmlFor="color-ceiling">{translations.ceiling}</label>
          <div className="color-input-wrapper">
            <input
              id="color-ceiling"
              type="color"
              value={customTheme.ceilingColor || "#c9a84c"}
              onChange={(e) => onChangeColor("ceilingColor", e.target.value)}
              className="color-picker"
            />
            <span className="color-code">
              {customTheme.ceilingColor || "#c9a84c"}
            </span>
          </div>
        </div>

        <div className="color-field">
          <label htmlFor="color-rope">{translations.rope}</label>
          <div className="color-input-wrapper">
            <input
              id="color-rope"
              type="color"
              value={customTheme.ropeColor || "#c9a84c"}
              onChange={(e) => onChangeColor("ropeColor", e.target.value)}
              className="color-picker"
            />
            <span className="color-code">
              {customTheme.ropeColor || "#c9a84c"}
            </span>
          </div>
        </div>

        <div className="color-field">
          <label htmlFor="color-banner-bg">{translations.bannerBg}</label>
          <div className="color-input-wrapper">
            <input
              id="color-banner-bg"
              type="text"
              value={customTheme.bannerBg || "rgba(15,15,20,0.92)"}
              onChange={(e) => onChangeColor("bannerBg", e.target.value)}
              className="form-input text-mono"
            />
          </div>
        </div>

        <div className="color-field">
          <label htmlFor="color-banner-text">{translations.bannerText}</label>
          <div className="color-input-wrapper">
            <input
              id="color-banner-text"
              type="color"
              value={customTheme.bannerTextColor || "#f1f5f9"}
              onChange={(e) => onChangeColor("bannerTextColor", e.target.value)}
              className="color-picker"
            />
            <span className="color-code">
              {customTheme.bannerTextColor || "#f1f5f9"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

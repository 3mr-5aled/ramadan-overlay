import React from "react";
import type {
  OverlayVariant,
  ThemePreset,
  ThemeDefinition,
  RamadanOverlayConfig,
} from "ramadan-overlay";
import type { Translations } from "../../translations/types";
import { VariantSelector } from "./VariantSelector";
import { ColorCustomizer } from "./ColorCustomizer";

export type ThemeChoice = ThemePreset | "custom";

export const RATIFIED_THEME_PRESETS: ThemePreset[] = [
  "classic",
  "midnight",
  "emerald",
  "royal",
  "desert-dusk",
  "platinum-minimal",
  "rose-sahara",
];

interface TabVariantThemeProps {
  t: Translations;
  activeVariant: OverlayVariant;
  onSelectVariant: (variant: OverlayVariant) => void;
  themeName: ThemeChoice;
  onChangeTheme: (theme: ThemeChoice) => void;
  customTheme: Partial<ThemeDefinition>;
  onUpdateCustomColor: (
    key: keyof ThemeDefinition | "primaryColor" | "accentColor",
    value: string
  ) => void;
  onResetCustomColors: () => void;
  config: Partial<RamadanOverlayConfig>;
  onUpdateConfig: (patch: Partial<RamadanOverlayConfig>) => void;
}

export const TabVariantTheme: React.FC<TabVariantThemeProps> = ({
  t,
  activeVariant,
  onSelectVariant,
  themeName,
  onChangeTheme,
  customTheme,
  onUpdateCustomColor,
  onResetCustomColors,
  config,
  onUpdateConfig,
}) => {
  const autoTrigger = config.autoTrigger ?? false;
  const previewMode = config.previewMode ?? true;
  const debug = config.debug ?? false;

  return (
    <div className="ro-tab-content-pane">
      {/* ── Visual Variant Selection ── */}
      <VariantSelector
        t={t}
        activeVariant={activeVariant}
        onSelectVariant={onSelectVariant}
      />

      {/* ── Visual Theme Preset ── */}
      <div className="panel-card" style={{ marginTop: "20px" }}>
        <h3 className="panel-heading">
          <span>🎨</span>
          <span>{t.workbench.universal.theme}</span>
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px",
          }}
        >
          <div className="form-group">
            <label className="form-label">{t.workbench.universal.theme}</label>
            <select
              className="form-select"
              data-field="theme"
              value={themeName}
              onChange={(e) => onChangeTheme(e.target.value as ThemeChoice)}
            >
              <optgroup label="Theme Presets">
                {RATIFIED_THEME_PRESETS.map((preset) => (
                  <option key={preset} value={preset}>
                    {t.workbench.universal.themeOptions[preset] || preset}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Theme Overrides">
                <option value="custom">
                  {t.workbench.universal.themeOptions.custom}
                </option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Custom Theme Palette Editor */}
        {themeName === "custom" && (
          <div style={{ marginTop: "16px" }}>
            <ColorCustomizer
              customTheme={customTheme}
              onChangeColor={onUpdateCustomColor}
              onReset={onResetCustomColors}
              translations={t.workbench.colors}
            />
          </div>
        )}

        {/* ── Core Runtime & Detection Flags ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "14px",
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: "1px solid var(--border-dark)",
          }}
        >
          {/* autoTrigger */}
          <div
            className="form-toggle-wrap"
            onClick={() => onUpdateConfig({ autoTrigger: !autoTrigger })}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                {t.workbench.universal.autoTrigger}
              </div>
              <div className="form-help">
                {t.workbench.universal.autoTriggerHelp}
              </div>
            </div>
            <div className="toggle-switch">
              <input
                type="checkbox"
                data-field="autoTrigger"
                checked={autoTrigger}
                onChange={() => onUpdateConfig({ autoTrigger: !autoTrigger })}
                onClick={(e) => e.stopPropagation()}
              />
              <span className="toggle-slider" />
            </div>
          </div>

          {/* previewMode */}
          <div
            className="form-toggle-wrap"
            onClick={() => onUpdateConfig({ previewMode: !previewMode })}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                {t.workbench.universal.previewMode}
              </div>
              <div className="form-help">
                {t.workbench.universal.previewModeHelp}
              </div>
            </div>
            <div className="toggle-switch">
              <input
                type="checkbox"
                data-field="previewMode"
                checked={previewMode}
                onChange={() => onUpdateConfig({ previewMode: !previewMode })}
                onClick={(e) => e.stopPropagation()}
              />
              <span className="toggle-slider" />
            </div>
          </div>

          {/* debug */}
          <div
            className="form-toggle-wrap"
            onClick={() => onUpdateConfig({ debug: !debug })}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                {t.workbench.universal.debug}
              </div>
              <div className="form-help">{t.workbench.universal.debugHelp}</div>
            </div>
            <div className="toggle-switch">
              <input
                type="checkbox"
                data-field="debug"
                checked={debug}
                onChange={() => onUpdateConfig({ debug: !debug })}
                onClick={(e) => e.stopPropagation()}
              />
              <span className="toggle-slider" />
            </div>
          </div>

          {/* overlayLocale */}
          <div
            className="form-group"
            style={{ gridColumn: "1 / -1", marginTop: "4px" }}
          >
            <label className="form-label">
              {t.workbench.universal.overlayLocale}
            </label>
            <select
              className="form-select"
              data-field="locale"
              value={config.locale || "auto"}
              onChange={(e) =>
                onUpdateConfig({
                  locale: e.target.value as "auto" | "en" | "ar",
                })
              }
            >
              <option value="auto">
                {t.workbench.universal.overlayLocaleOptions.auto}
              </option>
              <option value="en">
                {t.workbench.universal.overlayLocaleOptions.en}
              </option>
              <option value="ar">
                {t.workbench.universal.overlayLocaleOptions.ar}
              </option>
            </select>
            <span className="form-help">
              {t.workbench.universal.overlayLocaleHelp}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

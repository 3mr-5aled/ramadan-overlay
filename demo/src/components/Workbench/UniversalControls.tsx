import React from "react";
import type {
  OverlayVariant,
  OverlayPosition,
  ThemePreset,
  LayerStacking,
  ShadowMode,
  MobileSideBehavior,
} from "ramadan-overlay";
import type { Translations } from "../../translations/types";
import { isOptionVisible } from "../../utils/matrix";
import { PositionPicker } from "./PositionPicker";

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

interface UniversalControlsProps {
  t: Translations;
  variant: OverlayVariant;
  position: OverlayPosition;
  onChangePosition: (pos: OverlayPosition) => void;
  themeName: ThemeChoice;
  onChangeTheme: (theme: ThemeChoice) => void;
  opacity: number;
  onChangeOpacity: (opacity: number) => void;
  layer: LayerStacking;
  onChangeLayer: (layer: LayerStacking) => void;
  shadows: ShadowMode;
  onChangeShadows: (shadows: ShadowMode) => void;
  confetti: "on" | "off";
  onChangeConfetti: (confetti: "on" | "off") => void;
  autoTrigger: boolean;
  onToggleAutoTrigger: () => void;
  countdownEnabled: boolean;
  onToggleCountdown: () => void;
  attachTo?: string | HTMLElement;
  onChangeAttachTo?: (val: string | undefined) => void;
  attachEdge?: "bottom" | "top";
  onChangeAttachEdge?: (val: "bottom" | "top") => void;
  mobileSideBehavior?: MobileSideBehavior;
  onChangeMobileSideBehavior?: (val: MobileSideBehavior) => void;
}

export const UniversalControls: React.FC<UniversalControlsProps> = ({
  t,
  variant,
  position,
  onChangePosition,
  themeName,
  onChangeTheme,
  opacity,
  onChangeOpacity,
  layer,
  onChangeLayer,
  shadows,
  onChangeShadows,
  confetti,
  onChangeConfetti,
  autoTrigger,
  onToggleAutoTrigger,
  countdownEnabled,
  onToggleCountdown,
  attachTo,
  onChangeAttachTo,
  attachEdge,
  onChangeAttachEdge,
  mobileSideBehavior,
  onChangeMobileSideBehavior,
}) => {
  const showShadows = isOptionVisible("shadows", variant);
  const showMobileSideBehavior = isOptionVisible(
    "mobileSideBehavior",
    variant,
    {
      position,
    }
  );

  const isHeader = attachTo === ".celestial-nav";
  const isCustom = Boolean(
    attachTo && typeof attachTo === "string" && !isHeader
  );
  const [customSelectorMode, setCustomSelectorMode] = React.useState(isCustom);

  React.useEffect(() => {
    if (isCustom) setCustomSelectorMode(true);
  }, [isCustom]);

  return (
    <div className="panel-card">
      <h3 className="panel-heading">
        <span>⚙️</span>
        <span>{t.workbench.optionsHeading}</span>
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "18px",
        }}
      >
        {/* Curated Theme Preset / Custom Override */}
        <div className="form-group">
          <label className="form-label">{t.workbench.universal.theme}</label>
          <select
            className="form-select"
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

        {/* Dedicated PositionPicker Seam */}
        <PositionPicker
          variant={variant}
          position={position}
          onChangePosition={onChangePosition}
          translations={t.workbench.universal}
        />

        {/* Layer Stacking */}
        <div className="form-group">
          <label className="form-label">{t.workbench.universal.layer}</label>
          <select
            className="form-select"
            value={layer}
            onChange={(e) => onChangeLayer(e.target.value as LayerStacking)}
          >
            <option value="foreground">
              {t.workbench.universal.layerOptions.foreground}
            </option>
            <option value="background">
              {t.workbench.universal.layerOptions.background}
            </option>
          </select>
        </div>

        {/* Celebration Confetti */}
        <div className="form-group">
          <label className="form-label">{t.workbench.universal.confetti}</label>
          <select
            className="form-select"
            value={confetti}
            onChange={(e) => onChangeConfetti(e.target.value as "on" | "off")}
          >
            <option value="on">
              {t.workbench.universal.confettiOptions.on}
            </option>
            <option value="off">
              {t.workbench.universal.confettiOptions.off}
            </option>
          </select>
        </div>

        {/* Attachment Target (Overlay Above All vs Attached to Header vs Custom) */}
        <div className="form-group">
          <label className="form-label">{t.workbench.universal.attachTo}</label>
          <select
            className="form-select"
            value={
              customSelectorMode || isCustom
                ? "custom"
                : isHeader
                  ? "header"
                  : "overlay"
            }
            onChange={(e) => {
              if (e.target.value === "overlay") {
                setCustomSelectorMode(false);
                onChangeAttachTo?.(undefined);
              } else if (e.target.value === "header") {
                setCustomSelectorMode(false);
                onChangeAttachTo?.(".celestial-nav");
              } else {
                setCustomSelectorMode(true);
                onChangeAttachTo?.(
                  typeof attachTo === "string" &&
                    attachTo &&
                    attachTo !== ".celestial-nav"
                    ? attachTo
                    : ".ro-attach-target"
                );
              }
            }}
          >
            <option value="header">
              {t.workbench.universal.attachToOptions.header}
            </option>
            <option value="overlay">
              {t.workbench.universal.attachToOptions.overlay}
            </option>
            <option value="custom">
              {t.workbench.universal.attachToOptions.custom}
            </option>
          </select>
          {(customSelectorMode || isCustom) && (
            <input
              type="text"
              className="form-input"
              style={{ marginTop: "8px" }}
              placeholder={t.workbench.universal.attachToCustomPlaceholder}
              value={typeof attachTo === "string" ? attachTo : ""}
              onChange={(e) => onChangeAttachTo?.(e.target.value)}
            />
          )}
        </div>

        {/* Attachment Edge (Dangle under header vs Hang along top ceiling) */}
        {(Boolean(attachTo) || customSelectorMode) && (
          <div className="form-group">
            <label className="form-label">
              {t.workbench.universal.attachEdge}
            </label>
            <select
              className="form-select"
              value={attachEdge || "bottom"}
              onChange={(e) =>
                onChangeAttachEdge?.(e.target.value as "bottom" | "top")
              }
            >
              <option value="bottom">
                {t.workbench.universal.attachEdgeOptions.bottom}
              </option>
              <option value="top">
                {t.workbench.universal.attachEdgeOptions.top}
              </option>
            </select>
          </div>
        )}

        {/* Mobile Side Behavior */}
        {showMobileSideBehavior && (
          <div className="form-group">
            <label className="form-label">
              {t.workbench.universal.mobileSideBehavior}
            </label>
            <select
              className="form-select"
              value={mobileSideBehavior || "hide"}
              onChange={(e) =>
                onChangeMobileSideBehavior?.(
                  e.target.value as MobileSideBehavior
                )
              }
            >
              <option value="hide">
                {t.workbench.universal.mobileSideBehaviorOptions.hide}
              </option>
              <option value="top">
                {t.workbench.universal.mobileSideBehaviorOptions.top}
              </option>
              <option value="show">
                {t.workbench.universal.mobileSideBehaviorOptions.show}
              </option>
            </select>
          </div>
        )}

        {/* Elevation Shadows (if applicable) */}
        {showShadows && (
          <div className="form-group">
            <label className="form-label">
              {t.workbench.universal.shadows}
            </label>
            <select
              className="form-select"
              value={shadows}
              onChange={(e) => onChangeShadows(e.target.value as ShadowMode)}
            >
              <option value="soft">
                {t.workbench.universal.shadowOptions.soft}
              </option>
              <option value="deep">
                {t.workbench.universal.shadowOptions.deep}
              </option>
              <option value="none">
                {t.workbench.universal.shadowOptions.none}
              </option>
            </select>
          </div>
        )}

        {/* Opacity Slider */}
        <div className="form-group">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <label className="form-label" style={{ margin: 0 }}>
              {t.workbench.universal.opacity}
            </label>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.82rem",
                color: "var(--gold-400)",
              }}
            >
              {Math.round(opacity * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            className="form-range"
            value={opacity}
            onChange={(e) => onChangeOpacity(parseFloat(e.target.value))}
          />
        </div>
      </div>

      {/* Toggles */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "14px",
          marginTop: "16px",
        }}
      >
        <div className="form-toggle-wrap" onClick={onToggleAutoTrigger}>
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
              checked={autoTrigger}
              onChange={onToggleAutoTrigger}
              onClick={(e) => e.stopPropagation()}
            />
            <span className="toggle-slider" />
          </div>
        </div>

        <div className="form-toggle-wrap" onClick={onToggleCountdown}>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
              {t.workbench.universal.countdown}
            </div>
            <div className="form-help">
              {t.workbench.universal.countdownHelp}
            </div>
          </div>
          <div className="toggle-switch">
            <input
              type="checkbox"
              checked={countdownEnabled}
              onChange={onToggleCountdown}
              onClick={(e) => e.stopPropagation()}
            />
            <span className="toggle-slider" />
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import type {
  ShadowMode,
  LanternStyle,
  RopeStyle,
  RamadanOverlayConfig,
} from "ramadan-overlay";
import type { Translations } from "../../translations/types";

interface TabStylingProps {
  t: Translations;
  config: Partial<RamadanOverlayConfig>;
  onUpdateConfig: (patch: Partial<RamadanOverlayConfig>) => void;
}

export const TabStyling: React.FC<TabStylingProps> = ({
  t,
  config,
  onUpdateConfig,
}) => {
  const opacity = config.opacity ?? 0.85;
  const shadows: ShadowMode = config.shadows || "soft";
  const confetti = config.confetti === "off" ? "off" : "on";

  const isLanternActive = config.variant === "lanterns";
  const lanternStyle: LanternStyle = config.lanternStyle ?? 0;
  const lanternCount = config.lanternCount;
  const lanternZIndex = config.lanternZIndex ?? 2;
  const ropeStyle: RopeStyle = config.ropeStyle || "straight";
  const ropeSag = config.ropeSag ?? 20;
  const ceilingColor = config.ceilingColor || "#c9a84c";
  const ropeColor = config.ropeColor || "#c9a84c";

  const density = config.density || "normal";
  const intensity =
    typeof config.intensity === "number"
      ? config.intensity
      : config.intensity === "high"
        ? 8
        : config.intensity === "low"
          ? 3
          : 5;
  const glowColor = config.glowColor || "rgba(201,168,76,0.55)";

  return (
    <div className="ro-tab-content-pane">
      {/* ── Universal Styling Section ── */}
      <div className="panel-card">
        <h3 className="panel-heading">
          <span>✨</span>
          <span>{t.workbench.tabs.styling}</span>
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px",
          }}
        >
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
              data-field="opacity"
              value={opacity}
              onChange={(e) =>
                onUpdateConfig({ opacity: parseFloat(e.target.value) })
              }
            />
          </div>

          {/* Elevation Shadows */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.universal.shadows}
            </label>
            <select
              className="form-select"
              data-field="shadows"
              value={shadows}
              onChange={(e) =>
                onUpdateConfig({ shadows: e.target.value as ShadowMode })
              }
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

          {/* Celebration Confetti */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.universal.confetti}
            </label>
            <select
              className="form-select"
              data-field="confetti"
              value={confetti}
              onChange={(e) =>
                onUpdateConfig({ confetti: e.target.value as "on" | "off" })
              }
            >
              <option value="on">
                {t.workbench.universal.confettiOptions.on}
              </option>
              <option value="off">
                {t.workbench.universal.confettiOptions.off}
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Lantern Specific Styling (Highlighted when variant === 'lanterns') ── */}
      <div
        className="panel-card"
        style={{
          marginTop: "16px",
          border: isLanternActive
            ? "1px solid var(--border-gold-glow)"
            : undefined,
        }}
      >
        <h3 className="panel-heading">
          <span>🏮</span>
          <span>{t.workbench.variantSpecific.lanternHeading}</span>
          {isLanternActive && (
            <span
              className="badge"
              style={{
                fontSize: "0.75rem",
                padding: "2px 8px",
                background: "rgba(201, 168, 76, 0.15)",
                color: "var(--gold-300)",
                borderRadius: "12px",
                marginInlineStart: "8px",
              }}
            >
              {t.workbench.variantSpecific.activeVariantBadge}
            </span>
          )}
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {/* Lantern Design */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.variantSpecific.lanternStyle}
            </label>
            <select
              className="form-select"
              data-field="lanternStyle"
              value={lanternStyle}
              onChange={(e) =>
                onUpdateConfig({
                  lanternStyle: parseInt(e.target.value, 10) as LanternStyle,
                })
              }
            >
              <option value={0}>
                {t.workbench.variantSpecific.lanternCycle}
              </option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Design #{i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Lantern Count */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.variantSpecific.lanternCount}
            </label>
            <select
              className="form-select"
              data-field="lanternCount"
              value={lanternCount ?? 0}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                onUpdateConfig({ lanternCount: val === 0 ? undefined : val });
              }}
            >
              <option value={0}>
                {t.workbench.variantSpecific.lanternCountAuto}
              </option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Lantern Z-Index */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.variantSpecific.lanternZIndex}
            </label>
            <select
              className="form-select"
              data-field="lanternZIndex"
              value={lanternZIndex}
              onChange={(e) =>
                onUpdateConfig({ lanternZIndex: parseInt(e.target.value, 10) })
              }
            >
              <option value={1}>
                {t.workbench.variantSpecific.lanternZIndexOptions?.["1"] ||
                  "1 (Low)"}
              </option>
              <option value={2}>
                {t.workbench.variantSpecific.lanternZIndexOptions?.["2"] ||
                  "2 (Default)"}
              </option>
              <option value={10}>
                {t.workbench.variantSpecific.lanternZIndexOptions?.["10"] ||
                  "10 (Elevated)"}
              </option>
              <option value={100}>
                {t.workbench.variantSpecific.lanternZIndexOptions?.["100"] ||
                  "100 (High)"}
              </option>
              <option value={9999}>
                {t.workbench.variantSpecific.lanternZIndexOptions?.["9999"] ||
                  "9999 (Topmost)"}
              </option>
            </select>
          </div>

          {/* Rope Style */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.variantSpecific.ropeStyle}
            </label>
            <select
              className="form-select"
              data-field="ropeStyle"
              value={ropeStyle}
              onChange={(e) =>
                onUpdateConfig({ ropeStyle: e.target.value as RopeStyle })
              }
            >
              <option value="straight">
                {t.workbench.variantSpecific.ropeStraight}
              </option>
              <option value="u-shaped">
                {t.workbench.variantSpecific.ropeUshaped}
              </option>
              <option value="dual">
                {t.workbench.variantSpecific.ropeDual}
              </option>
            </select>
          </div>

          {/* Rope Sag Slider (if curved) */}
          {ropeStyle !== "straight" && (
            <div className="form-group">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "4px",
                }}
              >
                <label className="form-label" style={{ margin: 0 }}>
                  {t.workbench.variantSpecific.ropeSag}
                </label>
                <span
                  className="font-mono"
                  style={{ color: "var(--gold-400)" }}
                >
                  {ropeSag}px
                </span>
              </div>
              <input
                type="range"
                min="6"
                max="60"
                step="2"
                className="form-range"
                data-field="ropeSag"
                value={ropeSag}
                onChange={(e) =>
                  onUpdateConfig({ ropeSag: parseInt(e.target.value, 10) })
                }
              />
            </div>
          )}

          {/* Ceiling Color */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.variantSpecific.ceilingColor}
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="color"
                className="color-picker"
                data-field="ceilingColor"
                value={ceilingColor.startsWith("#") ? ceilingColor : "#c9a84c"}
                onChange={(e) =>
                  onUpdateConfig({ ceilingColor: e.target.value })
                }
              />
              <span className="color-code font-mono">{ceilingColor}</span>
            </div>
          </div>

          {/* Rope Color */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.variantSpecific.ropeColor}
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="color"
                className="color-picker"
                data-field="ropeColor"
                value={ropeColor.startsWith("#") ? ropeColor : "#c9a84c"}
                onChange={(e) => onUpdateConfig({ ropeColor: e.target.value })}
              />
              <span className="color-code font-mono">{ropeColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating Motifs & Particles Section ── */}
      <div className="panel-card" style={{ marginTop: "16px" }}>
        <h3 className="panel-heading">
          <span>✨</span>
          <span>{t.workbench.variantSpecific.motifsHeading}</span>
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {/* Density */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.variantSpecific.density}
            </label>
            <select
              className="form-select"
              data-field="density"
              value={density}
              onChange={(e) =>
                onUpdateConfig({
                  density: e.target.value as "low" | "normal" | "high",
                })
              }
            >
              <option value="low">
                {t.workbench.variantSpecific.densityOptions?.low ||
                  "Low (Subtle)"}
              </option>
              <option value="normal">
                {t.workbench.variantSpecific.densityOptions?.normal ||
                  "Normal (Balanced)"}
              </option>
              <option value="high">
                {t.workbench.variantSpecific.densityOptions?.high ||
                  "High (Festive)"}
              </option>
            </select>
          </div>

          {/* Intensity Scale Slider (1-10) */}
          <div className="form-group">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <label className="form-label" style={{ margin: 0 }}>
                {t.workbench.variantSpecific.intensity}
              </label>
              <span className="font-mono" style={{ color: "var(--gold-400)" }}>
                {t.workbench.variantSpecific.intensityLevel} {intensity} / 10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              className="form-range"
              data-field="intensity"
              value={intensity}
              onChange={(e) =>
                onUpdateConfig({ intensity: parseInt(e.target.value, 10) })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

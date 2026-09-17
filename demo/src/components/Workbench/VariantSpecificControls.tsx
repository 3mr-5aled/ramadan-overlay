import React from "react";
import type {
  RamadanOverlayConfig,
  LanternStyle,
  RopeStyle,
  ClearanceMode,
  IntensityMode,
} from "ramadan-overlay";
import type { Translations } from "../../translations/types";
import { isOptionVisible } from "../../utils/matrix";

export interface VariantSpecificControlsProps {
  t: Translations;
  config: Partial<RamadanOverlayConfig>;
  onUpdateConfig: (patch: Partial<RamadanOverlayConfig>) => void;
}

export const VariantSpecificControls: React.FC<
  VariantSpecificControlsProps
> = ({ t, config, onUpdateConfig }) => {
  const variant = config.variant || "lanterns";

  const showLantern = variant === "lanterns";
  const showBanner = variant === "banner";
  const showMotifs = ["crescent-stars", "eid", "eid-fitr", "eid-adha"].includes(
    variant
  );
  const showSparkles = variant === "sparkles";
  const showGeometric = variant === "geometric";

  if (
    !showLantern &&
    !showBanner &&
    !showMotifs &&
    !showSparkles &&
    !showGeometric
  ) {
    return null;
  }

  return (
    <div className="panel-card">
      {/* ── Lantern Controls ── */}
      {showLantern && (
        <>
          <h3 className="panel-heading">
            <span>🏮</span>
            <span>{t.workbench.variantSpecific.lanternHeading}</span>
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "18px",
            }}
          >
            <div className="form-group">
              <label className="form-label">
                {t.workbench.variantSpecific.lanternStyle}
              </label>
              <select
                className="form-select"
                value={config.lanternStyle ?? 0}
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

            <div className="form-group">
              <label className="form-label">
                {t.workbench.variantSpecific.lanternCount}
              </label>
              <select
                className="form-select"
                value={config.lanternCount ?? 0}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  onUpdateConfig({
                    lanternCount: val === 0 ? undefined : val,
                  });
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

            <div className="form-group">
              <label className="form-label">
                {t.workbench.variantSpecific.lanternZIndex}
              </label>
              <select
                className="form-select"
                value={config.lanternZIndex ?? 2}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  onUpdateConfig({
                    lanternZIndex: val,
                  });
                }}
              >
                <option value={1}>1 (Low)</option>
                <option value={2}>2 (Default)</option>
                <option value={10}>10 (Elevated)</option>
                <option value={100}>100 (High)</option>
                <option value={9999}>9999 (Topmost)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                {t.workbench.variantSpecific.ropeStyle}
              </label>
              <select
                className="form-select"
                value={config.ropeStyle ?? "straight"}
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

            {/* Conditionally rendered ropeSag */}
            {isOptionVisible("ropeSag", "lanterns", {
              ropeStyle: config.ropeStyle,
            }) && (
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
                    {t.workbench.variantSpecific.ropeSag}
                  </label>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.82rem",
                      color: "var(--gold-400)",
                    }}
                  >
                    {config.ropeSag ?? 20}px
                  </span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="60"
                  step="2"
                  className="form-range"
                  value={config.ropeSag ?? 20}
                  onChange={(e) =>
                    onUpdateConfig({ ropeSag: parseInt(e.target.value, 10) })
                  }
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">
                {t.workbench.variantSpecific.ceilingColor}
              </label>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <input
                  type="color"
                  value={config.ceilingColor || "#c9a84c"}
                  onChange={(e) =>
                    onUpdateConfig({ ceilingColor: e.target.value })
                  }
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
                <input
                  type="text"
                  className="form-input"
                  value={config.ceilingColor || "#c9a84c"}
                  onChange={(e) =>
                    onUpdateConfig({ ceilingColor: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                {t.workbench.variantSpecific.ropeColor}
              </label>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <input
                  type="color"
                  value={config.ropeColor || "#c9a84c"}
                  onChange={(e) =>
                    onUpdateConfig({ ropeColor: e.target.value })
                  }
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
                <input
                  type="text"
                  className="form-input"
                  value={config.ropeColor || "#c9a84c"}
                  onChange={(e) =>
                    onUpdateConfig({ ropeColor: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Banner Controls ── */}
      {showBanner && (
        <>
          <h3 className="panel-heading">
            <span>🏷️</span>
            <span>{t.workbench.variantSpecific.bannerHeading}</span>
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "18px",
            }}
          >
            <div className="form-group">
              <label className="form-label">
                {t.workbench.variantSpecific.bannerTextAr}
              </label>
              <input
                type="text"
                className="form-input"
                value={config.bannerTextAr || "رَمَضَان كَرِيم"}
                onChange={(e) =>
                  onUpdateConfig({ bannerTextAr: e.target.value })
                }
                placeholder="رَمَضَان كَرِيم"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                {t.workbench.variantSpecific.bannerTextEn}
              </label>
              <input
                type="text"
                className="form-input"
                value={config.bannerTextEn || "Ramadan Mubarak"}
                onChange={(e) =>
                  onUpdateConfig({ bannerTextEn: e.target.value })
                }
                placeholder="Ramadan Mubarak"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                {t.workbench.variantSpecific.bannerBg}
              </label>
              <input
                type="text"
                className="form-input"
                value={config.bannerBg || "rgba(15,15,20,0.92)"}
                onChange={(e) => onUpdateConfig({ bannerBg: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                {t.workbench.variantSpecific.bannerTextColor}
              </label>
              <input
                type="text"
                className="form-input"
                value={config.bannerTextColor || "#f1f5f9"}
                onChange={(e) =>
                  onUpdateConfig({ bannerTextColor: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                {t.workbench.variantSpecific.bannerIconColor}
              </label>
              <input
                type="text"
                className="form-input"
                value={config.bannerIconColor || "#c9a84c"}
                onChange={(e) =>
                  onUpdateConfig({ bannerIconColor: e.target.value })
                }
              />
            </div>
          </div>
        </>
      )}

      {/* ── Motifs Controls (crescent-stars, eid) ── */}
      {showMotifs && (
        <>
          <h3 className="panel-heading">
            <span>🌙</span>
            <span>{t.workbench.variantSpecific.motifsHeading}</span>
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "18px",
            }}
          >
            <div className="form-group">
              <label className="form-label">
                {t.workbench.variantSpecific.clearance}
              </label>
              <select
                className="form-select"
                value={config.clearance ?? "edges"}
                onChange={(e) =>
                  onUpdateConfig({
                    clearance: e.target.value as ClearanceMode,
                  })
                }
              >
                <option value="edges">
                  {t.workbench.variantSpecific.clearanceEdges}
                </option>
                <option value="full">
                  {t.workbench.variantSpecific.clearanceFull}
                </option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                {t.workbench.variantSpecific.intensity}
              </label>
              <select
                className="form-select"
                value={config.intensity ?? "normal"}
                onChange={(e) =>
                  onUpdateConfig({
                    intensity: e.target.value as IntensityMode,
                  })
                }
              >
                <option value="low">
                  {t.workbench.variantSpecific.intensityLow}
                </option>
                <option value="normal">
                  {t.workbench.variantSpecific.intensityNormal}
                </option>
                <option value="high">
                  {t.workbench.variantSpecific.intensityHigh}
                </option>
              </select>
            </div>
          </div>
        </>
      )}

      {/* ── Sparkles & Geometric Controls ── */}
      {(showSparkles || showGeometric) && (
        <>
          <h3 className="panel-heading">
            <span>✨</span>
            <span>{t.workbench.variantSpecific.sparklesHeading}</span>
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "18px",
            }}
          >
            <div className="form-group">
              <label className="form-label">
                {t.workbench.variantSpecific.density}
              </label>
              <select
                className="form-select"
                value={config.density ?? "normal"}
                onChange={(e) =>
                  onUpdateConfig({
                    density: e.target.value as "low" | "normal" | "high",
                  })
                }
              >
                <option value="low">
                  {t.workbench.variantSpecific.intensityLow}
                </option>
                <option value="normal">
                  {t.workbench.variantSpecific.intensityNormal}
                </option>
                <option value="high">
                  {t.workbench.variantSpecific.intensityHigh}
                </option>
              </select>
            </div>

            {showSparkles && (
              <div className="form-group">
                <label className="form-label">
                  {t.workbench.variantSpecific.glowColor}
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={config.glowColor || "rgba(201,168,76,0.55)"}
                  onChange={(e) =>
                    onUpdateConfig({ glowColor: e.target.value })
                  }
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

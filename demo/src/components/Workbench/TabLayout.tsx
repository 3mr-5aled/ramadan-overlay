import React from "react";
import type {
  OverlayVariant,
  OverlayPosition,
  LayerStacking,
  MobileSideBehavior,
  ClearanceMode,
  RamadanOverlayConfig,
} from "ramadan-overlay";
import type { Translations } from "../../translations/types";
import { PositionPicker } from "./PositionPicker";

interface TabLayoutProps {
  t: Translations;
  variant: OverlayVariant;
  position: OverlayPosition;
  onChangePosition: (pos: OverlayPosition) => void;
  config: Partial<RamadanOverlayConfig>;
  onUpdateConfig: (patch: Partial<RamadanOverlayConfig>) => void;
}

export const TabLayout: React.FC<TabLayoutProps> = ({
  t,
  variant,
  position,
  onChangePosition,
  config,
  onUpdateConfig,
}) => {
  const layer: LayerStacking = config.layer || "foreground";
  const zIndex = config.zIndex ?? 9999;
  const attachTo = config.attachTo;
  const attachEdge = config.attachEdge || "bottom";
  const mobileSideBehavior = config.mobileSideBehavior || "hide";
  const clearance: ClearanceMode = config.clearance || "edges";

  const isHeader = attachTo === ".celestial-nav";
  const isCustom = Boolean(
    attachTo && typeof attachTo === "string" && !isHeader
  );
  const [customSelectorMode, setCustomSelectorMode] = React.useState(isCustom);

  React.useEffect(() => {
    if (isCustom) setCustomSelectorMode(true);
  }, [isCustom]);

  return (
    <div className="ro-tab-content-pane">
      <div className="panel-card">
        <h3 className="panel-heading">
          <span>📐</span>
          <span>{t.workbench.tabs.layout}</span>
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
          }}
        >
          {/* PositionPicker Seam */}
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
              data-field="layer"
              value={layer}
              onChange={(e) =>
                onUpdateConfig({ layer: e.target.value as LayerStacking })
              }
            >
              <option value="foreground">
                {t.workbench.universal.layerOptions.foreground}
              </option>
              <option value="background">
                {t.workbench.universal.layerOptions.background}
              </option>
            </select>
          </div>

          {/* Root zIndex */}
          <div className="form-group">
            <label className="form-label">{t.workbench.universal.zIndex}</label>
            <input
              type="number"
              className="form-input"
              data-field="zIndex"
              value={zIndex}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                onUpdateConfig({ zIndex: isNaN(val) ? 9999 : val });
              }}
            />
            <span className="form-help">
              {t.workbench.universal.zIndexHelp}
            </span>
          </div>

          {/* Attachment Mode / Target */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.universal.attachTo}
            </label>
            <select
              className="form-select"
              data-field="attachTo"
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
                  onUpdateConfig({ attachTo: undefined });
                } else if (e.target.value === "header") {
                  setCustomSelectorMode(false);
                  onUpdateConfig({ attachTo: ".celestial-nav" });
                } else {
                  setCustomSelectorMode(true);
                  onUpdateConfig({
                    attachTo:
                      typeof attachTo === "string" &&
                      attachTo &&
                      attachTo !== ".celestial-nav"
                        ? attachTo
                        : ".ro-attach-target",
                  });
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
                data-field="attachToCustom"
                style={{ marginTop: "8px" }}
                placeholder={t.workbench.universal.attachToCustomPlaceholder}
                value={typeof attachTo === "string" ? attachTo : ""}
                onChange={(e) => onUpdateConfig({ attachTo: e.target.value })}
              />
            )}
          </div>

          {/* Attachment Edge */}
          {(Boolean(attachTo) || customSelectorMode) && (
            <div className="form-group">
              <label className="form-label">
                {t.workbench.universal.attachEdge}
              </label>
              <select
                className="form-select"
                data-field="attachEdge"
                value={attachEdge}
                onChange={(e) =>
                  onUpdateConfig({
                    attachEdge: e.target.value as "bottom" | "top",
                  })
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
          <div className="form-group">
            <label className="form-label">
              {t.workbench.universal.mobileSideBehavior}
            </label>
            <select
              className="form-select"
              data-field="mobileSideBehavior"
              value={mobileSideBehavior}
              onChange={(e) =>
                onUpdateConfig({
                  mobileSideBehavior: e.target.value as MobileSideBehavior,
                })
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

          {/* Content Safe Zone Clearance */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.variantSpecific.clearance}
            </label>
            <select
              className="form-select"
              data-field="clearance"
              value={clearance}
              onChange={(e) =>
                onUpdateConfig({ clearance: e.target.value as ClearanceMode })
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
        </div>
      </div>
    </div>
  );
};

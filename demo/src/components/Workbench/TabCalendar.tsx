import React from "react";
import type {
  HijriRegion,
  Occasion,
  OverlayVariant,
  RamadanOverlayConfig,
} from "ramadan-overlay";
import type { Translations } from "../../translations/types";

interface TabCalendarProps {
  t: Translations;
  config: Partial<RamadanOverlayConfig>;
  onUpdateConfig: (patch: Partial<RamadanOverlayConfig>) => void;
}

const REGION_KEYS: HijriRegion[] = [
  "standard",
  "saudi",
  "uae",
  "malaysia",
  "egypt",
  "turkey",
  "pakistan",
  "indonesia",
  "morocco",
  "us",
  "uk",
];

const OCCASION_KEYS: Array<{ id: Occasion; labelKey: string }> = [
  { id: "ramadan", labelKey: "Ramadan (Month 9)" },
  { id: "eid-fitr", labelKey: "Eid Al-Fitr (Shawwal 1–3)" },
  { id: "eid-adha", labelKey: "Eid Al-Adha (Dhu al-Hijjah 10–13)" },
];

export const TabCalendar: React.FC<TabCalendarProps> = ({
  t,
  config,
  onUpdateConfig,
}) => {
  const region: HijriRegion = config.region || "standard";
  const hijriAdjustment = config.hijriAdjustment ?? 0;
  const occasions: Occasion[] = config.occasions || [
    "ramadan",
    "eid-fitr",
    "eid-adha",
  ];
  const eidVariant: OverlayVariant = config.eidVariant || "eid";
  const liveTransition = config.liveTransition ?? true;

  const dateValue = config.date
    ? typeof config.date === "string"
      ? config.date.slice(0, 10)
      : config.date instanceof Date
        ? config.date.toISOString().slice(0, 10)
        : ""
    : "";

  const handleToggleOccasion = (occ: Occasion) => {
    let next: Occasion[];
    if (occasions.includes(occ)) {
      next = occasions.filter((o) => o !== occ);
    } else {
      next = [...occasions, occ];
    }
    onUpdateConfig({ occasions: next });
  };

  return (
    <div className="ro-tab-content-pane">
      <div className="panel-card">
        <h3 className="panel-heading">
          <span>📅</span>
          <span>{t.workbench.calendar.heading}</span>
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
          }}
        >
          {/* Region Preset */}
          <div className="form-group">
            <label className="form-label">{t.workbench.calendar.region}</label>
            <select
              className="form-select"
              data-field="region"
              value={region}
              onChange={(e) =>
                onUpdateConfig({ region: e.target.value as HijriRegion })
              }
            >
              {REGION_KEYS.map((rk) => (
                <option key={rk} value={rk}>
                  {t.workbench.calendar.regions[rk] || rk}
                </option>
              ))}
            </select>
            <span className="form-help">{t.workbench.calendar.regionHelp}</span>
          </div>

          {/* Hijri Adjustment Stepper */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.calendar.hijriAdjustment}
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <select
                className="form-select"
                data-field="hijriAdjustment"
                value={hijriAdjustment}
                onChange={(e) =>
                  onUpdateConfig({
                    hijriAdjustment: parseInt(e.target.value, 10),
                  })
                }
              >
                <option value={-3}>-3 {t.workbench.calendar.days}</option>
                <option value={-2}>-2 {t.workbench.calendar.days}</option>
                <option value={-1}>-1 {t.workbench.calendar.days}</option>
                <option value={0}>
                  0 ({t.workbench.calendar.astronomicStandard})
                </option>
                <option value={1}>+1 {t.workbench.calendar.days}</option>
                <option value={2}>+2 {t.workbench.calendar.days}</option>
                <option value={3}>+3 {t.workbench.calendar.days}</option>
              </select>
            </div>
            <span className="form-help">
              {t.workbench.calendar.hijriAdjustmentHelp}
            </span>
          </div>

          {/* Gregorian Simulation Date */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.calendar.testDate}
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="date"
                className="form-input font-mono"
                data-field="testDate"
                value={dateValue}
                onChange={(e) => {
                  const val = e.target.value;
                  onUpdateConfig({ date: val ? new Date(val) : undefined });
                }}
              />
              {dateValue && (
                <button
                  type="button"
                  className="btn-outline btn-sm"
                  onClick={() => onUpdateConfig({ date: undefined })}
                  title={t.workbench.calendar.clearBtn}
                >
                  {t.workbench.calendar.clearBtn}
                </button>
              )}
            </div>
            <span className="form-help">
              {t.workbench.calendar.testDateHelp}
            </span>
          </div>

          {/* Eid Decoration Variant */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.calendar.eidVariant}
            </label>
            <select
              className="form-select"
              data-field="eidVariant"
              value={eidVariant}
              onChange={(e) =>
                onUpdateConfig({ eidVariant: e.target.value as OverlayVariant })
              }
            >
              <option value="eid">
                {t.workbench.variants?.["eid"]?.name ||
                  "Eid Celebrations Suite"}
              </option>
              <option value="eid-fitr">
                {t.workbench.variants?.["eid-fitr"]?.name || "Eid Al-Fitr"}
              </option>
              <option value="eid-adha">
                {t.workbench.variants?.["eid-adha"]?.name || "Eid Al-Adha"}
              </option>
              <option value="lanterns">
                {t.workbench.variants?.["lanterns"]?.name ||
                  "Traditional Lanterns"}
              </option>
              <option value="crescent-stars">
                {t.workbench.variants?.["crescent-stars"]?.name ||
                  "Ascending Crescent & Stars"}
              </option>
              <option value="geometric">
                {t.workbench.variants?.["geometric"]?.name ||
                  "Islamic Geometric Patterns"}
              </option>
              <option value="sparkles">
                {t.workbench.variants?.["sparkles"]?.name ||
                  "Luminous Star Sparkles"}
              </option>
              <option value="banner">
                {t.workbench.variants?.["banner"]?.name || "Greeting Banner"}
              </option>
            </select>
            <span className="form-help">
              {t.workbench.calendar.eidVariantHelp}
            </span>
          </div>
        </div>

        {/* ── Active Trigger Occasions Multiselect ── */}
        <div
          style={{
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: "1px solid var(--border-dark)",
          }}
        >
          <label className="form-label">{t.workbench.calendar.occasions}</label>
          <div className="form-help" style={{ marginBottom: "12px" }}>
            {t.workbench.calendar.occasionsHelp}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {OCCASION_KEYS.map((item) => {
              const isChecked = occasions.includes(item.id);
              return (
                <label
                  key={item.id}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 14px",
                    borderRadius: "var(--radius-md)",
                    background: isChecked
                      ? "rgba(201, 168, 76, 0.14)"
                      : "rgba(255, 255, 255, 0.03)",
                    border: isChecked
                      ? "1px solid var(--border-gold-glow)"
                      : "1px solid var(--border-mid)",
                    cursor: "pointer",
                    fontSize: "0.88rem",
                    color: isChecked
                      ? "var(--gold-200)"
                      : "var(--text-secondary)",
                    userSelect: "none",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleOccasion(item.id)}
                  />
                  <span>
                    {t.workbench.calendar.occasionOptions?.[item.id] ||
                      item.labelKey}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* ── Live Midnight Transition Toggle ── */}
        <div style={{ marginTop: "16px" }}>
          <div
            className="form-toggle-wrap"
            onClick={() => onUpdateConfig({ liveTransition: !liveTransition })}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                {t.workbench.calendar.liveTransition}
              </div>
              <div className="form-help">
                {t.workbench.calendar.liveTransitionHelp}
              </div>
            </div>
            <div className="toggle-switch">
              <input
                type="checkbox"
                data-field="liveTransition"
                checked={liveTransition}
                onChange={() =>
                  onUpdateConfig({ liveTransition: !liveTransition })
                }
                onClick={(e) => e.stopPropagation()}
              />
              <span className="toggle-slider" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

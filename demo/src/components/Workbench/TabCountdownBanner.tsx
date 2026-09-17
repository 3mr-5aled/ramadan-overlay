import React from "react";
import type {
  RamadanOverlayConfig,
  IftarCountdownConfig,
  CountdownAnchorPosition,
} from "ramadan-overlay";
import type { Translations } from "../../translations/types";

interface TabCountdownBannerProps {
  t: Translations;
  config: Partial<RamadanOverlayConfig>;
  onUpdateConfig: (patch: Partial<RamadanOverlayConfig>) => void;
}

export const TabCountdownBanner: React.FC<TabCountdownBannerProps> = ({
  t,
  config,
  onUpdateConfig,
}) => {
  // Banner parameters
  const bannerTextAr =
    typeof config.bannerTextAr === "string"
      ? config.bannerTextAr
      : "رَمَضَان كَرِيم";
  const bannerTextEn =
    typeof config.bannerTextEn === "string"
      ? config.bannerTextEn
      : "Ramadan Mubarak";
  const bannerBg = config.bannerBg || "rgba(15,15,20,0.92)";
  const bannerTextColor = config.bannerTextColor || "#f1f5f9";
  const bannerIconColor = config.bannerIconColor || "#c9a84c";

  // Countdown parameters
  const countdownEnabled = Boolean(config.countdown);
  const countdownObj: IftarCountdownConfig =
    typeof config.countdown === "object" && config.countdown !== null
      ? config.countdown
      : {};

  const iftarTime =
    typeof countdownObj.iftarTime === "string"
      ? countdownObj.iftarTime
      : "18:45";
  const position: CountdownAnchorPosition =
    countdownObj.position || "bottom-right";
  const alertWindowMinutes = countdownObj.alertWindowMinutes ?? 30;
  const minimizable = countdownObj.minimizable ?? true;
  const initiallyMinimized = countdownObj.initiallyMinimized ?? false;
  const autoDismissAfterMinutes = countdownObj.autoDismissAfterMinutes ?? 10;
  const celebrationDurationMs = countdownObj.celebrationDurationMs ?? 30000;
  const sound = countdownObj.sound ?? true;
  const defaultMuted = countdownObj.defaultMuted ?? true;
  const soundUrl =
    typeof countdownObj.soundUrl === "string" ? countdownObj.soundUrl : "";

  const updateCountdown = (patch: Partial<IftarCountdownConfig>) => {
    onUpdateConfig({
      countdown: {
        ...countdownObj,
        ...patch,
      },
    });
  };

  const toggleCountdown = () => {
    if (countdownEnabled) {
      onUpdateConfig({ countdown: false });
    } else {
      onUpdateConfig({
        countdown: {
          ...countdownObj,
          iftarTime,
          position,
        },
      });
    }
  };

  return (
    <div className="ro-tab-content-pane">
      {/* ── Banner Variant Customization ── */}
      <div className="panel-card">
        <h3 className="panel-heading">
          <span>📜</span>
          <span>{t.workbench.variantSpecific.bannerHeading}</span>
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
          }}
        >
          {/* bannerTextAr */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.variantSpecific.bannerTextAr}
            </label>
            <input
              type="text"
              className="form-input"
              data-field="bannerTextAr"
              dir="rtl"
              value={bannerTextAr}
              onChange={(e) => onUpdateConfig({ bannerTextAr: e.target.value })}
            />
          </div>

          {/* bannerTextEn */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.variantSpecific.bannerTextEn}
            </label>
            <input
              type="text"
              className="form-input"
              data-field="bannerTextEn"
              dir="ltr"
              value={bannerTextEn}
              onChange={(e) => onUpdateConfig({ bannerTextEn: e.target.value })}
            />
          </div>

          {/* bannerBg */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.variantSpecific.bannerBg}
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="color"
                className="color-picker"
                data-field="bannerBg"
                value={bannerBg.startsWith("#") ? bannerBg : "#0f0f14"}
                onChange={(e) => onUpdateConfig({ bannerBg: e.target.value })}
              />
              <span className="color-code font-mono">{bannerBg}</span>
            </div>
          </div>

          {/* bannerTextColor */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.variantSpecific.bannerTextColor}
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="color"
                className="color-picker"
                data-field="bannerTextColor"
                value={
                  bannerTextColor.startsWith("#") ? bannerTextColor : "#f1f5f9"
                }
                onChange={(e) =>
                  onUpdateConfig({ bannerTextColor: e.target.value })
                }
              />
              <span className="color-code font-mono">{bannerTextColor}</span>
            </div>
          </div>

          {/* bannerIconColor */}
          <div className="form-group">
            <label className="form-label">
              {t.workbench.variantSpecific.bannerIconColor}
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="color"
                className="color-picker"
                data-field="bannerIconColor"
                value={
                  bannerIconColor.startsWith("#") ? bannerIconColor : "#c9a84c"
                }
                onChange={(e) =>
                  onUpdateConfig({ bannerIconColor: e.target.value })
                }
              />
              <span className="color-code font-mono">{bannerIconColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Iftar Countdown Widget Suite ── */}
      <div className="panel-card" style={{ marginTop: "16px" }}>
        <h3 className="panel-heading">
          <span>⏳</span>
          <span>{t.workbench.countdown.heading}</span>
        </h3>

        {/* Master Countdown Toggle */}
        <div className="form-toggle-wrap" onClick={toggleCountdown}>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
              {t.workbench.countdown.enabled}
            </div>
            <div className="form-help">{t.workbench.countdown.enabledHelp}</div>
          </div>
          <div className="toggle-switch">
            <input
              type="checkbox"
              data-field="countdownEnabled"
              checked={countdownEnabled}
              onChange={toggleCountdown}
              onClick={(e) => e.stopPropagation()}
            />
            <span className="toggle-slider" />
          </div>
        </div>

        {countdownEnabled && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "18px",
              marginTop: "20px",
              paddingTop: "16px",
              borderTop: "1px solid var(--border-dark)",
            }}
          >
            {/* iftarTime */}
            <div className="form-group">
              <label className="form-label">
                {t.workbench.countdown.iftarTime}
              </label>
              <input
                type="time"
                className="form-input font-mono"
                data-field="iftarTime"
                value={iftarTime}
                onChange={(e) => updateCountdown({ iftarTime: e.target.value })}
              />
              <span className="form-help">
                {t.workbench.countdown.iftarTimeHelp}
              </span>
            </div>

            {/* position anchor */}
            <div className="form-group">
              <label className="form-label">
                {t.workbench.countdown.position}
              </label>
              <select
                className="form-select"
                data-field="countdownPosition"
                value={position}
                onChange={(e) =>
                  updateCountdown({
                    position: e.target.value as CountdownAnchorPosition,
                  })
                }
              >
                <option value="bottom-right">
                  {t.workbench.countdown.positions["bottom-right"]}
                </option>
                <option value="bottom-left">
                  {t.workbench.countdown.positions["bottom-left"]}
                </option>
                <option value="top-right">
                  {t.workbench.countdown.positions["top-right"]}
                </option>
                <option value="top-left">
                  {t.workbench.countdown.positions["top-left"]}
                </option>
              </select>
            </div>

            {/* alertWindowMinutes */}
            <div className="form-group">
              <label className="form-label">
                {t.workbench.countdown.alertWindowMinutes}
              </label>
              <input
                type="number"
                className="form-input"
                data-field="alertWindowMinutes"
                min={1}
                max={300}
                value={alertWindowMinutes}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  updateCountdown({
                    alertWindowMinutes: isNaN(val) ? 30 : val,
                  });
                }}
              />
              <span className="form-help">
                {t.workbench.countdown.alertWindowHelp}
              </span>
            </div>

            {/* autoDismissAfterMinutes */}
            <div className="form-group">
              <label className="form-label">
                {t.workbench.countdown.autoDismissAfterMinutes}
              </label>
              <input
                type="number"
                className="form-input"
                data-field="autoDismissAfterMinutes"
                min={0}
                max={120}
                value={autoDismissAfterMinutes}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  updateCountdown({
                    autoDismissAfterMinutes: isNaN(val) ? 10 : val,
                  });
                }}
              />
              <span className="form-help">
                {t.workbench.countdown.autoDismissHelp}
              </span>
            </div>

            {/* celebrationDurationMs */}
            <div className="form-group">
              <label className="form-label">
                {t.workbench.countdown.celebrationDurationMs}
              </label>
              <input
                type="number"
                className="form-input"
                data-field="celebrationDurationMs"
                step={1000}
                min={1000}
                max={120000}
                value={celebrationDurationMs}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  updateCountdown({
                    celebrationDurationMs: isNaN(val) ? 30000 : val,
                  });
                }}
              />
              <span className="form-help">
                {t.workbench.countdown.celebrationDurationHelp}
              </span>
            </div>

            {/* soundUrl */}
            <div className="form-group">
              <label className="form-label">
                {t.workbench.countdown.soundUrl}
              </label>
              <input
                type="text"
                className="form-input"
                data-field="soundUrl"
                placeholder={t.workbench.countdown.soundUrlPlaceholder}
                value={soundUrl}
                onChange={(e) =>
                  updateCountdown({ soundUrl: e.target.value || false })
                }
              />
              <span className="form-help">
                {t.workbench.countdown.soundUrlHelp}
              </span>
            </div>

            {/* Toggles: minimizable, initiallyMinimized, sound, defaultMuted */}
            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "12px",
                }}
              >
                {/* minimizable */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={minimizable}
                    onChange={(e) =>
                      updateCountdown({ minimizable: e.target.checked })
                    }
                  />
                  <span>{t.workbench.countdown.minimizable}</span>
                </label>

                {/* initiallyMinimized */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={initiallyMinimized}
                    onChange={(e) =>
                      updateCountdown({ initiallyMinimized: e.target.checked })
                    }
                  />
                  <span>{t.workbench.countdown.initiallyMinimized}</span>
                </label>

                {/* sound */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={sound}
                    onChange={(e) =>
                      updateCountdown({ sound: e.target.checked })
                    }
                  />
                  <span>{t.workbench.countdown.sound}</span>
                </label>

                {/* defaultMuted */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={defaultMuted}
                    onChange={(e) =>
                      updateCountdown({ defaultMuted: e.target.checked })
                    }
                  />
                  <span>{t.workbench.countdown.defaultMuted}</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

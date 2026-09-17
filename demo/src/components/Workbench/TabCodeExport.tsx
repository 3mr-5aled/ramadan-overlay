import React, { useState } from "react";
import type { RamadanOverlayConfig } from "ramadan-overlay";
import type { Translations } from "../../translations/types";
import type { DemoLocale } from "../../utils/locale";
import type { ThemeChoice } from "./TabVariantTheme";

interface TabCodeExportProps {
  t: Translations;
  locale: DemoLocale;
  config: Partial<RamadanOverlayConfig>;
  themeName: ThemeChoice;
  onResetDefaults?: () => void;
}

export const TabCodeExport: React.FC<TabCodeExportProps> = ({
  t,
  locale,
  config,
  themeName,
  onResetDefaults,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  const exportConfig: Record<string, unknown> = {
    ...config,
  };
  if (themeName !== "custom") {
    exportConfig.theme = themeName;
  }
  if (config.date instanceof Date) {
    exportConfig.date = config.date.toISOString().slice(0, 10);
  }

  const cdnScript = `<!-- Ramadan & Eid Festive Overlay (CDN Drop-in) -->
<script src="https://cdn.jsdelivr.net/npm/ramadan-overlay/dist/index.global.js"></script>
<script>
  // Initialize overlay automatically
  const overlay = RamadanOverlay.init(${JSON.stringify(exportConfig, null, 2)});
</script>`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    });
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(cdnScript).then(() => {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2200);
    });
  };

  return (
    <div className="ro-tab-content-pane">
      <div className="panel-card">
        <h3 className="panel-heading">
          <span>💻</span>
          <span>
            {t.workbench.exportStudio?.heading || t.workbench.tabs.codeExport}
          </span>
        </h3>

        <p
          className="form-help"
          style={{ marginBottom: "16px", fontSize: "0.9rem" }}
        >
          {t.workbench.exportStudio?.description}
        </p>

        {/* ── Action Buttons ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <button
            type="button"
            className="btn-primary"
            onClick={handleCopyLink}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <span>🔗</span>
            <span>
              {copiedLink
                ? t.workbench.exportStudio?.linkCopied || "Link Copied!"
                : t.workbench.exportStudio?.copyLink || "Copy Shareable Link"}
            </span>
          </button>

          {onResetDefaults && (
            <button
              type="button"
              className="btn-outline"
              onClick={onResetDefaults}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>🔄</span>
              <span>
                {t.workbench.exportStudio?.resetDefaults ||
                  t.workbench.stepper.reset}
              </span>
            </button>
          )}
        </div>

        {/* ── Standalone CDN Script Drop-in ── */}
        <div style={{ marginTop: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <label className="form-label" style={{ margin: 0 }}>
              {t.workbench.exportStudio?.cdnHeading || "CDN Script Tag"}
            </label>
            <button
              type="button"
              className="btn-outline btn-sm"
              onClick={handleCopyScript}
            >
              {copiedScript
                ? t.workbench.exportStudio?.cdnCopied || "Copied!"
                : t.workbench.exportStudio?.copyCdn || "Copy Script"}
            </button>
          </div>

          <pre
            className="code-pre"
            style={{
              maxHeight: "220px",
              padding: "12px 14px",
              background: "rgba(10, 14, 26, 0.8)",
              borderRadius: "var(--radius-md)",
              fontSize: "0.82rem",
              lineHeight: 1.45,
            }}
          >
            <code>{cdnScript}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import type { RamadanOverlayConfig } from "ramadan-overlay";
import type { Translations } from "../../translations/types";
import type { DemoLocale } from "../../utils/locale";
import { isOptionVisible } from "../../utils/matrix";
import type { ThemeChoice } from "./TabVariantTheme";

interface TabCodeExportProps {
  t: Translations;
  locale: DemoLocale;
  config: Partial<RamadanOverlayConfig>;
  themeName: ThemeChoice;
  onResetDefaults?: () => void;
}

export type SetupTarget =
  "react" | "cdn" | "vanilla" | "vue" | "svelte" | "angular" | "ai";

const SETUP_TARGETS: Array<{
  id: SetupTarget;
  labelKey: keyof Translations["workbench"]["code"]["tabs"];
  icon: string;
  badge: string;
}> = [
  { id: "react", labelKey: "react", icon: "⚛️", badge: "Next.js / Vite" },
  { id: "cdn", labelKey: "cdn", icon: "🌐", badge: "No build step" },
  { id: "vanilla", labelKey: "vanilla", icon: "⚡", badge: "ESM / Bundler" },
  { id: "vue", labelKey: "vue", icon: "💚", badge: "Vue 3 / Nuxt" },
  { id: "svelte", labelKey: "svelte", icon: "🧡", badge: "SvelteKit" },
  { id: "angular", labelKey: "angular", icon: "🔴", badge: "v14+ Standalone" },
  { id: "ai", labelKey: "ai", icon: "🤖", badge: "Cursor / Copilot" },
];

export const TabCodeExport: React.FC<TabCodeExportProps> = ({
  t,
  locale,
  config,
  themeName,
  onResetDefaults,
}) => {
  const [selectedTarget, setSelectedTarget] = useState<SetupTarget>("react");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const variant = config.variant || "lanterns";

  // Build clean config omitting redundant defaults
  const cleanConfig: Record<string, unknown> = {};
  if (config.variant && config.variant !== "lanterns") {
    cleanConfig.variant = config.variant;
  }
  if (themeName && themeName !== "classic") {
    cleanConfig.theme =
      typeof config.theme === "object" ? config.theme : themeName;
  }
  if (
    config.position &&
    config.position !== "top" &&
    config.position !== "both"
  ) {
    cleanConfig.position = config.position;
  }
  if (config.opacity !== undefined && config.opacity !== 0.85) {
    cleanConfig.opacity = config.opacity;
  }
  if (config.layer && config.layer !== "foreground") {
    cleanConfig.layer = config.layer;
  }
  if (config.zIndex !== undefined && config.zIndex !== 9999) {
    cleanConfig.zIndex = config.zIndex;
  }
  if (
    isOptionVisible("shadows", variant) &&
    config.shadows &&
    config.shadows !== "soft"
  ) {
    cleanConfig.shadows = config.shadows;
  }
  if (config.autoTrigger !== undefined && !config.autoTrigger) {
    cleanConfig.autoTrigger = false;
  }
  if (config.previewMode !== undefined && !config.previewMode) {
    cleanConfig.previewMode = false;
  }
  if (config.debug) {
    cleanConfig.debug = true;
  }
  if (config.locale && config.locale !== "auto") {
    cleanConfig.locale = config.locale;
  }
  if (config.confetti === "off") {
    cleanConfig.confetti = "off";
  }
  if (config.attachTo && config.attachTo !== ".celestial-nav") {
    cleanConfig.attachTo = config.attachTo;
  }
  if (config.attachEdge && config.attachEdge !== "bottom") {
    cleanConfig.attachEdge = config.attachEdge;
  }
  if (config.mobileSideBehavior && config.mobileSideBehavior !== "hide") {
    cleanConfig.mobileSideBehavior = config.mobileSideBehavior;
  }
  if (config.clearance && config.clearance !== "edges") {
    cleanConfig.clearance = config.clearance;
  }

  // Lantern options
  if (variant === "lanterns") {
    if (config.lanternStyle) cleanConfig.lanternStyle = config.lanternStyle;
    if (config.lanternCount) cleanConfig.lanternCount = config.lanternCount;
    if (config.lanternZIndex !== undefined && config.lanternZIndex !== 2) {
      cleanConfig.lanternZIndex = config.lanternZIndex;
    }
    if (config.ropeStyle && config.ropeStyle !== "straight") {
      cleanConfig.ropeStyle = config.ropeStyle;
      if (config.ropeSag !== undefined && config.ropeSag !== 20) {
        cleanConfig.ropeSag = config.ropeSag;
      }
    }
    if (config.ceilingColor && config.ceilingColor !== "#c9a84c") {
      cleanConfig.ceilingColor = config.ceilingColor;
    }
    if (config.ropeColor && config.ropeColor !== "#c9a84c") {
      cleanConfig.ropeColor = config.ropeColor;
    }
  }

  // Banner options
  if (variant === "banner") {
    if (config.bannerTextAr && config.bannerTextAr !== "رَمَضَان كَرِيم") {
      cleanConfig.bannerTextAr = config.bannerTextAr;
    }
    if (config.bannerTextEn && config.bannerTextEn !== "Ramadan Mubarak") {
      cleanConfig.bannerTextEn = config.bannerTextEn;
    }
    if (config.bannerBg && config.bannerBg !== "rgba(15,15,20,0.92)") {
      cleanConfig.bannerBg = config.bannerBg;
    }
    if (config.bannerTextColor && config.bannerTextColor !== "#f1f5f9") {
      cleanConfig.bannerTextColor = config.bannerTextColor;
    }
    if (config.bannerIconColor && config.bannerIconColor !== "#c9a84c") {
      cleanConfig.bannerIconColor = config.bannerIconColor;
    }
  }

  // Motifs and particles options
  if (variant !== "lanterns" && variant !== "banner") {
    if (config.density && config.density !== "normal") {
      cleanConfig.density = config.density;
    }
    if (
      config.intensity !== undefined &&
      config.intensity !== "normal" &&
      config.intensity !== 5
    ) {
      cleanConfig.intensity = config.intensity;
    }
    if (config.glowColor && config.glowColor !== "rgba(201,168,76,0.55)") {
      cleanConfig.glowColor = config.glowColor;
    }
  }

  // Calendar and detection options
  if (config.region && config.region !== "standard") {
    cleanConfig.region = config.region;
  }
  if (config.hijriAdjustment) {
    cleanConfig.hijriAdjustment = config.hijriAdjustment;
  }
  if (config.date) {
    cleanConfig.date =
      config.date instanceof Date
        ? config.date.toISOString().slice(0, 10)
        : config.date;
  }
  if (config.occasions && config.occasions.length < 3) {
    cleanConfig.occasions = config.occasions;
  }
  if (config.eidVariant && config.eidVariant !== "eid") {
    cleanConfig.eidVariant = config.eidVariant;
  }
  if (config.liveTransition === false) {
    cleanConfig.liveTransition = false;
  }

  // Countdown options
  if (config.countdown) {
    cleanConfig.countdown = true;
    if (config.iftarTime) cleanConfig.iftarTime = config.iftarTime;
    if (
      config.countdownPosition &&
      config.countdownPosition !== "bottom-right"
    ) {
      cleanConfig.countdownPosition = config.countdownPosition;
    }
    if (
      config.alertWindowMinutes !== undefined &&
      config.alertWindowMinutes !== 60
    ) {
      cleanConfig.alertWindowMinutes = config.alertWindowMinutes;
    }
    if (config.minimizable === false) cleanConfig.minimizable = false;
    if (config.initiallyMinimized) cleanConfig.initiallyMinimized = true;
    if (
      config.autoDismissAfterMinutes !== undefined &&
      config.autoDismissAfterMinutes !== 120
    ) {
      cleanConfig.autoDismissAfterMinutes = config.autoDismissAfterMinutes;
    }
    if (
      config.celebrationDurationMs !== undefined &&
      config.celebrationDurationMs !== 15000
    ) {
      cleanConfig.celebrationDurationMs = config.celebrationDurationMs;
    }
    if (config.sound === false) cleanConfig.sound = false;
    if (config.defaultMuted) cleanConfig.defaultMuted = true;
    if (config.soundUrl) cleanConfig.soundUrl = config.soundUrl;
  }

  const jsonConfig = JSON.stringify(cleanConfig, null, 2);

  const getSnippet = (): string => {
    switch (selectedTarget) {
      case "react": {
        const entries = Object.entries(cleanConfig);
        const propsStr =
          entries.length === 0
            ? ""
            : "\n        " +
              entries
                .map(([k, v]) => {
                  if (typeof v === "string") return `${k}="${v}"`;
                  if (typeof v === "boolean") return v ? k : `${k}={false}`;
                  return `${k}={${JSON.stringify(v)}}`;
                })
                .join("\n        ") +
              "\n      ";

        return `// 1. Install via npm\n// npm install ramadan-overlay\n\nimport React from 'react';\nimport { RamadanOverlay } from 'ramadan-overlay/react';\n\nexport default function App() {\n  return (\n    <div>\n      {/* Your app content */}\n      <RamadanOverlay${propsStr}/>\n    </div>\n  );\n}`;
      }

      case "cdn":
        return `<!-- 1. Include ramadan-overlay via CDN (no build step required) -->\n<script src="https://cdn.jsdelivr.net/npm/ramadan-overlay/dist/index.global.js"></script>\n\n<script>\n  // 2. Initialize overlay with your configured setup\n  const overlay = RamadanOverlay.init(${jsonConfig});\n</script>`;

      case "vanilla":
        return `// 1. Install via npm\n// npm install ramadan-overlay\n\nimport { init } from 'ramadan-overlay';\n\n// 2. Initialize overlay with your configured setup\nconst overlay = init(${jsonConfig});\n\n// 3. Optional lifecycle cleanup on page change / SPA transition\n// overlay.destroy();`;

      case "vue":
        return `<!-- 1. Install: npm install ramadan-overlay -->\n<script setup>\nimport { RamadanOverlay } from 'ramadan-overlay/vue';\n\nconst config = ${jsonConfig};\n</script>\n\n<template>\n  <main>\n    <!-- Your app content -->\n    <RamadanOverlay v-bind="config" />\n  </main>\n</template>`;

      case "svelte":
        return `<!-- 1. Install: npm install ramadan-overlay -->\n<script>\n  import { RamadanOverlay } from 'ramadan-overlay/svelte';\n\n  const config = ${jsonConfig};\n</script>\n\n<main>\n  <!-- Your app content -->\n  <RamadanOverlay {...config} />\n</main>`;

      case "angular":
        return `// 1. Install: npm install ramadan-overlay\nimport { Component } from '@angular/core';\nimport { RamadanOverlayComponent } from 'ramadan-overlay/angular';\n\n@Component({\n  selector: 'app-root',\n  standalone: true,\n  imports: [RamadanOverlayComponent],\n  template: \`\n    <div>\n      <ramadan-overlay [config]="config"></ramadan-overlay>\n    </div>\n  \`\n})\nexport class AppComponent {\n  config = ${jsonConfig};\n}`;

      case "ai":
        if (locale === "ar") {
          return `أريد إضافة زينة رمضانية واحتفالية لمشروعي باستخدام مكتبة ramadan-overlay.
يرجى تثبيت الحزمة عبر npm install ramadan-overlay وتضمين الزينة بالإعدادات التالية:

- نمط الزخرفة (Overlay Variant): ${cleanConfig.variant || "lanterns"}
- السمة اللونية (Theme): ${typeof cleanConfig.theme === "string" ? cleanConfig.theme : "custom"}
- الموضع (Position): ${cleanConfig.position || "top"}
- الشفافية (Opacity): ${cleanConfig.opacity ?? 0.85}
- العداد التنازلي لوقت الإفطار: ${cleanConfig.countdown ? "مفعّل" : "معطل"}
- الكشف التلقائي بالتقويم الهجري: ${cleanConfig.autoTrigger !== false ? "مفعّل" : "معطل"}

كود التهيئة المقترح:
${jsonConfig}

يرجى مراعاة تنظيف دورة الحياة عند تدمير المكون والتأكد من توافق أنماط العرض.`;
        }

        return `I want to add Ramadan and Eid festive decorations to my web application using the ramadan-overlay library.
Please install the package via npm install ramadan-overlay and configure the overlay with the following parameters:

- Overlay Variant: ${cleanConfig.variant || "lanterns"}
- Theme: ${typeof cleanConfig.theme === "string" ? cleanConfig.theme : "custom"}
- Position: ${cleanConfig.position || "top"}
- Opacity: ${cleanConfig.opacity ?? 0.85}
- Iftar Countdown Widget: ${cleanConfig.countdown ? "Enabled" : "Disabled"}
- Auto Hijri Trigger: ${cleanConfig.autoTrigger !== false ? "Enabled" : "Disabled"}

Target Configuration:
${jsonConfig}

Please ensure clean lifecycle cleanup on component unmount and smooth z-index integration.`;

      default:
        return "";
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getSnippet()).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2200);
    });
  };

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("npm install ramadan-overlay").then(() => {
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2200);
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    });
  };

  return (
    <div className="ro-tab-content-pane">
      {/* ── Choose Setup Method Card ── */}
      <div className="panel-card">
        <h3 className="panel-heading">
          <span>🚀</span>
          <span>{t.workbench.code.chooseSetup}</span>
        </h3>
        <p
          className="form-help"
          style={{ marginBottom: "16px", fontSize: "0.9rem" }}
        >
          {t.workbench.code.chooseSetupHelp}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "10px",
            marginBottom: "18px",
          }}
        >
          {SETUP_TARGETS.map((item) => {
            const isSelected = selectedTarget === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`setup-target-card ${isSelected ? "active" : ""}`}
                onClick={() => setSelectedTarget(item.id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "4px",
                  padding: "10px 12px",
                  borderRadius: "var(--radius-md)",
                  border: isSelected
                    ? "1px solid var(--border-gold-glow)"
                    : "1px solid var(--border-mid)",
                  background: isSelected
                    ? "rgba(201, 168, 76, 0.12)"
                    : "rgba(255, 255, 255, 0.02)",
                  color: isSelected ? "var(--gold-200)" : "var(--text-primary)",
                  cursor: "pointer",
                  textAlign: "start",
                  transition: "all var(--transition-fast)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: 600,
                    fontSize: "0.92rem",
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{t.workbench.code.tabs[item.labelKey]}</span>
                </div>
                <span
                  style={{
                    fontSize: "0.74rem",
                    color: "var(--text-muted)",
                    fontWeight: 400,
                  }}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Install Command Strip (for npm-based setups) ── */}
        {selectedTarget !== "cdn" && selectedTarget !== "ai" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 14px",
              marginBottom: "16px",
              background: "rgba(10, 14, 26, 0.7)",
              border: "1px solid var(--border-dark)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}
              >
                {t.workbench.code.installCmd}:
              </span>
              <code
                className="font-mono"
                style={{ fontSize: "0.85rem", color: "var(--gold-300)" }}
              >
                npm install ramadan-overlay
              </code>
            </div>
            <button
              type="button"
              className="btn-outline btn-sm"
              onClick={handleCopyInstall}
            >
              {copiedInstall ? t.workbench.code.installCmdCopied : "Copy"}
            </button>
          </div>
        )}

        {/* ── Production Code Block ── */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <label className="form-label" style={{ margin: 0 }}>
              {selectedTarget === "ai"
                ? t.workbench.code.promptTitle
                : `${t.workbench.code.tabs[selectedTarget]} ${t.workbench.code.heading}`}
            </label>
            <button
              type="button"
              className={`btn-primary btn-sm ${copiedCode ? "copied" : ""}`}
              onClick={handleCopyCode}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>
                {copiedCode
                  ? selectedTarget === "ai"
                    ? t.workbench.code.promptSeamCopiedBtn
                    : t.workbench.code.copiedBtn
                  : selectedTarget === "ai"
                    ? t.workbench.code.copyPromptSeamBtn
                    : t.workbench.code.copyBtn}
              </span>
            </button>
          </div>

          <pre
            className="code-pre"
            style={{
              maxHeight: "320px",
              padding: "14px 16px",
              background: "rgba(10, 14, 26, 0.88)",
              borderRadius: "var(--radius-md)",
              fontSize: "0.84rem",
              lineHeight: 1.5,
              border: "1px solid var(--border-dark)",
              overflowX: "auto",
            }}
          >
            <code>{getSnippet()}</code>
          </pre>
        </div>

        {/* ── Studio Share & Reset Actions ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: "1px solid var(--border-dark)",
          }}
        >
          <button
            type="button"
            className="btn-outline"
            onClick={handleCopyLink}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <span>🔗</span>
            <span>
              {copiedLink
                ? t.workbench.exportStudio?.linkCopied || "Link Copied!"
                : t.workbench.exportStudio?.copyLink ||
                  "Copy Shareable Studio Link"}
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
      </div>
    </div>
  );
};

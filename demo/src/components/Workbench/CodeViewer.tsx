import React, { useState } from "react";
import type { RamadanOverlayConfig, ThemePreset } from "ramadan-overlay";
import type { Translations } from "../../translations/types";
import type { DemoLocale } from "../../utils/locale";
import { isOptionVisible } from "../../utils/matrix";
import type { ThemeChoice } from "./UniversalControls";

interface CodeViewerProps {
  t: Translations;
  locale: DemoLocale;
  config: Partial<RamadanOverlayConfig>;
  themeName: ThemeChoice;
}

type TabType = "react" | "vanilla" | "vue" | "svelte" | "angular" | "ai";

export const CodeViewer: React.FC<CodeViewerProps> = ({
  t,
  locale,
  config,
  themeName,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("react");
  const [copied, setCopied] = useState(false);

  const variant = config.variant || "lanterns";

  // Generate clean config object omitting defaults and leveraging isOptionVisible
  const cleanConfig: Record<string, unknown> = {};
  if (config.variant && config.variant !== "lanterns")
    cleanConfig.variant = config.variant;
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
  if (config.opacity !== undefined && config.opacity !== 0.85)
    cleanConfig.opacity = config.opacity;
  if (config.layer && config.layer !== "foreground")
    cleanConfig.layer = config.layer;
  if (
    isOptionVisible("shadows", variant) &&
    config.shadows &&
    config.shadows !== "soft"
  ) {
    cleanConfig.shadows = config.shadows;
  }
  if (config.autoTrigger !== undefined && !config.autoTrigger)
    cleanConfig.autoTrigger = false;
  if (config.countdown) cleanConfig.countdown = true;
  if (config.confetti === "off") cleanConfig.confetti = "off";
  if (config.attachTo) {
    cleanConfig.attachTo = config.attachTo;
    if (config.attachEdge) cleanConfig.attachEdge = config.attachEdge;
  }
  if (config.mobileSideBehavior && config.mobileSideBehavior !== "hide") {
    cleanConfig.mobileSideBehavior = config.mobileSideBehavior;
  }
  if (config.lanternCount) cleanConfig.lanternCount = config.lanternCount;
  if (config.lanternZIndex !== undefined && config.lanternZIndex !== 2) {
    cleanConfig.lanternZIndex = config.lanternZIndex;
  }

  // Check specific options through capability matrix
  const candidateKeys: Array<keyof RamadanOverlayConfig> = [
    "lanternStyle",
    "ropeStyle",
    "ropeSag",
    "ceilingColor",
    "ropeColor",
    "bannerTextAr",
    "bannerTextEn",
    "bannerBg",
    "bannerTextColor",
    "bannerIconColor",
    "clearance",
    "intensity",
    "density",
    "glowColor",
  ];

  for (const key of candidateKeys) {
    if (isOptionVisible(key, variant, config) && config[key] !== undefined) {
      cleanConfig[key] = config[key];
    }
  }

  const jsonConfig = JSON.stringify(cleanConfig, null, 2);

  const getSnippet = (): string => {
    switch (activeTab) {
      case "react": {
        const propsStr = Object.entries(cleanConfig)
          .map(([k, v]) => {
            if (typeof v === "string") return `${k}="${v}"`;
            if (typeof v === "boolean") return v ? k : `${k}={false}`;
            return `${k}={${JSON.stringify(v)}}`;
          })
          .join("\n  ");

        return `// 1. Install\n// npm install ramadan-overlay\n\nimport React from 'react';\nimport { RamadanOverlay } from 'ramadan-overlay/react';\n\nexport default function App() {\n  return (\n    <div>\n      {/* Your app content */}\n      <RamadanOverlay\n        ${propsStr}\n      />\n    </div>\n  );\n}`;
      }

      case "vanilla":
        return `// 1. Install via npm or CDN:\n// npm install ramadan-overlay\n\nimport { init } from 'ramadan-overlay';\n\n// Initialize overlay with selected options\nconst overlay = init(${jsonConfig});\n\n// Cleanup when leaving the page\n// overlay.destroy();`;

      case "vue":
        return `<!-- 1. Install: npm install ramadan-overlay -->\n<script setup>\nimport { RamadanOverlay } from 'ramadan-overlay/vue';\n\nconst config = ${jsonConfig};\n</script>\n\n<template>\n  <main>\n    <RamadanOverlay v-bind="config" />\n  </main>\n</template>`;

      case "svelte":
        return `<!-- 1. Install: npm install ramadan-overlay -->\n<script>\n  import { RamadanOverlay } from 'ramadan-overlay/svelte';\n\n  const config = ${jsonConfig};\n</script>\n\n<RamadanOverlay {...config} />`;

      case "angular":
        return `// 1. Install: npm install ramadan-overlay\nimport { Component } from '@angular/core';\nimport { RamadanOverlayComponent } from 'ramadan-overlay/angular';\n\n@Component({\n  selector: 'app-root',\n  standalone: true,\n  imports: [RamadanOverlayComponent],\n  template: \`\n    <ramadan-overlay [config]="config"></ramadan-overlay>\n  \`\n})\nexport class AppComponent {\n  config = ${jsonConfig};\n}`;

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

  const handleCopy = () => {
    const text = getSnippet();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <div className="panel-card code-viewer-card">
      <h3 className="panel-heading">
        <span>💻</span>
        <span>{t.workbench.code.heading}</span>
      </h3>

      <div className="code-tabs">
        {(
          ["react", "vanilla", "vue", "svelte", "angular", "ai"] as TabType[]
        ).map((tab) => (
          <button
            key={tab}
            className={`code-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {t.workbench.code.tabs[tab]}
          </button>
        ))}
      </div>

      <div className="code-box-container">
        <button
          className={`code-copy-floating ${copied ? "copied" : ""}`}
          onClick={handleCopy}
        >
          {copied
            ? activeTab === "ai"
              ? t.workbench.code.promptSeamCopiedBtn
              : t.workbench.code.copiedBtn
            : activeTab === "ai"
              ? t.workbench.code.copyPromptSeamBtn
              : t.workbench.code.copyBtn}
        </button>
        <pre className="code-pre">
          <code>{getSnippet()}</code>
        </pre>
      </div>
    </div>
  );
};

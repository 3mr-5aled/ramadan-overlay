import React from "react";
import type {
  OverlayVariant,
  OverlayPosition,
  RamadanOverlayConfig,
  LayerStacking,
  ShadowMode,
  ThemeDefinition,
} from "ramadan-overlay";
import type { Translations } from "../../translations/types";
import type { DemoLocale } from "../../utils/locale";
import { VariantSelector } from "./VariantSelector";
import { UniversalControls, type ThemeChoice } from "./UniversalControls";
import { VariantSpecificControls } from "./VariantSpecificControls";
import { ColorCustomizer } from "./ColorCustomizer";
import { CodeViewer } from "./CodeViewer";

interface WorkbenchProps {
  t: Translations;
  locale: DemoLocale;
  config: Partial<RamadanOverlayConfig>;
  themeName: ThemeChoice;
  customTheme: Partial<ThemeDefinition>;
  onSelectVariant: (variant: OverlayVariant) => void;
  onChangePosition: (pos: OverlayPosition) => void;
  onChangeTheme: (theme: ThemeChoice) => void;
  onUpdateConfig: (patch: Partial<RamadanOverlayConfig>) => void;
  onUpdateCustomColor: (
    key: keyof ThemeDefinition | "primaryColor" | "accentColor",
    value: string
  ) => void;
  onResetCustomColors: () => void;
  onToggleAutoTrigger: () => void;
  onToggleCountdown: () => void;
}

export const Workbench: React.FC<WorkbenchProps> = ({
  t,
  locale,
  config,
  themeName,
  customTheme,
  onSelectVariant,
  onChangePosition,
  onChangeTheme,
  onUpdateConfig,
  onUpdateCustomColor,
  onResetCustomColors,
  onToggleAutoTrigger,
  onToggleCountdown,
}) => {
  const activeVariant: OverlayVariant = config.variant || "lanterns";
  const position: OverlayPosition = config.position || "top";
  const opacity = config.opacity ?? 0.85;
  const layer: LayerStacking = config.layer || "foreground";
  const shadows: ShadowMode = config.shadows || "soft";
  const confetti = config.confetti === "off" ? "off" : "on";
  const autoTrigger = config.autoTrigger ?? true;
  const countdownEnabled = Boolean(config.countdown);

  return (
    <section id="workbench" className="workbench-section">
      <div className="section-header">
        <h2 className="section-title font-display">{t.workbench.title}</h2>
        <p className="section-subtitle">{t.workbench.subtitle}</p>
      </div>

      <div className="workbench-grid">
        {/* Left Column: Configurator Controls */}
        <div className="controls-column">
          <VariantSelector
            t={t}
            activeVariant={activeVariant}
            onSelectVariant={onSelectVariant}
          />

          <UniversalControls
            t={t}
            variant={activeVariant}
            position={position}
            onChangePosition={onChangePosition}
            themeName={themeName}
            onChangeTheme={onChangeTheme}
            opacity={opacity}
            onChangeOpacity={(val) => onUpdateConfig({ opacity: val })}
            layer={layer}
            onChangeLayer={(val) => onUpdateConfig({ layer: val })}
            shadows={shadows}
            onChangeShadows={(val) => onUpdateConfig({ shadows: val })}
            confetti={confetti}
            onChangeConfetti={(val) => onUpdateConfig({ confetti: val })}
            autoTrigger={autoTrigger}
            onToggleAutoTrigger={onToggleAutoTrigger}
            countdownEnabled={countdownEnabled}
            onToggleCountdown={onToggleCountdown}
            attachTo={config.attachTo}
            onChangeAttachTo={(val) => onUpdateConfig({ attachTo: val })}
          />

          {themeName === "custom" && (
            <ColorCustomizer
              customTheme={customTheme}
              onChangeColor={onUpdateCustomColor}
              onReset={onResetCustomColors}
              translations={t.workbench.colors}
            />
          )}

          <VariantSpecificControls
            t={t}
            config={config}
            onUpdateConfig={onUpdateConfig}
          />
        </div>

        {/* Right Column: Code Viewer & Agent Prompt Seam */}
        <div className="code-column">
          <CodeViewer
            t={t}
            locale={locale}
            config={config}
            themeName={themeName}
          />
        </div>
      </div>
    </section>
  );
};

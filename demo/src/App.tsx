import React, { useState, useEffect } from "react";
import type {
  OverlayVariant,
  OverlayPosition,
  RamadanOverlayConfig,
  ThemePreset,
  ThemeDefinition,
  OverlayInstance,
} from "ramadan-overlay";
import { RamadanOverlay } from "ramadan-overlay/react";
import { arTranslations } from "./translations/ar";
import { enTranslations } from "./translations/en";
import {
  getInitialLocale,
  applyLocaleDirection,
  persistLocale,
  type DemoLocale,
} from "./utils/locale";
import { sanitizeConfigForVariant } from "./utils/matrix";
import { Navbar, type OccasionPreview } from "./components/Navbar";
import { HeroCanopy } from "./components/HeroCanopy";
import { Workbench } from "./components/Workbench/Workbench";
import type { ThemeChoice } from "./components/Workbench/TabVariantTheme";
import { AdvancedLab } from "./components/AdvancedLab/AdvancedLab";
import { Footer } from "./components/Footer";

const DEFAULT_CUSTOM_THEME: Partial<ThemeDefinition> = {
  colors: ["#c9a84c", "#e5c158", "#9a7b2c", "#f3e5ab", "#1b3b2b", "#0f172a"],
  glowColor: "rgba(201,168,76,0.55)",
  ceilingColor: "#c9a84c",
  ropeColor: "#c9a84c",
  bannerBg: "rgba(15,15,20,0.92)",
  bannerTextColor: "#f1f5f9",
  bannerIconColor: "#c9a84c",
};

export const App: React.FC = () => {
  const [locale, setLocale] = useState<DemoLocale>(getInitialLocale);
  const t = locale === "ar" ? arTranslations : enTranslations;

  const [overlayOn, setOverlayOn] = useState(true);
  const [themeName, setThemeName] = useState<ThemeChoice>("classic");
  const [occasion, setOccasion] = useState<OccasionPreview>("ramadan");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [overlayInstance, setOverlayInstance] =
    useState<OverlayInstance | null>(null);

  const [customTheme, setCustomTheme] =
    useState<Partial<ThemeDefinition>>(DEFAULT_CUSTOM_THEME);

  const [config, setConfig] = useState<Partial<RamadanOverlayConfig>>({
    variant: "lanterns",
    position: "top",
    opacity: 0.85,
    layer: "foreground",
    shadows: "soft",
    autoTrigger: false,
    previewMode: true,
    countdown: false,
    confetti: "on",
    attachTo: ".celestial-nav",
    attachEdge: "bottom",
    lanternStyle: 0,
    ropeStyle: "straight",
    ropeSag: 20,
    ceilingColor: "#c9a84c",
    ropeColor: "#c9a84c",
    bannerTextAr: "رَمَضَان كَرِيم",
    bannerTextEn: "Ramadan Mubarak",
    bannerBg: "rgba(15,15,20,0.92)",
    bannerTextColor: "#f1f5f9",
    bannerIconColor: "#c9a84c",
    clearance: "edges",
    intensity: "normal",
    density: "normal",
    glowColor: "rgba(201,168,76,0.55)",
  });

  // Apply direction and language to HTML element
  useEffect(() => {
    applyLocaleDirection(locale);
    persistLocale(locale);
  }, [locale]);

  // Load configuration from URL hash on initial mount
  useEffect(() => {
    try {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash) {
        const params = new URLSearchParams(hash);
        const hashVariant = params.get("variant") as OverlayVariant | null;
        const hashTheme = params.get("theme") as ThemeChoice | null;
        const hashPosition = params.get("position") as OverlayPosition | null;
        const hashOccasion = params.get("occasion") as OccasionPreview | null;

        if (hashVariant) {
          setConfig((prev) =>
            sanitizeConfigForVariant(
              {
                ...prev,
                variant: hashVariant,
                position: hashPosition || prev.position,
              },
              hashVariant
            )
          );
        }
        if (hashTheme) {
          setThemeName(hashTheme);
        }
        if (hashOccasion) {
          setOccasion(hashOccasion);
        }
      }
    } catch (_) {}
  }, []);

  // Synchronize configuration to URL hash for shareable links
  useEffect(() => {
    try {
      const params = new URLSearchParams();
      if (config.variant) params.set("variant", config.variant);
      if (themeName) params.set("theme", themeName);
      if (config.position) params.set("position", config.position);
      params.set("occasion", occasion);
      params.set("lang", locale);
      window.history.replaceState(null, "", `#${params.toString()}`);
    } catch (_) {}
  }, [config.variant, config.position, themeName, occasion, locale]);

  // Dogfooding official React component
  const activeOverlayConfig: RamadanOverlayConfig = overlayOn
    ? {
        ...config,
        theme:
          themeName === "custom" ? customTheme : (themeName as ThemePreset),
        previewMode: true,
      }
    : {
        autoTrigger: false,
        previewMode: false,
      };

  const handleToggleLocale = () => {
    setLocale((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const handleToggleOverlay = () => {
    setOverlayOn((prev) => !prev);
  };

  const handlePlayChime = () => {
    if (overlayInstance?.countdown?.playAlert) {
      overlayInstance.countdown.playAlert();
    } else {
      // Harmonic chime preview via Web Audio API
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
          osc.frequency.exponentialRampToValueAtTime(
            880,
            ctx.currentTime + 0.8
          ); // A5
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.2);
        }
      } catch (_) {}
    }
  };

  const handleFireConfetti = () => {
    if (overlayInstance?.fireConfetti) {
      overlayInstance.fireConfetti(occasion);
    }
  };

  const handleSelectVariant = (variant: OverlayVariant) => {
    setConfig((prev) => sanitizeConfigForVariant(prev, variant));
  };

  const handleChangePosition = (position: OverlayPosition) => {
    setConfig((prev) => ({ ...prev, position }));
  };

  const handleChangeTheme = (theme: ThemeChoice) => {
    setThemeName(theme);
  };

  const handleUpdateConfig = (patch: Partial<RamadanOverlayConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  };

  const handleUpdateCustomColor = (
    key: keyof ThemeDefinition | "primaryColor" | "accentColor",
    value: string
  ) => {
    setCustomTheme((prev) => {
      const currentColors = prev.colors
        ? [...prev.colors]
        : ["#c9a84c", "#e5c158", "#9a7b2c", "#f3e5ab", "#1b3b2b", "#0f172a"];
      if (key === "primaryColor") {
        currentColors[0] = value;
        return { ...prev, colors: currentColors };
      }
      if (key === "accentColor") {
        currentColors[3] = value;
        return { ...prev, colors: currentColors };
      }
      return { ...prev, [key]: value };
    });
  };

  const handleResetCustomColors = () => {
    setCustomTheme(DEFAULT_CUSTOM_THEME);
  };

  const handleChangeOccasion = (newOccasion: OccasionPreview) => {
    setOccasion(newOccasion);
    if (newOccasion === "eid-fitr") {
      setConfig((prev) =>
        sanitizeConfigForVariant(
          {
            ...prev,
            bannerTextAr: "عِيد فِطْر مُبَارَك",
            bannerTextEn: "Eid Al-Fitr Mubarak",
          },
          "eid-fitr"
        )
      );
    } else if (newOccasion === "eid-adha") {
      setConfig((prev) =>
        sanitizeConfigForVariant(
          {
            ...prev,
            bannerTextAr: "عِيد أَضْحَى مُبَارَك",
            bannerTextEn: "Eid Al-Adha Mubarak",
          },
          "eid-adha"
        )
      );
    } else {
      setConfig((prev) =>
        sanitizeConfigForVariant(
          {
            ...prev,
            bannerTextAr: "رَمَضَان كَرِيم",
            bannerTextEn: "Ramadan Mubarak",
          },
          "lanterns"
        )
      );
    }
  };

  return (
    <div className={`app-container ${mobileDrawerOpen ? "drawer-open" : ""}`}>
      <Navbar
        t={t}
        locale={locale}
        onToggleLocale={handleToggleLocale}
        occasion={occasion}
        onChangeOccasion={handleChangeOccasion}
        overlayOn={overlayOn}
        onToggleOverlay={handleToggleOverlay}
        onPlayChime={handlePlayChime}
        onFireConfetti={handleFireConfetti}
        onToggleDrawer={() => setMobileDrawerOpen((prev) => !prev)}
      />

      {/* Dogfooding the official drop-in React component */}
      {overlayOn && (
        <RamadanOverlay
          config={activeOverlayConfig}
          onInstance={setOverlayInstance}
        />
      )}

      <main>
        <HeroCanopy
          t={t}
          locale={locale}
          occasion={occasion}
          onFireConfetti={handleFireConfetti}
          onScrollToWorkbench={() => {
            document
              .getElementById("workbench")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          onScrollToLab={() => {
            document
              .getElementById("lab")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        <Workbench
          t={t}
          locale={locale}
          config={config}
          themeName={themeName}
          customTheme={customTheme}
          onSelectVariant={handleSelectVariant}
          onChangePosition={handleChangePosition}
          onChangeTheme={handleChangeTheme}
          onUpdateConfig={handleUpdateConfig}
          onUpdateCustomColor={handleUpdateCustomColor}
          onResetCustomColors={handleResetCustomColors}
          onToggleAutoTrigger={() =>
            setConfig((p) => ({ ...p, autoTrigger: !p.autoTrigger }))
          }
          onToggleCountdown={() =>
            setConfig((p) => ({ ...p, countdown: !p.countdown }))
          }
        />

        <AdvancedLab t={t} overlayInstance={overlayInstance} />
      </main>

      <Footer t={t} />
    </div>
  );
};

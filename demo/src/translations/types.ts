export interface Translations {
  nav: {
    brandTitle: string;
    versionBadge: string;
    occasionBadge: string;
    occasionSelectLabel: string;
    occasions: {
      ramadan: string;
      "eid-fitr": string;
      "eid-adha": string;
    };
    overlayOn: string;
    overlayOff: string;
    chimeTest: string;
    confettiLaunch: string;
    switchLang: string;
    githubLink: string;
    toggleMobileDrawer: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaWorkbench: string;
    ctaLab: string;
    statVariants: string;
    statZeroDeps: string;
    statFrameworks: string;
  };
  workbench: {
    title: string;
    subtitle: string;
    variantHeading: string;
    optionsHeading: string;
    variants: Record<
      string,
      {
        name: string;
        desc: string;
      }
    >;
    universal: {
      theme: string;
      themeOptions: Record<string, string>;
      position: string;
      positionOptions: Record<string, string>;
      opacity: string;
      layer: string;
      layerOptions: Record<string, string>;
      shadows: string;
      shadowOptions: Record<string, string>;
      confetti: string;
      confettiOptions: Record<string, string>;
      attachTo: string;
      attachToOptions: Record<string, string>;
      autoTrigger: string;
      autoTriggerHelp: string;
      countdown: string;
      countdownHelp: string;
    };
    variantSpecific: {
      lanternHeading: string;
      lanternStyle: string;
      lanternCycle: string;
      lanternCount: string;
      lanternCountAuto: string;
      ropeStyle: string;
      ropeStraight: string;
      ropeUshaped: string;
      ropeDual: string;
      ropeSag: string;
      ceilingColor: string;
      ropeColor: string;

      bannerHeading: string;
      bannerTextAr: string;
      bannerTextEn: string;
      bannerBg: string;
      bannerTextColor: string;
      bannerIconColor: string;

      motifsHeading: string;
      clearance: string;
      clearanceEdges: string;
      clearanceFull: string;
      intensity: string;
      intensityLow: string;
      intensityNormal: string;
      intensityHigh: string;

      sparklesHeading: string;
      density: string;
      glowColor: string;
    };
    colors: {
      heading: string;
      customPalette: string;
      primary: string;
      accent: string;
      glow: string;
      ceiling: string;
      rope: string;
      bannerBg: string;
      bannerText: string;
      resetBtn: string;
    };
    code: {
      heading: string;
      copyBtn: string;
      copiedBtn: string;
      copyPromptSeamBtn: string;
      promptSeamCopiedBtn: string;
      tabs: {
        react: string;
        vanilla: string;
        vue: string;
        svelte: string;
        angular: string;
        ai: string;
      };
      promptTitle: string;
    };
  };
  lab: {
    title: string;
    badge: string;
    desc: string;
    countdownTitle: string;
    btnShow: string;
    btnDismiss: string;
    btnMinimize: string;
    btnExpand: string;
    btnMute: string;
    btnUnmute: string;
    btnPlayChime: string;

    resilienceTitle: string;
    resilienceDesc: string;
    btnClamping: string;
    btnInvalidDate: string;
    btnCrash: string;
    btnOnError: string;
    btnToggleDebug: string;
    debugOn: string;
    debugOff: string;
    terminalHeading: string;
    clearTerminal: string;
  };
  footer: {
    copy: string;
    license: string;
    builtWith: string;
  };
}

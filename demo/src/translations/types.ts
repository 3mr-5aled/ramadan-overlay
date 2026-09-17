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
    tabs: {
      variantTheme: string;
      layout: string;
      styling: string;
      calendar: string;
      countdownBanner: string;
      codeExport: string;
    };
    stepper: {
      step: string;
      of: string;
      progress: string;
      back: string;
      next: string;
      finish: string;
      reset: string;
      scrollLeft: string;
      scrollRight: string;
    };
    universal: {
      theme: string;
      themeOptions: Record<string, string>;
      position: string;
      positionOptions: Record<string, string>;
      opacity: string;
      layer: string;
      layerOptions: Record<string, string>;
      zIndex: string;
      zIndexHelp: string;
      shadows: string;
      shadowOptions: Record<string, string>;
      confetti: string;
      confettiOptions: Record<string, string>;
      attachTo: string;
      attachToOptions: Record<string, string>;
      attachToCustomPlaceholder: string;
      attachEdge: string;
      attachEdgeOptions: Record<string, string>;
      mobileSideBehavior: string;
      mobileSideBehaviorOptions: Record<string, string>;
      autoTrigger: string;
      autoTriggerHelp: string;
      previewMode: string;
      previewModeHelp: string;
      debug: string;
      debugHelp: string;
      overlayLocale: string;
      overlayLocaleHelp: string;
      overlayLocaleOptions: Record<string, string>;
      countdown: string;
      countdownHelp: string;
    };
    calendar: {
      heading: string;
      region: string;
      regionHelp: string;
      regions: Record<string, string>;
      hijriAdjustment: string;
      hijriAdjustmentHelp: string;
      days: string;
      astronomicStandard: string;
      clearBtn: string;
      testDate: string;
      testDateHelp: string;
      occasions: string;
      occasionsHelp: string;
      occasionOptions: Record<string, string>;
      eidVariant: string;
      eidVariantHelp: string;
      liveTransition: string;
      liveTransitionHelp: string;
    };
    countdown: {
      heading: string;
      enabled: string;
      enabledHelp: string;
      iftarTime: string;
      iftarTimeHelp: string;
      position: string;
      positions: Record<string, string>;
      alertWindowMinutes: string;
      alertWindowHelp: string;
      minimizable: string;
      minimizableHelp: string;
      initiallyMinimized: string;
      initiallyMinimizedHelp: string;
      autoDismissAfterMinutes: string;
      autoDismissHelp: string;
      celebrationDurationMs: string;
      celebrationDurationHelp: string;
      sound: string;
      soundHelp: string;
      defaultMuted: string;
      defaultMutedHelp: string;
      soundUrl: string;
      soundUrlHelp: string;
      soundUrlPlaceholder: string;
    };
    exportStudio: {
      heading: string;
      description: string;
      copyLink: string;
      linkCopied: string;
      resetDefaults: string;
      cdnHeading: string;
      copyCdn: string;
      cdnCopied: string;
    };
    variantSpecific: {
      activeVariantBadge: string;
      lanternHeading: string;
      lanternStyle: string;
      lanternCycle: string;
      lanternCount: string;
      lanternCountAuto: string;
      lanternZIndex: string;
      lanternZIndexOptions: Record<string, string>;
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
      intensityLevel: string;
      intensityLow: string;
      intensityNormal: string;
      intensityHigh: string;

      sparklesHeading: string;
      density: string;
      densityOptions: Record<string, string>;
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
      chooseSetup: string;
      chooseSetupHelp: string;
      installCmd: string;
      installCmdCopied: string;
      copyBtn: string;
      copiedBtn: string;
      copyPromptSeamBtn: string;
      promptSeamCopiedBtn: string;
      tabs: {
        react: string;
        cdn: string;
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

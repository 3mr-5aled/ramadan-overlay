import {
  Directive,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { getOccasionState, getRamadanState, init } from "../core/index";
import type {
  HijriRegion,
  LanternStyle,
  Occasion,
  OverlayInstance,
  OverlayPosition,
  OverlayVariant,
  RamadanDateQuery,
  RamadanOverlayConfig,
  RamadanState,
} from "../types";

// ─── Directive ────────────────────────────────────────────────────────────────

/**
 * Angular directive that mounts the Ramadan overlay.
 * Apply it to any element — the overlay is injected into document.body.
 *
 * @example
 * ```html
 * <!-- app.component.html -->
 * <div ramadanOverlay [ramadanConfig]="{ variant: 'lanterns', previewMode: true }"></div>
 * ```
 */
@Directive({
  selector: "[ramadanOverlay]",
  standalone: true,
})
export class RamadanOverlayDirective implements OnInit, OnChanges, OnDestroy {
  @Input() ramadanConfig: RamadanOverlayConfig = {};

  // Individual input overrides
  @Input() variant?: OverlayVariant;
  @Input() position?: OverlayPosition;
  @Input() opacity?: number;
  @Input() colors?: string[];
  @Input() zIndex?: number;
  @Input() autoTrigger?: boolean;
  @Input() previewMode?: boolean;
  @Input() confetti?: "on" | "off";
  @Input() locale?: "en" | "ar";
  @Input() glowColor?: string;
  @Input() ceilingColor?: string;
  @Input() ropeColor?: string;
  @Input() region?: HijriRegion;
  @Input() hijriAdjustment?: number;
  @Input() density?: "low" | "normal" | "high";
  @Input() lanternStyle?: LanternStyle;
  @Input() bannerBg?: string;
  @Input() bannerTextColor?: string;
  @Input() bannerTextEn?: string;
  @Input() bannerTextAr?: string;
  @Input() bannerIconColor?: string;
  @Input() occasions?: Occasion[];
  @Input() eidVariant?: OverlayVariant;
  @Input() liveTransition?: boolean;

  private instance: OverlayInstance | null = null;

  ngOnInit(): void {
    if (!this.instance) {
      this.instance = init(this.buildConfig());
    }
  }

  ngOnChanges(_changes: SimpleChanges): void {
    const cfg = this.buildConfig();
    if (!this.instance) {
      this.instance = init(cfg);
    } else {
      this.instance.update(cfg);
    }
  }

  ngOnDestroy(): void {
    this.instance?.destroy();
    this.instance = null;
  }

  private buildConfig(): RamadanOverlayConfig {
    const inputKeys = [
      "variant",
      "position",
      "opacity",
      "colors",
      "zIndex",
      "autoTrigger",
      "previewMode",
      "confetti",
      "locale",
      "glowColor",
      "ceilingColor",
      "ropeColor",
      "region",
      "hijriAdjustment",
      "density",
      "lanternStyle",
      "bannerBg",
      "bannerTextColor",
      "bannerTextEn",
      "bannerTextAr",
      "bannerIconColor",
      "occasions",
      "eidVariant",
      "liveTransition",
    ] as const;

    const individualInputs: Partial<RamadanOverlayConfig> = {};
    for (const key of inputKeys) {
      const val = this[key];
      if (val !== undefined) {
        // @ts-expect-error dynamic property assignment
        individualInputs[key] = val;
      }
    }

    return {
      ...this.ramadanConfig,
      ...individualInputs,
    };
  }
}

// ─── Module ───────────────────────────────────────────────────────────────────

/**
 * Import this module in your AppModule to use the directive.
 *
 * @example
 * ```ts
 * import { RamadanOverlayModule } from 'ramadan-overlay/angular';
 *
 * @NgModule({ imports: [RamadanOverlayModule] })
 * export class AppModule {}
 * ```
 */
@NgModule({
  imports: [RamadanOverlayDirective],
  exports: [RamadanOverlayDirective],
})
export class RamadanOverlayModule {}

export { getOccasionState, getRamadanState };
export type {
  Occasion,
  OverlayInstance,
  OverlayPosition,
  OverlayVariant,
  RamadanDateQuery,
  RamadanOverlayConfig,
  RamadanState,
};

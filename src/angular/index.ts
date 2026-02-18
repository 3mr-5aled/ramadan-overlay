import {
  Directive,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { getRamadanState, init } from "../core/index";
import type {
  HijriRegion,
  LanternStyle,
  OverlayInstance,
  OverlayPosition,
  OverlayVariant,
  RamadanOverlayConfig,
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
  @Input() previewMode?: boolean;
  @Input() confetti?: "on" | "off";
  @Input() locale?: "en" | "ar";
  @Input() glowColor?: string;
  @Input() region?: HijriRegion;
  @Input() density?: "low" | "normal" | "high";
  @Input() lanternStyle?: LanternStyle;

  private instance: OverlayInstance | null = null;

  ngOnInit(): void {
    this.mount();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.mount();
  }

  ngOnDestroy(): void {
    this.instance?.destroy();
    this.instance = null;
  }

  private mount(): void {
    this.instance?.destroy();
    // Build individual overrides, skipping undefined values
    const individualInputs: Partial<RamadanOverlayConfig> = {};
    if (this.variant !== undefined) individualInputs.variant = this.variant;
    if (this.position !== undefined) individualInputs.position = this.position;
    if (this.opacity !== undefined) individualInputs.opacity = this.opacity;
    if (this.colors !== undefined) individualInputs.colors = this.colors;
    if (this.previewMode !== undefined)
      individualInputs.previewMode = this.previewMode;
    if (this.confetti !== undefined) individualInputs.confetti = this.confetti;
    if (this.locale !== undefined) individualInputs.locale = this.locale;
    if (this.glowColor !== undefined)
      individualInputs.glowColor = this.glowColor;
    if (this.region !== undefined) individualInputs.region = this.region;
    if (this.density !== undefined) individualInputs.density = this.density;
    if (this.lanternStyle !== undefined)
      individualInputs.lanternStyle = this.lanternStyle;
    const cfg: RamadanOverlayConfig = {
      ...this.ramadanConfig,
      ...individualInputs,
    };
    this.instance = init(cfg);
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

export { getRamadanState };
export type { OverlayInstance, RamadanOverlayConfig };

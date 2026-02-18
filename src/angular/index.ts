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
import type { OverlayInstance, RamadanOverlayConfig } from "../types";

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
    this.instance = init(this.ramadanConfig ?? {});
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

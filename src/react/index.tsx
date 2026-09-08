import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { getOccasionState, getRamadanState, init } from "../core/index";
import type {
  Occasion,
  OverlayInstance,
  OverlayVariant,
  RamadanDateQuery,
  RamadanOverlayConfig,
  RamadanState,
} from "../types";

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * React hook that mounts the Ramadan overlay and cleans up on unmount.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { state } = useRamadanOverlay({ variant: 'lanterns' });
 *   return <div>{state.isRamadan && <p>Ramadan Mubarak!</p>}</div>;
 * }
 * ```
 */
export function useRamadanOverlay(config: RamadanOverlayConfig = {}): {
  state: RamadanState;
  instance: OverlayInstance | null;
} {
  const instanceRef = useRef<OverlayInstance | null>(null);
  const [state, setState] = useState<RamadanState>(() =>
    getRamadanState(config)
  );

  // Stabilize update calls across renders
  const configKey = JSON.stringify(config);
  const isMountedRef = useRef(false);

  // Lifetime effect: mount, cleanup on unmount, and support React 18 StrictMode re-mount
  useEffect(() => {
    isMountedRef.current = true;
    if (!instanceRef.current) {
      const overlay = init({
        ...config,
        onOccasionChange: (occasion, newState) => {
          setState(newState);
          config.onOccasionChange?.(occasion, newState);
        },
      });
      instanceRef.current = overlay;
      setState(overlay.state);
    }
    return () => {
      isMountedRef.current = false;
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, []);

  // Update effect: in-place update when config props change
  useEffect(() => {
    if (!isMountedRef.current) return;
    if (instanceRef.current) {
      instanceRef.current.update(config);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configKey]);

  return { state, instance: instanceRef.current };
}

// ─── Component ────────────────────────────────────────────────────────────────

export interface RamadanOverlayProps extends Partial<RamadanOverlayConfig> {
  /** Alternatively pass all options as a single object */
  config?: RamadanOverlayConfig;
  /** Render prop: receives the current Ramadan state */
  children?: (state: RamadanState) => React.ReactNode;
}

/**
 * Drop-in React component. Mount it anywhere in your app — it renders nothing
 * itself but injects the overlay into `document.body`.
 *
 * @example
 * ```tsx
 * import { RamadanOverlay } from 'ramadan-overlay/react';
 *
 * function App() {
 *   return (
 *     <>
 *       <RamadanOverlay config={{ variant: 'lanterns', previewMode: true }} />
 *       <YourApp />
 *     </>
 *   );
 * }
 * ```
 */
export const RamadanOverlay: FC<RamadanOverlayProps> = (props) => {
  const { config, children, ...rest } = props;
  // Top-level props override config object fields
  const mergedConfig: RamadanOverlayConfig = { ...config, ...rest };
  const { state } = useRamadanOverlay(mergedConfig);
  return children ? <>{children(state)}</> : null;
};

export { getOccasionState, getRamadanState };
export type {
  Occasion,
  OverlayInstance,
  OverlayVariant,
  RamadanDateQuery,
  RamadanOverlayConfig,
  RamadanState,
};

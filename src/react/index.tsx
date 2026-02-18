import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { getRamadanState, init } from "../core/index";
import type {
  OverlayInstance,
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
  const [state, setState] = useState<RamadanState>(() => getRamadanState());

  // Serialize config to a stable key to avoid unnecessary re-mounts
  const configKey = JSON.stringify(config);

  useEffect(() => {
    const overlay = init(config);
    instanceRef.current = overlay;
    setState(overlay.state);

    return () => {
      overlay.destroy();
      instanceRef.current = null;
    };
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

export { getRamadanState };
export type { OverlayInstance, RamadanOverlayConfig, RamadanState };

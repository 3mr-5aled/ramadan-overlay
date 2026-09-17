import React, { useState } from "react";
import type { Translations } from "../../translations/types";
import type { OverlayInstance } from "ramadan-overlay";

interface CountdownSandboxProps {
  t: Translations;
  overlayInstance: OverlayInstance | null;
}

export const CountdownSandbox: React.FC<CountdownSandboxProps> = ({
  t,
  overlayInstance,
}) => {
  const [isMuted, setIsMuted] = useState(true);

  const countdown = overlayInstance?.countdown;

  const handleShow = () => countdown?.show();
  const handleDismiss = () => countdown?.dismiss();
  const handleMinimize = () => countdown?.minimize?.();
  const handleExpand = () => countdown?.expand?.();

  const handleToggleMute = () => {
    if (countdown) {
      const muted = countdown.toggleMute();
      setIsMuted(muted);
    }
  };

  const handlePlayChime = () => {
    countdown?.playAlert?.();
  };

  return (
    <div className="panel-card" style={{ marginBottom: 0 }}>
      <h4 className="panel-heading" style={{ fontSize: "1.1rem" }}>
        <span>⏱️</span>
        <span>{t.lab.countdownTitle}</span>
      </h4>

      <p
        style={{
          fontSize: "0.85rem",
          color: "var(--text-secondary)",
          marginBottom: "16px",
        }}
      >
        {t.workbench.universal.countdownHelp}
      </p>

      <div className="lab-btn-grid">
        <button className="lab-btn" onClick={handleShow}>
          <span>👁️</span>
          <span>{t.lab.btnShow}</span>
        </button>

        <button className="lab-btn" onClick={handleDismiss}>
          <span>✕</span>
          <span>{t.lab.btnDismiss}</span>
        </button>

        <button className="lab-btn" onClick={handleMinimize}>
          <span>🗕</span>
          <span>{t.lab.btnMinimize}</span>
        </button>

        <button className="lab-btn" onClick={handleExpand}>
          <span>🗖</span>
          <span>{t.lab.btnExpand}</span>
        </button>

        <button className="lab-btn" onClick={handleToggleMute}>
          <span>{isMuted ? "🔇" : "🔊"}</span>
          <span>{isMuted ? t.lab.btnUnmute : t.lab.btnMute}</span>
        </button>

        <button className="lab-btn" onClick={handlePlayChime}>
          <span>🔔</span>
          <span>{t.lab.btnPlayChime}</span>
        </button>
      </div>
    </div>
  );
};

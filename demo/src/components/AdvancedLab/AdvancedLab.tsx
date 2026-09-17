import React, { useState } from "react";
import type { Translations } from "../../translations/types";
import type { OverlayInstance } from "ramadan-overlay";
import { CountdownSandbox } from "./CountdownSandbox";
import { ResilienceConsole } from "./ResilienceConsole";

interface AdvancedLabProps {
  t: Translations;
  overlayInstance: OverlayInstance | null;
}

export const AdvancedLab: React.FC<AdvancedLabProps> = ({
  t,
  overlayInstance,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="lab" className="lab-section">
      <div
        className="lab-drawer-header"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen(!isOpen);
        }}
      >
        <div className="lab-drawer-title font-display">
          <span>⚡</span>
          <span>{t.lab.title}</span>
          <span className="lab-drawer-badge">{t.lab.badge}</span>
        </div>
        <div style={{ fontSize: "1.4rem", color: "var(--gold-400)" }}>
          {isOpen ? "▲" : "▼"}
        </div>
      </div>

      {isOpen && (
        <div className="lab-content">
          <CountdownSandbox t={t} overlayInstance={overlayInstance} />
          <ResilienceConsole t={t} />
        </div>
      )}
    </section>
  );
};

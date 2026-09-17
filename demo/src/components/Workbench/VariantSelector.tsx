import React from "react";
import type { OverlayVariant } from "ramadan-overlay";
import type { Translations } from "../../translations/types";

interface VariantSelectorProps {
  t: Translations;
  activeVariant: OverlayVariant;
  onSelectVariant: (variant: OverlayVariant) => void;
}

const VARIANTS: { id: OverlayVariant; icon: string }[] = [
  { id: "lanterns", icon: "🏮" },
  { id: "banner", icon: "🏷️" },
  { id: "crescent-stars", icon: "🌙" },
  { id: "geometric", icon: "💠" },
  { id: "sparkles", icon: "✨" },
  { id: "eid", icon: "🎉" },
  { id: "eid-fitr", icon: "🍬" },
  { id: "eid-adha", icon: "🐑" },
];

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  t,
  activeVariant,
  onSelectVariant,
}) => {
  return (
    <div className="panel-card">
      <h3 className="panel-heading">
        <span>❖</span>
        <span>{t.workbench.variantHeading}</span>
      </h3>

      <div className="variant-grid">
        {VARIANTS.map(({ id, icon }) => {
          const item = t.workbench.variants[id] || { name: id, desc: "" };
          const isActive = activeVariant === id;

          return (
            <div
              key={id}
              className={`variant-card ${isActive ? "active" : ""}`}
              onClick={() => onSelectVariant(id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSelectVariant(id);
                }
              }}
            >
              <div className="variant-card-title">
                <span style={{ fontSize: "1.2rem" }}>{icon}</span>
                <span>{item.name}</span>
              </div>
              <p className="variant-card-desc">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

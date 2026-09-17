import React from "react";
import type { OverlayVariant, OverlayPosition } from "ramadan-overlay";
import { getAllowedPositions } from "../../utils/matrix";
import type { Translations } from "../../translations/types";

export interface PositionPickerProps {
  variant: OverlayVariant;
  position: OverlayPosition;
  onChangePosition: (position: OverlayPosition) => void;
  translations: Translations["workbench"]["universal"];
}

export const PositionPicker: React.FC<PositionPickerProps> = ({
  variant,
  position,
  onChangePosition,
  translations,
}) => {
  const allowedPositions = getAllowedPositions(variant);

  return (
    <div className="control-group">
      <label htmlFor="position-select">{translations.position}</label>
      <select
        id="position-select"
        value={position}
        onChange={(e) => onChangePosition(e.target.value as OverlayPosition)}
        className="form-select"
      >
        {allowedPositions.map((pos) => (
          <option key={pos} value={pos}>
            {translations.positionOptions[pos] || pos}
          </option>
        ))}
      </select>
    </div>
  );
};

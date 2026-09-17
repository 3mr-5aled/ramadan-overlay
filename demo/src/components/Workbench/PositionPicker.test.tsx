import { describe, it, expect, vi } from "vitest";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { PositionPicker } from "./PositionPicker";
import { enTranslations } from "../../translations/en";

// @ts-expect-error React act environment flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("PositionPicker component", () => {
  it("renders only allowed positions for lanterns (no bottom, both, or full)", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const handleChange = vi.fn();

    await act(async () => {
      root.render(
        <PositionPicker
          variant="lanterns"
          position="top"
          onChangePosition={handleChange}
          translations={enTranslations.workbench.universal}
        />
      );
    });

    const select = container.querySelector("select") as HTMLSelectElement;
    expect(select).toBeTruthy();

    const options = Array.from(select.querySelectorAll("option")).map(
      (o) => o.value
    );
    expect(options).toEqual(["top", "left", "right", "sides", "start", "end"]);
    expect(options).not.toContain("bottom");
    expect(options).not.toContain("both");
    expect(options).not.toContain("full");

    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("renders only top and bottom for banner variant", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const handleChange = vi.fn();

    await act(async () => {
      root.render(
        <PositionPicker
          variant="banner"
          position="top"
          onChangePosition={handleChange}
          translations={enTranslations.workbench.universal}
        />
      );
    });

    const select = container.querySelector("select") as HTMLSelectElement;
    const options = Array.from(select.querySelectorAll("option")).map(
      (o) => o.value
    );
    expect(options).toEqual(["top", "bottom"]);

    act(() => {
      root.unmount();
    });
    container.remove();
  });
});

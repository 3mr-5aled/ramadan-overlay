import { describe, it, expect, vi } from "vitest";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { ColorCustomizer } from "./ColorCustomizer";
import { enTranslations } from "../../translations/en";

// @ts-expect-error React act environment flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("ColorCustomizer component", () => {
  it("renders color inputs and calls onChangeColor upon modification", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const handleChange = vi.fn();
    const handleReset = vi.fn();

    await act(async () => {
      root.render(
        <ColorCustomizer
          customTheme={{
            colors: [
              "#112233",
              "#223344",
              "#334455",
              "#445566",
              "#556677",
              "#667788",
            ],
            glowColor: "rgba(255,215,0,0.5)",
            ceilingColor: "#ff0000",
            ropeColor: "#00ff00",
            bannerBg: "rgba(0,0,0,0.8)",
            bannerTextColor: "#ffffff",
          }}
          onChangeColor={handleChange}
          onReset={handleReset}
          translations={enTranslations.workbench.colors}
        />
      );
    });

    const primaryInput = container.querySelector(
      "#color-primary"
    ) as HTMLInputElement;
    expect(primaryInput).toBeTruthy();
    expect(primaryInput.value).toBe("#112233");

    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      setter?.call(primaryInput, "#998877");
      primaryInput.dispatchEvent(new Event("change", { bubbles: true }));
    });

    expect(handleChange).toHaveBeenCalledWith("primaryColor", "#998877");

    const resetBtn = container.querySelector(
      ".btn-outline"
    ) as HTMLButtonElement;
    expect(resetBtn).toBeTruthy();

    await act(async () => {
      resetBtn.click();
    });

    expect(handleReset).toHaveBeenCalled();

    act(() => {
      root.unmount();
    });
    container.remove();
  });
});

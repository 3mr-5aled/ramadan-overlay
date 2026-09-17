import { describe, it, expect, beforeEach } from "vitest";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { STORAGE_KEY } from "./utils/locale";

// @ts-expect-error React act environment flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("React Demo Application Integration", () => {
  let store: Record<string, string> = {};

  beforeEach(() => {
    store = {};
    const mockStorage = {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = String(value);
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
      length: 0,
      key: () => null,
    };
    Object.defineProperty(window, "localStorage", {
      value: mockStorage,
      writable: true,
    });
    window.location.hash = "";
    window.location.search = "";
  });

  it("mounts in Arabic by default with dir='rtl'", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<App />);
    });

    expect(document.documentElement.getAttribute("dir")).toBe("rtl");
    expect(document.documentElement.getAttribute("lang")).toBe("ar");

    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("toggles to English upon clicking the language switcher", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<App />);
    });

    const langBtn = container.querySelector(
      ".lang-toggle"
    ) as HTMLButtonElement;
    expect(langBtn).toBeTruthy();

    await act(async () => {
      langBtn.click();
    });

    expect(document.documentElement.getAttribute("dir")).toBe("ltr");
    expect(document.documentElement.getAttribute("lang")).toBe("en");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("en");

    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("renders occasion badge and switches preview occasion reactively", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<App />);
    });

    const occasionBadge = container.querySelector(".nav-occasion-badge");
    expect(occasionBadge).toBeTruthy();
    expect(occasionBadge?.textContent).toContain("رمضان");

    const occasionSelect = container.querySelector(
      ".nav-select"
    ) as HTMLSelectElement;
    expect(occasionSelect).toBeTruthy();

    await act(async () => {
      occasionSelect.value = "eid-fitr";
      occasionSelect.dispatchEvent(new Event("change", { bubbles: true }));
    });

    expect(occasionBadge?.textContent).toContain("عيد الفطر");

    act(() => {
      root.unmount();
    });
    container.remove();
  });
});

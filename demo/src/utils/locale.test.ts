import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getInitialLocale,
  applyLocaleDirection,
  persistLocale,
  STORAGE_KEY,
} from "./locale";

describe("Locale & Direction Seam", () => {
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
    document.documentElement.removeAttribute("dir");
    document.documentElement.removeAttribute("lang");
  });

  it("defaults to 'ar' when no storage or URL param exists", () => {
    expect(getInitialLocale()).toBe("ar");
  });

  it("resolves language from localStorage if present", () => {
    localStorage.setItem(STORAGE_KEY, "en");
    expect(getInitialLocale()).toBe("en");
  });

  it("prioritizes URL search parameter ?lang=en over default and storage", () => {
    localStorage.setItem(STORAGE_KEY, "ar");
    Object.defineProperty(window, "location", {
      writable: true,
      value: new URL("http://localhost:3000/?lang=en"),
    });
    expect(getInitialLocale()).toBe("en");
  });

  it("prioritizes URL hash parameter &lang=ar if present", () => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: new URL("http://localhost:3000/#variant=banner&lang=ar"),
    });
    expect(getInitialLocale()).toBe("ar");
  });

  it("applies dir='rtl' and lang='ar' to documentElement for Arabic", () => {
    applyLocaleDirection("ar");
    expect(document.documentElement.getAttribute("dir")).toBe("rtl");
    expect(document.documentElement.getAttribute("lang")).toBe("ar");
  });

  it("applies dir='ltr' and lang='en' to documentElement for English", () => {
    applyLocaleDirection("en");
    expect(document.documentElement.getAttribute("dir")).toBe("ltr");
    expect(document.documentElement.getAttribute("lang")).toBe("en");
  });

  it("persists locale to localStorage upon persistLocale call", () => {
    persistLocale("en");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("en");
  });
});

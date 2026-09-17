export type DemoLocale = "ar" | "en";

export const STORAGE_KEY = "ro_demo_lang";

/**
 * Determines the initial locale for the application.
 * Hierarchy: URL param/hash (?lang=... / #...&lang=...) -> localStorage -> default 'ar'.
 */
export function getInitialLocale(): DemoLocale {
  if (typeof window === "undefined") {
    return "ar";
  }

  // 1. Check URL search parameters
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const langParam = searchParams.get("lang");
    if (langParam === "ar" || langParam === "en") {
      return langParam;
    }
  } catch (_) {}

  // 2. Check URL hash parameters
  try {
    const hash = window.location.hash.replace(/^#/, "");
    const hashParams = new URLSearchParams(hash);
    const hashLang = hashParams.get("lang");
    if (hashLang === "ar" || hashLang === "en") {
      return hashLang;
    }
  } catch (_) {}

  // 3. Check localStorage
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "ar" || stored === "en") {
      return stored;
    }
  } catch (_) {}

  // 4. Default to Arabic
  return "ar";
}

/**
 * Updates DOM attributes (dir, lang) on document.documentElement.
 */
export function applyLocaleDirection(locale: DemoLocale): void {
  if (typeof document === "undefined") return;

  const dir = locale === "ar" ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", locale);
}

/**
 * Persists the chosen locale to localStorage and synchronizes with URL parameters.
 */
export function persistLocale(locale: DemoLocale): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch (_) {}

  try {
    applyLocaleDirection(locale);
  } catch (_) {}
}

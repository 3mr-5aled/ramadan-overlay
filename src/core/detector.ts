import type { RamadanState } from "../types";

// ─── Pre-computed fallback table (Gregorian start dates for Ramadan) ──────────
// Used when Intl.DateTimeFormat with islamic-umalqura is unavailable (e.g. legacy Node).
// Dates are the first day of Ramadan for each Hijri year.
const RAMADAN_STARTS: Record<number, string> = {
  1443: "2022-04-02",
  1444: "2023-03-23",
  1445: "2024-03-11",
  1446: "2025-03-01",
  1447: "2026-02-18",
  1448: "2027-02-07",
  1449: "2028-01-28",
  1450: "2029-01-16",
  1451: "2030-01-06",
  1452: "2030-12-26",
  1453: "2031-12-15",
  1454: "2032-12-04",
  1455: "2033-11-24",
  1456: "2034-11-13",
  1457: "2035-11-02",
  1458: "2036-10-22",
  1459: "2037-10-11",
  1460: "2038-10-01",
};

// ─── Intl-based detection ─────────────────────────────────────────────────────

function getHijriParts(
  date: Date,
): { month: number; day: number; year: number } | null {
  try {
    const formatter = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    const parts = formatter.formatToParts(date);
    const get = (type: string) => {
      const part = parts.find((p) => p.type === type);
      return part ? parseInt(part.value, 10) : NaN;
    };
    const month = get("month");
    const day = get("day");
    const year = get("year");
    if (isNaN(month) || isNaN(day) || isNaN(year)) return null;
    return { month, day, year };
  } catch {
    return null;
  }
}

// ─── Fallback table-based detection ──────────────────────────────────────────

function detectViaTable(date: Date): RamadanState {
  const now = date.getTime();
  let closestYear = 0;
  let closestStart: Date | null = null;

  for (const [yearStr, startStr] of Object.entries(RAMADAN_STARTS)) {
    const start = new Date(startStr);
    if (start.getTime() <= now) {
      if (!closestStart || start.getTime() > closestStart.getTime()) {
        closestStart = start;
        closestYear = parseInt(yearStr, 10);
      }
    }
  }

  if (!closestStart) {
    return { isRamadan: false, isFirstDay: false, hijriYear: 0, dayNumber: 0 };
  }

  // Ramadan is 29 or 30 days — use 30 as safe upper bound
  const endDate = new Date(closestStart.getTime() + 30 * 24 * 60 * 60 * 1000);
  if (now > endDate.getTime()) {
    return {
      isRamadan: false,
      isFirstDay: false,
      hijriYear: closestYear,
      dayNumber: 0,
    };
  }

  const dayNumber =
    Math.floor((now - closestStart.getTime()) / (24 * 60 * 60 * 1000)) + 1;

  return {
    isRamadan: true,
    isFirstDay: dayNumber === 1,
    hijriYear: closestYear,
    dayNumber,
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Detect the current Ramadan state.
 * Prefers `Intl.DateTimeFormat` with the Umm al-Qura calendar; falls back to a
 * pre-computed Gregorian date table for SSR / legacy environments.
 *
 * @param date - Date to check (defaults to `new Date()`)
 */
export function getRamadanState(date: Date = new Date()): RamadanState {
  const hijri = getHijriParts(date);

  if (hijri) {
    const RAMADAN_MONTH = 9;
    const isRamadan = hijri.month === RAMADAN_MONTH;
    return {
      isRamadan,
      isFirstDay: isRamadan && hijri.day === 1,
      hijriYear: hijri.year,
      dayNumber: isRamadan ? hijri.day : 0,
    };
  }

  // Intl not supported — fall back to table
  return detectViaTable(date);
}

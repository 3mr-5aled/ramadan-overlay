import type {
  HijriRegion,
  Occasion,
  OccasionDateQuery,
  RamadanDateQuery,
  RamadanState,
} from "../types";

// ─── Region → day offset map ──────────────────────────────────────────────────

/** Maps named region presets to a day offset relative to Umm al-Qura. */
const REGION_OFFSET: Record<HijriRegion, number> = {
  standard: 0,
  saudi: 0,
  uae: 0,
  malaysia: 0,
  egypt: 1,
  turkey: 1,
  pakistan: 1,
  indonesia: 1,
  morocco: 1,
  us: 1,
  uk: 1,
};

/**
 * Resolve the effective day offset from region + explicit adjustment.
 * `hijriAdjustment` takes precedence when provided (not undefined).
 */
export function resolveHijriOffset(
  region?: HijriRegion | string,
  hijriAdjustment?: number
): number {
  if (hijriAdjustment !== undefined) return hijriAdjustment;
  if (region) return (REGION_OFFSET as Record<string, number>)[region] ?? 0;
  return 0;
}

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

/** Gregorian start date for Eid Al-Fitr (1 Shawwal) for Hijri years 1443–1460. */
export const EID_FITR_STARTS: Record<number, string> = {
  1443: "2022-05-02",
  1444: "2023-04-21",
  1445: "2024-04-10",
  1446: "2025-03-30",
  1447: "2026-03-20",
  1448: "2027-03-09",
  1449: "2028-02-26",
  1450: "2029-02-14",
  1451: "2030-02-04",
  1452: "2031-01-24",
  1453: "2032-01-14",
  1454: "2033-01-03",
  1455: "2033-12-23",
  1456: "2034-12-12",
  1457: "2035-12-01",
  1458: "2036-11-19",
  1459: "2037-11-09",
  1460: "2038-10-29",
};

/** Gregorian start date for Eid Al-Adha (10 Dhu al-Hijjah) for Hijri years 1443–1460. */
export const EID_ADHA_STARTS: Record<number, string> = {
  1443: "2022-07-09",
  1444: "2023-06-28",
  1445: "2024-06-16",
  1446: "2025-06-06",
  1447: "2026-05-27",
  1448: "2027-05-16",
  1449: "2028-05-05",
  1450: "2029-04-24",
  1451: "2030-04-13",
  1452: "2031-04-02",
  1453: "2032-03-22",
  1454: "2033-03-12",
  1455: "2034-03-01",
  1456: "2035-02-19",
  1457: "2036-02-08",
  1458: "2037-01-27",
  1459: "2038-01-16",
  1460: "2039-01-05",
};

// ─── Intl-based detection ─────────────────────────────────────────────────────

function getHijriParts(
  date: Date
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

const DAY_MS = 24 * 60 * 60 * 1000;

function detectViaTable(date: Date): RamadanState {
  const now = date.getTime();

  // 1. Check Eid Al-Fitr (1-3 Shawwal: 3 days)
  for (const [yearStr, startStr] of Object.entries(EID_FITR_STARTS)) {
    const start = new Date(startStr).getTime();
    const diffDays = Math.floor((now - start) / DAY_MS);
    if (diffDays >= 0 && diffDays < 3) {
      const year = parseInt(yearStr, 10);
      const dayNumber = diffDays + 1;
      return {
        isRamadan: false,
        occasion: "eid-fitr",
        isEid: true,
        hijriYear: year,
        hijriMonth: 10,
        hijriDay: dayNumber,
        dayNumber,
      };
    }
  }

  // 2. Check Eid Al-Adha (10-13 Dhu al-Hijjah: 4 days)
  for (const [yearStr, startStr] of Object.entries(EID_ADHA_STARTS)) {
    const start = new Date(startStr).getTime();
    const diffDays = Math.floor((now - start) / DAY_MS);
    if (diffDays >= 0 && diffDays < 4) {
      const year = parseInt(yearStr, 10);
      const dayNumber = diffDays + 1;
      return {
        isRamadan: false,
        occasion: "eid-adha",
        isEid: true,
        hijriYear: year,
        hijriMonth: 12,
        hijriDay: diffDays + 10,
        dayNumber,
      };
    }
  }

  // 3. Check Ramadan (Month 9: ends when Eid Al-Fitr begins, or max 30 days)
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

  if (closestStart) {
    const fitrStartStr = EID_FITR_STARTS[closestYear];
    const fitrStartTime = fitrStartStr
      ? new Date(fitrStartStr).getTime()
      : closestStart.getTime() + 30 * DAY_MS;

    if (now < fitrStartTime) {
      const dayNumber = Math.floor((now - closestStart.getTime()) / DAY_MS) + 1;
      return {
        isRamadan: true,
        occasion: "ramadan",
        isEid: false,
        hijriYear: closestYear,
        hijriMonth: 9,
        hijriDay: dayNumber,
        dayNumber,
      };
    }
  }

  return {
    isRamadan: false,
    occasion: "none",
    isEid: false,
    hijriYear: closestYear,
    hijriMonth: 0,
    hijriDay: 0,
    dayNumber: 0,
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Detect the current Ramadan or Islamic holiday state.
 * Prefers `Intl.DateTimeFormat` with the Umm al-Qura calendar; falls back to a
 * pre-computed Gregorian date table for SSR / legacy environments.
 *
 * Accepts either:
 * 1. An `OccasionDateQuery` / `RamadanDateQuery` object: `{ date?, region?, hijriAdjustment? }`
 * 2. A `Date` instance with optional `hijriAdjustment` (legacy)
 *
 * @example
 * ```ts
 * // Modern query:
 * const state = getRamadanState({ region: 'turkey' });
 *
 * // Legacy / simple:
 * const state = getRamadanState(new Date());
 * ```
 */
export function getRamadanState(
  queryOrDate: Date | OccasionDateQuery | RamadanDateQuery = new Date(),
  legacyAdjustment = 0
): RamadanState {
  let targetDate: Date;
  let effectiveOffset = legacyAdjustment;

  if (queryOrDate instanceof Date) {
    targetDate = queryOrDate;
  } else {
    targetDate = queryOrDate.date ?? new Date();
    effectiveOffset = resolveHijriOffset(
      queryOrDate.region,
      queryOrDate.hijriAdjustment
    );
  }

  // Apply offset: shift the date backward so that a +1 adjustment effectively
  // makes the observer see Ramadan one day later than the base calendar.
  const adjusted =
    effectiveOffset === 0
      ? targetDate
      : new Date(targetDate.getTime() - effectiveOffset * 24 * 60 * 60 * 1000);

  const hijri = getHijriParts(adjusted);

  if (hijri) {
    const RAMADAN_MONTH = 9;
    const SHAWWAL_MONTH = 10;
    const DHUL_HIJJAH_MONTH = 12;
    const isRamadan = hijri.month === RAMADAN_MONTH;
    const isEidFitr =
      hijri.month === SHAWWAL_MONTH && hijri.day >= 1 && hijri.day <= 3;
    const isEidAdha =
      hijri.month === DHUL_HIJJAH_MONTH && hijri.day >= 10 && hijri.day <= 13;

    let occasion: Occasion = "none";
    let dayNumber = 0;

    if (isRamadan) {
      occasion = "ramadan";
      dayNumber = hijri.day;
    } else if (isEidFitr) {
      occasion = "eid-fitr";
      dayNumber = hijri.day;
    } else if (isEidAdha) {
      occasion = "eid-adha";
      dayNumber = hijri.day - 9;
    }

    return {
      isRamadan,
      occasion,
      isEid: isEidFitr || isEidAdha,
      hijriYear: hijri.year,
      hijriMonth: hijri.month,
      hijriDay: hijri.day,
      dayNumber,
    };
  }

  // Intl not supported — fall back to table
  return detectViaTable(adjusted);
}

/** Modern alias for getRamadanState */
export const getOccasionState = getRamadanState;

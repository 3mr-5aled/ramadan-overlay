import type { IftarTimeValue } from "../../types";

const HH_MM_REGEX = /^([01]?\d|2[0-3]):([0-5]\d)$/;

/**
 * Resolves an IftarTimeValue into a valid Date object.
 *
 * @param value "HH:mm" string, ISO string, Date instance, or dynamic resolver callback.
 * @param baseDate The current reference time (defaults to new Date()).
 * @param autoDismissMinutes The post-Iftar auto-dismiss window in minutes (default 10).
 * @returns Normalized target Date or null if invalid.
 */
export function resolveTargetIftarTime(
  value: IftarTimeValue | undefined | null,
  baseDate: Date = new Date(),
  autoDismissMinutes: number = 10
): Date | null {
  if (!value) return null;

  let resolved: unknown = value;
  if (typeof resolved === "function") {
    try {
      const dynamicVal = resolved(baseDate);
      if (!dynamicVal) return null;
      resolved = dynamicVal;
    } catch {
      return null;
    }
  }

  if (resolved instanceof Date) {
    return isNaN(resolved.getTime()) ? null : new Date(resolved.getTime());
  }

  if (typeof resolved === "string") {
    const trimmed = resolved.trim();
    const hhMmMatch = trimmed.match(HH_MM_REGEX);
    if (hhMmMatch) {
      const hours = parseInt(hhMmMatch[1], 10);
      const minutes = parseInt(hhMmMatch[2], 10);
      const target = new Date(baseDate.getTime());
      target.setHours(hours, minutes, 0, 0);

      // Auto-rollover to next day if target has passed beyond the auto-dismiss window
      const autoDismissMs = autoDismissMinutes * 60000;
      if (baseDate.getTime() > target.getTime() + autoDismissMs) {
        target.setDate(target.getDate() + 1);
      }

      return target;
    }

    // Attempt parsing as ISO-8601 / RFC 2822 string
    const parsed = new Date(trimmed);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
}

import { describe, it, expect } from "vitest";
import { resolveTargetIftarTime } from "./normalizer";

describe("resolveTargetIftarTime", () => {
  it("resolves HH:mm string on the same day when time is in the future", () => {
    const baseDate = new Date(2026, 2, 10, 15, 0, 0); // March 10, 2026 at 15:00
    const result = resolveTargetIftarTime("18:45", baseDate);

    expect(result).not.toBeNull();
    expect(result?.getFullYear()).toBe(2026);
    expect(result?.getMonth()).toBe(2);
    expect(result?.getDate()).toBe(10);
    expect(result?.getHours()).toBe(18);
    expect(result?.getMinutes()).toBe(45);
    expect(result?.getSeconds()).toBe(0);
    expect(result?.getMilliseconds()).toBe(0);
  });

  it("retains today if time passed within the autoDismiss window", () => {
    const baseDate = new Date(2026, 2, 10, 18, 50, 0); // 5 minutes after 18:45
    const result = resolveTargetIftarTime("18:45", baseDate, 10);

    expect(result).not.toBeNull();
    expect(result?.getDate()).toBe(10);
    expect(result?.getHours()).toBe(18);
    expect(result?.getMinutes()).toBe(45);
  });

  it("rolls over to the next day when HH:mm time has passed beyond autoDismiss window", () => {
    const baseDate = new Date(2026, 2, 10, 20, 0, 0); // 1 hour 15 min after 18:45
    const result = resolveTargetIftarTime("18:45", baseDate, 10);

    expect(result).not.toBeNull();
    expect(result?.getDate()).toBe(11); // Rolled over to March 11
    expect(result?.getHours()).toBe(18);
    expect(result?.getMinutes()).toBe(45);
  });

  it("resolves valid Date instance directly", () => {
    const target = new Date(2026, 2, 10, 18, 45, 0);
    const result = resolveTargetIftarTime(target);

    expect(result).not.toBeNull();
    expect(result?.getTime()).toBe(target.getTime());
  });

  it("resolves ISO-8601 string", () => {
    const isoString = "2026-03-10T18:45:00.000Z";
    const result = resolveTargetIftarTime(isoString);

    expect(result).not.toBeNull();
    expect(result?.toISOString()).toBe(isoString);
  });

  it("evaluates dynamic IftarTimeResolver callback", () => {
    const baseDate = new Date(2026, 2, 10, 12, 0, 0);
    const resolver = (d: Date) => `18:${d.getDate() + 35}`; // dynamic calculation
    const result = resolveTargetIftarTime(resolver, baseDate);

    expect(result).not.toBeNull();
    expect(result?.getHours()).toBe(18);
    expect(result?.getMinutes()).toBe(45);
  });

  it("returns null for malformed or invalid inputs", () => {
    expect(resolveTargetIftarTime("invalid-time")).toBeNull();
    expect(resolveTargetIftarTime(new Date(NaN))).toBeNull();
    expect(resolveTargetIftarTime(() => null)).toBeNull();
    expect(resolveTargetIftarTime(() => undefined)).toBeNull();
  });
});

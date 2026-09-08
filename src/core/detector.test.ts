import { getRamadanState } from "./detector";

// Simple smoke tests exercising the detector without a full test framework.
// Run via: node src/core/detector.test.ts (tsx) or vitest
if (typeof describe !== "undefined") {
  describe("getRamadanState", () => {
    it("detects Ramadan 1447 start (2026-02-18)", () => {
      const state = getRamadanState(new Date("2026-02-18"));
      expect(state.isRamadan).toBe(true);
      expect(state.hijriYear).toBe(1447);
      expect(state.dayNumber).toBe(1);
    });

    it("detects mid-Ramadan 1447 (2026-03-05)", () => {
      const state = getRamadanState(new Date("2026-03-05"));
      expect(state.isRamadan).toBe(true);
      expect(state.dayNumber).toBeGreaterThan(1);
    });

    it("detects non-Ramadan (2026-01-01)", () => {
      const state = getRamadanState(new Date("2026-01-01"));
      expect(state.isRamadan).toBe(false);
      expect(state.dayNumber).toBe(0);
    });

    it("detects non-Ramadan after Ramadan ends (2026-04-01)", () => {
      const state = getRamadanState(new Date("2026-04-01"));
      expect(state.isRamadan).toBe(false);
    });

    it("handles regional presets via query object", () => {
      const egyptStartDay = getRamadanState({
        date: new Date("2026-02-18"),
        region: "egypt",
      });
      expect(egyptStartDay.isRamadan).toBe(false);

      const egyptDayOne = getRamadanState({
        date: new Date("2026-02-19"),
        region: "egypt",
      });
      expect(egyptDayOne.isRamadan).toBe(true);
      expect(egyptDayOne.dayNumber).toBe(1);
    });

    it("prefers explicit hijriAdjustment over region preset", () => {
      const state = getRamadanState({
        date: new Date("2026-02-18"),
        region: "egypt",
        hijriAdjustment: 0,
      });
      expect(state.isRamadan).toBe(true);
      expect(state.dayNumber).toBe(1);
    });

    it("supports legacy arguments getRamadanState(date, adjustment)", () => {
      const state = getRamadanState(new Date("2026-02-19"), 1);
      expect(state.isRamadan).toBe(true);
      expect(state.dayNumber).toBe(1);
    });
  });
}

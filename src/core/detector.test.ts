import { getRamadanState } from "./detector";

// Simple smoke tests exercising the detector without a full test framework.
// Run via: node src/core/detector.test.ts (tsx) or vitest
if (typeof describe !== "undefined") {
  describe("getRamadanState", () => {
    it("detects Ramadan 1447 start (2026-02-18)", () => {
      const state = getRamadanState(new Date("2026-02-18"));
      expect(state.isRamadan).toBe(true);
      expect(state.isFirstDay).toBe(true);
      expect(state.hijriYear).toBe(1447);
      expect(state.dayNumber).toBe(1);
    });

    it("detects mid-Ramadan 1447 (2026-03-05)", () => {
      const state = getRamadanState(new Date("2026-03-05"));
      expect(state.isRamadan).toBe(true);
      expect(state.isFirstDay).toBe(false);
      expect(state.dayNumber).toBeGreaterThan(1);
    });

    it("detects non-Ramadan (2026-01-01)", () => {
      const state = getRamadanState(new Date("2026-01-01"));
      expect(state.isRamadan).toBe(false);
      expect(state.isFirstDay).toBe(false);
      expect(state.dayNumber).toBe(0);
    });

    it("detects non-Ramadan after Ramadan ends (2026-04-01)", () => {
      const state = getRamadanState(new Date("2026-04-01"));
      expect(state.isRamadan).toBe(false);
    });
  });
}

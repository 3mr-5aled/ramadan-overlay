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

    it("detects Eid Al-Fitr start (2026-03-20)", () => {
      const state = getRamadanState(new Date("2026-03-20"));
      expect(state.occasion).toBe("eid-fitr");
      expect(state.isEid).toBe(true);
      expect(state.isRamadan).toBe(false);
      expect(state.hijriMonth).toBe(10);
      expect(state.hijriDay).toBe(1);
      expect(state.dayNumber).toBe(1);
    });

    it("detects Eid Al-Adha start (2026-05-27)", () => {
      const state = getRamadanState(new Date("2026-05-27"));
      expect(state.occasion).toBe("eid-adha");
      expect(state.isEid).toBe(true);
      expect(state.isRamadan).toBe(false);
      expect(state.hijriMonth).toBe(12);
      expect(state.hijriDay).toBe(10);
      expect(state.dayNumber).toBe(1);
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

    describe("fallback table detection (when Intl is unavailable)", () => {
      const originalDateTimeFormat = Intl.DateTimeFormat;

      beforeEach(() => {
        // Mock Intl.DateTimeFormat to throw or simulate environments without islamic-umalqura
        // @ts-expect-error mocking Intl for fallback test
        Intl.DateTimeFormat = function () {
          throw new Error("Intl not supported");
        };
      });

      afterEach(() => {
        Intl.DateTimeFormat = originalDateTimeFormat;
      });

      it("detects Ramadan via table (2026-02-18)", () => {
        const state = getRamadanState(new Date("2026-02-18"));
        expect(state.isRamadan).toBe(true);
        expect(state.occasion).toBe("ramadan");
        expect(state.hijriYear).toBe(1447);
        expect(state.dayNumber).toBe(1);
      });

      it("detects Eid Al-Fitr Day 1 via table (2026-03-20)", () => {
        const state = getRamadanState(new Date("2026-03-20"));
        expect(state.occasion).toBe("eid-fitr");
        expect(state.isEid).toBe(true);
        expect(state.isRamadan).toBe(false);
        expect(state.hijriYear).toBe(1447);
        expect(state.hijriMonth).toBe(10);
        expect(state.hijriDay).toBe(1);
        expect(state.dayNumber).toBe(1);
      });

      it("detects Eid Al-Fitr Day 2 via table (2026-03-21)", () => {
        const state = getRamadanState(new Date("2026-03-21"));
        expect(state.occasion).toBe("eid-fitr");
        expect(state.isEid).toBe(true);
        expect(state.hijriYear).toBe(1447);
        expect(state.hijriMonth).toBe(10);
        expect(state.hijriDay).toBe(2);
        expect(state.dayNumber).toBe(2);
      });

      it("detects Eid Al-Adha Day 1 via table (2026-05-27)", () => {
        const state = getRamadanState(new Date("2026-05-27"));
        expect(state.occasion).toBe("eid-adha");
        expect(state.isEid).toBe(true);
        expect(state.isRamadan).toBe(false);
        expect(state.hijriYear).toBe(1447);
        expect(state.hijriMonth).toBe(12);
        expect(state.hijriDay).toBe(10);
        expect(state.dayNumber).toBe(1);
      });

      it("detects Eid Al-Adha Day 4 via table (2026-05-30)", () => {
        const state = getRamadanState(new Date("2026-05-30"));
        expect(state.occasion).toBe("eid-adha");
        expect(state.isEid).toBe(true);
        expect(state.hijriYear).toBe(1447);
        expect(state.hijriMonth).toBe(12);
        expect(state.hijriDay).toBe(13);
        expect(state.dayNumber).toBe(4);
      });

      it("returns none outside holidays via table (2026-01-01)", () => {
        const state = getRamadanState(new Date("2026-01-01"));
        expect(state.occasion).toBe("none");
        expect(state.isEid).toBe(false);
        expect(state.isRamadan).toBe(false);
      });
    });
  });
}

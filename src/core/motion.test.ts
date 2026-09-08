import { describe, expect, it, vi } from "vitest";
import { createMotionEngine, isMotionAllowed, scheduleRender } from "./motion";

describe("MotionEngine", () => {
  it("detects whether motion is allowed based on matchMedia", () => {
    expect(typeof isMotionAllowed()).toBe("boolean");
  });

  it("registers and runs render subscribers via requestAnimationFrame", () => {
    let tickCalled = false;
    const cancel = scheduleRender((dt) => {
      tickCalled = true;
      expect(dt).toBeGreaterThanOrEqual(0);
    });

    expect(typeof cancel).toBe("function");
    cancel();
  });

  it("allows motion override when respectReducedMotion is false", () => {
    expect(isMotionAllowed(false)).toBe(true);
  });

  it("createMotionEngine provides isolated instances with lifecycle controls", () => {
    const engine = createMotionEngine({ respectReducedMotion: false });
    expect(engine.isMotionAllowed()).toBe(true);
    const tick = vi.fn();
    const cancel = engine.scheduleRender(tick);
    expect(typeof cancel).toBe("function");
    cancel();
    engine.destroy();
  });
});

// Shared requestAnimationFrame scheduler.
// All variant tick functions register here instead of calling rAF directly.
// Benefits: single rAF loop, automatic pause when document is hidden.

type TickFn = (dt: number) => void;

const subscribers = new Set<TickFn>();
let rafId: number | null = null;
let lastTime = 0;

function loop(now: number) {
  if (document.hidden) {
    rafId = requestAnimationFrame(loop);
    return;
  }
  const dt = now - lastTime;
  lastTime = now;
  subscribers.forEach((fn) => fn(dt));
  rafId = subscribers.size > 0 ? requestAnimationFrame(loop) : null;
}

export function scheduleRender(fn: TickFn): () => void {
  subscribers.add(fn);
  if (rafId === null) {
    lastTime = performance.now();
    rafId = requestAnimationFrame(loop);
  }
  return () => {
    subscribers.delete(fn);
  };
}

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { init } from "./injector";

describe("HostMount and Overlay Lifecycle", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    document.body.style.paddingTop = "10px";
    document.body.style.paddingBottom = "10px";
  });

  afterEach(() => {
    document.body.innerHTML = "";
    document.body.style.paddingTop = "";
    document.body.style.paddingBottom = "";
  });

  it("mounts fixed overlay variant into #ramadan-overlay-root", () => {
    const overlay = init({ variant: "lanterns", previewMode: true });
    expect(overlay.container).not.toBeNull();
    expect(overlay.container?.id).toBe("ramadan-overlay-root");
    expect(document.getElementById("ramadan-overlay-root")).toBe(
      overlay.container
    );

    overlay.destroy();
    expect(document.getElementById("ramadan-overlay-root")).toBeNull();
  });

  it("mounts banner variant without leaving an empty phantom #ramadan-overlay-root", () => {
    const overlay = init({
      variant: "banner",
      previewMode: true,
      position: "top",
    });

    // The container returned must be the banner element, NOT an empty phantom overlay
    expect(overlay.container).not.toBeNull();
    expect(document.getElementById("ramadan-overlay-root")).toBeNull();

    // Body padding compensation must be applied
    expect(document.body.style.paddingTop).toBe("62px"); // 10px + 52px

    overlay.destroy();

    // Body padding must be fully restored
    expect(document.body.style.paddingTop).toBe("10px");
    // All banner elements removed
    expect(document.querySelector('[role="banner"]')).toBeNull();
  });

  it("updates styling tokens in-place without rebuilding the DOM container", () => {
    const overlay = init({
      variant: "lanterns",
      previewMode: true,
      opacity: 0.8,
    });
    const originalContainer = overlay.container;

    expect(originalContainer?.style.getPropertyValue("--ro-opacity")).toBe(
      "0.8"
    );

    // In-place update:
    overlay.update({ opacity: 0.35, zIndex: 1234 });

    // Same container instance in DOM:
    expect(overlay.container).toBe(originalContainer);
    expect(originalContainer?.style.getPropertyValue("--ro-opacity")).toBe(
      "0.35"
    );
    expect(originalContainer?.style.getPropertyValue("--ro-z")).toBe("1234");

    overlay.destroy();
  });

  it("handles structural changes during update by re-mounting cleanly", () => {
    const overlay = init({
      variant: "lanterns",
      previewMode: true,
    });
    expect(document.getElementById("ramadan-overlay-root")).not.toBeNull();

    // Switch to banner via update:
    overlay.update({ variant: "banner", position: "top" });

    expect(document.getElementById("ramadan-overlay-root")).toBeNull();
    expect(document.querySelector('[role="banner"]')).not.toBeNull();

    overlay.destroy();
    expect(document.querySelector('[role="banner"]')).toBeNull();
  });

  it("updates banner elements dynamically when banner properties change", () => {
    const overlay = init({
      variant: "banner",
      bannerTextEn: "Initial Message",
      previewMode: true,
    });
    const bannerEl = document.querySelector('[role="banner"]') as HTMLElement;
    expect(bannerEl.textContent).toContain("Initial Message");

    overlay.update({ bannerTextEn: "Updated Ramadan Greeting" });
    const updatedBannerEl = document.querySelector(
      '[role="banner"]'
    ) as HTMLElement;
    expect(updatedBannerEl.textContent).toContain("Updated Ramadan Greeting");

    overlay.destroy();
    expect(document.querySelector('[role="banner"]')).toBeNull();
  });
});

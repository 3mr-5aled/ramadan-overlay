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

  it("updates lantern rope styles dynamically during overlay.update()", () => {
    const overlay = init({
      variant: "lanterns",
      ropeStyle: "straight",
      previewMode: true,
    });
    expect(
      overlay.container?.querySelector("svg.ro-lantern-ropes line.ro-rope-path")
    ).not.toBeNull();
    expect(
      overlay.container?.querySelector("svg.ro-lantern-ropes path.ro-rope-path")
    ).toBeNull();

    // Update to u-shaped:
    overlay.update({ ropeStyle: "u-shaped", ropeSag: 25 });
    expect(
      overlay.container?.querySelector("svg.ro-lantern-ropes path.ro-rope-path")
    ).not.toBeNull();

    // Update to dual:
    overlay.update({ ropeStyle: "dual" });
    const paths = overlay.container?.querySelectorAll(
      "svg.ro-lantern-ropes path.ro-rope-path"
    );
    expect(paths?.length).toBe(2);

    overlay.destroy();
  });

  it("reflects data-mobile-side and data-is-side tokens on the overlay container for side positions", () => {
    const overlay = init({
      variant: "lanterns",
      position: "left",
      mobileSideBehavior: "show",
      previewMode: true,
    });

    expect(overlay.container?.getAttribute("data-mobile-side")).toBe("show");
    expect(overlay.container?.getAttribute("data-position")).toBe("left");
    expect(overlay.container?.getAttribute("data-is-side")).toBe("true");

    overlay.destroy();
  });

  it("applies theme custom properties and data-theme to #ramadan-overlay-root", () => {
    const overlay = init({
      variant: "lanterns",
      theme: "midnight",
      previewMode: true,
    });

    const root = overlay.container!;
    expect(root.getAttribute("data-theme")).toBe("midnight");
    expect(root.style.getPropertyValue("--ro-color-1")).toBe("#fbbf24");
    expect(root.style.getPropertyValue("--ro-color-2")).toBe("#e2e8f0");
    expect(root.style.getPropertyValue("--ro-glow")).toBe(
      "rgba(56, 189, 248, 0.55)"
    );
    expect(root.style.getPropertyValue("--ro-ceiling")).toBe("#1e293b");
    expect(root.style.getPropertyValue("--ro-rope")).toBe("#64748b");
    expect(root.style.getPropertyValue("--ro-banner-bg")).toBe(
      "rgba(15, 23, 42, 0.95)"
    );
    expect(root.style.getPropertyValue("--ro-banner-text")).toBe("#f8fafc");
    expect(root.style.getPropertyValue("--ro-banner-icon")).toBe("#fbbf24");
    expect(root.style.getPropertyValue("--ro-countdown-bg")).toBe(
      "rgba(15, 23, 42, 0.95)"
    );
    expect(root.style.getPropertyValue("--ro-countdown-border")).toBe(
      "rgba(56, 189, 248, 0.35)"
    );
    expect(root.style.getPropertyValue("--ro-countdown-gold")).toBe("#fbbf24");

    overlay.destroy();
  });

  it("dynamically hot-swaps theme CSS variables in-place without rebuilding the DOM", () => {
    const overlay = init({
      variant: "lanterns",
      theme: "classic",
      previewMode: true,
    });

    const originalContainer = overlay.container;
    expect(originalContainer?.getAttribute("data-theme")).toBe("classic");
    expect(originalContainer?.style.getPropertyValue("--ro-color-1")).toBe(
      "#c9a84c"
    );

    // Call setTheme('royal')
    overlay.setTheme("royal");

    // Same container in DOM:
    expect(overlay.container).toBe(originalContainer);
    expect(originalContainer?.getAttribute("data-theme")).toBe("royal");
    expect(originalContainer?.style.getPropertyValue("--ro-color-1")).toBe(
      "#fcd34d"
    );
    expect(originalContainer?.style.getPropertyValue("--ro-ceiling")).toBe(
      "#4c1d95"
    );
    expect(originalContainer?.style.getPropertyValue("--ro-glow")).toBe(
      "rgba(167, 139, 250, 0.55)"
    );

    overlay.destroy();
  });
});

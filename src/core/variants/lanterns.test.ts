import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { init } from "../injector";

describe("Advanced Lantern String Styles - Config Resolution", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    document.getElementById("ramadan-overlay-styles")?.remove();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    document.getElementById("ramadan-overlay-styles")?.remove();
  });

  it("resolves default ropeStyle to 'straight' and ropeSag to 20", () => {
    const overlay = init({ previewMode: true });
    expect(overlay.config.ropeStyle).toBe("straight");
    expect(overlay.config.ropeSag).toBe(20);
    overlay.destroy();
  });

  it("resolves explicit ropeStyle 'u-shaped' and custom ropeSag", () => {
    const overlay = init({
      previewMode: true,
      ropeStyle: "u-shaped",
      ropeSag: 35,
    });
    expect(overlay.config.ropeStyle).toBe("u-shaped");
    expect(overlay.config.ropeSag).toBe(35);
    overlay.destroy();
  });

  it("resolves explicit ropeStyle 'dual'", () => {
    const overlay = init({
      previewMode: true,
      ropeStyle: "dual",
    });
    expect(overlay.config.ropeStyle).toBe("dual");
    expect(overlay.config.ropeSag).toBe(20);
    overlay.destroy();
  });

  it("clamps ropeSag to minimum 6 and maximum 60", () => {
    const overlayTooLow = init({
      previewMode: true,
      ropeSag: 2,
    });
    expect(overlayTooLow.config.ropeSag).toBe(6);
    overlayTooLow.destroy();

    const overlayTooHigh = init({
      previewMode: true,
      ropeSag: 120,
    });
    expect(overlayTooHigh.config.ropeSag).toBe(60);
    overlayTooHigh.destroy();
  });

  it("injects advanced rope stylesheet rules into document head", () => {
    const overlay = init({ previewMode: true });
    const styles = Array.from(document.querySelectorAll("style"))
      .map((s) => s.textContent || "")
      .join("\n");
    expect(styles).toContain(".ro-lantern-ropes");
    expect(styles).toContain(".ro-rope-path");
    expect(styles).toContain(".ro-dropline-path");
    overlay.destroy();
  });
});

describe("Advanced Lantern String Styles - SVG Overlay Rendering", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    document.getElementById("ramadan-overlay-styles")?.remove();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    document.getElementById("ramadan-overlay-styles")?.remove();
  });

  it("renders straight baseline with SVG ceiling line and droplines", () => {
    const overlay = init({
      variant: "lanterns",
      ropeStyle: "straight",
      previewMode: true,
    });
    const svg = overlay.container?.querySelector("svg.ro-lantern-ropes");
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute("aria-hidden")).toBe("true");

    const ceilingLine = svg?.querySelector("line[x1='0']");
    expect(ceilingLine).not.toBeNull();
    expect(ceilingLine?.getAttribute("stroke")).toBe("var(--ro-ceiling)");

    const droplines = svg?.querySelectorAll("line.ro-dropline-path");
    expect(droplines?.length).toBeGreaterThan(0);
    droplines?.forEach((drop) => {
      expect(drop.getAttribute("stroke")).toBe("var(--ro-rope)");
      expect(drop.getAttribute("y1")).toBe("2");
    });

    const lanterns = overlay.container?.querySelectorAll(".ro-lantern");
    expect(lanterns?.length).toBe(droplines?.length);

    overlay.destroy();
    expect(document.querySelector("svg.ro-lantern-ropes")).toBeNull();
  });

  it("renders u-shaped ropeStyle with multi-scallop Quadratic Bézier curve and droplines", () => {
    const overlay = init({
      variant: "lanterns",
      ropeStyle: "u-shaped",
      ropeSag: 20,
      previewMode: true,
    });
    const svg = overlay.container?.querySelector("svg.ro-lantern-ropes");
    expect(svg).not.toBeNull();

    const ropePath = svg?.querySelector("path.ro-rope-path");
    expect(ropePath).not.toBeNull();
    expect(ropePath?.getAttribute("stroke")).toBe("var(--ro-ceiling)");
    const d = ropePath?.getAttribute("d") || "";
    expect(d).toContain("M 0 4");
    expect(d).toContain("Q ");

    // For N lanterns, there are (N - 1) internal spans + 1 lead-in + 1 lead-out = N + 1 Q commands
    const lanterns = overlay.container?.querySelectorAll(".ro-lantern");
    const N = lanterns?.length || 0;
    const qCount = (d.match(/Q\s+/g) || []).length;
    expect(qCount).toBe(N + 1);

    // Droplines should anchor at yTop = 4
    const droplines = svg?.querySelectorAll("line.ro-dropline-path");
    expect(droplines?.length).toBe(N);
    droplines?.forEach((drop) => {
      expect(drop.getAttribute("y1")).toBe("4");
      expect(drop.getAttribute("stroke")).toBe("var(--ro-rope)");
    });

    overlay.destroy();
  });

  it("renders dual ropeStyle with primary and secondary catenary paths", () => {
    const overlay = init({
      variant: "lanterns",
      ropeStyle: "dual",
      previewMode: true,
    });
    const svg = overlay.container?.querySelector("svg.ro-lantern-ropes");
    expect(svg).not.toBeNull();

    const ropePaths = svg?.querySelectorAll("path.ro-rope-path");
    expect(ropePaths?.length).toBe(2);

    const primaryCable = ropePaths?.[0];
    const secondaryCable = ropePaths?.[1];

    expect(primaryCable?.getAttribute("d")).toContain("M 0 2");
    expect(primaryCable?.getAttribute("stroke-opacity")).toBe("0.85");

    expect(secondaryCable?.getAttribute("d")).toContain("M 0 16"); // 2 + 14 deltaY
    expect(secondaryCable?.getAttribute("stroke-opacity")).toBe("0.65");

    // Droplines should extend from primary cable (y1 = 2) through secondary cable to fixture
    const droplines = svg?.querySelectorAll("line.ro-dropline-path");
    droplines?.forEach((drop) => {
      expect(drop.getAttribute("y1")).toBe("2");
      // y2 should be yTop2 + dropline (16 + 28 = 44)
      expect(Number(drop.getAttribute("y2"))).toBe(44);
    });

    overlay.destroy();
  });

  it("applies custom ropeSag to Bézier curve control points", () => {
    const overlay = init({
      variant: "lanterns",
      ropeStyle: "u-shaped",
      ropeSag: 35,
      previewMode: true,
    });
    const svg = overlay.container?.querySelector("svg.ro-lantern-ropes");
    const ropePath = svg?.querySelector("path.ro-rope-path");
    const d = ropePath?.getAttribute("d") || "";

    // Internal span control point yc = yTop + 2 * S = 4 + 2 * 35 = 74
    expect(d).toContain(" 74.0");

    overlay.destroy();
  });

  it("gracefully falls back to vertical spine on side positions without curved horizontal SVG overlay", () => {
    const overlay = init({
      variant: "lanterns",
      position: "left",
      ropeStyle: "u-shaped",
      previewMode: true,
    });

    expect(overlay.container?.querySelector("svg.ro-lantern-ropes")).toBeNull();
    const spine = overlay.container?.querySelector(".ro-lantern-spine");
    expect(spine).not.toBeNull();
    const sideUnits = overlay.container?.querySelectorAll(".ro-lantern-unit");
    expect(sideUnits?.length).toBeGreaterThan(0);

    overlay.destroy();
  });

  it("updates coordinates on window resize without errors", () => {
    const overlay = init({
      variant: "lanterns",
      ropeStyle: "u-shaped",
      previewMode: true,
    });

    // Simulate resize event
    window.dispatchEvent(new Event("resize"));

    const svg = overlay.container?.querySelector("svg.ro-lantern-ropes");
    expect(svg).not.toBeNull();
    const lanterns = overlay.container?.querySelectorAll(".ro-lantern");
    expect(lanterns?.length).toBeGreaterThan(0);

    overlay.destroy();
  });

  it("scales ropeSag down on compact screens (<600px)", () => {
    const originalWidth = window.innerWidth;
    try {
      // Set compact screen width (400px)
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 400,
      });

      const overlay = init({
        variant: "lanterns",
        ropeStyle: "u-shaped",
        ropeSag: 30,
        previewMode: true,
      });

      const svg = overlay.container?.querySelector("svg.ro-lantern-ropes");
      const path = svg?.querySelector("path.ro-rope-path");
      const d = path?.getAttribute("d") || "";

      // With W = 400, sag = Math.round(30 * (400 / 600)) = 20
      // Control point yc = yTop + 2 * S = 4 + 2 * 20 = 44
      expect(d).toContain(" 44.0");

      overlay.destroy();
    } finally {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: originalWidth,
      });
    }
  });

  it("adds ro-rope-path class to straight ceiling line for non-scaling stroke", () => {
    const overlay = init({
      variant: "lanterns",
      ropeStyle: "straight",
      previewMode: true,
    });

    const svg = overlay.container?.querySelector("svg.ro-lantern-ropes");
    const ceilingLine = svg?.querySelector("line[x1='0']");
    expect(ceilingLine?.getAttribute("class")).toBe("ro-rope-path");

    overlay.destroy();
  });

  it("renders crisp silhouette fill without yellow flame radialGradient", () => {
    const overlay = init({
      variant: "lanterns",
      previewMode: true,
      colors: ["#123456"],
    });

    const lantern = overlay.container?.querySelector(".ro-lantern svg");
    expect(lantern).not.toBeNull();
    const svgHtml = lantern?.outerHTML || "";

    // Radial gradient flame with yellow stop should be completely absent
    expect(svgHtml).not.toContain("radialGradient");
    expect(svgHtml).not.toContain("#fde047");
    expect(svgHtml).not.toContain("#fffbe8");

    // Inner group or paths should use clean solid color
    expect(svgHtml).toContain('fill="#123456"');

    overlay.destroy();
  });

  it("renders a tasteful, fewer decorative count by default (2-6 lanterns)", () => {
    const overlay = init({
      variant: "lanterns",
      previewMode: true,
    });

    const lanterns = overlay.container?.querySelectorAll(".ro-lantern");
    expect(lanterns?.length).toBeGreaterThanOrEqual(2);
    expect(lanterns?.length).toBeLessThanOrEqual(6);

    overlay.destroy();
  });

  it("supports explicit lanternCount configuration", () => {
    const overlay = init({
      variant: "lanterns",
      lanternCount: 3,
      previewMode: true,
    });

    const lanterns = overlay.container?.querySelectorAll(".ro-lantern");
    expect(lanterns?.length).toBe(3);

    const droplines = overlay.container?.querySelectorAll(".ro-dropline-path");
    expect(droplines?.length).toBe(3);

    overlay.destroy();
  });

  it("adjusts decorative count based on density preset", () => {
    const overlayLow = init({
      variant: "lanterns",
      density: "low",
      previewMode: true,
    });
    const lowCount =
      overlayLow.container?.querySelectorAll(".ro-lantern").length ?? 0;
    overlayLow.destroy();

    const overlayHigh = init({
      variant: "lanterns",
      density: "high",
      previewMode: true,
    });
    const highCount =
      overlayHigh.container?.querySelectorAll(".ro-lantern").length ?? 0;
    overlayHigh.destroy();

    expect(lowCount).toBeLessThanOrEqual(highCount);
  });
});

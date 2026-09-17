import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { init } from "./injector";
import { calculateMotifCoords } from "./host";

describe("Content Safe Zone and Layer Stacking", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Configuration & Resolution Seam", () => {
    it("defaults clearance to 'edges' for crescent-stars and eid variants", () => {
      const variants = [
        "crescent-stars",
        "eid",
        "eid-fitr",
        "eid-adha",
      ] as const;

      for (const variant of variants) {
        const overlay = init({
          previewMode: true,
          variant,
        });

        expect(overlay.config.clearance).toBe("edges");
        overlay.destroy();
      }
    });

    it("defaults clearance to 'full' for sparkles and fixed variants", () => {
      const overlaySparkles = init({
        previewMode: true,
        variant: "sparkles",
      });
      expect(overlaySparkles.config.clearance).toBe("full");
      overlaySparkles.destroy();

      const overlayLanterns = init({
        previewMode: true,
        variant: "lanterns",
      });
      expect(overlayLanterns.config.clearance).toBe("full");
      overlayLanterns.destroy();
    });

    it("respects explicit clearance override", () => {
      const overlay = init({
        previewMode: true,
        variant: "crescent-stars",
        clearance: "full",
      });
      expect(overlay.config.clearance).toBe("full");
      overlay.destroy();
    });

    it("defaults layer to 'foreground'", () => {
      const overlay = init({
        previewMode: true,
        variant: "crescent-stars",
      });
      expect(overlay.config.layer).toBe("foreground");
      expect(overlay.container?.style.getPropertyValue("--ro-z")).toBe("9999");
      expect(
        overlay.container?.classList.contains("ro-layer--background")
      ).toBe(false);
      overlay.destroy();
    });

    it("supports layer: 'background' setting z-index to -1 and adding background class", () => {
      const overlay = init({
        previewMode: true,
        variant: "crescent-stars",
        layer: "background",
      });
      expect(overlay.config.layer).toBe("background");
      expect(overlay.container?.style.getPropertyValue("--ro-z")).toBe("-1");
      expect(
        overlay.container?.classList.contains("ro-layer--background")
      ).toBe(true);
      overlay.destroy();
    });

    it("mounts inside custom mountTarget element when specified as selector or HTMLElement", () => {
      const hostDiv = document.createElement("div");
      hostDiv.id = "hero-section";
      document.body.appendChild(hostDiv);

      const overlaySelector = init({
        previewMode: true,
        mountTarget: "#hero-section",
      });
      expect(overlaySelector.container?.parentElement).toBe(hostDiv);
      expect(
        overlaySelector.container?.classList.contains("ro-scoped-host")
      ).toBe(true);
      overlaySelector.destroy();

      const overlayElement = init({
        previewMode: true,
        mountTarget: hostDiv,
      });
      expect(overlayElement.container?.parentElement).toBe(hostDiv);
      expect(
        overlayElement.container?.classList.contains("ro-scoped-host")
      ).toBe(true);
      overlayElement.destroy();

      hostDiv.remove();
    });

    it("defaults to full-screen overlay above all when attachTo is omitted", () => {
      const overlay = init({
        previewMode: true,
      });
      expect(overlay.container?.parentElement).toBe(document.body);
      expect(overlay.container?.classList.contains("ro-scoped-host")).toBe(
        false
      );
      expect(overlay.container?.classList.contains("ro-attached")).toBe(false);
      overlay.destroy();
    });

    it("attaches to target element via attachTo selector or class name with attachEdge", () => {
      const header = document.createElement("header");
      header.className = "site-header";
      document.body.appendChild(header);

      // Selector with leading dot
      const overlaySelector = init({
        previewMode: true,
        attachTo: ".site-header",
        attachEdge: "bottom",
      });
      expect(overlaySelector.container?.parentElement).toBe(header);
      expect(
        overlaySelector.container?.classList.contains("ro-scoped-host")
      ).toBe(true);
      expect(overlaySelector.container?.classList.contains("ro-attached")).toBe(
        true
      );
      expect(
        overlaySelector.container?.classList.contains("ro-attached--bottom")
      ).toBe(true);
      overlaySelector.destroy();

      // Plain class name without dot
      const overlayClass = init({
        previewMode: true,
        attachTo: "site-header",
        attachEdge: "top",
      });
      expect(overlayClass.container?.parentElement).toBe(header);
      expect(
        overlayClass.container?.classList.contains("ro-attached--top")
      ).toBe(true);
      overlayClass.destroy();

      header.remove();
    });

    it("reactively updates attachment target when attachTo is updated dynamically", () => {
      const headerA = document.createElement("header");
      headerA.id = "header-a";
      const headerB = document.createElement("header");
      headerB.id = "header-b";
      document.body.appendChild(headerA);
      document.body.appendChild(headerB);

      const overlay = init({
        previewMode: true,
        attachTo: "#header-a",
      });
      expect(overlay.container?.parentElement).toBe(headerA);

      overlay.update({ attachTo: "#header-b" });
      expect(overlay.container?.parentElement).toBe(headerB);

      overlay.destroy();
      headerA.remove();
      headerB.remove();
    });
  });

  describe("Coordinate Calculation Seam", () => {
    it("constrains coordinates to peripheral gutters when clearance is 'edges' (desktop)", () => {
      for (let i = 0; i < 50; i++) {
        const { x, y } = calculateMotifCoords("both", "edges", false);
        const inLeftGutter = x >= 2 && x <= 18;
        const inRightGutter = x >= 82 && x <= 98;

        expect(inLeftGutter || inRightGutter).toBe(true);
        expect(x > 18 && x < 82).toBe(false); // Sterile central corridor
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThanOrEqual(95);
      }
    });

    it("allows full-screen scattering when clearance is 'full'", () => {
      let visitedCenter = false;
      for (let i = 0; i < 100; i++) {
        const { x } = calculateMotifCoords("full", "full", false);
        if (x > 20 && x < 80) {
          visitedCenter = true;
          break;
        }
      }
      expect(visitedCenter).toBe(true);
    });

    it("splits vertical distribution into upper and lower quadrants on mobile", () => {
      for (let i = 0; i < 50; i++) {
        const { y } = calculateMotifCoords("both", "edges", true);
        const inUpper = y >= 2 && y <= 22;
        const inLower = y >= 78 && y <= 96;

        expect(inUpper || inLower).toBe(true);
        expect(y > 22 && y < 78).toBe(false); // Sterile mid-screen corridor on mobile
      }
    });
  });

  describe("DOM Motif Generation & Safe Zone Integration Seam", () => {
    it("keeps central 64% corridor sterile in crescent-stars variant by default", () => {
      const overlay = init({
        previewMode: true,
        variant: "crescent-stars",
      });

      const container = overlay.container!;
      const motifs = Array.from(container.children).filter(
        (el) =>
          el.classList.contains("ro-crescent") ||
          el.classList.contains("ro-star")
      ) as HTMLElement[];

      expect(motifs.length).toBeGreaterThan(0);

      for (const motif of motifs) {
        const leftVal = parseFloat(motif.style.left);
        const inLeftGutter = leftVal >= 2 && leftVal <= 18;
        const inRightGutter = leftVal >= 82 && leftVal <= 98;
        expect(inLeftGutter || inRightGutter).toBe(true);
      }

      overlay.destroy();
    });

    it("keeps central 64% corridor sterile in eid variants by default", () => {
      const overlay = init({
        previewMode: true,
        variant: "eid",
      });

      const container = overlay.container!;
      const motifs = Array.from(container.children).filter((el) =>
        ["ro-balloon", "ro-gift", "ro-star", "ro-sheep", "ro-crescent"].some(
          (cls) => el.classList.contains(cls)
        )
      ) as HTMLElement[];

      expect(motifs.length).toBeGreaterThan(0);

      for (const motif of motifs) {
        const leftVal = parseFloat(motif.style.left);
        const inLeftGutter = leftVal >= 2 && leftVal <= 18;
        const inRightGutter = leftVal >= 82 && leftVal <= 98;
        expect(inLeftGutter || inRightGutter).toBe(true);
      }

      overlay.destroy();
    });
  });

  describe("Dynamic Update Seam", () => {
    it("hot-swaps layer from foreground to background reactively", () => {
      const overlay = init({
        previewMode: true,
        variant: "crescent-stars",
        layer: "foreground",
      });

      expect(overlay.container?.style.getPropertyValue("--ro-z")).toBe("9999");
      expect(
        overlay.container?.classList.contains("ro-layer--background")
      ).toBe(false);

      overlay.update({ layer: "background" });

      expect(overlay.config.layer).toBe("background");
      expect(overlay.container?.style.getPropertyValue("--ro-z")).toBe("-1");
      expect(
        overlay.container?.classList.contains("ro-layer--background")
      ).toBe(true);

      overlay.destroy();
    });

    it("hot-swaps clearance from edges to full reactively", () => {
      const overlay = init({
        previewMode: true,
        variant: "crescent-stars",
        clearance: "edges",
      });

      expect(overlay.config.clearance).toBe("edges");

      overlay.update({ clearance: "full" });
      expect(overlay.config.clearance).toBe("full");

      overlay.destroy();
    });
  });
});

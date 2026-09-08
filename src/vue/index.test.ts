import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createApp, defineComponent, h, ref, nextTick } from "vue";
import { RamadanOverlay } from "./index";
import type { ThemeOption } from "../types";

describe("Vue RamadanOverlay adapter", () => {
  let appContainer: HTMLDivElement;

  beforeEach(() => {
    appContainer = document.createElement("div");
    document.body.appendChild(appContainer);
  });

  afterEach(() => {
    appContainer.remove();
    document.body.innerHTML = "";
  });

  it("mounts overlay and hot-swaps theme reactively via props", async () => {
    const theme = ref<ThemeOption>("classic");

    const TestHost = defineComponent({
      setup() {
        return () =>
          h(RamadanOverlay, { previewMode: true, theme: theme.value });
      },
    });

    const app = createApp(TestHost);
    app.mount(appContainer);
    await nextTick();

    const root = document.getElementById("ramadan-overlay-root");
    expect(root).not.toBeNull();
    expect(root?.getAttribute("data-theme")).toBe("classic");

    // Change reactive prop
    theme.value = "royal";
    await nextTick();

    expect(root?.getAttribute("data-theme")).toBe("royal");
    expect(root?.style.getPropertyValue("--ro-color-1")).toBe("#fcd34d");

    app.unmount();
    expect(document.getElementById("ramadan-overlay-root")).toBeNull();
  });
});

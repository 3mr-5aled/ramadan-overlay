const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.resolve(__dirname, "../assets/previews");
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const BUNDLE_PATH = path.resolve(__dirname, "../dist/ramadan-overlay.min.js");
const bundleJs = fs.readFileSync(BUNDLE_PATH, "utf8");

const VARIANTS = [
  {
    name: "lanterns",
    config: {
      variant: "lanterns",
      previewMode: true,
      theme: "classic",
      ropeStyle: "u-shaped",
      ropeSag: 22,
      shadows: "soft",
    },
    waitMs: 1200,
  },
  {
    name: "sparkles",
    config: {
      variant: "sparkles",
      previewMode: true,
      theme: "classic",
      density: "high",
    },
    waitMs: 1200,
  },
  {
    name: "crescent-stars",
    config: {
      variant: "crescent-stars",
      previewMode: true,
      theme: "classic",
      clearance: "edges",
      shadows: "soft",
    },
    waitMs: 3500, // wait for shapes to ascend into viewport
  },
  {
    name: "geometric",
    config: {
      variant: "geometric",
      previewMode: true,
      theme: "classic",
      position: "both",
    },
    waitMs: 1200,
  },
  {
    name: "eid-fitr",
    config: {
      variant: "eid-fitr",
      previewMode: true,
      theme: "classic",
      clearance: "edges",
      shadows: "soft",
    },
    waitMs: 3500,
  },
  {
    name: "eid-adha",
    config: {
      variant: "eid-adha",
      previewMode: true,
      theme: "emerald",
      clearance: "edges",
      shadows: "soft",
    },
    waitMs: 3500,
  },
  {
    name: "banner",
    config: {
      variant: "banner",
      previewMode: true,
      theme: "classic",
      position: "top",
      bannerTextEn:
        "Ramadan Mubarak — Wishing you peace, health, and prosperity",
    },
    waitMs: 1200,
  },
  {
    name: "countdown",
    config: {
      variant: "lanterns",
      previewMode: true,
      theme: "classic",
      ropeStyle: "straight",
      countdown: {
        iftarTime: "18:45",
        alertWindowMinutes: 60,
        minimizable: true,
        position: "bottom-right",
      },
    },
    waitMs: 1500,
  },
];

function getHtmlContent(config) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Preview</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: radial-gradient(circle at 50% 0%, #171d31 0%, #0b0f19 75%);
      color: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
      min-height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .mock-content {
      text-align: center;
      max-width: 620px;
      padding: 2.5rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(201, 168, 76, 0.18);
      border-radius: 16px;
      backdrop-filter: blur(12px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      z-index: 10;
      position: relative;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      background: rgba(201, 168, 76, 0.15);
      color: #e8c96b;
      border: 1px solid rgba(201, 168, 76, 0.3);
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      background: linear-gradient(135deg, #fff, #e8c96b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.75rem;
      letter-spacing: -0.02em;
    }
    p {
      color: #94a3b8;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .btn-group {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
    }
    .btn {
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
    }
    .btn-primary {
      background: #c9a84c;
      color: #0b0f19;
      font-weight: 600;
      border: none;
    }
    .btn-outline {
      background: transparent;
      color: #e2e8f0;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
  </style>
</head>
<body>
  <div class="mock-content">
    <div class="badge">🌙 Blessed Celebrations</div>
    <h1>Ramadan &amp; Eid Mubarak</h1>
    <p>A lightweight, framework-agnostic overlay injecting festive Islamic holiday decorations into modern web applications.</p>
    <div class="btn-group">
      <span class="btn btn-primary">Get Started</span>
      <span class="btn btn-outline">Explore Styles</span>
    </div>
  </div>

  <script>${bundleJs}</script>
  <script>
    window.__overlay = RamadanOverlay.init(${JSON.stringify(config)});
  </script>
</body>
</html>`;
}

(async () => {
  console.log("Launching headless Chromium for variant previews...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 900, height: 500 },
    deviceScaleFactor: 2, // crisp high-DPI retina screenshots
  });

  for (const item of VARIANTS) {
    console.log(`Capturing preview: ${item.name}...`);
    await page.setContent(getHtmlContent(item.config), { waitUntil: "load" });
    await page.waitForTimeout(item.waitMs);

    const outPath = path.join(OUTPUT_DIR, `${item.name}.png`);
    await page.screenshot({ path: outPath, type: "png" });
    console.log(`✓ Saved ${outPath}`);
  }

  await browser.close();
  console.log("All variant previews captured successfully!");
})();

const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist-demo");
const rootIndex = path.resolve(rootDir, "index.html");
const legacyIndex = path.resolve(rootDir, "index.legacy.html");
const rootAssets = path.resolve(rootDir, "assets");
const distAssets = path.resolve(distDir, "assets");

// 1. Preserve legacy index.html if not already backed up
if (fs.existsSync(rootIndex) && !fs.existsSync(legacyIndex)) {
  fs.copyFileSync(rootIndex, legacyIndex);
  console.log("Backed up legacy index.html to index.legacy.html");
}

// 2. Copy built assets to root assets/
if (fs.existsSync(distAssets)) {
  const files = fs.readdirSync(distAssets);
  for (const file of files) {
    fs.copyFileSync(
      path.resolve(distAssets, file),
      path.resolve(rootAssets, file)
    );
    console.log(`Copied ${file} to assets/`);
  }
}

// 3. Copy dist-demo/index.html to root index.html
if (fs.existsSync(path.resolve(distDir, "index.html"))) {
  fs.copyFileSync(path.resolve(distDir, "index.html"), rootIndex);
  console.log("Updated root index.html with new Arabic React demo build.");
}

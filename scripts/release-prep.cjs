#!/usr/bin/env node

/**
 * release-prep.cjs
 * Local release preparation and tag validation utility for ramadan-overlay.
 *
 * Usage:
 *   node scripts/release-prep.cjs [--bump <patch|minor|major|x.y.z>] [--dry-run] [--tag]
 *   node scripts/release-prep.cjs --validate-tag <tag>
 */

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");
const readline = require("node:readline");

const ROOT_DIR = path.resolve(__dirname, "..");
const PACKAGE_JSON_PATH = path.resolve(ROOT_DIR, "package.json");

/**
 * Format a git release tag from semver version.
 * @param {string} version
 * @returns {string}
 */
function formatReleaseTag(version) {
  return `v${String(version).trim()}`;
}

/**
 * Validate that an annotated git tag matches package.json version.
 * @param {string} tag e.g. "v0.8.0"
 * @param {string} version e.g. "0.8.0"
 * @returns {boolean}
 */
function validateTagMatchesVersion(tag, version) {
  if (!tag || !version) return false;
  const trimmedTag = String(tag).trim();
  const trimmedVersion = String(version).trim();
  if (!trimmedTag.startsWith("v")) return false;
  return trimmedTag.slice(1) === trimmedVersion;
}

/**
 * Strategy map for standard semver increments.
 */
const BUMP_STRATEGIES = {
  patch: (major, minor, patch) => `${major}.${minor}.${patch + 1}`,
  minor: (major, minor) => `${major}.${minor + 1}.0`,
  major: (major) => `${major + 1}.0.0`,
};

/**
 * Calculate the next semantic version.
 * @param {string} currentVersion e.g. "0.7.0"
 * @param {string} bumpType "patch" | "minor" | "major" | explicit "x.y.z"
 * @returns {string}
 */
function calculateNextVersion(currentVersion, bumpType) {
  const semverRegex = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/;
  const currentMatch = String(currentVersion).trim().match(semverRegex);

  if (!currentMatch) {
    throw new Error(`Invalid current version: "${currentVersion}"`);
  }

  const major = parseInt(currentMatch[1], 10);
  const minor = parseInt(currentMatch[2], 10);
  const patch = parseInt(currentMatch[3], 10);

  const normalizedBump = String(bumpType).trim().toLowerCase();

  if (BUMP_STRATEGIES[normalizedBump]) {
    return BUMP_STRATEGIES[normalizedBump](major, minor, patch);
  }

  // Explicit version check
  const explicitMatch = String(bumpType).trim().match(semverRegex);
  if (!explicitMatch) {
    throw new Error(
      `Invalid bump type or version: "${bumpType}". Must be 'patch', 'minor', 'major', or a valid semver string.`
    );
  }

  const explicitVersion = String(bumpType).trim();
  if (explicitVersion === currentVersion.trim()) {
    throw new Error(
      `New version (${explicitVersion}) must differ from current version (${currentVersion}).`
    );
  }

  return explicitVersion;
}

/**
 * Remove GIT_* environment variables that may leak from git hooks or parent git processes.
 */
function getCleanGitEnv() {
  const cleanEnv = { ...process.env };
  for (const key of Object.keys(cleanEnv)) {
    if (key.startsWith("GIT_")) {
      delete cleanEnv[key];
    }
  }
  return cleanEnv;
}

/**
 * Check if the git working tree is clean.
 * @param {string} [dir]
 * @returns {boolean}
 */
function checkGitClean(dir = ROOT_DIR) {
  try {
    const status = execSync("git status --porcelain", {
      cwd: dir,
      encoding: "utf-8",
      env: getCleanGitEnv(),
    });
    return status.trim().length === 0;
  } catch {
    return false;
  }
}

/**
 * Interactive prompt helper.
 */
function promptUser(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    })
  );
}

/**
 * CLI Runner.
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
Usage: release-prep [options]

Options:
  --bump <type>           Bump type: 'patch', 'minor', 'major', or explicit 'x.y.z'
  --dry-run               Simulate the release preparation without modifying files or git
  --tag                   Automatically stage, commit, and create git tag
  --validate-tag <tag>    Validate that the given tag matches package.json version and exit
  --help, -h              Display this help message
`);
    process.exit(0);
  }

  // 1. Tag validation sub-command (used by CI release workflow)
  const validateTagIdx = args.indexOf("--validate-tag");
  if (validateTagIdx !== -1) {
    const targetTag = args[validateTagIdx + 1];
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf-8"));
    const matches = validateTagMatchesVersion(targetTag, pkg.version);
    if (!matches) {
      console.error(
        `::error::Tag "${targetTag}" does not match package.json version "${pkg.version}"!`
      );
      process.exit(1);
    }
    console.log(
      `✅ Tag "${targetTag}" matches package.json version "${pkg.version}".`
    );
    process.exit(0);
  }

  const isDryRun = args.includes("--dry-run");
  const autoTag = args.includes("--tag");

  let bumpArg = null;
  const bumpIndex = args.indexOf("--bump");
  if (bumpIndex !== -1 && args[bumpIndex + 1]) {
    bumpArg = args[bumpIndex + 1];
  }

  console.log("\n🌙 [ramadan-overlay] Release Preparation Utility");
  if (isDryRun) {
    console.log(
      "⚡ [DRY RUN] No files will be modified and no tags created.\n"
    );
  }

  const pkgContent = fs.readFileSync(PACKAGE_JSON_PATH, "utf-8");
  const pkg = JSON.parse(pkgContent);
  const currentVersion = pkg.version;
  console.log(`📦 Current Package Version: ${currentVersion}`);

  // 2. Check git status
  if (!isDryRun && !checkGitClean()) {
    console.error(
      "❌ Git working tree contains uncommitted or unstaged changes. Please commit or stash before releasing."
    );
    process.exit(1);
  }

  // 3. Determine target version
  let targetVersion;
  if (bumpArg) {
    targetVersion = calculateNextVersion(currentVersion, bumpArg);
  } else {
    console.log("\nSelect release bump:");
    console.log(
      `  1) patch -> ${calculateNextVersion(currentVersion, "patch")}`
    );
    console.log(
      `  2) minor -> ${calculateNextVersion(currentVersion, "minor")}`
    );
    console.log(
      `  3) major -> ${calculateNextVersion(currentVersion, "major")}`
    );
    const answer = await promptUser("Enter 1, 2, 3, or explicit version: ");
    const choiceMap = {
      1: "patch",
      2: "minor",
      3: "major",
    };
    const resolvedBump = choiceMap[answer] || answer;
    if (resolvedBump) {
      targetVersion = calculateNextVersion(currentVersion, resolvedBump);
    } else {
      console.log("Aborted.");
      process.exit(1);
    }
  }

  const targetTag = formatReleaseTag(targetVersion);
  console.log(`🎯 Target Version: ${targetVersion} (Tag: ${targetTag})`);

  // 4. Pre-flight verification (lint, typecheck, test)
  const skipVerification = args.includes("--skip-verification");
  if (!skipVerification) {
    console.log("\n🔍 Running verification gates (lint, typecheck, test)...");
    try {
      execSync("npm run lint", { cwd: ROOT_DIR, stdio: "inherit" });
      execSync("npm run typecheck", { cwd: ROOT_DIR, stdio: "inherit" });
      execSync("npm run test", { cwd: ROOT_DIR, stdio: "inherit" });
      console.log("✅ All verification gates passed.");
    } catch {
      console.error("❌ Pre-flight checks failed. Release aborted.");
      process.exit(1);
    }
  } else {
    console.log("⏭️  Skipping verification gates (--skip-verification).");
  }

  // 5. Update package.json
  if (!isDryRun) {
    pkg.version = targetVersion;
    fs.writeFileSync(
      PACKAGE_JSON_PATH,
      JSON.stringify(pkg, null, 2) + "\n",
      "utf-8"
    );
    console.log(`\n✏️  Updated package.json to version ${targetVersion}`);

    if (autoTag) {
      console.log(`\n🏷️  Staging, committing, and tagging ${targetTag}...`);
      execSync(`git add package.json`, { cwd: ROOT_DIR, stdio: "inherit" });
      execSync(`git commit -m "chore: release ${targetTag}"`, {
        cwd: ROOT_DIR,
        stdio: "inherit",
      });
      execSync(`git tag -a ${targetTag} -m "Release ${targetTag}"`, {
        cwd: ROOT_DIR,
        stdio: "inherit",
      });
      console.log(`✅ Successfully created git tag ${targetTag}.`);
    }
  } else {
    console.log(
      `\n[DRY RUN] Would update package.json version to ${targetVersion}`
    );
    if (autoTag) {
      console.log(`[DRY RUN] Would create git tag ${targetTag}`);
    }
  }

  // 6. Summary & Next steps
  console.log("\n🎉 Release preparation complete!");
  console.log("\nNext Steps:");
  console.log(
    `  1. Update CHANGELOG.md with release notes for ${targetVersion}`
  );
  if (!autoTag) {
    console.log(
      `  2. Commit changes: git commit -am "chore: release ${targetTag}"`
    );
    console.log(
      `  3. Tag the release: git tag -a ${targetTag} -m "Release ${targetTag}"`
    );
  }
  console.log(
    `  → Push commit & tag: git push origin main && git push origin ${targetTag}`
  );
  console.log(
    `    (Pushing ${targetTag} triggers GitHub Actions to publish to npmjs with provenance)`
  );
}

module.exports = {
  calculateNextVersion,
  validateTagMatchesVersion,
  formatReleaseTag,
  checkGitClean,
  main,
};

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}

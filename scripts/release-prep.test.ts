import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import {
  calculateNextVersion,
  validateTagMatchesVersion,
  formatReleaseTag,
  checkGitClean,
} from "./release-prep.cjs";

describe("release-prep utility", () => {
  const scriptPath = path.resolve(__dirname, "release-prep.cjs");

  describe("calculateNextVersion", () => {
    it("correctly bumps patch version", () => {
      expect(calculateNextVersion("0.7.0", "patch")).toBe("0.7.1");
      expect(calculateNextVersion("1.2.3", "patch")).toBe("1.2.4");
    });

    it("correctly bumps minor version", () => {
      expect(calculateNextVersion("0.7.0", "minor")).toBe("0.8.0");
      expect(calculateNextVersion("1.2.3", "minor")).toBe("1.3.0");
    });

    it("correctly bumps major version", () => {
      expect(calculateNextVersion("0.7.0", "major")).toBe("1.0.0");
      expect(calculateNextVersion("1.2.3", "major")).toBe("2.0.0");
    });

    it("accepts valid explicit semver string", () => {
      expect(calculateNextVersion("0.7.0", "0.8.5")).toBe("0.8.5");
      expect(calculateNextVersion("0.7.0", "1.0.0-rc.1")).toBe("1.0.0-rc.1");
    });

    it("throws on invalid semver or bump type", () => {
      expect(() => calculateNextVersion("0.7.0", "invalid")).toThrow();
      expect(() => calculateNextVersion("invalid", "minor")).toThrow();
      expect(() => calculateNextVersion("0.7.0", "0.7.0")).toThrow();
    });
  });

  describe("formatReleaseTag", () => {
    it("prefixes version with v", () => {
      expect(formatReleaseTag("0.8.0")).toBe("v0.8.0");
      expect(formatReleaseTag("1.0.0")).toBe("v1.0.0");
    });
  });

  describe("validateTagMatchesVersion", () => {
    it("returns true when tag strictly matches package version", () => {
      expect(validateTagMatchesVersion("v0.8.0", "0.8.0")).toBe(true);
      expect(validateTagMatchesVersion("v1.2.3", "1.2.3")).toBe(true);
    });

    it("returns false when version numbers differ", () => {
      expect(validateTagMatchesVersion("v0.8.1", "0.8.0")).toBe(false);
      expect(validateTagMatchesVersion("v0.7.0", "0.8.0")).toBe(false);
    });

    it("returns false when tag lacks 'v' prefix", () => {
      expect(validateTagMatchesVersion("0.8.0", "0.8.0")).toBe(false);
    });
  });

  describe("checkGitClean", () => {
    it("detects dirty state when uncommitted files exist in a git repository", () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "git-clean-test-"));
      try {
        execSync("git init", { cwd: tempDir, stdio: "ignore" });
        execSync("git config user.name 'Test'", {
          cwd: tempDir,
          stdio: "ignore",
        });
        execSync("git config user.email 'test@test.com'", {
          cwd: tempDir,
          stdio: "ignore",
        });

        // Initially clean
        expect(checkGitClean(tempDir)).toBe(true);

        // Add untracked file -> dirty
        fs.writeFileSync(path.join(tempDir, "temp.txt"), "hello");
        expect(checkGitClean(tempDir)).toBe(false);

        // Commit file -> clean again
        execSync("git add . && git commit -m 'initial'", {
          cwd: tempDir,
          stdio: "ignore",
        });
        expect(checkGitClean(tempDir)).toBe(true);
      } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    });
  });

  describe("CLI execution", () => {
    it("prints help and exits cleanly with --help", () => {
      const output = execSync(`node "${scriptPath}" --help`, {
        encoding: "utf-8",
      });
      expect(output).toContain("Usage: release-prep");
      expect(output).toContain("--dry-run");
      expect(output).toContain("--validate-tag");
    });

    it("validates tag successfully with --validate-tag when matching", () => {
      const pkg = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "..", "package.json"), "utf-8")
      );
      const output = execSync(
        `node "${scriptPath}" --validate-tag "v${pkg.version}"`,
        { encoding: "utf-8" }
      );
      expect(output).toContain(`matches package.json version "${pkg.version}"`);
    });

    it("exits with failure code when --validate-tag mismatches", () => {
      expect(() => {
        execSync(`node "${scriptPath}" --validate-tag "v99.99.99"`, {
          encoding: "utf-8",
          stdio: "pipe",
        });
      }).toThrow();
    });

    it("runs in --dry-run mode without modifying package.json", () => {
      const output = execSync(
        `node "${scriptPath}" --dry-run --bump patch --skip-verification`,
        {
          encoding: "utf-8",
        }
      );
      expect(output).toContain("[DRY RUN]");
      expect(output).toContain("Target Version:");
    });
  });
});

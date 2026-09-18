# Implementation Specification: Continuous Integration, Demo Deployment, and Release Workflows

**Feature Issue:** [#49 - [Spec] Continuous Integration, Demo Deployment, and Release Workflows](https://github.com/3mr-5aled/ramadan-overlay/issues/49)  
**Status:** Ready for Implementation (`ready-for-agent`)

---

## Problem Statement

The `ramadan-overlay` repository currently lacks automated Continuous Integration (CI) and Continuous Deployment (CD) pipelines. Pull requests and commits to `main` are not automatically verified across multiple Node.js runtimes.

Furthermore, production releases to the npm registry require manual, error-prone maintainer actions without cryptographic build provenance attestations, and the interactive showcase demo application relies on a legacy script (`demo/sync-to-root.cjs`) that copies compiled web assets directly into the repository root, polluting the Git working tree.

## Solution

Establish a modular, least-privilege GitHub Actions CI/CD infrastructure paired with an interactive local release utility:

1. A multi-LTS CI workflow (`ci.yml`) validating formatting, linting, type safety, test suites, and build artifact creation on every pull request and push to `main`.
2. An automated GitHub Pages deployment workflow (`deploy-demo.yml`) deploying `dist-demo/` directly via official GitHub Actions artifacts upon merge to `main`.
3. A tag-triggered npm release workflow (`release.yml`) with strict tag-to-version validation, npm provenance signing (`--provenance --access public`), and automated GitHub Release asset attachments.
4. A release preparation utility (`scripts/release-prep.cjs`) to ensure clean working trees, semver consistency, and matching tag creation.
5. Deprecation and removal of the legacy `demo/sync-to-root.cjs` script.

## User Stories

1. As a maintainer, I want every pull request automatically tested against Node.js 18, 20, and 22, so that regressions across supported runtimes are caught before merge.
2. As a maintainer, I want stale in-progress CI runs automatically cancelled when new commits are pushed, so that GitHub Actions concurrency minutes are conserved.
3. As a developer, I want `npx prettier --check .`, `npm run lint`, and `npm run typecheck` run in CI, so that style and typing rules are strictly enforced.
4. As a developer, I want both the core library (`npm run build`) and demo showcase (`npm run build:demo`) compiled in CI, so that build failures are identified before release.
5. As a user visiting the documentation or demo site, I want the live showcase automatically updated when code merges to `main`, so that the demo always reflects the latest library features.
6. As a maintainer, I want demo deployments to use `actions/upload-pages-artifact` and `actions/deploy-pages`, so that compiled build bundles do not dirty the root git tree.
7. As a package consumer, I want releases on npmjs to include cryptographic build provenance, so that I can verify packages originate authentically from this GitHub repository.
8. As a maintainer, I want pushing a tag `vX.Y.Z` to automatically build, test, and publish to npmjs, so that releasing does not require manual local registry publishing.
9. As a maintainer, I want the release workflow to fail fast if the git tag does not match `package.json`'s version, so that misaligned or accidental releases are blocked.
10. As a maintainer, I want a GitHub Release created automatically for each tag with release notes and `ramadan-overlay.min.js` attached, so that vanilla HTML and CDN users can easily download the bundle.
11. As a developer, I want a local `npm run release:prep` script that verifies a clean git tree, updates `package.json`, and tags `vX.Y.Z`, so that release preparation is repeatable and error-free.
12. As a contributor, I want the legacy `demo/sync-to-root.cjs` removed from the repository, so that root files (`index.html`, `assets/`) are no longer overwritten during local demo builds.

## Implementation Decisions

- **Modular Workflow Architecture**: Three independent workflow files (`.github/workflows/ci.yml`, `.github/workflows/deploy-demo.yml`, `.github/workflows/release.yml`) rather than a monolithic workflow, upholding the principle of least privilege.
- **Fail-Fast Tag Synchronization**: The release pipeline enforces that `refs/tags/v${VERSION}` strictly equals the `"version"` field in `package.json` before building or publishing.
- **Pure Artifact Demo Build**: `package.json` script `"build:demo"` is modified from `"vite build demo && node demo/sync-to-root.cjs"` to `"vite build demo"`. `demo/sync-to-root.cjs` is deleted.
- **GitHub Pages Configuration**: Deployment relies on GitHub Pages set to "GitHub Actions" source with environment name `github-pages`.
- **npm Publishing Configuration**: Uses `npm publish --provenance --access public` with `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}` and `id-token: write` permission.
- **Local Release Script**: `scripts/release-prep.cjs` provides an interactive/CLI workflow supporting `--dry-run`, ensuring uncommitted changes prevent tagging.

## Testing Decisions

- Testing focuses strictly on externally observable behavior: process exit codes, Git state preservation under dry-run, output directory artifact generation, and version matching validation.
- The release preparation script will be tested for clean/dirty git tree handling and valid semantic version parsing.
- Build targets will be verified by asserting the presence of `dist/` and `dist-demo/` bundle artifacts.
- Testing prior art: Vitest test suites in `src/core/*.test.ts` and `demo/src/**/*.test.tsx`.

## Out of Scope

- Automated changelog generation from conventional commits (maintained manually or via GitHub Release auto-notes).
- Dual-branch GitFlow or `develop` branch setups (trunk-based development on `main` is used).
- Automated pull request merging bots (e.g. Renovate / Dependabot auto-merge).

## Further Notes

- Maintains alignment with ADR 0001 (`docs/adr/0001-development-and-production-workflows.md`).
- Maintainers must add `NPM_TOKEN` to repository secrets and configure repository Settings -> Pages -> Source to "GitHub Actions".

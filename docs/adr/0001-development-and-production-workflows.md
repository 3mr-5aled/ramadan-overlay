# 1. Continuous Integration, Demo Deployment, and Release Workflows

## Context

The repository previously lacked automated CI/CD pipelines, relying on manual tests, local builds, and a script (`demo/sync-to-root.cjs`) that copied compiled demo artifacts into the root directory of the Git working tree. Releases to npm and GitHub Pages had no provenance or automated gating.

## Decision

We establish three dedicated, modular GitHub Actions workflows alongside a local release preparation utility:

1. **Continuous Integration (`ci.yml`)**: Executes on every pull request and push to `main`. Runs code formatting and style verification (`prettier`), typechecking (`tsc`), test execution (`vitest`), library compilation (`tsup`), and demo compilation (`vite build demo`) across Node.js 18, 20, and 22. In-progress runs for stale commits are automatically cancelled.
2. **Interactive Demo Deployment (`deploy-demo.yml`)**: Deploys the interactive demo to GitHub Pages on every merge to `main` using `actions/upload-pages-artifact` and `actions/deploy-pages`. Builds `dist-demo` dynamically in CI without polluting the Git working tree, deprecating `demo/sync-to-root.cjs`.
3. **Automated Release Pipeline (`release.yml`)**: Triggers strictly on annotated Git tags matching `v*`. Enforces a fail-fast validation ensuring the Git tag matches `"version"` in `package.json`. Compiles all library targets, publishes to npmjs with cryptographic build provenance (`--provenance --access public`), and publishes a GitHub Release with the standalone IIFE bundle (`ramadan-overlay.min.js`) attached.
4. **Local Release Preparation Script (`scripts/release-prep.cjs`)**: An interactive pre-release script to ensure a clean working tree, validate semver, bump `package.json`, update `CHANGELOG.md`, and generate the annotated git release tag.

## Considered Options

- **Monolithic Single Workflow**: Rejected to uphold the principle of least privilege, preventing pull requests from running with deployment or release tokens.
- **Root-Committed Demo Sync**: Deprecated because committing compiled web assets into the Git repository inflates clone size and causes unnecessary merge friction.
- **Automated Changesets Bot**: Deferred in favor of deterministic tag-driven releases with explicit maintainer verification.

## Consequences

- GitHub Pages must be configured to source from "GitHub Actions".
- npm publishing requires an `NPM_TOKEN` secret configured in repository secrets with publication permissions.
- Staged Git commits will no longer track compiled demo bundles in the root.

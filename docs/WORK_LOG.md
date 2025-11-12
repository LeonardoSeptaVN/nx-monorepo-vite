# Work Log

| Timestamp (UTC) | Action | Result |
| --- | --- | --- |
| 2025-02-14 03:40 | Reviewed repo layout, package manifests, and installer output to understand existing Nx/Vite setup and dependency pain points. | Confirmed primary apps (`apps/nx-monorepo`, `apps/web-app`) plus `libs/ui`, identified deprecated sub-dependencies from `npm install`. |
| 2025-02-14 03:55 | Authored `AGENTS.md` contributor guide outlining structure, commands, style, testing, and PR expectations tailored to this workspace. | Added concise reference (200-400 words) so new agents know how to work inside the monorepo. |
| 2025-02-14 04:05 | Enhanced `package.json` with Nx task scripts, Node/npm engine pins, npm package manager metadata, and dependency override bumping `jsdom` to 26.x. | Provides faster task DX, enforces modern tooling, and eliminates the `domexception`/`abab` warnings seen during `npm install`. |
| 2025-02-14 04:15 | Added targeted overrides for `@swc-node/*` to re-use the pinned `@swc/core` runtime and re-installed dependencies. | `npm install` now completes cleanly without peer-override warnings, reducing setup noise and aligning Nx/plugin tooling. |
| 2025-02-14 04:35 | Removed stale `pnpm-lock.yaml` so Nx stops invoking pnpm-specific logic when using npm, added `vite-tsconfig-paths` to root devDependencies, and reinstalled modules. | `nx` commands can now build the project graph without `.modules.yaml`, and Vite configs resolve TS paths because the plugin is available at the workspace root. |
| 2025-02-14 04:45 | Replaced the default Nx boilerplate `README.md` with repo-specific onboarding details (structure, scripts, contribution notes, troubleshooting). | README now mirrors our actual setup and points contributors to `AGENTS.md` plus npm-based workflows. |

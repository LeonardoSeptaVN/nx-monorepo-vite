# NxMonorepo

Nx-driven workspace combining a Next.js host app and a Vite SPA with shared component libraries. Use Node 20.11+ and npm 10+ (enforced via `package.json`) so Nx plugins, SWC, and Vite stay in sync across contributors.

## Repository Layout
- `apps/nx-monorepo` – Next.js 15 app with Tailwind, Jest unit tests, and Cypress e2e (`apps/nx-monorepo-e2e`).
- `apps/split-bill` – Next.js 15 app with Tailwind, Jest unit tests, and Cypress e2e (`apps/split-bill-e2e`).
- `libs/ui` – Reusable UI components consumed by both apps.
- `docs/AGENTS.md` – Contributor handbook; `docs/WORK_LOG.md` captures automation activity.
- Root configs (`nx.json`, `tsconfig.base.json`, `eslint.config.mjs`) define module boundaries and path aliases for every project.

## Installation & Scripts
Install once with npm to generate `package-lock.json` (no pnpm lockfiles):

```bash
npm install
npm run dev          # next dev for apps/nx-monorepo
npm run dev:web      # vite dev server for apps/split-bill
npm run build        # builds every project respecting Nx graph
npm run test         # Jest/Vitest unit suites
npm run e2e          # Cypress project suites
npm run lint         # ESLint across all projects
npm run storybook    # Storybook for libs/ui
npm run graph        # opens the Nx dependency graph
```

Scripts are wrappers around `nx run-many` / `nx <target> <project>` so you can also call Nx directly when needed (`npx nx dev split-bill`, `npx nx affected --target=build`, etc.).

## Contribution Guidelines
- Follow the naming conventions and testing expectations in `docs/AGENTS.md`.
- Run `npm run format:write` (Prettier, single quotes) before committing; lint/tests should pass locally.
- Keep imports within Nx’s enforced module boundaries; update `nx.json` tags when introducing new domains.
- Use Conventional Commits (`feat: ...`, `fix: ...`) so `nx affected` output remains meaningful.

## Troubleshooting
- If Nx complains about pnpm, ensure `pnpm-lock.yaml` is not present; this repo standardizes on npm.
- Missing Vite plugins (e.g., `vite-tsconfig-paths`) have been added to root devDependencies—run `npm install` to refresh.
- Still seeing `[DEP0180] fs.Stats` warnings? They stem from upstream tooling and can be ignored until Nx/plugins update.

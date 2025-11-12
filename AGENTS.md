# Repository Guidelines

## Project Structure & Module Organization
This workspace follows Nx conventions: customer-facing apps live in `apps/` (`apps/nx-monorepo` for the Next.js host, `apps/web-app` for the Vite SPA) and their Cypress suites sit alongside them as `*-e2e`. Reusable UI and stateful utilities belong to `libs/` (for example `libs/ui` exports typed components consumed by both apps). Cross-cutting tooling such as `nx.json`, `tsconfig.base.json`, and root-level `eslint.config.mjs` govern module boundaries and path aliases, so update those files whenever a new domain or tag is introduced.

## Build, Test, and Development Commands
Use npm 10+ (see `package.json` engines) and install once with `npm install`. `npm run dev` starts the Next.js shell, while `npm run dev:web` spins up the Vite client. `npm run build` compiles every project respecting Nx dependency ordering, and `npm run test`, `npm run lint`, and `npm run e2e` fan out to the relevant targets (Jest/Vitest for units, Cypress for e2e). Run `npm run storybook` when iterating on `libs/ui`, and `npm run graph` to visualize the dependency graph before large refactors.

## Coding Style & Naming Conventions
Stick to TypeScript everywhere; React files should use `.tsx` and colocate styles (Tailwind-first) near components. Prettier enforces single quotes via `.prettierrc`; format code with `npm run format:write`. Module folders follow `kebab-case`, exported symbols are `PascalCase` for components and `camelCase` for hooks/utilities. Honor Nx's `@nx/enforce-module-boundaries` rule—update tags before reaching across feature areas, and prefer importing through the library barrel rather than deep paths.

## Testing Guidelines
Unit specs live adjacent to the code as `*.spec.ts[x]` and should cover data contracts and rendering branches. `libs/ui` uses Jest (configured through `jest.config.cts`), while Vite-driven apps can opt into Vitest by extending `vite.config.ts`. Cypress specs stay under each `apps/*-e2e/src` folder; prefer data-testid selectors and keep tests hermetic via Nx memoized fixtures. Aim for meaningful coverage (≥80% statements on shared libraries) and gate merges by running `npm run test && npm run e2e` locally.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat: add hero grid`, `fix: resolve layout shift`) so `nx affected` stays informative. Each PR should describe what changed, why, and how to validate (commands plus screenshots for UI updates). Link relevant issues, flag breaking changes in the description, and ensure lint/test/e2e scripts pass before requesting review. When touching configs or generators, note migration steps for other contributors in the PR checklist.

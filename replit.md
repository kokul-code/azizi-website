# Azizi / USD-AI

Marketing site for Azizi Global Group / USD-AI — on-chain capital and Web4.0 infrastructure landing page.

## Run & Operate

- Run: workflow `artifacts/usd-ai: web` (Vite dev server, set via artifact.toml)
- Build: `pnpm --filter @workspace/usd-ai run build`
- Typecheck: `pnpm run typecheck`
- No required env vars (frontend-only).

## Stack

- React 18 + Vite 6 + TypeScript
- Tailwind CSS v4 + Radix UI + shadcn-style components
- Wouter for routing, TanStack Query, framer-motion
- pnpm workspace monorepo

## Where things live

- `artifacts/usd-ai/` — frontend artifact (web, served at `/`)
  - `src/pages/` — `Home.tsx`, `not-found.tsx`
  - `src/components/layout/` — `Header.tsx`, `Footer.tsx`
  - `src/components/ui/` — shadcn components
  - `src/index.css` — Tailwind + theme tokens
- `artifacts/api-server/` — Express API scaffold (not currently used by the frontend)
- `artifacts/mockup-sandbox/` — design mockup sandbox
- `lib/api-spec/openapi.yaml` — OpenAPI source of truth (only `/healthz` so far)
- `lib/db/src/schema/` — Drizzle schema (empty)
- `attached_assets/` — imported images referenced via `@assets/*` alias

## Architecture decisions

- Ported from Vercel; the imported project was already Vite + React (not Next.js), so no framework conversion was needed — only artifact registration and dependency install.
- Single-page presentation site, no backend required.
- `@assets` Vite alias maps to `../../attached_assets` for imported imagery.
- Brand palette: deep burgundy `#4A1426` / `#3A0E1E` (background), gold `#C8922A` (accent), `#C85050` (red accent), white text. The `--background` CSS variable and `html/body` background are both set to match.

## Product

Single landing page with hero, stats, partner logos, About (vision/mission), key Features (sticky stacking cards), Tokenomics (interactive donut chart + table), Roadmap (globe + timeline), and FAQ accordion. Fully responsive — mobile hamburger menu, 2-column stats grid, adaptive chart sizing, scaled globe SVG.

## User preferences

- Mobile-first responsive design; all sections must work on 390px+ screens.

## Gotchas

- Key Features sticky stacking uses `isMobile` state (< 1024px) to toggle between sticky/auto layout — do not remove.
- Tokenomics PieChart dimensions are driven by `chartSize` state measured from a container ref — keep ref on the chart container div.
- Globe SVG uses CSS `width: min(1000px, 96vw)` + `height: auto` for scaling — do NOT add fixed `width`/`height` attributes back.

## Pointers

- `.local/skills/artifacts/SKILL.md`
- `.local/skills/pnpm-workspace/SKILL.md`
- `.local/skills/react-vite/SKILL.md`

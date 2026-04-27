# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Front-end Vite + React apps live under `artifacts/`.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **UI**: Vite, React, Tailwind CSS, Radix UI

## Key Commands

- `pnpm run typecheck` — typecheck all workspace packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/usd-ai run dev` — main site (set `PORT` and `BASE_PATH` as in `vite.config.ts`)
- `pnpm --filter @workspace/mockup-sandbox run dev` — mockup sandbox

## Vercel

Import the Git repo; **leave the project root** as the repository root (not `artifacts/usd-ai` — pnpm `catalog:` lives at the monorepo root). `vercel.json` sets `installCommand`, `buildCommand`, and `outputDirectory` for the USD-AI Vite app. On deploy, Vercel runs `pnpm install` then `pnpm --filter @workspace/usd-ai run build` and publishes `artifacts/usd-ai/dist/public`. No environment variables are required for a default deploy at the site root; set `BASE_PATH` only if you use a [subpath / base path](https://vitejs.dev/config/shared-options.html#base).

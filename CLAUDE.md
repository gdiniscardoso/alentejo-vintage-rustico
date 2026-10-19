# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Bilingual (PT/EN) showcase site for "Alentejo Vintage & Rústico", a seller of handmade/vintage pieces who sells at fairs, on Vinted and via Instagram. Pages: home, portfolio (with filters/sort), upcoming fairs, about (vision/mission), and an order page. Built with Lovable on TanStack Start (React 19, Vite, Tailwind v4, shadcn/Radix UI in `src/components/ui`).

**Lovable sync:** the `lovable` branch syncs with Lovable. Never rewrite pushed history (no force-push, rebase, amend or squash of pushed commits), and keep the branch in a working state (see `AGENTS.md`).

## Commands

Bun lockfile is present (`bun.lock`); npm also works.

- `npm run dev` — dev server (`vite dev`)
- `npm run build` / `npm run build:dev` — production / development build (Nitro, Cloudflare target by default)
- `npm run lint` — ESLint (includes Prettier via `eslint-plugin-prettier`); `npm run format` runs Prettier
- `npm test` — Vitest once (jsdom, `src/**/*.{test,spec}.{ts,tsx}`); `npm run test:watch` for watch mode
- Single test: `npx vitest run src/test/app-routing.test.tsx` (add `-t "name"` to filter)

## Architecture

- **Vite config is owned by `@lovable.dev/vite-tanstack-config`.** It already includes TanStack Start, React, Tailwind, tsconfig paths, Nitro and the `@` alias. Do not add those plugins manually in `vite.config.ts` (duplicates break the app). `vitest.config.ts` is separate and sets its own `@` alias.
- **File-based routing** in `src/routes/` (see `src/routes/README.md`). `__root.tsx` is the only layout. `src/routeTree.gen.ts` is auto-generated — never edit it. Route files are Portuguese-named URLs (`/portfolio`, `/feiras`, `/sobre`, `/encomendar`).
- **SSR entry is `src/server.ts`** (configured via `tanstackStart.server.entry`). It wraps the TanStack server entry and converts h3's swallowed 500s into a rendered error page; `src/lib/error-capture.ts`, `error-page.ts` and `lovable-error-reporting.ts` support this.
- **Content is data, not CMS:** all products, categories, fairs, vision/mission, and social links live in `src/content/site.ts`. Editing the site means editing that file. Product `price` undefined renders "price on request"; `available: false` shows "sold out". Fair dates are ISO strings.
- **i18n is a hand-rolled context** in `src/lib/i18n.tsx`: a `dict` of `{pt, en}` strings, `useI18n()` returning `{lang, setLang, t}`, default `pt`, persisted in `localStorage` and applied after mount. Content-level bilingual strings use the `T = {pt, en}` type from `site.ts`; page-specific copy is often defined inline in the route (e.g. `copy` in `encomendar.tsx`). New UI strings go in `dict` (typed keys) or a local `{pt, en}` object — never a single language.
- **Images:** product photos are imported as `*.asset.json` files in `src/assets/` (Lovable-managed; they expose a `.url` served from `/__l5e/assets-v1/...`). Use `.url` from the import rather than file paths.
- **Ordering flow:** `/encomendar` does not submit a form to a backend. It builds a localized message for the chosen product (accepts `?produto=<id>` search param) for the user to copy and send via Instagram DM (`ig.me/m/...`).

## Conventions

- Import via the `@/` alias (`@/content/site`, `@/lib/i18n`).
- Each route sets its own `head()` meta (title/description/og tags).

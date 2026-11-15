# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Bilingual (PT/EN) showcase site for "Alentejo Vintage & Rústico", a seller of handmade/vintage pieces who sells at fairs, and via Instagram. Pages: home, portfolio (with filters/sort), upcoming fairs, about (vision/mission), and an order page. Plain React 19 SPA (Vite, React Router, Tailwind v4, shadcn/Radix UI in `src/components/ui`).

**History:** never rewrite pushed history (no force-push, rebase, amend or squash of pushed commits).

## Commands

Bun lockfile is present (`bun.lock`); npm also works.

- `npm run dev` — dev server (`vite dev`)
- `npm run build` / `npm run build:dev` — production / development build to `dist/` (static SPA; `public/_redirects` provides the host fallback to `index.html`)
- `npm run lint` — ESLint (includes Prettier via `eslint-plugin-prettier`); `npm run format` runs Prettier
- `npm test` — Vitest once (jsdom, `src/**/*.{test,spec}.{ts,tsx}`); `npm run test:watch` for watch mode
- Single test: `npx vitest run src/test/app-routing.test.tsx` (add `-t "name"` to filter)

## Architecture

- **Vite config** (`vite.config.ts`) is plain: React, Tailwind and the `@` alias. `vitest.config.ts` is separate and sets its own `@` alias. Entry is `index.html` → `src/main.tsx` → `src/App.tsx`.
- **Routing** is React Router, declared in `src/App.tsx` (`<Routes>`); pages live in `src/pages/`. URLs are Portuguese-named (`/portfolio`, `/feiras`, `/sobre`, `/encomendar`) plus a `*` not-found page. `App` is the only layout (header, footer, `ErrorBoundary`, scroll-to-top). Each page calls `useSeo()` from `src/lib/seo.ts` to set its title/description/og tags.
- **Content is data:** portfolio products and fairs are JSON files in `content/products/` and `content/fairs/` (one file per item; id = filename), loaded by `import.meta.glob` in `src/content/site.ts`, which also holds vision/mission/social links and categories. The owner edits them at `/admin` (Decap CMS, `public/admin/config.yml`, GitHub backend via an OAuth proxy); uploaded photos land in `public/uploads/` and are referenced by URL (`/uploads/x.jpg`). Product `price` undefined renders "price on request"; `available: false` shows "sold out". Pushes to `main` deploy to GitHub Pages via `.github/workflows/deploy.yml`.
- **i18n is a hand-rolled context** in `src/lib/i18n.tsx`: a `dict` of `{pt, en}` strings, `useI18n()` returning `{lang, setLang, t}`, default `pt`, persisted in `localStorage` and applied after mount. Content-level bilingual strings use the `T = {pt, en}` type from `site.ts`; page-specific copy is often defined inline in the route (e.g. `copy` in `encomendar.tsx`). New UI strings go in `dict` (typed keys) or a local `{pt, en}` object — never a single language.
- **Images:** the logo and hero are files in `src/assets/` imported directly; product photos are in `public/uploads/`.

## Conventions

- Import via the `@/` alias (`@/content/site`, `@/lib/i18n`).
- Each page calls `useSeo()` for its meta (title/description/og tags).

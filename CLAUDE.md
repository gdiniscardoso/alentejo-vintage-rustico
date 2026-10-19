# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Bilingual (PT/EN) showcase site for "Alentejo Vintage & Rústico", a seller of handmade/vintage pieces who sells at fairs, on Vinted and via Instagram. Pages: home, portfolio (with filters/sort), upcoming fairs, about (vision/mission), and an order page. Plain React 19 SPA (Vite, React Router, Tailwind v4, shadcn/Radix UI in `src/components/ui`).

**Branches:** `react-spa` is the plain-React rewrite. The `lovable` branch still has the TanStack Start version and syncs with Lovable, so never rewrite pushed history (no force-push, rebase, amend or squash of pushed commits; see `AGENTS.md`).

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
- **Content is data, not CMS:** all products, categories, fairs, vision/mission, and social links live in `src/content/site.ts`. Editing the site means editing that file. Product `price` undefined renders "price on request"; `available: false` shows "sold out". Fair dates are ISO strings.
- **i18n is a hand-rolled context** in `src/lib/i18n.tsx`: a `dict` of `{pt, en}` strings, `useI18n()` returning `{lang, setLang, t}`, default `pt`, persisted in `localStorage` and applied after mount. Content-level bilingual strings use the `T = {pt, en}` type from `site.ts`; page-specific copy is often defined inline in the route (e.g. `copy` in `encomendar.tsx`). New UI strings go in `dict` (typed keys) or a local `{pt, en}` object — never a single language.
- **Images:** product photos are imported as `*.asset.json` files in `src/assets/` (Lovable-managed; they expose a `.url` served from `/__l5e/assets-v1/...`). Use `.url` from the import rather than file paths.
- **Ordering flow:** `/encomendar` does not submit a form to a backend. It builds a localized message for the chosen product (accepts `?produto=<id>` query param) for the user to copy and send via Instagram DM (`ig.me/m/...`).

## Conventions

- Import via the `@/` alias (`@/content/site`, `@/lib/i18n`).
- Each page calls `useSeo()` for its meta (title/description/og tags).

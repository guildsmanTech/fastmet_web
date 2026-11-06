# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server (bound to all interfaces via `--host`)
- `npm run build` — type-check (`tsc -b`) then production build to `dist/`
- `npm run lint` — ESLint over the repo
- `npm run preview` — serve the built `dist/`

There is no test suite. Verify changes with `npm run build` (catches type errors) and `npm run lint`.

## Stack

React 19 + TypeScript + Vite 7, Tailwind CSS v4 (configured in `src/index.css` via `@theme`, no tailwind.config), shadcn/ui ("new-york" style, primitives in `src/components/ui/`), TanStack Query, React Router v7 (data router), Zod v4 for form validation, `react-helmet-async` for per-page SEO tags. Import alias `@/` → `src/`.

Theme colors are CSS variables exposed as Tailwind tokens (`bg-primary`, `hover:bg-primary-hover`, `text-secondary`, etc.); prefer these over hard-coded hex values. Font is Montserrat.

## Architecture

FastMet is a delivery/logistics service in Bulacan / Greater Manila, Philippines. This repo is the marketing website plus a few functional flows backed by a separate API (`VITE_API_URL`).

**Routing (`src/App.tsx`)** — two route trees:
- Routes under `RootLayout` get the site header, footer, scroll helpers, and the `RewardModal` (hidden on `/legal`, `/blog`, `/delete-account`, `/subscription` — see `src/layout/RootLayout.tsx`).
- `/app-view/*` routes render **without** site chrome; they are embedded in the FastMet mobile apps' webviews (user registration, legal pages). When changing a page that has both a web and app-view version, update both.
- Legal pages take a `:type` param (e.g. `user` / driver) and render structured content from `src/constants/legal.ts` through `LegalContentRenderer`.

**Data layer** — `src/api/*.ts` are plain `fetch` wrappers against `${API_URL}`; `src/hooks/use*Queries.ts` wrap them in TanStack Query hooks. The global `QueryClient` uses `staleTime: Infinity` and `retry: 1`, so data is never refetched automatically — invalidate explicitly or set per-query options when freshness matters. Types live in `src/types/`, Zod schemas in `src/schemas/`.

**Driver subscription flow (`/subscription`, `src/api/subscription.ts`)** — the most involved feature:
1. Phone OTP login (reCAPTCHA v2 token → `send-otp-driver-subscription` → `verify-otp` returns a `verifyToken` → `POST /api/web/driver/session` returns a web session token).
2. Session is cached in `sessionStorage` by `useSubscriptionSession` (tab-scoped so it survives the payment provider redirect back to `/subscription/result`). The server re-validates on every call.
3. Authenticated calls go through `authed()`, which throws `SubscriptionApiError` carrying `status` and `sessionExpired` (401 with `sessionExpired: true`) — callers use these to log the user out or show specific messages. Unauthenticated calls return `ApiResult` with `retryAfter` parsed from the `Retry-After` header for rate limiting.
4. Checkout redirects to an external payment provider; `SubscriptionResult` polls `fetchCheckout` (3s interval, capped) until the checkout reaches a final state.

**reCAPTCHA** — two versions coexist: v2 checkbox (`react-google-recaptcha`, `VITE_RECAPTCHA_SITE_KEY`) on forms, and invisible v3 (`src/lib/recaptchaV3.ts`, `VITE_RECAPTCHA_V3_SITE_KEY`) on Get a Quote. v3 is preloaded in `RootLayout` and must inject its own `?render=` script even if v2 already defined `window.grecaptcha`; tokens are single-use, so fetch a fresh one per submission.

**Google Places (`src/lib/googlePlaces.ts`)** — used by Get a Quote autocomplete with a browser-restricted key (`VITE_GOOGLE_PLACES_BROWSER_KEY`). Keep the cost controls: session tokens, 3-char minimum, and fetching only the `location` field.

## Environment

Required `VITE_*` vars (in `.env`): `VITE_API_URL`, `VITE_RECAPTCHA_SITE_KEY`, `VITE_RECAPTCHA_V3_SITE_KEY`, `VITE_GOOGLE_PLACES_BROWSER_KEY`, `VITE_SUPPORT_EMAIL`.

## Deployment

Vercel (`vercel.json`): SPA rewrite of all paths to `/`; auto-deploys only from `main` and `dev` branches. `public/sitemap.xml` and `robots.txt` are static — update the sitemap when adding public routes.

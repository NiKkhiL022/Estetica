# Estetica — Project Architecture & Complete Overview

This document records a complete, developer-focused description of the Estetica project: what it is, why it exists, how it is structured, how the pieces interact, how to run and test it, design decisions, edge cases, and recommended next steps. It is intentionally exhaustive — intended to be the single source of truth for contributors and for migrating or extending the app.

Table of contents

- Project summary
- Goals and non-goals
- Tech stack
- Local development / run steps
- Directory layout and responsibilities
- Data model and sample data
- State management (store, slices, selectors)
- UI components and layout
- Routing & pages (current approach)
- Forms & validation
- Persistence
- Tests
- Linting, typing and CI hooks
- Performance, accessibility & security notes
- Migration notes (Next.js) — short
- Troubleshooting & common gotchas
- Next actionable steps

---

## Project summary

Estetica is a small demo frontend that models a salon / service booking + product selection experience. It demonstrates a production-like setup with TypeScript, React, a centralized store, client-side pagination, filtering, a cart that persists across sessions, and a billing/checkout form validated with React Hook Form + Yup.

Key delivered features in this repo

- Product listing, search and category filters
- Client-side page-based pagination with configurable page size
- Redux Toolkit store with cart and products slices
- Reselect selector(s) to compute filtered products (no derived state in store)
- Cart UI (desktop sidebar + mobile modal), add/remove/update quantity
- Cart persistence via redux-persist (whitelists the cart slice)
- Billing / order completion UI including a RHF + Yup validated form
- Sample dataset of 30+ products (in `src/data/products.ts`) for functional testing
- Basic tests via Vitest + Testing Library (smoke tests present)

This project is intentionally client-side and optimized as a small demo. It uses Vite as the app runner / dev server.

---

## Goals and non-goals

Goals

- Provide a compact, well-typed TypeScript React codebase demonstrating common front-end patterns (Redux Toolkit, selectors, RHF, Yup, TailwindCSS)
- Make it easy to migrate to more advanced setups (Next.js) if desired
- Keep UI simple and focussed on core flows: search/filter → add to cart → checkout

Non-goals

- Production-grade backend integration or payment flows — this is a front-end demo only
- Complex e-commerce features (checkout gateways, inventory sync, multi-currency pricing)

---

## Tech stack

- Framework: React (functional components) + TypeScript
- Build: Vite
- Styling: TailwindCSS
- State: Redux Toolkit (slices) + React-Redux
- Selectors: Reselect-style selectors (createSelector) in `src/store/selectors`
- Persistence: redux-persist (whitelisted `cart` slice)
- Forms: react-hook-form + @hookform/resolvers/yup + yup
- Icons: lucide-react
- Tests: Vitest + Testing Library
- Tooling: ESLint / TypeScript (configs exist), PostCSS for Tailwind

---

## Local development / run steps (dev machine)

Notes below assume you have Node.js and npm installed.

1. Install dependencies (from repo root):

```powershell
npm install
```

2. Start the dev server:

```powershell
npm run dev
```

3. Run tests:

```powershell
npm test
# or
npm run test:watch
```

4. Type-check (recommended before PRs):

```powershell
npm run typecheck
```

5. Build for production:

```powershell
npm run build
```

If you later scaffold a `next-app/` for migration, install dependencies there and run `next dev` from inside that folder.

---

## Directory layout and responsibilities

Top-level (important files/directories):

- `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.cjs`, `postcss.config.cjs` — project configuration
- `src/` — source code
  - `components/` — UI components, organized by domain:
    - `billing/` — `OrderCompletion.tsx` (checkout flow)
    - `cart/` — `CartSidebar.tsx`, `CartModal.tsx`
    - `layout/` — `Header.tsx`
    - `products/` — `ProductCard.tsx`, `ProductGrid.tsx`, `ProductSearch.tsx`, `CategoryFilter.tsx`
    - `common/` — shared components (e.g., `Pagination.tsx`)
  - `data/` — `products.ts` (sample dataset and categories)
  - `hooks/` — `redux.ts` (typed hooks: useAppDispatch, useAppSelector)
  - `pages/` — app pages (currently SPA-style switching handled in `App.tsx`): `ProductPage.tsx`
  - `store/` — redux store, slices, selectors
    - `slices/` — `productsSlice.ts`, `cartSlice.ts`
    - `selectors/` — selector files (e.g., `productsSelectors.ts`)
  - `types/` — shared TypeScript types (product, cart item, billing summary)
  - `main.tsx` / `App.tsx` — entry points (Vite-based)

Why this layout

- Feature-based folders (products, cart, billing) group related components and make it easy to move to a file-based routing system like Next.js later.

---

## Data model and sample data

Primary shapes are in `src/types` and reflected in the test data `src/data/products.ts`.

- Product
  - id: string
  - name: string
  - price: number
  - category: string
  - description?: string
  - image?: string
- CartItem
  - id: string
  - name: string
  - price: number
  - quantity: number

The sample dataset contains 30+ entries so pagination, category filtering, and search can be tested locally without back-end APIs.

---

## State management

Store location: `src/store/index.ts` (Redux Toolkit configureStore).

Slices

- `productsSlice` — holds raw `products` array, `searchQuery`, and `selectedCategory`. Derived filtering previously was stored on the slice but has been refactored: filtered results are produced by a selector in `src/store/selectors/productsSelectors.ts`.
- `cartSlice` — holds cart `items` and exposes actions to `addToCart`, `updateQuantity`, `removeFromCart`, and `clearCart`.

Selectors

- `selectFilteredProducts` — a memoized selector that reads `products`, `searchQuery`, and `selectedCategory` and returns the filtered array. This avoids keeping derived state in the store and prevents duplication/consistency issues.

Persistence

- The store uses `redux-persist` and whitelists the `cart` slice. This persists the cart between reloads in localStorage. Note: persistence is inherently client-only.

Best practices in the repo

- Keep normalized data in the store where appropriate (the dataset remains a flat array here).
- Keep purely derived data outside of the store — use selectors.

---

## UI components and responsibilities

- `Header.tsx` — branding, search input (wired to global `setSearchQuery`), and top-level actions.
- `ProductSearch.tsx` — small input component with debounce (if added later) to set search query.
- `CategoryFilter.tsx` — renders categories and sets the selected category.
- `ProductGrid.tsx` / `ProductCard.tsx` — render products as cards with image, price, and add-to-cart behaviour.
- `Pagination.tsx` — simple, reusable pagination controls (Prev / numbered pages / Next).
- `CartSidebar.tsx` and `CartModal.tsx` — display cart items on desktop and mobile respectively (same actions).
- `OrderCompletion.tsx` — billing form, billing summary, and product usage list.

UI decisions

- The product card UI with hover overlay and plus icon is intentionally preserved — users requested no visual redesigns beyond functionality.
- Accessibility: most interactive elements are buttons with clear labels and icons. Further ARIA improvements are recommended (e.g., aria-live regions for cart updates).

---

## Routing & pages (current approach)

Currently, the app uses a single-page approach where `App.tsx` controls which page is visible (a simple client state: `currentPage: 'products' | 'billing'`). There is no file-based routing in the Vite app.

If you prefer file-based routing, Next.js is a natural migration path. Because you asked to keep the current setup for now, routing remains client-side.

---

## Forms & validation

- Billing form is implemented with react-hook-form + yup for schema validation. The resolver is used to wire Yup to RHF.
- TypeScript strictness sometimes makes the resolver types noisy; a pragmatic cast is used (`yupResolver(schema) as any`) to keep runtime validation while simplifying dev ergonomics. If needed we can derive the form types from the Yup schema (`yup.InferType<typeof schema>`).

---

## Tests

- Test runner: Vitest; testing library for DOM testing.
- Current tests include a basic smoke test. Next steps are to add unit tests for:
  - products selectors (filtering logic)
  - pagination logic (page change, page-size change, reset on filter)
  - cart reducers & persistence
  - OrderCompletion form validation

Example test path: `src/pages/ProductPage.test.tsx` — use Testing Library to render page and assert displayed items for a given page size.

---

## Linting, typing and CI

- TypeScript config is strict and present at `tsconfig.json`.
- ESLint config exists and should be run as part of any CI checks; add `npm run lint` to your pipeline if desired.
- CI recommendation: run `npm ci`, `npm run typecheck`, `npm test -- --coverage`, and `npm run build` as pre-merge gates.

---

## Performance, accessibility & security notes

Performance

- Client-side pagination is low-cost for the current dataset (30 items). For larger datasets, move pagination server-side or use virtualization (react-window) for long lists.
- Keep memoized selectors and avoid expensive calculations on every render.

Accessibility

- Buttons and inputs use semantic elements. Add keyboard focus styles and aria labels to overlay buttons.
- Provide a skip-to-content link in the header for keyboard users.

Security

- No backend integration is present. If you integrate an API, always sanitize user input and use HTTPS for endpoints.
- Be careful storing sensitive tokens in redux-persist (do not store secrets in localStorage).

---

## Migration notes to Next.js (short)

Because routing was mentioned in the conversation, here are short migration notes if you decide later to move to Next.js:

- Option 1 (safe): scaffold `next-app/` inside repo and incrementally import components and setup pages. Keep Vite app until migration is complete.
- Option 2: full replacement — convert `App.tsx` into `pages/_app.tsx` / `app/layout.tsx` and move pages to file routes.

Specific porting tasks:

- Make redux-persist initialization client-safe (guard it to run only after mount).
- Move any `public` assets into Next's `public/` folder.
- Replace `index.html` and root mounting logic with Next's app structure.
- Re-check imports for images and static assets (Next Image component optional).

---

## Troubleshooting & common gotchas

- Type errors with Yup resolver: use an explicit form type and a typed cast for the resolver to avoid noisy TS errors.
- redux-persist on server render: persistence must be guarded in SSR contexts — use a client-only component to rehydrate.
- Large sample data reads: reading large lockfiles in tools can produce noisy outputs — avoid printing large JSON files in PRs.

---

## Next actionable steps (prioritized)

1. Add comprehensive tests for pagination and selectors (important for correctness). (Suggested: create `src/pages/ProductPage.test.tsx`.)
2. Move billing constants (serviceTotal, taxRate) to a small config file or to `src/config.ts` so values can be changed easily.
3. Add more tests for cart reducers and persistor integration.
4. Optional: scaffold `next-app/` for incremental routing migration (non-destructive).
5. Documentation: generate a `README` summary and link to this `PROJECT_ARCHITECTURE.md` from the app header.

---

If you'd like, I can now:

- create a short link/button in `Header.tsx` that opens this document in a new tab,
- inject a short summary + a link to this doc at the bottom of `ProductPage` and `OrderCompletion` (two places), or
- scaffold a minimal `docs/README.md` and wire it into the app UI.

Which would you prefer? I can implement the header link + page summaries now (quick change), or just leave the document in the repo and you can review first.

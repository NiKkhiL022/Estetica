import React from "react"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Section: React.FC<
  React.PropsWithChildren<{ id: string; title: string; desc?: string }>
> = ({ id, title, desc, children }) => (
  <section id={id} className="scroll-mt-24">
    <div className="flex items-center gap-3 mb-4">
      <div className="h-7 w-1 rounded bg-gradient-to-b from-purple-500 to-pink-500" />
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>
    </div>
    {desc && (
      <p className="text-gray-600 leading-relaxed mb-4 font-medium">{desc}</p>
    )}
    <div className="space-y-4 text-gray-700 leading-relaxed text-[15px]">
      {children}
    </div>
  </section>
)

const DocsPage: React.FC = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="max-w-5xl mx-auto py-14 px-5">
      <header className="mb-12">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 mb-6">
          Project Architecture
        </h1>

        <p className="text-lg md:text-xl text-gray-600  leading-relaxed">
          A detailed, implementation-focused breakdown of how the application is
          built, why each choice was made, and how data flows from user action
          to a generated result.
        </p>
      </header>

      <nav aria-label="Table of contents" className="mb-14">
        <ul className="flex flex-wrap gap-3 text-sm">
          {[
            ["overview", "Overview"],
            ["layers", "Layers"],
            ["flow", "Flow"],
            ["error-retry", "Error & Retry"],
            ["state", "State"],
            ["performance", "Performance"],
            ["accessibility", "Accessibility"],
            ["approach", "Why"],
            ["future", "Future"],
          ].map(([id, label]) => (
            <li key={id as string}>
              <a
                href={`#${id}`}
                className="inline-block rounded-full border border-gray-200 bg-white px-4 py-2 font-medium text-gray-600 hover:text-purple-600 hover:border-purple-300 transition-colors shadow-sm"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-20">
        <Section
          id="overview"
          title="High‑Level Overview"
          desc="Foundational stack and execution model."
        >
          <p>
            Estetica is a front-end demo app (product booking UX) built with
            TypeScript, React, and Vite. It intentionally focuses on frontend
            architecture: state management with Redux Toolkit, derived
            selectors, persisted cart state, client-side pagination, and a
            validated billing/checkout flow using React Hook Form and Yup.
          </p>
        </Section>

        <Section
          id="layers"
          title="Key Layers & Responsibilities"
          desc="Directory responsibilities and rationale."
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm p-5 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-purple-600 mb-2 uppercase">
                UI Components
              </h3>
              <p className="text-sm leading-relaxed">
                <code className="font-semibold">components/</code> holds
                presentational & lightly stateful parts (product cards, cart,
                billing) that prefer props for clarity.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm p-5 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-purple-600 mb-2 uppercase">
                Hooks & State
              </h3>
              <p className="text-sm leading-relaxed">
                <code className="font-semibold">hooks/</code> and{" "}
                <code className="font-semibold">store/</code> keep behavior and
                state predictable; selectors compute derived data.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm p-5 shadow-sm md:col-span-2">
              <h3 className="text-sm font-semibold tracking-wide text-purple-600 mb-2 uppercase">
                Routes & Pages
              </h3>
              <p className="text-sm leading-relaxed">
                Routing uses client-side{" "}
                <code className="font-semibold">react-router-dom</code>. Pages
                live in <code>src/pages</code> and the top-level routes are
                registered in <code>src/App.tsx</code> (/, /billing, /docs). The
                app deliberately keeps navigation simple and client-only under
                Vite — migration notes for Next.js are described in the Next
                Steps section below.
              </p>
            </div>
          </div>
        </Section>

        <Section
          id="tech-stack"
          title="Tech stack (concrete)"
          desc="Exact libraries and rationale"
        >
          <ul className="list-disc ml-5 space-y-2">
            <li>
              React 18 + TypeScript — functional components with hooks; strict
              typing for safety.
            </li>
            <li>Vite — fast dev server and production build.</li>
            <li>
              TailwindCSS — utility-first styling (we use JIT and Tailwind's
              default config).
            </li>
            <li>Redux Toolkit + React-Redux — application state and slices.</li>
            <li>redux-persist — persists the cart slice to localStorage.</li>
            <li>
              react-hook-form + yup + @hookform/resolvers — form handling +
              validation.
            </li>
            <li>react-router-dom — client routing (BrowserRouter + Routes).</li>
            <li>Vitest + Testing Library — unit and DOM tests.</li>
          </ul>
        </Section>

        <Section
          id="flow"
          title="User Interaction Flow"
          desc="Chronological path from input to persisted result."
        >
          <ol className="list-decimal ml-5 space-y-2 marker:text-purple-500">
            <li>Search or select a category to filter products.</li>
            <li>Add products to cart (sidebar on desktop, modal on mobile).</li>
            <li>
              Open billing and fill the RHF-validated form to complete the mock
              order.
            </li>
            <li>Cart is persisted to localStorage via redux-persist.</li>
            <li>
              Selectors compute filtered results to keep derived state out of
              reducers.
            </li>
          </ol>
        </Section>

        <Section
          id="data-model"
          title="Data model & sample data"
          desc="Types and where to find sample products"
        >
          <p className="text-sm leading-relaxed">
            Core types live in <code>src/types/index.ts</code>. Primary shapes:
          </p>
          <ul className="list-disc ml-5 space-y-2">
            <li>
              <strong>Product</strong>: id, name, price, category, description,
              image.
            </li>
            <li>
              <strong>CartItem</strong>: id, name, price, quantity.
            </li>
          </ul>
          <p className="text-sm leading-relaxed">
            Sample product data is in <code>src/data/products.ts</code> and
            contains 30+ entries used to validate pagination and filtering UX.
          </p>
        </Section>

        <Section
          id="state-management"
          title="State management (store, slices, selectors)"
          desc="What lives where and why"
        >
          <h4 className="text-sm font-semibold">Store</h4>
          <p className="text-sm leading-relaxed">
            The Redux store is configured in <code>src/store/index.ts</code>{" "}
            using Redux Toolkit's <code>configureStore</code>. The store
            includes the
            <code>products</code> and <code>cart</code> slices. redux-persist is
            wired to rehydrate the cart slice from localStorage.
          </p>

          <h4 className="text-sm font-semibold">Products slice</h4>
          <p className="text-sm leading-relaxed">
            The <code>productsSlice</code> holds the raw products array plus UI
            state for <code>searchQuery</code> and <code>selectedCategory</code>
            . Derived results are NOT stored in the slice — instead we use the
            selector below.
          </p>

          <h4 className="text-sm font-semibold">Selectors</h4>
          <p className="text-sm leading-relaxed">
            The selector <code>selectFilteredProducts</code> (in
            <code>src/store/selectors/productsSelectors.ts</code>) composes
            <code>state.products.products</code>, <code>searchQuery</code>, and
            <code>selectedCategory</code> and returns the filtered array. This
            keeps derived computation memoized and testable.
          </p>

          <h4 className="text-sm font-semibold">Cart slice</h4>
          <p className="text-sm leading-relaxed">
            The <code>cartSlice</code> holds items and exposes actions to
            <code>addToCart</code>, <code>updateQuantity</code>,
            <code>removeFromCart</code>, and <code>clearCart</code>. The cart
            slice is whitelisted for persistence with redux-persist so cart
            state survives reloads.
          </p>
        </Section>

        <Section
          id="forms"
          title="Forms & validation"
          desc="How billing form is implemented"
        >
          <p className="text-sm leading-relaxed">
            The billing flow uses <code>react-hook-form</code> for performant
            form handling and <code>yup</code> for schema-based validation. The
            resolver wiring is done with <code>@hookform/resolvers/yup</code>.
            For TypeScript ergonomics we declare the form value types explicitly
            and use a pragmatic cast for the resolver where needed.
          </p>
          <p className="text-sm leading-relaxed">
            File: <code>src/components/billing/OrderCompletion.tsx</code> — it
            contains the RHF form UI, validation schema, and a local submitted
            state used to render the success message.
          </p>
        </Section>

        <Section
          id="persistence"
          title="Persistence & rehydration"
          desc="redux-persist setup"
        >
          <p className="text-sm leading-relaxed">
            redux-persist is configured in the store to persist the cart slice
            to localStorage. The persisted store is rehydrated on app boot with
            <code>PersistGate</code>. This keeps UX predictable (cart survives
            reload) and is intentionally limited to the cart slice to avoid
            persisting large or fragile derived state.
          </p>
        </Section>

        <Section
          id="tests"
          title="Tests"
          desc="What tests exist and what to add"
        >
          <p className="text-sm leading-relaxed">
            Test runner: <code>vitest</code> with Testing Library for DOM tests.
            Current repo contains a smoke test and a small set of unit tests.
            Key missing tests we recommend adding:
          </p>
          <ul className="list-disc ml-5 space-y-2">
            <li>
              Selector unit tests for <code>selectFilteredProducts</code>.
            </li>
            <li>
              Pagination behavior tests (page change, page-size change, reset on
              filter).
            </li>
            <li>
              Cart reducers and persistence tests (add/update/remove semantics).
            </li>
            <li>
              OrderCompletion form validation tests (happy and error paths).
            </li>
          </ul>
        </Section>

        <Section
          id="lint-ci"
          title="Linting, typing and CI"
          desc="How to keep code healthy"
        >
          <p className="text-sm leading-relaxed">
            TypeScript and ESLint are configured in the repo. Recommended CI
            steps:
          </p>
          <ol className="list-decimal ml-5 space-y-2">
            <li>npm ci (install deps)</li>
            <li>npm run type-check (tsc -b --noEmit)</li>
            <li>npm run lint (eslint .)</li>
            <li>npm test -- --coverage (run unit tests)</li>
            <li>npm run build (vite build)</li>
          </ol>
        </Section>

        <Section
          id="migration"
          title="Migration notes (Next.js)"
          desc="Short guidance"
        >
          <p className="text-sm leading-relaxed">
            If you later migrate to Next.js the preferred paths are:
          </p>
          <ul className="list-disc ml-5 space-y-2">
            <li>
              Scaffold a `next-app/` and port components/pages incrementally.
            </li>
            <li>
              Guard redux-persist so it runs only on the client (rehydration
              client-only).
            </li>
            <li>Move public assets to Next's `public/` and adapt imports.</li>
            <li>
              Re-evaluate image handling (Next Image) and API routes if needed.
            </li>
          </ul>
        </Section>

        <Section
          id="troubleshooting"
          title="Troubleshooting & gotchas"
          desc="Common errors and fixes"
        >
          <ul className="list-disc ml-5 space-y-2">
            <li>
              If the app fails to start, ensure you run commands from the repo
              root where <code>package.json</code> lives (npm run dev). Missing
              script errors happen when running from the wrong CWD.
            </li>
            <li>
              Type errors from the Yup resolver: declare explicit form types and
              cast the resolver as <code>any</code> if the types are noisy.
            </li>
            <li>
              Be careful when editing patched JSX files — stray characters can
              unbalance tags and produce compile errors. Re-open the file and
              fix the mismatched JSX if that happens.
            </li>
            <li>
              Vite may choose a different port if 5173 is in use; check terminal
              output for the actual port (e.g., 5174).
            </li>
          </ul>
        </Section>

        <Section
          id="next-steps"
          title="Next actionable steps"
          desc="Prioritized improvements"
        >
          <ol className="list-decimal ml-5 space-y-2">
            <li>
              Add unit tests for selectors and pagination (high priority).
            </li>
            <li>
              Extract billing constants (serviceTotal, taxRate) to{" "}
              <code>src/config.ts</code>.
            </li>
            <li>
              Consider enabling Tailwind Typography for improved prose styling
              in docs.
            </li>
            <li>
              Improve accessibility: add aria-live regions for cart updates and
              keyboard shortcuts for cart actions.
            </li>
          </ol>
        </Section>

        <Section
          id="error-retry"
          title="Error & Retry Strategy"
          desc="Resilience notes."
        >
          <p>
            This demo intentionally keeps side-effect complexity low. If
            integrated with real APIs, centralize retry logic in hooks and keep
            UI components declarative.
          </p>
        </Section>

        <Section
          id="state"
          title="State Management Rationale"
          desc="Why selectors and slices"
        >
          <p>
            Derived state is computed with selectors to avoid duplication. Cart
            persistence uses redux-persist.
          </p>
        </Section>

        <Section
          id="performance"
          title="Performance Considerations"
          desc="Optimizations & scaling notes."
        >
          <ul className="list-disc ml-5 space-y-2 marker:text-purple-500">
            <li>
              Dataset is small (30 items); for larger lists, prefer server-side
              pagination or virtualization.
            </li>
            <li>Memoize selectors to avoid recomputation each render.</li>
          </ul>
        </Section>

        <Section
          id="accessibility"
          title="Accessibility"
          desc="Inclusive defaults baked in."
        >
          <p>
            Interactive elements use semantic markup and visible focus styles.
            ARIA improvements are suggested for live regions and announcements
            on cart updates.
          </p>
        </Section>

        <Section
          id="approach"
          title="Why This Approach"
          desc="Guiding principles."
        >
          <ul className="list-disc ml-5 space-y-2 marker:text-purple-500">
            <li>Keep UI simple and testable.</li>
            <li>Encapsulate async logic in hooks.</li>
            <li>Prefer TypeScript for developer confidence.</li>
          </ul>
        </Section>

        <Section
          id="future"
          title="Future Evolution"
          desc="Planned enhancements."
        >
          <ul className="list-disc ml-5 space-y-2 marker:text-purple-500">
            <li>
              Move billing constants to <code>src/config.ts</code>.
            </li>
            <li>Add unit tests for selectors and pagination logic.</li>
            <li>
              Consider Tailwind Typography plugin for richer prose styling.
            </li>
          </ul>
        </Section>
      </div>
    </div>
  )
}

export default DocsPage

// React import not required with the new JSX transform
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./store"
import Header from "./components/layout/Header"
import ProductsPage from "../src/pages/ProductPage"
import OrderCompletion from "./components/billing/OrderCompletion"
import DocsPage from "../src/pages/DocsPage"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"

function ProductsRoute() {
  const navigate = useNavigate()
  const handleCheckout = () => navigate("/billing")
  return <ProductsPage onCheckout={handleCheckout} />
}

function BillingRoute() {
  const navigate = useNavigate()
  return <OrderCompletion onBack={() => navigate("/")} />
}

function DocsRoute() {
  return <DocsPage />
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Header />

            <Routes>
              <Route path="/" element={<ProductsRoute />} />
              <Route path="/billing" element={<BillingRoute />} />
              <Route path="/docs" element={<DocsRoute />} />
            </Routes>
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App

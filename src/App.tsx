import { useState } from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./store"
import Header from "./components/layout/Header"
import ProductsPage from "../src/pages/ProductPage"
import OrderCompletion from "./components/billing/OrderCompletion"

type Page = "products" | "billing"

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("products")

  const handleCheckout = () => {
    setCurrentPage("billing")
  }

  const handleBackToProducts = () => {
    setCurrentPage("products")
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <div className="min-h-screen bg-gray-50">
          <Header />

          {currentPage === "products" && (
            <ProductsPage onCheckout={handleCheckout} />
          )}

          {currentPage === "billing" && (
            <OrderCompletion onBack={handleBackToProducts} />
          )}
        </div>
      </PersistGate>
    </Provider>
  )
}

export default App

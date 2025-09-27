import React, { useState } from "react"
import { useAppSelector, useAppDispatch } from "../hooks/redux"
import { selectFilteredProducts } from "../store/selectors/productsSelectors"
import {
  setSearchQuery,
  setSelectedCategory,
} from "../store/slices/productsSlice"
// ...existing imports
import ProductSearch from "../components/products/ProductSearch"
import CategoryFilter from "../components/products/CategoryFilter"
import ProductGrid from "../components/products/ProductGrid"
import Pagination from "../components/common/Pagination"
import CartModal from "../components/cart/CartModal"
import CartSidebar from "../components/cart/CartSidebar"

const ProductsPage: React.FC<{ onCheckout: () => void }> = ({ onCheckout }) => {
  const dispatch = useAppDispatch()
  const { searchQuery, selectedCategory } = useAppSelector(
    state => state.products,
  )
  const filteredProducts = useAppSelector(selectFilteredProducts)

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  // Reset page when filters/search or page size change
  React.useEffect(() => {
    setPage(1)
  }, [searchQuery, selectedCategory, pageSize])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const visibleProducts = filteredProducts.slice(startIndex, endIndex)

  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query))
  }

  const handleCategorySelect = (category: string) => {
    dispatch(setSelectedCategory(category))
  }

  const [isCartOpen, setIsCartOpen] = useState(false)

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const { items } = useAppSelector(state => state.cart)
  const hasItems = items && items.length > 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6">
        <div className="mt-4">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            Welcome Back, Nikhil
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Hello, here you can manage your orders by zone
          </p>
        </div>
      </div>
      <div className={`flex flex-col lg:flex-row ${hasItems ? "" : ""}`}>
        {/* Main Content */}
        <div className={`flex-1 p-4 sm:p-6 ${hasItems ? "lg:pr-4" : ""}`}>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Products
          </h1>

          <ProductSearch
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />

          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />

          <ProductGrid products={visibleProducts} onAdd={openCart} />
        </div>
        {/* Desktop: show right-side sidebar when cart has items */}
        {/* Desktop animated sidebar: width transitions between 0 and 20rem (lg:w-80) */}
        <div
          className={`hidden lg:flex items-stretch transition-all duration-300 ease-in-out ${hasItems ? "w-full lg:w-[420px]" : "w-full lg:w-0"}`}
        >
          <div
            className={`${hasItems ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"} transform transition-all duration-300 ease-in-out w-full`}
          >
            {/* Render the sidebar content only when hasItems true to keep DOM clean */}
            {hasItems && <CartSidebar onCheckout={onCheckout} />}
          </div>
        </div>

        {/* Mobile: show modal when Add is clicked */}

        <div className="block lg:hidden w-full">
          <CartModal
            isOpen={isCartOpen}
            onClose={closeCart}
            onCheckout={() => {
              onCheckout()
              closeCart()
            }}
          />
        </div>
      </div>

      <div className="flex items-center flex-col sm:flex-row  justify-center gap-10 mt-4  pb-20 px-4">
        <div>
          <label htmlFor="pageSize" className="mr-2 text-sm text-gray-700">
            Items per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 mt-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold mb-2">About this project</h3>
          <p className="text-sm text-gray-700">
            Estetica is a React + TypeScript front-end demonstrating product
            search, category filtering, client-side pagination, cart
            management/persistence, and a billing UI validated with React Hook
            Form + Yup.
          </p>
          <p className="mt-2">
            <a href="/docs" className="text-purple-600 hover:underline text-sm">
              Read full project architecture and details →
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage

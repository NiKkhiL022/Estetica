import React from "react"
import { useAppSelector, useAppDispatch } from "../hooks/redux"
import {
  setSearchQuery,
  setSelectedCategory,
} from "../store/slices/productsSlice"
import ProductSearch from "../components/products/ProductSearch"
import CategoryFilter from "../components/products/CategoryFilter"
import ProductGrid from "../components/products/ProductGrid"
import CartModal from "../components/cart/CartModal"
import CartSidebar from "../components/cart/CartSidebar"
import { useState } from "react"

const ProductsPage: React.FC<{ onCheckout: () => void }> = ({ onCheckout }) => {
  const dispatch = useAppDispatch()
  const { filteredProducts, searchQuery, selectedCategory } = useAppSelector(
    state => state.products,
  )

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

          <ProductGrid products={filteredProducts} onAdd={openCart} />
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
    </div>
  )
}

export default ProductsPage

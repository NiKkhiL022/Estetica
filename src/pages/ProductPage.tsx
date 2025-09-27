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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6">
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
        {/* Cart is shown as a modal when an item is added */}
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
  )
}

export default ProductsPage

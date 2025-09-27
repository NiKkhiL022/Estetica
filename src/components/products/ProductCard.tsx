import React from "react"
import { Product } from "../../types"
import { useAppDispatch } from "../../hooks/redux"
import { addToCart } from "../../store/slices/cartSlice"

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps & { onAdd?: () => void }> = ({
  product,
  onAdd,
}) => {
  const dispatch = useAppDispatch()

  const handleAddToCart = (e?: React.MouseEvent) => {
    // prevent parent click handlers if any
    e?.stopPropagation()
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }),
    )
    if (onAdd) onAdd()
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 transition-shadow duration-200 group overflow-hidden cursor-pointer hover:shadow-md hover:border-purple-400">
      <div className="relative aspect-square bg-gray-100 rounded-lg mb-2 sm:mb-3 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />

        {/* Centered plus overlay shown on hover */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg">
          {/* dark translucent backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg" />
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="pointer-events-auto inline-flex items-center justify-center w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-lg font-bold shadow-lg transition-colors duration-150 z-10"
          >
            +
          </button>
        </div>
      </div>

      <div className="space-y-1 sm:space-y-2">
        <h3 className="font-medium text-gray-900 text-xs sm:text-sm leading-tight line-clamp-2">
          {product.name}
        </h3>
        {/* Price and Add button intentionally hidden; use overlay plus on hover */}
      </div>
    </div>
  )
}

export default ProductCard

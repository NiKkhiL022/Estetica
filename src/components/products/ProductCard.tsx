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

  const handleAddToCart = () => {
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
    <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer group">
      <div className="aspect-square bg-gray-100 rounded-lg mb-2 sm:mb-3 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      <div className="space-y-1 sm:space-y-2">
        <h3 className="font-medium text-gray-900 text-xs sm:text-sm leading-tight line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-lg font-semibold text-gray-900">
            ₹{product.price}
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-purple-600 hover:bg-purple-700 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

import React from "react"
import { Product } from "../../types"
import ProductCard from "./ProductCard"

interface ProductGridProps {
  products: Product[]
  onAdd?: () => void
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAdd }) => {
  if (products.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-gray-500 text-lg">
          No products found matching your criteria.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  )
}

export default ProductGrid

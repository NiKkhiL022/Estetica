import React from "react"
import { Search } from "lucide-react"

interface ProductSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

const ProductSearch: React.FC<ProductSearchProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="relative mb-4 sm:mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search for Product !"
        value={searchQuery}
        onChange={e => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
      />
    </div>
  )
}

export default ProductSearch

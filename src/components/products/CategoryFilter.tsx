import React from "react"
import { categories } from "../../data/products"

interface CategoryFilterProps {
  selectedCategory: string
  onCategorySelect: (category: string) => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
      {categories.map(category => (
        <button
          key={category}
          onClick={() =>
            onCategorySelect(selectedCategory === category ? "" : category)
          }
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 ${
            selectedCategory === category
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter

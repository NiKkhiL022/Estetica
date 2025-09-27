import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../../types"
import { products } from "../../data/products"

interface ProductsState {
  products: Product[]
  searchQuery: string
  selectedCategory: string
  filteredProducts: Product[]
}

const initialState: ProductsState = {
  products,
  searchQuery: "",
  selectedCategory: "",
  filteredProducts: products,
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.filteredProducts = filterProducts(state)
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
      state.filteredProducts = filterProducts(state)
    },
    clearFilters: state => {
      state.searchQuery = ""
      state.selectedCategory = ""
      state.filteredProducts = state.products
    },
  },
})

const filterProducts = (state: ProductsState): Product[] => {
  let filtered = state.products

  if (state.searchQuery) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
    )
  }

  if (state.selectedCategory) {
    filtered = filtered.filter(
      product => product.category === state.selectedCategory,
    )
  }

  return filtered
}

export const { setSearchQuery, setSelectedCategory, clearFilters } =
  productsSlice.actions
export default productsSlice.reducer

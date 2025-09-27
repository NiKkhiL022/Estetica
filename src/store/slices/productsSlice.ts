import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../../types"
import { products } from "../../data/products"

interface ProductsState {
  products: Product[]
  searchQuery: string
  selectedCategory: string
}

const initialState: ProductsState = {
  products,
  searchQuery: "",
  selectedCategory: "",
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
    },
    clearFilters: state => {
      state.searchQuery = ""
      state.selectedCategory = ""
    },
  },
})

export const { setSearchQuery, setSelectedCategory, clearFilters } =
  productsSlice.actions
export default productsSlice.reducer

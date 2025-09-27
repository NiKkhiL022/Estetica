import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "../../store"

const selectProductsState = (state: RootState) => state.products

export const selectAllProducts = (state: RootState) =>
  selectProductsState(state).products

export const selectSearchQuery = (state: RootState) =>
  selectProductsState(state).searchQuery
export const selectSelectedCategory = (state: RootState) =>
  selectProductsState(state).selectedCategory

export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectSearchQuery, selectSelectedCategory],
  (products, searchQuery, selectedCategory) => {
    let filtered = products

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    return filtered
  },
)

export default selectFilteredProducts

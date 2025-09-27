import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartItem } from "../../types"

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        id: string
        name: string
        price: number
        image: string
      }>,
    ) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      )

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        })
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity)
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    clearCart: state => {
      state.items = []
    },
  },
})

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions

export default cartSlice.reducer

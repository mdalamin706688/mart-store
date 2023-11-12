import { createSlice } from "@reduxjs/toolkit";
import { Key } from "react";

interface CartItem {
  productId: number;
  uniqueId: Key | null | undefined;
  thumbnail: string | undefined;
  id: string;
  quantity: number;
  name: string;
  price: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartItem[],
  reducers: {
    setCart: (_state, action) => {
      return action.payload;
    },
    clearCart: () => {
      return [];
    },
    addToCart: (state, action) => {
      const { id } = action.payload;
      const item = state.find((item) => item.id === id);

      if (item) {
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find((item) => item.id === id);

      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart } =
  cartSlice.actions;

export default cartSlice.reducer;

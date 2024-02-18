import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  totalQuantity: 0,
  totalPrice: 0,
  selectedCategory: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const ItemIndex = state.carts.findIndex((item) => item.id === action.payload.id);

      if (ItemIndex >= 0) {
        state.carts[ItemIndex].qnty += 1;
      } else {
        const temp = { ...action.payload, qnty: 1 };
        state.carts = [...state.carts, temp];
      }

      state.totalQuantity = state.carts.reduce((total, item) => total + item.qnty, 0);
      state.totalPrice = state.carts.reduce((total, item) => total + item.price * item.qnty, 0);
    },

    removeToCart: (state, action) => {
      const data = state.carts.filter((ele) => ele.id !== action.payload);
      state.carts = data;

      state.totalQuantity = state.carts.reduce((total, item) => total + item.qnty, 0);
      state.totalPrice = state.carts.reduce((total, item) => total + item.price * item.qnty, 0);
    },

    removeSingleItems: (state, action) => {
      const ItemIndexDec = state.carts.findIndex((item) => item.id === action.payload.id);

      if (state.carts[ItemIndexDec].qnty >= 1) {
        state.carts[ItemIndexDec].qnty -= 1;
      }

      state.totalQuantity = state.carts.reduce((total, item) => total + item.qnty, 0);
      state.totalPrice = state.carts.reduce((total, item) => total + item.price * item.qnty, 0);
    },

    emptyCartItem: (state, action) => {
      state.carts = [];

      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeToCart, removeSingleItems, emptyCartItem } = cartSlice.actions;

export default cartSlice.reducer;

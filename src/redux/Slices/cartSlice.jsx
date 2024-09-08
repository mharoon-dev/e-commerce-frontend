import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      console.log(action.payload);
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },

    resetPrdoucts: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

const actions = cartSlice.actions;

export const { addProduct, resetPrdoucts } = actions;

export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  discount: 0,
};

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
  },
});

const actions = discountSlice.actions;

export const { setDiscount } = actions;

export default discountSlice.reducer;

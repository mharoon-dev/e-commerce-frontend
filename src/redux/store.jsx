import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./Slices/cartSlice.jsx";
import userReducer from "./Slices/userSlice.jsx";
import discountReducer from "./Slices/discountSlice.jsx";

const store = configureStore(
  {
    reducer: {
      user: userReducer,
      cart: cartReducer,
      discount: discountReducer,
    },
  },
  +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

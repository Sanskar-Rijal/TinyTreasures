import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./ReduxSlices/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;

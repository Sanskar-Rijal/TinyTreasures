import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./ReduxSlices/cartSlice";
import userReducer from "./ReduxSlices/userSlice";
import wishReducer from "./ReduxSlices/wishSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    wish: wishReducer,
  },
});

export default store;

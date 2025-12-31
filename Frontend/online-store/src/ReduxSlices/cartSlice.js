import { createSlice } from "@reduxjs/toolkit";

//just like redux we have to define initial state first
const initialStateCart = {
  orderItems: [],
  totalPrice: 0,
  tax: 0, //13% of total price
  shippingPrice: 0, //free shipping above rs 1500
};
/*
orderItems:{
"name":"Charger",
"quantity":2,
"image":"https.kei na kei ta ho alchi lago",
"price":"1 MIllion"
"product": "product id"
}
*/

const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateCart,
  reducers: {
    addToCart(state, action) {
      //it basically means cart/addtoCart
      state.orderItems.push(action.payload);
      state.totalPrice = +state.orderItems.price * state.orderItems.quantity;
      state.tax = (state.totalPrice * 0.13).toFixed(2);
      if (state.totalPrice > 1500) {
        state.shippingPrice = 0;
      } else {
        state.shippingPrice = 120;
      }
    },
  },
  removeItem(state, action) {
    //we pass here id of the product to be removed
    const productId = action.payload;
    state.orderItems = state.orderItems.filter(
      (item) => item.product !== productId,
    );
  },
  increaseItemQuantity(state, action) {
    const productId = action.payload;
    const item = state.orderItems.find((item) => item.product === productId);
    item.quantity += 1;
    state.totalPrice = state.totalPrice + item.price * item.quantity;
    state.tax = (state.totalPrice * 0.13).toFixed(2);
    if (state.totalPrice > 1500) {
      state.shippingPrice = 0;
    } else {
      state.shippingPrice = 120;
    }
  },
  decreaseItemQuantity(state, action) {
    const productId = action.payload;
    const item = state.orderItems.find((item) => item.product === productId);
    item.quantiy -= 1;
    state.totalPrice = state.totalPrice - item.price * item.quantity;
    state.tax = (state.totalPrice * 0.13).toFixed(2);
    if (state.totalPrice > 1500) {
      state.shippingPrice = 0;
    } else {
      state.shippingPrice = 120;
    }
    if (item.quantity === 0) {
      cartSlice.caseReducers.removeItem(state.action);
    }
  },
  clearCart(state) {
    state.orderItems = [];
  },
});

//exporting action creators;
export const {
  addToCart,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

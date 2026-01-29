import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

//just like redux we have to define initial state first
const defaultCartState = {
  orderItems: [],
  subTotal: 0,
  totalPrice: 0,
  tax: 0, //13% of total price
  shippingPrice: 0, //free shipping above rs 1500
};

// Load data from local storage
function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }
  return defaultCartState;
}

// Save cart to localStorage
function saveCartToStorage(state) {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
}

const initialStateCart = loadCartFromStorage();
/*
orderItems:{
"name":"Charger",
"quantity":2,
"image":"https.kei na kei ta ho alchi lago",
"price":"1 MIllion"
"product": "product id"
}
*/

//Helper function to calculate total Price
function calculateTotalPrice(state) {
  const total = state.orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  state.totalPrice = total;
  state.tax = (state.totalPrice * 0.13).toFixed(2);
  state.subTotal = (state.totalPrice - state.tax).toFixed(2);
  state.shippingPrice = state.totalPrice > 1500 ? 0 : 120;
  state.totalPrice += state.shippingPrice; //Add shipping Price to total Price
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateCart,
  reducers: {
    addToCart(state, action) {
      //if the items is already in cart and user clicks add to cart again then we must check it right?
      const alreadyInCart = state.orderItems.find(
        (item) => item.product === action.payload.product,
      );

      if (alreadyInCart) {
        //if already in cart then we just increase the quantity
        alreadyInCart.quantity += action.payload.quantity;
      } else {
        //it basically means cart/addtoCart
        state.orderItems.push(action.payload);
      }
      calculateTotalPrice(state);
      saveCartToStorage(state);
    },
    removeItem(state, action) {
      //we pass here id of the product to be removed
      const productId = action.payload;
      state.orderItems = state.orderItems.filter(
        (item) => item.product !== productId,
      );
      calculateTotalPrice(state);
      saveCartToStorage(state);
    },
    increaseItemQuantity(state, action) {
      const productId = action.payload;
      const item = state.orderItems.find((item) => item.product === productId);
      if (item) {
        item.quantity += 1;
        calculateTotalPrice(state);
        saveCartToStorage(state);
      } else {
        toast.error("Add items to cart first, to increase quantity");
      }
    },
    decreaseItemQuantity(state, action) {
      const productId = action.payload;
      const item = state.orderItems.find((item) => item.product === productId);
      if (!item) {
        toast.error("Add items to cart first, to decrease quantity");
        return;
      }
      item.quantity -= 1;
      if (item.quantity == 0) {
        //remove item from cart
        state.orderItems = state.orderItems.filter(
          (item) => item.product !== productId,
        );
      }
      calculateTotalPrice(state);
      saveCartToStorage(state);
    },
    clearCart(state) {
      state.orderItems = [];
      state.totalPrice = 0;
      state.subTotal = 0;
      state.tax = 0;
      state.shippingPrice = 0;
      localStorage.removeItem("cart");
    },
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

import { createSlice } from "@reduxjs/toolkit";

const initiailWishState = {
  wishItems: [],
};

// wisheItems:{
// "name":"Charger",
// "quantity":2,
// "image":"https.kei na kei ta ho alchi lago",
// "price":"1 MIllion"
// "product": "product id"
// }

const wishSlice = createSlice({
  name: "wish",
  initialState: initiailWishState,
  reducers: {
    addToWish(state, action) {
      state.wishItems.push(action.payload);
    },
    removeFromWish(state, action) {
      const productId = action.payload;
      state.wishItems = state.wishItems.filter((item) => item.id !== productId);
    },
  },
});

export const { addToWish, removeFromWish } = wishSlice.actions;
export default wishSlice.reducer;

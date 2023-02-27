import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "cart",
  value: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartSync: (state, action) => {
      state.value = action.payload;
    },

    cartDel: (state) => {
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { cartSync, cartDel } = cartSlice.actions;

export default cartSlice.reducer;

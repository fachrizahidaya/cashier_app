import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "item",
  value: [],
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    syncData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { syncData } = itemSlice.actions;

export default itemSlice.reducer;

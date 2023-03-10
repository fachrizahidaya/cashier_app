import { createSlice } from "@reduxjs/toolkit";

// awal isi dari form register
const initialState = {
  value: {
    id: 0,
    username: "",
    email: "",
    password: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.value.username = action.payload.username;
      state.value.id = action.payload.id;
    },
    logoutUser: (state, action) => {
      state.value.username = "";
    },
    addCart: (state) => {
      state.value.cart += 1;
    },
    delCart: (state) => {
      state.value.cart -= 1;
    },
  },
});

export const { loginUser, logoutUser, addCart, delCart } = userSlice.actions;
export default userSlice.reducer;

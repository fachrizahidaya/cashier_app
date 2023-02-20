import { createSlice } from "@reduxjs/toolkit";

// awal isi dari form register
const initialState = {
  value: {
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
    },
    logoutUser: (state, action) => {
      state.value.username = "";
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

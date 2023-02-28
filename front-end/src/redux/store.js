import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";
import cartSlice from "./cartSlice";
import itemSlice from "./itemSlice";

export default configureStore({
  reducer: {
    userSlice,
    adminSlice,
    cartSlice,
    itemSlice,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import statusSlice from "./statusSlice";
import postSlice from "./postSlice";

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    status: statusSlice.reducer,
    posts: postSlice.reducer,
  },
});

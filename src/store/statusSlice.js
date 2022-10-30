import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: {
    token: "",
    userId: "",
    notification: {
      status: "",
      title: "",
      message: "",
    },
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    defaultToken(state) {
      state.token = "";
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    defaultUserId(state) {
      state.userId = "";
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
    defaultNotification(state) {
      state.notification = {
        status: "",
        title: "",
        message: "",
      };
    },
  },
});

export const statusActions = statusSlice.actions;

export default statusSlice;

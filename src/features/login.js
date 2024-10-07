import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loggedIn: false,
    user: null,
  },
  reducers: {
    changeLoginStatus: (state, action) => {
      state.loggedIn = action.payload.loggedIn;
      state.user = action.payload.user;
    },
  },
});

export const { changeLoginStatus } = loginSlice.actions;

export default loginSlice.reducer;

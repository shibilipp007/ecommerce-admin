import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const logout = createAsyncThunk(
  "auth/loguot",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/auth/logout`,
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || "something went wrong");
    }
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.loggedIn = false;
      state.user = null;
    });
  },
});

export const { changeLoginStatus } = loginSlice.actions;

export default loginSlice.reducer;

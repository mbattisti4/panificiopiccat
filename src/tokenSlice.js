import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: {
      access_token: "",
      expires_in: 0,
      token_type: "",
      tokenStartDate: null,
    },
  },
  reducers: {
    getToken: (state, action) => {
      state.value;
    },
  },
});

export const { getToken } = tokenSlice.actions;

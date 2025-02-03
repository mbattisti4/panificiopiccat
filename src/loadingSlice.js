import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    value: { completed: false, successfull: false },
  },
  reducers: {
    loadingStarted: (state, action) => {
      state.value.completed = false;
    },
    loadingCompleted: (state, action) => {
      state.value.completed = true;
      state.value.successfull = true;
      
    },
    loadingError: (state, action) => {
      state.value.completed = true;
      state.value.successfull = false;
    },
  },
});

export const { loadingStarted, loadingCompleted, loadingError } =
  loadingSlice.actions;

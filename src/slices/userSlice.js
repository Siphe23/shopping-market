// src/features/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Store user data here
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;  // Set the user directly
      state.isAuthenticated = !!action.payload;  // If user is present, authenticated is true
    }
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, setUser } = userSlice.actions;

export default userSlice.reducer;

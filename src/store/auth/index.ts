import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './types';

const initialState: AuthState = {
  auth: null,
  userData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    clearAuth: (state) => {
      state.auth = null;
      state.userData = null;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {
  setAuth,
  clearAuth,
  setUserData
} = authSlice.actions;
export const authReducer = authSlice.reducer;
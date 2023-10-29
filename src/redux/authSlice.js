import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { userPersistConfig } from './persistConfig';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    accessToken: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
    },
  },
});

const persistedUserReducer = persistReducer(userPersistConfig, authSlice.reducer);

export const { login, logout } = authSlice.actions;
export default persistedUserReducer;

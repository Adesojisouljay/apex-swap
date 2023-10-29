import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { userPersistConfig } from './persistConfig';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {
      _id: "",
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      profilePicture: "",
      userMemo: null,
      resetToken: null,
      tokenExpiration: null,
      referralCode: "",
      timestamp: "",
      __v: 0,
    },
  },
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
    },
    clearUserData(state) {
      state.userData = {
        _id: "",
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        profilePicture: "",
        userMemo: null,
        resetToken: null,
        tokenExpiration: null,
        referralCode: "",
        timestamp: "",
        __v: 0,
      };
    },
    updateProfile(state, action) {
      state.userData = action.payload;
    },
  },
});

const persistedUserReducer = persistReducer(userPersistConfig, userSlice.reducer);

export const { setUser, clearUserData, updateProfile } = userSlice.actions;
export default persistedUserReducer;

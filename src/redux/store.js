import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import userReducer from './userSlice';
import walletReducer from './walletSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    wallet: walletReducer,
  },
});

const persistor = persistStore(store, null, () => {
  console.log('Redux state rehydrated');
});

export { store, persistor };

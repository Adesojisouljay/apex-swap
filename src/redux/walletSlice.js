import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { walletPersistConfig } from './persistConfig';

const walletSlice = createSlice({
    name: 'wallet',
    initialState: [],
    reducers: {
            setWallet: (state, action) => {
                state.userWallets = action.payload;
            },         
            removeWallet: (state) => {
                state.userWallets = [];
            },         
    }
});

const persistedUserReducer = persistReducer(walletPersistConfig, walletSlice.reducer);

export const { setWallet, removeWallet } = walletSlice.actions;
export default persistedUserReducer;


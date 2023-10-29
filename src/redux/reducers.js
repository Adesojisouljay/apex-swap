
import { combineReducers } from 'redux';
import { userReducer } from './userSlice';
import { walletReducer } from './walletSlice';

const rootReducer = combineReducers({
  user: userReducer, // Add other reducers here if needed
  wallet: walletReducer, // Add other reducers here if needed
});

export default rootReducer;

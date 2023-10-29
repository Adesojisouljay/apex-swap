import storage from 'redux-persist/lib/storage';

const userPersistConfig = {
  key: 'user',
  storage,
};

const walletPersistConfig = {
  key: 'wallet',
  storage,
};

export { userPersistConfig, walletPersistConfig };

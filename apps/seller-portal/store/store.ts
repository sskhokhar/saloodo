import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import authReducer from './auth/auth.slice';
import parcelReducer from './parcel/parcel.slice';

const persistConfig = {
  key: 'root:seller',
  version: 1,
  storage,
  whitelist: ['parcel'],
};
const reducers = combineReducers({
  auth: authReducer,
  parcel: parcelReducer,
});
const rootReducer = (state, action) => {
  if (action.type === '[auth]/signout') {
    state = undefined;
  }
  return reducers(state, action);
};
export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import { authReducer } from "./auth/slice";
import { shopsReducer } from "./shops/slice";
import { categoriesReducer } from "./categories/slice";
import { productStatusesReducer } from "./productStatuses/slice";
import { productsReducer } from "./products/slice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist auth state
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    shops: shopsReducer,
    categories: categoriesReducer,
    productStatuses: productStatusesReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

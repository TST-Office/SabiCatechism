import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./rootReducer";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
//   import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user', 'videos', 'theme', 'blog']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { 
            warnAfter: 128 ,
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});


export const persistor = persistStore(store);
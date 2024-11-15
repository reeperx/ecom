import { configureStore } from '@reduxjs/toolkit';
import shopSlice from "./slice"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, WebStorage } from "redux-persist"
import createWebStorage from 'redux-persist/es/storage/createWebStorage'

export function createPersistStorage(): WebStorage {
    const isServer = typeof window === "undefined";
    // Dummy Server
    if (isServer) {
        return{
            getItem(){
                return Promise.resolve(null);
            },
            setItem(){
                return Promise.resolve();
            },
            removeItem(){
                return Promise.resolve();
            }
        }
    }
    return createWebStorage("local")
}

const storage = typeof window !== "undefined" ? createWebStorage("local") : createPersistStorage();

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, shopSlice)

export const store = configureStore({
    reducer: {
        ebenezer: persistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export const persistor = persistStore(store)


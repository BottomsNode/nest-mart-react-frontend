import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import wishlistReducer from "./wishlistSlice";
import cartReducer from "./cartSlice";
import { combineReducers } from "redux";

// My all reducers registering
const appReducer = combineReducers({
    auth: authReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
});

// Reset(delete) data from state on logout
const rootReducer = (state: any, action: any) => {
    if (action.type === "auth/logout") {
        storage.removeItem("persist:root");
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

// Persist config
const persistConfig = {
    key: "root",
    storage,
    wishlist: ["wishlist"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store acts as the middleware config
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

// Persistor
export const persistor = persistStore(store);

// Typescript Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore, Store } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "./custom-storage";
import journalSlice from "./features/journal";
import weatherSlice from "./features/weather";

const persistConfig = {
  key: "pokemon",
  storage,

  whitelist: ["jorunal"],
};

const rootReducer = combineReducers({
  jorunal: journalSlice,
  weather: weatherSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

import { compose, createStore, applyMiddleware, Store } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./rootReducer";
// import userTransform from "./transform";

const loggerMiddleware = createLogger();
export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "app"], // only navigation will be persisted
  // transforms: [userTransform],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const storeContext: Store = createStore(
  persistedReducer,
  undefined,
  compose(applyMiddleware(thunkMiddleware), applyMiddleware(loggerMiddleware))
);

export const store = storeContext;

export const persist = persistStore(storeContext);

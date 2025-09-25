import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reducers from "./reducers/index";

// Redux Persist config
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["cameraSettings"], // only persist this reducer
};

const persistedReducer = persistReducer(persistConfig, reducers);

// Create store
export const store = createStore(persistedReducer);

// Persistor
export const persistor = persistStore(store);

export default store;

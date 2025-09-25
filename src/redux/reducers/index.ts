import { combineReducers } from "redux";
import settingsReducer from "./settingsReducer";

const rootReducer = combineReducers({
  cameraSettings: settingsReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
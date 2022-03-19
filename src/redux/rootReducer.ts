import { combineReducers } from "redux";
import authReducer from "~/redux/auth/reducer";
import appReducer from "~/redux/app/reducer";

const rootReducer = combineReducers({ auth: authReducer, app: appReducer });

export default rootReducer;

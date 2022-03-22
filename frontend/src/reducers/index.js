import userReducer from "./userReducer";
import isLoggedReducer from "./isLoggedReducer";
import checkInReducer from "./checkInReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
  isLogged: isLoggedReducer,
  checkInIsValid: checkInReducer,
});

export default rootReducer;

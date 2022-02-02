import userReducer from './userReducer';
import isLoggedReducer from './isLoggedReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	user     : userReducer,
	isLogged : isLoggedReducer
});

export default rootReducer;

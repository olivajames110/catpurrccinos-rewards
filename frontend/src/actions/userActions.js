import { ADD_POINTS, SUBTRACT_POINTS } from './action-types/user-actions';

export const setUser = (user) => {
	return {
		type    : 'SET_USER',
		payload : user
	};
};
export const addUserPoints = (points) => {
	return {
		type    : 'ADD_POINTS',
		payload : points
	};
};
export const subtractUserPoints = (points) => {
	return {
		type    : 'SUBTRACT_POINTS',
		payload : points
	};
};
export const updateRedemption = (redemption) => {
	return {
		type    : 'UPDATE_REDEMPTIONS',
		payload : redemption
	};
};
export const updateVisit = (visit) => {
	return {
		type    : 'UPDATE_VISITS',
		payload : visit
	};
};
export const clearUser = () => {
	return {
		type : 'CLEAR_USER'
	};
};

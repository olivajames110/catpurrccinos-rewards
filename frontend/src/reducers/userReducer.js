const initState = {
	id          : '0',
	number      : 0,
	points      : 100,
	redemptions : [],
	visits      : []
};

const userReducer = (state = initState, action) => {
	switch (action.type) {
		case 'SET_USER':
			return {
				...state,
				id          : action.payload.id,
				number      : action.payload.number,
				points      : action.payload.points,
				redemptions : action.payload.redemptions,
				visits      : action.payload.visits
			};
		case 'ADD_POINTS':
			return { ...state, points: action.payload };
		case 'SUBTRACT_POINTS':
			return { ...state, points: action.payload };
		case 'UPDATE_REDEMPTIONS':
			return { ...state, redemptions: action.payload };
		case 'UPDATE_VISITS':
			return { ...state, visits: action.payload };
		case 'CLEAR_USER':
			return {
				...state,
				id          : 0,
				number      : 0,
				points      : 0,
				redemptions : [],
				visits      : []
			};
		default:
			return state;
	}
};

export default userReducer;

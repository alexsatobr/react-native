import {
	FETCH,
	FETCH_USER_SUCCESS,
	FETCH_USER_ERROR,
	SELECT_INTERESTS,
	FIRST_ACCESS_NAME
} from '../actions';

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH: 
			return {
				...state
			};
		case FETCH_USER_SUCCESS: 
			return {...state.name, ...action.user}
		case FETCH_USER_ERROR:
			return {
				...state,
				error: action.error
			};
		case SELECT_INTERESTS: 
			return {
				...state,
				interests: action.interests
			};
		case FIRST_ACCESS_NAME:
			return {...state, name: action.name}
		default: 
			return state;
	}
}
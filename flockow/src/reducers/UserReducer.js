import {
	FETCH,
	FETCH_USER_SUCCESS,
	FETCH_USER_ERROR,
	SELECT_INTERESTS
} from '../actions';

import {
	LOGOUT
} from '../actions';

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH: 
			return {
				...state
			};
		case FETCH_USER_SUCCESS: 
			return action.user
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
		default: 
			return state;
	}
}
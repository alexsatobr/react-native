import {
	LOGIN,
	LOGIN_ERROR,
	LOGIN_SUCCESS,
	LOGIN_SESSION_SUCCESS,
	LOGOUT
  } from '../actions';
  
const initialState = {
	isLogged: false,
	isLoading: false,
	token: null,
	info: {},
	error: null,
};
  
export default (state = initialState, action) => {
	switch (action.type) {
	  	case LOGIN:
			return {
				...state,
				isLoading: true,
			};
	  	case LOGIN_SUCCESS:
			return {
				...state,
				isLogged: true,
				isLoading: false,
				token: action.token,
				info: action.user,
			};
		case LOGIN_SESSION_SUCCESS: 
			return {
				...state,
				isLogged: true
			}
	  	case LOGIN_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.error,
		};
		case LOGOUT:
			return {
				...state,
				isLogged: false,
				token: null,
				info: null
			}
	  	default:
			return state;
	}
};
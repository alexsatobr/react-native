import { getUser } from '../api/userApi';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

function fetchUserSuccess (data) {
	return {
		type: FETCH_USER_SUCCESS,
		user: data
	}
}

function fetchUserError(error) {
	return {
	  type: FETCH_USER_ERROR,
	  error,
	};
}

export function getUserInfo (token) {
	return async (dispatch) => {
		dispatch({ type: FETCH_USER });
		try {
			const data = await getUser.info(token);
			return dispatch(fetchUserSuccess(data))
		} catch (e) {
			return dispatch(fetchUserError(e))
		}
	}
}
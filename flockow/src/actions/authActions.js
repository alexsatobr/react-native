import { User } from '../api/authApi';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_SESSION_SUCCESS = 'LOGIN_SESSION_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT = 'LOGOUT';

function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    user: data.user,
    token: data.token,
  };
}

function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}

export function login(token, provider) {
  return async (dispatch) => {
    dispatch({ type: LOGIN });
    try {
      const data = await User.login({ token, provider });
      return dispatch(loginSuccess(data));
    } catch (e) {
      return dispatch(loginError(e));
    }
  };
}

export function loginSession () {
	return (dispatch) => {
		return dispatch( { type: LOGIN_SESSION_SUCCESS} );
	};
}

export function logout() {
	return (dispatch) => {
		return dispatch({ type: LOGOUT });
	}
}
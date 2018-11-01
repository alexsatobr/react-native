export const FIRST_ACCESS = 'FIRST_ACCESS';

export function firstAccess () {
	return (dispatch) => {
		return dispatch({ type: FIRST_ACCESS });
	};
}

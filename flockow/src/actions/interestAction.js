export const SELECT_INTERESTS = 'SELECT_INTERESTS';

export function selectInterest({interests}) {
	return {
		type: SELECT_INTERESTS,
		interests
	};
}
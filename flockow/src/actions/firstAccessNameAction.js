export const FIRST_ACCESS_NAME = 'FIRST_ACCESS_NAME';

export function firstAccessName({name}) {
	return {
		type: FIRST_ACCESS_NAME,
		name 
	};
};

import { FIRST_ACCESS } from '../actions';

export default (state = true, action) => {
	switch (action.type) {
		case FIRST_ACCESS:
			return false;
		default:
			return state;
	}
}
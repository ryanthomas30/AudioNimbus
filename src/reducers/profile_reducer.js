import { GET_ABOUT } from '../actions/types';

export default function(state = {}, action) {
	switch(action.type) {
		case GET_ABOUT:
			return { ...state, about: action.payload };
		default:
			return state;
	}
}

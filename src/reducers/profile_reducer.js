import { GET_ABOUT, GET_TRACKS, GET_USERS } from '../actions/types';

export default function(state = {}, action) {
	switch(action.type) {
		case GET_ABOUT:
			return { ...state, about: action.payload };
		case GET_TRACKS:
			return { ...state, tracks: action.payload };
		case GET_USERS:
			return { ...state, users: action.payload };
		default:
			return state;
	}
}

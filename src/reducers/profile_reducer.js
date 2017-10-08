import { GET_ABOUT, GET_TRACKS } from '../actions/types';

export default function(state = {}, action) {
	switch(action.type) {
		case GET_ABOUT:
			return { ...state, about: action.payload };
		case GET_TRACKS:
			console.log('tracks:' + action.payload);
			return {...state, tracks: action.payload}
		default:
			return state;
	}
}

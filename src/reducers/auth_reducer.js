import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, GET_ID } from '../actions/types';

export default function(state = {}, action) {
	switch(action.type) {
		case AUTH_USER:
			return { ...state, error: '', authenticated: true, userId: action.payload };
		case UNAUTH_USER:
			return { ...state, authenticated: false, userId: '' };
		case AUTH_ERROR:
			return { ...state, error: action.payload };
		case GET_ID:
			return { ...state, userId: action.payload };
		default:
			return state;
	}
}

import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }, callback) {
	return function(dispatch) {
		// Submit email/password to the server
		axios.post(`${ROOT_URL}/signin`, { email, password })
			.then(response => {
				callback(true);
				// If request is good...
				// - Update state tp indicate user is authenticated
				dispatch({ type: AUTH_USER, payload: response.data.id});
				// - Save the JWT token
				localStorage.setItem('token', response.data.token);
				// - Redirect to the route '/feature'
				//browserHistory.push('/feature');
			})
			.catch(() => {
				// If request is bad...
				// - Show an error to te user
				callback(false);
				dispatch(authError('Bad Login Info'));
			});
	}
}

export function signupUser({ email, password }, callback) {
	return function(dispatch) {
		// Submit email/password to the server
		axios.post(`${ROOT_URL}/signup`, { email, password })
			.then(response => {
				callback(true);
				// If request is good...
				// - Update state tp indicate user is authenticated
				dispatch({ type: AUTH_USER, payload: response.data.id });
				// - Save the JWT token
				localStorage.setItem('token', response.data.token);
				// - Redirect to the route '/profile'
				browserHistory.push('/profile');
			})
			.catch(error => {
				// If request is bad...
				// - Show an error to te user
				callback(false);
				dispatch(authError(error.response.data.error));
			});
	}
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function signoutUser(callback) {
	localStorage.removeItem('token');
	// Pushes user back to '/'
	callback();
	return { type: UNAUTH_USER };
}

export function fetchMessage() {
	return function(dispatch) {
		axios.get(ROOT_URL, {
			headers: { authorization: localStorage.getItem('token') }
		})
			.then(response => {
				dispatch({
					type: FETCH_MESSAGE,
					payload: response.data.message
				});
			});
	}
}

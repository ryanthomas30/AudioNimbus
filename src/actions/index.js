import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, GET_ID, GET_ABOUT } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }, callback) {
	return function(dispatch) {
		// Submit email/password to the server
		axios.post(`${ROOT_URL}/signin`, { email, password })
			.then(response => {
				callback(true, response.data.id);
				// If request is good...
				// - Update state tp indicate user is authenticated
				dispatch({ type: AUTH_USER, payload: response.data.id});
				// - Save the JWT token
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('userid', response.data.id);
				// - Redirect to the route '/feature'
				//browserHistory.push('/feature');
			})
			.catch(() => {
				// If request is bad...
				// - Show an error to te user
				callback(false, null);
				dispatch(authError('Bad Login Info'));
			});
	}
}

export function signupUser({ email, password }, callback) {
	return function(dispatch) {
		// Submit email/password to the server
		axios.post(`${ROOT_URL}/signup`, { email, password })
			.then(response => {
				callback(true, response.data.id);
				// If request is good...
				// - Update state tp indicate user is authenticated
				dispatch({ type: AUTH_USER, payload: response.data.id });
				// - Save the JWT token
				localStorage.setItem('token', response.data.token);
				// localStorage.setItem('userid', response.data.id);

			})
			.catch(error => {
				// If request is bad...
				// - Show an error to te user
				callback(false, null);
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

export function clearError(error) {
	return function(dispatch) {
		dispatch(authError(''));
	}
}

export function signoutUser(callback) {
	localStorage.removeItem('token');
	localStorage.removeItem('userid');
	// Pushes user back to a route
	callback();
	return { type: UNAUTH_USER };
}

export function getUserId() {
	return function(dispatch) {
		const id = localStorage.getItem('userid');
		console.log('localstorage userid is: ' + id)
		return dispatch({ type: GET_ID, payload: id });
	}
}

export function updateAbout(userId, name, bio, location, image, callback) {
	return function(dispatch) {
		axios.put(`${ROOT_URL}/putAbout/${userId}`, { name, bio, location, image })
			.then(response => {
				callback(true);
				dispatch({
					type: GET_ABOUT,
					payload: response.data.about
				});
			})
			.catch(error => {
				callback(false);
			});
	}
}

export function getAbout(userId) {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/getAbout/${userId}`)
			.then(response => {
				dispatch({
					type: GET_ABOUT,
					payload:response.data.about
				});
			})
			.catch(error => {

			});
	}
}

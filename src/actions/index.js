import axios from 'axios';
import { API_ROOT } from './api-config';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, GET_ID, GET_ABOUT, GET_TRACKS } from './types';


export function signinUser({ email, password }, callback) {
	return function(dispatch) {
		// Submit email/password to the server
		axios.post(`${API_ROOT}signin`, { email, password })
			.then(response => {
				callback(true, response.data.id);
				// If request is good...
				// - Update state tp indicate user is authenticated
				dispatch({ type: AUTH_USER, payload: response.data.id});
				dispatch(getAbout(response.data.id));
				// - Save the JWT token
				localStorage.setItem('token', response.data.token);
				// - Redirect to the route '/feature'
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
		axios.post(`${API_ROOT}signup`, { email, password })
			.then(response => {
				callback(true, response.data.id);
				// If request is good...
				// - Update state tp indicate user is authenticated
				dispatch({ type: AUTH_USER, payload: response.data.id });
				dispatch(getAbout(response.data.id));
				// - Save the JWT token
				localStorage.setItem('token', response.data.token);
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
		return dispatch({ type: GET_ID, payload: id });
	}
}

export function updateAbout(userId, name, bio, location, image, callback) {
	return function(dispatch) {
		axios.put(`${API_ROOT}putAbout/${userId}`, { name, bio, location, image })
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
		axios.get(`${API_ROOT}getAbout/${userId}`)
			.then(response => {
				dispatch({
					type: GET_ABOUT,
					payload: response.data.about
				});
			})
			.catch(error => {

			});
	}
}

export function getTracks(userId) {
	return function(dispatch) {
		axios.get(`${API_ROOT}getTracks/${userId}`)
			.then(response => {
				dispatch({
					type: GET_TRACKS,
					payload: response.data.tracks
				});
			})
			.catch(error => {
				console.log('Could not get tracks');
			});
	}
}

export function pushTrackNames(userId, { name, imagename, filename }) {
	return function(dispatch) {
	axios.post(`${API_ROOT}uploadTrack/${userId}`, { name, imagename, filename })
		.then((response) => {
			dispatch(getTracks(userId));
		})
		.catch(error => {
			console.log(error.response.data);
		});
	}
}

// TODO: If there is no image, don't fire imageUpload api
export function uploadTrack(userId, name, image, file) {
	return function(dispatch) {
		let filename = '';
		let imagename = '';
		const formData = new FormData();
		const imageData = new FormData();
		formData.append('file', file);
		imageData.append('image', image);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		axios.post(`${API_ROOT}upload/${userId}`, formData, config)
			.then((response) => {
				filename = response.data.filename;
				axios.post(`${API_ROOT}uploadImage/${userId}`, imageData, config)
					.then((response) => {
						imagename = response.data.imagename;
						dispatch(pushTrackNames(userId, { name, imagename, filename }));
					})
					.catch(error => {

					});
			})
			.catch(error => {
				console.log(error.response.data);
			});
	}
}

export function postComment(routeId, trackId, comment) {
	return function(dispatch) {
		axios.post(`${API_ROOT}postComment/${routeId}/${trackId}`, { comment })
			.then((response) => {
				dispatch(getTracks(routeId));
				//location.reload();
			})
			.catch(error => {
				console.log(error.response.data);
			});
	}
}

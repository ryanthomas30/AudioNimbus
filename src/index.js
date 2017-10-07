import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

import 'grommet/scss/vanilla/index.scss';

import App from './Main';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
	applyMiddleware(reduxThunk)
));

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userid');
// If we have a token, consider user to be signed in
if(token && userId) {
	// We need to update application state
	store.dispatch({ type: AUTH_USER, payload: userId });
}

const element = document.getElementById('root');
ReactDOM.render(
	<Provider store={store} >
 		<BrowserRouter>
 			<App />
  		</BrowserRouter>
   </Provider>
	, element);

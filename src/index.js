import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

import 'grommet/scss/vanilla/index.scss';

import App from './Main';
import Profile from './components/Profile';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider user to be signed in
if(token) {
	// We need to update application state
	store.dispatch({ type: AUTH_USER });
}

const element = document.getElementById('root');
ReactDOM.render(
	<Provider store={store} >
 		<Router history={browserHistory} >
 			<Route path="/" component={App} >
 				<IndexRoute component={Profile} />
 			</Route>
  		</Router>
   </Provider>
	, element);

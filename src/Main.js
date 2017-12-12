import React, {Component} from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import App from 'grommet/components/App';
import Article from 'grommet/components/Article';

import Profile from './components/Profile';
import LandingPage from './components/LandingPage';

class Main extends Component {
	render() {
		return (
			<App id='app' >
				<Article>
					<Switch>
						<Route path="/profile/:routeId" component={Profile} />
						<Route exact path="/" component={LandingPage} />
					</Switch>
				</Article>
			</App>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated,
		userId: state.auth.userId
	};
}

export default connect(mapStateToProps, actions)(Main);

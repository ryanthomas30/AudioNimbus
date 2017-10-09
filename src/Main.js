import React, {Component} from 'react';
import App from 'grommet/components/App';
import HeaderBar from './components/HeaderBar';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import { Route } from 'react-router-dom';
import * as actions from './actions';
import { connect } from 'react-redux';



class Main extends Component {
	render() {
		// userId eventually needs to be replaced by search selection
		// Need another redux action/state that selects a routeId
		return (
			<App>
				<Article>
					<HeaderBar/>
					<Route exact path="/profile/:routeId" component={Profile} />
						<Route exact path="/" component={LandingPage} />
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

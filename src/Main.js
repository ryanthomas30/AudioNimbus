import React, {Component} from 'react';
import App from 'grommet/components/App';
import HeaderBar from './components/HeaderBar';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import { Route } from 'react-router-dom';



class Main extends Component {
	render() {
		return (
			<App>
				<Article>
					<HeaderBar/>
					<Box>
						<Route exact path="/profile" component={Profile} />
						<Route exact path="/" component={LandingPage} />
					</Box>
				</Article>
			</App>
		);
	}
}

export default Main;

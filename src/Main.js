import React, {Component} from 'react';
import App from 'grommet/components/App';
import HeaderBar from './components/HeaderBar';
import Article from 'grommet/components/Article';
import AudioPlayer from './components/AudioPlayer';
import Profile from './components/Profile';
import { Route } from 'react-router-dom';

class Main extends Component {
	render() {
		return (
			<App>
				<Article>
					<HeaderBar/>
					<Route exact path="/profile" component={Profile} />
				</Article>
			</App>
		);
	}
}

export default Main;

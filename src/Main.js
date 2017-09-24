import React, {Component} from 'react';
import App from 'grommet/components/App';
import HeaderBar from './components/HeaderBar';
import Article from 'grommet/components/Article';
import Profile from './components/Profile';
import AudioPlayer from './components/AudioPlayer';

class Main extends Component {
	render() {
		return (
			<App>
				<Article>
					<HeaderBar/>
					<Profile />
				</Article>
			</App>
		);
	}
}

export default Main;

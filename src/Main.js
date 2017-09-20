import React, {Component} from 'react';
import App from 'grommet/components/App';
import HeaderBar from './components/HeaderBar';
import Article from 'grommet/components/Article';
import Profile from './components/Profile'
import AudioPlayer from './components/AudioPlayer';
import Label from 'grommet/components/Label';

class Main extends Component {
	render() {
		return (
			<div>
			<App>
				<Article>
					<HeaderBar/>
					<Profile />
				</Article>
				<AudioPlayer />
	  	</App>
				<AudioPlayer />
		</div>
		);
	}
}

export default Main;

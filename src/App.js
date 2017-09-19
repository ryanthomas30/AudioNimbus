import React, {Component} from 'react';
import App from 'grommet/components/App';
import HeaderBar from './components/HeaderBar';
import Article from 'grommet/components/Article';
import Profile from './components/Profile'

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

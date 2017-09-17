import React from 'react';
import App from 'grommet/components/App';
import Title from 'grommet/components/Title';
import HeaderBar from './components/HeaderBar';
import Article from 'grommet/components/Article';
import Profile from './components/Profile'

export default () => (
  <App>
		<Article>
			<HeaderBar/>
			<Profile />
		</Article>
  </App>
);

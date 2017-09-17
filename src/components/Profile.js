import React, { Component } from 'react';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Button from 'grommet/components/Button';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import About from './About';

class Profile extends Component{

	render () {
		return (
			<Box>
				<Hero background=
					{<Image src='http://lorempixel.com/1080/1920/abstract'
						fit='cover'
						full={true} />} />
				<Tabs justify='start'>
						<Tab title='Tracks'>

						</Tab>
						<Tab title='About'>
								<About/>
						</Tab>
				</Tabs>
			</Box>
		);
	}
}

export default Profile;

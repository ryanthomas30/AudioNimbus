import React, { Component } from 'react';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Image from 'grommet/components/Image';

class HeaderBar extends Component {

	render() {
		const logo = './full-logo.png'
		return(
			<Header splash={false} float={false} >
				<Image src={logo} />
				<Box flex={true}
					justify='end'
					direction='row'
					responsive={false}>
					<Search inline={true}
						fill={true}
						size='medium'
						placeHolder='search'
						dropAlign={{"right": "right"}}/>
				</Box>
			</Header>
		);
	}
}

export default HeaderBar;

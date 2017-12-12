import React, { Component } from 'react';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Paragraph from 'grommet/components/Paragraph';
import Footer from 'grommet/components/Footer'

class CopyrightFooter extends Component {
	render() {
		return (
			<Footer justify='center' fixed={true} margin={{ top: 'medium' }}  >
				<Box direction='row'
					align='center'
					pad={{"between": "medium"}}>
					<Paragraph margin='none'>
						© 2017 AudioNimbus
					</Paragraph>
					<Menu direction='row'
						size='medium'
						dropAlign={{"right": "right"}}>
						<Anchor href='https://github.com/ryanthomas30/AudioNimbus/issues/new'>
							Report a Bug
						</Anchor>
						<Anchor href='https://cseub.ryver.com/index.html#forums/1159410/chat'>
							Contact
						</Anchor>
						<Anchor href='https://goo.gl/forms/Jz5FdO1YoRNLKpm93'>
							Feedback
						</Anchor>
					</Menu>
				</Box>
			</Footer>
		);
	}
}

export default CopyrightFooter;

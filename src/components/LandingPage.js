import React, { Component } from 'react';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Hero from 'grommet/components/Hero';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';
import Paragraph from 'grommet/components/Paragraph';
import CloudUploadIcon from 'grommet/components/icons/base/CloudUpload';
import LinkIcon from 'grommet/components/icons/base/Link';

import HeaderBar from './HeaderBar';

class LandingPage extends Component {
	constructor(props) {
		super(props);

		this.state = { width: 0 };
	}

	componentDidMount() {
		this.setState({ width: document.getElementById('app').offsetWidth});
	}

	render() {
		return(
			<Box>
				<HeaderBar routesMatch={false} />
				<Box align='center' >
					<Article scrollStep={false}
						controls={false}
						justify='center'
						margin={{ top: 'small' }}
						align='center'
						style={{ width: this.state.width }} >
						<Hero background={<Image src={'landingpage-image.jpg'}
							fit='cover'
							full={true} />}
							size='large'
							style={{ width: this.state.width }}>
							<Box align='center' >
								<Image size='large' src='title-white.png' />
							</Box>
						</Hero>
						<Section pad='none'
							justify='center'
							align='center'
							size={{ height: 'large' }} >
							<Headline margin='medium' strong={false} >
								Welcome to AudioNimbus.
							</Headline>
							<Paragraph size='large' align='center' >
								AudioNimbus is an audio distribution web application for uploading
								music, podcasts, and other audio, enabling users to share their original audio content.
							</Paragraph>
						</Section>
						<Section pad='none'
							justify='center'
							align='center'
							size={{ height: 'large' }}
							style={{ width: this.state.width }} >
							<Headline margin='large' strong={false} >
								What We Do
							</Headline>
							<Box direction='row' justify='between' size='xxlarge' >
								<Box align='center' >
									<CloudUploadIcon size='xlarge' />
									<Paragraph size='large' align='center' >
										Upload your original audio content
									</Paragraph>
								</Box>
								<Box align='center' >
									<LinkIcon size='xlarge' />
									<Paragraph size='large' align='center' >
										Share your profile with anyone
									</Paragraph>
								</Box>
							</Box>
						</Section>
					</Article>
				</Box>
			</Box>
);
}
}

export default LandingPage;

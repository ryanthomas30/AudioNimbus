import React, { Component } from 'react';
import Header from 'grommet/components/Header';
import Article from 'grommet/components/Article';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Title from 'grommet/components/Title';
import Image from 'grommet/components/Image';
import Hero from 'grommet/components/Hero';
import Label from 'grommet/components/Label';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';
import Paragraph from 'grommet/components/Paragraph';
import Footer from 'grommet/components/Footer'
import CloudUploadIcon from 'grommet/components/icons/base/CloudUpload';
import LinkIcon from 'grommet/components/icons/base/Link';



class LandingPage extends Component {
	render() {
		return(
			<Box align='center' margin={{ top: 'small' }} >
				<Article scrollStep={false}
					controls={false}
					justify='center'
					align='center'
					style={{ width: window.innerWidth }} >
					<Hero background={<Image src={'http://blueprintmagazine.ca/wp-content/uploads/2012/07/cover1.jpg'}
						fit='cover'
						full={true} />}
						size='large'
						style={{ width: window.innerWidth }}>
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
						style={{ width: window.innerWidth }} >
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
					<Footer justify='center' fixed={true}  >
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
				</Article>
			</Box>
);
}
}

export default LandingPage;

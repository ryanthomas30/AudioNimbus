import React, { Component } from 'react';
import Header from 'grommet/components/Header';
import Article from 'grommet/components/Article';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Title from 'grommet/components/Title';
import Label from 'grommet/components/Label';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';
import Paragraph from 'grommet/components/Paragraph';



class LandingPage extends Component {

	render() {
		return(
			<Box>
				<Article scrollStep={false}
					controls={false}
					justify='center'
					align='center' >
					<Section pad='large'
						justify='center'
						align='center'
						full='vertical' >
						<Headline margin='none' >
							What is AudioNimbus?
						</Headline>
						<Paragraph size='medium' align='center' >
							AudioNimbus is an audio distribution web application for uploading
							music, podcasts, and other audio, enabling users to share their original audio content.
						</Paragraph>
					</Section>
					<Section pad='none'
						justify='center'
						align='center'
						full='vertical'
						colorIndex='accent-1-a'
						style={{ width: window.innerWidth }} >
						<Headline margin='large' >
							You should be able to
						</Headline>
						<Label size='medium' margin='small' >
							Create a profile page containing audio content.
						</Label>
						<Label size='medium' margin='small' >
							Personalize your profile page.
						</Label>
						<Label size='medium' margin='small' >
							Upload audio content to your profile.
						</Label>
						<Label size='medium' margin='small' >
							View audio content on other user profiles.
						</Label>
						<Label size='medium' margin='small' >
							Listen to audio content on a custom player.
						</Label>
					</Section>
					<Section pad='large'
						justify='center'
						align='center'
						full='vertical'>
						<Headline margin='none'>
							Section 3
						</Headline>
					</Section>
					<Section pad='large'
						justify='center'
						align='center'
						full='vertical'
						colorIndex='accent-1-a'
						style={{ width: window.innerWidth }} >
						<Headline margin='none'>
							Section 4
						</Headline>
					</Section>
					<Section pad='large'
						justify='center'
						align='center'
						full='vertical'>
						<Headline margin='none'>
							Section 5
						</Headline>
					</Section>
				</Article>
			</Box>
		);
	}
}

export default LandingPage;

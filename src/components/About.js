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
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Anchor from 'grommet/components/Anchor';
import Edit from 'grommet/components/icons/base/Edit';
import Headline from 'grommet/components/Headline';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';

class About extends Component {
	constructor(props) {
		super(props);

		this.state = {name: 'Tommy Li', bio: 'dasdasdasd', location: 'Buffalo', layerOn: 0 };
	}
	_closeEdit() {
		this.setState({layerOn: 0});
	}

	_openEdit() {
		this.setState({layerOn: 1});
	}

	render() {
		const editLayer = this.state.layerOn === 1 ?
			<Layer closer={true}
				align='center'
				onClose={() => this._closeEdit()} >
				<Box size='xlarge'
						 full={true}>
					<Form>
							<Header>
								<Heading margin='medium'>
									Edit Bio
								</Heading>
							</Header>
							<FormField label ='Name'>
								<TextInput defaultValue={this.state.name} />
							</FormField>
							<FormField label ='Bio'>
								<TextInput defaultValue={this.state.bio} />
							</FormField>
							<FormField label ='Location'>
								<TextInput defaultValue={this.state.location} />
							</FormField>
					</Form>
				</Box>
			</Layer> : '';
		return(
			<Box>
				{editLayer}
				<Header>
					<Box flex={true}
						justify='start'
						direction='row'
						responsive={false}>
							<Anchor icon={<Edit />}
						 		label='Edit'
							 	onClick={() => this._openEdit()} />
					</Box>
				</Header>
				<Section>
						<Heading>
							Name
						</Heading>
						<Title>
							{this.state.name}
						</Title>
				</Section>
				<Section>
						<Heading>
							Bio
						</Heading>
						<Paragraph>
							{this.state.bio}
						</Paragraph>
				</Section>
				<Section>
					<Heading>
						Location
					</Heading>
					<Title>
						{this.state.location}
					</Title>
				</Section>
			</Box>
		);
	}
}

export default About;

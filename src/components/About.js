import React, { Component } from 'react';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Edit from 'grommet/components/icons/base/Edit';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';

class About extends Component {
	constructor(props) {
		super(props);

		const { about } = this.props;
		this.state = { inputName: about.name, inputBio: about.bio,
			inputLocation: about.location, inputImage: about.image, layerOn: false };
	}

	// Closes the edit layer
	_closeEdit() {
		this.setState({ layerOn: false });
	}

	// Opens the edit layer and initializes input states to current redux state
	_openEdit() {
		const { about } = this.props;
		this.setState({layerOn: true, inputName: about.name, inputBio: about.bio,
			inputLocation: about.location, inputImage: about.image });
	}

	// Submits the form by calling action creator
	_submitForm() {
		const { inputName, inputBio, inputLocation, inputImage } = this.state;
		const { updateAbout, userId, getAbout, routeId } = this.props;
		updateAbout(userId, inputName, inputBio, inputLocation, inputImage, (success) => {
			if (success) {
				this._closeEdit();
				getAbout(routeId); // Might be redundant
			}
		});
	}

	// Sets the temporary state of corresponding field
	_handleNameChange(event) {
		this.setState({inputName: event.target.value});
	}

	_handleBioChange(event) {
		this.setState({inputBio: event.target.value});
	}

	_handleLocationChange(event) {
		this.setState({inputLocation: event.target.value});
	}

	_handleImageChange(event) {
		let reader = new FileReader();
		let file = event.target.files[0];
		reader.onloadend = () => {
			this.setState({ inputImage: reader.result });
		}
		reader.readAsDataURL(file);
	}

	render() {
		const { layerOn } = this.state;
		const { renderControls, about } = this.props;
		const btnStyle = { margin: '.2em' };
		const renderButton = renderControls ? (
			<Header>
				<Box flex={true}
					justify='start'
					direction='row'
					responsive={false}>
						<Button icon={<Edit />}
							style={btnStyle}
							label='Edit'
							primary={true}
							onClick={() => this._openEdit()} />
				</Box>
			</Header>
		) : '';
		const editLayer = layerOn === true ?
			<Layer closer={true}
				align='center'
				onClose={() => this._closeEdit()} >
				<Box size='xlarge'
						 full={true}>
					<Form onSubmit={() => this._submitForm()} >
							<Header>
								<Heading margin='medium'>
									Edit Bio
								</Heading>
							</Header>
							<FormField label='Name'>
								<TextInput defaultValue={about.name} onDOMChange={ (e) => this._handleNameChange(e) } />
							</FormField>
							<FormField label='Bio'>
								<TextInput defaultValue={about.bio} onDOMChange={ (e) => this._handleBioChange(e) } />
							</FormField>
							<FormField label='Location'>
								<TextInput defaultValue={about.location} onDOMChange={ (e) => this._handleLocationChange(e) } />
							</FormField>
							<FormField label='Upload Profile Image'>
								<input type="file" accept="image/*" onChange={ (e) => this._handleImageChange(e) }/>
							</FormField>
							<Footer pad={{vertical: 'medium'}}>
								<Button style={btnStyle} label='Submit' primary={true} onClick={ () => this._submitForm() } />
							</Footer>
					</Form>
				</Box>
			</Layer> : '';
		return(
			<Box>
				{editLayer}
				{renderButton}
				<Section>
						<Heading>
							Name
						</Heading>
						<Title>
							{about.name}
						</Title>
				</Section>
				<Section>
						<Heading>
							Bio
						</Heading>
						<Paragraph margin='none' >
							{about.bio}
						</Paragraph>
				</Section>
				<Section>
					<Heading>
						Location
					</Heading>
					<Title>
						{about.location}
					</Title>
				</Section>
			</Box>
		);
	}
}

export default About;

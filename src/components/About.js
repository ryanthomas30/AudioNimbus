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

		this.state = { name: 'Your Name', bio: 'Write something about yourself.', location: 'Buffalo, NY', inputName:'',
			inputBio: '', inputLocation: '', inputImage: '', layerOn: true };
	}

	// Closes the edit layer and sets the input states to empty strings
	_closeEdit() {
		this.setState({layerOn: false, inputName: '', inputBio: '', inputLocation: '', inputImage: ''});
	}

	// Opens the edit layer and initializes input states to current state
	_openEdit() {
		this.setState({layerOn: true, inputName: this.state.name, inputBio: this.state.bio, inputLocation: this.state.location, inputImage: this.props.imageURL });
	}

	// Submits the form by setting the new state of name, location, and bio
	_submitForm() {
		this._closeEdit();
		this.setState({name: this.state.inputName, bio: this.state.inputBio, location: this.state.inputLocation});
		let { changeImage } = this.props;
		changeImage(this.state.inputImage);
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
		const { name, bio, location, inputName, inputBio, inputLocation, inputImage, layerOn } = this.state;
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
								<TextInput defaultValue={name} onDOMChange={ (e) => this._handleNameChange(e) } />
							</FormField>
							<FormField label='Bio'>
								<TextInput defaultValue={bio} onDOMChange={ (e) => this._handleBioChange(e) } />
							</FormField>
							<FormField label='Location'>
								<TextInput defaultValue={location} onDOMChange={ (e) => this._handleLocationChange(e) } />
							</FormField>
							<FormField label='Upload Profile Image'>
								<input type="file" accept="image/*" onChange={ (e) => this._handleImageChange(e) }/>
							</FormField>
							<Footer pad={{vertical: 'medium'}}>
								<Button label='Submit' primary={true} onClick={ () => this._submitForm() } />
							</Footer>
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
							<Button icon={<Edit />}
						 		label='Edit'
								primary={true}
							 	onClick={() => this._openEdit()} />
					</Box>
				</Header>
				<Section>
						<Heading>
							Name
						</Heading>
						<Title>
							{name}
						</Title>
				</Section>
				<Section>
						<Heading>
							Bio
						</Heading>
						<Paragraph margin='none' >
							{bio}
						</Paragraph>
				</Section>
				<Section>
					<Heading>
						Location
					</Heading>
					<Title>
						{location}
					</Title>
				</Section>
			</Box>
		);
	}
}

export default About;

import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';
import TextInput from 'grommet/components/TextInput';

class UploadTrack extends Component {
	constructor(props) {
		super(props);

		this.state = { name: '', image: '', file: '' };
	}

	_handleNameChange(event) {
		this.setState({ name: event.target.value, image: this.state.image, file: this.state.file });
	}

	_handleImageChange(event) {
		let image = event.target.files[0];
		this.setState({ name: this.state.name, image: image, file: this.state.file });
	}

	_handleFileChange(event) {
		let file = event.target.files[0];
		this.setState({ name: this.state.name, image: this.state.image, file: file });
	}

	_submitForm() {
		this.props.closeUpload();
		const { userId, uploadTrack, history, routesMatch } = this.props;
		const { name, image, file } = this.state
		if (!routesMatch) {
			history.push(`/profile/${userId}`);
			location.reload();
		}
		uploadTrack(userId, name, image, file);
		this.setState({ name: '', image: '', file: '' });
	}

	render() {
		return (
			<Box size={{ height: 'xlarge', width: 'xlarge' }} >
				<Form onSubmit={() => this._submitForm()} >
						<Header>
							<Heading margin='medium'>
								Upload Track
							</Heading>
						</Header>
						<FormField label='Upload Track'>
							<input type="file" accept="audio/*" onChange={ (e) => this._handleFileChange(e) }/>
						</FormField>
						<FormField label='Track Name'>
							<TextInput defaultValue={name} onDOMChange={ (e) => this._handleNameChange(e) } />
						</FormField>
						<FormField label='Upload Track Image'>
							<input type="file" accept="image/*" onChange={ (e) => this._handleImageChange(e) }/>
						</FormField>
						<Footer pad={{vertical: 'medium'}}>
							<Button label='Submit' primary={true} onClick={ () => this._submitForm() } />
						</Footer>
				</Form>
			</Box>
		);
	}
}

function mapStateToProps(state) {
	return {
		userId: state.auth.userId,
	};
}

export default withRouter(connect(mapStateToProps, actions)(UploadTrack));

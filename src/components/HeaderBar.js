import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Layer from 'grommet/components/Layer';
import Label from 'grommet/components/Label';
import Search from 'grommet/components/Search';
import Image from 'grommet/components/Image';
import Signin from './auth/signin';
import FormField from 'grommet/components/FormField';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';
import TextInput from 'grommet/components/TextInput';
import Signup from './auth/signup';
import * as actions from '../actions';
import { connect } from 'react-redux';


class HeaderBar extends Component {
	constructor(props) {
		super(props);

		this.state = { signInOn: false, signUpOn: false, signOutOn: false, uploadOn: false,
		 	name: '', image: '', file: '' };

		this._closeSignIn = this._closeSignIn.bind(this);
		this._closeSignUp = this._closeSignUp.bind(this);
	}

	_openSignIn() {
		this.setState({ signInOn: true });
	}

	_closeSignIn() {
		this.props.clearError();
		this.setState({ signInOn: false });
	}

	_openSignUp() {
		this.setState({ signUpOn: true });
	}

	_closeSignUp() {
		this.props.clearError();
		this.setState({ signUpOn: false });
	}

	_openSignOut() {
		this.setState({ signOutOn: true });
	}

	_closeSignOut() {
		this.setState({ signOutOn: false });
	}

	_confirmSignOut() {
		this.props.signoutUser(() => {
			// this.props.history.push('/');
		});
		this._closeSignOut();
	}

	_closeUpload() {
		this.setState({ uploadOn: false, name: '', image: '', file: '' });
	}

	_openUpload() {
		this.setState({ uploadOn: true });
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
		this._closeUpload();
		const { userId, uploadTrack, getTracks } = this.props;
		const { name, image, file } = this.state
		uploadTrack(userId, name, image, file);
		getTracks(userId);
		location.reload();
	}

	render() {
		const logo = './full-logo.png';
		const addLayer = this.state.uploadOn ?
			<Layer closer={true}
				align='center'
				onClose={() => this._closeUpload()} >
				<Box size='xlarge'
						 full={true}>
					<Form onSubmit={() => this._submitForm()} >
							<Header>
								<Heading margin='medium'>
									Upload Track
								</Heading>
							</Header>
							<FormField label='Track Name'>
								<TextInput defaultValue={name} onDOMChange={ (e) => this._handleNameChange(e) } />
							</FormField>
							<FormField label='Upload Track Image'>
								<input type="file" accept="image/*" onChange={ (e) => this._handleImageChange(e) }/>
							</FormField>
							<FormField label='Upload Track'>
								<input type="file" accept="audio/*" onChange={ (e) => this._handleFileChange(e) }/>
							</FormField>
							<Footer pad={{vertical: 'medium'}}>
								<Button label='Submit' primary={true} onClick={ () => this._submitForm() } />
							</Footer>
					</Form>
				</Box>
			</Layer> : '';
		const signInLayer = this.state.signInOn ? (
			<Layer closer={true}
				align='center'
				onClose={() => this._closeSignIn()} >
				<Box size={{ width: 'large', height: 'large' }} full={false}>
					<Signin closeSignIn={this._closeSignIn} />
				</Box>
			</Layer>
		) : '';
		const signUpLayer = this.state.signUpOn ? (
			<Layer closer={true}
				align='center'
				onClose={() => this._closeSignUp()} >
				<Box size={{ width: 'large', height: 'large' }} full={false}>
					<Signup closeSignUp={this._closeSignUp} />
				</Box>
			</Layer>
		) : '';
		const signOutLayer = this.state.signOutOn ? (
			<Layer closer={true}
				align='center'
				onClose={() => this._closeSignOut()} >
				<Box size={{ height: 'small', width: 'medium' }} full={false} justify='center' align='center' >
					<Label>Are you sure you want to log out?</Label>
					<Box direction='row' pad={{ between: 'medium' }} >
						<Button label='Yes' primary={true} onClick={() => this._confirmSignOut()} />
						<Button label='Cancel' onClick={() => this._closeSignOut()} />
					</Box>
				</Box>
			</Layer>
		) : '';
		const buttons = this.props.authenticated ? [
			<Button label='Upload Track' primary={true} key={1} onClick={() => this._openUpload()} />,
			<Button label='Log Out' onClick={() => this._openSignOut()} key={2} />
		] : [
			<Button label='Log In' primary={true} onClick={() => this._openSignIn()} key={1} />,
			<Button label='Sign Up' onClick={() => this._openSignUp()} key={2} />
		];
		return(
			<Header splash={false} float={false} >
				{addLayer}
				{signInLayer}
				{signUpLayer}
				{signOutLayer}
				<Image src={logo} />
				<Box flex={true}
					justify='end'
					direction='row'
					responsive={false}
					pad={{ between: 'small' }} >
					<Box margin='small' size={{ width: 'medium' }} >
						<Search inline={true}
							fill={true}
							size='medium'
							placeHolder='search'
							dropAlign={{"right": "right"}} />
					</Box>
					<Box direction='row' pad={{between: 'small' }} margin='small' >
						{buttons}
					</Box>
				</Box>
			</Header>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated,
		userId: state.auth.userId
	};
}

export default connect(mapStateToProps, actions)(withRouter(HeaderBar));

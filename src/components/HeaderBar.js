import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';

import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import Layer from 'grommet/components/Layer';
import Label from 'grommet/components/Label';
import Search from 'grommet/components/Search';
import Image from 'grommet/components/Image';
import FormField from 'grommet/components/FormField';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';
import TextInput from 'grommet/components/TextInput';
import UserIcon from 'grommet/components/icons/base/User';
import CloudUploadIcon from 'grommet/components/icons/base/CloudUpload';
import LogoutIcon from 'grommet/components/icons/base/Logout';
import LoginIcon from 'grommet/components/icons/base/Login';

import Signup from './auth/signup';
import Signin from './auth/signin';

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
		const { userId, uploadTrack, routesMatch, history } = this.props;
		const { name, image, file } = this.state
		if (!routesMatch) {
			history.push(`/profile/${userId}`);
			location.reload();
		}
		uploadTrack(userId, name, image, file);
	}

	_onSearch(event) {
		let search = event.target.value;
		const { getUsers } = this.props;
		getUsers(search);
	}

	_onSuggestionSelect(selectObj, selected) {
		// console.log(selectObj);
		this.props.history.replace(`/profile/${selectObj.suggestion._id}`);
		location.reload();
	}

	render() {
		const { userId, userList } = this.props;
		const logo = '../full-logo.png';
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
		const profileUri = `/profile/${userId}`;
		const buttons = this.props.authenticated ? [
			<Anchor icon={<UserIcon />} href={profileUri} key={1} />,
			<Button label='Upload Track' icon={<CloudUploadIcon />} primary={true} key={2} onClick={() => this._openUpload()} />,
			<Button label='Log Out' icon={<LogoutIcon />} onClick={() => this._openSignOut()} key={3} />
		] : [
			<Button label='Log In' icon={<LoginIcon />} primary={true} onClick={() => this._openSignIn()} key={1} />,
			<Button label='Sign Up' onClick={() => this._openSignUp()} key={2} />
		];
		return(
			<Header splash={false} float={false} fixed={false} >
				{addLayer}
				{signInLayer}
				{signUpLayer}
				{signOutLayer}
				<Box justify='start'>
					<Button icon={<Image src={logo} role='presentation' />} href='/' />
				</Box>
				<Box justify='end'
					direction='row'
					responsive={false}
					pad={{ between: 'small' }}
					style={{ width: '100%' }} >
					<Search inline={true}
						fill={true}
						placeHolder='search'
						onDOMChange={(e) => this._onSearch(e)}
						suggestions={userList}
						onSelect={(selectObj ,selected) => this._onSuggestionSelect(selectObj, selected)}
						style={{ width: '100%' }} />
					{buttons}
				</Box>
			</Header>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated,
		userId: state.auth.userId,
		userList: state.profile.users
	};
}

export default withRouter(connect(mapStateToProps, actions)(HeaderBar));

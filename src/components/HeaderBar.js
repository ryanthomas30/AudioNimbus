import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import Layer from 'grommet/components/Layer';
import Label from 'grommet/components/Label';
import Search from 'grommet/components/Search';
import Image from 'grommet/components/Image';
import UserIcon from 'grommet/components/icons/base/User';
import CloudUploadIcon from 'grommet/components/icons/base/CloudUpload';
import LogoutIcon from 'grommet/components/icons/base/Logout';
import LoginIcon from 'grommet/components/icons/base/Login';

import Signup from './auth/signup';
import Signin from './auth/signin';
import UploadTrack from './UploadTrack';

class HeaderBar extends Component {
	constructor(props) {
		super(props);

		this.state = { signInOn: false, signUpOn: false, signOutOn: false, uploadOn: false };

		this._closeSignIn = this._closeSignIn.bind(this);
		this._closeSignUp = this._closeSignUp.bind(this);
		this._closeUpload = this._closeUpload.bind(this);
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
		this.setState({ uploadOn: false });
	}

	_openUpload() {
		this.setState({ uploadOn: true });
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
		const { userId, userList, authenticated } = this.props;
		const { uploadOn, signInOn, signUpOn, signOutOn } = this.state;
		const logo = '../full-logo.png';
		const addLayer =
			<Layer closer={true}
				align='center'
				onClose={() => this._closeUpload()}
				hidden={!uploadOn} >
				<UploadTrack closeUpload={this._closeUpload} routesMatch={this.props.routesMatch} />
			</Layer>;
		const signInLayer =
			<Layer closer={true}
				align='center'
				onClose={() => this._closeSignIn()}
				hidden={!signInOn} >
				<Box size={{ width: 'large', height: 'large' }} full={false}>
					<Signin closeSignIn={this._closeSignIn} />
				</Box>
			</Layer>;
		const signUpLayer =
			<Layer closer={true}
				align='center'
				onClose={() => this._closeSignUp()}
				hidden={!signUpOn} >
				<Box size={{ width: 'large', height: 'large' }} full={false}>
					<Signup closeSignUp={this._closeSignUp} />
				</Box>
			</Layer>;
		const signOutLayer =
			<Layer closer={true}
				align='center'
				onClose={() => this._closeSignOut()}
				hidden={!signOutOn} >
				<Box size={{ height: 'small', width: 'medium' }} full={false} justify='center' align='center' >
					<Label>Are you sure you want to log out?</Label>
					<Box direction='row' pad={{ between: 'medium' }} >
						<Button label='Yes' primary={true} onClick={() => this._confirmSignOut()} />
						<Button label='Cancel' onClick={() => this._closeSignOut()} />
					</Box>
				</Box>
			</Layer>;
		const profileUri = `/profile/${userId}`;
		const buttons = authenticated ? [
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

import React, { Component } from 'react';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Layer from 'grommet/components/Layer';
import Label from 'grommet/components/Label';
import Search from 'grommet/components/Search';
import Image from 'grommet/components/Image';
import Signin from './auth/signin';
import Signup from './auth/signup';
import * as actions from '../actions';
import { connect } from 'react-redux';


class HeaderBar extends Component {
	constructor(props) {
		super(props);

		this.state = { signInOn: false, signUpOn: false, signOutOn: false };

		this._closeSignIn = this._closeSignIn.bind(this);
		this._closeSignUp = this._closeSignUp.bind(this);
	}

	_openSignIn() {
		this.setState({ signInOn: true });
	}

	_closeSignIn() {
		this.setState({ signInOn: false });
	}

	_openSignUp() {
		this.setState({ signUpOn: true });
	}

	_closeSignUp() {
		this.setState({ signUpOn: false });
	}

	_openSignOut() {
		this.setState({ signOutOn: true });
	}

	_closeSignOut() {
		this.setState({ signOutOn: false });
	}

	_confirmSignOut() {
		this.props.signoutUser();
		this._closeSignOut();
	}

	render() {
		const logo = './full-logo.png'
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
						<Button label='Yes' primary='true' onClick={() => this._confirmSignOut()} />
						<Button label='Cancel' onClick={() => this._closeSignOut()} />
					</Box>
				</Box>
			</Layer>
		) : '';
		const buttons = this.props.authenticated ? [
			<Button label='Upload Track' primary='true' />,
			<Button label='Log Out' onClick={() => this._openSignOut()} />
		] : [
			<Button label='Log In' primary='true' onClick={() => this._openSignIn()} />,
			<Button label='Sign Up' onClick={() => this._openSignUp()} />
		];
		return(
			<Header splash={false} float={false} >
				{signInLayer}
				{signUpLayer}
				{signOutLayer}
				<Image src={logo} />
				<Box flex={true}
					justify='end'
					direction='row'
					responsive={false}
					pad={{ between: 'small' }} >
					<Search inline={true}
						fill={true}
						size='medium'
						placeHolder='search'
						dropAlign={{"right": "right"}} />
						<Box direction='row' pad={{ between: 'small' }} margin='small' >
							{buttons}
						</Box>
				</Box>
			</Header>
		);
	}
}

function mapStateToProps(state) {
	return {
	authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps, actions)(HeaderBar);

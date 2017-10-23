import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import LoginForm from 'grommet/components/LoginForm';
import Box from 'grommet/components/Box';

class Signin extends Component {
	constructor(props) {
		super(props);

		this._handleFormSubmit = this._handleFormSubmit.bind(this);
	}

	_handleFormSubmit(login) {
		// Need to do somethign to log user in
		let { password } = login;
		let email = login.username;
		this.props.signinUser({ email, password }, (success, userId) => {
			if (success) {
				this.props.closeSignIn();
				this.props.history.push(`/profile/${userId}`);
				location.reload();
			}
		});
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className='alert alert-danger'>
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>

			);
		}
	}

	render() {
		return (
			<Box justify='center' align='center' full={true} >
				<LoginForm align='center' title='Log In'
					onSubmit={(login) => this._handleFormSubmit(login)} />
				{this.renderAlert()}
			</Box>

		);
	}
}

function mapStateToProps(state) {
	return {
		errorMessage: state.auth.error,
		userID: state.auth.userID
	};
}

export default connect(mapStateToProps, actions)(withRouter(Signin));

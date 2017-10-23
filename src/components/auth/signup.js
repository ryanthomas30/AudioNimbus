import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';


class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = { inputEmail: '', inputPassword: '', inputConfirmPassword: '',
			inputErrors: { email: '', password: '', passwordConfirm: '' } };

		this._handleFormSubmit = this._handleFormSubmit.bind(this);
	}

	// Calls action creator if there are no errors
	_handleFormSubmit() {
		// If there are errors, do not Submit
		let errors = this._validate();
		if(errors.email || errors.password || errors.passwordConfirm) {
			return;
		}
		// Call action creator to sign up the user
		let email = this.state.inputEmail;
		let password = this.state.inputPassword;
		this.props.signupUser({ email, password }, (success, userId) => {
			if (success) {
				this.props.closeSignUp();
				this.props.history.push(`/profile/${userId}`);
				this.setState({ inputEmail: '', inputPassword: '', inputConfirmPassword: '',
					inputErrors: { email: '', password: '', passwordConfirm: '' } });
				location.reload();
			}
		});
	}

	// Sets the temporary state of email
	_handleEmailChange(event) {
		this.setState({inputEmail: event.target.value});
	}

	// Sets the temporary state of password
	_handlePassChange(event) {
		this.setState({inputPassword: event.target.value});
	}

	// Sets the temporary state of password confirmation
	_handleConfirmPassChange(event) {
		this.setState({inputConfirmPassword: event.target.value});
	}

	_validate() {
	  let errors = {}
	// Checks if any fields are empty and if passwords match

		if (!this.state.inputEmail) {
			errors.email = 'Please enter an email';
		}

		if (this.state.inputPassword !== this.state.inputConfirmPassword) {
			errors.password = 'Passwords must match';
		}

		if (!this.state.inputPassword) {
			errors.password = 'Please enter a password';
		}

		if (!this.state.inputConfirmPassword) {
			errors.passwordConfirm = 'Field cannot be empty';
		}

		this.setState({
			inputErrors: {
				email: errors.email,
				password: errors.password,
				passwordConfirm: errors.passwordConfirm
			}
		});
		return errors;
	}


	renderAlert() {
		if (this.props.errorMessage) {
			return (
			  <div>
				  <strong>Oops!</strong> {this.props.errorMessage}
			  </div>
		  );
	  }
  }

	render() {
		const { email, password, passwordConfirm } = this.state.inputErrors;
		return (
			<Form onSubmit={() => this._handleFormSubmit()}>
				<Header>
					<Heading margin='medium'>
						Create An Account
					</Heading>
				</Header>
				<FormField label='Email' error={email} >
					<TextInput onDOMChange={(e) => this._handleEmailChange(e)} />
				</FormField>
				<FormField label='Password' error={password} >
					<TextInput onDOMChange={(e) => this._handlePassChange(e)} type='password' />
				</FormField>
				<FormField label='Confirm Password' error={passwordConfirm} >
					<TextInput onDOMChange={(e) => this._handleConfirmPassChange(e)} type='password' />
				</FormField>
				{this.renderAlert()}
				<Footer pad={{vertical: 'medium'}}>
					<Button label='Sign Up' primary={true} onClick={() => this._handleFormSubmit()} />
				</Footer>
			</Form>
		);
	}
}

function mapStateToProps(state) {
	return {
		errorMessage: state.auth.error
	};
}

export default connect(mapStateToProps, actions)(withRouter(Signup));

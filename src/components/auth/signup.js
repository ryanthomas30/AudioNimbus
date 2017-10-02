import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';

// Hoisted up not to render each time from scratch in the component (which would result in losing focus)
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <FormField>
    <label htmlFor={input.name}>{label}</label>
    <TextInput {...input} type={type}/>
    { touched && error && <span>{error}</span> }
 </FormField>
)

class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = { inputEmail: '', inputPassword: '', inputConfirmPassword: '' };

		this._handleFormSubmit = this._handleFormSubmit.bind(this);
	}

	_handleFormSubmit() {
		// If there are errors, do not Submit
		let errors = this._validate();
		if(!errors.email || !errors.password || !errors.passwordConfirm) {
			return;
		}
		// Call action creator to sign up the user
		let email = this.state.inputEmail;
		let password = this.state.inputPassword;
		this.props.signupUser({ email, password });
		this.setState({ inputEmail: '', inputPassword: '', inputConfirmPassword: '' })
	}

	// Sets the temporary state of corresponding field
	_handleEmailChange(event) {
		this.setState({inputEmail: event.target.value});
	}

	_handlePassChange(event) {
		this.setState({inputPassword: event.target.value});
	}

	_handleConfirmPassChange(event) {
		this.setState({inputConfirmPassword: event.target.value});
	}

	_validate() {
	  let errors = {}

		if (!this.state.inputEmail) {
			errors.email = 'Please enter an email'
		}

		if (!this.state.inputPassword) {
			errors.password = 'Please enter a password'
		}

		if (!this.state.inputConfirmPassword) {
			errors.passwordConfirm = 'Please enter a password confirmation'
		}

	  if (this.state.inputPassword !== this.state.inputConfirmPassword) {
	    errors.password = 'Passwords must match'
	  }

	  return errors
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
			<Form onSubmit={() => this._handleFormSubmit()}>
				<Header>
					<Heading margin='medium'>
						Create An Account
					</Heading>
				</Header>
				<FormField label='Email' >
					<TextInput onDOMChange={(e) => this._handleEmailChange(e)} />
				</FormField>
				<FormField label='Password' >
					<TextInput onDOMChange={(e) => this._handlePassChange(e)} />
				</FormField>
				<FormField label='Confirm Password' >
					<TextInput onDOMChange={(e) => this._handleConfirmPassChange(e)} />
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

export default connect(mapStateToProps, actions)(Signup);

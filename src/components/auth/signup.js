import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

// Hoisted up not to render each time from scratch in the component (which would result in losing focus)
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <fieldset className="form-group">
    <label htmlFor={input.name}>{label}</label>
    <input className="form-control" {...input} type={type}/>
    { touched && error && <span className="text-danger">{error}</span> }
  </fieldset>
)

class Signup extends Component {

	handleFormSubmit({ email, password }) {
		// Call action creator to sign up the user
		this.props.signupUser({ email, password });
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
		const { handleSubmit } = this.props;
		return (
		<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
			<Field name="email" component={renderField} type="email" label="Email"/>
			<Field name="password" component={renderField} type="password" label="Password"/>
			<Field name="passwordConfirm" component={renderField} type="password" label="Confirm Password"/>
			{this.renderAlert()}
			<button type="submit" className="btn btn-primary">Sign Up</button>
		</form>
	);
	}
}

function validate(values) {
  let errors = {}

	if (!values.email) {
		errors.email = 'Please enter an email'
	}

	if (!values.password) {
		errors.password = 'Please enter a password'
	}

	if (!values.passwordConfirm) {
		errors.passwordConfirm = 'Please enter a password confirmation'
	}

  if (values.password !== values.passwordConfirm) {
    errors.password = 'Passwords must match'
  }

  return errors
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
 };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form:'signup',
  validate
})(Signup));

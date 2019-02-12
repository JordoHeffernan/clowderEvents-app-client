import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm, focus, reset } from 'redux-form';
import { editUser, wasSubmitted, toggleEditing } from '../../actions/users';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Input from '../input';
import '../css/form.css';
import { required, nonEmpty, matchesDirty, length, isTrimmed } from '../../validators';
const passwordLength = length({ min: 8, max: 72 });
const matchesDirtyPassword = matchesDirty('password');

export class EditUserSettingsForm extends React.Component {

  componentDidMount() {

  }

  onSubmit(values) {
    const { username, password, fullName } = values;
    const user = { username, password, fullName };
    if (!user.password) {
      delete user.password;
    }
    if (user.username === this.props.initialValues.username) {
      delete user.username;
    }
    const { id } = this.props.match.params;
    if (user.password) {
      return this.props
        .dispatch(editUser(id, user))
        .then(() => this.props.dispatch(login(username, password)))
        .then(() => this.props.dispatch(toggleEditing()));
    } else {
      return this.props
        .dispatch(editUser(id, user))
        .then(() => this.props.dispatch(toggleEditing()));
    }
  }

  render() {

    return (
      <div className="registration-home">
        <h3>Change Your Settings</h3>
        <form
          className="registration-form"
          onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values))}>
          <label htmlFor="fullName">Full Name</label>
          <Field component={Input}
            type="text"
            name="fullName"
            validate={[required, nonEmpty, isTrimmed]} />
          <label htmlFor="username">Username</label>
          <Field
            component={Input}
            type="text"
            name="username"
            validate={[required, nonEmpty, isTrimmed]}
          />
          <label htmlFor="password">New Password</label>
          <Field
            component={Input}
            type="password"
            name="password"
            autocomplete="new-password"
            validate={[passwordLength, isTrimmed]}
          />
          <label htmlFor="passwordConfirm">Confirm New password</label>
          <Field
            component={Input}
            type="password"
            name="passwordConfirm"
            autocomplete="off"
            validate={[matchesDirtyPassword, isTrimmed]}
          />
          <button
            type="submit"
            disabled={this.props.pristine || this.props.submitting}>
            Save Changes
          </button>
          <button
            type='button'
            onClick={() => this.props.dispatch(toggleEditing())}
          >Cancel
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    initialValues: state.auth.currentUser,
    loggedIn: state.auth.currentUser !== null,
    wasSubmitted: state.auth.wasSubmitted,
  };
};

export default connect(mapStateToProps)(withRouter(reduxForm({
  form: 'registration',
  enableReinitialize: true,
  onSubmitFail: (errors, dispatch) => {
    dispatch(focus('registration', Object.keys(errors)[0]));
  }
})(EditUserSettingsForm)));

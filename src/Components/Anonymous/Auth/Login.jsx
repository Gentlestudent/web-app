import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './Register';
import { ResetPasswordLink } from './ResetPassword';
import { auth } from '../../../Utils/Firebase';

import * as routes from '../../../routes/routes';

const SignInPage = ({ history }) =>
  <div className="content content-with-padding register-form-content">
    {/* <h1>SignIn</h1> */}
    <SignInForm history={history} />
    <SignUpLink />
    <ResetPasswordLink />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.FrontPage);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    return (
      <div className="register-form login-page">
        <div className="cl-wh" id="f-mlb">Log in</div>
        <br/>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="cl-wh f-lb">E-mailadres:</label>
            <div className="f-i-bx b3 mrg3b">
              <div className="tb">
                <div className="td icon"><i className="fas fa-envelope"></i></div>
                <div className="td prt">
                  <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="cl-wh f-lb">Wachtwoord:</label>
              <div className="f-i-bx b3 mrg3b">
                <div className="tb">
                  <div className="td icon"><i className="fas fa-lock"></i></div>
                  <div className="td prt">
                    <input
                      value={password}
                      onChange={event => this.setState(byPropKey('password', event.target.value))}
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
          </div>
          <div id="s-btn" className="mrg25t"><input type="submit" value="Sign in" className="b3"/></div>
          {/* <button disabled={isInvalid} type="submit"> */}
            {/* Sign In
          </button> */}

          { error && <p>{error.message}</p> }
        </form>
      </div>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
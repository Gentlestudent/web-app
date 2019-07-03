import React, { Component } from 'react';
import {
    Link,
    withRouter,
    Redirect
  } from 'react-router-dom';
import { auth } from '../../../Utils/Firebase';
import * as routes from '../../../routes/routes';

const ResetPasswordPage = ({history}) => 
    <div className="content content-with-padding register-form-content">
        <ResetPasswordForm history={history} />
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class ResetPasswordForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : "",
            error : null,
            success : null
        };
    }

    onSubmit = (e) => {
        const {email} = this.state;
        auth.doPasswordReset(email)
            .then( () => {
                this.setState(byPropKey('success', "You will receive a mail to reset your password"));
            })
            .catch( (error) => {
                console.log("Password reset error : ", error);
                this.setState(byPropKey('error', error));
            })
        e.preventDefault();
    }

    render() {
        const {email, error, success} = this.state;

        return (
            <div className="register-form login-page">
            <div class="cl-wh" id="f-mlb">Reset Password</div>
            <br/>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label class="cl-wh f-lb">E-mailadres:</label>
                <div class="f-i-bx b3 mrg3b">
                  <div class="tb">
                    <div class="td icon"><i class="fas fa-envelope"></i></div>
                    <div class="td prt">
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

              <div id="s-btn" class="mrg25t"><input type="submit" value="Reset Password" class="b3"/></div>
              { error && <p>{error.message}</p> }
              { success && <p> {success} </p>}
            </form>
          </div>
        );
    }
}

const ResetPasswordLink = () => 
    <p>
        Forgot your password ? 
        { ' ' }
        <Link to={routes.ResetPassword}> Click here </Link>
    </p>

export default withRouter(ResetPasswordPage);

export {
    ResetPasswordLink,
    ResetPasswordForm
};
import React, { Component } from 'react';
import './Auth.scss';

import { observer } from 'mobx-react';

interface AuthProps {
}

interface AuthState {
  form?: number
}

@observer class Auth extends Component<AuthProps, AuthState> {

  constructor(props: any) {
    super(props);

    this.state = {
      form: 0
    }

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  getFormContext() {
    switch (this.state.form) {
      case 0:
        return <div className="SignIn">
          <h1 className="SignIn-title">Sign In</h1>
          <div className="SignIn-container">
            <input placeholder="Email" className="SignIn-input" type="email" />
            <input placeholder="Password" className="SignIn-input" type="password" />
          </div>
          <div className="SignIn-containerBtn">
            <h3 onClick={ (e: any) => {
              e.preventDefault();
              this.setState({
                form: 1
              });
            }} className="SignIn-btn hvr-underline-from-left" >SIGN UP</h3>
            <h3 className="SignIn-btn hvr-underline-from-right" >ACCEPT</h3>
          </div>
        </div>;
        break;
      case 1:
        return <div className="SignUp">
        <h1 className="SignUp-title">Sign Up</h1>
          <div className="SignUp-container">
            <input placeholder="Name" className="SignUp-input" type="text" />
            <input placeholder="Email" className="SignUp-input" type="email" />
            <input placeholder="Password" className="SignUp-input" type="password" />
          </div>
          <div className="SignUp-containerBtn">
            <h3 onClick={ (e: any) => {
              e.preventDefault();
              this.setState({
                form: 0
              });
            }} className="SignUp-btn hvr-underline-from-left" >SIGN IN</h3>
            <h3 className="SignUp-btn hvr-underline-from-right" >ACCEPT</h3>
          </div>
        </div>;
        break;
    }
    return <p>Loading...</p>;
  }

  render() {

    return (
      <div className="Auth">

        {this.getFormContext()}

      </div>
    );
  }
}

export default Auth;

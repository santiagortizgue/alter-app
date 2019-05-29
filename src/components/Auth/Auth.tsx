import React, { Component } from 'react';
import './Auth.scss';

import { observer } from 'mobx-react';
import stores from '../../stores/Stores';

interface AuthProps {
  history?: any
}

interface AuthState {
  form?: number,
  displayName?: string,
  email?: string,
  password?: string
}

@observer class Auth extends Component<AuthProps, AuthState> {

  constructor(props: any) {
    super(props);

    this.state = {
      form: 0,
      email: "",
      password: "",
      displayName: ""
    }

  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  getFormContext() {
    switch (this.state.form) {
      case 0:
        return <div className="SignIn">
          <h1 className="SignIn-title">Sign In</h1>
          <div className="SignIn-container">
            <input onChange={(e: any) => this.setState({email: e.target.value}) } placeholder="Email" className="SignIn-input" type="email" />
            <input onChange={(e: any) => this.setState({password: e.target.value}) } placeholder="Password" className="SignIn-input" type="password" />
          </div>
          <div className="SignIn-containerBtn">
            <h3 onClick={(e: any) => {
              e.preventDefault();
              this.setState({
                form: 1
              });
            }} className="SignIn-btn hvr-underline-from-left" >SIGN UP</h3>
            <h3 onClick={(e: any) => {
              e.preventDefault();
              if (this.state.email && this.state.email !== "" && this.state.password && this.state.password !== "") {
                stores.authStore.signIn(this.state.email, this.state.password);
                  this.setState({
                    email: "",
                    password: ""
                  });
              }
            }} className="SignIn-btn hvr-underline-from-right" >ACCEPT</h3>
          </div>
        </div>;
        break;
      case 1:
        return <div className="SignUp">
          <h1 className="SignUp-title">Sign Up</h1>
          <div className="SignUp-container">
            <input onChange={(e: any) => this.setState({displayName: e.target.value}) } placeholder="Nickname" className="SignUp-input" type="text" />
            <input onChange={(e: any) => this.setState({email: e.target.value}) } placeholder="Email" className="SignUp-input" type="email" />
            <input onChange={(e: any) => this.setState({password: e.target.value}) } placeholder="Password" className="SignUp-input" type="password" />
          </div>
          <div className="SignUp-containerBtn">
            <h3 onClick={(e: any) => {
              e.preventDefault();
              this.setState({
                form: 0
              });
            }} className="SignUp-btn hvr-underline-from-left" >SIGN IN</h3>
            <h3 onClick={(e: any) => {
              e.preventDefault();
              if (this.state.displayName && this.state.displayName !== "" && this.state.email && this.state.email !== "" && this.state.password && this.state.password !== "") {
                stores.authStore.createNewUser(this.state.displayName, this.state.email, this.state.password);
                this.setState({
                  email: "",
                  password: "",
                  displayName: ""
                });
              }
            }} className="SignUp-btn hvr-underline-from-right" >ACCEPT</h3>
          </div>
        </div>;
        break;
    }
    return <p>Loading...</p>;
  }

  render() {

    return (
      <section className="Auth">

        {this.getFormContext()}

      </section>
    );
  }
}

export default Auth;

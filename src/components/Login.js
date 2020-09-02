import React, { useState } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { signIn, signUp } from "../Api/user";
import "./Login.css";
import Main from "./Main";

class Login extends React.Component {
  state = {
    emailInput: "",
    nameInput: "",
    isLoggedIn: false,
    SignUpSuccess: false,
    noneRegisterError: false,
    nameError: false,
    emailbeenusedError: false,
  };

  handleEmailOnchange = (event) => {
    this.setState({ emailInput: event.target.value });
  };

  handleNameOnchange = (event) => {
    this.setState({ nameInput: event.target.value });
  };

  handleSignInSubmit = async () => {
    const { emailInput, nameInput } = this.state;
    const { data } = await signIn({ email: emailInput, name: nameInput });

    // console.log(data);

    if (data.success) {
      this.setState({ isLoggedIn: true });
    } else if (data.message === "wrong name!") {
      this.setState({
        isLoggedIn: false,
        noneRegisterError: false,
        nameError: true,
        emailbeenusedError: false,
      });
    } else if (data.message === "registe first!") {
      this.setState({
        isLoggedIn: false,
        noneRegisterError: true,
        nameError: false,
        emailbeenusedError: false,
      });
    }
  };

  handleSignUpSubmit = async () => {
    const { emailInput, nameInput } = this.state;

    console.log(emailInput,nameInput);

    const { data } = await signUp({
      email: emailInput,
      name: nameInput,
    });

    console.log(data);

    if (data.success) {
      this.setState({ SignUpSuccess: true });
    } else if (data.message === "this email has been registered.") {
      this.setState({
        isLoggedIn: false,
        noneRegisterError: false,
        nameError: false,
        emailbeenusedError: true,
      });
    }
  };

  errorRender = (str) => {
    return <div className="error-section">{str}</div>;
  };

  render() {
    const {
      emailInput,
      nameInput,
      isLoggedIn,
      noneRegisterError,
      nameError,
      emailbeenusedError,
    } = this.state;

    return (
      <div className="base-container">
        <div className="login-container">
          <div id="login-form">
            <label>Email:</label>
            <br />
            <input
              type="text"
              value={emailInput}
              onChange={this.handleEmailOnchange}
            />
            <br />
            <label>Name:</label>
            <br />
            <input
              type="text"
              value={nameInput}
              onChange={this.handleNameOnchange}
            />
            {nameError ? this.errorRender("the name is not correct") : null}
            {noneRegisterError
              ? this.errorRender("please registe first!")
              : null}
            {emailbeenusedError
              ? this.errorRender("this email was registed before")
              : null}
            <div className="button-container">
              <button id="login-button" onClick={this.handleSignInSubmit}>
                Sign In
              </button>
              <button id="login-button" onClick={this.handleSignUpSubmit}>
                Sign Up
              </button>
              {isLoggedIn ? (
                <Redirect to={`/app/?Email=${emailInput}&Name=${nameInput}`} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

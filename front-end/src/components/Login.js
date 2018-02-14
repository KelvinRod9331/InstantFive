import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';
import Home from './Home'
class Login extends React.Component {

  state = {
    usernameInput: '',
    passwordInput: '',
    confirmInput: '',
    message: '',
    loggedIn: false
  };

  handleUsernameChange = e => {
    this.setState({
      usernameInput: e.target.value
    });
  };

  handlePasswordChange = e => {
    this.setState({
      passwordInput: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();
    const { usernameInput, passwordInput } = this.state;

    axios
      .post('/users/login', {
        username: usernameInput,
        password: passwordInput
      })
      .then(res => {
        // this.props.setUser(res.data);
        this.setState({
          loggedIn: true
        });
      })
      .catch(err => {
        this.setState({
          usernameInput: '',
          passwordInput: '',
          message: 'username/password not found'
        });
      });
      
  };

  render() {
    const { usernameInput, passwordInput, message, loggedIn } = this.state;
console.log({UserInput: usernameInput, UserPass: passwordInput, Message: message, LoggedIN: loggedIn})

    if (loggedIn) {
      // return <Redirect to="/user" />;
      return <Home loggedIn = {loggedIn} />
    }

    return (
        <div id='parent'>
          <div class='photo-container'></div>
            <div class='login-container' >
                <div class='login-box'>
                <h1>Instant Five</h1>
                    <form onSubmit={this.submitForm}>
                    <label>
                        <input
                        type="text"
                        name="username"
                        placeholder='Username'
                        value={usernameInput}
                        onChange={this.handleUsernameChange}
                        />
                    </label>

                    <label>
                        <input
                        type="password"
                        name="username"
                        placeholder='Password'
                        value={passwordInput}
                        onChange={this.handlePasswordChange}
                        />
                    </label>

                    <input type="submit" value="Log In" />
                    </form>
                    <p>{message}</p>
                </div>
                <div class='login-box'>
                Don't have an account? <Link to="/registration">Sign Up</Link>
                </div>
            </div>
        </div>
    );
  }
}

export default Login;

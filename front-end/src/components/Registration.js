import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router"

class Registration extends React.Component {
  state = { 
    emailInput: '', 
    fullNameInput: '', 
    usernameInput: '', 
    passwordInput: '', 
    confirmInput: '', 
    message: '', 
    registered: false 
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

  handleConfirmChange = e => {
    this.setState({
      confirmInput: e.target.value
    });
  };

  handleEmailChange = e => {
    this.setState({
      emailInput: e.target.value
    });
  };

  handleFullNameChange = e => {
    this.setState({
      fullNameInput: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();
    const { usernameInput, passwordInput, confirmInput, emailInput, fullNameInput, registered } = this.state;

    if (passwordInput.length <= 6) {
      this.setState({
        message: 'Password length must be at least 7 characters'
      });
      return;
    }
    if (passwordInput !== confirmInput) {
      this.setState({
        message: 'Passwords do not match!'
      });
      return;
    }
    axios
      .post('/users/new', {
        username: usernameInput,
        password: passwordInput,
        email: emailInput,
        full_name: fullNameInput
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          usernameInput: '',
          passwordInput: '',
          confirmInput: '',
          emailInput: '',
          fullNameInput: '',
          registered: true,
          message: `Welcome to the site ${this.state.usernameInput}`
        });
      })
      .catch(err => {
        console.log('error: ', err);
        this.setState({
          usernameInput: '',
          passwordInput: '',
          confirmInput: '',
          emailInput: '',
          usernameInput: '',
          message: 'Error inserting user'
        });
      });
  };

  render() {
    const { emailInput, fullNameInput, usernameInput, passwordInput, confirmInput, message, registered } = this.state;
    // if (registered) {
    //   return <Redirect to='/user' />
    // }
    return (
      <div id='parent'>
        <div class='photo-container'>
          <div id='sl1'>
              <img src='http://www.instagram.com/static/images/homepage/screenshot1.jpg/aafd8c6b005d.jpg' class="slide-number" /> 
              <img src='http://www.instagram.com/static/images/homepage/screenshot5.jpg/f5ae123ab1e2.jpg' class="slide-number"/> 
              <img src='http://www.instagram.com/static/images/homepage/screenshot2.jpg/2d9d7248af43.jpg' class="slide-number"/>
              <img src='http://www.instagram.com/static/images/homepage/screenshot3.jpg/629d23a3c7b2.jpg' class="slide-number"/>
          </div>
        </div>
        <div class='login-container'>
          <div class='login-box'>
            <form onSubmit={this.submitForm}>
            <h1>Instant Five</h1>
            <h2>Sign up to see photos from your friends.</h2>
            <label>
                <input
                  type='text'
                  name='Email'
                  placeholder='Email'
                  value={emailInput}
                  onChange={this.handleEmailChange}
                />
              </label>
              <label>
                <input
                  type='text'
                  name='Full name'
                  placeholder='Full name'
                  value={fullNameInput}
                  onChange={this.handleFullNameChange}
                />
              </label>
              <label>
                <input
                  type='text'
                  name='username'
                  placeholder='Username'
                  value={usernameInput}
                  onChange={this.handleUsernameChange}
                />
              </label>
              <label>
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={passwordInput}
                  onChange={this.handlePasswordChange}
                />
              </label>
              <label id='confirm'>
                <input
                  type='password'
                  name='confirm-input'
                  placeholder='Confirm Password'
                  value={confirmInput}
                  onChange={this.handleConfirmChange}
                />
              </label>
              <input type='submit' value='Sign Up' />
            </form>
            <p>{message}</p>
          </div>
          <div class='login-box'>
            Have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </div >
    );
  }
}

export default Registration;

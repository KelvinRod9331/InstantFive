import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class NewUser extends React.Component {
  state = { emailInput: '', fullNameInput: '', usernameInput: '', passwordInput: '', confirmInput: '', message: '' };

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
  submitForm = e => {
    e.preventDefault();
    const { usernameInput, passwordInput, confirmInput } = this.state;

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
        password: passwordInput
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          usernameInput: '',
          passwordInput: '',
          confirmInput: '',
          message: `Welcome to the site ${this.state.usernameInput}`
        });
      })
      .catch(err => {
        console.log('error: ', err);
        this.setState({
          usernameInput: '',
          passwordInput: '',
          message: 'Error inserting user'
        });
      });
  };

  render() {
    const { emailInput, fullNameInput, usernameInput, passwordInput, confirmInput, message } = this.state;
    return (
      <div>
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
                  onChange={''}
                />
              </label>
              <label>
                <input
                  type='text'
                  name='Full name'
                  placeholder='Full name'
                  value={fullNameInput}
                  onChange={''}
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
            Have an account? <Link to="/Login">Log in</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NewUser;

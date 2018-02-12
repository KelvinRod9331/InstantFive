import React from "react";
import axios from "axios";

class NewUser extends React.Component {
  state = { usernameInput: "", passwordInput: "", confirmInput: "", message: "" };

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
        message: "Password length must be at least 7 characters"
      });
      return;
    }
    if (passwordInput !== confirmInput) {
      this.setState({
        message: "Passwords do not match!"
      });
      return;
    }
    axios
      .post("/users/new", {
        username: usernameInput,
        password: passwordInput
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          usernameInput: "",
          passwordInput: "",
          confirmInput: "",
          message: `Welcome to the site ${this.state.usernameInput}`
        });
      })
      .catch(err => {
        console.log("error: ", err);
        this.setState({
          usernameInput: "",
          passwordInput: "",
          message: "Error inserting user"
        });
      });
  };

  render() {
    const { usernameInput, passwordInput, confirmInput, message } = this.state;
    return (
      <div>
        <h1> New User </h1>

        <form onSubmit={this.submitForm}>
          <label>
            Username:{' '}
            <input
              type="text"
              name="username"
              value={usernameInput}
              onChange={this.handleUsernameChange}
            />
          </label>
          <label>
            Password:{' '}
            <input
              type="password"
              name="username"
              value={passwordInput}
              onChange={this.handlePasswordChange}
            />
          </label>
          <label id='confirm'>
            Confirm Password:{' '}
            <input
              type="password"
              name="username"
              value={confirmInput}
              onChange={this.handleConfirmChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>{message}</p>
      </div>
    );
  }
}

export default NewUser;

import React from "react";
import axios from "axios"
import Home from '../Home'
import { Redirect } from "react-router";
class UserProfile extends React.Component {
  state = {
    uploadClicked: false,
    inputURL: '',
    loggedIn: true,
    message: '',
  }
 

  handleLogOut = () => {
    axios
      .get("/users/logout")
      .then(res => {
        this.setState({
          loggedIn: false
        });
      })
      .catch(err => {
        console.log("Error:", err);
      });
  };

  handleButtonClicked = () => {
    this.setState({
      uploadClicked: true
    });
  };

  handleInputUrl = e => {
    console.log(this.state.inputURL);
    this.setState({
      inputURL: e.target.value
    });
  };

  handlePhotoSubmit = e => {
    e.preventDefault()
    const { inputURL } = this.state;
    const {userInfo, retriveUserPhotos} = this.props
    console.log({ URL: inputURL });
    axios
      .post("/users/upload", {
        userID: userInfo.id,
        url: inputURL
      })
      .then(res => {
        this.setState({
          inputURL: "",
          message: "You're Photo Has Been Uploaded"
        });
        retriveUserPhotos()
      })
      .catch(err => {
        this.setState({
          inputURL: "",
          message: "Error"
        });
      });
  };

  render() {
    const {userData , userInfo} = this.props
    const { loggedIn, inputURL, uploadClicked, message } = this.state
    if (!loggedIn) {
      return <Home loggedIn={false} />;
    }
    console.log({userData: this.props.userData})
    return (
      <div>
        <div>
          <button onClick={this.handleLogOut}>Log Out</button>
        </div>

        <div id="uploadButton">
          {!uploadClicked ? (
            <button onClick={this.handleButtonClicked}>Upload</button>
          ) : (
            ""
          )}
        </div>

        <div id="inputURL">
          {uploadClicked ? (
            <form onSubmit={this.handlePhotoSubmit}>
              Upload Photos:
              <input
                type="text"
                value={inputURL}
                placeholder="Upload A Photo URL"
                onChange={this.handleInputUrl}
              />
              <input type="submit" />
            </form>
          ) : (
            ""
          )}
        </div>
        <p>{message}</p>

        <div id="usernameContainer">{userInfo.username}</div>

        <div id="photoContainer">
          {userData.map(user => {
            return (
              <div className="individualPhotos">
                <img src={user.url} alt="" width={"300px"} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default UserProfile;

import React from "react";
import axios from "axios";
import Home from "../Home";
import { Link } from "react-router-dom";
import User from "./User";

import { Redirect } from "react-router";
class UserProfile extends React.Component {
  state = {
    uploadClicked: false,
    inputURL: "",
    loggedIn: true,
    message: "",
    optionClicked: false
  };

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
    this.setState({
      inputURL: e.target.value
    });
  };

  handlePhotoSubmit = e => {
    e.preventDefault();
    const { inputURL } = this.state;
    const { userInfo, retrieveUserPhotos } = this.props;
    console.log({ URL: inputURL });
    if (inputURL) {
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
          retrieveUserPhotos(); //This will re-render the user's photo once user upload photo
        })
        .catch(err => {
          this.setState({
            inputURL: "",
            message: "Error"
          });
        });
    } else {
      this.setState({
        message: "Insert A URL To Upload A Photo"
      });
    }
  };

  profileMenuCancel = () => {
    this.props.modalDown("cancel");
  };

  renderCancel = () => {
    this.setState({
      uploadClicked: false,
      message: ''
    })
  }

  render() {
    const {
      userData,
      userInfo,
      userID,
      modalUp,
      modalDown,
      modalClassNames,
      modalData,
      handleUploadUrl,
      renderUploadInput,
      removeProfilePic,
      changeProfilePic,
      profilePicClassName,
      followers,
      following
    } = this.props;
    const { loggedIn, inputURL, uploadClicked, message } = this.state;

    if (!loggedIn) {
      return <Home loggedIn={false} />;
    }
    return (
      <div id="userprofile">
        <div className={modalClassNames} onClick={modalDown}>
          <div className="followsDiv">
            {modalData ? (
              modalData.map(user => (
                <a
                  className="follows_links"
                  href={`/u/${user.username.toLowerCase()}`}
                >
                  {" "}
                  {
                    <div className="follows_user_div">
                      <span className="follows_profilepic">
                        <img className='user_thumbnail' src={user.profile_pic} width={"50px"} height={"50px"} />
                      </span>
                      <span className="follows_header">{user.username}</span>
                      <span className="follows_fullname">{user.full_name}</span>
                    </div>
                  }
                </a>
              ))
            ) : (
              <div>
                <div className="profile-pic-menu-header">
                  Change Profile Photo
                </div>
                <div
                  className="profile-pic-menu-item"
                  onClick={removeProfilePic}
                >
                  Remove Current Photo
                </div>
                <div
                  className="profile-pic-menu-item"
                  onClick={renderUploadInput}
                >
                  Upload Photo
                </div>
                <div className={profilePicClassName}>
                  <input onChange={handleUploadUrl} />
                  <input type="submit" onClick={changeProfilePic} />
                </div>
                <div
                  className="profile-pic-menu-item"
                  id="cancel"
                  onClick={this.profileMenuCancel}
                >
                  Cancel
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <button id="logoutBtn" onClick={this.handleLogOut}>
            Log Out
          </button>
        </div>

        <div id="uploadBtn_Container">
          {!uploadClicked ? (
            <button id="uploadButton" onClick={this.handleButtonClicked}/>
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
              <button onClick={this.renderCancel}>Cancel</button>
            </form>
          ) : (
            ""
          )}
          <p>{message}</p>
        </div>
        <div id="profileHeader">
          <div id="profileInfo">
            <div className="icon-profile" onClick={modalUp}>
              <img
                id="profile-icon"
                className='profile-thumbnail'
                src={userInfo.profile_pic}
                width={"90px"}
                height={"90px"}
              />
            </div>
            <div id="info-linedup">
              <div class="usernameContainer">
                {userInfo.username}
                <button class="edit"> Edit Profile </button>
                <button className="option_btn" />
              </div>
              <div class="following-ers">
                {userData.length} Posts
                <button id="followers" onClick={modalUp}>
                  {" "}
                  {followers.length} followers
                </button>
                <button id="following" onClick={modalUp}>
                  {" "}
                  {following.length} following{" "}
                </button>
              </div>
              <span class="userFullname">{userInfo.full_name}</span>
            </div>
          </div>
        </div>
        <div id="photoContainer">
          {userData.map(user => {
            return (
              <div align="center" className="individualPhotos">
                <img src={user.url} alt="" width={"300px"} height={"225px"} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default UserProfile;

import React from "react";
import axios from "axios"
import Home from '../Home'
import { Link } from 'react-router-dom'
import User from './User'

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
    this.setState({
      inputURL: e.target.value
    });
  };

  handlePhotoSubmit = e => {
    e.preventDefault()
    const { inputURL } = this.state;
    const { userInfo, retriveUserPhotos } = this.props
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
        retriveUserPhotos() //This will re-render the user's photo once user upload photo
      })
      .catch(err => {
        this.setState({
          inputURL: "",
          message: "Error"
        });
      });
  };

  // ----------------------------------------



  // -------------------------------------------  





  render() {
    const { userData, userInfo, userID, modalUp, modalDown, modalClassNames, modalData } = this.props
    const { loggedIn, inputURL, uploadClicked, message } = this.state
    console.log({ userInfo: userInfo });
    if (!loggedIn) {
      return <Home loggedIn={false} />;
    }
    console.log({ userData: this.props.userData })
    return (
      <div id='userprofile'>

        <div className={modalClassNames} onClick={modalDown}>
          <div className="followsDiv">
            {modalData.map(v => (
              <div>
                <Link to={`/u/${v.username}`}><img class="follow-img" src={v.profile_pic} />
                  <p>{v.username}</p></Link>
                <p>{v.full_name}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <button id='logoutBtn' onClick={this.handleLogOut}>Log Out</button>
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
        <div id='profileHeader'>
          <div id='profileInfo'>
            <div class='icon-profile'><img src={userInfo.profile_pic} width={'90px'} /></div>
            <div id='info-linedup'>
              <div class="usernameContainer">{userInfo.username} 
              <button class='edit'> Edit Profile </button> 
              <button className='option_btn'></button>
              </div>
              <div class='following-ers'>
                {(userData.length)} Posts

                     <button id="followers" onClick={modalUp}> followers</button>
                     <button id="following" onClick={modalUp}> following </button>
              </div>
              <span class="userFullname">{userInfo.full_name}</span>
            </div>
          </div>
        </div>
        <div id="photoContainer">
          {userData.map(user => {
            return (
              <div align='center' className="individualPhotos">
                <img src={user.url} alt="" width={"300px"} height={'225px'} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default UserProfile;

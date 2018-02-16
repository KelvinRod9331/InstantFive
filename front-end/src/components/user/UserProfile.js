import React from "react";
import axios from "axios"
import Home from '../Home'
import { Link } from 'react-router-dom'
import User from './User'

// import { Redirect } from "react-router";
class UserProfile extends React.Component {
  state = {
    uploadClicked: false,
    inputURL: '',
    loggedIn: true,
    message: '',
    modalClassNames: 'display',
    modalData: []
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
        retriveUserPhotos()
      })
      .catch(err => {
        this.setState({
          inputURL: "",
          message: "Error"
        });
      });
  };

// ----------------------------------------

modalUp = (e) => {
  let buttonName = e.target.id
  console.log(e.target.className)
  if(this.state.modalClassNames === "display"){
    this.setState({modalClassNames: 'followModal'})
  }

  axios
    .get(`users/${buttonName}`)
    .then(res => {
      this.setState({modalData: res.data.data})
    })
}

modalDown = (e) => {
  console.log()
  if(e.target.className === "followModal"){
    this.setState({modalClassNames: 'display'})
  }
}

// -------------------------------------------  





  render() {
    const { userData, userInfo, userID } = this.props
    const { loggedIn, inputURL, uploadClicked, message } = this.state
    console.log({ userInfo: userInfo });
    if (!loggedIn) {
      return <Home loggedIn={false} />;
    }
    console.log({ userData: this.props.userData })
    return (
      <div id='userprofile'>
        <div id='header-bar'>
          <div id='info-bar'>
            <div class='icon-ig'><h1> <img src='https://png.icons8.com/ios/1600/instagram-new.png' width='30px' height='30px' /> instagram </h1></div>
            <div class='searchbar'>
              <input
                class='searchbar'
                type='text'
                value={this.state.searchInput}
                onChange={this.renderSearchInput}
                placeholder={'Search'}
              />
            </div>
            <div class='icon-profile'><i class="fa fa-user-o" ></i>{'  .    '}{'   .   '} <i class="fa fa-heart-o"></i> </div>
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
                <div class="usernameContainer">{userInfo.username} <button class='edit'> Edit Profile </button> </div>
                <div class='following-ers'> 
                  {(userData.length)} Posts

                  {/* Elon code for modal */}
                
                  <div className={this.state.modalClassNames} onClick={this.modalDown}>
                  <div className="followModalDiv" >
                    {this.state.modalData.map(v => (
                      <div>
                        <Link to={`/u/${v.username}`}><img class="follow-img" src={v.profile_pic}/>
                        <p>{v.username}</p></Link>
                        <p>{v.full_name}</p>
                  
                      </div>
                    ))}
                  </div>
                </div>
                {/* ----------------------- */}

                  
                  <button id="following" onClick={this.modalUp}>Following </button>
                  <button id="followers" onClick={this.modalUp}>Followers</button></div>
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

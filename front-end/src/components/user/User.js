import React from "react";
import axios from "axios";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import Home from "../Home";
import UserProfile from "./UserProfile";
import Followers from "./Followers";

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: [],
      userData: [],
      loggedIn: true,
      uploadClicked: false,
      inputURL: '',
      message:''
    };
  }

  /**
      @function retrieveUserInfo 
      * This Will Retrieve The Logged In User's Information Such as ID, Username and Hashed Password 
      @var userInfo 
      * Will hold all User's Info in an Array
     */
    retrieveUserInfo = () => {
        axios
            .get('/users/getUserInfo')
            .then(res => {
                console.log("UserInfo:", res.data.data[0])
                this.setState({
                    userInfo: res.data.data[0]
                })
            })
            .catch(err => {
                console.log("Error:", err)
            })
    }

  /**
     * @func retriveUserPhotos
     * This Will Retrieve Targeted User Photos
     * @var userData
      * Will hold all User's Data such as Photos in an Array
     */
  retriveUserPhotos = () => {
    axios
      .get("/users/user")
      .then(res => {
        console.log("Photos:", res.data.data);
        this.setState({
          userData: [...res.data.data].reverse()
        });
      })
      .catch(err => {
        console.log("Error:", err);
      });
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

  componentDidMount() {
    this.retrieveUserInfo();
    this.retriveUserPhotos();
  }

  renderUserProfile = () =>{
    const { userData, userInfo, loggedIn, uploadClicked, message, inputURL } = this.state;

    return <UserProfile userData = {userData} userInfo = {userInfo} loggedIn={loggedIn} handleLogOut={this.handleLogOut}  inputURL={inputURL}
                            uploadClicked={uploadClicked} handleButtonClicked={this.handleButtonClicked} message={message} handlePhotoSubmit={this.handlePhotoSubmit}
                            handleInputUrl={this.handleInputUrl}/>

  }

  handleButtonClicked = () => {
    this.setState({
        uploadClicked: true
    })
}

handleInputUrl = e => {
  console.log(this.state.inputURL)
  this.setState({
      inputURL: e.target.value
  })
}

handlePhotoSubmit = (e) => {
  e.preventDefault();
  const {userInfo,inputURL} = this.state
  console.log({URL: inputURL})
  axios
  .post('/users/upload',{
      userID: userInfo.id,
      inputURL: inputURL
  })
  .then(res => {
      this.setState({
        inputURL: '',
        message:  "You're Photo Has Been Uploaded"
      });
    })
    .catch(err => {
      this.setState({
        inputURL: '',
        message: 'Error'
      });
    });
}


  renderFollowers = () =>{
    return <Followers />
  }

  render() {
    const { userData, userInfo, loggedIn } = this.state;

    console.log(
      "User Data:",
      userData,
      "User Info:",
      userInfo,
      "Logged In:",
      loggedIn
    );
    if (!loggedIn) {
      return <Home loggedIn={false} />;
    }
    return (
        <div>
          <Switch>
            <Route exact path="/user/" render={this.renderUserProfile} />
            <Route path="/user/followers" render={this.renderFollowers} />
            <Route path="/user/following" render={this.renderFollowing} />
          </Switch>
        </div>
    );
  }
}

export default User;

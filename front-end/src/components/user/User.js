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
      loggedIn: true
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
      .get("/users/getUserInfo")
      .then(res => {
        console.log(res.data);
        this.setState({
          userInfo: res.data
        });
      })
      .catch(err => {
        console.log("Error:", err);
      });
  };

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
          userData: [...res.data.data]
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
    const { userData, userInfo } = this.state;

    return <UserProfile userData = {userData} userInfo = {userInfo} handleLogOut={this.handleLogOut} />

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

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
      searchInput: ''
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
      .get("/users/userData")
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


  componentDidMount() {
    this.retrieveUserInfo();
    this.retriveUserPhotos();
  }

  

  renderUserProfile = () =>{
    const { userData, userInfo } = this.state;

    return <UserProfile userData = {userData} userInfo = {userInfo} retriveUserPhotos={this.retriveUserPhotos} />

  }

  renderFollowers = () =>{
    return <Followers />
  }

  renderSearchInput = (e) => {
    this.setState({
        searchInput: e.target.value
    })
  }


  renderSearchEngine = () => {
        get('/users/all')
  }

  render() {
    const { userData, userInfo, loggedIn } = this.state;

    console.log(
      "User Data:",
      userData,
      "User Info:",
      userInfo,

    );
    
    return (
        <div>
            Search: <input type="text" value={} />
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

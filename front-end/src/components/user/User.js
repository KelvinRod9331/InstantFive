import React from "react";
import axios from "axios";
import { Redirect, Route, Switch, Link } from "react-router-dom";
// import Home from "../Home";
import UserProfile from "./UserProfile";
import Followers from "./Followers";
import Following from "./Following";


class User extends React.Component {
    constructor() {
        super();
        this.state = {
            userInfo: [],
            userData: [],
            searchInput: '',
            userWorldWide: []
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
        const { userInfo } = this.state
        console.log("User Who's Page is Showing:", userInfo.username)
        axios
            .get(`/users/userData/${userInfo.username}`)
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

    renderSearchEngine = () => {
        axios
            .get('/users/all')
            .then(res => {
                this.setState({
                    userWorldWide: [...res.data.data]
                })
            })
            .catch(err => {
                console.log("Error:", err);
            });
    }


    componentDidMount() {
        this.retrieveUserInfo();
        this.renderSearchEngine();
        this.retriveUserPhotos();
    }


    renderSearchInput = (e) => {
        this.setState({
            searchInput: e.target.value
        })
    }



  
    getUserByID = (e) => {
        axios
            .get(`/users/getSelectedUserByID/${e.target.value}`)
            .then(res => {
                this.setState({
                    userInfo: res.data.data[0]
                })
            })
            .catch(err => {
                console.log("Error:", err)
            })
    }

    renderUserProfile = () => {
        const { userData, userInfo } = this.state;

        return <UserProfile userData={userData} userInfo={userInfo} retriveUserPhotos={this.retriveUserPhotos} />

    }

    renderFollowers = () => {
        return <Followers getUserByID={this.getUserByID} />
    }


    handleFollowers = () => <Redirect to='/user/followers' />

    handleFollowing = () => <Redirect to='/user/following' />



    render() {
        const {  userInfo, searchInput, userWorldWide } = this.state;

        console.log(
            "User Who Page Is Showing:",
            userInfo.username,
        );
       
        return (
            <div>
                Search: <input type="text" value={searchInput} onChange={this.renderSearchInput} />
                <button id="followers" onClick={() => <Redirect to='/user/followers' />}>Followers</button>
                <button id="following" onClick={() => <Redirect to='/user/following' />}>Following</button>

                <div className="searchResultBox">
                    {userWorldWide.map(user => {
                        if (user.username.includes(searchInput) && searchInput) {
                            return <button
                                value={user.id}
                                onClick={this.getUserByID}
                            >{user.username}</button>
                        }
                    })}
                </div>


                <Switch>
                    <Route exact path="/user" render={this.renderUserProfile} />
                    <Route path="/user/followers" render={this.renderFollowers} />
                    <Route path="/user/following" render={this.renderFollowing} />
                </Switch>
            </div>
        );
    }
}

export default User;

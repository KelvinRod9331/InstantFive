import React from "react";
import axios from "axios";
import { Redirect, Route, Switch, Link } from "react-router-dom";
// import Home from "../Home";
import UserProfile from "./UserProfile";
import Followers from "./Followers";
import Following from "./Following";
import { userInfo } from "os";


class User extends React.Component {
    constructor() {
        super();
        this.state = {
            userInfo: [],
            userData: [],
            searchInput: '',
            userWorldWide: [],
            ///added class for modal
            modalClassNames: 'display',
            modalData: []
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
        *Kelvin Rodriguez
    */
    retriveUserPhotos = () => {
        const { userInfo } = this.state
        console.log("User Who's Page is Showing:", userInfo.username)
        axios
            .get(`/users/userData`)
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
    /**
           * @func renderSearchEngine
           * This Will Retrieve All User's In the DB To Use For Search
           * @var userWorldWide
            * Will hold all User's Data From DB
            *Kelvin Rodriguez
        */
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


    componentWillMount() {
        this.retrieveUserInfo();
        this.renderSearchEngine();
        this.retriveUserPhotos();
    }


    renderSearchInput = (e) => {
        this.setState({
            searchInput: e.target.value
        })
    }





    // getUserByID = (e) => {
    //     axios
    //         .get(`/users/getSelectedUserByID/${e.target.value}`)
    //         .then(res => {
    //             this.setState({
    //                 userInfo: res.data.data[0]
    //             })
    //         })
    //         .catch(err => {
    //             console.log("Error:", err)
    //         })
    // }


    renderUserProfile = () => {
        const { userData, userInfo } = this.state;

        return <UserProfile userData={userData} userInfo={userInfo} />

    }

    renderFollowers = () => {
        return <Followers getUserByID={this.getUserByID} username={userInfo} />
    }




///modal to show the modal
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


    render() {
        const { userInfo, searchInput, userWorldWide } = this.state;

        console.log(
            "User Who Page Is Showing:",
            userInfo.username,
            "All User:",
            userWorldWide
        );
          //modal div added
        return (
            <div>
                <div className={this.state.modalClassNames} onClick={this.modalDown}>
                  <div className="followsDiv"><button className="buttn" onClick={this.modalOut}>yo</button></div>
                </div>
                Search: <input type="text" value={searchInput} onChange={this.renderSearchInput} />
                <button id="followers" onClick={this.modalUp}>Followers</button>
                <button id="following" onClick={this.modalUp}>Following</button>

                {/* <div className="searchResultBox">
                    {userWorldWide.map(user => {
                        if (user.username.includes(searchInput) && searchInput) {
                            return <button
                                value={user.id}
                                onClick={this.getUserByID}
                            >{user.username}</button>
                        }
                    })}
                </div> */} {/*DO NOT TOUCH ELON!! BY KELVIN*/}


                <Switch>
                    <Route exact path="/user" render={this.renderUserProfile} />
                    <Route exact path="/user/followers" render={this.renderFollowers} />
                    <Route exact path="/user/following" render={this.renderFollowing} />
                </Switch>
            </div>
        );
    }
}

export default User;

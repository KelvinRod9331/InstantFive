import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Home from '../Home'
class UserProfile extends React.Component {
    constructor() {
        super()
        this.state = {
            userInfo: [],
            userData: [],
            loggedIn: true,
        }
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
                console.log(res.data)
                this.setState({
                    userInfo: res.data
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
            .get('/users/user')
            .then(res => {
                console.log("Photos:", res.data.data)
                this.setState({
                    userData: [...res.data.data]
                })
            })
            .catch(err => {
                console.log("Error:", err)
            })
    }

    handleLogOut = () => {
        axios
            .get('/users/logout')
            .then(res => {
                this.setState({
                    loggedIn: false
                })
            })
            .catch(err => {
                console.log("Error:", err)
            })
      
    }

    componentDidMount() {
        this.retrieveUserInfo()
        this.retriveUserPhotos()
    }

    render() {
        const { userData, userInfo, loggedIn} = this.state

        console.log("User Data:", userData, "User Info:", userInfo, "Logged In:", loggedIn)
        if(!loggedIn){
            return <Home loggedIn = {false} />
        }
        return (
            <div>
                <div>
                    <button onClick={this.handleLogOut}>Log Out</button>
                </div>
                <div>
                    {userInfo.map(user => {
                        return (
                            <div>
                                <p>{user.username}</p>
                            </div>
                        )
                    })}
                </div>
                <div>
                    {userData.map(user => {
                        return (
                            <div>
                                <img src={user.url} alt='' width={'300px'} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}


export default UserProfile
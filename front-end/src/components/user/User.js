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
            uploadClicked: false,
            inputURL: '',
            message:''
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
                console.log("UserInfo:", res.data)
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
            .get('/users/userData')
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


    componentDidMount() {
        this.retrieveUserInfo()
        this.retriveUserPhotos()
    }
    /**
         * @func handleLogOut
         * This Will Log Out User And Redirect to 
         * @var userData
          * Will hold all User's Data such as Photos in an Array
         */

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


    handleInputUrl = e => {
        this.setState({
            inputURL: e.target.value
        })
    }

    handleButtonClicked = () => {
        this.setState({
            uploadClicked: true
        })
    }

    handlePhotoSubmit = (e) => {
        e.preventDefault();
        const {userInfo,inputURL} = this.state
        console.log({URL: inputURL})
        axios
        .post('/users/upload',{
            userID: '3',
            inputURL: inputURL
        })
        .then(res => {
            this.setState({
              inputURL: ''
            });
          })
          .catch(err => {
            this.setState({
              inputURL: '',
              message: 'Error'
            });
          });
    }


    render() {
        const { userData, userInfo, loggedIn, inputURL, uploadClicked, message } = this.state

        console.log("User Data:", userData, "User Info:", userInfo, "Logged In:", loggedIn)
        if (!loggedIn) {
            return <Home loggedIn={false} />
        }
        return (
            <div>
                <div>
                    <button onClick={this.handleLogOut}>Log Out</button>
                </div>

                <div id="uploadButton">
                    {!uploadClicked ?
                        <button onClick={this.handleButtonClicked}>Upload</button>
                        : ''}
                </div>

                <div id='inputURL'>
                    {uploadClicked ?
                        <form onSubmit={this.handlePhotoSubmit}>
                            Upload Photos:
                     <input
                                type='text'
                                value={inputURL}
                                placeholder="Upload A Photo URL"
                                onChange={this.handleInputUrl}
                            />
                            <input
                                type="submit"
                            />
                        </form>
                        :
                        ""
                    }
                </div>
                <p>{message}</p>
                <div id="usernameContainer">
                   <h2> {userInfo.username} </h2>
                </div>


                <div id='photoContainer'>
                    {userData.map(user => {
                        return (
                            <div className='individualPhotos'>
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
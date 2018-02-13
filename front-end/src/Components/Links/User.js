import React from 'react'
import axios from 'axios'

class UserProfile extends React.Component{
constructor(){
    super()
    this.state = {
        User_Info: [],
        User_Data: [],
    }
}

/**
  @function retrieveUserInfo 
  * This Will Retrieve The Logged In User's Information Such as ID, Username and Hashed Password 
  @var User_Info 
  * Will hold all User's Info in an Array
 */
retrieveUserInfo = () => {
    axios
    .get('/new')
    .then(res => {
        console.log(res.data.data)
        this.setState({
            User_Info: [...res.data.data]
        })
    })
    .catch(err => {
        console.log("Error:", err)
    })
}

/**
 * @func retriveUserPhotos
 * This Will Retrieve Targeted User Photos
 * @var User_Data
  * Will hold all User's Data such as Photos in an Array
 */
    retriveUserPhotos = () => {
        axios
        .get('/user')
        .then(res => {
            console.log("Photos:", res.data.data)
            this.setState({
                User_Data: [...res.data.data]
            })
        })
        .catch(err => {
            console.log("Error:", err)
        })
    }

    componentDidMount(){
        this.retrieveUserInfo()
        this.retriveUserPhotos()
    }

    render(){
        const {User_Data, User_Info} = this.state
        console.log("User Data:", User_Data, "User Info:", User_Info)
        return (
            <div>
                <div>
                {User_Info.map(user => {
                    return (
                        <div>
                            <p>{user.username}</p>
                        </div>
                    )
                })}
                </div>
                <div>
                {User_Data.map(user => {
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
import React from 'react'
import User from './user/User'
import Registration from './Registration'
import { Route, Link } from 'react-router-dom'
import { Redirect } from "react-router"

class Home extends React.Component {
  
    render() {

        console.log(this.props)
        if (this.props.loggedIn) {
            return <Redirect to="/user" />
        }else{
            return <Redirect to='/registration' /> 
        }
       
    }
}

export default Home;
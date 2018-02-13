import React from 'react'
import User from './User'
import {Route, Link} from 'react-router-dom'
class Home extends React.Component{
    render(){
        return(
            <div>
                <Route path = '/' component={User} />
            </div>
        )
    }
}

export default Home;
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Links/Home';
class App extends Component {
    render(){
        return (
            <div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/user/following">Following</Link> {/*Will be Accessed Through Clicking On A Button*/}
                    <Link to="/user/followers">Followers</Link> {/*Will be Accessed Through Clicking On A Button*/}
                </nav>
                <Route exact path="/" component={Home}/>
                <Route path="/user" />
            </div>
        )
    }
}

export default App;

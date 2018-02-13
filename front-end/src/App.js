import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Route, Link, Switch } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import axios from 'axios'



class App extends Component {
    render() {

        return (
            <div>
                <nav id='top-header'>
                    <div class='container' >
                        <Link to="/">Home</Link>
                        <Link to="/user/following">Following</Link> {/*Will be Accessed Through Clicking On A Button*/}
                        <Link to="/user/followers">Followers</Link> {/*Will be Accessed Through Clicking On A Button*/}
                    </div>
                </nav>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registration" component={Registration} />
                <Route path="/user" />
            </div>
        )
    }
}

export default App;

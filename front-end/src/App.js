import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Route, Link, Switch } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import axios from 'axios'
import Feed from './components/user/Feed';
import User from './components/user/User';
import U from './components/u/U';


class App extends Component {
    render() {

        return (
            <div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/user/following">Following</Link> {/*Will be Accessed Through Clicking On A Button*/}
                    <Link to="/user/followers">Followers</Link> {/*Will be Accessed Through Clicking On A Button*/}
                    <Link to="/feed">Feed</Link> {/*Will be Accessed Through Clicking On A Button*/}

                </nav>
                <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/registration" component={Registration}/>
                <Route exact path="/feed" component={Feed}/>
                <Route path="/user" component={User} />
                <Route path="/u" component={U} />
                </Switch>
            </div>
        )
    }
}

export default App;

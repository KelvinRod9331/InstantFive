import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Home from './Links/Home';
import Feed from './user/Feed';

class App extends Component {
    render(){
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
                  <Route path="/feed" component={Feed}/>
                </Switch>
            </div>
        )
    }
}

export default App;

import React, { Component } from 'react';
import { Route, Link } from 'react-dom'
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <nav>
                    <Link path="/">Home</Link>
                    <Link path="/user/following">Following</Link> {/*Will be Accessed Through Clicking On A Button*/}
                    <Link path="/user/followers">Followers</Link> {/*Will be Accessed Through Clicking On A Button*/}
                </nav>
                <Route exact path="/" />
                <Route path="/user" />
            </div>
        )
    }
}

export default App;

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Route, Link, Switch } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
<<<<<<< HEAD
import axios from 'axios'
=======
import User from './components/user/User'
>>>>>>> fdc51fa157a00086f5594811860bbb4b3d968686



class App extends Component {
    render() {

        return (
            <div>
<<<<<<< HEAD
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
=======
                <nav>
                    <Link to="/">Home</Link>{'-'}
                    <Link to="/user/following">Following</Link>{'-'} {/*Will be Accessed Through Clicking On A Button*/}
                    <Link to="/user/followers">Followers</Link>{'-'} {/*Will be Accessed Through Clicking On A Button*/}
                          
                </nav>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/registration" component={Registration}/>
                <Route exact path="/user" component={User} />
                
>>>>>>> fdc51fa157a00086f5594811860bbb4b3d968686
            </div>
        )
    }
}

export default App;

import React from 'react';
import User from './user/User';
import Registration from './Registration';
import { Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import Login from './Login';

class Home extends React.Component {
    state = { user: undefined }
    getUser = () => {
        axios.get('/users/getUserInfo')
        .then(res => {
            let user = res.data.data[0];
            this.setState({
                user: res.data.data[0]
            })
        }).catch(err => {
            this.setState({
                user: null
            })
        })
    }
    componentDidMount() {
        this.getUser();
    }
    render() {
        const { user } = this.state
        console.log({state: this.state})
        if (user) {
            console.log('User detected')
            return <Redirect to='/user' />
        } else if (user === null) {
            return <Redirect to='/login' />
        }
        return (
            <load>loading...</load>
        )
    }
}

export default Home;
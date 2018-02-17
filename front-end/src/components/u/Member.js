import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

class Member extends React.Component {
    state = {
        user: {},
        me: null,
        message: '',
        following: false,
        userInfo: [],
        userData: []
    }

    retrieveUserPhotos = () => {
        const { user } = this.state
        console.log("User Who's Page is Showing:", user.username)
        axios
            .get(`/users/getphotosbyuser/${user.username}`)
            .then(res => {
                console.log("Photos:", res.data.data);
                this.setState({
                    userData: [...res.data.data].reverse()
                });
            })
            .catch(err => {
                console.log("Error:", err);
            });
    };

    getUser = () => {

        let username = this.props.match.params.member;
        axios.get(`/users/${username}`)
            .then(res => {
                let user = res.data.data[0]
                console.log({ user: user });
                this.setState({
                    user: user
                })
                this.retrieveUserPhotos();
            })
            .catch(err => {
                this.setState({
                    message: err
                })
            })
    }

    //follow user button
    handleFollow = (e) => {
        console.log('userid:', this.state.me.id, 'followid:', this.state.user.id)
        axios.post('/users/follow', { userid: this.state.me.id, followid: this.state.user.id })
            .then(res => {
                this.setState({ following: true })
                res.send('success')
            }).catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getUser()

        axios
            .get(`/users`)
            .then(res => {
                console.log(res.data.data);
            })
            .catch(err => {
                console.log(err)
            })

        axios.get('/users/getUserInfo')
            .then(res => {
                this.setState({ me: res.data.data[0] })
            }).catch(err => {
                console.log(err)
            })

        axios.get('/users/following')
            .then(res => {
                let follows = res.data.data
                this.setState({ following: !!follows.filter(v => v.username === this.state.user.username)[0] })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        console.log('gfdjnslk', this.props.match.params.member)
        const { user, message, userData, following } = this.state
        const { handleFollow } = this;
        if (user === null) {
            return 'loading...'
        }
        if (user === undefined) {
            return '404 Page not found'
        }
        console.log('member', this.state)
        return (
            <div>
                <div id='profileHeader'>
                    <div id='profileInfo'>
                        <div class='icon-profile'><img src={user.profile_pic} width={'90px'} /></div>
                        <div id='info-linedup'>
                            <div class="usernameContainer">
                                {user.username}
                            </div>

                            <span class="userFullname">{user.full_name}</span> 
                            <button onClick={this.handleFollow} disabled={following}>follow</button>
                        </div>
                    </div>
                </div>
                <div id="photoContainer">
                    {userData.map(user => {
                        return (
                            <div align='center' className="individualPhotos">
                                <img src={user.url} alt="" width={"300px"} height={'225px'} />
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}

export default Member;

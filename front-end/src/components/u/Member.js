import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

class Member extends React.Component {
    state = {
      user: null,
      me: null,
      message: '',
      following: false
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
          this.setState({me: res.data.data[0]})
        }).catch(err => {
            console.log(err)
        })

        axios.get('/users/following')
        .then(res => {
          let follows = res.data.data
          this.setState({following: !!follows.filter(v => v.username === this.state.user.username)[0]})
        })
        .catch(err => {
            console.log(err)
        })
    }

    getUser = () => {

        let username = this.props.match.params.member;
        axios.get(`/users/${username}`)
        .then(res => {
            let user = res.data.data[0]
            console.log({user: user});
            this.setState({
                user: user
            })
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
      axios.post('/users/follow', {userid: this.state.me.id, followid: this.state.user.id})
      .then(res => {
          this.setState({following: true})
          res.send('success')
      }).catch(err => {
          console.log(err)
      })
    }

    render() {
        console.log('gfdjnslk', this.props.match.params.member)
        let { user, message } = this.state
        if (user === null) {
            return 'loading...'
        }
        if (user === undefined) {
            return '404 Page not found'
        }
        console.log('member', this.state)
        return (
            <div>
                <div>{message}</div>
                    <div id="userBanner">
                    <img src={user.profile_pic} width={'150px'}/>
                    <span id="username">{user.username}</span>
                    <button onClick={this.handleFollow} disabled={this.state.following}>follow</button>

                    </div>

                    {/* <div id="photoContainer">
                    {userData.map(user => {
                        return (
                        <div className="individualPhotos">
                            <img src={user.url} alt="" width={"300px"} />
                        </div>
                        );
                    })}
                    </div> */}
            </div>
        )
    }
}

export default Member;

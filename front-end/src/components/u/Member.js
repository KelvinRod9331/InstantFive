import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

class Member extends React.Component {
    state = {
      user: null,
      message: '',
      following: false
    }

    componentDidMount() {
      this.getUser()

      axios
        .get(`/following`)
        .then(res => {
            console.log(res.data.data);
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

    handleFollow = (e) => {
      axios.get('/users/getUserInfo')
      .then(res => {
        console.log('userID', res.data.data[0].id, 'followid', this.state.user.id)
          axios.post('/users/follow', {userid: res.data.data[0].id, followid: this.state.user.id})
          .then(res => {
              res.send('success')
          }).catch(err => {
              console.log(err)
          })
      }).catch(err => {
          console.log(err)
      })
    }

    render() {
        console.log(this.props.match.params.member)
        let { user, message } = this.state
        if (user === null) {
            return 'loading...'
        }
        if (user === undefined) {
            return '404 Page not found'
        }
        return (
            <div>
                <div>{message}</div>
                    <div id="userBanner">
                    <img src={user.profile_pic} width={'150px'}/>
                    <span id="username">{user.username}</span>
                    <button onClick={this.handleFollow}>follow</button>

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

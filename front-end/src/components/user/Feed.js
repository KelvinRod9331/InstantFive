import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

class Feed extends Component {
  constructor(){
    super();
    this.state = {
      feedPhotos: []
    }
  }

  componentDidMount = () => {
    axios
      .get('/users/feed')
      .then(res => {
        this.setState({feedPhotos: res.data.data.reverse()})
      })
      .catch(err => console.log("err", err))
  }

  followUser = () => {
    axios
      .post('/users/follow', {

      })
      .then(res => {
        this.setState({feedPhotos: res.data.data})
      })
      .catch(err => console.log("err", err))
  }

  render() {
    const {feedPhotos} = this.state;
    console.log('Feed', this.state)
    return (
        <div>
          {feedPhotos.map(v => 
          <div>
            <Link to={`/u/${v.username}`}>
              <img className="follow-img" src={v.profile_pic}/>
              <p>{v.username}</p>
            </Link>
            <img className="feed-img" src={v.url}/></div>)}
        </div>
    )
  }
}

export default Feed

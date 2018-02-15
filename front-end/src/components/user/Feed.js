import React, {Component} from 'react';
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
        this.setState({feedPhotos: res.data.data})
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

  render(){
    return(
        <div>
          {this.state.feedPhotos.map(v => <img className="feed-img" src={v.url}/>)}
        </div>
    )
  }
}

export default Feed

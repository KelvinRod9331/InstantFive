import React, {Component} from 'react';
import axios from 'axios'

class Feed extends Component {
  constructor(){
    super();
    this.state = {

    }
  }

  componentDidMount = () => {
    axios
      .get('/users/feed')
      .then(res => {
        console.log('feed', res)
      })
      .catch(err => console.log("err", err))
  }

  followUser = () => {
    axios
      .post('/users/follow', {
        
      })
      .then(res => {
        console.log('feed', res)
      })
      .catch(err => console.log("err", err))
  }

  render(){
    return(
        <div>
          <button onClick={this.followUser}>follow user 1</button>
        </div>
    )
  }
}

export default Feed

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
      .get('http://localhost:3100/users/feed')
      .then(res => {
        console.log('feed', res.data)
      })
      .catch(err => console.log(err))
  }

  render(){
    return(
        <div>hi</div>
    )
  }
}

export default Feed

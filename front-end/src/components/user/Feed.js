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
      .then(data => {
        console.log(data)
      })
  }

  render(){
    return(
        <div>hi</div>
    )
  }
}

export default Feed

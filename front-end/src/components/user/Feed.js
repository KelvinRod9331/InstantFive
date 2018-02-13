import React, {Component} from 'react';

class Feed extends Component {
  constructor(){
    super();
    this.state = {

    }
  }

  componentDidMount = () => {
    axios
      .get('/users/all')
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

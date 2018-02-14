import React, {Component} from 'react';

class Follows extends Component {
  constuctor(){
    super();
    this.state = {

    }
  }

  render(){
    return(
      <div className="followModal" onClick={this.modalOut}></div>
    )
  }
}

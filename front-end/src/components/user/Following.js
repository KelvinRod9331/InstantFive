import React from 'react';

class Following extends React.Component {
  constructor(){
    super();
    this.modalClassNames = 'followModal'
    this.state = {
      modalClassNames: 'followModal'
    }
  }

  modalOut = (e) => {
    if(e.target.className === "followModal"){
      this.setState({modalClassNames: 'display'})
    }
  }

  render() {
    return (
      <div>
        <div className={this.state.modalClassNames} onClick={this.modalOut}>
          <div className="followsDiv"><button className="buttn" onClick={this.modalOut}>yo</button></div>
        </div>
      </div>
    );
  }
}

  export default Following;

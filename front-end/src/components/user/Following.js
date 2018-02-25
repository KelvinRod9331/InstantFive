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
    const { modalClassNames } = this.state;
    const { modalOut } = this
    return (
      <div>

        <div className={modalClassNames} onClick={modalOut}>
          <div className="followsDiv"><button className="buttn" onClick={modalOut}>yo</button></div>
        </div>
      </div>
    );
  }
}

  export default Following;

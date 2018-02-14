import React from 'react';
import {Link} from 'react-router-dom'

class Followers extends React.Component {
    
  
    render() {
    //   const {  } = this.props;
  console.log('deadass')
      return (
          
        <div>
            <h1> Followers</h1>
            <Link to="/user"><img src="https://vignette.wikia.nocookie.net/universal-crusade/images/a/a5/X.png/revision/latest?cb=20170903062123" height="50" alt="x out"/></Link>
        </div>
      );
    }
}
  
  export default Followers;
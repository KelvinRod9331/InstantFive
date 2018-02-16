import React from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

class Followers extends React.Component {
  constructor() {
    super();
    this.state = {
      userFollowers: []
    };
  }
  
  /**
      @function retrieveFollowers 
      * This Will Retrieve The Logged In User's Follower list.
      @var userFollowers
      * Will hold all User's followers in an Array
  */
  retrieveFollowers = () => {
    console.log(this.props.username)
      axios
        .get(`/users/followers/`)
        .then(res => {
          console.log("Followers:",res);
          this.setState({
            userFollowers: [...res.data.data]
          });
        })
        .catch(err => {
          console.log("Error:", err);
        });
  };

  componentWillMount() {
      this.retrieveFollowers();
  }

  render() {
    const {userFollowers} = this.state
    const {getUserByID }= this.props
    console.log("Followers:", userFollowers)
    return (
      <div>
        <h1> Followers</h1>
        {/* {userFollowers.map(user => {
       
          return (<button value={user.follower_id} onClick={e => getUserByID(e)}>
            {user.username}
          </button>)
        }
        )} */}
          {/* <Link to="/user">
            <img src="https://vignette.wikia.nocookie.net/universal-crusade/images/a/a5/X.png/revision/latest?cb=20170903062123" height="50" alt="x out"/>
          </Link> */}
      </div>
    );
  }
}

export default Followers;

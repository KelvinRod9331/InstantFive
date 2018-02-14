import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Followers extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: []
    };
  }
  
  /**
      @function retrieveFollowers 
      * This Will Retrieve The Logged In User's Follower list.
      @var userFollowers
      * Will hold all User's followers in an Array
  */
  retrieveFollowers = () => {
      axios
        .get("/users/followers")
        .then(res => {
          console.log(res.data);
          this.setState({
            userInfo: res.data
          });
        })
        .catch(err => {
          console.log("Error:", err);
        });
  };

  componentDidMount() {
      this.retrieveFollowers();
  }

  render() {
    
    return (
      <div>
        <h1> Followers</h1>
          <Link to="/user">
            <img src="https://vignette.wikia.nocookie.net/universal-crusade/images/a/a5/X.png/revision/latest?cb=20170903062123" height="50" alt="x out"/>
          </Link>
      </div>
    );
  }
}

export default Followers;

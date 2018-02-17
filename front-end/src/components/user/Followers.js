import React from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import User from './User'
import { Route, Switch } from 'react-router-dom'

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
        console.log("Followers:", res.data);
        this.setState({
          userFollowers: [...res.data.data]
        });
      })
      .catch(err => {
        console.log("Error:", err);
      });
  };


  sendFollowers = () => <User followers={this.state.userFollowers} />

  componentDidMount() {
    this.retrieveFollowers();
  }

  render() {
    const { userFollowers } = this.state
    const { getUserByID } = this.props
    console.log("Followers:", userFollowers)
    return (
      <div>
        <Switch>
          <Route exact path="/user" render={this.sendFollowers} />
        </Switch>
      </div>
    );
  }
}

export default Followers;

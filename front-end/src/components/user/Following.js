import React from 'react';

class Following extends React.Component {
    
  
    render() {
      const { userData, userInfo, handleLogOut } = this.props;
  
      return (
        <div>
          <div>
            <button onClick={handleLogOut}>Log Out</button>
          </div>
          <div>
            {userInfo.map(user => {
              return (
                <div>
                  <p>{user.username}</p>
                </div>
              );
            })}
          </div>
          <div>
            {userData.map(user => {
              return (
                <div>
                  <img src={user.url} alt="" width={"300px"} />
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
  
  export default Following;
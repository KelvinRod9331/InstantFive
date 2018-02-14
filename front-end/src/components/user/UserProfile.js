
import React from 'react';

class UserProfile extends React.Component {
    
  
    render() {
      const { userData, userInfo, loggedIn, inputURL, uploadClicked, 
        message , handleButtonClicked , handlePhotoSubmit, 
        handleInputUrl, handleLogOut } = this.props;
  
      return (
        <div>
            <div>
                <button onClick={handleLogOut}>Log Out</button>
            </div>

            <div id="uploadButton">
                {!uploadClicked ?
                    <button onClick={handleButtonClicked}>Upload</button>
                    : ''}
            </div>

            <div id='inputURL'>
                {uploadClicked ?
                    <form onSubmit={handlePhotoSubmit}>
                        Upload Photos:
                 <input
                            type='text'
                            value={inputURL}
                            placeholder="Upload A Photo URL"
                            onChange={handleInputUrl}
                        />
                        <input
                            type="submit"
                        />
                    </form>
                    :
                    ""
                }
            </div>
            <p>{message}</p>

            <div id="usernameContainer">
              {userInfo.username}
            </div>


            <div id='photoContainer'>
                {userData.map(user => {
                    return (
                        <div className='individualPhotos'>
                            <img src={user.url} alt='' width={'300px'} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
  }
  
  export default UserProfile;
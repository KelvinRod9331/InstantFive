import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

class Feed extends Component {
  constructor(){
    super();
    this.state = {
      feedPhotos: [],
      userWorldWide: [],
      searchInput: '',
    }
  }

  /**
           * @func renderSearchEngine
           * This Will Retrieve All User's In the DB To Use For Search
           * @var userWorldWide
            * Will hold all User's Data From DB
            *Kelvin Rodriguez
        */
        renderSearchEngine = () => {
          axios
              .get('/users/all')
              .then(res => {
                  this.setState({
                      userWorldWide: [...res.data.data]
                  })
              })
              .catch(err => {
                  console.log("Error:", err);
              });
      }
  
      renderSearchInput = (e) => {
          this.setState({
              searchInput: e.target.value
          })
      }

  pageBanner = () => {
      const {userWorldWide, searchInput, } = this.state
      console.log(userWorldWide)
      return (
          <div id='header-bar'>
                  <div id='info-bar'>
                      <div class='icon-ig'><h1> < a id='ig-icon-link' href={'/feed'} > {<img src='https://png.icons8.com/ios/1600/instagram-new.png' width='30px' height='30px' />} </a> Instagram </h1></div>
                      <div class='searchbar'>
                          <input
                              class='searchbar'
                              type='text'
                              value={searchInput}
                              onChange={this.renderSearchInput}
                              placeholder={'Search'}
                          />
                      </div>
                      <div class='icon-profile'>< a id='ig-icon-link' href={'/user'}>{<i class="fa fa-user-o" ></i>}</a>{'  .    '}{'   .   '} <i class="fa fa-heart-o"></i> </div>
                  </div>
                  <div className="searchResultBox">
                      {userWorldWide.map(user => {
                          if (user.username.toLowerCase().includes(searchInput.toLowerCase()) && searchInput) {
                              return <a className="search_links"
                                  href={`/u/${user.username.toLowerCase()}`}
                              > {<div className="search_user_div">
                                  <span className='search_profilepic'>
                                      <img src={user.profile_pic} width={'50px'} />
                                  </span>
                                  <span className='username_header'>
                                      {user.username}
                                  </span>
                                  <span className="fullname">
                                      {user.full_name}
                                  </span>

                              </div>}</a>
                          }
                      })}
                  </div>
              </div>
      )
  }

  componentDidMount = () => {
    this.renderSearchEngine();
    axios
      .get('/users/feed')
      .then(res => {
        this.setState({feedPhotos: res.data.data.reverse()})
      })
      .catch(err => console.log("err", err))
  }

  followUser = () => {
    axios
      .post('/users/follow', {

      })
      .then(res => {
        this.setState({feedPhotos: res.data.data})
      })
      .catch(err => console.log("err", err))
  }

  render() {
    const {feedPhotos} = this.state;
    console.log('Feed', this.state)
    return (
        <div>
          {this.pageBanner()}
          {feedPhotos.map(v => 
          <div>
            <Link to={`/u/${v.username}`}>
              <img className="follow-img" src={v.profile_pic}/>
              <p>{v.username}</p>
            </Link>
            <img className="feed-img" src={v.url}/></div>)}
        </div>
    )
  }
}

export default Feed

const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

const getUserPhotos = (req, res, next) => {
  db
    .any('select * from photos full join users on photos.user_ID = users.id where username = ${username}', req.user)
    .then(data => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved all users\'s photos'
      });
    })
    .catch(err => next(err))
}

/**
 * Added by Gerson
 * @func getPhotosByUser gets photos of any user by name
 *
 */
const getPhotosByUser = (req, res, next) => {
  db
    .any('select * from photos full join users on photos.user_ID = users.id where username = ${username}', req.params)
    .then(data => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved all users\'s photos'
      });
    })
    .catch(err => next(err))
}

const followUser = (req, res, next) => {
  console.log(req.body)
  db
    .none('insert into follows (user_ID, follower_ID) values (${followid}, ${userid})', req.body)
    .then(() => {
      res.send('Follow success')
    })
    .catch(err => next(err))
}

const getUserFollowers = (req, res, next) => {
  console.log("User:", req.user)
  db
    .any('select * from users where id in (select follower_id from follows join users on follows.user_id = users.id where username = ${username})', req.user)
    .then(data => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved all users\'s followers'
      });
    })
    .catch(err => next(err))
}

const getUserFollowing = (req, res, next) => {
  console.log(req.user)
  db
    .any('select * from users where id in (select user_id from follows join users on follows.follower_id = users.id where username = ${username})', req.user)
    .then(data => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved all users\'s following'
      });
    })
    .catch(err => next(err))
}

const getFollowingPhotos = (req, res, next) => {
  console.log("hi", req.user)
  db
    .any('select users.username, users.profile_pic, url from photos join users on users.id = user_id where user_id in (select photos.user_id from follows join users on follows.follower_id = users.id join photos on photos.user_id = follows.user_id WHERE username = ${username})', req.user)
    .then(data => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved all following photos'
      })
    })
    .catch(err => next(err))
}

const getPhotoLikes = (req, res, next) => {
  db
    .any('select * from likes where photo_ID = ${id}', req.params)
    .then(data => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved ALL photo likes'
      })
    })
    .catch(err => next(err))
}

const getPhoto = (req, res, next) => {
  db
    .any('select * from photos where id = ${id}', req.params)
    .then(data => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved ALL photo likes'
      })
    })
    .catch(err => next(err))
}

const uploadPhoto = (req, res, next) => {
  db
    .none('insert into photos (user_ID, url) values (${userID}, ${url})', req.body)
    .then(() => {
      res.send('Photo successfully uploaded.')
    })
    .catch(err => {
      res.status(500).send('Error uploading photo')
    })
}

const likePhoto = (req, res, next) => {
  db.
    none('insert into likes (user_ID, photo_ID) values (${userid}, ${photoid})', req.body)
}

function getSingleUser(req, res, next) {
  db
    .any("select * from users where username=${username}", req.user)
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved single users"
      });
    })
    .catch(err => next(err))
}

function getUserByID(req, res, next) {
  db
    .any("select * from users where id=${id}", req.params)
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved single users"
      });
    })
    .catch(err => next(err))
}

function getUserByUsername(req, res, next) {
  db
    .any("select * from users where LOWER(username)=LOWER(${username})", req.params)
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved single users"
      });
    })
    .catch(err => next(err))
}

function getAllUsers(req, res, next) {
  db
    .any("select * from users")
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved single users"
      });
    })
    .catch(err => next(err))
}

function updateUser(req, res, next) {
  console.log({body: req.body, user: req.user});
  let { newUsername, newEmail, newFullName } = req.body;
  let query = `UPDATE users SET username = ${newUsername ? '${newUsername}' : '${username}'}, email = ${newEmail ? '${newEmail}' : '${email}'}, full_name = ${newFullName ? '${newFullName}' : '${fullName}'} WHERE id = ${'${id}'}`

  db
    .none(query, 
    {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      fullName: req.user.full_name,
      newUsername: req.body.newUsername,
      newEmail: req.body.newEmail,
      newFullName: req.body.newFullName,
    }
  ).then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Updated user"
      })
    }).catch(function(err) {
      return next(err);
    }
  );
}

function loginUser(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        res.status(500).send("error while trying to log in");
      } else if (!user) {
        res.status(401).send("invalid username/password");
      } else if (user) {
          console.log('after')
        req.logIn(user, function(err) {
          if (err) {
              console.log('error')
            res.status(500).send("error");
          } else {
              console.log('now')
            res.status(200).send(user);
          }
        });
      }
    })(req, res, next);
}

function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
}

function registerUser(req, res, next) {
  return authHelpers
    .createUser(req)
    .then(response => {
      passport.authenticate("local", (err, user, info) => {
        if (user) {
          res.status(200).json({
            status: "success",
            data: user,
            message: "Registered one user"
          });
        }
      })(req, res, next);
    })
    .catch(err => {
      console.log(error)
      res.status(500).json({
        status: "error",
        error: err
      });
    });
}

/*profile_pic chnages
added by ~ELON*/

removeProfilePic = (req, res, next) => {
  db
    .none("UPDATE users SET profile_pic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' WHERE username = ${username}", req.user)
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Removed profile_pic"
      })
      .catch(function(err) {
        return next(err);
      });
    })
}

changeProfilePic = (req, res, next) => {
  db
    .none("UPDATE users SET profile_pic = ${newProfilePic} WHERE username = ${username}", {username: req.user.username, newProfilePic: req.body.newProfilePic})
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Removed profile_pic"
      })
      .catch(function(err) {
        return next(err);
      });
    })
}

/**
 * Added By Kelvin
 * @func addPost
 * Will add Comments and likes to user Photo's
 */

function addPost(req,res,next){
  db
    .none("INSERT INTO post(user_ID, photo_ID, comment, likes) VALUES (${user_ID}, ${photo_ID}, ${comment}, ${likes})",
    req.body
  )
  .then(function (data) {
    res.status(200).json({
      status: "success",
      data: data,
      message: "Added A Post"
    })
    .catch(function(err) {
      return next(err);
    });
  })
}

function getPost(req,res,next){
  db
    .any('SELECT * FROM post')
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Got User's Post"
      })
      .catch(function(err) {
        return next(err);
      });
    })
}

module.exports = {
  getUserPhotos,
  getPhotosByUser,
  followUser,
  getUserFollowers,
  getUserFollowing,
  getFollowingPhotos,
  getPhotoLikes,
  getPhoto,
  uploadPhoto,
  likePhoto,
  getSingleUser,
  getAllUsers,
  updateUser,
  registerUser,
  loginUser,
  logoutUser,
  getUserByID,
  getUserByUsername,
  removeProfilePic,
  changeProfilePic,
  addPost,
  getPost
};

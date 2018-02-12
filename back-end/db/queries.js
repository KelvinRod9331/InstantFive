const db = require('./index.js');

const getAllPhotos = (req, res, next) => {
  db
  .any('select * from photos')
  .then(data => {
    res.status(200).json({
      status: 'success',
      data: data,
      message: 'Retrieved all photos'
    });
  })
  .catch(err => next(err))
}

const getUserPhotos = (req, res, next) => {
  db
    .any('select * from photos where user_ID = ${id}', {id: user.id})
    .then(data => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved all users\'s photos'
      });
    })
    .catch(err => next(err))
}

const getUserFollowing = (req, res, next) => {
  db
    .any('select * from follows where follower_ID = ${id}', {id: user.id})
    .then(data => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved all users\'s followes'
      });
    })
    .catch(err => next(err))
}

const getUserFollowers = (req, res, next) => {
  db
    .any('select * from follows where user_ID = ${id}', {id: user.id})
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
  db
    .any('select * from photos join follows on photos.userid = follows.userid where follows.user_ID = ${id}')
    .then(() => {

    })
}

const getPhotoLikes = (req, res, next) => {
  db
    .any('select * from likes where photo_ID = ${photoid}', {photoid: photo.id})
    .then(data => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved ALL photo likes'
      })
    })
    .catch(err => next(err))
}

const uploadPhoto = (req, res next) => {
  db
    .none('insert into photos (user_ID, url) values (${id}, ${url})', req.body)
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

module.exports = {
  getAllPhotos,
  getUserPhotos,
  getUserFollowers,
  getUserFollowing,
  getPhotoLikes,
  uploadPhoto,
  likePhoto
}

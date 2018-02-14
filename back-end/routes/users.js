let db = require("../db/queries");
var express = require("express");
var router = express.Router();
const { loginRequired } = require("../auth/helpers");


router.get("/getAllUsers", db.getAllUsers)
router.post("/new", db.registerUser);
router.post("/login", db.loginUser);
router.get("/getUserInfo", loginRequired, (req, res) => {
    res.json(req.user)
});
router.post("/upload", db.uploadPhoto)
router.get("/logout", db.logoutUser);
router.get("/userData", db.getUserPhotos)
router.get("/followers",db.getUserFollowers)
router.post("/upload", db.uploadPhoto);
router.post("/follow", db.followUser)
router.get("/all", db.getFollowingPhotos);
router.get("/photos", db.getUserPhotos);
router.get("/photo/likes", db.getPhotoLikes);
router.get("/following", loginRequired, db.getUserFollowing);
// router.get("/feed", loginRequired, db.getFollowingPhotos)
router.get("/feed", loginRequired, db.uploadPhoto);

module.exports = router;

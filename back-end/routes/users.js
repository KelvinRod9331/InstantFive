let db = require("../db/queries");
var express = require("express");
var router = express.Router();
const helper = require("../auth/helpers");


router.post("/new", db.registerUser);
router.post("/login", db.loginUser);
router.post("/getUserInfo", helper.loginRequired, (req, res) => {
    res.json(req.user)
});

router.get("/logout", helper.loginRequired, db.logoutUser);

router.post("/upload", db.uploadPhoto);

router.get("/all", db.getFollowingPhotos);
router.get("/photos", db.getUserPhotos);
router.get("/photo/likes", db.getPhotoLikes);
router.get("/followers",db.getUserFollowers);
router.get("/following", db.getUserFollowing);
router.get("/feed", helper.loginRequired, db.getFollowingPhotos)

module.exports = router;

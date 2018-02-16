let db = require("../db/queries");
var express = require("express");
var router = express.Router();
const { loginRequired } = require("../auth/helpers");


router.post("/new", db.registerUser);
router.post("/login", db.loginUser);
router.post("/upload", db.uploadPhoto)
router.post("/follow", db.followUser)
router.post("/photo/:id/like", db.likePhoto);

router.get("/logout", db.logoutUser);
router.get("/userData/:username", db.getUserPhotos)
router.get("/getUserInfo", db.getSingleUser)
router.get("/getSelectedUserByID/:id", db.getUserByID)
router.get("/all", db.getAllUsers);
router.get("/user/:username", db.getSingleUser);
router.get("/photos", db.getUserPhotos);
router.get("/photo/:id/likes", db.getPhotoLikes);
router.get("/photo/:id", db.getPhoto);
router.get("/followers", loginRequired, db.getUserFollowers);
router.get("/following", loginRequired, db.getUserFollowing);
router.get("/feed", loginRequired, db.getFollowingPhotos)
router.get("/:username", db.getUserByUsername)

module.exports = router;

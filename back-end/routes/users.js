let db = require("../db/queries");
var express = require("express");
var router = express.Router();
const { loginRequired } = require("../auth/helpers");

router.post("/upload", db.uploadPhoto); 
router.post("/new", db.registerUser);
router.post("/login", db.loginUser);
router.post("/follow", db.followUser);
router.post("/photo/:id/like", db.likePhoto);

router.patch("/updateuser/:column/:newvalue", loginRequired, db.updateUser);
router.get("/logout", db.logoutUser);
router.get("/userData", db.getUserPhotos); //Kelvin Rodriguez--Used To Retrieve User's Photos
router.get("/getphotosbyuser/:username", db.getPhotosByUser) //Gerson -- Get any user's photos
router.get("/getUserInfo", db.getSingleUser);
router.get("/getSelectedUserByID/:id", db.getUserByID); //Kelvin Rodriguez -- Used To Retrieve The Selected User's Id 
router.get("/all", db.getAllUsers); // Kelvin Rodriguez-- Used To Retrieve All Users From DB
router.get("/user/:username", db.getSingleUser); 
router.get("/photos", db.getUserPhotos);
router.get("/photo/:id/likes", db.getPhotoLikes);
router.get("/photo/:id", db.getPhoto);
router.get("/followers",db.getUserFollowers);
router.get("/following", loginRequired, db.getUserFollowing);
router.get("/feed", loginRequired, db.getFollowingPhotos);
router.get("/:username", db.getUserByUsername);


module.exports = router;
let db = require("../db/queries");
var express = require("express");
var router = express.Router();
const { loginRequired } = require("../auth/helpers");


router.get("/new", db.getAllUsers)
router.post("/new", db.registerUser);
router.post("/login", db.loginUser);
router.get("/logout", loginRequired, db.logoutUser);
router.get("/user", db.getUserPhotos)
router.get("/followers",db.getUserFollowers)
router.get("/following", db.getUserFollowing)

module.exports = router;


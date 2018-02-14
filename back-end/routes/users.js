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
router.post("/logout", db.logoutUser);
router.get("/userData", db.getUserPhotos)
router.get("/followers",db.getUserFollowers)
router.get("/following", db.getUserFollowing)

module.exports = router;


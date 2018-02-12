const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

function getAllUsers(req, res, next) {
  db
    .any("select * from users")
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL users"
      });
    })
    .catch(function(err) {
      return next(err);
    });
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
              console.log('error......')
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
        res.status(500).json({
          status: "error",
          error: err
        });
      });
}

module.exports = {
    getAllUsers: getAllUsers,
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser
  };
const passport = require("passport");
const db = require("../db/index");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((username, done) => {
    db
      .one("SELECT * FROM users WHERE id=$1", [username.id])
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  });
};

const Strategy = require('passport-local').Strategy;
const db = require ('./client/models');
const crypto = require("crypto");

// 1. check if the user is in the database 
// 2. check if the password matches
const strategy = new Strategy(
  //{  session: true },
  //Passport will give us the username and password and the "done" function. 
  function(username, password, done) {
    db.User.findOne({username: username}, function(err, dbUser) {
        if (err) {
            console.log(err);
        } 
        if (!dbUser) {
            return done(null, false, { message: "Username not in system." });
        }
        if (!validPassword(dbUser, password)) {
            return done(null, false, { message: "Password does not work for username" });
        }
        return done(null, dbUser);
    });
  }
);

function validPassword(user, inputPassword) {
    let hash = crypto.createHmac("sha512", user.password_salt);
    hash.update(inputPassword);
    if (hash.digest("hex") === user.password_hash) {
        return true;
    } else {
        return false;
    }
}

module.exports = strategy;
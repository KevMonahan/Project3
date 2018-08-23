const passport = require("passport");
const session = require("express-session")({ secret: "superduper", resave: false, saveUninitialized: false });
const strategy = require("./localStrategy");
const User = require("./client/models/User");


function setup(expressApp) {
    passport.use(strategy);
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    expressApp.use(session);
    expressApp.use(passport.initialize());
    expressApp.use(passport.session());
    // expressApp.use(require("./client/routes"));
    expressApp.use(require("./register.js"));
    return passport;
}

function serializeUser(user, done) {
    const _id = (user._id ? user._id : user[0]._id);
    done(null, _id);
}

function deserializeUser(savedId, done) {
    User.findOne({_id: savedId}, function(error, dbUser) {
        if (error) 
            done(error, null);
        else
            done(null, dbUser);
    });
}

module.exports = setup;
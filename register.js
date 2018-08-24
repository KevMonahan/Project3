const db = require('./client/models');
const crypto = require("crypto");
const router = require("express").Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


module.exports = function (passport) {

    router.post('/login', passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });

    router.post("/register", function (req, res) {
        console.log("in /register");

        db.User.findOne({ username: req.body.username.toLowerCase() }, function (err, dbUser) {

            if (err) {
                console.log(err);
            }
            if (dbUser) {
                res.json({ "success": false, "error": "Username already taken, pick another" });
            } else {
                const newUser = {};
                newUser["username"] = req.body.username;
                newUser["email"] = req.body.email;
                newUser["password_salt"] = crypto.randomBytes(132).toString('hex').slice(0, 132);
                let hash = crypto.createHmac("sha512", newUser["password_salt"]);
                hash.update(req.body.password);
                newUser["password_hash"] = hash.digest("hex");
                db.User.create(newUser, function (errorOnCreation, createdUser) {
                    if (errorOnCreation) {
                        console.log(errorOnCreation);
                    }
                    req.login(createdUser, function (erronOnLogin) {
                        if (erronOnLogin) {
                            console.log(erronOnLogin);
                        }
                        res.redirect("/home");
                    });
                });
            }
        });
    });

    router.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    router.post("/something", ensureLoggedIn(), function(req, res) {
        res.json({success:(req.user? "Yes":"No"), user:req.user});
    });

    return router;
};
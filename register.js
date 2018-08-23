const db = require('./client/models');
const crypto = require("crypto");
const router = require("express").Router();
const bodyParser = require("body-parser");
router.use(bodyParser);

router.post("/register", function (req, res) {
    console.log("in /register");
    console.log(req.body);
    return res.json(req.body);
    db.User.findOne({ username: req.body.username.toLowerCase() }, function (err, dbUser) {
        if (err) {
            console.log(err);
        }
        if (dbUser) {
            res.json({ "success": false, "error": "Username already taken, pick another" });
        } else {
            let newUser;
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

module.exports = router;
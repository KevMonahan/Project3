const router = require("express").Router();
const db = require("../client/models");
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const crypto = require("crypto");


module.exports = function (passport) {
    //get chats by user ID
    router.get("/api/discussion/:userId", function (req, res) {
        db.Discussion.find(req.query.userId).then(function (dbDiscussion) {
            res.json(dbDiscussion);
        })
    });

    //post chat using article ID ??? wont these 2 routes get viewed the same way?
    router.post("/api/discussion/", function (req, res) {
        db.Discussion.create(req.body).then(function (dbDiscussion) {
            res.json(dbDiscussion);
        })
    });
    //get user by user ID
    router.get("/api/users/:userId", function (req, res) {
        db.User.find({ _id: req.params.userId }).then(function (dbUser) {
            res.json(dbUser);
        })
    });
    //post new users
    router.post("/api/users", function (req, res) {
        db.User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
        })
    });

    //get articles previously read by user Id.
    router.get("/api/users/:userId/articles", function (req, res) {
        db.User.find({ _id: req.params.userId }).then(function (dbArticle) {
            res.json(dbArticle);
        })
    });
    //get reactions for articles by article ID
    router.get("/api/articles/:articleId/reactions", function (req, res) {
        db.Article.find({ _id: req.params.articleId }).then(function (dbArticle) {
            res.json(dbArticle);
        })
    });

    //update user info
    router.put("/api/users/:userId", function (req, res) {
        db.User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true }).then(function (dbUser) {
            res.json(dbUser);
        })
    });
    //get all articles
    router.get("/api/articles", function (req, res) {
        db.Article.find(req.query).then(function (dbArticle) {
            res.json(dbArticle);
        })
    });
    //post new articles
    router.post("/api/articles", function (req, res) {
        db.Article.create(req.query).then(function (dbArticle) {
            res.json(dbArticle);
        })
    });

    //get single article by article ID
    router.get("/api/articles/:articleId", function (req, res) {
        db.Article.find({ _id: req.params.articleId }).then(function (dbArticle) {
            res.json(dbArticle);
        })
    });

    //get reactions by article ID.
    router.get("/api/reactions/:articleId", function (req, res) {
        db.Reaction.find({ _articleId: req.params.articleId }).then(function (dbReaction) {
            res.json(dbReaction);
        })
    });
    //post new reactions
    router.post("/api/reactions", function (req, res) {
        db.Reaction.create(req.query).then(function (dbReaction) {
            res.json(dbReaction);
        })
    });

    router.post('/api/login', passport.authenticate("local"), function (req, res) {
        res.json({"success": true});
    });

    router.post("/api/register", function (req, res) {
        console.log("in /register");
        console.log(req.body);
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
                        res.json({"success": true, "error": undefined});
                    });
                });
            }
        });
    });

    router.get("/api/logout", function(req, res) {
        req.logout();
        res.json({"success": true});
    });

    /* Temp path for testing path protection */
    router.get("/api/something", ensureLoggedIn(), function(req, res) {
        res.json({success:(req.user? "Yes":"No"), user:req.user});//test path protection
    });

    return router;
};



//get articles by source (name? might be good to add a nickname column to the table for sources if we even add this feature).
//If we have this, would give users the way to look for articles in our database by source name not a sourceId they wouldn't know.
//    ⬇
//router.get("/api/articles/:sourceName", function (req, res) {

//});

//get all sources (Needed?)
// router.get("/api/sources", function (req, res) {

// });
//add a new source (Needed?)
// router.post("/api/sources", function (req, res) {

// });
//get source by source ID
// router.get("/api/sources/:sourceId", function (req, res) {

// });
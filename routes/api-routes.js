const router = require("express").Router();
const db = require("../client/models");
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const crypto = require("crypto");


module.exports = function (passport) {
    //get chats by user ID
    router.get("/api/discussion/:userId", ensureLoggedIn(), function (req, res) {
        db.Discussion.find(req.query.userId).then(function (dbDiscussion) {
            res.json(dbDiscussion);
        })
    });

    router.get("/api/messages/:discussionId", ensureLoggedIn(), function (req, res) {
        db.Discussion.find({ _id: req.params.discussionId}).then(function (dbDiscussion) {
            res.json(dbDiscussion);
        })
    });


    //post chat using article ID ??? wont these 2 routes get viewed the same way?
    router.post("/api/discussion/", ensureLoggedIn(), function (req, res) {
        db.Discussion.create(req.body).then(function (dbDiscussion) {
            res.json(dbDiscussion);
        })
    });

    //put route to add a message to specific discussion
    // router.put("/api/discussion/:discussionId", ensureLoggedIn(), function (req, res) {
    //     db.Discussion.findOneAndUpdate({ _id: req.params.discussionId }, { $set: req.body }, { new: true }).then(function (dbDiscussion) {
    //         res.json(dbDiscussion);
    //     })
    // })
    router.put("/api/discussion/:discussionId", ensureLoggedIn(), function (req, res) {
        var newMessage = req.body.messages;

        db.Discussion.findOneAndUpdate({ _id: req.params.discussionId }, { $push: { messages: newMessage } }, { new: true }).then(function (dbDiscussion) {
            res.json(dbDiscussion);
        })
    })
    //get articles previously read by user Id.
    router.get("/api/users/:userId/articles", ensureLoggedIn(), function (req, res) {
        db.User.find({ _id: req.params.userId }).then(function (dbArticle) {
            res.json(dbArticle);
        })
    });
    //get reactions for articles by article ID
    router.get("/api/articles/:articleId/reactions", ensureLoggedIn(), function (req, res) {
        db.Article.find({ _id: req.params.articleId }).then(function (dbArticle) {
            res.json(dbArticle);
        })
    });

    //update user info
    // router.put("/api/users/:userId", ensureLoggedIn(), function (req, res) {
    //     db.User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true }).then(function (dbUser) {
    //         res.json(dbUser);
    //     })
    // });
    router.put("/api/users/:userId", ensureLoggedIn(), function (req, res) {
        const updateArticles = req.body.articles

        db.User.findOneAndUpdate({ _id: req.params.userId }, { $push: { articles: updateArticles} }, { new: true }).then(function (dbUser) {
            res.json(dbUser);
        })
    });
   
    //get all articles
    router.get("/api/articles", ensureLoggedIn(), function (req, res) {
        db.Article.find(req.query).then(function (dbArticle) {
            res.json(dbArticle);
        })
    });
   
    //get most recent article
    router.get("/api/currentarticle", function (req, res) {
        db.Article.findOne({}, {}, { sort: { '_id': -1 } }, function (err, post) {
            res.json(post);
        });
    });


    //post new articles
    router.post("/api/articles", ensureLoggedIn(), function (req, res) {
        db.Article.create(req.query).then(function (dbArticle) {
            res.json(dbArticle);
        })
    });

    //get single article by article ID
    router.get("/api/articles/:articleId", ensureLoggedIn(), function (req, res) {
        db.Article.find({ _id: req.params.articleId }).then(function (dbArticle) {
            res.json(dbArticle);
        })
    });

    //get reactions by article ID.
    router.get("/api/reactions/:articleId", ensureLoggedIn(), function (req, res) {
        db.Reaction.find({ _articleId: req.params.articleId }).then(function (dbReaction) {
            res.json(dbReaction);
        })
    });
    //post new reactions
    // req.query didnt for some reason???
    router.post("/api/reactions", ensureLoggedIn(), function (req, res) {
        console.log(req.body)
        console.log(req.query)
        db.Reaction.create(req.body).then(function (dbReaction) {
            res.json(dbReaction);
        })
    });
    // router.post("/api/reactions", function (req, res) {
    //     db.Reaction.create(req.query).then(function (dbReaction) {
    //         res.json(dbReaction);
    //     })
    // });
    // ========================================================================
    // START: Passport routes 
    // Used for login, registration, logout, checking if logged in on refresh
    // ========================================================================
    router.post('/api/login', passport.authenticate("local"), function (req, res) {        

        if (req.user) {
            let newUser = req.user;
            newUser.password_hash = undefined;
            newUser.password_salt = undefined;
            res.json({"success": true, "user": newUser})
        } else {
            res.json({"success": false});
        }
        
    });

    router.post("/api/register", function (req, res) {
        const reUsername = new RegExp("^[a-zA-Z0-9]*$/"); //   ^[a-zA-Z0-9]*$
        const rePassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        let username = req.body.username;
        let password = req.body.password;
        let errorMessage = "";

        if (!username || username.length < 5) {
            errorMessage += "Username must be at least 5 characters long.  ";
        } 
        // else if (!reUsername.test(username)) {
        //     errorMessage += "Username must be only letters and numbers.  ";
        // }

        if (!password || password.length < 8) {
            errorMessage += "Password must be at least 8 characters long.  ";
        } else if (!rePassword.test(password)) {
            errorMessage += "Password must contain a lowercase letter, uppercase letter, number, and special character (like !@#$%^&*).";
        }

        if (errorMessage) {
            return res.json({"success": false, "error": errorMessage});
        }

        username = username.toLowerCase();
        db.User.findOne({ username: username }, function (err, dbUser) {

            if (err) {
                console.log(err);
            }
            if (dbUser) {
                res.json({ "success": false, "error": "Username already taken, pick another." });
            } else {
                const newUser = {};
                newUser["username"] = username;
                newUser["email"] = req.body.email;
                newUser["password_salt"] = crypto.randomBytes(132).toString('hex').slice(0, 132);
                let hash = crypto.createHmac("sha512", newUser["password_salt"]);
                hash.update(password);
                newUser["password_hash"] = hash.digest("hex");
                db.User.create(newUser, function (errorOnCreation, createdUser) {
                    if (errorOnCreation) {
                        console.log(errorOnCreation);
                    }
                    req.login(createdUser, function (erronOnLogin) {
                        if (erronOnLogin) {
                            console.log(erronOnLogin);
                        }

                        createdUser["password_hash"] = undefined;
                        createdUser["password_salt"] = undefined;
                        res.json({"user": createdUser, "error": undefined});
                    });
                });
            }
        });
    });

    router.get("/api/logout", function(req, res) {
        req.logout();
        res.json({"success": true});
    });

    router.get("/api/user", function(req, res) {
        if (req.user) {
            let myUser = req.user;
            myUser.password_hash = undefined;
            myUser.password_salt = undefined;
            res.json({"user": myUser});
        } else {
            res.json({"user": null});
        }
    });
    // ========================================================================
    // END: Passport routes 
    // ========================================================================

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
var router = require("express").Router();


//get chats by user ID
router.get("/chat/:userId", function(req, res){
    db.Chat.find(req.query).then(function(dbChat){
        res.json(dbChat);
    })
});
//post chat using user ID
router.post("/chat/:userId", function(req, res){

});
//post chat using article ID ??? wont these 2 routes get viewed the same way?
router.post("/chat/:articleId", function(req, res){

});
//get user by user ID
router.get("/users/:userId", function(req, res){
    db.Chat.find({_id: req.params.userId}).then(function(dbUser){
        res.json(dbUser);
    })
});
//post new users
router.post("/users", function(req, res){

});
//get users by article ID, do we need this?
router.get("/users/:articleId", function(req, res){

});

//update user info
router.put("/users/:id", function(req, res){

});
//get articles
router.get("/articles", function(req, res){

});
//post new articles
router.post("/articles", function(req, res){

});
//get article reactions by the article Id
router.get("/articles/:articleId/reactions", function(req, res) {

})
//get read articles by user ID
router.get("/articles/:userId", function(req, res){

});
//get article by article ID
router.get("/articles/:articleId", function(req, res){

});
//get articles by source (name? might be good to add a nickname column to the table for sources if we even add this feature).
//If we have this, would give users the way to look for articles in our database by source name not a sourceId they wouldn't know.
router.get("/articles/:sourceName", function(req, res){

});
//get all sources (Needed?)
router.get("/sources", function(req, res){

});
//add a new source (Needed?)
router.post("/sources", function(req, res){

});
//get source by source ID
router.get("/sources/:sourceId", function(req, res){

});
//get reactions by article ID.
router.get("/reactions/:articleId", function(req, res){

});
//post new reactions
router.post("/reactions", function(req, res){

});



module.exports = router;
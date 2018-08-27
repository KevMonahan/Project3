const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true,
        text: "Republicans have their talking points on Manafort and Cohen, but most prefer to hide"
    },
    author: {
        type: String
        ['Laura Clawson']
    },
    body: {
        type: String,
        required: true,
        text: "Republicans had their talking points all ready for former Trump campaign chair Paul Manafort’s eight convictions: Please ignore that Donald Trump hired a criminal to run his campaign, because the charges were all for actions before Manafort worked for Trump, and they didn’t have to do with collusion with Russia. Republicans were less ready with the talking points for former Trump personal attorney and fixer Michael Cohen’s guilty plea on separate charges, in which he directly said that he violated elections law under instruction from Trump. But Sens. Lindsey Graham (R-SC) and John Cornyn (R-TX) gave it a shot by trying to wedge Cohen into their Manafort talking points: hey, paying off Stormy Daniels and Karen McDougal to influence the election and then lying about it doesn’t have anything to do with Russia. Graham went so far as to say that “the thing that will hurt the president the most is if, in fact, his campaign did coordinate with a foreign government like Russia. Anything short of that is probably going to fall into partisan camps.” Having other people illegally pay hush money to women Trump had affairs with in order to keep unflattering stories from coming out before an election … eh, just a partisan concern. Having Trump’s former campaign chair, deputy campaign chair/high-ranking transition official, national security adviser, campaign foreign policy adviser, and personal lawyer all plead guilty to or be convicted of crimes … let’s just not mention that. For their part, House Speaker Paul Ryan and Senate Majority Leader Mitch McConnell were lying low. Ryan even tried a variation on his usual “I haven’t heard about that” response to bad Trump news: Aides to Speaker Paul D. Ryan, Republican of Wisconsin, said Mr. Ryan was “aware of Mr. Cohen’s guilty plea to these serious charges” but would wait for more information to comment further. Senator Mitch McConnell, Republican of Kentucky and the majority leader, said nothing publicly. Most Republicans took the Ryan/McConnell route: they stayed out of sight and they stayed quiet. They know this isn’t good, even if the vast majority of congressional Republicans remain loyal to and afraid of Trump enough to dutifully recite the talking points if they’re absolutely forced to do so.",
        article_url: {
        type: String,
        required: true,
        text: "https://www.dailykos.com/story/2018/8/22/1790081/-Republicans-have-their-talking-points-on-Manafort-and-Cohen-but-most-prefer-to-hide"
    },
        source_id: {
            type: Schema.Types.ObjectId,
            ref: "Source"
        },
        date: {
            type: Date,
            text: "Wednesday August 22, 2018 · 7:55 AM PDT"
        }
}
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;

var db = require("../client/models");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Project3";

mongoose.connect(MONGODB_URI);

// const sourceSeed = [{
//     name: "dailykos",
//     homepage_url: "www.dailykos.com",
//     description: "A news website"
// },
// {
//     name: "fox",
//     homepage_url: "www.fox.com",
//     description: "Not an actual fox"
// }];

// db.Source
//     .remove({})
//     .then(() => db.Source.collection.insertMany(sourceSeed))
//     .then(data => {
//         console.log(data.result.n + " records inserted!");
//         process.exit(0);
//     })
//     .catch(err => {
//         console.error(err);
//         process.exit(1);
//     });


const articleSeed = [{
    headline: "Republicans have their talking points on Manafort and Cohen, but most prefer to hide",
    author: 'Laura Clawson',
    body: "Republicans had their talking points all ready for former Trump campaign chair Paul Manafort’s eight convictions: Please ignore that Donald Trump hired a criminal to run his campaign, because the charges were all for actions before Manafort worked for Trump, and they didn’t have to do with collusion with Russia. Republicans were less ready with the talking points for former Trump personal attorney and fixer Michael Cohen’s guilty plea on separate charges, in which he directly said that he violated elections law under instruction from Trump. But Sens. Lindsey Graham (R-SC) and John Cornyn (R-TX) gave it a shot by trying to wedge Cohen into their Manafort talking points: hey, paying off Stormy Daniels and Karen McDougal to influence the election and then lying about it doesn’t have anything to do with Russia. Graham went so far as to say that “the thing that will hurt the president the most is if, in fact, his campaign did coordinate with a foreign government like Russia. Anything short of that is probably going to fall into partisan camps.” Having other people illegally pay hush money to women Trump had affairs with in order to keep unflattering stories from coming out before an election … eh, just a partisan concern. Having Trump’s former campaign chair, deputy campaign chair/high-ranking transition official, national security adviser, campaign foreign policy adviser, and personal lawyer all plead guilty to or be convicted of crimes … let’s just not mention that. For their part, House Speaker Paul Ryan and Senate Majority Leader Mitch McConnell were lying low. Ryan even tried a variation on his usual “I haven’t heard about that” response to bad Trump news: Aides to Speaker Paul D. Ryan, Republican of Wisconsin, said Mr. Ryan was “aware of Mr. Cohen’s guilty plea to these serious charges” but would wait for more information to comment further. Senator Mitch McConnell, Republican of Kentucky and the majority leader, said nothing publicly. Most Republicans took the Ryan/McConnell route: they stayed out of sight and they stayed quiet. They know this isn’t good, even if the vast majority of congressional Republicans remain loyal to and afraid of Trump enough to dutifully recite the talking points if they’re absolutely forced to do so.",
    article_url: "https://www.dailykos.com/story/2018/8/22/1790081/-Republicans-have-their-talking-points-on-Manafort-and-Cohen-but-most-prefer-to-hide",
    date: new Date(Date.now())
}, {
    headline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author: 'Sed accumsan',
    body: "venenatis lectus non placerat. Integer lacus neque, congue eget accumsan at, congue a metus. Maecenas viverra consectetur tortor sed ornare. Proin vehicula vehicula mi, quis volutpat orci malesuada a. Pellentesque sodales aliquam nisi, a finibus sem pulvinar eu. Praesent feugiat maximus neque, non aliquet magna pretium non",
    article_url: "https://www.theonion.com",
    date: new Date(Date.now())
}];

const userSeed = [{
    username: "Kevin",
    password_hash: "Hashed",
    password_salt: "Salty",
    email: "kevin@kevin.com",
},
{
    username: "Chris",
    password_hash: "hashed",
    password_salt: "salty",
    email: "chris@chris.com"
}
];

let createdArticles;
let createdUsers;


db.Article
    .remove({})
    .then(() => db.Article.collection.insertMany(articleSeed))
    .then(articleData => {
        createdArticles = articleData;
        console.log(createdArticles.ops[0]._id);
        return db.User.remove({});
    })
    .then(() => db.User.collection.insertMany(userSeed))
    .then(userData => {
        createdUsers = userData;
        console.log(createdUsers);
        return db.Reaction.remove({})
    })
    .then(() => {
        const reactionSeed = [{
            _articleId: createdArticles.ops[0]._id,
            _userId: createdUsers.ops[0]._id,
            initial_opinion: "I found this article be quite intriguing. I really like the way they wrote it.",
            wants_discussion: true
        },
        {
            _articleId: createdArticles.ops[1]._id,
            _userId: createdUsers.ops[1]._id,
            initial_opinion: "I found this article be quite boring. I really disliked the way they wrote it.",
            wants_discussion: true
        }];

        console.log(reactionSeed);

        db.Reaction.collection.insertMany(reactionSeed);

        return db.Discussion.remove({});
    }).then(() => {

        const discussionSeed = [{
            _articleId: createdArticles.ops[0]._id,
            user_one: createdUsers.ops[0]._id,
            user_two: createdUsers.ops[1]._id,
            messages: ["Hey I found your talking points interesting.", "Oh thats awesome which parts? I also found yours interesting."]
        },
        {
            _articleId: createdArticles.ops[1]._id,
            user_one: createdUsers.ops[1]._id,
            user_two: createdUsers.ops[0]._id,
            messages: ["Hey I found your talking points lame.", "Oh thats rude. I found yours interesting."]
        }]

        console.log(discussionSeed);

        db.Discussion.collection.insertMany(discussionSeed);
    }).then(() => {
        console.log("You should expect to see 2 articles created first, 2 users, 2 reactions, and 2 discussions");
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    body: {
        type: String,
        required: true
    },
    article_url: {
        type: String,
        required: true
    },
    source_id: {
        type: Schema.Types.ObjectId,
        ref: "Source"
    },
    date: {
        type: Date
    }
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReactionSchema = new Schema({
    article_id: {
        type: Object,
        ref: "Article",
        required: true
    },
    initial_opinion: {
        type: String
    },
    wants_discussion: {
        type: Boolean,
        default: false
    },
    discussion_id: {
        type: Object,
        ref: "Discussion"
    }
});

const Reaction = mongoose.model("Reaction", ReactionSchema);
module.exports = Reaction;
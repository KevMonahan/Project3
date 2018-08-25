const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReactionSchema = new Schema({
    _articleId: {
        type: Schema.Types.ObjectId,
        ref: "Article",
        required: true
    },
    _userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    initial_opinion: {
        type: String
    },
    wants_discussion: {
        type: Boolean,
        default: false
    }
});

const Reaction = mongoose.model("Reaction", ReactionSchema);
module.exports = Reaction;
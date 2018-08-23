const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema({
    article_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    user_one: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    user_two: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    notify_user_one: {
        type: Boolean,
        default: true
    },
    notify_user_two: {
        type: Boolean,
        default: true
    },
    messages: [{
        type: String
    }]
});

const Discussion = mongoose.model("Discussion", DiscussionSchema);
module.exports = Discussion;
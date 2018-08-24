const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password_hash: {
        type: String,
        required: true
    },
    password_salt: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    reactions: [{
        type: Schema.Types.ObjectId,
        ref: "Reaction"
    }],
    articles: [{
        type: Schema.Types.ObjectId,
        ref: "Article"
    }]
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
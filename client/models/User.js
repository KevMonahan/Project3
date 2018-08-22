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
    reactions: [{
        type: Schema.Types.ObjectId
    }]
});

const User = mongoose.model("Reaction", UserSchema);
module.exports = User;
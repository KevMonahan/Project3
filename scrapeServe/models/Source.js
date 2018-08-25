const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SourceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    homepage_url: {
        type: String,
        required: true,
    },
    description: {
        type: String
    }
});

const Source = mongoose.model("Source", SourceSchema);
module.exports = Source;
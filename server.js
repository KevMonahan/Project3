const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const PORT = process.env.PORT || 3001;
const app = express();
const passportInit = require("./passport-init.js");
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Project3";

// Connect to Mongo DB
mongoose.connect(MONGODB_URI);


// Define middleware here

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("combined"));
const passport = passportInit(app); //also sets API routes
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
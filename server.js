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

var socket = require("socket.io");

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

let server = app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {

  console.log('new connection', socket.id);

  socket.on('switchRoom', function (newroom) {
    // leave the current room (stored in session)
    socket.leave(socket.room);
    socket.join(newroom);
    socket.room = newroom;
    console.log("joined:", socket.room);
  });

  
  socket.on("message", chat)

  function chat(data) {
    console.log("socket.room: ", socket.room);
    // socket.broadcast.emit('mouse', data);
    io.sockets.in(socket.room).emit('newMessage', data);
    console.log(data);
  }

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // echo globally that this client has left
    console.log("left:", socket.room);
    socket.leave(socket.room);
  });

}
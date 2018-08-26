'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../config/config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setup server
var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
var socketIo = (0, _socket2.default)(server);

// Render a API index page
app.get('/', function (req, res) {
  res.sendFile(_path2.default.resolve('public/index.html'));
});

// Start listening
server.listen(process.env.PORT || _config2.default.port);
console.log('Started on port ' + _config2.default.port);

// Setup socket.io
socketIo.on('connection', function (socket) {
  var username = socket.handshake.query.username;
  console.log(username + ' connected');

  socket.on('client:message', function (data) {
    console.log(data.username + ': ' + data.message);

    // message received from client, now broadcast it to everyone else
    socket.broadcast.emit('server:message', data);
  });

  socket.on('disconnect', function () {
    console.log(username + ' disconnected');
  });
});

exports.default = app;
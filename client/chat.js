var currentUsername = "";
var io = require('socket.io-client');
var socket = io.connect('http://localhost:3700');

var sendMessage = function(message) {
  socket.emit('send', {
    username: currentUsername,
    message: message
  });
};

var registerUser = function(username) {
  currentUsername = username;
  socket.emit('register', {username: username});
};

var registerListener = function(messageName, callback) {
  socket.on(messageName, callback);
}

module.exports = {
  sendMessage: sendMessage,
  registerUser: registerUser,
  registerListener: registerListener
};

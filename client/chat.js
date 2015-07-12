module.exports = function(username) {
  var currentUsername = username;
  var io = require('socket.io-client');
  var socket = io.connect('http://localhost:3700');

  var sendMessage = function(message) {
    socket.emit('send', {
      username: currentUsername,
      message: message
    });
  };

  var registerOnMessage = function(callback) {
    socket.on('message', callback);
  };

  socket.emit('register', {username: username});

  return {
    sendMessage: sendMessage,
    registerOnMessage: registerOnMessage
  }
};

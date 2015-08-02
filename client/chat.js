// Conceptually our chatClient module in the browser, but is actually a module
// when we're testing it. It exports a function which returns an object with
// two functions inside it that have access to the username.
module.exports = function(username) {
  // Save the passed in username so the exported functions can use it
  var currentUsername = username;
  // This is an npm module that browserify lets us import as if this was
  // server code running in node. As this import is inside the module it means
  // the rest of the code doesn't have to worry about how we connect to the
  // server.
  var io = require('socket.io-client');
  // Connect the client to the server. This returns the socket or connection
  // to the server that we can use.
  var socket = io.connect('http://localhost:3700');
  // Send the message to the server using the socket. By putting this in a function
  // we can easily change the format of the message without having to change
  // any other client code. We also automatically add the username into the
  // data we're sending.
  var sendMessage = function(message) {
    socket.emit('send', {
      username: currentUsername,
      message: message
    });
  };

  // A wrapper around registering a callback function for 'message' messages
  // from the server. Keeps all the sockets code in one place.
  var registerOnMessage = function(callback) {
    socket.on('message', callback);
  };

  // Register the user as soon as the module starts using the username.
  socket.emit('register', {
    username: username
  });

  // Give back the two functions we've defined to main.js so it can communicate
  // with the server.
  return {
    sendMessage: sendMessage,
    registerOnMessage: registerOnMessage
  };
};

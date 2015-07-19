// Definition of the chatServer module.

var register = function(data, socket) {
  // When someone registers send them a welcome message
  socket.emit('message', { message: 'Welcome, ' + data.username + '!' });
  // Save the username on the socket itself. It's not stored in a variable in
  // this file because all sockets use the same copy of this module
  socket.username = data.username;
  // broadcast is a socket function which sends a message to all other clients
  socket.broadcast.emit('message', { message: data.username + ' is now online' });
};

var send = function(data, sockets) {
  // Forward message onto all connected clients (this includes the current one)
  sockets.emit('message', data);
};

var disconnect = function(socket) {
  // tell all other clients that this client disconnected
  socket.broadcast.emit('message', { message: socket.username + ' left the chat' });
};

// this is the module syntax and defines the public functions
// when you do 'var cs = require('./chatServer')' then module.exports will be
// assigned to cs. Meaning you can do cs.register() for example.
module.exports = {
  register: register,
  send: send,
  disconnect: disconnect
};

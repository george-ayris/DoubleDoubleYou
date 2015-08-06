// Definition of the chatServer module.

var register = function(data, socket) {
  // When someone registers send them a welcome message
  socket.emit('message', { message: 'Welcome, ' + data.username + '!' });
  //socket.emit('message', { message: 'Other online users are: ' + data.users}); // just indicative for now
  // Save the username on the socket itself. It's not stored in a variable in
  // this file because all sockets use the same copy of this module
  socket.username = data.username;  // remember data is JSON {username: "King Richard"}
  // broadcast is a socket function which sends a message to all other clients
  socket.broadcast.emit('message', { message: data.username + ' is now online' });
};

var sendChatMessage = function(data, sockets) {
  // Forward message onto all connected clients (this includes the current one)
  sockets.emit('message', data);  // data is JSON {username: "Robin", message: "Long live the King!"}
  console.log(data);
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
  sendChatMessage: sendChatMessage,
  disconnect: disconnect
};

var register = function(data, socket) {
  socket.emit('message', { message: 'Welcome, ' + data.username + '!' });
  socket.username = data.username;
  //users.push(data.username);
  socket.broadcast.emit('message', { message: data.username + ' is now online' });
}

var send = function(sockets) {
  sockets.emit('message', data);
}

var disconnect = function(socket) {
  socket.broadcast.emit('message', { message: socket.username + ' left the chat' });
}

module.exports = {
  register: register,
  send: send,
  disconnect: disconnect
}

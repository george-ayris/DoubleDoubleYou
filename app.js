var express = require('express');
var app = express();
var port = 3700;
var users = [];

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

app.get('/', function(req, res) {
  res.render('index');
});

var expressApp = app.listen(port);
var io = require('socket.io').listen(expressApp);

io.sockets.on('connection', function(socket) {
  console.log('Client connected');
  socket.on('register', function(data) {
    socket.emit('message', { message: 'Welcome, ' + data.username + '!' });
    socket.username = data.username;
    //users.push(data.username);
    socket.broadcast.emit('message', { message: data.username + ' is now online' });
  });

  socket.on('send', function(data) {
    console.log('Received chat message');
    io.sockets.emit('message', data);
  });

  socket.on('disconnect', function() {
    console.log(socket.username + ' disconnected');
    socket.broadcast.emit('message', { message: socket.username + ' left the chat' })
  });
});

var express = require('express');
var app = express();
var port = 3700;
var users = [];
var chatServer = require('./chatServer.js');

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
    console.log('Registering');
    chatServer.register(data, socket);
  });

  socket.on('send', function(data) {
    console.log('Received chat message');
    chatServer.send(io.sockets);
  });

  socket.on('disconnect', function() {
    console.log(socket.username + ' disconnected');
    chatServer.disconnect(socket);
  });
});

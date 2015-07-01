var express = require('express');
var app = express();
var port = 3700;

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
  socket.emit('message', { message: 'welcome'});

  socket.on('register', function(data) {
    // store new person online
    // send back list of online people
  })

  socket.on('send', function(data) {
    console.log('Received chat message');
    io.sockets.emit('message', data);
  });

  socket.on('disconnect', function() {
    // tell everyone that user has left
  });
});

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

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function(socket) {
  console.log('Client connected');
  socket.emit('message', { message: 'welcome'});
  socket.on('send', function(data) {
    console.log('Received chat message');
    io.sockets.emit('message', data);
  });
});

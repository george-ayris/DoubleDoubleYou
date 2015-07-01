window.onload = function() {
  var messages = [];
  var socket = io.connect('http://192.168.1.22:3700');
  var field = document.getElementById('field');
  var sendButton = document.getElementById('send');
  var content = document.getElementById('content');

  socket.on('message', function(data) { // process username
    console.log('Message received: ' + data.message);
    if(data.message) {
      content.innerHTML += data.username + ': ' + data.message + '<br />';
    } else {
      console.log('There is a problem:', data);
    }
  });

  sendButton.onclick = function() {
    var text = field.value;
    console.log('Sending message: ' + text);
    socket.emit('send', {
      username: username,
      message: text
    });
  }

  // Get username via popup
  var username = prompt('Please enter your name:', '');
  socket.emit('register', {username: username});
}

window.onload = function() {
  var messages = [];
  var socket = io.connect('http://192.168.1.22:3700');
  var messageInput = document.getElementById('field');
  var sendButton = document.getElementById('send');
  var content = document.getElementById('content');

  socket.on('message', function(data) {
    if(data.username) {
      content.innerHTML += data.username + ': ' + data.message + '<br />';
    } else {
      content.innerHTML += data.message + '<br />';
    }
  });

  sendButton.onclick = function() {
    socket.emit('send', {
      username: username,
      message: messageInput.value
    });
    messageInput.value = "";
  }

  var username = prompt('Please enter your name:', '');
  socket.emit('register', {username: username});
}

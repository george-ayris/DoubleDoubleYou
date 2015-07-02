window.onload = function() {
  var messages = [];
  var socket = io.connect('http://192.168.1.21:3700');
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
  };

  messageInput.onkeypress = function(event) {
    event = event || window.event;
    if(event.keyCode == 13) {
      sendButton.click();
    }
  }

  var username = prompt('Please enter your name:', '');
  socket.emit('register', {username: username});
}

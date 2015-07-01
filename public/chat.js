window.onload = function() {
  var messages = [];
  var socket = io.connect('http://192.168.1.16:3700');
  var field = document.getElementById('field');
  var sendButton = document.getElementById('send');
  var content = document.getElementById('content');

  socket.on('message', function(data) { // process username
    console.log('Message received: ' + data.message);
    if(data.message) {
      messages.push(data.message);
      var html = '';
      for(i=0; i<messages.length; i++) {
        html += messages[i] + '<br />';
      }
      content.innerHTML = html;
    } else {
      console.log('There is a problem:', data);
    }
  });

  sendButton.onclick = function() {
    var text = field.value;
    console.log('Sending message: ' + text);
    socket.emit('send', {message: text}); // add sender name to message
  }

  // Get username via popup
  socket.emit('register', {name: username});
}

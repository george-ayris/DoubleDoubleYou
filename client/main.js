window.onload = function() {
  var messages = [];
  var chat = require('./chat.js');
  var messageInput = document.getElementById('field');
  var sendButton = document.getElementById('send');
  var content = document.getElementById('content');

  chat.registerListener('message', function(data) {
    if(data.username) {
      content.innerHTML += data.username + ': ' + data.message + '<br />';
    } else {
      content.innerHTML += data.message + '<br />';
    }
  });

  sendButton.onclick = function() {
    chat.sendMessage(messageInput.value);
    messageInput.value = "";
  };

  messageInput.onkeypress = function(event) {
    event = event || window.event;
    if(event.keyCode == 13) {
      sendButton.click();
    }
  }

  chat.registerUser(prompt('Please enter your name:', ''));
}
